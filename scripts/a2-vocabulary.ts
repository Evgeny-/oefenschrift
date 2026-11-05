import { readFileSync } from 'node:fs';
// The A2 word gate (content/blueprint.md §10, decided 5 November 2026): learner-visible Dutch in new
// A2 reading, listening, writing and speaking batches uses words from config/a1-vocabulary.json and
// config/a2-vocabulary.json. Matching accepts the usual inflections, participles, separable verbs,
// spelled-out numbers and two-part compounds of listed words (reported for the reviewer). A reading
// text or listening script may hold one unlisted word per 50 words; every other field may hold none.

const a1 = JSON.parse(readFileSync('config/a1-vocabulary.json', 'utf8'));
const a2 = JSON.parse(readFileSync('config/a2-vocabulary.json', 'utf8'));

const split = (value: unknown) => String(value || '').split(/\s+/);
const listed = [
  ...Object.values(a1.words as Record<string, string>).flatMap(split),
  ...split(a1.irregular),
  ...Object.values(a2.words as Record<string, string>).flatMap(split),
  ...split(a2.irregular),
]
  .map((word) => word.toLowerCase().replace(/’/g, "'"))
  .filter(Boolean);
const names = new Set<string>([...split(a1.names), ...split(a2.names)].filter(Boolean));
// Words judged too hard for this A2 bank; they fail even when a form or compound rule matches.
const blocked = new Set<string>(
  split(a2.notA2)
    .map((word) => word.toLowerCase())
    .filter(Boolean),
);
const DAYPART =
  /^(maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)(ochtend|middag|avond|nacht)(en)?$/;

function normalise(stem: string): string {
  return stem
    .replace(/(aa|ee|oo|uu)/g, (pair) => pair[0])
    .replace(/([bcdfgklmnprstz])\1$/, '$1')
    .replace(/v$/, 'f')
    .replace(/z$/, 's');
}
const exact = new Set<string>(listed);
const keys = new Set<string>();
for (const word of listed) {
  keys.add(word);
  keys.add(normalise(word));
  if (word.endsWith('en')) keys.add(normalise(word.slice(0, -2)));
  else if (word.endsWith('n')) keys.add(normalise(word.slice(0, -1)));
}
// Plurals, adjective -e, present and past tense, comparatives, superlatives, diminutives.
const SUFFIXES = [
  '',
  'en',
  'e',
  't',
  'd',
  's',
  "'s",
  'n',
  'st',
  'de',
  'den',
  'te',
  'ten',
  'er',
  'ere',
  'ers',
  'der',
  'dere',
  'je',
  'tje',
  'pje',
  'etje',
  'jes',
  'tjes',
  'pjes',
  'etjes',
  'ste',
];
const SEPARABLE = [
  'aan',
  'af',
  'bij',
  'binnen',
  'buiten',
  'dicht',
  'door',
  'in',
  'klaar',
  'kwijt',
  'langs',
  'mee',
  'na',
  'neer',
  'om',
  'op',
  'open',
  'over',
  'rond',
  'samen',
  'schoon',
  'terug',
  'thuis',
  'toe',
  'uit',
  'vast',
  'voor',
  'weg',
];
const NUMBER =
  /^(een|één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|dertien|veertien|vijftien|zestien|zeventien|achttien|negentien|twintig|dertig|veertig|vijftig|zestig|zeventig|tachtig|negentig|honderd|duizend|en|ën)+(de|ste)?$/;

