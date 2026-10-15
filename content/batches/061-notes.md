# Batch 061 author notes

Authorised replacement of sixteen published B1 speaking tasks. The editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, sections 3.3, 3.5 and 3.6) found criteria that are graded but never announced, "Noem minstens twee punten" prompts with four graded criteria, compound criteria that reject natural answers, and two sample quotes that disagree with their criteria. The project owner authorised the fixes; the fix list is `tmp/content-fix-2026-10-14/spec/061.md`. For every item with a `cue`, `app/components/OpenExercise.tsx:291` hides the criteria (and the starters) until review, so the spoken prompt is the learner's only instruction. For the nine items without a cue, the criteria are visible, but a learner who followed the prompt could still fail a criterion.

All sixteen IDs, their order and their set membership are unchanged:

- `B1:speaking:batch016-pensioen:1`
- `B1:speaking:batch016-open-dag:1`
- `B1:speaking:batch017-cursusverzoek:1`
- `B1:speaking:batch031-verwarming-verhuurder:1`
- `B1:speaking:batch017-examentips:1`
- `B1:speaking:batch031-sollicitatietips:1`
- `B1:speaking:batch016-slaapkamerraam:1`
- `B1:speaking:batch017-glasbak:1`
- `B1:speaking:batch031-afvalcontainers:1`
- `B1:speaking:batch031-brandalarm:1`
- `B1:speaking:batch017-fietskeuze:1`
- `B1:speaking:batch017-sportabonnement:1`
- `B1:speaking:batch031-werktelefoon:1`
- `B1:speaking:batch031-cursus-engels:1`
- `B1:speaking:batch017-eerste-schooldag:1`
- `B1:speaking:batch031-taalcafe-avond:1`

Every record is a complete exercise with `status: "draft"` and `targetLevelValidated: false`. This is AI editorial work. It does not validate CEFR difficulty or establish exam equivalence.

## Sources read

- `AGENTS.md` and `docs/briefs/author.md`, including the shared record contract and the rewrite rule.
- `content/blueprint.md` §1, §3, §4.9, §6, §8 and §10, plus `content/reviews/rubric.md`.
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters".
- The Spreken I paragraph of `docs/research/exam-blueprints-2026-09-10.md`.
- `app/components/OpenExercise.tsx` lines 280–335, which show what is visible before answering.
- `server/services.ts`: the judge receives the prompt, the criteria, the table, and for pictures both the Dutch `alt` and the English `brief`.
- The two reference prompts that announce every criterion: `B1:speaking:batch030-rijexamen:1` and `B1:speaking:batch030-voetbalavond:1`.
- The author notes of batches 016, 017 and 031 for the original design intent.

## Method

A scratch script started from `tmp/content-fix-2026-10-14/base/061-base.json`. It asserted every "before" value and replaced only the fields listed below. Every other field keeps its value, and key order is preserved. The output uses the base's 2-space formatting plus a trailing newline.

In every prompt only the closing instruction changed. The situation sentences before it are byte-identical. No `cue` text, image `brief`, image `alt`, `sample`, `model`, `title`, `domain`, `table` or timing changed. No media or derived field was added. No new names, organisations or facts were introduced, so nothing needed a web check.

## Changes per item

