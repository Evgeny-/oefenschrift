// Check a draft batch against content/blueprint.md before review and integration.
//
//   tsx scripts/batch-check.ts content/batches/004-original.json
//
// Exit code 1 on any failure. Warnings do not fail the batch but are printed for the reviewer.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: tsx scripts/batch-check.ts <batch.json>');
  process.exit(2);
}
const batch = JSON.parse(readFileSync(file, 'utf8'));
const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
const voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));

const failures: string[] = [],
  warnings: string[] = [];
const fail = (s: string) => failures.push(s),
  warn = (s: string) => warnings.push(s);
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const SKILLS = new Set([
  'detail',
  'time-place',
  'quantity',
  'person',
  'rule-application',
  'purpose',
  'advice',
  'sequence',
  'opinion',
  'inference',
  'summary',
  'picture',
]);
const DOMAINS = {
  A2: new Set([
    'werk',
    'opleiding',
    'wonen-buurt',
    'gezondheid',
    'winkels-diensten',
    'instanties',
    'vervoer',
    'vrije-tijd-familie',
  ]),
  B1: new Set(['werk', 'educatie', 'overig']),
};
const TASK_TYPES = {
  reading: {
    A2: ['brief', 'email', 'folder', 'bericht', 'advertentie', 'krant', 'regels', 'rooster'],
    B1: [
      'artikel',
      'interview',
      'studieboek',
      'website',
      'nieuwsbericht',
      'voorwaarden',
      'opzoektekst',
    ],
  },
  listening: {
    A2: ['gesprek', 'voicemail', 'omroep', 'nieuws', 'uitleg', 'reclame'],
    B1: ['interview', 'gesprek', 'voorlichting', 'instructie'],
  },
  writing: {
    A2: ['email', 'wijkkrant', 'form', 'picture-note'],
    B1: ['zinstaak', 'deelschrijftaak', 'korte-schrijftaak'],
  },
  speaking: {
    A2: ['video-answer', 'picture-describe', 'picture-choose', 'picture-sequence'],
    B1: ['kort', 'middellang'],
  },
  knm: { A2: ['feit', 'leerkaart'] },
};
const LENGTH = {
  reading: { A2: [100, 250], B1: [400, 700] },
  listening: { A2: [60, 210], B1: [150, 900] },
};
const QUESTIONS = {
  reading: { A2: [2, 3], B1: [5, 7] },
  listening: { A2: [2, 3], B1: [1, 9] },
  knm: { A2: [1, 1] },
};

if (!Array.isArray(batch) || !batch.length) {
  console.error('Batch must be a non-empty array.');
  process.exit(1);
}
const ids = new Set<string>(),
  slugs = new Set<string>(),
  catalogueIds = new Set(catalogue.map((i: any) => i.id));
const catalogueSlugs = new Set(
  catalogue.map((i: any) =>
    String(i.id)
      .split(':')[2]
      ?.replace(/^batch\d+-/, ''),
  ),
);
const keyCounts: Record<string, number> = {},
  optionCounts: Record<number, number> = {};
let personaPrompts = 0,
  purposeQuestions = 0,
  totalQuestions = 0;

