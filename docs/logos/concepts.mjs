// Logo concepts, September 2026 (second round): after the variations on one stripe, the
// user asked for genuinely different ideas. Each concept takes one thing from the product —
// the progress ring, the circled answer, Dutch school handwriting, the exercise book, the
// Dutch "oe", the pencil, the teacher's stamp, the magnifier that finds the evidence — and
// keeps Nunito 800, the site's heading face. Writes the gallery docs/logos/out/logos.html
// (ignored; Russian captions, for the user). The user chose the speech bubble (mark.mjs).
//
//   npm install --no-save opentype.js@1.3.4 harfbuzzjs   (lib.mjs uses loadSync, gone in 2.0;
//   HarfBuzz applies the handwriting's contextual joins, which opentype.js does not)
//   node docs/logos/concepts.mjs
//
// Classes: ink and accent fill with the text and the action colour; ink-line and accent-line
// are the same as strokes; paper is the ground behind the mark; the rest are small fixed
// colours (a pencil's metal, eraser and wood) or tints of the accent.
import fs from 'node:fs';
import path from 'node:path';
import { loadFont, layout, bounds, viewBox, contours, dotted, round } from './lib.mjs';
const here = path.dirname(new URL(import.meta.url).pathname);
const nunito = await loadFont('Nunito', 800),
  cursive = await loadFont('Playwrite NL', 400);
const height = (font, ch) => -font.charToGlyph(ch).getPath(0, 0, 100).getBoundingBox().y1;
const X = height(nunito, 'x'),
  CAP = height(nunito, 'H');
const word = layout(nunito, 'Oefenschrift');
const extent = (glyphs, from = 0, to = glyphs.length - 1) => {
  const part = glyphs.slice(from, to + 1).map((g) => g.bbox);
  return {
    x1: Math.min(...part.map((b) => b.x1)),
    y1: Math.min(...part.map((b) => b.y1)),
    x2: Math.max(...part.map((b) => b.x2)),
    y2: Math.max(...part.map((b) => b.y2)),
  };
};
const union = (...boxes) => ({
  x1: Math.min(...boxes.map((b) => b.x1)),
  y1: Math.min(...boxes.map((b) => b.y1)),
  x2: Math.max(...boxes.map((b) => b.x2)),
  y2: Math.max(...boxes.map((b) => b.y2)),
});
const ink = (g) => `<path class="ink" d="${g.d}"/>`;
const line = (points) => 'M' + points.map(([x, y]) => `${round(x)} ${round(y)}`).join('L');
const W = extent(word);
const concepts = [];
const add = (id, name, note, markup, box, extra = {}) =>
  concepts.push({ id, name, note, viewBox: viewBox(bounds([box], 4)), markup, ...extra });
// Glyph outlines at an offset, for a word set beside a symbol.
const shifted = (text, x, options = {}) => layout(nunito, text, { x, ...options });

