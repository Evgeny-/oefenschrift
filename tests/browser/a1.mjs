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
  await fs.writeFile(`tmp/a1-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const set = sets.find((entry) => entry.id === 'a1-reading-02');
if (!set || set.ids.length !== 3) throw Error('Expected the new A1 set with three messages');
const questions = set.ids.flatMap((id) => {
  const item = bank.find((entry) => entry.id === id);
  return item.questions.map((q) => ({ item, q }));
});
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  console.log('  ✓ ' + label);
}
try {
  await fs.mkdir('tmp/a1-preview', { recursive: true });
  await viewport(1440);
  await navigate('/a1/reading');
  // Reset only the browser suite's disposable Firefox profile.
  await evaluate(
    `localStorage.clear();sessionStorage.clear();document.cookie='oefenschrift_preferences=;Max-Age=0;Path=/';true`,
  );
  await navigate('/a1/reading');
  await navigate('/');
  await check(
    `[...document.querySelectorAll('#level-control a[data-choice]')].map(el=>el.dataset.choice).join(',')==='A1,A2,B1'`,
    'Level switcher shows A1, A2 and B1',
  );
  await check(
    `!!document.querySelector('.home-hero [data-set^="a1-reading-"]') && !document.querySelector('[data-action="level-check"]')`,
    'A1 home offers its reading set without a level check',
  );
  await navigate('/a1/reading');
  await check(
    `!!document.querySelector('[data-set="${set.id}"]')`,
    'A1 catalogue contains the reviewed set',
  );
  await check(
    `!document.body.innerText.includes('Korte berichten voor beginners')&&!document.body.innerText.includes('beoogd oefenniveau')`,
    'A1 reading catalogue omits the extra beginner subtitle',
  );
  await click(`[data-set="${set.id}"]`);
  await wait(
    `document.querySelector('.question legend')?.textContent.includes(${JSON.stringify(questions[0].q.prompt)})`,
  );
  await evaluate(
    `Promise.all([...document.querySelectorAll('.pictures img')].map(im=>im.decode()))`,
  );
  await check(
    `document.querySelectorAll('.pictures img').length===1 && document.querySelector('.pictures img').naturalWidth===1024 && !!document.querySelector('.pictures img').alt`,
    'New A1 reading displays its reviewed illustration',
  );
  await shot('reading-desktop');
  await wait(`!document.querySelector('.reaction-button:disabled')`);
  await check(
    `!document.querySelector('.reaction-error')`,
    'A1 reading ratings load without an error',
  );
  await check(`!document.querySelector('.session-clock')`, 'A1 reading practice hides the timer');
  // A failed local report must retain the learner's checked answer.
  await click(`.question input[value="${questions[0].q.answer}"]`);
  await click('.question .primary');
  await wait(`document.querySelector('.answer-feedback.correct')`);
  await check(
    `!!document.querySelector('.passage mark')`,
    'Checking an A1 answer highlights its exact source evidence',
  );
  await evaluate(
    `window.a1OriginalFetch=window.fetch;window.fetch=(input,options)=>String(input).includes('/api/reports')?Promise.reject(Error('Synthetic offline report')):window.a1OriginalFetch(input,options);true`,
  );
  await click('.reaction-button[data-reaction="dislike"]');
  await wait(`!!document.querySelector('.report-trigger')`);
  await click('.report-trigger');
  await click('.issue-report .primary');
  await wait(`document.querySelector('.report-dialog [role="alert"]')`);
  await click('.dialog-close');
  await evaluate(`window.fetch=window.a1OriginalFetch;true`);
  await check(
    `!!document.querySelector('.answer-feedback.correct') && !!document.querySelector('.question input:checked')`,
    'Report failure leaves the A1 answer intact',
  );
  await navigate('/sets/' + set.id);
  await check(
    `!!document.querySelector('.answer-feedback.correct')`,
    'Reload restores the checked A1 answer',
  );
  await click('.question .primary');
  await wait(
    `document.querySelector('.question legend')?.textContent.includes(${JSON.stringify(questions[1].q.prompt)})`,
  );
  await navigate('/en/sets/' + set.id);
  await check(
    `document.documentElement.lang==='en' && document.querySelector('.question legend').textContent.includes(${JSON.stringify(questions[1].q.prompt)})`,
    'English interface preserves the A1 position and Dutch question',
  );
  await viewport(390, 844);
  await check(`document.documentElement.scrollWidth<=innerWidth`, 'A1 question fits at 390px');
  await shot('reading-mobile');
  await viewport(320, 844);
  await check(
    `document.documentElement.scrollWidth<=innerWidth`,
    'A1 question and three level choices fit at 320px',
  );
  await shot('reading-320');
  for (let i = 1; i < questions.length; i++) {
    const { q } = questions[i];
    await wait(
      `document.querySelector('.question legend')?.textContent.includes(${JSON.stringify(q.prompt)})`,
    );
    await click(`.question input[value="${q.answer}"]`);
    await click('.question .primary');
    await wait(`document.querySelector('.answer-feedback.correct')`);
    await click('.question .primary');
  }
  await wait(`document.querySelector('.result-total')`);
  await check(
    String.raw`document.querySelector('.result-total strong').textContent.replace(/\s/g,'')==='6/6'`,
    'All six A1 questions score correctly',
  );
  await navigate('/en/sets/' + set.id);
  await check(`!!document.querySelector('.result-total')`, 'Completed A1 set survives reload');
  await shot('result-mobile');
  for (const path of ['/en/a1/practice-test', '/en/a1/level-check']) {
    await navigate(path);
    await check(
      `!document.querySelector('.question') && !document.querySelector('[data-action="start-check"]') && !document.querySelector('[data-action="start-mock"]')`,
      'Unavailable A1 journey stays unavailable: ' + path,
    );
  }
  await navigate('/en/a1/reading');
  await check(
    `!!document.querySelector('[data-set="${set.id}"]')`,
    'Learner can return from an unavailable subject to A1 reading',
  );
  await navigate('/en/a2/listening');
  const listeningSet = sets.find((entry) => entry.level === 'A2' && entry.part === 'listening');
  await click(`[data-set="${listeningSet.id}"]`);
  await wait(`document.querySelector('.instruction')`);
  await check(
    `document.querySelector('.instruction').textContent==='Lees eerst de vraag. Luister daarna naar het fragment.'`,
    'Listening instruction names the audio fragment',
  );
  console.log('A1 Firefox journey passed; screenshots in tmp/a1-preview/.');
} finally {
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
