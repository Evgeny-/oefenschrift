// Oefenschrift treatments beyond the split O: which part takes the accent colour,
// the O as an object, marks and lines, mixed faces and lockups, and a second round
// that combines the favourites. Each idea is set in a face that suits it. Builds
// docs/logos/oefenschrift-designs.html; fonts.mjs imports the list for the site.
//
//   npm install --no-save opentype.js
//   node docs/logos/designs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadFont, layout, metrics, contours, band, bounds, viewBox, rect, wedge, oGeometry, clipBoxes, cut, splitMarkup, dotted, round } from './lib.mjs';
const here = path.dirname(new URL(import.meta.url).pathname);
const WORD = 'Oefenschrift';
const ink = (glyphs) => glyphs.map((g) => `<path class="ink" d="${g.d}"/>`).join('');
const paint = (glyphs, cls) => glyphs.map((g) => `<path class="${cls}" d="${g.d}"/>`).join('');
const clip = (id, body) => `<clipPath id="${id}">${body}</clipPath>`;
export const designs = [];
// One design: an id, a title, the idea in a sentence, the markup with its box, and
// whether the site's switcher offers it.
function design(group, id, title, note, glyphs, markup, extra = [], site = false) {
  designs.push({ group, id, title, note, viewBox: viewBox(bounds([...glyphs, ...extra])), markup, site });
}
const splitO = (id, o) => {
  const b = clipBoxes(o, cut);
  return { defs: clip(`${id}-top`, b.top) + clip(`${id}-bottom`, b.bottom), body: `<path class="accent" clip-path="url(#${id}-top)" d="${o.d}"/><path class="ink" clip-path="url(#${id}-bottom)" d="${o.d}"/>` };
};
// A hairline of paper along a radius of the O, from the centre past the rim.
const gapLine = (o, angle) => {
  const a = (angle * Math.PI) / 180;
  return `<line class="gap" x1="${o.cx}" y1="${o.cy}" x2="${round(o.cx + o.r * Math.cos(a))}" y2="${round(o.cy + o.r * Math.sin(a))}"/>`;
};
// A tapered accent stroke from x1 to x2, thick in the middle, pointed at the ends.
const pen = (x1, x2, y, t = 7) => {
  const xm = (x1 + x2) / 2;
  return { d: `M${round(x1)} ${y}Q${round(xm)} ${y - t} ${round(x2)} ${y - 4}Q${round(xm)} ${y + t + 1} ${round(x1)} ${y}Z`, box: { x1, y1: y - t, x2, y2: y + t + 1 } };
};
// The word once in a colour class, shifted down and right, with ink on top.
const shadow = (glyphs, d, cls = 'accent', top = ink(glyphs)) =>
  `<g class="${cls}" transform="translate(${d} ${d})">${glyphs.map((x) => `<path d="${x.d}"/>`).join('')}</g>` + top;
const shadowBox = (glyphs, d) => {
  const b = bounds(glyphs, 0);
  return { x1: b.x1, y1: b.y1, x2: b.x2 + d, y2: b.y2 + d };
};

