import { readFileSync, existsSync } from 'node:fs';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import instructions from './feedback-instructions.json';
import { record } from './breaker';
const execute = promisify(execFile);
// code names the refusal for the client (feedback_off, provider_failed, rate_limited...);
// upstream carries the provider's HTTP status so the breaker can tell a revoked key or an
// exhausted quota (401, 402, 403) from an outage.
export class ServiceError extends Error {
  constructor(
    message: string,
    public status = 502,
    public code: string | null = null,
    public upstream: number | null = null,
  ) {
    super(message);
  }
}
export function configuration() {
  return JSON.parse(readFileSync('config/services.json', 'utf8'));
}
export function keys() {
  const found: Record<string, string> = {},
    path = process.env.INBURGERING_CREDENTIALS_FILE || configuration().credentials_file;
  if (existsSync(path))
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = line.match(/^\s*(?:export\s+)?(OPENAI_API_KEY|ELEVENLABS_API_KEY)\s*=\s*(.*?)\s*$/);
      if (m) found[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  for (const name of ['OPENAI_API_KEY', 'ELEVENLABS_API_KEY'])
    if (process.env[name]) found[name] = process.env[name]!;
  return found;
}
const bilingual = {
  type: 'object',
  properties: { nl: { type: 'string' }, en: { type: 'string' } },
  required: ['nl', 'en'],
  additionalProperties: false,
};
const criterionSchema = (met: boolean) => ({
  type: 'object',
  properties: {
    index: { type: 'integer' },
    met: { type: 'boolean', enum: [met] },
    uncertain: { type: 'boolean', ...(met ? { enum: [false] } : {}) },
    evidence: { type: 'string', ...(met ? { minLength: 1 } : { enum: [''] }) },
    feedback: bilingual,
  },
  required: ['index', 'met', 'uncertain', 'evidence', 'feedback'],
  additionalProperties: false,
});
export const feedbackSchema = {
  type: 'object',
  properties: {
    on_task: { type: 'boolean' },
    criteria: { type: 'array', items: { anyOf: [criterionSchema(true), criterionSchema(false)] } },
    corrected_text: { type: 'string' },
  },
  required: ['on_task', 'criteria', 'corrected_text'],
  additionalProperties: false,
};
export const feedbackVersion = createHash('sha256')
  .update(instructions + JSON.stringify(feedbackSchema) + 'typescript-confirmed-v2')
  .digest('hex')
  .slice(0, 16);
// Missing points belong before the sign-off, so a suggested message still ends with its greeting.
const closing =
  /(^|\n|[.!?]\s+)((met\s+)?(vriendelijke|hartelijke)\s+groet(en)?|groet(en|jes)?|tot\s+(ziens|snel|morgen|dan|gauw|straks)|liefs|doei|dag|mvg)\b[\s\S]{0,80}$/i;
export function withPlaceholders(answer: string, labels: string[]) {
  const text = answer.trim(),
    placeholders = labels.map((label) => '[' + label + ']').join('\n');
  const match = text.match(closing),
    at = match ? match.index + match[1].length : -1;
  if (at <= 0) return text + '\n' + placeholders;
  return text.slice(0, at).trimEnd() + '\n' + placeholders + '\n' + text.slice(at);
}
// A suggestion that tucks its placeholders behind the signature gets them moved in front of it:
// whole sentences after the closing line, bare placeholders from the closing line itself.
export function placeholdersBeforeClosing(text: string) {
  const match = text.match(closing);
  if (!match) return text;
  const at = match.index + match[1].length;
  if (at <= 0) return text;
  const tail = text.slice(at),
    line = tail.match(/^[^\n.!?]*[.!?]?/)![0];
  let remainder = tail.slice(line.length);
  const moved: string[] = [];
  const cleanedLine = line
    .replace(/\s*(\[[^\[\]\n]{1,160}\])\s*([.!?])?/g, (_, placeholder, punctuation) => {
      moved.push(placeholder + (punctuation || ''));
      return '';
    })
    .trimEnd();
  const sentences = remainder.match(/[^.!?\n]*\[[^\[\]\n]{1,160}\][^.!?\n]*[.!?]?/g) || [];
  for (const sentence of sentences) {
    moved.push(sentence.trim());
    remainder = remainder.replace(sentence, '');
  }
  if (!moved.length) return text;
  remainder = remainder
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return (
    text.slice(0, at).trimEnd() +
    '\n' +
    moved.join('\n') +
    '\n' +
    cleanedLine +
    (remainder ? '\n' + remainder : '')
  );
}
// A rejection names its reason for the server log without quoting the learner's text.
export class FeedbackRejected extends ServiceError {
  constructor(public reason: string) {
    super('Feedback could not be verified. Please retry.', 502, 'feedback_rejected');
  }
}
// Letters and digits only, lower case, without diacritics; punctuation and spacing are
// what the model most often changes when it quotes a spoken answer.
const plain = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
function mapped(answer: string) {
  const positions: number[] = [];
  let text = '',
    space = false;
  for (let i = 0; i < answer.length; i++) {
    const ch = plain(answer[i]);
    if (!ch) {
      if (text && !space) {
        text += ' ';
        positions.push(i);
        space = true;
      }
      continue;
    }
    space = false;
    for (const part of ch) {
      text += part;
      positions.push(i);
    }
  }
  return { text: text.trimEnd(), positions };
}
function longestCommonRun(a: string, b: string) {
  let best = { at: 0, length: 0 };
  const rows = Array.from({ length: b.length + 1 }, () => new Uint16Array(a.length + 1));
  for (let j = 1; j <= b.length; j++)
    for (let i = 1; i <= a.length; i++) {
      if (a[i - 1] === b[j - 1]) {
        const run = rows[j - 1][i - 1] + 1;
        rows[j][i] = run;
        if (run > best.length) best = { at: i - run, length: run };
      }
    }
  return best;
}
// The model sometimes returns a quote with different spacing, punctuation, quotes,
// diacritics or case, or with a word changed. Locate the quote in the real answer and
// return that exact span; a partial match must still cover most of the quote.
export function exactEvidence(answer: string, evidence: string): string | null {
  if (!evidence.trim()) return null;
  if (answer.includes(evidence)) return evidence;
  const trimmed = evidence.trim();
  if (answer.includes(trimmed)) return trimmed;
  const target = plain(trimmed);
  if (!target) return null;
  const { text, positions } = mapped(answer);
  let at = text.indexOf(target),
    length = target.length;
  if (at < 0) {
    const run = longestCommonRun(text, target);
    if (run.length < 8 || run.length < target.length * 0.6) return null;
    at = run.at;
    length = run.length;
  }
  // Trim spaces, then extend to whole words so a highlight never starts or ends mid-word.
  let start = at,
    end = at + length;
  while (start < end && text[start] === ' ') start++;
  while (end > start && text[end - 1] === ' ') end--;
  if (end <= start) return null;
  while (start > 0 && text[start - 1] !== ' ') start--;
  while (end < text.length && text[end] !== ' ') end++;
  // Keep quotation marks or brackets that wrap the quoted words.
  let from = positions[start],
    to = positions[end - 1] + 1;
  while (from > 0 && /[“‘"'(]/.test(answer[from - 1])) from--;
  while (to < answer.length && /[”’"')]/.test(answer[to])) to++;
  return answer.slice(from, to);
}
// The learner text is untrusted input to the model, so its output is bounded too: no
// links, no criterion explanation longer than a few sentences, and a suggested answer that
// cannot grow far beyond the answer it corrects. Anything else is a rejected judgment.
const link = /https?:\/\/|www\./i;
export const FEEDBACK_MAX = 500;
export const correctedTextMax = (answer: string) => answer.length * 2 + 600;
export function validateFeedback(result: any, item: any, answer: string, lenient = false) {
  const fail = (reason: string) => {
    throw new FeedbackRejected(reason);
  };
  const unlocated: number[] = [];
  if (!Array.isArray(result?.criteria)) fail('criteria-missing');
  if (result.criteria.length !== item.criteria.length) fail('criteria-count');
  if (typeof result.corrected_text !== 'string') fail('corrected-text-type');
  if (typeof result.on_task !== 'boolean') fail('on-task-type');
  if (result.corrected_text.length > correctedTextMax(answer)) fail('corrected-text-long');
  if (link.test(result.corrected_text)) fail('output-link');
  // Text that is not an attempt at the task gets no verdict per point and no suggestion.
  const offTask = result.on_task === false;
  for (const [i, c] of result.criteria.entries()) {
    if (c.index !== i) fail('criteria-order');
    if (
      typeof c.met !== 'boolean' ||
      typeof c.uncertain !== 'boolean' ||
      typeof c.evidence !== 'string'
    )
      fail('field-types');
    if (offTask) {
      c.met = false;
      c.uncertain = false;
      c.evidence = '';
    }
    // Speech is always confirmed here, so an uncertain verdict counts as not met.
    if (c.uncertain) {
      if (c.met) fail('uncertain-met');
      c.uncertain = false;
    }
    if (c.met) {
      const found = exactEvidence(answer, c.evidence);
      if (found) c.evidence = found;
      else if (lenient && c.evidence.trim()) {
        c.evidence = '';
        unlocated.push(i);
      } else fail(c.evidence.trim() ? 'evidence-not-in-answer' : 'evidence-empty');
    } else if (c.evidence) c.evidence = '';
    if (
      !c.feedback ||
      Object.keys(c.feedback).sort().join(',') !== 'en,nl' ||
      !['nl', 'en'].every((lang) => typeof c.feedback[lang] === 'string' && c.feedback[lang].trim())
    )
      fail('feedback-languages');
    if (['nl', 'en'].some((lang) => c.feedback[lang].length > FEEDBACK_MAX)) fail('feedback-long');
    if (['nl', 'en'].some((lang) => link.test(c.feedback[lang]))) fail('output-link');
  }
  if (offTask)
    return {
      ...result,
      corrected_text: '',
      comment: {
        nl: 'Dit lijkt geen antwoord op de opdracht. Schrijf in het Nederlands wat de opdracht vraagt.',
        en: 'This does not look like an answer to the task. Write in Dutch what the task asks for.',
      },
      next_step: {
        nl: 'Lees de opdracht en de punten nog eens en probeer het opnieuw.',
        en: 'Read the task and its points again and try once more.',
      },
    };
  const missing = result.criteria.filter((c) => !c.met),
    met = result.criteria.length - missing.length,
    total = result.criteria.length;
  const candidate = result.corrected_text.trim(),
    blanks = candidate.match(/\[[^\[\]\n]{1,160}\]/g) || [];
  const corrected_text =
    !candidate || blanks.length < missing.length
      ? withPlaceholders(
          answer,
          missing.map((c) => item.criteria[c.index][0]),
        )
      : placeholdersBeforeClosing(candidate);
  const next = missing[0] ? item.criteria[missing[0].index] : null;
  return {
    ...result,
    ...(unlocated.length ? { unlocated } : {}),
    corrected_text,
    comment: {
      nl: `Je hebt ${met} van de ${total} punten duidelijk genoemd.`,
      en: `You clearly covered ${met} of ${total} points.`,
    },
    next_step: next
      ? {
          nl: `Vul dit punt aan: ${next[0]}`,
          en: `Add the missing information for this point: ${next[1]}`,
        }
      : { nl: 'Oefen nu een andere opdracht.', en: 'Practise another task next.' },
  };
}
export function displayFeedback(result: any, lang: string) {
  return {
    ...result,
    comment: result.comment[lang],
    next_step: result.next_step[lang],
    criteria: result.criteria.map((c) => ({ ...c, feedback: c.feedback[lang] })),
    translations: Object.fromEntries(
      ['nl', 'en'].map((locale) => [
        locale,
        {
          comment: result.comment[locale],
          next_step: result.next_step[locale],
          criteria_feedback: result.criteria.map((c) => c.feedback[locale]),
        },
      ]),
    ),
    feedback_version: feedbackVersion,
  };
}
const cache = new Map<string, { expires: number; promise: Promise<any> }>();
function cached(key: string, run: () => Promise<any>) {
  for (const [k, v] of cache) if (v.expires < Date.now()) cache.delete(k);
  const old = cache.get(key);
  if (old) return old.promise;
  const promise = run().catch((e) => {
    cache.delete(key);
    throw e;
  });
  cache.set(key, { promise, expires: Date.now() + 1800000 });
  while (cache.size > 128) cache.delete(cache.keys().next().value!);
  return promise;
}
const retryNote =
  '\n\nRETRY: your previous judgment quoted words that do not occur in the learner answer. Evidence must be copied character for character from the learner answer (the user message) only, never from the task or the criteria. If you cannot quote the answer, set met:false with empty evidence.';
export type Usage = { input_tokens: number; output_tokens: number };
export async function requestJudgment(
  item: any,
  answer: string,
  fetcher: typeof fetch = fetch,
  note = '',
  onUsage: ((usage: Usage) => void) | null = null,
) {
  const model = configuration().feedback_model,
    key = keys().OPENAI_API_KEY;
  if (!key) throw new ServiceError('Feedback is not configured.', 503, 'feedback_unconfigured');
  // The task travels in a developer message and the learner text alone in the user message,
  // so anything inside the answer that reads like an instruction ranks below the task.
  const task = {
    level: item.level,
    part: item.part,
    task: item.prompt,
    criteria: item.criteria.map((c) => c[0]),
    // Blueprint tasks carry printed material the judgment depends on: a gapped e-mail, a table, form labels.
    ...(item.taskType ? { task_type: item.taskType } : {}),
    ...(item.scaffold?.body ? { text_with_gap: item.scaffold.body } : {}),
    ...(item.grammarTarget ? { grammar_target: item.grammarTarget } : {}),
    ...(item.adequacyNote ? { sentence_must: item.adequacyNote } : {}),
    ...(item.table ? { table: item.table } : {}),
    ...(Array.isArray(item.formFields) ? { form_fields: item.formFields.map((f) => f.label) } : {}),
    speech_confirmed: true,
    speech_hypotheses: [],
  };
  let response: Response;
  try {
    response = await fetcher('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(45000),
      body: JSON.stringify({
        model,
        store: false,
        max_output_tokens: 1800,
        instructions: instructions + note,
        input: [
          { role: 'developer', content: JSON.stringify(task) },
          { role: 'user', content: answer },
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'exercise_feedback',
            strict: true,
            schema: feedbackSchema,
          },
        },
        ...(model.startsWith('gpt-5') ? { reasoning: { effort: 'none' } } : {}),
      }),
    });
  } catch {
    record('feedback', 'failed');
    throw new ServiceError(
      'The feedback service did not respond. Please retry.',
      502,
      'provider_failed',
    );
  }
  if (!response.ok) {
    record('feedback', [401, 402, 403].includes(response.status) ? 'rejected' : 'failed');
    throw new ServiceError(
      'Feedback provider is unavailable. Please retry.',
      502,
      'provider_failed',
      response.status,
    );
  }
  record('feedback', 'ok');
  let body: any, result: any;
  try {
    body = await response.json();
  } catch {
    throw new FeedbackRejected('response-unreadable');
  }
  // Token counts feed the operator's usage view; they carry no learner text.
  if (body.usage && onUsage)
    onUsage({
      input_tokens: Number(body.usage.input_tokens) || 0,
      output_tokens: Number(body.usage.output_tokens) || 0,
    });
  if (body.status !== 'completed')
    throw new FeedbackRejected(
      'response-' +
        (body.status || 'unknown') +
        (body.incomplete_details?.reason ? ':' + body.incomplete_details.reason : ''),
    );
  try {
    result = JSON.parse(
      body.output
        .flatMap((out) => out.content || [])
        .filter((c) => c.type === 'output_text')
        .map((c) => c.text)
        .join(''),
    );
  } catch {
    throw new FeedbackRejected('output-unparseable');
  }
  return { result, model };
}
export async function assess(item: any, answer: string, fetcher: typeof fetch = fetch) {
  const { result, model } = await requestJudgment(item, answer, fetcher);
  return { ...validateFeedback(result, item, answer), model };
}
// A malformed response gets one fresh attempt. A quote that still cannot be found in the
// answer after that no longer blocks the judgment: the verdict stands without a highlight.
// Reasons are logged; the learner's text never is.
export async function assessWithRetry(
  item: any,
  answer: string,
  fetcher: typeof fetch = fetch,
  onUsage: ((usage: Usage) => void) | null = null,
) {
  const warn = (message: string) => console.warn(`Feedback ${message} for ${item.id}.`);
  let first;
  try {
    first = await requestJudgment(item, answer, fetcher, '', onUsage);
    return { ...validateFeedback(first.result, item, answer), model: first.model };
  } catch (error) {
    if (!(error instanceof FeedbackRejected)) throw error;
    warn(`rejected (${error.reason}); retrying once`);
  }
  const second = await requestJudgment(item, answer, fetcher, retryNote, onUsage);
  try {
    return { ...validateFeedback(second.result, item, answer), model: second.model };
  } catch (error) {
    if (!(error instanceof FeedbackRejected) || error.reason !== 'evidence-not-in-answer') {
      if (error instanceof FeedbackRejected) warn(`rejected again (${error.reason})`);
      throw error;
    }
    const accepted = validateFeedback(second.result, item, answer, true);
    warn(`accepted with unlocated evidence for criteria ${accepted.unlocated.join(', ')}`);
    return { ...accepted, model: second.model };
  }
}
export function sharedFeedback(
  item: any,
  answer: string,
  lang: string,
  onUsage: ((usage: Usage) => void) | null = null,
) {
  const key = createHash('sha256')
    .update(JSON.stringify([feedbackVersion, configuration().feedback_model, item, answer]))
    .digest('hex');
  return cached('feedback:' + key, () => assessWithRetry(item, answer, fetch, onUsage)).then(
    (result) => displayFeedback(result, lang),
  );
}
// Operator views: provider balances are read live and never stored.
export async function elevenLabsSubscription(fetcher: typeof fetch = fetch) {
  const key = keys().ELEVENLABS_API_KEY;
  if (!key) return { configured: false };
  if (process.env.INBURGERING_OFFLINE)
    return { configured: true, error: 'Not checked in offline mode.' };
  try {
    const response = await fetcher('https://api.elevenlabs.io/v1/user/subscription', {
      headers: { 'xi-api-key': key },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { configured: true, error: `ElevenLabs answered ${response.status}.` };
    const body: any = await response.json();
    return {
      configured: true,
      tier: String(body.tier || ''),
      status: String(body.status || ''),
      used: Number(body.character_count) || 0,
      limit: Number(body.character_limit) || 0,
      resetsAt: body.next_character_count_reset_unix
        ? Number(body.next_character_count_reset_unix) * 1000
        : null,
      currency: body.currency || null,
    };
  } catch {
    return { configured: true, error: 'ElevenLabs did not respond.' };
  }
}
// OpenAI exposes no balance to a project key. With an organization admin key
// (OPENAI_ADMIN_KEY) the daily costs of the last `period` days are read instead.
export async function openAiCosts(fetcher: typeof fetch = fetch, now = Date.now(), period = 30) {
  const key = process.env.OPENAI_ADMIN_KEY;
  if (!key) return { configured: false };
  if (process.env.INBURGERING_OFFLINE)
    return { configured: true, error: 'Not checked in offline mode.' };
  try {
    const start = Math.floor(now / 1000) - period * 86400;
    const response = await fetcher(
      `https://api.openai.com/v1/organization/costs?start_time=${start}&bucket_width=1d&limit=${period + 1}`,
      { headers: { Authorization: 'Bearer ' + key }, signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) return { configured: true, error: `OpenAI answered ${response.status}.` };
    const body: any = await response.json();
    const days = (body.data || []).map((bucket) => ({
      day: new Date(Number(bucket.start_time) * 1000).toISOString().slice(0, 10),
      cost: (bucket.results || []).reduce(
        (sum, result) => sum + (Number(result.amount?.value) || 0),
        0,
      ),
      currency: bucket.results?.[0]?.amount?.currency || 'usd',
    }));
    return { configured: true, days, total: days.reduce((sum, day) => sum + day.cost, 0) };
  } catch {
    return { configured: true, error: 'OpenAI did not respond.' };
  }
}
// The panel reads both balances through one call: live, but at most every five minutes,
// and a read that failed is retried after a minute. Pages fetch this after they have
// rendered (see /api/ops/providers), so a slow provider never delays the page itself.
let balances: { at: number; value: Promise<{ eleven: any; openai: any }> } | null = null;
export function providerBalances(now = Date.now()) {
  if (!balances || now - balances.at > 300000) {
    const at = now,
      value = Promise.all([elevenLabsSubscription(), openAiCosts(fetch, now, 90)]).then(
        ([eleven, openai]) => {
          if ((eleven.error || openai.error) && balances?.at === at) balances.at = at - 240000;
          return { eleven, openai };
        },
      );
    balances = { at, value };
  }
  return balances.value;
}
const mimes = {
  'audio/webm': 'webm',
  'audio/ogg': 'ogg',
  'audio/mp4': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
};
export async function validateAudio(audio: Buffer, mime: string) {
  if (!Object.hasOwn(mimes, mime) || audio.length < 100 || audio.length > 6 * 1024 * 1024)
    throw new ServiceError('Use a recording under 6 MB.', 422);
  if (
    !(
      audio.subarray(0, 4).toString() === 'RIFF' ||
      audio.subarray(0, 4).toString() === 'OggS' ||
      audio.subarray(0, 3).toString() === 'ID3' ||
      audio.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])) ||
      audio.subarray(4, 8).toString() === 'ftyp' ||
      audio[0] === 255
    )
  )
    throw new ServiceError('Audio format not recognized.', 422);
  const directory = await mkdtemp(join(tmpdir(), 'inburgering-')),
    file = join(directory, 'recording.' + mimes[mime]);
  try {
    await writeFile(file, audio, { mode: 0o600 });
    const { stdout } = await execute(
      'ffprobe',
      [
        '-v',
        'error',
        '-protocol_whitelist',
        'file,pipe',
        '-show_entries',
        'format=duration:stream=codec_type',
        '-of',
        'json',
        file,
      ],
      { timeout: 10000, maxBuffer: 4 * 1024 * 1024 },
    );
    const info = JSON.parse(stdout);
    if (!info.streams?.length || info.streams.some((s) => s.codec_type !== 'audio'))
      throw new Error();
    let duration = Number(info.format?.duration);
    if (!Number.isFinite(duration)) {
      const packets = JSON.parse(
        (
          await execute(
            'ffprobe',
            [
              '-v',
              'error',
              '-protocol_whitelist',
              'file,pipe',
              '-show_entries',
              'packet=pts_time,duration_time',
              '-of',
              'json',
              file,
            ],
            { timeout: 10000, maxBuffer: 4 * 1024 * 1024 },
          )
        ).stdout,
      ).packets;
      duration = Math.max(
        ...packets.map((p) => Number(p.pts_time || 0) + Number(p.duration_time || 0)),
      );
    }
    if (!Number.isFinite(duration) || duration < 0.1 || duration > 125) throw new Error();
    return duration;
  } catch {
    throw new ServiceError('Use a valid audio-only recording, up to two minutes.', 422);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
export async function transcribe(item: any, data: any) {
  const mime = String(data.mime || '').split(';')[0];
  if (typeof data.audio !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(data.audio))
    throw new ServiceError('Invalid recording.', 400);
  const audio = Buffer.from(data.audio, 'base64'),
    digest = createHash('sha256').update(audio).digest('hex');
  return cached('speech:' + item.id + ':' + mime + ':' + digest, async () => {
    const duration = await validateAudio(audio, mime),
      key = keys().ELEVENLABS_API_KEY;
    if (!key)
      throw new ServiceError('Speech recognition is not configured.', 503, 'speech_unconfigured');
    const form = new FormData();
    for (const [name, value] of Object.entries({
      model_id: 'scribe_v2',
      language_code: 'nld',
      timestamps_granularity: 'word',
      tag_audio_events: 'false',
      diarize: 'false',
      temperature: '0',
      seed: '0',
    }))
      form.set(name, value);
    form.set('file', new Blob([new Uint8Array(audio)], { type: mime }), 'recording.' + mimes[mime]);
    let response: Response;
    try {
      response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
        method: 'POST',
        headers: { 'xi-api-key': key },
        body: form,
        signal: AbortSignal.timeout(60000),
      });
    } catch {
      record('speech', 'failed');
      throw new ServiceError('Transcription is unavailable. Please retry.', 502, 'provider_failed');
    }
    if (!response.ok) {
      record('speech', [401, 402, 403].includes(response.status) ? 'rejected' : 'failed');
      throw new ServiceError(
        'Transcription provider is unavailable. Please retry.',
        502,
        'provider_failed',
        response.status,
      );
    }
    record('speech', 'ok');
    const result = await response.json(),
      text = result.text?.trim();
    if (!text || text.length > 6000)
      throw new ServiceError('No usable speech was found. Please record again.', 422);
    return { text, duration, model: 'scribe_v2' };
  });
}
