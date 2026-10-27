import fs from 'node:fs/promises';

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
// Earlier journeys intentionally exhaust browser allowances. A separate cookie/storage
// context gives this persistence test its own visitor and page pass on the same server.
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
  try {
    await evaluate(
      `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('Missing reaction UI: '+${JSON.stringify(expression)})):setTimeout(poll,40);poll();})`,
    );
  } catch (error) {
    const state = await evaluate(
      `JSON.stringify({url:location.href,visitor:localStorage.getItem('oefenschrift.visitor'),controls:[...document.querySelectorAll('.reaction-button')].map(button=>({reaction:button.dataset.reaction,pressed:button.getAttribute('aria-pressed'),disabled:button.disabled})),report:!!document.querySelector('.report-trigger'),dialog:!!document.querySelector('.report-dialog'),error:document.querySelector('.reaction-error')?.textContent,network:window.reactionNetwork})`,
    );
    const screenshot = await send('browsingContext.captureScreenshot', { context });
    await fs.writeFile('tmp/reactions-preview/failure.png', Buffer.from(screenshot.data, 'base64'));
    throw Error(`Missing reaction UI: ${expression}\nState: ${state}`, { cause: error });
  }
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await wait(`document.querySelector('.app-shell[data-hydrated]')`);
}
async function key(value) {
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'reaction-keyboard',
        actions: [
          { type: 'keyDown', value },
          { type: 'keyUp', value },
        ],
      },
    ],
  });
}
async function click(selector) {
  await wait(
    `document.querySelector(${JSON.stringify(selector)})&&!document.querySelector(${JSON.stringify(selector)}).disabled`,
  );
  const point = JSON.parse(
    await evaluate(
      `JSON.stringify((()=>{const button=document.querySelector(${JSON.stringify(selector)});button.scrollIntoView({block:'center'});const r=button.getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)};})())`,
    ),
  );
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'pointer',
        id: 'reaction-mouse',
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
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  console.log('  ✓ ' + label);
}
async function shot(name) {
  await evaluate(
    'window.scrollTo(0,0);document.fonts.ready.then(()=>new Promise(r=>setTimeout(r,250)))',
  );
  const result = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile(`tmp/reactions-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const item = bank.find((entry) => entry.part === 'speaking' && entry.level === 'A2');
const path = '/en/exercise/' + encodeURIComponent(item.id);
const like = '.reaction-button[data-reaction="like"]';
const dislike = '.reaction-button[data-reaction="dislike"]';
const saved = (value) =>
  `(async()=>{const response=await fetch('/api/reactions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor:localStorage.getItem('oefenschrift.visitor'),operation:'get',item_id:${JSON.stringify(item.id)},item_version:${JSON.stringify(item.revision)},question_id:null})});return response.ok&&(await response.json()).value===${JSON.stringify(value)};})()`;

try {
  await fs.mkdir('tmp/reactions-preview', { recursive: true });
  await send('script.addPreloadScript', {
    functionDeclaration: `()=>{window.reactionNetwork=[];const original=window.fetch;window.fetch=async(...args)=>{const response=await original(...args);const[input,init]=args;if(new URL(typeof input==='string'?input:input.url,location.href).pathname.endsWith('/api/reactions')){const request=JSON.parse(init?.body||'{}');window.reactionNetwork.push({request,status:response.status,result:await response.clone().json().catch(()=>null)});}return response;};}`,
  });
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
  await navigate('/en');
  await evaluate(
    `localStorage.setItem('oefenschrift.visitor',crypto.randomUUID().replace(/-/g,''));true;`,
  );
  await navigate(path);
  await wait(`document.querySelectorAll('.reaction-button').length===2`);
  await check(
    `!document.querySelector('.report-trigger')&&!document.querySelector('.report-dialog')&&[...document.querySelectorAll('.reaction-button')].every(b=>b.getAttribute('aria-pressed')==='false')`,
    'An unrated exercise shows two named reaction buttons and no report prompt',
  );
  await evaluate(`document.querySelector(${JSON.stringify(like)}).focus();true;`);
  await key('\uE007');
  await wait(
    `document.querySelector(${JSON.stringify(like)}).getAttribute('aria-pressed')==='true'&&!document.querySelector(${JSON.stringify(like)}).disabled`,
  );
  await check(saved('like'), 'Keyboard Enter stores a like in SQLite');
  await click(like);
  await wait(
    `document.querySelector(${JSON.stringify(like)}).getAttribute('aria-pressed')==='false'&&!document.querySelector(${JSON.stringify(like)}).disabled`,
  );
  await check(saved(null), 'Selecting the same reaction again clears it');
  await click(dislike);
  await wait(
    `!!document.querySelector('.report-trigger')&&!document.querySelector(${JSON.stringify(dislike)}).disabled`,
  );
  await check(
    `!document.querySelector('.report-dialog')`,
    'Dislike reveals an optional report without opening the dialog',
  );
  await check(saved('dislike'), 'Dislike is stored without requiring a report');
  await click('.report-trigger');
  await wait(`!!document.querySelector('.report-dialog')`);
  await check(
    `document.querySelector('.report-dialog').contains(document.activeElement)&&document.querySelector('.report-privacy').textContent.includes('not included')`,
    'The optional dialog keeps focus and explains that answers and recordings stay out',
  );
  await key('\uE00C');
  await wait(`!document.querySelector('.report-dialog')`);
  await click(like);
  await wait(
    `!document.querySelector('.report-trigger')&&!document.querySelector(${JSON.stringify(like)}).disabled`,
  );
  await navigate(path);
  await wait(
    `document.querySelector(${JSON.stringify(like)}).getAttribute('aria-pressed')==='true'`,
  );
  await check(
    `!document.querySelector('.report-trigger')`,
    'Changing a dislike to a like survives a reload and hides the report',
  );
  await evaluate(
    `(()=>{window.reactionFetch=window.fetch;window.reactionBodies=[];window.fetch=(input,init)=>{if(new URL(typeof input==='string'?input:input.url,location.href).pathname.endsWith('/api/reactions')&&init?.method==='POST'){const body=JSON.parse(init.body);window.reactionBodies.push(body);if(body.operation==='set')return Promise.resolve(Response.json({error:'Synthetic rating failure'},{status:503}));}return window.reactionFetch(input,init);};return true;})()`,
  );
  await click(dislike);
  await wait(
    `!!document.querySelector('.reaction-error')&&!document.querySelector(${JSON.stringify(dislike)}).disabled`,
  );
  await check(
    `document.querySelector(${JSON.stringify(dislike)}).getAttribute('aria-pressed')==='true'&&!!document.querySelector('.report-trigger')`,
    'A failed vote keeps the selected dislike and its optional report available',
  );
  await check(
    `window.reactionBodies.every(body=>Object.keys(body).every(key=>['visitor','operation','item_id','item_version','question_id','value'].includes(key)))`,
    'Reaction requests contain no answer, draft or recording',
  );
  await click('.report-trigger');
  await wait(`!!document.querySelector('.report-dialog')`);
  await key('\uE00C');
  await wait(`!document.querySelector('.report-dialog')`);
  await shot('save-failure');
  await evaluate(`window.fetch=window.reactionFetch;delete window.reactionFetch;true;`);
  await click('.reaction-error button');
  await wait(
    `!document.querySelector('.reaction-error')&&!document.querySelector(${JSON.stringify(dislike)}).disabled`,
  );
  await check(saved('dislike'), 'Retry saves the pending vote after a transient error');
  await navigate(path);
  await wait(
    `document.querySelector(${JSON.stringify(dislike)}).getAttribute('aria-pressed')==='true'&&document.querySelector('.report-trigger')`,
  );
  for (const width of [320, 390]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 844 } });
    await evaluate('new Promise(r=>setTimeout(r,200))');
    await check(
      `document.documentElement.scrollWidth<=innerWidth+1&&[...document.querySelectorAll('.reaction-button,.report-trigger')].every(button=>{const r=button.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth;})`,
      `Reaction and report controls fit at ${width}px`,
    );
    await shot(`reactions-${width}`);
  }
  await evaluate(`document.querySelector(${JSON.stringify(dislike)}).focus();true;`);
  await key(' ');
  await wait(
    `!document.querySelector('.report-trigger')&&!document.querySelector(${JSON.stringify(dislike)}).disabled`,
  );
  await check(saved(null), 'Keyboard Space clears a restored dislike');
  await navigate('/en/a2/practice-test');
  await click('.mock-form .primary');
  await wait(`!!document.querySelector('.question')`);
  await check(
    `!!document.querySelector('.session-clock .clock-button')`,
    'Mock exam practice retains its elapsed-time control',
  );
  if (
    await evaluate(`document.querySelector('.clock-button').getAttribute('aria-pressed')==='true'`)
  )
    await click('.clock-button');
  await click('.clock-button');
  await check(
    `document.querySelector('.clock-button').getAttribute('aria-pressed')==='true'&&document.querySelector('.elapsed').textContent.includes('min')`,
    'The mock timer can show its saved elapsed time',
  );
  console.log('Exercise reactions Firefox journey passed.');
} finally {
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
