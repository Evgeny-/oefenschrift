import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { flatten, complete } from '../domain/study';
import { typeLabel } from '../domain/labels';
import { track } from '../domain/telemetry';
import AudioPlayer from './AudioPlayer';
import { EvidenceText } from './TextEvidence';
import { evidenceFor } from '../domain/text';
import { KeyHint, PlayIcon } from './Controls';
import { Back, ExerciseHeader, Heading, sessionTimer } from './ExerciseHeader';
import { Results } from './Results';
import { useAnswerKeys } from './keys';

export function Session() {
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
    mock = a.mode === 'mock';
  const select = (value) =>
    updateSession((a) => ({ ...a, answers: { ...a.answers, [key]: value } }));
  const record = () =>
    track({
      kind: 'answer',
      item: item.id,
      question: q.id,
      selected: chosen,
      mode: a.questions ? 'retry' : a.mode,
      lang: state.settings.lang,
      level: state.settings.level,
    });
  const check = () => {
    record();
    updateSession((a) => ({ ...a, checked: { ...a.checked, [key]: true } }));
  };
  const next = () => {
    if (mock) record();
    if (a.index === questions.length - 1) setState((s) => complete(s, catalogue));
    else updateSession((a) => ({ ...a, index: a.index + 1 }));
  };
  return (
    <>
      <ExerciseHeader item={item} timer={sessionTimer(a, setState)} questionId={q.id} mock={mock} />
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

// The official A2 listening and KNM players read the question aloud; a small button replays it.
function QuestionAudio({ src, t }) {
  const audio = useRef<HTMLAudioElement>(null),
    [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = audio.current;
    return () => el?.pause();
  }, []);
  const toggle = async () => {
    try {
      const el = audio.current;
      if (el.paused) await el.play();
      else el.pause();
    } catch {
      setPlaying(false);
    }
  };
  return (
    <span className="question-audio">
      <audio
        ref={audio}
        src={`/${src.replace(/^\//, '')}`}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        className="play-button play-button-small"
        onClick={toggle}
        aria-label={
          playing
            ? t('Vraag pauzeren', 'Pause question')
            : t('Vraag beluisteren', 'Listen to the question')
        }
      >
        <PlayIcon playing={playing} />
      </button>
    </span>
  );
}
function QuestionColumns({
  questionKey,
  item,
  q,
  chosen,
  checked,
  mock,
  first,
  last,
  select,
  check,
  next,
  previous,
}) {
  const { t, state } = useStudyContext(),
    [collapsed, setCollapsed] = useState(false),
    evidence = checked && !mock ? evidenceFor(item, q) : [];
  useEffect(() => setCollapsed(false), [questionKey]);
  useAnswerKeys({ options: q.options, chosen, checked, mock, select, check, next });
  const type = typeLabel(item.taskType || item.type, state.settings.lang);
  // Blueprint items carry the exam's situation line; the standard instruction follows it, as in the official player.
  const situation = item.situation && (
    <div className="situation" lang="nl">
      <p>{item.situation}</p>
      <p className="instruction">
        {item.part === 'listening'
          ? 'Lees eerst de vraag. Luister daarna naar de tekst.'
          : 'Lees eerst de vraag. Lees daarna de tekst.'}
      </p>
    </div>
  );
  const pictures =
    Array.isArray(item.images) && item.images.some((i) => i?.file) ? (
      <div className="pictures" data-count={item.images.filter((i) => i?.file).length}>
        {item.images
          .filter((i) => i?.file)
          .map((i) => (
            <figure key={i.file} className="picture">
              <img src={`/${String(i.file).replace(/^\//, '')}`} alt={i.alt || ''} loading="lazy" />
            </figure>
          ))}
      </div>
    ) : null;
  return (
    <div className="exercise-columns" data-sheet={collapsed ? 'collapsed' : 'open'}>
      <section aria-label={t('Opgave', 'Task')}>
        {situation}
        {pictures}
        {item.audio ? (
          <AudioPlayer
            key={item.id}
            item={item}
            t={t}
            transcript={!mock && checked}
            evidence={evidence}
          />
        ) : (
          <div className="sheet">
            {type && <span className="sheet-label">{type}</span>}
            <div className="passage" lang="nl">
              <EvidenceText text={item.text} quotes={evidence} />
            </div>
          </div>
        )}
      </section>
      <section
        className="question question-sheet"
        key={questionKey}
        data-collapsed={collapsed || undefined}
      >
        <button
          type="button"
          className="sheet-toggle"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((value) => !value)}
        >
          <span className="sheet-handle" aria-hidden="true" />
          <span>
            {collapsed ? t('Vraag tonen', 'Show question') : t('Tekst tonen', 'Show text')}
          </span>
        </button>
        <fieldset>
          <legend lang="nl">
            {q.prompt}
            {q.questionAudio && <QuestionAudio key={q.questionAudio} src={q.questionAudio} t={t} />}
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
              <KeyHint />
            </button>
          ) : (
            <button className="primary" disabled={!chosen} onClick={next}>
              {last ? t('Afronden', 'Finish') : t('Volgende', 'Next')}
              <KeyHint />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
