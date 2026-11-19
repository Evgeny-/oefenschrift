import fs from 'node:fs/promises';
// A learner saw a form task whose answer lines spilled out of the brief and over the answer
// field. The form grid sized its label column to the longest label on one line, so a label that
// is a whole question ("Wilt u met een collega meerijden? Zo ja, waar kan de collega u
// ophalen?") left the line column only one word wide, with every choice on its own line. This
// test opens every form task at desktop, tablet and phone widths and proves the labels and lines
// stay inside the brief with room to write.
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
async function evaluate(expression) {
  const r = await send('script.evaluate', { expression, target: { context }, awaitPromise: true });
  if (r.type === 'exception') throw Error(JSON.stringify(r));
  return r.result?.value;
}
async function wait(expression) {
  await evaluate(
    `new Promise((resolve,reject)=>{const end=Date.now()+7000;const poll=()=>(${expression})?resolve(true):Date.now()>end?reject(new Error('Expected UI did not appear: '+${JSON.stringify(expression)})):setTimeout(poll,40);poll();})`,
  );
}
async function shot(name) {
  const clip = JSON.parse(
    await evaluate(
      `JSON.stringify((()=>{const r=document.querySelector('.exercise-columns').getBoundingClientRect();return {type:'box',x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};})())`,
    ),
  );
  const r = await send('browsingContext.captureScreenshot', { context, origin: 'document', clip });
  await fs.writeFile('tmp/forms-' + name + '.png', Buffer.from(r.data, 'base64'));
}

const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const forms = bank.filter((item) => Array.isArray(item.formFields));
if (!forms.length) throw Error('No form tasks in the catalogue for the form layout test.');
const longest = (item) => Math.max(...item.formFields.map((f) => f.label.length));
const byLabel = [...forms].sort((a, b) => longest(b) - longest(a));
// Screenshots: the longest label overall, and the longest among forms with a choice row, whose
// options were squeezed one word per line.
const pictured = new Map([
  [byLabel[0], 'label'],
  [byLabel.find((item) => item.formFields.some((f) => Array.isArray(f.options))), 'choice'],
]);
const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'single-column', width: 1000, height: 900 },
  { name: 'phone', width: 390, height: 844 },
  { name: 'small-phone', width: 320, height: 640 },
];

// Every label and line sits inside the brief's content box, every line keeps at least 30% of the
// form's width, and the page itself never scrolls sideways.
const measure = `(()=>{
  const brief=document.querySelector('.task-brief'),grid=document.querySelector('.form-fields');
  const b=brief.getBoundingClientRect(),inner=b.right-parseFloat(getComputedStyle(brief).paddingRight);
  const g=grid.getBoundingClientRect();
  const cells=[...grid.children].map(c=>c.getBoundingClientRect());
  const lines=[...grid.querySelectorAll('dd')].map(d=>d.getBoundingClientRect().width);
  return JSON.stringify({
    inside:g.right<=inner+0.5&&cells.every(c=>c.right<=inner+0.5&&c.left>=b.left),
    narrowest:Math.min(...lines)/g.width,
    pageScroll:document.documentElement.scrollWidth-document.documentElement.clientWidth,
  });
})()`;

const failures = [];
let checked = 0;
try {
  for (const viewport of viewports) {
    await send('browsingContext.setViewport', {
      context,
      viewport: { width: viewport.width, height: viewport.height },
    });
    for (const item of forms) {
      await send('browsingContext.navigate', {
        context,
        url: origin + '/en/exercise/' + encodeURIComponent(item.id),
        wait: 'complete',
      });
      await wait(`document.querySelector('.task-brief .form-fields dd')`);
      const m = JSON.parse(await evaluate(measure));
      const where = `${item.id} at ${viewport.width}px`;
      if (!m.inside) failures.push(`${where}: form fields leave the brief`);
      if (m.narrowest < 0.3)
        failures.push(`${where}: an answer line is ${Math.round(m.narrowest * 100)}% of the form`);
      if (m.pageScroll > 0) failures.push(`${where}: page scrolls sideways by ${m.pageScroll}px`);
      checked++;
      if (pictured.has(item)) await shot(`${pictured.get(item)}-${viewport.name}`);
    }
  }
  if (failures.length) throw Error('Form layout failures:\n - ' + failures.join('\n - '));
  console.log(
    `form layout checks passed: ${forms.length} form tasks at ${viewports.length} widths (${checked} views) keep labels and lines inside the brief; screenshots of ${[...pictured.keys()].map((item) => item.id).join(' and ')} in tmp/forms-*.png`,
  );
} finally {
  await send('session.end');
  ws.close();
}
