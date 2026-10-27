import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { ContentStore, getStore } from '../server/store';
import {
  exerciseReaction,
  initializeReactions,
  pruneReactions,
  ReactionError,
  REACTION_RETENTION_DAYS,
} from '../server/reactions';
import { issuePass, passId, visitorHash } from '../server/security';
import { action } from '../app/routes/api';
import { remaining, resetLimits, RULES } from '../server/limits';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
const item = catalogue.find((entry) => entry.part === 'reading');
const rawVisitor = '0123456789abcdef0123456789abcdef';
const body = (value: 'like' | 'dislike' | null = 'like') => ({
  visitor: rawVisitor,
  operation: 'set',
  item_id: item.id,
  item_version: item.revision,
  question_id: item.questions[0].id,
  value,
});
function read() {
  const { value, ...data } = body();
  return { ...data, operation: 'get' };
}

test('a browser rating survives restart, changes once and clears without duplicate votes', () => {
  const directory = mkdtempSync(join(tmpdir(), 'exercise-reactions-'));
  const path = join(directory, 'reactions.sqlite3');
  const visitor = 'a'.repeat(32);
  let store = new ContentStore(path, catalogue);
  try {
    initializeReactions(store.db);
    assert.deepEqual(exerciseReaction(store, visitor, read()), { value: null });
    assert.deepEqual(exerciseReaction(store, visitor, body()), { value: 'like' });
    assert.deepEqual(exerciseReaction(store, visitor, body()), { value: 'like' });
    assert.equal(store.db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 1);
    store.close();
    store = new ContentStore(path, catalogue);
    initializeReactions(store.db);
    assert.deepEqual(exerciseReaction(store, visitor, read()), { value: 'like' });
    assert.deepEqual(exerciseReaction(store, visitor, body('dislike')), { value: 'dislike' });
    assert.equal(store.db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 1);
    assert.deepEqual(exerciseReaction(store, visitor, body(null)), { value: null });
    assert.equal(store.db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 0);
  } finally {
    store.close();
    rmSync(directory, { recursive: true, force: true });
  }
});

test('ratings belong to the visitor, reviewed revision and exact question', () => {
  const store = new ContentStore(':memory:', catalogue);
  initializeReactions(store.db);
  const visitor = 'a'.repeat(32);
  try {
    exerciseReaction(store, visitor, body());
    assert.deepEqual(exerciseReaction(store, 'b'.repeat(32), read()), { value: null });
    assert.deepEqual(exerciseReaction(store, visitor, { ...read(), question_id: null }), {
      value: null,
    });
    const other = item.questions[1];
    if (other) {
      assert.deepEqual(exerciseReaction(store, visitor, { ...read(), question_id: other.id }), {
        value: null,
      });
      exerciseReaction(store, visitor, { ...body('dislike'), question_id: other.id });
      assert.deepEqual(exerciseReaction(store, visitor, read()), { value: 'like' });
    }
    const revised = { ...item, revision: 'new-reviewed-revision' };
    const updated = { db: store.db, catalogue: () => [revised] };
    assert.deepEqual(
      exerciseReaction(updated, visitor, { ...read(), item_version: revised.revision }),
      { value: null },
    );
    assert.throws(() => exerciseReaction(updated, visitor, body()), /outdated exercise/);
    const version = store.get(item.id).version;
    store.archive(item.id, true, version);
    assert.throws(() => exerciseReaction(store, visitor, body()), /outdated exercise/);
  } finally {
    store.close();
  }
});

