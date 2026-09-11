import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  defaults,
  startSession,
  restore,
  STORAGE_KEY,
  complete,
  reviewOpen,
  validSession,
} from '../app/domain/study';

const bank = JSON.parse(fs.readFileSync('content/catalogue.json', 'utf8'));
const migration = JSON.parse(
  fs.readFileSync('content/migrations/2026-09-standardization.json', 'utf8'),
);
const rewritten = bank.find(
  (item) => item.part === 'reading' && migration.previousRevisions[item.id],
);
const old = { ...rewritten, revision: migration.previousRevisions[rewritten.id] };
const current = { ...rewritten, revision: 'c1:rewritten-source' };
const unchanged = bank.find(
  (item) => item.part === 'reading' && !migration.previousRevisions[item.id],
);
const restoreState = (state, catalogue) =>
  restore({ getItem: (key) => (key === STORAGE_KEY ? JSON.stringify(state) : null) }, catalogue);

test('rewritten content drops old answers and completion without clearing drafts or unrelated progress', () => {
  const active = { ...startSession([old.id], 'practice', [old], 1000), setId: 'old-set' };
  delete active.revisions;
  active.answers[`${old.id}/${old.questions[0].id}`] = 'A';
  const state = {
    ...defaults(),
    active,
    sessions: { 'old-set': active },
    drafts: { [old.id]: 'Keep my draft text.' },
    records: {
      [old.id]: {
        completed: true,
        kind: 'quiz',
        correct: 1,
        total: old.questions.length,
        at: 2000,
      },
      [unchanged.id]: {
        completed: true,
        kind: 'quiz',
        correct: 1,
        total: unchanged.questions.length,
        at: 2000,
      },
    },
  };
  const result = restoreState(state, [current, unchanged]);
  assert.equal(result.active, null);
  assert.deepEqual(result.sessions, {});
  assert.equal(result.records[old.id], undefined);
  assert.equal(result.records[unchanged.id].completed, true);
  assert.equal(result.drafts[old.id], 'Keep my draft text.');
});

test('sessions and new quiz completion bind to the exact exercise revision', () => {
  const active = startSession([current.id], 'practice', [current], 1000);
  assert.equal(active.revisions[current.id], current.revision);
  for (const question of current.questions)
    active.answers[`${current.id}/${question.id}`] = question.answer;
  const result = complete({ ...defaults(), active }, [current], 2000);
  assert.equal(result.records[current.id].revision, current.revision);
  assert.ok(restoreState(result, [current]).active.endedAt);
  const later = { ...current, revision: 'c1:another-rewrite' };
  assert.equal(validSession(active, [later]), false);
  assert.equal(restoreState(result, [later]).records[current.id], undefined);
});

test('open-task review is invalidated by a rewrite while its draft remains available', () => {
  const item = bank.find((item) => item.part === 'writing');
  const state = {
    ...defaults(),
    active: startSession([item.id], 'practice', [item], 1000),
    drafts: { [item.id]: 'Mijn eigen antwoord.' },
  };
  const result = reviewOpen(state, item.id, 'ai', false, 2000, item.revision);
  assert.equal(restoreState(result, [item]).records[item.id].kind, 'ai');
  const changed = { ...item, revision: 'c1:changed-writing-criteria' };
  const restored = restoreState(result, [changed]);
  assert.equal(restored.records[item.id], undefined);
  assert.equal(restored.drafts[item.id], 'Mijn eigen antwoord.');
});
