import React, { useEffect, useRef, useState } from 'react';
import { useStudyContext } from '../StudyContext';
import { elapsed, addElapsed, formatMinutes } from '../domain/study';
import { typeLabel } from '../domain/labels';
import IssueReport from './IssueReport';

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
export function ExerciseHeader({ item, timer, questionId = null, tag = null }) {
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
        <p>{subtitle + (tag ? ' · ' + tag : '')}</p>
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
export function sessionTimer(session, setState) {
  const identity = { setId: session.setId, startedAt: session.startedAt };
  return {
    saved: elapsed(session),
    persist: (delta) => setState((s) => addElapsed(s, identity, delta)),
    ended: !!session.endedAt,
  };
}
