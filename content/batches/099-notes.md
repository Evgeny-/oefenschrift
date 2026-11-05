# Batch 099 — A2 speaking, four revised items (5 November 2026)

Replacement batch. The A2 word gate of 5 November 2026 rejects four published A2 speaking items because a picture alt or the model uses a word that is too hard for A2 (pionnen, speldt/spelden, fornuis). This batch replaces only those words. Every item keeps its ID; the reviewer records `replaces`. Base: `content/batches/067-original.json`, copied in full with the same field order.

All items: `exam: duo-a2`, `rubric: a2-spreken`, `speakingSeconds: 40`, `prepSeconds: 10`, `status: draft`, `targetLevelValidated: false`. Tone: unchanged (ordinary). The `prompt` (read aloud as `promptAudio`) is unchanged in all four items, and none has a `cue`, so **no audio needs regenerating**. Every `images[].brief` is unchanged, so **all pictures are kept**. Only alts (no audio) and models (no audio) change. Criteria, samples and quotes are unchanged. The samples still miss the same criterion, and each model still covers every criterion.

Starters: `099-starters.json` copies the current starters of the four items from `content/hints/sentence-starters.json` unchanged. None contains a hard word and no criterion changed. All starters pass the A2 gate.

## Items

### 1. `A2:speaking:batch009-rijbewijs:1`

Source: `content/batches/067-original.json`. picture-sequence, vervoer.

- images[1].alt: "Een jonge man parkeert een auto tussen twee pionnen." → "Een jonge man parkeert een auto en de instructeur kijkt."
- model: "Op het tweede plaatje oefent hij met parkeren tussen twee pionnen." → "Op het tweede plaatje oefent hij met parkeren."

Alt of picture 2: "tussen twee pionnen" removed; the alt now names what the brief shows besides the car: the instructor watching. Model: "tussen twee pionnen" removed; model 43 → 40 words. Prompt and criteria unchanged.

Media to regenerate: none. Pictures: kept (brief unchanged).

### 2. `A2:speaking:batch009-kleermaker:1`

Source: `content/batches/067-original.json`. picture-sequence, winkels-diensten.

- images[1].alt: "Een kleermaker speldt de broek van een man op." → "Een kleermaker werkt aan de broek van een man."
- model: "Zij zet spelden in de broek." → "Zij meet hoe lang de broek moet zijn."

Alt of picture 2: "speldt de broek … op" becomes "werkt aan de broek van een man". Model: "Zij zet spelden in de broek." becomes "Zij meet hoe lang de broek moet zijn." (the brief shows her pinning the hem, that is, marking the length); model 43 → 45 words. The coordinator counted "spelden" as hard too; it passes the checker only by accident (spel + -den). Prompt and criteria unchanged.

Media to regenerate: none. Pictures: kept (brief unchanged).

### 3. `A2:speaking:batch026-koken-buurvrouw:1`

Source: `content/batches/067-original.json`. picture-sequence, wonen-buurt.

- images[0].alt: "Een vrouw roert in een pan op het fornuis." → "Een vrouw roert in een pan in de keuken."

Alt of picture 1: "op het fornuis" becomes "in de keuken". Model and prompt unchanged.

Media to regenerate: none. Pictures: kept (brief unchanged).

### 4. `A2:speaking:batch027-keuken:1`

Source: `content/batches/067-original.json`. picture-describe, vrije-tijd-familie.

- model: "Fatima staat bij het fornuis en roert in een grote pan." → "Fatima kookt en roert in een grote pan."

Model: "Fatima staat bij het fornuis en roert in een grote pan." becomes "Fatima kookt en roert in een grote pan." Model 42 → 39 words. Alt (already free of "fornuis") and prompt unchanged.

Media to regenerate: none. Pictures: kept (brief unchanged).

## Doubts for the reviewer

1. **kleermaker.** "Zij meet hoe lang de broek moet zijn." describes the pinning in the picture as measuring the length. That is close but not literal. The model is now 45 words, the top of the editorial 25–45 range.
2. **rijbewijs.** The picture-2 alt now mentions the instructor ("en de instructeur kijkt"), who is in the brief ("watches from the pavement"). The orange cones are no longer named in the alt or model.

## Checks

The field check confirmed that only the fields listed above differ from the source items. Every `brief`, `prompt` and `criteria` entry is byte-identical.

```
> npx tsx scripts/batch-check.ts content/batches/099-original.json

Checked 4 items, 0 questions. Keys: {}. Options: {}.
  info  4 of 4 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.

> npx tsx <scratchpad>/a2gate.ts content/batches/099-original.json   (A2 word gate applied to every item, old ids included)

A2 word gate: no failures.
```
