# Batch 086 — A1 writing, eight revised items (28 October 2026)

Replacement batch for eight published A1 writing items after the audit of odd premises, criteria that reject correct answers and confusing pictures. Every item keeps its ID; the reviewer records `replaces`. Base: the current records in `081-original.json` (items 1–6) and `082-original.json` (items 7–8), copied in full and changed only where listed. Starters in `086-starters.json` cover all eight items; unchanged entries are copied from `081-starters.json` / `082-starters.json`.

Newly allowed words used: `lek`, `band` (fietsfeest), `toetje` (eten-zaterdag), `bewaren` (reuzenbox). `trakteren` is not used. No other new word.

Prompt audio: A1 writing prompts have no narrator clips (`content/audio-manifest.json` has no `A1:writing` keys), so no prompt audio is affected.

Tone: reuzenbox stays the lightly humorous item (one spoon in a huge box); the other seven are ordinary.

## Items

### 1. `A1:writing:batch074-ontbijttaart:1` (ordinary)

- **Change.** Prompt: "Selma is morgen jarig. U komt bij haar." → "Selma is vandaag jarig. Vanmiddag komt u bij haar." (33 words.)
- **Why.** She already sends a photo of the finished cake with candles; a birthday tomorrow did not fit. Today, with the visit this afternoon, makes the photo and her question "wat drink je?" natural.
- **Picture.** None. The cake with unlit candles fits a party later today; brief and alt unchanged.
- **Criteria, model, sample, starters.** Unchanged.

### 2. `A1:writing:batch074-appelui:1` (ordinary)

- **Change.** Hugo now wants six apples and the third crate holds exactly three red apples. Prompt: "Uw broer Hugo wil zes appels. … Hoeveel appels zijn er? Vertel het Hugo. Noem ook ander fruit in de winkel." Criterion 1: "U zegt: er zijn maar drie appels. Weinig is ook goed." Model: "Er zijn maar drie appels. Wil je ook peren?" Sample: "Hallo Hugo. Er is maar drie appel." (meets criterion 1 with two typical errors, *is* for *zijn* and singular *appel*; misses criterion 2). Alt: "In de supermarkt liggen peren en bananen. In een doos liggen maar drie appels."
- **Why.** An empty, unlabeled crate let the learner only guess that it once held apples. A crate with a few apples is unambiguous, and a direct "Hoeveel …?" question names the goal. "Weinig" is accepted so that a learner who miscounts the drawing but reports a shortage is not rejected. The first try "Uw broer Hugo vraagt: neem je zes appels mee?" was nine words, over the sentence limit, hence "wil zes appels".
- **Picture.** Redraw: brief now asks for three crates (pears, bananas, almost empty crate with exactly three red apples lying apart). The reviewer must count the apples on the rendered picture.
- **Starters.** Unchanged ("In de winkel zijn …" does not give the number).

### 3. `A1:writing:batch074-fietsfeest:1` (ordinary)

- **Change.** Criterion 1: "U zegt: uw fiets is kapot of de band is lek." / "You say your bicycle is broken or has a flat tyre." Alt: "… De fiets heeft een lekke band." (was "De fiets is kapot.").
- **Why.** The picture shows a flat front tyre; "Ik heb een lekke band" is the natural answer and was rejected by a criterion that accepted only "kapot".
- **Picture.** None; brief unchanged. Only the alt names the pictured fact more exactly.
- **Model, sample, starters.** Unchanged; the model "Mijn fiets is kapot." still meets the widened criterion, and "Mijn fiets is …" is completed by either answer.

### 4. `A1:writing:batch074-reuzenbox:1` (light humour)

- **Change.** Prompt: "Uw buurvrouw bewaart een groot pakket voor u. Thuis maakt u het open. Ze vraagt: wat zit er in de doos? Kijk naar het plaatje. Vertel het haar. Zeg ook iets over de doos." (34 words.) Brief redrawn without a person. Alt: "In de kamer staat een heel grote doos. Er ligt één lepel in." Third starter "Dank je …" → "Dank je wel …".
- **Why.** The old picture showed a grey-haired woman kneeling at the box while the prompt said the neighbour saw it, so it was unclear who "you" was, and a neighbour on the spot would ask in person. Now the neighbour kept the parcel, you open it at home, and she asks by message: a real message to someone who is not present and who cannot see the contents. The thank-you starter now fits (she kept the parcel) and completes no criterion.
- **Picture.** Redraw: no person; the box is clearly taller than a sofa beside it, one spoon at the bottom.
- **Criteria, model, sample.** Unchanged.

