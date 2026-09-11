(() => {
  const bank = window.exerciseData;
  const root = document.getElementById('demo');
  const surface = document.getElementById('exercise-surface');
  const tabs = document.getElementById('exercise-tabs');
  const palette = document.getElementById('palette');
  const themes = ['paper', 'delft', 'terracotta', 'graphic', 'garden', 'plum', 'night', 'colour'];
  const names = {
    reading: 'Lezen',
    listening: 'Luisteren',
    writing: 'Schrijven',
    sentence: 'Zin aanvullen',
    form: 'Formulier',
    speaking: 'Spreken',
    pictures: 'Plaatjes',
    knm: 'KNM',
  };
  const e = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  let current = 'reading';
  const saved = {};
  const state = () =>
    (saved[current] ||= {
      index: 0,
      chosen: '',
      checked: false,
      answer: '',
      review: false,
      error: false,
      recorded: false,
      fields: {},
      retried: false,
    });
  const audio = new Audio('media/listening.mp3');
  audio.preload = 'metadata';
  let audioError = false;
  palette.innerHTML = window.designConcepts
    .map((c, i) => `<option value="${themes[i]}">${e(c.name)}</option>`)
    .join('');
  palette.addEventListener('change', () => {
    root.dataset.theme = palette.value;
  });
  const stateLabel = document.createElement('label');
  stateLabel.className = 'palette-label';
  stateLabel.innerHTML =
    'Preview state<select id="preview-state"><option value="normal">Normal</option><option value="feedback-error">Feedback unavailable</option><option value="microphone-error">Microphone blocked</option><option value="audio-error">Audio unavailable</option></select>';
  palette.parentElement.after(stateLabel);
  const previewState = document.getElementById('preview-state');
  previewState.addEventListener('change', () => {
    state().error = false;
    state().review = false;
    state().retried = false;
    if (previewState.value === 'feedback-error') current = 'writing';
    if (previewState.value === 'microphone-error') current = 'speaking';
    if (previewState.value === 'audio-error') {
      current = 'listening';
      audio.pause();
      audioError = true;
    }
    render();
  });
  function paragraphs(text, quote) {
    let safe = e(text);
    if (quote) safe = safe.replace(e(quote), `<mark>${e(quote)}</mark>`);
    return safe
      .split('\n\n')
      .map((p) => `<p>${p.replaceAll('\n', '<br>')}</p>`)
      .join('');
  }
  function taskSheet(item) {
    const suppress = ['pictures', 'sentence'].includes(current);
    return `<section class="demo-sheet"><span class="demo-sheet-label">Opdracht</span><div class="demo-passage">${paragraphs(item.prompt)}</div>${suppress ? '' : `<ul class="demo-requirements">${item.criteria.map((c) => `<li>${e(c[0])}</li>`).join('')}</ul>`}</section>`;
  }
  function pictures(item) {
    return `<div class="demo-pictures">${item.images.map((im, i) => `<figure><a href="media/${im.file.split('/').pop()}" target="_blank" rel="noopener" aria-label="Vergroot plaatje ${i + 1}"><img src="media/${im.file.split('/').pop()}" alt="${e(im.alt)}" /></a><figcaption><a href="media/${im.file.split('/').pop()}" target="_blank" rel="noopener">${i + 1} · Vergroot</a></figcaption></figure>`).join('')}</div>`;
  }
  function closed(item) {
    const s = state(),
      q = item.questions[s.index];
    let left = '';
    if (current === 'listening')
      left = `<div class="demo-sheet"><span class="demo-sheet-label">Voicemail</span><div class="demo-player"><button class="demo-primary" data-command="play" aria-label="Afspelen" id="audio-play">▶</button><div class="demo-wave" aria-hidden="true">${item.peaks.map((p) => `<span style="height:${Math.max(4, p * 48)}px"></span>`).join('')}</div></div><input id="audio-seek" class="demo-seek" aria-label="Positie in de opname" type="range" min="0" max="${item.duration}" step="0.1" value="${audio.currentTime}" /><div class="demo-audio-footer"><span id="audio-time" class="demo-time"></span><div class="demo-speed" role="group" aria-label="Afspeelsnelheid">${[0.75, 1, 1.25].map((n) => `<button data-speed="${n}" aria-pressed="${audio.playbackRate === n}">${n}×</button>`).join('')}</div></div>${audioError ? `<div class="demo-error" role="alert"><strong>De opname kon niet worden geladen.</strong><p>Je antwoord blijft staan.</p><button data-command="audio-retry">Probeer opnieuw</button></div>` : ''}</div>${s.checked ? `<details class="demo-sheet demo-hint"><summary>Transcript bekijken</summary><div class="demo-passage">${paragraphs(item.text, q.evidence)}</div></details>` : '<p class="demo-fine">Het transcript verschijnt nadat je de vraag hebt nagekeken.</p>'}`;
    else if (current === 'knm')
      left = `<img class="demo-scene" src="media/${item.images[0].file.split('/').pop()}" alt="${e(item.images[0].alt)}" />${s.checked ? `<div class="demo-sheet"><span class="demo-sheet-label">Uitleg</span><div class="demo-passage">${paragraphs(item.text, q.evidence)}</div><p class="demo-source"><a href="${e(item.sourceUrl)}" target="_blank" rel="noopener">Bron: Rijksoverheid ↗</a></p></div>` : ''}`;
    else
      left = `<div class="demo-sheet"><span class="demo-sheet-label">Bericht</span><div class="demo-passage">${paragraphs(item.text, s.checked ? q.evidence : null)}</div></div>`;
    return `<div class="demo-progress"><span>Vraag ${s.index + 1} van ${item.questions.length}</span><progress max="${item.questions.length}" value="${s.index + (s.checked ? 1 : 0)}" aria-label="Voortgang"></progress></div><div class="demo-columns"><section>${left}</section><section class="demo-question"><fieldset><legend>${e(q.prompt)}</legend>${Object.entries(
      q.options,
    )
      .map(
        ([key, label]) =>
          `<label class="demo-option ${s.checked && key === q.answer ? 'demo-correct' : ''} ${s.checked && key === s.chosen && key !== q.answer ? 'demo-wrong' : ''}"><input type="radio" name="demo-option" value="${key}" ${s.chosen === key ? 'checked' : ''} ${s.checked ? 'disabled' : ''} /><span class="option-letter">${key}</span><span class="option-copy">${e(label)}${s.checked && key === q.answer ? ' ✓' : ''}</span></label>`,
      )
      .join(
        '',
      )}</fieldset>${s.checked ? `<div class="demo-feedback" role="status"><strong>${s.chosen === q.answer ? '✓ Goed antwoord' : 'Niet helemaal'}</strong><p>${e(q.explanation)}</p></div>` : ''}<div class="demo-actions"><button class="demo-primary" data-command="${s.checked ? 'next' : 'check'}" ${!s.chosen ? 'disabled' : ''}>${s.checked ? (s.index === item.questions.length - 1 ? 'Nog eens oefenen' : 'Volgende vraag') : 'Controleer antwoord'}</button></div></section></div>`;
  }
  function feedback(item) {
    return `<section class="demo-feedback" role="status"><span class="demo-example-tag">Voorbeeldfeedback bij het bestaande voorbeeldantwoord</span><div class="demo-proposal">${e(item.sample)}</div><ul class="demo-requirements">${item.criteria.map((c, i) => `<li>${item.quotes[i] ? '✓' : 'Nog toevoegen:'} ${e(c[0])}</li>`).join('')}</ul><div class="demo-proposal"><strong>Een mogelijk antwoord</strong><p>${e(item.model)}</p></div><p class="demo-fine">Andere woorden kunnen ook. Controleer of de betekenis klopt.</p><div class="demo-actions"><button data-command="edit">Antwoord bewerken</button></div></section>`;
  }
  function openError() {
    return `<div class="demo-error" role="alert"><strong>Feedback is even niet beschikbaar.</strong><p>Je tekst staat er nog. Probeer het opnieuw of werk verder.</p><div class="demo-actions"><button data-command="retry">Opnieuw proberen</button><button data-command="dismiss">Verder schrijven</button></div></div>`;
  }
  function answerWorkspace(item) {
    const s = state();
    const speaking = ['speaking', 'pictures'].includes(current);
    const micBlocked = s.error && previewState.value === 'microphone-error';
    return `<section class="demo-question">${speaking ? `<div class="demo-recorder"><div class="demo-actions"><button class="demo-primary" data-command="record">${s.recorded ? 'Opnieuw opnemen' : 'Opnemen'}</button><button class="demo-quiet" data-command="type">Liever typen</button></div>${s.recorded ? '<p class="demo-fine">Lees je transcript na voordat je feedback vraagt.</p>' : ''}${micBlocked ? '<div class="demo-error" role="alert"><strong>De microfoon is niet beschikbaar.</strong><p>Je kunt hieronder typen.</p><button data-command="type">Typ je antwoord</button></div>' : ''}</div>` : ''}<label class="demo-answer-label" for="demo-answer">${speaking ? 'Jouw antwoord' : 'Jouw bericht'}</label><textarea id="demo-answer" placeholder="Schrijf hier in het Nederlands…">${e(s.answer)}</textarea>${s.review ? feedback(item) : `<div class="demo-actions"><button class="demo-primary" data-command="review" ${!s.answer.trim() ? 'disabled' : ''}>Laat nakijken</button><button class="demo-quiet" data-command="sample">Vul het voorbeeld in</button></div>${s.error && !micBlocked ? openError() : ''}`}</section>`;
  }
  function open(item) {
    return `<div class="demo-columns"><section>${current === 'pictures' ? pictures(item) : ''}${taskSheet(item)}</section>${answerWorkspace(item)}</div>`;
  }
  function sentence(item) {
    const s = state(),
      parts = item.scaffold.body.split('___');
    const punctuation = parts[1].match(/^[.,;:!?]/)?.[0] || '';
    const continuation = parts[1].slice(punctuation.length).trimStart();
    return `<section class="demo-sheet demo-sentence-sheet"><span class="demo-sheet-label">Maak de zin af</span><dl class="demo-mail-meta"><dt>Aan</dt><dd>${e(item.scaffold.to)}</dd><dt>Onderwerp</dt><dd>${e(item.scaffold.subject)}</dd></dl><div class="demo-passage"><p>${e(item.scaffold.salutation)}</p><p>${e(parts[0])}<span class="demo-gap-wrap"><input id="demo-answer" class="demo-gap" aria-label="Maak de zin na Daarom af" placeholder="Maak deze zin af…" value="${e(s.answer)}" /><span>${e(punctuation)}</span></span>${e(continuation)}</p><p>${e(item.scaffold.closing)}</p></div>${s.review ? feedback(item) : `<div class="demo-actions"><button class="demo-primary" data-command="review" ${!s.answer.trim() ? 'disabled' : ''}>Laat nakijken</button><button class="demo-quiet" data-command="sample">Vul het voorbeeld in</button></div>${s.error ? openError() : ''}`}</section>`;
  }
  function form(item) {
    const s = state();
    return `<div class="demo-columns"><section>${taskSheet(item)}<p class="demo-fine">Gebruik verzonnen persoonsgegevens voor deze oefening.</p></section><section class="demo-sheet"><span class="demo-sheet-label">Melding aan de gemeente</span><form class="demo-form" id="task-form">${item.formFields.map((f, i) => (f.kind === 'choice' ? `<fieldset><legend>${e(f.label)}</legend>${f.options.map((o) => `<label class="demo-choice"><input type="radio" name="form-${i}" data-field="${i}" value="${e(o)}" ${s.fields[i] === o ? 'checked' : ''} /> ${e(o)}</label>`).join('')}</fieldset>` : `<label class="${f.kind === 'open' ? 'long' : ''}"><span>${e(f.label)}</span>${f.kind === 'open' ? `<textarea data-field="${i}" rows="2">${e(s.fields[i])}</textarea>` : `<input data-field="${i}" value="${e(s.fields[i])}" autocomplete="off" />`}</label>`)).join('')}</form>${s.review ? feedback(item) : `<div class="demo-actions"><button class="demo-primary" data-command="review" ${!Object.values(s.fields).some((v) => v.trim()) ? 'disabled' : ''}>Laat nakijken</button></div>${s.error ? openError() : ''}`}</section></div>`;
  }
  function render() {
    const s = state(),
      item = bank[current];
    tabs.innerHTML = Object.entries(names)
      .map(
        ([key, name]) =>
          `<button data-exercise="${key}" aria-pressed="${key === current}">${name}</button>`,
      )
      .join('');
    surface.innerHTML = `<header class="demo-exercise-heading"><div><h2>${e(item.title)}</h2><p class="demo-meta">${current === 'knm' ? 'KNM' : item.level + ' · ' + (names[item.part] || names[current])}</p></div><span class="demo-report">Oefenvoorbeeld</span></header>${item.questions ? closed(item) : current === 'sentence' ? sentence(item) : current === 'form' ? form(item) : open(item)}`;
    if (current === 'listening') updateAudio();
    surface.querySelector('form')?.addEventListener('submit', (ev) => ev.preventDefault());
  }
  tabs.addEventListener('click', (ev) => {
    const button = ev.target.closest('[data-exercise]');
    if (!button) return;
    if (current === 'listening' && button.dataset.exercise !== 'listening') audio.pause();
    current = button.dataset.exercise;
    render();
    tabs.querySelector(`[data-exercise="${current}"]`).focus({ preventScroll: true });
  });
  function requestReview() {
    const s = state();
    if (previewState.value === 'feedback-error' && !s.retried) {
      s.error = true;
    } else {
      s.review = true;
      s.error = false;
    }
    render();
  }
  surface.addEventListener('input', (ev) => {
    const s = state();
    if (ev.target.id === 'demo-answer') {
      s.answer = ev.target.value;
      const review = surface.querySelector('[data-command="review"]');
      if (review) review.disabled = !s.answer.trim();
      if (s.review) {
        s.review = false;
        surface.querySelector('.demo-feedback')?.remove();
        const action = document.createElement('div');
        action.className = 'demo-actions';
        action.innerHTML =
          '<button class="demo-primary" data-command="review">Laat nakijken</button>';
        ev.target.closest('.demo-question,.demo-sentence-sheet').append(action);
      }
    }
    if (ev.target.dataset.field !== undefined) {
      s.fields[ev.target.dataset.field] = ev.target.value;
      const review = surface.querySelector('[data-command="review"]');
      if (review) review.disabled = !Object.values(s.fields).some((v) => v.trim());
    }
    if (ev.target.id === 'audio-seek' && Number.isFinite(audio.duration))
      audio.currentTime = Number(ev.target.value);
  });
  surface.addEventListener('change', (ev) => {
    if (ev.target.name === 'demo-option') {
      state().chosen = ev.target.value;
      surface.querySelector('[data-command="check"]').disabled = false;
    }
  });
  surface.addEventListener('click', async (ev) => {
    const button = ev.target.closest('button');
    if (!button) return;
    const s = state(),
      item = bank[current],
      command = button.dataset.command;
    if (button.dataset.speed) {
      audio.playbackRate = Number(button.dataset.speed);
      surface
        .querySelectorAll('[data-speed]')
        .forEach((el) =>
          el.setAttribute('aria-pressed', String(Number(el.dataset.speed) === audio.playbackRate)),
        );
      return;
    }
    if (command === 'check') {
      s.checked = true;
      render();
    }
    if (command === 'next') {
      s.index = (s.index + 1) % item.questions.length;
      s.chosen = '';
      s.checked = false;
      render();
    }
    if (command === 'sample') {
      s.answer = item.sample;
      s.review = false;
      render();
      surface.querySelector('#demo-answer')?.focus({ preventScroll: true });
    }
    if (command === 'review') requestReview();
    if (command === 'edit') {
      s.review = false;
      render();
      surface.querySelector('#demo-answer')?.focus({ preventScroll: true });
    }
    if (command === 'retry') {
      s.retried = true;
      requestReview();
    }
    if (command === 'dismiss') {
      s.error = false;
      render();
      surface.querySelector('#demo-answer')?.focus({ preventScroll: true });
    }
    if (command === 'record') {
      if (previewState.value === 'microphone-error') {
        s.error = true;
      } else {
        s.recorded = true;
        s.error = false;
        if (!s.answer) s.answer = item.sample;
      }
      render();
    }
    if (command === 'type') {
      s.error = false;
      render();
      surface.querySelector('#demo-answer').focus({ preventScroll: true });
    }
    if (command === 'play') {
      if (audioError) {
        render();
        return;
      }
      if (audio.paused) {
        try {
          await audio.play();
        } catch {
          audioError = true;
          render();
        }
      } else audio.pause();
      updateAudio();
    }
    if (command === 'audio-retry') {
      audioError = false;
      previewState.value = 'normal';
      audio.src = 'media/listening.mp3';
      audio.load();
      render();
    }
  });
  function updateAudio() {
    if (current !== 'listening') return;
    const time = surface.querySelector('#audio-time'),
      seek = surface.querySelector('#audio-seek'),
      play = surface.querySelector('#audio-play');
    const seconds = (n) => Math.floor(n / 60) + ':' + String(Math.floor(n % 60)).padStart(2, '0');
    const duration = Number.isFinite(audio.duration) ? audio.duration : bank.listening.duration;
    if (time) time.textContent = seconds(audio.currentTime) + ' / ' + seconds(duration);
    if (seek) {
      seek.value = String(audio.currentTime);
      seek.max = String(duration);
    }
    if (play) {
      play.textContent = audio.paused ? '▶' : 'Ⅱ';
      play.setAttribute('aria-label', audio.paused ? 'Afspelen' : 'Pauzeren');
    }
    surface
      .querySelectorAll('.demo-wave span')
      .forEach((span, i, all) =>
        span.classList.toggle('played', i / all.length < audio.currentTime / duration),
      );
  }
  for (const event of ['timeupdate', 'loadedmetadata', 'play', 'pause', 'ended'])
    audio.addEventListener(event, updateAudio);
  audio.addEventListener('error', () => {
    audioError = true;
    if (current === 'listening') render();
  });
  document.getElementById('demo-reset').addEventListener('click', () => {
    delete saved[current];
    audio.pause();
    audio.currentTime = 0;
    render();
  });
  render();
})();
