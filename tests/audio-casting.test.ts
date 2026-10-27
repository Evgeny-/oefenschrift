import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  audioCastingFor,
  audioVoicesForItem,
  assertDistinctAudioVoices,
  clipWithCasting,
  validateAudioCasting,
} from '../scripts/audio-casting';
import { audioCacheInput, audioProfileFor, voiceSettingsFor } from '../scripts/audio-profile';

const fixture = () => ({
  model: 'synthetic-model',
  settings: { stability: 0.5, speed: 1 },
  profiles: { A1: { speedMultiplier: 0.82, gapSeconds: 0.9 } },
  roles: {
    'm-young': { voice_id: 'main-male', speed: 1, a1Speed: 0.9 },
    'f-adult': { voice_id: 'main-female', speed: 0.95, a1Speed: 0.92 },
    'm-casual': { voice_id: 'casual-male', speed: 0.98, a1Speed: 0.88 },
    'f-mature': { voice_id: 'mature-female', speed: 0.97, a1Speed: 0.91 },
  },
  casting: { 'synthetic:casual': { 'm-young': 'm-casual', 'f-adult': 'f-mature' } },
});
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('exercise casting uses alternate voices and their pacing across every B1 fragment', () => {
  const voices = fixture();
  const before = JSON.stringify(voices);
  validateAudioCasting(voices);
  for (const turns of [
    [{ role: 'm-young' }, { role: 'f-adult' }],
    [{ role: 'f-adult' }, { role: 'm-young' }, { role: 'f-adult' }],
  ]) {
    const resolved = audioVoicesForItem(voices, 'synthetic:casual');
    assertDistinctAudioVoices(turns, resolved);
    assert.equal(resolved.roles['m-young'].voice_id, 'casual-male');
    assert.equal(resolved.roles['f-adult'].voice_id, 'mature-female');
    assert.equal(voiceSettingsFor(resolved, 'm-young').speed, 0.98);
    const profile = audioProfileFor({ level: 'A1' }, resolved);
    assert.equal(voiceSettingsFor(resolved, 'm-young', profile).speed, 0.88);
    assert.equal(voiceSettingsFor(resolved, 'f-adult', profile).speed, 0.91);
    assert.deepEqual(
      audioCastingFor(
        voices,
        'synthetic:casual',
        turns.map((turn) => turn.role),
      ),
      Object.fromEntries(
        [...new Set(turns.map((turn) => turn.role))].map((role) => [
          role,
          role === 'm-young' ? 'm-casual' : 'f-mature',
        ]),
      ),
    );
  }
  assert.equal(JSON.stringify(voices), before);
});

test('no casting keeps exact legacy cache input, while resolved IDs/settings distinguish overrides', () => {
  const voices = fixture();
  const turns = [{ role: 'm-young' }, { role: 'f-adult' }];
  const cache = (configuration: any) =>
    audioCacheInput({
      text: 'Synthetic source.',
      turns,
      roles: Object.fromEntries(
        turns.map(({ role }) => [role, configuration.roles[role].voice_id]),
      ),
      mode: 'stitched',
      voices: configuration,
      pipeline: 'pcm-gain-single-encode',
      rate: 44100,
    });
  assert.equal(audioVoicesForItem(voices, 'synthetic:other'), voices);
  assert.equal(
    JSON.stringify(cache(audioVoicesForItem(voices, 'synthetic:other'))),
    JSON.stringify(cache(voices)),
  );
  assert.equal(audioCastingFor(voices, 'synthetic:other', ['m-young']), undefined);
  const override = cache(audioVoicesForItem(voices, 'synthetic:casual'));
  assert.notEqual(hash(override), hash(cache(voices)));
  assert.deepEqual(override.roles, { 'm-young': 'casual-male', 'f-adult': 'mature-female' });
  assert.equal(override.settings['m-young'].speed, 0.98);
  assert.deepEqual(
    Object.keys(override.roles),
    ['m-young', 'f-adult'],
    'reviewed source role labels remain intact',
  );
  assert.ok(
    !Object.hasOwn(override, 'casting'),
    'actual IDs/settings already describe cache identity',
  );
});

