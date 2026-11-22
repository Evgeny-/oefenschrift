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
  title: 'Een toets',
  level: 'A1',
  part: 'reading',
  revision: 'a1-test-revision',
  exam: 'a1-practice',
  taskType: 'bericht',
  domain: 'opleiding',
  situation: 'U leest een bericht voor een toets.',
  status: 'ai-editorially-reviewed',
  targetLevelValidated: false,
  text: 'Dit bericht is voor een toets. Het staat alleen in deze toets. De tekst is kort. Er zijn twee vragen. Elke vraag heeft drie antwoorden. Kies één antwoord.',
  images: [
    {
      brief: 'A synthetic contract scene, not learner content. No text.',
      alt: 'Een tafel met papier.',
      kind: 'drawing',
    },
  ],
  questions: [
    {
      id: 'q1',
      prompt: 'Waar is dit bericht voor?',
      options: { A: 'Een toets.', B: 'Een les.', C: 'Een feest.' },
      answer: 'A',
      evidence: 'Dit bericht is voor een toets.',
      explanation: 'Het bericht is voor een toets.',
      skill: 'detail',
    },
    {
      id: 'q2',
      prompt: 'Hoeveel vragen zijn er?',
      options: { A: 'Eén.', B: 'Twee.', C: 'Drie.' },
      answer: 'B',
      evidence: 'Er zijn twee vragen.',
      explanation: 'In de tekst staat: er zijn twee vragen.',
      skill: 'quantity',
    },
  ],
};
const bank = [item],
  voices = JSON.parse(readFileSync('config/voices.json', 'utf8'));
