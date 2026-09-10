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
const checks = [];
async function check(expression, label) {
  if (!(await evaluate(expression))) throw Error(label);
  checks.push(label);
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+7000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(new Error('Expected UI did not appear')):setTimeout(poll,40);poll();})`,
  );
}
async function shot(name) {
  await evaluate('window.scrollTo(0,0)');
  const r = await send('browsingContext.captureScreenshot', { context });
  await fs.writeFile('tmp/sets-' + name + '.png', Buffer.from(r.data, 'base64'));
}

const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const sets = JSON.parse(await fs.readFile('content/practice-sets.json', 'utf8'));
const listening = sets.find((s) => s.level === 'A2' && s.part === 'listening'),
  writing = sets.find((s) => s.level === 'A2' && s.part === 'writing');
async function navigate(path) {
  await send('browsingContext.navigate', { context, url: origin + path, wait: 'complete' });
  await evaluate('new Promise(r=>setTimeout(r,350))');
  await evaluate('new Promise(r=>setTimeout(r,200))');
}
async function answer(text) {
  await evaluate(
    `(()=>{const el=document.querySelector('#open-answer');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,${JSON.stringify(text)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`,
  );
  await settle();
  await evaluate('new Promise(r=>setTimeout(r,200))');
}
async function mockFeedback(fail = false) {
  await evaluate(
    `window.realFetch=window.realFetch||window.fetch;window.feedbackCalls=window.feedbackCalls||0;window.fetch=(url,options)=>{if(url!=='/api/feedback')return window.realFetch(url,options);window.feedbackCalls++;${fail ? "return Promise.resolve(new Response('{}',{status:503}));" : `const data=JSON.parse(options.body);return Promise.resolve(new Response(JSON.stringify({criteria:[{index:0,met:true,uncertain:false,evidence:'Ik kan morgen niet komen.',feedback:'Duidelijk.'},{index:1,met:false,uncertain:false,evidence:'',feedback:'Er ontbreekt een reden.'},{index:2,met:true,uncertain:false,evidence:'Kan ik vrijdag komen?',feedback:'Duidelijk.'}],comment:'Twee punten zijn duidelijk.',next_step:'Voeg een reden toe.',corrected_text:'Ik kan morgen niet komen, omdat [reden]. Kan ik vrijdag komen?',translations:{nl:{comment:'Twee punten zijn duidelijk.',next_step:'Voeg een reden toe.',criteria_feedback:['Duidelijk.','Er ontbreekt een reden.','Duidelijk.']},en:{comment:'Two points are clear.',next_step:'Add a reason.',criteria_feedback:['Clear.','A reason is missing.','Clear.']}}}),{headers:{'Content-Type':'application/json'}}));`}};true;`,
  );
}
try {
  await evaluate(
    `localStorage.setItem('inburgering.study.v2',JSON.stringify({version:2,settings:{lang:'en',level:'A2',theme:'light',clock:false},records:{},drafts:{},reviews:{},active:null}));document.cookie='inburgering_preferences='+encodeURIComponent(JSON.stringify({lang:'en',level:'A2',theme:'light',clock:false}))+'; Path=/';true;`,
  );
  await navigate('/listening');
  await evaluate('document.fonts.ready.then(()=>true)');
  await check(
    `document.querySelectorAll('[data-set]').length===${sets.filter((s) => s.level === 'A2' && s.part === 'listening').length}&&!document.querySelector('[data-item]')`,
    'Subject catalogue offers multi-exercise practice sets',
  );
  await check(
    `Math.abs(parseFloat(getComputedStyle(document.documentElement).fontSize)-16)<.02&&Math.abs(document.querySelector('.app-shell').getBoundingClientRect().width-1152)<1&&Math.abs(parseFloat(getComputedStyle(document.querySelector('.nav-link')).fontSize)-15)<.02`,
    'Interface type follows the browser default with a 15px navigation size and a 72rem shell',
  );
  await check(
    `getComputedStyle(document.querySelector('.exercise-entry')).backgroundColor==='rgba(0, 0, 0, 0)'&&getComputedStyle(document.querySelector('.exercise-list li+li')).borderTopWidth==='1px'&&document.querySelector('.exercise-entry .entry-texts').textContent.includes('·')&&document.querySelector('.exercise-entry .ring')`,
    'List rows stay transparent, separated by a hairline, naming their texts with a progress ring',
  );
  await shot('listening-catalogue');
  await click(`[data-set="${listening.id}"]`);
  await check(
    `location.pathname==='/en/sets/${listening.id}'&&JSON.parse(localStorage.getItem('inburgering.study.v2')).active.ids.length===${listening.ids.length}`,
    'Opening a set starts all its exercises under a shareable URL',
  );
  await check(
    `!document.body.innerText.includes('Synthetic sample voice')&&!document.querySelector('.audio-caption')`,
    'Listening player has no synthetic-voice caption',
  );
  const firstTitle = await evaluate(`document.querySelector('h1').textContent`);
  await shot('listening-options');
  await click('.answer-option:has(input[value="A"])');
  await shot('listening-selected');
  await click('.question .primary');
  await click('.question .primary');
  await check(
    `document.querySelector('h1').textContent!==${JSON.stringify(firstTitle)}&&document.querySelector('.question')&&location.pathname==='/en/sets/${listening.id}'`,
    'Next leads straight to the next listening exercise, without an intermediate result',
  );
  await send('browsingContext.reload', { context, wait: 'complete' });
  await evaluate('new Promise(r=>setTimeout(r,350))');
  await check(
    `JSON.parse(localStorage.getItem('inburgering.study.v2')).active.index===1`,
    'Reload resumes the current question in a set',
  );
  await click('[data-page="writing"]');
  await click(`[data-set="${writing.id}"]`);
  await check(
    `document.querySelector('#open-answer')&&location.pathname==='/en/sets/${writing.id}'`,
    'Writing sets open in the shared practice flow',
  );
  await shot('writing-empty');
  await answer('Ik kan morgen niet komen. Kan ik vrijdag komen?');
  await mockFeedback(true);
  await click('[data-action="assess"]');
  await check(
    `document.querySelector('.feedback-error')&&document.querySelector('#open-answer').value.includes('vrijdag')`,
    'Failed feedback retains the answer and the set position',
  );
  await mockFeedback();
  await click('[data-action="assess"]');
  await check(
    `document.querySelector('.suggested-answer')?.textContent.includes('[reden]')&&document.querySelector('.answer-diff ins')`,
    'An incomplete answer still shows the suggested version with a placeholder and diff',
  );
  await check(
    `document.querySelectorAll('.criterion-detail')[1].open`,
    'Missing requirement is expanded beside the suggestion',
  );
  const calls = await evaluate('window.feedbackCalls');
  await check(
    `document.querySelector('.feedback-summary').textContent==='Two points are clear.'&&document.querySelector('#language-control [aria-label="Nederlands"]').getAttribute('href')==='/sets/${writing.id}'`,
    'The English page shows the English explanation and links to its Dutch twin',
  );
  await click('#language-control [aria-label="Nederlands"]');
  await wait(`location.pathname==='/sets/${writing.id}'`);
  await check(
    `window.feedbackCalls===${calls}&&document.querySelector('.feedback-summary').textContent==='Twee punten zijn duidelijk.'&&document.documentElement.lang==='nl'`,
    'Flags move to the Dutch address and translate the same assessment without another model call',
  );
  await shot('suggested-answer');
  await click('[data-action="finish-review"]');
  await check(
    `JSON.parse(localStorage.getItem('inburgering.study.v2')).active.index===1&&document.querySelector('#open-answer')&&location.pathname==='/sets/${writing.id}'`,
    'Review completion advances directly to the next writing exercise',
  );
  await click('[data-page="listening"]');
  await check(
    `document.querySelector('[data-set="${listening.id}"] .ring-label').textContent==='1/6'&&!document.querySelector('[data-set="${listening.id}"] .ring-done')&&document.querySelector('[data-set="${listening.id}"] .exercise-status').textContent===''`,
    'An unfinished set shows its progress in the ring alone after switching subjects',
  );
  await click(`[data-set="${listening.id}"]`);
  await check(
    `JSON.parse(localStorage.getItem('inburgering.study.v2')).active.index===1`,
    'Returning restores the listening set independently of the writing set',
  );
  for (let n = 0; n < 20 && (await evaluate(`!!document.querySelector('.question')`)); n++) {
    if (await evaluate(`!document.querySelector('.answer-feedback')`)) {
      await click('.answer-option:has(input[value="A"])');
      await click('.question .primary');
    }
    await click('.question .primary');
  }
  await check(
    `document.querySelector('h1').textContent==='Set afgerond'&&document.querySelector('[data-action="continue-practice"]').textContent==='Volgende set'`,
    'A single result appears after the complete set, with Next set as the primary action',
  );
  await check(
    `JSON.parse(localStorage.getItem('inburgering.study.v2')).active.ids.every(id=>JSON.parse(localStorage.getItem('inburgering.study.v2')).records[id]?.completed)`,
    'Closed-set completion records every exercise',
  );
  await shot('set-results');
  await click('[data-action="continue-practice"]');
  await check(
    `location.pathname==='/sets/a2-listening-02'&&document.querySelector('.question')`,
    'Next set starts directly without a catalogue detour',
  );
  await click('[data-page="writing"]');
  await click(`[data-set="${writing.id}"]`);
  await check(
    `JSON.parse(localStorage.getItem('inburgering.study.v2')).active.index===1`,
    'Writing set retains its own progress while another set is completed',
  );
  await mockFeedback();
  for (let n = 1; n < writing.ids.length; n++) {
    await answer('Ik kan morgen niet komen. Kan ik vrijdag komen?');
    await click('[data-action="assess"]');
    await click('[data-action="finish-review"]');
  }
  await check(
    `document.querySelector('h1').textContent==='Set afgerond'&&document.querySelector('[data-action="continue-practice"]').textContent==='Volgende set'`,
    'Writing finishes after the last reviewed response and offers the next set',
  );
  await send('browsingContext.reload', { context, wait: 'complete' });
  await evaluate('new Promise(r=>setTimeout(r,350))');
  await check(
    `document.querySelector('h1').textContent==='Set afgerond'`,
    'A completed set reloads its result',
  );
  await click('[data-page="writing"]');
  await wait(`!!document.querySelector('[data-set="${writing.id}"] .ring-done')`);
  await check(
    `document.querySelector('[data-set="${writing.id}"] .ring-done')&&document.querySelector('[data-set="${writing.id}"] .exercise-status').textContent===''`,
    'A completed open set shows a full ink ring and no status words',
  );
  await navigate('/exercise/A2%3Alistening%3Atandarts%3A1');
  await click('.answer-option:has(input[value="A"])');
  await click('.question .primary');
  await click('.question .primary');
  await check(
    `document.querySelector('[data-action="continue-practice"]').textContent==='Volgende oefening'`,
    'Individual links still work and offer the next exercise',
  );
  await click('[data-action="continue-practice"]');
  await check(
    `location.pathname.startsWith('/exercise/')&&document.querySelector('.question')`,
    'Standalone practice also continues without returning to the list',
  );
  await click('#theme-control [aria-label="Donker"]');
  await check(
    `getComputedStyle(document.body).backgroundColor==='rgb(36, 36, 36)'`,
    'Dark mode uses neutral charcoal',
  );
  await shot('listening-dark');
  await click('[data-page="writing"]');
  await shot('catalogue-dark');
  for (const width of [390, 320]) {
    await send('browsingContext.setViewport', { context, viewport: { width, height: 844 } });
    await settle();
    await check(
      `document.documentElement.scrollWidth<=${width}&&document.querySelectorAll('.subject-nav a').length===5&&document.querySelectorAll('#level-control a[data-choice]').length===3&&document.querySelector('.subject-nav').getBoundingClientRect().height<60&&document.querySelector('.sidebar').getBoundingClientRect().height<200`,
      'Phone layout keeps subjects in one row and levels visible at ' + width + 'px',
    );
    await check(
      `document.querySelector('.exercise-entry-copy').getBoundingClientRect().left>=14&&document.querySelector('.exercise-entry').getBoundingClientRect().left>=3`,
      'Phone list keeps its text inset and visible outer margin at ' + width + 'px',
    );
    await shot('catalogue-mobile-' + width);
    await click('.preferences-trigger');
    await check(
      `document.querySelectorAll('.preferences-popup .language-flag').length===2`,
      'Mobile preferences contain accessible flag choices at ' + width + 'px',
    );
    await click('#theme-control [aria-label="Licht"]');
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
    await evaluate('new Promise(r=>setTimeout(r,200))');
    await click('[data-page="listening"]');
    await click('[data-set="a2-listening-02"]');
    await check(
      `document.documentElement.scrollWidth<=${width}&&document.querySelector('.question')`,
      'Set exercise layout fits at ' + width + 'px',
    );
    await shot('exercise-mobile-' + width);
    await click('[data-page="writing"]');
  }
  console.log(checks.join('\n'));
  await fs.writeFile('tmp/practice-set-checks.json', JSON.stringify(checks, null, 2));
} finally {
  await send('session.end');
  ws.close();
}
