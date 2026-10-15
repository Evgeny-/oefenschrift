# Batch 060 independent review

All six items pass. I made no edits and rejected nothing, so `content/batches/060-proposed.json` is a byte-identical copy of the author's `060-original.json`. The author's starters pass unchanged, so there is no proposed starters file. This is an authorised replacement batch: every ID and set membership is kept.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:writing:batch015-gemiste-werkdag:1 | pass | comparable | The meeting topic is now asked for in the prompt. C2 is one warehouse requirement that fits picture 3. Brief-only names are gone. The model is coherent at 134 words. |
| B1:writing:batch029-kustweekend:1 | pass | comparable | C1 and C2 now name what pictures 2 and 3 show, without incidental details. The repairer contradiction is gone and the model reads in order at 124 words. |
| B1:writing:batch015-avondcursus:1 | pass | comparable (lighter end) | C1 now accepts "nog geen ervaring" for a beginners' course. Everything else is unchanged. |
| B1:writing:batch002-rooster:1 | pass | comparable | The prompt now says "op de open plek" and no longer repeats itself. It still names the reason. |
| B1:writing:batch003-reparatie:1 | pass | comparable | The model asks for a loan laptop by 17 April: a clear remedy in om + te. |
| B1:writing:batch038-inhalen:1 | pass | comparable | "nog deze week" removes the "this week's Monday" reading and fits Wednesday or Friday. |

## Edits

None. Every change from the base is one of the spec's fixes or a direct consequence of one: sample, quotes, model and three starters. A field-level diff confirms that nothing else moved. Key order, image briefs, alts, kinds and sizes are identical to `tmp/content-fix-2026-10-14/base/060-base.json`, and no generated field is present.

## Rejected

None.

## Does a learner who follows the prompt meet every hidden criterion?

Yes, for all six. The criteria are hidden before answering for the two picture tasks and the three zinstaken; the form's criteria are visible.

- **gemiste-werkdag**
  - Pictures 1–3 carry visible numbers and give C0–C2.
  - The new sentence "Vertel bij het tweede plaatje ook waar het overleg over ging. Bedenk zelf een onderwerp." gives C1's topic.
  - "Vraag Julio ook hoe het met hem gaat …" gives C3.
- **kustweekend**
  - Picture 1 gives C0; the prompt also names the dyke.
  - Picture 2 gives C1, "wat u deed toen het begon te regenen": waiting or sheltering.
  - Picture 3 gives C2, "hoe de dag in de haven eindigde".
  - "Sluit af met een vraag aan Ricardo" gives C3.
- **avondcursus:** open fields 4–6 map one-to-one to C0–C2.
- **rooster** and **reparatie:** the prompt names the content, and the lead-in forces the grammar.
- **inhalen:** the e-mail body fixes the function, and C0 accepts making up the lesson or getting the material in any form.

The judge now receives each picture's Dutch alt (`server/services.ts`, working tree), never the brief. Its PICTURES rule checks that a stated action fits the numbered picture.

## Zinstaak insertion (models and samples)

- rooster, model: "Ik kan die dienst niet doen, omdat ik op woensdagavond altijd les voor mijn opleiding volg." This is a bijzin with the finite verb last.
- rooster, sample: "… omdat ik die avond een verjaardag van mijn neef vier." It is grammatical but gives the wrong reason, so C0 is null.
- reparatie, model: "Ik verzoek u om mij uiterlijk op 17 april een leenlaptop te geven." It gives a remedy and a deadline after 15 April.
- reparatie, sample: "… om mij een overzicht van uw openingstijden te sturen." It is grammatical but gives no remedy and no date, so C0 is null.
- inhalen, model: "Is het mogelijk om de les van maandag nog deze week bij een andere groep in te halen?" Here "te" sits inside the separable verb.
- inhalen, sample: "… om de toets op een latere moment te maken?" The gender error is tolerated; the sample asks to move the test, so C0 is null.

## Starters

All six IDs are present in order, with one fragment per criterion, and every fragment contains "…". Three fragments changed with their criteria, and I completed each one in context:

