import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  complete,
  defaults,
  flatten,
  mistakes,
  questionFingerprint,
  restore,
  save,
  startSession,
  STORAGE_KEY,
} from '../app/domain/study';
import migration from '../content/migrations/2026-10-27-voices.json';

const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
const id = 'A2:listening:tandarts:1';
const item = structuredClone(catalogue.find((item) => item.id === id));
item.audio = migration.previousAudio[id].audio;
item.revision = migration.previousAudio[id].revision;
const changedAudio = { ...item, audio: 'audio/replacement-native-dutch.mp3' };
const restoreState = (state, bank = [changedAudio]) =>
  restore({ getItem: (key) => (key === STORAGE_KEY ? JSON.stringify(state) : null) }, bank);

// Frozen pre-migration q1 algorithm: includes the former top-level audio URL.
function legacyFingerprint(item, question) {
  const source = JSON.stringify([
    item.level,
    item.part,
    item.text ?? '',
    item.transcript ?? '',
    item.audio ?? '',
    question.id,
    question.prompt,
    Object.entries(question.options),
    question.answer,
    question.explanation,
  ]);
  let hash = 2166136261;
  for (let i = 0; i < source.length; i++) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `q1:${(hash >>> 0).toString(16)}`;
}

function legacyProgress(source = item) {
  const state = defaults();
  state.active = {
    ...startSession([source.id], 'practice', [source], 1000),
    setId: 'voice-migration-test',
  };
  for (const { q, key } of flatten(state.active, [source])) {
    state.active.answers[key] = Object.keys(q.options).find((key) => key !== q.answer);
    state.active.checked[key] = true;
  }
  const done = complete(state, [source], 2000);
  done.sessions['voice-migration-test'] = structuredClone(done.active);
  for (const question of source.questions)
    done.records[source.id].responses[question.id].fingerprint = legacyFingerprint(
      source,
      question,
    );
  return done;
}

test('q1 voice replacement retains mistakes, completed scores and checked set answers', () => {
  const before = legacyProgress();
  const restored = restoreState(before);
  const record = restored.records[id];
  assert.equal(record.correct, 0);
  assert.equal(record.total, item.questions.length);
  assert.equal(record.revision, item.revision);
  assert.deepEqual(restored.active.answers, before.active.answers);
  assert.deepEqual(restored.active.checked, before.active.checked);
  assert.deepEqual(restored.sessions, before.sessions);
  assert.equal(mistakes(changedAudio, record).length, item.questions.length);
  for (const question of item.questions)
    assert.equal(
      record.responses[question.id].fingerprint,
      questionFingerprint(changedAudio, question),
    );

  // Persist the migration, then change the URL again without needing another alias.
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  assert.equal(save(storage, restored), true);
  const later = { ...changedAudio, audio: 'audio/later-generated-voice.mp3' };
  assert.equal(
    mistakes(later, restore(storage, [later]).records[id]).length,
    item.questions.length,
  );
});

test('every recorded voice replacement can recover its exact prior q1 answers', () => {
  assert.equal(Object.keys(migration.previousAudio).length, 16);
  for (const [id, previous] of Object.entries(migration.previousAudio)) {
    const source = { ...catalogue.find((item) => item.id === id), ...previous };
    const updated = { ...source, audio: 'audio/newly-generated-conversation.mp3' };
    const record = restoreState(legacyProgress(source), [updated]).records[id];
    assert.equal(mistakes(updated, record).length, source.questions.length, id);
    assert.ok(
      Object.values(record.responses).every((response) => response.fingerprint.startsWith('q2:')),
      id,
    );
  }
});

test('q1 aliases match exact question content and require the reviewed revision', () => {
  const state = legacyProgress();
  for (const edit of [
    (question) => (question.prompt += ' Nieuw.'),
    (question) => (question.options.A += ' Gewijzigd.'),
    (question) =>
      (question.answer = Object.keys(question.options).find((k) => k !== question.answer)),
    (question) => (question.explanation += ' Nieuwe uitleg.'),
  ]) {
    const edited = structuredClone(changedAudio);
    edit(edited.questions[0]);
    const record = restoreState(state, [edited]).records[id];
    assert.equal(record.responses?.[edited.questions[0].id], undefined);
    assert.equal(Object.keys(record.responses || {}).length, item.questions.length - 1);
  }
  const newText = { ...changedAudio, text: changedAudio.text + '\nNieuwe inhoud.' };
  assert.equal(restoreState(state, [newText]).records[id].responses, undefined);
  const newRevision = { ...changedAudio, revision: 'c1:changed-reviewed-source' };
  const rewritten = restoreState(state, [newRevision]);
  assert.equal(rewritten.records[id], undefined);
  assert.equal(rewritten.active, null);
  assert.deepEqual(rewritten.sessions, {});
  assert.deepEqual(mistakes(newRevision, state.records[id]), []);

  const missingRevision = legacyProgress();
  delete missingRevision.records[id].revision;
  assert.equal(restoreState(missingRevision).records[id]?.responses, undefined);
});

test('unknown old audio and mismatched alias revisions cannot migrate q1 mistakes', () => {
  const unknown = legacyProgress({ ...item, audio: 'audio/unknown-old-file.mp3' });
  assert.equal(restoreState(unknown).records[id].responses, undefined);
  const changedRevision = { ...changedAudio, revision: 'c1:another-reviewed-source' };
  const staleAlias = legacyProgress({ ...item, revision: changedRevision.revision });
  assert.equal(restoreState(staleAlias, [changedRevision]).records[id].responses, undefined);
});

test('unrelated exact q1 checksums migrate and altered q2 questions still invalidate', () => {
  const reading = structuredClone(catalogue.find((item) => item.part === 'reading'));
  const state = legacyProgress(reading);
  const restored = restoreState(state, [reading]);
  assert.equal(mistakes(reading, restored.records[reading.id]).length, reading.questions.length);
  assert.ok(
    Object.values(restored.records[reading.id].responses).every((r) =>
      r.fingerprint.startsWith('q2:'),
    ),
  );
  const changed = structuredClone(reading);
  changed.questions[0].prompt += ' Meer context.';
  const afterEdit = restoreState(restored, [changed]).records[reading.id];
  assert.equal(afterEdit.responses?.[changed.questions[0].id], undefined);
});

test('new q2 completions keep mistakes through derived media replacement', () => {
  const active = startSession([item.id], 'practice', [item], 1000);
  for (const { q, key } of flatten(active, [item]))
    active.answers[key] = Object.keys(q.options).find((key) => key !== q.answer);
  const state = complete({ ...defaults(), active }, [item], 2000);
  const restored = restoreState(state);
  assert.equal(mistakes(changedAudio, restored.records[id]).length, item.questions.length);
  assert.equal(
    questionFingerprint(item, item.questions[0]),
    questionFingerprint(changedAudio, item.questions[0]),
  );
});