For prompts, "Before" and "After" show only the closing instruction that was replaced. The English half of each changed criterion mirrors the Dutch.

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| batch016-pensioen | prompt | Reageer op het nieuws. | Reageer op het nieuws: zeg wat u ervan vindt en waarom. Stel ook een vraag over haar plannen of wens haar iets toe. | Cued item. C1 (reason) and C2 (question or wish) were hidden and unannounced. The wording follows batch030-rijexamen. |
| batch016-open-dag | prompt | Sla de uitnodiging af en zeg waarom. | Sla de uitnodiging af en zeg waarom. Bedank hem ook of stel iets anders voor. | Cued item. C2 (thank Hasan or propose something else) was unannounced. Added as batch030-voetbalavond does. |
| batch017-cursusverzoek | prompt | Overtuig haar dat u de cursus ook moet volgen. Noem twee redenen. | Overtuig haar dat u de cursus ook moet volgen. Noem twee redenen en reageer op haar bezwaar. Sluit af met een vraag of een voorstel. | Cued item. C2 (respond to the objection) and C3 (close with a question or proposal) were unannounced. Announced rather than dropped: dropping both would leave two criteria, below the checker's minimum of three, and the sample, quotes and starters are built on four. |
| batch031-verwarming-verhuurder | prompt | Overtuig hem dat de verwarming deze week gerepareerd moet worden. Noem twee redenen. | Overtuig hem dat de verwarming deze week gerepareerd moet worden. Noem twee redenen en reageer op zijn voorstel. Sluit af met een vraag of een eigen voorstel. | Same as cursusverzoek. "Eigen" separates the learner's closing proposal from the landlord's heater proposal, so "voorstel" does not read as the same thing twice. |
| batch017-examentips | prompt | Noem minstens twee tips en leg uit waarom die helpen. | Noem minstens twee tips en leg uit waarom die helpen. Stel hem ook gerust of vertel hoe het bij u ging. | Cued item. C3 (respond to his nerves) was unannounced. Both branches of C3 are named, so a learner who does not know "geruststellen" still has the plain "vertel hoe het bij u ging" route. |
| batch017-examentips | quotes[1] | Ook is het goed om oude examens te maken | Je moet eerst een planning maken voor de twee weken. Elke dag je leert één hoofdstuk, dan is het niet te veel. Ook is het goed om oude examens te maken | C1 asks for at least two tips and the old quote held one. Extended verbatim back to the planning sentence, as the spec suggests, so it shows planning and old exams (and one chapter a day). |
| batch031-sollicitatietips | prompt | Noem minstens twee tips en leg uit waarom die helpen. | Noem minstens twee tips en leg uit waarom die helpen. Stel haar ook gerust of bied hulp aan. | Cued item. C3 (reassure or offer help) was unannounced. |
| batch016-slaapkamerraam | prompt | Stel twee vragen: wanneer het raam wordt gerepareerd en of u de reparatie moet betalen. Gebruik het plaatje. | Zeg kort wat er mis is met het raam. Stel ook twee vragen: wanneer het raam wordt gerepareerd en of u de reparatie moet betalen. Gebruik het plaatje. | Cued item. C2 (explain what is wrong with the window) was unannounced. The spec's example is one sentence; it is split here because the joined version would be 25 words long for the narrator. |
| batch017-glasbak | prompt | Leg haar uit wat de regel is en wat ze het beste kan doen. Noem minstens twee punten. | Leg haar uit wat de regel is en waarom. Zeg ook wat ze nu het beste kan doen en waar ze de volle glasbak kan melden. | Four criteria were graded against "two points". All four are now named: the rule (C0), why (C3), what to do (C1) and where to report (C2). "Noem minstens twee punten" is removed. |
| batch017-glasbak | criteria[2] | Zeg dat en hoe ze de volle glasbak kan melden (bij de gemeente). | Zeg waar of hoe ze de volle glasbak kan melden, bijvoorbeeld bij de gemeente. | The compound "dat en hoe" is loosened, so "Meld het bij de gemeente" meets it. |
| batch031-afvalcontainers | prompt | Leg haar uit welke container ze moet gebruiken en wanneer ze die aan de straat zet. Noem minstens twee punten. | Leg haar uit wat ze moet doen: welke container ze gebruikt en wanneer ze die aan de straat zet. Geef ook een waarschuwing. | C2 (instruction form) and C3 (reason or warning) were not in the prompt. "Wat ze moet doen" announces instructions; C0 and C1 are named; "minstens twee punten" is removed. |
| batch031-afvalcontainers | criteria[1] | Zeg wanneer ze de grijze container aan de straat zet: de avond vóór het legen, dus zondagavond (tweede plaatje). | Zeg wanneer ze de grijze container aan de straat zet: de avond vóór het legen (zondagavond) of maandagochtend vroeg (tweede plaatje). | The common practice "maandagochtend vroeg" was excluded. See doubt 5 about the picture. |
| batch031-brandalarm | prompt | Leg hem uit wat hij moet doen als het alarm gaat. Noem minstens twee punten. | Leg hem uit wat hij eerst moet doen, welke route hij neemt en waar hij buiten naartoe gaat. Geef ook een waarschuwing. | Four criteria were graded against "two points". All four are now named. "Als het alarm gaat" was dropped from this sentence because the situation sentence already says it. |
| batch031-brandalarm | criteria[0] | Zeg wat hij als eerste moet doen als het alarm gaat: meteen stoppen met werken en het gebouw verlaten. | Zeg wat hij als eerste moet doen als het alarm gaat, bijvoorbeeld meteen stoppen met werken of het gebouw verlaten. | The compound is loosened. This also resolves the quote finding: quotes[0] shows stopping work, which now meets C0. |
| batch031-brandalarm | criteria[1] | Zeg welke route hij moet nemen: via de gang en de dichtstbijzijnde trap naar buiten, niet met de lift. | Zeg welke route hij moet nemen, bijvoorbeeld via de gang naar de trap. | Four bundled elements are reduced to the route, so "Neem de trap" now meets it. The lift remains as C3's example ("waarom hij de lift niet mag gebruiken"). |
| batch031-brandalarm | criteria[2] | Zeg waar hij buiten naartoe moet: de verzamelplaats, en dat hij daar wacht. | Zeg waar hij buiten naartoe moet: naar de verzamelplaats (de boom op het plan). | Waiting is dropped from the compound. The plan's tree symbol is named so that "naar de boom" counts for a learner who does not know "verzamelplaats". |
| batch017-fietskeuze | prompt | Noem minstens twee punten uit de tabel. | Noem minstens twee punten uit de tabel en ook een nadeel van uw keuze. | C3 was visible but not in the prompt. |
| batch017-fietskeuze | criteria[3] | Noem ook een nadeel van uw keuze en geef daar een tip voor. | Noem ook een nadeel van uw keuze of een voordeel van de andere fiets. | The compound (drawback and tip) is loosened to the wording the other three table tasks already use. |
| batch017-sportabonnement | prompt | Noem twee redenen. | Noem twee redenen en ook een nadeel van uw keuze. | C2 requires a drawback or an advantage of the other option, so a plain "Vergelijk" comparison failed it. |
| batch031-werktelefoon | prompt | Noem twee redenen. | Noem twee redenen en ook een nadeel van uw keuze. | C3, as sportabonnement C2. |
| batch031-cursus-engels | prompt | Noem minstens twee punten uit de tabel. | Noem minstens twee punten uit de tabel en ook een nadeel van uw keuze. | C3 was visible but not in the prompt. |
| batch017-eerste-schooldag | prompt | Vertel wat er gebeurt en hoe Amina zich voelt. Gebruik alle drie de plaatjes. | Vertel wat er gebeurt, hoe Amina zich voelt en waarom. Gebruik alle drie de plaatjes. | C3 asks "en waarom". The reason was added to the prompt rather than dropped from C3: per the 017 notes, reasons for feelings are what lift the task above the A2 sequence, and the sample quote, model and starter already carry a reason. |
| batch031-taalcafe-avond | prompt | Vertel wat er gebeurt en hoe Karim zich voelt. Gebruik alle drie de plaatjes. | Vertel wat er gebeurt, hoe Karim zich voelt en waarom. Gebruik alle drie de plaatjes. | Same as eerste-schooldag. |

