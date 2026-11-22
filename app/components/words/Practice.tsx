import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../../StudyContext';
import AppLink from '../AppLink';
import { modeCards, useDictionary, type WordPrefsApi } from './useWordPrefs';
import Choice, { practicePath, useModeName, usePoolName } from './PracticeChoice';
import { ArticleCard, FlashCard } from './PracticeCards';
import type { WordEntry } from '../../domain/words';
import {
  buildRound,
  modeEntries,
  practiceMode,
  practicePool,
  practiceSearch,
  sameMeaning,
  today,
  type PracticeMode,
  type Rating,
} from '../../domain/word-practice';

// /words/practice: a choice of how and what to practise, or with ?list= a round of cards.
// ?mode= picks Dutch → English (the default), English → Dutch or de or het.
export default function Practice({ prefs }: { prefs: WordPrefsApi }) {
  const { t } = useStudyContext(),
    location = useLocation(),
    params = new URLSearchParams(location.search),
    key = params.get('list'),
    mode = practiceMode(params.get('mode')),
    dictionary = useDictionary(true);
  const status = dictionary.failed ? (
    <p className="words-status" role="status">
      {t('De woorden laden lukt nu niet.', 'The words cannot be loaded right now.')}{' '}
      <button type="button" className="text-button" onClick={dictionary.retry}>
        {t('Probeer het opnieuw', 'Try again')}
      </button>
    </p>
  ) : !dictionary.entries || !prefs.loaded ? (
    <p className="words-status" role="status">
      {t('Woorden laden…', 'Loading words…')}
    </p>
  ) : null;
  return key ? (
    <Round
      key={`${mode}:${key}`}
      poolKey={key}
      mode={mode}
      entries={dictionary.entries}
      prefs={prefs}
      status={status}
    />
  ) : (
    <Choice entries={dictionary.entries} prefs={prefs} status={status} mode={mode} />
  );
}

