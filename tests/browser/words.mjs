import fs from 'node:fs/promises';

// Word lists: the sidebar leads to the index, a list pages through its hundreds without a
// new data request, search finds Dutch, inflected and English words, the self-check hides
// English until asked, marked words make up My list, search recovers from a failed load,
// and a phone-width list has no sideways scroll.
const origin = process.env.TEST_ORIGIN;
const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let next = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  message.type === 'error'
    ? request.reject(Error(JSON.stringify(message)))
    : request.resolve(message.result);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++next;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
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
async function shot(name) {
  await evaluate('document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,250)))');
  const result = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile(`tmp/words-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
async function wait(expression) {
  try {
    await evaluate(
      `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('timeout')):setTimeout(poll,40);poll();})`,
    );
  } catch (error) {
    await shot('failure').catch(() => {});
    const state = await evaluate(
      `JSON.stringify({url:location.href,h1:document.querySelector('main h1')?.textContent,status:document.querySelector('.words-status')?.textContent})`,
    );
    throw Error(`Not reached: ${expression}\nState: ${state}`, { cause: error });
  }
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await wait(`document.querySelector('.app-shell[data-hydrated]')`);
}
async function click(selector) {
  await wait(
    `document.querySelector(${JSON.stringify(selector)})&&!document.querySelector(${JSON.stringify(selector)}).disabled`,
  );
  const point = JSON.parse(
    await evaluate(
      `JSON.stringify((()=>{const el=document.querySelector(${JSON.stringify(selector)});el.scrollIntoView({block:'center'});const r=el.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})())`,
    ),
  );
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'pointer',
        id: 'words-mouse',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', ...point, origin: 'viewport' },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ],
  });
}
// Marks an element found by a script so click() can address it by selector.
async function target(expression) {
  await wait(expression);
  await evaluate(
    `document.querySelector('[data-target]')?.removeAttribute('data-target');(${expression}).dataset.target='1';true`,
  );
  return '[data-target="1"]';
}
async function type(selector, text) {
  await click(selector);
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).select();true`);
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'words-keyboard',
        actions: [...text].flatMap((value) => [
          { type: 'keyDown', value },
          { type: 'keyUp', value },
        ]),
      },
    ],
  });
}
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  console.log('  ✓ ' + label);
}
const rows = `[...document.querySelectorAll('.word-row')]`;
const saved = `JSON.parse(localStorage.getItem('oefenschrift.words.v1')||'null')`;

