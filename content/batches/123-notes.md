# Batch 123: author notes (one revised A2 writing image brief, 22 November 2026)

Versioned revision of `A2:writing:batch115-schoonmaker-briefje:1` (source: `content/batches/115-original.json`). Same id, `status: draft`, `targetLevelValidated: false`. AI editorial review does not validate CEFR difficulty or exam equivalence.

## Change reason

Criterion 1 ("Schrijf dat Hind het raam of de ramen schoon moet maken") needs a first picture that shows a dirty window. The old brief ("A tall window with a white frame and dirty grey streaks across the glass. A plain white curtain hangs open at one side. No text.") failed in five drawings on 22 November 2026 (two local model, three image API): every drawing added a person sitting at the window and read the streaks as rain, so no panel showed a dirty window.

## The one edit

`images[0].brief` only.

- Old: "A tall window with a white frame and dirty grey streaks across the glass. A plain white curtain hangs open at one side. No text."
- New: "An empty room on a dry, sunny day. A tall window with a white frame. The glass is covered on the inside with grey dirt, dust smudges and fingerprints, so it looks cloudy and dirty. A plain white curtain hangs open at one side. No rain, no water drops, no people, no animals. No text."

The new brief names an empty room and a dry sunny day, grey dirt, dust smudges and fingerprints on the inside of the glass, and excludes rain, water drops, people and animals. `images[0].alt` ("Een raam met veel vuil op het glas.") and `kind` stay: the alt text is still accurate. Prompt, scaffold, criteria, sample, quotes, model, `images[1]`, `images[2]` and every other field are byte-identical to batch 115 (checked field by field; key order the same).

## Media

`images[0]` must be redrawn (new brief, so a new image hash). Nothing else: no audio (writing), panels 2 and 3 unchanged and keep their existing drawings. Draw only after the review passes.

## Doubts for the reviewer

1. The brief is longer than the other briefs (about 55 words against about 30); the extra length is the negations and the dirt wording the five failures called for.
2. Negations ("no rain, no people") can backfire with some image models; if the sixth drawing still fails, the fallback is a closer crop of the glass only.
3. The window shows the whole pane dirty, not streaks; the picture-note sample ("Er zit veel vuil op") and criterion 1 still match.
