import type {Level} from '../types';
const pages=new Set(['reading','listening','writing','speaking','knm','progress','about','privacy']);
export const levelPages=new Set(['reading','listening','writing','speaking','progress','mock','session']);
export function routeLevel(location):Level|undefined {
  const match=location.pathname.match(/^\/(a2|b1|b2)(?:\/|$)/i);
  return match?.[1].toUpperCase() as Level|undefined;
}
export function sessionRoute(active){if(active?.setId)return `set/${active.setId}`;return active?.mode==='practice'&&active.ids.length===1?`exercise/${active.ids[0]}`:'session';}
export function routePath(route,level:Level='A2'){
  if(route.startsWith('set/'))return `/sets/${encodeURIComponent(route.slice(4))}`;
  if(route.startsWith('exercise/'))return `/exercise/${encodeURIComponent(route.slice(9))}`;
  const prefix=`/${level.toLowerCase()}`;
  if(route==='mock')return prefix+'/practice-test';
  if(route==='session')return prefix+'/practice-test/session';
  return pages.has(route)?`${levelPages.has(route)?prefix:''}/${route}`:prefix+'/reading';
}
export function readRoute(location,active){
  try{
    if(location.hash&&location.hash!=='#main-content'){
      const old=decodeURIComponent(location.hash.slice(1));
      if(old.startsWith('open/'))return `exercise/${old.slice(5)}`;
      if(old.startsWith('exercise/')||old.startsWith('set/'))return old;
      if(old==='session')return sessionRoute(active);
      if(pages.has(old)||old==='mock')return old;
    }
    let path=location.pathname.replace(/\/+$/,'')||'/';
    const level=routeLevel(location);
    if(level)path=path.slice(3)||'/reading';
    let route='missing';
    if(path==='/practice-test')route='mock';
    else if(path==='/practice-test/session')route='session';
    else if(path.startsWith('/sets/')){const id=decodeURIComponent(path.slice(6));if(id&&!id.includes('/'))route=`set/${id}`;}
    else if(path.startsWith('/exercise/')){const id=decodeURIComponent(path.slice(10));if(id&&!id.includes('/'))route=`exercise/${id}`;}
    else if(pages.has(path.slice(1)))route=path.slice(1);
    else if(path==='/'||location.protocol==='file:')route='reading';
    return level&&!levelPages.has(route)?'missing':route;
  }catch{}
  return 'missing';
}
export function plainClick(event){return event.button===0&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&!event.defaultPrevented;}
