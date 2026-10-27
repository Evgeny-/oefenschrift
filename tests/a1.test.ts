import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import type { Exercise } from '../app/types';
import { exerciseMetadataErrors } from '../app/domain/exercise-schema';
import { validateBatch } from '../scripts/batch-validation';
import { checkAvailability, startCheck } from '../app/domain/check';
import { defaults, flatten, restore, startSession, STORAGE_KEY } from '../app/domain/study';
import { readPreferences, stateForRoute } from '../app/domain/render-state';
import { readRoute, routeLevel, routePath } from '../app/domain/routes';
import { pageSeo, sitemapPaths } from '../app/domain/seo';
import { ContentStore, validateExercise } from '../server/store';
import { mediaErrors } from '../scripts/media-check';

// Synthetic contract data, never integrated into the learner catalogue.
const item: Exercise = {
  id: 'A1:reading:batch999-contract:1',
  title: 'Softwaretest',
  level: 'A1',
  part: 'reading',
  revision: 'a1-test-revision',
  exam: 'a1-practice',
  taskType: 'bericht',
  domain: 'opleiding',
  situation: 'U leest een bericht voor een softwaretest.',
  status: 'ai-editorially-reviewed',
  targetLevelValidated: false,
  text: 'Dit bericht is voor een softwaretest. Het staat alleen in deze test. De tekst is kort. Er zijn twee vragen. Elke vraag heeft drie antwoorden. Kies één antwoord.',
  questions: [
    {
      id: 'q1',
      prompt: 'Waarvoor is dit bericht?',
      options: { A: 'Een softwaretest.', B: 'Een taalles.', C: 'Een examen.' },
      answer: 'A',
      evidence: 'Dit bericht is voor een softwaretest.',
      explanation: 'Het bericht zegt dat het voor een softwaretest is.',
      skill: 'detail',
    },
    {
      id: 'q2',
      prompt: 'Hoeveel vragen zijn er?',
      options: { A: 'Eén.', B: 'Twee.', C: 'Drie.' },
      answer: 'B',
      evidence: 'Er zijn twee vragen.',
      explanation: 'In de tekst staat dat er twee vragen zijn.',
      skill: 'quantity',
    },
  ],
};
const bank = [item],
  voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));
const failures = (value: Exercise) => validateBatch([value], [], voices, false).failures;
const script = [
  {
    speaker: 'Tester',
    role: 'f-adult',
    text: 'Dit gesprek is voor een softwaretest. Wij testen het geluid.',
  },
  { speaker: 'Recorder', role: 'm-adult', text: 'Goed. Ik hoor uw stem. Er zijn twee vragen.' },
  {
    speaker: 'Tester',
    role: 'f-adult',
    text: 'De opname staat alleen in deze test. Zij blijft hier.',
  },
  { speaker: 'Recorder', role: 'm-adult', text: 'Dank u. Dan kunnen wij nu met de test beginnen.' },
];
const listening: Exercise = {
  ...item,
  id: 'A1:listening:batch999-contract:1',
  part: 'listening',
  taskType: 'gesprek',
  script,
  text: script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n'),
  situation: 'U hoort een gesprek voor een softwaretest.',
  images: [
    {
      brief:
        'An empty recording room with abstract equipment. No people, quantities, text or signs.',
      alt: 'Een ruimte voor opnames.',
      kind: 'drawing',
    },
  ],
  questions: [
    {
      ...item.questions[0],
      prompt: 'Waarvoor is dit gesprek?',
      evidence: 'Dit gesprek is voor een softwaretest.',
    },
    item.questions[1],
  ],
};

test('A1 supports short reading messages with its own practice contract', () => {
  assert.deepEqual(exerciseMetadataErrors(item), []);
  assert.deepEqual(failures(item), []);
  assert.doesNotThrow(() => validateExercise(item));
  for (const change of [
    { exam: 'duo-a2' },
    { part: 'listening' }, // The reading-only task type is invalid for listening.
    { part: 'writing' },
    { part: 'speaking' },
    { part: 'knm', exam: 'knm' },
    { taskType: 'email' },
    { targetLevelValidated: true },
  ]) {
    const changed = { ...item, ...change };
    assert.ok(exerciseMetadataErrors(changed).length, JSON.stringify(change));
    assert.throws(() => validateExercise(changed));
  }
  for (const words of [24, 61])
    assert.ok(
      failures({ ...item, text: Array(words).fill('test').join(' ') }).some((f) =>
        f.includes('25–60'),
      ),
    );
  assert.ok(
    failures({ ...item, questions: item.questions.slice(0, 1) }).some((f) =>
      f.includes('2–2 questions'),
    ),
  );
  const fourOptions = structuredClone(item);
  fourOptions.questions[0].options.D = 'Een bericht.';
  assert.ok(failures(fourOptions).some((f) => f.includes('exactly three options')));
  const inference = structuredClone(item);
  inference.questions[0].skill = 'inference';
  assert.ok(failures(inference).some((f) => f.includes('A1 skills')));
});