// 1. The O as the site's progress ring: a faint track and a yellow arc, three quarters.
{
  const o = word[0].bbox,
    cx = (o.x1 + o.x2) / 2,
    cy = (o.y1 + o.y2) / 2,
    t = 15,
    r = ((o.x2 - o.x1) / 2 + (o.y2 - o.y1) / 2) / 2 - t / 2;
  const at = (deg) => [cx + r * Math.sin((deg * Math.PI) / 180), cy - r * Math.cos((deg * Math.PI) / 180)];
  const [sx, sy] = at(0),
    [ex, ey] = at(270);
  add(
    'ring',
    'Кольцо прогресса вместо O',
    'O — это кольцо прогресса, как у наборов упражнений: три четверти пройдено.',
    `<circle class="ink-line faint" cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}" stroke-width="${t}"/>` +
      `<path class="accent-line" d="M${round(sx)} ${round(sy)}A${round(r)} ${round(r)} 0 1 1 ${round(ex)} ${round(ey)}" stroke-width="${t}"/>` +
      word.slice(1).map(ink).join(''),
    W,
  );
}
// 2. 'schrift' circled by hand, the way you circle the right answer.
{
  const s = extent(word, 5, 11),
    cx = (s.x1 + s.x2) / 2,
    cy = -CAP / 2 + 4,
    rx = (s.x2 - s.x1) / 2 + 28,
    ry = CAP / 2 + 30,
    tilt = (-3 * Math.PI) / 180,
    points = [];
  for (let k = 0; k <= 72; k++) {
    const a = ((-210 + (k / 72) * 400) * Math.PI) / 180,
      wobble = 1 + 0.025 * Math.sin(3 * a + 0.8),
      shrink = 1 - 0.05 * (k / 72),
      x = rx * wobble * shrink * Math.cos(a),
      y = ry * wobble * shrink * Math.sin(a);
    points.push([cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt)]);
  }
  const loop = union(...points.map(([x, y]) => ({ x1: x - 5, y1: y - 5, x2: x + 5, y2: y + 5 })));
  add(
    'obvedeno',
    '«schrift» обведено от руки',
    'Как обводят правильный ответ в тесте: маркер от руки вокруг слова.',
    word.map(ink).join('') +
      `<path class="accent-line" d="${line(points)}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
    union(W, loop),
  );
}
// 3. 'Oefen' typed, 'schrift' in Playwrite NL, the Dutch school handwriting model, shaped by
// HarfBuzz so the letters join as they do on the page of a Dutch primer.
async function joined(file, text, x, size) {
  const hb = await import('harfbuzzjs'),
    face = new hb.Face(new hb.Blob(fs.readFileSync(file))),
    font = new hb.Font(face),
    buffer = new hb.Buffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(font, buffer);
  const scale = size / cursive.unitsPerEm,
    infos = buffer.getGlyphInfos(),
    positions = buffer.getGlyphPositions();
  let pen = x;
  return infos.map((info, n) => {
    const p = positions[n],
      glyph = cursive.glyphs.get(info.codepoint),
      path = glyph.getPath(pen + (p.xOffset || 0) * scale, -(p.yOffset || 0) * scale, size);
    pen += (p.xAdvance || 0) * scale;
    return { char: text[info.cluster] || '', path, d: path.toPathData(2), bbox: path.getBoundingBox() };
  });
}
{
  const typed = layout(nunito, 'Oefen'),
    size = ((100 * X) / height(cursive, 'x')) * 0.92,
    written = await joined(path.join(here, 'fonts/PlaywriteNL-400.ttf'), 'schrift', typed.width + 5, size);
  add(
    'propis',
    '«schrift» голландской прописью',
    '«Oefen» напечатано, «schrift» написано школьной прописью, по которой учат писать в Нидерландах.',
    typed.map(ink).join('') + written.map(dotted).join(''),
    extent([...typed, ...written]),
  );
}
// 4. A small exercise book beside the name: yellow cover, darker spine, white name label.
{
  const words = shifted('Oefenschrift', 90),
    top = -CAP - 6,
    bottom = 6,
    w = 64;
  const book =
    `<rect class="accent" x="0" y="${round(top)}" width="${w}" height="${round(bottom - top)}" rx="7"/>` +
    `<path class="deep" d="M7 ${round(top)}H13V${round(bottom)}H7A7 7 0 0 1 0 ${round(bottom - 7)}V${round(top + 7)}A7 7 0 0 1 7 ${round(top)}Z"/>` +
    `<rect class="paper" x="22" y="${round(top + 16)}" width="34" height="22" rx="3"/>` +
    `<rect class="ink-line" x="25" y="${round(top + 19)}" width="28" height="16" rx="2" stroke-width="2"/>`;
  add(
    'tetrad',
    'Значок-тетрадка + надпись',
    'Oefenschrift — «тетрадь для упражнений»: жёлтая обложка, корешок и этикетка.',
    book + words.map(ink).join(''),
    union(extent(words), { x1: 0, y1: top, x2: w, y2: bottom }),
  );
}
// 5. The name written on the label of an exercise book: a double rule around it.
{
  const pad = 20,
    x1 = W.x1 - pad,
    x2 = W.x2 + pad,
    y1 = -CAP - 20,
    y2 = 20;
  add(
    'etiketka',
    'Надпись на этикетке тетради',
    'Как подписывают школьную тетрадь: слово внутри этикетки с двойной рамкой.',
    `<rect class="paper" x="${round(x1)}" y="${round(y1)}" width="${round(x2 - x1)}" height="${round(y2 - y1)}" rx="12"/>` +
      `<rect class="ink-line" x="${round(x1)}" y="${round(y1)}" width="${round(x2 - x1)}" height="${round(y2 - y1)}" rx="12" stroke-width="5"/>` +
      `<rect class="accent-line" x="${round(x1 + 9)}" y="${round(y1 + 9)}" width="${round(x2 - x1 - 18)}" height="${round(y2 - y1 - 18)}" rx="6" stroke-width="3"/>` +
      word.map(dotted).join(''),
    { x1: x1 - 3, y1: y1 - 3, x2: x2 + 3, y2: y2 + 3 },
  );
}
// 6. A bookmark ribbon hanging out of the word, as out of the bottom of a book.
{
  const f = word[10].bbox,
    cx = (f.x1 + f.x2) / 2 + 2,
    w = 17,
    top = -14,
    bottom = 40,
    notch = 10;
  add(
    'zakladka',
    'Закладка-ленточка',
    'Ленточка-закладка свисает из слова, как из книги: ты остановился на этой странице.',
    `<path class="accent" d="M${round(cx - w / 2)} ${round(top)}H${round(cx + w / 2)}V${round(bottom)}L${round(cx)} ${round(bottom - notch)}L${round(cx - w / 2)} ${round(bottom)}Z"/>` +
      word.map(ink).join(''),
    union(W, { x1: cx - w, y1: top, x2: cx + w, y2: bottom }),
  );
}
// 7. A monogram: the e of the Dutch 'oe' set inside the O, beside the name.
{
  const big = layout(nunito, 'O', { size: 118 }),
    o = big[0].bbox,
    cx = (o.x1 + o.x2) / 2,
    cy = (o.y1 + o.y2) / 2,
    probe = nunito.charToGlyph('e').getPath(0, 0, 50).getBoundingBox(),
    e = nunito.charToGlyph('e').getPath(cx - (probe.x1 + probe.x2) / 2, cy - (probe.y1 + probe.y2) / 2, 50),
    words = shifted('Oefenschrift', o.x2 + 24);
  const eBox = e.getBoundingBox();
  add(
    'monogramma',
    'Монограмма «Oe» + надпись',
    '«oe» — первый чисто голландский звук, который учат; e внутри O. Годится и для иконки сайта.',
    `<path class="ink" d="${big[0].d}"/><path class="accent" d="${e.toPathData(2)}"/>` + words.map(ink).join(''),
    union(o, eBox, extent(words)),
  );
}
// 8. A speech bubble saying 'oe', for speaking and pronunciation.
{
  const x1 = 0,
    x2 = 84,
    y1 = -CAP - 4,
    y2 = -8,
    r = 20;
  const bubble =
    `<path class="accent" d="M${x1 + r} ${round(y1)}H${x2 - r}A${r} ${r} 0 0 1 ${x2} ${round(y1 + r)}V${round(y2 - r)}A${r} ${r} 0 0 1 ${x2 - r} ${round(y2)}H34L14 ${round(y2 + 16)}L18 ${round(y2)}H${x1 + r}A${r} ${r} 0 0 1 ${x1} ${round(y2 - r)}V${round(y1 + r)}A${r} ${r} 0 0 1 ${x1 + r} ${round(y1)}Z"/>`;
  const probe = layout(nunito, 'oe', { size: 58 }),
    pb = extent(probe),
    oe = layout(nunito, 'oe', {
      size: 58,
      x: (x1 + x2) / 2 - (pb.x1 + pb.x2) / 2,
      y: (y1 + y2) / 2 - (pb.y1 + pb.y2) / 2,
    }),
    words = shifted('Oefenschrift', x2 + 22);
  add(
    'oblachko',
    'Облачко «oe» + надпись',
    'Говорение и произношение: облачко реплики со звуком «oe».',
    bubble + oe.map(ink).join('') + words.map(ink).join(''),
    union({ x1, y1, x2, y2: y2 + 16 }, extent(words)),
  );
}
// 9. A phonetic tie bar over 'oe': two letters, one sound.
{
  const o = word[0].bbox,
    e = word[1].bbox,
    ox = (o.x1 + o.x2) / 2 + 2,
    ex = (e.x1 + e.x2) / 2 + 2,
    y = -CAP - 12;
  add(
    'duzhka',
    'Фонетическая дужка над «oe»',
    'Значок из транскрипции: две буквы — один звук. «oe» в Oefen читается как «у».',
    word.map(ink).join('') +
      `<path class="accent-line" d="M${round(ox)} ${round(y)}Q${round((ox + ex) / 2)} ${round(y - 30)} ${round(ex)} ${round(y)}" stroke-width="9" stroke-linecap="round"/>`,
    union(W, { x1: ox - 6, y1: y - 22, x2: ex + 6, y2: y + 5 }),
  );
}
// 10. Handwriting practice lines: the name written between the lines of a practice sheet.
{
  const x1 = W.x1 - 16,
    x2 = W.x2 + 16,
    rule = (y, extra = '') =>
      `<path class="ink-line faint" d="M${round(x1)} ${round(y)}H${round(x2)}" stroke-width="2.5"${extra}/>`;
  add(
    'propisi',
    'Прописи: слово на линейках',
    'Как лист для отработки письма: линейки и выделенная полоса строчных букв.',
    `<rect class="band" x="${round(x1)}" y="${round(-X)}" width="${round(x2 - x1)}" height="${round(X)}"/>` +
      rule(-CAP - 4) +
      rule(-X, ' stroke-dasharray="7 6"') +
      rule(0) +
      rule(22) +
      word.map(ink).join(''),
    { x1, y1: -CAP - 8, x2, y2: 26 },
  );
}
// 11. The i of 'schrift' as a yellow pencil: eraser for the dot, the point on the baseline.
{
  const i = word[9],
    stem = contours(i.path).reduce((a, b) => (b.height > a.height ? b : a)),
    cx = (stem.x1 + stem.x2) / 2,
    w = stem.width + 5,
    x1 = cx - w / 2,
    x2 = cx + w / 2,
    top = -X - 2,
    wood = -12,
    tip = 10;
  const pencil =
    `<rect class="pink" x="${round(x1)}" y="${round(top - 22)}" width="${round(w)}" height="16" rx="5"/>` +
    `<rect class="metal" x="${round(x1)}" y="${round(top - 9)}" width="${round(w)}" height="9"/>` +
    `<rect class="accent" x="${round(x1)}" y="${round(top)}" width="${round(w)}" height="${round(wood - top)}"/>` +
    `<path class="wood" d="M${round(x1)} ${wood}L${round(x2)} ${wood}L${round(cx)} ${tip}Z"/>` +
    `<path class="ink" d="M${round(cx - w * 0.18)} ${round(tip - 7)}L${round(cx + w * 0.18)} ${round(tip - 7)}L${round(cx)} ${tip}Z"/>`;
  add(
    'karandash',
    'Карандаш вместо «i»',
    'Буква i в «schrift» — жёлтый карандаш: ластик вместо точки, грифель на строке.',
    word.map((g, n) => (n === 9 ? pencil : ink(g))).join(''),
    union(W, { x1, y1: top - 24, x2, y2: tip + 2 }),
  );
}
// 12. A ticked box before the name, the tick running out of the box like a marker.
{
  const words = shifted('Oefenschrift', 92),
    s = 60,
    y1 = -CAP + 4,
    y2 = y1 + s;
  add(
    'galochka',
    'Галочка в квадратике + надпись',
    'Задание сделано: галочка маркером, вылетающая за рамку.',
    `<rect class="ink-line" x="3" y="${round(y1)}" width="${s}" height="${s}" rx="11" stroke-width="6"/>` +
      `<path class="accent-line" d="M14 ${round(y1 + 30)}L30 ${round(y1 + 48)}L76 ${round(y1 - 16)}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>` +
      words.map(ink).join(''),
    union({ x1: 0, y1: y1 - 24, x2: 84, y2: y2 + 4 }, extent(words)),
  );
}
// 13. A teacher's stamp: the name in capitals in a double frame, pressed at a slant.
{
  const caps = layout(nunito, 'OEFENSCHRIFT', { size: 62, tracking: 6 }),
    c = extent(caps),
    pad = 18,
    x1 = c.x1 - pad,
    x2 = c.x2 + pad,
    y1 = c.y1 - pad,
    y2 = c.y2 + pad,
    cx = (x1 + x2) / 2,
    cy = (y1 + y2) / 2;
  add(
    'shtamp',
    'Штамп учителя',
    'Как печать в тетради: заглавные буквы в двойной рамке, поставлено чуть криво.',
    `<g transform="rotate(-5 ${round(cx)} ${round(cy)})">` +
      `<rect class="ink-line" x="${round(x1)}" y="${round(y1)}" width="${round(x2 - x1)}" height="${round(y2 - y1)}" rx="10" stroke-width="5"/>` +
      `<rect class="accent-line" x="${round(x1 + 8)}" y="${round(y1 + 8)}" width="${round(x2 - x1 - 16)}" height="${round(y2 - y1 - 16)}" rx="5" stroke-width="3"/>` +
      caps.map(ink).join('') +
      `</g>`,
    { x1: x1 - 4, y1: y1 - 26, x2: x2 + 4, y2: y2 + 26 },
  );
}
// 14. Two lines like a book title: OEFEN in spaced capitals over a large 'schrift'.
{
  const small = layout(nunito, 'OEFEN', { size: 40, tracking: 11 }),
    big = layout(nunito, 'schrift', { y: 88 });
  add(
    'dve-stroki',
    'В две строки, как название книги',
    'Маленькое разреженное OEFEN над крупным «schrift».',
    small.map((g) => `<path class="deep" d="${g.d}"/>`).join('') + big.map(dotted).join(''),
    union(extent(small), extent(big)),
  );
}
// 15. A round sticker behind the O, the kind a teacher gives for good work.
{
  const o = word[0].bbox,
    cx = (o.x1 + o.x2) / 2 + 3,
    cy = (o.y1 + o.y2) / 2 + 2,
    r = Math.max(o.x2 - o.x1, o.y2 - o.y1) / 2 + 10;
  add(
    'naklejka',
    'Наклейка за буквой O',
    'Круглая наклейка, как учитель клеит за хорошую работу.',
    `<circle class="accent" cx="${round(cx)}" cy="${round(cy)}" r="${round(r)}"/>` +
      `<path class="on-accent" d="${word[0].d}"/>` +
      word.slice(1).map(ink).join(''),
    union(W, { x1: cx - r, y1: cy - r, x2: cx + r, y2: cy + r }),
  );
}
// 16. The O on a letter tile, the word game every Dutch family plays, with its score. The
// rest of the word moves right to make room for the tile.
{
  const o = word[0].bbox,
    x1 = o.x1 - 10,
    y1 = o.y1 - 10,
    x2 = o.x2 + 17,
    y2 = o.y2 + 13,
    score = layout(nunito, '1', { size: 21, x: x2 - 13, y: y2 - 6 }),
    rest = layout(nunito, 'efenschrift', { x: x2 + 5 });
  add(
    'fishka',
    'O на фишке, как в «Скрабле»',
    'Словесная игра, в которую играют в каждой голландской семье: O на фишке с очком в углу.',
    `<rect class="accent" x="${round(x1)}" y="${round(y1)}" width="${round(x2 - x1)}" height="${round(y2 - y1)}" rx="10"/>` +
      `<path class="on-accent" d="${word[0].d}"/>` +
      score.map((g) => `<path class="on-accent" d="${g.d}"/>`).join('') +
      rest.map(ink).join(''),
    union({ x1, y1, x2, y2 }, extent(rest)),
  );
}
// 17. For comparison: the low stripe under 'schrift' from the previous round.
{
  const s = extent(word, 5, 11);
  add(
    'poloska',
    'Полоска под «schrift» (прошлый раунд)',
    'Для сравнения: низкая полоса маркера под «schrift».',
    `<rect class="accent" x="${round(s.x1 - 2)}" y="${round(-0.4 * X)}" width="${round(s.x2 - s.x1 + 5)}" height="${round(0.5 * X)}"/>` +
      word.map(ink).join(''),
    union(W, { x1: s.x1 - 2, y1: -0.4 * X, x2: s.x2 + 3, y2: 0.1 * X }),
    { rim: true },
  );
}

