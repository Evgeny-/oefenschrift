# Batch 064 review

The independent AI editorial review of replacement batch 064 covers ten A2 writing tasks (three forms, seven e-mails). The reviewer did not author the batch. The review followed `tmp/content-fix-2026-10-19/spec/review-common.md`, `docs/briefs/review.md`, `content/reviews/rubric.md`, `spec/064.md` and `audit/writing.md`. It checked the full final records against `base/064-base.json` and `base/064-starters-base.json`.

- Proposed file: `content/batches/064-proposed.json`, SHA-256 `2179436e2dc5ce5fe3b3efff1eba12d480f83d7c477ed09b55fab4d80f303d4e`.
- Starters: the author's `content/batches/064-starters.json` is used unchanged (SHA-256 `26144a201b4f575b4edf880cedea264144f08523c0818ea1987b6b72f5857319`). There is no proposed starters file.
- Result: 10 pass, 1 of them edited, 0 rejected. Batch verdict: pass.

## Items

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:writing:batch008-lantaarnpaal:1 | pass (edited) | comparable | The prompt no longer answers the three open fields. c1 now also says "Bedenk dit zelf.", so "in uw straat" is not copied as the precise spot. The neutral title gives nothing away. |
| A2:writing:bibliotheekpas:1 | pass | comparable | The pointless "ask for a new card" is now a real price question. Field 1 is invented. The sample keeps one error ("een nieuw pas") and one null quote. adequacyNote, labels and starters are in step. |
| A2:writing:batch008-kast:1 | pass | comparable | The reason (heavy, third floor) is no longer given. "U hebt hulp nodig met de kast." keeps enough situation. The title no longer says "zware". |
| A2:writing:batch008-oppassen:1 | pass | comparable | "Donderdagavond moet u weg." The reason and the times are now the learner's own. |
| A2:writing:batch008-huur:1 | pass | comparable | The moving sentence is gone. All four criteria now say "Bedenk zelf". |
| A2:writing:batch008-groep:1 | pass | comparable | The work reason is gone. "op dinsdagavond" stays as a fact the teacher needs (c0). |
| A2:writing:batch001-ladder:1 | pass | comparable | The lamp is no longer given. The model's lamp now reads as an invented purpose. |
| A2:writing:batch002-schoenen:1 | pass | comparable | "gisteren" and "te klein" are gone. The day is invented. The problem still has to be put into words ("niet goed passen" names no cause). |
| A2:writing:batch002-sleutel:1 | pass | comparable | The place is invented and the unclear "beheerder verzamelt berichten … voor de buren" sentence is fixed. |
| A2:writing:batch003-loonstrook:1 | pass | comparable | The stiff wording is now plain A2, split into sentences of 13 words or fewer. Facts, criteria, sample and model are unchanged. |

## Edits made

1. **A2:writing:batch008-lantaarnpaal:1, `criteria[1]`**
   - Before: ["Schrijf waar het probleem precies is.", "Say exactly where the problem is."]
   - After: ["Schrijf waar het probleem precies is. Bedenk dit zelf.", "Say exactly where the problem is. Make this up yourself."]
   - Why: with "Bedenk dit zelf." on c0 and c2 but not c1, the visible criteria suggest that the location comes from the prompt. The prompt's only location is "in uw straat", which invites the copy "In mijn straat." That copy does not say where precisely, and the official scoring gives it nothing.
   - The spec says the learner invents the location too. The added sentence matches the house pattern on the other forms (sportclub, nieuwe-patient).
   - Nothing else depends on it. Quote 1 ("De paal staat voor de Meidoornstraat 12, naast de bus halte.") and starter 1 ("De lantaarnpaal staat voor …") still fit, so no starter changes.

No other field differs from the author's file.

## Rejected items

None.

## Author doubts: decisions

1. **lantaarnpaal c1:** "Bedenk dit zelf." added (edit 1 above).
2. **Unrequested title changes:** both kept. "kapotte" and "zware" were the answers to c0 in each item, and the title is the visible page heading, so the rule in `spec/common.md` requires the change. "Melding over een lantaarnpaal" and "Hulp bij een nieuwe kast" are neutral and natural.
3. **kast prompt differs from the audit:** accepted.
   - The audit's "U kunt de kast niet alleen naar uw woning brengen." is itself a reason a learner can copy into c0.
   - "hulp nodig met" is everyday Dutch.
   - A learner who copies "Ik heb hulp nodig met de kast." gives no reason. The judge's GROUNDING rule ("an … inability does not itself give a reason") and the visible "Bedenk zelf een reden." both cover this.
