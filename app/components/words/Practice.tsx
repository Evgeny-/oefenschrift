import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../../StudyContext';
import AppLink from '../AppLink';
import { allCards, modeCards, useDictionary, type WordPrefsApi } from './useWordPrefs';
import Choice, { practicePath, useModeName, usePoolName } from './PracticeChoice';
import { ArticleCard, FlashCard } from './PracticeCards';
import { track } from '../../domain/telemetry';
import type { WordEntry } from '../../domain/words';
import {
  buildMixRound,
  buildRound,
  MIN_NEW,
  modeEntries,
  MY_PRACTICE,
  practiceMode,
  practicePool,
  practiceSearch,
  ROUND_SIZE,
  sameMeaning,
  today,
  type PracticeCard,
  type PracticeMode,
  type Rating,
} from '../../domain/word-practice';

// /words/practice: a choice of how and what to practise, or with ?list= a round of cards.
// ?mode= picks Dutch → English, English → Dutch or de or het; without it the round mixes them.
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
  const { t, state } = useStudyContext(),
    level = state.settings.level,
    name = usePoolName(),
    modeName = useModeName(),
    day = useMemo(() => today(), []),
    cards = useMemo(() => modeCards(prefs.prefs, mode), [prefs.prefs, mode]),
    back = practiceSearch(mode);
  // The round is drawn once, when the words and the saved cards are both in.
  const [queue, setQueue] = useState<PracticeCard[] | null>(null),
    // The words drawn; a missed word comes back once after them, so the queue grows.
    [size, setSize] = useState(0),
    [early, setEarly] = useState(false),
    [position, setPosition] = useState(0),
    [tally, setTally] = useState({ again: 0, good: 0, easy: 0 }),
    [repeated, setRepeated] = useState<Set<string>>(() => new Set()),
    [last, setLast] = useState<(PracticeCard & { rating: Rating }) | null>(null),
    [round, setRound] = useState(1);
  const usable = useMemo(() => (entries ? modeEntries(mode, entries) : null), [entries, mode]);
  const pool = useMemo(
    () =>
      usable && prefs.loaded
        ? practicePool(poolKey, usable, cards, prefs.prefs.marked, day, level)
        : undefined,
    [usable, prefs.loaded, poolKey, round],
  );
  // One mode's round asks every card that way; Mix picks the way per card.
  const draw = (from: WordEntry[]) => {
    const minNew = poolKey === MY_PRACTICE ? MIN_NEW : 0;
    if (mode === 'mix')
      return buildMixRound(
        from,
        allCards(prefs.prefs),
        poolKey,
        day,
        ROUND_SIZE,
        Math.random,
        minNew,
      );
    const drawn = buildRound(from, cards, day, ROUND_SIZE, Math.random, minNew);
    return { ...drawn, words: drawn.words.map((entry) => ({ entry, mode })) };
  };
  useEffect(() => {
    if (!pool) return;
    const drawn = draw(pool);
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
    const id = `${card.mode}:${card.entry.id}`;
    prefs.rateWord(card.entry.id, rating, day, card.mode);
    // An anonymous event for the operator's statistics: the word, the way, the answer.
    track({
      kind: 'word',
      item: card.entry.id,
      mode: card.mode,
      selected: rating,
      list: poolKey,
      lang: state.settings.lang,
      level,
    });
    setTally((n) => ({ ...n, [rating]: n[rating] + 1 }));
    setLast({ ...card, rating });
    if (rating === 'again' && !repeated.has(id)) {
      setQueue([...queue, card]);
      setRepeated(new Set(repeated).add(id));
    }
  };
  const next = () => setPosition((p) => p + 1);
  const heading = (
    <div className="heading practice-heading">
      <div>
        <h1 tabIndex={-1}>{name(poolKey)}</h1>
        <p className="practice-mode-name">
          {mode === 'mix' && card ? `${modeName('mix')} · ${modeName(card.mode)}` : modeName(mode)}
        </p>
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
    const more = pool ? draw(pool) : null,
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
      {/* De or het confirms a right answer above the next card; the line keeps its height. */}
      {mode !== 'nl-en' && mode !== 'en-nl' && (
        <p className="practice-last" role="status">
          {last?.mode === 'de-het' && last.rating === 'good' && (
            <>
              <span className="practice-last-mark" aria-hidden="true">
                ✓
              </span>{' '}
              {t('Goed:', 'Right:')}{' '}
              <span lang="nl" translate="no">
                {last.entry.article} {last.entry.nl}
              </span>
            </>
          )}
        </p>
      )}
      {card.mode === 'de-het' ? (
        <ArticleCard key={position} entry={card.entry} onAnswer={answer} onNext={next} />
      ) : (
        <FlashCard
          key={position}
          entry={card.entry}
          mode={card.mode}
          marked={prefs.prefs.marked.includes(card.entry.id)}
          onMark={() => prefs.toggleMark(card.entry.id)}
          homograph={homographs.has(card.entry.nl)}
          also={also(card.entry)}
          onAnswer={(rating) => {
            answer(rating);
            next();
          }}
        />
      )}
    </>
  );
}