// The gallery: each concept large and at sidebar size, on white, on the light sidebar and
// on the dark sidebar the user chose.
const grounds = [
  { name: 'Белый фон', bg: '#ffffff', ink: '#221f1a', paper: '#ffffff' },
  { name: 'Светлый сайдбар (крем 30%)', bg: '#f8f6f2', ink: '#221f1a', paper: '#f8f6f2' },
  { name: 'Тёмный сайдбар', bg: '#1a1a19', ink: '#eeece5', paper: '#1a1a19', dark: true },
];
let serial = 0;
const svg = (c, g, big) => {
  const id = `${c.id}-${serial++}`;
  return `<div class="cell${big ? ' big' : ''}${g.dark && c.rim ? ' rim' : ''}" style="background:${g.bg};--ink:${g.ink};--paper:${g.paper};--on:${g.dark ? g.paper : g.ink};--accent:${g.dark ? '#edc343' : '#efbf24'}"><svg viewBox="${c.viewBox}" role="img" aria-label="Oefenschrift">${c.markup.replaceAll(c.id, id)}</svg></div>`;
};
const rows = concepts
  .map(
    (c, i) =>
      `<section><h2>${i + 1}. ${c.name}</h2><p>${c.note}</p><div class="grid">${grounds.map((g) => svg(c, g, true)).join('')}</div><div class="grid small">${grounds.map((g) => svg(c, g, false)).join('')}</div></section>`,
  )
  .join('');
