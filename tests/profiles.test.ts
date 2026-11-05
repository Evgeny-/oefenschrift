import test from 'node:test';
import assert from 'node:assert/strict';
import { defaults, restore, save } from '../app/domain/study';
import { STORAGE_KEY } from '../app/domain/persistence';
import {
  MAIN_PROFILE,
  MAX_PROFILES,
  PROFILES_KEY,
  activeProfile,
  addProfile,
  disableTeacher,
  enableTeacher,
  profileSlot,
  readProfiles,
  removeProfile,
  renameProfile,
  selectProfile,
  writeProfiles,
} from '../app/domain/profiles';
import { profileSummary } from '../app/domain/class-overview';

function memory(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => void values.set(key, value),
    removeItem: (key) => void values.delete(key),
  };
}
const catalogue = [
  {
    id: 'r1',
    part: 'reading',
    level: 'A2',
    revision: 'x',
    questions: [
      { id: 'q1', prompt: '', options: { A: 'a', B: 'b' }, answer: 'A', explanation: '' },
      { id: 'q2', prompt: '', options: { A: 'a', B: 'b' }, answer: 'B', explanation: '' },
    ],
  },
  { id: 'w1', part: 'writing', level: 'A2', revision: 'x' },
  { id: 'w2', part: 'writing', level: 'B1', revision: 'x' },
] as any[];

test('a browser without a registry keeps using the ordinary study key', () => {
  const storage = memory();
  assert.equal(activeProfile(storage), MAIN_PROFILE);
  assert.equal(profileSlot(MAIN_PROFILE), STORAGE_KEY);
  const state = defaults();
  state.records.w1 = { completed: true, kind: 'self', at: 5, revision: 'x' };
  assert.equal(save(storage, state), true);
  assert.ok(storage.values.has(STORAGE_KEY));
  assert.equal(storage.values.size, 1);
});

test('teacher mode names existing progress as the first profile and keeps it in place', () => {
  const storage = memory();
  const on = enableTeacher(null, '  Anna   de Vries ', 10);
  assert.deepEqual(on, {
    version: 1,
    teacher: true,
    active: MAIN_PROFILE,
    list: [{ id: MAIN_PROFILE, name: 'Anna de Vries', createdAt: 10 }],
  });
  assert.ok(writeProfiles(storage, on));
  assert.deepEqual(readProfiles(storage), on);
  // Enabling again keeps the list.
  const added = addProfile(on, 'Bram', 'abcdef123456', 11)!;
  assert.equal(enableTeacher({ ...added, teacher: false }, 'X').list.length, 2);
});

test('profiles keep separate progress under their own keys', () => {
  const storage = memory();
  let profiles = addProfile(enableTeacher(null, 'Anna'), 'Bram', 'abcdef123456')!;
  const anna = defaults(),
    bram = defaults();
  anna.records.w1 = { completed: true, kind: 'self', at: 1, revision: 'x' };
  bram.settings.level = 'B1';
  bram.records.w2 = { completed: true, kind: 'ai', at: 2, revision: 'x' };
  save(storage, anna, profileSlot(MAIN_PROFILE));
  save(storage, bram, profileSlot('abcdef123456'));
  assert.deepEqual(Object.keys(restore(storage, catalogue).records), ['w1']);
  const restored = restore(storage, catalogue, profileSlot('abcdef123456'));
  assert.deepEqual(Object.keys(restored.records), ['w2']);
  assert.equal(restored.settings.level, 'B1');
  profiles = selectProfile(profiles, 'abcdef123456')!;
  writeProfiles(storage, profiles);
  assert.equal(activeProfile(storage), 'abcdef123456');
});

test('turning teacher mode off returns to the first profile and keeps the others', () => {
  const profiles = selectProfile(
    addProfile(enableTeacher(null, 'Anna'), 'Bram', 'abcdef123456')!,
    'abcdef123456',
  )!;
  const off = disableTeacher(profiles);
  assert.equal(off.teacher, false);
  assert.equal(off.active, MAIN_PROFILE);
  assert.equal(off.list.length, 2);
});

test('names are cleaned, limited and required; the list has a ceiling', () => {
  let profiles = enableTeacher(null, 'Anna');
  assert.equal(addProfile(profiles, '   '), null);
  assert.equal(addProfile(profiles, 'x'.repeat(80))!.list[1].name.length, 40);
  assert.equal(renameProfile(profiles, MAIN_PROFILE, 'Ann')!.list[0].name, 'Ann');
  assert.equal(renameProfile(profiles, 'missing1', 'Ann'), null);
  for (let i = 1; i < MAX_PROFILES; i++) profiles = addProfile(profiles, `L${i}`)!;
  assert.equal(profiles.list.length, MAX_PROFILES);
  assert.equal(addProfile(profiles, 'One too many'), null);
});

test('deleting removes the learner and their saved progress, never the one in use', () => {
  const storage = memory();
  const profiles = addProfile(enableTeacher(null, 'Anna'), 'Bram', 'abcdef123456')!;
  writeProfiles(storage, profiles);
  save(storage, defaults(), profileSlot('abcdef123456'));
  assert.equal(removeProfile(storage, profiles, MAIN_PROFILE), null);
  const next = removeProfile(storage, profiles, 'abcdef123456')!;
  assert.deepEqual(
    next.list.map((p) => p.id),
    [MAIN_PROFILE],
  );
  assert.equal(storage.getItem(profileSlot('abcdef123456')), null);
  assert.deepEqual(readProfiles(storage), next);
  // The last profile stays.
  assert.equal(removeProfile(storage, next, MAIN_PROFILE), null);
});

test('a damaged registry falls back to the ordinary profile', () => {
  for (const raw of [
    '{',
    '{"version":1,"list":[]}',
    '{"version":2}',
    '{"version":1,"list":[{"id":"../x","name":"A"}]}',
  ])
    assert.equal(activeProfile(memory({ [PROFILES_KEY]: raw })), MAIN_PROFILE);
  const kept = readProfiles(
    memory({
      [PROFILES_KEY]: JSON.stringify({
        version: 1,
        teacher: true,
        active: 'gone12345678',
        list: [
          { id: 'main', name: 'Anna' },
          { id: 'main', name: 'Twin' },
          { id: 'BAD', name: 'Bad' },
        ],
      }),
    }),
  )!;
  assert.deepEqual(kept.list, [{ id: 'main', name: 'Anna', createdAt: 0 }]);
  assert.equal(kept.active, MAIN_PROFILE);
});

test('the overview counts work at the learner level, scores and mistakes', () => {
  const state = defaults();
  state.records.r1 = {
    completed: true,
    kind: 'quiz',
    correct: 1,
    total: 2,
    at: 30,
    revision: 'x',
  };
  state.records.w1 = { completed: true, kind: 'self', at: 20, revision: 'x' };
  state.records.w2 = { completed: true, kind: 'self', at: 99, revision: 'x' };
  const summary = profileSummary(state, catalogue);
  assert.deepEqual(summary.parts.reading, { done: 1, total: 1, score: 50 });
  assert.deepEqual(summary.parts.writing, { done: 1, total: 1, score: null });
  assert.equal(summary.last, 30);
});