for (const item of batch) {
  const tag = item.id || '(no id)';
  if (
    !/^(A2|B1):(reading|listening|writing|speaking|knm):batch\d{3}-[a-z0-9-]+:\d+$/.test(
      item.id || '',
    )
  )
    fail(`${tag}: id must look like A2:reading:batch004-slug:1`);
  if (ids.has(item.id)) fail(`${tag}: duplicate id in batch`);
  ids.add(item.id);
  if (catalogueIds.has(item.id)) fail(`${tag}: id already exists in the catalogue`);
  const slug = String(item.id)
    .split(':')[2]
    ?.replace(/^batch\d+-/, '');
  if (slugs.has(`${item.part}:${slug}`)) fail(`${tag}: slug reused in batch`);
  slugs.add(`${item.part}:${slug}`);
  if (catalogueSlugs.has(slug))
    warn(`${tag}: slug "${slug}" already used in the catalogue; make sure the topic differs`);
  const level = item.level,
    part = item.part;
  if (!['A2', 'B1'].includes(level)) fail(`${tag}: level must be A2 or B1`);
  if (!item.exam || !['duo-a2', 'nt2-i', 'knm'].includes(item.exam))
    fail(`${tag}: exam must be duo-a2, nt2-i or knm`);
  if (level === 'A2' && part !== 'knm' && item.exam !== 'duo-a2')
    fail(`${tag}: A2 language items are exam duo-a2`);
  if (level === 'B1' && item.exam !== 'nt2-i') fail(`${tag}: B1 items are exam nt2-i`);
  const types = (TASK_TYPES as any)[part]?.[level];
  if (!types || !types.includes(item.taskType))
    fail(`${tag}: taskType must be one of ${types?.join(', ')}`);
  if (!(DOMAINS as any)[level]?.has(item.domain))
    fail(`${tag}: domain must be one of ${[...((DOMAINS as any)[level] || [])].join(', ')}`);
  if (
    level === 'B1' &&
    ['reading', 'listening'].includes(part) &&
    !['persuasief', 'descriptief', 'instructief', 'beschouwend'].includes(item.textType)
  )
    fail(`${tag}: B1 reading/listening needs textType`);
  if (
    ['reading', 'listening'].includes(part) &&
    !(typeof item.situation === 'string' && item.situation.trim().length >= 10)
  )
    fail(`${tag}: situation line missing`);
  if (typeof item.title !== 'string' || !item.title.trim()) fail(`${tag}: title missing`);
  if (item.status !== 'draft') warn(`${tag}: status should be "draft" until integration`);
  if (item.targetLevelValidated !== false) fail(`${tag}: targetLevelValidated must be false`);

  if (['reading', 'listening', 'knm'].includes(part)) {
    const text = item.text;
    if (typeof text !== 'string' || !text.trim()) fail(`${tag}: text missing`);
    else {
      const [min, max] = (LENGTH as any)[part]?.[level] || [0, Infinity];
      const n = words(text);
      if (part !== 'knm' && (n < min || n > max))
        fail(`${tag}: text has ${n} words; blueprint asks ${min}–${max}`);
      if (level === 'A2') {
        const sentences = text.split(/[.!?]+\s/).filter((s) => s.trim().length > 2);
        const lengths = sentences.map(words);
        const avg = lengths.reduce((a, b) => a + b, 0) / Math.max(1, lengths.length);
        if (avg > 12)
          warn(`${tag}: average sentence length ${avg.toFixed(1)} words (A2 target under 12)`);
        if (Math.max(...lengths) > 18)
          warn(`${tag}: longest sentence ${Math.max(...lengths)} words (A2 target 18)`);
      }
    }
    if (part === 'listening') {
      if (!Array.isArray(item.script) || item.script.length < 1)
        fail(`${tag}: listening needs a script array`);
      else {
        const roles = new Set(item.script.map((t: any) => t.role));
        for (const turn of item.script) {
          if (!voices.roles[turn.role]) fail(`${tag}: unknown voice role "${turn.role}"`);
          if (!turn.text || !turn.speaker) fail(`${tag}: every script turn needs speaker and text`);
        }
        if (item.script.length > 1 && roles.size < 2)
          fail(`${tag}: a conversation needs two different voice roles`);
        const joined = item.script.map((t: any) => `${t.speaker}: ${t.text}`).join('\n');
        if (joined !== item.text)
          fail(`${tag}: text must equal the script joined as "Speaker: text" lines`);
        const spoken = item.script.map((t: any) => t.text).join(' ');
        const n = words(spoken);
        if (n < 60 || n > 210)
          fail(`${tag}: spoken script has ${n} words; A2 fragments are 60–210 words (30–90 s)`);
      }
    }
    const qs = item.questions;
    const [qmin, qmax] = (QUESTIONS as any)[part]?.[level] || [1, 9];
    if (!Array.isArray(qs) || qs.length < qmin || qs.length > qmax)
      fail(`${tag}: needs ${qmin}–${qmax} questions`);
    for (const q of qs || []) {
      totalQuestions++;
      const qt = `${tag}/${q.id}`;
      if (!SKILLS.has(q.skill)) fail(`${qt}: skill must be one of ${[...SKILLS].join(', ')}`);
      const keys = Object.keys(q.options || {});
      const n = keys.length;
      optionCounts[n] = (optionCounts[n] || 0) + 1;
      if (!(n === 3 || n === 4) || keys.join('') !== 'ABCD'.slice(0, n))
        fail(`${qt}: options must be A–C or A–D`);
      if (!keys.includes(q.answer)) fail(`${qt}: answer key not among options`);
      else keyCounts[q.answer] = (keyCounts[q.answer] || 0) + 1;
      if (typeof q.evidence !== 'string' || !q.evidence.trim()) fail(`${qt}: evidence missing`);
      else if (!String(item.text || '').includes(q.evidence))
        fail(`${qt}: evidence is not a verbatim substring of text`);
      if (typeof q.explanation !== 'string' || words(q.explanation) < 4)
        fail(`${qt}: explanation missing or too short`);
      if (typeof q.prompt !== 'string' || !q.prompt.trim()) fail(`${qt}: prompt missing`);
      if (/^[A-Z][a-zà-ÿ]+( [A-Z][a-zà-ÿ]+)? .*\. /.test(q.prompt || '')) personaPrompts++;
      if (q.skill === 'purpose') purposeQuestions++;
      const lens = Object.values(q.options || {}).map((o: any) => words(String(o)));
      if (Math.max(...lens) > 2.5 * Math.min(...lens) && Math.max(...lens) > 4)
        warn(`${qt}: option lengths differ a lot (${lens.join('/')}); check for a longer key`);
      const keyText = String(q.options?.[q.answer] || '').toLowerCase();
      if (/\b(altijd|alleen maar|alle antwoorden)\b/.test(keyText))
        warn(`${qt}: key contains an absolute term`);
    }
  }
}

