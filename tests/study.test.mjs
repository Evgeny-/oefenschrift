import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {defaults,restore,save,startSession,flatten,complete,elapsed,addElapsed,formatTime,summary,mistakes,sessionMistakes,retrySession,STORAGE_KEY} from '../app/domain/study.ts';
const catalogue=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url)));
function memory(initial={}){const values={...initial};return {getItem:k=>values[k]??null,setItem:(k,v)=>values[k]=v};}
test('migration preserves previous drafts, reviewed items and an active question session',()=>{
 const id='A2:writing:afspraak:1',old={version:1,settings:{lang:'en',level:'B1',clock:true},drafts:{[id]:'Ik kan niet komen.'},records:{[id]:{completed:true,kind:'self',at:123}},active:startSession(['B1:reading:p1:1'],'practice',catalogue,1000)};
 const s=restore(memory({'samen.study.v1':JSON.stringify(old)}),catalogue);
 assert.equal(s.version,2);assert.equal(s.settings.lang,'en');assert.equal(s.drafts[id],old.drafts[id]);assert.equal(s.records[id].kind,'self');assert.equal(s.active.startedAt,1000);
});
test('mock refuses incomplete submission, then scores and freezes its elapsed time',()=>{
 let s=defaults();s.active=startSession(['A2:listening:tandarts:1','A2:listening:buurthuis:1'],'mock',catalogue,1000);
 assert.equal(complete(s,catalogue,5000),s);
 for(const x of flatten(s.active,catalogue))s.active.answers[x.key]=x.q.answer;
 s.active.elapsedSeconds=65;
 const st=memory();save(st,s);s=restore(st,catalogue);s=complete(s,catalogue,66000);
 assert.equal(elapsed(s.active),65);assert.equal(elapsed(addElapsed(s,{setId:undefined,startedAt:1000},4).active),69);
 assert.equal(addElapsed(s,{setId:'other',startedAt:1000},4),s,'seconds never land on a different session');
 assert.equal(addElapsed(s,{itemId:'A2:writing:afspraak:1'},9).timers['A2:writing:afspraak:1'],9);
 assert.equal(restore(memory({[STORAGE_KEY]:JSON.stringify({...s,timers:{'A2:writing:afspraak:1':1789034240313}})}),catalogue).timers['A2:writing:afspraak:1'],undefined,'legacy start timestamps are dropped');assert.equal(formatTime(3661),'1:01:01');assert.equal(summary(catalogue.filter(i=>i.level==='A2'),s.records).completed,2);assert.equal(summary(catalogue.filter(i=>i.level==='B1'),s.records).completed,0);
});
test('bad storage and stale sessions cannot break the catalogue',()=>{
 assert.deepEqual(restore(memory({[STORAGE_KEY]:'broken'}),catalogue),defaults());
 const s=defaults();s.active={ids:['missing'],index:0,startedAt:2,answers:{},mode:'practice'};
 assert.equal(restore(memory({[STORAGE_KEY]:JSON.stringify(s)}),catalogue).active,null);
 assert.equal(save({setItem:()=>{throw Error('blocked');}},s),false);
 assert.throws(()=>startSession([],'mock',catalogue));
});
test('original and reviewed questions have valid answer keys and exact sample evidence',()=>{
 assert.equal(new Set(catalogue.map(i=>i.id)).size,catalogue.length);
 for(const item of catalogue){if(item.questions){for(const q of item.questions){assert.ok(q.options[q.answer]);assert.ok(q.explanation);assert.equal(Object.keys(q.options).length,3);}if(item.part==='listening'){assert.ok(item.audio);assert.ok(fs.existsSync(new URL('../demo/'+item.audio,import.meta.url)));assert.ok(item.duration>1);}}else{assert.equal(item.criteria.length,item.quotes.length);for(const quote of item.quotes)if(quote)assert.ok(item.sample.includes(quote));}}
});
test('AI completion stays distinct from answer accuracy and self review after reload',()=>{
 const s=defaults(),id='A2:writing:afspraak:1';s.records[id]={completed:true,kind:'ai',at:100};s.reviews[id]=[true,false,true];
 const st=memory();save(st,s);const restored=restore(st,catalogue);assert.equal(restored.records[id].kind,'ai');assert.equal(restored.records[id].correct,undefined);assert.deepEqual(restored.reviews[id],[true,false,true]);
});
test('theme preference persists without invalidating older saved progress',()=>{
 const st=memory(),s=defaults();s.settings.theme='dark';save(st,s);assert.equal(restore(st,catalogue).settings.theme,'dark');
 s.settings.theme='unknown';save(st,s);assert.equal(restore(st,catalogue).settings.theme,'system');
});
test('completed wrong answers survive reload and a correct retry clears the mistake',()=>{
 const item=catalogue.find(i=>i.part==='reading'&&i.questions.length>1),s=defaults();s.active=startSession([item.id],'practice',catalogue,1000);
 for(const {q,key} of flatten(s.active,catalogue))s.active.answers[key]=q.answer;
 const first=item.questions[0];s.active.answers[`${item.id}/${first.id}`]=Object.keys(first.options).find(k=>k!==first.answer);
 const done=complete(s,catalogue,2000),st=memory();save(st,done);const restored=restore(st,catalogue);
 assert.deepEqual(mistakes(item,restored.records[item.id]).map(q=>q.id),[first.id]);
 restored.active=startSession([item.id],'practice',catalogue,3000);for(const {q,key} of flatten(restored.active,catalogue))restored.active.answers[key]=q.answer;
 assert.deepEqual(mistakes(item,complete(restored,catalogue,4000).records[item.id]),[]);
});
test('question revisions remove stale mistakes but preserve aggregate completion history',()=>{
 const item=catalogue.find(i=>i.part==='reading'&&i.questions.length>1),s=defaults();s.active=startSession([item.id],'practice',catalogue,1000);
 for(const {q,key} of flatten(s.active,catalogue))s.active.answers[key]=Object.keys(q.options).find(k=>k!==q.answer);
 const done=complete(s,catalogue,2000),st=memory();save(st,done);
 const changed=structuredClone(catalogue),edited=changed.find(i=>i.id===item.id);edited.questions[0].prompt+=' Extra context.';
 const restored=restore(st,changed);
 assert.equal(restored.records[item.id].completed,true);assert.equal(restored.records[item.id].correct,0);
 assert.equal(restored.records[item.id].responses[edited.questions[0].id],undefined);
 assert.equal(mistakes(edited,restored.records[item.id]).length,item.questions.length-1);
 edited.text+=' Changed source.';assert.equal(mistakes(edited,restored.records[item.id]).length,0);
 edited.questions=edited.questions.slice(1);assert.equal(restore(st,changed).records[item.id].total,item.questions.length);
});
test('legacy aggregate scores remain visible without inventing question-level mistakes',()=>{
 const item=catalogue.find(i=>i.questions),s=defaults();s.records[item.id]={completed:true,kind:'quiz',correct:0,total:item.questions.length,at:1};
 const restored=restore(memory({[STORAGE_KEY]:JSON.stringify(s)}),catalogue);
 assert.equal(restored.records[item.id].correct,0);assert.equal(restored.records[item.id].completed,true);assert.deepEqual(mistakes(item,restored.records[item.id]),[]);
});
test('KNM practice sets use KNM labels and can combine content target levels',()=>{
 const base=catalogue.find(i=>i.questions),knm=[{...base,id:'knm:a',part:'knm',level:'A2'},{...base,id:'knm:b',part:'knm',level:'B1'}];
 const session=startSession(knm.map(i=>i.id),'mock',knm,1000);assert.equal(session.level,'KNM');
 const s=defaults();s.settings.level='B2';s.active=session;
 assert.equal(restore(memory({[STORAGE_KEY]:JSON.stringify(s)}),knm).active.level,'KNM');
 assert.throws(()=>startSession([base.id,knm[0].id],'mock',[base,...knm]));
});
test('a focused retry narrows the questions, keeps the set link and preserves the first result',()=>{
 const set=JSON.parse(fs.readFileSync(new URL('../content/practice-sets.json',import.meta.url))).find(set=>set.id==='a2-listening-01');
 let s=defaults();s.active={...startSession(set.ids,'practice',catalogue,1000),setId:set.id};
 const all=flatten(s.active,catalogue);
 for(const x of all)s.active.answers[x.key]=x.q.answer;
 const wrong=all.slice(0,2);for(const x of wrong)s.active.answers[x.key]=Object.keys(x.q.options).find(k=>k!==x.q.answer);
 s=complete(s,catalogue,5000);
 assert.deepEqual(sessionMistakes(s.active,catalogue),wrong.map(x=>x.key));
 const retry=retrySession(s.active,catalogue,9000);
 assert.equal(retry.setId,set.id);assert.deepEqual(retry.ids,set.ids);assert.deepEqual(retry.questions,wrong.map(x=>x.key));
 assert.equal(flatten(retry,catalogue).length,2);
 const st=memory();save(st,{...s,active:retry});const restored=restore(st,catalogue);
 assert.deepEqual(restored.active.questions,retry.questions);
 let t={...restored};for(const x of flatten(t.active,catalogue))t.active.answers[x.key]=x.q.answer;
 t=complete(t,catalogue,12000);
 const first=wrong[0].item.id;
 assert.equal(t.records[first].correct,s.records[first].correct,'the first score stays');
 assert.equal(t.records[first].at,5000);
 assert.equal(mistakes(wrong[0].item,t.records[first]).length,0,'the retried answer clears the saved mistake');
 assert.equal(restore(memory({[STORAGE_KEY]:JSON.stringify({...t,active:{...retry,questions:['missing/q9']}})}),catalogue).active,null,'unknown question keys invalidate a session');
});
