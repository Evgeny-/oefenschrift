import fs from 'node:fs/promises';
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
await send('browsingContext.navigate', { context, url: origin + '/', wait: 'complete' });
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
const browserErrors = [];
await send('session.subscribe', { events: ['log.entryAdded'] });
ws.addEventListener('message', (event) => {
  const m = JSON.parse(event.data);
  if (
    m.method === 'log.entryAdded' &&
    m.params.level === 'error' &&
    m.params.source?.context === context
  )
    browserErrors.push(m.params.text);
});
const checks = [];
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  checks.push(label);
}
async function shot(name) {
  await evaluate('window.scrollTo(0,0)');
  const r = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile('tmp/infrastructure-' + name + '.png', Buffer.from(r.data, 'base64'));
}

const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8')),
  draft = bank.find((i) => i.level === 'A2' && i.part === 'speaking'),
  done = bank.find((i) => i.level === 'A2' && i.part === 'reading');
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+7000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(new Error('Expected UI did not appear')):setTimeout(poll,40);poll();})`,
  );
}
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await wait(
    `!!document.querySelector('.app-shell[data-hydrated],.admin-main,.admin-login,.error-page')`,
  );
}
async function fill(selector, value) {
  await evaluate(
    `(()=>{const el=document.querySelector(${JSON.stringify(selector)});Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));return true;})()`,
  );
  await settle();
}
const sourceFile = 'app/components/OpenExercise.tsx',
  oldText = "'Sentence starters'",
  newText = "'Sentence starters HMR'";
try {
  await evaluate(
    `localStorage.setItem('inburgering.study.v2',JSON.stringify({version:2,settings:{lang:'en',level:'B1',theme:'light',clock:false},records:{${JSON.stringify(done.id)}:{completed:true,kind:'quiz',correct:0,total:${done.questions.length},at:1000}},drafts:{${JSON.stringify(draft.id)}:'Mijn bewaarde concept.'},reviews:{},active:null}));true;`,
  );
  await send('script.addPreloadScript', {
    functionDeclaration: `()=>{window.initialSlides=[];document.addEventListener('transitionrun',event=>{if(event.target.classList?.contains('selection-indicator'))window.initialSlides.push(event.propertyName);});}`,
  });
  await evaluate(
    `document.cookie='inburgering_preferences='+encodeURIComponent(JSON.stringify({lang:'en',level:'B1',theme:'light',clock:false}))+'; Path=/';true;`,
  );
  await navigate('/reading');
  await evaluate('document.fonts.ready.then(()=>true)');
  await settle();
  await check(
    `document.querySelector('#level-control [data-checked]').textContent==='B1'&&window.initialSlides.length===0`,
    'Saved B1 is selected immediately, with no initial sliding animation',
  );
  await check(
    `getComputedStyle(document.querySelector('.segments')).borderWidth==='0px'&&getComputedStyle(document.querySelector('.selection-indicator')).borderWidth==='0px'`,
    'Round selectors have no outer or inner borders',
  );
  await check(
    `getComputedStyle(document.querySelector('.selection-indicator')).backgroundColor==='rgb(243, 223, 160)'`,
    'Active setting uses softer yellow than primary actions',
  );
  await check(
    `Array.from(document.querySelectorAll('.segments .language-flag')).every(flag=>{const p=flag.parentElement.getBoundingClientRect(),r=flag.getBoundingClientRect(),i=flag.closest('.segments').querySelector('.selection-indicator').getBoundingClientRect();return Math.abs((p.x+p.width/2)-(r.x+r.width/2))<.1&&Math.abs((p.y+p.height/2)-(r.y+r.height/2))<.1&&(!flag.parentElement.hasAttribute('data-checked')||Math.abs((i.x+i.width/2)-(r.x+r.width/2))<.1)})`,
    'Both flags and the selected indicator are centered precisely',
  );
  await wait(
    `location.pathname==='/en/b1/reading'&&document.querySelector('#level-control [data-choice="A2"]')?.getAttribute('href')==='/en/a2/reading'`,
  );
  await check(
    `location.pathname==='/en/b1/reading'&&document.querySelector('#level-control [data-choice="A2"]').getAttribute('href')==='/en/a2/reading'`,
    'Saved level and language redirect to a shareable path with crawlable level links',
  );
  await check(
    `document.querySelector('#language-control [aria-label="Nederlands"]').getAttribute('href')==='/b1/reading'&&document.querySelector('#language-control [aria-label="English"]').getAttribute('href')==='/en/b1/reading'&&document.querySelector('link[rel="alternate"][hreflang="nl"]').getAttribute('href').endsWith('/b1/reading')&&document.querySelector('link[rel="alternate"][hreflang="en"]').getAttribute('href').endsWith('/en/b1/reading')&&document.querySelector('link[rel="canonical"]').getAttribute('href').endsWith('/en/b1/reading')&&document.documentElement.lang==='en'`,
    'Language choices link to this page in the other language and the head names both versions',
  );
  await click('#level-control [data-choice="A2"]');
  await wait(`document.querySelector('.heading p')?.textContent.startsWith('A2')`);
  await check(
    `Math.abs(document.querySelector('.exercise-entry-copy').getBoundingClientRect().left-document.querySelector('h1').getBoundingClientRect().left)<1`,
    'Exercise text aligns with the heading before hover',
  );
  const hoverPoint = JSON.parse(
    await evaluate(
      `JSON.stringify((()=>{const r=document.querySelector('.exercise-entry').getBoundingClientRect();return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2)}})())`,
    ),
  );
  await send('input.performActions', {
    context,
    actions: [
      {
        type: 'pointer',
        id: 'mouse',
        parameters: { pointerType: 'mouse' },
        actions: [{ type: 'pointerMove', ...hoverPoint, origin: 'viewport' }],
      },
    ],
  });
  await evaluate('new Promise(r=>setTimeout(r,200))');
  await shot('catalogue');
  await check(`location.pathname==='/en/a2/reading'`, 'Changing level updates the address');
  await send('browsingContext.traverseHistory', { context, delta: -1 });
  await wait(
    `location.pathname==='/en/b1/reading'&&document.querySelector('#level-control [data-checked]')?.textContent==='B1'`,
  );
  await check(
    `document.querySelector('.heading p').textContent.startsWith('B1')`,
    'Browser Back restores the level and its exercises',
  );
  await send('browsingContext.traverseHistory', { context, delta: 1 });
  await wait(
    `location.pathname==='/en/a2/reading'&&document.querySelector('#level-control [data-checked]')?.textContent==='A2'`,
  );
  await click('[data-page="progress"]');
  await wait(`document.querySelector('h1')?.textContent==='Your progress'`);
  await check(
    `document.querySelectorAll('.list-filters button').length===3&&!document.body.innerText.includes('Continue a draft')`,
    'Progress has separate Drafts, Completed and Review mistakes filters',
  );
  await click('[data-choice="drafts"]');
  await check(
    `document.querySelectorAll('[data-item]').length===1&&document.querySelector('[data-item]').dataset.item===${JSON.stringify(draft.id)}`,
    'Drafts view only contains unfinished answers',
  );
  await shot('progress-drafts');
  await click('[data-item]');
  await wait(`!!document.querySelector('.speaking-recorder')`);
  await check(
    `!document.body.innerText.includes('Upload audio')&&!document.querySelector('input[type="file"]')`,
    'Speaking removes the upload control and file input',
  );
  await click('.type-toggle');
  await check(`!document.querySelector('#open-answer')`, 'A revealed text form can be hidden');
  await click('.type-toggle');
  await check(
    `document.querySelector('#open-answer').value==='Mijn bewaarde concept.'`,
    'Showing the form again preserves its draft',
  );
  await check(
    `document.querySelector('.sentence-starters summary svg')&&getComputedStyle(document.querySelector('.sentence-starters summary')).borderTopWidth==='0px'`,
    'Sentence starters use a compact disclosure with an SVG chevron',
  );
  await click('.sentence-starters summary');
  await check(
    `document.querySelector('.sentence-starters').open`,
    'Hint disclosure opens without changing the draft',
  );
  await check(
    `document.querySelector('.report-trigger').getBoundingClientRect().left-document.querySelector('.session-clock').getBoundingClientRect().right<20&&Math.abs(document.querySelector('.exercise-meta > p').getBoundingClientRect().y-document.querySelector('.exercise-tools').getBoundingClientRect().y)<8`,
    'Timer and report are grouped beside the exercise metadata',
  );
  await evaluate(`document.querySelector('.type-toggle').focus();true;`);
  await check(
    `parseFloat(getComputedStyle(document.querySelector('.type-toggle')).outlineOffset)<=1`,
    'Keyboard focus stays close to its control',
  );
  await evaluate(`window.hotReloadMarker='preserved';true;`);
  const before = await fs.readFile(sourceFile, 'utf8');
  await fs.writeFile(sourceFile, before.replace(oldText, newText));
  await wait(`document.querySelector('.sentence-starters summary')?.textContent.includes('HMR')`);
  await check(
    `window.hotReloadMarker==='preserved'&&document.querySelector('#open-answer').value==='Mijn bewaarde concept.'`,
    'React hot reload updates the component without reloading or losing the draft',
  );
  await fs.writeFile(sourceFile, (await fs.readFile(sourceFile, 'utf8')).replace(newText, oldText));
  await wait(`!document.querySelector('.sentence-starters summary')?.textContent.includes('HMR')`);
  await shot('speaking');
  await click('.report-trigger');
  await fill('.issue-report textarea', 'Synthetic browser test report');
  await click('.issue-report .primary');
  await wait(`!!document.querySelector('.report-receipt')`);
  await check(
    `document.querySelector('.report-receipt').textContent.includes('#')`,
    'An exercise report reaches the SQLite queue',
  );
  await click('.report-receipt button');
  await navigate('/ops/reports');
  await check(
    `location.pathname==='/ops/login'&&new URL(location.href).searchParams.get('next')==='/ops/reports'`,
    'Administration asks for a login and remembers the requested page',
  );
  await check(
    `(async()=>{const response=await fetch('/admin');return response.status===404})()`,
    'The old /admin path is gone',
  );
  await check(
    `(async()=>{const response=await fetch('/ops/login');return response.headers.get('x-robots-tag')==='noindex, nofollow, noarchive'&&(await (await fetch('/robots.txt')).text()).includes('Disallow: /ops')})()`,
    'Operations pages are excluded from robots and carry a noindex header',
  );
  await fill('#admin-user', 'browser-test');
  await fill('#admin-password', 'wrong-password');
  await click('.admin-login-form .primary');
  await wait(`!!document.querySelector('.admin-login-form .feedback-error')`);
  checks.push('A wrong password is refused');
  await fill('#admin-password', 'browser-test-password');
  await click('.admin-login-form .primary');
  await wait(`location.pathname==='/ops/reports'&&!!document.querySelector('.admin-main')`);
  checks.push('Sign-in returns to the requested page');
  await check(
    `document.body.innerText.includes('Synthetic browser test report')`,
    'Reports show the saved learner report',
  );
  await shot('reports');
  await click('.admin-list form button');
  await wait(`!document.body.innerText.includes('Synthetic browser test report')`);
  await check(
    `document.querySelector('.admin-head .small').textContent.startsWith('0 open reports')`,
    'Resolving a report updates the queue through a route action',
  );
  await check(
    `(async()=>{const r=await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor:'0123456789abcdef0123456789abcdef',events:[{kind:'visit',lang:'nl',level:'A2'},{kind:'answer',item:'A2:listening:tandarts:1',question:'q1',selected:'B',mode:'practice',lang:'nl',level:'A2'}]})});return (await r.json()).recorded===2})()`,
    'Anonymous events are accepted and validated against the catalogue',
  );
  // Provider switches: off in /ops means self-review for learners, at once and mid-task.
  const writingId = bank.find((i) => i.part === 'writing').id,
    switchFeedback = (operation) =>
      `(async()=>{const f=new FormData();f.set('csrf',sessionStorage.getItem('ops-csrf'));f.set('service','feedback');f.set('operation',${JSON.stringify(operation)});const r=await fetch('/ops/services',{method:'POST',body:f});return r.ok})()`;
  await navigate('/ops/services');
  await wait(`document.querySelectorAll('.service-control').length===2`);
  await check(
    `document.querySelector('.service-control[data-service="feedback"]').dataset.available==='true'&&!!document.querySelector('.service-control[data-service="speech"] .service-on')&&document.querySelector('.service-control[data-service="feedback"] input[name="cap"]').value==='2000'&&document.querySelector('.service-control[data-service="speech"] input[name="cap"]').value==='600'`,
    'Services shows both providers on with their daily caps',
  );
  await shot('services');
  await click('.service-control[data-service="feedback"] button[value="off"]');
  await wait(`!!document.querySelector('.service-control[data-service="feedback"] .service-off')`);
  await check(
    `(async()=>{const s=await (await fetch('/api/status')).json();return s.feedback===false&&s.feedbackPaused===true&&s.speech===true})()`,
    'Switching AI feedback off is reflected by the status endpoint at once',
  );
  await check(
    `(async()=>{const r=await fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:${JSON.stringify(writingId)},answer:'Hallo',lang:'en'})});const b=await r.json();return r.status===503&&b.code==='feedback_off'})()`,
    'A switched-off service refuses with a code before any provider call',
  );
  await evaluate(
    `sessionStorage.setItem('ops-csrf',document.querySelector('.service-control input[name="csrf"]').value);true;`,
  );
  await navigate('/ops');
  await check(
    `document.querySelector('.admin-notice')?.textContent.includes('AI feedback is switched off')`,
    'The overview says which service is off',
  );
  // The overview reads the provider balances after it renders; leave only once that
  // request has answered, so unloading the page does not fail it into the error boundary.
  await wait(`document.body.innerText.includes('Not checked in offline mode')`);
  await navigate('/exercise/' + encodeURIComponent(writingId));
  await wait(`!!document.querySelector('#open-answer')`);
  await check(
    `!document.querySelector('[data-action="assess"]')&&!!document.querySelector('.answer-workspace .secondary')&&document.querySelector('.service-note').textContent.includes('temporarily unavailable')`,
    'While feedback is off, the task offers self-review and says why',
  );
  await check(
    switchFeedback('on'),
    'The switch accepts a same-origin form with the session cookie',
  );
  await navigate('/exercise/' + encodeURIComponent(writingId));
  await wait(`!!document.querySelector('[data-action="assess"]')`);
  await fill('#open-answer', 'Ik kan morgen niet komen.');
  await evaluate(switchFeedback('off'));
  await click('[data-action="assess"]');
  await wait(
    `!document.querySelector('[data-action="assess"]')&&!!document.querySelector('.feedback-error')`,
  );
  await check(
    `document.querySelector('#open-answer').value==='Ik kan morgen niet komen.'&&!!document.querySelector('.service-note')&&!document.querySelector('.answer-workspace .secondary').disabled`,
    'A refusal mid-task switches to self-review without losing the draft',
  );
  await evaluate(switchFeedback('on'));
  await check(
    `(async()=>{const s=await (await fetch('/api/status')).json();return s.feedback===true&&!s.feedbackPaused})()`,
    'Switching back on restores the service',
  );
  // The session pass: set by the page, invisible to scripts, and the key of a browser's
  // allowance; refusals while a service was off cost nothing.
  await check(
    `(async()=>{const s=await (await fetch('/api/status')).json();return !document.cookie.includes('inburgering_pass')&&s.remaining.feedback===30&&s.remaining.speech===20})()`,
    'The pass is HttpOnly and the daily allowance is untouched by refused calls',
  );
  await check(
    `(async()=>{const seen=[];for(let n=0;n<3;n++){const r=await fetch('/api/reports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({item_id:${JSON.stringify(writingId)},item_version:${JSON.stringify(bank.find((i) => i.id === writingId).revision)},kind:'other',message:'Synthetic limit probe '+n})});seen.push([r.status,r.headers.get('retry-after'),(await r.json()).code]);}return seen.some(([s])=>s===200)&&seen.some(([s,after,code])=>s===429&&after&&code==='rate_limited')})()`,
    'A burst of reports from one browser is throttled with a code and Retry-After',
  );
  await navigate('/privacy');
  await check(
    `document.querySelector('h1').textContent==='Privacy'&&document.querySelectorAll('.storage-table tbody tr').length===7&&document.body.innerText.includes('inburgering_pass')&&!!document.querySelector('.footer-links a[href="/en/terms"]')`,
    'The privacy page lists every cookie and storage item, and the footer links the terms',
  );
  await navigate('/terms');
  await check(
    `document.querySelector('h1').textContent==='Terms of use'&&document.body.innerText.includes('not an exam result')&&!!document.querySelector('.privacy-document a[href="/en/privacy"]')`,
    'The terms page explains the AI limits and links back to the privacy notice',
  );
  await navigate('/ops');
  await wait(`!!document.querySelector('.chart canvas')`);
  await check(
    `document.querySelector('.admin-grid .tile').textContent.includes('Unique visitors')&&document.querySelectorAll('.chart canvas').length>=2&&(()=>{const [a,b]=document.querySelectorAll('.admin-grid > .card');return Math.abs(a.getBoundingClientRect().top-b.getBoundingClientRect().top)<1&&Math.abs(a.getBoundingClientRect().height-b.getBoundingClientRect().height)<1;})()`,
    'The overview renders tiles and charts on one grid with level rows',
  );
  await check(
    `(()=>{const tiles=[...document.querySelectorAll('.admin-tiles .tile')];const tops=new Set(tiles.map(t=>Math.round(t.getBoundingClientRect().top)));return tiles.length===7&&tops.size===1&&tiles.every(t=>[...t.querySelectorAll('.tile-label')].every(el=>el.getBoundingClientRect().height<2*parseFloat(getComputedStyle(el).fontSize)))&&tiles.slice(0,5).every(t=>[...t.querySelectorAll('.tile-detail')].every(el=>el.getBoundingClientRect().height<2*parseFloat(getComputedStyle(el).fontSize)));})()`,
    'The stat tiles sit on one row with single-line labels and details (the offline provider notes may wrap)',
  );
  await check(
    `(()=>{const items=[...document.querySelectorAll('.admin-bar-tools > *, .admin-bar-tools form > button')].filter(el=>el.tagName!=='FORM');const centres=items.map(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2;});return centres.every(c=>Math.abs(c-centres[0])<1)&&!document.querySelector('.admin-tag');})()`,
    'Bar tools sit on one line without the administration tag',
  );
  await evaluate(`document.querySelector('#ops-theme [data-choice="dark"]').click();true;`);
  await wait(`document.documentElement.dataset.theme==='dark'`);
  await check(
    `document.cookie.includes('%22theme%22%3A%22dark%22')`,
    'The theme switch applies dark mode and stores the preference',
  );
  await evaluate(`document.querySelector('#ops-theme [data-choice="light"]').click();true;`);
  await wait(`document.documentElement.dataset.theme==='light'`);
  await shot('overview');
  await navigate('/ops/exercises');
  await check(
    `!document.querySelector('a[href="/ops/exercises/new"]')&&document.querySelectorAll('.admin-table tbody tr').length>50&&document.querySelector('.admin-search').getBoundingClientRect().width<200`,
    'Exercises list the reviewed catalogue without drafts and with a compact search',
  );
  await navigate('/ops/exercises/' + encodeURIComponent(draft.id));
  await wait(`!!document.querySelector('button[value="archive"]')`);
  await shot('exercise-detail');
  await click('button[value="archive"]');
  await wait(`!!document.querySelector('button[value="restore"]')`);
  await check(
    `(async()=>{const response=await fetch('/exercise/'+encodeURIComponent(${JSON.stringify(draft.id)}));return response.status===404})()`,
    'Removing an exercise from practice makes its page a 404',
  );
  await click('button[value="restore"]');
  await wait(`!!document.querySelector('button[value="archive"]')`);
  checks.push('Exercise archiving and restoring work without deleting history');
  await check(
    `(async()=>{const response=await fetch('/api/ops/exercises',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});return response.status===403})()`,
    'Admin API rejects writes without its CSRF token',
  );
  await evaluate(`document.querySelector('.admin-bar-tools form button').click();true;`);
  await wait(`location.pathname==='/ops/login'`);
  await check(
    `(async()=>{const response=await fetch('/api/ops/reports');return response.status===401})()`,
    'Signing out ends the session for pages and the JSON API',
  );
  await navigate('/');
  await check(
    `location.pathname==='/en'&&document.querySelector('h1').textContent==='Practise for the Dutch integration exam'&&!document.querySelector('.home [data-page]')&&document.querySelectorAll('.home-why h3').length===3&&document.querySelectorAll('.home-why .reason-icon').length===3&&document.querySelector('.home-why h3').textContent==='Always free'&&document.querySelector('.home-section h2')&&!document.querySelector('.home-nav')&&document.querySelector('.wordmark').getAttribute('href')==='/en'&&getComputedStyle(document.querySelector('.home-hero .primary')).textDecorationLine==='none'`,
    'The home page states what the site is, offers one action without an underline and three reasons',
  );
  await check(
    `document.querySelector('[data-item=${JSON.stringify(draft.id)}]')?.textContent.includes('draft saved')&&document.querySelector('[data-item=${JSON.stringify(draft.id)}] .entry-icon .icon-speaking')`,
    'A saved draft appears under the open work with its subject icon',
  );
  await navigate('/sets/a2-listening-01');
  await wait(`!!document.querySelector('.question')`);
  await evaluate(`document.querySelector('.wordmark').click();true;`);
  await wait(`location.pathname==='/en'&&!!document.querySelector('.home-hero .primary')`);
  await check(
    `document.querySelector('.home-hero .primary').textContent.startsWith('Start with')&&!document.querySelector('.home [data-set="a2-listening-01"]')`,
    'The wordmark leads home and a set only opened, never answered, is not offered to continue',
  );
  // The level check: offered on the start page, ten questions without feedback, a result per subject.
  const key = async (value) => {
    await send('input.performActions', {
      context,
      actions: [
        {
          type: 'key',
          id: 'keyboard',
          actions: [
            { type: 'keyDown', value },
            { type: 'keyUp', value },
          ],
        },
      ],
    });
    await evaluate('new Promise(r=>setTimeout(r,120))');
  };
  const recordsBefore = await evaluate(
    `Object.keys(JSON.parse(localStorage.getItem('inburgering.study.v2')).records).length`,
  );
  await check(
    `document.querySelector('.home-hero [data-action="level-check"]')?.textContent==='Take the level check'&&!document.querySelector('.home-spec')`,
    'The start page offers the level check beside the practice set',
  );
  await click('.home-hero [data-action="level-check"]');
  await wait(
    `location.pathname==='/en/a2/level-check'&&!!document.querySelector('[data-action="start-check"]')`,
  );
  await check(
    `document.querySelectorAll('.check-plan li').length===3&&document.querySelector('h1').textContent==='Level check A2'`,
    'The check intro states the draw and the time',
  );
  await click('[data-action="start-check"]');
  await wait(`!!document.querySelector('.question')`);
  await check(
    `document.querySelector('.toolbar .back').textContent.includes('Stop the check')&&document.querySelector('.session-position span').textContent==='Question 1 of 10'&&document.querySelector('.exercise-meta p').textContent.includes('Level check')`,
    'The check runs in the exercise layout with its own toolbar',
  );
  let sawFeedback = false;
  for (let n = 1; n <= 10; n++) {
    await key(String(1 + (n % 3)));
    await wait(`document.querySelector('input[name="answer"]:checked')`);
    await key('\uE007');
    if (n < 10)
      await wait(
        `document.querySelector('.session-position span')?.textContent==='Question ${n + 1} of 10'`,
      );
    if (await evaluate(`!!document.querySelector('.answer-feedback')`)) sawFeedback = true;
  }
  await wait(
    `location.pathname==='/en/a2/level-check/result'&&document.querySelectorAll('.check-skills li').length===2&&!document.querySelector('.check-skills [data-part="knm"]')`,
  );
  if (sawFeedback) throw Error('The check showed feedback between questions');
  await check(
    `document.querySelector('.check-advice .primary')&&/^\\d+ \\/ 10$/.test(document.querySelector('.result-total strong').textContent.trim())&&document.querySelector('.result-mistakes')&&document.querySelector('.result-review')`,
    'The result shows counts per subject, one recommendation and the review',
  );
  await check(
    `Object.keys(JSON.parse(localStorage.getItem('inburgering.study.v2')).records).length===${JSON.stringify(recordsBefore)}&&JSON.parse(localStorage.getItem('inburgering.study.v2')).checks.length===1`,
    'A check is stored on its own and marks no exercise as completed',
  );
  await navigate('/');
  await check(
    `document.querySelector('.home [data-check]')&&!document.querySelector('[data-action="level-check"]')&&document.querySelector('.home-hero .primary')`,
    'The start page lists the check result and keeps one primary action',
  );
  await navigate('/a2/progress');
  await check(
    `document.querySelector('.check-history [data-check]')?.textContent.includes('Level check A2')`,
    'Progress lists the finished check',
  );
  await click('.check-history [data-check]');
  await wait(
    `location.pathname==='/en/a2/level-check/result'&&document.querySelectorAll('.check-skills li').length===2`,
  );
  checks.push('A listed check opens its result');
  await navigate('/b1/progress?filter=mistakes');
  await check(
    `document.querySelector('.list-filters [data-choice="mistakes"]').getAttribute('aria-pressed')==='true'`,
    'A filter in the address opens that progress view',
  );
  await navigate('/reading');
  for (const width of [390, 320]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 844 } });
    await settle();
    await check(
      `document.documentElement.scrollWidth<=${width}&&document.querySelectorAll('.subject-nav a').length===5`,
      'Visible mobile subjects fit at ' + width + 'px',
    );
    await check(
      `document.querySelector('.exercise-entry-copy').getBoundingClientRect().left>=14&&Math.abs(document.querySelector('.exercise-entry-copy').getBoundingClientRect().left-document.querySelector('h1').getBoundingClientRect().left)<1`,
      'Mobile list stays aligned with page padding at ' + width + 'px',
    );
    await navigate('/exercise/' + encodeURIComponent(draft.id));
    await shot('speaking-' + width);
    await check(
      `document.documentElement.scrollWidth<=${width}`,
      'Speaking controls fit at ' + width + 'px',
    );
    await navigate('/reading');
  }
  if (browserErrors.length) throw new Error(browserErrors.join('\n'));
  console.log(checks.join('\n'));
  await fs.writeFile(
    'tmp/infrastructure-checks.json',
    JSON.stringify({ checks, browserErrors }, null, 2),
  );
} finally {
  const source = await fs.readFile(sourceFile, 'utf8');
  if (source.includes(newText)) await fs.writeFile(sourceFile, source.replace(newText, oldText));
  await send('session.end');
  ws.close();
}
