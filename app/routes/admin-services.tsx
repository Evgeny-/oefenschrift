import React,{useMemo} from 'react';
import {useLoaderData} from 'react-router';
import {getStore} from '../../server/store';
import {adminSession} from '../../server/security';
import {configuration,elevenLabsSubscription,keys,openAiCosts} from '../../server/services';
import Chart,{axes,bar,shortDay} from '../components/admin/Chart';
import {Card,Empty,Meter,Tile,number,percent} from '../components/admin/ui';
let cache:{at:number;value:any}|null=null;
export async function loader({request}){
  adminSession(request);
  if(!cache||Date.now()-cache.at>300000)cache={at:Date.now(),value:{eleven:await elevenLabsSubscription(),openai:await openAiCosts()}};
  const store=getStore(),analytics=store.analytics(30),stats=store.stats(120);
  const tokens=stats.filter(row=>row.service==='feedback').reduce((sum,row)=>({input:sum.input+Number(row.input_tokens||0),output:sum.output+Number(row.output_tokens||0)}),{input:0,output:0});
  return {...cache.value,daily:analytics.daily,services:analytics.services,stats,tokens,model:configuration().feedback_model,openaiKey:!!keys().OPENAI_API_KEY,adminKey:!!process.env.OPENAI_ADMIN_KEY};
}
export default function Services(){
  const {eleven,openai,daily,services,stats,tokens,model,openaiKey,adminKey}=useLoaderData<typeof loader>();
  const labels=daily.map(d=>shortDay(d.day));
  const tokenChart=useMemo(()=>t=>({...axes(t,{legend:true}),xAxis:{...axes(t).xAxis,data:labels},series:[bar('Input tokens',daily.map(d=>{const row=services.find(s=>s.day===d.day&&s.service==='feedback');return row?Number(row.input_tokens||0):0;}),t.series[0],t,{stack:'tokens',top:false}),bar('Output tokens',daily.map(d=>{const row=services.find(s=>s.day===d.day&&s.service==='feedback');return row?Number(row.output_tokens||0):0;}),t.series[1],t,{stack:'tokens'})]}),[daily,services]);
  const costChart=useMemo(()=>t=>({...axes(t),xAxis:{...axes(t).xAxis,data:(openai?.days||[]).map(d=>shortDay(d.day))},yAxis:{...axes(t).yAxis,minInterval:undefined,axisLabel:{color:t.muted,fontSize:11,formatter:'${value}'}},series:[bar('Cost',(openai?.days||[]).map(d=>Number(d.cost.toFixed(2))),t.series[0],t)]}),[openai]);
  const credits=eleven?.configured&&!eleven.error?eleven:null,used=credits?credits.used/Math.max(1,credits.limit):0;
  return <>
    <div className="admin-head"><div><h1>Services</h1><p className="small">Provider balances are read live and never stored. Usage below comes from this server's own counters.</p></div></div>
    <div className="admin-grid">
      <Card className="span-6" title="ElevenLabs" note="Speech-to-text for speaking tasks and the voice used for listening clips.">
        {credits?<><div className="tiles-inline"><Tile className="" label="Characters left" value={number(credits.limit-credits.used)} detail={`of ${number(credits.limit)} · ${percent(credits.limit-credits.used,credits.limit)} of the ${credits.tier||'current'} plan`} tone={used>.85?'warn':undefined}/><Tile className="" label="Resets" value={credits.resetsAt?new Date(credits.resetsAt).toISOString().slice(0,10):'–'} detail={credits.status?`subscription ${credits.status}`:undefined}/></div><Meter value={credits.used} max={credits.limit} tone={used>.85?'warn':undefined}/><p className="small">Transcriptions this month: {number(stats.filter(row=>row.service==='transcribe'&&row.day>=new Date().toISOString().slice(0,8)).reduce((n,row)=>n+Number(row.calls),0))} calls.</p></>:<Empty>{eleven?.configured?eleven.error:'No ElevenLabs key is configured, so there is no balance to show.'}</Empty>}
      </Card>
      <Card className="span-6" title="OpenAI" note={`Feedback runs on ${model}.`}>
        {openaiKey?<><div className="tiles-inline"><Tile className="" label="Input tokens · 30 days" value={number(tokens.input)}/><Tile className="" label="Output tokens · 30 days" value={number(tokens.output)}/></div>
          {openai?.configured&&!openai.error?<><p className="small">Organisation cost over the last 30 days: <strong>${openai.total.toFixed(2)}</strong></p><Chart build={costChart} height={160} label="OpenAI cost per day"/></>:<p className="small">{adminKey?openai?.error:'OpenAI exposes no balance or spend to a project API key. Set OPENAI_ADMIN_KEY (an organisation admin key) to read daily costs here; until then the token counts above are the measure.'}</p>}</>:<Empty>No OpenAI key is configured, so feedback is off and there is nothing to show.</Empty>}
      </Card>
    <Card title="Feedback tokens per day" note="Counted from each provider response; cached results cost nothing.">{tokens.input+tokens.output?<Chart build={tokenChart} label="Feedback tokens per day"/>:<Empty>No feedback requests in the last 30 days.</Empty>}</Card>
    <Card title="Daily service log" note="Requests, failures and average response time. Answers, recordings and learner identifiers are not stored here.">{stats.length?<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Date</th><th>Service</th><th className="num">Requests</th><th className="num">Failures</th><th className="num">Average</th><th className="num">Tokens in</th><th className="num">Tokens out</th></tr></thead><tbody>{stats.map(row=><tr key={String(row.day)+row.service}><td>{row.day}</td><td>{row.service}</td><td className="num">{row.calls}</td><td className="num">{row.failures}</td><td className="num">{Number(row.calls)?(Number(row.total_ms)/Number(row.calls)/1000).toFixed(2)+' s':'–'}</td><td className="num">{number(Number(row.input_tokens||0))}</td><td className="num">{number(Number(row.output_tokens||0))}</td></tr>)}</tbody></table></div>:<Empty>No service requests recorded yet.</Empty>}</Card>
    </div>
  </>;
}