### 5. `A1:writing:batch074-stoelsokken:1` (ordinary)

- **Change.** Prompt: "U bent nog in de klas. Lars is al thuis. Hij vraagt: ligt er iets op mijn stoel? … Vertel Lars: wat ligt er? Vraag: zal ik het meenemen?" Criterion 2: "U vraagt Lars: zal ik de sjaal meenemen?" / "You ask Lars whether you should take the scarf with you." Model: "Er ligt een blauwe sjaal op je stoel. Zal ik hem meenemen?" Second starter "Kom je …?" → "Zal ik …?".
- **Why.** "Kom je morgen naar de les?" had no reason. Offering to take the forgotten scarf follows from the find, and stating where the learner is (still in the classroom) makes the message real. The prompt uses "het" because the learner does not know yet that it is a scarf; the model uses "hem" for *de sjaal*.
- **Picture.** None; brief and alt unchanged.
- **Sample.** Unchanged ("Er ligt een blauw sjaal op je stoel." meets criterion 1 with an adjective error, misses the new criterion 2).

### 6. `A1:writing:batch081-schoenen-klein:1` (ordinary)

- **Change.** Brief only: whole figure from head to feet, one shoe on her right foot, left foot bare, the second shoe in the open box, "Exactly two shoes in the whole picture".
- **Why.** The rendered picture shows three shoes (one on each foot plus one in the box).
- **Picture.** Redraw. Alt, prompt, criteria, model, sample and starters unchanged.

### 7. `A1:writing:batch082-eten-zaterdag:1` (ordinary)

- **Change.** Prompt: "Zaterdag eet Amal bij u. Ze vraagt: wat kan ik meenemen? Kijk naar het plaatje. Wat kookt u? Vertel het Amal. Vraag om een toetje." Criteria: "U zegt wat u kookt: soep." / "U vraagt Amal om een toetje." Sample: "Hoi Amal! Zaterdag ik kook soep." (word-order error, misses criterion 2). Model: "Hoi Amal! Ik kook soep. Neem je een toetje mee?" Brief: the man stirs a big pot of orange soup; table with two soup plates, two spoons, two glasses; no desserts, fruit or bottles. Alt: "Een man kookt thuis soep. Op tafel staan twee borden en twee glazen." Starters: "Ik kook …", "Neem je … mee?", "Hoi Amal, …".
- **Why.** Inviting someone and asking them to bring drinks in one message was pushy. Now Amal is already coming and offers to bring something; answering her with what you cook and a dessert request is polite and natural. The picture supplies the dish.
- **Picture.** Redraw (the old pan of stir-fried vegetables did not show a nameable dish).

### 8. `A1:writing:batch082-markt-moeder:1` (ordinary)

- **Change.** Brief only: the buyer is "about 35, short dark hair, no beard, dark blue jacket", drawn whole; the grey flat cap is dropped so the hair shows.
- **Why.** A man of about 60 with a white beard writing "Hoi mama" about his mother at home read oddly; the learner is now plausibly an adult child of a living mother.
- **Picture.** Redraw. Alt ("Op de markt koopt een man peren. De verkoper geeft hem een zak."), prompt, criteria, model, sample and starters unchanged.

## Pictures to redraw

`#image0` of appelui, reuzenbox, schoenen-klein, eten-zaterdag and markt-moeder (brief changed). Alts changed without a redraw: fietsfeest. No change: ontbijttaart, stoelsokken.

## Doubts for the reviewer

- appelui: the image model must draw exactly three apples; count them before setting `reviewed`. Criterion 1 also accepts "weinig" for that reason.
- stoelsokken: the model's "Zal ik hem meenemen?" is close to the prompt's "Vraag: zal ik het meenemen?"; the checker does not flag it, and the A1 ask is hard to phrase otherwise. "Neem ik hem mee?" or "Ik neem hem mee, oké?" should also pass criterion 2.
- eten-zaterdag: a learner who names another dish (for example "rijst met kip") misreads the picture; the criterion names soup. "Groentesoep" or "tomatensoep" should pass.

## Check

`npm run batch:check -- content/batches/086-original.json`:

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  info  8 of 8 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
