import React, { useMemo } from 'react';
import { useStudyContext } from '../../StudyContext';
import AppLink from '../AppLink';
import { WordIcon } from './WordIcons';
import useWordPrefs, { modeCards, useDictionary } from './useWordPrefs';
import { useModeName } from './PracticeChoice';
import {
  isLearned,
  LEVEL_POOLS,
  practicePool,
  practiceStats,
  MY_PRACTICE,
  practiceSearch,
  today,
  type PracticeMode,
} from '../../domain/word-practice';
import { PRACTICE, wordPath } from '../../domain/words';

// The words part of Voortgang: what the flashcards have done so far, read from the same
// browser storage as the word lists. Each level row shows the words practised (light) and,
// on top, the words learned (solid), so a first day of practice shows on the bars although
// learning a word takes several days.
export default function WordProgress() {
  const { profile, t } = useStudyContext(),
    modeName = useModeName(),
    prefs = useWordPrefs(profile),
    cards = prefs.prefs.cards,
    day = today(),
    practised = Object.keys(cards).length,
    dictionary = useDictionary(practised > 0);
  const levels = useMemo(
    () =>
      dictionary.entries &&
      LEVEL_POOLS.map((key) => {
        const pool = practicePool(key, dictionary.entries!, cards, [], day) || [];
        return {
          key,
          total: pool.length,
          practised: pool.filter((entry) => cards[entry.id]).length,
          learned: pool.filter((entry) => isLearned(cards[entry.id])).length,
        };
      }),
    [dictionary.entries, cards, day],
  );
  if (!prefs.loaded) return null;
  const stats = practiceStats(cards, day);
  // The other two modes keep their own cards; one line says how far they are.
  const others = (['en-nl', 'de-het'] as PracticeMode[])
    .map((mode) => ({ mode, stats: practiceStats(modeCards(prefs.prefs, mode), day) }))
    .filter(({ stats }) => stats.practised > 0);
  const share = (part: number, total: number) => `${total ? (part / total) * 100 : 0}%`;
  return (
    <section className="progress-words" aria-labelledby="progress-words-title">
      <h2 id="progress-words-title">{t('Woorden', 'Words')}</h2>
      {practised || others.length ? (
        <>
          <p className="practice-stats" hidden={!practised}>
            <span>
              <strong>{stats.learned}</strong> {t('geleerd', 'learned')}
            </span>
            <span>
              <strong>{stats.practised}</strong> {t('geoefend', 'practised')}
            </span>
            <span>
              <strong>{stats.due}</strong> {t('te herhalen vandaag', 'to review today')}
            </span>
            <span>
              <strong>{stats.mistakes}</strong> {t('fouten om te herhalen', 'mistakes to redo')}
            </span>
          </p>
          {practised > 0 && levels && (
            <>
              <div className="progress-subjects">
                {levels.map(({ key, total, practised, learned }) => {
                  const label = t(`${key.toUpperCase()}-woorden`, `${key.toUpperCase()} words`);
                  return (
                    <div key={key}>
                      <span>{label}</span>
                      <span
                        className="word-bar"
                        role="img"
                        aria-label={t(
                          `${label}: ${practised} geoefend, ${learned} geleerd, van ${total}`,
                          `${label}: ${practised} practised, ${learned} learned, of ${total}`,
                        )}
                      >
                        <span
                          className="word-bar-practised"
                          style={{ width: share(practised, total) }}
                        />
                        <span
                          className="word-bar-learned"
                          style={{ width: share(learned, total) }}
                        />
                      </span>
                      <span>
                        {practised}/{total}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="word-bar-legend">
                <span>
                  <span className="word-bar-key word-bar-learned" aria-hidden="true" />
                  {t(
                    'geleerd: drie keer na elkaar goed, op verschillende dagen',
                    'learned: right three times in a row, on different days',
                  )}
                </span>
                <span>
                  <span className="word-bar-key word-bar-practised" aria-hidden="true" />
                  {t('geoefend', 'practised')}
                </span>
              </p>
            </>
          )}
          {others.length > 0 && (
            <p className="progress-word-modes">
              {others.map(({ mode, stats }) => (
                <span key={mode}>
                  {modeName(mode)}: {stats.practised} {t('geoefend', 'practised')}, {stats.learned}{' '}
                  {t('geleerd', 'learned')}
                </span>
              ))}
            </p>
          )}
        </>
      ) : (
        <p className="note">
          {t(
            'Nog geen woorden geoefend. Met de kaartjes leer je elke dag een paar woorden.',
            'No words practised yet. The flashcards teach you a few words a day.',
          )}
        </p>
      )}
      {/* Words to review go straight to My practice; otherwise to the choice. */}
      <AppLink
        className="secondary"
        to={wordPath(PRACTICE)}
        search={stats.due ? practiceSearch('mix', MY_PRACTICE) : ''}
      >
        <WordIcon name="practice" size={18} />
        {stats.due
          ? t(`Herhaal ${stats.due} woorden`, `Review ${stats.due} words`)
          : t('Woorden oefenen', 'Practise words')}
      </AppLink>
    </section>
  );
}
