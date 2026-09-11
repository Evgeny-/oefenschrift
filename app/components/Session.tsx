import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { flatten, complete } from '../domain/study';
import { typeLabel } from '../domain/labels';
import { track } from '../domain/telemetry';
import AudioPlayer from './AudioPlayer';
import { EvidenceText } from './TextEvidence';
import { evidenceFor } from '../domain/text';
import { KeyHint, PlayIcon, ClipButton } from './Controls';
import { mediaUrl } from '../domain/base';
import { Back, ExerciseHeader, Heading, sessionTimer } from './ExerciseHeader';
import { Results } from './Results';
import { useAnswerKeys } from './keys';

export function Session({ onComplete = undefined }: { onComplete?: () => void }) {
  const { state, setState, updateSession, catalogue, t, name, start, practiceSet } =
    useStudyContext();
  const a = state.active;
  if (!a)
    return (
      <>
        <Back part="reading" />
        <Heading title={t('Geen actieve oefening', 'No active exercise')} />
      </>
    );
  if (a.endedAt) return <Results />;
  const questions = flatten(a, catalogue),
    { item, q, key } = questions[a.index],
    chosen = a.answers[key],
    checked = !!a.checked[key],
    // The practice test and the level check both hold the explanation until the end.
    mock = a.mode !== 'practice';
  const select = (value) =>
    updateSession((a) => ({ ...a, answers: { ...a.answers, [key]: value } }));
  const record = () =>
    track({
      kind: 'answer',
      item: item.id,
      question: q.id,
      selected: chosen,
      mode: a.mode === 'check' ? 'check' : a.questions ? 'retry' : a.mode,
      lang: state.settings.lang,
      level: state.settings.level,
    });
  const check = () => {
    record();
    updateSession((a) => ({ ...a, checked: { ...a.checked, [key]: true } }));
  };
  // A clip's transcript stays hidden until every question on that clip has been checked,
  // so reading it can never answer a later question about the same audio.
  const clipOf = (x) => x.q.audio || x.item.audio || null;
  const clipDone =
    !!clipOf(questions[a.index]) &&
    questions
      .filter((x) => clipOf(x) === clipOf(questions[a.index]))
      .every((x) => a.checked[x.key]);
  const next = () => {
    if (mock) record();
    if (a.index === questions.length - 1) {
      setState((s) => complete(s, catalogue));
      onComplete?.();
    } else updateSession((a) => ({ ...a, index: a.index + 1 }));
  };
  return (
    <>
      <ExerciseHeader
        item={item}
        timer={sessionTimer(a, setState)}
        questionId={q.id}
        tag={
          a.mode === 'mock'
            ? t('Proefexamen', 'Practice test')
            : a.mode === 'check'
              ? t('Niveaucheck', 'Level check')
              : null
        }
      />
      <div className="session-position">
        <span>
          {t('Vraag', 'Question')} {a.index + 1} {t('van', 'of')} {questions.length}
        </span>
        <progress
          className="session-progress"
          value={a.index + (checked ? 1 : 0)}
          max={questions.length}
          aria-label={t('Voortgang', 'Progress')}
        />
      </div>
      <QuestionColumns
        questionKey={key}
        item={item}
        q={q}
        chosen={chosen}
        checked={checked}
        clipDone={clipDone}
        mock={mock}
        first={a.index === 0}
        last={a.index === questions.length - 1}
        select={select}
        check={check}
        next={next}
        previous={() => updateSession((s) => ({ ...s, index: s.index - 1 }))}
      />
    </>
  );
}

