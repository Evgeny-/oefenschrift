import {getStore,StoreError} from '../../server/store';
import {adminSession,requireAdminMutation} from '../../server/security';
export function loader({request,params}){
  const session=adminSession(request),store=getStore();
  const data=params.resource==='exercises'?(params.id?store.get(params.id):store.list()):params.resource==='reports'?store.reports():params.resource==='stats'?store.stats():null;
  if(!data)throw new Response('Not found',{status:404});return Response.json({data,csrf:session.token},{headers:session.headers});
}
export async function action({request,params}){
  requireAdminMutation(request,request.headers.get('X-CSRF-Token'));
  let data:any;try{const text=await request.text();if(text.length>45000)throw new Error();data=text?JSON.parse(text):{};}catch{throw new Response('Invalid JSON',{status:400});}
  const store=getStore();
  try{
    if(params.resource==='exercises'){
      if(request.method==='POST'&&!params.id)return Response.json(store.saveDraft(data.exercise,0),{status:201});
      if(request.method==='PUT'&&params.id){if(data.exercise?.id!==params.id)throw new StoreError('Exercise ID cannot change.');return Response.json(store.saveDraft(data.exercise,data.version));}
      if(request.method==='DELETE'&&params.id)return Response.json(store.archive(params.id,true,data.version));
      if(request.method==='PATCH'&&params.id&&data.archived===false)return Response.json(store.archive(params.id,false,data.version));
    }
    if(params.resource==='reports'&&params.id&&request.method==='PATCH'){store.resolveReport(Number(params.id),data.status);return Response.json({ok:true});}
    throw new StoreError('Unsupported operation.',405);
  }catch(e){if(e instanceof StoreError)return Response.json({error:e.message},{status:e.status});throw e;}
}
