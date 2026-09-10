import {useLoaderData,redirect,type MetaArgs} from 'react-router';
import App from '../App';
import {getStore} from '../../server/store';
import {readRoute,routePath,routeLevel,levelPages} from '../domain/routes';
import {defaults} from '../domain/study';
import {readPreferences,stateForRoute,applyResumePosition} from '../domain/render-state';
import {keys} from '../../server/services';
import {pageSeo} from '../domain/seo';
export function loader({request,params}){
  const url=new URL('/'+(params['*']||''),request.url),route=readRoute(url,null);
  if(route==='missing')throw new Response('Page not found',{status:404});
  const store=getStore(),catalogue=store.catalogue(),practiceSets=store.sets();
  if(route.startsWith('exercise/')&&!catalogue.some(item=>item.id===route.slice(9))||route.startsWith('set/')&&!practiceSets.some(set=>set.id===route.slice(4)))throw new Response('Exercise not found',{status:404});
  const renderedAt=Date.now(),cookie=request.headers.get('Cookie')||'';
  const settings=readPreferences(cookie),explicitLevel=routeLevel(url);
  if(explicitLevel)settings.level=explicitLevel;
  const canonicalPath=routePath(route,settings.level);
  // Splat params are decoded by the router. Compare the encoded request path so
  // existing exercise IDs containing colons do not redirect back to themselves.
  const requestUrl=new URL(request.url),requestPath=requestUrl.pathname.replace(/(?:\/_)?\.data$/,'')||'/';
  if(requestPath!==canonicalPath)throw redirect(canonicalPath+requestUrl.search,levelPages.has(route)&&!explicitLevel?307:308);
  let initialState=stateForRoute({...defaults(),settings},route,catalogue,practiceSets,renderedAt);
  const position=cookie.split(';').map(value=>value.trim()).find(value=>value.startsWith('inburgering_position='));
  if(position)initialState=applyResumePosition(initialState,position.slice('inburgering_position='.length),catalogue);
  const serviceKeys=keys();
  return {catalogue,practiceSets,initialState,renderedAt,services:{feedback:!!serviceKeys.OPENAI_API_KEY,speech:!!serviceKeys.ELEVENLABS_API_KEY,reports:true},seo:pageSeo(route,settings.level,catalogue,practiceSets,url.origin)};
}
export function meta({loaderData:data}:MetaArgs<typeof loader>){return data?[{title:data.seo.title},{name:'description',content:data.seo.description},{tagName:'link',rel:'canonical',href:data.seo.canonical},{property:'og:type',content:'website'},{property:'og:site_name',content:'Inburgering'},{property:'og:title',content:data.seo.title},{property:'og:description',content:data.seo.description},{property:'og:url',content:data.seo.canonical},{name:'twitter:card',content:'summary'},{name:'twitter:title',content:data.seo.title},{name:'twitter:description',content:data.seo.description},...(data.seo.noindex?[{name:'robots',content:'noindex, follow'}]:[])]:[{title:'Pagina niet gevonden | Inburgering'},{name:'robots',content:'noindex'}];}
export function shouldRevalidate({currentUrl,nextUrl,defaultShouldRevalidate}){return currentUrl.pathname!==nextUrl.pathname||defaultShouldRevalidate;}
export default function Study(){const data=useLoaderData<typeof loader>();return <App {...data}/>;}
