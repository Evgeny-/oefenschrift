// Teacher mode: several learners practise on one device, each with a profile of their own.
// The registry (names, which profile is active, whether teacher mode is on) and every
// profile's progress stay in this browser. The first profile keeps the ordinary study key,
// so a browser that never turns teacher mode on reads and writes exactly what it did before.
import { STORAGE_KEY, legacyNames, readStored, writeStored } from './persistence';

export const PROFILES_KEY = 'oefenschrift.profiles';
export const MAIN_PROFILE = 'main';
export const MAX_PROFILES = 40;
export const NAME_LIMIT = 40;
export interface Profile {
  id: string;
  name: string;
  createdAt: number;
}
export interface Profiles {
  version: 1;
  teacher: boolean;
  active: string;
  list: Profile[];
}
// Ids are random and carry no name, so the server can tell allowances apart without
// learning who practises.
export const profileIdPattern = /^[a-z0-9]{8,16}$/;
const validId = (id: unknown): id is string =>
  typeof id === 'string' && (id === MAIN_PROFILE || profileIdPattern.test(id));
export const profileSlot = (id: string) =>
  id === MAIN_PROFILE ? STORAGE_KEY : `${STORAGE_KEY}@${id}`;
export function cleanName(name: unknown) {
  return String(name ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_LIMIT);
}
export function newProfileId() {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
export function readProfiles(storage): Profiles | null {
  if (!storage) return null;
  const raw = readStored(storage, PROFILES_KEY, (value) => JSON.parse(value)?.version === 1);
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(raw),
      seen = new Set<string>(),
      list: Profile[] = [];
    for (const entry of Array.isArray(parsed.list) ? parsed.list : []) {
      const name = cleanName(entry?.name);
      if (!validId(entry?.id) || seen.has(entry.id) || !name) continue;
      seen.add(entry.id);
      list.push({
        id: entry.id,
        name,
        createdAt: Number.isFinite(entry.createdAt) ? entry.createdAt : 0,
      });
    }
    if (!list.length) return null;
    list.splice(MAX_PROFILES);
    return {
      version: 1,
      teacher: parsed.teacher === true,
      active: seen.has(parsed.active) ? parsed.active : list[0].id,
      list,
    };
  } catch {
    return null;
  }
}
export function writeProfiles(storage, profiles: Profiles) {
  return !!storage && writeStored(storage, PROFILES_KEY, JSON.stringify(profiles));
}
// The profile this browser studies with. Without a registry it is the ordinary one.
export function activeProfile(storage) {
  try {
    return readProfiles(storage)?.active || MAIN_PROFILE;
  } catch {
    return MAIN_PROFILE;
  }
}
// Turning teacher mode on names the progress already in this browser as the first profile.
export function enableTeacher(
  current: Profiles | null,
  firstName: string,
  now = Date.now(),
): Profiles {
  if (current) return { ...current, teacher: true };
  return {
    version: 1,
    teacher: true,
    active: MAIN_PROFILE,
    list: [{ id: MAIN_PROFILE, name: cleanName(firstName) || 'Profiel 1', createdAt: now }],
  };
}
// Turning it off hides the switcher and returns to the first profile; every profile's
// progress stays in the browser for the next time.
export function disableTeacher(current: Profiles): Profiles {
  return { ...current, teacher: false, active: current.list[0].id };
}
export function addProfile(
  current: Profiles,
  name: string,
  id = newProfileId(),
  now = Date.now(),
): Profiles | null {
  const clean = cleanName(name);
  if (!clean || current.list.length >= MAX_PROFILES || current.list.some((p) => p.id === id))
    return null;
  return { ...current, list: [...current.list, { id, name: clean, createdAt: now }] };
}
export function renameProfile(current: Profiles, id: string, name: string): Profiles | null {
  const clean = cleanName(name);
  if (!clean || !current.list.some((p) => p.id === id)) return null;
  return { ...current, list: current.list.map((p) => (p.id === id ? { ...p, name: clean } : p)) };
}
export function selectProfile(current: Profiles, id: string): Profiles | null {
  return current.list.some((p) => p.id === id) ? { ...current, active: id } : null;
}
// Deleting removes the learner's saved progress too. The profile in use cannot be deleted,
// and the last one never is: there is always a profile to practise with.
export function removeProfile(storage, current: Profiles, id: string): Profiles | null {
  if (id === current.active || current.list.length < 2 || !current.list.some((p) => p.id === id))
    return null;
  const next = { ...current, list: current.list.filter((p) => p.id !== id) };
  if (!writeProfiles(storage, next)) return null;
  const slot = profileSlot(id);
  for (const key of [slot, ...(legacyNames[slot] || [])])
    try {
      storage.removeItem(key);
    } catch {}
  return next;
}
