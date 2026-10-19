# Batch 067 review (A2 speaking, hidden criteria)

Independent AI editorial review on 19 October 2026 of `content/batches/067-original.json` (38 records), `067-starters.json` and `067-notes.md`. I followed `tmp/content-fix-2026-10-19/spec/review-common.md` and `review-hidden-criteria.md`, and I checked all 44 base tasks in `tmp/content-fix-2026-10-19/base/067-base.json`, not only the 38 in the batch.

Result: **pass**. 38 items: 27 pass, 11 pass (edited), 0 rejected. Proposed file: `content/batches/067-proposed.json`, SHA-256 `d9d59950a0a0517aa3ea40268124e5d396b3a7b6f977339ec02e38bf5b01d654`. Starters adopted unchanged from `content/batches/067-starters.json`, so there is no proposed-starters file.

## Items

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| `A2:speaking:batch002-kapper:1` | pass | comparable | Starter-only. The old starters gave each picture's verb; the new ones keep only the sequence words. |
| `A2:speaking:batch002-portemonnee:1` | pass | comparable | Starter-only, same fix. |
| `A2:speaking:batch003-jas:1` | pass | comparable | Starter-only. "Roos houdt …" gave the C0 verb; "Roos …" does not. |
| `A2:speaking:batch009-schoonmaak:1` | pass (edited) | comparable | The prompt now asks for two things and the scene. The alt lists the drawn items. |
| `A2:speaking:batch009-gymles:1` | pass (edited) | comparable | Same. The new alt adds the jumping girl, and I checked it against the drawing. |
| `A2:speaking:batch009-afval:1` | pass (edited) | comparable | Same. "twee soorten afval" asks for what C1 checks. |
| `A2:speaking:batch009-ehbo:1` | pass (edited) | comparable | Same. The new alt lists the four items on the table. |
| `A2:speaking:batch009-kringloop:1` | pass (edited) | comparable | Same. The new alt lists the lamp, the cups and plates, the books and the bicycle. |
| `A2:speaking:batch009-alleen-samen:1` | pass | comparable | The prompt now asks for C2 ("Zeg ook iets over het andere plaatje."). |
| `A2:speaking:batch009-klas-thuis:1` | pass | comparable | Same. |
| `A2:speaking:batch009-gemeente-bellen:1` | pass | comparable | Same. |
| `A2:speaking:batch009-trein-auto:1` | pass | comparable | Same. |
| `A2:speaking:batch009-flat-dorp:1` | pass | comparable | Same. The unchanged question sentence has 16 words, which is at the limit. |
| `A2:speaking:batch009-sportschool-park:1` | pass | comparable | Same. |
| `A2:speaking:batch009-paspoort:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch009-brief-gemeente:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch009-vakantie:1` | pass | comparable | Starter-only. The old starters needed only a noun to become an answer. |
| `A2:speaking:batch009-bioscoop:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch009-rijbewijs:1` | pass | comparable | Starter-only. "heeft Modibo …" and "oefent" are removed. |
| `A2:speaking:batch009-kleermaker:1` | pass | comparable | Starter-only. The place "Bij de kleermaker …" and the verb "haalt" are removed. |
| `A2:speaking:batch026-marktkraam:1` | pass (edited) | comparable | The prompt now asks for two things and the scene. The new alt names the apples, tomatoes and carrots. |
| `A2:speaking:batch026-regen:1` | pass (edited) | comparable | Same. The 063 situation line is kept. |
| `A2:speaking:batch026-schoolplein:1` | pass (edited) | comparable | Same. |
| `A2:speaking:batch026-online-winkel:1` | pass | comparable | The prompt now asks for C2. |
| `A2:speaking:batch026-fiets-lopen:1` | pass | comparable | Same. |
| `A2:speaking:batch026-feest-thuis:1` | pass | comparable | Same. |
| `A2:speaking:batch026-treinkaartje:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch026-bibliotheekboek:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch026-koken-buurvrouw:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch027-wachtkamer:1` | pass (edited) | comparable | The prompt now asks for two things and the scene. |
| `A2:speaking:batch027-keuken:1` | pass (edited) | comparable | Same. The 063 situation line is kept. |
| `A2:speaking:batch027-kassa:1` | pass (edited) | comparable | Same. |
| `A2:speaking:batch027-bakkerij:1` | pass | comparable | The prompt now asks for C2. |
| `A2:speaking:batch027-contant-pinnen:1` | pass | comparable | Same. |
| `A2:speaking:batch027-bus-fiets:1` | pass | comparable | Same. |
| `A2:speaking:batch027-sollicitatiegesprek:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch027-verhuizen:1` | pass | comparable | Starter-only, verbs removed. |
| `A2:speaking:batch027-tandartsbezoek:1` | pass | comparable | Starter-only, verbs removed. |

