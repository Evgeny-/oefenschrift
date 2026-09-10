import {getStore,StoreError} from '../../server/store';
import {keys,configuration,sharedFeedback,transcribe,ServiceError} from '../../server/services';
import {assertLocal,visitorHash} from '../../server/security';
const calls:number[]=[],eventCalls:number[]=[];
function limited(list:number[],max:number,now:number){while(list.length&&list[0]<now-60000)list.shift();if(list.length>=max)return true;list.push(now);return false;}
export function loader({request,params}){assertLocal(request);if(params.service==='status')return Response.json({feedback:!!keys().OPENAI_API_KEY,speech:!!keys().ELEVENLABS_API_KEY,reports:true,model:configuration().feedback_model},{headers:{'Cache-Control':'no-store'}});throw new Response('Not found',{status:404});}
export async function action({request,params}){
  assertLocal(request);if(request.headers.get('Origin')!==new URL(request.url).origin)throw new Response('Origin required',{status:403});
  const service=params.service;if(!['reports','feedback','transcribe','events'].includes(service))throw new Response('Not found',{status:404});
  if(request.method!=='POST')throw new Response('Method not allowed',{status:405});
  const limit=service==='transcribe'?9*1024*1024:16000;
  if(!request.headers.get('Content-Type')?.startsWith('application/json')||Number(request.headers.get('Content-Length')||0)>limit)throw new Response('Invalid request',{status:400});
  let data:any;try{const text=await request.text();if(text.length>limit)throw new Error();data=JSON.parse(text);}catch{throw new Response('Invalid JSON',{status:400});}
  const now=Date.now(),store=getStore();
  // Anonymous learning events have their own allowance; they never block feedback.
  if(service==='events'){
    if(limited(eventCalls,120,now))return Response.json({error:'Too many events.'},{status:429});
    const visitor=visitorHash(data?.visitor);if(!visitor)throw new Response('Invalid visitor',{status:400});
    try{return Response.json({recorded:store.recordEvents(visitor,data.events,now)});}catch(error){return Response.json({error:error instanceof StoreError?error.message:'Invalid events.'},{status:400});}
  }
  if(limited(calls,30,now))return Response.json({error:'Please wait a minute before trying again.'},{status:429});
  let failed=false;
  try{
    if(service==='reports')return Response.json(store.report(data));
    const item=store.catalogue().find(i=>i.id===data.id&&['writing','speaking'].includes(i.part));if(!item)throw new StoreError('Invalid exercise.');
    store.serviceEvent(service,visitorHash(data.visitor),item.id,now);
    if(service==='feedback'){
      if(typeof data.answer!=='string'||!data.answer.trim()||data.answer.length>3000||!['nl','en'].includes(data.lang))throw new StoreError('Invalid answer.');
      return Response.json(await sharedFeedback(item,data.answer,data.lang,usage=>store.tokens('feedback',usage)));
    }
    if(item.part!=='speaking')throw new StoreError('Choose a speaking exercise.');
    return Response.json(await transcribe(item,data));
  }catch(error){failed=true;return Response.json({error:error instanceof StoreError||error instanceof ServiceError?error.message:'Service unavailable. Please retry.'},{status:error instanceof StoreError||error instanceof ServiceError?error.status:502});}
  finally{store.statistic(service,failed,Date.now()-now);}
}
