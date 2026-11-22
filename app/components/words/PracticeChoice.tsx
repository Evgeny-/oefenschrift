import React, { useMemo } from 'react';
import { useStudyContext } from '../../StudyContext';
import { Chevron, Segments } from '../Controls';
import AppLink from '../AppLink';
import { WordIcon } from './WordIcons';
import { modeCards, type WordPrefsApi } from './useWordPrefs';
import {
  groupBySlug,
  MY_LIST,
  PRACTICE,
  WORD_GROUPS,
  wordPath,
  type WordEntry,
} from '../../domain/words';
import {
  isLearned,
  LEVEL_POOLS,
  CARD_MODES,
  modeEntries,
  MY_PRACTICE,
  practicePool,
  practiceSearch,
  practiceStats,
  today,
  type PracticeMode,
} from '../../domain/word-practice';

export const dutch = { lang: 'nl', translate: 'no' } as const;
export const practicePath = wordPath(PRACTICE);
export const countWords = (count: number, t) =>
  `${count} ${count === 1 ? t('woord', 'word') : t('woorden', 'words')}`;

export function usePoolName() {
  const { t } = useStudyContext();
  return (key: string) => {
    const names = {
      'my-practice': t('Mijn oefening', 'My practice'),
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
// The mode as a name, in the switch and above a round.
export function useModeName() {
  const { t } = useStudyContext();
  return (mode: PracticeMode) =>
    ({
      mix: t('Mix', 'Mix'),
      'nl-en': t('Nederlands → Engels', 'Dutch → English'),
      'en-nl': t('Engels → Nederlands', 'English → Dutch'),
      'de-het': t('De of het', 'De or het'),
    })[mode];
}

function PoolLink({ to, mode, title, detail, aside = undefined, className = '', icon = to }) {
  return (
    <AppLink
      className={`words-group ${className}`}
      to={practicePath}
      search={practiceSearch(mode, to)}
    >
      <span className="words-icon" data-icon={to}>
        {(LEVEL_POOLS as readonly string[]).includes(to) ? (
          <span className="words-level">{to.toUpperCase()}</span>
        ) : (
          <WordIcon name={icon} />
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

// /words/practice without a list: how to practise, then what.
export default function Choice({
  entries,
  prefs,
  status,
  mode,
}: {
  entries: WordEntry[] | null;
  prefs: WordPrefsApi;
  status: React.ReactNode;
  mode: PracticeMode;
}) {
  const { t, state, go } = useStudyContext(),
    name = usePoolName(),
    modeName = useModeName(),
    day = today(),
    cards = useMemo(() => modeCards(prefs.prefs, mode), [prefs.prefs, mode]);
  const usable = useMemo(() => (entries ? modeEntries(mode, entries) : null), [entries, mode]);
  const known = useMemo(
    () => (usable ? new Set<string>(usable.map((e: WordEntry) => e.id)) : null),
    [usable],
  );
  const pools = useMemo(() => {
    if (!usable) return null;
    const pool = (key: string) =>
      practicePool(key, usable, cards, prefs.prefs.marked, day, state.settings.level) || [];
    const progress = (key: string) => {
      const list = pool(key);
      return { total: list.length, learned: list.filter((e) => isLearned(cards[e.id])).length };
    };
    return { pool, progress };
  }, [usable, cards, prefs.prefs.marked, day, state.settings.level]);
  const stats = known ? practiceStats(cards, day, known) : null,
    byId = useMemo(() => new Map((usable || []).map((e: WordEntry) => [e.id, e])), [usable]);
  const detail = ({ total, learned }) =>
    learned
      ? t(`${learned} van ${total} geleerd`, `${learned} of ${total} learned`)
      : countWords(total, t);
  const level = String(state.settings.level || '').toLowerCase();
  // The figures stay in every mode once anything is practised, with that mode's numbers,
  // so switching never makes the row come and go.
  const practisedAny = CARD_MODES.some(
    (each) => Object.keys(modeCards(prefs.prefs, each)).length > 0,
  );
  return (
    <>
      <div className="heading">
        <h1 tabIndex={-1}>{t('Woorden oefenen', 'Practise words')}</h1>
        <p>
          {t(
            'Oefen met kaartjes: van Nederlands naar Engels, van Engels naar Nederlands en de of het, of alles door elkaar. Wat je lastig vindt, komt vaker terug.',
            'Practise with flashcards: Dutch to English, English to Dutch and de or het, or all mixed. What you find hard comes back more often.',
          )}
        </p>
      </div>
      <div className="practice-modes">
        <Segments
          label={t('Hoe oefenen', 'How to practise')}
          hideLabel
          value={mode}
          onChange={(next: PracticeMode) => go(practicePath, undefined, practiceSearch(next))}
          options={[
            { value: 'mix', label: modeName('mix') },
            { value: 'nl-en', label: 'NL → EN', ariaLabel: modeName('nl-en') },
            { value: 'en-nl', label: 'EN → NL', ariaLabel: modeName('en-nl') },
            { value: 'de-het', label: t('De of het', 'De or het') },
          ]}
        />
      </div>
      {status ||
        (pools && stats && (
          <>
            {practisedAny && (
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
                to={MY_PRACTICE}
                icon="practice"
                mode={mode}
                className="words-card"
                title={name(MY_PRACTICE)}
                detail={
                  stats.due
                    ? t(
                        `${stats.due} herhalen en nieuwe woorden`,
                        `${stats.due} to review and new words`,
                      )
                    : t(
                        ...((
                          {
                            A1: ['Nieuwe A1-woorden', 'New A1 words'],
                            B1: ['Nieuwe A2- en B1-woorden', 'New A2 and B1 words'],
                          } as Record<string, [string, string]>
                        )[state.settings.level] || ['Nieuwe A2-woorden', 'New A2 words']),
                      )
                }
              />
              <PoolLink
                to="mistakes"
                mode={mode}
                className="words-card"
                title={name('mistakes')}
                detail={stats.mistakes ? countWords(stats.mistakes, t) : t('Nog geen', 'None yet')}
              />
              <PoolLink
                to={MY_LIST}
                mode={mode}
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
                      mode={mode}
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
                {WORD_GROUPS.filter((g) => g.slug !== MY_LIST).map((group) => {
                  const progress = pools.progress(group.slug);
                  // De or het leaves out the lists without nouns (verbs, small words).
                  return progress.total ? (
                    <li key={group.slug}>
                      <PoolLink
                        to={group.slug}
                        mode={mode}
                        title={t(group.nl, group.en)}
                        detail={detail(progress)}
                      />
                    </li>
                  ) : null;
                })}
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
