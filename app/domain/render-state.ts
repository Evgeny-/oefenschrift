import { defaults, startSession, savedSetSession, flatten } from './study';
import type { StudyState, Exercise, PracticeSet } from '../types';

import { PREFERENCES_COOKIE, readCookie } from './persistence';
export { PREFERENCES_COOKIE } from './persistence';
export function readPreferences(cookie = ''): StudyState['settings'] {
  const result = defaults().settings;
  try {
    const raw = readCookie(cookie, PREFERENCES_COOKIE);
    const value = JSON.parse(decodeURIComponent(raw || '{}'));
    if (['A2', 'B1', 'B2'].includes(value.level)) result.level = value.level;
    if (['nl', 'en'].includes(value.lang)) result.lang = value.lang;
    if (['light', 'dark', 'system'].includes(value.theme)) result.theme = value.theme;
    result.clock = value.clock === true;
  } catch {
    /* Invalid preferences use public defaults. */
  }
  return result;
}

// Resolve the public route before rendering, on both the server and client.
export function stateForRoute(
  state: StudyState,
  route: string,
  catalogue: Exercise[],
  sets: PracticeSet[],
  now: number,
): StudyState {
  const set = route.startsWith('set/') ? sets.find((set) => set.id === route.slice(4)) : null;
  if (set) {
    const active = savedSetSession(state, set) || {
      ...startSession(set.ids, 'practice', catalogue, now),
      setId: set.id,
    };
    const settings =
      set.level === 'KNM' || state.settings.level === set.level
        ? state.settings
        : { ...state.settings, level: set.level as StudyState['settings']['level'] };
    return active === state.active && settings === state.settings
      ? state
      : { ...state, settings, active };
  }
  const item = route.startsWith('exercise/')
    ? catalogue.find((item) => item.id === route.slice(9))
    : null;
  if (!item) return state;
  let next = state;
  if (item.part !== 'knm' && state.settings.level !== item.level)
    next = {
      ...next,
      settings: { ...next.settings, level: item.level as StudyState['settings']['level'] },
    };
  if (
    item.questions &&
    !(
      state.active?.mode === 'practice' &&
      !state.active.setId &&
      state.active.ids.length === 1 &&
      state.active.ids[0] === item.id
    )
  )
    next = { ...next, active: startSession([item.id], 'practice', catalogue, now) };
  return next;
}

// Only the current public question position is mirrored, never an answer or score.
export function applyResumePosition(state: StudyState, raw: string, catalogue: Exercise[]) {
  try {
    const position = JSON.parse(decodeURIComponent(raw)),
      active = state.active;
    if (!active || position.set !== active.setId || !active.setId) return state;
    const length = catalogue.find((item) => item.id === active.ids[0])?.questions
      ? flatten(active, catalogue).length
      : active.ids.length;
    if (!Number.isInteger(position.index) || position.index < 0 || position.index >= length)
      return state;
    return { ...state, active: { ...active, index: position.index } };
  } catch {
    return state;
  }
}
