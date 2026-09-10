import React from 'react';
import { useStudyContext } from '../StudyContext';
import { flatten, elapsed, formatMinutes, complete, retrySession } from '../domain/study';
import { skillLabel } from '../domain/labels';
import IssueReport from './IssueReport';
import { EvidenceText } from './TextEvidence';
import { evidenceFor } from '../domain/text';
import { Heading } from './ExerciseHeader';

export function PracticeActions({ mistakes = 0 }) {
  const { state, setState, catalogue, practiceSet, practiceSets, startSet, start, open, go, t } =
      useStudyContext(),
    a = state.active;
  const item = catalogue.find((item) => item.id === a.ids[0]);
  const nextSet =
    practiceSet &&
    practiceSets.find(
      (set) =>
        set.part === practiceSet.part &&
        set.level === practiceSet.level &&
        set.number === practiceSet.number + 1,
    );
  const siblings = catalogue.filter(
    (i) => i.part === item.part && (item.part === 'knm' || i.level === item.level),
  );
  const nextItem =
    !practiceSet && a.mode === 'practice'
      ? siblings[siblings.findIndex((i) => i.id === item.id) + 1]
      : null;
  // A focused retry stays on the same URL; the first full result is kept.
  const retry = a.mode === 'practice' && mistakes > 0;
  return (
    <div className="actions">
      {retry && (
        <button
          className="primary"
          data-action="retry-mistakes"
          onClick={() => setState((s) => ({ ...s, active: retrySession(s.active, catalogue) }))}
        >
          {mistakes === 1
            ? t('Herhaal alleen de fout', 'Retry the mistake')
            : t(`Herhaal alleen de ${mistakes} fouten`, `Retry only the ${mistakes} mistakes`)}
        </button>
      )}
      <button
        className={retry ? 'secondary' : 'primary'}
        data-action="continue-practice"
        onClick={() =>
          nextSet
            ? startSet(nextSet)
            : nextItem
              ? open(nextItem)
              : go(a.mode === 'mock' ? 'mock' : item.part)
        }
      >
        {nextSet
          ? t('Volgende set', 'Next set')
          : nextItem
            ? t('Volgende oefening', 'Next exercise')
            : t('Terug naar overzicht', 'Back to overview')}
      </button>
      <button
        className={retry ? 'text-button' : 'secondary'}
        data-action="restart"
        onClick={() => (practiceSet ? startSet(practiceSet, true) : start(a.ids, a.mode))}
      >
        {t('Opnieuw oefenen', 'Try again')}
      </button>
    </div>
  );
}
export function OpenSetResults() {
  const { state, catalogue, t, practiceSet, go } = useStudyContext(),
    a = state.active;
  return (
    <>
      <Heading
        title={t('Set afgerond', 'Set complete')}
        subtitle={`${t('Oefenset', 'Practice set')} ${practiceSet.number}`}
      />
      <div className="result-total">
        <strong>
          {a.ids.length}
          <span> / {a.ids.length}</span>
        </strong>
        <span>{t('oefeningen nagekeken', 'exercises reviewed')}</span>
      </div>
      <ul className="exercise-list">
        {a.ids.map((id) => (
          <li key={id}>
            <button className="exercise-entry" onClick={() => go(`exercise/${id}`)}>
              <span className="exercise-entry-copy" lang="nl">
                {catalogue.find((i) => i.id === id).title}
              </span>
              <span className="exercise-status">✓</span>
            </button>
          </li>
        ))}
      </ul>
      <PracticeActions />
    </>
  );
}

