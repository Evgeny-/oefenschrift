# Batch 061 independent review

All sixteen items pass: fourteen as the author wrote them and two after my edit (cursusverzoek and verwarming-verhuurder). Nothing is rejected. This is an authorised replacement batch: every ID, the item order and set membership are kept.

- `content/batches/061-proposed.json`: SHA-256 `67510aea4cc0943717f60eb5feb2bd9fe8835eb76fb6e679119b0b584afb7cdd`.
- `content/batches/061-proposed-starters.json`: SHA-256 `012804d8be51cc930a59423741b3a8f239a603600213bcc52285dfe7ef24e1c4`. Two starter lists lost their fourth fragment.

`npx tsx scripts/batch-check.ts content/batches/061-proposed.json` reports no failures and no warnings. It prints the expected info line that all sixteen items are already in the catalogue.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:speaking:batch016-pensioen:1 | pass | comparable | The prompt now asks for an opinion, a reason, and a question or wish, which are exactly the three hidden criteria. It matches batch030-rijexamen. |
| B1:speaking:batch016-open-dag:1 | pass | comparable | "Bedank hem ook of stel iets anders voor" announces C2. The sample's "sorry" is not thanks, so C2 stays unmet. |
| B1:speaking:batch017-cursusverzoek:1 | pass (edited) | comparable | Dropped the generic closing criterion. The task is now convince with two reasons and answer the manager's objection. |
| B1:speaking:batch031-verwarming-verhuurder:1 | pass (edited) | comparable | Same edit. It also removes "voorstel … eigen voorstel", which a listener hears in two consecutive sentences. |
| B1:speaking:batch017-examentips:1 | pass | comparable | Reassurance is announced with a plain alternative. quotes[1] now shows two distinct tips. |
| B1:speaking:batch031-sollicitatietips:1 | pass | comparable | "Stel haar ook gerust of bied hulp aan" announces C3. The sample still lacks a "why", so C2 stays unmet. |
| B1:speaking:batch016-slaapkamerraam:1 | pass | comparable | "Zeg kort wat er mis is met het raam" announces C2, and "Gebruik het plaatje" now has a job. |
| B1:speaking:batch017-glasbak:1 | pass | comparable | The four graded points are named. "Meld het bij de gemeente" now meets C2. |
| B1:speaking:batch031-afvalcontainers:1 | pass | comparable | Instructions and a warning are announced. C1 accepts both real-world timings. The alt still describes the drawing. |
| B1:speaking:batch031-brandalarm:1 | pass | comparable | The prompt names first step, route, place and warning. The compound criteria are loosened and quotes[0] now meets C0. |
| B1:speaking:batch017-fietskeuze:1 | pass | comparable | The drawback is announced and the tip is no longer required. The sample's null at C2 holds (see doubt 7). |
| B1:speaking:batch017-sportabonnement:1 | pass | comparable | The drawback is announced. The model's "De Brug is wel vijftien euro goedkoper" is Zuid's price drawback in comparative form. |
| B1:speaking:batch031-werktelefoon:1 | pass | comparable | The drawback is announced. The model names it directly. |
| B1:speaking:batch031-cursus-engels:1 | pass | comparable | The drawback is announced. At 70 words this is the longest B1 speaking prompt; the base was 63. |
| B1:speaking:batch017-eerste-schooldag:1 | pass | comparable | "hoe Amina zich voelt en waarom" matches C3. The sample, model and starter already give a reason. |
| B1:speaking:batch031-taalcafe-avond:1 | pass | comparable | Same as eerste-schooldag. |

## Edits

Both edits apply the spec's own option "or drop C2/C3" for these two items. The reasons are under doubt 1.

