# Batch 066 review: B1 speaking replacements (19 October 2026)

Independent AI editorial review of `content/batches/066-original.json`, `066-starters.json` and `066-notes.md`. The reviewer did not write the batch. This review does not validate CEFR difficulty or establish exam equivalence.

## Files

- `content/batches/066-proposed.json`: SHA-256 `a6f37902d9720bea4e45ff578bf9962569b0b0e48475214a005688813c02539d`. One field differs from the author's file: the rijexamen prompt goes back to the published text.
- `content/batches/066-proposed-starters.json`: SHA-256 `7171ac007b35d904e06c56dc10943d90344778582331431ff4b6f8d5c71cb811`. One fragment differs from the author's file: portemonnee-tram starter 3.
- `npx tsx scripts/batch-check.ts content/batches/066-proposed.json`: "Checked 15 items, 0 questions", an info line saying all 15 items are already in the catalogue, then "No failures, no warnings."

## Verdicts

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:speaking:batch016-slaapkamerraam:1 | pass | comparable | The situation and the title no longer state the defect, so C2 now comes from the picture. The new alt matches the drawing: the window is ajar and the handle is an ordinary handle pointing down. |
| B1:speaking:batch031-portemonnee-tram:1 | pass (edited) | comparable | The prompt, title and visible C1–C3 no longer name the wallet or the ending. The sample quotes still meet the reworded criteria. One starter edit: it invented "De volgende dag". |
| B1:speaking:batch017-trein-gemist:1 | pass | comparable | The title and the visible C3 no longer give away the train leaving. The prompt and its clip are unchanged. |
| B1:speaking:batch002-teamtaak:1 | pass | comparable | The learner now invents the two arranged things and names the task to hand over, and both appear in the prompt. The semicolon sentence is split. |
| B1:speaking:batch003-werkdruk:1 | pass | comparable | The two tasks are now the learner's own (C0 "bedenk die zelf"). The semicolon sentence is split. |
| B1:speaking:batch002-cursusgemist:1 | pass | comparable | "door ziekte" is removed, so the reason is the learner's own. The semicolon sentence is split. |
| B1:speaking:batch003-inwerken:1 | pass | comparable | The prompt names who asks (the leidinggevende) and uses plain wording. C1 and starter 2 now say "opschrijven". |
| B1:speaking:batch003-cursuslocatie:1 | pass | comparable | The prompt now says what to propose ("de cursus naar lokaal B te verplaatsen"), in five short sentences. |
| B1:speaking:batch017-fietskeuze:1 | pass | comparable | "het beste bij haar situatie past" now announces the visible C2, and the prompt does not get longer. |
| B1:speaking:batch031-cursus-engels:1 | pass | comparable | The same change as fietskeuze, for C2. |
| B1:speaking:batch016-pensioen:1 | pass | comparable | Only the title changed. "Nieuws van een collega" no longer reveals the news the cue gives. |
| B1:speaking:batch030-rijexamen:1 | pass (edited) | comparable | The neutral title is kept. The prompt is reverted to the published "een vraag over het examen" (see the edits). |
| B1:speaking:batch030-uitlaat:1 | pass | comparable | "U belt de garage." can no longer be heard as an instruction to say one's real name. |
| B1:speaking:batch016-medicijn-school:1 | pass | comparable | "een paar dagen" leaves the end date (C2) to the learner. |
| B1:speaking:batch017-machinestoring:1 | pass | comparable | "als de machine vastloopt" matches the jammed box in both pictures. "helpt vandaag bij" replaces the odd "valt … in bij". Starter 1 is aligned. |

Totals: 15 pass, of which 2 were edited; 0 rejected. Starters verdict: pass, with one edit.

## Edits

