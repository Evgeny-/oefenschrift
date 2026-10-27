import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { exerciseMetadataErrors } from '../app/domain/exercise-schema';
import { validateBatch } from '../scripts/batch-validation';
import { mediaErrors } from '../scripts/media-check';
const voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));
const writing = {
  id: 'A1:writing:batch999-contract:1',
  level: 'A1',
  part: 'writing',
  exam: 'a1-practice',
  taskType: 'bericht',
  rubric: 'a1-schrijven',
  domain: 'vrije-tijd-familie',
  title: 'Softwaretest',
  status: 'draft',
  targetLevelValidated: false,
  prompt: 'Schrijf een bericht aan een vriend. Zeg wat je eet. Vraag of je vriend komt.',
  criteria: [
    ['Je zegt wat je eet.', 'You say what you eat.'],
    ['Je vraagt of je vriend komt.', 'You ask whether your friend is coming.'],
    ['Je antwoord is begrijpelijk.', 'Your answer is understandable.'],
  ],
  sample: 'Ik eten brood.',
  quotes: ['Ik eten brood.', null, 'Ik eten brood.'],
  model: 'Ik eet brood in het park. Kom je ook?',
  images: [
    {
      brief: 'A synthetic software-test scene, not learner content. No text.',
      alt: 'Een afbeelding voor een softwaretest.',
      kind: 'drawing',
    },
  ],
};
const speaking = {
  ...writing,
  id: 'A1:speaking:batch999-contract:1',
  part: 'speaking',
  taskType: 'picture-describe',
  rubric: 'a1-spreken',
  speakingSeconds: 20,
  prepSeconds: 0,
};
const failures = (item: any) => validateBatch([item], [], voices, false).failures;

test('A1 open practice accepts tiny picture tasks with a separate foundation rubric', () => {
  for (const item of [writing, speaking]) {
    assert.deepEqual(exerciseMetadataErrors(item), []);
    assert.deepEqual(failures(item), []);
    assert.ok(exerciseMetadataErrors({ ...item, rubric: 'a2-schrijven' }).length);
    assert.ok(exerciseMetadataErrors({ ...item, exam: 'duo-a2' }).length);
    assert.ok(exerciseMetadataErrors({ ...item, taskType: 'email' }).length);
  }
});

test('A1 open tasks bound production demands, criteria, visual stimulus and preparation', () => {
  for (const item of [writing, speaking]) {
    for (const change of [
      { model: Array(26).fill('test').join(' ') },
      { prompt: Array(56).fill('test').join(' ') },
      { criteria: item.criteria.slice(0, 2), quotes: item.quotes.slice(0, 2) },
      { images: [] },
      { images: [...item.images, ...item.images] },
      { images: [{ ...item.images[0], kind: 'photo' }] },
      { questions: [{ id: 'q1' }] },
    ])
      assert.ok(failures({ ...item, ...change }).length, JSON.stringify(change));
  }
  assert.ok(
    failures({ ...speaking, prepSeconds: 10 }).some((error) => error.includes('timed preparation')),
  );
  assert.ok(
    failures({ ...speaking, speakingSeconds: 40 }).some((error) => error.includes('20-second')),
  );
});

test('A1 open items still require generated reviewed pictures and spoken prompt audio before release', () => {
  const writingErrors = mediaErrors([writing], [], [], () => false);
  assert.ok(writingErrors.some((error) => error.includes('illustration file missing')));
  const speakingErrors = mediaErrors([speaking], [], [], () => false);
  assert.ok(
    speakingErrors.some((error) => error.includes('#prompt: generated audio file missing')),
  );
});
