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
const { userContext } = await send('browser.createUserContext');
const { context } = await send('browsingContext.create', { type: 'tab', userContext });
async function evaluate(expression) {
  const result = await send('script.evaluate', {
    expression,
    target: { context },
    awaitPromise: true,
  });
  if (result.type === 'exception') throw Error(JSON.stringify(result));
  return result.result?.value;
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('Missing UI: '+${JSON.stringify(expression)})):setTimeout(poll,50);poll();})`,
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
  await wait(`document.querySelector(${JSON.stringify(selector)})`);
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
  await evaluate('new Promise(r=>setTimeout(r,240))');
}
async function shot(name, selector) {
  await evaluate(
    selector
      ? `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`
      : 'window.scrollTo(0,0)',
  );
  const result = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile(`tmp/a1-listening-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const set = sets.find((entry) => entry.id === 'a1-listening-02');
if (!set || set.ids.length !== 3) throw Error('Expected three illustrated A1 conversations');
const questions = set.ids.flatMap((id) => {
  const item = bank.find((entry) => entry.id === id);
  return item.questions.map((q) => ({ item, q }));
});
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  console.log('  ✓ ' + label);
}
try {
  await fs.mkdir('tmp/a1-listening-preview', { recursive: true });
  await viewport(1440);
  await navigate('/en/a1/listening');
  await check(
    `!document.body.innerText.includes('Short conversations for beginners')&&!document.body.innerText.includes('intended practice level')`,
    'A1 listening catalogue omits the extra beginner subtitle',
  );
  await click(`[data-set="${set.id}"]`);
  await wait(
    `document.querySelector('.question legend')?.textContent.includes(${JSON.stringify(questions[0].q.prompt)})`,
  );
  await evaluate(
    `Promise.all([...document.querySelectorAll('.pictures img')].map(im=>im.decode()))`,
  );
  await wait(`document.querySelector('.audio-player audio')?.readyState>=1`);
  await check(
    `!document.querySelector('.reaction-error')`,
    'A1 listening ratings load without an error',
  );
  await check(
    `document.querySelectorAll('.pictures img').length===1 && document.querySelector('.pictures img').naturalWidth>=816 && !!document.querySelector('.pictures img').alt`,
    'A1 conversation displays its reviewed scene illustration',
  );
  await check(
    `document.querySelector('.audio-player audio').duration>10 && document.querySelector('.waveform-bars i')`,
    'A1 audio has a duration and a waveform',
  );
  await shot('listening-desktop');
  await check(`!document.querySelector('.session-clock')`, 'A1 listening practice hides the timer');
  await click(`.question input[value="${questions[0].q.answer}"]`);
  await evaluate(
    `window.a1Audio=document.querySelector('.audio-player audio');window.a1OriginalPlay=window.a1Audio.play;window.a1Audio.play=()=>Promise.reject(Error('Synthetic playback failure'));true`,
  );
  await click('.audio-player .play-button');
  await wait(`document.querySelector('.audio-player [role="alert"]')`);
  await check(
    `!!document.querySelector('.question input:checked')`,
    'Audio failure preserves the selected answer',
  );
  await evaluate(`window.a1Audio.play=window.a1OriginalPlay;true`);
  await click('.audio-player .play-button');
  await wait(
    `document.querySelector('.audio-player audio').currentTime>0 && !document.querySelector('.audio-player audio').paused`,
  );
  await check(
    `!document.querySelector('.audio-player [role="alert"]')`,
    'Retry plays the real audio and clears the failure',
  );
  await click('#audio-speed [data-choice="0.75"]');
  await check(
    `document.querySelector('.audio-player audio').playbackRate===0.75`,
    'A1 listening supports slower playback',
  );
  await click('.audio-player .play-button');
  await check(`document.querySelector('.audio-player audio').paused`, 'A1 audio pauses');
  await check(
    `!!document.querySelector('.question legend audio')`,
    'Each A1 question has its own read-aloud recording',
  );
  await viewport(390, 844);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'Illustrated A1 listening fits at390px',
  );
  await shot('listening-mobile');
  await viewport(320, 844);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'Illustration and audio controls fit at320px',
  );
  await shot('listening-320');
  await navigate('/en/sets/' + set.id);
  await check(
    `document.querySelector('.question input:checked')?.value===${JSON.stringify(questions[0].q.answer)}`,
    'Reload preserves the A1 listening answer',
  );
  for (let i = 0; i < questions.length; i++) {
    const { item, q } = questions[i];
    await wait(
      `document.querySelector('.question legend')?.textContent.includes(${JSON.stringify(q.prompt)})`,
    );
    if (i % 2 === 0) {
      await evaluate(
        `Promise.all([...document.querySelectorAll('.pictures img')].map(im=>im.decode()))`,
      );
      await check(
        `document.querySelector('.pictures img').getAttribute('src').endsWith(${JSON.stringify(item.images[0].file)})`,
        'Correct illustration for ' + item.title,
      );
      await wait(`document.querySelector('.audio-player audio')?.readyState>=1`);
    }
    if (i) await click(`.question input[value="${q.answer}"]`);
    await click('.question .primary');
    await wait(`document.querySelector('.answer-feedback.correct')`);
    if (i % 2 === 1)
      await check(
        `!!document.querySelector('.transcript mark')`,
        'Completed conversation highlights exact transcript evidence',
      );
    else
      await check(
        `!document.querySelector('.transcript')`,
        'Transcript stays hidden while a conversation question is unanswered',
      );
    await click('.question .primary');
  }
  await wait(`document.querySelector('.result-total')`);
  await check(
    String.raw`document.querySelector('.result-total strong').textContent.replace(/\s/g,'')==='6/6'`,
    'All six listening questions score correctly',
  );
  await shot('listening-result');
  await navigate('/en/sets/' + set.id);
  await check(`!!document.querySelector('.result-total')`, 'A1 listening result survives reload');
  console.log('A1 listening Firefox journey passed.');
} finally {
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
