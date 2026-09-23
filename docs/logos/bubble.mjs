// The speech-bubble logo the user chose in September 2026 (concept 8 in concepts.mjs): a yellow
// bubble saying "oe" — the first sound that is purely Dutch — beside the name. Two things are
// still open, so they are generated apart and combined in the browser: the bubble's tail
// (six shapes) and the typeface of the "oe" and the name (a spread of faces, among them those
// the user liked in the first logo round: Lilita One, Righteous, Fraunces, Signika). The "oe"
// sits on the yellow in the dark ink of both themes (class on-accent), so it never turns
// light on light at night. Writes the comparison page docs/logos/out/bubble.html (ignored); the
// chosen combination is built by mark.mjs.
//
//   npm install --no-save opentype.js@1.3.4 harfbuzzjs
//   node docs/logos/bubble.mjs
import fs from 'node:fs';
import path from 'node:path';
import { loadFont, layout, bounds, viewBox, round } from './lib.mjs';
const here = path.dirname(new URL(import.meta.url).pathname);
// The bubble's box in the 100-unit em of the name, baseline at 0: as tall as the capitals.
const L = 0,
  R = 86,
  T = -75,
  B = -7,
  RAD = 21,
  GAP = 20;
const n = (v) => round(v);
// The bubble hangs this much lower than the capitals: its body ends on the baseline and the
// tail reaches below it (the user found it too high level with the name).
const DROP = 8;
// A rectangle with its own radius at each corner, clockwise from the top left.
const rounded = (x1, y1, x2, y2, [tl, tr, br, bl]) =>
  `M${n(x1 + tl)} ${n(y1)}H${n(x2 - tr)}` +
  (tr ? `A${tr} ${tr} 0 0 1 ${n(x2)} ${n(y1 + tr)}` : '') +
  `V${n(y2 - br)}` +
  (br ? `A${br} ${br} 0 0 1 ${n(x2 - br)} ${n(y2)}` : '') +
  `H${n(x1 + bl)}` +
  (bl ? `A${bl} ${bl} 0 0 1 ${n(x1)} ${n(y2 - bl)}` : '') +
  `V${n(y1 + tl)}` +
  (tl ? `A${tl} ${tl} 0 0 1 ${n(x1 + tl)} ${n(y1)}` : '') +
  'Z';
