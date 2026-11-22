import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../../StudyContext';
import { Chevron, KeyHint } from '../Controls';
import AppLink from '../AppLink';
import { MarkIcon } from './WordRows';
import { WordIcon } from './WordIcons';
import { useDictionary, type WordPrefsApi } from './useWordPrefs';
import {
  groupBySlug,
  MY_LIST,
  perfect,
  PRACTICE,
  WORD_GROUPS,
  wordType,
  wordPath,
  type WordEntry,
} from '../../domain/words';
import { presentTense } from '../../domain/present';
import {
  buildRound,
  isLearned,
  LEVEL_POOLS,
  practicePool,
  practiceStats,
  today,
  type Rating,
} from '../../domain/word-practice';

const dutch = { lang: 'nl', translate: 'no' } as const;
const words = (count: number, t) =>
  `${count} ${count === 1 ? t('woord', 'word') : t('woorden', 'words')}`;
const practicePath = wordPath(PRACTICE);
const search = (key: string) => `?list=${encodeURIComponent(key)}`;

// /words/practice: a choice of what to practise, or with ?list= a round of cards.
export default function Practice({ prefs }: { prefs: WordPrefsApi }) {
  const { t } = useStudyContext(),
    location = useLocation(),
    key = new URLSearchParams(location.search).get('list'),
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
    <Round key={key} poolKey={key} entries={dictionary.entries} prefs={prefs} status={status} />
  ) : (
    <Choice entries={dictionary.entries} prefs={prefs} status={status} />
  );
}

function usePoolName() {
  const { t } = useStudyContext();
  return (key: string) => {
    const names = {
      review: t('Herhalen', 'Review'),
      mistakes: t('Mijn fouten', 'My mistakes'),
      a1: t('Woorden van A1', 'A1 words'),
      a2: t('Woorden van A2', 'A2 words'),
      b1: t('Woorden voor B1', 'Words for B1'),
    };
    if (names[key]) return names[key];
    const group = groupBySlug(key);
    return group ? t(group.nl, group.en) : key;
  };
}

function PoolLink({ to, title, detail, aside = undefined, className = '' }) {
  return (
    <AppLink className={`words-group ${className}`} to={practicePath} search={search(to)}>
      <span className="words-icon" data-icon={to}>
        {(LEVEL_POOLS as readonly string[]).includes(to) ? (
          <span className="words-level">{to.toUpperCase()}</span>
        ) : (
          <WordIcon name={to} />
        )}
      </span>
      <span className="words-group-copy">
        <span className="words-group-name">{title}</span>
        <span className="words-group-detail">{detail}</span>
      </span>
      {aside !== undefined ? <span className="words-group-count">{aside}</span> : <span />}
      <Chevron />
    </AppLink>
  );
}

