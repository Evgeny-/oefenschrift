const concepts = window.designConcepts;
const grid = document.getElementById('concept-grid');
const selected = new Set();
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
grid.innerHTML = concepts
  .map(
    (c, i) =>
      `<article class="concept" id="${c.id}"><button class="concept-art" data-enlarge="${c.id}" aria-label="Enlarge ${esc(c.name)}"><img src="images/${c.id}.png" alt="${esc(c.name)}: ${esc(c.description)}" loading="${i < 2 ? 'eager' : 'lazy'}" /></button><div class="concept-description"><div class="concept-heading"><div class="concept-title"><small>${String(i + 1).padStart(2, '0')}</small><h3>${esc(c.name)}</h3></div><label class="concept-select"><input type="checkbox" value="${c.id}" /> Compare</label></div><span class="concept-tag">${esc(c.tag)}</span><p>${esc(c.description)}</p><div class="concept-tools"><a href="images/${c.id}.png" target="_blank" rel="noopener">Open full size ↗</a><a href="#components" data-try="${i}">Try the palette</a></div></div></article>`,
  )
  .join('');
const compare = document.getElementById('compare');
grid.addEventListener('change', (e) => {
  if (!e.target.matches('input[type="checkbox"]')) return;
  if (e.target.checked) selected.add(e.target.value);
  else selected.delete(e.target.value);
  for (const input of grid.querySelectorAll('input'))
    input.disabled = selected.size === 2 && !input.checked;
  compare.disabled = selected.size !== 2;
  document.getElementById('selection-status').textContent =
    selected.size === 2
      ? 'Ready to compare.'
      : selected.size === 1
        ? 'Select one more.'
        : 'Select two below.';
});
const dialog = document.getElementById('lightbox');
function enlarge(ids) {
  const current = ids.map((id) => concepts.find((c) => c.id === id));
  document.getElementById('lightbox-title').textContent = current.map((c) => c.name).join(' / ');
  const content = document.getElementById('lightbox-content');
  content.className = ids.length === 2 ? 'pair' : '';
  content.innerHTML = current
    .map(
      (c) =>
        `<figure><a href="images/${c.id}.png" target="_blank" rel="noopener"><img src="images/${c.id}.png" alt="${esc(c.name)} homepage mockup" /></a><figcaption>${esc(c.description)}</figcaption></figure>`,
    )
    .join('');
  dialog.showModal();
}
grid.addEventListener('click', (e) => {
  const button = e.target.closest('[data-enlarge]');
  if (button) enlarge([button.dataset.enlarge]);
  const link = e.target.closest('[data-try]');
  if (link) {
    const picker = document.getElementById('palette');
    picker.selectedIndex = Number(link.dataset.try);
    picker.dispatchEvent(new Event('change'));
  }
});
grid.addEventListener(
  'error',
  (e) => {
    if (e.target.tagName !== 'IMG') return;
    const holder = e.target.parentElement;
    const source = e.target.getAttribute('src');
    holder.replaceChildren(
      Object.assign(document.createElement('span'), {
        className: 'image-error',
        textContent: 'The image could not load. Click to open the full-size file.',
      }),
    );
    holder.addEventListener('click', () => window.open(source, '_blank', 'noopener'), {
      once: true,
    });
  },
  true,
);
compare.addEventListener('click', () => enlarge([...selected]));
document.getElementById('close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      dialog.close();
  }
});
