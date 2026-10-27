import test from 'node:test';
import assert from 'node:assert/strict';
import { audioProcessingFor, assertProcessingMode } from '../scripts/audio-processing';
import { audioCacheInput } from '../scripts/audio-profile';
import { audioVoicesForItem } from '../scripts/audio-casting';
const voices = {
  model: 'synthetic-model',
  settings: { speed: 1 },
  loudness: { integrated: -18, truePeak: -1.5 },
  roles: {
    older: { voice_id: 'older' },
    mature: { voice_id: 'mature', noiseReduction: 'spectral-v1' },
    adult: { voice_id: 'adult' },
  },
};
const turns = [{ role: 'older' }, { role: 'adult' }];
const cache = (configuration: any) =>
  audioCacheInput({
    text: 'Synthetic test.',
    roles: { older: configuration.roles.older.voice_id, adult: 'adult' },
    mode: 'stitched',
    turns,
    voices: configuration,
    pipeline: 'synthetic',
    rate: 44100,
  });

test('voice cleanup changes cache identity only for clips that use the processed role', () => {
  assert.equal(audioProcessingFor(voices, ['older', 'adult']), undefined);
  const baseline = cache(voices);
  assert.ok(!Object.hasOwn(baseline, 'processing'), 'legacy clips keep their input fields');
  const configured = {
    ...voices,
    roles: { ...voices.roles, older: { ...voices.roles.older, noiseReduction: 'spectral-v1' } },
  };
  const processing = audioProcessingFor(configured, ['older', 'adult', 'older']);
  assert.deepEqual(Object.keys(processing!), ['older']);
  assert.match(processing!.older.filter, /afftdn/);
  assert.notDeepEqual(cache(configured), baseline);
  assert.equal(audioProcessingFor(configured, ['adult']), undefined);
});

test('exercise casting carries the alternate role cleanup and dialogue cannot filter only one speaker', () => {
  const configured = { ...voices, casting: { item: { older: 'mature' } } };
  const resolved = audioVoicesForItem(configured, 'item');
  const processing = audioProcessingFor(resolved, ['older', 'adult']);
  assert.deepEqual(Object.keys(processing!), ['older']);
  assert.equal(processing!.older.preset, 'spectral-v1');
  assert.doesNotThrow(() => assertProcessingMode('stitched', processing));
  assert.doesNotThrow(() => assertProcessingMode('dialogue'));
  assert.throws(() => assertProcessingMode('dialogue', processing), /requires stitched/);
  assert.throws(
    () =>
      audioProcessingFor({ roles: { older: { noiseReduction: 'arbitrary filter' } } }, ['older']),
    /unknown noise-reduction preset/,
  );
});
