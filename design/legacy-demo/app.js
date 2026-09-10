(() => {
  'use strict';
  const data = window.SamenData, S = window.SamenState, C = window.SamenControls;
  const main = document.getElementById('st-main');
  let storage; try { storage = window.localStorage; } catch { storage = null; }
  const state = S.read(storage);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (nl,en) => state.settings.lang === 'nl' ? nl : en;
  const names = {reading:['Lezen','Reading'],listening:['Luisteren','Listening'],writing:['Schrijven','Writing'],speaking:['Spreken','Speaking'],knm:['KNM','KNM'],mock:['Proefexamen','Practice test'],progress:['Voortgang','Progress']};
  const name = part => t(...names[part]);
  const itemById = id => data.find(item => item.id === id);
  const itemsFor = (part,level=state.settings.level) => data.filter(item => item.part===part && item.level===level);
  let page = 'reading', view = 'catalogue', filter = 'all', openId = null, feedback = false, mockPart = 'reading';
  let playerPosition = 0, playerRate = 1, lastAudioId = null;
  function validSession(a) {
    return a && ['practice','mock'].includes(a.mode) && Array.isArray(a.ids) && a.ids.length>0 &&
      a.ids.every(id => itemById(id)?.questions && itemById(id).level===a.level) &&
      Number.isFinite(a.startedAt) && (a.endedAt==null || Number.isFinite(a.endedAt)) &&
      Number.isInteger(a.index) && a.index>=0 && a.index<a.ids.reduce((n,id)=>n+itemById(id).questions.length,0) &&
      a.answers && typeof a.answers==='object' && !Array.isArray(a.answers) && a.checked && typeof a.checked==='object';
  }
  if (!validSession(state.active)) state.active = null;
  if (state.active && !state.active.endedAt && state.active.level===state.settings.level) {
    page=state.active.mode==='mock'?'mock':itemById(state.active.ids[0]).part; view='session';
  }
  function persist() {
    const ok=S.save(storage,state), notice=document.getElementById('storage-notice');
    notice.hidden=ok;
    notice.textContent=t('Opslaan in deze browser lukt niet. Je kunt wel blijven oefenen.','This browser cannot save your work. You can still practise.');
    return ok;
  }
  function record(id, details) {
    state.records[id]={completed:true,at:Date.now(),...details}; persist(); renderSidebar();
  }
  function heading(title,subtitle='') {return `<div class="st-heading"><h1 tabindex="-1">${esc(title)}</h1>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div>`;}
  function back(target=page) { return `<div class="st-topline"><button class="st-back" data-page="${target}">← ${t('Terug naar overzicht','Back to overview')}</button></div>`; }
  function footer() {return `<footer class="st-bottom"><span>${t('Voorbeeldversie','Preview')}</span><button class="st-link" data-action="about">${t('Over de oefeningen','About the exercises')}</button></footer>`;}
  function paragraphs(text) {return String(text).split('\n\n').map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');}
  function renderSidebar() {
    document.documentElement.lang=state.settings.lang;
    document.getElementById('navigation').setAttribute('aria-label',t('Onderdelen','Subjects'));
    document.getElementById('navigation').innerHTML=Object.keys(names).map((key,i)=>`${i===5?'<div class="st-nav-divider"></div>':''}<button data-page="${key}" ${page===key?'aria-current="page"':''}>${esc(name(key))}</button>`).join('');
    const n=S.summary(data.filter(i=>i.level===state.settings.level),state.records);
    document.getElementById('side-progress').innerHTML=`<span>${state.settings.level} · ${n.completed}/${n.total} ${t('afgerond','completed')}</span><progress max="${n.total||1}" value="${n.completed}" aria-label="${t('Afgeronde oefeningen','Completed exercises')}"></progress><span>${t('Op dit apparaat','On this device')}</span>`;
  }
  function renderControls() {
    C.mount(document.getElementById('level-control'),'select',{label:t('Niveau','Level'),value:state.settings.level,items:['A2','B1','B2'].map(value=>({value,label:value})),onChange:value=>{
      if(!value || value===state.settings.level) return;
      state.settings.level=value;view='catalogue';filter='all';feedback=false;persist();render();
    }});
    C.mount(document.getElementById('language-control'),'select',{label:t('Taal','Language'),value:state.settings.lang,items:[{value:'nl',label:'Nederlands'},{value:'en',label:'English'}],onChange:value=>{
      if(!value || value===state.settings.lang) return;
      state.settings.lang=value;persist();render();
    }});
  }
  function releaseMain() {
    const audio=main.querySelector('audio');
    if(audio) {playerPosition=audio.currentTime;playerRate=audio.playbackRate;audio.pause();}
    C.releaseWithin(main);
  }
  function render(focus=false) {
    releaseMain();renderSidebar();renderControls();
    if(view==='about') renderAbout();
    else if(view==='session' && state.active) renderSession();
    else if(view==='result' && state.active) renderResult();
    else if(view==='open' && itemById(openId)) renderOpen();
    else if(page==='mock') renderMock();
    else if(page==='progress') renderProgress();
    else renderCatalogue();
    if(focus) main.querySelector('h1')?.focus({preventScroll:true});
  }
  function navigate(target) {page=target;view='catalogue';filter='all';feedback=false;render(true);}
  function completion(item) {
    const r=state.records[item.id];
    if(!r?.completed) return t('Nog niet gedaan','Not started');
    return r.kind==='self'?t('Zelf nagekeken','Self-reviewed'):`${Number(r.correct)||0}/${Number(r.total)||0} ${t('goed','correct')}`;
  }
  function renderCatalogue() {
    const items=itemsFor(page), visible=filter==='done'?items.filter(i=>state.records[i.id]?.completed):items;
    const active=state.active;
    const resume=active && !active.endedAt && active.level===state.settings.level && active.mode==='practice' && itemById(active.ids[0]).part===page;
    main.innerHTML=heading(name(page),`${state.settings.level} · ${items.length} ${t('oefeningen','exercises')}`)+
      (resume?`<div class="st-resume"><span>${esc(itemById(active.ids[0]).title)}</span><button class="st-link" data-action="resume">${t('Verder oefenen','Continue')}</button></div>`:'')+
      (items.length?`<div class="st-tabs" aria-label="${t('Oefeningen filteren','Filter exercises')}"><button data-filter="all" aria-pressed="${filter==='all'}">${t('Alle oefeningen','All exercises')}</button><button data-filter="done" aria-pressed="${filter==='done'}">${t('Afgerond','Completed')}</button></div>
      <ul class="st-library">${visible.map(item=>`<li><button class="st-entry" data-item="${esc(item.id)}"><span><strong lang="nl">${esc(item.title)}</strong><small>${item.questions?`${item.questions.length} ${item.questions.length===1?t('vraag','question'):t('vragen','questions')}`:t('Open opdracht','Open response')} · ${esc(completion(item))}</small></span><span aria-hidden="true">↗</span></button></li>`).join('')}</ul>${!visible.length?`<p class="st-note">${t('Nog geen afgeronde oefeningen.','No completed exercises yet.')}</p>`:''}`:
      `<div class="st-empty"><h2>${t('Nog geen oefeningen op dit niveau','No exercises at this level yet')}</h2><p>${page==='knm'?t('De KNM-opgaven komen in een volgende versie.','KNM exercises will be added in a later version.'):t('In deze demo staat A2 klaar voor alle taalonderdelen. Voor B1 kun je lezen oefenen.','This demo has A2 exercises for each language skill, plus B1 reading.')}</p>${state.settings.level!=='A2'?`<button class="st-secondary" data-action="a2">${t('Bekijk A2','View A2')}</button>`:''}</div>`)+footer();
  }
  function startItems(ids,mode='practice') {
    state.active={ids,mode,level:state.settings.level,index:0,answers:{},checked:{},startedAt:Date.now(),endedAt:null};
    view='session';playerPosition=0;lastAudioId=null;persist();render(true);
  }
  function questions(a=state.active) {return a.ids.flatMap(id=>itemById(id).questions.map(q=>({item:itemById(id),q,key:`${id}/${q.id}`})));}
  function renderSession() {
    const a=state.active, all=questions(), {item,q,key}=all[a.index], checked=!!a.checked[key], chosen=a.answers[key], mock=a.mode==='mock';
    main.innerHTML=back(mock?'mock':item.part)+`<div class="session-heading">${heading(item.title)}<div class="session-clock"><span id="elapsed" class="elapsed" ${state.settings.clock?'':'hidden'}></span><div id="clock-control"></div></div></div>
      <div class="question-progress"><span>${a.level} · ${mock?t('Proefexamen','Practice test'):name(item.part)}</span><span>${a.index+1} / ${all.length}</span></div><progress class="session-progress" value="${a.index}" max="${all.length}" aria-label="${t('Voortgang in deze oefening','Exercise progress')}"></progress>
      <div class="st-reading"><section aria-label="${t('Opgave','Task')}">${item.audio?audioMarkup(item,!mock):`<div class="st-passage" lang="nl">${paragraphs(item.text)}</div>`}</section>
      <section class="st-question"><p class="st-small">${t('Vraag','Question')} ${a.index+1}</p><fieldset><legend lang="nl">${esc(q.prompt)}</legend>${Object.entries(q.options).map(([letter,text])=>`<label class="st-option"><input type="radio" name="answer" value="${letter}" ${chosen===letter?'checked':''} ${checked?'disabled':''}><span lang="nl">${esc(text)}</span></label>`).join('')}</fieldset>
      ${checked?`<div class="st-feedback ${chosen===q.answer?'st-correct':''}" role="status"><strong>${chosen===q.answer?t('✓ Goed antwoord','✓ Correct answer'):t('Niet helemaal','Not quite')}</strong><p lang="nl">${esc(q.explanation)}</p></div>`:''}
      <div class="st-actions">${a.index>0?`<button class="st-secondary" data-action="previous">${t('Vorige','Previous')}</button>`:''}${!mock&&!checked?`<button class="st-primary" data-action="check" ${!chosen?'disabled':''}>${t('Controleer antwoord','Check answer')}</button>`:`<button class="st-primary" data-action="next" ${!chosen?'disabled':''}>${a.index===all.length-1?t('Afronden','Finish'):t('Volgende','Next')}</button>`}</div></section></div>`+footer();
    mountClock();if(item.audio) initAudio(item);
  }
  function mountClock() {
    C.mount(document.getElementById('clock-control'),'toggle',{label:t('Tijd tonen','Show time'),checked:state.settings.clock,onChange:checked=>{state.settings.clock=checked;persist();document.getElementById('elapsed').hidden=!checked;mountClock();}});tick();
  }
  function tick() {const node=document.getElementById('elapsed');if(node) node.textContent=`${t('Verstreken','Elapsed')} ${S.formatTime(S.elapsed(state.active))}`;}
  setInterval(tick,1000);
  function finishSession() {
    const a=state.active; a.endedAt=Date.now();
    a.ids.forEach(id=>{const qs=questions().filter(x=>x.item.id===id);record(id,{kind:'quiz',correct:qs.filter(x=>a.answers[x.key]===x.q.answer).length,total:qs.length});});
    persist();view='result';render(true);
  }
  function renderResult() {
    const a=state.active, all=questions(), correct=all.filter(x=>a.answers[x.key]===x.q.answer).length;
    main.innerHTML=back(a.mode==='mock'?'mock':itemById(a.ids[0]).part)+heading(t('Oefening afgerond','Practice complete'))+
      `<div class="result-summary"><strong>${correct}<span> / ${all.length}</span></strong><div>${t('antwoorden goed','correct answers')}<p class="st-small">${t('Verstreken tijd','Elapsed time')}: ${S.formatTime(S.elapsed(a))}</p></div></div>
      <p class="st-note">${t('Dit resultaat gaat over deze oefening. Het voorspelt geen examencijfer.','This result describes this exercise. It does not predict an exam score.')}</p>
      <div class="result-review">${all.map(({q,key},i)=>`<details class="review-question"><summary><span class="review-status">${a.answers[key]===q.answer?'✓':'×'}</span><span lang="nl">${i+1}. ${esc(q.prompt)}</span></summary><div class="review-answer"><p>${t('Jouw antwoord','Your answer')}: <span lang="nl">${esc(q.options[a.answers[key]])}</span></p>${a.answers[key]!==q.answer?`<p>${t('Goed antwoord','Correct answer')}: <span lang="nl">${esc(q.options[q.answer])}</span></p>`:''}<p lang="nl">${esc(q.explanation)}</p></div></details>`).join('')}</div>
      <div class="st-actions"><button class="st-primary" data-page="${a.mode==='mock'?'mock':itemById(a.ids[0]).part}">${t('Terug naar overzicht','Back to overview')}</button><button class="st-secondary" data-action="retry">${t('Opnieuw oefenen','Try again')}</button></div>`+footer();
  }
  function audioMarkup(item,transcript) {
    return `<div class="st-player"><audio preload="metadata" src="${esc(item.audio)}"></audio><div class="player-row"><button class="audio-play" data-action="play" aria-label="${t('Afspelen','Play')}">▶</button><div class="waveform">${item.peaks.map(p=>`<i style="height:${Math.max(8,p*100)}%"></i>`).join('')}<input class="audio-seek" type="range" min="0" max="${item.duration}" step="0.1" value="0" aria-label="${t('Afspeelpositie','Playback position')}"></div></div><div class="player-meta"><span class="audio-time">0:00 / ${S.formatTime(item.duration)}</span><label class="audio-speed">${t('Snelheid','Speed')} <select aria-label="${t('Afspeelsnelheid','Playback speed')}"><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option></select></label></div><p class="st-small">${t('Synthetische voorbeeldstem','Synthetic sample voice')}</p><p class="audio-error" role="status" hidden></p></div>${transcript?`<details class="transcript"><summary>${t('Bekijk transcript','View transcript')}</summary><p lang="nl">${esc(item.text)}</p></details>`:''}`;
  }
  function initAudio(item) {
    const audio=main.querySelector('audio'), seek=main.querySelector('.audio-seek'), button=main.querySelector('.audio-play'), wave=main.querySelector('.waveform');
    if(lastAudioId!==item.id) playerPosition=0;
    lastAudioId=item.id;audio.playbackRate=playerRate;main.querySelector('.audio-speed select').value=String(playerRate);
    audio.addEventListener('loadedmetadata',()=>{audio.currentTime=Math.min(playerPosition, audio.duration||0);seek.max=audio.duration;});
    const update=()=>{seek.value=audio.currentTime;seek.setAttribute('aria-valuetext',S.formatTime(audio.currentTime));main.querySelector('.audio-time').textContent=`${S.formatTime(audio.currentTime)} / ${S.formatTime(audio.duration||item.duration)}`;const n=(audio.currentTime/(audio.duration||item.duration))*item.peaks.length;wave.querySelectorAll('i').forEach((bar,i)=>bar.classList.toggle('heard',i<n));};
    audio.addEventListener('timeupdate',update);
    const playState=()=>{button.textContent=audio.paused?'▶':'Ⅱ';button.setAttribute('aria-label',audio.paused?t('Afspelen','Play'):t('Pauzeren','Pause'));};
    audio.addEventListener('play',playState);audio.addEventListener('pause',playState);audio.addEventListener('ended',playState);
    seek.addEventListener('input',()=>{audio.currentTime=Number(seek.value);update();});
    main.querySelector('.audio-speed select').addEventListener('change',event=>{audio.playbackRate=Number(event.target.value);playerRate=audio.playbackRate;});
    const error=()=>{const el=main.querySelector('.audio-error');el.hidden=false;el.textContent=t('Dit geluidsfragment kan niet worden afgespeeld.','This audio clip could not be played.');};
    audio.addEventListener('error',error);button.addEventListener('click',()=>{if(audio.paused)audio.play().catch(error);else audio.pause();});
  }
  function renderOpen() {
    const item=itemById(openId), draft=typeof state.drafts[item.id]==='string'?state.drafts[item.id]:'';
    const sample=draft.trim()===item.sample.trim();
    main.innerHTML=back(item.part)+heading(item.title,`${item.level} · ${name(item.part)}`)+
      `<div class="st-columns"><section class="open-prompt"><p class="st-passage" lang="nl">${esc(item.prompt)}</p><ul>${item.criteria.map(c=>`<li>${esc(t(...c))}</li>`).join('')}</ul>${item.part==='speaking'?`<p class="st-note">${t('Zeg je antwoord hardop en schrijf daarna op wat je zei. Opname en automatische spraakfeedback zijn nog niet aangesloten.','Say your answer aloud, then write down what you said. Recording and automatic speech feedback are not connected yet.')}</p>`:''}</section>
      <section><label for="open-answer">${item.part==='speaking'?t('Wat heb je gezegd?','What did you say?'):t('Jouw bericht','Your message')}</label><textarea id="open-answer" lang="nl" spellcheck="true" placeholder="${t('Schrijf hier in het Nederlands…','Write here in Dutch…')}">${esc(draft)}</textarea><p class="st-small" id="draft-status">${document.getElementById('storage-notice').hidden?t('Je concept wordt op dit apparaat bewaard.','Your draft is saved on this device.'):t('Concept kan niet worden opgeslagen','Draft could not be saved')}</p><div class="st-actions"><button class="st-primary" data-action="feedback" ${!draft.trim()?'disabled':''}>${t('Bekijk feedback','Review answer')}</button><button class="st-link" data-action="sample">${t('Vul een voorbeeld in','Use a sample answer')}</button></div></section></div>
      ${feedback?`<section class="st-evaluation" aria-label="${t('Feedback','Feedback')}"><h2>${sample?t('Feedback op het voorbeeld','Sample answer feedback'):t('Kijk je antwoord na','Review your answer')}</h2><p class="st-note">${sample?t('Dit voorbeeld is vooraf nagekeken. Er is nog geen AI-beoordeling.','This sample has prepared feedback. AI assessment is not connected yet.'):t('Vink aan wat je hebt genoemd. Deze demo beoordeelt je tekst nog niet automatisch.','Check what you included. This demo does not assess your text automatically yet.')}</p>
      <div class="criteria-list">${item.criteria.map((c,i)=>sample?`<div class="criterion"><span class="criterion-icon ${item.quotes[i]?'good':''}">${item.quotes[i]?'✓':'○'}</span><div><strong>${esc(t(...c))}</strong><p>${item.quotes[i]?`<q lang="nl">${esc(item.quotes[i])}</q>`:t('Dit ontbreekt nog in je antwoord.','This is still missing from your answer.')}</p></div></div>`:`<label class="criterion"><input type="checkbox" class="self-check"><span>${esc(t(...c))}</span></label>`).join('')}</div>
      <details class="model-answer"><summary>${t('Bekijk een volledig voorbeeld','See a complete example')}</summary><p lang="nl">${esc(item.model)}</p></details><div class="st-actions"><button class="st-secondary" data-action="reviewed">${t('Markeer als nagekeken','Mark as reviewed')}</button><span class="st-small">${t('Zelfbeoordeling · geen examencijfer','Self-review · no exam score')}</span></div></section>`:''}`+footer();
  }
  function renderMock() {
    const items=itemsFor(mockPart), count=items.reduce((n,item)=>n+item.questions.length,0), a=state.active;
    const resume=a?.mode==='mock'&&!a.endedAt&&a.level===state.settings.level;
    main.innerHTML=heading(t('Proefexamen','Practice test'),t('Beantwoord alle vragen. Je krijgt de uitleg na afloop.','Answer every question. Explanations follow at the end.'))+
      (resume?`<div class="st-resume"><span>${name(itemById(a.ids[0]).part)} · ${a.level}</span><button class="st-link" data-action="resume">${t('Verdergaan','Continue')}</button></div>`:'')+
      `<div class="st-form"><div id="mock-part"></div><div class="mock-count">${state.settings.level} · ${count} ${t('vragen','questions')}</div><div id="mock-clock"></div><p class="st-note">${t('Een korte oefenset met eigen vragen. Geen volledig officieel examen. De klok telt omhoog, ook als je het tabblad sluit.','A short set of original questions, not a full official exam. The clock counts up, including time away from the tab.')}</p><div class="st-actions"><button class="st-primary" data-action="start-mock" ${count?'':'disabled'}>${t('Start proefexamen','Start practice test')}</button></div>${!count?`<p class="st-note">${t('Voor deze combinatie zijn nog geen vragen beschikbaar.','No questions are available for this combination yet.')}</p>`:''}</div>`+footer();
    C.mount(document.getElementById('mock-part'),'select',{label:t('Onderdeel','Subject'),value:mockPart,items:['reading','listening'].map(value=>({value,label:name(value)})),onChange:value=>{if(value){mockPart=value;render();}}});
    C.mount(document.getElementById('mock-clock'),'toggle',{label:t('Verstreken tijd tonen','Show elapsed time'),checked:state.settings.clock,onChange:checked=>{state.settings.clock=checked;persist();render();}});
  }
  function renderProgress() {
    const items=data.filter(i=>i.level===state.settings.level), n=S.summary(items,state.records);
    const completed=items.filter(i=>state.records[i.id]?.completed).sort((a,b)=>state.records[b.id].at-state.records[a.id].at);
    main.innerHTML=heading(t('Jouw voortgang','Your progress'),t('Bewaard in deze browser. Je hebt geen account nodig.','Saved in this browser. No account needed.'))+
      `<div class="progress-total"><strong>${n.completed}<span> / ${n.total}</span></strong><span>${state.settings.level} · ${t('oefeningen afgerond','exercises completed')}</span></div><div class="progress-subjects">${['reading','listening','writing','speaking'].map(part=>{const s=S.summary(itemsFor(part),state.records);return `<div class="progress-subject"><span>${name(part)}</span><progress max="${s.total||1}" value="${s.completed}" aria-label="${esc(name(part))}"></progress><span>${s.completed}/${s.total}</span></div>`;}).join('')}</div>
      ${completed.length?`<h2>${t('Afgeronde oefeningen','Completed exercises')}</h2><ul class="st-library">${completed.map(item=>`<li><button class="st-entry" data-item="${esc(item.id)}"><span><strong lang="nl">${esc(item.title)}</strong><small>${name(item.part)} · ${completion(item)}</small></span><span class="st-small">${new Date(state.records[item.id].at).toLocaleDateString(state.settings.lang==='nl'?'nl-NL':'en-GB',{day:'numeric',month:'short'})}</span></button></li>`).join('')}</ul>`:`<p class="st-note">${t('Na je eerste oefening verschijnt hier je resultaat.','Your results will appear here after your first exercise.')}</p>`}
      <p class="st-note">${t('Wissen van browsergegevens verwijdert ook je voortgang en concepten. Een andere browser heeft zijn eigen voortgang.','Clearing browser data also removes your progress and drafts. Each browser keeps its own progress.')}</p>`+footer();
  }
  function renderAbout() {
    main.innerHTML=back()+heading(t('Over deze demo','About this demo'))+`<div class="st-help"><p>${t('De oefeningen zijn zelf geschreven. Ze zijn bedoeld voor A2 en B1; de moeilijkheid is nog niet onafhankelijk getoetst.','These exercises are original drafts targeting A2 and B1. Their difficulty has not been independently validated.')}</p><p>${t('Luisterfragmenten gebruiken een synthetische Nederlandse stem. Bij schrijven en spreken kun je een voorbeeld bekijken of je eigen antwoord nalopen. AI-feedback en spraakherkenning zijn nog niet aangesloten.','Listening clips use a synthetic Dutch voice. Writing and speaking offer prepared sample feedback and self-review. AI feedback and speech recognition are not connected yet.')}</p><p>${t('De interface kan in het Nederlands of Engels. De oefenteksten blijven Nederlands. Voortgang en concepten blijven in deze browser.','The interface is available in Dutch and English. Exercise content stays in Dutch. Progress and drafts stay in this browser.')}</p><p>${t('Deze demo is alleen lokaal beschikbaar. Er is niets gepubliceerd.','This demo is available locally. Nothing has been published.')}</p></div>`;
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.page){navigate(button.dataset.page);return;}
    if(button.dataset.filter){filter=button.dataset.filter;render();return;}
    if(button.dataset.item){const item=itemById(button.dataset.item);page=item.part;if(item.questions)startItems([item.id]);else{openId=item.id;feedback=false;view='open';render(true);}return;}
    const action=button.dataset.action;
    if(action==='a2'){state.settings.level='A2';persist();render();}
    if(action==='about'){view='about';render(true);}
    if(action==='resume'){view='session';render(true);}
    if(action==='start-mock'){startItems(itemsFor(mockPart).map(i=>i.id),'mock');}
    if(action==='retry'){startItems(state.active.ids,state.active.mode);}
    if(action==='check'){const {key}=questions()[state.active.index];if(state.active.answers[key]){state.active.checked[key]=true;persist();render();}}
    if(action==='previous'){state.active.index--;persist();render(true);}
    if(action==='next'){if(state.active.index===questions().length-1)finishSession();else{state.active.index++;persist();render(true);}}
    if(action==='sample'){state.drafts[openId]=itemById(openId).sample;feedback=false;persist();render();}
    if(action==='feedback'){feedback=true;render();main.querySelector('.st-evaluation')?.scrollIntoView({block:'nearest',behavior:'smooth'});}
    if(action==='reviewed'){record(openId,{kind:'self'});navigate(itemById(openId).part);}
  });
  main.addEventListener('change',event=>{
    if(event.target.name==='answer') {const {key}=questions()[state.active.index];state.active.answers[key]=event.target.value;persist();const button=main.querySelector('[data-action="check"], [data-action="next"]');if(button)button.disabled=false;}
  });
  main.addEventListener('input',event=>{
    if(event.target.id==='open-answer') {
      state.drafts[openId]=event.target.value;const ok=persist();
      document.getElementById('draft-status').textContent=ok?t('Concept bewaard op dit apparaat','Draft saved on this device'):t('Concept kan niet worden opgeslagen','Draft could not be saved');
      main.querySelector('[data-action="feedback"]').disabled=!event.target.value.trim();
      if(feedback){feedback=false;main.querySelector('.st-evaluation')?.remove();}
    }
  });
  persist();render();
})();
