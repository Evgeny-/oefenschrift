import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { exerciseMetadataErrors } from '../app/domain/exercise-schema';
import { TASK_TYPES } from '../app/domain/exercise-types';
import { typeLabel } from '../app/domain/labels';
import { validateBatch } from '../scripts/batch-validation';
import { checkContent } from '../scripts/content';
import { validateExercise } from '../server/store';
import { itemPassedReview } from '../scripts/content-review';

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'));
const catalogue = read('content/catalogue.json');
const batch = read('content/batches/004-original.json');
const voices = read('config/voices.json');
const sets = read('content/practice-sets.json').filter((set) =>
  set.ids.every((id) => batch.some((item) => item.id === id)),
);
const writingBatch = read('content/batches/008-original.json');
const writingStarters = read('content/batches/008-starters.json');
const writingSets = read('content/practice-sets.json').filter((set) =>
  set.ids.every((id) => writingBatch.some((item) => item.id === id)),
);
const clone = <T>(value: T): T => structuredClone(value);
const sha = (value: string) => createHash('sha256').update(value).digest('hex');

function errors(change: (items: any[]) => void) {
  const items = clone(batch);
  change(items);
  return validateBatch(items, catalogue, voices).failures;
}

test('all accepted task types have Dutch and English labels, including open tasks', () => {
  for (const levels of Object.values(TASK_TYPES))
    for (const types of Object.values(levels))
      for (const type of types)
        for (const language of ['nl', 'en'] as const)
          assert.ok(typeLabel(type, language)?.trim(), `${type}/${language}`);
  assert.equal(typeLabel('picture-choose', 'en'), 'Choose a picture');
  assert.equal(typeLabel('form', 'nl'), 'Formulier');
});

test('historical review shapes retain their explicit verdict without accepting pending edits', () => {
  assert.ok(itemPassedReview({ items: [{ id: 'x', verdict: 'pass (edited)' }] }, 'x'));
  assert.ok(itemPassedReview({ items: { x: { verdict: 'pass' } } }, 'x'));
  for (const verdict of ['fail', 'revise', 'pass after future edits', undefined])
    assert.equal(itemPassedReview({ items: [{ id: 'x', verdict }] }, 'x'), false);
  assert.equal(itemPassedReview({ items: {} }, 'constructor'), false);
  assert.equal(itemPassedReview({ items: [{ id: 'other', verdict: 'pass' }] }, 'x'), false);
});

test('metadata rejects old fields, incompatible types, missing tags and false validation claims', () => {
  assert.deepEqual(exerciseMetadataErrors(batch[0]), []);
  for (const change of [
    { type: 'email' },
    { taskType: 'unknown' },
    { taskType: 'constructor' },
    { taskType: 'kort' },
    { exam: 'nt2-i' },
    { domain: undefined },
    { situation: '' },
    { targetLevelValidated: true },
  ]) {
    assert.ok(exerciseMetadataErrors({ ...batch[0], ...change }).length, JSON.stringify(change));
    assert.throws(() => validateExercise({ ...batch[0], ...change }));
  }
  assert.ok(exerciseMetadataErrors({ ...batch[0], level: 'B2' }).length);
  assert.ok(exerciseMetadataErrors({ ...batch[0], level: 'B1', exam: 'nt2-i' }).length);
});

test('author checks catch structural failures beyond catalogue labels', () => {
  assert.deepEqual(validateBatch(batch, catalogue, voices).failures, []);
  assert.ok(errors((items) => (items[0].text = 'Te kort.')).some((s) => s.includes('words')));
  assert.ok(
    errors((items) => (items[0].questions[1].id = items[0].questions[0].id)).some((s) =>
      s.includes('unique'),
    ),
  );
  assert.ok(
    errors((items) => (items[0].questions[0].evidence = 'Invented evidence.')).some((s) =>
      s.includes('verbatim'),
    ),
  );
  const listening = read('content/batches/005-original.json');
  listening[0].script[0].text += ' De scripttekst is veranderd.';
  assert.ok(
    validateBatch(listening, catalogue, voices).failures.some((s) => s.includes('script joined')),
  );
});

