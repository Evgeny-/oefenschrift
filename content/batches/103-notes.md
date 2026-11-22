# Batch 103 — A1 word revision, 28 items (22 November 2026)

Replacement batch. A Sonnet audit of the published A1 items found a few words that a learner in the first weeks of an everyday Dutch course would likely not know, although they are on the A1 list. This batch replaces only those words, in the items named in `docs/briefs/content-round-2026-11-22.md` ("103"), with plain A1 wording. Every item keeps its ID; the reviewer records `replaces`. Base: the current source of each item (the highest-numbered `*-original.json` containing the id, named per item below), copied in full with the same field order. A script confirmed that every other field is byte-identical to its source: every `images[].brief`, every unchanged script turn, question prompt and option, every key and question id.

All items: `exam: a1-practice`, `status: draft`, `targetLevelValidated: false`. Tone unchanged. Pictures are always "kept (brief unchanged)".

Audio rules applied (from `scripts/audio.ts` and the 097 notes): a script turn's `text` changes only where the hard word is spoken; a listening question prompt or option changes only when it holds the hard word; explanations, situations, titles, alts, models, criteria, writing prompts and reading texts have no audio. `text` is rebuilt as "Speaker: text" lines. Every changed `evidence` is rebuilt verbatim from the changed text.

Kept on purpose (per the brief): kapot, kwijt, toetje, pinpas, koelkast, pleister, ballonnen.

## Media to regenerate

- Script audio: `A1:listening:batch078-jas-passen:1`, `A1:listening:batch078-buren-sleutel:1`, `A1:listening:batch078-kind-ziek:1`, `A1:listening:batch078-twee-schoenen:1`.
- Question audio: `batch078-bus-station` q2, `batch078-buren-sleutel` q1.
- Prompt audio: `A1:speaking:batch080-docent-bord:1`.
- Pictures: none.

## Reading (7)

### 1. `A1:reading:batch076-geen-water:1` (source 083)
- situation: "huismeester Leo" → "Leo van de flat"
- text signature: "Leo, de huismeester" → "Leo van de flat"
- Explanations say "Leo schrijft", unchanged. Media: none. Picture: kept (brief unchanged).

### 2. `A1:reading:batch071-winkel-sok:1` (source 083)
- text: "U kunt de jas ophalen." → "U kunt de jas halen." Media: none. Picture: kept (brief unchanged).

### 3. `A1:reading:batch075-nieuw-paspoort:1` (source 083)
- text: "het paspoort ophalen bij de gemeente" → "het paspoort halen bij de gemeente". Media: none. Picture: kept (brief unchanged).

### 4. `A1:reading:batch076-pas-klaar:1` (source 083)
- text: "de pas ophalen in de bibliotheek" → "de pas halen in de bibliotheek". Media: none. Picture: kept (brief unchanged).

### 5. `A1:reading:batch076-medicijn:1` (source 083)
- text: "U kunt het bij ons ophalen." → "U kunt het bij ons halen." Media: none. Picture: kept (brief unchanged).

### 6. `A1:reading:batch076-kapper-zaterdag:1` (source 076)
- text: "U kunt bij ons pinnen." → "U kunt bij ons met uw pinpas betalen." Media: none. Picture: kept (brief unchanged).

### 7. `A1:reading:batch071-kat-werkt:1` (source 075)
- text: "over het rooster" → "over mijn werk". Media: none. Picture: kept (brief unchanged).

## Listening (14)

### 8. `A1:listening:batch078-bus-station:1` (source 084)
- q2 prompt: "Hoe betaalt Zara de rit?" → "Hoe betaalt Zara in de bus?"
- Media: question audio q2. Picture: kept (brief unchanged).

### 9. `A1:listening:batch078-jas-passen:1` (source 084)
- script turn 4 text (Jamal): "Een groene jas, graag. Mag ik hem passen?" → "Een groene jas, graag. Wat kost hij?"
- transcript `text` rebuilt. q2 evidence "Een groene jas, graag." is still verbatim; both tested facts (maat vijftig, groen) are unchanged.
- Media: script audio. Picture: kept (brief unchanged).