test('A1 conversations require a bounded two-voice script and one context illustration', () => {
  assert.deepEqual(exerciseMetadataErrors(listening), []);
  assert.deepEqual(failures(listening), []);
  assert.doesNotThrow(() => validateExercise(listening));
  for (const change of [
    { script: script.slice(0, 3) },
    { script: [...script, ...script.slice(0, 3)] },
    { script: script.map((turn) => ({ ...turn, role: 'f-adult' })) },
    { script: script.map((turn, i) => ({ ...turn, role: i === 0 ? 'constructor' : turn.role })) },
    { script: script.map((turn, i) => ({ ...turn, role: i === 0 ? 'm-shop' : turn.role })) },
    {
      script: script.map((turn, i) => ({
        ...turn,
        speaker: i === 0 ? 'Third speaker' : turn.speaker,
      })),
    },
    { images: [] },
    { images: [listening.images[0], listening.images[0]] },
    { images: [{ ...listening.images[0], brief: '' }] },
    { images: [{ ...listening.images[0], alt: '' }] },
    { images: [{ ...listening.images[0], kind: 'photo' }] },
    { text: listening.text + '\nEen zin buiten het gesprek.' },
  ]) {
    const value = { ...listening, ...change };
    if ('script' in change)
      value.text = change.script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n');
    assert.ok(failures(value).length, JSON.stringify(change));
  }
  const sameVoice = structuredClone(voices);
  sameVoice.roles['m-adult'].voice_id = sameVoice.roles['f-adult'].voice_id;
  assert.ok(
    validateBatch([listening], [], sameVoice, false).failures.some((failure) =>
      failure.includes('distinct'),
    ),
  );
  assert.ok(
    validateBatch([listening], [], { ...voices, language: 'nl-BE' }, false).failures.some(
      (failure) => failure.includes('Netherlands Dutch'),
    ),
  );
});

test('A1 listening counts spoken words without transcript speaker labels', () => {
  const sized = (wordCount: number) => {
    const value = structuredClone(listening);
    value.script = value.script.map((turn, i) => ({
      ...turn,
      text: Array(i === 0 ? wordCount - 3 : 1)
        .fill('test')
        .join(' '),
    }));
    value.text = value.script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n');
    value.questions = value.questions.map((question) => ({ ...question, evidence: 'test' }));
    return value;
  };
  for (const count of [30, 70]) assert.deepEqual(failures(sized(count)), []);
  for (const count of [29, 71])
    assert.ok(failures(sized(count)).some((failure) => failure.includes('30–70')));
  const extraQuestion = {
    ...listening,
    questions: [...listening.questions, { ...listening.questions[0], id: 'q3' }],
  };
  assert.ok(failures(extraQuestion).some((failure) => failure.includes('2–2 questions')));
  const fourthOption = structuredClone(listening);
  fourthOption.questions[0].options.D = 'Anders.';
  assert.ok(failures(fourthOption).some((failure) => failure.includes('exactly three options')));
  const inference = structuredClone(listening);
  inference.questions[0].skill = 'inference';
  assert.ok(failures(inference).some((failure) => failure.includes('A1 skills')));
});