function base(word: string): boolean {
  if (keys.has(word)) return true;
  return SUFFIXES.some((suffix) => {
    if (!word.endsWith(suffix) || word.length - suffix.length < 2) return false;
    const stem = word.slice(0, word.length - suffix.length);
    return keys.has(stem) || keys.has(normalise(stem));
  });
}
// Listed words, their forms and participles; separable verbs with a listed infinitive.
function direct(word: string): boolean {
  if (/^\d+([.,:]\d+)?(e|de|ste)?$/.test(word) || NUMBER.test(word) || base(word)) return true;
  if (word.startsWith('ge') && word.length > 4 && base(word.slice(2))) return true;
  for (const prefix of SEPARABLE)
    if (word.startsWith(prefix + 'ge') && base(prefix + word.slice(prefix.length + 2))) return true;
  return false;
}
// A word made of two listed parts (fietsen+winkel, zaterdag+ochtend, op+bellen). Accepted, but listed
// for the reviewer, who judges whether the compound is transparent at A2.
function compound(word: string): boolean {
  for (let i = 2; i <= word.length - 3; i++) {
    const left = word.slice(0, i),
      right = word.slice(i);
    const leftForms = [left];
    if (left.endsWith('s') && left.length > 3) leftForms.push(left.slice(0, -1));
    if (left.endsWith('en') && left.length > 4) leftForms.push(left.slice(0, -2));
    if (left.endsWith('e') && left.length > 3) leftForms.push(left.slice(0, -1));
    // A three-letter part must be a listed word itself: normalised spelling would let "gel"
    // stand for "geel" and turn "hengel" into a compound.
    const part = (form: string) => (form.length > 3 ? base(form) : exact.has(form));
    const leftKnown =
      SEPARABLE.includes(left) || leftForms.some((form) => form.length >= 3 && part(form));
    if (leftKnown && right.length >= 3 && (right.length > 3 ? direct(right) : exact.has(right)))
      return true;
  }
  return false;
}
export function a2Word(token: string): 'listed' | 'compound' | undefined {
  const word = token.toLowerCase().replace(/’/g, "'");
  if (blocked.has(word) || blocked.has(word.replace(/(en|s|e)$/, ''))) return undefined;
  if (DAYPART.test(word) || direct(word)) return 'listed';
  if (compound(word)) return 'compound';
  return undefined;
}

// The gate covers A2 reading, listening, writing and speaking items in batches from this number on,
// including revision batches that rewrite older ids (096-099 brought every older A2 item in line on
// 5 November 2026). Superseded historical batch files keep their reviewed wording; KNM is exempt.
export const A2_VOCABULARY_FROM_BATCH = 87;

export function a2VocabularyApplies(item: any, batchNumber?: number): boolean {
  const fromId = Number(String(item?.id || '').match(/:batch(\d{3})-/)?.[1]);
  return (
    item?.level === 'A2' &&
    ['reading', 'listening', 'writing', 'speaking'].includes(item.part) &&
    Math.max(fromId || 0, batchNumber || 0) >= A2_VOCABULARY_FROM_BATCH
  );
}

// The batch number of a batch or review file name such as 096-original.json or 096-review.json.
export const batchNumberOf = (file: string) =>
  Number(file.match(/(?:^|\/)(\d{3})-[\w-]+\.json$/)?.[1]) || undefined;

// The stimulus a learner reads or hears; it may hold a few context-explained words.
export function a2Stimulus(item: any): string[] {
  if (Array.isArray(item.script) && item.script.length)
    return item.script.map((turn: any) => String(turn?.text || ''));
  return item.part === 'reading' && typeof item.text === 'string' ? [item.text] : [];
}
// Every other learner-visible field: instructions, questions, criteria, scaffolds, forms, models, alts.
export function a2StrictText(item: any): string[] {
  const texts: unknown[] = [item.title, item.situation, item.prompt, item.model, item.opening];
  if (item.part === 'listening' && !(Array.isArray(item.script) && item.script.length))
    texts.push(item.text);
  for (const question of item.questions || [])
    texts.push(question.prompt, question.explanation, ...Object.values(question.options || {}));
  for (const criterion of item.criteria || []) texts.push(criterion?.[0]);
  for (const image of item.images || []) texts.push(image?.alt);
  texts.push(item.imageAlt, item.cue?.text);
  for (const [field, value] of Object.entries(item.scaffold || {}))
    if (!['to', 'from'].includes(field)) texts.push(value);
  for (const field of item.formFields || []) texts.push(field?.label, ...(field?.options || []));
  if (item.table) texts.push(item.table.caption, ...(item.table.columns || []));
  for (const row of item.table?.rows || []) texts.push(...(Array.isArray(row) ? row : []));
  return texts.filter((text): text is string => typeof text === 'string' && !!text.trim());
}

