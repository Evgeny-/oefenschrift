import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import {
  flatten,
  elapsed,
  addElapsed,
  formatMinutes,
  complete,
  reviewOpen,
  retrySession,
} from '../domain/study';
import { skillLabel, typeLabel } from '../domain/labels';
import { track, visitorId } from '../domain/telemetry';
import SpeakingRecorder from './SpeakingRecorder';
import IssueReport from './IssueReport';
import AudioPlayer from './AudioPlayer';
import { EvidenceText, AnswerDiff } from './TextEvidence';
import { evidenceFor } from '../domain/text';
import starters from '../../content/hints/sentence-starters.json';
import { FeedbackInfo, KeyHint, PlayIcon } from './Controls';
import { localizeFeedback } from '../domain/feedback';
export function Heading({ title, subtitle = undefined, dutch = false }) {
  return (
    <div className="heading">
      <h1 tabIndex={-1} lang={dutch ? 'nl' : undefined}>
        {title}
      </h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
export function Back({ part }) {
  const { go, t } = useStudyContext();
  return (
    <button className="back" onClick={() => go(part)}>
      ← {t('Terug naar overzicht', 'Back to overview')}
    </button>
  );
}
// Counts seconds while the exercise is on screen and the tab is visible. Whole
// seconds are folded into saved state every few seconds and when the view leaves,
// so a reload or a day away never adds time.
function useActiveSeconds(saved: number, persist: (delta: number) => void, ended: boolean) {
  const [, rerender] = useState(0),
    persistRef = useRef(persist);
  persistRef.current = persist;
  const counter = useRef({ base: saved, running: 0, flushed: 0 });
  const c = counter.current;
  // Saved seconds arriving from elsewhere (browser data restored after hydration) rebase the count.
  if (saved !== c.base + c.flushed) {
    c.running -= c.flushed;
    c.flushed = 0;
    c.base = saved;
  }
  useEffect(() => {
    if (ended) return;
    let last = Date.now();
    const tick = () => {
      const now = Date.now();
      if (!document.hidden) c.running += (now - last) / 1000;
      last = now;
      rerender((n) => n + 1);
    };
    const flush = () => {
      const delta = Math.floor(c.running) - c.flushed;
      if (delta > 0) {
        c.flushed += delta;
        persistRef.current(delta);
      }
    };
    const interval = setInterval(() => {
      tick();
      if (Math.floor(c.running) - c.flushed >= 5) flush();
    }, 1000);
    const visibility = () => {
      tick();
      if (document.hidden) flush();
    };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('pagehide', flush);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pagehide', flush);
      tick();
      flush();
    };
  }, [ended]);
  return ended ? saved : c.base + c.running;
}
export function Clock({ timer }) {
  const { state, setting, t } = useStudyContext(),
    seconds = useActiveSeconds(timer.saved, timer.persist, timer.ended);
  return (
    <div className="session-clock">
      <button
        className="clock-button"
        aria-pressed={state.settings.clock}
        aria-label={
          state.settings.clock
            ? t('Tijd verbergen', 'Hide elapsed time')
            : t('Tijd tonen', 'Show elapsed time')
        }
        title={
          state.settings.clock
            ? t('Tijd verbergen', 'Hide elapsed time')
            : t('Tijd tonen', 'Show elapsed time')
        }
        onClick={() => setting('clock', !state.settings.clock)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 2" />
        </svg>
        <span className="elapsed">
          {state.settings.clock ? formatMinutes(seconds, state.settings.lang) : '—'}
        </span>
      </button>
    </div>
  );
}
function ExerciseHeader({ item, timer, questionId = null, mock = false }) {
  const { state, t, name } = useStudyContext(),
    type =
      (item.taskType || item.type) && item.type !== 'audio'
        ? typeLabel(item.taskType || item.type, state.settings.lang)
        : null;
  const subtitle =
    (item.part === 'knm' ? 'KNM' : `${item.level} · ${name(item.part)}`) +
    (type ? ` · ${type}` : '');
  return (
    <div className="exercise-heading">
      <Heading title={item.title} dutch />
      <div className="exercise-meta">
        <p>{subtitle + (mock ? ' · ' + t('Proefexamen', 'Practice test') : '')}</p>
        <div className="exercise-tools">
          <Clock timer={timer} />
          <IssueReport key={`${item.id}/${questionId || ''}`} item={item} questionId={questionId} />
        </div>
      </div>
    </div>
  );
}
// The session's identity travels with the timer, so seconds flushed while a
// different set is already active still reach the session they belong to.
function sessionTimer(session, setState) {
  const identity = { setId: session.setId, startedAt: session.startedAt };
  return {
    saved: elapsed(session),
    persist: (delta) => setState((s) => addElapsed(s, identity, delta)),
    ended: !!session.endedAt,
  };
}
export function PracticeSet() {
  const { state, catalogue } = useStudyContext(),
    a = state.active;
  const first = catalogue.find((item) => item.id === a.ids[0]);
  if (first.questions) return <Session />;
  if (a.endedAt) return <OpenSetResults />;
  return (
    <OpenExercise
      key={a.ids[a.index]}
      item={catalogue.find((item) => item.id === a.ids[a.index])}
    />
  );
}
function PracticeActions({ mistakes = 0 }) {
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
function OpenSetResults() {
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
// Shortcuts never interfere with typing, dialogs or a focused control's own Enter.
function shortcutTarget(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return null;
  const target = event.target as HTMLElement | null;
  if (
    target?.closest(
      'textarea, select, [contenteditable="true"], [role="dialog"], input:not([type="radio"]):not([type="checkbox"])',
    )
  )
    return null;
  return target;
}
// Enter runs the primary action of a view, such as continuing after feedback.
function useEnterAction(enabled: boolean, action: () => void) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      const target = shortcutTarget(event);
      if (target === null || event.key !== 'Enter' || target?.closest('button, a, summary')) return;
      event.preventDefault();
      action();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, action]);
}
// Answer keys (A, B, C) and 1, 2, 3 select an option; Enter checks or continues.
function useAnswerKeys({ options, chosen, checked, mock, select, check, next }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = shortcutTarget(event);
      if (target === null) return;
      const keys = Object.keys(options),
        option = /^[1-9]$/.test(event.key)
          ? keys[Number(event.key) - 1]
          : keys.find((k) => k.toLowerCase() === event.key.toLowerCase());
      if (option) {
        if (!checked) {
          event.preventDefault();
          select(option);
        }
        return;
      }
      if (event.key === 'Enter' && chosen && !target?.closest('button, a, summary')) {
        event.preventDefault();
        if (!mock && !checked) check();
        else next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [options, chosen, checked, mock, select, check, next]);
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
export function OpenExercise({ item }) {
  const { state, setState, t, name, go, api, practiceSet, ready } = useStudyContext(),
    [rawResult, setResult] = useState(null),
    [busy, setBusy] = useState(false),
    [captureBusy, setCaptureBusy] = useState(false),
    [error, setError] = useState(''),
    [submitted, setSubmitted] = useState(''),
    [showAnswer, setShowAnswer] = useState(!!state.drafts[item.id]),
    [selfReview, setSelfReview] = useState(false),
    [waitSeconds, setWaitSeconds] = useState(0),
    request = useRef(null),
    feedbackHeading = useRef(null);
  const result = localizeFeedback(rawResult, state.settings.lang);
  const timer = practiceSet
    ? sessionTimer(state.active, setState)
    : {
        saved: state.timers[item.id] || 0,
        persist: (delta) => setState((s) => addElapsed(s, { itemId: item.id }, delta)),
        ended: false,
      };
  const draft = state.drafts[item.id] || '',
    speaking = item.part === 'speaking',
    checks = state.reviews[item.id] || [],
    reviewing = !!result || selfReview;
  useEffect(() => {
    if (ready && state.drafts[item.id]) setShowAnswer(true);
  }, [ready]);
  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (!busy) return;
    setWaitSeconds(0);
    const timer = setInterval(() => setWaitSeconds((n) => n + 1), 1000);
    return () => clearInterval(timer);
  }, [busy]);
  useEffect(() => {
    if (reviewing) feedbackHeading.current?.focus({ preventScroll: false });
  }, [reviewing]);
  function setDraft(value) {
    request.current?.abort();
    setBusy(false);
    setState((s) => ({
      ...s,
      drafts: { ...s.drafts, [item.id]: value },
      reviews: { ...s.reviews, [item.id]: [] },
    }));
    setResult(null);
    setSelfReview(false);
    setError('');
  }
  async function assess() {
    const controller = new AbortController();
    request.current?.abort();
    request.current = controller;
    setBusy(true);
    setError('');
    setSelfReview(false);
    setSubmitted(draft);
    const timeout = setTimeout(() => controller.abort('timeout'), 50000);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          answer: draft,
          lang: state.settings.lang,
          speech_confirmed: true,
          visitor: visitorId(),
        }),
        signal: controller.signal,
      });
      const body = await response.json();
      if (!response.ok) throw Error(body.error || 'Feedback unavailable');
      if (!controller.signal.aborted) setResult(body);
    } catch (e) {
      if (!controller.signal.aborted || controller.signal.reason === 'timeout')
        setError(
          t(
            'Feedback ophalen lukt niet. Je antwoord is bewaard. Probeer opnieuw.',
            'Feedback could not be loaded. Your answer is saved. Please retry.',
          ),
        );
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }
  const reviewed = () => {
    track({
      kind: 'review',
      item: item.id,
      mode: result ? 'ai' : 'self',
      lang: state.settings.lang,
      level: state.settings.level,
    });
    setState((s) => reviewOpen(s, item.id, result ? 'ai' : 'self', !!practiceSet));
    if (!practiceSet) go(item.part);
  };
  useEnterAction(reviewing, reviewed);
  return (
    <>
      <ExerciseHeader item={item} timer={timer} />
      <div className="exercise-columns open-columns">
        <section className="task-brief sheet">
          <span className="sheet-label">{t('Opdracht', 'Task')}</span>
          <p className="passage" lang="nl">
            {item.prompt}
          </p>
          <ul className="requirements">
            {item.criteria.map((c, i) => (
              <li key={i}>{t(c[0], c[1])}</li>
            ))}
          </ul>
          {starters[item.id] && (
            <details className="sentence-starters">
              <summary>
                <span>{t('Beginzinnen', 'Sentence starters')}</span>
                <svg
                  className="hint-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m8 10 4 4 4-4" />
                </svg>
              </summary>
              <ul lang="nl">
                {starters[item.id].map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </details>
          )}
        </section>
        <section className="answer-workspace">
          <div hidden={reviewing}>
            {speaking && (
              <SpeakingRecorder
                item={item}
                onTranscript={(text) => {
                  setDraft(text);
                  setShowAnswer(true);
                }}
                onBusy={setCaptureBusy}
                inputToggle={
                  <button
                    className="text-button type-toggle"
                    aria-expanded={showAnswer}
                    aria-controls="typed-answer"
                    disabled={captureBusy || busy}
                    onClick={() => setShowAnswer((value) => !value)}
                  >
                    {showAnswer
                      ? t('Tekstveld verbergen', 'Hide text field')
                      : t('Liever typen', 'Type instead')}
                  </button>
                }
              />
            )}
            {(!speaking || showAnswer) && (
              <div id="typed-answer">
                <label htmlFor="open-answer">
                  {speaking
                    ? t('Je transcript', 'Your transcript')
                    : t('Jouw bericht', 'Your message')}
                </label>
                <textarea
                  id="open-answer"
                  lang="nl"
                  spellCheck
                  maxLength={3000}
                  value={draft}
                  disabled={busy || captureBusy}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('Schrijf hier in het Nederlands…', 'Write here in Dutch…')}
                />
                <p className="small transcript-check" hidden={!speaking}>
                  {t(
                    'Klopt de tekst? Pas aan waar nodig.',
                    'Does the text match? Correct it if needed.',
                  )}
                </p>
              </div>
            )}
            {(!speaking || showAnswer) && (
              <>
                <div className="actions">
                  {api?.feedback ? (
                    <button
                      className="primary"
                      data-action="assess"
                      disabled={!draft.trim() || busy || captureBusy}
                      onClick={assess}
                    >
                      {busy ? t('Nakijken…', 'Reviewing…') : t('Laat nakijken', 'Get feedback')}
                    </button>
                  ) : (
                    <button
                      className="secondary"
                      disabled={!draft.trim() || captureBusy}
                      onClick={() => setSelfReview(true)}
                    >
                      {t('Zelf nakijken', 'Self-review')}
                    </button>
                  )}
                  {api?.feedback && <FeedbackInfo />}
                </div>
                <div className="feedback-status" aria-live="polite">
                  {busy ? (
                    <span>
                      {waitSeconds >= 8
                        ? t(`Nog bezig · ${waitSeconds} s`, `Still reviewing · ${waitSeconds}s`)
                        : t('Je antwoord wordt nagekeken.', 'Reviewing your answer.')}
                    </span>
                  ) : error ? (
                    <span className="feedback-error" role="alert">
                      {error}
                    </span>
                  ) : null}
                </div>
              </>
            )}
          </div>
          {reviewing && (
            <div className="evaluation">
              <div className="evaluation-heading">
                <h2 ref={feedbackHeading} tabIndex={-1}>
                  {t('Je feedback', 'Your feedback')}
                </h2>
                <button
                  className="text-button"
                  data-action="edit-answer"
                  onClick={() => {
                    setResult(null);
                    setSelfReview(false);
                  }}
                >
                  {t('Antwoord aanpassen', 'Edit answer')}
                </button>
              </div>
              {result ? (
                <>
                  <p className="feedback-summary">{result.comment}</p>
                  <div className="criteria-list">
                    {item.criteria.map((c, i) => (
                      <details
                        className="criterion-detail"
                        key={i}
                        open={!result.criteria[i].met || result.criteria[i].uncertain}
                      >
                        <summary>
                          <span className={result.criteria[i].met ? 'good' : ''}>
                            {result.criteria[i].uncertain
                              ? '?'
                              : result.criteria[i].met
                                ? '✓'
                                : '○'}
                          </span>
                          <span>{t(c[0], c[1])}</span>
                        </summary>
                        <div>
                          {result.criteria[i].evidence && (
                            <p lang="nl">
                              <mark>{result.criteria[i].evidence}</mark>
                            </p>
                          )}
                          <p>{result.criteria[i].feedback}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                  <p className="next-step">{result.next_step}</p>
                  {result.corrected_text && (
                    <section className="model-answer suggested-answer">
                      <h3>
                        {result.corrected_text === submitted
                          ? t('Je antwoord kan zo blijven', 'Your wording can stay as it is')
                          : t('Een mogelijk antwoord', 'One possible answer')}
                      </h3>
                      <p className="revision-note">
                        {t(
                          'Andere formuleringen kunnen ook. Controleer of de betekenis nog klopt.',
                          'Other wording can work too. Check that the meaning still matches.',
                        )}
                        {/\[[^\]]+\]/.test(result.corrected_text) &&
                          ' ' +
                            t(
                              'Vul de tekst tussen [ ] zelf in.',
                              'Fill in the text inside [ ] yourself.',
                            )}
                      </p>
                      {result.corrected_text !== submitted && (
                        <p className="diff-key">
                          <ins>{t('Toegevoegd', 'Added')}</ins>{' '}
                          <del>{t('Verwijderd', 'Removed')}</del>
                        </p>
                      )}
                      <AnswerDiff before={submitted} after={result.corrected_text} />
                    </section>
                  )}
                </>
              ) : (
                <>
                  <p className="small">
                    {t('Vink aan wat je hebt genoemd.', 'Check what you included.')}
                  </p>
                  <div className="criteria-list">
                    {item.criteria.map((c, i) => (
                      <label className="criterion" key={i}>
                        <input
                          type="checkbox"
                          checked={!!checks[i]}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setState((s) => ({
                              ...s,
                              reviews: {
                                ...s.reviews,
                                [item.id]: item.criteria.map((_, j) =>
                                  j === i ? checked : !!s.reviews[item.id]?.[j],
                                ),
                              },
                            }));
                          }}
                        />
                        <span>{t(c[0], c[1])}</span>
                      </label>
                    ))}
                  </div>
                  <details className="model-answer">
                    <summary>{t('Bekijk een voorbeeld', 'See an example')}</summary>
                    <p lang="nl">{item.model}</p>
                  </details>
                </>
              )}
              <div className="actions">
                <button className="primary" data-action="finish-review" onClick={reviewed}>
                  {practiceSet && state.active.index < state.active.ids.length - 1
                    ? t('Volgende oefening', 'Next exercise')
                    : t('Afronden', 'Finish review')}
                  <KeyHint />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
