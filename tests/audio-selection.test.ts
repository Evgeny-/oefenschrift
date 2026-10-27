import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { audioOption, parseAudioKeys, selectAudioJobs } from '../scripts/audio-selection';
import { reusableClip } from '../scripts/audio';

test('exact key selection preserves source order and leaves every unselected job unchanged', () => {
  const jobs = [
    { key: 'one#fragment', audio: 'old-a' },
    { key: 'one#q1', audio: 'old-b' },
    { key: 'two#fragment', audio: 'old-c' },
  ];
  const before = JSON.stringify(jobs);
  const selected = selectAudioJobs(jobs, parseAudioKeys('["two#fragment","one#fragment"]'));
  assert.deepEqual(selected, [jobs[0], jobs[2]]);
  assert.equal(JSON.stringify(jobs), before);
  assert.equal(selectAudioJobs(jobs), jobs);
  assert.throws(() => selectAudioJobs(jobs, ['one']), /absent from the selected source/);
  for (const invalid of [
    '{',
    '{}',
    '[]',
    '[null]',
    '[1]',
    '[""]',
    '[" one#fragment"]',
    '["one#fragment","one#fragment"]',
  ])
    assert.throws(() => parseAudioKeys(invalid), /Audio keys/);
  assert.equal(audioOption([], '--keys'), undefined);
  assert.equal(audioOption(['--keys', 'tmp/keys.json'], '--keys'), 'tmp/keys.json');
  for (const args of [['--keys'], ['--keys', '--generate'], ['--keys', 'a', '--keys', 'b']])
    assert.throws(() => audioOption(args, '--keys'), /--keys/);
});

test('MP3 source reuse requires MP3 provenance and its own full-bandwidth token', () => {
  const tokenAt = (rate: number) => `token-${rate}`;
  const clip = (sourceFormat?: string, rate = 44100) =>
    ({ file: `audio/token-${rate}.mp3`, script_sha256: 'script', sourceFormat }) as any;
  assert.equal(reusableClip(clip('mp3_44100_192'), 'script', tokenAt, 'mp3_44100_192'), true);
  for (const source of [undefined, 'pcm_44100', 'pcm_24000'])
    assert.equal(reusableClip(clip(source), 'script', tokenAt, 'mp3_44100_192'), false);
  assert.equal(
    reusableClip(clip('mp3_44100_192', 24000), 'script', tokenAt, 'mp3_44100_192'),
    false,
  );
  assert.equal(reusableClip(clip('mp3_44100_192'), 'script', tokenAt), false);
  assert.equal(reusableClip(clip('pcm_24000', 24000), 'script', tokenAt), true);
});

