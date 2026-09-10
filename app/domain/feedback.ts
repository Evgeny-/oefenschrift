// Language changes only the explanation, never the rubric decisions or revision.
export function localizeFeedback(result,lang){
  if(!result)return null;
  const copy=result.translations?.[lang];
  if(!copy)return result;
  return {...result,comment:copy.comment,next_step:copy.next_step,criteria:result.criteria.map((criterion,index)=>({...criterion,feedback:copy.criteria_feedback[index]}))};
}
