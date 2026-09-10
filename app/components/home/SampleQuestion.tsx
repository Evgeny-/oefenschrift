import React, { useState } from 'react';
import { useStudyContext } from '../../StudyContext';
import { evidenceFor } from '../../domain/text';
import { typeLabel } from '../../domain/labels';
import { EvidenceText } from '../TextEvidence';
import AppLink from '../AppLink';

// One real reading question, answered on the spot: the quickest way to show that every
// answer is explained by pointing at the text. Nothing here is recorded.
export default function SampleQuestion() {
  const { state, t, catalogue, practiceSets, startSet } = useStudyContext(),
    level = state.settings.level;
  const item = catalogue
    .filter((i) => i.part === 'reading' && i.level === level && i.questions?.length && i.text)
    .sort((a, b) => a.text.length - b.text.length)[0];
  const [chosen, setChosen] = useState(''),
    [checked, setChecked] = useState(false);
  if (!item) return null;
  const q = item.questions[0],
    evidence = checked ? evidenceFor(item, q) : [],
    type = typeLabel(item.taskType || item.type, state.settings.lang),
    set = practiceSets.find((s) => s.ids.includes(item.id));
  return (
    <section className="home-section home-sample">
      <h2>{t('Probeer een vraag', 'Try a question')}</h2>
      <div className="exercise-columns">
        <section aria-label={t('Tekst', 'Text')}>
          <div className="sheet">
            {type && <span className="sheet-label">{type}</span>}
            <div className="passage" lang="nl">
              <EvidenceText text={item.text} quotes={evidence} />
            </div>
          </div>
        </section>
        <section className="question">
          <fieldset>
            <legend lang="nl">{q.prompt}</legend>
            {Object.entries<string>(q.options).map(([value, label]) => (
              <label
                className={`answer-option ${checked && value === q.answer ? 'answer-correct' : checked && value === chosen ? 'answer-wrong' : ''}`}
                key={value}
              >
                <input
                  type="radio"
                  name="sample-answer"
                  value={value}
                  checked={chosen === value}
                  disabled={checked}
                  onChange={() => setChosen(value)}
                />
                <span className="answer-letter" aria-hidden="true">
                  {value}
                </span>
                <span lang="nl">{label}</span>
              </label>
            ))}
          </fieldset>
          {checked && (
            <div
              className={`answer-feedback ${chosen === q.answer ? 'correct' : ''}`}
              role="status"
            >
              <strong>
                {chosen === q.answer
                  ? t('Goed antwoord', 'Correct answer')
                  : t('Niet helemaal', 'Not quite')}
              </strong>
              <p lang="nl">{q.explanation}</p>
              <p className="small">
                {t(
                  'De zin die het bewijst is gemarkeerd in de tekst. Zo werkt elke vraag.',
                  'The sentence that proves it is marked in the text. Every question works this way.',
                )}
              </p>
            </div>
          )}
          <div className="actions">
            {!checked ? (
              <button className="primary" disabled={!chosen} onClick={() => setChecked(true)}>
                {t('Controleer antwoord', 'Check answer')}
              </button>
            ) : set ? (
              <AppLink
                className="primary"
                data-set={set.id}
                to={`set/${set.id}`}
                onNavigate={() => startSet(set)}
              >
                {t('Verder oefenen', 'Keep practising')} · {t('Oefenset', 'Practice set')}{' '}
                {set.number}
              </AppLink>
            ) : null}
          </div>
        </section>
      </div>
    </section>
  );
}
