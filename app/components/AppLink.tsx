import React from 'react';
import {useStudyContext} from '../StudyContext';
import {plainClick,routePath} from '../domain/routes';
export default function AppLink({to,onNavigate=undefined,children,...props}){
  const {go,state}=useStudyContext();
  return <a {...props} href={routePath(to,state.settings.level)} onClick={event=>{if(plainClick(event)){event.preventDefault();if(onNavigate)onNavigate();else go(to);}}}>{children}</a>;
}
