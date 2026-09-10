// The "Oefenschrift" mark in many typefaces: the O cut in two, the upper part and the
// dot of the i in the accent colour, a hairline of paper along the cut. Builds the
// typeface review page (cut angle and share adjustable), the ideas page from
// designs.mjs, and the module behind the site's wordmark.
//
//   npm install --no-save opentype.js
//   node docs/logos/fonts.mjs
//
// Missing font files are fetched from Google Fonts into docs/logos/fonts/ (ignored
// by git). Every face is under the SIL Open Font License.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { loadFont, layout, bounds, viewBox, oGeometry, clipBoxes, cut, dotted, slug } from './lib.mjs';
import { designs, buildDesignsPage } from './designs.mjs';
const here = path.dirname(new URL(import.meta.url).pathname),
  root = path.resolve(here, '../..');
const WORD = 'Oefenschrift';
// Grouped by flavour, closest to the reference picture first.
const groups = [
  {
    title: 'Geometric and round',
    note: 'Closest to the reference picture.',
    fonts: [
      ['Poppins', 700],
      ['Outfit', 700],
      ['Lexend', 700],
      ['Urbanist', 700],
      ['Sora', 700],
      ['Figtree', 800],
      ['Plus Jakarta Sans', 800],
      ['Manrope', 800],
      ['Red Hat Display', 700],
      ['Nunito', 800],
      ['Gabarito', 700],
      ['Readex Pro', 700],
      ['Kumbh Sans', 700],
      ['Albert Sans', 700],
      ['Onest', 700],
      ['Geologica', 700],
      ['Montserrat', 700],
      ['Jost', 700],
      ['Quicksand', 700],
      ['Fredoka', 600],
      ['Comfortaa', 700],
      ['Varela Round', 400],
      ['Dosis', 700],
      ['Baloo 2', 800],
    ],
  },
  {
    title: 'Humanist and grotesque',
    note: 'Public Sans was the site’s text face before Fira Sans.',
    fonts: [
      ['Public Sans', 700],
      ['DM Sans', 700],
      ['Inter', 700],
      ['Work Sans', 700],
      ['Rubik', 700],
      ['Instrument Sans', 700],
      ['Raleway', 800],
      ['Nunito Sans', 800],
      ['Source Sans 3', 700],
      ['Lato', 700],
      ['Fira Sans', 700],
      ['Cabin', 700],
      ['Mulish', 800],
      ['Karla', 700],
      ['Ubuntu', 700],
      ['Signika', 700],
      ['Overpass', 700],
      ['Archivo', 700],
      ['Hanken Grotesk', 700],
      ['Schibsted Grotesk', 700],
      ['IBM Plex Sans', 700],
      ['Golos Text', 700],
      ['Be Vietnam Pro', 700],
      ['Chivo', 700],
      ['Epilogue', 700],
      ['Space Grotesk', 700],
      ['Bricolage Grotesque', 700],
      ['Syne', 700],
      ['Unbounded', 600],
    ],
  },
  {
    title: 'Condensed and wide',
    note: '',
    fonts: [
      ['Barlow Condensed', 700],
      ['Oswald', 600],
      ['Archivo Narrow', 700],
      ['Roboto Condensed', 700],
      ['Fjalla One', 400],
      ['Saira Condensed', 700],
      ['Antonio', 700],
      ['Archivo Black', 400],
      ['Krona One', 400],
      ['Big Shoulders Display', 700],
      ['Michroma', 400],
      ['Exo 2', 700],
      ['Rajdhani', 700],
    ],
  },
  {
    title: 'Serif',
    note: '',
    fonts: [
      ['Fraunces', 700],
      ['Playfair Display', 700],
      ['DM Serif Display', 400],
      ['Lora', 700],
      ['Merriweather', 700],
      ['Libre Baskerville', 700],
      ['Source Serif 4', 700],
      ['Newsreader', 700],
      ['Instrument Serif', 400],
      ['Young Serif', 400],
      ['Bodoni Moda', 700],
      ['Gloock', 400],
      ['Abril Fatface', 400],
      ['Cormorant Garamond', 700],
    ],
  },
  {
    title: 'Slab',
    note: '',
    fonts: [
      ['Bitter', 700],
      ['Roboto Slab', 700],
      ['Zilla Slab', 700],
      ['Arvo', 700],
      ['Alfa Slab One', 400],
      ['Josefin Slab', 700],
      ['Crete Round', 400],
    ],
  },
  {
    title: 'Display',
    note: '',
    fonts: [
      ['Righteous', 400],
      ['Lilita One', 400],
      ['Titan One', 400],
      ['Chango', 400],
      ['Sansita', 700],
      ['Rammetto One', 400],
      ['Bowlby One', 400],
      ['Passion One', 700],
      ['Paytone One', 400],
      ['Concert One', 400],
      ['Chewy', 400],
      ['Bubblegum Sans', 400],
      ['Shrikhand', 400],
      ['Anton', 400],
      ['Audiowide', 400],
      ['Orbitron', 700],
    ],
  },
  {
    title: 'Script and handwritten',
    note: '',
    fonts: [
      ['Lobster', 400],
      ['Pacifico', 400],
      ['Kaushan Script', 400],
      ['Caveat', 700],
      ['Kalam', 700],
      ['Patrick Hand', 400],
    ],
  },
  {
    title: 'Monospace',
    note: '',
    fonts: [
      ['JetBrains Mono', 700],
      ['Space Mono', 700],
      ['IBM Plex Mono', 700],
      ['Courier Prime', 700],
    ],
  },
];
// One face: the O's geometry and the other letters as ready markup.
function build(font, name, weight) {
  const glyphs = layout(font, WORD);
  return {
    id: 'oefenschrift-' + slug(name),
    name: 'Oefenschrift',
    font: name,
    weight,
    viewBox: viewBox(bounds(glyphs)),
    o: oGeometry(glyphs[0]),
    rest: glyphs.slice(1).map(dotted).join(''),
  };
}
export function markup(logo, options = cut) {
  const boxes = clipBoxes(logo.o, options);
  return (
    `<defs><clipPath id="${logo.id}-top">${boxes.top}</clipPath><clipPath id="${logo.id}-bottom">${boxes.bottom}</clipPath></defs>` +
    `<path class="accent" clip-path="url(#${logo.id}-top)" d="${logo.o.d}"/><path class="ink" clip-path="url(#${logo.id}-bottom)" d="${logo.o.d}"/>${logo.rest}`
  );
}
const built = [];
for (const group of groups)
  for (const [name, weight] of group.fonts) {
    try {
      built.push({ ...build(await loadFont(name, weight), name, weight), group: group.title });
    } catch (e) {
      console.error(`Skipped ${name}: ${e.message}`);
    }
  }
