import fs from 'node:fs/promises';

// Teacher mode: profiles on one device keep separate progress, the switcher names the
// learner in use, a narrow phone header still fits, and a browser that cannot save says so
// and recovers.
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
  await fs.writeFile(`tmp/teachers-preview/${name}.png`, Buffer.from(result.data, 'base64'));
}
async function wait(expression) {
  try {
    await evaluate(
      `new Promise((resolve,reject)=>{const end=Date.now()+10000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(Error('timeout')):setTimeout(poll,40);poll();})`,
    );
  } catch (error) {
    await shot('failure').catch(() => {});
    const state = await evaluate(
      `JSON.stringify({url:location.href,profiles:localStorage.getItem('oefenschrift.profiles'),trigger:document.querySelector('.profile-trigger')?.textContent})`,
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
        id: 'teacher-mouse',
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
async function type(selector, text) {
  await click(selector);
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'teacher-keyboard',
        actions: [...text].flatMap((value) => [
          { type: 'keyDown', value },
          { type: 'keyUp', value },
        ]),
      },
    ],
  });
}
async function keys(text) {
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'teacher-keys',
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
const stored = (key) => `JSON.parse(localStorage.getItem(${JSON.stringify(key)})||'null')`;
const registry = stored('oefenschrift.profiles');
const row = (name) =>
  `[...document.querySelectorAll('.class-table tbody tr')].find(r=>r.querySelector('.class-name')?.textContent===${JSON.stringify(name)})`;
async function rowButton(name, action) {
  await evaluate(
    `(()=>{const r=${row(name)};r.querySelector('[data-action=${action}]').dataset.target='1';return true;})()`,
  );
  await click('[data-target="1"]');
  await evaluate(`document.querySelector('[data-target]')?.removeAttribute('data-target');true`);
}
async function chooseLearner(name) {
  await click('.profile-trigger');
  await wait(`document.querySelector('.profile-menu')`);
  await evaluate(
    `[...document.querySelectorAll('.profile-menu .profile-item')].find(i=>i.textContent.replace('✓','')===${JSON.stringify(name)}).dataset.target='1';true`,
  );
  await click('[data-target="1"]');
  await wait(
    `document.querySelector('.profile-trigger').textContent===${JSON.stringify(name)}&&!document.querySelector('.profile-menu')`,
  );
}

try {
  await fs.mkdir('tmp/teachers-preview', { recursive: true });
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
  await navigate('/a2/reading');
  await click('.side-settings .teachers-link');
  await wait(`location.pathname==='/teachers'`);
  console.log('  ✓ The sidebar link under language and theme opens the teacher page');
  await wait(`document.querySelector('.teacher-switch:not([data-loading]) [role=switch]')`);
  await check(
    `!document.querySelector('.profile-switcher')&&localStorage.getItem('oefenschrift.profiles')===null`,
    'Without teacher mode nothing changes: no switcher and no registry',
  );
  await click('.teacher-switch [role=switch]');
  await wait(`document.querySelector('.class-table')`);
  await check(
    `${registry}.teacher===true&&${registry}.active==='main'&&document.querySelector('.profile-trigger').textContent==='Leerling 1'`,
    'Teacher mode names the existing progress as the first profile',
  );
  for (const name of ['Anna', 'Bram']) {
    await type('.teacher-page > .profile-form input', name);
    await click('.teacher-page > .profile-form button[type=submit]');
    await wait(`${row(name)}`);
  }
  await check(`${registry}.list.length===3`, 'Two learners are added');

  // Bram practises a closed question; the first profile and Anna stay untouched.
  await chooseLearner('Bram');
  await check(`location.pathname==='/teachers'`, 'Switching from the class page stays there');
  const bramId = await evaluate(`${registry}.list.find(p=>p.name==='Bram').id`);
  await navigate('/a2/reading');
  await click('[data-set]');
  await wait(`document.querySelector('.answer-option input')`);
  await click('.answer-option input');
  await click('.question .actions .primary');
  await wait(`document.querySelector('.answer-option input:disabled')`);
  await check(
    `Object.keys(${stored('oefenschrift.study.v2@' + bramId)}.active.checked).length===1&&!${stored('oefenschrift.study.v2')}?.active?.checked?.[Object.keys(${stored('oefenschrift.study.v2@' + bramId)}.active.checked)[0]]`,
    'An answer is saved only in the learner’s own profile',
  );
  await chooseLearner('Anna');
  await wait(`location.pathname==='/'`);
  await check(
    `location.pathname==='/'&&document.querySelector('main h1')`,
    'Switching mid-exercise opens the next learner’s start page',
  );
  const annaId = await evaluate(`${registry}.list.find(p=>p.name==='Anna').id`);
  await check(
    `Object.keys(${stored('oefenschrift.study.v2@' + annaId)}.sessions).length===0&&Object.keys(${stored('oefenschrift.study.v2@' + bramId)}.active.checked).length===1`,
    'The next learner starts clean and the previous one keeps their answer',
  );
  await navigate('/teachers');
  await check(
    `document.querySelector('.profile-trigger').textContent==='Anna'&&${row('Bram')}.querySelectorAll('td')[7].textContent!=='—'&&${row('Anna')}.getAttribute('aria-current')==='true'`,
    'After a reload the class page shows who practises and when Bram last did',
  );
  await check(
    `(()=>{const w=document.querySelector('.class-table-wrap');return w.scrollWidth<=w.clientWidth})()`,
    'The class table fits its column on desktop without a scrollbar',
  );
  await check(
    `[...document.querySelectorAll('.class-table tbody tr')].every(r=>{const top=r.querySelector('.class-name').getBoundingClientRect().top;const buttons=[...r.querySelectorAll('.class-actions .text-button')];return buttons.every(b=>Math.abs(b.getBoundingClientRect().top-top)<3&&b.getBoundingClientRect().height<30)&&r.querySelectorAll('td')[7].getBoundingClientRect().height<=r.querySelector('.class-name').getBoundingClientRect().height*2+24})`,
    'Row actions share the name’s line and the date stays on one line',
  );
  await check(
    `new Set([...document.querySelectorAll('.class-table [data-action=rename]')].map(b=>Math.round(b.getBoundingClientRect().right))).size===1&&new Set([...document.querySelectorAll('.class-table [data-action=switch]')].map(b=>Math.round(b.getBoundingClientRect().right))).size===1`,
    'Pencils and the text action line up from row to row on desktop',
  );
  await shot('class-desktop');

  // Renaming happens in place: the row keeps its height and columns, Enter saves, Escape
  // cancels, and focus returns to the pencil.
  const layout = `JSON.stringify([document.querySelector('tr[data-profile=main]').getBoundingClientRect().height,...[...document.querySelectorAll('.class-table thead th')].map(th=>Math.round(th.getBoundingClientRect().left))])`;
  const before = await evaluate(layout);
  await rowButton('Leerling 1', 'rename');
  await wait(
    `document.activeElement?.matches('.class-rename input')&&document.activeElement.selectionEnd-document.activeElement.selectionStart===10`,
  );
  await check(
    `${layout}===${JSON.stringify(before)}`,
    'The rename field keeps the row height and the columns in place',
  );
  await shot('rename');
  await keys('Lotte\uE007');
  await wait(`${row('Lotte')}&&document.activeElement?.dataset.action==='rename'`);
  await check(
    `${registry}.list[0].name==='Lotte'`,
    'Typing replaces the selected name, Enter saves and focus returns to the pencil',
  );
  await rowButton('Lotte', 'rename');
  await wait(`document.activeElement?.matches('.class-rename input')`);
  await keys('Xavier\uE00C');
  await wait(`${row('Lotte')}&&!document.querySelector('.class-rename')`);
  await check(`${registry}.list[0].name==='Lotte'`, 'Escape cancels a rename');

  // A browser that refuses to save reports it, then recovers.
  await evaluate(
    `window.realSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new Error('QuotaExceededError')};true`,
  );
  await type('.teacher-page > .profile-form input', 'Cleo');
  await click('.teacher-page > .profile-form button[type=submit]');
  await wait(`document.querySelector('.teacher-page .storage-notice[role=alert]')`);
  await check(`!${row('Cleo')}`, 'A failed save adds no learner and says so');
  await evaluate(`Storage.prototype.setItem=window.realSetItem;true`);
  await click('.teacher-page > .profile-form button[type=submit]');
  await wait(`${row('Cleo')}&&!document.querySelector('.teacher-page .storage-notice')`);
  console.log('  ✓ Saving again once storage works adds the learner');

  // Deleting asks first and removes the learner's progress.
  await rowButton('Bram', 'delete');
  await rowButton('Bram', 'keep');
  await check(`!!${row('Bram')}`, 'Cancelling a delete keeps the learner');
  await rowButton('Bram', 'delete');
  await rowButton('Bram', 'confirm-delete');
  await wait(`!${row('Bram')}`);
  await check(
    `localStorage.getItem('oefenschrift.study.v2@${bramId}')===null&&!${registry}.list.some(p=>p.name==='Bram')`,
    'Deleting removes the learner and their saved progress',
  );
  await check(
    `!${row('Anna')}.querySelector('[data-action=delete]')`,
    'The learner in use cannot be deleted',
  );

  // Narrow phones: the learner line sits in the header and nothing scrolls sideways.
  for (const width of [390, 320]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 800 } });
    await navigate('/a2/reading');
    await check(
      `document.documentElement.scrollWidth<=innerWidth&&document.querySelector('.profile-trigger').getBoundingClientRect().right<=innerWidth&&document.querySelector('.profile-trigger').getBoundingClientRect().bottom<=document.querySelector('.sidebar').getBoundingClientRect().bottom`,
      `The learner switcher fits the ${width}px phone header`,
    );
    await navigate('/teachers');
    await check(
      `document.documentElement.scrollWidth<=innerWidth&&[...document.querySelectorAll('.class-table td')].every(td=>td.scrollWidth<=td.clientWidth+1)`,
      `The class page fits ${width}px without sideways scrolling or clipped figures`,
    );
    await check(
      `[...document.querySelectorAll('.class-table tbody tr')].every(r=>{const n=r.querySelector('th').getBoundingClientRect(),name=r.querySelector('.class-name').getBoundingClientRect(),mid=name.top+name.height/2;return [...r.querySelectorAll('.class-actions button')].every(b=>{const x=b.getBoundingClientRect();return Math.abs(x.top+x.height/2-mid)<4&&x.left>=name.right+4&&x.right<=r.getBoundingClientRect().right+1&&x.width>=32})})`,
      `On a ${width}px card the actions sit beside the name, whole and touch-sized`,
    );
    await check(
      `new Set([...document.querySelectorAll('.class-table [data-action=rename]')].map(b=>Math.round(b.getBoundingClientRect().right))).size===1&&[...document.querySelectorAll('.class-table tbody tr')].every(r=>Math.abs(r.querySelector('.class-buttons').getBoundingClientRect().right-r.getBoundingClientRect().right)<2)`,
      `On a ${width}px card the actions end at the right edge and the pencils line up`,
    );
    await rowButton('Cleo', 'delete');
    await check(
      `(()=>{const r=${row('Cleo')},c=r.querySelector('.class-confirm').getBoundingClientRect();return c.top>r.querySelector('th').getBoundingClientRect().bottom&&document.documentElement.scrollWidth<=innerWidth})()`,
      `On a ${width}px card the delete question takes its own line`,
    );
    await rowButton('Cleo', 'keep');
    await shot(`class-${width}`);
  }
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });

  // Turning teacher mode off returns to the first profile and keeps the class.
  await navigate('/teachers');
  await wait(`document.querySelector('.teacher-switch:not([data-loading]) [role=switch]')`);
  await click('.teacher-switch [role=switch]');
  await wait(`!document.querySelector('.profile-switcher')`);
  await check(
    `${registry}.teacher===false&&${registry}.active==='main'&&${registry}.list.length===3`,
    'Teacher mode off returns to the first profile and keeps the others',
  );
  console.log('Teacher mode Firefox journey passed; screenshots in tmp/teachers-preview/.');
} finally {
  await send('browser.removeUserContext', { userContext });
  await send('session.end');
  ws.close();
}
