import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const origin = process.env.TEST_ORIGIN;
assert.ok(origin, 'Use npm run test:production to start an isolated server.');
const checks = [], errors = [];
const bank = JSON.parse(await fs.readFile('content/catalogue.json', 'utf8'));
const exercisePath = '/exercise/' + encodeURIComponent(bank.find(item => item.part === 'speaking').id);
for (const [path, expected] of [['/reading',200],['/sets/a2-listening-01',200],[exercisePath,200],['/missing-page',404],['/missing.js',404],['/config/services.json',404],['/ops/login',200],['/admin',404]]) {
  const response = await fetch(origin + path);
  assert.equal(response.status, expected, path);
  assert.ok(response.headers.get('cache-control')?.includes('no-store'));
  if (path === '/reading') {
    const html = await response.text(), csp = response.headers.get('content-security-policy');
    const nonce = csp.match(/'nonce-([^']+)'/)?.[1];
    assert.ok(nonce && !csp.includes("script-src 'self' 'unsafe-inline'"));
    for (const [,attributes] of html.matchAll(/<script\b([^>]*)>/g)) {
      if (!attributes.includes('src=')) assert.ok(attributes.includes(`nonce="${nonce}"`), 'Every streamed inline script must carry the response nonce');
    }
    assert.ok(!html.includes('/@vite/client'));
    checks.push('Production streaming scripts all carry their CSP nonce');
  }
  checks.push(`${path}: ${expected} with cache prevention`);
}
const plainHTML=html=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
for(const part of ['reading','listening','writing','speaking','knm']){
  const item=bank.find(item=>item.part===part),path='/exercise/'+encodeURIComponent(item.id);
  const html=plainHTML(await fetch(origin+path).then(r=>r.text()));
  assert.ok(html.includes('<h1')&&html.includes(item.title),part+' has a server-rendered title');
  assert.ok(html.includes(item.questions?'class="question question-sheet"':'class="task-brief sheet"'),part+' has its actual task before JavaScript');
  assert.ok(html.includes('rel="canonical"')&&html.includes('<meta name="description"'));
  assert.equal((html.match(/<title>/g)||[]).length,1);
  assert.ok(!html.includes('class="loading-app"'));
  checks.push(part+': task content and unique metadata are present in server HTML');
}
const preferences=encodeURIComponent(JSON.stringify({level:'B1',lang:'en',theme:'dark',clock:false}));
const personalized=plainHTML(await fetch(origin+'/reading',{headers:{Cookie:'inburgering_preferences='+preferences}}).then(r=>r.text()));
assert.ok(personalized.includes('<html lang="en" data-theme="dark"')&&personalized.includes('B1 · '));
checks.push('Server HTML respects saved language, level and explicit theme');
const shared=plainHTML(await fetch(origin+'/a2/reading',{headers:{Cookie:'inburgering_preferences='+preferences}}).then(r=>r.text()));
assert.ok(shared.includes('A2 · ')&&!shared.includes('B1 · '));
assert.ok(shared.includes(`<link rel="canonical" href="${origin}/a2/reading"`)&&shared.includes('A2 Lezen oefenen'));
assert.ok(shared.includes('property="og:title"')&&shared.includes('name="twitter:card"'));
checks.push('Shared level URL overrides conflicting preferences in the server content and metadata');
for(const [path,status,target] of [['/reading',307,'/a2/reading'],['/B1/reading/',308,'/b1/reading'],['/c1/reading',404,null],['/b1/knm',404,null]]){
  const response=await fetch(origin+path,{redirect:'manual'});assert.equal(response.status,status,path);
  if(target)assert.equal(response.headers.get('location'),target);
}
checks.push('Legacy and noncanonical paths redirect; unsupported levels return 404');
const empty=plainHTML(await fetch(origin+'/b2/reading').then(r=>r.text()));
assert.ok(empty.includes('content="noindex, follow"'));
const privatePage=plainHTML(await fetch(origin+'/b1/progress').then(r=>r.text()));
assert.ok(privatePage.includes('content="noindex, follow"'));
checks.push('Empty B2 and private progress pages request noindex');
const sitemap=await fetch(origin+'/sitemap.xml').then(r=>r.text());
assert.equal((sitemap.match(/\/exercise\//g)||[]).length,bank.length);
assert.ok(sitemap.includes('/a2/reading')&&sitemap.includes('/b1/reading')&&!sitemap.includes('/b2/'));
checks.push('Sitemap exposes every available stable exercise URL');

const ws = new WebSocket(`ws://127.0.0.1:${process.env.FIREFOX_BIDI_PORT}/session`);
await new Promise((resolve,reject) => { ws.onopen=resolve; ws.onerror=reject; });
let id = 0, context; const pending = new Map(),blocked=[];
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (pending.has(message.id)) {
    const {resolve,reject} = pending.get(message.id); pending.delete(message.id);
    message.type === 'error' ? reject(new Error(message.message)) : resolve(message.result);
  } else if (message.method === 'log.entryAdded' && message.params.level === 'error' && message.params.source?.context === context) errors.push(message.params.text);
  else if(message.method==='network.beforeRequestSent'&&message.params.isBlocked)blocked.push(message.params.request.request);
};
const send = (method,params={}) => new Promise((resolve,reject) => { const current=++id; pending.set(current,{resolve,reject}); ws.send(JSON.stringify({id:current,method,params})); });
await send('session.new', {capabilities:{}});
try {
  ({context} = await send('browsingContext.create', {type:'tab'}));
  await send('session.subscribe', {events:['log.entryAdded','network.beforeRequestSent']});
  const evaluate = async expression => {
    const result = await send('script.evaluate', {expression,target:{context},awaitPromise:true});
    assert.notEqual(result.type,'exception','Browser evaluation failed: '+result.exceptionDetails?.text);
    return result.result?.value;
  };
  const ready = selector => evaluate(`new Promise((resolve,reject)=>{const end=Date.now()+7000;const check=()=>document.querySelector(${JSON.stringify(selector)})?resolve(true):Date.now()>end?reject(Error('Expected control missing')):setTimeout(check,50);check();})`);
  const clientEntry=(await fs.readdir('build/client/assets')).find(file=>file.startsWith('entry.client-')&&file.endsWith('.js'));
  assert.ok(clientEntry,'Production client entry exists');
  const {intercept}=await send('network.addIntercept',{phases:['beforeRequestSent'],contexts:[context],urlPatterns:[{type:'string',pattern:origin+'/assets/'+clientEntry}]});
  await send('browsingContext.navigate', {context,url:origin+'/sets/a2-listening-01',wait:'none'});
  await ready('.audio-player');await evaluate('document.fonts.ready.then(()=>true)');
  assert.notEqual(await evaluate(`document.querySelector('.app-shell').dataset.hydrated`),'true');
  const geometry=()=>evaluate(`JSON.stringify(['.wordmark','h1','.audio-player','.question','.exercise-meta'].map(selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {selector,x:r.x,y:r.y,width:r.width,height:r.height}}))`);
  const before=JSON.parse(await geometry());checks.push('Listening content is visible while the client entry is blocked');
  await send('network.removeIntercept',{intercept});
  for(const request of blocked)await send('network.continueRequest',{request});
  await ready('.app-shell[data-hydrated]');
  const after=JSON.parse(await geometry());
  for(let i=0;i<before.length;i++)for(const key of ['x','y','width','height'])assert.ok(Math.abs(before[i][key]-after[i][key])<1,`${before[i].selector} ${key} shifted during hydration`);
  checks.push('Exercise and sidebar geometry stay unchanged through hydration');
  await send('browsingContext.navigate', {context,url:origin+'/reading',wait:'complete'});
  await ready('.app-shell[data-hydrated]'); checks.push('Compiled app hydrates under the production CSP');
  await evaluate(`document.querySelector('[data-page="listening"]').click();true;`);
  await ready('[data-set="a2-listening-01"]'); checks.push('Client navigation loads the next subject');
  await evaluate(`document.querySelector('[data-set="a2-listening-01"]').click();true;`);
  await ready('.audio-player'); checks.push('Set link opens the listening workspace');
  await send('browsingContext.reload', {context,wait:'complete'});
  await ready('.question'); checks.push('Direct set reload restores practice');
  await send('browsingContext.navigate', {context,url:origin+'/ops/exercises',wait:'complete'});
  await ready('#admin-user'); checks.push('Compiled administration asks for a login');
  await evaluate(`(()=>{document.querySelector('#admin-user').value='browser-test';document.querySelector('#admin-password').value='browser-test-password';document.querySelector('.admin-login-form .primary').click();})();true;`);
  await ready('.admin-search'); checks.push('Compiled administration hydrates after signing in');
  assert.deepEqual(errors, []);
  console.log(checks.join('\n'));
  await fs.writeFile('tmp/production-checks.json', JSON.stringify({checks,errors},null,2));
} finally { await send('session.end'); ws.close(); }