// Web and e-mail addresses are names, not words to learn (www.deberk.nl, info@deberk.nl, versebloem.nl).
const ADDRESS =
  /(?:https?:\/\/|www\.)\S+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+|[\p{L}\d-]+(?:\.[\p{L}\d-]+)*\.(?:nl|com|org|eu|net|be)\b(?:\/\S*)?/gu;
const tokenise = (sentence: string) => sentence.match(/[\p{L}\d][\p{L}\d'’-]*/gu) || [];
const sentencesOf = (text: string) => text.split(/(?<=[.!?:])\s+|\n+/);
// Names: capitals inside a sentence, listed names, and a sentence-initial word the item also writes
// with a capital inside a sentence.
function properNouns(texts: string[]): Set<string> {
  const proper = new Set<string>(names);
  for (const text of texts)
    for (const sentence of sentencesOf(text))
      tokenise(sentence).forEach((raw, index) => {
        if (index > 0 && /^\p{Lu}/u.test(raw)) proper.add(raw.replace(/['’-]+$/, ''));
      });
  return proper;
}
export function a2Check(texts: string[], context: string[] = texts) {
  const proper = properNouns(context);
  const unknown = new Set<string>(),
    compounds = new Set<string>();
  for (const text of texts)
    for (const sentence of sentencesOf(text))
      for (const raw of tokenise(sentence.replace(ADDRESS, ' '))) {
        const token = raw.replace(/’/g, "'").replace(/['-]+$/, '');
        if (!token || proper.has(token) || /^\p{Lu}[\p{Lu}\d-]+$/u.test(token)) continue;
        const parts = token.includes('-') && !a2Word(token) ? token.split('-') : [token];
        for (const part of parts) {
          if (!part) continue;
          const verdict = a2Word(part);
          if (!verdict) unknown.add(part.toLowerCase());
          else if (verdict === 'compound') compounds.add(part.toLowerCase());
        }
      }
  return { unknown: [...unknown].sort(), compounds: [...compounds].sort() };
}

const wordCount = (texts: string[]) =>
  texts
    .join(' ')
    .split(/\s+/)
    .filter((word) => /[\p{L}\d]/u.test(word)).length;

export function a2VocabularyIssues(item: any, batchNumber?: number) {
  const failures: string[] = [],
    warnings: string[] = [];
  if (!a2VocabularyApplies(item, batchNumber)) return { failures, warnings };
  const tag = item.id;
  const stimulus = a2Stimulus(item),
    strict = a2StrictText(item);
  const context = [...stimulus, ...strict];
  const fixed = a2Check(strict, context),
    text = a2Check(stimulus, context);
  if (fixed.unknown.length)
    failures.push(
      `${tag}: words outside the A2 list in instructions, questions, criteria, models or alts: ${fixed.unknown.join(', ')}`,
    );
  const allowed = Math.floor(wordCount(stimulus) / 50);
  const extra = text.unknown.filter((word) => !fixed.unknown.includes(word));
  if (extra.length > allowed)
    failures.push(
      `${tag}: ${extra.length} words outside the A2 list in the ${item.part === 'listening' ? 'script' : 'text'}, ${allowed} allowed (one per 50 words): ${extra.join(', ')}`,
    );
  else if (extra.length)
    warnings.push(
      `${tag}: unlisted words in the ${item.part === 'listening' ? 'script' : 'text'} (allowed ${allowed}; the context must explain them and no question may depend on them): ${extra.join(', ')}`,
    );
  const compounds = [...new Set([...fixed.compounds, ...text.compounds])].sort();
  if (compounds.length)
    warnings.push(
      `${tag}: compounds of listed words (reviewer: transparent at A2?): ${compounds.join(', ')}`,
    );
  return { failures, warnings };
}