function Round({
  poolKey,
  mode,
  entries,
  prefs,
  status,
}: {
  poolKey: string;
  mode: PracticeMode;
  entries: WordEntry[] | null;
  prefs: WordPrefsApi;
  status: React.ReactNode;
}) {
  const { t } = useStudyContext(),
    name = usePoolName(),
    modeName = useModeName(),
    day = useMemo(() => today(), []),
    cards = modeCards(prefs.prefs, mode),
    back = practiceSearch(mode);
  // The round is drawn once, when the words and the saved cards are both in.
  const [queue, setQueue] = useState<WordEntry[] | null>(null),
    // The words drawn; a missed word comes back once after them, so the queue grows.
    [size, setSize] = useState(0),
    [early, setEarly] = useState(false),
    [position, setPosition] = useState(0),
    [tally, setTally] = useState({ again: 0, good: 0, easy: 0 }),
    [repeated, setRepeated] = useState<Set<string>>(() => new Set()),
    [last, setLast] = useState<{ entry: WordEntry; rating: Rating } | null>(null),
    [round, setRound] = useState(1);
  const usable = useMemo(() => (entries ? modeEntries(mode, entries) : null), [entries, mode]);
  const pool = useMemo(
    () =>
      usable && prefs.loaded
        ? practicePool(poolKey, usable, cards, prefs.prefs.marked, day)
        : undefined,
    [usable, prefs.loaded, poolKey, round],
  );
  useEffect(() => {
    if (!pool) return;
    const drawn = buildRound(pool, cards, day);
    setQueue(drawn.words);
    setSize(drawn.words.length);
    setEarly(drawn.early);
    setPosition(0);
    setTally({ again: 0, good: 0, easy: 0 });
    setRepeated(new Set());
    setLast(null);
  }, [pool]);
  // A spelling with two entries (zijn: to be, and his) says which one the card means.
  const homographs = useMemo(() => {
    const seen = new Set<string>(),
      twice = new Set<string>();
    for (const entry of entries || []) (seen.has(entry.nl) ? twice : seen).add(entry.nl);
    return twice;
  }, [entries]);
  const also = useMemo(() => sameMeaning(entries || []), [entries]);
  const card = queue?.[position];
  const answer = (rating: Rating) => {
    if (!card || !queue) return;
    prefs.rateWord(card.id, rating, day, mode);
    setTally((n) => ({ ...n, [rating]: n[rating] + 1 }));
    setLast({ entry: card, rating });
    if (rating === 'again' && !repeated.has(card.id)) {
      setQueue([...queue, card]);
      setRepeated(new Set(repeated).add(card.id));
    }
  };
  const next = () => setPosition((p) => p + 1);
  const heading = (
    <div className="heading practice-heading">
      <div>
        <h1 tabIndex={-1}>{name(poolKey)}</h1>
        <p className="practice-mode-name">{modeName(mode)}</p>
      </div>
      {card && (
        <AppLink className="practice-stop" to={practicePath} search={back}>
          {t('Stoppen', 'Stop')}
        </AppLink>
      )}
    </div>
  );
  const elsewhere = (
    <AppLink className="secondary" to={practicePath} search={back}>
      {t('Iets anders oefenen', 'Practise something else')}
    </AppLink>
  );
  if (status)
    return (
      <>
        {heading}
        {status}
      </>
    );
  if (pool === null)
    return (
      <>
        {heading}
        <p className="words-status">{t('Deze lijst bestaat niet.', 'This list does not exist.')}</p>
      </>
    );
  if (!queue) return heading;
  if (!queue.length)
    return (
      <>
        {heading}
        <div className="words-empty">
          <p>
            {poolKey === 'review'
              ? t(
                  'Niets te herhalen vandaag. Kom morgen terug.',
                  'Nothing to review today. Come back tomorrow.',
                )
              : poolKey === 'mistakes'
                ? t('Geen fouten om te oefenen.', 'No mistakes to practise.')
                : t(
                    'Er zijn hier geen woorden om te oefenen.',
                    'There are no words to practise here.',
                  )}
          </p>
          {elsewhere}
        </div>
      </>
    );
  if (!card) {
    const more = pool ? buildRound(pool, cards, day) : null,
      right = tally.good + tally.easy;
    return (
      <>
        {heading}
        <div className="practice-done" role="status">
          <h2>{t('Klaar!', 'Done!')}</h2>
          <p>
            {mode === 'de-het'
              ? t(
                  `${right} keer goed, ${tally.again} keer fout.`,
                  `${right} right, ${tally.again} wrong.`,
                )
              : t(
                  `${right} keer goed, ${tally.again} keer opnieuw.`,
                  `${right} right, ${tally.again} again.`,
                )}{' '}
            {tally.again > 0 &&
              t(
                'Wat je nog niet wist, komt morgen terug.',
                'What you did not know yet comes back tomorrow.',
              )}
          </p>
          <div className="practice-actions">
            {more &&
              more.words.length > 0 &&
              !more.early &&
              poolKey !== 'review' &&
              poolKey !== 'mistakes' && (
                <button type="button" className="primary" onClick={() => setRound((n) => n + 1)}>
                  {t('Nog een ronde', 'Another round')}
                </button>
              )}
            {elsewhere}
          </div>
        </div>
      </>
    );
  }
  // The count is of the words drawn and never grows; the missed words that come back after
  // them are counted on their own as "once more".
  const again = position >= size,
    step = again ? position - size : position,
    steps = again ? queue.length - size : size;
  return (
    <>
      {heading}
      {early && position === 0 && (
        <p className="words-status">
          {t(
            'Alles in deze lijst is al geoefend. Dit zijn de woorden die het eerst weer aan de beurt zijn.',
            'Everything in this list has been practised. These are the words that come up next.',
          )}
        </p>
      )}
      <div className="practice-progress" data-again={again || undefined}>
        <span>
          {again && <>{t('Nog een keer', 'Once more')} · </>}
          {step + 1} / {steps}
        </span>
        <span className="practice-bar" aria-hidden="true">
          <span style={{ width: `${(step / steps) * 100}%` }} />
        </span>
      </div>
      {mode === 'de-het' ? (
        <ArticleCard
          key={position}
          entry={card}
          previous={last?.rating === 'good' ? last.entry : null}
          onAnswer={answer}
          onNext={next}
        />
      ) : (
        <FlashCard
          key={position}
          entry={card}
          mode={mode}
          marked={prefs.prefs.marked.includes(card.id)}
          onMark={() => prefs.toggleMark(card.id)}
          homograph={homographs.has(card.nl)}
          also={also(card)}
          onAnswer={(rating) => {
            answer(rating);
            next();
          }}
        />
      )}
    </>
  );
}