### 10. `A1:listening:batch078-buren-sleutel:1` (source 084)
- script turn 3 text (Ellen): "Ja. Wilt u mijn sleutel bewaren? En mijn planten water geven?" → "Ja. Wilt u mijn sleutel hebben? En mijn planten water geven?"
- q1 prompt: "Wat bewaart de buurman voor Ellen?" → "Wat krijgt de buurman van Ellen?"
- q1 evidence: "Wilt u mijn sleutel bewaren?" → "Wilt u mijn sleutel hebben?"
- q1 explanation: "Ellen vraagt: wilt u mijn sleutel bewaren?" → "Ellen vraagt: wilt u mijn sleutel hebben?"
- Key B and options unchanged ("Haar post / sleutel / fiets" fit "krijgt").
- Media: script audio, question audio q1. Picture: kept (brief unchanged).

### 11. `A1:listening:batch078-kind-ziek:1` (source 084)
- script turn 5 text (De juf): "Goed. Beterschap voor Lotte!" → "Goed. Tot ziens!"
- No question tests this turn. Media: script audio. Picture: kept (brief unchanged).

### 12. `A1:listening:batch078-twee-schoenen:1` (source 078)
- script turn 4 text (Luuk): "Echt? Wat grappig! Ik lach om mijn schoenen." → "Echt? Wat gek! Ik lach om mijn schoenen."
- q2 evidence "Ik lach om mijn schoenen." is still verbatim. Media: script audio. Picture: kept (brief unchanged).

### 13–21. "noemt … niet" → "zegt … niet" (explanations only; the source is the highest-numbered batch file)
Media for all nine: none. Pictures: kept (brief unchanged).
- 13. `A1:listening:batch070-foto-werk:1` (077), q1 explanation: "Niemand noemt de deur." → "Niemand zegt iets over de deur."
- 14. `A1:listening:batch072-banaan-telefoon:1` (077), q1: "Hij noemt geen buik of rug." → "Hij zegt niet: buik of rug."
- 15. `A1:listening:batch072-eend-reis:1` (077), q1: "Bus en auto noemt ze niet." → "Ze zegt niet: bus of auto."
- 16. `A1:listening:batch072-bezem-feest:1` (077), q1: "De tv noemt ze niet." → "Ze zegt niet: de tv."
- 17. `A1:listening:batch072-doos-oren:1` (084), q2: "Een sjaal noemt hij niet." → "Hij zegt niet: een sjaal."
- 18. `A1:listening:batch072-paraplu-werk:1` (077), q1: "Trein en fiets noemt ze niet." → "Ze zegt niet: trein of fiets."
- 19. `A1:listening:batch072-bloem-beker:1` (084), q1: "Koffie noemt ze niet." → "Ze zegt niet: koffie."
- 20. `A1:listening:batch072-kat-boeken:1` (077), q1: "Vanochtend en vanavond noemt ze niet." → "Ze zegt niet: vanochtend of vanavond."
- 21. `A1:listening:batch078-dokter-bellen:1` (078), q1: "Hoest of pijn noemt ze niet." → "Ze zegt niet: hoest of pijn."

The wording "zegt iets over" / "zegt niet:" follows the brief's "zegt … niet"; "Niemand zegt de deur" would not be Dutch.

## Writing (6)

### 22. `A1:writing:batch074-reuzenbox:1` (source 086)
- prompt: "Uw buurvrouw bewaart een groot pakket voor u." → "Uw buurvrouw heeft een groot pakket voor u."
- Sample, quotes, model, criteria unchanged. Media: none. Picture: kept (brief unchanged).

