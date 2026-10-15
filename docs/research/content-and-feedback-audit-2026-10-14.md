# Content and feedback audit, 14 October 2026

A review of all 386 published exercises, the five learner reports in production and the AI feedback that learners received. Sections 1–5 were written read-only; section 6 records what was changed afterwards. Seven independent AI reviewers each read one slice of the catalogue in full (A2 KNM, A2 listening, A2 reading, A2 speaking and writing, B1 listening, B1 reading, B1 speaking and writing); the high-severity claims below were spot-checked against `content/catalogue.json`. Synthetic feedback runs used invented answers and the reviewed `model`/`sample` texts only, never learner text. They cost well under one dollar. Raw cases, results and harnesses are in the ignored folder `tmp/feedback-audit-2026-10-14/`. This is editorial review, not CEFR validation.

## 1. Production reports

| # | Filed (CEST) | Item | Report | State |
| --- | --- | --- | --- | --- |
| 1, 2 | 10 Sep 20:38 | `A2:speaking:batch009-rijbewijs:1` | "wie is Modibo" | Fixed: the prompt now starts "Modibo haalt zijn rijbewijs." (revision changed). |
| 3 | 15 Sep 20:46 | `A2:reading:batch020-tweedehandsfiets:1` | situation about a notice board, text about a dentist | Fixed: Google Translate reconciliation bug; the reading reviewer confirmed that every situation, text and question set belongs together. |
| 4 | 7 Oct 11:09 | `A2:writing:batch008-restaurant:1` | why "zij" when the note is addressed to Roos | Content unchanged (same revision). See 3.4: the criteria are third person, and the placeholder fallback copies them into the suggested answer. |
| 5 | 7 Oct 12:16 | `A2:writing:batch008-meerijden:1` | "I already did what was asked and they said I didn't write it" | **A real feedback defect**, mostly fixed by the switch to Luna 28 minutes later; a smaller residue remains (section 2). |

## 2. Report 5 is a real bug

Timeline from the server journal (UTC) and the anonymous `events` table:

- 08:53–10:32 UTC: one visitor (`cb619269…`) worked through 22 A2 writing tasks in a row with AI feedback.
- 09:38–10:01: eight feedback attempts on `batch008-cadeau` failed with `criteria-count` (the learner saw errors). Deployment at 10:05:50 of `512c239` (rubric-constrained schema) stopped that failure.
- 10:15:47: feedback for `batch008-meerijden` was accepted at the first attempt, with no rejection logged. Model: **`gpt-5.4-nano`** with the pre-`cfc9ca4` prompt.
- 10:16:38: report 5 filed. 10:44:59: deployment of `cfc9ca4` (GPT-6 Luna).

Reproduction with 12 invented A2 answers (10 complete, 2 controls each missing one point), using the exact code and prompt of `512c239`:

| Setup | Correct decision vectors |
| --- | ---: |
| nano + prompt at report time | 1 / 12 |
| Luna + current prompt (1 run) | 10 / 12 |
| Luna + current prompt (3 runs) | 29 / 36 |

Nano rejected "Mag ik met jou meerijden?" as not asking Fatima for a ride in 9 of 10 complete answers ("you don't mention Fatima"), and also failed the pick-up and return-favour criteria. That matches the complaint exactly.

What remains on Luna:

- "Volgende week rijdt de bus niet." fails "Schrijf waarom u volgende week niet met de bus kunt" in about two of three runs ("you say the bus is not running, but not why"). Medium reasoning effort fails it in all three runs, so this is criterion wording, not reasoning depth.
- An address in a separate sentence ("Ik woon in de Kerkstraat 12. Kom je om 8 uur?") fails "waar en hoe laat Fatima u kan ophalen" (3/3 in one session, 0/1 in another).
- Rewording alone moved the false negatives rather than removing them: "…niet met de bus kunt, omdat de bus niet rijdt" rejected "De bus rijdt niet" as not saying *you* cannot take it; "Schrijf dat de bus volgende week niet rijdt" rejected "Ik kan niet met de bus. De weg is kapot." The judge reads every criterion literally. A durable fix needs either criteria that name the communicative goal with examples ("…waarom u niet met de bus kunt, bijvoorbeeld: de bus rijdt niet") or a prompt rule that a natural answer conveying the same communicative content meets the criterion; both need a bounded evaluation before release.

## 3. Feedback defects that affect learners now

### 3.1 B1 sentence gaps (zinstaak): correct sentences are marked as grammar errors

