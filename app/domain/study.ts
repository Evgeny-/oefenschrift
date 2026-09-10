import type { StudyState, Session, Exercise, ExerciseRecord } from '../types';
export const STORAGE_KEY = 'inburgering.study.v2';
const OLD_KEY = 'samen.study.v1';
export const defaults = (): StudyState => ({
  version: 2,
  // Light by default: this is a place to read and study. System and Dark remain explicit choices.
  settings: { lang: 'nl', level: 'A2', clock: false, theme: 'light' },
  records: {},
  drafts: {},
  reviews: {},
  timers: {},
  sessions: {},
  active: null,
  checks: [],
});
export function flatten(session, catalogue) {
  const all = session.ids.flatMap((id) => {
    const item = catalogue.find((i) => i.id === id);
    return (item?.questions || []).map((q) => ({ item, q, key: `${id}/${q.id}` }));
  });
  // A focused retry keeps the full exercise list and narrows the questions.
  return Array.isArray(session.questions)
    ? all.filter((x) => session.questions.includes(x.key))
    : all;
}
// A source or answer-key revision invalidates only the affected saved response.
// This is a content checksum, not a security or authentication mechanism.
export function questionFingerprint(item, q) {
  const source = JSON.stringify([
    item.level,
    item.part,
    item.text ?? '',
    item.transcript ?? '',
    item.audio ?? '',
    q.id,
    q.prompt,
    Object.entries(q.options),
    q.answer,
    q.explanation,
  ]);
  let hash = 2166136261;
  for (let i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `q1:${(hash >>> 0).toString(16)}`;
}
export function mistakes(item, record) {
  return (item.questions || []).filter((q) => {
    const saved = record?.responses?.[q.id];
    return (
      saved?.fingerprint === questionFingerprint(item, q) &&
      Object.hasOwn(q.options, saved.selected) &&
      saved.selected !== q.answer
    );
  });
}
export const CHECK_PARTS = ['reading', 'listening'];
export function validSession(a, catalogue) {
  if (
    !a ||
    !['practice', 'mock', 'check'].includes(a.mode) ||
    !Array.isArray(a.ids) ||
    !a.ids.length ||
    !Number.isFinite(a.startedAt)
  )
    return false;
  const first = catalogue.find((i) => i.id === a.ids[0]);
  // A level check mixes reading and listening at one level; other sessions keep one subject.
  const check = a.mode === 'check';
  if (check && (!['A2', 'B1', 'B2'].includes(a.level) || a.questions === undefined)) return false;
  if (
    !a.ids.every((id) =>
      catalogue.some(
        (i) =>
          i.id === id &&
          (i.questions?.length ||
            (a.mode === 'practice' && ['writing', 'speaking'].includes(i.part))) &&
          (i.part === 'knm' || i.level === a.level) &&
          (check ? CHECK_PARTS.includes(i.part) : i.part === first?.part),
      ),
    )
  )
    return false;
  if (a.questions !== undefined) {
    if (!first.questions || !Array.isArray(a.questions) || !a.questions.length) return false;
    const keys = new Set(flatten({ ...a, questions: undefined }, catalogue).map((x) => x.key));
    if (!a.questions.every((key) => typeof key === 'string' && keys.has(key))) return false;
  }
  return (
    Number.isInteger(a.index) &&
    a.index >= 0 &&
    a.index < (first.questions ? flatten(a, catalogue).length : a.ids.length) &&
    (a.endedAt == null || Number.isFinite(a.endedAt)) &&
    a.answers &&
    typeof a.answers === 'object'
  );
}
export function restore(storage, catalogue) {
  const state = defaults();
  try {
    const raw = storage.getItem(STORAGE_KEY) ?? storage.getItem(OLD_KEY),
      parsed = JSON.parse(raw);
    if (!parsed || ![1, 2].includes(parsed.version)) return state;
    if (['A2', 'B1', 'B2'].includes(parsed.settings?.level))
      state.settings.level = parsed.settings.level;
    if (['nl', 'en'].includes(parsed.settings?.lang)) state.settings.lang = parsed.settings.lang;
    state.settings.clock = parsed.settings?.clock === true;
    if (['light', 'dark', 'system'].includes(parsed.settings?.theme))
      state.settings.theme = parsed.settings.theme;
    for (const item of catalogue) {
      // Timers hold active seconds; older saves stored a start timestamp, which is dropped.
      const timer = parsed.timers?.[item.id];
      if (Number.isFinite(timer) && timer > 0 && timer < 1e8)
        state.timers[item.id] = Math.floor(timer);
      const r = parsed.records?.[item.id];
      if (r?.completed === true && Number.isFinite(r.at)) {
        if (['self', 'ai'].includes(r.kind) && !item.questions)
          state.records[item.id] = { completed: true, kind: r.kind, at: r.at };
        else if (
          item.questions &&
          Number.isInteger(r.correct) &&
          r.correct >= 0 &&
          r.correct <= (Number.isInteger(r.total) && r.total > 0 ? r.total : item.questions.length)
        ) {
          const record: ExerciseRecord = {
              completed: true,
              kind: 'quiz',
              correct: r.correct,
              total: Number.isInteger(r.total) && r.total > 0 ? r.total : item.questions.length,
              at: r.at,
            },
            responses = {};
          for (const q of item.questions) {
            const answer = r.responses?.[q.id];
            if (
              answer?.fingerprint === questionFingerprint(item, q) &&
              Object.hasOwn(q.options, answer.selected)
            )
              responses[q.id] = { selected: answer.selected, fingerprint: answer.fingerprint };
          }
          if (Object.keys(responses).length) record.responses = responses;
          state.records[item.id] = record;
        }
      }
      if (typeof parsed.drafts?.[item.id] === 'string')
        state.drafts[item.id] = parsed.drafts[item.id];
      if (Array.isArray(parsed.reviews?.[item.id]))
        state.reviews[item.id] = parsed.reviews[item.id].map((v) => v === true);
    }
    const seconds = (value) =>
      Number.isFinite(value) && value > 0 && value < 1e8 ? Math.floor(value) : 0;
    for (const [id, session] of Object.entries(parsed.sessions || {}) as [string, Session][]) {
      if (session?.setId === id && validSession(session, catalogue))
        state.sessions[id] = { ...session, elapsedSeconds: seconds(session.elapsedSeconds) };
    }
    if (validSession(parsed.active, catalogue))
      state.active = {
        ...parsed.active,
        checked: parsed.active.checked || {},
        elapsedSeconds: seconds(parsed.active.elapsedSeconds),
      };
    if (Array.isArray(parsed.checks))
      state.checks = parsed.checks
        .filter(
          (check) =>
            check?.mode === 'check' &&
            Number.isFinite(check.endedAt) &&
            validSession(check, catalogue),
        )
        .slice(0, 20)
        .map((check) => ({ ...check, checked: {}, elapsedSeconds: seconds(check.elapsedSeconds) }));
  } catch {}
  return state;
}
export function save(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
export function startSession(
  ids,
  mode,
  catalogue,
  now = Date.now(),
  questions: string[] | undefined = undefined,
): Session {
  const first = catalogue.find((i) => i.id === ids[0]);
  const a: Session = {
    ids,
    mode,
    level: first?.part === 'knm' ? 'KNM' : first?.level,
    index: 0,
    answers: {},
    checked: {},
    startedAt: now,
    endedAt: null,
    elapsedSeconds: 0,
    ...(questions ? { questions } : {}),
  };
  if (!validSession(a, catalogue)) throw Error('Cannot start an empty or mixed exercise set.');
  return a;
}
export function complete(state, catalogue, now = Date.now()) {
  const a = state.active;
  if (!validSession(a, catalogue)) return state;
  const questions = flatten(a, catalogue);
  if (
    !questions.length ||
    questions.some(({ key, q }) => !Object.hasOwn(q.options, a.answers[key]))
  )
    return state;
  const ended = { ...a, endedAt: a.endedAt ?? now };
  // A level check is kept on its own; it never marks an exercise as completed.
  if (a.mode === 'check')
    return {
      ...state,
      active: ended,
      checks: [ended, ...(state.checks || []).filter((c) => c.startedAt !== a.startedAt)].slice(
        0,
        20,
      ),
    };
  const records = { ...state.records };
  a.ids.forEach((id) => {
    const qs = questions.filter((x) => x.item.id === id);
    if (!qs.length) return;
    const responses = Object.fromEntries(
      qs.map((x) => [
        x.q.id,
        { selected: a.answers[x.key], fingerprint: questionFingerprint(x.item, x.q) },
      ]),
    );
    const previous = records[id];
    // A focused retry updates only the retried answers; the first full result stays.
    if (a.questions && previous?.completed && previous.kind === 'quiz')
      records[id] = { ...previous, responses: { ...previous.responses, ...responses } };
    else
      records[id] = {
        completed: true,
        kind: 'quiz',
        correct: qs.filter((x) => x.q.answer === a.answers[x.key]).length,
        total: qs.length,
        at: now,
        responses,
      };
  });
  return { ...state, active: ended, records };
}
export function sessionMistakes(session, catalogue) {
  return flatten(session, catalogue)
    .filter((x) => x.q.answer !== session.answers[x.key])
    .map((x) => x.key);
}
// Retry only the missed questions of a finished session, keeping the set link.
export function retrySession(session, catalogue, now = Date.now()): Session {
  const keys = sessionMistakes(session, catalogue);
  if (session.setId)
    return { ...startSession(session.ids, 'practice', catalogue, now, keys), setId: session.setId };
  return startSession(
    session.ids.filter((id) => keys.some((key) => key.startsWith(id + '/'))),
    'practice',
    catalogue,
    now,
    keys,
  );
}
// A session counts as started once something was answered or a first item was passed;
// opening a set link and leaving again is not progress.
export function hasProgress(session) {
  return !!session && (session.index > 0 || Object.keys(session.answers || {}).length > 0);
}
export function matchesSet(session, set) {
  return (
    !!session &&
    session.mode === 'practice' &&
    session.setId === set.id &&
    JSON.stringify(session.ids) === JSON.stringify(set.ids)
  );
}
export function savedSetSession(state, set) {
  return matchesSet(state.active, set)
    ? state.active
    : matchesSet(state.sessions?.[set.id], set)
      ? state.sessions[set.id]
      : null;
}
export function keepSetSessions(previous, next) {
  if (next === previous || next.active === previous.active) return next;
  const sessions = { ...previous.sessions, ...next.sessions };
  for (const session of [previous.active, next.active])
    if (session?.setId) sessions[session.setId] = session;
  return { ...next, sessions };
}
export function reviewOpen(state, id, kind, inSet = false, now = Date.now()) {
  const next = {
    ...state,
    records: { ...state.records, [id]: { completed: true, kind, at: now } },
  };
  const a = state.active;
  if (inSet && a?.setId && a.mode === 'practice' && !a.endedAt && a.ids[a.index] === id) {
    next.active = {
      ...a,
      index: Math.min(a.index + 1, a.ids.length - 1),
      endedAt: a.index === a.ids.length - 1 ? now : null,
    };
  }
  return next;
}
// Elapsed time is the seconds a learner actually spent on the screen; time away is never counted.
export function elapsed(session) {
  return Math.max(0, Math.floor(session?.elapsedSeconds || 0));
}
export function addElapsed(
  state,
  identity: { setId?: string; startedAt: number } | { itemId: string },
  delta: number,
) {
  if (!(delta > 0)) return state;
  if ('itemId' in identity)
    return {
      ...state,
      timers: { ...state.timers, [identity.itemId]: (state.timers[identity.itemId] || 0) + delta },
    };
  const same = (session) =>
    !!session && session.startedAt === identity.startedAt && session.setId === identity.setId;
  if (same(state.active))
    return {
      ...state,
      active: { ...state.active, elapsedSeconds: (state.active.elapsedSeconds || 0) + delta },
    };
  const stored = identity.setId && state.sessions[identity.setId];
  if (same(stored))
    return {
      ...state,
      sessions: {
        ...state.sessions,
        [identity.setId]: { ...stored, elapsedSeconds: (stored.elapsedSeconds || 0) + delta },
      },
    };
  return state;
}
// Practice time reads in minutes; the seconds keep ticking underneath without being shown.
export function formatMinutes(seconds, lang = 'nl') {
  const n = Math.max(0, Math.floor(Number(seconds) || 0)),
    h = Math.floor(n / 3600),
    m = Math.floor(n / 60) % 60;
  if (n < 60) return `< 1 min`;
  return h ? `${h} ${lang === 'nl' ? 'u' : 'h'} ${String(m).padStart(2, '0')} min` : `${m} min`;
}
export function formatTime(seconds) {
  const n = Math.max(0, Math.floor(Number(seconds) || 0)),
    s = String(n % 60).padStart(2, '0'),
    m = String(Math.floor(n / 60) % 60).padStart(2, '0');
  return n >= 3600 ? `${Math.floor(n / 3600)}:${m}:${s}` : `${Math.floor(n / 60)}:${s}`;
}
export function summary(items, records) {
  return { total: items.length, completed: items.filter((i) => records[i.id]?.completed).length };
}
