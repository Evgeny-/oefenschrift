import { useEffect, useState } from 'react';
import {
  type Profiles,
  addProfile,
  disableTeacher,
  enableTeacher,
  readProfiles,
  removeProfile,
  renameProfile,
  selectProfile,
  writeProfiles,
} from './domain/profiles';

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
// The teacher-mode registry of this browser. Every change re-reads the stored registry
// first, so a second tab's additions are kept, and reports whether it could be saved.
export default function useProfiles(
  ready: boolean,
  current: string,
  switchProfile: (id: string) => void,
) {
  const [profiles, setProfiles] = useState<Profiles | null>(null),
    [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!ready) return;
    setProfiles(readProfiles(browserStorage()));
    setLoaded(true);
    const onStorage = () => setProfiles(readProfiles(browserStorage()));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [ready]);
  const change = (update: (stored: Profiles | null) => Profiles | null) => {
    const storage = browserStorage(),
      next = update(readProfiles(storage));
    if (!next || !writeProfiles(storage, next)) return null;
    setProfiles(next);
    return next;
  };
  return {
    profiles,
    // False until the registry has been read: the server cannot know about teacher mode.
    loaded,
    teacher: !!profiles?.teacher,
    enable: (firstName: string) => !!change((stored) => enableTeacher(stored, firstName)),
    disable: () => {
      const next = change((stored) => stored && disableTeacher(stored));
      if (next && next.active !== current) switchProfile(next.active);
      return !!next;
    },
    add: (name: string) => !!change((stored) => stored && addProfile(stored, name)),
    rename: (id: string, name: string) =>
      !!change((stored) => stored && renameProfile(stored, id, name)),
    // The profile in this tab is the one in use, whatever another tab selected since.
    remove: (id: string) => {
      if (id === current) return false;
      const storage = browserStorage(),
        stored = readProfiles(storage);
      const next = stored && removeProfile(storage, { ...stored, active: current }, id);
      if (!next) return false;
      const kept = { ...next, active: stored.active === id ? current : stored.active };
      writeProfiles(storage, kept);
      setProfiles(kept);
      return true;
    },
    select: (id: string) => {
      if (!change((stored) => stored && selectProfile(stored, id))) return false;
      if (id !== current) switchProfile(id);
      return true;
    },
  };
}
export type ProfilesApi = ReturnType<typeof useProfiles>;