// ---- Which part is yellow -------------------------------------------------------
{
  const font = await loadFont('Gabarito', 700), g = layout(font, WORD);
  design('Which part is yellow', 'word-schrift', 'Oefen · schrift', 'The second word in the accent, as in the Inburgerklaar draft. Gabarito.', g, ink(g.slice(0, 5)) + paint(g.slice(5), 'accent'));
}
{
  const font = await loadFont('Bricolage Grotesque', 700), g = layout(font, WORD);
  design('Which part is yellow', 'word-oefen', 'Oefen · schrift, reversed', 'The verb in the accent, the noun in ink. Bricolage Grotesque.', g, paint(g.slice(0, 5), 'accent') + ink(g.slice(5)));
}
{
  const font = await loadFont('Fraunces', 700), g = layout(font, WORD);
  design('Which part is yellow', 'yellow-o', 'A yellow O', 'Only the initial in the accent; a soft serif carries it. Fraunces.', g, paint([g[0]], 'accent') + ink(g.slice(1)));
}
{
  const font = await loadFont('Public Sans', 700), g = layout(font, WORD);
  design('Which part is yellow', 'dot-only', 'Only the dot', 'The smallest possible accent, in the site’s own face. Public Sans.', g, g.map(dotted).join(''));
}
{
  const font = await loadFont('Lexend', 700), g = layout(font, WORD), m = metrics(font), b = bounds(g, 6), gap = 2.4;
  const id = 'skyline';
  design(
    'Which part is yellow',
    id,
    'Skyline',
    'Everything above the x-height in the accent: the top of the O, the ascenders and the dot. Lexend.',
    g,
    `<defs>${clip(`${id}-top`, rect(b.x1, b.y1, b.x2 - b.x1, m.xHeight - gap / 2 - b.y1))}${clip(`${id}-bottom`, rect(b.x1, m.xHeight + gap / 2, b.x2 - b.x1, b.y2 - m.xHeight - gap / 2))}</defs>` +
      `<g class="accent" clip-path="url(#${id}-top)">${g.map((x) => `<path d="${x.d}"/>`).join('')}</g><g class="ink" clip-path="url(#${id}-bottom)">${g.map((x) => `<path d="${x.d}"/>`).join('')}</g>`,
  );
}
{
  const font = await loadFont('Space Grotesk', 700), g = layout(font, WORD), m = metrics(font), b = bounds(g, 6), gap = 2.4;
  const id = 'dipped', line = m.xHeight * 0.42;
  design(
    'Which part is yellow',
    id,
    'Dipped',
    'The lower two fifths of the x-height in the accent, like the marker behind the current wordmark, but inside the letters. Space Grotesk.',
    g,
    `<defs>${clip(`${id}-top`, rect(b.x1, b.y1, b.x2 - b.x1, line - gap / 2 - b.y1))}${clip(`${id}-bottom`, rect(b.x1, line + gap / 2, b.x2 - b.x1, b.y2 - line - gap / 2))}</defs>` +
      `<g class="ink" clip-path="url(#${id}-top)">${g.map((x) => `<path d="${x.d}"/>`).join('')}</g><g class="accent" clip-path="url(#${id}-bottom)">${g.map((x) => `<path d="${x.d}"/>`).join('')}</g>`,
  );
}
{
  const font = await loadFont('Syne', 700), g = layout(font, WORD);
  design('Which part is yellow', 'two-f', 'The two f’s', 'The letter that appears twice carries the colour. Syne.', g, g.map((x, i) => `<path class="${i === 2 || i === 10 ? 'accent' : 'ink'}" d="${x.d}"/>`).join(''));
}

