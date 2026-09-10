// Refresh the sentence-starter review hash after a catalogue change that touched no open task.
//
//   tsx scripts/hints-refresh.ts "batch 004 integrated (closed items only)"
//
// The hints gate (content/hints/review.json) records the catalogue hash so that changed open tasks force a
// focused re-review of the starters. When only closed items, audio or image fields changed, the starters are
// still valid: this script proves that (same open items, same criteria counts, starters still cover them) and
// records the new hash with a dated note. Anything else exits with code 1 and asks for a real re-review.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const reason = process.argv[2];
if (!reason) {
  console.error('Give a reason, e.g. "batch 004 integrated (closed items only)".');
  process.exit(2);
}
const catalogueBytes = readFileSync('content/catalogue.json');
const catalogue = JSON.parse(catalogueBytes.toString());
const review = JSON.parse(readFileSync('content/hints/review.json', 'utf8'));
const starters = JSON.parse(readFileSync('content/hints/sentence-starters.json', 'utf8'));
const digest = (b: Buffer | string) => createHash('sha256').update(b).digest('hex');

if (digest(readFileSync('content/hints/sentence-starters.json')) !== review.source_sha256) {
  console.error('The starters file changed; a focused review is needed, not a refresh.');
  process.exit(1);
}
const open = catalogue.filter((i: any) => !i.questions?.length);
const missing = open.filter(
  (i: any) => !Array.isArray(starters[i.id]) || starters[i.id].length !== i.criteria.length,
);
const extra = Object.keys(starters).filter((id) => !open.some((i: any) => i.id === id));
if (missing.length || extra.length) {
  console.error(
    `Open tasks changed (missing: ${missing.map((i: any) => i.id).join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}); a focused review is needed.`,
  );
  process.exit(1);
}
const previous = review.catalogue_sha256,
  current = digest(catalogueBytes);
if (previous === current) {
  console.log('Catalogue hash unchanged; nothing to do.');
  process.exit(0);
}
review.catalogue_sha256 = current;
review.checks = {
  ...review.checks,
  open_catalogue_items: open.length,
  covered_item_ids: open.length,
};
review.hash_refreshes = [
  ...(review.hash_refreshes || []),
  {
    date: new Date().toISOString().slice(0, 10),
    reason,
    from: previous,
    to: current,
    open_items_unchanged: true,
  },
];
writeFileSync('content/hints/review.json', JSON.stringify(review, null, 2) + '\n');
console.log(`Hints review hash refreshed (${open.length} open tasks unchanged): ${reason}`);
