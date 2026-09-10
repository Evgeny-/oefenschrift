// Adopt a reviewer's proposed batch: the proposed files replace the originals, the review's hash
// must match the adopted bytes, and the checker must pass (content/blueprint.md §12, step 4).
//
//   tsx scripts/batch-adopt.ts 018
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, renameSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const batch = process.argv[2];
if (!/^\d{3}$/.test(batch || '')) {
  console.error('Usage: tsx scripts/batch-adopt.ts <NNN>');
  process.exit(2);
}
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const original = `content/batches/${batch}-original.json`,
  proposed = `content/batches/${batch}-proposed.json`,
  starters = `content/batches/${batch}-starters.json`,
  proposedStarters = `content/batches/${batch}-proposed-starters.json`,
  reviewPath = `content/reviews/${batch}-review.json`;
if (!existsSync(proposed)) {
  console.error(`${proposed} does not exist; the reviewer writes it (docs/briefs/review.md).`);
  process.exit(1);
}
const review = JSON.parse(readFileSync(reviewPath, 'utf8'));
if (review.source_sha256 !== digest(proposed)) {
  console.error(
    `The review records ${review.source_sha256}, the proposed file hashes to ${digest(proposed)}.`,
  );
  process.exit(1);
}
if (existsSync(proposedStarters) && review.starters_sha256 !== digest(proposedStarters)) {
  console.error('The review does not record the hash of the proposed starters file.');
  process.exit(1);
}
if (
  !existsSync(proposedStarters) &&
  existsSync(starters) &&
  review.starters_sha256 !== digest(starters)
) {
  console.error('The review does not record the hash of the starters file.');
  process.exit(1);
}
renameSync(proposed, original);
if (existsSync(proposedStarters)) renameSync(proposedStarters, starters);
console.log(`Adopted ${proposed} as ${original} (${review.source_sha256.slice(0, 12)}…).`);
execFileSync('npx', ['tsx', 'scripts/batch-check.ts', original], { stdio: 'inherit' });
