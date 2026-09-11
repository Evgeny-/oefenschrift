import { setting as environmentSetting } from '../environment';
import { requireReviewedMedia } from './media-review';
// Generate listening audio, question audio and speaking prompts from reviewed scripts.
//
//   tsx scripts/audio.ts                 report what would be generated (dry run)
//   tsx scripts/audio.ts --generate      generate missing clips into assets/audio and update the manifest
//   tsx scripts/audio.ts --generate --apply
//                                        also write audio fields into content/catalogue.json
//   tsx scripts/audio.ts --file x.json --generate --out tmp/audio [--voices config/voices.json]
//                                        generate for items in a JSON file (testing a batch before integration)
//
// Scripts name voice roles (config/voices.json); a conversation uses two different roles and, by default,
// the dialogue model in one request (item.audioMode overrides). Every clip is loudness-normalised and
// transcribed back with Scribe and compared with the script (character error rate after number
// normalisation, and the longest run of inserted words); a clip that fails the round trip is kept
// under tmp/ but never written to the manifest. The API key is read the same way the app reads it and
// is never printed.
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Turn = { speaker?: string; role: string; text: string };
type Item = {
  id: string;
  part: string;
  text?: string;
  script?: Turn[];
  audioMode?: 'stitched' | 'dialogue';
  intro?: string;
  questions?: { id: string; prompt: string; options?: Record<string, string>; script?: Turn[] }[];
  prompt?: string;
  cue?: Turn;
  [key: string]: any;
};
type Clip = {
  file: string;
  text: string;
  roles: Record<string, string>;
  model: string;
  mode: string;
  duration: number;
  peaks?: number[];
  wer: number;
  inserted: number;
  script_sha256: string;
  settings: unknown;
};

const args = process.argv.slice(2);
const flag = (name: string) => args.includes(name);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const GENERATE = flag('--generate'),
  APPLY = flag('--apply');
const OUT = option('--out', 'assets/audio');
const CONCURRENCY = Math.max(1, Number(option('--concurrency', '4')) || 4);
// Run `work` over `items` with at most `limit` in flight; results are collected in the caller's closures.
async function pool<T>(items: T[], limit: number, work: (item: T) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) await work(items[next++]);
    }),
  );
}
const TMP = 'tmp/audio';
const config = JSON.parse(readFileSync('config/services.json', 'utf8'));
const voices = JSON.parse(readFileSync(option('--voices', 'config/voices.json'), 'utf8'));
// Character error rate limit and the longest run of inserted words that blocks a clip. Very short
// clips (a question of a few words) get a wider CER band, because one misheard name dominates them.
const cerLimit = (wordCount: number) => (wordCount < 10 ? 0.15 : 0.04),
  INSERT_LIMIT = 2;

