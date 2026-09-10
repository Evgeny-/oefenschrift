// The September 2026 typeface round: a soft face for headings and the wordmark, and a
// text face for everything else (buttons included). The site settled on Nunito and Fira
// Sans (base.css); this keeps the comparison reproducible. It fetches each face into
// assets/fonts/eval/ (ignored by git; scripts/prepare.ts copies it to public/fonts/eval/)
// and writes docs/logos/out/typefaces.css — @font-face rules and, per face, a
// `[data-font]` / `[data-headings]` block — and typefaces.json with the two lists. To
// compare again, import the stylesheet, set the attributes on <html>, and pick.
//
//   npm install --no-save opentype.js
//   node docs/logos/typefaces.mjs
//
// Every face is under the SIL Open Font License; the notices are collected into
// assets/fonts/eval/LICENSES.txt from the font files themselves.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
const here = path.dirname(new URL(import.meta.url).pathname),
  root = path.resolve(here, '../..'),
  dir = path.join(root, 'assets/fonts/eval');
// Heading faces: Nunito and faces as soft as it. Weights 700 for headings and the
// wordmark, 800 for the page title where the family has it.
const headings = [
  { group: 'Rounded', id: 'nunito', label: 'Nunito', family: 'Nunito', weights: [700, 800] },
  { group: 'Rounded', id: 'quicksand', label: 'Quicksand', family: 'Quicksand', weights: [700] },
  { group: 'Rounded', id: 'comfortaa', label: 'Comfortaa', family: 'Comfortaa', weights: [700] },
  { group: 'Rounded', id: 'fredoka', label: 'Fredoka', family: 'Fredoka', weights: [600, 700] },
  { group: 'Rounded', id: 'baloo', label: 'Baloo 2', family: 'Baloo 2', weights: [700, 800] },
  { group: 'Rounded', id: 'mplus', label: 'M PLUS Rounded 1c', family: 'M PLUS Rounded 1c', weights: [700, 800] },
  { group: 'Rounded', id: 'sen', label: 'Sen', family: 'Sen', weights: [700, 800] },
  { group: 'Rounded', id: 'dosis', label: 'Dosis', family: 'Dosis', weights: [700, 800] },
  { group: 'Soft geometric', id: 'figtree', label: 'Figtree', family: 'Figtree', weights: [700, 800] },
  { group: 'Soft geometric', id: 'outfit', label: 'Outfit', family: 'Outfit', weights: [700, 800] },
  { group: 'Soft geometric', id: 'urbanist', label: 'Urbanist', family: 'Urbanist', weights: [700, 800] },
  { group: 'Soft geometric', id: 'poppins', label: 'Poppins', family: 'Poppins', weights: [700, 800] },
  { group: 'Soft geometric', id: 'plus-jakarta', label: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', weights: [700, 800] },
  { group: 'Soft geometric', id: 'red-hat-display', label: 'Red Hat Display', family: 'Red Hat Display', weights: [700, 800] },
  { group: 'Soft geometric', id: 'wix-madefor-display', label: 'Wix Madefor Display', family: 'Wix Madefor Display', weights: [700, 800] },
  { group: 'Soft geometric', id: 'gabarito', label: 'Gabarito', family: 'Gabarito', weights: [700, 800] },
  { group: 'Soft geometric', id: 'rubik', label: 'Rubik', family: 'Rubik', weights: [700, 800] },
  { group: 'Soft humanist', id: 'mulish', label: 'Mulish', family: 'Mulish', weights: [700, 800] },
  { group: 'Soft humanist', id: 'signika', label: 'Signika', family: 'Signika', weights: [600, 700] },
  { group: 'Soft humanist', id: 'asap', label: 'Asap', family: 'Asap', weights: [700, 800] },
  { group: 'Soft humanist', id: 'livvic', label: 'Livvic', family: 'Livvic', weights: [700] },
  { group: 'Soft humanist', id: 'lexend', label: 'Lexend', family: 'Lexend', weights: [700, 800] },
];
// Text faces: 400 text, 600 interface bold, 700 for emphasis where a face's 600 reads light.
const texts = [
  { group: 'Companion and humanist', id: 'nunito-sans', label: 'Nunito Sans', family: 'Nunito Sans', weights: [400, 600, 700], strong: 700 },
  { group: 'Companion and humanist', id: 'open-sans', label: 'Open Sans', family: 'Open Sans', weights: [400, 600, 700] },
  { group: 'Companion and humanist', id: 'source-sans', label: 'Source Sans 3', family: 'Source Sans 3', weights: [400, 600, 700] },
  { group: 'Companion and humanist', id: 'lato', label: 'Lato', family: 'Lato', weights: [400, 700], strong: 700 },
  { group: 'Companion and humanist', id: 'fira-sans', label: 'Fira Sans', family: 'Fira Sans', weights: [400, 600, 700] },
  { group: 'Companion and humanist', id: 'mulish', label: 'Mulish', family: 'Mulish', weights: [400, 600, 700] },
  { group: 'Companion and humanist', id: 'cabin', label: 'Cabin', family: 'Cabin', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'public-sans', label: 'Public Sans', family: 'Public Sans', weights: [] },
  { group: 'Neutral', id: 'inter', label: 'Inter', family: 'Inter', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'hanken', label: 'Hanken Grotesk', family: 'Hanken Grotesk', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'golos', label: 'Golos Text', family: 'Golos Text', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'instrument-sans', label: 'Instrument Sans', family: 'Instrument Sans', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'plex-sans', label: 'IBM Plex Sans', family: 'IBM Plex Sans', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'work-sans', label: 'Work Sans', family: 'Work Sans', weights: [400, 600, 700] },
  { group: 'Neutral', id: 'red-hat-text', label: 'Red Hat Text', family: 'Red Hat Text', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'figtree', label: 'Figtree', family: 'Figtree', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'dm-sans', label: 'DM Sans', family: 'DM Sans', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'rubik', label: 'Rubik', family: 'Rubik', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'wix-madefor', label: 'Wix Madefor Text', family: 'Wix Madefor Text', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'albert-sans', label: 'Albert Sans', family: 'Albert Sans', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'manrope', label: 'Manrope', family: 'Manrope', weights: [400, 600, 700] },
  { group: 'Rounded and geometric', id: 'plus-jakarta', label: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', weights: [400, 600, 700] },
  { group: 'Made for reading', id: 'atkinson', label: 'Atkinson Hyperlegible Next', family: 'Atkinson Hyperlegible Next', weights: [400, 600, 700] },
  { group: 'Made for reading', id: 'readex', label: 'Readex Pro', family: 'Readex Pro', weights: [400, 600, 700] },
  { group: 'Made for reading', id: 'lexend', label: 'Lexend', family: 'Lexend', weights: [400, 600, 700] },
];
// Nunito (headings, the wordmark) and Fira Sans (text) are the defaults, so their files
// live with Public Sans, tracked; the rest stay in the ignored evaluation folder.
const tracked = new Set(['Nunito', 'Fira Sans']);
const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');
const ua = 'Mozilla/5.0 (Windows NT 6.1; rv:27.0) Gecko/20100101 Firefox/27.0';
// One family and weight, fetched once.
async function fetchFace(family, weight) {
  const home = tracked.has(family) ? path.join(root, 'assets/fonts') : dir, base = path.join(home, `${slug(family)}-${weight}`);
  const existing = ['woff', 'ttf'].map((ext) => `${base}.${ext}`).find((f) => fs.existsSync(f));
  if (existing) return existing;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, '+')}:wght@${weight}`, { headers: { 'User-Agent': ua } })).text();
  const url = css.match(/url\((https:[^)]+\.(woff|ttf))\)/);
  if (!url) throw new Error(`No file for ${family} ${weight}`);
  const file = `${base}.${url[2]}`;
  fs.mkdirSync(home, { recursive: true });
  fs.writeFileSync(file, Buffer.from(await (await fetch(url[1])).arrayBuffer()));
  return file;
}
// Public Sans's x-height as a share of the em: every text face is adjusted to it, so the
// reading size stays the same without touching the root size and the rem layout.
const xHeight = (file) => -opentype.loadSync(file).charToGlyph('x').getPath(0, 0, 1).getBoundingBox().y1;
const publicSans = Math.round(xHeight(path.join(root, 'assets/fonts/public-sans-400.ttf')) * 1000) / 1000;
const faces = new Map(), notices = new Map();
let css = `/* Generated by docs/logos/typefaces.mjs. The root attributes name the heading face (headings
   and the wordmark) and the text face (everything else, buttons included). Text faces are
   adjusted to Public Sans's x-height, so the reading size and the rem layout stay the same
   whichever face is chosen; heading faces keep their nominal size, with the title and the
   section sizes a step smaller than Public Sans had, and take 700, or 800 for the page
   title where the family has it. */
`;
for (const { family, weights } of [...headings, ...texts]) {
  for (const weight of weights) {
    if (faces.has(`${family} ${weight}`)) continue;
    const file = await fetchFace(family, weight);
    faces.set(`${family} ${weight}`, file);
    if (!notices.has(family)) {
      const font = opentype.loadSync(file);
      notices.set(family, `${font.names.copyright?.en || family}\n${font.names.license?.en || 'SIL Open Font License, Version 1.1'}`);
    }
    css += `@font-face {\n  font-family: '${family}';\n  src: url('/fonts/${tracked.has(family) ? '' : 'eval/'}${path.basename(file)}') format('${file.endsWith('.ttf') ? 'truetype' : 'woff'}');\n  font-weight: ${weight};\n  font-display: swap;\n}\n`;
  }
}
css += `:root[data-font] {
  font-family: var(--font-text), 'Helvetica Neue', sans-serif;
  font-size-adjust: ${publicSans};
}
:root[data-font] strong {
  font-weight: var(--weight-strong);
}
:root[data-headings] {
  --text-title: 1.625rem;
  --text-section: 1.0625rem;
}
:root[data-headings] h1,
:root[data-headings] h2,
:root[data-headings] h3,
:root[data-headings] .wordmark {
  font-family: var(--font-headings), 'Helvetica Neue', sans-serif;
  font-size-adjust: none;
}
:root[data-headings] h1 {
  font-weight: var(--weight-title);
  letter-spacing: -0.02em;
}
:root[data-headings] h2,
:root[data-headings] h3,
:root[data-headings] .wordmark {
  font-weight: var(--weight-heading);
}
:root[data-headings] .home-hero h1 {
  font-size: 2.125rem;
}
@media (max-width: 44rem) {
  :root[data-headings] .home-hero h1 {
    font-size: 1.625rem;
  }
}
`;
for (const option of headings) {
  const title = Math.max(...option.weights), heading = Math.min(...option.weights);
  css += `:root[data-headings='${option.id}'] {\n  --font-headings: '${option.family}';\n  --weight-title: ${title};\n  --weight-heading: ${heading};\n}\n`;
}
for (const option of texts)
  css += `:root[data-font='${option.id}'] {\n  --font-text: '${option.family}';\n  --weight-strong: ${option.strong || 600};\n}\n`;
const outDir = path.join(here, 'out');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'typefaces.css'), css);
const list = (options) => options.map(({ id, label, group }) => ({ id, label, group }));
fs.writeFileSync(path.join(outDir, 'typefaces.json'), JSON.stringify({ headings: list(headings), texts: list(texts) }, null, 2));
fs.writeFileSync(
  path.join(dir, 'LICENSES.txt'),
  `Typefaces under evaluation, fetched from Google Fonts by docs/logos/typefaces.mjs.\nEach is licensed under the SIL Open Font License, Version 1.1 (https://openfontlicense.org).\n\n${[...notices].map(([family, notice]) => `${family}\n${notice}`).join('\n\n')}\n`,
);
console.log(`${headings.length} heading faces, ${texts.length} text faces, ${faces.size} files`);