try {
  await fs.mkdir('tmp/words-preview', { recursive: true });
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
  await navigate('/a2/reading');
  await click('.utility-nav [data-page=words]');
  await wait(`location.pathname==='/words'&&document.querySelector('.words-groups')`);
  await check(
    `document.querySelector('.utility-nav [data-page=words]').getAttribute('aria-current')==='page'&&document.querySelectorAll('.words-groups .words-group').length>=20`,
    'The sidebar opens the index of word lists',
  );
  await shot('index');

  await click('.words-top .words-group');
  await wait(
    `location.pathname==='/words/top'&&document.querySelectorAll('.word-row').length===100`,
  );
  await check(
    `${rows}[0].querySelector('.word-rank').textContent==='1'&&${rows}[99].querySelector('.word-rank').textContent==='100'&&document.querySelectorAll('.words-pages')[0].children.length===10&&document.querySelector('.toolbar .back')?.getAttribute('href')==='/words'`,
    'The ranked list shows its first hundred with ten parts and a way back',
  );
  await evaluate(`performance.clearResourceTimings();true`);
  await click(
    await target(
      `[...document.querySelectorAll('.words-pages a')].find(a=>a.textContent==='201–300')`,
    ),
  );
  await wait(
    `location.search==='?page=3'&&document.querySelector('.word-rank')?.textContent==='201'`,
  );
  await check(
    `performance.getEntriesByType('resource').filter(e=>/\\.data(\\?|$)/.test(e.name)).every(e=>e.name.includes('_routes=')&&!e.name.includes('study'))&&document.querySelector('.words-pages a[aria-current=page]').textContent==='201–300'`,
    'A new hundred comes from the list already loaded',
  );

  await type('.words-controls input[type=search]', 'huis');
  await wait(`${rows}.length>0&&${rows}.every(r=>r.textContent.includes('huis'))`);
  await check(
    `!document.querySelector('.word-rank')&&!document.querySelector('.words-pages')`,
    'Searching a list shows every match at once',
  );

  await navigate('/words/top');
  const first = await evaluate(`${rows}[3].dataset.word`);
  await click(`.word-row[data-word="${first}"] .word-mark`);
  await wait(
    `document.querySelector('.word-row[data-word="${first}"] .word-mark[aria-pressed=true]')`,
  );
  await check(
    `${saved}.marked.includes(${JSON.stringify(first)})`,
    'Marking a word keeps it in this browser',
  );
  await click('.words-toggles .toggle');
  await wait(`document.querySelectorAll('.word-reveal').length===100`);
  await check(
    `!document.querySelector('.word-example-en')&&!document.querySelector('.word-note')&&${saved}.hideEnglish===true`,
    'Hide English hides every translation and note',
  );
  await click('.word-row:nth-child(2) .word-reveal');
  await wait(`document.querySelectorAll('.word-reveal').length===99`);
  await check(
    `document.querySelector('.word-row:nth-child(2) .word-example-en')&&!document.querySelector('.word-row:nth-child(1) .word-example-en')`,
    'One row reveals its English on request',
  );
  await click('.words-toggles .toggle');
  await wait(`!document.querySelector('.word-reveal')`);

  // My list holds the marked word and keeps it in place when it is unmarked.
  await navigate('/words/my-list');
  await wait(`${rows}.length===1`);
  await check(
    `${rows}[0].dataset.word===${JSON.stringify(first)}`,
    'My list shows the marked word',
  );
  await click('.word-mark');
  await wait(`document.querySelector('.word-mark[aria-pressed=false]')`);
  await check(
    `${rows}.length===1&&${saved}.marked.length===0`,
    'Unmarking keeps the row until the list is opened again',
  );

  // Search across lists, with the dictionary failing once and loading on retry.
  await navigate('/words');
  await evaluate(
    `window.__fetch=window.fetch;window.fetch=(url,...rest)=>String(url).includes('/api/words')?Promise.reject(new TypeError('offline')):window.__fetch(url,...rest);true`,
  );
  await type('.words-search input', 'begon');
  await wait(`document.querySelector('.words-status button')`);
  await check(
    `document.querySelector('.words-status').textContent.startsWith('Zoeken lukt nu niet')`,
    'A failed search load says so and offers a retry',
  );
  await evaluate(`window.fetch=window.__fetch;true`);
  await click('.words-status button');
  await wait(`document.querySelector('.word-row[data-word=beginnen]')`);
  await check(`true`, 'The retry loads the words and a past form finds its verb');
  await type('.words-search input', 'to call');
  await wait(`document.querySelector('.word-row[data-word=bellen]')`);
  await check(`true`, 'English finds the Dutch word');

  await check(`fetch('/words/does-not-exist').then(r=>r.status===404)`, 'An unknown list is a 404');
  await navigate('/en/words/irregular-verbs');
  await check(
    `document.querySelector('main h1').textContent==='Onregelmatige werkwoorden'&&document.querySelector('.toolbar .back').textContent.includes('Back to')&&document.querySelector('.word-columns').textContent.includes('Past participle')`,
    'The English interface keeps the Dutch material and translates the page around it',
  );

  for (const width of [360, 390]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 800 } });
    for (const path of ['/words', '/words/top', '/words/irregular-verbs', '/words/nouns']) {
      await navigate(path);
      await check(
        `document.documentElement.scrollWidth<=innerWidth`,
        `${path} fits ${width}px without sideways scrolling`,
      );
      if (width === 390) await shot(`phone-${path.split('/').pop()}`);
    }
  }
  console.log('Word lists Firefox journey passed; screenshots in tmp/words-preview/.');
} finally {
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
