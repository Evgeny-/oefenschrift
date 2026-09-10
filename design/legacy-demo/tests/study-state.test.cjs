const test=require('node:test');
const assert=require('node:assert/strict');
const state=require('../demo/state.js');
test('local progress survives a new read, with levels kept separate',()=>{
  let value=null;const storage={getItem:()=>value,setItem:(_,v)=>value=v};
  const s=state.defaults();s.settings.lang='en';s.settings.level='B1';
  s.records['A2:reading:p1']={completed:true,score:1,total:2};
  assert.equal(state.save(storage,s),true);
  const restored=state.read(storage);
  assert.equal(restored.settings.lang,'en');
  assert.deepEqual(state.summary([{id:'B1:reading:p1'}],restored.records),{total:1,completed:0});
  assert.deepEqual(state.summary([{id:'A2:reading:p1'}],restored.records),{total:1,completed:1});
});
test('corrupt or blocked storage stays usable without claiming a successful save',()=>{
  assert.equal(state.read({getItem:()=>'{bad'}).settings.level,'A2');
  assert.equal(state.read({getItem:()=>'{"version":1,"settings":{"level":"C9"}}'}).settings.level,'A2');
  assert.equal(state.save({setItem:()=>{throw Error('quota');}},state.defaults()),false);
});
test('elapsed timer survives reload and stops at submission, without wrapping at an hour',()=>{
  const restored=JSON.parse(JSON.stringify({startedAt:1000}));
  assert.equal(state.elapsed(restored,61000),60);
  assert.equal(state.formatTime(3661),'1:01:01');
  assert.equal(state.elapsed({...restored,endedAt:61000},200000),60);
  assert.equal(state.elapsed({startedAt:5000},1000),0);
});
