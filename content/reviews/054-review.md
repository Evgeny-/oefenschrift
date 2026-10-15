# Batch 054 independent review (B1 reading, authorised replacement)

Result: 8 of 8 items pass, 2 of them with reviewer edits. Nothing is rejected. All eight IDs are listed in `replaces`. The proposal keeps every ID, the item order, the question order and the published answer keys (A 17, B 17, C 17 of 51).

I read every text and question in full in the proposed file and diffed the author's file against `tmp/content-fix-2026-10-14/base/054-base.json`. That base equals the catalogue records except for `revision` and `status`. The author changed only the fields listed in the notes. Each change is one of spec fixes 1–8 or a direct consequence of one. No media or derived fields, no `type` field.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:reading:batch034-bewonersvergunning:1 | Pass | Comparable | Stop rule now explicit for a move to another zone. The q4 key follows from the rule plus a month count; A is contradicted outright. |
| B1:reading:batch010-ploegendienst:1 | Pass | Comparable | q4 now asks whether the swap is allowed: 22.00 to 6.00 is 8 hours of rest against 11. The q2 explanation claims nothing beyond the text. |
| B1:reading:batch024-gratis-zwemles:1 | Pass | Comparable | Self-label removed, closing call asks for free lessons, "je redden" fixed. The q6 purpose is shown by the argument structure. |
| B1:reading:batch011-verlofregeling:1 | Pass | Comparable | The new q2 option C (holiday days) is anchored in §4–5 and clearly not part of a sick report. |
| B1:reading:batch002-cursusfonds:1 | Pass (edited) | Comparable | Spelling and collocation fixed; q1 evidence quotes the manager's assessment. Option C re-anchored (edit 1). |
| B1:reading:batch010-deelexamens:1 | Pass (edited) | Comparable | "einde van de opleiding" and the renamed byline. The remaining timing inconsistency is fixed (edit 3). |
| B1:reading:batch034-zelfroosteren:1 | Pass | Comparable | q7 option C now reads "pas laat invullen". |
| B1:reading:batch035-mediatheek:1 | Pass | Comparable | The q3 explanation says only what the text supports and still refutes B. |

Every key was proved from its verbatim quote, and every distractor was tested as a competing answer. The per-question proofs and distractor rationales are in `054-review.json`. Comparators were catalogue items of the same task type; there is no `content/exemplars/` folder. No item is off level. All texts are 459–657 words, with a mean sentence length of 13.3–16.7 words and no sentence over 29 words.

## Edits in the proposal

1. **cursusfonds, `questions[q1].options.C`:** "Op de afdeling waar de lessen plaatsvinden." → "Op de vraag of de medewerker op kantoor werkt."
   - The old option had no anchor: the text names no department and no place for the lessons.
   - The explanation refuted "werkplek", which the old option did not say.
   - The batch 040 rationale shows the option was meant to test "ook als u niet op kantoor werkt". The new option is anchored there and is clearly false.
2. **cursusfonds, `questions[q1].explanation`:** the closing clause "; de cursusnaam of werkplek alleen bepaalt dit niet." → ". Over de bekendheid van de cursusaanbieder zegt de tekst niets, en een cursus kan ook passen als u niet op kantoor werkt."
   - The explanation now refutes A and C from the text.
   - "alleen bepaalt dit niet" implied that the name or workplace partly decides.
3. **deelexamens, `text`:** "Wie een deel niet haalt, verliest een maand en geen jaar." → "… verliest een maand en geen half jaar."
   - After fix 6 the text has no yearly exam that could cost a year.
   - The writer's own example says Modibo waited half a year for his resit.
   - No question or evidence quote contains this sentence. q2 option B ("faster resits") stays clearly false: the writer argues for partial exams.

## Decisions on the author's doubts

- **bewonersvergunning:** the rewrite is accepted. The four-sentence q4 evidence is the shortest verbatim span that entails the key.
- **ploegendienst q4 A ("doorgegeven"):** kept. It means the same as "in de app staan", and the option fails on the rest rule anyway.
- **gratis-zwemles q5 C:** no longer partly supported, so it is kept.
  - "het gevolg van een keuze" only diagnoses the cause.
  - The call, the thesis and the Westerhout model all ask for free lessons through the municipality, not school swimming at every primary school.
- **gratis-zwemles q5/q6 overlap:** acceptable.
  - q5 asks for the content of the opinion; q6 asks for the text's function.
  - On a persuasive text the purpose key has to name the thesis, as the spec required.
  - The warning distractor is limited to one anecdote, so it cannot compete as the purpose.
- **cursusfonds q1:** the new evidence entails the key. Option C is edited (edits 1–2).
- **Evidence overlay:** `scripts/content.ts` skips historical overlays for IDs owned by a reviewed batch (`if (owners.has(id)) continue;`). This review lists all eight IDs in `replaces`, so ownership moves to batch 054.
- **The name Thijs Veenstra:** not a real public figure, and not used elsewhere in content.
  - "Thijs" and "Veenstra" appear nowhere in `content/catalogue.json`, content/batches, hints, practice sets or the fix bases. The only repository hit is an ElevenLabs voice name in `docs/research/voice-audition-2026-09-17.md`.
  - The name is not on the English or Dutch Wikipedia "Veenstra" lists, and a web search on 14 October 2026 found no public figure with this name.
  - Jari Postma now names only the zelfroosteren nurse.
  - Unchanged names and invented organisations were spot-checked too; none is a public figure, real business or municipality.
- **"verliest … geen jaar":** edited (edit 3).

## Diversity and set assembly

Existing set membership is preserved. Persona first names recur across texts as different people: Julio appears three times, and Hasan, Fatima, Karim, Modibo, Amina, Jari and Thérèse twice each. This is harmless, but where possible avoid putting several "Julio" texts in one mock form.

## Media

None. B1 reading items have no audio or pictures, so no clip needs new audio. Integration assigns new revisions, and saved progress on these eight exercises starts fresh.

## Checker and hash

`npx tsx scripts/batch-check.ts content/batches/054-proposed.json` → "Checked 8 items, 51 questions. Keys: {"B":17,"A":17,"C":17}. Options: {"3":51}." It also prints the expected info line that the items are already in the catalogue. No failures, no warnings.

Proposed file SHA-256: `7072fb25d5f092f0d2ca8c0db5de5b67389d6ef48464fe33c2203727aacb970e`. Author's file: `0d89ea0d51bce1051b35f51dc1adec931d69ed0c10872988d8aa25298af603cc`, which matches the notes.

The coordinator can adopt with `npm run batch:adopt 054` and then integrate.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. No new audio is needed, because no script, spoken prompt or cue changed. Web searches show only that no public figure or business of a name was found.