- **B1:speaking:batch017-cursusverzoek:1**
  - `prompt`: the closing sentence "Sluit af met een vraag of een voorstel." is removed. The prompt now ends "Overtuig haar dat u de cursus ook moet volgen. Noem twee redenen en reageer op haar bezwaar." (64 → 56 words).
  - `criteria[3]` is removed: "Sluit af met een vraag of een voorstel, bijvoorbeeld of u zich mag inschrijven." / "End with a question or a proposal, for example whether you may register."
  - `quotes[3]` is removed: "Mag ik alstublieft toch meedoen?".
  - Fourth starter removed: "Zou ik me … mogen …?".
- **B1:speaking:batch031-verwarming-verhuurder:1**
  - `prompt`: the closing sentence "Sluit af met een vraag of een eigen voorstel." is removed. The prompt now ends "Overtuig hem dat de verwarming deze week gerepareerd moet worden. Noem twee redenen en reageer op zijn voorstel." (66 → 57 words).
  - `criteria[3]` is removed: "Sluit af met een vraag of een voorstel, bijvoorbeeld of hij een ander bedrijf kan bellen." / "End with a question or a proposal, for example whether he can call another company."
  - `quotes[3]` is removed: "Kunt u alstublieft een andere monteur bellen?".
  - Fourth starter removed: "Zou u misschien … kunnen …?".

After the edit both items have three criteria, the checker's minimum. Each sample still misses exactly one criterion:

- cursusverzoek misses C1. It gives one reason and calls it "de belangrijkste reden".
- verwarming-verhuurder misses C2. It never answers the heater.

The models are unchanged and meet C0–C2. Their closing questions remain as natural extras.

## Rejected

None.

## Does a learner who follows the prompt meet every criterion?

Yes, for all sixteen. Criteria are hidden before answering for the seven cued items.

**Cued items (criteria hidden):**

- **pensioen:** "Reageer op het nieuws: zeg wat u ervan vindt" gives C0, "en waarom" gives C1, and "Stel ook een vraag over haar plannen of wens haar iets toe" gives C2.
- **open-dag:** "Sla de uitnodiging af" gives C0, "en zeg waarom" gives C1, and "Bedank hem ook of stel iets anders voor" gives C2.
- **cursusverzoek:** "Overtuig haar dat u de cursus ook moet volgen" gives C0; the situation also says "U wilt die cursus graag volgen". "Noem twee redenen" gives C1. "reageer op haar bezwaar" gives C2; the cue states the objection, team leaders only and two working days.
- **verwarming-verhuurder:** "Overtuig hem dat de verwarming deze week gerepareerd moet worden" gives C0 and "Noem twee redenen" gives C1. "reageer op zijn voorstel" gives C2. The cue's only proposal is "Kunt u niet zolang een elektrisch kacheltje gebruiken?"; the three weeks are a fact, not a proposal.
- **examentips and sollicitatietips:** "Geef … advies" gives C0, "Noem minstens twee tips" gives C1, and "leg uit waarom die helpen" gives C2; the criterion needs only one explanation. C3 comes from "Stel hem ook gerust of vertel hoe het bij u ging" and "Stel haar ook gerust of bied hulp aan" respectively.
- **slaapkamerraam:** the two named questions give C0 and C1. "Zeg kort wat er mis is met het raam" plus the picture (a loose handle and a gap) gives C2.

**Visible criteria, now also named in the prompt:**

- glasbak: the rule, why, what to do now, and where to report.
- afvalcontainers: which container, when, "wat ze moet doen" (instruction form) and a warning.
- brandalarm: first step, route, place outside and a warning.
- The four table tasks: "en ook een nadeel van uw keuze".
- The two narrations: "hoe … zich voelt en waarom".

The situation-link criteria (fietskeuze C2, werktelefoon C2 and cursus-engels C2) are carried by the situation facts, by "waarom" or the reasons asked for, and by the visible requirement list. See doubt 7.

## Time and narration

**Time.** For every item I wrote a minimal answer that meets all criteria:

- kort items: 18–22 words, about 9–15 s at 1.5–2 words per second.
- middellang items: 24–39 words, about 12–26 s.

