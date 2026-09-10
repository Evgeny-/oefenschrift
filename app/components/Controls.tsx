import React,{useId} from 'react';
import {RadioGroup} from '@base-ui/react/radio-group';
import {Radio} from '@base-ui/react/radio';
import {Popover} from '@base-ui/react/popover';
import {Switch} from '@base-ui/react/switch';
import useSelectionIndicator from './useSelectionIndicator';
import {useStudyContext} from '../StudyContext';

export function Segments({label,value,options,onChange,compact=false,id=undefined,hideLabel=false}) {
  const labelId=useId(),indicator=useSelectionIndicator(value);
  return <div className={`segment-field ${compact?'compact':''}`} id={id}>
    <span id={labelId} className={hideLabel?'sr-only':'control-label'}>{label}</span>
    <RadioGroup ref={indicator.ref} aria-labelledby={labelId} className="segments" data-positioned={indicator.positioned||undefined} data-animated={indicator.animated||undefined} value={value} onValueChange={onChange}>
      <span className="selection-indicator" aria-hidden="true" style={indicator.style}/>
      {options.map(option=><Radio.Root className="segment" data-choice={option.value} key={option.value} value={option.value} aria-label={option.ariaLabel||option.label} title={option.ariaLabel}>{option.label}</Radio.Root>)}
    </RadioGroup>
  </div>;
}
export function Toggle({label,checked,onChange}) {
  return <label className="toggle-label"><Switch.Root className="toggle" checked={checked} onCheckedChange={onChange}><Switch.Thumb className="toggle-thumb"/></Switch.Root><span>{label}</span></label>;
}
export function ThemeIcon({theme}){
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{theme==='light'?<><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></>:theme==='dark'?<path d="M20.7 14.5A9 9 0 0 1 9.5 3.3 9 9 0 1 0 20.7 14.5Z"/>:<><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></>}</svg>;
}
function InfoPopover({label,title,children}){
  const {t}=useStudyContext();
  return <Popover.Root><Popover.Trigger className="info-trigger" openOnHover delay={150} closeDelay={200} aria-label={label}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".5" fill="currentColor"/></svg></Popover.Trigger><Popover.Portal><Popover.Positioner side="top" sideOffset={8}><Popover.Popup className="info-popup"><Popover.Title className="sr-only">{title}</Popover.Title><Popover.Description>{children}</Popover.Description><a href="/privacy" target="_blank" rel="noreferrer">{t('Privacy bekijken','Read privacy notice')}</a></Popover.Popup></Popover.Positioner></Popover.Portal></Popover.Root>;
}
export function FeedbackInfo(){
  const {t}=useStudyContext();
  return <InfoPopover label={t('Over AI-feedback en privacy','About AI feedback and privacy')} title={t('Over AI-feedback','About AI feedback')}>{t('Je antwoord wordt naar een AI-dienst gestuurd voor oefenfeedback. Dit is geen examencijfer.','Your answer is sent to an AI service for practice feedback. This is not an exam score.')}</InfoPopover>;
}
export function RecordingInfo(){
  const {t}=useStudyContext();
  return <InfoPopover label={t('Over opnemen en privacy','About recording and privacy')} title={t('Je opname','Your recording')}>{t('Na het stoppen wordt je audio naar een externe dienst gestuurd voor spraakherkenning. Maximaal 2 minuten en 6 MB. Je kunt het transcript daarna aanpassen.','Stopping the recording sends your audio to an external transcription service. Up to 2 minutes and 6 MB. You can edit the transcript afterwards.')}</InfoPopover>;
}
export function LanguageFlag({language}){
  const clip=useId();
  return <svg className="language-flag" width="24" height="24" viewBox="0 0 30 30" aria-hidden="true"><defs><clipPath id={clip}><circle cx="15" cy="15" r="14"/></clipPath></defs><g clipPath={`url(#${clip})`}>{language==='nl'?<><path fill="#ae1c28" d="M0 0h30v10H0z"/><path fill="#fff" d="M0 10h30v10H0z"/><path fill="#21468b" d="M0 20h30v10H0z"/></>:<><path fill="#012169" d="M0 0h30v30H0z"/><path stroke="#fff" strokeWidth="6" d="m-15 0 60 30m0-30-60 30"/><path stroke="#c8102e" strokeWidth="2" d="m-15 0 60 30m0-30-60 30"/><path stroke="#fff" strokeWidth="10" d="M15 0v30M0 15h30"/><path stroke="#c8102e" strokeWidth="6" d="M15 0v30M0 15h30"/></>}</g><circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" strokeOpacity=".15"/></svg>;
}
// Single-weight glyphs beside the navigation labels. Each carries one small motion
// that plays when its section becomes current (see the nav-icon rules in styles.css).
const navGlyphs={
  reading:<><path className="book-left" d="M12 7.3C10.4 6 8.2 5.5 5 5.7v12.2c3.2-.2 5.4.3 7 1.6"/><path className="book-right" d="M12 7.3c1.6-1.3 3.8-1.8 7-1.6v12.2c-3.2-.2-5.4.3-7 1.6"/><path d="M12 7.3v12.2"/></>,
  listening:<g className="phones"><path d="M5.8 14V11.6a6.2 6.2 0 0 1 12.4 0V14"/><rect x="4" y="13.2" width="3.6" height="5.6" rx="1.3"/><rect x="16.4" y="13.2" width="3.6" height="5.6" rx="1.3"/></g>,
  writing:<><g className="pen"><path d="M14.6 5.4l4 4L8.9 19.1 4.5 20l.9-4.4z"/><path d="M13 7l4 4"/></g><path className="pen-line" d="M13.5 20h6"/></>,
  speaking:<><rect x="9.25" y="3" width="5.5" height="10.5" rx="2.75"/><path d="M6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20M9.5 20h5"/><path className="wave wave-left" d="M4.2 8.2a5.2 5.2 0 0 0 0 5.6"/><path className="wave wave-right" d="M19.8 8.2a5.2 5.2 0 0 1 0 5.6"/></>,
  knm:<><path d="M8.6 21l1.2-8h4.4l1.2 8zM9.7 13a2.3 2.3 0 0 1 4.6 0"/><g className="sails"><path d="M7.4 4.4l9.2 9.2M16.6 4.4l-9.2 9.2"/><circle cx="12" cy="9" r="1.3" fill="var(--paper)"/></g></>,
  mock:<><circle cx="12" cy="13" r="7.5"/><path d="M10.3 2.8h3.4M12 2.8v2.7"/><path className="hand" d="M12 13V9.2"/></>,
  progress:<><path className="bar" d="M5.5 19v-4"/><path className="bar" d="M9.8 19V9.5"/><path className="bar" d="M14.2 19v-7"/><path className="bar" d="M18.5 19V5.5"/></>,
};
// `motion` names the section the learner just navigated to; a new count remounts
// that icon so its CSS animation plays again on the next navigation.
export function NavIcon({part,motion=undefined}){
  const glyph=navGlyphs[part],animate=motion?.part===part;
  return glyph?<svg key={animate?motion.count:0} className={`nav-icon icon-${part}`} data-animate={animate||undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{glyph}</svg>:null;
}
export function KeyHint({label=undefined}){
  return <span className="key-hint" aria-hidden="true">{label??<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6v5a3 3 0 0 1-3 3H6"/><path d="m9.5 10-4 4 4 4"/></svg>}</span>;
}
// The label is SVG text anchored on the circle's centre; the baseline offset is
// half the cap height of Public Sans at 10px, so digits sit optically centred.
export function ProgressRing({value,max,label,done=false}){
  const fraction=max?Math.min(1,Math.max(0,value/max)):0,length=2*Math.PI*19;
  return <span className={`ring ${done?'ring-done':''}`} aria-hidden="true"><svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" fill="none" stroke="var(--line)" strokeWidth="2.5"/>{fraction>0&&<circle cx="22" cy="22" r="19" fill="none" stroke={done?'var(--ink)':'var(--action)'} strokeWidth="2.5" strokeDasharray={length} strokeDashoffset={length*(1-fraction)} transform="rotate(-90 22 22)"/>}<text className="ring-label" x="22" y="25.6" textAnchor="middle">{label}</text></svg></span>;
}
export function PlayIcon({playing}) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{playing?<><rect x="6" y="5" width="4" height="14" rx=".5"/><rect x="14" y="5" width="4" height="14" rx=".5"/></>:<path d="M8 5.3c0-.8.9-1.2 1.5-.8l10 6.6c.7.4.7 1.4 0 1.8l-10 6.6c-.6.4-1.5 0-1.5-.8z"/>}</svg>;
}
