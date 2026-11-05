import { useEffect, useLayoutEffect, useState } from 'react';
import { restore, save, keepSetSessions } from './domain/study';
import { PREFERENCES_COOKIE } from './domain/render-state';
import { cookiePath } from './domain/base';
import { POSITION_COOKIE, readStudy, legacyNames, cookieValue } from './domain/persistence';
import { MAIN_PROFILE, activeProfile, profileSlot } from './domain/profiles';
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
function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
// The study state of one profile. `slot` names the profile whose progress is loaded and
// saved; a switch loads another profile in place. Updates queued by a screen of the
// previous profile (a timer flushing as it unmounts) are dropped, never applied to the
// next learner.
export default function useStudy(catalogue, initialState, route, prepare) {
  const [entry, replaceEntry] = useState(() => ({
    state: initialState,
    route,
    ready: false,
    slot: MAIN_PROFILE,
    generation: 0,
  }));
  if (entry.route !== route) replaceEntry({ ...entry, route, state: prepare(entry.state) });
  const state = entry.state,
    slot = entry.slot;
  const setState = (update) =>
    replaceEntry((previous) =>
      previous.slot !== slot
        ? previous
        : {
            ...previous,
            state: keepSetSessions(
              previous.state,
              typeof update === 'function' ? update(previous.state) : update,
            ),
          },
    );
  const [saved, setSaved] = useState(true);
  useLayoutEffect(() => {
    const storage = browserStorage(),
      active = activeProfile(storage),
      restored = restore(storage, catalogue, profileSlot(active));
    // First-time visitors use the server preferences. Existing browser data wins.
    let stored = false;
    try {
      stored = !!readStudy(storage, profileSlot(active));
    } catch {}
    if (!stored) restored.settings = initialState.settings;
    replaceEntry((previous) => ({
      ...previous,
      state: prepare(restored),
      ready: true,
      slot: active,
    }));
  }, []);
  useEffect(() => {
    if (!entry.ready) return;
    setSaved(save(browserStorage(), state, profileSlot(slot)));
    rememberPreferences(state.settings);
    const position = state.active?.setId
      ? { set: state.active.setId, index: state.active.index }
      : null;
    if (position) rememberCookie(POSITION_COOKIE, position);
  }, [state, entry.ready, slot]);
  // Load another profile. Language and theme belong to the device and carry over; a
  // profile without saved progress starts at the current level.
  const switchProfile = (id: string) => {
    const storage = browserStorage(),
      restored = restore(storage, catalogue, profileSlot(id));
    let stored = false;
    try {
      stored = !!readStudy(storage, profileSlot(id));
    } catch {}
    replaceEntry((previous) => ({
      ...previous,
      slot: id,
      generation: previous.generation + 1,
      state: {
        ...restored,
        settings: {
          ...(stored ? restored.settings : previous.state.settings),
          lang: previous.state.settings.lang,
          theme: previous.state.settings.theme,
        },
      },
    }));
  };
  const setting = (key, value) =>
    setState((s) => ({ ...s, settings: { ...s.settings, [key]: value } }));
  const updateSession = (fn) => setState((s) => ({ ...s, active: fn(s.active) }));
  return {
    state,
    setState,
    setting,
    updateSession,
    saved,
    ready: entry.ready,
    profile: slot,
    generation: entry.generation,
    switchProfile,
  };
}
