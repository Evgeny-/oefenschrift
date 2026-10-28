// Check a draft batch against content/blueprint.md before review and integration.
//
//   tsx scripts/batch-check.ts content/batches/004-original.json
//
// Exit code 1 on any failure. Warnings do not fail the batch but are printed for the reviewer.
import { existsSync, readFileSync } from 'node:fs';
import { validateBatch } from './batch-validation';
import { unknownWords } from './a1-vocabulary';

const file = process.argv[2];
if (!file) {
  console.error('Usage: tsx scripts/batch-check.ts <batch.json>');
  process.exit(2);
}
const batch = JSON.parse(readFileSync(file, 'utf8'));
const catalogue = JSON.parse(readFileSync('content/catalogue.json', 'utf8'));
const voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));

const { failures, warnings, revisions, totalQuestions, keyCounts, optionCounts } = validateBatch(
  batch,
  catalogue,
  voices,
);

// Optional A1 sentence starters sit beside the batch and follow the same word list.
const startersFile = file.replace(/-(original|proposed)\.json$/, (_, kind) =>
  kind === 'proposed' ? '-proposed-starters.json' : '-starters.json',
);
if (startersFile !== file && existsSync(startersFile)) {
  const starters = JSON.parse(readFileSync(startersFile, 'utf8'));
  for (const item of batch.filter((entry: any) => entry?.level === 'A1')) {
    const unknown = unknownWords(starters[item.id] || []);
    if (unknown.length)
      failures.push(
        `${item.id}: starter words outside config/a1-vocabulary.json: ${unknown.join(', ')}`,
      );
  }
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