async function fixture(run: (directory: string) => Promise<void>, openTasks = false) {
  const cwd = process.cwd();
  const directory = mkdtempSync(join(tmpdir(), 'content-contract-'));
  const write = (path: string, value: unknown) =>
    writeFileSync(join(directory, path), JSON.stringify(value, null, 2) + '\n');
  for (const path of [
    'content/batches',
    'content/reviews',
    'content/evidence',
    'content/hints',
    'config',
  ])
    mkdirSync(join(directory, path), { recursive: true });
  const sourceBatch = openTasks ? writingBatch : batch;
  const sourceStarters = openTasks ? writingStarters : {};
  write('content/batches/004-original.json', sourceBatch);
  write('content/batches/004-starters.json', sourceStarters);
  write('content/reviews/004-review.json', {
    source: 'content/batches/004-original.json',
    source_sha256: sha(readFileSync(join(directory, 'content/batches/004-original.json'), 'utf8')),
    batch_verdict: 'pass',
    ready_for_integration: true,
    items: sourceBatch.map((item) => ({ id: item.id, verdict: 'pass' })),
    ...(openTasks
      ? {
          starters_source: 'content/batches/004-starters.json',
          starters_sha256: sha(
            readFileSync(join(directory, 'content/batches/004-starters.json'), 'utf8'),
          ),
          starters_verdict: 'pass',
        }
      : {}),
  });
  write(
    'content/catalogue.json',
    sourceBatch.map((item) => catalogue.find((entry) => entry.id === item.id)),
  );
  write('content/practice-sets.json', openTasks ? writingSets : sets);
  write('config/voices.json', voices);
  write('content/hints/sentence-starters.json', sourceStarters);
  write('content/hints/review.json', {
    source: 'content/hints/sentence-starters.json',
    source_sha256: sha(
      readFileSync(join(directory, 'content/hints/sentence-starters.json'), 'utf8'),
    ),
    verdict: 'pass',
    ready_for_integration: true,
    catalogue_sha256: sha(readFileSync(join(directory, 'content/catalogue.json'), 'utf8')),
  });
  try {
    process.chdir(directory);
    await run(directory);
  } finally {
    process.chdir(cwd);
    rmSync(directory, { recursive: true, force: true });
  }
}

test('a matching review hash cannot bypass the authoring contract at integration', async () => {
  await fixture(async () => {
    const items = read('content/batches/004-original.json');
    items[0].type = 'email';
    const source = JSON.stringify(items, null, 2) + '\n';
    writeFileSync('content/batches/004-original.json', source);
    const review = read('content/reviews/004-review.json');
    review.source_sha256 = sha(source);
    writeFileSync('content/reviews/004-review.json', JSON.stringify(review));
    await assert.rejects(checkContent(true, 'test'), /legacy type field/);
  });
});

test('reviewed imports remove retired fields and stale media without losing current media', async () => {
  await fixture(async () => {
    const seed = read('content/catalogue.json');
    seed[0].type = 'message';
    seed[0].text = 'Superseded source.';
    seed[0].audio = 'audio/obsolete.mp3';
    seed[0].duration = 1;
    seed[0].peaks = [1];
    seed[1].questions[0].questionAudio = 'audio/current.mp3';
    writeFileSync('content/catalogue.json', JSON.stringify(seed));
    await checkContent(true, 'test');
    const result = read('content/catalogue.json');
    assert.equal(result[0].text, batch[0].text);
    for (const field of ['type', 'audio', 'duration', 'peaks']) assert.ok(!(field in result[0]));
    assert.equal(result[1].questions[0].questionAudio, 'audio/current.mp3');
    await checkContent();
  });
});

test('replacement batches preserve final media across repeated imports', async () => {
  await fixture(async () => {
    const replacements = clone(batch);
    replacements[0].text += ' U kunt de informatie ook thuis lezen.';
    const source = JSON.stringify(replacements, null, 2) + '\n';
    writeFileSync('content/batches/005-original.json', source);
    writeFileSync(
      'content/reviews/005-review.json',
      JSON.stringify({
        source: 'content/batches/005-original.json',
        source_sha256: sha(source),
        batch_verdict: 'pass',
        ready_for_integration: true,
        replaces: replacements.map((item) => item.id),
        items: replacements.map((item) => ({ id: item.id, verdict: 'pass' })),
      }),
    );
    await checkContent(true, 'test replacement');
    const seed = read('content/catalogue.json');
    const revision = seed[0].revision;
    seed[0].audio = 'audio/final.mp3';
    seed[0].duration = 12;
    seed[0].questions[0].questionAudio = 'audio/final-question.mp3';
    writeFileSync('content/catalogue.json', JSON.stringify(seed));
    await checkContent(true, 'test derived media');
    assert.equal(read('content/catalogue.json')[0].audio, 'audio/final.mp3');
    assert.equal(read('content/catalogue.json')[0].revision, revision);
    await checkContent();
  });
});

test('superseded sentence starters cannot overwrite the latest reviewed starters', async () => {
  await fixture(async () => {
    const replacements = clone(writingBatch);
    const starters = clone(writingStarters);
    starters[replacements[0].id][0] = 'Mijn nieuwe zin begint met …';
    const source = JSON.stringify(replacements, null, 2) + '\n';
    const starterSource = JSON.stringify(starters, null, 2) + '\n';
    writeFileSync('content/batches/005-original.json', source);
    writeFileSync('content/batches/005-starters.json', starterSource);
    writeFileSync(
      'content/reviews/005-review.json',
      JSON.stringify({
        source: 'content/batches/005-original.json',
        source_sha256: sha(source),
        batch_verdict: 'pass',
        ready_for_integration: true,
        replaces: replacements.map((item) => item.id),
        items: replacements.map((item) => ({ id: item.id, verdict: 'pass' })),
        starters_source: 'content/batches/005-starters.json',
        starters_sha256: sha(starterSource),
        starters_verdict: 'pass',
      }),
    );
    await checkContent(true, 'test replacement');
    await checkContent();
    assert.deepEqual(read('content/hints/sentence-starters.json'), starters);
  }, true);
});
