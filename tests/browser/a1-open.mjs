import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const origin = process.env.TEST_ORIGIN;
const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data),
    request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  message.type === 'error'
    ? request.reject(Error(JSON.stringify(message)))
    : request.resolve(message.result);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
}
await send('session.new', { capabilities: { alwaysMatch: { acceptInsecureCerts: false } } });
// This browser has its own cookies and study history; run.ts owns the temporary
// database and Firefox profile. No learner browser data is read or cleared.
const { userContext } = await send('browser.createUserContext');
const { context } = await send('browsingContext.create', { type: 'tab', userContext });
async function evaluate(expression) {
  const result = await send('script.evaluate', {
    expression,
    target: { context },
    awaitPromise: true,
  });
  if (result.type === 'exception') throw Error(JSON.stringify(result));
  return result.result?.type === 'null' ? null : result.result?.value;
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('Missing A1 open UI: '+${JSON.stringify(expression)})):setTimeout(poll,50);poll();})`,
  );
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await wait(`document.querySelector('.app-shell[data-hydrated]')`);
  await evaluate('document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,200)))');
}
async function viewport(width, height = 950) {
  await send('browsingContext.setViewport', { context, viewport: { width, height } });
  await evaluate('new Promise(r=>setTimeout(r,200))');
}
async function click(selector) {
  await wait(
    `document.querySelector(${JSON.stringify(selector)})&&!document.querySelector(${JSON.stringify(selector)}).disabled`,
  );
  const point = JSON.parse(
    await evaluate(
      `JSON.stringify((()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})())`,
    ),
  );
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'pointer',
        id: 'mouse',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', ...point, origin: 'viewport' },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ],
  });
  await evaluate('new Promise(r=>setTimeout(r,180))');
}
async function check(expression, label) {
  assert.ok(await evaluate(expression), label);
  console.log('  ✓ ' + label);
}
async function shot(name) {
  await evaluate('window.scrollTo(0,0)');
  const result = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile(`tmp/a1-open-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
async function answer(item, text) {
  await wait(`document.querySelector('#open-answer')`);
  await evaluate(
    `(()=>{const el=document.querySelector('#open-answer');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,${JSON.stringify(text)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`,
  );
  await wait(
    `JSON.parse(localStorage.getItem('oefenschrift.study.v2'))?.drafts[${JSON.stringify(item.id)}]===${JSON.stringify(text)}`,
  );
}
function draftMatches(item, text) {
  return `document.querySelector('#open-answer')?.value===${JSON.stringify(text)}&&JSON.parse(localStorage.getItem('oefenschrift.study.v2'))?.drafts[${JSON.stringify(item.id)}]===${JSON.stringify(text)}`;
}

const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const starters = JSON.parse(await fs.readFile('content/hints/sentence-starters.json', 'utf8'));
const journeys = ['writing', 'speaking'].map((part) => {
  const set = sets.find((entry) => entry.id === `a1-${part}-01`);
  assert.ok(set && set.ids.length === 3, `Expected a three-item A1 ${part} set`);
  const items = set.ids.map((id) => bank.find((item) => item.id === id));
  for (const item of items) {
    assert.ok(item && item.level === 'A1' && item.part === part);
    assert.equal(item.images.length, 1);
    assert.equal(item.criteria.length, 3);
    assert.equal(starters[item.id]?.length, 3);
  }
  return { part, set, items };
});