// ---- The O as an object ---------------------------------------------------------
{
  const font = await loadFont('Figtree', 800), g = layout(font, WORD), inner = contours(g[0].path).filter((c) => c.inner);
  design('The O as an object', 'coin', 'Coin', 'The counter of the O filled with the accent, the ring in ink. Figtree.', g, inner.map((c) => `<path class="accent" d="${c.d}"/>`).join('') + ink(g));
}
{
  const font = await loadFont('Manrope', 800), g = layout(font, WORD), o = oGeometry(g[0]), w = g[0].bbox.x2 - g[0].bbox.x1;
  design('The O as an object', 'disc', 'Disc', 'The O replaced by a solid accent disc. Manrope.', g, `<ellipse class="accent" cx="${o.cx}" cy="${o.cy}" rx="${round(w / 2)}" ry="${round(o.h / 2)}"/>` + g.slice(1).map(dotted).join(''));
}
{
  const font = await loadFont('Urbanist', 700), g = layout(font, WORD), o = oGeometry(g[0]), id = 'ring';
  design(
    'The O as an object',
    id,
    'Three quarters',
    'A progress ring: the accent runs from twelve o’clock round to nine, the last quarter stays ink, with a hairline at each end. Urbanist.',
    g,
    `<defs>${clip(`${id}-a`, wedge(o.cx, o.cy, o.r, -90, 180))}</defs>` +
      `<path class="ink" d="${o.d}"/><path class="accent" clip-path="url(#${id}-a)" d="${o.d}"/>${gapLine(o, -90)}${gapLine(o, 180)}` + g.slice(1).map(dotted).join(''),
  );
}
{
  const font = await loadFont('Plus Jakarta Sans', 800), g = layout(font, WORD), o = oGeometry(g[0]), id = 'quadrant';
  design(
    'The O as an object',
    id,
    'Quadrant',
    'The top-right quarter of the O in the accent, the first row of the reference picture. Plus Jakarta Sans.',
    g,
    `<defs>${clip(`${id}-a`, wedge(o.cx, o.cy, o.r, -90, 0))}</defs>` + `<path class="ink" d="${o.d}"/><path class="accent" clip-path="url(#${id}-a)" d="${o.d}"/>${gapLine(o, -90)}${gapLine(o, 0)}` + ink(g.slice(1)),
  );
}
{
  const font = await loadFont('DM Sans', 700), g = layout(font, WORD), o = oGeometry(g[0]), m = metrics(font);
  const r = (o.h / 2 - m.stem) * 0.42;
  design('The O as an object', 'target', 'Target', 'An accent dot in the middle of the O. DM Sans.', g, ink(g) + `<circle class="accent" cx="${o.cx}" cy="${o.cy}" r="${round(r)}"/>`);
}
{
  const font = await loadFont('Red Hat Display', 700), g = layout(font, WORD), o = oGeometry(g[0]), r = o.h * 0.62;
  design(
    'The O as an object',
    'badge',
    'Badge',
    'An accent disc behind the O; the O stays dark on it in both themes, like text on the primary button. Red Hat Display.',
    g,
    `<circle class="accent" cx="${o.cx}" cy="${o.cy}" r="${round(r)}"/><path class="on-accent" d="${o.d}"/>` + ink(g.slice(1)),
    [{ x1: o.cx - r, y1: o.cy - r, x2: o.cx + r, y2: o.cy + r }],
  );
}
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD);
  const inners = g.flatMap((x) => contours(x.path).filter((c) => c.inner));
  design('The O as an object', 'counters', 'Filled counters', 'Every closed counter — the O and both e’s — filled with the accent. Nunito.', g, inners.map((c) => `<path class="accent" d="${c.d}"/>`).join('') + ink(g));
}
{
  const font = await loadFont('Outfit', 700), g = layout(font, WORD), m = metrics(font), o = g[0].bbox, pad = 9;
  const x = o.x1 - pad, y = m.capHeight - pad, w = o.x2 - o.x1 + 2 * pad, h = -m.capHeight + 2 * pad + 1;
  design(
    'The O as an object',
    'tile',
    'Tile',
    'An accent tile with the O knocked out of it, the shape an app icon would take. Outfit.',
    g,
    `<rect class="accent" x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(h)}" rx="${round(pad * 1.4)}"/><path class="paper" d="${g[0].d}"/>` + ink(g.slice(1)),
    [{ x1: x, y1: y, x2: x + w, y2: y + h }],
  );
}
{
  const font = await loadFont('Fredoka', 600), g = layout(font, WORD), i = g[9], parts = contours(i.path), m = metrics(font);
  const dot = parts.reduce((a, b) => (b.height < a.height ? b : a)), stem = parts.find((p) => p !== dot);
  const cx = (stem.x1 + stem.x2) / 2, r = m.stem * 0.95, cy = dot.y2 - r + 1;
  design(
    'The O as an object',
    'sun',
    'A bigger dot',
    'The dot of the i grown into a small accent sun; the O stays plain. Fredoka.',
    g,
    ink(g.filter((x) => x !== i)) + `<path class="ink" d="${stem.d}"/><circle class="accent" cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}"/>`,
    [{ x1: cx - r, y1: cy - r, x2: cx + r, y2: cy + r }],
  );
}