All 27 reviewed `model` completions are correct when inserted after the printed lead-in (B1 writing reviewer, confirmed). Luna with `reasoning.effort: "none"` still marks the grammar criterion unmet:

- Inversion after a printed fronted word (`Misschien ___`, `Daarom ___`, `Helaas ___`, `Anders ___`, `Die dag ___`, `Volgens het huurcontract ___`): **19 of 21 runs** of the seven reference completions failed. The explanations are false: "here 'u' comes before 'moet'" for "moet u de borg … terugbetalen".
- Also intermittently: `batch038-certificaat` ("ik … kan verwachten" after wanneer), `batch028-werkschoenen` (main clause after maar), `batch014-groepsverslag`, `batch038-receptie`, and the content criterion of `batch003-reparatie`.
- Overall: 26 of 81 runs on reference answers were wrong.
- Learner samples with correct grammar but wrong content (`rooster`, `sportschool`, `laptop`) also got a false grammar failure.

Production evidence: on 7 October, after the Luna switch, one visitor submitted `B1:writing:batch002-geluid:1` (an inversion gap) four times in a little over two minutes. It is the most-retried item since the switch.

Variants tested on the 27 references plus 11 wrong-order controls, two runs each (54 reference runs, 22 control runs):

| Variant | Reference answers marked wrong | Wrong-order controls caught on grammar | Median latency | Est. cost per call |
| --- | ---: | ---: | ---: | ---: |
| current (`none`) | 16 / 54 | 22 / 22 | 2.7 s | $0.00026 |
| `low` for zinstaak | 4 / 54 | 22 / 22 | 3.4 s | $0.00029 |
| printed words before the gap in the task JSON | 4 / 54 | 20 / 22 (accepted wrong order twice) | — | — |
| second user message with the assembled sentence | 6 / 54 | 22 / 22 | — | — |
| `low` + assembled sentence | 3 / 54 | 22 / 22 | — | — |
| **`medium` for zinstaak** | **0 / 54** | **22 / 22** | **3.8 s** | **$0.00033** |

The only remaining mismatches with `medium` were one constructed control whose content judgment is debatable. **Recommendation:** use `reasoning.effort: "medium"` for two-criterion `zinstaak` requests only, keep `none` elsewhere, bump `feedbackVersion`, and add offline regressions that pin the per-task effort. This is a bounded synthetic result (27 items, two runs), not a guarantee.

### 3.2 Picture tasks: the judge never sees what the pictures show

`requestJudgment` sends the prompt, criteria, table and form labels, but not `images`. For "Vertel wat Karim op het tweede plaatje doet" the model has to guess which sentence belongs to which picture. In `batch009-vakantie` a sample that skips picture 1 was graded as describing pictures 1 and 2 and **missing picture 3**, which it does describe.

Adding `pictures: [{number, shows: alt}]` to the developer message cut sample/judge disagreements on the 76 picture items from 17 to 5 of 152 runs. All 76 model answers passed in both runs, apart from one unparseable response. The remaining five are sample/quote design questions (3.5). **Recommendation:** pass the Dutch `alt` texts (not the generation `brief`) for every item with images.

### 3.3 Hidden requirements in cued and picture tasks

`OpenExercise.tsx:291` hides the criteria until review for `picture-note`, `zinstaak`, any item with a `cue`, and `deelschrijftaak` with images. Criteria in those items that the prompt does not ask for are graded but never announced:

- **A2 video answers:** in 12 of the 15 cued A2 speaking tasks the third criterion is "Geef nog een detail, bijvoorbeeld …", while the prompt only says "Geef antwoord." This applies to batch009-ochtenddienst, -thuis-oefenen, -nieuwe-buurvrouw, -slaap, -abonnement and -bushalte; batch026-lunchpauze, -woorden-leren and -huisarts-afspraak; and batch027-ziekmelden, -taalcafe-oefenen and -cursuskeuze. The older buurvrouw, te-laat and monteur items name the extra detail in the prompt. Fix: one prompt sentence per item, then regenerate the prompt audio.
- **B1 speaking:**
  - batch016-pensioen: the prompt says only "Reageer op het nieuws", but the criteria add a reason and a question or wish.
  - batch016-open-dag: thank Hasan or propose something else.
  - batch017-cursusverzoek and batch031-verwarming-verhuurder: react to the objection, and close with a question or proposal.
  - batch017-examentips and batch031-sollicitatietips: reassure.
  - batch016-slaapkamerraam: explain what is wrong with the window.
