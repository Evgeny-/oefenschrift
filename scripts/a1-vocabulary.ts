import { readFileSync } from 'node:fs';
// The A1 simplicity gate (content/blueprint.md §4.0): learner-visible Dutch in every A1 exercise
// uses words from config/a1-vocabulary.json. Matching is deliberately loose about inflection
// (plurals, -e adjectives, present-tense verbs, diminutives) and strict about new stems and compounds.

const config = JSON.parse(readFileSync('config/a1-vocabulary.json', 'utf8'));
const listed = [
  ...Object.values(config.words as Record<string, string>).flatMap((group) => group.split(/\s+/)),
  ...String(config.irregular).split(/\s+/),
]
  .map((word) => word.toLowerCase())
  .filter(Boolean);
const names = new Set<string>(String(config.names).split(/\s+/).filter(Boolean));

// Spelling normalisation shared by listed words and tokens: one vowel for a doubled vowel,
// one consonant for a doubled final consonant, and the final -f/-s of a v/z stem.
function normalise(stem: string): string {
  return stem
    .replace(/(aa|ee|oo|uu)/g, (pair) => pair[0])
    .replace(/([bcdfgklmnprstz])\1$/, '$1')
    .replace(/v$/, 'f')
    .replace(/z$/, 's');
}
const SUFFIXES = [
  '',
  'en',
  'e',
  't',
  's',
  "'s",
  'n',
  'st',
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
const keys = new Set<string>();
for (const word of listed) {
  keys.add(word);
  keys.add(normalise(word));
  if (word.endsWith('en')) keys.add(normalise(word.slice(0, -2)));
  else if (word.endsWith('n')) keys.add(normalise(word.slice(0, -1)));
}

export function knownWord(token: string): boolean {
  const word = token.toLowerCase();
  if (/^\d+([.,:]\d+)?$/.test(word) || keys.has(word)) return true;
  return SUFFIXES.some((suffix) => {
    if (!word.endsWith(suffix) || word.length - suffix.length < 2) return false;
    const stem = word.slice(0, word.length - suffix.length);
    return keys.has(stem) || keys.has(normalise(stem));
  });
}

// Every Dutch string a learner reads or hears before or after answering.
export function learnerText(item: any): string[] {
  // A transcript repeats the script turns behind speaker labels, which are names or roles.
  const transcript = Array.isArray(item.script) && item.script.length ? undefined : item.text;
  const texts: string[] = [item.title, item.situation, transcript, item.prompt, item.model];
  for (const turn of item.script || []) texts.push(turn.text);
  for (const question of item.questions || [])
    texts.push(
      question.prompt,
      question.explanation,
      ...(Object.values(question.options || {}) as string[]),
    );
  for (const criterion of item.criteria || []) texts.push(criterion?.[0]);
  for (const image of item.images || []) texts.push(image.alt);
  if (item.imageAlt) texts.push(item.imageAlt);
  return texts.filter((text): text is string => typeof text === 'string' && !!text.trim());
}

export function unknownWords(texts: string[]): string[] {
  const unknown = new Set<string>();
  for (const text of texts)
    for (const sentence of text.split(/(?<=[.!?:])\s+|\n+/)) {
      const tokens = sentence.match(/[\p{L}\d][\p{L}\d'’-]*/gu) || [];
      tokens.forEach((raw, index) => {
        const token = raw.replace(/’/g, "'").replace(/['-]+$/, '');
        if (names.has(token)) return;
        // A capital inside a sentence is a proper name (a street, a shop) and stays the author's choice.
        if (index > 0 && /^\p{Lu}/u.test(token)) return;
        const parts = token.includes('-') && !knownWord(token) ? token.split('-') : [token];
        for (const part of parts) if (part && !knownWord(part)) unknown.add(part.toLowerCase());
      });
    }
  return [...unknown].sort();
}

const count = (text: unknown) =>
  String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
const sentences = (text: string) =>
  text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => count(sentence) > 1);

// Short, plain A1 wording, checked on every learner-visible field (decided 28 October 2026).
export function simpleA1Failures(item: any): string[] {
  const tag = item.id || '(no id)';
  const failures: string[] = [];
  const unknown = unknownWords(learnerText(item));
  if (unknown.length)
    failures.push(`${tag}: words outside config/a1-vocabulary.json: ${unknown.join(', ')}`);
  const longest = (label: string, text: unknown, limit: number) => {
    const over = sentences(String(text || '')).find((sentence) => count(sentence) > limit);
    if (over) failures.push(`${tag}: ${label} sentence over ${limit} words: "${over}"`);
  };
  const atMost = (label: string, text: unknown, limit: number) => {
    if (count(text) > limit)
      failures.push(`${tag}: ${label} has ${count(text)} words; A1 allows ${limit}`);
  };
  atMost('title', item.title, 4);
  atMost('situation', item.situation, 10);
  for (const image of item.images || []) atMost('picture alt', image.alt, 14);
  if (item.part === 'reading') longest('message', item.text, 8);
  for (const turn of item.script || []) {
    atMost('conversation turn', turn.text, 12);
    longest('conversation', turn.text, 8);
  }
  if (item.part === 'listening' && Array.isArray(item.script) && item.script.length > 5)
    failures.push(`${tag}: A1 conversations use four or five turns`);
  for (const question of item.questions || []) {
    atMost(`${question.id} prompt`, question.prompt, 8);
    atMost(`${question.id} explanation`, question.explanation, 14);
    for (const option of Object.values(question.options || {}))
      atMost(`${question.id} option`, option, 4);
  }
  if (item.part === 'reading' || item.part === 'listening')
    if (!(Array.isArray(item.images) && item.images.length === 1))
      failures.push(`${tag}: A1 reading and listening carry one context picture`);
  if (item.part === 'writing' || item.part === 'speaking') {
    longest('prompt', item.prompt, 8);
    for (const criterion of item.criteria || []) atMost('criterion', criterion?.[0], 12);
  }
  return failures;
}