1. **B1:speaking:batch030-rijexamen:1, `prompt`:** the author's "Stel ook een vraag over het rijexamen …" goes back to the published "Stel ook een vraag over het examen en stel voor om het samen te vieren."
   - This answers author doubt 2. The author's one-word fix puts the content of the cue into the printed and narrated prompt: together with "rijles" and "blij", "het rijexamen" tells the learner the news before Farah speaks. That is the leak that spec item 11–12 / audit note 5 removed from the title.
   - The instruction comes after "U hoort eerst uw vriendin", so the learner applies it after the cue. The cue ("geslaagd voor mijn rijexamen") makes "het examen" unambiguous. The hidden C1 says "het examen" too.
   - The reverted prompt equals the published prompt byte for byte, so its existing clip stays valid and one new clip is saved.
2. **B1:speaking:batch031-portemonnee-tram:1, starter 3 (C2, "Vertel hoe het afliep"):** "De volgende dag kon ze … bij …" becomes "Uiteindelijk kon ze … bij …".
   - The criterion behind this starter changed in this batch, so the starter was re-reviewed with it.
   - Neither the pictures nor the prompt say when Roos got the wallet back, so "De volgende dag" was an invented task fact. Starters may not contain one.
   - The new fragment is still partial and still points to the third picture.

No other field was changed. All other author changes match the spec items or follow from them, and the field diff against the base shows no change outside them.

## Decisions on the author's doubts

1. **Slaapkamerraam alt: accepted.**
   - The drawing (`public/images/f1dd1f197b28bf46.webp`) shows a casement standing a little open and an ordinary handle that is attached and points down. "Hangt los" therefore misdescribed it.
   - The notes say the judge also receives the English brief. That is incorrect: `server/services.ts` (`pictureFor`) sends only the Dutch alt. An accurate alt therefore matters more, not less.
   - The model's "De hendel zit los" is the tenant's own explanation. It agrees with what the picture shows (handle in the closed position while the window stands open), so the model stays.
2. **Rijexamen prompt: reverted.** See edit 1. Media drops `rijexamen#prompt`.
3. **"en waarom" dropped in fietskeuze and cursus-engels: accepted.** Reasons are still asked for by "Noem minstens twee punten uit de tabel" and by the visible C1 ("… als reden").
4. **Portemonnee-tram C3 "bij de bakker": accepted.**
   - As a stand-alone checklist line it reads more clearly than "toen ze het merkte", and it parallels trein-gemist ("op het station").
   - C3 is visible, so the learner knows which moment it means.
5. **Cursuslocatie "is verhuisd naar lokaal A": accepted.**
   - It keeps the published premise (the move caused the bus problem).
   - It contrasts clearly with "naar lokaal B te verplaatsen".
6. **Machinestoring sample "kapot": kept.** It is the learner's wording. quotes[0] still meets C0, because the step is the red button.
7. **Visible criteria that name answers (machinestoring C0 "de machine stoppen", C3 "niet zelf mag repareren"): not edited.**
   - The spec keeps C3, and the audit (note 1) recommends one code-level decision for every uncued speaking item with pictures. That decision is left to the coordinator.
   - Changing C0 alone would leave C3 still naming its content.
8. **Inwerken model imperatives to the leidinggevende: accepted.** "Laat …" and "Schrijf … op" are normal advice register.

## Checks per item (summary)

- **Diff and fields.**
  - A field diff against `tmp/content-fix-2026-10-19/base/066-base.json` shows only the spec fields and `status: "draft"`.
  - The base equals the published catalogue records with media removed (programmatic comparison).
  - Key order and item order are unchanged. No `revision`, `promptAudio`, `cueAudio`, `images[].file` or `type` field.
  - No image `brief` changed. The only alt change is the slaapkamerraam alt.
- **Prompts read aloud.**
  - No changed prompt has a semicolon or a digit.
  - The longest sentence is 24 words (cursusgemist).
  - Each changed sentence is natural spoken Dutch at B1. "Uw vriendin Roos had vorige week pech", "Voor vrijdag moet u twee taken afmaken" and "helpt vandaag bij uw inpakmachine" all read well.