The two narrations are the longest, at 38–39 words. Even the author's four-criterion convince versions fit, at 32–33 words. Time was therefore not a reason for any edit.

**Narration.** Every added instruction sentence is natural spoken Dutch at B1 level, at most 19 words long, and has no digits. Prompt lengths are 36–70 words. The only one above the bank's previous maximum of 63 is cursus-engels, at 70; its added clause is seven words. That is acceptable.

## Decisions on the author's doubts

1. **cursusverzoek and verwarming-verhuurder: drop the closing criterion.** This is applied (see Edits).
   - They did not ask too much for the time.
   - The official middellang act is "convince with two reasons". C0–C2 realise it and also answer what the cue raises.
   - A fixed closing question or proposal is a generic extra that the official content score does not reward. With it, feedback would mark as incomplete an answer that the exam scores in full.
   - Dropping it also removes the third instruction sentence and, in verwarming-verhuurder, the "reageer op zijn voorstel … een eigen voorstel" repetition. The author needed "eigen" to repair that repetition.
   - Three criteria remain.
   - The principle, applied across the batch: each cued middellang task keeps one criterion that answers the cue (an objection, a counter-proposal, nerves). That is why examentips and sollicitatietips keep their C3.
2. **Either/or announcements:** keep. They mirror the criteria, and "vertel hoe het bij u ging" gives learners who do not know "geruststellen" a plain route.
3. **examentips overlapping quotes:** keep the author's quotes[1].
   - It shows two distinct tips: planning and old exams.
   - The non-overlapping alternative only works if "one chapter a day" counts as a tip separate from the planning, which is weaker.
   - Quotes are calibration data and are never shown to learners.