The author's six "ok" tasks are not in the batch: apotheek, koelkast, burenpakket, tramkaart, speeltuin and verjaardag. All six hold. Each criterion has its own prompt sentence. No starter or title names content that the learner must supply.

## Edits

There are 11 edits, all in `prompt`. I inserted one sentence, "Vertel wat u ziet.", after the situation line and before the C1 sentence:

- schoonmaak: "… Hij maakt een kantoor schoon. **Vertel wat u ziet.** Noem twee dingen die Julio bij zich heeft. …"
- gymles: "Sem heeft gymles op school. **Vertel wat u ziet.** Noem twee dingen die de leerlingen doen. …"
- afval: "Karim brengt afval weg. **Vertel wat u ziet.** Noem twee soorten afval die Karim weggooit. …"
- ehbo: "Roos heeft thuis een EHBO-doos. **Vertel wat u ziet.** Noem twee dingen uit de doos. …"
- kringloop: "Fatima is in een kringloopwinkel. **Vertel wat u ziet.** Noem twee dingen die Fatima daar kan kopen. …"
- marktkraam: "Hasan doet boodschappen op de markt. **Vertel wat u ziet.** Noem twee dingen die Hasan bij deze kraam kan kopen. …"
- regen: "Sabrina gaat naar haar werk. Het regent. **Vertel wat u ziet.** Noem twee dingen die de mensen bij de halte doen. …"
- schoolplein: "… Amina is nog op het schoolplein. **Vertel wat u ziet.** Noem twee dingen die de kinderen doen. …"
- wachtkamer: "Hasan zit in de wachtkamer van de huisarts. **Vertel wat u ziet.** Noem twee dingen die de mensen doen. …"
- keuken: "… Het is druk in de keuken. **Vertel wat u ziet.** Noem twee dingen die de mensen doen. …"
- kassa: "Karim staat in de rij bij de kassa van de supermarkt. **Vertel wat u ziet.** Noem twee dingen die Karim gaat kopen. …"

**Why (doubt 1).** In these 11 tasks C0 is "Vertel wat u op het plaatje ziet.", and it is meant as a separate scene sentence. Every sample credits a separate one for it, for example "Ik zie een gymzaal." or "Karim staat in rij bij de kassa.". The author's prompts asked only for the two things and the opinion.

Criteria for speaking tasks are now hidden until review, and `OpenExercise.tsx` says "The prompt itself must name everything they check." A learner who names two things and gives an opinion therefore cannot know that a scene is scored. Crediting C1's sentence for C0 would depend on the judge being lenient. The judge is told to judge each criterion "by the specific information it requests" and to mark it not met when uncertain.

The new sentence names the act, not the content, and has four words. It matches the 063 items, which ask for each criterion in its own sentence (apotheek, jas, speeltuin and verjaardag). It also matches the existing C0 starters ("Ik zie …"), and every model and sample already opens with a scene sentence. Overlap with C1 does no harm: a scene sentence that also names the things meets both criteria. These 11 prompt clips had to be regenerated anyway, so the edit costs no extra audio.

I made no other edits. Criteria, samples, quotes, models, alts, titles and starters stay as the author left them.

## Author doubts

