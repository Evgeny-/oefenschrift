const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..', 'demo');

// Exercise the application and persistence. Base UI's native interactions are
// checked in Firefox; this small bridge lets these tests change its inputs.
function boot(saved) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), {
    url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true
  });
  const w=dom.window, controls=new Map();
  w.HTMLElement.prototype.scrollIntoView=function() {};
  w.HTMLMediaElement.prototype.pause=function() {};
  w.SamenControls={mount(el,kind,props){controls.set(el.id,props);},releaseWithin(){}};
  if(saved) w.localStorage.setItem('samen.study.v1',saved);
  for(const file of ['state.js','data.js','app.js']) w.eval(fs.readFileSync(path.join(root,file),'utf8'));
  const q=selector=>w.document.querySelector(selector);
  const click=selector=>{assert.ok(q(selector),selector);q(selector).click();};
  const answer=value=>{const input=q(`input[name="answer"][value="${value}"]`);input.checked=true;input.dispatchEvent(new w.Event('change',{bubbles:true}));};
  return {w,q,click,answer,controls,save:()=>w.localStorage.getItem('samen.study.v1'),state:()=>JSON.parse(w.localStorage.getItem('samen.study.v1')),close:()=>w.close()};
}

test('a test resumes after reload, with answers and elapsed time, then stops on submission', () => {
  let app=boot();
  try {
    app.click('[data-page="mock"]');
    app.controls.get('mock-part').onChange('listening');
    app.controls.get('mock-clock').onChange(true);
    app.click('[data-action="start-mock"]');
    assert.equal(app.q('.transcript'), null, 'test mode does not expose transcript');
    app.answer('A');app.click('[data-action="next"]');
    const saved=app.state(); saved.active.startedAt=Date.now()-65000;
    app.close();app=boot(JSON.stringify(saved));
    assert.match(app.q('.question-progress').textContent, /2 \/ 2/);
    assert.match(app.q('#elapsed').textContent, /1:0[5-9]/);
    app.answer('B');app.click('[data-action="next"]');
    assert.equal(app.state().records['A2:listening:tandarts:1'].correct,1);
    assert.equal(app.state().records['A2:listening:buurthuis:1'].correct,1);
    const active=app.state().active;
    assert.ok(active.endedAt);
    assert.equal(app.w.SamenState.elapsed(active,Date.now()+60000),app.w.SamenState.elapsed(active));
    app.click('[data-page="progress"]');
    assert.match(app.q('.progress-total').textContent,/2 \/ 10/);
    app.controls.get('level-control').onChange('B1');
    assert.match(app.q('.progress-total').textContent,/0 \/ 3/);
  } finally {app.close();}
});

test('writing drafts survive translation and reload; custom answers receive self-review, not a fabricated grade', () => {
  let app=boot();
  try {
    app.click('[data-page="writing"]');
    app.click('[data-item="A2:writing:afspraak:1"]');
    app.q('#open-answer').value='Beste buurvrouw, vrijdag kan ik wel.';
    app.q('#open-answer').dispatchEvent(new app.w.Event('input',{bubbles:true}));
    app.controls.get('language-control').onChange('en');
    assert.equal(app.q('#open-answer').value,'Beste buurvrouw, vrijdag kan ik wel.');
    const saved=app.save();app.close();app=boot(saved);
    app.click('[data-page="writing"]');app.click('[data-item="A2:writing:afspraak:1"]');
    assert.equal(app.q('#open-answer').value,'Beste buurvrouw, vrijdag kan ik wel.');
    app.click('[data-action="feedback"]');
    assert.equal(app.w.document.querySelectorAll('.self-check').length,3);
    assert.match(app.q('.st-evaluation').textContent,/does not assess your text automatically/);
    app.click('[data-action="reviewed"]');
    assert.equal(app.state().records['A2:writing:afspraak:1'].kind,'self');
    assert.equal(app.state().records['A2:writing:afspraak:1'].correct,undefined);
  } finally {app.close();}
});

test('B1 uses its own questions, requires an answer, and supports passages longer than two questions', () => {
  const app=boot();
  try {
    app.controls.get('level-control').onChange('B1');
    const id=app.w.SamenData.find(i=>i.level==='B1').id;
    app.click(`[data-item="${id}"]`);
    assert.ok(app.q('[data-action="check"]').disabled);
    const item=app.w.SamenData.find(i=>i.id===id);
    for(const question of item.questions) {
      app.answer(question.answer);app.click('[data-action="check"]');app.click('[data-action="next"]');
    }
    assert.equal(app.state().records[id].total,3);
    assert.equal(app.state().records[id].correct,3);
    app.controls.get('level-control').onChange('B2');
    assert.match(app.q('.st-empty').textContent,/Nog geen oefeningen/);
  } finally {app.close();}
});