// ---- Marks and lines ------------------------------------------------------------
// The crossbar of an f or t, read off the outline at the glyph's left tip.
const crossbar = (glyph) => band(glyph, glyph.bbox.x1 + 1.5, glyph.bbox.y1, 0);
{
  const font = await loadFont('Poppins', 700), g = layout(font, WORD), id = 'crossbars';
  const bars = [2, 10, 11].map((i, n) => ({ i, id: `${id}-${n}`, y: crossbar(g[i]) }));
  design(
    'Marks and lines',
    id,
    'Crossbars',
    'The crossbars of both f’s and the t in the accent, three strokes across the word. Poppins.',
    g,
    `<defs>${bars.map((b) => clip(b.id, rect(g[b.i].bbox.x1 - 1, b.y[0], g[b.i].bbox.x2 - g[b.i].bbox.x1 + 2, b.y[1] - b.y[0]))).join('')}</defs>` +
      ink(g) + bars.map((b) => `<path class="accent" clip-path="url(#${b.id})" d="${g[b.i].d}"/>`).join(''),
  );
}
{
  const font = await loadFont('Onest', 700), g = layout(font, WORD), f = g[10], t = g[11], a = crossbar(f), b = crossbar(t);
  const y1 = Math.min(a[0], b[0]), y2 = Math.max(a[1], b[1]);
  design('Marks and lines', 'ligature', 'ft ligature', 'One accent bar joins the crossbars of the final f and t. Onest.', g, ink(g) + rect(f.bbox.x1 - 1, y1, t.bbox.x2 - f.bbox.x1 + 2, y2 - y1, ' class="accent"'));
}
{
  const font = await loadFont('Public Sans', 600), g = layout(font, WORD), m = metrics(font), s = g[5], t = g[11];
  const y = m.xHeight * 0.55, h = -y + 6;
  design(
    'Marks and lines',
    'marker',
    'Marker',
    'The site’s evidence marker behind the second word, the letters in ink on top. Public Sans, the wordmark’s current weight.',
    g,
    rect(s.bbox.x1 - 3, y, t.bbox.x2 - s.bbox.x1 + 6, h, ' class="mark" rx="1.5"') + ink(g),
    [{ x1: s.bbox.x1 - 3, y1: y, x2: t.bbox.x2 + 3, y2: y + h }],
  );
}
{
  const font = await loadFont('Instrument Serif', 400), g = layout(font, WORD), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 13);
  design('Marks and lines', 'pen-stroke', 'Pen stroke', 'A tapered accent stroke under schrift, thick in the middle and pointed at the ends. Instrument Serif.', g, ink(g) + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Unbounded', 600), g = layout(font, WORD), m = metrics(font), o = g[0].bbox, h = m.stem * 0.8;
  design('Marks and lines', 'underscore', 'Underscore', 'A short accent rule under the O only. Unbounded.', g, ink(g) + rect(o.x1, 9, o.x2 - o.x1, h, ' class="accent" rx="1"'), [{ x1: o.x1, y1: 9, x2: o.x2, y2: 9 + h }]);
}
{
  const font = await loadFont('Space Grotesk', 700), g = layout(font, WORD), m = metrics(font), w = m.stem * 0.7, x = g[0].bbox.x1 - 16;
  design('Marks and lines', 'margin', 'Margin rule', 'A vertical accent rule in front of the word, the kantlijn of a notebook. Space Grotesk.', g, rect(x, m.capHeight, w, -m.capHeight, ' class="accent"') + ink(g), [{ x1: x, y1: m.capHeight, x2: x + w, y2: 0 }]);
}
{
  const font = await loadFont('Righteous', 400), g = layout(font, WORD), d = 3.5;
  design('Marks and lines', 'shadow', 'Offset shadow', 'The word once in the accent, shifted down and right, and once in ink on top. Righteous.', g, shadow(g, d), [shadowBox(g, d)], true);
}

// ---- Mixed faces and lockups ----------------------------------------------------
{
  const light = await loadFont('Poppins', 300), bold = await loadFont('Poppins', 800);
  const a = layout(light, 'Oefen'), b = layout(bold, 'schrift', { x: a.width });
  design('Mixed faces and lockups', 'weights', 'Light and bold', 'Oefen light, schrift bold, the dot in the accent. Poppins 300 and 800.', [...a, ...b], ink(a) + b.map(dotted).join(''));
}
{
  const sans = await loadFont('Sora', 700), script = await loadFont('Kaushan Script', 400);
  const a = layout(sans, 'Oefen'), b = layout(script, 'schrift', { x: a.width + 6, size: 108 });
  design('Mixed faces and lockups', 'script', 'Sans and script', 'Oefen in a geometric sans, schrift as brush writing in the accent. Sora and Kaushan Script.', [...a, ...b], ink(a) + paint(b, 'accent'));
}
{
  const serif = await loadFont('Playfair Display', 700, true), sans = await loadFont('Sora', 700);
  const a = layout(serif, 'Oefen', { size: 104 }), b = layout(sans, 'schrift', { x: a.width + 5 });
  design('Mixed faces and lockups', 'italic-serif', 'Italic serif and sans', 'Oefen in an italic serif accent, schrift in a plain sans. Playfair Display Italic and Sora.', [...a, ...b], paint(a, 'accent') + ink(b));
}
{
  const font = await loadFont('Outfit', 700), a = layout(font, 'Oefen'), b = layout(font, 'schrift', { y: 92 }), id = 'stacked';
  const o = splitO(id, oGeometry(a[0]));
  design('Mixed faces and lockups', id, 'Stacked', 'Two lines, left-aligned, with the split O and the accent dot: a taller mark for the narrow sidebar. Outfit.', [...a, ...b], `<defs>${o.defs}</defs>${o.body}` + ink(a.slice(1)) + b.map(dotted).join(''));
}
{
  const font = await loadFont('Sora', 700), g = layout(font, 'oefenschrift');
  design('Mixed faces and lockups', 'lowercase', 'All lowercase', 'The split O idea on a lowercase word. Sora.', g, splitMarkup('lowercase', g));
}
{
  const font = await loadFont('Poppins', 700, true), g = layout(font, WORD);
  design('Mixed faces and lockups', 'italic', 'Italic', 'The split O idea in an italic cut, for a sense of movement. Poppins Italic.', g, splitMarkup('italic', g));
}
{
  const font = await loadFont('Lilita One', 400), g = layout(font, WORD, { tracking: 1.5 });
  design('Mixed faces and lockups', 'chunky', 'Chunky', 'The split O idea in a heavy display face with a little tracking. Lilita One.', g, splitMarkup('chunky', g), [], true);
}
{
  const font = await loadFont('Fraunces', 700), g = layout(font, WORD);
  design('Mixed faces and lockups', 'serif-split', 'Serif split', 'The split O idea in a soft serif. Fraunces.', g, splitMarkup('serif-split', g), [], true);
}

