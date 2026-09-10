// The site icon, built from the wordmark's O. Every candidate is drawn in a square box
// around the O; the page docs/logos/oefenschrift-icons.html shows each one large, in a
// mock browser tab in the light and the dark theme, and at 32 and 48 pixels. The
// candidate named in `chosen` is written to assets/icons: icon.svg (transparent
// candidates let the ink follow the colour scheme) and the raster fallbacks —
// apple-touch-icon.png, icon-32.png and favicon.ico — drawn by the rasteriser below.
//
//   npm install --no-save opentype.js
//   node docs/logos/icon.mjs
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { loadFont, layout, contours, metrics, bounds, viewBox as boxOf, oGeometry, clipBoxes, cut, splitMarkup, wedge, flatten, inside, round } from './lib.mjs';
const here = path.dirname(new URL(import.meta.url).pathname),
  root = path.resolve(here, '../..');
const chosen = 'tilt-tile-ink';
const font = await loadFont('Nunito', 800), m = metrics(font);
const O = layout(font, 'O')[0], o = oGeometry(O);
// The box: a square around the O with a little air, so the icon is centred at any size.
const size = round(Math.max(o.h, o.r * 2 - 4) * 1.12), x = round(o.cx - size / 2), y = round(o.cy - size / 2);
const box = { x, y, size, cx: o.cx, cy: o.cy };
// Colours: `var` candidates follow the theme (ink, accent, paper as CSS variables); `fixed`
// ones carry their own, so a tile looks the same in every tab bar.
const INK = '#221f1a', ACCENT = '#efbf24', PAPER = '#f3efe6';
const clip = (id, body) => `<clipPath id="${id}">${body}</clipPath>`;
// The O cut in two: upper part accent, lower part ink (or any two classes), hairline gap.
function split(id, options = cut, top = 'accent', bottom = 'ink') {
  const b = clipBoxes(o, options);
  return `<defs>${clip(`${id}-t`, b.top)}${clip(`${id}-b`, b.bottom)}</defs><path class="${top}" clip-path="url(#${id}-t)" d="${o.d}"/><path class="${bottom}" clip-path="url(#${id}-b)" d="${o.d}"/>`;
}
const tile = (cls, radius = 0.22, extra = '') => `<rect class="${cls}" x="${x}" y="${y}" width="${size}" height="${size}" rx="${round(size * radius)}"${extra}/>`;
const disc = (cls, extra = '') => `<circle class="${cls}" cx="${o.cx}" cy="${o.cy}" r="${round(size / 2)}"${extra}/>`;
const inner = contours(O.path).filter((c) => c.inner);
const candidates = [];
const add = (group, id, title, note, markup, mode = 'var', tileClass = 'paper') =>
  candidates.push({ group, id, title, note, markup, mode, tileClass });

// ---- The tilted split, on a background ---------------------------------------------
const tilt = { ...cut, angle: -30 };
add('The tilted split, on a background', 'tilt-tile-paper', 'Paper tile, tilted split', 'The same in every tab bar; rounded like an app icon.', tile('paper') + split('tilt-tile-paper', tilt), 'fixed');
add('The tilted split, on a background', 'tilt-tile-paper-round', 'Paper tile, rounder', 'The corners at a third of the side.', tile('paper', 0.34) + split('tilt-tile-paper-round', tilt), 'fixed');
add('The tilted split, on a background', 'tilt-tile-paper-edge', 'Paper tile with an edge', 'A hairline of ink around the tile, so it also shows on a white tab.', tile('paper', 0.22, ` stroke="${INK}" stroke-width="2.5"`) + split('tilt-tile-paper-edge', tilt), 'fixed');
add('The tilted split, on a background', 'tilt-tile-ink', 'Ink tile, tilted split', 'Accent above, paper below on a dark tile.', tile('ink') + split('tilt-tile-ink', tilt, 'accent', 'paper'), 'fixed', 'ink');
add('The tilted split, on a background', 'tilt-tile-yellow', 'Yellow tile, tilted split', 'Paper above, ink below on the accent.', tile('accent') + split('tilt-tile-yellow', tilt, 'paper', 'ink'), 'fixed', 'accent');
add('The tilted split, on a background', 'tilt-disc-paper', 'Paper disc, tilted split', 'Round, with a hairline ink edge.', disc('paper', ` stroke="${INK}" stroke-width="2.5"`) + split('tilt-disc-paper', tilt), 'fixed');
add('The tilted split, on a background', 'tilt-sticker', 'Tilted split with an outline', 'No tile: a paper outline around the O lifts it off any tab bar; the ink half follows the theme.', `<path class="paper" stroke-width="9" stroke-linejoin="round" style="stroke:var(--paper)" d="${o.d}"/>` + split('tilt-sticker', tilt));

