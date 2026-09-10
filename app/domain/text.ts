// Exact evidence only: missing editorial quotes must never produce guessed highlights.
export function evidenceFor(item, q) {
  const quotes = Array.isArray(q.evidence) ? q.evidence : q.evidence ? [q.evidence] : [];
  if (quotes.length)
    return quotes.filter((x) => typeof x === 'string' && x && item.text.includes(x));
  return (q.evidence_paragraphs || []).map((n) => item.text.split('\n\n')[n - 1]).filter(Boolean);
}
export function highlightParts(text, quotes = []) {
  const ranges = [];
  for (const quote of quotes) {
    if (!quote) continue;
    const start = text.indexOf(quote);
    if (start >= 0) ranges.push([start, start + quote.length]);
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged.at(-1);
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  const out = [];
  let i = 0;
  for (const [a, b] of merged) {
    if (a > i) out.push({ text: text.slice(i, a), marked: false });
    out.push({ text: text.slice(a, b), marked: true });
    i = b;
  }
  if (i < text.length) out.push({ text: text.slice(i), marked: false });
  return out;
}
export function wordDiff(before, after) {
  const tokenize = (s) => s.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*|\s+|[^\s]/gu) || [];
  const a = tokenize(before),
    b = tokenize(after);
  // Large inputs use an exact whole-text replacement, keeping runtime bounded.
  if (a.length * b.length > 1500000)
    return [
      { type: 'remove', text: before },
      { type: 'add', text: after },
    ];
  const rows = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      rows[i][j] =
        a[i] === b[j] ? 1 + rows[i + 1][j + 1] : Math.max(rows[i + 1][j], rows[i][j + 1]);
  const out = [];
  function add(type, text) {
    if (out.at(-1)?.type === type) out.at(-1).text += text;
    else out.push({ type, text });
  }
  let i = 0,
    j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      add('same', a[i++]);
      j++;
    } else if (j < b.length && (i === a.length || rows[i][j + 1] > rows[i + 1][j]))
      add('add', b[j++]);
    else add('remove', a[i++]);
  }
  return out;
}
