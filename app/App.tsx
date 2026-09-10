import type {Exercise,PracticeSet as PracticeSetDefinition,ServiceStatus} from './types';
import React,{useEffect,useRef,useState} from 'react';
import {useLocation,useNavigate} from 'react-router';
import useStudy from './useStudy';
import {StudyContext} from './StudyContext';
import {startSession,matchesSet,savedSetSession,flatten} from './domain/study';
import {unitLabel} from './domain/labels';
import {trackVisit} from './domain/telemetry';
import {NavIcon} from './components/Controls';
import {stateForRoute} from './domain/render-state';
import {resolveTheme} from './domain/theme';
import LevelNavigation from './components/LevelNavigation';
import Preferences from './components/Preferences';
import AppLink from './components/AppLink';
import {readRoute,routePath,sessionRoute,routeLevel} from './domain/routes';
import {Catalogue,MockSetup,Progress,About} from './components/CatalogueViews';
import Privacy from './components/Privacy';
import {Session,OpenExercise,Heading,PracticeSet} from './components/ExerciseViews';
const labels={reading:['Lezen','Reading'],listening:['Luisteren','Listening'],writing:['Schrijven','Writing'],speaking:['Spreken','Speaking'],knm:['KNM','KNM'],mock:['Proefexamen','Practice test'],progress:['Voortgang','Progress']};
export default function App({catalogue,practiceSets,initialState,services,renderedAt}:{catalogue:Exercise[];practiceSets:PracticeSetDefinition[];initialState:any;services:ServiceStatus;renderedAt:number}) {
  const location=useLocation(),navigate=useNavigate();
  const route=readRoute({...location,hash:''},null);
  const explicitLevel=routeLevel(location);
  const study=useStudy(catalogue,initialState,location.pathname,state=>stateForRoute(explicitLevel?{...state,settings:{...state.settings,level:explicitLevel}}:state,route,catalogue,practiceSets,renderedAt)),{state,setState,saved}=study;
  const [api,setApi]=useState<ServiceStatus|null>(services);
  useEffect(()=>{if(window.location.protocol==='file:'){setApi({feedback:false});return;}const controller=new AbortController();fetch('/api/status',{signal:controller.signal}).then(r=>r.ok?r.json():{feedback:false}).then(setApi).catch(()=>setApi({feedback:false}));return ()=>controller.abort();},[]);
  const t=(nl,en)=>state.settings.lang==='nl'?nl:en,name=part=>{const label=labels[part]||labels.reading;return t(label[0],label[1]);};
  const itemsFor=part=>catalogue.filter(i=>i.part===part&&(part==='knm'||i.level===state.settings.level));
  const go=(next,active=state.active)=>{
    const target=next==='session'?sessionRoute(active):next;
    navigate(routePath(target,state.settings.level));
  };
  const start=(ids,mode='practice')=>{
    const active=startSession(ids,mode,catalogue);
    setState(s=>({...s,active}));go(sessionRoute(active),active);
  };
  const startSet=(set,restart=false)=>{
    setState(s=>{const saved=savedSetSession(s,set);return {...s,active:saved&&!saved.endedAt&&!restart?saved:{...startSession(set.ids,'practice',catalogue),setId:set.id}};});
    go(`set/${set.id}`);
  };
  const open=item=>{
    if(item.questions&&!(state.active?.mode==='practice'&&!state.active.endedAt&&state.active.ids.length===1&&state.active.ids[0]===item.id))start([item.id]);
    else go(`exercise/${item.id}`);
  };
  useEffect(()=>{if(location.hash&&location.hash!=='#main-content')navigate(routePath(readRoute(location,state.active),state.settings.level),{replace:true});else if(location.pathname==='/')navigate(routePath(route,state.settings.level),{replace:true});},[route,location.hash,location.pathname]);
  useEffect(()=>{
    if(!study.ready)return;
    const system=matchMedia('(prefers-color-scheme: dark)');
    const apply=()=>{document.documentElement.dataset.theme=resolveTheme(state.settings.theme,system.matches);};
    apply();system.addEventListener('change',apply);
    return ()=>system.removeEventListener('change',apply);
  },[state.settings.theme,study.ready]);
  useEffect(()=>{document.documentElement.lang=state.settings.lang;},[state.settings.lang]);
  useEffect(()=>{if(study.ready)trackVisit(state.settings);},[study.ready]);
  const opened=route.startsWith('exercise/')?catalogue.find(i=>i.id===route.slice(9)):null;
  const practiceSet=route.startsWith('set/')?practiceSets.find(set=>set.id===route.slice(4)):null;
  const setReady=practiceSet&&matchesSet(state.active,practiceSet);
  const page=practiceSet?.part||opened?.part||(route==='session'?'mock':route);
  const setting=(key,value)=>{if(key==='level'){study.setting(key,value);navigate(routePath(labels[page]&&page!=='knm'?page:'reading',value));}else study.setting(key,value);};
  const backPart=practiceSet?.part||opened?.part||(route==='session'?'mock':null);
  // Icon motion follows a real section change, never the initial page load.
  const [motion,setMotion]=useState<{part:string;count:number}|null>(null),lastPage=useRef(page);
  useEffect(()=>{if(lastPage.current===page)return;lastPage.current=page;setMotion(m=>({part:page,count:(m?.count||0)+1}));},[page]);
  const closedReady=opened?.questions&&state.active?.ids.length===1&&state.active.ids[0]===opened.id&&state.active.mode==='practice';
  useEffect(()=>{document.querySelector<HTMLElement>('main h1')?.focus({preventScroll:true});window.scrollTo(0,0);},[route,closedReady,setReady,state.active?.index]);
  const missing=route==='missing'||(route.startsWith('exercise/')&&!opened)||(route.startsWith('set/')&&!practiceSet);
  // The toolbar names the set and the current text, clip or task; the question count stays with the question.
  const position=(()=>{
    if(!practiceSet)return null;
    const a=state.active,base=`${t('Oefenset','Practice set')} ${practiceSet.number}`;
    if(!setReady||a.endedAt)return base;
    const first=catalogue.find(i=>i.id===a.ids[0]),current=first?.questions?flatten(a,catalogue)[a.index]?.item.id:a.ids[a.index];
    return `${base} · ${unitLabel(practiceSet.part,1,state.settings.lang)} ${a.ids.indexOf(current)+1} ${t('van','of')} ${a.ids.length}`;
  })();
  const available=['A2','B1','B2'].filter(level=>catalogue.some(item=>item.level===level));
  const screen=missing?<><Heading title={t('Oefening niet gevonden','Exercise not found')} subtitle={t('Controleer de link of kies een oefening in het menu.','Check the link or choose an exercise from the menu.')}/></>:practiceSet?(setReady?<PracticeSet/>:null):route==='session'?(state.active?.mode==='mock'?<Session/>:<Heading title={t('Geen actief proefexamen','No active practice test')} subtitle={t('Kies Proefexamen in het menu om te beginnen.','Choose Practice test in the menu to begin.')}/>):opened?(opened.questions?(closedReady?<Session/>:null):<OpenExercise key={opened.id} item={opened}/>):route==='mock'?<MockSetup/>:route==='progress'?<Progress/>:route==='about'?<About/>:route==='privacy'?<Privacy/>:<Catalogue key={`${page}-${state.settings.level}`} part={labels[page]?page:'reading'}/>;
  return <StudyContext.Provider value={{...study,setting,renderedAt,api,catalogue,t,name,itemsFor,go,start,open,practiceSets,practiceSet,startSet}}><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.querySelector<HTMLElement>('main')?.focus();}}>{t('Naar inhoud','Skip to content')}</a><div className="app-shell" data-hydrated={study.ready||undefined}>
    <aside className="sidebar">
      <AppLink to="reading" className="wordmark" aria-label="Inburgering">Inburgering</AppLink>
      <LevelNavigation label={t('Niveau','Level')} value={state.settings.level} available={available} soon={t('Binnenkort','Coming soon')} hrefFor={value=>routePath(labels[page]&&page!=='knm'?page:'reading',value)} onChange={value=>setting('level',value)}/>
      <nav className="subject-nav" aria-label={t('Onderdelen','Subjects')}>
        {['reading','listening','writing','speaking','knm'].map(part=><AppLink className="nav-link" key={part} data-page={part} to={part} aria-current={page===part?'page':undefined}><NavIcon part={part} motion={motion}/><span className="nav-label" data-label={name(part)}>{name(part)}</span></AppLink>)}
      </nav>
      <nav className="utility-nav" aria-label={t('Oefenen en voortgang','Practice and progress')}>
        {['mock','progress'].map(part=><AppLink className="nav-link" key={part} data-page={part} to={part} aria-current={page===part?'page':undefined}><NavIcon part={part} motion={motion}/><span className="nav-label" data-label={name(part)}>{name(part)}</span></AppLink>)}
      </nav>
      <Preferences/>
    </aside>
    <div className="workspace">
      {backPart&&<div className="toolbar"><AppLink className="back" to={backPart}>← {t('Terug naar','Back to')} {name(backPart)}</AppLink>{position&&<span className="set-position">{position}</span>}</div>}
    {!saved&&<p className="storage-notice" role="status">{t('Opslaan in deze browser lukt niet. Je kunt wel blijven oefenen.','This browser cannot save your work. You can still practise.')}</p>}
    <main id="main-content" tabIndex={-1}>{screen}</main><footer className="footer"><span className="unofficial">{t('Onafhankelijke oefenopgaven · geen officiële examens','Independent practice · not official exams')}</span><div className="footer-links"><AppLink className="text-button" to="about">{t('Over de oefeningen','About the exercises')}</AppLink><AppLink className="text-button" to="privacy">{t('Privacy','Privacy')}</AppLink></div></footer></div>
  </div></StudyContext.Provider>;
}