// The review page: the reference picture, the cut controls, then every face large and
// at sidebar size. Each face is one <symbol> the tiles reference, so the page stays small.
const reference = fs.readFileSync(path.join(here, 'reference-oefenschrift.png')).toString('base64');
const symbols = built
  .map((l) => `<symbol id="${l.id}" viewBox="${l.viewBox}" data-o='${JSON.stringify(l.o)}'>${markup(l)}</symbol>`)
  .join('');
// The outer box starts at 0 0: the symbol's own viewBox carries the offset.
const use = (l) => {
  const [, , w, h] = l.viewBox.split(' ');
  return `<svg role="img" aria-label="${l.name}" viewBox="0 0 ${w} ${h}"><use href="#${l.id}"/></svg>`;
};
const rows = groups
  .map(
    (group) => `<section><h2>${group.title}</h2>${group.note ? `<p>${group.note}</p>` : ''}${built
      .filter((l) => l.group === group.title)
      .map(
        (l) => `<div class="row"><div class="big">${use(l)}</div><div class="tile light">${use(l)}</div><div class="tile dark">${use(l)}</div><p><strong>${l.font}</strong> ${l.weight}${l.font === 'Nunito' ? ' · the site’s mark' : ''}</p></div>`,
      )
      .join('')}</section>`,
  )
  .join('');
