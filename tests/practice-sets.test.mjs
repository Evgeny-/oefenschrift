import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {defaults,startSession,flatten,complete,reviewOpen,restore,STORAGE_KEY,matchesSet,savedSetSession,keepSetSessions} from '../app/domain/study.ts';
import {routePath,readRoute,sessionRoute} from '../app/domain/routes.ts';
const catalogue=JSON.parse(fs.readFileSync(new URL('../content/catalogue.json',import.meta.url)));
const sets=JSON.parse(fs.readFileSync(new URL('../content/practice-sets.json',import.meta.url)));
const make=set=>({...startSession(set.ids,'practice',catalogue,1000),setId:set.id});
const restoreState=state=>restore({getItem:key=>key===STORAGE_KEY?JSON.stringify(state):null},catalogue);
test('stable practice sets cover each exercise exactly once with no mixed subjects or levels',()=>{
 const ids=sets.flatMap(set=>set.ids);assert.equal(new Set(ids).size,catalogue.length);assert.equal(ids.length,catalogue.length);
 for(const set of sets){assert.ok(set.ids.length>=3&&set.ids.length<=5);for(const id of set.ids){const item=catalogue.find(i=>i.id===id);assert.equal(item.part,set.part);if(item.part!=='knm')assert.equal(item.level,set.level);}}
});
test('closed sets retain all questions until the final result and survive a reload',()=>{
 const set=sets.find(s=>s.part==='listening'&&s.level==='A2');let state={...defaults(),active:make(set)};
 const questions=flatten(state.active,catalogue);assert.ok(questions.length>1);
 for(let n=0;n<questions.length-1;n++){const {key,q}=questions[n];state.active.answers[key]=q.answer;state.active.checked[key]=true;state.active.index=n;}
 state=restoreState(state);assert.ok(matchesSet(state.active,set));assert.equal(complete(state,catalogue),state);
 const last=questions.at(-1);state.active.answers[last.key]=last.q.answer;state=complete(state,catalogue,9000);
 assert.equal(state.active.endedAt,9000);for(const id of set.ids)assert.equal(state.records[id].completed,true);
 assert.equal(routePath(sessionRoute(state.active)),`/sets/${set.id}`);assert.equal(readRoute(new URL(`http://localhost/sets/${set.id}`)),`set/${set.id}`);
});
test('open sets advance after review, keep drafts, and finish only after the last exercise',()=>{
 const set=sets.find(s=>s.part==='writing'&&s.level==='A2');let state={...defaults(),active:make(set)};
 assert.equal(complete(state,catalogue),state);
 state.drafts[set.ids[0]]='Mijn antwoord.';state=reviewOpen(state,set.ids[0],'ai',true,2000);assert.equal(state.active.index,1);assert.equal(state.active.endedAt,null);
 state=restoreState(state);assert.equal(state.drafts[set.ids[0]],'Mijn antwoord.');assert.equal(state.records[set.ids[0]].kind,'ai');
 for(let n=1;n<set.ids.length;n++)state=reviewOpen(state,set.ids[n],'self',true,3000+n);
 assert.ok(state.active.endedAt);assert.equal(state.active.index,set.ids.length-1);assert.ok(set.ids.every(id=>state.records[id].completed));
});
test('switching subjects preserves each unfinished set independently',()=>{
 const reading=sets.find(s=>s.part==='reading'),writing=sets.find(s=>s.part==='writing');
 let state={...defaults(),active:make(reading)};const answer=flatten(state.active,catalogue)[0];state.active.answers[answer.key]='A';
 state=keepSetSessions(state,{...state,active:make(writing)});state=keepSetSessions(state,reviewOpen(state,writing.ids[0],'ai',true,4000));
 state=restoreState(state);assert.equal(savedSetSession(state,reading).answers[answer.key],'A');assert.equal(savedSetSession(state,writing).index,1);
 assert.equal(savedSetSession(state,{...reading,ids:reading.ids.slice(1)}),null);
});