// ---- The O alone, on nothing ------------------------------------------------------
add('The O alone', 'split', 'Split O', 'The wordmark’s O as it is: accent above, ink below, a hairline between. The ink half turns light in a dark tab bar.', split('split'));
add('The O alone', 'split-30', 'Split O, tilted', 'The cut at 30 degrees.', split('split-30', { ...cut, angle: -30 }));
add('The O alone', 'split-vertical', 'Split O, vertical', 'Accent left, ink right.', split('split-vertical', { ...cut, angle: -90 }));
add('The O alone', 'split-wide-gap', 'Split O, wider gap', 'The gap at a tenth of the O, so it survives 16 pixels.', split('split-wide-gap', { ...cut, gap: 0.1 }));
add('The O alone', 'quadrant', 'Quadrant', 'The top-right quarter in the accent.', `<defs>${clip('quadrant-a', wedge(o.cx, o.cy, o.r, -90, 0))}</defs><path class="ink" d="${o.d}"/><path class="accent" clip-path="url(#quadrant-a)" d="${o.d}"/>`);
add('The O alone', 'ring', 'Three quarters', 'A progress ring: accent from twelve round to nine, the last quarter ink.', `<defs>${clip('ring-a', wedge(o.cx, o.cy, o.r, -90, 180))}</defs><path class="ink" d="${o.d}"/><path class="accent" clip-path="url(#ring-a)" d="${o.d}"/>`);
add('The O alone', 'coin', 'Coin', 'Ink ring, accent counter.', inner.map((c) => `<path class="accent" d="${c.d}"/>`).join('') + `<path class="ink" d="${o.d}"/>`);
add('The O alone', 'yellow-o', 'Yellow O', 'The O entirely in the accent.', `<path class="accent" d="${o.d}"/>`);
add('The O alone', 'ink-o', 'Ink O', 'The O entirely in ink; the plainest mark.', `<path class="ink" d="${o.d}"/>`);
{
  const r = m.stem * 0.62, dx = O.bbox.x2 - r * 0.2, dy = O.bbox.y1 + r * 0.9;
  add('The O alone', 'o-dot', 'O with a dot', 'The dot of the i borrowed and set at the top right, like a superscript.', `<path class="ink" d="${o.d}"/><circle class="accent" cx="${round(dx)}" cy="${round(dy)}" r="${round(r)}"/>`);
}
add('The O alone', 'target', 'Target', 'Ink O with an accent dot in the middle.', `<path class="ink" d="${o.d}"/><circle class="accent" cx="${o.cx}" cy="${o.cy}" r="${round((o.h / 2 - m.stem) * 0.5)}"/>`);
{
  const x1 = O.bbox.x1 + 4, x2 = O.bbox.x2 - 4, xm = (x1 + x2) / 2, yy = O.bbox.y2 + 9, t = 6;
  add('The O alone', 'o-pen', 'O with a pen stroke', 'Ink O over a tapered accent stroke.', `<path class="ink" d="${o.d}"/><path class="accent" d="M${round(x1)} ${yy}Q${round(xm)} ${yy - t} ${round(x2)} ${yy - 3}Q${round(xm)} ${yy + t + 1} ${round(x1)} ${yy}Z"/>`);
}
add('The O alone', 'o-shadow', 'O with a shadow', 'Ink O over an accent copy shifted down and right.', `<path class="accent" transform="translate(4 4)" d="${o.d}"/><path class="ink" d="${o.d}"/>`);
add('The O alone', 'sticker', 'Sticker', 'The split O with a paper outline, so it lifts off any tab bar.', `<path class="paper" stroke-width="9" stroke-linejoin="round" style="stroke:var(--paper)" d="${o.d}"/>` + split('sticker'));

