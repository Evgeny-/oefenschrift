# Batch 098 — A2 writing, two revised items (5 November 2026)

Replacement batch. The A2 word gate of 5 November 2026 rejects two published A2 writing items: `beheerder` and `kenmerk` in sleutel, `woonstichting` in huur. This batch replaces only those words with plain A2 wording. Every item keeps its ID; the reviewer records `replaces`. Base: `content/batches/064-original.json`, copied in full with the same field order. The `meerijden` item of that batch is not part of this batch and is untouched.

Both items: `exam: duo-a2`, `rubric: a2-schrijven`, `status: draft`, `targetLevelValidated: false`. Tone: unchanged (ordinary). Sample, quotes and model are unchanged in both items. The sample still misses exactly the same criterion, and the model still meets every criterion.

Starters: `098-starters.json` copies the current starters of both items from `content/hints/sentence-starters.json` unchanged. None contains a hard word. Sleutel's criterion 2 was reworded but asks for the same thing, so its starter "Aan de sleutel zit …." still fits. All starters pass the A2 gate.

Writing has no audio. **No media needs regenerating for this batch**, and neither item has a picture.

## Items

### 1. `A2:writing:batch002-sleutel:1`

Source: `content/batches/064-original.json`. form, wonen-buurt.

- situation: "bij de beheerder van uw flat." → "bij de huismeester van uw flat."
- prompt: "De beheerder heeft een formulier" → "De huismeester heeft een formulier"
- prompt: "Bedenk zelf een kenmerk." → "Bedenk zelf iets wat de eigenaar herkent."
- criteria[1][0]: "Beschrijf een kenmerk van de sleutel." → "Beschrijf iets aan de sleutel wat de eigenaar herkent."
- criteria[1][1]: "Describe one feature of the key." → "Describe something about the key that the owner will recognise."
- adequacyNote: "een herkenbaar kenmerk" → "iets wat de eigenaar aan de sleutel herkent"

"Beheerder" becomes "huismeester" (as in the reading lift item). "Kenmerk" becomes "iets wat de eigenaar herkent": in the prompt ("Bedenk zelf iets wat de eigenaar herkent."), criterion 2 (nl and en) and the adequacy note. The form fields, sample, quotes and model are unchanged; the model ("Er zit een kleine rode ring aan de sleutel.") still meets criterion 2 and the sample still misses criterion 3 only. Starter 2 "Aan de sleutel zit …." still fits and is unchanged.

Media to regenerate: none. Pictures: none in this item.

### 2. `A2:writing:batch008-huur:1`

Source: `content/batches/064-original.json`. email, wonen-buurt.

- prompt: "U huurt een woning van Woonstichting De Brug. U wilt de huur opzeggen. U schrijft een e-mail aan de woonstichting." → "U huurt een woning van Woningcorporatie De Brug. U wilt de huur opzeggen. U schrijft een e-mail aan de woningcorporatie."
- scaffold.to: "info@woonstichtingdebrug.nl" → "info@woningcorporatiedebrug.nl"
- scaffold.salutation: "Beste medewerker van Woonstichting De Brug," → "Beste medewerker van Woningcorporatie De Brug,"

"Woonstichting" becomes "woningcorporatie" in the prompt, the e-mail address and the salutation. The name "De Brug" stays; a web search on 5 November 2026 for "Woningcorporatie De Brug" found no housing corporation with that name. The address info@woningcorporatiedebrug.nl follows the old pattern (type + name). Criteria, sample, model and starters unchanged.

Media to regenerate: none. Pictures: none in this item.

## Doubts for the reviewer

1. **sleutel.** "Kenmerk" became "iets wat de eigenaar herkent" (prompt: "Bedenk zelf iets wat de eigenaar herkent."; criterion: "Beschrijf iets aan de sleutel wat de eigenaar herkent."). This is slightly longer but asks for the same thing: a detail that identifies the key. The `adequacyNote` is not shown in the app (it is read only by scripts) but was changed for consistency.
2. **huur.** The fictional e-mail address changes with the name (info@woningcorporatiedebrug.nl). The address is not a learner word, but keeping "woonstichting" in it would contradict the prompt.

## Checks

The field check confirmed that only the fields listed above differ from the source items.

```
> npx tsx scripts/batch-check.ts content/batches/098-original.json

Checked 2 items, 0 questions. Keys: {}. Options: {}.
  info  2 of 2 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.

> npx tsx <scratchpad>/a2gate.ts content/batches/098-original.json   (A2 word gate applied to every item, old ids included)

A2 word gate: no failures.
```
