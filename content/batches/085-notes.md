# Batch 085 — A1 speaking, seven revised items (28 October 2026)

Replacement batch: every item keeps its ID and the reviewer records `replaces`. Each item was copied in full from its current source (`079-original.json` for stofzuigerdans, markt-fruit and fiets-mand; `080-original.json` for the other four) and only the fields named below were changed. Trigger: the audit of published A1 items, which found unrealistic details and criteria that reject correct answers. Each current picture (via `content/image-manifest.json`) was opened before deciding.

Newly allowed words used: `schaal`, `bakkerij`. No other word was added; `stofzuigen` and `container` are not on the list, so the items use list words instead (see items 1 and 4).

Tone: kat-fruitschaal stays the lightly humorous item (cat asleep in the fruit bowl); the other six are ordinary.

## Items

### 1. `A1:speaking:batch080-vuilniszak:1` (ordinary)

- Picture showed a tied bag on the pavement by the front door, which is not normal outside collection times. A grey container outside would need `container`/`kliko`, which are not on the list, so the scene moves inside: the woman sets the tied green bag on the kitchen floor next to a light grey pedal bin (full bag waiting to go out).
- Changed: image `brief` (new scene, same woman and traits, light grey bin so the colour question stays unambiguous), `alt`, criterion 2 ("Waar? Naast de prullenbak, in de keuken of op de vloer."), `model` ("Hij staat naast de prullenbak.").
- Unchanged: prompt ("Waar staat de zak?" still fits), criterion 1, sample (misses criterion 2), starters.
- Media: **redraw the picture.** Prompt unchanged, so the narrator clip stays.

### 2. `A1:speaking:batch080-kat-fruitschaal:1` (lightly humorous, kept)

- Picture checked: the cat lies curled in a sage-green bowl among apples and bananas on a table, so "in de schaal" is the natural answer.
- Changed: criterion 2 now accepts "in de schaal, tussen het fruit of op de tafel"; `model` "De kat slaapt in de schaal."; `alt` names the bowl; `sample` "Hij slaap in de schaal." (it still misses only criterion 1; the old "in de fruit" sample would have been borderline against the new wording).
- Media: picture fits, no redraw. Prompt unchanged.

### 3. `A1:speaking:batch080-bakker-brood:1` (ordinary)

- Picture checked: bakery workroom with a bread oven and worktable, Joost holding a tray with three loaves.
- Changed: criterion 1 "Waar? In de bakkerij, bij de bakker of in de keuken." (all three accepted), `model` "Joost is in de bakkerij.", `alt` likewise.
- Media: picture fits, no redraw. Prompt unchanged.

### 4. `A1:speaking:batch073-stofzuigerdans:1` (ordinary)

- Picture checked: Sanne vacuums a kitchen floor with an upright vacuum cleaner.
- Changed: criterion 1 "Wat doet Sanne? Ze maakt schoon of gebruikt de stofzuiger." The verb `stofzuigen` is not on the A1 list, so the Dutch half covers it with "gebruikt de stofzuiger"; the English half says "cleaning or vacuuming" so a grader accepts "ze stofzuigt" and "ze doet de stofzuiger aan".
- Criterion 2, model, sample and starters unchanged.
- Media: no picture or prompt change.

### 5. `A1:speaking:batch080-apotheek-tas:1` (ordinary)

- Picture checked: an older woman steps out of a pharmacy door onto the pavement with a small white paper bag with handles; no car is shown. The pretext "U wacht in de auto op uw moeder." is removed (the profile allows a picture task to simply say "Kijk naar het plaatje."), so the person is "de vrouw".
- Changed: `title` "Wachten in de auto" → "De vrouw" (neutral, gives no answer away), `prompt` "Kijk naar het plaatje. Waar is de vrouw? Wat heeft ze in haar hand?", criterion 1 "Waar? Bij de apotheek, bij de winkel of op straat.", criterion 2 "Wat heeft ze? U zegt: een zak, zakje of tasje.", `model` "De vrouw is bij de apotheek. Ze heeft een klein zakje.", `alt` "… Ze heeft een klein zakje.", `sample` "Ze heeft klein zakje in hand." (misses criterion 1), starter 1 "De vrouw is …".
- The brief already describes a small white paper bag, so it stays as is. "tasje" is still accepted because the drawn bag has handles.
- Media: picture fits, **no redraw**. **Prompt changed: new narrator clip.**

### 6. `A1:speaking:batch079-markt-fruit:1` (ordinary)

- Picture showed four loose bananas spaced on an empty market table, which reads as a counting prop. New scene: a home kitchen table after shopping, a cloth shopping bag with bread at the top, four red apples lying next to it, and an unnamed woman lifting a plain milk carton out of the bag. The four apples belong to the unpacked shopping, so the count is natural.
- Changed: `title` "Op de markt" → "Boodschappen", `prompt` "Welk fruit ligt er op tafel? Hoeveel ziet u?", image `brief` and `alt`, criteria ("appels", "vier"), `sample` "Er is appels op tafel." (misses criterion 2), `model` "Er liggen appels op tafel. Ik zie vier appels."
- The slug still says `markt` because the ID is kept. The domain stays `winkels-diensten` (shopping).
- Starters unchanged ("Er liggen …", "Ik tel …", "Ik zie …"); none gives the fruit or the number.
- Media: **redraw the picture. Prompt changed: new narrator clip.**

### 7. `A1:speaking:batch079-fiets-mand:1` (ordinary)

- Picture checked: the flowers stand upright in a wicker basket on the front of the green bicycle.
- Changed: prompt question "Wat ligt er in de mand?" → "Wat zit er in de mand?", criterion 2 "Zeg wat er in de mand zit: bloemen.", `model` "In de mand zitten bloemen.", `alt` "In de mand staan bloemen."
- Media: picture fits, no redraw. **Prompt changed: new narrator clip.**

## Starters

`085-starters.json` holds entries for all seven items. The only wording change is apotheek-tas starter 1 ("Mijn moeder is …" → "De vrouw is …"). No starter supplies a picture fact or completes a content criterion.

## Media summary

- Redraw: vuilniszak, markt-fruit (new briefs).
- New prompt narration: apotheek-tas, markt-fruit, fiets-mand.
- Alt text only (no redraw): kat-fruitschaal, bakker-brood, apotheek-tas, fiets-mand, plus the two redrawn items.

## Doubts for the reviewer

- markt-fruit: the woman holds a milk carton. Check that the redraw shows exactly four apples and no fruit in her hands.
- apotheek-tas: "op straat" is accepted for criterion 1 because she stands on the pavement at the door. Remove it if this is too broad.
- vuilniszak: a tied bag next to the kitchen bin is the realistic indoor option the word list allows. Check that the redraw keeps the bag clearly green against the grey bin.

## Check

```
npm run batch:check -- content/batches/085-original.json
Checked 7 items, 0 questions. Keys: {}. Options: {}.
  info  7 of 7 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