// ---- On a tile ------------------------------------------------------------------
add('On a tile', 'tile-paper-split', 'Paper tile, split O', 'What the .ico fallback looks like today.', tile('paper') + split('tile-paper-split'), 'fixed');
add('On a tile', 'tile-yellow-ink', 'Yellow tile, ink O', 'The primary button’s colours.', tile('accent') + `<path class="ink" d="${o.d}"/>`, 'fixed');
add('On a tile', 'tile-yellow-knockout', 'Yellow tile, O knocked out', 'The O in paper on the accent, like an app icon.', tile('accent') + `<path class="paper" d="${o.d}"/>`, 'fixed');
add('On a tile', 'tile-yellow-split', 'Yellow tile, split O', 'Ink below, paper above: the split reversed on the accent.', tile('accent') + split('tile-yellow-split', cut, 'paper', 'ink'), 'fixed');
add('On a tile', 'tile-ink-split', 'Ink tile, split O', 'Accent above, paper below on a dark tile.', tile('ink') + split('tile-ink-split', cut, 'accent', 'paper'), 'fixed');
add('On a tile', 'tile-ink-yellow', 'Ink tile, yellow O', 'The O in the accent on a dark tile.', tile('ink') + `<path class="accent" d="${o.d}"/>`, 'fixed');
add('On a tile', 'tile-paper-yellow', 'Paper tile, yellow O', 'Only the accent on paper.', tile('paper') + `<path class="accent" d="${o.d}"/>`, 'fixed');
add('On a tile', 'tile-cropped', 'Yellow tile, cropped O', 'A big ink O running off the tile at the bottom right.', `<defs>${clip('tile-cropped-c', tile('x'))}</defs>` + tile('accent') + `<g clip-path="url(#tile-cropped-c)"><path class="ink" transform="translate(${round(size * 0.18)} ${round(size * 0.22)}) scale(1.35)" transform-origin="${o.cx} ${o.cy}" d="${o.d}"/></g>`, 'fixed');
add('On a tile', 'tile-margin', 'Notebook', 'A paper tile with the accent margin rule and an ink O.', tile('paper') + `<rect class="accent" x="${round(x + size * 0.14)}" y="${y}" width="${round(size * 0.06)}" height="${size}"/><path class="ink" transform="translate(${round(size * 0.08)} 0)" d="${o.d}"/>`, 'fixed');
add('On a tile', 'tile-two-tone', 'Two-tone tile, O knocked out', 'Accent above, ink below, the O in paper through both.', `<defs>${clip('tile-two-tone-c', tile('x'))}</defs><g clip-path="url(#tile-two-tone-c)"><rect class="accent" x="${x}" y="${y}" width="${size}" height="${round(size / 2)}"/><rect class="ink" x="${x}" y="${round(y + size / 2)}" width="${size}" height="${round(size / 2)}"/></g><path class="paper" d="${o.d}"/>`, 'fixed');

// ---- On a disc ------------------------------------------------------------------
add('On a disc', 'disc-yellow-ink', 'Yellow disc, ink O', 'Round, like a coin.', disc('accent') + `<path class="ink" d="${o.d}"/>`, 'fixed');
add('On a disc', 'disc-ink-split', 'Ink disc, split O', 'Accent above, paper below on a dark disc.', disc('ink') + split('disc-ink-split', cut, 'accent', 'paper'), 'fixed');
add('On a disc', 'disc-paper-split', 'Paper disc, split O', 'A paper disc with a hairline ink edge.', disc('paper', ` stroke="${INK}" stroke-width="3"`) + split('disc-paper-split'), 'fixed');
add('On a disc', 'seal', 'Seal', 'A paper disc with a thick accent ring and an ink O.', disc('accent') + `<circle class="paper" cx="${o.cx}" cy="${o.cy}" r="${round(size / 2 - size * 0.11)}"/><path class="ink" transform="translate(${o.cx} ${o.cy}) scale(0.72) translate(${-o.cx} ${-o.cy})" d="${o.d}"/>`, 'fixed');
add('On a disc', 'half-disc', 'Half disc', 'No letter: a solid disc, accent above and ink below, the hairline between.', `<defs>${clip('half-disc-t', clipBoxes(o, cut).top)}${clip('half-disc-b', clipBoxes(o, cut).bottom)}</defs><circle class="accent" clip-path="url(#half-disc-t)" cx="${o.cx}" cy="${o.cy}" r="${round(o.h / 2)}"/><circle class="ink" clip-path="url(#half-disc-b)" cx="${o.cx}" cy="${o.cy}" r="${round(o.h / 2)}"/>`);
add('On a disc', 'two-tone-square', 'Two-tone square', 'No letter: a rounded square, accent above and ink below.', `<defs>${clip('two-tone-square-c', tile('x'))}${clip('two-tone-square-t', clipBoxes(o, cut).top)}${clip('two-tone-square-b', clipBoxes(o, cut).bottom)}</defs><g clip-path="url(#two-tone-square-c)"><rect class="accent" clip-path="url(#two-tone-square-t)" x="${x}" y="${y}" width="${size}" height="${size}"/><rect class="ink" clip-path="url(#two-tone-square-b)" x="${x}" y="${y}" width="${size}" height="${size}"/></g>`);