4. **brandalarm C0 and quotes[0]:** accept. The loosened C0 is the spec's required fix for the compound, and "je moet meteen stoppen met werken" meets it.
5. **afvalcontainers alt:** keep "Een vrouw zet 's avonds een grijze container aan de straat bij een lantaarnpaal."
   - I looked at the published drawing (`public/images/7627c6c638e94e60.webp`). Its dark sky, lit lamp and lit windows read as evening, and the alt must describe the picture.
   - The judge receives this alt, but it also receives C1, which names both times explicitly.
   - Both timings are real practice. Den Haag (https://www.denhaag.nl/nl/afval/huishoudelijk-afval/huisvuil-aanbieden/, accessed 14 Oct 2026) says: "U mag uw huishoudelijk afval vanaf 22.00 uur de avond voor de ophaaldag aanbieden." and "Zorg dat uw vuilniszak of minicontainer op de ophaaldag uiterlijk om 7.45 uur aan de weg staat."
6. **sportabonnement model:** keep. "De Brug is wel vijftien euro goedkoper, maar …" is the concessive statement of Zuid's drawback, its higher price. That is what the prompt asks, in the comparative form its "Vergelijk de twee abonnementen" invites. The author's alternative says the same thing from the other side.
7. **Link-to-situation criteria and the fietskeuze sample.**
   - **Criteria:** keep. These criteria are visible, and the situation gives exactly the facts they name. "en waarom" or the requested reasons invite the link.
   - **Sample:** keep, with C2 null.
     - It names table facts but never Roos's stairs, money or timing. It even recommends the dearer bike without addressing her budget.
     - In the 14 October audit run, the judge marked C2 met, citing "fiets één is goedkoper": a point against the recommended bike, not a link to her money.
     - In the same run, the judge also misread two other samples in this batch. It took cursus-engels' "Die duurt maar tien weken" (offered as an advantage) as a drawback. It counted werktelefoon's single calling reason twice.
     - I treat all three as judge leniency, not sample defects.
     - If future synthetic runs keep disagreeing, the robust fix would be to rebuild this sample with the null at C3. In this table every drawback of fiets twee (price, delivery) is one of Roos's own constraints.
8. **Prompt length:** acceptable (see Time and narration).
9. **"Noem minstens twee punten" removed:** accept. The prompts now name their points, so the visible criteria and the narrated prompt say the same thing. The acts are still "advise" (glasbak) and "instruct step by step" (afvalcontainers, brandalarm).

**Author's notes, one correction.** The notes say the judge receives the English `brief`. In the working-tree `server/services.ts`, only the Dutch `alt` is sent; `pictureFor` uses `image.alt`. This needs no content change.

## Starters

The proposed starters file has sixteen keys in batch order. There is one fragment per criterion, each containing "…". None is a complete answer and none invents a task fact.

Apart from the two removed fourth fragments, every list equals `tmp/content-fix-2026-10-14/base/061-starters-base.json`, which equals the published `content/hints/sentence-starters.json`. The fragments whose criteria changed still fit:

- glasbak C2 "U kunt de volle glasbak melden bij …".
- afvalcontainers C1 "… zet u … aan de straat, omdat hij … wordt geleegd." accepts both times.
- brandalarm C0–C2 fit; the lift invitation in C1 now also serves C3.
- fietskeuze C3 "Het nadeel is …, maar je kunt …"; the tip is optional.

## Diversity and set assembly

The topics, acts and IDs are unchanged, and membership is unchanged:

- b1-speaking-03: cursusverzoek, fietskeuze.
- b1-speaking-04: examentips, glasbak, sportabonnement, eerste-schooldag.
- b1-speaking-05: slaapkamerraam.
- b1-speaking-06: pensioen, open-dag.
- b1-speaking-09: verwarming-verhuurder, cursus-engels, taalcafe-avond.
- b1-speaking-10: sollicitatietips, afvalcontainers, brandalarm, werktelefoon.

The near neighbours named in the 031 notes stay apart in drills. These are glasbak/afvalcontainers, examentips/sollicitatietips, sportabonnement/werktelefoon, fietskeuze/cursus-engels and slaapkamerraam/verwarming-verhuurder.

## Media notes

- **Prompt audio (`promptAudio`, narrator): sixteen clips.** All sixteen prompts differ from the published text, so every ID in the batch needs a new prompt clip. Generate cursusverzoek and verwarming-verhuurder from the proposed (shorter) text.
- **Cue audio: none.** All seven cue texts are byte-identical to the base.
- **Pictures: none.** No `brief` or `alt` changed.

There are no listening scripts and no question audio. Generate audio only after adoption, with the transcription round trip.

## Coordinator actions

1. Run `npm run batch:adopt 061`. It moves `061-proposed.json` and `061-proposed-starters.json` over the author's files and verifies both hashes recorded here.
2. Generate the sixteen prompt clips and pass the round trip. Then run `npm run content:integrate -- --refresh-hints "<reason>"`, which merges the two shortened starter lists, followed by `npm run media:prune`.
3. **Outside this batch, optional.**
   - `B1:speaking:batch017-machinestoring:1` has the same defect class as spec item 2: its visible C3, "Geef een reden of een waarschuwing …", is not announced by its prompt.
   - For the nine items without a cue, `OpenExercise.tsx` shows the criteria before answering. Several criteria name the expected content, for example "de grijze (eerste plaatje)", "zondagavond" and "de boom op het plan". That is app behaviour, not part of this batch.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- All sixteen speaking prompts changed. New prompt audio still needs generation from the adopted text, with a transcription round trip; none was generated in this review.
- No feedback calls were made, so judge behaviour was not measured in this review. The sample/judge comparisons cite the 14 October audit run (`tmp/feedback-audit-2026-10-14/models-new-both.json`): one run per text, gpt-6-luna, pre-fix criteria. What the judge receives was read from the working-tree `server/services.ts`, which has uncommitted changes.
- `content/exemplars/` does not exist. Level comparisons therefore use project items of the same task type and do not calibrate difficulty.
- The timing estimates assume 1.5–2 words per second for a B1 speaker. They are not measured.
