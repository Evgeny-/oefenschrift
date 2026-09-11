import { useEffect, useLayoutEffect, useState } from 'react';
import { restore, save, keepSetSessions } from './domain/study';
import { PREFERENCES_COOKIE } from './domain/render-state';
import { cookiePath } from './domain/base';
import { POSITION_COOKIE, readStudy, legacyNames, cookieValue } from './domain/persistence';
// The preference cookie lets the server render the next page load at the stored level,
// language and theme before any script runs.
export function rememberPreferences(settings) {
  rememberCookie(PREFERENCES_COOKIE, settings);
}
function rememberCookie(name, value) {
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${name}=${encoded}; Path=${cookiePath}; SameSite=Lax; Max-Age=31536000`;
  if (cookieValue(document.cookie, name) === encoded)
    for (const old of legacyNames[name] || [])
      if (cookieValue(document.cookie, old) !== undefined)
        document.cookie = `${old}=; Path=${cookiePath}; SameSite=Lax; Max-Age=0`;
}
export default function useStudy(catalogue, initialState, route, prepare) {
  const [entry, replaceEntry] = useState(() => ({ state: initialState, route, ready: false }));
  if (entry.route !== route) replaceEntry({ ...entry, route, state: prepare(entry.state) });
  const state = entry.state;
  const setState = (update) =>
    replaceEntry((previous) => ({
      ...previous,
      state: keepSetSessions(
        previous.state,
        typeof update === 'function' ? update(previous.state) : update,
      ),
    }));
  const [saved, setSaved] = useState(true);
  useLayoutEffect(() => {
    let storage = null;
    try {
      storage = window.localStorage;
    } catch {}
    const restored = restore(storage, catalogue);
    // First-time visitors use the server preferences. Existing browser data wins.
    let stored = false;
    try {
      stored = !!readStudy(storage);
    } catch {}
    if (!stored) restored.settings = initialState.settings;
    replaceEntry((previous) => ({ ...previous, state: prepare(restored), ready: true }));
  }, []);
  useEffect(() => {
    if (!entry.ready) return;
    let storage = null;
    try {
      storage = window.localStorage;
    } catch {}
    setSaved(save(storage, state));
    rememberPreferences(state.settings);
    const position = state.active?.setId
      ? { set: state.active.setId, index: state.active.index }
      : null;
    if (position) rememberCookie(POSITION_COOKIE, position);
  }, [state, entry.ready]);
  const setting = (key, value) =>
    setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }));
  const updateSession = (fn) => setState((s) => ({ ...s, active: fn(s.active) }));
  return { state, setState, setting, updateSession, saved, ready: entry.ready };
}
