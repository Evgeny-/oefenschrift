const { designs, current, palette, images } = logoData;
let selected = designs[0].id,
  filter = 'All',
  dark = false,
  mono = false,
  serial = 0;
let saved = new Set();
try {
  const stored = JSON.parse(localStorage.getItem('oefenschrift-logo-shortlist') || '[]');
  if (Array.isArray(stored))
    saved = new Set(stored.filter((id) => designs.some((d) => d.id === id)));
} catch {}
const $ = (id) => document.getElementById(id);
function markup(d, { icon = false, unique = true } = {}) {
  const colours = {
    ...palette,
    ink: dark ? '#f4efe6' : palette.ink,
    paper: dark ? '#242424' : palette.paper,
  };
  const prefix = 'logo-' + ++serial;
  const box = icon ? '0 0 64 64' : d.viewBox;
  let body = (icon ? d.icon : d.body).replace(/@(\w+)/g, (_, key) =>
    mono ? (key === 'paper' || key === 'detail' ? '#000' : '#fff') : colours[key],
  );
  if (mono) {
    const [x, y, w, h] = box.split(' ');
    body = `<defs><mask id="mono" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}" style="mask-type:luminance">${body}</mask></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${colours.ink}" mask="url(#mono)"/>`;
  }
  if (unique)
    body = body
      .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}-${id}"`)
      .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}-${id})`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon ? '0 0 64 64' : d.viewBox}" role="img" aria-label="Oefenschrift: ${d.title}"><title>Oefenschrift: ${d.title}</title>${body}</svg>`;
}
function draw() {
  const d = designs.find((d) => d.id === selected);
  $('selected-number').textContent = d.id.slice(0, 2) + ' / ' + d.group;
  $('selected-family').textContent = d.family;
  $('selected-title').textContent = d.title;
  $('selected-note').textContent = d.note;
  $('selected-art').innerHTML = markup(d);
  $('selected-small').innerHTML = markup(d);
  $('current-small').innerHTML = markup(current);
  $('app-logo').innerHTML = markup(d);
  for (const size of [16, 24, 40, 64]) {
    $('icon-' + size).innerHTML = markup(d, { icon: true });
    $('icon-' + size).title = `${size} × ${size}px`;
  }
  $('preview-favicon').href =
    'data:image/svg+xml,' + encodeURIComponent(markup(d, { icon: true, unique: false }));
  for (const card of document.querySelectorAll('.logo-card')) {
    const data = designs.find((d) => d.id === card.dataset.id);
    card.classList.toggle('active', data.id === selected);
    card.querySelector('.choose').setAttribute('aria-pressed', String(data.id === selected));
    card.querySelector('.swatch').innerHTML = markup(data);
  }
  $('status').textContent = `Selected ${d.title}, design ${Number(d.id.slice(0, 2))}.`;
}
function filterGallery() {
  let count = 0;
  for (const card of document.querySelectorAll('.logo-card')) {
    const d = designs.find((d) => d.id === card.dataset.id);
    const show = filter === 'All' || filter === d.group || (filter === 'Saved' && saved.has(d.id));
    card.hidden = !show;
    if (show) count++;
    const save = card.querySelector('.save');
    save.setAttribute('aria-pressed', String(saved.has(d.id)));
    save.setAttribute('aria-label', `${saved.has(d.id) ? 'Unsave' : 'Save'} ${d.title}`);
  }
  for (const button of document.querySelectorAll('[data-filter]'))
    button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  $('saved-count').textContent = saved.size;
  $('visible-count').textContent = count + ' ' + (count === 1 ? 'direction' : 'directions');
  $('empty').hidden = count !== 0;
}
function choose(id) {
  selected = id;
  draw();
  const workbench = document.querySelector('.workbench');
  if (workbench.getBoundingClientRect().bottom < 100)
    workbench.scrollIntoView({ block: 'start', behavior: 'instant' });
  try {
    history.replaceState(null, '', '#' + id);
  } catch {}
}
function download(icon = false) {
  const d = designs.find((d) => d.id === selected),
    source = markup(d, { icon, unique: false });
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' }),
    url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download =
    d.id + (icon ? '-icon' : '') + (mono ? '-mono' : '') + (dark ? '-dark' : '-light') + '.svg';
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  $('status').textContent = (icon ? 'Icon' : 'Logo') + ' SVG downloaded.';
}
$('gallery').innerHTML = designs
  .map(
    (d) =>
      `<article class="logo-card" data-id="${d.id}"><button class="choose" aria-pressed="false" aria-label="Preview ${d.id.slice(0, 2)}: ${d.title}"><span class="card-top">${d.id.slice(0, 2)} / ${d.group}${d.recommend ? '<span class="recommend"> · Start here</span>' : ''}</span><span class="swatch"></span><span class="card-title">${d.title}</span><span class="card-note">${d.note}</span></button><div class="card-bottom"><span class="micro">${d.family} · SVG outlines</span><button class="save" aria-pressed="false" aria-label="Save ${d.title}"><svg viewBox="0 0 18 22" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 2h10a1 1 0 0 1 1 1v17l-6-4-6 4V3a1 1 0 0 1 1-1Z"/></svg></button></div></article>`,
  )
  .join('');