## Every criterion against the prompt

A learner who does what the prompt says now meets every criterion. Hidden criteria (cued items) are mapped to the prompt phrase that announces them:

| Item | C0 | C1 | C2 | C3 |
| --- | --- | --- | --- | --- |
| pensioen | "Reageer op het nieuws: zeg wat u ervan vindt" | "en waarom" | "Stel ook een vraag over haar plannen of wens haar iets toe" | – |
| open-dag | "Sla de uitnodiging af" | "en zeg waarom" | "Bedank hem ook of stel iets anders voor" | – |
| cursusverzoek | "Overtuig haar dat u de cursus ook moet volgen" (situation: "U wilt die cursus graag volgen") | "Noem twee redenen" | "reageer op haar bezwaar" | "Sluit af met een vraag of een voorstel" |
| verwarming-verhuurder | "Overtuig hem dat de verwarming deze week gerepareerd moet worden" | "Noem twee redenen" | "reageer op zijn voorstel" | "Sluit af met een vraag of een eigen voorstel" |
| examentips | "Geef hem advies" | "Noem minstens twee tips" | "leg uit waarom die helpen" | "Stel hem ook gerust of vertel hoe het bij u ging" |
| sollicitatietips | "Geef haar advies" | "Noem minstens twee tips" | "leg uit waarom die helpen" | "Stel haar ook gerust of bied hulp aan" |
| slaapkamerraam | "wanneer het raam wordt gerepareerd" | "of u de reparatie moet betalen" | "Zeg kort wat er mis is met het raam" | – |