// ---- Monograms ------------------------------------------------------------------
{
  const g = layout(font, 'Oe'), b = { x1: g[0].bbox.x1, x2: g[1].bbox.x2 }, w = b.x2 - b.x1, s = round(size / (w + 8) * 0.98);
  const tx = round(o.cx - ((b.x1 + b.x2) / 2) * s), ty = round(o.cy - o.cy * s);
  add('Monograms', 'oe', 'Oe', 'The first two letters, the O split, scaled to the box.', `<g transform="translate(${tx} ${ty}) scale(${s})">${split('oe')}<path class="ink" d="${g[1].d}"/></g>`);
}
{
  const g = layout(font, 'o')[0], lo = oGeometry(g), b = clipBoxes(lo, cut), s = round(o.h / lo.h);
  const tx = round(o.cx - lo.cx * s), ty = round(o.cy - lo.cy * s);
  add('Monograms', 'o-lower', 'Lowercase o', 'The small o, rounder, scaled up to the capital’s height and split.', `<g transform="translate(${tx} ${ty}) scale(${s})"><defs>${clip('o-lower-t', b.top)}${clip('o-lower-b', b.bottom)}</defs><path class="accent" clip-path="url(#o-lower-t)" d="${lo.d}"/><path class="ink" clip-path="url(#o-lower-b)" d="${lo.d}"/></g>`);
}

// ---- The wordmark, cut the same way ----------------------------------------------
const word = layout(font, 'Oefenschrift'), wordBox = bounds(word);
const marks = [0, -15, -30, -45].map((angle) => ({
  angle,
  id: `mark-${Math.abs(angle)}`,
  markup: splitMarkup(`mark-${Math.abs(angle)}`, word, { ...cut, angle }),
}));

// ---- The page -------------------------------------------------------------------
const viewBox = `${x} ${y} ${size} ${size}`;
const symbols =
  candidates.map((c) => `<symbol id="${c.id}" viewBox="${viewBox}">${c.markup}</symbol>`).join('') +
  marks.map((w) => `<symbol id="${w.id}" viewBox="${boxOf(wordBox)}">${w.markup}</symbol>`).join('');
const wordUse = (w, width) => {
  const [, , bw, bh] = boxOf(wordBox).split(' ');
  return `<svg width="${width}" height="${round((width * bh) / bw)}" viewBox="0 0 ${bw} ${bh}" class="var"><use href="#${w.id}"/></svg>`;
};
const wordRows = `<section><h2>The wordmark, cut the same way</h2><p>The full mark with the O cut at the icon’s angles, at sidebar size in both themes.</p>${marks
  .map(
    (w) => `<div class="row wide"><div class="big light">${wordUse(w, 320)}</div><div class="sizes"><span class="light">${wordUse(w, 136)}</span><span class="dark">${wordUse(w, 136)}</span></div><p><strong>${w.angle === 0 ? 'Straight' : `${Math.abs(w.angle)}°`}</strong>${w.angle === 0 ? ' · on the site' : ''}<br>${w.angle === 0 ? 'The cut as it was.' : 'The cut rising to the right, like the icon.'}</p></div>`,
  )
  .join('')}</section>`;
