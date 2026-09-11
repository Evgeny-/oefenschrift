import fs from 'node:fs/promises';
const ws = new WebSocket('ws://127.0.0.1:9226/session');
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
await send('browsingContext.navigate', {
  context,
  url: 'http://127.0.0.1:8767/',
  wait: 'complete',
});
async function evaluate(expression) {
  const r = await send('script.evaluate', { expression, target: { context }, awaitPromise: true });
  if (r.type === 'exception') throw Error(JSON.stringify(r));
  return r.result?.value;
}
async function settle() {
  await evaluate('new Promise(r=>setTimeout(r,100))');
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
  await settle();
}
const checks = [];
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  checks.push(label);
}
async function shot(name) {
  await evaluate('window.scrollTo(0,0)');
  const r = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile('tmp/soft-' + name + '.png', Buffer.from(r.data, 'base64'));
}

try {
  await evaluate(
    `localStorage.setItem('oefenschrift.study.v2',JSON.stringify({version:2,settings:{lang:'en',level:'A2',theme:'light',clock:false},records:{'A2:writing:afspraak:1':{completed:true,kind:'ai',at:Date.now()}},drafts:{'A2:speaking:buurvrouw:1':'Ik kan morgen niet komen. Ik werk.'},reviews:{},active:null}));document.cookie='oefenschrift_preferences='+encodeURIComponent(JSON.stringify({lang:'en',level:'A2',theme:'light',clock:false}))+'; Path=/';true;`,
  );
  await send('browsingContext.navigate', {
    context,
    url: 'http://127.0.0.1:8767/writing',
    wait: 'complete',
  });
  await evaluate('new Promise(r=>setTimeout(r,350))');
  await evaluate('document.fonts.ready.then(()=>true)');
  await check(
    `Math.abs(document.querySelector('.sidebar').getBoundingClientRect().width-172.8)<1&&document.querySelector('.sidebar').scrollWidth===document.querySelector('.sidebar').clientWidth`,
    'Narrower desktop sidebar fits its navigation and controls',
  );
  await check(
    `document.querySelectorAll('#language-control .language-flag').length===2&&document.querySelector('#language-control [aria-label="English"]').getAttribute('data-checked')!==null`,
    'Flag choices keep language names and selected-state semantics',
  );
  await check(
    `getComputedStyle(document.querySelector('.filter-indicator')).backgroundColor===getComputedStyle(document.documentElement).getPropertyValue('--action').trim().replace('#efbf24','rgb(239, 191, 36)')`,
    'Exercise filter uses the golden yellow accent',
  );
  const widths = await evaluate(
    `JSON.stringify([...document.querySelectorAll('.list-filters button')].map(el=>el.getBoundingClientRect().width))`,
  );
  await click('.list-filters button:nth-child(2)');
  await evaluate('new Promise(r=>setTimeout(r,220))');
  await check(
    `JSON.stringify([...document.querySelectorAll('.list-filters button')].map(el=>el.getBoundingClientRect().width))===${JSON.stringify(widths)}&&Math.abs(document.querySelector('.filter-indicator').getBoundingClientRect().left-document.querySelector('.list-filters [aria-pressed="true"]').getBoundingClientRect().left)<1`,
    'Animated filter line reaches its new target without changing label widths',
  );
  await check(
    `getComputedStyle(document.querySelector('.filter-indicator')).transitionProperty.includes('left')`,
    'Filter selection has a motion transition',
  );
  await click('.list-filters button:first-child');
  await settle();
  await check(
    `getComputedStyle(document.querySelector('.exercise-list li+li')).borderTopWidth==='0px'&&parseFloat(getComputedStyle(document.querySelector('.exercise-entry')).borderRadius)>=10&&document.querySelector('.exercise-entry').getBoundingClientRect().left>=14`,
    'Exercise rows have separate rounded surfaces and inset content',
  );
  await shot('writing-desktop');
  await click('#theme-control [aria-label="Dark"]');
  await evaluate('new Promise(r=>setTimeout(r,240))');
  await check(
    `document.documentElement.dataset.theme==='dark'&&Math.abs(document.querySelector('#theme-control .selection-indicator').getBoundingClientRect().left-document.querySelector('#theme-control [data-checked]').getBoundingClientRect().left)<1`,
    'Round theme selection animates to the selected icon',
  );
  await shot('writing-dark');
  await click('#theme-control [aria-label="Light"]');
  await click('[data-page="mock"]');
  await check(
    `document.querySelector('.toggle')&&getComputedStyle(document.querySelector('.toggle-thumb')).transitionProperty.includes('transform')`,
    'Base UI switch is restored with thumb motion',
  );
  await evaluate('window.getSelection().removeAllRanges();true;');
  for (let n = 0; n < 5; n++) await click('.toggle-label');
  await evaluate('new Promise(r=>setTimeout(r,220))');
  await check(
    `document.querySelector('.toggle').hasAttribute('data-checked')&&window.getSelection().toString()===''`,
    'Repeated label clicks toggle once each and never select text',
  );
  await check(
    `(()=>{const track=document.querySelector('.toggle').getBoundingClientRect(),thumb=document.querySelector('.toggle-thumb').getBoundingClientRect();return Math.abs((thumb.top+thumb.height/2)-(track.top+track.height/2))<.5&&Math.abs(track.right-thumb.right-4)<.5;})()`,
    'On-state switch thumb is centered with a four-pixel end gap',
  );
  await click('.toggle');
  await evaluate('new Promise(r=>setTimeout(r,220))');
  await check(
    `(()=>{const track=document.querySelector('.toggle').getBoundingClientRect(),thumb=document.querySelector('.toggle-thumb').getBoundingClientRect();return !document.querySelector('.toggle').hasAttribute('data-checked')&&Math.abs(thumb.left-track.left-4)<.5;})()`,
    'Off-state switch uses the same end gap',
  );
  await evaluate(`document.querySelector('.toggle-label input').focus();true;`);
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'keyboard',
        actions: [
          { type: 'keyDown', value: ' ' },
          { type: 'keyUp', value: ' ' },
        ],
      },
    ],
  });
  await settle();
  await check(
    `document.querySelector('.toggle').hasAttribute('data-checked')`,
    'Switch supports keyboard Space',
  );
  await shot('practice-switch');
  await click('[data-page="speaking"]');
  await send('browsingContext.navigate', {
    context,
    url: 'http://127.0.0.1:8767/exercise/A2%3Aspeaking%3Abuurvrouw%3A1',
    wait: 'complete',
  });
  await evaluate('new Promise(r=>setTimeout(r,350))');
  await check(
    `document.querySelector('.recorder-actions .info-trigger')&&!document.querySelector('.speaking-recorder > .small')`,
    'Recording explanation lives in its adjacent information icon',
  );
  await click('.recorder-actions .info-trigger');
  await settle();
  await check(
    `document.querySelector('.info-popup').textContent.includes('external transcription service')&&document.querySelector('.info-popup a').getAttribute('href')==='/en/privacy'&&document.querySelector('.info-popup').textContent.includes('2 minutes')`,
    'Recording popup explains external processing, duration and Privacy',
  );
  await shot('recording-info');
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'key',
        id: 'keyboard',
        actions: [
          { type: 'keyDown', value: '\uE00C' },
          { type: 'keyUp', value: '\uE00C' },
        ],
      },
    ],
  });
  await evaluate('new Promise(r=>setTimeout(r,220))');
  await check(
    `!document.querySelector('.info-popup')&&document.activeElement.classList.contains('info-trigger')`,
    'Recording popup dismisses with Escape and returns focus',
  );
  // Check the visible mobile navigation and preferences at both phone widths.
  for (const width of [390, 320]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 844 } });
    await settle();
    await click('[data-page="writing"]');
    await check(
      `document.documentElement.scrollWidth<=${width}&&[...document.querySelectorAll('.subject-nav .nav-link')].every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=${width};})`,
      'All five exam types stay visible at ' + width + 'px',
    );
    await check(
      `document.querySelectorAll('#level-control a[data-choice]').length===3&&document.querySelector('#level-control').getBoundingClientRect().bottom<100&&document.querySelector('.sidebar').getBoundingClientRect().height<200`,
      'Levels stay visible in a compact phone header at ' + width + 'px',
    );
    await check(
      `document.querySelector('.exercise-entry').getBoundingClientRect().left>=14&&parseFloat(getComputedStyle(document.querySelector('.exercise-entry')).paddingRight)>=14`,
      'Exercise list retains side padding at ' + width + 'px',
    );
    await shot('writing-mobile-' + width);
    await click('.preferences-trigger');
    await settle();
    await check(
      `document.querySelectorAll('.preferences-popup .language-flag').length===2&&document.querySelectorAll('.preferences-popup #theme-control [role="radio"]').length===3&&document.documentElement.scrollWidth<=${width}`,
      'Mobile preferences expose both flags and all theme choices at ' + width + 'px',
    );
    await click('#language-control [aria-label="Nederlands"]');
    await click('#theme-control [aria-label="Donker"]');
    await evaluate('new Promise(r=>setTimeout(r,220))');
    await check(
      `document.documentElement.lang==='nl'&&document.documentElement.dataset.theme==='dark'`,
      'Mobile flags and theme icons update the app at ' + width + 'px',
    );
    await shot('preferences-mobile-' + width);
    await send('input.performActions', {
      context,
      actions: [
        {
          type: 'key',
          id: 'keyboard',
          actions: [
            { type: 'keyDown', value: '\uE00C' },
            { type: 'keyUp', value: '\uE00C' },
          ],
        },
      ],
    });
    await evaluate('new Promise(r=>setTimeout(r,220))');
    await check(
      `!document.querySelector('.preferences-popup')&&document.activeElement.classList.contains('preferences-trigger')`,
      'Mobile preferences return focus when dismissed at ' + width + 'px',
    );
    await check(
      `document.documentElement.scrollWidth<=${width}&&[...document.querySelectorAll('.subject-nav .nav-link')].every(el=>el.getBoundingClientRect().right<=${width})`,
      'Dutch exam navigation fits at ' + width + 'px',
    );
    await click('[data-page="speaking"]');
    await send('browsingContext.navigate', {
      context,
      url: 'http://127.0.0.1:8767/exercise/A2%3Aspeaking%3Abuurvrouw%3A1',
      wait: 'complete',
    });
    await evaluate('new Promise(r=>setTimeout(r,350))');
    await shot('speaking-mobile-' + width);
    await check(
      `document.documentElement.scrollWidth<=${width}&&document.querySelector('.recorder-actions .info-trigger')`,
      'Speaking and its information control fit at ' + width + 'px',
    );
  }
  await send('browsingContext.setViewport', { context, viewport: { width: 1280, height: 900 } });
  await settle();
  await check(
    `document.querySelector('.side-settings #language-control')&&!document.querySelector('.preferences-trigger')`,
    'Resizing back restores desktop preferences without duplicate controls',
  );
  console.log(checks.join('\n'));
  await fs.writeFile('tmp/soft-controls-checks.json', JSON.stringify(checks, null, 2));
} finally {
  await send('session.end');
  ws.close();
}
