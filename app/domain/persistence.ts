// Keep the old names here so existing browsers can carry their data into Oefenschrift.
export const STORAGE_KEY = 'oefenschrift.study.v2';
export const VISITOR_KEY = 'oefenschrift.visitor';
export const SESSION_KEY = 'oefenschrift.visited';
export const PREFERENCES_COOKIE = 'oefenschrift_preferences';
export const POSITION_COOKIE = 'oefenschrift_position';
export const PASS_COOKIE = 'oefenschrift_pass';
export const OPS_COOKIE = 'oefenschrift_ops';
export const legacyNames = {
  [STORAGE_KEY]: ['inburgering.study.v2', 'samen.study.v1'],
  [VISITOR_KEY]: ['inburgering.visitor'],
  [SESSION_KEY]: ['inburgering.visited'],
  [PREFERENCES_COOKIE]: ['inburgering_preferences'],
  [POSITION_COOKIE]: ['inburgering_position'],
  [PASS_COOKIE]: ['inburgering_pass'],
  [OPS_COOKIE]: ['inburgering_ops'],
};

export function cookieValue(cookies: string, name: string) {
  return cookies
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(name + '='))
    ?.slice(name.length + 1);
}
export function readCookie(cookies: string, name: string) {
  for (const key of [name, ...(legacyNames[name] || [])]) {
    const value = cookieValue(cookies, key);
    if (value !== undefined) return value;
  }
}

export function readStored(storage, name: string, accepts = (value: string) => !!value) {
  for (const key of [name, ...(legacyNames[name] || [])]) {
    try {
      const value = storage.getItem(key);
      if (value !== null && accepts(value)) return value;
    } catch {
      // An unreadable or malformed new entry must not hide a valid older save.
    }
  }
  return null;
}
export function readStudy(storage) {
  const raw = readStored(storage, STORAGE_KEY, (value) =>
    [1, 2].includes(JSON.parse(value)?.version),
  );
  return raw === null ? null : JSON.parse(raw);
}
export function writeStored(storage, name: string, value: string) {
  try {
    storage.setItem(name, value);
    if (storage.getItem(name) !== value) return false;
  } catch {
    return false;
  }
  // Delete only after verifying the new copy. A failed write leaves the old data intact.
  for (const key of legacyNames[name] || []) {
    try {
      storage.removeItem(key);
    } catch {}
  }
  return true;
}