export function Results() {
  const { state, catalogue, t, practiceSet } = useStudyContext(),
    a = state.active,
    questions = flatten(a, catalogue),
    right = questions.filter((x) => x.q.answer === a.answers[x.key]).length,
    lang = state.settings.lang;
  const missed = questions.filter((x) => x.q.answer !== a.answers[x.key]);
  // Group by reviewed skill; questions without one fall back to their exercise.
  const groups = [];
  for (const x of missed) {
    const label = skillLabel(x.q.skill, lang) || x.item.title;
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(x);
    else groups.push({ label, items: [x] });
  }
  const texts =
    a.ids.length > 1
      ? a.ids
          .map((id) => ({
            item: catalogue.find((i) => i.id === id),
            qs: questions.filter((x) => x.item.id === id),
          }))
          .filter((x) => x.qs.length)
      : [];
  const review = ({ item, q, key }, i) => (
    <details key={key}>
      <summary>
        <span
          aria-label={
            a.answers[key] === q.answer ? t('Goed', 'Correct') : t('Onjuist', 'Incorrect')
          }
        >
          {a.answers[key] === q.answer ? '✓' : '×'}
        </span>
        <span lang="nl">
          {i + 1}. {q.prompt}
        </span>
      </summary>
      <div className="review-answer">
        <p>
          {t('Jouw antwoord', 'Your answer')}: <span lang="nl">{q.options[a.answers[key]]}</span>
        </p>
        {a.answers[key] !== q.answer && (
          <p>
            {t('Goed antwoord', 'Correct answer')}: <span lang="nl">{q.options[q.answer]}</span>
          </p>
        )}
        <p lang="nl">{q.explanation}</p>
        {evidenceFor(item, q).length > 0 && (
          <p className="review-evidence" lang="nl">
            <EvidenceText text={evidenceFor(item, q).join(' ')} quotes={evidenceFor(item, q)} />
          </p>
        )}
        <IssueReport item={item} questionId={q.id} />
      </div>
    </details>
  );
  return (
    <>
      <Heading
        title={
          a.questions
            ? t('Herhaling afgerond', 'Retry complete')
            : practiceSet
              ? t('Set afgerond', 'Set complete')
              : t('Oefening afgerond', 'Practice complete')
        }
        subtitle={
          practiceSet ? `${t('Oefenset', 'Practice set')} ${practiceSet.number}` : undefined
        }
      />
      <div className="result-layout">
        <div className="result-summary">
          <div className="result-total">
            <strong>
              {right}
              <span> / {questions.length}</span>
            </strong>
            <div>
              {t('antwoorden goed', 'correct answers')}
              <p className="small">
                {t('Oefentijd', 'Practice time')}: {formatMinutes(elapsed(a), lang)}
              </p>
            </div>
          </div>
          {texts.length > 0 && (
            <ul className="result-texts">
              {texts.map(({ item, qs }) => (
                <li key={item.id}>
                  <span lang="nl">{item.title}</span>
                  <span>
                    {qs.filter((x) => x.q.answer === a.answers[x.key]).length} / {qs.length}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <section className="result-mistakes">
          <h2>
            {missed.length
              ? t('Wat ging er mis', 'What went wrong')
              : t('Alles goed', 'All correct')}
          </h2>
          {missed.length ? (
            <p className="small">
              {t(
                'Gegroepeerd op vaardigheid, zodat je ziet welk soort vraag lastig is.',
                'Grouped by skill, so you can see which kind of question is hard.',
              )}
            </p>
          ) : (
            <p className="small">
              {t('Elke vraag is goed beantwoord.', 'Every question was answered correctly.')}
            </p>
          )}
          {groups.map((group) => (
            <div className="mistake-group" key={group.label}>
              <h3 lang={skillLabel(group.items[0].q.skill, lang) ? undefined : 'nl'}>
                {group.label}
              </h3>
              {group.items.map(({ item, q, key }) => (
                <div className="mistake" key={key}>
                  {group.label !== item.title && a.ids.length > 1 && (
                    <p className="small mistake-source" lang="nl">
                      {item.title}
                    </p>
                  )}
                  <p className="mistake-prompt" lang="nl">
                    {q.prompt}
                  </p>
                  <dl className="mistake-answers">
                    <dt>{t('Jouw antwoord', 'Your answer')}</dt>
                    <dd lang="nl">
                      <del>{q.options[a.answers[key]]}</del>
                    </dd>
                    <dt>{t('Goed antwoord', 'Correct answer')}</dt>
                    <dd lang="nl">{q.options[q.answer]}</dd>
                    {evidenceFor(item, q).length > 0 && (
                      <>
                        <dt>{t('In de tekst', 'In the text')}</dt>
                        <dd lang="nl">
                          <EvidenceText
                            text={evidenceFor(item, q).join(' ')}
                            quotes={evidenceFor(item, q)}
                          />
                        </dd>
                      </>
                    )}
                  </dl>
                  <p className="small" lang="nl">
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </section>
        <div className="result-actions">
          <PracticeActions mistakes={missed.length} />
          <details className="result-review">
            <summary>
              {t(
                `Alle ${questions.length} vragen bekijken`,
                `Review all ${questions.length} questions`,
              )}
            </summary>
            <div className="result-review-list">{questions.map(review)}</div>
          </details>
        </div>
      </div>
    </>
  );
}
