// Shared tooling for the wordmark generators: Google Fonts fetching, glyph layout
// as SVG path data (a 100-unit em, baseline at y = 0, y down), contour splitting and
// the clip boxes of the split-O mark.
import fs from 'node:fs';
import path from 'node:path';
import opentype from 'opentype.js';
export const SIZE = 100;
const fontDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'fonts');
export const round = (n) => Math.round(n * 100) / 100;
export const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');
// A font file, fetched once into docs/logos/fonts/ (ignored by git). An old user agent
// makes Google serve plain woff, which opentype.js can read.
export async function fetchFont(name, weight, italic = false) {
  const base = path.join(fontDir, `${name.replace(/\s+/g, '')}${italic ? '-Italic' : ''}-${weight}`);
  for (const ext of ['woff', 'ttf', 'otf']) if (fs.existsSync(`${base}.${ext}`)) return `${base}.${ext}`;
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${name.replace(/\s+/g, '+')}:${axis}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:27.0) Gecko/20100101 Firefox/27.0' },
    })
  ).text();
  const url = css.match(/url\((https:[^)]+\.(woff|ttf))\)/);
  if (!url) throw new Error(`No font file for ${name} ${weight}${italic ? ' italic' : ''}`);
  const file = `${base}.${url[2]}`;
  fs.mkdirSync(fontDir, { recursive: true });
  fs.writeFileSync(file, Buffer.from(await (await fetch(url[1])).arrayBuffer()));
  return file;
}
export const loadFont = async (name, weight, italic = false) => opentype.loadSync(await fetchFont(name, weight, italic));
export function pathData(commands) {
  return commands
    .map((c) =>
      c.type === 'M' || c.type === 'L'
        ? `${c.type}${round(c.x)} ${round(c.y)}`
        : c.type === 'C'
          ? `C${round(c.x1)} ${round(c.y1)} ${round(c.x2)} ${round(c.y2)} ${round(c.x)} ${round(c.y)}`
          : c.type === 'Q'
            ? `Q${round(c.x1)} ${round(c.y1)} ${round(c.x)} ${round(c.y)}`
            : 'Z',
    )
    .join('');
}
// A glyph's contours, each with its own path data and box, outermost first.
export function contours(path) {
  const parts = [];
  for (const c of path.commands) {
    if (c.type === 'M') parts.push([]);
    parts.at(-1).push(c);
  }
  const out = parts.map((commands) => {
    const xs = commands.flatMap((c) => [c.x, c.x1, c.x2].filter((v) => v !== undefined));
    const ys = commands.flatMap((c) => [c.y, c.y1, c.y2].filter((v) => v !== undefined));
    return { d: pathData(commands), x1: Math.min(...xs), y1: Math.min(...ys), x2: Math.max(...xs), y2: Math.max(...ys) };
  });
  for (const c of out) {
    c.width = c.x2 - c.x1;
    c.height = c.y2 - c.y1;
    c.inner = out.some((o) => o !== c && o.x1 <= c.x1 && o.y1 <= c.y1 && o.x2 >= c.x2 && o.y2 >= c.y2);
  }
  return out;
}
// Lay a word out with the font's kerning; each glyph gets path data and a box.
export function layout(font, text, { x = 0, y = 0, size = SIZE, tracking = 0 } = {}) {
  const glyphs = font.stringToGlyphs(text), scale = size / font.unitsPerEm, out = [];
  let pen = x;
  glyphs.forEach((g, i) => {
    const path = g.getPath(pen, y, size), bbox = path.getBoundingBox();
    out.push({ char: text[i], x: pen, path, d: pathData(path.commands), bbox });
    pen += g.advanceWidth * scale + tracking + (i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) * scale : 0);
  });
  out.width = pen - x - tracking;
  return out;
}
// Vertical proportions and the stem weight of a face, in em units (y up is negative).
export function metrics(font, size = SIZE) {
  const top = (ch) => font.charToGlyph(ch).getPath(0, 0, size).getBoundingBox().y1;
  const stem = contours(font.charToGlyph('l').getPath(0, 0, size)).reduce((a, c) => (c.height > a.height ? c : a));
  return { xHeight: top('x'), capHeight: top('H'), ascender: top('h'), stem: stem.width };
}
export function bounds(glyphs, pad = 3) {
  const boxes = glyphs.map((g) => g.bbox || g);
  return {
    x1: Math.min(...boxes.map((b) => b.x1)) - pad,
    y1: Math.min(...boxes.map((b) => b.y1)) - pad,
    x2: Math.max(...boxes.map((b) => b.x2)) + pad,
    y2: Math.max(...boxes.map((b) => b.y2)) + pad,
  };
}
export const viewBox = (b) => `${round(b.x1)} ${round(b.y1)} ${round(b.x2 - b.x1)} ${round(b.y2 - b.y1)}`;
export const rect = (x, y, w, h, attrs = '') =>
  `<rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(h)}"${attrs}/>`;