function apiKey(): string {
  const path = environmentSetting('CREDENTIALS_FILE') || config.credentials_file;
  let key = process.env.ELEVENLABS_API_KEY || '';
  if (!key && existsSync(path)) {
    const match = readFileSync(path, 'utf8').match(
      /^\s*(?:export\s+)?ELEVENLABS_API_KEY\s*=\s*(.*?)\s*$/m,
    );
    if (match) key = match[1].replace(/^["']|["']$/g, '');
  }
  if (!key) throw new Error('ELEVENLABS_API_KEY is not configured.');
  return key;
}
const sha = (value: string) => createHash('sha256').update(value).digest('hex');
const voiceFor = (role: string): string => {
  const entry = voices.roles[role];
  if (!entry?.voice_id)
    throw new Error(`Voice role "${role}" has no voice_id in config/voices.json.`);
  return entry.voice_id;
};

// Retry rate limits and transient provider errors with a short backoff.
async function withRetry(call: () => Promise<Response>): Promise<Response> {
  let response = await call();
  for (const delay of [3000, 8000, 15000]) {
    if (response.status !== 429 && response.status < 500) break;
    await new Promise((r) => setTimeout(r, delay));
    response = await call();
  }
  return response;
}
// Voice settings for one role: the shared settings plus the role's speaking-rate multiplier.
const settingsFor = (role: string) => ({
  ...voices.settings,
  speed: voices.roles[role]?.speed ?? voices.settings.speed ?? 1,
});
async function tts(key: string, role: string, text: string): Promise<Buffer> {
  const voiceId = voiceFor(role);
  const response = await withRetry(() =>
    fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${PCM}`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: voices.model,
        language_code: voices.language,
        voice_settings: settingsFor(role),
      }),
    }),
  );
  if (!response.ok) throw new Error(`ElevenLabs text-to-speech returned HTTP ${response.status}.`);
  return Buffer.from(await response.arrayBuffer());
}
async function dialogue(
  key: string,
  inputs: { text: string; voice_id: string }[],
): Promise<Buffer> {
  const response = await withRetry(() =>
    fetch(`https://api.elevenlabs.io/v1/text-to-dialogue?output_format=${PCM}`, {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs,
        model_id: voices.dialogueModel,
        language_code: voices.language,
        settings: { stability: voices.settings.stability },
      }),
    }),
  );
  if (!response.ok)
    throw new Error(`ElevenLabs text-to-dialogue returned HTTP ${response.status}.`);
  return Buffer.from(await response.arrayBuffer());
}
async function transcribe(key: string, file: string): Promise<string> {
  const form = new FormData();
  for (const [name, value] of Object.entries({
    model_id: 'scribe_v2',
    language_code: 'nld',
    tag_audio_events: 'false',
    diarize: 'false',
    temperature: '0',
  }))
    form.append(name, value);
  form.append('file', new Blob([readFileSync(file)], { type: 'audio/mpeg' }), 'clip.mp3');
  const response = await withRetry(() =>
    fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: { 'xi-api-key': key },
      body: form,
    }),
  );
  if (!response.ok) throw new Error(`ElevenLabs speech-to-text returned HTTP ${response.status}.`);
  return String((await response.json()).text || '');
}

