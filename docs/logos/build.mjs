// Builds the six wordmark candidates as path-only SVG: glyph outlines from Outfit
// Bold, accents as clipped glyph parts or simple shapes. Coordinates are in a
// 100px em so the paths stay short; the viewBox is fitted per logo.
import opentype from 'opentype.js';
import fs from 'node:fs';
const font = opentype.loadSync('Outfit-700.woff'), SIZE = 100, GAP = 0;
const ACCENT = '#efbf24', INK = '#221f1a';
const round = (n) => Math.round(n * 100) / 100;
// Lay out a word; returns per-glyph paths (SVG d strings) with their x offsets.
function layout(word, x0 = 0) {
  const glyphs = font.stringToGlyphs(word); let x = x0; const out = [];
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i], path = g.getPath(x, 0, SIZE);
    const bbox = path.getBoundingBox();
    out.push({ char: word[i], x, d: pathData(path), bbox, advance: g.advanceWidth * SIZE / font.unitsPerEm });
    x += out[i].advance + (i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) * SIZE / font.unitsPerEm : 0) + GAP;
  }
  return { glyphs: out, width: x - x0 };
}
function pathData(path) {
  return path.commands.map((c) => c.type === 'M' ? `M${round(c.x)} ${round(c.y)}` : c.type === 'L' ? `L${round(c.x)} ${round(c.y)}` : c.type === 'C' ? `C${round(c.x1)} ${round(c.y1)} ${round(c.x2)} ${round(c.y2)} ${round(c.x)} ${round(c.y)}` : c.type === 'Q' ? `Q${round(c.x1)} ${round(c.y1)} ${round(c.x)} ${round(c.y)}` : 'Z').join('');
}
// Split a glyph path into contours so one part (an i-dot) can take another colour.
function contours(path) {
  const parts = []; let current = null;
  for (const c of path.commands) {
    if (c.type === 'M') { current = { commands: [c] }; parts.push(current); }
    else current.commands.push(c);
  }
  return parts.map((p) => ({ d: pathData({ commands: p.commands }), bbox: bboxOf(p.commands) }));
}
function bboxOf(commands) {
  const xs = [], ys = [];
  for (const c of commands) { if ('x' in c) { xs.push(c.x); ys.push(c.y); } }
  return { x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) };
}
const wedge = (cx, cy, r, from, to) => {
  // Polygon covering the sector between two angles (degrees, clockwise from 3 o'clock, y down).
  const pts = [`${round(cx)} ${round(cy)}`];
  for (let a = from; a <= to; a += 5) pts.push(`${round(cx + r * Math.cos((a * Math.PI) / 180))} ${round(cy + r * Math.sin((a * Math.PI) / 180))}`);
  return pts.join(' ');
};
function svg(name, parts, extraDefs = '') {
  const all = parts.flatMap((p) => p.bbox ? [p.bbox] : []);
  const x1 = Math.min(...all.map((b) => b.x1)) - 4, y1 = Math.min(...all.map((b) => b.y1)) - 4, x2 = Math.max(...all.map((b) => b.x2)) + 4, y2 = Math.max(...all.map((b) => b.y2)) + 4;
  const body = parts.map((p) => p.markup).join('');
  return { name, viewBox: `${round(x1)} ${round(y1)} ${round(x2 - x1)} ${round(y2 - y1)}`, defs: extraDefs, body };
}
const inkPath = (d, bbox) => ({ markup: `<path class="ink" d="${d}"/>`, bbox });
const accentPath = (d, bbox) => ({ markup: `<path class="accent" d="${d}"/>`, bbox });
const logos = [];
// 1 · Inburger + klaar in the accent colour.
{
  const { glyphs } = layout('Inburgerklaar');
  logos.push(svg('inburgerklaar-klaar', glyphs.map((g, i) => (i >= 8 ? accentPath : inkPath)(g.d, g.bbox))));
}
// 2 · Oefenschrift with the top-right of the O in the accent colour.
{
  const { glyphs } = layout('Oefenschrift'), o = glyphs[0], cx = (o.bbox.x1 + o.bbox.x2) / 2, cy = (o.bbox.y1 + o.bbox.y2) / 2, r = Math.max(o.bbox.x2 - o.bbox.x1, o.bbox.y2 - o.bbox.y1);
  const parts = glyphs.map((g) => inkPath(g.d, g.bbox));
  parts.push({ markup: `<path class="accent" clip-path="url(#o-arc-1)" d="${o.d}"/>`, bbox: o.bbox });
  logos.push(svg('oefenschrift-boog', parts, `<clipPath id="o-arc-1"><polygon points="${wedge(cx, cy, r, -100, 8)}"/></clipPath>`));
}
// 3 · In in the accent colour, with a tail from the n sweeping under the b.
{
  const { glyphs } = layout('Inburgerklaar'), n = glyphs[1], b = glyphs[2];
  const parts = glyphs.map((g, i) => (i < 2 ? accentPath : inkPath)(g.d, g.bbox));
  const stem = n.bbox.x2 - 9, base = n.bbox.y2;
  const tail = `M${round(stem)} ${round(base - 22)}V${round(base - 6)}C${round(stem)} ${round(base + 10)} ${round(stem + 18)} ${round(base + 13)} ${round(b.bbox.x2 + 4)} ${round(base + 10)}`;
  parts.push({ markup: `<path class="accent stroke" d="${tail}" fill="none" stroke-width="9.5" stroke-linecap="round"/>`, bbox: { x1: stem, y1: base - 22, x2: b.bbox.x2 + 4, y2: base + 18 } });
  logos.push(svg('inburgerklaar-in', parts));
}
// 4 · Oefenschrift with an accent bar above the e, at the f's crossbar height.
{
  const { glyphs } = layout('Oefenschrift'), e = glyphs[1], f = glyphs[2];
  const parts = glyphs.map((g) => inkPath(g.d, g.bbox));
  const y = f.bbox.y1 + (e.bbox.y1 - f.bbox.y1) * 0.35, h = 9;
  parts.push({ markup: `<rect class="accent" x="${round(e.bbox.x1)}" y="${round(y)}" width="${round(e.bbox.x2 - e.bbox.x1 + 6)}" height="${h}" rx="${h / 2}"/>`, bbox: { x1: e.bbox.x1, y1: y, x2: e.bbox.x2 + 6, y2: y + h } });
  logos.push(svg('oefenschrift-balk', parts));
}
// 5 · Inburgerklaar with an accent underline curving under "aar".
{
  const { glyphs } = layout('Inburgerklaar'), from = glyphs[9], to = glyphs[12];
  const parts = glyphs.map((g) => inkPath(g.d, g.bbox));
  const y = from.bbox.y2 + 14, x1 = from.bbox.x1 + 2, x2 = to.bbox.x2 - 2;
  const curve = `M${round(x1)} ${round(y)}Q${round((x1 + x2) / 2)} ${round(y + 16)} ${round(x2)} ${round(y)}`;
  parts.push({ markup: `<path class="accent stroke" d="${curve}" fill="none" stroke-width="8.5" stroke-linecap="round"/>`, bbox: { x1, y1: y, x2, y2: y + 14 } });
  logos.push(svg('inburgerklaar-boog', parts));
}
// 6 · Oefenschrift with the top of the O and the dot of the i in the accent colour.
{
  const { glyphs } = layout('Oefenschrift'), o = glyphs[0], cx = (o.bbox.x1 + o.bbox.x2) / 2, cy = (o.bbox.y1 + o.bbox.y2) / 2, r = Math.max(o.bbox.x2 - o.bbox.x1, o.bbox.y2 - o.bbox.y1);
  const parts = [];
  glyphs.forEach((g, i) => {
    if (g.char === 'i') {
      const cs = contours(font.charToGlyph('i').getPath(g.x, 0, SIZE)), dot = cs.reduce((a, b) => (b.bbox.y2 - b.bbox.y1 < a.bbox.y2 - a.bbox.y1 ? b : a));
      for (const c of cs) parts.push((c === dot ? accentPath : inkPath)(c.d, c.bbox));
    } else parts.push(inkPath(g.d, g.bbox));
  });
  parts.push({ markup: `<path class="accent" clip-path="url(#o-arc-6)" d="${o.d}"/>`, bbox: o.bbox });
  logos.push(svg('oefenschrift-bogen', parts, `<clipPath id="o-arc-6"><polygon points="${wedge(cx, cy, r, -150, -30)}"/></clipPath>`));
}
// Standalone files with literal colours, and a module with the raw parts for the app.
fs.mkdirSync('out', { recursive: true });
for (const logo of logos) {
  const file = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" role="img" aria-label="${logo.name.split('-')[0]}"><style>.ink{fill:${INK}}.accent{fill:${ACCENT}}.stroke{fill:none;stroke:${ACCENT}}</style>${logo.defs ? `<defs>${logo.defs}</defs>` : ''}${logo.body}</svg>`;
  fs.writeFileSync(`out/${logo.name}.svg`, file);
}
fs.writeFileSync('out/logos.json', JSON.stringify(logos.map((l) => ({ name: l.name, viewBox: l.viewBox, defs: l.defs, body: l.body })), null, 1));
fs.writeFileSync('out/preview.html', `<!doctype html><meta charset="utf-8"><body style="background:#f3efe6;margin:0;padding:40px;display:grid;gap:36px;grid-template-columns:1fr 1fr;align-items:center">${logos.map((l) => `<div><svg viewBox="${l.viewBox}" height="64" style="display:block"><style>.ink{fill:${INK}}.accent{fill:${ACCENT}}.stroke{fill:none;stroke:${ACCENT}}</style>${l.defs ? `<defs>${l.defs}</defs>` : ''}${l.body}</svg><p style="font:13px sans-serif;color:#6f6a5e">${l.name}</p></div>`).join('')}</body>`);
console.log(logos.map((l) => l.name + ' ' + l.viewBox).join('\n'));