function Choice({ entries, prefs, status }) {
  const { t, state } = useStudyContext(),
    name = usePoolName(),
    day = today(),
    cards = prefs.prefs.cards;
  const known = useMemo(
    () => (entries ? new Set<string>(entries.map((e: WordEntry) => e.id)) : null),
    [entries],
  );
  const pools = useMemo(() => {
    if (!entries) return null;
    const pool = (key: string) => practicePool(key, entries, cards, prefs.prefs.marked, day) || [];
    const progress = (key: string) => {
      const list = pool(key);
      return { total: list.length, learned: list.filter((e) => isLearned(cards[e.id])).length };
    };
    return { pool, progress };
  }, [entries, cards, prefs.prefs.marked, day]);
  const stats = known ? practiceStats(cards, day, known) : null,
    byId = useMemo(() => new Map((entries || []).map((e: WordEntry) => [e.id, e])), [entries]);
  const detail = ({ total, learned }) =>
    learned
      ? t(`${learned} van ${total} geleerd`, `${learned} of ${total} learned`)
      : words(total, t);
  const level = String(state.settings.level || '').toLowerCase();
  return (
    <>
      <div className="heading">
        <h1 tabIndex={-1}>{t('Woorden oefenen', 'Practise words')}</h1>
        <p>
          {t(
            'Bekijk het woord, bedenk wat het betekent en draai het kaartje om. Wat je lastig vindt, komt vaker terug.',
            'See the word, think of what it means and turn the card. What you find hard comes back more often.',
          )}
        </p>
      </div>
      {status ||
        (pools && stats && (
          <>
            {stats.practised > 0 && (
              <p className="practice-stats">
                <span>
                  <strong>{stats.due}</strong> {t('te herhalen vandaag', 'to review today')}
                </span>
                <span>
                  <strong>{stats.learned}</strong> {t('geleerd', 'learned')}
                </span>
                <span>
                  <strong>{stats.practised}</strong> {t('geoefend', 'practised')}
                </span>
              </p>
            )}
            <div className="words-start practice-start">
              <PoolLink
                to="review"
                className="words-card"
                title={name('review')}
                detail={
                  stats.due
                    ? `${words(stats.due, t)} ${t('voor vandaag', 'for today')}`
                    : t('Niets voor vandaag', 'Nothing for today')
                }
              />
              <PoolLink
                to="mistakes"
                className="words-card"
                title={name('mistakes')}
                detail={stats.mistakes ? words(stats.mistakes, t) : t('Nog geen', 'None yet')}
              />
              <PoolLink
                to={MY_LIST}
                className="words-card"
                title={t('Mijn lijst', 'My list')}
                detail={detail(pools.progress(MY_LIST))}
              />
            </div>
            <section className="words-section">
              <h2>{t('Op niveau', 'By level')}</h2>
              <ul className="words-groups">
                {LEVEL_POOLS.map((key) => (
                  <li key={key}>
                    <PoolLink
                      to={key}
                      title={
                        <>
                          {name(key)}
                          {key === level && (
                            <span className="practice-yours">{t('jouw niveau', 'your level')}</span>
                          )}
                        </>
                      }
                      detail={
                        {
                          a1: t(
                            'De woorden van de A1-oefeningen',
                            'The words the A1 exercises use',
                          ),
                          a2: t('Wat er op A2 bij komt', 'What A2 adds'),
                          b1: t(
                            'Veelgebruikte woorden buiten de A2-lijst',
                            'Common words beyond the A2 list',
                          ),
                        }[key]
                      }
                      aside={detail(pools.progress(key))}
                    />
                  </li>
                ))}
              </ul>
            </section>
            <section className="words-section">
              <h2>{t('Per lijst', 'By list')}</h2>
              <ul className="words-groups">
                {WORD_GROUPS.filter((g) => g.slug !== MY_LIST).map((group) => (
                  <li key={group.slug}>
                    <PoolLink
                      to={group.slug}
                      title={t(group.nl, group.en)}
                      detail={detail(pools.progress(group.slug))}
                    />
                  </li>
                ))}
              </ul>
            </section>
            {stats.hardest.length > 0 && (
              <section className="words-section">
                <h2>{t('Lastigste woorden', 'Hardest words')}</h2>
                <ul className="practice-hardest">
                  {stats.hardest.map((id) => {
                    const entry = byId.get(id) as WordEntry;
                    return (
                      <li key={id}>
                        <span className="word-nl" {...dutch}>
                          {entry.article && <span className="word-article">{entry.article} </span>}
                          {entry.nl}
                        </span>
                        <span lang="en">{entry.en}</span>
                        <span className="practice-misses">
                          {t(`${cards[id].misses}× opnieuw`, `${cards[id].misses}× again`)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </>
        ))}
    </>
  );
}

// The back of a card: the meaning, the forms a learner needs and the example.
function Answer({ entry }: { entry: WordEntry }) {
  const { t } = useStudyContext();
  const forms: [string, React.ReactNode][] = [];
  if (entry.verb) {
    forms.push([
      t('Nu', 'Present'),
      presentTense(entry.nl, entry.verb).map(([pronoun, form], i) => (
        <React.Fragment key={pronoun}>
          {i > 0 && ' · '}
          <span className="word-pronoun">{pronoun}</span> {form}
        </React.Fragment>
      )),
    ]);
    forms.push([
      t('Verleden tijd', 'Past'),
      entry.verb.pastPlural && entry.verb.pastPlural !== entry.verb.past
        ? `${entry.verb.past} · ${entry.verb.pastPlural}`
        : entry.verb.past,
    ]);
    if (entry.verb.participle) forms.push([t('Voltooid', 'Perfect'), perfect(entry.verb)]);
  } else if (entry.pos === 'noun' && entry.plural)
    forms.push([t('Meervoud', 'Plural'), entry.plural]);
  else if (entry.forms) forms.push([t('Vormen', 'Forms'), entry.forms]);
  return (
    <div className="practice-answer">
      <p className="practice-en" lang="en">
        {entry.en}
      </p>
      <div className="practice-details">
        {forms.length > 0 && (
          <dl className="practice-forms">
            {forms.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd {...dutch}>{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <blockquote className="practice-example">
          <p {...dutch}>{entry.ex}</p>
          <p className="word-example-en" lang="en">
            {entry.exEn}
          </p>
        </blockquote>
        {entry.note && (
          <p className="practice-note" lang="en">
            {entry.note}
          </p>
        )}
      </div>
    </div>
  );
}

function Round({ poolKey, entries, prefs, status }) {
  const { t } = useStudyContext(),
    name = usePoolName(),
    day = useMemo(() => today(), []);
  // The round is drawn once, when the words and the saved cards are both in.
  const [queue, setQueue] = useState<WordEntry[] | null>(null),
    [early, setEarly] = useState(false),
    [position, setPosition] = useState(0),
    [shown, setShown] = useState(false),
    [tally, setTally] = useState({ again: 0, good: 0, easy: 0 }),
    [repeated, setRepeated] = useState<Set<string>>(() => new Set()),
    [round, setRound] = useState(1);
  const pool = useMemo(
    () =>
      entries && prefs.loaded
        ? practicePool(poolKey, entries, prefs.prefs.cards, prefs.prefs.marked, day)
        : undefined,
    [entries, prefs.loaded, poolKey, round],
  );
  useEffect(() => {
    if (!pool) return;
    const drawn = buildRound(pool, prefs.prefs.cards, day);
    setQueue(drawn.words);
    setEarly(drawn.early);
    setPosition(0);
    setShown(false);
    setTally({ again: 0, good: 0, easy: 0 });
    setRepeated(new Set());
  }, [pool]);
  // A spelling with two entries (zijn: to be, and his) says which one the card means.
  const homographs = useMemo(() => {
    const seen = new Set<string>(),
      twice = new Set<string>();
    for (const entry of (entries || []) as WordEntry[])
      (seen.has(entry.nl) ? twice : seen).add(entry.nl);
    return twice;
  }, [entries]);
  const showButton = useRef<HTMLButtonElement>(null),
    goodButton = useRef<HTMLButtonElement>(null);
  const card = queue?.[position];
  useEffect(() => {
    (shown ? goodButton : showButton).current?.focus({ preventScroll: true });
  }, [shown, position]);
  const answer = (rating: Rating) => {
    if (!card || !queue) return;
    prefs.rateWord(card.id, rating, day);
    setTally((n) => ({ ...n, [rating]: n[rating] + 1 }));
    // A missed word comes back once at the end of the round.
    if (rating === 'again' && !repeated.has(card.id)) {
      setQueue([...queue, card]);
      setRepeated(new Set(repeated).add(card.id));
    }
    setShown(false);
    setPosition((p) => p + 1);
  };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || !card) return;
      const ratings: Record<string, Rating> = { '1': 'again', '2': 'good', '3': 'easy' };
      // Enter or Space turns the card unless a control has focus and will act on the key itself.
      const onControl = (event.target as HTMLElement)?.closest?.('button, a, input');
      if (!shown && (event.key === ' ' || event.key === 'Enter') && !onControl) {
        event.preventDefault();
        setShown(true);
      } else if (shown && ratings[event.key]) {
        event.preventDefault();
        answer(ratings[event.key]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const title = name(poolKey);
  const heading = (
    <div className="heading practice-heading">
      <h1 tabIndex={-1}>{title}</h1>
      {card && (
        <AppLink className="practice-stop" to={practicePath}>
          {t('Stoppen', 'Stop')}
        </AppLink>
      )}
    </div>
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
          <AppLink className="secondary" to={practicePath}>
            {t('Iets anders oefenen', 'Practise something else')}
          </AppLink>
        </div>
      </>
    );
  if (!card) {
    const more = pool ? buildRound(pool, prefs.prefs.cards, day) : null;
    return (
      <>
        {heading}
        <div className="practice-done" role="status">
          <h2>{t('Klaar!', 'Done!')}</h2>
          <p>
            {t(
              `${tally.good + tally.easy} keer goed, ${tally.again} keer opnieuw.`,
              `${tally.good + tally.easy} right, ${tally.again} again.`,
            )}{' '}
            {tally.again > 0 &&
              t(
                'De woorden die je nog niet wist, komen morgen terug.',
                'The words you did not know yet come back tomorrow.',
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
            <AppLink className="secondary" to={practicePath}>
              {t('Iets anders oefenen', 'Practise something else')}
            </AppLink>
          </div>
        </div>
      </>
    );
  }
  const marked = prefs.prefs.marked.includes(card.id);
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
      <div className="practice-progress">
        <span>
          {Math.min(position + 1, queue.length)} / {queue.length}
        </span>
        <span className="practice-bar" aria-hidden="true">
          <span style={{ width: `${(position / queue.length) * 100}%` }} />
        </span>
      </div>
      <section
        className="practice-card"
        aria-label={t('Kaartje', 'Card')}
        data-shown={shown || undefined}
      >
        <button
          type="button"
          className="word-mark practice-mark"
          aria-pressed={marked}
          aria-label={`${t('Ken ik niet', 'Don’t know yet')}: ${card.nl}`}
          title={
            marked ? t('Op Mijn lijst', 'On My list') : t('Zet op Mijn lijst', 'Add to My list')
          }
          onClick={() => prefs.toggleMark(card.id)}
        >
          <MarkIcon />
        </button>
        <p className="practice-word" {...dutch}>
          {card.article && <span className="word-article">{card.article} </span>}
          {card.nl}
        </p>
        {homographs.has(card.nl) && <p className="practice-type">{t(...wordType(card))}</p>}
        {shown ? (
          <Answer entry={card} />
        ) : (
          <button
            type="button"
            className="primary practice-show"
            ref={showButton}
            onClick={() => setShown(true)}
          >
            {t('Laat zien', 'Show')}
            <KeyHint />
          </button>
        )}
      </section>
      {shown && (
        <div
          className="practice-rating"
          role="group"
          aria-label={t('Hoe ging het?', 'How did it go?')}
        >
          <button type="button" className="secondary" onClick={() => answer('again')}>
            <strong>
              {t('Opnieuw', 'Again')}
              <KeyHint label="1" />
            </strong>
            <small>{t('morgen weer', 'tomorrow')}</small>
          </button>
          <button type="button" className="primary" ref={goodButton} onClick={() => answer('good')}>
            <strong>
              {t('Ken ik', 'Got it')}
              <KeyHint label="2" />
            </strong>
            <small>{t('later weer', 'space it out')}</small>
          </button>
          <button type="button" className="secondary" onClick={() => answer('easy')}>
            <strong>
              {t('Te makkelijk', 'Too easy')}
              <KeyHint label="3" />
            </strong>
            <small>{t('niet meer', 'don’t repeat')}</small>
          </button>
        </div>
      )}
    </>
  );
}
