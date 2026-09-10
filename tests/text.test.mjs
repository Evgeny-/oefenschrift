import test from 'node:test';
import assert from 'node:assert/strict';
import {wordDiff,highlightParts,evidenceFor} from '../app/domain/text.ts';
test('diff preserves exact before and after text including punctuation and accents',()=>{
  for(const [before,after] of [['Ik kan morgen.','Ik kan morgen niet komen.'],['Eén fiets\nIk bel!','Twee fietsen\nIk bel morgen!'],['','Hallo.'],['Hallo.',''],['ongewijzigd','ongewijzigd']]){
    const diff=wordDiff(before,after);
    assert.equal(diff.filter(x=>x.type!=='add').map(x=>x.text).join(''),before);
    assert.equal(diff.filter(x=>x.type!=='remove').map(x=>x.text).join(''),after);
  }
});
test('evidence matches exact source spans, merges overlap, never guesses a missing quote',()=>{
  const text='Kom donderdag. Morgen is de winkel dicht.';
  assert.deepEqual(highlightParts(text,['donderdag.','Kom donderdag.','missing']).filter(x=>x.marked).map(x=>x.text),['Kom donderdag.']);
  assert.equal(highlightParts(text,['missing']).map(x=>x.text).join(''),text);
  assert.deepEqual(evidenceFor({text},{evidence:'Friday'}),[]);
});
