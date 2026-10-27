import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import {
  audioCacheInput,
  audioModeFor,
  audioProfileFor,
  turnGapFor,
  voiceSettingsFor,
} from '../scripts/audio-profile';

const voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));
const turns = [{ role: 'f-young' }, { role: 'm-adult' }],
  roles = Object.fromEntries(turns.map((turn) => [turn.role, voices.roles[turn.role].voice_id]));
const sha = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

test('A1 slows native roles, lengthens pauses and forces stitched synthesis', () => {
  const before = JSON.stringify(voices),
    profile = audioProfileFor({ level: 'A1' }, voices);
  assert.deepEqual(profile, { name: 'A1', speedMultiplier: 0.82, gapSeconds: 0.9 });
  assert.equal(
    voiceSettingsFor(voices, 'f-young', profile).speed,
    0.7,
    'the provider minimum is respected',
  );
  assert.equal(
    voiceSettingsFor(voices, 'narrator', profile).speed,
    0.779,
    'question narration uses the slower profile',
  );
  assert.ok(
    voiceSettingsFor(voices, 'm-adult', profile).speed < voiceSettingsFor(voices, 'm-adult').speed,
  );
  assert.equal(turnGapFor(voices, profile), 0.9);
  assert.equal(audioModeFor({ level: 'A1', audioMode: 'dialogue' }, turns, voices), 'stitched');
  assert.equal(JSON.stringify(voices), before, 'shared voice configuration is unchanged');
  assert.throws(() => audioProfileFor({ level: 'A1' }, { ...voices, profiles: undefined }));
});

test('A2 and B1 retain the exact legacy synthesis settings and cache input bytes', () => {
  for (const level of ['A2', 'B1']) {
    const profile = audioProfileFor({ level }, voices);
    assert.equal(profile, undefined);
    assert.equal(turnGapFor(voices, profile), Number(voices.gapSeconds || 0.45));
    assert.equal(audioModeFor({ level, audioMode: 'dialogue' }, turns, voices), 'dialogue');
    for (const role of ['f-young', 'm-adult', 'narrator'])
      assert.deepEqual(voiceSettingsFor(voices, role, profile), {
        ...voices.settings,
        speed: voices.roles[role]?.speed ?? voices.settings.speed ?? 1,
      });
    for (const mode of ['stitched', 'dialogue'] as const)
      for (const rate of [44100, 24000]) {
        const legacy = {
          text: 'Synthetic cache regression text.',
          roles,
          model: mode === 'dialogue' ? voices.dialogueModel : voices.model,
          settings:
            mode === 'dialogue' && turns.length > 1
              ? voices.settings
              : Object.fromEntries(
                  turns.map((turn) => [
                    turn.role,
                    {
                      ...voices.settings,
                      speed: voices.roles[turn.role]?.speed ?? voices.settings.speed ?? 1,
                    },
                  ]),
                ),
          mode,
          loudness: voices.loudness,
          pipeline: `pcm-gain-single-encode-${rate}`,
        };
        const current = audioCacheInput({
          ...legacy,
          pipeline: 'pcm-gain-single-encode',
          turns,
          voices,
          rate,
          profile,
        });
        assert.equal(JSON.stringify(current), JSON.stringify(legacy));
        assert.equal(sha(current), sha(legacy));
      }
  }
});

test('A1 cache changes when its speed or turn gap changes, including single-question clips', () => {
  const profile = audioProfileFor({ level: 'A1' }, voices),
    input = {
      text: 'Synthetic question.',
      roles,
      mode: 'stitched' as const,
      turns,
      voices,
      pipeline: 'pcm-gain-single-encode',
      rate: 44100,
      profile,
    },
    current = audioCacheInput(input);
  assert.deepEqual(current.profile, profile);
  assert.equal(current.settings['f-young'].speed, 0.7);
  assert.notEqual(
    sha(current),
    sha(audioCacheInput({ ...input, profile: { ...profile, gapSeconds: 1 } })),
  );
  assert.notEqual(
    sha(current),
    sha(audioCacheInput({ ...input, profile: { ...profile, speedMultiplier: 0.8 } })),
  );
  const question = audioCacheInput({
    ...input,
    turns: [{ role: 'narrator' }],
    roles: { narrator: voices.roles.narrator.voice_id },
  });
  assert.equal(question.settings.narrator.speed, 0.779);
  assert.notEqual(
    sha(question),
    sha(audioCacheInput({ ...input, turns: [{ role: 'narrator' }], profile: undefined })),
  );
});

test('a role can set an explicit A1 speed without multiplying its usual speed', () => {
  const configuration = {
    ...voices,
    roles: { ...voices.roles, synthetic: { speed: 0.85, a1Speed: 0.9 } },
  };
  const profile = audioProfileFor({ level: 'A1' }, configuration);
  assert.equal(voiceSettingsFor(configuration, 'synthetic', profile).speed, 0.9);
  assert.equal(voiceSettingsFor(configuration, 'synthetic').speed, 0.85);
  for (const a1Speed of [0.69, 1.21, NaN, '0.9', null])
    assert.throws(
      () =>
        voiceSettingsFor(
          { ...configuration, roles: { synthetic: { a1Speed } } },
          'synthetic',
          profile,
        ),
      /a1Speed between 0.7 and 1.2/,
    );
});

test('MP3 source cache input cannot alias PCM while explicit PCM retains legacy bytes', () => {
  const input = {
    text: 'Synthetic source-format test.',
    roles,
    mode: 'stitched' as const,
    turns,
    voices,
    pipeline: 'pcm-gain-single-encode',
    rate: 44100,
  };
  const legacy = audioCacheInput(input);
  for (const sourceFormat of ['pcm_44100', 'pcm_24000'])
    assert.equal(
      JSON.stringify(audioCacheInput({ ...input, sourceFormat })),
      JSON.stringify(legacy),
    );
  const mp3 = audioCacheInput({ ...input, sourceFormat: 'mp3_44100_192' });
  assert.equal(mp3.sourceFormat, 'mp3_44100_192');
  assert.notEqual(sha(mp3), sha(legacy));
});