// A B1 reading text has paragraphs and subheadings: a short line without end punctuation is a heading.
function Paragraphs({ text, quotes }) {
  const blocks = String(text).split(/\n\n+/);
  return blocks.map((block, i) => {
    const heading =
      i < blocks.length - 1 &&
      block.trim().split(/\s+/).length <= 8 &&
      !/[.!?:;,…]$/.test(block.trim());
    return heading ? (
      <p className="subheading" key={i}>
        <EvidenceText text={block} quotes={quotes} />
      </p>
    ) : (
      <p key={i}>
        <EvidenceText text={block} quotes={quotes} />
      </p>
    );
  });
}
// The official A2 listening and KNM players read the question aloud; a small button replays it.
export function QuestionColumns({
  questionKey,
  item,
  q,
  chosen,
  checked,
  clipDone = false,
  mock,
  first,
  last,
  select,
  check,
  next,
  previous,
  shortcuts = true,
  finishLabel = undefined,
}) {
  const { t, state } = useStudyContext(),
    evidence = checked && !mock ? evidenceFor(item, q) : [];
  useAnswerKeys({
    options: q.options,
    chosen,
    checked,
    mock,
    select,
    check,
    next,
    enabled: shortcuts,
  });
  const type = typeLabel(item.taskType, state.settings.lang);
  // Blueprint items carry the exam's situation line; the standard instruction follows it, as in the official player.
  const situation = item.situation && (
    <div className="situation" lang="nl">
      <p>{item.situation}</p>
      {item.intro ? (
        // A B1 listening text opens with the narrator's introduction; every fragment keeps it in view.
        <p className="intro">
          {item.intro}
          {item.introAudio && (
            <ClipButton
              key={item.introAudio}
              src={item.introAudio}
              playLabel={t('Inleiding beluisteren', 'Listen to the introduction')}
              pauseLabel={t('Inleiding pauzeren', 'Pause introduction')}
            />
          )}
        </p>
      ) : item.exam === 'nt2-i' ? null : (
        // The DUO A2 player prints this line under the situation; the Staatsexamen does not.
        <p className="instruction">
          {item.part === 'listening'
            ? 'Lees eerst de vraag. Luister daarna naar de tekst.'
            : 'Lees eerst de vraag. Lees daarna de tekst.'}
        </p>
      )}
    </div>
  );
  // A B1 listening question carries its own fragment; an A2 text is one clip for all its questions.
  const clip = q.audio ? q : item;
  const fact = item.part === 'knm' && item.taskType === 'feit';
  const pictures =
    Array.isArray(item.images) && item.images.some((i) => i?.file) ? (
      <div className="pictures" data-count={item.images.filter((i) => i?.file).length}>
        {item.images
          .filter((i) => i?.file)
          .map((i) => (
            <figure key={i.file} className="picture">
              <img src={mediaUrl(i.file)} alt={i.alt || ''} loading="lazy" />
            </figure>
          ))}
      </div>
    ) : null;
  return (
    <div className="exercise-columns">
      <section aria-label={t('Opgave', 'Task')}>
        {situation}
        {/* Listening leads with the player; a picture supports the clip rather than the other way round. */}
        {clip.audio ? (
          <>
            <AudioPlayer
              key={clip.audio}
              source={clip}
              t={t}
              transcript={!mock && clipDone}
              evidence={evidence}
            />
            {pictures}
          </>
        ) : fact ? (
          // KNM in the July 2025 format: the picture carries the question; the fact appears after the answer.
          <>
            {pictures}
            {checked && !mock ? (
              <div className="sheet fact-sheet">
                <span className="sheet-label">{t('Feit', 'Fact')}</span>
                <div className="passage" lang="nl">
                  <EvidenceText text={item.text} quotes={evidence} />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            {pictures}
            <div className="sheet">
              {type && <span className="sheet-label">{type}</span>}
              <div className="passage" lang="nl">
                {item.level === 'B1' && item.part === 'reading' ? (
                  <Paragraphs text={item.text} quotes={evidence} />
                ) : (
                  <EvidenceText text={item.text} quotes={evidence} />
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <section className="question" key={questionKey}>
        <fieldset>
          <legend lang="nl">
            {q.prompt}
            {q.questionAudio && (
              <ClipButton
                key={q.questionAudio}
                src={q.questionAudio}
                playLabel={t('Vraag beluisteren', 'Listen to the question')}
                pauseLabel={t('Vraag pauzeren', 'Pause question')}
              />
            )}
          </legend>
          {Object.entries<string>(q.options).map(([value, label]) => (
            <label
              className={`answer-option ${checked && value === q.answer ? 'answer-correct' : checked && value === chosen ? 'answer-wrong' : ''}`}
              key={value}
            >
              <input
                type="radio"
                name="answer"
                value={value}
                checked={chosen === value}
                onChange={() => select(value)}
                disabled={checked}
              />
              <span className="answer-letter" aria-hidden="true">
                {value}
              </span>
              <span lang="nl">{label}</span>
              {checked && value === q.answer && (
                <span className="sr-only">{t('Goed antwoord', 'Correct answer')}</span>
              )}
            </label>
          ))}
        </fieldset>
        {checked && (
          <div className={`answer-feedback ${chosen === q.answer ? 'correct' : ''}`} role="status">
            <strong>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {chosen === q.answer ? (
                  <path d="m5 12 4 4L19 6" />
                ) : (
                  <path d="m6 6 12 12M18 6 6 18" />
                )}
              </svg>
              {chosen === q.answer
                ? t('Goed antwoord', 'Correct answer')
                : t('Niet helemaal', 'Not quite')}
            </strong>
            <p lang="nl">{q.explanation}</p>
          </div>
        )}
        <div className="actions">
          {!first && (
            <button className="secondary" onClick={previous}>
              {t('Vorige', 'Previous')}
            </button>
          )}
          {!mock && !checked ? (
            <button className="primary" disabled={!chosen} onClick={check}>
              {t('Controleer antwoord', 'Check answer')}
              {shortcuts && <KeyHint />}
            </button>
          ) : (
            <button className="primary" disabled={!chosen} onClick={next}>
              {last ? finishLabel || t('Afronden', 'Finish') : t('Volgende', 'Next')}
              {shortcuts && <KeyHint />}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
