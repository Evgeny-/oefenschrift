// Builds the candidate list behind the word lists (/words): lemma frequencies from film and
// TV subtitles, how often each lemma occurs in this site's own exercises, and whether the
// project's A1 or A2 word list carries it, in the blended order the word lists follow. The
// output is a TSV for the editors; nothing here is shipped. Sources and method: docs/research/word-lists-2026-11-22.md.
//
//   tsx scripts/word-frequency.ts --forms nl_50k.txt --lemmas subtlex-nl.tsv --out candidates.tsv
//
// --forms   FrequencyWords (OpenSubtitles 2018), "form count" per line.
// --lemmas  SUBTLEX-NL with part of speech, converted to TSV (Word, dominant.pos,
//           dominant.pos.lemma columns); used only to group forms under their lemma.
// Both files are downloaded data: they are read as text and never executed.
import { readFileSync, writeFileSync } from 'node:fs';
import catalogue from '../content/catalogue.json' with { type: 'json' };
import a1 from '../config/a1-vocabulary.json' with { type: 'json' };
import a2 from '../config/a2-vocabulary.json' with { type: 'json' };

const arg = (name: string) => {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0 || !process.argv[index + 1]) throw new Error(`Missing --${name}`);
  return process.argv[index + 1];
};
const forms = arg('forms'),
  lemmas = arg('lemmas'),
  out = arg('out');

// SUBTLEX-NL: each form's dominant part of speech (CGN tags) and lemma.
const lemmaOf = new Map<string, { pos: string; lemma: string }>();
{
  const [header, ...rows] = readFileSync(lemmas, 'utf8').split('\n');
  const columns = header.split('\t');
  const word = columns.indexOf('Word'),
    pos = columns.indexOf('dominant.pos'),
    lemma = columns.indexOf('dominant.pos.lemma');
  if (word < 0 || pos < 0 || lemma < 0) throw new Error('Unexpected SUBTLEX-NL columns');
  for (const row of rows) {
    const cells = row.split('\t');
    if (cells[word])
      lemmaOf.set(cells[word].toLowerCase(), { pos: cells[pos], lemma: cells[lemma] });
  }
}

const words = /^[a-zà-ÿ][a-zà-ÿ'-]*$/;
type Lemma = { lemma: string; pos: string; subtitles: number; site: number; forms: string[] };
const table = new Map<string, Lemma>();
const entry = (form: string) => {
  const known = lemmaOf.get(form),
    lemma = (known?.lemma || form).toLowerCase(),
    pos = known?.pos || '?';
  const key = `${lemma}\t${pos}`;
  let row = table.get(key);
  if (!row) table.set(key, (row = { lemma, pos, subtitles: 0, site: 0, forms: [] }));
  return row;
};

for (const line of readFileSync(forms, 'utf8').split('\n')) {
  const [form, count] = line.trim().split(' ');
  if (!form || !words.test(form)) continue;
  const row = entry(form);
  row.subtitles += Number(count) || 0;
  if (row.forms.length < 6) row.forms.push(form);
}

// The exercises' learner-visible Dutch: every string except identifiers and file names.
const skip = new Set(['id', 'level', 'part', 'exam', 'taskType', 'domain', 'status', 'skill']);
const strings: string[] = [];
const collect = (value: unknown, key = '') => {
  if (skip.has(key)) return;
  if (typeof value === 'string') {
    if (!/^[\w./:-]+$/.test(value) || value.includes(' ')) strings.push(value);
  } else if (Array.isArray(value)) value.forEach((v) => collect(v));
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) collect(v, k);
};
collect(catalogue);
for (const text of strings)
  for (const token of text.toLowerCase().match(/[a-zà-ÿ][a-zà-ÿ'-]*/g) || [])
    if (words.test(token)) entry(token.replace(/-+$/, '')).site += 1;

// Which domain of the project's own A1 and A2 lists names the lemma, if any.
const domains = (list: { words: Record<string, string> }) => {
  const map = new Map<string, string[]>();
  for (const [domain, text] of Object.entries(list.words))
    for (const word of text.split(/\s+/)) map.set(word, [...(map.get(word) || []), domain]);
  return map;
};
const inA1 = domains(a1),
  inA2 = domains(a2);

// Every lemma seen at least twice in the exercises or 200 times in the subtitles, without
// names (SPEC), punctuation (LET), unknown tags, single letters other than "u" and strings
// without a vowel. One spelling with several parts of speech becomes one row under its
// strongest part of speech, the others listed in "also"; the editors split homographs.
const kept = new Map<string, Lemma & { also: string[] }>();
for (const row of [...table.values()].sort((a, b) => b.subtitles - a.subtitles)) {
  if (row.subtitles < 200 && row.site < 2) continue;
  if (['SPEC', 'LET', '?'].includes(row.pos)) continue;
  if (row.lemma.length < 2 && row.lemma !== 'u') continue;
  if (!/[aeiouyà-ÿ]/.test(row.lemma)) continue;
  const known = kept.get(row.lemma);
  if (!known) kept.set(row.lemma, { ...row, also: [] });
  else {
    known.subtitles += row.subtitles;
    known.site += row.site;
    known.also.push(row.pos);
  }
}
// The order blends the two as Zipf values (log10 of occurrences per billion words):
// 0.65 subtitles + 0.35 site, so everyday words of the exams (euro, medewerker, examen) rise
// into the first thousand and film words (moordenaar, gevangenis) drop out of it, without the
// site's own texts deciding alone.
const SITE_WEIGHT = 0.35;
const rows = [...kept.values()],
  totalSubtitles = rows.reduce((sum, row) => sum + row.subtitles, 0),
  totalSite = rows.reduce((sum, row) => sum + row.site, 0),
  zipf = (count: number, total: number) => Math.log10(((count + 1) / total) * 1e9);
const score = new Map(
  rows.map((row) => [
    row,
    (1 - SITE_WEIGHT) * zipf(row.subtitles, totalSubtitles) +
      SITE_WEIGHT * zipf(row.site, totalSite),
  ]),
);
rows.sort((a, b) => score.get(b)! - score.get(a)!);
writeFileSync(
  out,
  ['rank\tlemma\tpos\talso\tsubtitles\tsite\ta1\ta2\tforms']
    .concat(
      rows.map((row, i) =>
        [
          i + 1,
          row.lemma,
          row.pos,
          row.also.join(','),
          row.subtitles,
          row.site,
          (inA1.get(row.lemma) || []).join(','),
          (inA2.get(row.lemma) || []).join(','),
          row.forms.join(' '),
        ].join('\t'),
      ),
    )
    .join('\n') + '\n',
);
console.log(`${rows.length} lemmas written to ${out}`);
