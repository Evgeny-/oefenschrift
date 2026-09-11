import { createHash } from 'node:crypto';
import { readFile, readdir, realpath } from 'node:fs/promises';
import { checkContent } from './content';
import { validateBatch } from './batch-validation';
import { itemPassedReview } from './content-review';

// Dry runs may inspect drafts. Producing media must use the exact bytes an
// independent reviewer passed, or the catalogue rebuilt through that same gate.
export async function requireReviewedMedia(source = '') {
  if (!source) {
    await checkContent();
    return;
  }
  const path = await realpath(source);
  const bytes = await readFile(path);
  const hash = createHash('sha256').update(bytes).digest('hex');
  for (const filename of await readdir('content/reviews')) {
    if (!filename.endsWith('-review.json')) continue;
    const review = JSON.parse(await readFile('content/reviews/' + filename, 'utf8'));
    if (!review.source || review.ready_for_integration !== true || review.batch_verdict !== 'pass')
      continue;
    if ((await realpath(review.source).catch(() => '')) !== path) continue;
    if (hash !== review.source_sha256) throw Error('Media source differs from its passing review.');
    const batch = JSON.parse(bytes.toString());
    if (!Array.isArray(batch) || !batch.every((item) => itemPassedReview(review, item.id)))
      throw Error('Every media source item needs an individual passing review.');
    const catalogue = JSON.parse(await readFile('content/catalogue.json', 'utf8'));
    const voices = JSON.parse(await readFile('config/voices.json', 'utf8'));
    const result = validateBatch(batch, catalogue, voices);
    if (result.failures.length) throw Error(result.failures.join('\n'));
    return;
  }
  throw Error('Media generation requires an adopted source with a passing hash-verified review.');
}
