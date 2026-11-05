import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { ContentStore } from '../server/store';
import { isNewSet, NEW_SET_DAYS } from '../app/domain/new-sets';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8')),
  sets = JSON.parse(readFileSync('content/practice-sets.json', 'utf8'));

test('a set is new for one week after it was added', () => {
  const added = '2026-11-05T12:00:00.000Z',
    at = Date.parse(added),
    day = 86_400_000;
  assert.equal(isNewSet({ added }, at), true);
  assert.equal(isNewSet({ added }, at + (NEW_SET_DAYS - 1) * day), true);
  assert.equal(isNewSet({ added }, at + NEW_SET_DAYS * day), false);
  assert.equal(isNewSet({}, at), false);
  assert.equal(isNewSet({ added: 'not a date' }, at), false);
});

test('the server dates only sets that join an existing database', () => {
  const path = mkdtempSync(join(tmpdir(), 'oefenschrift-new-sets-')),
    db = join(path, 'test.sqlite3');
  try {
    const [later, ...first] = sets;
    let store = new ContentStore(db, catalogue, first);
    assert.ok(store.sets().every((set) => !set.added));
    store.close();
    const before = Date.now();
    store = new ContentStore(db, catalogue, sets);
    const dated = store.sets().filter((set) => set.added);
    assert.deepEqual(
      dated.map((set) => set.id),
      [later.id],
    );
    assert.ok(Date.parse(dated[0].added!) >= before - 1000);
    assert.equal(isNewSet(dated[0]), true);
    store.close();
    // A restart keeps the first date instead of renewing it.
    store = new ContentStore(db, catalogue, sets);
    assert.equal(store.sets().find((set) => set.id === later.id)!.added, dated[0].added);
    store.close();
  } finally {
    rmSync(path, { recursive: true, force: true });
  }
});