test('casting rejects unknown roles and cycles, and conversations reject duplicate effective voices', () => {
  const voices = fixture();
  for (const casting of [
    null,
    [],
    { item: null },
    { item: { missing: 'm-casual' } },
    { item: { 'm-young': 'missing' } },
    { item: { 'm-young': 1 } },
  ])
    assert.throws(() => validateAudioCasting({ ...voices, casting }), /casting/i);
  for (const mapping of [
    { 'm-young': 'm-young' },
    { 'm-young': 'm-casual', 'm-casual': 'm-young' },
  ])
    assert.throws(() => validateAudioCasting({ ...voices, casting: { item: mapping } }), /cycle/);
  const duplicate = { ...voices, casting: { item: { 'm-young': 'f-adult' } } };
  validateAudioCasting(duplicate);
  assert.throws(
    () =>
      assertDistinctAudioVoices(
        [{ role: 'm-young' }, { role: 'f-adult' }],
        audioVoicesForItem(duplicate, 'item'),
      ),
    /different effective voices/,
  );
  assert.throws(
    () => assertDistinctAudioVoices([{ role: 'm-young' }, { role: 'm-young' }], voices),
    /two different voice roles/,
  );
  assert.throws(() => assertDistinctAudioVoices([{ role: 'missing' }], voices), /no voice_id/);
  const chain = { ...voices, casting: { item: { 'm-young': 'm-casual', 'm-casual': 'f-mature' } } };
  validateAudioCasting(chain);
  assert.deepEqual(audioCastingFor(chain, 'item', ['m-young']), { 'm-young': 'f-mature' });
});

test('unknown, cyclic and duplicate voice casting fail before a provider request', () => {
  const directory = mkdtempSync(join(tmpdir(), 'audio-casting-invalid-'));
  try {
    const file = join(directory, 'items.json');
    const voiceFile = join(directory, 'voices.json');
    const guard = join(directory, 'guard.mjs');
    writeFileSync(
      file,
      JSON.stringify([
        {
          id: 'item',
          part: 'listening',
          level: 'A2',
          script: [
            { role: 'm-young', text: 'Hallo.' },
            { role: 'f-adult', text: 'Goedendag.' },
          ],
        },
      ]),
    );
    writeFileSync(
      guard,
      "globalThis.fetch = async () => { throw Error('UNEXPECTED_PROVIDER_REQUEST'); };\n",
    );
    for (const [mapping, expected] of [
      [{ 'm-young': 'missing' }, /unknown voice role/],
      [{ 'm-young': 'm-casual', 'm-casual': 'm-young' }, /cycle/],
      [{ 'm-young': 'f-adult' }, /different effective voices/],
    ] as const) {
      writeFileSync(voiceFile, JSON.stringify({ ...fixture(), casting: { item: mapping } }));
      const result = spawnSync(
        process.execPath,
        [
          '--import',
          'tsx',
          '--import',
          guard,
          'scripts/audio.ts',
          '--file',
          file,
          '--voices',
          voiceFile,
          '--generate',
        ],
        { encoding: 'utf8' },
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, expected);
      assert.doesNotMatch(result.stderr + result.stdout, /UNEXPECTED_PROVIDER_REQUEST/);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('reused clips refresh casting provenance without mutating audio metadata or the original entry', () => {
  const original = {
    file: 'audio/unchanged.mp3',
    roles: { 'm-young': 'same-voice' },
    casting: { 'm-young': 'old-alias' },
  };
  const updated = clipWithCasting(original, { 'm-young': 'm-casual' });
  assert.equal(updated.file, original.file);
  assert.equal(updated.roles, original.roles);
  assert.deepEqual(updated.casting, { 'm-young': 'm-casual' });
  assert.deepEqual(original.casting, { 'm-young': 'old-alias' });
  assert.deepEqual(clipWithCasting(updated), { file: original.file, roles: original.roles });
});

test('saved listening preferences block rejected voice pairs after effective casting', () => {
  const voices = {
    ...fixture(),
    disallowedPairings: [
      { voiceIds: ['main-male', 'main-female'], reason: 'Synthetic energy mismatch.' },
    ],
  };
  const turns = [{ role: 'm-young' }, { role: 'f-adult' }];
  assert.throws(() => assertDistinctAudioVoices(turns, voices), /saved listening preference/);
  assert.doesNotThrow(() =>
    assertDistinctAudioVoices(turns, audioVoicesForItem(voices, 'synthetic:casual')),
  );
});
