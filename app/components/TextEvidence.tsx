import React from 'react';
import {highlightParts,wordDiff} from '../domain/text';
export function EvidenceText({text,quotes=[]}){return highlightParts(text,quotes).map((p,i)=>p.marked?<mark key={i}>{p.text}</mark>:<React.Fragment key={i}>{p.text}</React.Fragment>);}
export function AnswerDiff({before,after}){return <p className="answer-diff" lang="nl">{wordDiff(before,after).map((p,i)=>p.type==='add'?<ins key={i}>{p.text}</ins>:p.type==='remove'?<del key={i}>{p.text}</del>:<React.Fragment key={i}>{p.text}</React.Fragment>)}</p>;}
