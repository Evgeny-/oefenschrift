import type { DatabaseSync } from 'node:sqlite';
import type { ContentStore } from './store';

export type Reaction = 'like' | 'dislike' | null;
export const REACTION_RETENTION_DAYS = 90;
export class ReactionError extends Error {}

export function initializeReactions(db: DatabaseSync) {
  db.exec(`CREATE TABLE IF NOT EXISTS exercise_reactions(
    visitor TEXT NOT NULL,item_id TEXT NOT NULL,item_version TEXT NOT NULL,
    question_id TEXT NOT NULL DEFAULT '',value TEXT NOT NULL CHECK(value IN ('like','dislike')),
    created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,
    PRIMARY KEY(visitor,item_id,item_version,question_id));
    CREATE INDEX IF NOT EXISTS exercise_reactions_updated ON exercise_reactions(updated_at);`);
  pruneReactions(db);
}

export function pruneReactions(db: DatabaseSync, now = Date.now()) {
  return Number(
    db
      .prepare('DELETE FROM exercise_reactions WHERE updated_at<?')
      .run(now - REACTION_RETENTION_DAYS * 86_400_000).changes,
  );
}

// The API supplies only a keyed visitor hash. Identity includes the reviewed revision,
// so a vote on an earlier version cannot become a vote on revised exercise content.
export function exerciseReaction(
  store: Pick<ContentStore, 'db' | 'catalogue'>,
  visitor: string,
  body: unknown,
  now = Date.now(),
): { value: Reaction } {
  const data = body as Record<string, unknown>;
  const allowed = ['visitor', 'operation', 'item_id', 'item_version', 'question_id', 'value'];
  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    !/^[a-f0-9]{32}$/.test(visitor) ||
    Object.keys(data).some((key) => !allowed.includes(key)) ||
    (data.operation !== 'get' && data.operation !== 'set') ||
    (data.operation === 'set' && ![null, 'like', 'dislike'].includes(data.value as Reaction)) ||
    (data.operation === 'get' && Object.hasOwn(data, 'value'))
  )
    throw new ReactionError('Invalid exercise rating.');
  const item = store.catalogue().find((entry) => entry.id === data.item_id);
  if (
    !item ||
    !data.item_version ||
    data.item_version !== item.revision ||
    (data.question_id != null &&
      !item.questions?.some((question) => question.id === data.question_id))
  )
    throw new ReactionError('Invalid or outdated exercise. Reload and try again.');
  pruneReactions(store.db, now);
  const identity = [visitor, item.id, item.revision, data.question_id ?? ''] as string[];
  if (data.operation === 'set') {
    if (data.value === null)
      store.db
        .prepare(
          'DELETE FROM exercise_reactions WHERE visitor=? AND item_id=? AND item_version=? AND question_id=?',
        )
        .run(...identity);
    else
      store.db
        .prepare(
          `INSERT INTO exercise_reactions(visitor,item_id,item_version,question_id,value,created_at,updated_at)
        VALUES(?,?,?,?,?,?,?) ON CONFLICT(visitor,item_id,item_version,question_id)
        DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at`,
        )
        .run(...identity, data.value as string, now, now);
  }
  const row = store.db
    .prepare(
      'SELECT value FROM exercise_reactions WHERE visitor=? AND item_id=? AND item_version=? AND question_id=?',
    )
    .get(...identity);
  return { value: row ? (row.value as Exclude<Reaction, null>) : null };
}