Visible criteria now named in the prompt:

- **glasbak:** rule ← "wat de regel is"; what to do ← "wat ze nu het beste kan doen"; report ← "waar ze de volle glasbak kan melden"; reason ← "en waarom".
- **afvalcontainers:** container ← "welke container ze gebruikt"; when ← "wanneer ze die aan de straat zet"; instruction form ← "Leg haar uit wat ze moet doen"; warning ← "Geef ook een waarschuwing".
- **brandalarm:** first action ← "wat hij eerst moet doen"; route ← "welke route hij neemt"; outside ← "waar hij buiten naartoe gaat"; warning ← "Geef ook een waarschuwing".
- **Table tasks:** the drawback criterion ← "en ook een nadeel van uw keuze" (fietskeuze C3, sportabonnement C2, werktelefoon C3, cursus-engels C3).
- **Narrations:** feeling and reason ← "hoe … zich voelt en waarom".

## Samples, quotes and models

**Null quotes.** Each sample still has exactly one `null` quote, at the same position as before:

| Null at | Items |
| --- | --- |
| C0 | slaapkamerraam |
| C1 | pensioen, cursusverzoek, afvalcontainers, werktelefoon, taalcafe-avond |
| C2 | open-dag, verwarming-verhuurder, sollicitatietips, glasbak, brandalarm, fietskeuze, sportabonnement, eerste-schooldag |
| C3 | examentips, cursus-engels |

All other quotes are verbatim substrings of their samples. Under the reworded criteria the samples still miss exactly the same criterion:

- **glasbak:** the sample never mentions reporting, so C2 is unmet.
- **afvalcontainers:** "Zet de grijze container op tijd aan de straat" names no evening or morning, so C1 is unmet.
- **brandalarm:** "Loop dan naar buiten." names no assembly point, so C2 is unmet.
- **fietskeuze:** C3 remains met by "Het nadeel is dat je drie weken moet wachten".

**Models.** No model changed, and each meets every criterion, including the reworded ones:

- glasbak "Meld de volle container ook bij de gemeente".
- afvalcontainers "zet u hem zondagavond aan de straat".
- brandalarm "stop je meteen met werken", "volg de pijlen naar de dichtstbijzijnde trap" and "naar de verzamelplaats bij de boom".
- fietskeuze "Het nadeel is dat je drie weken moet wachten".

Model lengths are 43, 44 and 44 words for the korte tasks (target 25–45) and 58–69 words for the middellange tasks (target 40–70). No prompt sentence occurs in any sample or model; the check was exact and punctuation-insensitive.

## Starters

`content/batches/061-starters.json` has the same values as `tmp/content-fix-2026-10-14/base/061-starters-base.json`: sixteen keys in batch order, one fragment with "…" per criterion. No starter changed. Each starter whose criterion changed was re-read against the new wording, and all still fit:

- **glasbak C2** "U kunt de volle glasbak melden bij …" names the place.
- **afvalcontainers C1** "De grijze container zet u … aan de straat, omdat hij … wordt geleegd." accepts both zondagavond and maandagochtend vroeg.
- **brandalarm:**
  - C0 "Als je het alarm hoort, moet je eerst …" fits.
  - C1 "Loop dan via … naar …, en gebruik niet …" gives the route; its lift clause now serves C3.
  - C2 "Buiten ga je naar …, en daar …" names the place; the optional "en daar …" invites waiting, which is no longer required.
- **fietskeuze C3** "Het nadeel is …, maar je kunt …" gives a drawback; the tip it invites is now optional.

Starters for unchanged criteria were not touched.

## Media consequences

**New prompt audio (`promptAudio`), sixteen clips.** Every prompt changed:

- `B1:speaking:batch016-pensioen:1`
- `B1:speaking:batch016-open-dag:1`
- `B1:speaking:batch017-cursusverzoek:1`
- `B1:speaking:batch031-verwarming-verhuurder:1`
- `B1:speaking:batch017-examentips:1`
- `B1:speaking:batch031-sollicitatietips:1`
- `B1:speaking:batch016-slaapkamerraam:1`
- `B1:speaking:batch017-glasbak:1`
- `B1:speaking:batch031-afvalcontainers:1`
- `B1:speaking:batch031-brandalarm:1`
- `B1:speaking:batch017-fietskeuze:1`
- `B1:speaking:batch017-sportabonnement:1`
- `B1:speaking:batch031-werktelefoon:1`
- `B1:speaking:batch031-cursus-engels:1`
- `B1:speaking:batch017-eerste-schooldag:1`
- `B1:speaking:batch031-taalcafe-avond:1`

**Cue audio (`cueAudio`): none.** All seven cue texts are unchanged and keep their clips: pensioen, open-dag, cursusverzoek, verwarming-verhuurder, examentips, sollicitatietips and slaapkamerraam.

**Illustrations: none.** No image `brief` or `alt` changed.

This batch has no listening scripts and no question audio. Generate the sixteen prompt clips only after the batch passes review.

## Key distribution

Not applicable: sixteen open speaking tasks and no closed questions. The checker reports `Keys: {}`.

## Language figures

Prompt words (before → after), longest prompt sentence after the edit, and model words:

| Item | Type | Prompt words | Longest sentence | Model words |
| --- | --- | --- | --- | --- |
| pensioen | kort, cue | 29 → 48 | 12 | 43 |
| open-dag | kort, cue | 32 → 40 | 12 | 44 |
| cursusverzoek | middellang, cue | 51 → 64 | 14 | 68 |
| verwarming-verhuurder | middellang, cue | 52 → 66 | 15 | 63 |
| examentips | middellang, cue | 45 → 56 | 14 | 69 |
| sollicitatietips | middellang, cue | 50 → 58 | 18 | 62 |
| slaapkamerraam | kort, cue | 43 → 53 | 16 | 44 |
| glasbak | middellang | 55 → 63 | 17 | 68 |
| afvalcontainers | middellang | 61 → 64 | 19 | 59 |
| brandalarm | middellang | 46 → 53 | 18 | 58 |
| fietskeuze | middellang | 57 → 64 | 20 | 68 |
| sportabonnement | middellang | 43 → 50 | 10 | 65 |
| werktelefoon | middellang | 59 → 66 | 14 | 63 |
| cursus-engels | middellang | 63 → 70 | 21 | 63 |
| eerste-schooldag | middellang | 35 → 36 | 13 | 67 |
| taalcafe-avond | middellang | 49 → 50 | 14 | 64 |

The longest sentences (21 in cursus-engels, 20 in fietskeuze) are unchanged situation sentences. Every added instruction sentence has at most 19 words. The longest is the afvalcontainers instruction "Leg haar uit wat ze moet doen: welke container ze gebruikt en wanneer ze die aan de straat zet."; the brandalarm instruction has 18.