const all = [RAD, RAD, RAD, RAD];
// The tails: the bubble's body (d) and the tail itself (tip) are separate shapes. As one
// path they cancelled where they overlap — the tails run the other way round, and the
// nonzero fill rule leaves such an overlap empty, a white sliver at the join.
const tails = [
  {
    id: 'curve',
    name: 'Изогнутый хвостик',
    d: rounded(L, T, R, B, all),
    tip: `M${n(L + 16)} ${n(B - 4)}C${n(L + 18)} ${n(B + 6)} ${n(L + 12)} ${n(B + 14)} ${n(L + 3)} ${n(B + 19)}C${n(L + 20)} ${n(B + 19)} ${n(L + 32)} ${n(B + 11)} ${n(L + 40)} ${n(B - 4)}Z`,
    below: 20,
  },
  {
    id: 'sharp',
    name: 'Острый хвостик (выбран)',
    d: rounded(L, T, R, B, all),
    tip: `M${n(L + 18)} ${n(B - 4)}L${n(L + 12)} ${n(B + 17)}L${n(L + 38)} ${n(B - 4)}Z`,
    below: 18,
  },
  {
    id: 'corner',
    name: 'Без хвостика, один прямой угол',
    d: rounded(L, T, R, B, [RAD, RAD, RAD, 0]),
    below: 0,
  },
  {
    id: 'curl',
    name: 'Завиток, как в мессенджерах',
    d: rounded(L, T, R, B, all),
    tip: `M${n(L)} ${n(B - 26)}C${n(L)} ${n(B - 6)} ${n(L - 5)} ${n(B + 3)} ${n(L - 13)} ${n(B + 7)}C${n(L + 3)} ${n(B + 9)} ${n(L + 17)} ${n(B + 5)} ${n(L + 27)} ${n(B - 4)}L${n(L + 20)} ${n(B - 20)}Z`,
    below: 9,
    left: 14,
  },
  {
    id: 'middle',
    name: 'Хвостик по центру',
    d: rounded(L, T, R, B, all),
    tip: `M${n((L + R) / 2 - 10)} ${n(B - 4)}L${n((L + R) / 2)} ${n(B + 14)}L${n((L + R) / 2 + 10)} ${n(B - 4)}Z`,
    below: 15,
  },
  {
    id: 'round',
    name: 'Круглое облачко',
    ...(() => {
      const cx = (L + R) / 2 - 2,
        cy = (T + B) / 2,
        r = (B - T) / 2 + 4;
      return {
        d: `M${n(cx - r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 1 ${n(cx + r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 1 ${n(cx - r)} ${n(cy)}Z`,
        tip: `M${n(cx - r * 0.66)} ${n(cy + r * 0.56)}C${n(cx - r * 0.66)} ${n(cy + r * 0.95)} ${n(cx - r * 0.86)} ${n(cy + r * 1.12)} ${n(cx - r * 1.08)} ${n(cy + r * 1.2)}C${n(cx - r * 0.7)} ${n(cy + r * 1.26)} ${n(cx - r * 0.34)} ${n(cy + r * 1.1)} ${n(cx - r * 0.12)} ${n(cy + r * 0.84)}Z`,
      };
    })(),
    below: 16,
    above: 4,
  },
];
// The faces: the site's Nunito first, then soft, chunky, humanist and serif alternatives.
const faces = [
  { id: 'nunito', name: 'Nunito 800 (сейчас на сайте)', family: 'Nunito', weight: 800 },
  { id: 'nunito-black', name: 'Nunito 900, ещё жирнее', family: 'Nunito', weight: 900 },
  { id: 'baloo', name: 'Baloo 2', family: 'Baloo 2', weight: 800 },
  { id: 'varela', name: 'Varela Round', family: 'Varela Round', weight: 400 },
  { id: 'fredoka', name: 'Fredoka', family: 'Fredoka', weight: 600 },
  { id: 'lilita', name: 'Lilita One (нравился в прошлый раз)', family: 'Lilita One', weight: 400 },
  { id: 'righteous', name: 'Righteous (нравился в прошлый раз)', family: 'Righteous', weight: 400 },
  { id: 'paytone', name: 'Paytone One', family: 'Paytone One', weight: 400 },
  { id: 'signika', name: 'Signika (нравился)', family: 'Signika', weight: 700 },
  { id: 'fira', name: 'Fira Sans 800 (шрифт текста сайта)', family: 'Fira Sans', weight: 800 },
  { id: 'sofia', name: 'Sofia Sans', family: 'Sofia Sans', weight: 800 },
  { id: 'radio', name: 'Radio Canada Big', family: 'Radio Canada Big', weight: 700 },
  { id: 'familjen', name: 'Familjen Grotesk', family: 'Familjen Grotesk', weight: 700 },
  { id: 'schibsted', name: 'Schibsted Grotesk', family: 'Schibsted Grotesk', weight: 800 },
  { id: 'proza', name: 'Proza Libre', family: 'Proza Libre', weight: 800 },
  { id: 'fraunces', name: 'Fraunces (нравился в прошлый раз)', family: 'Fraunces', weight: 700 },
  { id: 'young', name: 'Young Serif', family: 'Young Serif', weight: 400 },
  { id: 'zilla', name: 'Zilla Slab', family: 'Zilla Slab', weight: 700 },
];
const capOf = (font) => -font.charToGlyph('H').getPath(0, 0, 100).getBoundingBox().y1;
const nunitoCap = capOf(await loadFont('Nunito', 800));
const built = [];
for (const face of faces) {
  const font = await loadFont(face.family, face.weight),
    // Every face is scaled to Nunito's capital height, so the bubble fits them all alike.
    size = (100 * nunitoCap) / capOf(font),
    word = layout(font, 'Oefenschrift', { x: R + GAP, size });
  // The "oe" fills about half the bubble's height, centred a little above the middle.
  const probe = layout(font, 'oe', { size: 100 }),
    pb = bounds(probe, 0),
    scale = (0.42 * (B - T)) / (pb.y2 - pb.y1),
    w = (pb.x2 - pb.x1) * scale,
    h = (pb.y2 - pb.y1) * scale,
    ox = (L + R) / 2 - w / 2 - pb.x1 * scale,
    oy = (T + B) / 2 - 1 + h / 2 - pb.y2 * scale,
    oe = layout(font, 'oe', { size: 100 * scale, x: ox, y: oy });
  const wb = bounds(word, 0);
  built.push({
    id: face.id,
    name: face.name,
    oe: oe.map((g) => g.d).join(''),
    word: word.map((g) => g.d).join(''),
    right: round(wb.x2),
    top: round(Math.min(wb.y1, T)),
    bottom: round(wb.y2),
  });
}
// The gallery: the tails in Nunito, then every face with the curved tail; each on white, on
// the light sidebar (30% cream) and on the dark sidebar, large and at sidebar size.
const grounds = [
  { name: 'Белый фон', bg: '#ffffff', ink: '#221f1a', on: '#221f1a', accent: '#efbf24' },
  { name: 'Светлый сайдбар', bg: '#f8f6f2', ink: '#221f1a', on: '#221f1a', accent: '#efbf24' },
  { name: 'Тёмный сайдбар', bg: '#1a1a19', ink: '#eeece5', on: '#1f1d19', accent: '#edc343' },
];
const box = (tail, face) => {
  const x1 = -(tail.left || 0) - 3,
    y1 = Math.min(face.top, T - (tail.above || 0) + DROP) - 3,
    x2 = face.right + 3,
    y2 = Math.max(face.bottom, B + tail.below + DROP) + 3;
  return `${round(x1)} ${round(y1)} ${round(x2 - x1)} ${round(y2 - y1)}`;
};
const shapes = (tail, face, g) =>
  `<g transform="translate(0 ${DROP})"><path fill="${g.accent}" d="${tail.d}"/>${tail.tip ? `<path fill="${g.accent}" d="${tail.tip}"/>` : ''}<path fill="${g.on}" d="${face.oe}"/></g><path fill="${g.ink}" d="${face.word}"/>`;
