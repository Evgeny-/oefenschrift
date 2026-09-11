// Build a self-contained HTML comparison and font-independent SVG exports.
// npm install --prefix tmp/logo-runtime --no-save --package-lock=false opentype.js
// node docs/logos/colour-round/generate.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const require = createRequire(import.meta.url);
let opentype;
try {
  opentype = require('opentype.js');
} catch {
  opentype = require(path.join(root, 'tmp/logo-runtime/node_modules/opentype.js'));
}
const fonts = {};
for (const [family, weight] of [
  ['Nunito', 800],
  ['Gabarito', 700],
  ['Manrope', 800],
  ['Outfit', 700],
  ['Fraunces', 700],
  ['Kalam', 700],
]) {
  const file = fs.readFileSync(path.join(root, `docs/logos/fonts/${family}-${weight}.woff`));
  fonts[family] = opentype.parse(
    file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength),
  );
}
const round = (n) => Math.round(n * 100) / 100;
const pathData = (commands) =>
  commands
    .map((c) => {
      for (const value of Object.values(c))
        if (typeof value === 'number' && !Number.isFinite(value))
          throw Error('Invalid glyph coordinate');
      if (c.type === 'M' || c.type === 'L') return `${c.type}${round(c.x)} ${round(c.y)}`;
      if (c.type === 'Q') return `Q${round(c.x1)} ${round(c.y1)} ${round(c.x)} ${round(c.y)}`;
      if (c.type === 'C')
        return `C${round(c.x1)} ${round(c.y1)} ${round(c.x2)} ${round(c.y2)} ${round(c.x)} ${round(c.y)}`;
      return 'Z';
    })
    .join('');
