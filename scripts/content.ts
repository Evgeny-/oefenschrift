import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, readdir, realpath, rename, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { validateBatch } from './batch-validation';
import { itemPassedReview } from './content-review';

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

export async function checkContent(write = false, refreshHints = '') {
  const path = 'content/catalogue.json';
  const original = await readFile(path, 'utf8');
  const catalogue = JSON.parse(original);
  const byId = new Map<string, any>(catalogue.map((item) => [item.id, item]));
  requireValue(byId.size === catalogue.length, 'Duplicate catalogue IDs');
  const reviewedStarters: { filename: string; starters: Record<string, string[]> }[] = [];
  const owners = new Map<string, string>();
  const imports = new Map<string, any[]>();
  const finalSources = new Map<string, any>();
  for (const filename of (await readdir('content/reviews'))
    .filter((name) => name.endsWith('-review.json'))
    .sort()) {
    const review = await readJson('content/reviews/' + filename);
    // A review still in its revision loop gates only its own batch; it does not block the build.
    if (review.ready_for_integration !== true) {
      console.log(`Skipping ${filename}: not ready for integration (${review.batch_verdict}).`);
      continue;
    }
    // A reviewer's proposed file that has not been adopted yet (blueprint §12, step 4) waits too.
    const proposed = String(review.source || '').replace(/-original\.json$/, '-proposed.json');
    if (
      proposed !== review.source &&
      existsSync(proposed) &&
      digest(await readFile(proposed)) === review.source_sha256
    ) {
      console.log(`Skipping ${filename}: awaiting npm run batch:adopt.`);
      continue;
    }
    // A batch of open tasks brings reviewed sentence starters; they are merged into the overlay below.
    if (review.starters_source && review.starters_verdict === 'pass') {
      const batchStarters = await reviewedSource(
        {
          source: review.starters_source,
          source_sha256: review.starters_sha256,
          ready_for_integration: true,
          verdict: 'pass',
        },
        'content/batches',
        'verdict',
      );
      reviewedStarters.push({ filename, starters: batchStarters });
    }
    const sourceItems = await reviewedSource(review, 'content/batches', 'batch_verdict');
    requireValue(Array.isArray(sourceItems) && sourceItems.length, `${filename}: empty batch`);
    requireValue(
      sourceItems.every((item) => itemPassedReview(review, item.id)),
      `${filename}: every imported exercise needs an individual passing review`,
    );
    imports.set(filename, sourceItems);
    for (const item of sourceItems) {
      const owner = owners.get(item.id);
      requireValue(
        !owner || review.replaces?.includes(item.id),
        `${filename}: replacing ${item.id} from ${owner} needs an explicit replaces entry`,
      );
      owners.set(item.id, filename);
    }
  }
  // Resolve replacements before touching the catalogue. Importing superseded
  // versions first would discard media that still matches the final source.
  for (const [filename, items] of imports) {
    for (const item of items.filter((entry) => owners.get(entry.id) === filename)) {
      finalSources.set(item.id, structuredClone(item));
      if (!byId.has(item.id)) {
        const added = { ...item };
        catalogue.push(added);
        byId.set(item.id, added);
      }
      const previous = byId.get(item.id);
      // Media fields live on the catalogue, not in the batch: keep question audio when the question is unchanged.
      const questionAudio = new Map<string, { audio?: string; prompt: string; options: string }>(
        (previous.questions || []).map((q) => [
          q.id,
          { audio: q.questionAudio, prompt: q.prompt, options: JSON.stringify(q.options) },
        ]),
      );
      // A B1 listening fragment (one clip per question) and the narrator's introduction stay too.
      const fragments = new Map<string, any>(
        (previous.questions || [])
          .filter((q) => q.audio)
          .map((q) => [q.id, { ...q, script: JSON.stringify(q.script) }]),
      );
      const intro = previous.introAudio && { text: previous.intro, audio: previous.introAudio };
      const previousImages = Array.isArray(previous.images) ? previous.images : [];
      const media: Record<string, unknown> = {};
      if (
        previous.text === item.text &&
        JSON.stringify(previous.script) === JSON.stringify(item.script)
      )
        for (const key of ['audio', 'duration', 'peaks'])
          if (previous[key] !== undefined) media[key] = previous[key];
      if (previous.prompt === item.prompt && previous.promptAudio)
        media.promptAudio = previous.promptAudio;
      if (JSON.stringify(previous.cue) === JSON.stringify(item.cue) && previous.cueAudio)
        media.cueAudio = previous.cueAudio;
      // Replace the reviewed record, retaining only media whose source is unchanged.
      // Object.assign alone left retired fields (including type and old scripts) behind.
      for (const key of Object.keys(previous)) delete previous[key];
      Object.assign(previous, item, media, { status: 'ai-editorially-reviewed' });
      if (intro && intro.text === previous.intro) previous.introAudio = intro.audio;
      // Generated picture files live on the catalogue too: keep them when the brief is unchanged.
      if (Array.isArray(previous.images))
        previous.images = previous.images.map((image, index) => {
          const kept = previousImages[index];
          return kept?.file && kept.brief === image.brief && !image.file
            ? { ...image, file: kept.file, kind: kept.kind }
            : image;
        });
      if (item.imageBrief && previousImages[0]?.file) {
        if (previousImages[0].brief === item.imageBrief) {
          previous.images = [previousImages[0]];
          delete previous.imageBrief;
          delete previous.imageAlt;
        } else delete previous.images; // a changed brief means a new drawing
      }
      for (const q of previous.questions || []) {
        const kept = questionAudio.get(q.id);
        if (kept?.audio && kept.prompt === q.prompt && kept.options === JSON.stringify(q.options))
          q.questionAudio = kept.audio;
        const fragment = fragments.get(q.id);
        if (fragment && fragment.script === JSON.stringify(q.script) && !q.audio)
          Object.assign(q, {
            audio: fragment.audio,
            duration: fragment.duration,
            peaks: fragment.peaks,
          });
      }
    }
  }
  const voices = await readJson('config/voices.json');
  for (const [filename, items] of imports) {
    const effective = items.filter((item) => owners.get(item.id) === filename);
    if (!effective.length) continue;
    // The original full batch was balanced at review. A surviving subset of a
    // partially superseded batch is checked per item, without imposing new key quotas.
    const checked = validateBatch(effective, catalogue, voices, effective.length === items.length);
    requireValue(
      !checked.failures.length,
      `${filename}: authoring checks failed during integration:\n${checked.failures.join('\n')}`,
    );
  }
  requireValue(
    catalogue.every((item) => owners.has(item.id)),
    'Every exercise must come from a passing reviewed batch',
  );
  for (const filename of (await readdir('content/evidence'))
    .filter((name) => name.endsWith('-review.json'))
    .sort()) {
    const review = await readJson('content/evidence/' + filename);
    const evidence = await reviewedSource(review, 'content/evidence', 'verdict');
    for (const [id, quotes] of Object.entries(evidence) as [string, Record<string, string>][]) {
      // A later reviewed rewrite supplies its own evidence. Historical overlays remain
      // hash-verified for the audit trail, but cannot overwrite the rewritten questions.
      if (owners.has(id)) continue;
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
      'exam',
      'taskType',
      'textType',
      'domain',
      'situation',
      'intro',
      'script',
      'cue',
      'scaffold',
      'formFields',
      'table',
      'images',
      'imageBrief',
      'imageAlt',
      'opening',
      'minSentences',
      'speakingSeconds',
      'prepSeconds',
      'rubric',
      'sample',
      'quotes',
      'grammarTarget',
      'adequacyNote',
      'goal',
    ];
    // Revisions describe the reviewed exercise. Regenerating derived media must
    // not erase answers to an otherwise unchanged exercise.
    const source = finalSources.get(item.id);
    const core = Object.fromEntries(
      fields.filter((key) => Object.hasOwn(source, key)).map((key) => [key, source[key]]),
    );
    item.revision = 'c1:' + digest(canonical(core)).slice(0, 16);
  }

  // Keep reviewed bytes intact when content has not changed. Legacy audio bins
  // include 1.0, which JSON.stringify would otherwise reformat to 1.
  const changed = JSON.stringify(catalogue) !== JSON.stringify(JSON.parse(original));
  const candidate = changed ? JSON.stringify(catalogue, null, 2) + '\n' : original;
  const review = await readJson('content/hints/review.json');
  let starters = await reviewedSource(
    { ...review, source: 'content/hints/sentence-starters.json' },
    'content/hints',
    'verdict',
  );
  const open = catalogue.filter((item) => !item.questions?.length);
  const currentStarters = reviewedStarters.map((batch) => ({
    ...batch,
    starters: Object.fromEntries(
      Object.entries(batch.starters).filter(([id]) => owners.get(id) === batch.filename),
    ),
  }));
  // Starters reviewed with their batch are merged into the overlay; the overlay's reviewed hash moves
  // with them, and the merge is recorded in the hints review.
  // A revised batch whose review re-covered its starters (new starters hash, verdict pass) replaces
  // the overlay entries it changed; the review JSON's hash gate is what makes both cases reviewed.
  const staleStarters = currentStarters
    .map((batch) => ({
      ...batch,
      ids: Object.keys(batch.starters).filter(
        (id) =>
          !starters[id] || JSON.stringify(starters[id]) !== JSON.stringify(batch.starters[id]),
      ),
    }))
    .filter((batch) => batch.ids.length);
  if (staleStarters.length) {
    requireValue(
      write,
      'Reviewed sentence starters are not merged yet. Run npm run content:integrate.',
    );
    for (const batch of staleStarters)
      for (const id of batch.ids) starters = { ...starters, [id]: batch.starters[id] };
    const overlay = JSON.stringify(starters, null, 2) + '\n';
    await writeFile('content/hints/sentence-starters.json', overlay);
    review.merged_batches = [
      ...(review.merged_batches || []),
      ...staleStarters.map((batch) => ({
        date: new Date().toISOString().slice(0, 10),
        review: batch.filename,
        items: batch.ids.length,
        ...(batch.ids.some((id) => JSON.parse(original).some((item) => item.id === id))
          ? { revised: batch.ids }
          : {}),
      })),
    ];
    review.source_sha256 = digest(overlay);
    review.catalogue_sha256 = digest(candidate);
    await writeFile('content/hints/review.json', JSON.stringify(review, null, 2) + '\n');
    console.log(
      `Merged reviewed sentence starters from ${staleStarters.map((b) => b.filename).join(', ')}.`,
    );
  }
  // --refresh-hints: a batch of closed items (or media fields) leaves the starters valid. When the open
  // tasks and their criteria are unchanged against the reviewed starters, record the merged catalogue's
  // hash in the review instead of demanding a new review. Any change to an open task still blocks here.
  if (refreshHints && digest(candidate) !== review.catalogue_sha256) {
    const previousOpen = JSON.parse(original).filter((item) => !item.questions?.length);
    // A changed task is covered when its batch review, at the batch's current hash, passed the starters too.
    const covered = (id: string) => currentStarters.some((batch) => batch.starters[id]);
    const same =
      previousOpen.length === open.length &&
      previousOpen.every((before) => {
        const after = open.find((item) => item.id === before.id);
        return (
          after &&
          (JSON.stringify(after.criteria) === JSON.stringify(before.criteria) || covered(after.id))
        );
      });
    requireValue(same, 'An open task changed; the sentence starters need a focused review');
    review.hash_refreshes = [
      ...(review.hash_refreshes || []),
      {
        date: new Date().toISOString().slice(0, 10),
        reason: refreshHints,
        from: review.catalogue_sha256,
        to: digest(candidate),
        open_items_unchanged: true,
      },
    ];
    review.catalogue_sha256 = digest(candidate);
    await writeFile('content/hints/review.json', JSON.stringify(review, null, 2) + '\n');
    console.log('Sentence-starter review hash refreshed: ' + refreshHints);
  }
  requireValue(
    digest(candidate) === review.catalogue_sha256,
    'Sentence starters need review against the updated catalogue',
  );
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
    // A B1 listening text is a five-minute conversation with its own questions, so its drill is one text;
    // a B1 reading text or writing task is long, so those drills are two items; a KNM fact is one
    // question, so its drill is one theme of eight to ten (§11).
    const minimum =
      set.level === 'B1' && set.part === 'listening'
        ? 1
        : set.level === 'B1' && ['reading', 'writing'].includes(set.part)
          ? 2
          : 3;
    const maximum = set.part === 'knm' ? 10 : 5;
    requireValue(
      !setIds.has(set.id) && set.ids.length >= minimum && set.ids.length <= maximum,
      'Practice sets need unique IDs and three to five exercises (two texts for B1 reading, up to ten KNM facts)',
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

if (process.argv[1]?.endsWith('/content.ts')) {
  const args = process.argv.slice(2);
  const refresh = args.indexOf('--refresh-hints');
  await checkContent(args.includes('--write'), refresh >= 0 ? args[refresh + 1] || 'refresh' : '');
}