// Synthetic refusals exercise the learner recovery flow without sending text or
// audio to a provider. The real status request still issues the local page pass.
function syntheticServices() {
  const realFetch = window.fetch.bind(window);
  window.a1OpenFeedbackOff = false;
  window.a1OpenCalls = { feedback: 0, transcribe: 0 };
  window.fetch = async (input, init) => {
    const path = new URL(typeof input === 'string' ? input : input.url, location.href).pathname;
    if (path.endsWith('/api/status')) {
      const response = await realFetch(input, init),
        status = await response.json();
      return new Response(
        JSON.stringify({
          ...status,
          feedback: !window.a1OpenFeedbackOff,
          feedbackPaused: window.a1OpenFeedbackOff,
          speech: false,
          remaining: { feedback: 30, speech: 0 },
        }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    }
    if (path.endsWith('/api/feedback') || path.endsWith('/api/transcribe')) {
      const service = path.endsWith('/api/feedback') ? 'feedback' : 'transcribe';
      window.a1OpenCalls[service]++;
      return new Response(
        JSON.stringify({
          error: 'Synthetic browser-test refusal',
          code: window.a1OpenFeedbackOff ? 'feedback_off' : 'provider_error',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      );
    }
    return realFetch(input, init);
  };
}

async function inspectTask(item) {
  await wait(
    `document.querySelector('.exercise-heading h1')?.textContent===${JSON.stringify(item.title)}`,
  );
  await evaluate(
    `Promise.all([...document.querySelectorAll('.pictures img')].map(image=>image.decode()))`,
  );
  await check(
    `document.querySelectorAll('.pictures img').length===1&&document.querySelector('.pictures img').naturalWidth===1024&&document.querySelector('.pictures img').naturalHeight===640&&document.querySelector('.pictures img').getAttribute('src').endsWith(${JSON.stringify(item.images[0].file)})&&document.querySelector('.pictures img').alt===${JSON.stringify(item.images[0].alt)}`,
    'Reviewed illustration loads for ' + item.title,
  );
  await check(
    `document.querySelector('.task-brief .passage').textContent.trim()===${JSON.stringify(item.prompt)}&&document.querySelector('.task-brief .passage').lang==='nl'`,
    'The A1 task keeps its short Dutch prompt: ' + item.title,
  );
  await check(
    `!document.querySelector('.exercise-heading .session-clock')&&!document.querySelector('.clock-button')`,
    'A1 ' + item.part + ' practice has no header timer',
  );
  await check(
    `!document.querySelector('.task-brief .requirements li')`,
    'A1 ' + item.part + ' leaves the picture facts for the learner until review',
  );
  const before = await evaluate(`document.querySelector('#open-answer')?.value??null`);
  await check(
    `!!document.querySelector('.sentence-starters')&&!document.querySelector('.sentence-starters').open`,
    'Sentence starters are optional and initially closed',
  );
  await click('.sentence-starters summary');
  await check(
    `document.querySelector('.sentence-starters').open&&JSON.stringify([...document.querySelectorAll('.sentence-starters li')].map(li=>li.textContent))===${JSON.stringify(JSON.stringify(starters[item.id]))}&&(document.querySelector('#open-answer')?.value??null)===${JSON.stringify(before)}`,
    'Opening the approved starters leaves the answer unchanged',
  );
  await click('.sentence-starters summary');
}

async function narrowViews(part) {
  for (const width of [390, 320]) {
    await viewport(width, 844);
    await check(
      `document.documentElement.scrollWidth<=innerWidth&&document.querySelectorAll('.answer-workspace textarea').length===1`,
      `A1 ${part} picture and answer controls fit at ${width}px`,
    );
    await shot(`${part}-${width}`);
  }
  await viewport(1440);
}

async function promptAudioRecovery(item, draft) {
  assert.ok(item.promptAudio, 'A1 speaking instruction must have reviewed narration');
  await evaluate(
    `window.a1PromptAudio=document.querySelector('.task-brief .passage audio');window.a1PromptPlay=window.a1PromptAudio.play;window.a1PromptAttempts=0;window.a1PromptAudio.play=()=>{window.a1PromptAttempts++;return Promise.reject(new DOMException('Synthetic playback failure','NotSupportedError'));};true;`,
  );
  await click('.task-brief .passage .play-button-small');
  await wait('window.a1PromptAttempts===1');
  await check(
    `${draftMatches(item, draft)}&&window.a1PromptAudio.paused&&!document.querySelector('.task-brief .passage .play-button-small').disabled&&document.querySelector('.task-brief .passage .play-button-small').getAttribute('aria-label')==='Read the instruction aloud'`,
    'Failed instruction playback preserves the transcript and leaves a usable retry',
  );
  await evaluate('window.a1PromptAudio.play=window.a1PromptPlay;true;');
  await click('.task-brief .passage .play-button-small');
  await wait('window.a1PromptAudio.currentTime>0&&!window.a1PromptAudio.paused');
  await check(
    `${draftMatches(item, draft)}&&document.querySelector('.task-brief .passage .play-button-small').getAttribute('aria-label')==='Pause reading aloud'`,
    'Retry plays the reviewed instruction recording without changing the transcript',
  );
  await click('.task-brief .passage .play-button-small');
  await wait('window.a1PromptAudio.paused');
}

async function selfReview(item, draft, edit = false) {
  await click('.answer-workspace .actions .secondary');
  await wait(`document.querySelector('.evaluation')`);
  await check(
    `${draftMatches(item, draft)}&&JSON.stringify([...document.querySelectorAll('.evaluation .criterion span')].map(span=>span.textContent))===${JSON.stringify(JSON.stringify(item.criteria.map((criterion) => criterion[1])))}`,
    'Self-review shows the three A1 criteria and retains the draft',
  );
  await check(
    `document.querySelectorAll('.task-brief .requirements li').length===3`,
    'A1 criteria become visible during review',
  );
  if (edit) {
    await click('[data-action="edit-answer"]');
    await check(
      `!document.querySelector('.evaluation')&&${draftMatches(item, draft)}&&document.querySelectorAll('.answer-workspace textarea').length===1`,
      'Returning from self-review keeps the same editable answer',
    );
    await click('.answer-workspace .actions .secondary');
    await wait(`document.querySelector('.evaluation')`);
  }
  for (let i = 1; i <= 3; i++) await click(`.evaluation .criterion:nth-child(${i}) input`);
  await click('[data-action="finish-review"]');
}

let preload;
try {
  await fs.mkdir('tmp/a1-open-preview', { recursive: true });
  preload = await send('script.addPreloadScript', {
    functionDeclaration: syntheticServices.toString(),
    contexts: [context],
  });
  await viewport(1440);
  for (const { part, set, items } of journeys) {
    await navigate('/en/a1/' + part);
    await click(`[data-set="${set.id}"]`);
    for (let index = 0; index < items.length; index++) {
      const item = items[index],
        draft = item.model.replace('. ', '.\n');
      await inspectTask(item);
      if (part === 'speaking') {
        await check(
          `document.querySelectorAll('.answer-workspace textarea').length===0&&document.querySelectorAll('.type-toggle').length===1`,
          'A fresh speaking task starts with one optional transcript toggle',
        );
        await click('.type-toggle');
        await check(
          `document.querySelectorAll('.answer-workspace textarea').length===1&&document.querySelector('label[for="open-answer"]').textContent==='Your transcript'`,
          'Typing uses one editable speaking transcript',
        );
      }
      await answer(item, draft);
      if (index === 0) {
        if (part === 'speaking') {
          await click('.type-toggle');
          await check(`!document.querySelector('#open-answer')`, 'Transcript can be hidden');
          await click('.type-toggle');
          await check(draftMatches(item, draft), 'Showing the transcript restores its text');
        }
        await navigate('/en/sets/' + set.id);
        await wait(`document.querySelector('#open-answer')`);
        await check(
          `${draftMatches(item, draft)}&&document.querySelectorAll('.answer-workspace textarea').length===1&&JSON.parse(localStorage.getItem('oefenschrift.study.v2')).active.index===0`,
          'Reload restores the A1 ' + part + ' draft and set position',
        );
        if (part === 'speaking') await promptAudioRecovery(item, draft);
        await shot(part + '-desktop');
        await narrowViews(part);
        if (part === 'writing') {
          await click('[data-action="assess"]');
          await wait(`document.querySelector('.feedback-status [role="alert"]')`);
          await check(
            `${draftMatches(item, draft)}&&window.a1OpenCalls.feedback===1&&!document.querySelector('[data-action="assess"]').disabled&&JSON.parse(localStorage.getItem('oefenschrift.study.v2')).active.index===0`,
            'Feedback failure retains the writing draft and offers retry in the same task',
          );
          await evaluate('window.a1OpenFeedbackOff=true;true;');
          await click('[data-action="assess"]');
          await wait(
            `!document.querySelector('[data-action="assess"]')&&document.querySelector('.answer-workspace .actions .secondary')`,
          );
          await check(
            `${draftMatches(item, draft)}&&window.a1OpenCalls.feedback===2&&window.a1OpenCalls.transcribe===0`,
            'A synthetic service refusal offers self-review with the writing draft intact',
          );
        } else {
          await evaluate(
            `window.a1OpenFeedbackOff=true;document.dispatchEvent(new Event('visibilitychange'));true;`,
          );
          await wait(`!document.querySelector('[data-action="assess"]')`);
        }
      }
      await selfReview(item, draft, index === 0);
    }
    await wait(`document.querySelector('.result-total')`);
    await check(
      String.raw`document.querySelector('.result-total strong').textContent.replace(/\s/g,'')==='3/3'`,
      'All three A1 ' + part + ' exercises complete through self-review',
    );
    await navigate('/en/sets/' + set.id);
    await check(
      `!!document.querySelector('.result-total')`,
      'A1 ' + part + ' result survives reload',
    );
  }
  console.log('A1 open Firefox journeys passed; screenshots in tmp/a1-open-preview/.');
} catch (error) {
  await shot('failure').catch(() => {});
  throw error;
} finally {
  if (preload) await send('script.removePreloadScript', { script: preload.script });
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