function lettering(family, text = 'Oefenschrift', height = 40, fill = '@ink') {
  // This Latin word needs no contextual substitutions. Lay out the glyphs directly
  // so fonts with unsupported ccmp lookups still export with their own kerning.
  const font = fonts[family],
    p = new opentype.Path(),
    glyphs = [...text].map((ch) => font.charToGlyph(ch));
  let x = 0;
  glyphs.forEach((glyph, i) => {
    p.commands.push(...glyph.getPath(x, 0, 100).commands);
    x +=
      ((glyph.advanceWidth +
        (i < glyphs.length - 1 ? font.getKerningValue(glyph, glyphs[i + 1]) : 0)) *
        100) /
      font.unitsPerEm;
  });
  const b = p.getBoundingBox(),
    s = height / (b.y2 - b.y1);
  return {
    width: round((b.x2 - b.x1) * s),
    height,
    body: `<g fill="${fill}" transform="translate(${round(-b.x1 * s)} ${round(-b.y1 * s)}) scale(${Math.round(s * 100000) / 100000})"><path d="${pathData(p.commands)}"/></g>`,
  };
}
const circle = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const rect = (x, y, w, h, r, fill, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const stroke = (d, fill = '@ink', width = 5) =>
  `<path d="${d}" fill="none" stroke="${fill}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const marks = {
  stop:
    '<circle cx="28" cy="29" r="22" fill="none" stroke="@ink" stroke-width="9"/>' +
    circle(54, 53, 7, '@yellow'),
  soft:
    rect(4, 4, 56, 56, 19, '@coral') +
    stroke('M40 20a16 16 0 1 0 5 23', '@paper', 7) +
    circle(44, 43, 4, '@paper'),
  marker: rect(9, 4, 46, 55, 7, '@yellow') + stroke('M21 19h22M21 30h22M21 41h14', '@detail', 4),
  editorial:
    circle(32, 32, 28, '@paper') +
    stroke('M44 13C12 3 6 56 33 53C53 51 57 12 36 10', '@ink', 6) +
    circle(53, 52, 5, '@coral'),
  book:
    '<path d="M5 13Q19 8 31 18V56Q18 45 5 49Z" fill="@yellow"/><path d="M34 18Q47 8 60 13V49Q47 45 34 56Z" fill="@blue"/>' +
    stroke('M14 23q7 0 12 4M40 27q6-4 12-4', '@paper', 3.5),
  fold:
    '<path d="M13 4H39L57 22V52Q57 60 49 60H13Q5 60 5 52V12Q5 4 13 4Z" fill="@yellow"/><path d="M39 4V16Q39 22 45 22H57Z" fill="@coral"/>' +
    stroke('M18 34h24M18 45h17', '@detail', 4),
  pages:
    rect(8, 13, 37, 43, 6, '@green', 'transform="rotate(-19 29 39)"') +
    rect(13, 9, 37, 46, 6, '@purple', 'transform="rotate(-10 32 35)"') +
    rect(18, 6, 37, 48, 6, '@blue') +
    rect(22, 11, 37, 46, 6, '@coral', 'transform="rotate(9 41 34)"') +
    rect(18, 17, 37, 43, 6, '@yellow') +
    stroke('M27 31h19M27 41h14', '@detail', 4),
  speech:
    '<path d="M15 6H48Q59 6 59 17V38Q59 49 48 49H30L17 59V49H15Q5 49 5 38V17Q5 6 15 6Z" fill="@blue"/>' +
    rect(17, 17, 28, 5, 2.5, '@paper') +
    rect(17, 28, 20, 5, 2.5, '@paper') +
    circle(51, 10, 9, '@yellow'),
  loop:
    stroke(
      'M50 18C34-3 8 10 8 33C8 54 32 65 49 49C61 37 54 20 42 20C27 20 23 39 36 43',
      '@blue',
      9,
    ) + circle(50, 17, 6, '@yellow'),
  pencil:
    stroke('M42 10a24 24 0 1 0 11 27', '@ink', 8) +
    '<g transform="rotate(38 46 28)">' +
    rect(39, 5, 14, 34, 4, '@coral') +
    '<path d="M39 36H53L46 50Z" fill="@yellow"/><path d="M43 45H49L46 50Z" fill="@ink"/>' +
    rect(39, 12, 14, 4, 0, '@paper') +
    '</g>',
  dialogue:
    '<path d="M5 9H35Q43 9 43 17V34Q43 42 35 42H22L10 51V42H5Q1 42 1 34V17Q1 9 5 9Z" fill="@blue"/><path d="M28 27H54Q62 27 62 35V47Q62 54 54 54H51V62L40 54H28Q22 54 22 47V35Q22 27 28 27Z" fill="@yellow"/>' +
    circle(34, 40, 2.5, '@detail') +
    circle(43, 40, 2.5, '@detail') +
    circle(52, 40, 2.5, '@detail'),
  monogram:
    rect(3, 3, 58, 58, 18, '@yellow') +
    `<g transform="translate(10 19)">${lettering('Nunito', 'oe', 27, '@detail').body}</g>`,
  mosaic:
    rect(2, 6, 22, 52, 6, '@yellow') +
    rect(28, 6, 16, 24, 5, '@blue') +
    rect(48, 6, 14, 24, 5, '@coral') +
    rect(28, 34, 16, 24, 5, '@purple') +
    rect(48, 34, 14, 24, 5, '@green'),
  tabs:
    rect(8, 4, 45, 56, 8, '@paper') +
    rect(47, 10, 11, 9, 2, '@blue') +
    rect(47, 22, 11, 9, 2, '@coral') +
    rect(47, 34, 11, 9, 2, '@purple') +
    rect(47, 46, 11, 9, 2, '@green') +
    rect(8, 4, 10, 56, 5, '@yellow') +
    stroke('M27 20h12M27 31h12M27 42h8', '@detail', 3.5),
  stacked:
    rect(5, 3, 50, 57, 7, '@yellow') +
    stroke('M16 17h25M16 28h25M16 39h19', '@detail', 4) +
    '<path d="M42 3H51V21L46.5 17L42 21Z" fill="@coral"/>',
  handwritten:
    stroke('M44 10C23-1 8 20 9 36C10 59 37 61 48 44C64 20 40-1 26 15', '@ink', 6) +
    stroke('M12 57q21-7 43-5', '@yellow', 7),
};
const designs = [];
function add(id, title, group, family, note, body, viewBox, mark, recommend = false) {
  designs.push({ id, title, group, family, note, body, viewBox, icon: marks[mark], recommend });
}
function word(
  id,
  title,
  family,
  note,
  mark,
  { text = 'Oefenschrift', dot, underline, group = 'Wordmarks', recommend = false } = {},
) {
  const t = lettering(family, text),
    width = t.width + (dot ? 18 : 0);
  const body = t.body + (dot ? circle(t.width + 11, 35, 5, dot) : '') + (underline || '');
  add(
    id,
    title,
    group,
    family,
    note,
    body,
    `-3 -3 ${width + 6} ${underline ? 58 : 46}`,
    mark,
    recommend,
  );
}
function lockup(id, title, family, note, mark, recommend = false, group = 'Symbols') {
  const t = lettering(family);
  add(
    id,
    title,
    group,
    family,
    note,
    `<g transform="scale(.84)">${marks[mark]}</g><g transform="translate(67 7)">${t.body}</g>`,
    `-3 -3 ${t.width + 73} 60`,
    mark,
    recommend,
  );
}
word(
  '01-full-stop',
  'Full stop',
  'Gabarito',
  'Complete lettering with a single yellow full stop.',
  'stop',
  { dot: '@yellow', recommend: true },
);
word(
  '02-lowercase',
  'Soft lowercase',
  'Nunito',
  'A softer voice, with a coral dot borrowed from Writing.',
  'soft',
  { text: 'oefenschrift', dot: '@coral' },
);
const markerWord = lettering('Nunito');
word(
  '03-marker',
  'The marker',
  'Nunito',
  'A small underline keeps the link to a practice notebook.',
  'marker',
  {
    underline: stroke(
      `M${round(markerWord.width * 0.48)} 49Q${round(markerWord.width * 0.7)} 44 ${round(markerWord.width - 4)} 48`,
      '@yellow',
      6,
    ),
  },
);
word(
  '04-editorial',
  'Warm editorial',
  'Fraunces',
  'A soft serif gives the colourful cards a quieter companion.',
  'editorial',
  { dot: '@coral' },
);
lockup(
  '05-open-book',
  'Open book',
  'Outfit',
  'Two open pages connect reading with the blue listening card.',
  'book',
  true,
);
lockup(
  '06-folded-page',
  'Folded page',
  'Manrope',
  'A yellow sheet with a coral fold, made for a small app icon.',
  'fold',
  true,
);
lockup(
  '07-five-pages',
  'Five pages',
  'Gabarito',
  'The five subjects gathered into a little stack of paper.',
  'pages',
);
lockup(
  '08-speech-note',
  'Speech note',
  'Nunito',
  'A note becomes a speech bubble, with a yellow corner.',
  'speech',
);
lockup(
  '09-practice-loop',
  'Practice loop',
  'Manrope',
  'A continuous blue loop suggests trying again.',
  'loop',
);
lockup('10-pencil-o', 'Pencil O', 'Outfit', 'An O with a small pencil at its edge.', 'pencil');
lockup(
  '11-conversation',
  'Conversation',
  'Gabarito',
  'Two overlapping bubbles make speaking part of the identity.',
  'dialogue',
);
lockup(
  '12-oe-monogram',
  'The oe monogram',
  'Nunito',
  'A compact monogram on a warm yellow tile.',
  'monogram',
);
lockup(
  '13-card-mosaic',
  'Card mosaic',
  'Gabarito',
  'The new home-page grid becomes a compact five-colour mark.',
  'mosaic',
  true,
  'Expressive',
);
const tabsWord = lettering('Manrope');
word(
  '14-subject-tabs',
  'Subject tabs',
  'Manrope',
  'Five small tabs bring the card palette beneath a clear wordmark.',
  'tabs',
  {
    group: 'Expressive',
    underline: ['@yellow', '@blue', '@coral', '@purple', '@green']
      .map((c, i) => rect(round(tabsWord.width - 100 + i * 20), 47, 16, 6, 3, c))
      .join(''),
  },
);
const upper = lettering('Outfit', 'Oefen', 33, '@detail'),
  lower = lettering('Outfit', 'schrift', 33, '@detail'),
  stackWidth = Math.max(upper.width, lower.width);
add(
  '15-stacked-notebook',
  'Stacked notebook',
  'Expressive',
  'Outfit',
  'A two-line lockup for a taller logo slot.',
  rect(-8, -8, stackWidth + 25, 94, 9, '@yellow') +
    upper.body +
    `<g transform="translate(0 40)">${lower.body}</g>` +
    '<path d="M' +
    (stackWidth + 2) +
    ' -8h8v28l-4-4-4 4Z" fill="@coral"/>',
  `-12 -12 ${stackWidth + 33} 102`,
  'stacked',
);
const hand = lettering('Kalam');
word(
  '16-handwritten',
  'In your own hand',
  'Kalam',
  'Handwritten lettering with a loose yellow pencil stroke.',
  'handwritten',
  {
    group: 'Expressive',
    underline: stroke(
      `M4 48Q${round(hand.width * 0.5)} 39 ${round(hand.width - 3)} 46`,
      '@yellow',
      5,
    ),
  },
);
const currentSource = fs.readFileSync(path.join(root, 'app/components/logo.ts'), 'utf8');
const current = {
  id: 'current',
  title: 'Current logo',
  viewBox: currentSource.match(/viewBox: '([^']+)'/)[1],
  body: currentSource
    .match(/markup:\s*'([^']+)'/)[1]
    .replaceAll('class="ink"', 'fill="@ink"')
    .replaceAll('class="accent"', 'fill="@yellow"'),
};
// Reuse the exact production outlines, including their original spacing.
// The two clipped copies of O become one complete outline; the i dot is ink.
const originalPaths = [...current.body.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/>/g)].map(
  (match) => match[1],
);
const solidPaths = [...new Set(originalPaths)];
if (solidPaths.length !== 13) throw Error('The current wordmark outlines have changed.');
const solidWord = solidPaths.map((d) => `<path fill="@ink" d="${d}"/>`).join('');
// The first two letters come from the same wordmark. A capital O keeps its
// natural 1.42:1 height relative to the e, with a shared baseline.
const monogramScale = 50 / 126.5;
const monogramX = 7 - 5 * monogramScale;
const monogramY = 32 + 35.25 * monogramScale;
marks.currentMonogram =
  rect(3, 3, 58, 58, 18, '@yellow') +
  `<g fill="@detail" transform="translate(${round(monogramX)} ${round(monogramY)}) scale(${monogramScale})">` +
  solidPaths
    .slice(0, 2)
    .map((d) => `<path d="${d}"/>`)
    .join('') +
  '</g>';
add(
  '17-current-full-stop',
  'The original, with a full stop',
  'Wordmarks',
  'Nunito 800',
  'Your existing lettering in solid ink, finished with a yellow dot. The favicon pairs a larger O with a lowercase e.',
  solidWord + circle(607, -6.7, 7.8, '@yellow'),
  '2 -76.2 615.8 80.3',
  'currentMonogram',
  true,
);
designs.unshift(designs.pop());
const palette = {
  ink: '#221f1a',
  detail: '#221f1a',
  paper: '#fffaf0',
  yellow: '#efbf24',
  blue: '#4678d9',
  coral: '#e97058',
  purple: '#8a67c8',
  green: '#6c9c76',
};
function svg(d, mode = 'light', icon = false) {
  const colours = {
    ...palette,
    ink: mode === 'dark' ? '#f4efe6' : palette.ink,
    paper: mode === 'dark' ? '#242424' : palette.paper,
  };
  const body = (icon ? d.icon : d.body).replace(/@(\w+)/g, (_, key) => colours[key]);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon ? '0 0 64 64' : d.viewBox}" role="img" aria-label="Oefenschrift: ${d.title}"><title>Oefenschrift: ${d.title}</title>${body}</svg>`;
}
fs.mkdirSync(path.join(here, 'svg'), { recursive: true });
for (const d of designs)
  for (const mode of ['light', 'dark']) {
    fs.writeFileSync(path.join(here, `svg/${d.id}-${mode}.svg`), svg(d, mode));
    fs.writeFileSync(path.join(here, `svg/${d.id}-icon-${mode}.svg`), svg(d, mode, true));
  }
