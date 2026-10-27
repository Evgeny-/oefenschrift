import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';

export type AudioSource =
  | { sourceFormat: 'pcm_44100'; sourceSampleRate: 44100 }
  | { sourceFormat: 'pcm_24000'; sourceSampleRate: 24000 }
  | { sourceFormat: 'mp3_44100_192'; sourceSampleRate: 44100 };

export function configuredAudioSource(format?: unknown): AudioSource | undefined {
  if (format === undefined) return undefined;
  if (format === 'pcm_44100' || format === 'mp3_44100_192')
    return { sourceFormat: format, sourceSampleRate: 44100 };
  if (format === 'pcm_24000') return { sourceFormat: format, sourceSampleRate: 24000 };
  throw Error('Audio source format must be pcm_44100, pcm_24000 or mp3_44100_192.');
}

export function sourceDecodeArguments(source: AudioSource, input: string, wav: string): string[] {
  return [
    '-y',
    '-loglevel',
    'error',
    ...(source.sourceFormat === 'mp3_44100_192'
      ? ['-f', 'mp3']
      : ['-f', 's16le', '-ar', String(source.sourceSampleRate), '-ac', '1']),
    '-i',
    input,
    '-ar',
    String(source.sourceSampleRate),
    '-ac',
    '1',
    '-codec:a',
    'pcm_s16le',
    wav,
  ];
}

export function decodeAudioSource(raw: Buffer, wav: string, source: AudioSource) {
  const input = `${wav}.source.${source.sourceFormat.startsWith('mp3') ? 'mp3' : 'pcm'}`;
  writeFileSync(input, raw);
  try {
    execFileSync('ffmpeg', sourceDecodeArguments(source, input, wav), { stdio: 'pipe' });
  } finally {
    rmSync(input, { force: true });
  }
}

// Fail closed: a generic 403 can mean an invalid key or inaccessible voice. The
// provider must identify this exact output format and its subscription restriction.
export function pcmSourceForProbe(status: number, body?: unknown): AudioSource {
  if (status >= 200 && status < 300) return { sourceFormat: 'pcm_44100', sourceSampleRate: 44100 };
  const detail = (body as { detail?: { status?: unknown; message?: unknown } })?.detail,
    code = typeof detail?.status === 'string' ? detail.status : '',
    message = typeof detail?.message === 'string' ? detail.message.toLowerCase() : '';
  if (
    status === 403 &&
    code === 'output_format_not_allowed' &&
    /\bpcm_44100\b/.test(message) &&
    /\b(?:tier|plan|subscription)\b/.test(message) &&
    /\b(?:only available|not (?:allowed|available)|requires?|upgrade)\b/.test(message)
  )
    return { sourceFormat: 'pcm_24000', sourceSampleRate: 24000 };

  // Report fixed categories, never arbitrary provider messages or echoed inputs.
  const reason =
    status === 401
      ? 'authentication rejected'
      : status === 429
        ? 'rate limit or quota rejection'
        : status >= 500
          ? 'provider unavailable'
          : code === 'output_format_not_allowed'
            ? 'unrecognized output-format restriction'
            : status === 403
              ? 'permission or subscription rejection'
              : status === 400 || status === 422
                ? 'invalid probe request'
                : 'unrecognized provider rejection';
  throw Error(`ElevenLabs PCM probe failed (HTTP ${status}: ${reason}).`);
}

export async function probePcmSource(
  request: () => Promise<Response>,
  pause: (milliseconds: number) => Promise<void> = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds)),
): Promise<AudioSource> {
  const delays = [3000, 8000, 15000];
  for (let attempt = 0; ; attempt++) {
    let response: Response;
    try {
      response = await request();
    } catch {
      if (attempt === delays.length) throw Error('ElevenLabs PCM probe failed (network failure).');
      await pause(delays[attempt]);
      continue;
    }
    if ((response.status === 429 || response.status >= 500) && attempt < delays.length) {
      await response.body?.cancel();
      await pause(delays[attempt]);
      continue;
    }
    if (response.ok) {
      await response.body?.cancel();
      return pcmSourceForProbe(response.status);
    }
    const body = await response.json().catch(() => undefined);
    return pcmSourceForProbe(response.status, body);
  }
}