- **B1 writing:**
  - batch015-gemiste-werkdag C1 asks for the meeting topic.
  - The same item's C2 bundles "new colleague" with "someone showed him the warehouse", which the picture alt does not establish.
  - batch029-kustweekend C2 asks that "de zon weer scheen".

### 3.4 Placeholder fallback copies criterion wording into the suggested answer

When a suggestion has fewer placeholders than missing points, `validateFeedback` falls back to `withPlaceholders(answer, item.criteria[i][0])`. The learner then sees "[Schrijf dat zij de ramen moet schoonmaken.]" inside "Een mogelijk antwoord". For third-person criteria (restaurant: "Schrijf dat zij…", supermarkt: "Schrijf dat hij…") the suggested note to Roos then reads "zij moet…". This is the most likely origin of report 4. Either rewrite those criteria as requests ("Vraag Roos om de tafels te dekken"), or use short placeholder labels instead of the criterion sentence.

### 3.5 Compound or over-strict criteria

- **meerijden:** see section 2.
- **A2:writing:batch008-sportclub:1:** the form asks "Heeft uw kind deze sport eerder gedaan? Waar?" and the criterion asks "…en waar", so "Nee, nog nooit" cannot pass. Fix: "Zo ja, waar?"
- **A2:writing:batch008-kast:1:** "op welke dag en hoe laat u wilt dragen" is unnatural. Fix: "…Karim kan komen helpen".
- **B1 middellang with "Noem minstens twee punten" but four criteria:** batch017-glasbak, batch031-afvalcontainers and batch031-brandalarm (several compound clauses).
- **batch031-afvalcontainers:** "zondagavond" excludes the common "maandagochtend vroeg".
- **Drawback requirements:**
  - batch017-sportabonnement and batch031-werktelefoon demand a drawback.
  - batch017-fietskeuze C3 asks for a drawback and a tip.
  - batch015-avondcursus C1 requires earlier bookkeeping experience, although the course is for beginners.
- **"en waarom" asked by criteria only:** batch017-eerste-schooldag and batch031-taalcafe-avond.

### 3.6 Samples whose quotes disagree with the criteria

Samples are deliberately imperfect, but their `quotes` should match what a fair judge decides.

- **batch008-bezorging:** quote 1 counts "donderdag 15 oktober" as day *and* time, but no time is given. Its dates are also now in the past.
- **batch009-flat-dorp, batch026-online-winkel, batch027-contant-pinnen:** the choice is marked missing while the reason and "the other picture" are marked met. The judge reads "Online is makkelijk…" as a choice.
- **batch009-kleermaker:** quote 0 describes a state, not an action, and the model has Hasan paying, which no picture shows.
- **batch008-huur:** quote 1 omits the actual reason (the move).
- **B1 batch017-examentips:** quote 1 holds one tip, but the criterion requires two.
- **B1 batch031-brandalarm:** quote 0 misses "het gebouw verlaten".

### 3.7 Tooling

- **`scripts/evaluate-feedback.ts`:** seven cases expect criterion counts that the catalogue no longer has. `batch002-geluid`, `batch002-rooster` and `batch003-reparatie` are now two-criterion zinstaken; `A2:writing:afspraak` has four criteria. The script cannot serve as a regression set until its cases are updated.
- **Hidden-criteria check:** no automated check flags criteria hidden at answer time that the prompt does not mention. A `batch:check` rule could compare them.

## 4. Content defects (closed items)

No reviewer found a wrong answer key. All evidence quotes are verbatim. KNM facts checked against current sources were all correct as of 14 October 2026: eigen risico €385, fireworks ban from 1 August 2026, naturalisation rules, voting ID, leerplicht/kwalificatieplicht, 112 and Juridisch Loket.

### Medium

**A2 reading**
- **batch004-telefoon:** "Andere reparaties nemen wij op zaterdag wel aan. U kunt de telefoon dan op maandag ophalen." contradicts the price list (oplaadaansluiting 2 days, waterschade 3 days). The q2 explanation repeats it.
- **batch001-pakketpunt:** "We hebben uw pakket dinsdag bij u thuis gebracht, maar u was niet thuis." should be "We wilden uw pakket … bezorgen".
- **batch021-terugbrengen, q2A:** "het prijskaartje zit er nog aan de zwembroek" doubles the object. The q1 prompt does not state that the price tag is still on, although the rule requires it.

