import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  configuredAudioSource,
  decodeAudioSource,
  pcmSourceForProbe,
  probePcmSource,
  sourceDecodeArguments,
} from '../scripts/audio-source';

const entitlement = {
  detail: {
    status: 'output_format_not_allowed',
    message: "Output format 'pcm_44100' is only available on the Pro tier and above.",
  },
};

test('PCM source metadata describes the provider format before final MP3 resampling', () => {
  assert.deepEqual(pcmSourceForProbe(200), {
    sourceFormat: 'pcm_44100',
    sourceSampleRate: 44100,
  });
  assert.deepEqual(pcmSourceForProbe(403, entitlement), {
    sourceFormat: 'pcm_24000',
    sourceSampleRate: 24000,
  });
});

test('only an explicit restriction for pcm_44100 permits a downgrade', () => {
  for (const [status, body] of [
    [403, undefined],
    [403, { detail: 'Forbidden' }],
    [403, { detail: { status: 'missing_permissions', message: entitlement.detail.message } }],
    [403, { detail: { ...entitlement.detail, message: 'Your plan cannot access this voice.' } }],
    [403, { detail: { ...entitlement.detail, message: 'pcm_24000 requires a different tier.' } }],
    [403, { detail: { ...entitlement.detail, message: 'pcm_44100 is temporarily unavailable.' } }],
    [401, entitlement],
    [429, entitlement],
    [503, entitlement],
  ] as const)
    assert.throws(() => pcmSourceForProbe(status, body), /ElevenLabs PCM probe failed/);
});

test('probe errors expose fixed categories without provider text or credentials', () => {
  const secret = 'private-key-and-script';
  assert.throws(
    () => pcmSourceForProbe(403, { detail: { status: secret, message: secret } }),
    (error: Error) => {
      assert.equal(
        error.message,
        'ElevenLabs PCM probe failed (HTTP 403: permission or subscription rejection).',
      );
      assert.ok(!error.message.includes(secret));
      return true;
    },
  );
});

test('the probe retries transient HTTP and network failures before selecting a source', async () => {
  const events = [
      () => {
        throw Error('private transport details');
      },
      () => new Response('{}', { status: 429 }),
      () => new Response('{}', { status: 503 }),
      () => new Response(new Uint8Array([0, 0])),
    ],
    pauses: number[] = [];
  let calls = 0;
  const source = await probePcmSource(
    async () => events[calls++](),
    async (delay) => {
      pauses.push(delay);
    },
  );
  assert.equal(calls, 4);
  assert.deepEqual(pauses, [3000, 8000, 15000]);
  assert.equal(source.sourceFormat, 'pcm_44100');
});

test('permission failures abort immediately and exhausted retries fail without a downgrade', async () => {
  let calls = 0;
  await assert.rejects(
    probePcmSource(async () => {
      calls++;
      return new Response('private provider body', { status: 403 });
    }),
    /HTTP 403: permission or subscription rejection/,
  );
  assert.equal(calls, 1);
  calls = 0;
  await assert.rejects(
    probePcmSource(
      async () => {
        calls++;
        return new Response(JSON.stringify(entitlement), { status: 503 });
      },
      async () => {},
    ),
    /HTTP 503: provider unavailable/,
  );
  assert.equal(calls, 4);
  calls = 0;
  await assert.rejects(
    probePcmSource(
      async () => {
        calls++;
        throw Error('private key');
      },
      async () => {},
    ),
    { message: 'ElevenLabs PCM probe failed (network failure).' },
  );
  assert.equal(calls, 4);
});

test('source format selection accepts only explicit supported formats', () => {
  assert.equal(configuredAudioSource(), undefined);
  for (const sourceFormat of ['pcm_24000', 'pcm_44100', 'mp3_44100_192']) {
    const source = configuredAudioSource(sourceFormat);
    assert.equal(source.sourceFormat, sourceFormat);
    assert.equal(source.sourceSampleRate, sourceFormat === 'pcm_24000' ? 24000 : 44100);
  }
  for (const format of ['', null, 44100, 'mp3_44100_128', 'wav_44100', {}])
    assert.throws(() => configuredAudioSource(format), /Audio source format must be/);
  const args = sourceDecodeArguments(
    configuredAudioSource('mp3_44100_192'),
    'input.mp3',
    'out.wav',
  );
  assert.equal(args[args.indexOf('-f') + 1], 'mp3');
  assert.ok(!args.includes('s16le'), 'compressed bytes must never be interpreted as raw PCM');
});

test('provider MP3 decodes to actual mono PCM WAV and invalid compressed data fails', () => {
  const directory = mkdtempSync(join(tmpdir(), 'audio-source-test-'));
  try {
    const raw = execFileSync('ffmpeg', [
      '-loglevel',
      'error',
      '-f',
      'lavfi',
      '-i',
      'sine=frequency=440:duration=0.2',
      '-ar',
      '44100',
      '-b:a',
      '192k',
      '-f',
      'mp3',
      '-',
    ]);
    const wav = join(directory, 'decoded.wav');
    const source = configuredAudioSource('mp3_44100_192');
    decodeAudioSource(raw, wav, source);
    const result = JSON.parse(
      execFileSync(
        'ffprobe',
        [
          '-v',
          'error',
          '-show_entries',
          'stream=codec_name,sample_rate,channels',
          '-of',
          'json',
          wav,
        ],
        { encoding: 'utf8' },
      ),
    );
    assert.equal(result.streams[0].codec_name, 'pcm_s16le');
    assert.equal(result.streams[0].sample_rate, '44100');
    assert.equal(result.streams[0].channels, 1);
    assert.ok(!existsSync(`${wav}.source.mp3`));
    const invalid = join(directory, 'invalid.wav');
    assert.throws(() =>
      decodeAudioSource(Buffer.from('invalid compressed audio'), invalid, source),
    );
    assert.ok(
      !existsSync(`${invalid}.source.mp3`),
      'temporary provider data is removed on failure',
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
