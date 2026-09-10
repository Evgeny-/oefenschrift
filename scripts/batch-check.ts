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
  warnings: string[] = [],
  revisions: string[] = [];
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
  listening: { A2: [2, 3], B1: [5, 9] },
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
  // An id carries its batch number, so a catalogue match can only be this batch already integrated:
  // the file is a revision that goes back through a focused re-review, not a collision.
  const revision = catalogueIds.has(item.id);
  if (revision) revisions.push(item.id);
  const slug = String(item.id)
    .split(':')[2]
    ?.replace(/^batch\d+-/, '');
  if (slugs.has(`${item.part}:${slug}`)) fail(`${tag}: slug reused in batch`);
  slugs.add(`${item.part}:${slug}`);
  if (catalogueSlugs.has(slug) && !revision)
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
    if (part === 'listening' && level === 'B1') {
      // A B1 text: a narrator introduction, then one fragment (its own script) per question.
      if (!(typeof item.intro === 'string' && words(item.intro) >= 8 && words(item.intro) <= 60))
        fail(`${tag}: B1 listening needs an intro of 8–60 words (who speaks, about what)`);
      if (item.script) fail(`${tag}: B1 listening carries the script per question, not per item`);
      const roles = new Set<string>();
      const texts: string[] = [];
      for (const q of item.questions || []) {
        const qt = `${tag}/${q.id}`;
        if (!Array.isArray(q.script) || q.script.length < 1) {
          fail(`${qt}: B1 listening question needs its own script array (the fragment)`);
          continue;
        }
        for (const turn of q.script) {
          if (!voices.roles[turn.role]) fail(`${qt}: unknown voice role "${turn.role}"`);
          if (!turn.text || !turn.speaker) fail(`${qt}: every script turn needs speaker and text`);
          roles.add(turn.role);
        }
        const n = words(q.script.map((t: any) => t.text).join(' '));
        if (n < 50 || n > 190)
          fail(`${qt}: fragment has ${n} spoken words; B1 fragments are 50–190 words (30–75 s)`);
        texts.push(q.script.map((t: any) => `${t.speaker}: ${t.text}`).join('\n'));
        if (q.text !== texts[texts.length - 1])
          fail(`${qt}: question text must equal its script joined as "Speaker: text" lines`);
      }
      if ((item.questions || []).length > 1 && roles.size < 2)
        fail(`${tag}: a B1 listening text needs two different voice roles`);
      if (texts.length && texts.join('\n\n') !== item.text)
        fail(`${tag}: text must equal the fragments joined with a blank line between them`);
    } else if (part === 'listening') {
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
    let longestKeys = 0;
    for (const q of qs || []) {
      totalQuestions++;
      const qt = `${tag}/${q.id}`;
      // A key that is the longest option by more than two characters, counted per text below.
      const keyLength = String(q.options?.[q.answer] || '').length;
      if (
        Object.entries(q.options || {}).every(
          ([k, v]) => k === q.answer || String(v).length + 2 < keyLength,
        )
      )
        longestKeys++;
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
      else if (typeof q.text === 'string' && !q.text.includes(q.evidence))
        fail(`${qt}: evidence must come from the question's own fragment`);
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
    if (Array.isArray(qs) && qs.length >= 4 && longestKeys * 2 > qs.length)
      warn(
        `${tag}: the key is the longest option in ${longestKeys} of ${qs.length} questions; balance the option lengths`,
      );
  }
  if (['writing', 'speaking'].includes(part)) {
    const qt = tag;
    if (typeof item.prompt !== 'string' || words(item.prompt) < 5)
      fail(`${qt}: prompt missing or too short`);
    const criteria = item.criteria;
    // A zinstaak is scored on adequacy and grammar only (blueprint §4.8).
    const minCriteria = item.taskType === 'zinstaak' ? 2 : 3;
    if (!Array.isArray(criteria) || criteria.length < minCriteria || criteria.length > 6)
      fail(`${qt}: ${minCriteria}–6 criteria expected`);
    else
      for (const c of criteria)
        if (
          !Array.isArray(c) ||
          c.length !== 2 ||
          !c.every((x) => typeof x === 'string' && x.trim())
        )
          fail(`${qt}: each criterion is [Dutch, English]`);
    if (!item.rubric || !/^(a2|b1)-(schrijven|spreken)$/.test(item.rubric))
      fail(`${qt}: rubric must be a2-schrijven, a2-spreken, b1-schrijven or b1-spreken`);
    if (typeof item.model !== 'string' || words(item.model) < 8)
      fail(`${qt}: model answer missing or too short`);
    if (typeof item.sample !== 'string' || !item.sample.trim()) fail(`${qt}: sample missing`);
    if (
      !Array.isArray(item.quotes) ||
      (Array.isArray(criteria) && item.quotes.length !== criteria.length)
    )
      fail(`${qt}: quotes must have one entry per criterion (string or null)`);
    else
      for (const q of item.quotes)
        if (q !== null && !(typeof q === 'string' && String(item.sample).includes(q)))
          fail(`${qt}: quote is not a verbatim substring of sample: ${String(q).slice(0, 40)}`);
    if (Array.isArray(item.quotes) && !item.quotes.some((q) => q === null))
      warn(`${qt}: the sample deliberately omits one goal in earlier batches (one null quote)`);
    if (part === 'writing' && level === 'A2') {
      if (
        item.taskType === 'email' &&
        !(
          item.scaffold &&
          item.scaffold.to &&
          item.scaffold.subject &&
          item.scaffold.salutation &&
          item.scaffold.closing
        )
      )
        fail(`${qt}: email needs scaffold {to, from, subject, salutation, closing}`);
      if (item.taskType === 'wijkkrant' && !(item.minSentences >= 3 && item.opening))
        fail(`${qt}: wijkkrant needs minSentences (3) and an opening line`);
      if (
        item.taskType === 'form' &&
        !(
          Array.isArray(item.formFields) &&
          item.formFields.length >= 5 &&
          item.formFields.every((f) => f.label && f.kind)
        )
      )
        fail(`${qt}: form needs formFields [{label, kind}] with at least five fields`);
      if (
        item.taskType === 'picture-note' &&
        !(
          Array.isArray(item.images) &&
          item.images.length >= 2 &&
          item.images.every((i) => i.brief && i.alt)
        )
      )
        fail(`${qt}: picture-note needs images [{brief, alt}] (two or three)`);
      const mw = words(item.model);
      if (mw < 20 || mw > 90) warn(`${qt}: model answer has ${mw} words (A2 writing 20–90)`);
    }
    if (part === 'writing' && level === 'B1') {
      const mw = words(item.model);
      if (item.taskType === 'zinstaak') {
        const body = String(item.scaffold?.body || '');
        if (body.split('___').length !== 2)
          fail(`${qt}: zinstaak needs scaffold.body with exactly one gap marked ___`);
        if (
          !['hoofdzin', 'bijzin', 'inversie', 'te-infinitief', 'vrij'].includes(item.grammarTarget)
        )
          fail(`${qt}: grammarTarget must be hoofdzin, bijzin, inversie, te-infinitief or vrij`);
        if (typeof item.adequacyNote !== 'string' || words(item.adequacyNote) < 3)
          fail(`${qt}: adequacyNote missing (what the sentence must do)`);
        if (criteria?.length !== 2) fail(`${qt}: zinstaak has exactly two criteria`);
        if (mw < 5 || mw > 25) warn(`${qt}: zinstaak model has ${mw} words (one sentence, 5–25)`);
      }
      if (item.taskType === 'deelschrijftaak') {
        const form =
          Array.isArray(item.formFields) &&
          item.formFields.length >= 4 &&
          item.formFields.filter((f) => f.kind === 'open').length >= 2;
        const pictures =
          item.scaffold &&
          Array.isArray(item.images) &&
          item.images.length >= 1 &&
          item.images.every((i) => i.brief && i.alt);
        if (!form && !pictures)
          fail(
            `${qt}: deelschrijftaak needs formFields (four or more, two open) or scaffold plus images`,
          );
        if (mw < 50 || mw > 150) warn(`${qt}: deelschrijftaak model has ${mw} words (50–150)`);
      }
      if (item.taskType === 'korte-schrijftaak') {
        if (
          !(
            item.scaffold &&
            item.scaffold.to &&
            item.scaffold.subject &&
            item.scaffold.salutation &&
            item.scaffold.closing
          )
        )
          fail(`${qt}: korte schrijftaak needs scaffold {to, from, subject, salutation, closing}`);
        if (!(criteria?.length >= 5)) fail(`${qt}: korte schrijftaak has five or six criteria`);
        const table = item.table && Array.isArray(item.table.rows) && item.table.rows.length >= 2;
        const pictures =
          Array.isArray(item.images) &&
          item.images.length >= 1 &&
          item.images.every((i) => i.brief);
        if (!table && !pictures) fail(`${qt}: korte schrijftaak needs a table or images`);
        if (!['informeren', 'overtuigen', 'klagen', 'voorstellen'].includes(item.goal))
          fail(`${qt}: goal must be informeren, overtuigen, klagen or voorstellen`);
        if (mw < 110 || mw > 190) warn(`${qt}: korte schrijftaak model has ${mw} words (120–180)`);
      }
      if (!['zinstaak', 'deelschrijftaak', 'korte-schrijftaak'].includes(item.taskType))
        fail(`${qt}: B1 writing taskType must be zinstaak, deelschrijftaak or korte-schrijftaak`);
    }
    if (part === 'speaking' && level === 'B1') {
      const mw = words(item.model);
      if (item.taskType === 'kort') {
        if (!(item.speakingSeconds === 20 && !item.prepSeconds))
          fail(`${qt}: korte spreektaak is 20 seconds without preparation`);
        if (!(item.cue && item.cue.text && item.cue.role))
          fail(`${qt}: korte spreektaak needs cue {speaker, role, text}`);
        if (Array.isArray(item.images) && item.images.length > 1)
          fail(`${qt}: korte spreektaak has at most one picture`);
        if (mw < 20 || mw > 50) warn(`${qt}: kort model has ${mw} words (25–45)`);
      } else if (item.taskType === 'middellang') {
        if (!(item.speakingSeconds === 30 && item.prepSeconds === 15))
          fail(`${qt}: middellange spreektaak is 15 seconds preparation and 30 seconds speaking`);
        const pictures = Array.isArray(item.images) ? item.images.length : 0;
        if (pictures > 3)
          fail(`${qt}: middellange spreektaak has one to three pictures or a table`);
        if (mw < 35 || mw > 80) warn(`${qt}: middellang model has ${mw} words (40–70)`);
      } else fail(`${qt}: B1 speaking taskType must be kort or middellang`);
      if (Array.isArray(item.images))
        for (const i of item.images)
          if (!(i.brief && i.alt)) fail(`${qt}: every image needs brief and alt`);
    }
    if (part === 'speaking' && level === 'A2') {
      if (!(item.speakingSeconds >= 20 && item.speakingSeconds <= 60))
        fail(`${qt}: speakingSeconds 20–60 expected`);
      if (item.taskType === 'video-answer' && !(item.cue && item.cue.text && item.cue.role))
        fail(`${qt}: video-answer needs cue {speaker, role, text}`);
      const need = { 'picture-describe': 1, 'picture-choose': 2, 'picture-sequence': 3 }[
        item.taskType
      ];
      if (
        need &&
        !(
          Array.isArray(item.images) &&
          item.images.length === need &&
          item.images.every((i) => i.brief && i.alt)
        )
      )
        fail(`${qt}: ${item.taskType} needs exactly ${need} image brief(s) with alt`);
      const mw = words(item.model);
      if (mw < 15 || mw > 60) warn(`${qt}: model answer has ${mw} words (A2 speaking 25–45)`);
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
if (revisions.length)
  console.log(
    `  info  ${revisions.length} of ${batch.length} items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.`,
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