const fontCss = [400, 600]
  .map(
    (weight) =>
      `@font-face{font-family:Gallery;src:url(data:font/woff;base64,${fs.readFileSync(path.join(root, `assets/fonts/fira-sans-${weight}.woff`)).toString('base64')}) format('woff');font-weight:${weight};font-display:swap}`,
  )
  .join('');
const images = Object.fromEntries(
  ['reading', 'listening', 'writing', 'speaking', 'knm'].map((name) => [
    name,
    'data:image/webp;base64,' +
      fs.readFileSync(path.join(root, `assets/images/home/${name}.webp`)).toString('base64'),
  ]),
);
let html = fs.readFileSync(path.join(here, 'page.html'), 'utf8');
const license = fs
  .readFileSync(path.join(root, 'assets/fonts/FiraSans-LICENSE.txt'), 'utf8')
  .replace(/\r\n/g, '\n')
  .replace(/[\t ]+$/gm, '');
html = html
  .replaceAll('EMBED_DESIGN_COUNT', String(designs.length))
  .replace(
    '/* EMBED_STYLES */',
    fontCss + '\n' + fs.readFileSync(path.join(here, 'gallery.css'), 'utf8'),
  )
  .replace(
    '/* EMBED_DATA */',
    `const logoData = ${JSON.stringify({ designs, current, palette, images })};`,
  )
  .replace('/* EMBED_SCRIPT */', fs.readFileSync(path.join(here, 'gallery.js'), 'utf8'))
  .replace('EMBED_FONT_LICENSE', license);
fs.writeFileSync(path.join(here, 'index.html'), html);
fs.writeFileSync(
  path.join(here, 'designs.json'),
  JSON.stringify(
    designs.map(({ id, title, group, family, note, recommend }) => ({
      id,
      title,
      group,
      family,
      note,
      recommend,
    })),
    null,
    2,
  ),
);
console.log(
  `Built ${designs.length} logo directions, ${designs.length * 4} standalone SVG files and a self-contained HTML gallery.`,
);
