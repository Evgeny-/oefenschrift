// RMS energy across equal time windows. Square channels separately so stereo
// signals with opposite phase cannot cancel each other out in the preview.
export function waveformPeaks(channels,bars=64) {
  const length=channels[0]?.length||0,count=Math.min(bars,length);
  if(!count)return [];
  const energy=Array.from({length:count},(_,bar)=>{
    const start=Math.floor(bar*length/count),end=Math.floor((bar+1)*length/count);
    let sum=0;
    for(const channel of channels)for(let i=start;i<end;i++)sum+=channel[i]*channel[i];
    return Math.sqrt(sum/((end-start)*channels.length));
  });
  const maximum=Math.max(...energy);
  return energy.map(value=>maximum?value/maximum:0);
}

export async function analyseRecording(blob) {
  const context=new OfflineAudioContext(1,1,22050);
  const decoded=await context.decodeAudioData(await blob.arrayBuffer());
  const channels=Array.from({length:decoded.numberOfChannels},(_,i)=>decoded.getChannelData(i));
  return {duration:decoded.duration,peaks:waveformPeaks(channels)};
}