### 23. `A1:writing:batch074-fietsfeest:1` (source 086)
- criterion 1 (nl): "mijn fiets is kapot of ik heb een lekke band" → "mijn fiets is kapot of de band is leeg"
- criterion 1 (en): "has a flat tyre" → "the tyre is flat"
- image alt: "De fiets heeft een lekke band." → "De band van de fiets is leeg." (same picture: flat tyre)
- Sample/quotes/model unchanged (quote 1 is still "mijn fiets heeft kapot."; one null). Media: none. Picture: kept (brief unchanged).

### 24. `A1:writing:batch082-ziek-les:1` (source 082)
- criterion 1 (nl): "Griep of koorts is ook goed." → "Koorts is ook goed."
- criterion 1 (en): "Flu or a fever is also fine." → "A fever is also fine."
- Sample, quotes (first is null), model unchanged. Media: none. Picture: kept (brief unchanged).

### 25. `A1:writing:batch074-lepelmuziek:1` (source 081)
- prompt: "Vraag hem om bij u te komen spelen." → "Vraag Ravi: kom je bij mij spelen?"
- criterion 2 (nl): "U vraagt Ravi om bij u te spelen." → "U vraagt Ravi: kom je bij mij spelen?" (English unchanged)
- Sample, quotes, model unchanged. Media: none. Picture: kept (brief unchanged).

### 26. `A1:writing:batch074-tuinfilm:1` (source 081)
- prompt: "Vraag haar om iets mee te nemen." → "Vraag Selma: neem je iets mee?"
- criterion 2 (nl): "U vraagt Selma om iets mee te nemen." → "U vraagt Selma: neem je iets mee?" (English unchanged)
- Sample, quotes, model unchanged. Media: none. Picture: kept (brief unchanged).

### 27. `A1:writing:batch081-hond-hoed:1` (source 081)
- prompt: "Vraag hem om te komen kijken." → "Vraag Ravi: kom je kijken?"
- Criterion 2 already read "U vraagt Ravi: kom je kijken?" and is unchanged. Media: none. Picture: kept (brief unchanged).

## Speaking (1)

### 28. `A1:speaking:batch080-docent-bord:1` (source 080)
- prompt: "Hoeveel studenten ziet u?" → "Hoeveel mensen ziet u?"
- criterion 1: "Hoeveel studenten? U zegt: vier." → "Hoeveel mensen? U zegt: vier." (en: "How many students?" → "How many people?")
- model: "Ik zie vier studenten." → "Ik zie vier mensen."
- image alt: "Vier studenten zitten aan tafel." → "Vier mensen zitten aan tafel."
- Sample and quotes unchanged. Media: prompt audio. Picture: kept (brief unchanged).

## Starters

`103-starters.json` holds the current starters of all seven open items (six writing, one speaking), copied from `content/hints/sentence-starters.json`. None contains a replaced word and no criterion changed in a way that affects them, so none changed.

## Doubts for the reviewer

- Key distribution: the batch is a set of fixed existing keys (A 17, B 12, C 13 of 42), so `batch:check` fails "answer key A is 40% of keys (max 40%)" (17/42 = 40.5%). Keys must not change in a replacement; this is a property of the selection, not a defect of the edits. The coordinator should decide whether the rule applies to a revision batch.
- `batch081-hond-hoed` sample still says "Zo grappig!". "Grappig" was only listed for the two listening items; the sample was left as is (the checker did not flag it). Coordinator: change it in a later pass if wanted.
- `buren-sleutel`: "Wilt u mijn sleutel hebben?" is a little loose for "keep my key", but it follows the brief's "hebben or krijgen" and the picture/question stay valid.
- `jas-passen`: the dialogue now ends on a question that the script does not answer (as before with "Mag ik hem passen?").

## Checker output

```
Checked 28 items, 42 questions. Keys: {"C":13,"A":17,"B":12}. Options: {"3":42}.
  info  28 of 28 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
  FAIL  answer key A is 40% of keys (max 40%)
1 failure(s).
```