**A2 listening**
- **batch023-spoor:** "De sprinter naar Leiden … rijdt vandaag niet verder dan Leiden". Make it the sprinter to Den Haag. The q3 prompt switches from Farah to Sem.
- **batch023-bloedonderzoek, q2A:** "Naar de praktijk komen" is offered in the script as a valid route.
- **batch005-voetbal, q2:** "Wat moet er zeker in de tas?" is keyed to a shirt Amina must *wear*.
- **batch022-paspoort-klaar:** the q3 explanation "Een afspraak is nooit nodig" is too broad.
- **batch001-markt:** waiting under a stall roof in a storm while the stalls are being cleared is implausible.
- **Four-option keys:** D is keyed in 15 of 32 four-option questions and A in only 2.

**A2 KNM**
- **batch006-eigenrisico:** option C is not ruled out by the card and is not universally false.
- **batch033-schoolvakantie, C:** "zij" is ambiguous between Amina and Fatima.
- **batch032-direct-nee:** the prompt never says what was asked, and options A/B don't answer "Welk Nederlands gebruik".
- **batch019-scholing:** the card restates Julio's case instead of the rule.
- **batch006-stroomstoring:** "112 is alleen voor levensgevaar" is too narrow; it also covers fire and crime in progress.

**B1 reading**
- **batch021-bewonersvergunning, q4:** "In beide gevallen" leaves moving to another zone open.
- **batch010-ploegendienst, q4:** "Keurt Farah deze ruil goed?" assumes an approval step that the text abolished.
- **batch024-gratis-zwemles:**
  - q5C is partly supported by "die keuze terug te draaien".
  - The q6 key relies on the planted label "Dit stuk is een waarschuwing" in a `persuasief` text.
- **batch011-verlofregeling, q2C:** a near-paraphrase of the evidence.
- **batch002-cursusfonds:** "Ga er niet vanuit" should be "Ga er niet van uit".

**B1 listening**
- **batch036-afvalbeleid:** the speaker label "Presentator" should be "Medewerker" (intro and questions say gemeente employee).
- **batch037-hovenier:** forty years at the office in q1, thirty in q7.

### Low (selection)

**A2 reading**
- "omhoog gaat" → "omhooggaat" (batch004-ramen).
- "het eerste doen" → "eerst" (batch004-verwarming).
- The family card at €24 is cheaper than two adults at €12.50 (batch021-gezinskaart).

**A2 listening**
- Digits in scripts against blueprint 4.2 (batch005-scherm, -feestje, -bus, -computercursus).
- "De kassa's krijgen … een nieuwe vloer".
- "dit jaar" for a prescription that runs a year (batch023-herhaalmedicijn).
- A car key on the table while the car is at the garage (batch022-garage).

**KNM**
- Kinderopvangtoeslag prompt wording.
- The bezwaar evidence omits "binnen zes weken".
- The huisartsenpost alt says 's avonds against the prompt's 's nachts.
- The Jeugdfonds wording overstates it.
- Near-duplicate directness items (batch006-directheid, batch032-direct-nee, batch032-direct-betekenis).

**B1 reading**
- Unnatural collocations: "een rekening aangaan", "in een zwembad vooruitkomen".
- batch010-deelexamens: "één examen aan het einde van het jaar".
- Ambiguous "laat invullen" (batch034-zelfroosteren).
- Explanations claiming facts not in the text (ploegendienst q2, mediatheek q3).
- "Jari Postma" is reused for two different people.
- Purpose options mix two formats.

**B1 listening**
- "hun" → "hen" (hovenier).
- "van binnen" → "vanbinnen" (bouwplaats).
- "beschadigde pallet" → "pallet met beschadigde dozen" (functioneringsgesprek).
- "vóór vijftien december" → "uiterlijk" (logistiek).
- The mantelzorg q6 explanation ignores distractor A.
- TTS spellings "W-M-O" and "m-b-o" appear in printed transcripts.

**A2 speaking and writing**
- Model answers over the blueprint length: reizen, gezond, boodschappen, restaurant and supermarkt.
- Models use character names the learner never sees: fiets-lopen, bakkerij, keuken, gemiste-werkdag.
- The rijbewijs pictures show the licence handed over at the test.
- lantaarnpaal fixes a date the prompt doesn't give.

**B1 writing**
- batch002-rooster prompt: "in de open plek" should be "op de open plek".
- batch003-reparatie model: "mij … een tijdelijke laptop te lenen" uses lenen as lend, which the judge read as no solution in 5 of 18 runs across variants. Use "uit te lenen" or "een leenlaptop te geven".
- batch029-kustweekend model has an internal contradiction about the fietsenmaker.

## 5. Suggested order

