import React from 'react';
import {Popover} from '@base-ui/react/popover';
import {useStudyContext} from '../StudyContext';
import {Segments,ThemeIcon,LanguageFlag} from './Controls';

function Choices({prefix=""}){
  const {state,setting,t}=useStudyContext();
  return <>
    <Segments id={prefix+"language-control"} label={t('Taal','Language')} value={state.settings.lang} options={[{value:'nl',label:<LanguageFlag language="nl"/>,ariaLabel:'Nederlands'},{value:'en',label:<LanguageFlag language="en"/>,ariaLabel:'English'}]} onChange={value=>setting('lang',value)}/>
    <Segments id={prefix+"theme-control"} label={t('Thema','Theme')} value={state.settings.theme} options={[{value:'light',label:<ThemeIcon theme="light"/>,ariaLabel:t('Licht','Light')},{value:'dark',label:<ThemeIcon theme="dark"/>,ariaLabel:t('Donker','Dark')},{value:'system',label:<ThemeIcon theme="system"/>,ariaLabel:t('Systeem','System')}]} onChange={value=>setting('theme',value)}/>
  </>;
}
export default function Preferences(){
  const {t}=useStudyContext();
  return <><div className="side-settings"><Choices/></div><div className="mobile-preferences"><Popover.Root><Popover.Trigger className="preferences-trigger" aria-label={t('Taal en thema','Language and theme')}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="var(--paper)"/><circle cx="15" cy="17" r="3" fill="var(--paper)"/></svg></Popover.Trigger><Popover.Portal><Popover.Positioner side="bottom" align="end" sideOffset={8} collisionPadding={16}><Popover.Popup className="preferences-popup"><Popover.Title>{t('Voorkeuren','Preferences')}</Popover.Title><div className="preferences-choices"><Choices prefix="mobile-"/></div></Popover.Popup></Popover.Positioner></Popover.Portal></Popover.Root></div></>;
}
