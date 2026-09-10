import React,{useEffect,useRef,useState} from 'react';
import {EvidenceText} from './TextEvidence';
import {Segments,PlayIcon} from './Controls';
import {formatTime} from '../domain/study';
export function AudioPlayback({src,peaks=[],knownDuration=0,t,label,caption=undefined,suspended=false}) {
  const audio=useRef<HTMLAudioElement>(null);
  const [playing,setPlaying]=useState(false),[time,setTime]=useState(0),[mediaDuration,setMediaDuration]=useState(0),[rate,setRate]=useState(1),[error,setError]=useState(false);
  // Some MediaRecorder containers have no duration metadata. The decoded audio
  // supplies a finite duration without changing the recording used for playback.
  const duration=mediaDuration||(Number.isFinite(knownDuration)&&knownDuration>0?knownDuration:0);
  const updateDuration=()=>{const value=audio.current.duration;if(Number.isFinite(value)&&value>0)setMediaDuration(value);};
  useEffect(()=>{const el=audio.current;return ()=>el?.pause();},[]);
  useEffect(()=>{if(suspended)audio.current?.pause();},[suspended]);
  const play=async()=>{
    try{const el=audio.current;if(el.paused){if(el.error)el.load();await el.play();}else el.pause();setError(false);}catch{setError(true);}
  };
  function seek(value){try{audio.current.currentTime=value;setTime(value);}catch{setError(true);}}
  return <div className="audio-player" role="group" aria-label={label}>
    <audio ref={audio} src={src} preload="metadata" onLoadedMetadata={updateDuration} onDurationChange={updateDuration} onTimeUpdate={()=>setTime(audio.current.currentTime)} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onError={()=>setError(true)}/>
    <div className="audio-main"><button className="play-button" onClick={play} disabled={suspended} aria-label={playing?t('Pauzeren','Pause'):t('Afspelen','Play')}><PlayIcon playing={playing}/></button>
      <div className={`waveform ${peaks.length?'':'waveform-timeline'}`}><div className="waveform-bars" aria-hidden="true">{peaks.map((peak,i)=><i key={i} className={duration&&i/peaks.length<time/duration?'heard':''} style={{height:`${Math.max(4,peak*100)}%`}}/>)}</div><input type="range" className="audio-seek" min="0" max={duration||1} step=".1" value={duration?Math.min(time,duration):0} disabled={!duration||suspended} onChange={e=>seek(Number(e.target.value))} aria-label={t('Afspeelpositie','Playback position')} aria-valuetext={`${formatTime(time)} / ${duration?formatTime(duration):'—:—'}`}/></div>
    </div>
    <div className="audio-meta"><span className="audio-time">{formatTime(time)} / {duration?formatTime(duration):'—:—'}</span><Segments id="audio-speed" compact hideLabel label={t('Snelheid','Speed')} value={rate} options={[.75,1,1.25].map(value=>({value,label:`${value}×`}))} onChange={value=>{setRate(value);audio.current.playbackRate=value;}}/></div>
    {caption&&<p className="small audio-caption">{caption}</p>}
    {error&&<p className="feedback-error" role="alert">{t('Afspelen lukt niet. Probeer het opnieuw.','Playback failed. Try again.')}</p>}
  </div>;
}
export default function AudioPlayer({item,t,transcript=true,evidence=[]}) {
  return <div>
    <AudioPlayback key={item.audio} src={`/${item.audio.replace(/^\//,'')}`} peaks={item.peaks} knownDuration={item.duration} t={t} label={t('Luisterfragment','Listening audio')}/>
    {transcript&&<details className="transcript" open={evidence.length?true:undefined}><summary>{t('Bekijk transcript','View transcript')}</summary><p lang="nl"><EvidenceText text={item.text} quotes={evidence}/></p></details>}
  </div>;
}