const script = `
const boxes = ${clipBoxes.toString()};
const form = document.querySelector('form');
function apply() {
  const options = { angle: Number(form.angle.value), share: Number(form.share.value) / 100, gap: form.gap.checked ? 0.05 : 0 };
  document.getElementById('angle-value').textContent = options.angle + '°';
  document.getElementById('share-value').textContent = form.share.value + '%';
  for (const symbol of document.querySelectorAll('symbol')) {
    const b = boxes(JSON.parse(symbol.dataset.o), options), tmp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tmp.innerHTML = b.top + b.bottom;
    symbol.querySelector('clipPath[id$=-top]').replaceChildren(tmp.children[0]);
    symbol.querySelector('clipPath[id$=-bottom]').replaceChildren(tmp.children[0]);
  }
}
form.addEventListener('input', apply);
for (const button of document.querySelectorAll('[data-angle]'))
  button.addEventListener('click', () => { form.angle.value = button.dataset.angle; apply(); });
`;
fs.writeFileSync(
  path.join(here, 'oefenschrift-fonts.html'),
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Oefenschrift · typefaces</title><style>
body{margin:0;padding:2rem 1.5rem 4rem;background:#f3efe6;color:#221f1a;font:14px/1.5 "Public Sans",system-ui,sans-serif;--ink:#221f1a;--accent:#efbf24}
main{max-width:64rem;margin:0 auto}h1{font-size:1.35rem;margin:0 0 .25rem}h2{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#6f6a5e;margin:2.5rem 0 .25rem}
p{margin:0;color:#6f6a5e}.reference{display:flex;align-items:center;gap:1.5rem;margin:1.25rem 0 0}.reference img{height:56px;border-radius:.5rem}
form{position:sticky;top:0;z-index:1;display:flex;flex-wrap:wrap;gap:1rem 2rem;align-items:center;margin:1.25rem -1.5rem 0;padding:.75rem 1.5rem;background:#f3efe6;border-bottom:1px solid #e2dccd}
form label{display:flex;align-items:center;gap:.5rem}form output{min-width:2.5rem;font-variant-numeric:tabular-nums}form input[type=range]{width:9rem;accent-color:#221f1a}
form button{font:inherit;font-size:12px;padding:.15rem .5rem;border:1px solid #ddd6c4;border-radius:999px;background:#fffdf9;color:#221f1a;cursor:pointer}
.row{display:grid;grid-template-columns:minmax(20rem,auto) 11rem 11rem 1fr;gap:1.5rem;align-items:center;padding:.65rem 0;border-bottom:1px solid #e2dccd}
.big svg{display:block;height:52px;width:auto}.tile{padding:.55rem .7rem;border-radius:.5rem;background:#f3efe6}.tile svg{display:block;max-width:10rem;max-height:2rem;width:auto}
.tile.dark{background:#242424;--ink:#eeece5;--accent:#edc343}.ink{fill:var(--ink)}.accent{fill:var(--accent)}
@media (max-width:52rem){.row{grid-template-columns:1fr 1fr}.big{grid-column:1/-1}.big svg{height:auto;width:100%;max-height:52px}}
</style><body><main><h1>Oefenschrift in ${built.length} typefaces</h1><p>The O cut in two, the upper part and the dot of the i in the accent colour, a hairline of paper along the cut. Each face large, then at sidebar size in the light and dark themes. The cut applies to every face.</p><div class="reference"><img src="data:image/png;base64,${reference}" alt="Reference picture"><p>The reference picture.</p></div>
<form onsubmit="return false"><label>Cut angle <input type="range" name="angle" min="-90" max="90" step="5" value="${cut.angle}"><output id="angle-value">${cut.angle}°</output></label><span>${[-45, -30, -15, 0, 15, 30, 45, 90].map((a) => `<button type="button" data-angle="${a}">${a}°</button>`).join(' ')}</span><label>Accent share <input type="range" name="share" min="30" max="60" step="1" value="${cut.share * 100}"><output id="share-value">${cut.share * 100}%</output></label><label><input type="checkbox" name="gap" checked> Hairline gap</label></form>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>${rows}</main><script>${script}</script></body></html>`,
);
// The site's wordmark: the chosen face with the default cut baked in. The ink class
// follows currentColor and the accent class --action, so the mark works in both themes.
const chosen = built.find((l) => l.font === 'Nunito'), siteCut = { ...cut, angle: 0 };
fs.writeFileSync(
  path.join(root, 'app/components/logo.ts'),
  `// Generated by docs/logos/fonts.mjs: the Oefenschrift mark in ${chosen.font} ${chosen.weight}, the O cut
// in two with the upper part and the dot of the i in the accent colour. Path markup in
// a 100px em; the ink class follows currentColor and the accent class --action. The
// origin is the O's centre, around which the cut turns when the mark is clicked.
export const logo = ${JSON.stringify({ id: chosen.id, name: chosen.name, viewBox: chosen.viewBox, origin: `${chosen.o.cx}px ${chosen.o.cy}px`, markup: markup(chosen, siteCut) }, null, 2)};
`,
);
execFileSync('npx', ['prettier', '--write', 'app/components/logo.ts'], { cwd: root, stdio: 'ignore' });
console.log(`${built.length} faces, ${buildDesignsPage()} ideas; the site's mark is ${chosen.font}`);