fs.mkdirSync(path.join(here, 'out'), { recursive: true });
fs.writeFileSync(
  path.join(here, 'out/logos.html'),
  `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Oefenschrift · логотипы</title><style>
body{margin:0;padding:24px;background:#fbfbfa;color:#1d1d1b;font:14px/1.45 system-ui,sans-serif}
h1{font-size:18px;margin:0 0 4px}body>p{margin:0 0 18px;color:#666}
.legend{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;color:#777;font-size:12px;margin-bottom:4px}
section{padding:16px 0;border-top:1px solid #e6e6e2}h2{font-size:15px;margin:0}section p{margin:2px 0 10px;color:#666}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.grid.small{margin-top:10px}
.cell{display:flex;align-items:center;min-height:64px;padding:16px 20px;border-radius:10px;border:1px solid #e6e6e2}
.cell svg{display:block;height:auto}.cell.big svg{width:100%;max-width:340px;max-height:120px}.grid.small .cell svg{width:136px;max-height:40px}
.ink{fill:var(--ink)}.accent{fill:var(--accent)}.ink-line{fill:none;stroke:var(--ink)}.accent-line{fill:none;stroke:var(--accent)}
.paper{fill:var(--paper)}.faint{opacity:.22}.deep{fill:color-mix(in oklab,var(--accent) 70%,#8a5d00)}
.band{fill:color-mix(in oklab,var(--accent) 30%,transparent)}.lens{fill:color-mix(in oklab,var(--accent) 45%,transparent)}
.metal{fill:#b9b8b0}.pink{fill:#ee9ba1}.wood{fill:#f1d3a1}.on-accent{fill:var(--on)}
.rim .ink{stroke:var(--paper);stroke-width:1.25px;paint-order:stroke;vector-effect:non-scaling-stroke;stroke-linejoin:round}
@media (max-width:52rem){.grid{grid-template-columns:1fr}}
</style><h1>Oefenschrift — ${concepts.length} разных идей логотипа</h1><p>Каждая идея — крупно и в размере сайдбара: на белом, на светлом сайдбаре и на тёмном. Номера совпадают со строкой «Лого» в панели на сайте.</p><div class="legend">${grounds.map((g) => `<span>${g.name}</span>`).join('')}</div>${rows}</html>`,
);
console.log(concepts.map((c, i) => `${i + 1}. ${c.id}`).join('\n'));
