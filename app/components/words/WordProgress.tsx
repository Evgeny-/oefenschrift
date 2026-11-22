import React, { useMemo } from 'react';
import { useStudyContext } from '../../StudyContext';
import AppLink from '../AppLink';
import { WordIcon } from './WordIcons';
import useWordPrefs, { useDictionary } from './useWordPrefs';
import {
  isLearned,
  LEVEL_POOLS,
  practicePool,
  practiceStats,
  today,
} from '../../domain/word-practice';
import { PRACTICE, wordPath } from '../../domain/words';

// The words part of Voortgang: what the flashcards have done so far, read from the same
// browser storage as the word lists, with the learned words per level as the subject rows.
export default function WordProgress() {
  const { profile, t } = useStudyContext(),
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
          learned: pool.filter((entry) => isLearned(cards[entry.id])).length,
        };
      }),
    [dictionary.entries, cards, day],
  );
  if (!prefs.loaded) return null;
  const stats = practiceStats(cards, day);
  return (
    <section className="progress-words" aria-labelledby="progress-words-title">
      <h2 id="progress-words-title">{t('Woorden', 'Words')}</h2>
      {practised ? (
        <>
          <p className="practice-stats">
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
          {levels && (
            <div className="progress-subjects">
              {levels.map(({ key, total, learned }) => {
                const label = t(`${key.toUpperCase()}-woorden`, `${key.toUpperCase()} words`);
                return (
                  <div key={key}>
                    <span>{label}</span>
                    <progress
                      max={total || 1}
                      value={learned}
                      aria-label={`${label}: ${t('geleerd', 'learned')}`}
                    />
                    <span>
                      {learned}/{total}
                    </span>
                  </div>
                );
              })}
            </div>
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
      <AppLink className="secondary" to={wordPath(PRACTICE)}>
        <WordIcon name="practice" size={18} />
        {stats.due
          ? t(`Herhaal ${stats.due} woorden`, `Review ${stats.due} words`)
          : t('Woorden oefenen', 'Practise words')}
      </AppLink>
    </section>
  );
}