// ---- Round two: the favourites combined -----------------------------------------
// Pen stroke, offset shadow, the chunky and serif split O, and Nunito, crossed.
const ROUND = 'Round two: the favourites combined';
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 13, 7.5);
  design(ROUND, 'nunito-pen', 'Nunito · pen stroke', 'The stroke under schrift on the round sans, the dot in the accent.', g, g.map(dotted).join('') + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 13, 7.5);
  design(ROUND, 'nunito-split-pen', 'Nunito · split O · pen stroke', 'The chosen O with the stroke under schrift.', g, splitMarkup('nunito-split-pen', g) + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD), d = 3.5;
  design(ROUND, 'nunito-shadow', 'Nunito · offset shadow', 'The accent shadow on the round sans.', g, shadow(g, d), [shadowBox(g, d)], true);
}
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD), p = pen(g[0].bbox.x1 + 4, g[11].bbox.x2 - 2, 13, 8);
  design(ROUND, 'nunito-pen-full', 'Nunito · stroke under the whole word', 'One long stroke under everything.', g, g.map(dotted).join('') + `<path class="accent" d="${p.d}"/>`, [p.box]);
}
{
  const font = await loadFont('Lilita One', 400), g = layout(font, WORD, { tracking: 1.5 }), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 14, 8);
  design(ROUND, 'chunky-pen', 'Chunky · pen stroke', 'The heavy face with the stroke under schrift and the split O.', g, splitMarkup('chunky-pen', g) + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Lilita One', 400), g = layout(font, WORD, { tracking: 1.5 }), d = 4;
  design(ROUND, 'chunky-shadow', 'Chunky · offset shadow', 'The heavy face with the accent shadow.', g, shadow(g, d), [shadowBox(g, d)], true);
}
{
  const font = await loadFont('Lilita One', 400), g = layout(font, WORD, { tracking: 2 }), d = 5;
  design(
    ROUND,
    'sticker',
    'Chunky · sticker',
    'A bigger shadow, and a hairline of paper around the letters so they lift off it.',
    g,
    shadow(g, d, 'accent', g.map((x) => `<path class="ink sticker" d="${x.d}"/>`).join('')),
    [shadowBox(g, d)],
    true,
  );
}
{
  const font = await loadFont('Lilita One', 400), g = layout(font, WORD, { tracking: 1.5 }), d = 4;
  design(ROUND, 'chunky-shadow-mark', 'Chunky · soft shadow', 'The shadow in the lighter marker yellow instead of the accent.', g, shadow(g, d, 'mark'), [shadowBox(g, d)]);
}
{
  const font = await loadFont('Fraunces', 700), g = layout(font, WORD), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 13);
  design(ROUND, 'serif-pen', 'Serif split · pen stroke', 'The soft serif with the split O and the stroke under schrift.', g, splitMarkup('serif-pen', g) + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Fraunces', 700), g = layout(font, WORD), d = 3.5;
  design(ROUND, 'serif-shadow', 'Serif · offset shadow', 'The soft serif with the accent shadow.', g, shadow(g, d), [shadowBox(g, d)], true);
}
{
  const font = await loadFont('Fraunces', 700), g = layout(font, WORD), o = g[0], p = pen(o.bbox.x1 + 2, g[4].bbox.x2, 13);
  design(ROUND, 'serif-pen-oefen', 'Serif · stroke under Oefen', 'The stroke under the first word instead, the dot in the accent.', g, g.map(dotted).join('') + `<path class="accent" d="${p.d}"/>`, [p.box]);
}
{
  const font = await loadFont('Righteous', 400), g = layout(font, WORD);
  design(ROUND, 'righteous-split', 'Righteous · split O', 'The shadow face without the shadow, with the chosen O.', g, splitMarkup('righteous-split', g), [], true);
}
{
  const font = await loadFont('Instrument Serif', 400), g = layout(font, WORD), s = g[5], t = g[11], p = pen(s.bbox.x1 + 2, t.bbox.x2, 13);
  design(ROUND, 'instrument-split-pen', 'Instrument Serif · split O · pen stroke', 'The pen stroke face with the chosen O as well.', g, splitMarkup('instrument-split-pen', g) + `<path class="accent" d="${p.d}"/>`, [p.box], true);
}
{
  const font = await loadFont('Nunito', 800), g = layout(font, WORD);
  design(ROUND, 'nunito-split', 'Nunito · split O', 'The chosen concept on the round sans, for comparison.', g, splitMarkup('nunito-split', g));
}

