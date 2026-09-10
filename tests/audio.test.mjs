import test from 'node:test';
import assert from 'node:assert/strict';
import {waveformPeaks} from '../app/domain/audio.ts';

test('waveform retains pauses, relative loudness and the final audio samples',()=>{
  const peaks=waveformPeaks([Float32Array.from([0,0,.25,-.25,0,0,1])],3);
  assert.equal(peaks[0],0);
  assert.ok(peaks[1]>0&&peaks[1]<peaks[2]);
  assert.equal(peaks[2],1);
  assert.deepEqual(waveformPeaks([new Float32Array(120)],64),Array(64).fill(0));
  assert.deepEqual(waveformPeaks([],64),[]);
});

test('opposite stereo phase preserves the same energy as mono',()=>{
  const left=Float32Array.from([.1,-.1,0,0,.8,-.8]),right=left.map(value=>-value);
  assert.deepEqual(waveformPeaks([left,right],3),waveformPeaks([left],3));
  assert.equal(waveformPeaks([left],64).length,left.length);
});