// The polygon covering a sector of the circle around (cx, cy); angles in degrees,
// clockwise from three o'clock as SVG draws them.
export function wedge(cx, cy, r, from, to) {
  const pts = [`${round(cx)} ${round(cy)}`];
  for (let a = from; a <= to; a += 3) pts.push(`${round(cx + r * Math.cos((a * Math.PI) / 180))} ${round(cy + r * Math.sin((a * Math.PI) / 180))}`);
  pts.push(`${round(cx + r * Math.cos((to * Math.PI) / 180))} ${round(cy + r * Math.sin((to * Math.PI) / 180))}`);
  return `<polygon points="${pts.join(' ')}"/>`;
}
// Flatten a glyph outline into polygons, then test points against it (even-odd), so a
// treatment can find a crossbar or a stem from the outline itself.
export function flatten(path, steps = 8) {
  const polys = [];
  let current = null, last = null;
  for (const c of path.commands) {
    if (c.type === 'M') {
      current = [[c.x, c.y]];
      polys.push(current);
    } else if (c.type === 'L') current.push([c.x, c.y]);
    else if (c.type === 'Q' || c.type === 'C')
      for (let i = 1; i <= steps; i++) {
        const t = i / steps, m = 1 - t;
        current.push(
          c.type === 'Q'
            ? [m * m * last[0] + 2 * m * t * c.x1 + t * t * c.x, m * m * last[1] + 2 * m * t * c.y1 + t * t * c.y]
            : [m ** 3 * last[0] + 3 * m * m * t * c.x1 + 3 * m * t * t * c.x2 + t ** 3 * c.x, m ** 3 * last[1] + 3 * m * m * t * c.y1 + 3 * m * t * t * c.y2 + t ** 3 * c.y],
        );
      }
    if (c.type !== 'Z') last = [c.x, c.y];
  }
  return polys;
}
export function inside(polys, x, y) {
  let hit = false;
  for (const poly of polys)
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
  return hit;
}
// The first run of ink down the vertical line at x, between two heights.
export function band(glyph, x, yFrom, yTo, step = 0.25) {
  const polys = flatten(glyph.path);
  let start = null;
  for (let y = yFrom; y <= yTo; y += step) {
    const hit = inside(polys, x, y);
    if (hit && start === null) start = y;
    if (!hit && start !== null) return [start, y];
  }
  return start === null ? null : [start, yTo];
}
// The split-O mark's geometry from an O glyph, and its two clip boxes: squares around
// the O centre, split at the cut line and rotated with it. The page's controls call
// clipBoxes in the browser, so it must stay self-contained.
export function oGeometry(glyph) {
  const w = glyph.bbox.x2 - glyph.bbox.x1, h = glyph.bbox.y2 - glyph.bbox.y1;
  return { d: glyph.d, cx: round(glyph.bbox.x1 + w / 2), cy: round(glyph.bbox.y1 + h / 2), h: round(h), r: round(Math.hypot(w, h) / 2 + 2) };
}
export function clipBoxes({ cx, cy, h, r }, { angle, share, gap }) {
  const split = cy + (share - 0.5) * h, half = (h * gap) / 2, rotate = ` transform="rotate(${angle} ${cx} ${cy})"`;
  const round = (n) => Math.round(n * 100) / 100;
  return {
    top: `<rect x="${round(cx - r)}" y="${round(cy - r)}" width="${round(2 * r)}" height="${round(split - half - (cy - r))}"${rotate}/>`,
    bottom: `<rect x="${round(cx - r)}" y="${round(split + half)}" width="${round(2 * r)}" height="${round(cy + r - (split + half))}"${rotate}/>`,
  };
}
// The split O with a hairline gap, and the dot of the i in the accent colour.
export const cut = { angle: 0, share: 0.47, gap: 0.05 };
export function splitMarkup(id, glyphs, options = cut) {
  const o = oGeometry(glyphs[0]), boxes = clipBoxes(o, options);
  let markup = `<defs><clipPath id="${id}-top">${boxes.top}</clipPath><clipPath id="${id}-bottom">${boxes.bottom}</clipPath></defs>`;
  markup += `<path class="accent" clip-path="url(#${id}-top)" d="${o.d}"/><path class="ink" clip-path="url(#${id}-bottom)" d="${o.d}"/>`;
  return markup + glyphs.slice(1).map(dotted).join('');
}
// A glyph as ink, except that the dot of an i takes the accent colour.
export function dotted(glyph) {
  const parts = glyph.char === 'i' ? contours(glyph.path) : [];
  if (parts.length < 2) return `<path class="ink" d="${glyph.d}"/>`;
  const dot = parts.reduce((a, b) => (b.height < a.height ? b : a));
  return parts.map((part) => `<path class="${part === dot ? 'accent' : 'ink'}" d="${part.d}"/>`).join('');
}
