import {routePath} from './routes';
import type {Exercise,PracticeSet,Level} from '../types';
export const subjectNames={reading:'Lezen',listening:'Luisteren',writing:'Schrijven',speaking:'Spreken',knm:'KNM',progress:'Voortgang',mock:'Proefexamen',about:'Over de oefeningen',privacy:'Privacy'};
export function pageSeo(route:string,level:Level,catalogue:Exercise[],sets:PracticeSet[],origin:string){
  const item=route.startsWith('exercise/')?catalogue.find(item=>item.id===route.slice(9)):undefined;
  const set=route.startsWith('set/')?sets.find(set=>set.id===route.slice(4)):undefined;
  const subject=['reading','listening','writing','speaking'].includes(route);
  const available=catalogue.filter(item=>item.part===route&&(route==='knm'||item.level===level));
  const title=item?`${item.title} · ${item.level} ${subjectNames[item.part]}`:set?`${set.level} ${subjectNames[set.part]} · Oefenset ${set.number}`:subject?`${level} ${subjectNames[route]} oefenen`:subjectNames[route]||'Oefenen';
  let description='Oefen Nederlands met zelfstandige opdrachten voor lezen, luisteren, schrijven en spreken. Onafhankelijke oefenopgaven voor je inburgering.';
  if(item)description=`${item.level} ${subjectNames[item.part]}: ${item.prompt||item.text||item.transcript||item.title}`;
  else if(set)description=`Oefenset ${set.number} voor ${set.level} ${subjectNames[set.part].toLowerCase()}: ${set.ids.length} opdrachten om zelfstandig te oefenen, met uitleg of oefenfeedback.`;
  else if(subject)description=available.length?`Oefen ${subjectNames[route].toLowerCase()} op niveau ${level} met ${available.length} eigen opdrachten. Werk in korte oefensets en bekijk de uitleg of oefenfeedback.`:`Oefeningen voor ${level} ${subjectNames[route].toLowerCase()} zijn nog niet beschikbaar.`;
  else if(route==='knm')description='Oefen Kennis van de Nederlandse Maatschappij met eigen vragen en uitleg. KNM staat los van je taalniveau.';
  else if(route==='about')description='Lees hoe onze onafhankelijke inburgeringsoefeningen worden gemaakt en nagekeken, wat de beperkingen zijn en hoe je een probleem kunt melden.';
  const noindex=['progress','session','privacy','mock'].includes(route)||(subject&&!available.length);
  return {title:title+' | Inburgering',description:description.replace(/\s+/g,' ').slice(0,160),canonical:new URL(routePath(route,level),origin).href,noindex};
}
export function sitemapPaths(catalogue:Exercise[],sets:PracticeSet[]){
  const paths=new Set<string>(['/about']);
  for(const item of catalogue){paths.add(routePath(item.part,item.level==='KNM'?'A2':item.level));paths.add(routePath('exercise/'+item.id));}
  for(const set of sets)if(set.ids.length)paths.add(routePath('set/'+set.id));
  return [...paths];
}