- **Cued items (criteria and starters hidden; `OpenExercise.tsx`).** Each criterion is asked for by the prompt or the cue:
  - teamtaak: "Vertel wat u al hebt geregeld" → C0; "zeg welke taak dat is" → C1.
  - werkdruk: "Zeg welke twee taken het zijn" → C0.
  - cursusgemist: "Leg uit waarom u er niet was" → C0.
  - slaapkamerraam: "Zeg kort wat er mis is met het raam" plus the picture → C2.
  - medicijn-school: "Zeg ook tot wanneer" → C2.
  - rijexamen: "een vraag over het examen" → C1.
- **Uncued items (criteria, title and starters visible).** Nothing printed names what a criterion asks the learner to say. The exception is the machinestoring C0 and C3 (see doubt 7).
- **Samples.**
  - Each sample has exactly one null quote, and every other quote is verbatim (checked by script).
  - The reworded criteria are still met by their quotes:
    - portemonnee-tram: Q1 "Bij de bakker wilde ze betalen, maar haar portemonnee was weg." and Q2 "De volgende dag kon ze hem ophalen …".
    - trein-gemist: Q3 "hij was heel zenuwachtig", right after "Op het station …".
    - teamtaak: Q0 is now two invented things.
    - werkdruk: Q0 is now two invented tasks.
    - inwerken: Q1 "Zet de stappen op papier …" meets "opgeschreven".
- **Models.**
  - Kort models are 32–44 words and middellang models 51–68 words.
  - Each meets every criterion.
  - No prompt sentence appears in a sample or a model (normalised comparison). The machinestoring model opens with the clause "Als de machine vastloopt", not a copied sentence.
- **Pictures viewed.** All pictures of slaapkamerraam, portemonnee-tram, trein-gemist and machinestoring were converted and viewed. Every alt matches its drawing, and the machinestoring box is jammed, not broken.

## Diversity and set assembly

Every ID and its set membership is unchanged: b1-speaking-01, -02, -03, -05, -06, -07, -08 and -09. The fixes give teamtaak, werkdruk and cursusgemist the same "invent the content yourself" shape. They share set b1-speaking-01, but their speech acts differ (delegate, prioritise, explain absence), so no set change is needed.

## Media notes

**New prompt audio is needed for exactly 12 clips** (narrator). Each of these prompts differs from its published text:

- `B1:speaking:batch016-slaapkamerraam:1#prompt`
- `B1:speaking:batch031-portemonnee-tram:1#prompt`
- `B1:speaking:batch002-teamtaak:1#prompt`
- `B1:speaking:batch003-werkdruk:1#prompt`
- `B1:speaking:batch002-cursusgemist:1#prompt`
- `B1:speaking:batch003-inwerken:1#prompt`
- `B1:speaking:batch003-cursuslocatie:1#prompt`
- `B1:speaking:batch017-fietskeuze:1#prompt`
- `B1:speaking:batch031-cursus-engels:1#prompt`
- `B1:speaking:batch030-uitlaat:1#prompt`
- `B1:speaking:batch016-medicijn-school:1#prompt`
- `B1:speaking:batch017-machinestoring:1#prompt`

**No other audio.**

- No `#cue` clip is needed: all eight cue texts are unchanged.
- The prompts of rijexamen (reverted), trein-gemist and pensioen equal their published text, so those prompt clips stay.

**No pictures.** No brief changed. The slaapkamerraam alt change needs no redraw.

## Coordinator actions

1. `npm run batch:adopt 066`. This moves both proposed files over the author's files and verifies both hashes.
2. Generate the 12 prompt clips above with the transcription round trip. Then run `npm run content:integrate -- --refresh-hints "<reason>"`, which merges the inwerken, machinestoring and portemonnee-tram starter changes, followed by `npm run media:prune`.
3. Optional and outside this batch: decide in code whether uncued speaking items with pictures should hide their criteria until review (audit note 1). Machinestoring C0 and C3 still name their content.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Twelve prompts changed. New audio still needs generation from the adopted text, with a transcription round trip; none was generated in this review.
- No feedback calls were made, so judge behaviour on the reworded criteria and the new alt was not measured.
- `content/exemplars/` does not exist. Level verdicts compare each item with sister items in the bank (trein-gemist with portemonnee-tram, brandalarm with machinestoring, the other kort role-plays with each other), not with calibrated exemplars.