// ---- The page -------------------------------------------------------------------
export const styles = `.ink{fill:var(--ink)}.accent{fill:var(--accent)}.mark{fill:var(--mark)}.paper{fill:var(--paper)}.on-accent{fill:#221f1a}.gap{stroke:var(--paper);stroke-width:3.6;fill:none}.sticker{stroke:var(--paper);stroke-width:3;paint-order:stroke;stroke-linejoin:round}`;
export function buildDesignsPage() {
  const groups = [...new Set(designs.map((d) => d.group))];
  const symbols = designs.map((d) => `<symbol id="${d.id}" viewBox="${d.viewBox}">${d.markup}</symbol>`).join('');
  const use = (d) => {
    const [, , w, h] = d.viewBox.split(' ');
    return `<svg role="img" aria-label="Oefenschrift" viewBox="0 0 ${w} ${h}"><use href="#${d.id}"/></svg>`;
  };
  const rows = groups
    .map(
      (group) => `<section><h2>${group}</h2>${designs
        .filter((d) => d.group === group)
        .map((d) => {
          const [, , w, h] = d.viewBox.split(' '), tall = h / w > 0.3 ? ' tall' : '';
          return `<div class="row${tall}"><div class="big">${use(d)}</div><div class="tile light">${use(d)}</div><div class="tile dark">${use(d)}</div><p><strong>${d.title}</strong><br>${d.note}</p></div>`;
        })
        .join('')}</section>`,
    )
    .join('');
  fs.writeFileSync(
    path.join(here, 'oefenschrift-designs.html'),
    `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Oefenschrift · ideas</title><style>
body{margin:0;padding:2rem 1.5rem 4rem;background:#f3efe6;color:#221f1a;font:14px/1.5 "Public Sans",system-ui,sans-serif;--ink:#221f1a;--accent:#efbf24;--mark:#ffe79a;--paper:#f3efe6}
main{max-width:64rem;margin:0 auto}h1{font-size:1.35rem;margin:0 0 .25rem}h2{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#6f6a5e;margin:2.5rem 0 .25rem}
p{margin:0;color:#6f6a5e}p strong{color:#221f1a}
.row{display:grid;grid-template-columns:minmax(20rem,auto) 11rem 11rem 1fr;gap:1.5rem;align-items:center;padding:.8rem 0;border-bottom:1px solid #e2dccd}
.big svg{display:block;height:52px;width:auto}.tall .big svg{height:96px}.tile{padding:.55rem .7rem;border-radius:.5rem;background:#f3efe6}.tile svg{display:block;max-width:8.5rem;max-height:2rem;width:auto}.tall .tile svg{max-height:3.5rem}
.tile.dark{background:#242424;--ink:#eeece5;--accent:#edc343;--mark:#65572c;--paper:#242424}${styles}
@media (max-width:52rem){.row{grid-template-columns:1fr 1fr}.big{grid-column:1/-1}.big svg{height:auto;width:100%;max-height:52px}}
</style><body><main><h1>Oefenschrift · ${designs.length} ideas</h1><p>What else could take the accent colour, the O as an object, marks and lines, mixed faces and lockups, and a second round that combines the favourites. Each idea in a face that suits it; large, then at sidebar size in the light and dark themes.</p>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>${rows}</main></body></html>`,
  );
  return designs.length;
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) console.log(`${buildDesignsPage()} ideas`);
