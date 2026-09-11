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
const { context } = await send('browsingContext.create', { type: 'tab' });
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
  await fs.writeFile(`tmp/design-implementation/${name}.png`, Buffer.from(result.data, 'base64'));
}
const checks = [];
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  checks.push(label);
  console.log('  ✓ ' + label);
}
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
async function currentQuestion() {
  const prompt = await evaluate(`document.querySelector('.home-sample legend').textContent.trim()`);
  const item = bank.find((item) => item.questions?.some((q) => q.prompt === prompt));
  if (!item) throw Error('Sample is not from the published catalogue: ' + prompt);
  return { item, q: item.questions.find((q) => q.prompt === prompt) };
}
async function answer(correct = true) {
  const { q } = await currentQuestion();
  const value = correct ? q.answer : Object.keys(q.options).find((value) => value !== q.answer);
  await click(`.home-sample input[value="${value}"]`);
  await click('.home-sample .question .primary');
  await wait(`document.querySelector('.home-sample .answer-feedback')`);
}
const history = `JSON.stringify((()=>{const s=JSON.parse(localStorage.getItem('oefenschrift.study.v2'));return {records:s.records,checks:s.checks,active:s.active,sessions:s.sessions}})())`;
try {
  await fs.mkdir('tmp/design-implementation', { recursive: true });
  await viewport(1440);
  await navigate('/');
  // This is the test runner's isolated profile, never the user's browser.
  await evaluate(
    `localStorage.setItem('oefenschrift.study.v2',JSON.stringify({version:2,settings:{lang:'en',level:'A2',theme:'light',clock:false},records:{},drafts:{},reviews:{},active:null}));document.cookie='oefenschrift_preferences='+encodeURIComponent(JSON.stringify({lang:'en',level:'A2',theme:'light',clock:false}))+'; Path=/';true;`,
  );
  await navigate('/en');
  await wait(`document.querySelector('.home-sample')`);
  const before = await evaluate(history);
  await check(
    `document.querySelector('.sample-heading').textContent.includes('Question 1 of 3')`,
    'First visit opens a three-question sample',
  );
  await check(
    `getComputedStyle(document.querySelector('.home-sample')).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(document.querySelector('.home-sample .exercise-columns')).backgroundColor==='rgba(0, 0, 0, 0)'`,
    'Sample uses the normal page canvas without a yellow or cream outer panel',
  );
  await check(
    `document.querySelector('.home-sample .primary').disabled`,
    'Answer must be selected before checking',
  );
  await evaluate(
    `document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'a',bubbles:true}));true;`,
  );
  await check(
    `!document.querySelector('.home-sample input:checked')`,
    'Home page does not capture global answer shortcuts',
  );
  await shot('mini-reading', '.home-sample');
  await viewport(320);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'Reading sample fits a 320px phone',
  );
  await viewport(1440);
  await answer(false);
  await check(
    `!!document.querySelector('.home-sample .answer-wrong')&&!!document.querySelector('.home-sample .answer-correct')`,
    'A wrong answer reveals the correction and source explanation',
  );
  await click('.home-sample .question .primary');
  await check(
    `document.querySelector('.sample-heading').textContent.includes('Question 2 of 3')&&document.activeElement===document.querySelector('.sample-heading h3')`,
    'Next moves to listening and focuses its heading',
  );
  await check(
    `!!document.querySelector('.home-sample .audio-player')&&!document.querySelector('.home-sample .transcript')`,
    'Listening has playable audio and hides the transcript before checking',
  );
  await evaluate(
    `(()=>{const audio=document.querySelector('.home-sample .audio-player audio');audio.play=()=>Promise.reject(new DOMException('Synthetic playback failure','NotSupportedError'));})()`,
  );
  await click('.home-sample .play-button');
  await check(
    `!!document.querySelector('.home-sample .audio-player [role="alert"]')`,
    'Playback failure offers a retry',
  );
  await evaluate(`delete document.querySelector('.home-sample .audio-player audio').play;true;`);
  await click('.home-sample .play-button');
  await wait(`document.querySelector('.home-sample .audio-player audio').currentTime>0`);
  await check(
    `!document.querySelector('.home-sample .audio-player [role="alert"]')`,
    'Retry plays the actual listening clip and clears the error',
  );
  await click('.home-sample .play-button');
  await shot('mini-listening', '.home-sample');
  await viewport(320);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'Listening sample fits a 320px phone',
  );
  await answer();
  await check(
    `!!document.querySelector('.home-sample .transcript')`,
    'Checking reveals the listening transcript',
  );
  await click('.home-sample .question .secondary');
  await check(
    `!!document.querySelector('.home-sample .answer-wrong')&&document.querySelector('.home-sample input:checked').disabled`,
    'Previous preserves the checked reading answer',
  );
  await click('.home-sample .question .primary');
  await viewport(1440);
  await click('#language-control [aria-label="Nederlands"]');
  await check(
    `document.querySelector('.sample-heading').textContent.includes('Vraag 2 van 3')&&!!document.querySelector('.home-sample .answer-feedback')`,
    'Changing language preserves the current question and feedback',
  );
  await click('#language-control [aria-label="English"]');
  await click('.home-sample .question .primary');
  await check(
    `document.querySelector('.sample-heading').textContent.includes('Question 3 of 3')`,
    'Third question covers KNM',
  );
  const knm = await currentQuestion();
  if (knm.item.taskType === 'feit') {
    await wait(
      `[...document.querySelectorAll('.home-sample .picture img')].every(img=>img.complete&&img.naturalWidth)`,
    );
    await check(
      `!!document.querySelector('.home-sample .picture img')&&!document.querySelector('.home-sample .fact-sheet')`,
      'KNM shows its picture while keeping the answer fact hidden',
    );
  }
  await shot('mini-knm', '.home-sample');
  await viewport(320);
  await check(`document.documentElement.scrollWidth<=innerWidth`, 'KNM sample fits a 320px phone');
  await viewport(1440);
  await answer();
  await click('.home-sample .question .primary');
  await check(
    `document.querySelector('.sample-score').textContent==='2 of 3 correct'&&document.querySelectorAll('.sample-scores li').length===3`,
    'Final result totals the answers and lists each subject',
  );
  await check(
    `${history}===${JSON.stringify(before)}`,
    'Completing the sample leaves saved history and the level check untouched',
  );
  await shot('mini-result', '.home-sample');
  await viewport(320);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'Result and actions fit a 320px phone',
  );
  await shot('mini-result-mobile', '.home-sample');
  await viewport(1440);
  await click('#theme-control [aria-label="Dark"]');
  await check(
    `document.documentElement.dataset.theme==='dark'&&getComputedStyle(document.querySelector('.home-sample')).backgroundColor==='rgba(0, 0, 0, 0)'`,
    'Dark mode keeps the result on the normal dark canvas',
  );
  await shot('mini-result-dark', '.home-sample');
  await click('.sample-results .secondary');
  await check(
    `!!document.querySelector('.home-sample .answer-wrong')&&document.querySelector('.sample-heading').textContent.includes('Question 1 of 3')`,
    'Result review returns to the saved first answer',
  );
  await click('.home-sample .question .primary');
  await click('.home-sample .question .primary');
  await click('.home-sample .question .primary');
  await check(
    `document.querySelector('.sample-results .primary').textContent.includes('Reading')`,
    'Result suggests practice for the missed subject',
  );
  await click('.sample-results .primary');
  await wait(
    `!!document.querySelector('.exercise-heading')&&!!document.querySelector('.question')`,
  );
  await check(
    `location.pathname.includes('/sets/')&&JSON.parse(localStorage.getItem('oefenschrift.study.v2')).active.mode==='practice'`,
    'Continue starts the real recommended practice set',
  );
  await navigate('/en');
  await click('#level-control [data-choice="B1"]');
  await wait(`document.querySelector('.home-sample')`);
  const b1 = await currentQuestion();
  if (b1.item.level !== 'B1') throw Error('B1 preference did not select B1 source');
  await answer();
  await click('.home-sample .question .primary');
  await click('#level-control [data-choice="A2"]');
  await check(
    `document.querySelector('.sample-heading').textContent.includes('Question 1 of 3')&&!document.querySelector('.home-sample input:checked')`,
    'Changing level resets the round to a question at the new level',
  );
  await fs.writeFile(
    'tmp/design-implementation/sample-verification.json',
    JSON.stringify({ checks }, null, 2),
  );
  console.log(`${checks.length} home sample checks passed.`);
} catch (error) {
  await shot('mini-failure');
  throw error;
} finally {
  await send('session.end');
  ws.close();
}
