import React from 'react';
export const number=(value:number)=>new Intl.NumberFormat('en-GB').format(Math.round(value||0));
export const percent=(part:number,total:number)=>total?`${Math.round(part/total*100)}%`:'–';
export function Tile({label,value,detail=undefined,tone=undefined,className='span-2'}:{label:string;value:React.ReactNode;detail?:React.ReactNode;tone?:'warn'|undefined;className?:string}){
  return <div className={`tile ${className} ${tone==='warn'?'tile-warn':''}`}><span className="tile-label">{label}</span><strong className="tile-value">{value}</strong>{detail!==undefined&&<span className="tile-detail">{detail}</span>}</div>;
}
export function Card({title,note=undefined,children,className='',actions=undefined}:{title?:string;note?:React.ReactNode;children:React.ReactNode;className?:string;actions?:React.ReactNode}){
  return <section className={`card ${className}`}>{(title||actions)&&<div className="card-head"><div>{title&&<h2>{title}</h2>}{note&&<p className="small">{note}</p>}</div>{actions}</div>}{children}</section>;
}
export function Empty({children}:{children:React.ReactNode}){return <p className="empty-note">{children}</p>;}
export function Meter({value,max,tone=undefined}:{value:number;max:number;tone?:'warn'|undefined}){
  const fraction=max>0?Math.min(1,Math.max(0,value/max)):0;
  return <div className={`meter ${tone==='warn'?'meter-warn':''}`} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}><i style={{width:`${fraction*100}%`}}/></div>;
}
