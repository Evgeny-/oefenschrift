import React from 'react';
import { useLocation } from 'react-router';
import { useStudyContext } from '../StudyContext';
import { elapsed, formatMinutes } from '../domain/study';
import {
  checkAvailability,
  checkInProgress,
  checkSummary,
  latestCheck,
  startCheck,
} from '../domain/check';
import { unitLabel } from '../domain/labels';
import AppLink from './AppLink';
import { Chevron, KeyHint, ProgressRing } from './Controls';
import { Heading } from './ExerciseHeader';
import { Session } from './Session';
import { Mistake, QuestionReview } from './Results';
import { useEnterAction } from './keys';

export function checkDate(session, lang) {
  return new Date(session.endedAt || session.startedAt).toLocaleDateString(
    lang === 'nl' ? 'nl-NL' : 'en-GB',
    { day: 'numeric', month: 'long' },
  );
}
// One line with the counts per subject, used wherever a finished check is listed.
export function checkLine(session, catalogue, t, name) {
  const s = checkSummary(session, catalogue);
  return `${s.correct} ${t('van', 'of')} ${s.total} ${t('goed', 'correct')} · ${s.parts
    .map((p) => `${name(p.part)} ${p.correct}/${p.total}`)
    .join(' · ')}`;
}
// The level check: an intro until it starts, then the question flow; the result has its own page.
export function LevelCheck() {
  const { state, setState, catalogue, t, name, go } = useStudyContext(),
    level = state.settings.level,
    lang = state.settings.lang,
    active = checkInProgress(state);
  const plan = checkAvailability(catalogue, level),
    latest = latestCheck(state, level);
  const start = () => {
    const session = startCheck(catalogue, level, state.records);
    if (session) setState((s) => ({ ...s, active: session }));
  };
  useEnterAction(!active && plan.enough, start);
  if (active) return <Session onComplete={() => go('check-result')} />;
  return (
    <>
      <Heading
        title={`${t('Niveaucheck', 'Level check')} ${level}`}
        subtitle={t(
          'Tien vragen over lezen en luisteren. Daarna zie je per onderdeel hoe je scoort en waar je het best begint.',
          'Ten questions across reading and listening. Afterwards you see how you score per subject and where to begin.',
        )}
      />
      {plan.enough ? (
        <>
          <ul className="check-plan">
            {plan.parts.map((entry) => (
              <li key={entry.part}>
                <span>{name(entry.part)}</span>
                <span>
                  {entry.items} {unitLabel(entry.part, entry.items, lang)} · {entry.questions}{' '}
                  {entry.questions === 1 ? t('vraag', 'question') : t('vragen', 'questions')}
                </span>
              </li>
            ))}
            <li>
              <span>{t('Tijd', 'Time')}</span>
              <span>{t('ongeveer 10 minuten, geen limiet', 'about 10 minutes, no limit')}</span>
            </li>
          </ul>
          <div className="actions">
            <button className="primary" data-action="start-check" onClick={start}>
              {t('Start de check', 'Start the check')}
              <KeyHint />
            </button>
          </div>
          <p className="note">
            {t(
              'Tussendoor zie je geen uitleg; die krijg je bij het resultaat, per vraag. Stop je eerder, dan ga je later verder waar je was.',
              'No explanations along the way; they come with the result, per question. Stop early and you continue later where you were.',
            )}
          </p>
          <p className="note">
            {t(
              'KNM staat los van je taalniveau en zit niet in de check. Schrijven en spreken oefen je apart, met feedback per punt.',
              'KNM is separate from your language level and not part of the check. Practise writing and speaking separately, with feedback per point.',
            )}
          </p>
        </>
      ) : (
        <p className="note">
          {t(
            'Op dit niveau is nog te weinig materiaal voor een check.',
            'There is not enough material at this level for a check yet.',
          )}
        </p>
      )}
      {latest && (
        <ul className="exercise-list check-history check-last">
          <li>
            <AppLink className="exercise-entry" data-check={latest.startedAt} to="check-result">
              <span className="exercise-entry-copy">
                <strong>
                  {t('Je laatste check', 'Your last check')} · {checkDate(latest, lang)}
                </strong>
                <small>{checkLine(latest, catalogue, t, name)}</small>
              </span>
              <span className="exercise-status">{t('Resultaat', 'Result')}</span>
              <Chevron />
            </AppLink>
          </li>
        </ul>
      )}
    </>
  );
}
export function CheckResult() {
  const { state, catalogue, practiceSets, t, name, go, startSet } = useStudyContext(),
    level = state.settings.level,
    lang = state.settings.lang,
    at = Number(new URLSearchParams(useLocation().search).get('at')) || undefined,
    session = latestCheck(state, level, at);
  if (!session)
    return (
      <>
        <Heading
          title={t('Nog geen niveaucheck', 'No level check yet')}
          subtitle={t(
            `Doe de check op ${level} om te zien waar je het best begint.`,
            `Take the ${level} check to see where to begin.`,
          )}
        />
        <div className="actions">
          <AppLink className="primary" to="check">
            {t('Naar de niveaucheck', 'To the level check')}
          </AppLink>
        </div>
      </>
    );
  const s = checkSummary(session, catalogue);
  // The next step: the first unfinished set of the weakest subject, else its catalogue.
  const nextSet =
    s.weakest &&
    practiceSets.find(
      (set) =>
        set.part === s.weakest.part &&
        set.level === level &&
        !set.ids.every((id) => state.records[id]?.completed),
    );
  const groups = s.parts
    .map((entry) => ({ ...entry, items: s.missed.filter((x) => x.item.part === entry.part) }))
    .filter((entry) => entry.items.length);
  return (
    <>
      <Heading
        title={`${t('Je niveaucheck', 'Your level check')} ${level}`}
        subtitle={`${checkDate(session, lang)} · ${t(
          'Tien vragen over lezen en luisteren.',
          'Ten questions across reading and listening.',
        )}`}
      />
      <div className="result-layout">
        <div className="result-summary">
          <div className="result-total">
            <strong>
              {s.correct}
              <span> / {s.total}</span>
            </strong>
            <div>
              {t('antwoorden goed', 'correct answers')}
              <p className="small">
                {t('Oefentijd', 'Practice time')}: {formatMinutes(elapsed(session), lang)}
              </p>
            </div>
          </div>
          <ul className="check-skills">
            {s.parts.map((entry) => (
              <li key={entry.part} data-part={entry.part}>
                <ProgressRing
                  value={entry.correct}
                  max={entry.total}
                  label={`${entry.correct}/${entry.total}`}
                />
                <span className="check-skill-copy">
                  <strong>{name(entry.part)}</strong>
                  <small>
                    {entry.correct} {t('van', 'of')} {entry.total} {t('goed', 'correct')}
                  </small>
                </span>
              </li>
            ))}
          </ul>
          <div className="check-advice">
            <h2>{t('Waar begin je?', 'Where do you begin?')}</h2>
            <p>
              {s.weakest
                ? t(
                    `${name(s.weakest.part)} ging het minst goed: ${s.weakest.correct} van ${s.weakest.total}. Begin daar${s.second ? `; ${name(s.second.part).toLowerCase()} komt daarna` : ''}.`,
                    `${name(s.weakest.part)} went least well: ${s.weakest.correct} of ${s.weakest.total}. Begin there${s.second ? `; ${name(s.second.part).toLowerCase()} comes next` : ''}.`,
                  )
                : t(
                    'Alles goed. Kies een onderdeel om te oefenen, of doe het proefexamen.',
                    'All correct. Pick a subject to practise, or take the practice test.',
                  )}
            </p>
            <div className="actions">
              {s.weakest ? (
                nextSet ? (
                  <AppLink
                    className="primary"
                    data-set={nextSet.id}
                    to={`set/${nextSet.id}`}
                    onNavigate={() => startSet(nextSet)}
                  >
                    {t('Begin met', 'Start with')} {name(nextSet.part)} · {t('set', 'set')}{' '}
                    {nextSet.number}
                  </AppLink>
                ) : (
                  <AppLink className="primary" to={s.weakest.part}>
                    {t('Naar', 'To')} {name(s.weakest.part)}
                  </AppLink>
                )
              ) : (
                <AppLink className="primary" to="mock">
                  {t('Naar het proefexamen', 'To the practice test')}
                </AppLink>
              )}
              <AppLink className="text-button" to="check">
                {t('Check later opnieuw doen', 'Do the check again later')}
              </AppLink>
            </div>
            <p className="small">
              {t(
                'Een oefencheck van tien vragen, geen voorspelling van je examenuitslag.',
                'A ten-question practice check, not a prediction of your exam result.',
              )}
            </p>
          </div>
        </div>
        <section className="result-mistakes">
          <h2>
            {s.missed.length
              ? t('Wat ging er mis', 'What went wrong')
              : t('Alles goed', 'All correct')}
          </h2>
          <p className="small">
            {s.missed.length
              ? t(
                  'Per onderdeel, met de zin die het bewijst.',
                  'Per subject, with the sentence that proves it.',
                )
              : t('Elke vraag is goed beantwoord.', 'Every question was answered correctly.')}
          </p>
          {groups.map((group) => (
            <div className="mistake-group" key={group.part}>
              <h3>{name(group.part)}</h3>
              {group.items.map((entry) => (
                <Mistake
                  key={entry.key}
                  session={session}
                  entry={entry}
                  source={entry.item.title}
                />
              ))}
            </div>
          ))}
        </section>
        <div className="result-actions">
          <details className="result-review">
            <summary>
              {t(`Alle ${s.total} vragen bekijken`, `Review all ${s.total} questions`)}
            </summary>
            <div className="result-review-list">
              {s.questions.map((entry, i) => (
                <QuestionReview key={entry.key} session={session} entry={entry} index={i} />
              ))}
            </div>
          </details>
        </div>
      </div>
    </>
  );
}