// Dutch number words so that "24 euro" in a script matches "vierentwintig euro" in a transcript.
const ONES = [
  'nul',
  'een',
  'twee',
  'drie',
  'vier',
  'vijf',
  'zes',
  'zeven',
  'acht',
  'negen',
  'tien',
  'elf',
  'twaalf',
  'dertien',
  'veertien',
  'vijftien',
  'zestien',
  'zeventien',
  'achttien',
  'negentien',
];
const TENS = [
  '',
  '',
  'twintig',
  'dertig',
  'veertig',
  'vijftig',
  'zestig',
  'zeventig',
  'tachtig',
  'negentig',
];
function dutchNumber(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) {
    const t = Math.floor(n / 10),
      o = n % 10;
    return o ? `${ONES[o]}${[2, 3].includes(o) ? 'ën' : 'en'}${TENS[t]}` : TENS[t];
  }
  if (n < 1000) {
    const h = Math.floor(n / 100),
      r = n % 100;
    return `${h === 1 ? '' : ONES[h]}honderd${r ? dutchNumber(r) : ''}`;
  }
  if (n < 10000) {
    const k = Math.floor(n / 1000),
      r = n % 1000;
    return `${k === 1 ? '' : ONES[k]}duizend${r ? ' ' + dutchNumber(r) : ''}`;
  }
  return String(n);
}
// Spoken form of a script: what the voice is asked to say and what the transcript is compared with.
// Phone numbers are read digit by digit with pauses (pairs come back regrouped and misheard), 112 as
// "één één twee", and clock times as Dutch speakers say them ("17.00 uur" is "vijf uur").
const DIGITS = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
function spokenTime(h: number, m: number): string {
  const hour = h % 12 === 0 ? 12 : h % 12,
    next = (hour % 12) + 1;
  if (m === 0) return `${dutchNumber(hour)} uur`;
  if (m === 30) return `half ${dutchNumber(next)}`;
  if (m === 15) return `kwart over ${dutchNumber(hour)}`;
  if (m === 45) return `kwart voor ${dutchNumber(next)}`;
  return `${dutchNumber(hour)} uur ${dutchNumber(m)}`;
}
export function spoken(text: string): string {
  return text
    .replace(/\b0\d{1,3}(?:[ -]\d{1,8}){1,5}\b/g, (n) =>
      n
        .split(/[ -]/)
        .map((group) => [...group].map((d) => DIGITS[+d]).join(' '))
        .join(', '),
    )
    .replace(/\b0\d{8,9}\b/g, (n) => [...n].map((d) => DIGITS[+d]).join(' '))
    .replace(/\b112\b/g, 'één één twee')
    .replace(/\b(\d{1,2})[.:](\d{2})\s*u(?:ur)?\b/g, (_, h, m) => spokenTime(+h, +m))
    .replace(/\b(\d{1,2})[.:](\d{2})\b/g, (_, h, m) => spokenTime(+h, +m));
}
const normalise = (s: string) =>
  spoken(s)
    .toLowerCase()
    // The transcriber sometimes writes the emergency number as a hundred-and-twelve.
    .replace(/\b(?:één|een) ?honderd ?twaalf\b/g, 'één één twee')
    .replace(/\d+/g, (d) => dutchNumber(+d))
    .replace(/[^a-zà-ÿ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const words = (s: string) => normalise(s).split(' ').filter(Boolean);
function editDistance<T>(r: T[], h: T[]) {
  const d: number[][] = Array.from({ length: r.length + 1 }, (_, i) => [
    i,
    ...Array(h.length).fill(0),
  ]);
  for (let j = 1; j <= h.length; j++) d[0][j] = j;
  for (let i = 1; i <= r.length; i++)
    for (let j = 1; j <= h.length; j++)
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1),
      );
  return d;
}
// Character error rate on the normalised text (tolerant of "halftien"/"half tien" and name spellings)
// plus the longest run of inserted words (catches a voice that adds "nou ja, hallo, uh").
function roundTrip(reference: string, hypothesis: string) {
  const wordCount = words(reference).length;
  const rc = [...normalise(reference).replace(/ /g, '')],
    hc = [...normalise(hypothesis).replace(/ /g, '')];
  const cer = rc.length ? editDistance(rc, hc)[rc.length][hc.length] / rc.length : 0;
  const r = words(reference),
    h = words(hypothesis),
    d = editDistance(r, h);
  let i = r.length,
    j = h.length,
    run = 0,
    inserted = 0;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && d[i][j] === d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1)) {
      i--;
      j--;
      run = 0;
    } else if (j > 0 && d[i][j] === d[i][j - 1] + 1) {
      j--;
      run++;
      inserted = Math.max(inserted, run);
    } else {
      i--;
      run = 0;
    }
  }
  return { wer: cer, inserted, wordCount, hypothesis };
}
// The provider returns lossless 16-bit PCM at 24 kHz; every step below stays lossless (WAV) until the
// single final MP3 encode, so the clip is encoded exactly once. Level matching is a pure gain: the
// integrated loudness is measured and the whole turn is shifted to the target, with no compression.
// 44.1 kHz PCM needs a Pro plan; the run probes once and falls back to 24 kHz on a Starter key.
let PCM = 'pcm_44100',
  PCM_RATE = 44100;