const failures = (value: Exercise) => validateBatch([value], [], voices, false).failures;
const script = [
  { speaker: 'Tester', role: 'f-adult', text: 'Dit gesprek is voor een toets. Wij luisteren.' },
  { speaker: 'Recorder', role: 'm-adult', text: 'Goed. Ik hoor u goed. Er zijn twee vragen.' },
  { speaker: 'Tester', role: 'f-adult', text: 'Het gesprek is alleen voor deze toets.' },
  { speaker: 'Recorder', role: 'm-adult', text: 'Dank u. Wij beginnen nu met de toets.' },
];
const listening: Exercise = {
  ...item,
  id: 'A1:listening:batch999-contract:1',
  part: 'listening',
  taskType: 'gesprek',
  script,
  text: script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n'),
  situation: 'U hoort een gesprek voor een toets.',
  images: [
    {
      brief:
        'An empty recording room with abstract equipment. No people, quantities, text or signs.',
      alt: 'Een lege kamer.',
      kind: 'drawing',
    },
  ],
  questions: [
    {
      ...item.questions[0],
      prompt: 'Waar is dit gesprek voor?',
      evidence: 'Dit gesprek is voor een toets.',
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
  for (const words of [19, 46])
    assert.ok(
      failures({ ...item, text: Array(words).fill('toets').join(' ') }).some((f) =>
        f.includes('20–45'),
      ),
    );
  assert.ok(
    failures({
      ...item,
      text: item.text + ' Dit is een heel lange zin met veel te veel woorden.',
    }).some((f) => f.includes('sentence over 8')),
  );
  assert.ok(
    failures({ ...item, situation: 'U leest een bericht over de wachtkamer.' }).some((f) =>
      f.includes('wachtkamer'),
    ),
  );
  assert.ok(failures({ ...item, images: [] }).some((f) => f.includes('one context picture')));
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
    // Spread the words over four turns in sentences of five, inside the A1 turn limits.
    value.script = value.script.map((turn, i) => {
      const share = Math.floor(wordCount / 4) + (i < wordCount % 4 ? 1 : 0);
      const tokens = Array(share).fill('toets');
      return {
        ...turn,
        text: tokens
          .map((token, j) => (j % 5 === 4 || j === share - 1 ? token + '.' : token))
          .join(' '),
      };
    });
    value.text = value.script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n');
    value.questions = value.questions.map((question) => ({ ...question, evidence: 'toets' }));
    return value;
  };
  for (const count of [24, 40]) assert.deepEqual(failures(sized(count)), []);
  for (const count of [23, 41])
    assert.ok(failures(sized(count)).some((failure) => failure.includes('24–40')));
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

test('A1 step 2 allows somewhat longer texts with three questions on the same word list', () => {
  const third = {
    id: 'q3',
    prompt: 'Is de tekst kort?',
    options: { A: 'Ja.', B: 'Nee.', C: 'Soms.' },
    answer: 'C',
    evidence: 'De tekst is kort.',
    explanation: 'In de tekst staat: de tekst is kort.',
    skill: 'detail',
  };
  const longer: Exercise = {
    ...item,
    a1Step: 2,
    text: `${item.text} Lees de tekst goed. Daarna kiest u een antwoord. U heeft tien minuten. Dat is tijd voor de vragen. Tot morgen en dank u!`,
    questions: [...item.questions, third],
  };
  assert.deepEqual(exerciseMetadataErrors(longer), []);
  assert.deepEqual(failures(longer), []);
  // Step 1 keeps its limits: the same text is too long and three questions too many.
  const { a1Step, ...stepOne } = longer;
  assert.equal(a1Step, 2);
  assert.ok(failures(stepOne as Exercise).some((f) => f.includes('20–45')));
  assert.ok(failures({ ...longer, questions: item.questions }).some((f) => f.includes('3–3')));
  assert.ok(failures({ ...longer, text: item.text }).some((f) => f.includes('50–80')));
  assert.ok(
    failures({
      ...longer,
      text: longer.text + ' Dit is een heel lange zin met veel te veel woorden erin.',
    }).some((f) => f.includes('sentence over 10')),
  );
  assert.ok(
    failures({
      ...longer,
      text: longer.text.replace('kort.', 'kort en makkelijk.') + ' Wachtkamer.',
    }).some((f) => f.includes('wachtkamer')),
  );
  for (const change of [{ a1Step: 3 }, { a1Step: 1 }, { level: 'A2', exam: 'duo-a2' }])
    assert.ok(exerciseMetadataErrors({ ...longer, ...change }).length, JSON.stringify(change));
  assert.ok(
    exerciseMetadataErrors({ ...item, id: 'A1:writing:batch999-x:1', part: 'writing', a1Step: 2 })
      .length,
  );
  const turns = [
    ...script,
    { speaker: 'Tester', role: 'f-adult', text: 'Goed. Dan kiest u nu een antwoord.' },
    { speaker: 'Recorder', role: 'm-adult', text: 'Dat doe ik. Tot morgen en dank u.' },
  ];
  const conversation: Exercise = {
    ...listening,
    a1Step: 2,
    script: turns,
    text: turns.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n'),
    questions: [...listening.questions, { ...third, evidence: 'Wij beginnen nu met de toets.' }],
  };
  assert.deepEqual(failures(conversation), []);
  const { a1Step: _, ...shortProfile } = conversation;
  assert.ok(failures(shortProfile as Exercise).some((f) => f.includes('four or five turns')));
  const crowded = structuredClone(conversation);
  crowded.script = [...turns, ...turns.slice(0, 2)];
  crowded.text = crowded.script.map((turn) => `${turn.speaker}: ${turn.text}`).join('\n');
  assert.ok(failures(crowded).some((f) => f.includes('five to seven turns')));
});

test('a batch that only rewrites published items keeps their keys without a balance check', () => {
  const sameKeys = structuredClone(item);
  sameKeys.questions[1] = {
    ...sameKeys.questions[1],
    options: { A: 'Twee.', B: 'Eén.', C: 'Drie.' },
    answer: 'A',
  };
  assert.ok(
    validateBatch([sameKeys], [], voices, true).failures.some((f) => f.includes('answer key A')),
  );
  // Rewording a published item with the same keys is not a new key choice.
  const reworded = structuredClone(sameKeys);
  reworded.questions[1].explanation = 'De tekst zegt: er zijn twee vragen.';
  assert.deepEqual(validateBatch([reworded], [sameKeys], voices, true).failures, []);
  // Changing a published key is.
  assert.ok(
    validateBatch([sameKeys], [item], voices, true).failures.some((f) =>
      f.includes('answer key A'),
    ),
  );
});
