// A practice set counts as new for a week after the server first published it. server/store.ts
// stamps `added` when a set first enters an existing database; sets from the first seed carry no
// date, so a fresh install or a test database never marks its whole catalogue as new.
export const NEW_SET_DAYS = 7;

export function isNewSet(set: { added?: string }, now = Date.now()) {
  const added = Date.parse(set.added || '');
  return Number.isFinite(added) && now - added < NEW_SET_DAYS * 86_400_000;
}
