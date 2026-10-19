import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  defaults,
  startSession,
  flatten,
  complete,
  reviewOpen,
  restore,
  STORAGE_KEY,
  matchesSet,
  savedSetSession,
  keepSetSessions,
  skipQuestion,
  skipOpen,
  previousOpen,
  retrySession,
} from '../app/domain/study.ts';
import { routePath, readRoute, sessionRoute } from '../app/domain/routes.ts';
const catalogue = JSON.parse(
  fs.readFileSync(new URL('../content/catalogue.json', import.meta.url)),
);
const sets = JSON.parse(fs.readFileSync(new URL('../content/practice-sets.json', import.meta.url)));
const make = (set) => ({ ...startSession(set.ids, 'practice', catalogue, 1000), setId: set.id });
const restoreState = (state) =>
  restore({ getItem: (key) => (key === STORAGE_KEY ? JSON.stringify(state) : null) }, catalogue);
test('stable practice sets cover each exercise exactly once with no mixed subjects or levels', () => {
  const ids = sets.flatMap((set) => set.ids);
  assert.equal(new Set(ids).size, catalogue.length);
  assert.equal(ids.length, catalogue.length);
  for (const set of sets) {
    // Two texts for a B1 reading drill, up to ten facts for a KNM theme (blueprint §11).
    const minimum =
      set.level === 'B1' && set.part === 'listening'
        ? 1
        : set.level === 'B1' && ['reading', 'writing'].includes(set.part)
          ? 2
          : 3;
    const maximum = set.part === 'knm' ? 10 : 5;
    assert.ok(set.ids.length >= minimum && set.ids.length <= maximum);
    for (const id of set.ids) {
      const item = catalogue.find((i) => i.id === id);
      assert.equal(item.part, set.part);
      if (item.part !== 'knm') assert.equal(item.level, set.level);
    }
  }
});
test('closed sets retain all questions until the final result and survive a reload', () => {
  const set = sets.find((s) => s.part === 'listening' && s.level === 'A2');
  let state = { ...defaults(), active: make(set) };
  const questions = flatten(state.active, catalogue);
  assert.ok(questions.length > 1);
  for (let n = 0; n < questions.length - 1; n++) {
    const { key, q } = questions[n];
    state.active.answers[key] = q.answer;
    state.active.checked[key] = true;
    state.active.index = n;
  }
  state = restoreState(state);
  assert.ok(matchesSet(state.active, set));
  assert.equal(complete(state, catalogue), state);
  const last = questions.at(-1);
  state.active.answers[last.key] = last.q.answer;
  state = complete(state, catalogue, 9000);
  assert.equal(state.active.endedAt, 9000);
  for (const id of set.ids) assert.equal(state.records[id].completed, true);
  assert.equal(routePath(sessionRoute(state.active)), `/sets/${set.id}`);
  assert.equal(readRoute(new URL(`http://localhost/sets/${set.id}`)), `set/${set.id}`);
});
test('open sets advance after review, keep drafts, and finish only after the last exercise', () => {
  const set = sets.find((s) => s.part === 'writing' && s.level === 'A2');
  let state = { ...defaults(), active: make(set) };
  assert.equal(complete(state, catalogue), state);
  state.drafts[set.ids[0]] = 'Mijn antwoord.';
  state = reviewOpen(state, set.ids[0], 'ai', true, 2000);
  assert.equal(state.active.index, 1);
  assert.equal(state.active.endedAt, null);
  state = restoreState(state);
  assert.equal(state.drafts[set.ids[0]], 'Mijn antwoord.');
  assert.equal(state.records[set.ids[0]].kind, 'ai');
  for (let n = 1; n < set.ids.length; n++)
    state = reviewOpen(state, set.ids[n], 'self', true, 3000 + n);
  assert.ok(state.active.endedAt);
  assert.equal(state.active.index, set.ids.length - 1);
  assert.ok(set.ids.every((id) => state.records[id].completed));
});
test('switching subjects preserves each unfinished set independently', () => {
  const reading = sets.find((s) => s.part === 'reading'),
    writing = sets.find((s) => s.part === 'writing');
  let state = { ...defaults(), active: make(reading) };
  const answer = flatten(state.active, catalogue)[0];
  state.active.answers[answer.key] = 'A';
  state = keepSetSessions(state, { ...state, active: make(writing) });
  state = keepSetSessions(state, reviewOpen(state, writing.ids[0], 'ai', true, 4000));
  state = restoreState(state);
  assert.equal(savedSetSession(state, reading).answers[answer.key], 'A');
  assert.equal(savedSetSession(state, writing).index, 1);
  assert.equal(savedSetSession(state, { ...reading, ids: reading.ids.slice(1) }), null);
});
test('a skipped question scores as unanswered, survives a reload and returns in the retry', () => {
  const set = sets.find((s) => s.part === 'reading' && s.level === 'A2');
  let state = { ...defaults(), active: make(set) };
  const questions = flatten(state.active, catalogue);
  const [first, second] = questions;
  // A chosen but unchecked option is dropped when the question is skipped.
  state.active.answers[first.key] = first.q.answer;
  state = skipQuestion(state, catalogue, 2000);
  assert.equal(state.active.index, 1);
  assert.equal(state.active.answers[first.key], undefined);
  assert.deepEqual(state.active.skipped, [first.key]);
  state.active.answers[second.key] = second.q.answer;
  state.active.checked[second.key] = true;
  assert.equal(skipQuestion(state, catalogue), state, 'a checked question cannot be skipped');
  state = restoreState(state);
  assert.deepEqual(state.active.skipped, [first.key]);
  for (let n = 2; n < questions.length; n++) {
    state.active.index = n;
    state = skipQuestion(state, catalogue, 3000 + n);
  }
  assert.ok(state.active.endedAt);
  const record = state.records[first.item.id];
  assert.equal(record.correct, 1);
  assert.equal(record.responses[first.q.id], undefined);
  assert.equal(record.responses[second.q.id].selected, second.q.answer);
  const retry = retrySession(state.active, catalogue, 9000);
  assert.ok(retry.questions.includes(first.key));
  assert.ok(!retry.questions.includes(second.key));
});
test('skipping an open task moves the set on without a review and can end it', () => {
  const set = sets.find((s) => s.part === 'speaking' && s.level === 'A2');
  let state = { ...defaults(), active: make(set) };
  state = skipOpen(state, set.ids[0], 2000);
  assert.equal(state.active.index, 1);
  assert.equal(state.records[set.ids[0]], undefined);
  assert.equal(skipOpen(state, set.ids[0], 2100), state, 'only the current task can be skipped');
  state = reviewOpen(state, set.ids[1], 'self', true, 2200);
  for (let n = 2; n < set.ids.length; n++) state = skipOpen(state, set.ids[n], 3000 + n);
  assert.ok(state.active.endedAt);
  assert.deepEqual(state.active.skipped, [set.ids[0], ...set.ids.slice(2)]);
  assert.equal(state.records[set.ids[1]].kind, 'self');
});
test('going back in an open set keeps drafts, and a reviewed task passed again is not skipped', () => {
  const set = sets.find((s) => s.part === 'writing' && s.level === 'A2');
  let state = { ...defaults(), active: make(set) };
  assert.equal(previousOpen(state, set.ids[0]), state, 'the first task has nothing before it');
  state = skipOpen(state, set.ids[0], 2000);
  state.drafts[set.ids[1]] = 'Mijn concept.';
  state = previousOpen(state, set.ids[1]);
  assert.equal(state.active.index, 0);
  assert.equal(state.drafts[set.ids[1]], 'Mijn concept.');
  // Reviewing the skipped task after all takes it off the skipped list.
  state = reviewOpen(state, set.ids[0], 'self', true, 3000);
  assert.deepEqual(state.active.skipped, []);
  state = previousOpen(state, set.ids[1]);
  state = skipOpen(state, set.ids[0], 4000);
  assert.equal(state.active.index, 1);
  assert.deepEqual(state.active.skipped, [], 'passing a reviewed task again is not a skip');
});
