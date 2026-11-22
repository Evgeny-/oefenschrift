// A practice set counts as new for a week after the server first published it. server/store.ts
// stamps `added` when a set first enters an existing database; sets from the first seed carry no
// date, so a fresh install or a test database never marks its whole catalogue as new.
export const NEW_SET_DAYS = 7;

export function isNewSet(set: { added?: string }, now = Date.now()) {
  const added = Date.parse(set.added || '');
  return Number.isFinite(added) && now - added < NEW_SET_DAYS * 86_400_000;
}

// A new section of the site carries the same quiet "Nieuw" in the navigation until a fixed
// date, so returning learners notice it. The word lists: about six weeks from launch.
export const NEW_SECTIONS: Record<string, string> = { words: '2027-01-10' };

export function isNewSection(part: string, now = Date.now()) {
  const until = Date.parse(NEW_SECTIONS[part] || '');
  return Number.isFinite(until) && now < until;
}