## Doubts for the reviewer

1. **Announce or drop (cursusverzoek, verwarming-verhuurder).** I announced C2 and C3, which puts four demands into 30 seconds. The unchanged models (68 and 63 words) show that this fits. The lighter alternative drops C3 in both items, together with quotes[3] and the fourth starter. The prompt then ends after "reageer op haar bezwaar" / "reageer op zijn voorstel", and three criteria remain.
2. **Either/or announcements.** "Bedank hem ook of stel iets anders voor", "Stel hem ook gerust of vertel hoe het bij u ging" and "Stel haar ook gerust of bied hulp aan" mirror the criteria's alternatives. A shorter "Stel hem/haar ook gerust" would also be enough for a learner to meet C3, but "geruststellen" may be unfamiliar at B1.
3. **Overlapping quotes (examentips).** quotes[1] now overlaps quotes[0]: both start with the planning sentence. The validator allows this, and quotes are not highlighted in the app. The non-overlapping alternative is "Elke dag je leert één hoofdstuk, dan is het niet te veel. Ook is het goed om oude examens te maken". It holds two tips only if "one chapter a day" counts as a tip separate from the planning.
4. **brandalarm C0 and quotes[0].** The spec offered "extend or rephrase" for quotes[0]. I loosened C0 to "for example stop working or leave the building", which the spec requires anyway for the compound, so the unchanged quote ("je moet meteen stoppen met werken …") demonstrates C0. Extending the quote to "Loop dan naar buiten." would have spanned the whole sample. C1 no longer requires "niet met de lift"; the lift is C3's example, and "Geef ook een waarschuwing" invites it.
5. **afvalcontainers picture 2.** The brief and the alt ("'s avonds") show the evening, while C1 now also accepts "maandagochtend vroeg", as the spec asks. The drawing (dark-blue sky, lit lamp) also fits an early winter morning, and the criterion names the evening first. I kept the alt because it describes the brief. If the reviewer wants the alt neutral, "Een vrouw zet in het donker een grijze container aan de straat bij een lantaarnpaal." is the option; an alt change needs no new drawing.
6. **sportabonnement model.** The prompt now asks for "een nadeel van uw keuze". The model's C2 sentence ("De Brug is wel vijftien euro goedkoper, …") is the criterion's other branch, an advantage of the other gym. That meets the criterion, so the model was not changed. If the reviewer wants the model to follow the prompt literally: "Zuid is wel vijftien euro duurder, maar bij De Brug kosten de groepslessen extra, dus dat verschil is kleiner dan het lijkt." This is about the same length. werktelefoon already names its drawback directly ("die zeven euro per maand betaal ik graag zelf").
7. **Outside the fix list, unchanged.**
   - The link-to-situation criteria (fietskeuze C2, werktelefoon C2, cursus-engels C2) are announced only by the situation facts, "en waarom" and the visible requirement list.
   - In the fietskeuze sample (null at C2), a lenient judge might read "misschien je kunt zolang een fiets lenen" as linking to Roos's deadline. That sample was reviewed and passed before; I did not change it.
8. **Prompt length.** cursus-engels is now 70 words, and verwarming-verhuurder and werktelefoon are 66, all read by the narrator. The additions are one short sentence or clause each.
9. **"Noem minstens twee punten" removed** from glasbak, afvalcontainers and brandalarm. The blueprint's "advise with at least two points" act is still realised, but these prompts now name their points instead of counting them.

## Files and hashes

- `content/batches/061-original.json`: SHA-256 `a5e178e1e57907b6f14ea6ce65b43a846844646c8f457a77ed4d0268225139d4`
- `content/batches/061-starters.json`: SHA-256 `1ac8735358881fca0623f6737800496ff8dd23509350ae6d0883ed27bb4c041f`

The starters file differs from its base only by the trailing newline.

## Checker output

Command: `npx tsx scripts/batch-check.ts content/batches/061-original.json`

```text
Checked 16 items, 0 questions. Keys: {}. Options: {}.
  info  16 of 16 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