const PIPELINE = 'pcm-gain-single-encode';
async function choosePcm(key: string) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceFor('narrator')}?output_format=pcm_44100`,
    {
      method: 'POST',
      headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Test.',
        model_id: voices.model,
        language_code: voices.language,
      }),
    },
  );
  if (response.status === 403) {
    PCM = 'pcm_24000';
    PCM_RATE = 24000;
  }
  console.log(`Source audio: ${PCM}.`);
}
function pcmToWav(raw: Buffer, wav: string) {
  const rawPath = wav.replace(/\.wav$/, '.pcm');
  writeFileSync(rawPath, raw);
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-f',
    's16le',
    '-ar',
    String(PCM_RATE),
    '-ac',
    '1',
    '-i',
    rawPath,
    wav,
  ]);
  execFileSync('rm', [rawPath]);
}
function measureLoudness(wav: string): { integrated: number; truePeak: number } {
  // loudnorm prints its measurement as JSON on stderr; the audio itself is discarded.
  const { stderr } = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-nostats', '-i', wav, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'],
    { encoding: 'utf8' },
  );
  const start = stderr.lastIndexOf('{');
  const json = JSON.parse(stderr.slice(start, stderr.indexOf('}', start) + 1));
  return { integrated: Number(json.input_i), truePeak: Number(json.input_tp) };
}
// Shift a WAV to the target loudness by a constant gain, keeping the true peak under the ceiling.
function matchLoudness(wav: string) {
  const l = voices.loudness || { integrated: -18, truePeak: -1.5 };
  const { integrated, truePeak } = measureLoudness(wav);
  if (!Number.isFinite(integrated) || integrated < -70) return;
  const gain = Math.min(l.integrated - integrated, l.truePeak - truePeak);
  const tmp = wav.replace(/\.wav$/, '.gain.wav');
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    wav,
    '-af',
    `volume=${gain.toFixed(2)}dB`,
    tmp,
  ]);
  execFileSync('mv', [tmp, wav]);
}
function stitch(parts: string[], target: string) {
  const gap = Number(voices.gapSeconds || 0.45);
  const inputs = parts.flatMap((p) => ['-i', p]);
  const filter =
    parts.map((_, i) => `[${i}:a]apad=pad_dur=${gap}[a${i}]`).join(';') +
    ';' +
    parts.map((_, i) => `[a${i}]`).join('') +
    `concat=n=${parts.length}:v=0:a=1[out]`;
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    ...inputs,
    '-filter_complex',
    filter,
    '-map',
    '[out]',
    target,
  ]);
}
// The one lossy step: 44.1 kHz MP3 at 192 kbps.
function encode(wav: string, mp3: string) {
  execFileSync('ffmpeg', [
    '-y',
    '-loglevel',
    'error',
    '-i',
    wav,
    '-ar',
    '44100',
    '-codec:a',
    'libmp3lame',
    '-b:a',
    '192k',
    mp3,
  ]);
}
function analyse(file: string) {
  const pcm = execFileSync(
    'ffmpeg',
    ['-loglevel', 'error', '-i', file, '-f', 's16le', '-ac', '1', '-ar', '22050', '-'],
    { maxBuffer: 256 * 1024 * 1024 },
  );
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.byteLength / 2));
  const duration = samples.length / 22050,
    step = Math.max(1, Math.floor(samples.length / 64)),
    rms: number[] = [];
  for (let i = 0; i < samples.length && rms.length < 64; i += step) {
    let sum = 0;
    const end = Math.min(samples.length, i + step);
    for (let k = i; k < end; k++) sum += samples[k] * samples[k];
    rms.push(Math.sqrt(sum / (end - i)));
  }
  const max = Math.max(...rms, 1);
  return { duration, peaks: rms.map((v) => Math.round(Math.max(0.08, v / max) * 1000) / 1000) };
}

// One generation job: a fragment (several turns), or a single narrated line (question, prompt, cue).
type Job = {
  key: string;
  item: Item;
  kind: 'fragment' | 'question' | 'prompt' | 'cue';
  turns: Turn[];
  mode: 'stitched' | 'dialogue';
  target?: (clip: Clip) => void;
};
function jobs(items: Item[]): Job[] {
  const list: Job[] = [];
  for (const item of items) {
    if (item.script?.length) {
      const mode =
        item.audioMode ||
        (item.script.length > 1 ? voices.defaultConversationMode || 'stitched' : 'stitched');
      list.push({
        key: `${item.id}#fragment`,
        item,
        kind: 'fragment',
        turns: item.script,
        mode,
        target: (clip) =>
          Object.assign(item, {
            audio: clip.file,
            duration: clip.duration,
            peaks: clip.peaks,
            voice: 'ElevenLabs · Dutch',
          }),
      });
    }
    // A B1 listening text: the narrator's introduction, then one fragment per question.
    if (item.part === 'listening' && item.intro)
      list.push({
        key: `${item.id}#intro`,
        item,
        kind: 'prompt',
        turns: [{ role: 'narrator', text: item.intro }],
        mode: 'stitched',
        target: (clip) => Object.assign(item, { introAudio: clip.file }),
      });
    if ((item.part === 'listening' || item.part === 'knm') && item.questions) {
      for (const question of item.questions) {
        if (question.script?.length)
          list.push({
            key: `${item.id}#${question.id}-fragment`,
            item,
            kind: 'fragment',
            turns: question.script,
            mode:
              item.audioMode ||
              (question.script.length > 1
                ? voices.defaultConversationMode || 'stitched'
                : 'stitched'),
            target: (clip) =>
              Object.assign(question, {
                audio: clip.file,
                duration: clip.duration,
                peaks: clip.peaks,
              }),
          });
        const text =
          item.part === 'knm'
            ? [
                question.prompt,
                ...Object.entries(question.options || {}).map(([k, v]) => `${k}. ${v}`),
              ].join('\n')
            : question.prompt;
        list.push({
          key: `${item.id}#${question.id}`,
          item,
          kind: 'question',
          turns: [{ role: 'narrator', text }],
          mode: 'stitched',
          target: (clip) => Object.assign(question, { questionAudio: clip.file }),
        });
      }
    }
    if (item.part === 'speaking' && item.taskType && item.prompt) {
      list.push({
        key: `${item.id}#prompt`,
        item,
        kind: 'prompt',
        turns: [{ role: 'narrator', text: item.prompt }],
        mode: 'stitched',
        target: (clip) => Object.assign(item, { promptAudio: clip.file }),
      });
      if (item.cue)
        list.push({
          key: `${item.id}#cue`,
          item,
          kind: 'cue',
          turns: [item.cue],
          mode: 'stitched',
          target: (clip) => Object.assign(item, { cueAudio: clip.file }),
        });
    }
  }
  return list;
}

