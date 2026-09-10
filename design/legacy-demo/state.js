(function (scope) {
  const defaults = () => ({version:1, settings:{lang:'nl',level:'A2',clock:false}, records:{}, drafts:{}, active:null});
  function read(storage) {
    try {
      const value=JSON.parse(storage.getItem('samen.study.v1'));
      if(!value || value.version!==1) return defaults();
      const state=defaults();
      if(['nl','en'].includes(value.settings?.lang)) state.settings.lang=value.settings.lang;
      if(['A2','B1','B2'].includes(value.settings?.level)) state.settings.level=value.settings.level;
      state.settings.clock=value.settings?.clock===true;
      for(const key of ['records','drafts']) if(value[key] && typeof value[key]==='object' && !Array.isArray(value[key])) state[key]=value[key];
      if(value.active && typeof value.active==='object') state.active=value.active;
      return state;
    } catch { return defaults(); }
  }
  function save(storage,state) { try {storage.setItem('samen.study.v1',JSON.stringify(state));return true;} catch {return false;} }
  function elapsed(session, now=Date.now()) {
    if(!session || !Number.isFinite(session.startedAt)) return 0;
    return Math.max(0,Math.floor(((session.endedAt ?? now)-session.startedAt)/1000));
  }
  function formatTime(seconds) {
    const n=Math.max(0,Math.floor(seconds));
    const sec=String(n%60).padStart(2,'0'),min=String(Math.floor(n/60)%60).padStart(2,'0');
    return n>=3600?`${Math.floor(n/3600)}:${min}:${sec}`:`${Math.floor(n/60)}:${sec}`;
  }
  function summary(items,records) {
    return {total:items.length,completed:items.filter(i=>records[i.id]?.completed===true).length};
  }
  const api={defaults,read,save,elapsed,formatTime,summary};
  if(typeof module!=='undefined' && module.exports) module.exports=api;
  else scope.SamenState=api;
})(globalThis);