test('ratings reject malformed identities, unknown fields and private learner content', () => {
  const store = new ContentStore(':memory:', catalogue);
  initializeReactions(store.db);
  try {
    for (const data of [
      null,
      [],
      {},
      { ...body(), value: 'up' },
      { ...body(), value: 1 },
      { ...body(), item_id: 'unknown' },
      { ...body(), question_id: 'unknown' },
      { ...body(), question_id: [] },
      { ...body(), item_version: 'stale' },
      { ...body(), operation: 'delete' },
      { ...body(), operation: ['get'] },
      { ...body(), operation: ['set'] },
      { ...read(), operation: ['set'] },
      { ...read(), value: null },
      { ...body(), answer: 'Private answer' },
      { ...body(), recording: 'data:audio/example' },
    ])
      assert.throws(() => exerciseReaction(store, 'a'.repeat(32), data), ReactionError);
    assert.throws(() => exerciseReaction(store, rawVisitor + '-invalid', body()), ReactionError);
    assert.equal(store.db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 0);
    const columns = store.db
      .prepare('PRAGMA table_info(exercise_reactions)')
      .all()
      .map((row) => row.name);
    assert.deepEqual(columns, [
      'visitor',
      'item_id',
      'item_version',
      'question_id',
      'value',
      'created_at',
      'updated_at',
    ]);
  } finally {
    store.close();
  }
});

test('reaction retention removes old votes while a changed vote receives a fresh window', () => {
  const store = new ContentStore(':memory:', catalogue);
  initializeReactions(store.db);
  const now = Date.now();
  const old = now - (REACTION_RETENTION_DAYS + 1) * 86_400_000;
  try {
    exerciseReaction(store, 'a'.repeat(32), body(), old);
    exerciseReaction(store, 'b'.repeat(32), body('dislike'), old);
    exerciseReaction(store, 'b'.repeat(32), body(), now);
    assert.equal(pruneReactions(store.db, now), 0, 'the update already removed expired votes');
    assert.equal(store.db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 1);
    assert.deepEqual(exerciseReaction(store, 'a'.repeat(32), read(), now), { value: null });
    assert.deepEqual(exerciseReaction(store, 'b'.repeat(32), read(), now), { value: 'like' });
  } finally {
    store.close();
  }
});

test('reaction API requires origin and a page pass, hashes the visitor and never calls a provider', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'exercise-reaction-api-'));
  const previous = {
    db: process.env.OEFENSCHRIFT_DB,
    secret: process.env.OEFENSCHRIFT_ADMIN_SECRET,
    fetch: globalThis.fetch,
  };
  process.env.OEFENSCHRIFT_DB = join(directory, 'api.sqlite3');
  process.env.OEFENSCHRIFT_ADMIN_SECRET = 'synthetic-reaction-test-secret';
  globalThis.fetch = async () => {
    throw Error('No provider should be called.');
  };
  resetLimits();
  try {
    const origin = 'http://127.0.0.1:8766';
    const pass = issuePass();
    const request = (data: unknown, headers = {}, method = 'POST') =>
      new Request(origin + '/api/reactions', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Origin: origin,
          Cookie: pass.header.split(';')[0],
          ...headers,
        },
        body: method === 'GET' ? undefined : JSON.stringify(data),
      });
    await assert.rejects(
      action({
        request: request(body(), { Origin: 'https://foreign.example' }),
        params: { service: 'reactions' },
      }),
      (error: any) => error instanceof Response && error.status === 403,
    );
    await assert.rejects(
      action({ request: request(body(), { Origin: '' }), params: { service: 'reactions' } }),
      (error: any) => error instanceof Response && error.status === 403,
    );
    const missingPass = await action({
      request: request(body(), { Cookie: '' }),
      params: { service: 'reactions' },
    });
    assert.equal(missingPass.status, 403);
    assert.equal((await missingPass.json()).code, 'pass_required');
    const saved = await action({
      request: request(body('dislike')),
      params: { service: 'reactions' },
    });
    assert.equal(saved.status, 200);
    assert.equal(saved.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await saved.json(), { value: 'dislike' });
    const row = getStore().db.prepare('SELECT * FROM exercise_reactions').get();
    assert.equal(row.visitor, visitorHash(rawVisitor));
    assert.notEqual(row.visitor, rawVisitor);
    const loaded = await action({ request: request(read()), params: { service: 'reactions' } });
    assert.deepEqual(await loaded.json(), { value: 'dislike' });
    const invalid = await action({
      request: request({ ...body(), item_version: 'stale' }),
      params: { service: 'reactions' },
    });
    assert.equal(invalid.status, 400);
  } finally {
    getStore().close();
    globalThis.fetch = previous.fetch;
    if (previous.db === undefined) delete process.env.OEFENSCHRIFT_DB;
    else process.env.OEFENSCHRIFT_DB = previous.db;
    if (previous.secret === undefined) delete process.env.OEFENSCHRIFT_ADMIN_SECRET;
    else process.env.OEFENSCHRIFT_ADMIN_SECRET = previous.secret;
    resetLimits();
    rmSync(directory, { recursive: true, force: true });
  }
});