const svg = (tail, face, g) =>
  `<div class="cell" style="background:${g.bg}"><svg viewBox="${box(tail, face)}" role="img" aria-label="Oefenschrift">${shapes(tail, face, g)}</svg><svg class="small" viewBox="${box(tail, face)}" aria-hidden="true">${shapes(tail, face, g)}</svg></div>`;
const row = (title, tail, face) =>
  `<section><h2>${title}</h2><div class="grid">${grounds.map((g) => svg(tail, face, g)).join('')}</div></section>`;
const nunito = built[0],
  sharp = tails.find((t) => t.id === 'sharp');
fs.mkdirSync(path.join(here, 'out'), { recursive: true });
fs.writeFileSync(
  path.join(here, 'out/bubble.html'),
  `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Oefenschrift · облачко</title><style>
body{margin:0;padding:24px;background:#fbfbfa;color:#1d1d1b;font:14px/1.45 system-ui,sans-serif}
h1{font-size:18px;margin:26px 0 4px}h1:first-child{margin-top:0}body>p{margin:0 0 14px;color:#666}
.legend{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;color:#777;font-size:12px;margin-bottom:4px}
section{padding:12px 0;border-top:1px solid #e6e6e2}h2{font-size:14px;margin:0 0 8px}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.cell{display:flex;flex-direction:column;gap:14px;padding:16px 20px;border-radius:10px;border:1px solid #e6e6e2}
.cell svg{display:block;width:100%;max-width:330px;height:auto}.cell svg.small{width:136px;max-height:36px}
@media (max-width:52rem){.grid{grid-template-columns:1fr}}
</style><h1>Хвостик облачка</h1><p>Все в Nunito 800, шрифте заголовков сайта. Крупно и в размере сайдбара. «oe» внутри облачка теперь тёмные в обеих темах.</p><div class="legend">${grounds.map((g) => `<span>${g.name}</span>`).join('')}</div>${tails
    .map((t, i) => row(`${i + 1}. ${t.name}`, t, nunito))
    .join('')}<h1>Шрифт логотипа</h1><p>С острым хвостиком, который ты выбрал. Все шрифты подогнаны к одной высоте заглавных, чтобы сравнение было честным.</p><div class="legend">${grounds.map((g) => `<span>${g.name}</span>`).join('')}</div>${built
    .map((f, i) => row(`${String.fromCharCode(65 + i)}. ${f.name}`, sharp, f))
    .join('')}</html>`,
);
console.log(`${tails.length} tails, ${built.length} faces`);