if (totalQuestions) {
  for (const [k, c] of Object.entries(keyCounts)) {
    const share = c / totalQuestions;
    if (share > 0.4) fail(`answer key ${k} is ${(share * 100).toFixed(0)}% of keys (max 40%)`);
    if (share < 0.2 && totalQuestions >= 10 && ['A', 'B', 'C'].includes(k))
      fail(`answer key ${k} is ${(share * 100).toFixed(0)}% of keys (min 20%)`);
  }
  if (!keyCounts.C) fail('no question has C as the key');
  const four = (optionCounts[4] || 0) / totalQuestions;
  const a2reading = batch.every((i: any) => i.level === 'A2' && i.part !== 'knm');
  if (a2reading && (four < 0.25 || four > 0.55))
    warn(`four-option share is ${(four * 100).toFixed(0)}% (A2 target roughly 40%)`);
  if (a2reading && personaPrompts < batch.length)
    warn(
      `${personaPrompts} persona-scenario prompts for ${batch.length} items (A2 asks at least one per text)`,
    );
  if (a2reading && purposeQuestions < Math.floor(batch.length / 3))
    warn(
      `${purposeQuestions} purpose questions for ${batch.length} items (A2 asks one per two or three texts)`,
    );
}

console.log(
  `Checked ${batch.length} items, ${totalQuestions} questions. Keys: ${JSON.stringify(keyCounts)}. Options: ${JSON.stringify(optionCounts)}.`,
);
for (const w of warnings) console.log('  warn  ' + w);
for (const f of failures) console.log('  FAIL  ' + f);
if (failures.length) {
  console.log(`${failures.length} failure(s).`);
  process.exit(1);
}
console.log(
  warnings.length ? `${warnings.length} warning(s), no failures.` : 'No failures, no warnings.',
);