const cardColours = ['#fff0bd', '#e1edff', '#ffe2e5', '#ece3ff', '#dff1df'];
const darkCardColours = ['#423b29', '#29384c', '#482f34', '#3a304d', '#2c3e30'];
$('mini-cards').innerHTML = ['Lezen', 'Luisteren', 'Schrijven', 'Spreken', 'KNM']
  .map(
    (label, i) =>
      `<div class="mini-card" style="--card:${cardColours[i]};--card-dark:${darkCardColours[i]}"><strong>${label}</strong><img src="${Object.values(images)[i]}" alt="" width="120" height="120"></div>`,
  )
  .join('');
$('gallery').addEventListener('click', (event) => {
  const card = event.target.closest('.logo-card');
  if (!card) return;
  if (event.target.closest('.save')) {
    saved.has(card.dataset.id) ? saved.delete(card.dataset.id) : saved.add(card.dataset.id);
    try {
      localStorage.setItem('oefenschrift-logo-shortlist', JSON.stringify([...saved]));
    } catch {
      $('status').textContent =
        'Saved for this visit. This browser could not store your shortlist.';
    }
    filterGallery();
  } else if (event.target.closest('.choose')) choose(card.dataset.id);
});
document.querySelector('.filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) {
    filter = button.dataset.filter;
    filterGallery();
  }
});
$('show-all').onclick = () => {
  filter = 'All';
  filterGallery();
};
$('theme').onclick = () => {
  dark = !dark;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('theme').setAttribute('aria-pressed', String(dark));
  draw();
};
$('mono').onclick = () => {
  mono = !mono;
  $('mono').setAttribute('aria-pressed', String(mono));
  draw();
};
$('download').onclick = () => download();
$('download-icon').onclick = () => download(true);
$('source').onclick = () => {
  const d = designs.find((d) => d.id === selected);
  $('svg-code').value = markup(d, { unique: false });
  $('copy-status').textContent = '';
  $('code-dialog').showModal();
};
$('copy').onclick = async () => {
  try {
    await navigator.clipboard.writeText($('svg-code').value);
    $('copy-status').textContent = 'Copied.';
  } catch {
    $('svg-code').focus();
    $('svg-code').select();
    $('copy-status').textContent = 'Source selected. Press ⌘C or Ctrl+C to copy.';
  }
};
const initial = location.hash.slice(1);
if (designs.some((d) => d.id === initial)) selected = initial;
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (designs.some((d) => d.id === id)) {
    selected = id;
    draw();
  }
});
draw();
filterGallery();