test('A1 listening cannot pass release checks without reviewed audio and illustration files', () => {
  const generated = {
    ...listening,
    audio: 'audio/a1-fragment.mp3',
    images: [{ ...listening.images[0], file: 'images/a1-context.webp' }],
    questions: listening.questions.map((question) => ({
      ...question,
      questionAudio: `audio/a1-${question.id}.mp3`,
    })),
  };
  const clip = (key: string, file: string, text: string) => ({
    key,
    file,
    script_sha256: createHash('sha256').update(text).digest('hex'),
    wer: 0,
    inserted: 0,
  });
  const clips = [
    clip(listening.id + '#fragment', generated.audio, script.map((turn) => turn.text).join('\n')),
    ...generated.questions.map((question) =>
      clip(listening.id + '#' + question.id, question.questionAudio, question.prompt),
    ),
  ];
  const image = {
    file: generated.images[0].file,
    brief: generated.images[0].brief,
    reviewed: true,
  };
  assert.deepEqual(
    mediaErrors([generated], clips, [image], () => true),
    [],
  );
  assert.ok(
    mediaErrors([generated], clips.slice(1), [image], () => true).some((error) =>
      error.includes('#fragment'),
    ),
  );
  assert.ok(
    mediaErrors([generated], clips.slice(0, 1), [image], () => true).some((error) =>
      error.includes('#q1'),
    ),
  );
  assert.ok(
    mediaErrors([generated], clips, [{ ...image, reviewed: false }], () => true).some((error) =>
      error.includes('review'),
    ),
  );
  assert.ok(
    mediaErrors([{ ...generated, images: [] }], clips, [], () => true).some((error) =>
      error.includes('context illustration'),
    ),
  );
  assert.ok(
    mediaErrors(
      [{ ...generated, images: [{ ...generated.images[0], brief: '' }] }],
      clips,
      [image],
      () => true,
    ).length,
  );
  assert.ok(
    mediaErrors([generated], clips, [image], () => false).some((error) =>
      error.includes('missing'),
    ),
  );
});

test('A1 links, preferences and resumed answers retain the chosen level', () => {
  for (const language of ['nl', 'en'] as const) {
    const url = new URL(routePath('reading', 'A1', language), 'https://example.test');
    assert.equal(routeLevel(url), 'A1');
    assert.equal(readRoute(url, null), 'reading');
  }
  const preferences = { ...defaults().settings, level: 'A1' as const };
  assert.equal(
    readPreferences('oefenschrift_preferences=' + encodeURIComponent(JSON.stringify(preferences)))
      .level,
    'A1',
  );
  const state = stateForRoute(defaults(), 'exercise/' + item.id, bank, [], 1000);
  assert.equal(state.settings.level, 'A1');
  state.active.answers[flatten(state.active, bank)[0].key] = 'A';
  const restored = restore(
    { getItem: (key) => (key === STORAGE_KEY ? JSON.stringify(state) : null) },
    bank,
  );
  assert.equal(restored.settings.level, 'A1');
  assert.deepEqual(restored.active.answers, state.active.answers);
});

test('A1 foundation items cannot start mock exams or level checks', () => {
  assert.throws(() => startSession([item.id], 'mock', bank));
  assert.throws(() => startSession([item.id], 'check', bank, 1000, [item.id + '/q1']));
  assert.equal(checkAvailability(bank, 'A1').enough, false);
  assert.equal(startCheck(bank, 'A1', {}), null);
  const enoughQuestions = [
    item,
    { ...item, id: 'A1:reading:batch999-extra:1' },
    listening,
    { ...listening, id: 'A1:listening:batch999-extra:1' },
  ];
  assert.equal(checkAvailability(enoughQuestions, 'A1').total, 0);
  assert.equal(startCheck(enoughQuestions, 'A1', {}), null);
  assert.throws(() => startSession([listening.id], 'mock', enoughQuestions));
  for (const language of ['nl', 'en'] as const) {
    const seo = pageSeo('check', 'A1', bank, [], 'https://example.test', language);
    assert.equal(seo.noindex, true);
    assert.ok(
      !seo.description.includes('ten questions') && !seo.description.includes('tien vragen'),
    );
    const home = pageSeo('home', 'A1', bank, [], 'https://example.test', language);
    assert.ok(home.title.includes('A1'));
    assert.ok(!home.description.includes('A2') && !home.description.includes('B1'));
  }
  const paths = sitemapPaths(bank, []);
  assert.ok(paths.includes('/a1/reading') && paths.includes('/en/a1/reading'));
  assert.ok(!paths.some((path) => path.includes('/a1/level-check')));
});

test('A1 exercises and anonymous visit levels are accepted by the content store', () => {
  const store = new ContentStore(':memory:', bank, []);
  try {
    assert.equal(store.catalogue()[0].level, 'A1');
    store.recordEvents('a'.repeat(32), [{ kind: 'visit', lang: 'nl', level: 'A1' }]);
    assert.equal((store.db.prepare('SELECT level FROM events').get() as any).level, 'A1');
  } finally {
    store.close();
  }
});
