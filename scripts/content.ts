import { createHash } from 'node:crypto';
import { readFile, readdir, realpath, rename, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const digest = (value: string | Buffer) => createHash('sha256').update(value).digest('hex');
function requireValue(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const readJson = async (path: string) => JSON.parse(await readFile(path, 'utf8'));
async function reviewedSource(review: any, directory: string, verdict: string) {
  const source = await realpath(review.source);
  const parent = await realpath(directory);
  requireValue(source.startsWith(parent + sep), `Review source is outside ${directory}`);
  requireValue(
    review.ready_for_integration === true && review[verdict] === 'pass',
    'Source has not passed review',
  );
  const bytes = await readFile(source);
  requireValue(digest(bytes) === review.source_sha256, `Source differs from its review: ${source}`);
  return JSON.parse(bytes.toString());
}

// Retain the original c1 revision format, including its canonical separators.
function canonical(value: any): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(', ') + ']';
  if (value !== null && typeof value === 'object') {
    return (
      '{' +
      Object.keys(value)
        .sort()
        .map((key) => JSON.stringify(key) + ': ' + canonical(value[key]))
        .join(', ') +
      '}'
    );
  }
  return JSON.stringify(value);
}

export async function checkContent(write = false) {
  const path = 'content/catalogue.json';
  const original = await readFile(path, 'utf8');
  const catalogue = JSON.parse(original);
  const byId = new Map<string, any>(catalogue.map((item) => [item.id, item]));
  requireValue(byId.size === catalogue.length, 'Duplicate catalogue IDs');
  for (const filename of (await readdir('content/reviews'))
    .filter((name) => name.endsWith('-review.json'))
    .sort()) {
    const review = await readJson('content/reviews/' + filename);
    for (const item of await reviewedSource(review, 'content/batches', 'batch_verdict')) {
      if (!byId.has(item.id)) {
        catalogue.push(item);
        byId.set(item.id, item);
      }
      Object.assign(byId.get(item.id), item, { status: 'ai-editorially-reviewed' });
    }
  }
  for (const filename of (await readdir('content/evidence'))
    .filter((name) => name.endsWith('-review.json'))
    .sort()) {
    const review = await readJson('content/evidence/' + filename);
    const evidence = await reviewedSource(review, 'content/evidence', 'verdict');
    for (const [id, quotes] of Object.entries(evidence) as [string, Record<string, string>][]) {
      const item = byId.get(id);
      requireValue(
        item?.questions &&
          Object.keys(quotes).sort().join('|') ===
            item.questions
              .map((q) => q.id)
              .sort()
              .join('|'),
        'Evidence question IDs do not match',
      );
      for (const question of item.questions) {
        requireValue(
          item.text.includes(quotes[question.id]),
          'Evidence quote is missing from the source',
        );
        question.evidence = quotes[question.id];
      }
    }
  }
  for (const item of catalogue) {
    for (const question of item.questions || []) {
      requireValue(
        Object.hasOwn(question.options, question.answer) &&
          question.evidence &&
          item.text.includes(question.evidence),
        'Invalid answer key or evidence',
      );
    }
    const fields = [
      'id',
      'level',
      'part',
      'title',
      'text',
      'prompt',
      'questions',
      'criteria',
      'model',
      'sourceUrl',
    ];
    const core = Object.fromEntries(
      fields.filter((key) => Object.hasOwn(item, key)).map((key) => [key, item[key]]),
    );
    item.revision = 'c1:' + digest(canonical(core)).slice(0, 16);
  }

  // Keep reviewed bytes intact when content has not changed. Legacy audio bins
  // include 1.0, which JSON.stringify would otherwise reformat to 1.
  const changed = JSON.stringify(catalogue) !== JSON.stringify(JSON.parse(original));
  const candidate = changed ? JSON.stringify(catalogue, null, 2) + '\n' : original;
  const review = await readJson('content/hints/review.json');
  const starters = await reviewedSource(
    { ...review, source: 'content/hints/sentence-starters.json' },
    'content/hints',
    'verdict',
  );
  requireValue(
    digest(candidate) === review.catalogue_sha256,
    'Sentence starters need review against the updated catalogue',
  );
  const open = catalogue.filter((item) => !item.questions?.length);
  requireValue(
    Object.keys(starters).sort().join('|') ===
      open
        .map((item) => item.id)
        .sort()
        .join('|'),
    'Sentence starters must cover every open task',
  );
  for (const item of open) {
    const lines = starters[item.id];
    requireValue(
      Array.isArray(lines) &&
        lines.length === item.criteria.length &&
        lines.every((line) => typeof line === 'string' && line.includes('…')),
      'Sentence starters must remain partial and match the criteria',
    );
  }

  const sets = await readJson('content/practice-sets.json');
  const members = new Set<string>(),
    setIds = new Set<string>();
  for (const set of sets) {
    requireValue(
      !setIds.has(set.id) && set.ids.length >= 3 && set.ids.length <= 5,
      'Practice sets need unique IDs and three to five exercises',
    );
    setIds.add(set.id);
    for (const id of set.ids) {
      const item = byId.get(id);
      requireValue(
        item &&
          !members.has(id) &&
          item.part === set.part &&
          (item.part === 'knm' ? set.level === 'KNM' : item.level === set.level),
        'Set membership is missing, duplicated or mismatched',
      );
      members.add(id);
    }
  }
  requireValue(members.size === catalogue.length, 'Practice sets do not cover the catalogue');
  if (changed) {
    requireValue(
      write,
      'Reviewed imports differ from the catalogue. Run npm run content:integrate.',
    );
    const temporary = resolve(path) + '.' + process.pid + '.tmp';
    await writeFile(temporary, candidate);
    await rename(temporary, path);
  }
  console.log(
    `Verified ${catalogue.length} exercises, ${sets.length} sets and ${open.length} reviewed hint groups.`,
  );
}

if (process.argv[1]?.endsWith('/content.ts')) await checkContent(process.argv.includes('--write'));