test('invalid selections fail before a generation run can contact the provider', () => {
  const directory = mkdtempSync(join(tmpdir(), 'audio-selection-invalid-'));
  try {
    const file = join(directory, 'items.json');
    const keys = join(directory, 'keys.json');
    const guard = join(directory, 'guard.mjs');
    writeFileSync(
      file,
      JSON.stringify([
        { id: 'synthetic', part: 'listening', script: [{ role: 'narrator', text: 'Hallo.' }] },
      ]),
    );
    writeFileSync(
      guard,
      "globalThis.fetch = async () => { throw Error('UNEXPECTED_PROVIDER_REQUEST'); };\n",
    );
    for (const selection of [
      '[]',
      '["synthetic#fragment","synthetic#fragment"]',
      '["unknown#fragment"]',
      '{}',
    ]) {
      writeFileSync(keys, selection);
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
          '--keys',
          keys,
          '--generate',
        ],
        { encoding: 'utf8' },
      );
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Audio keys/);
      assert.doesNotMatch(result.stderr + result.stdout, /UNEXPECTED_PROVIDER_REQUEST/);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('a targeted MP3 generation updates one reviewed job and preserves unselected media', () => {
  const directory = mkdtempSync(join(tmpdir(), 'audio-selection-run-'));
  let generatedToken = '';
  try {
    const batchFile = 'content/batches/070-original.json';
    const items = JSON.parse(readFileSync(batchFile, 'utf8'));
    const selectedKey = `${items[0].id}#${items[0].questions[0].id}`;
    const keys = join(directory, 'keys.json');
    const guard = join(directory, 'provider.mjs');
    const mp3 = join(directory, 'provider.mp3');
    const voiceFile = join(directory, 'voices.json');
    const voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));
    voices.roles.narrator.voice_id = `synthetic-test-${directory.split('/').at(-1)}`;
    const alternateId = `synthetic-casting-${directory.split('/').at(-1)}`;
    voices.roles['synthetic-narrator'] = { voice_id: alternateId, speed: 0.99, a1Speed: 0.91 };
    voices.casting = { ...voices.casting, [items[0].id]: { narrator: 'synthetic-narrator' } };
    writeFileSync(voiceFile, JSON.stringify(voices));
    execFileSync('ffmpeg', [
      '-y',
      '-loglevel',
      'error',
      '-f',
      'lavfi',
      '-i',
      'sine=frequency=440:duration=0.4',
      '-ar',
      '44100',
      '-b:a',
      '192k',
      mp3,
    ]);
    const untouched = {
      key: `${items[1].id}#fragment`,
      file: 'audio/preserved.mp3',
      sourceFormat: 'pcm_24000',
      marker: 'unchanged',
    };
    writeFileSync(join(directory, 'audio-manifest.json'), JSON.stringify([untouched]));
    writeFileSync(keys, JSON.stringify([selectedKey]));
    writeFileSync(
      guard,
      `import { readFileSync } from 'node:fs';
const clip = readFileSync(${JSON.stringify(mp3)});
globalThis.fetch = async (url,init) => {
  if (String(url).includes('/text-to-speech/'+${JSON.stringify(alternateId)}) && String(url).endsWith('output_format=mp3_44100_192')) {
    if(JSON.parse(init.body).voice_settings.speed!==0.91)throw Error('Incorrect effective casting speed');
    return new Response(clip);
  }
  if (String(url).endsWith('/speech-to-text')) return Response.json({ text: ${JSON.stringify(items[0].questions[0].prompt)} });
  throw Error('UNEXPECTED_PROVIDER_REQUEST');
};\n`,
    );
    const result = spawnSync(
      process.execPath,
      [
        '--import',
        'tsx',
        '--import',
        guard,
        'scripts/audio.ts',
        '--file',
        batchFile,
        '--keys',
        keys,
        '--voices',
        voiceFile,
        '--out',
        directory,
        '--source-format',
        'mp3_44100_192',
        '--generate',
      ],
      { encoding: 'utf8', env: { ...process.env, ELEVENLABS_API_KEY: 'synthetic-test-key' } },
    );
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /1 selected clips of 9/);
    assert.match(result.stdout, /1 generated, 0 failed/);
    const manifest = JSON.parse(readFileSync(join(directory, 'audio-manifest.json'), 'utf8'));
    assert.equal(manifest.length, 2);
    assert.deepEqual(
      manifest.find((clip: any) => clip.key === untouched.key),
      untouched,
    );
    const clip = manifest.find((clip: any) => clip.key === selectedKey);
    generatedToken = clip.file.replace(/^audio\//, '').replace(/\.mp3$/, '');
    assert.equal(clip.sourceFormat, 'mp3_44100_192');
    assert.equal(clip.sourceSampleRate, 44100);
    assert.equal(clip.wer, 0);
    assert.deepEqual(clip.roles, { narrator: alternateId });
    assert.deepEqual(clip.casting, { narrator: 'synthetic-narrator' });
    assert.equal(clip.settings.narrator.speed, 0.91);
    const updated = JSON.parse(readFileSync(join(directory, 'items-with-audio.json'), 'utf8'));
    assert.equal(updated[0].questions[0].questionAudio, clip.file);
    delete updated[0].questions[0].questionAudio;
    assert.deepEqual(updated, items, 'no unselected catalogue field was changed');

    // The effective voice/settings stay identical while the deliberate casting alias changes.
    // These subsequent runs must reuse audio and update only the selected provenance.
    writeFileSync(
      guard,
      "globalThis.fetch = async () => { throw Error('UNEXPECTED_PROVIDER_REQUEST'); };\n",
    );
    voices.roles['synthetic-alias'] = { ...voices.roles['synthetic-narrator'] };
    voices.casting[items[0].id] = { narrator: 'synthetic-alias' };
    writeFileSync(voiceFile, JSON.stringify(voices));
    const reuse = () =>
      spawnSync(
        process.execPath,
        [
          '--import',
          'tsx',
          '--import',
          guard,
          'scripts/audio.ts',
          '--file',
          batchFile,
          '--keys',
          keys,
          '--voices',
          voiceFile,
          '--out',
          directory,
          '--source-format',
          'mp3_44100_192',
          '--generate',
        ],
        { encoding: 'utf8', env: { ...process.env, ELEVENLABS_API_KEY: 'synthetic-test-key' } },
      );
    const renamed = reuse();
    assert.equal(renamed.status, 0, renamed.stdout + renamed.stderr);
    assert.match(renamed.stdout, /0 generated, 0 failed/);
    let reused = JSON.parse(readFileSync(join(directory, 'audio-manifest.json'), 'utf8')).find(
      (entry: any) => entry.key === selectedKey,
    );
    assert.equal(reused.file, clip.file);
    assert.deepEqual(reused.casting, { narrator: 'synthetic-alias' });
    voices.roles.narrator = { ...voices.roles['synthetic-narrator'] };
    delete voices.casting[items[0].id];
    writeFileSync(voiceFile, JSON.stringify(voices));
    const cleared = reuse();
    assert.equal(cleared.status, 0, cleared.stdout + cleared.stderr);
    assert.match(cleared.stdout, /0 generated, 0 failed/);
    reused = JSON.parse(readFileSync(join(directory, 'audio-manifest.json'), 'utf8')).find(
      (entry: any) => entry.key === selectedKey,
    );
    assert.equal(reused.file, clip.file);
    assert.ok(!Object.hasOwn(reused, 'casting'));
  } finally {
    if (generatedToken)
      for (const suffix of ['.wav', '-0.wav'])
        rmSync(resolve('tmp/audio', generatedToken + suffix), { force: true });
    rmSync(directory, { recursive: true, force: true });
  }
});