test('restoring ratings has its own read budget and leaves the existing write cap intact', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'exercise-reaction-budgets-'));
  const previous = {
    db: process.env.OEFENSCHRIFT_DB,
    secret: process.env.OEFENSCHRIFT_ADMIN_SECRET,
    fetch: globalThis.fetch,
  };
  process.env.OEFENSCHRIFT_DB = join(directory, 'api.sqlite3');
  process.env.OEFENSCHRIFT_ADMIN_SECRET = 'synthetic-reaction-budget-secret';
  globalThis.fetch = async () => {
    throw Error('No provider should be called.');
  };
  resetLimits();
  try {
    assert.deepEqual(RULES.pass.reactions, [
      [60_000, 60],
      [86_400_000, 600],
    ]);
    assert.deepEqual(RULES.address.reactions, [
      [60_000, 120],
      [86_400_000, 3000],
    ]);
    assert.deepEqual(RULES.pass.reactionReads, [
      [60_000, 180],
      [86_400_000, 6000],
    ]);
    assert.deepEqual(RULES.address.reactionReads, [
      [60_000, 1200],
      [86_400_000, 12000],
    ]);
    const origin = 'http://127.0.0.1:8766';
    const pass = issuePass();
    const request = (data: unknown, endpoint = 'reactions') =>
      new Request(origin + '/api/' + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: origin,
          Cookie: pass.header.split(';')[0],
        },
        body: JSON.stringify(data),
      });
    const send = (data: unknown) =>
      action({ request: request(data), params: { service: 'reactions' } });
    const id = passId(request(read()));
    for (let i = 0; i < 121; i++) assert.equal((await send(read())).status, 200, `read ${i + 1}`);
    assert.equal(
      remaining('pass', id, 'reactions'),
      600,
      '121 restore reads consumed no write allowance',
    );
    assert.equal(remaining('pass', id, 'reactionReads'), 6000 - 121);
    for (const data of [
      { ...body(), operation: ['get'] },
      { ...body(), operation: 'get ' },
      { ...read(), value: 'like' },
    ])
      assert.equal(
        (await send(data)).status,
        400,
        'malformed operations never become writes or bypass validation',
      );
    assert.equal(getStore().db.prepare('SELECT COUNT(*) n FROM exercise_reactions').get().n, 0);
    await assert.rejects(
      action({ request: request(read(), 'reactionReads'), params: { service: 'reactionReads' } }),
      (error: any) => error instanceof Response && error.status === 404,
    );
    resetLimits();
    for (let i = 0; i < 121; i++) assert.equal((await send(read())).status, 200);
    for (let i = 0; i < 60; i++)
      assert.equal((await send(body(i % 2 ? 'dislike' : 'like'))).status, 200, `write ${i + 1}`);
    const refused = await send(body());
    assert.equal(refused.status, 429, 'the existing 60/minute write cap still applies');
    assert.equal((await refused.json()).code, 'rate_limited');
    const restored = await send(read());
    assert.equal(restored.status, 200, 'write exhaustion does not block restore reads');
    assert.deepEqual(await restored.json(), { value: 'dislike' });
  } finally {
    getStore().close();
    globalThis.fetch = previous.fetch;
    if (previous.db === undefined) delete process.env.OEFENSCHRIFT_DB;
    else process.env.OEFENSCHRIFT_DB = previous.db;
    if (previous.secret === undefined) delete process.env.OEFENSCHRIFT_ADMIN_SECRET;
    else process.env.OEFENSCHRIFT_ADMIN_SECRET = previous.secret;
    resetLimits();
    rmSync(directory, { recursive: true, force: true });
  }
});