- gemiste-werkdag 2, "Daarna heeft … in het magazijn …": "Daarna heeft een collega de nieuwe medewerker in het magazijn rondgeleid."
- kustweekend 2, "Uiteindelijk kwam ik aan in de haven, waar …": "… waar ik in de zon patat heb gegeten."
- avondcursus 1, "Met boekhouden heb ik … ervaring, want …": this works for both "nog geen" and "al wat".

No fragment is a complete answer or invents a task fact. The unchanged zinstaak fragments still produce correct completions.

## Decisions on the author's doubts

1. **Topic announced in the gemiste-werkdag prompt:** keep. It is the spec's first option, and "overleg" names only what picture 2 plainly shows.
2. **gemiste-werkdag C0 is compound:** keep it.
   - Both halves are drawn in picture 1, and a repair implies a defect.
   - The audit flagged C2 of this item, not C0, and C0 is not on the fix list.
   - Residual risk: a strictly literal judge may want "kapot" when an answer says only that a technician repaired the machine. Test that case in the feedback evaluation. If it fails, use "Schrijf wat er met het koffieapparaat gebeurde." in a later revision.
3. **"dezelfde collega":** natural, and it matches the pictures. No criterion requires the "new employee" reading.
4. **kustweekend C1:** keep "Schrijf wat u deed toen het begon te regenen."
   - The judge's picture check covers answers that contradict picture 2.
   - "waar u wachtte" would fail "Ik heb gewacht tot het droog was", a fair description of picture 2.
5. **kustweekend model:** accept.
   - "een lekke band krijgen terwijl je geen plakspullen bij je hebt" is everyday temporal "terwijl".
   - The flat tyre at the end contradicts nothing, and the closing joke picks it up.
6. **kustweekend model sentence 2:** keep. It is first-person scene-setting, not a copied prompt sentence. It passed the 029 review and is not on the fix list.
7. **avondcursus form label:** keep "Welke ervaring heeft u al met dit onderwerp?".
   - "al" invites "nog geen", and every answer to the label meets the new C1.
   - The label is not wider than the criterion.
   - The similar `batch029-uitzendwerk` C1 is out of scope.
8. **reparatie model:** accept "een leenlaptop te geven". It is idiomatic, like "een leenauto", and it is the adequacyNote's own example.
9. **Judge input:** settled by the coordinator, and I verified it. Only the alts reach the judge, so no content change is needed.
10. **inhalen dates:** keep. 14 September 2026 is a Monday; a past scenario date is not a defect, and it is out of scope.

## Diversity and set assembly

The six topics are unchanged and do not repeat each other. The two picture e-mails share the official shape, but one is a workday and the other a weekend trip. The three zinstaken test three different structures.

Set membership is unchanged:

| Set | Items |
| --- | --- |
| b1-writing-01 | rooster |
| b1-writing-02 | reparatie |
| b1-writing-03 | gemiste-werkdag, avondcursus |
| b1-writing-09 | kustweekend |
| b1-writing-11 | inhalen |

The invented names Volksuniversiteit Oostwaard and Taalschool Zonnedreef were re-checked on 14 October 2026. Web searches found neither, and DNS returns NXDOMAIN for both domains.

## Media notes

- **Audio:** none needed. B1 writing has no audio, and no script, speaking prompt, cue or KNM option changed.
- **Pictures:** none need redrawing. No brief changed, and integration keeps a picture whose brief is unchanged. The alts are unchanged and still accurate.

## Coordinator

1. Run `npm run batch:adopt 060`.
2. Run `npm run content:integrate -- --refresh-hints "batch 060 replacement"`. The review carries the starters hash, so the three changed starters merge into the overlay.
3. No audio or illustration generation is needed.

Saved progress on the six items restarts, because their revisions change.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- No feedback calls were made. What the judge receives was read from the working-tree `server/services.ts` and `server/feedback-instructions.json`, which have uncommitted changes.
- Level comparisons use project items of the same task type, because `content/exemplars/` does not exist.
- No new audio needs generating, so no transcription round trip is pending.

## Hashes

- Proposed batch SHA-256: `f62629ee16036fefde96013a2d830fb7af442d0ba930ef85ad6729f3f49b9119`. This is identical to the author's original.
- Starters (`content/batches/060-starters.json`) SHA-256: `92de1dacd481b7ef962d50e3414bc614f1211caad06400f363f62b8e1ff886ab`.
