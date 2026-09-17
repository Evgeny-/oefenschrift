import fs from 'node:fs/promises';
// A learner reported a reading set that showed one exercise's text under the next exercise's
// situation and questions. The cause was an in-page translator (Google Translate) replacing the
// passage's text nodes with its own <font> wrappers: a later in-place update over those detached
// nodes left the previous text on screen, or threw. The task column is now keyed per exercise so
// each transition remounts it. This test recreates the translator and proves the passage always
// matches the exercise it belongs to.
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:8767';
const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT || 9226}/session`);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0;
const pending = new Map();
ws.onmessage = (event) => {
  const m = JSON.parse(event.data);
  if (pending.has(m.id)) {
    const p = pending.get(m.id);
    pending.delete(m.id);
    m.type === 'error' ? p.reject(new Error(JSON.stringify(m))) : p.resolve(m.result);
  }
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
await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
async function evaluate(expression) {
  const r = await send('script.evaluate', { expression, target: { context }, awaitPromise: true });
  if (r.type === 'exception') throw Error(JSON.stringify(r));
  return r.result?.value;
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await evaluate('new Promise(r=>setTimeout(r,350))');
}
async function click(selector) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+5000;const poll=()=>document.querySelector(${JSON.stringify(selector)})?resolve(true):Date.now()>end?reject(new Error("Missing control: "+${JSON.stringify(selector)})):setTimeout(poll,40);poll();})`,
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
        id: 'mouse',
        parameters: { pointerType: 'mouse' },
        actions: [
          { type: 'pointerMove', x: point.x, y: point.y, origin: 'viewport' },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      },
    ],
  });
  await evaluate('new Promise(r=>setTimeout(r,150))');
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+7000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(new Error('Expected UI did not appear: '+${JSON.stringify(expression)})):setTimeout(poll,40);poll();})`,
  );
}
const checks = [];
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  checks.push(label);
}

// A reading set whose first exercise has several questions and is followed by a different text,
// so advancing crosses from one passage to another.
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const item = (idx) => bank.find((x) => x.id === idx);
const set = sets.find(
  (s) =>
    s.level === 'A2' &&
    s.part === 'reading' &&
    (item(s.ids[0])?.questions?.length || 0) >= 2 &&
    s.ids.length >= 2 &&
    item(s.ids[1])?.text &&
    item(s.ids[1]).text !== item(s.ids[0]).text,
);
if (!set) throw Error('No suitable multi-text A2 reading set for the translation test.');
const first = item(set.ids[0]),
  second = item(set.ids[1]);
const firstMark = JSON.stringify(first.text.slice(0, 24)),
  secondMark = JSON.stringify(second.text.slice(0, 24));

// The translator swaps every text node under the task column for <font><font>text</font></font>,
// exactly as Google Translate does, without changing what the words say.
const translateTaskColumn = `(()=>{
  const section=document.querySelector('.exercise-columns > section');
  const walker=document.createTreeWalker(section,NodeFilter.SHOW_TEXT);
  const nodes=[];let n;while((n=walker.nextNode()))if(n.nodeValue.trim())nodes.push(n);
  for(const t of nodes){const o=document.createElement('font');const i=document.createElement('font');i.textContent=t.nodeValue;o.appendChild(i);t.parentNode.replaceChild(o,t);}
  return nodes.length;
})()`;

try {
  await navigate('/en/sets/' + set.id);
  await wait(`document.querySelector('.passage')`);
  await check(
    `document.querySelector('.passage').textContent.startsWith(${firstMark})`,
    'The set opens on the first exercise passage',
  );

  // Answer and check every question of the first exercise, translating the passage before the
  // last transition that carries the learner into the second exercise.
  const total = first.questions.length;
  for (let i = 0; i < total; i++) {
    await wait(`document.querySelector('.answer-option input')`);
    await click('.answer-option:has(input)');
    await click('.question .primary'); // check
    if (i === total - 1) await evaluate(translateTaskColumn);
    await click('.question .primary'); // next
    await evaluate('new Promise(r=>setTimeout(r,200))');
  }

  await wait(`document.querySelector('.passage')`);
  await check(
    `!/went wrong|reload|something went/i.test(document.querySelector('main h1')?.textContent||'')`,
    'Advancing after translation does not crash into the error boundary',
  );
  await check(
    `document.querySelector('main h1').textContent===${JSON.stringify(second.title)}`,
    'The heading is the second exercise',
  );
  await check(
    `document.querySelector('.passage').textContent.includes(${secondMark})&&!document.querySelector('.passage').textContent.includes(${firstMark})`,
    'The passage is the second exercise text, with no trace of the first',
  );
  if (second.situation)
    await check(
      `document.querySelector('.situation')?.textContent.includes(${JSON.stringify(second.situation)})`,
      'The situation belongs to the same second exercise as the passage',
    );

  // Highlighting evidence is an in-place change too: translate the new passage, then check an
  // answer. The keyed passage remounts, so the mark appears instead of throwing.
  await wait(`document.querySelector('.answer-option input')`);
  await evaluate(translateTaskColumn);
  await click('.answer-option:has(input)');
  await click('.question .primary'); // check -> reveals evidence highlight
  await evaluate('new Promise(r=>setTimeout(r,200))');
  await check(
    `!/went wrong|reload|something went/i.test(document.querySelector('main h1')?.textContent||'')`,
    'Checking an answer after translation does not crash',
  );
  await check(
    `document.querySelector('.passage').textContent.includes(${secondMark})`,
    'The passage stays correct after the evidence highlight is shown',
  );

  console.log('translation checks passed:\n - ' + checks.join('\n - '));
} finally {
  await send('session.end');
  ws.close();
}