async function run() {
  const source = option('--file', '');
  if (GENERATE) await requireReviewedMedia(source);
  const catalogue: Item[] = JSON.parse(readFileSync(source || 'content/catalogue.json', 'utf8'));
  const manifestPath = source ? resolve(OUT, 'audio-manifest.json') : 'content/audio-manifest.json';
  const manifest: Record<string, Clip> = existsSync(manifestPath)
    ? Object.fromEntries(
        (JSON.parse(readFileSync(manifestPath, 'utf8')) as any[])
          .filter((c) => c.key)
          .map((c) => [c.key, c]),
      )
    : {};
  const list = jobs(catalogue);
  const usedChars = list.reduce((n, j) => n + j.turns.reduce((m, t) => m + t.text.length, 0), 0);
  console.log(
    `${list.length} clips for ${catalogue.length} items, ${usedChars} characters of script.`,
  );
  if (!GENERATE) {
    for (const j of list)
      console.log(
        `  ${manifest[j.key] ? 'have' : 'need'}  ${j.key}  ${j.turns.map((t) => t.role).join('+')}`,
      );
    return;
  }

  const key = apiKey();
  await choosePcm(key);
  mkdirSync(OUT, { recursive: true });
  mkdirSync(TMP, { recursive: true });
  let failures = 0,
    generated = 0;
  const failed: any[] = [];
  // Clips are independent: a few synthesise at once, within the provider's concurrency allowance.
  await pool(list, CONCURRENCY, async (job) => {
    const roles = Object.fromEntries(job.turns.map((t) => [t.role, voiceFor(t.role)]));
    const text = job.turns.map((t) => spoken(t.text)).join('\n');
    const script_sha256 = sha(job.turns.map((t) => t.text).join('\n'));
    const token = sha(
      JSON.stringify({
        text,
        roles,
        model: job.mode === 'dialogue' ? voices.dialogueModel : voices.model,
        settings:
          job.mode === 'dialogue' && job.turns.length > 1
            ? voices.settings
            : Object.fromEntries(job.turns.map((t) => [t.role, settingsFor(t.role)])),
        mode: job.mode,
        loudness: voices.loudness,
        pipeline: `${PIPELINE}-${PCM_RATE}`,
      }),
    ).slice(0, 16);
    const file = `audio/${token}.mp3`,
      target = resolve(OUT, `${token}.mp3`);
    const existing = manifest[job.key];
    if (
      existing &&
      existing.script_sha256 === script_sha256 &&
      existing.file === file &&
      existsSync(target)
    ) {
      job.target?.(existing);
      return;
    }
    if (job.turns.length > 1 && new Set(job.turns.map((t) => t.role)).size < 2) {
      console.log(`  skip  ${job.key}: a conversation needs two different roles`);
      failures++;
      return;
    }
    // A voice sometimes adds a filler or repeats a word; the round trip catches it, and a second
    // synthesis from scratch (cached turns discarded) usually clears it.
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const wav = resolve(TMP, `${token}.wav`);
        if (attempt > 1) {
          for (const i of job.turns.keys())
            rmSync(resolve(TMP, `${token}-${i}.wav`), { force: true });
          rmSync(wav, { force: true });
        }
        if (job.mode === 'dialogue' && job.turns.length > 1) {
          pcmToWav(
            await dialogue(
              key,
              job.turns.map((t) => ({ text: spoken(t.text), voice_id: roles[t.role] })),
            ),
            wav,
          );
          matchLoudness(wav);
        } else {
          const parts: string[] = [];
          for (const [i, turn] of job.turns.entries()) {
            const p = resolve(TMP, `${token}-${i}.wav`);
            if (!existsSync(p)) {
              pcmToWav(await tts(key, turn.role, spoken(turn.text)), p);
              matchLoudness(p);
            }
            parts.push(p);
          }
          if (parts.length === 1) execFileSync('cp', [parts[0], wav]);
          else stitch(parts, wav);
        }
        encode(wav, target);
        const { wer, inserted, wordCount, hypothesis } = roundTrip(
          text,
          await transcribe(key, target),
        );
        const { duration, peaks } = analyse(target);
        const clip: Clip & { key: string } = {
          key: job.key,
          file,
          text,
          roles,
          model: job.mode === 'dialogue' ? voices.dialogueModel : voices.model,
          mode: job.mode,
          duration,
          peaks: job.kind === 'fragment' ? peaks : undefined,
          wer: Math.round(wer * 1000) / 1000,
          inserted,
          script_sha256,
          settings: voices.settings,
        };
        if (wer > cerLimit(wordCount) || (wordCount >= 10 && inserted >= INSERT_LIMIT)) {
          if (attempt === 1) {
            console.log(
              `  retry ${job.key}: CER ${clip.wer}, inserted run ${inserted}; synthesising again`,
            );
            continue;
          }
          failures++;
          failed.push({
            key: job.key,
            file: target,
            cer: clip.wer,
            inserted,
            reference: text,
            hypothesis,
          });
          console.log(
            `  FAIL  ${job.key}: CER ${clip.wer}, inserted run ${inserted}; kept at ${target} for listening, not recorded`,
          );
          break;
        }
        manifest[job.key] = clip;
        job.target?.(clip);
        generated++;
        console.log(`  ok    ${job.key}  ${duration.toFixed(1)}s  CER ${clip.wer}`);
        break;
      } catch (error) {
        failures++;
        console.log(`  FAIL  ${job.key}: ${(error as Error).message}`);
        break;
      }
    }
  });
  mkdirSync(resolve(manifestPath, '..'), { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(Object.values(manifest), null, 2) + '\n');
  if (failed.length)
    writeFileSync(resolve(TMP, 'failures.json'), JSON.stringify(failed, null, 2) + '\n');
  console.log(
    `${generated} generated, ${failures} failed, manifest ${manifestPath}.${failed.length ? ` Transcripts of failed clips: ${resolve(TMP, 'failures.json')}` : ''}`,
  );
  if (failures) process.exitCode = 1;
  if (source) {
    writeFileSync(resolve(OUT, 'items-with-audio.json'), JSON.stringify(catalogue, null, 2) + '\n');
    return;
  }
  if (APPLY) {
    writeFileSync('content/catalogue.json', JSON.stringify(catalogue, null, 2) + '\n');
    console.log(
      'Catalogue updated with audio fields. The sentence-starter review hash now needs a focused re-review (content/hints/review.json).',
    );
  } else console.log('Run with --apply to write audio fields into content/catalogue.json.');
}
if (process.argv[1]?.endsWith('/audio.ts'))
  run().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