4. **bibliotheekpas c1 is close to dictation:** accepted. Turning "Vraag hoeveel een nieuwe pas kost." into a direct question with inversion is a real A2 act. It is the official "Vraag …" bullet pattern (compare ladder c0), and the coordinator chose it.
5. **schoenen "Gisteren" against "deze week":** accepted. "Gisteren" names a day, and the Monday edge case is not worth an edit.
   - c1 is left without "Bedenk zelf". "Thuis merkt u dat ze niet goed passen." states only that there is a fit problem, so the learner still has to say what it is (te klein, te strak, pijn).
   - The audit and coordinator accepted this residue. The request for "een grotere maat" makes it constrained, not invented.
6. **loonstrook split:** accepted. Two 9-word sentences with one indirect question each are easier to read than the audit's single 16-word sentence. The prompt is 78 words in 10 sentences, longest 13, mean 7.8.
7. **sleutel starter "Ik heb de sleutel in … gevonden.":** kept. "in" fits the likely places in a flat building (hal, lift, trappenhuis, fietsenstalling). It names no place, and the starter is optional.
8. **No judge runs:** not a blocker.
   - The "Bedenk zelf …" sentences do not change what is checked.
   - The new bibliotheekpas c1 is concrete and easy to verify.
   - The new adequacyNote is more permissive than the old "melden verlies".
   - A spot check is recommended before release (see the coordinator actions below).

## Other observations (no edit)

Three sample or model sentences restate a prompt sentence in the first person:

- kast: "Ik heb een nieuwe kast gekocht."
- huur: "Daarom wil ik de huur opzeggen."
- groep: "Daarom kan ik niet meer 's avonds naar de les komen." This is close to the new prompt sentence "U kunt niet meer 's avonds naar de les."

None of these sentences is the evidence for a criterion. Each one is the framing the recipient needs: what was bought, what is being cancelled, what follows from the invented reason. In every case the criterion's quote is invented content. They were accepted as fact transfer, in line with the audit principle.

## Diversity and set assembly

Set membership is unchanged:

| Set | Items |
| --- | --- |
| a2-writing-01 | bibliotheekpas, ladder |
| a2-writing-02 | schoenen, sleutel |
| a2-writing-03 | loonstrook |
| a2-writing-04 | lantaarnpaal |
| a2-writing-05 | groep |
| a2-writing-06 | kast, huur |
| a2-writing-07 | oppassen |

Settings, domains and registers are as before. The batch now gives more of the content to the learner, but it adds no new task concept.

## Media notes

- **Audio:** none needed. These A2 writing items have no `promptAudio` or cue in the catalogue, so there are no `<id>#prompt` or `<id>#cue` clips.
- **Images:** none. No item has images.
- **Revisions:** every item's revision changes on integration, so saved answers to these ten items start fresh.

## Coordinator actions

1. Run `npm run batch:adopt 064`. This adopts the proposed file. The author's starters stay as they are.
2. Run `npm run content:integrate -- --refresh-hints "064: reason/day/place now invented; bibliotheekpas price question"` to merge the starters (three changed fragments).
3. Recommended before release: a small judge spot check of bibliotheekpas c1 and its adequacyNote. Use answers such as "Hoeveel kost een nieuwe pas?" and "Wat kost dat?", plus a control "Mag ik een nieuwe pas?", which should fail c1.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- No feedback (judge) calls were made, so judge behaviour on the changed criteria and adequacyNote was not measured.
- `content/exemplars/` does not exist. The level verdicts compare each item with the other A2 forms and e-mails in the bank (sportclub, nieuwe-patient and the batch 008 e-mails), not with calibrated exemplars.
- Names and organisations that the edits did not change (Woonstichting De Brug, Meidoornstraat, Taalschool West) were not checked on the web again.
- No prompt or cue with audio changed, so no audio needs generation.