const use = (c, px) => `<svg width="${px}" height="${px}" viewBox="0 0 ${size} ${size}" class="${c.mode}"><use href="#${c.id}"/></svg>`;
const tab = (c, theme) => `<div class="tab ${theme}">${use(c, 16)}<span>Oefenschrift · Lezen</span></div>`;
const groups = [...new Set(candidates.map((c) => c.group))];
const rows = groups
  .map(
    (group) => `<section><h2>${group}</h2>${candidates
      .filter((c) => c.group === group)
      .map((c) => `<div class="row"><div class="big light">${use(c, 96)}</div><div class="tabs">${tab(c, 'light')}${tab(c, 'dark')}</div><div class="sizes"><span class="light">${use(c, 32)}</span><span class="dark">${use(c, 32)}</span><span class="light">${use(c, 48)}</span></div><p><strong>${c.title}</strong>${c.id === chosen ? ' · in use' : ''}<br>${c.note}</p></div>`)
      .join('')}</section>`,
  )
  .join('');
fs.writeFileSync(
  path.join(here, 'oefenschrift-icons.html'),
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Oefenschrift · icons</title><style>
body{margin:0;padding:2rem 1.5rem 4rem;background:#f3efe6;color:#221f1a;font:14px/1.5 "Fira Sans",system-ui,sans-serif}
main{max-width:64rem;margin:0 auto}h1{font-size:1.35rem;margin:0 0 .25rem}h2{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#6f6a5e;margin:2.5rem 0 .25rem}
p{margin:0;color:#6f6a5e}p strong{color:#221f1a}
.row{display:grid;grid-template-columns:8rem 15rem 9rem 1fr;gap:1.5rem;align-items:center;padding:.8rem 0;border-bottom:1px solid #e2dccd}.row.wide{grid-template-columns:22rem 20rem 1fr}.row.wide .big{width:auto;height:auto;padding:1rem}
svg{display:block}.big{display:grid;place-items:center;width:8rem;height:8rem;border-radius:.5rem}
.tabs{display:grid;gap:.4rem}.tab{display:flex;align-items:center;gap:.5rem;height:2.1rem;padding:0 .8rem;border-radius:.5rem .5rem 0 0;font-size:12px;white-space:nowrap}
.tab.light{background:#fff;color:#1f1f1f;box-shadow:0 0 0 1px #dadce0}.tab.dark{background:#35363a;color:#e8eaed;box-shadow:0 0 0 1px #202124}
.sizes{display:flex;gap:.5rem;align-items:center}.sizes span{display:grid;place-items:center;padding:.4rem;border-radius:.4rem}
.light{--ink:#221f1a;--accent:${ACCENT};--paper:${PAPER};background:${PAPER}}.dark{--ink:#eeece5;--accent:#edc343;--paper:#242424;background:#242424}
.tab.light{--ink:#221f1a;--accent:${ACCENT};--paper:${PAPER}}.tab.dark{--ink:#eeece5;--accent:#edc343;--paper:#242424}
.ink{fill:var(--ink)}.accent{fill:var(--accent)}.paper{fill:var(--paper)}
svg.fixed{--ink:${INK};--accent:${ACCENT};--paper:${PAPER}}
@media (max-width:52rem){.row{grid-template-columns:1fr 1fr}p{grid-column:1/-1}}
</style><body><main><h1>Oefenschrift · ${candidates.length} icons</h1><p>Each candidate large, in a mock browser tab in the light and the dark theme, and at 32 (light and dark) and 48 pixels. Marks on nothing let the ink follow the theme; tiles and discs keep their own colours everywhere.</p>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>${rows}${wordRows}</main></body></html>`,
);

// ---- The chosen one -------------------------------------------------------------
const pick = candidates.find((c) => c.id === chosen);
const out = path.join(root, 'assets/icons');
fs.mkdirSync(out, { recursive: true });
const file = (body, style) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><style>${style}</style>${body}</svg>`;
const fixedStyle = `.ink{fill:${INK}}.accent{fill:${ACCENT}}.paper{fill:${PAPER}}`;
fs.writeFileSync(
  path.join(out, 'icon.svg'),
  file(pick.markup, pick.mode === 'var' ? `${fixedStyle}@media(prefers-color-scheme:dark){.ink{fill:#eeece5}.accent{fill:#edc343}.paper{fill:#242424}}` : fixedStyle),
);
// Raster fallbacks, drawn here rather than by a system rasteriser, which flattened the
// rounded corners onto white: a scene of filled shapes — the tile or disc, then the two
// halves of the O — sampled sixteen times per pixel, so the corners stay transparent. A
// mark on nothing gets a paper tile behind it for the .ico sizes; the touch icon is a full
// square in the tile's colour, since the phone rounds it and paints transparent corners
// black. The scene covers tiles and discs with a split O; another pick needs its own.
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const colour = { ink: rgb(INK), accent: rgb(ACCENT), paper: rgb(PAPER) };
const halves = pick.markup.match(/<path class="(\w+)" clip-path="url\(#[^"]+-t\)"[^>]*\/><path class="(\w+)"/) || [null, 'accent', 'ink'];
const angle = Number((pick.markup.match(/rotate\(([-\d.]+) /) || [0, 0])[1]);
const glyph = flatten(O.path), splitAt = o.cy + (cut.share - 0.5) * o.h, gapHalf = (o.h * cut.gap) / 2;
// Inside one of the two clip boxes: the point turned back by the cut's angle around the O.
const inHalf = (px, py, top) => {
  const a = (-angle * Math.PI) / 180, dx = px - o.cx, dy = py - o.cy;
  const ry = o.cy + dx * Math.sin(a) + dy * Math.cos(a);
  return top ? ry < splitAt - gapHalf : ry > splitAt + gapHalf;
};
const inTile = (px, py, radius, disc) => {
  if (disc) return Math.hypot(px - o.cx, py - o.cy) <= size / 2;
  const r = size * radius, qx = Math.max(x + r - px, px - (x + size - r), 0), qy = Math.max(y + r - py, py - (y + size - r), 0);
  return px >= x && px <= x + size && py >= y && py <= y + size && Math.hypot(qx, qy) <= r;
};
function rasterise(px, radius, background) {
  const disc = pick.id.includes('disc'), data = Buffer.alloc(px * px * 4), step = size / px, sub = 4;
  for (let j = 0; j < px; j++)
    for (let i = 0; i < px; i++) {
      let r = 0, g = 0, b = 0, hits = 0;
      for (let sy = 0; sy < sub; sy++)
        for (let sx = 0; sx < sub; sx++) {
          const cx = x + (i + (sx + 0.5) / sub) * step, cy = y + (j + (sy + 0.5) / sub) * step;
          let paint = background && inTile(cx, cy, radius, disc && radius > 0) ? background : null;
          if (inside(glyph, cx, cy)) paint = inHalf(cx, cy, true) ? colour[halves[1]] : inHalf(cx, cy, false) ? colour[halves[2]] : paint;
          if (!paint) continue;
          r += paint[0]; g += paint[1]; b += paint[2]; hits++;
        }
      const at = (j * px + i) * 4;
      if (!hits) continue;
      data[at] = Math.round(r / hits); data[at + 1] = Math.round(g / hits); data[at + 2] = Math.round(b / hits); data[at + 3] = Math.round((255 * hits) / (sub * sub));
    }
  return png(px, data);
}
// A PNG: eight-bit RGBA rows with filter 0, deflated.
function png(px, rgba) {
  const chunk = (type, body) => {
    const head = Buffer.concat([Buffer.from(type), body]), crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32(head));
    const length = Buffer.alloc(4);
    length.writeUInt32BE(body.length);
    return Buffer.concat([length, head, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(px, 0);
  ihdr.writeUInt32BE(px, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const rows = Buffer.alloc(px * (px * 4 + 1));
  for (let j = 0; j < px; j++) rgba.copy(rows, j * (px * 4 + 1) + 1, j * px * 4, (j + 1) * px * 4);
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}
const background = colour[pick.mode === 'var' ? 'paper' : pick.tileClass];
for (const [name, px, radius] of [['apple-touch-icon', 180, 0], ['icon-48', 48, 0.22], ['icon-32', 32, 0.22], ['icon-16', 16, 0.22]])
  fs.writeFileSync(path.join(out, `${name}.png`), rasterise(px, radius, radius === 0 ? background : pick.mode === 'var' ? colour.paper : background));
const entries = [16, 32, 48].map((px) => fs.readFileSync(path.join(out, `icon-${px}.png`)));
const header = Buffer.alloc(6 + 16 * entries.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = header.length;
entries.forEach((png, i) => {
  const px = [16, 32, 48][i], at = 6 + 16 * i;
  header.writeUInt8(px, at);
  header.writeUInt8(px, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(png.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
fs.writeFileSync(path.join(out, 'favicon.ico'), Buffer.concat([header, ...entries]));
for (const px of [16, 48]) fs.unlinkSync(path.join(out, `icon-${px}.png`));
console.log(`${candidates.length} candidates on the page; "${pick.title}" written to assets/icons`);