1. Feedback code: `medium` effort for zinstaak (3.1) and picture descriptions in the task (3.2), with offline regressions and a bounded live check. Both are small changes in `server/services.ts`.
2. One reviewed content batch with the hidden-requirement prompts (3.3), compound and third-person criteria (2, 3.4, 3.5), sample quotes (3.6) and the medium content defects (4). Regenerate prompt audio only for the changed A2 cued prompts and the listening scripts that change.
3. Low items in a later sweep; refresh `scripts/evaluate-feedback.ts`.

## 6. Applied on 14–15 October 2026

### Feedback

- **Sentence gaps:** `zinstaak` requests use `reasoning.effort: "medium"` and a 4,000-token ceiling; every other task keeps `none` and 1,800 tokens. The instructions add that inside the final verb group of a bijzin either order is correct ("heb gewerkt" and "gewerkt heb"). On the zinstaak set (27 references and 11 wrong-order controls, two runs each) the judgment matched in 76 of 76 runs.
- **Pictures:** the developer message lists `pictures: [{number, description}]` from the Dutch `alt` texts. The English briefs stay out, because they name people the learner never sees. A PICTURES paragraph tells the judge to use them only to recognise which picture a sentence describes. On the 76 picture items, 149 of 152 runs matched the reviewed quotes (135 before); the remaining three were sample designs, fixed in batch 059.
- **Not changed:** passing the character's spoken cue to the judge was tested on the 38 cued items (two runs each, model and sample). Wrong decisions were 3 of 472 without the cue and 5 of 472 with it, so the judge input stays as it was.
- `feedbackVersion` changed, so cached judgments are not reused. `tests/feedback-contract.test.ts` pins the effort, token ceiling and picture list for every published open task; `scripts/evaluate-feedback.ts` cases match the current rubrics and passed 12 of 12 on paid runs.

### Content

Nine replacement batches, each written by one AI author and checked by a separate AI reviewer, adopted by hash and integrated. 99 exercises have new revisions, so saved progress on them restarts.

| Batch | Part | Items | Reviewer edits |
| --- | --- | ---: | --- |
| 053 | A2 reading | 8 | none |
| 054 | B1 reading | 8 | cursusfonds q1 option C and explanation; deelexamens "geen half jaar" |
| 055 | A2 KNM | 9 | eigenrisico C, schoolvakantie prompt and A, direct-nee B, huisartsenpost key and evidence; every cited source reopened; keys 3/3/3 |
| 056 | A2 listening | 12 | two explanations; four-option D keys across the catalogue went from 15 of 32 to 7 of 31 |
| 057 | B1 listening | 7 | two explanations |
| 058 | A2 writing | 11 | none (meerijden and restaurant criteria chosen with judge runs, section 2) |
| 059 | A2 speaking | 22 | five samples or quotes; the 12 cued prompts now announce their third requirement |
| 060 | B1 writing | 6 | none |
| 061 | B1 speaking | 16 | cursusverzoek and verwarming-verhuurder lost the "sluit af met een vraag" criterion |

After integration, the 55 changed open tasks were judged twice each with the production setup: every model answer met all its criteria, and 7 of 220 sample runs differed from their quotes, all in the lenient direction (fietskeuze, sportabonnement, werktelefoon, avondcursus). Samples and quotes are authoring calibration and are not shown to learners.

### Audio

44 clips with changed text were regenerated with the transcription round trip: 6 KNM questions, 6 A2 listening clips, 3 B1 listening clips, 13 A2 and 16 B1 speaking prompts. The ElevenLabs key is on the Creator tier, which refuses 44.1 kHz PCM, so new clips come from 24 kHz source audio. `scripts/audio.ts` used to treat every 44.1 kHz clip as stale on such a key, because the sample rate is part of the file token; it now reuses a clip whose script, voices and settings are unchanged at either rate. An earlier run without that fix synthesised about 15,000 characters of unchanged clips before it was stopped; nothing from it was recorded.

### Left for later

- The low-severity items of section 4 that the batches did not touch.
- `B1:speaking:batch017-machinestoring:1`: the visible criterion "Geef een reden of een waarschuwing" is not announced in the prompt.
- A2 listening: the bloedonderzoek q1 prompt presupposes the q2 answer; drill set a2-listening-03 has key A in 5 of 12 questions; spoor and trein are near-duplicate announcements.
- KNM rechecks: kinderopvangtoeslag (replacement planned for 2029), Jeugdfonds conditions (yearly), scholing (BW 7:611a changes on 1 January 2028).
- Unreferenced media files were not pruned.