1. Decided above: the prompt must ask for the scene, so "Vertel wat u ziet." is added.
2. Accepted. A starter that supplies the verb of the action a picture shows is the same leak as one that names the place. The 15 starter-only records stay. Their only change is `status`, which `scripts/content.ts` does not hash into the revision, so their audio and stored answers stay valid.
3. Accepted. "Roos …" removes the verb and does not restore the old "thuis" lead.
4. Accepted. The sentence follows "Kies een van de plaatjes.", as in tramkaart. Koelkast's order is also natural, so there is no need to reorder across the bank.
5. Noted. Regen and keuken need prompt audio again.
6. Accepted. "minstens twee" in the hidden criterion and "twee" in the prompt agree.
7. Accepted. Situation lines and titles that frame the story follow the official "Ricardo werkt als kapper" pattern, and the learner still has to describe each panel. The wachtkamer and kassa notes are minor.
8. Accepted. Typing on a laptop counts as writing a letter, and the judge can accept either wording.

## Rejected

None.

## Checks

- The base equals the catalogue records with media removed, and the base starters equal `content/hints/sentence-starters.json`. I compared both with a script.
- I diffed the author's batch against the base. Only `status`, 23 prompts and 5 alts differ. Key order and item order are kept. No brief, criterion, sample, quote, model or title changed. There are no media fields and no retired `type` field.
- Every item has exactly one null quote, and every other quote is verbatim. No prompt sentence appears in a sample or model. Models are 28–44 words with no sentence over 16 words. Prompt sentences are at most 16 words. Each criterion has one starter, and each starter contains "…".
- I opened the drawings for schoonmaak, gymles, afval, ehbo, kringloop and marktkraam. Every changed alt matches its drawing.
- `npx tsx scripts/batch-check.ts content/batches/067-proposed.json` reported: "Checked 38 items … No failures, no warnings."

## Diversity and sets

The scenarios and task types are the same as before, and IDs and set membership are unchanged.

## Media notes

New narrator prompt audio is needed for exactly these 23 clips:

- `A2:speaking:batch009-schoonmaak:1#prompt`
- `A2:speaking:batch009-gymles:1#prompt`
- `A2:speaking:batch009-afval:1#prompt`
- `A2:speaking:batch009-ehbo:1#prompt`
- `A2:speaking:batch009-kringloop:1#prompt`
- `A2:speaking:batch009-alleen-samen:1#prompt`
- `A2:speaking:batch009-klas-thuis:1#prompt`
- `A2:speaking:batch009-gemeente-bellen:1#prompt`
- `A2:speaking:batch009-trein-auto:1#prompt`
- `A2:speaking:batch009-flat-dorp:1#prompt`
- `A2:speaking:batch009-sportschool-park:1#prompt`
- `A2:speaking:batch026-marktkraam:1#prompt`
- `A2:speaking:batch026-regen:1#prompt`
- `A2:speaking:batch026-schoolplein:1#prompt`
- `A2:speaking:batch026-online-winkel:1#prompt`
- `A2:speaking:batch026-fiets-lopen:1#prompt`
- `A2:speaking:batch026-feest-thuis:1#prompt`
- `A2:speaking:batch027-wachtkamer:1#prompt`
- `A2:speaking:batch027-keuken:1#prompt`
- `A2:speaking:batch027-kassa:1#prompt`
- `A2:speaking:batch027-bakkerij:1#prompt`
- `A2:speaking:batch027-contant-pinnen:1#prompt`
- `A2:speaking:batch027-bus-fiets:1#prompt`

No `#cue` clip is affected. No brief changed, so no new drawing is needed. The 15 starter-only items keep their audio.

## Coordinator

- Adopt with `npm run batch:adopt 067`, then integrate. After that, generate the 23 clips and run the transcription round trip.
- Optional: run a bounded judge check. For example, this gymles answer should pass all three criteria: "Ik zie een gymzaal. Sem klimt in een touw en twee kinderen gooien een bal. Ik vind sport op school goed."
- Optional: add "Vertel wat u ziet." to the picture-describe pattern in `content/blueprint.md` §4.3.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- 23 prompts changed. New prompt audio still needs generation and a transcription round trip.
- I made no feedback calls, so I did not measure how the judge behaves on the new prompts and alts.
- `content/exemplars/` does not exist, so the level verdicts compare items with sister items in the bank.
- I re-opened only the drawings whose alt changed, plus afval. I accepted the other alts from the base.
