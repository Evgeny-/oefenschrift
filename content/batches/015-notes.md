# Batch 015: design notes (B1 Schrijven, two deelschrijftaken and two korte schrijftaken)

Batch 015 contains four original B1 writing tasks in two of the three task types of Staatsexamen NT2 Programma I Schrijven, as described in `content/blueprint.md` §4.8: two deelschrijftaken (one form with three line fields and three open questions, one e-mail completion built on three pictures) and two korte schrijftaken (each an e-mail with a printed header, a table that is not part of the e-mail, a stated goal and five or six bullet requirements). Together with the eight zinstaken of batch 014 they make one 8 + 2 + 2 form. Every situation, form question, table, criterion, sample, quote and model was written for this project; official material was read for structure only (task shape, "Geef minimaal twee redenen", "Gebruik alle plaatjes", the sentence that the table is not part of the e-mail).

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction. Feedback follows the official scales in order (adequaatheid 0–3, grammatica 0–2, spelling, samenhang and woordgebruik 0–1); the criteria carry the adequacy elements only.

Conventions used in every item:

- E-mail models are the body only: the header, salutation and closing are printed by the scaffold, so the learner writes what comes between "Hoi Julio," / "Geachte heer, mevrouw," / "Beste mevrouw De Groot," and the closing line. The name under the closing is not scored.
- The form model (avondcursus) gives the three open fields in field order as full sentences, without the labels, as in batch 008; the three line fields (name, date of birth, current work) are invented by the learner and are not criteria.
- Criteria address the learner with "u", as the exam bullets do, also for the informal e-mail; the register of a task is set by the scaffold and the model.
- Every sample fulfils all criteria but one (that quote is `null`) and contains exactly two typical B1 learner errors, listed per task below. Quotes are exact substrings of the sample. Models are correct and complete and use subordinate clauses and signal words (omdat, terwijl, zodat, waardoor, bovendien, ten eerste / ten tweede, daarom).
- No sentence of a prompt occurs in a sample or model (checked by sentence comparison in the author script); the official rule that copied sentences earn nothing is the reason.
- Cast from `config/illustration.json` and blueprint §8: Julio (absent colleague), Sabrina (team lead in all three pictures), Karim (colleague at the meeting), Modibo (new colleague). Invented addressees: Regiocollege Oostwaard, webwinkel Kast & Co, Logistiek Brinkman, mevrouw De Groot.
- Dates were checked for 2026: dinsdag 25 augustus, vrijdag 4 september, woensdag 9 september, donderdag 17 september, vrijdag 18 september. Times are written as the exam writes them (10.00–10.15, 15.30 uur); prices as € 449,00.

## 1. Batch matrix

| # | id (slug) | taskType | goal | Register | Domain | Addressee | Setting | Why not a duplicate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | avondcursus | deelschrijftaak (form) | — | formal (u) | educatie | Regiocollege Oostwaard (inschrijfformulier) | registering for an evening course in bookkeeping: two reasons, prior experience, the evening you cannot come and why | "A course choice" is on the needed list. Existing course items are a cooking course (A2), changing group because of work hours (A2), *cursusfonds* and *deeltijdopleiding* (B1 reading, receptive), *studietijd* (B1 writing, asking the employer for study time). No item registers for a course through a form with reasons and experience. |
| 2 | gemiste-werkdag | deelschrijftaak (pictures) | — | informal (je) | werk | collega Julio | an office-supplies wholesaler: coffee machine repaired, team meeting at the whiteboard, new colleague shown the warehouse; a question to Julio | The only B1 writing task built on pictures. *Werkoverleg* (B1 listening) is receptive; *collega inwerken* (B1 speaking) instructs a new colleague; the A2 picture notes (batch 008) give chores. Narrating a day to an absent colleague is a new act. |
| 3 | kledingkast | korte-schrijftaak (table) | klagen | formal (u) | overig | klantenservice webwinkel Kast & Co | a wardrobe delivered five days late with a damaged door; what you already did; what you want by when; firm request for a reply | "Delivery" and "returns" are on the needed list. *Bezorging* (A2, batch 008) reschedules a washing-machine delivery; *schoenen* (A2) returns shoes; *laptopreparatie* (B1) asks a repairer for a date. A complaint with two problems and a deadline is new; see doubt 2 on the wardrobe object. |
| 4 | pauzerooster | korte-schrijftaak (table) | voorstellen | formal (u) | werk | leidinggevende mevrouw De Groot | a warehouse with three teams; two teams take their breaks at the same time and the canteen (20 seats) is too small; a spread rota; an advantage for the company; a meeting | "Shifts" is on the needed list. *Rooster conflict* (B1 writing) is one worker's shift against a course; *vrijwilligersrooster* (B1 writing) is a stand-in list for volunteers; *dienst ruilen* (B1 reading) is receptive. A proposal to restructure break times for three teams with a table is a different information structure. |

Counts: 2 deelschrijftaken (one form, one pictures), 2 korte schrijftaken (goals klagen and voorstellen). Domains: werk 2, educatie 1, overig 1. Register: 3 formal, 1 informal, as the batch brief prescribed per task; the informal share of the twelve-task form comes from the zinstaken of batch 014 (doubt 1). Criteria: 3, 4, 5, 6. Model lengths: 116, 131, 179, 178 words.

## 2. Per task: how the model meets each criterion, the omitted criterion in the sample, the sample errors

### 1 avondcursus (`B1:writing:batch015-avondcursus:1`)

Form: three line fields (Voor- en achternaam, Geboortedatum, Huidig werk) and three open fields; the criteria are the three open fields. The prompt gives the course, the period and the evening hours so that the third open field ("Wanneer kunt u niet?") has something to refer to.

- Model (116 words, open fields only, in field order): (1) two reasons, marked by "omdat … terwijl …" and "Bovendien …": the learner increasingly has to check the till and invoices at work without training, and wants to open a shop in a few years and keep the books; (2) experience: no course yet, but three years of bookkeeping for the uncle's shop in the home country, and daily till counting and a weekly sales overview now; (3) "Op dinsdagavond kan ik niet, omdat ik dan tot negen uur in de winkel werk", plus availability on the other evenings.
- Sample (72 words) omits criterion 1: it gives one reason only ("omdat ik … de kas en de facturen controleren"), and "Ik wil dat goed leren" is the same reason, not a second one; the label asks for at least two. Errors: "omdat ik moet op mijn werk … controleren" (finite verb not at the end of the omdat-clause) and "voor winkel van mijn oom" (missing article).

### 2 gemiste-werkdag (`B1:writing:batch015-gemiste-werkdag:1`)

Pictures (one three-panel generation, `size: sequence`, Sabrina with her three fixed traits in every panel): (1) a technician kneeling at the open coffee machine in the staff kitchen, Sabrina waiting with an empty cup; (2) Sabrina at a whiteboard with only blocks and arrows (no readable text), four colleagues at the table, Karim raising a hand; (3) Sabrina pointing at a shelf in the warehouse, Modibo with a clipboard. Julio himself is not pictured. Alt texts describe the scenes in Dutch.

- Model (131 words, "je"): (1) "Vanmorgen was het koffieapparaat in de keuken kapot, zodat niemand koffie kon maken. Gelukkig kwam er om tien uur een monteur, die het apparaat binnen een uur heeft gerepareerd."; (2) "Om elf uur hadden we een teamoverleg bij het whiteboard. Sabrina legde uit dat we vanaf november de bestellingen anders gaan inpakken, omdat …" (topic invented, as the criterion asks); (3) "Verder is er een nieuwe collega begonnen: Modibo. Omdat hij in het magazijn gaat werken, heeft Sabrina hem vanmiddag alles laten zien, van de stellingen tot de heftruck."; (4) "Hoe gaat het nu met je? Ik hoop dat je morgen weer beter bent, want …".
- Sample (74 words) omits criterion 4: it describes all three pictures and ends with "Tot snel!" without asking Julio anything. Errors: "gerepareert" (past participle of repareren is gerepareerd) and "Ik denk dat hij is een aardige jongen" (finite verb not at the end of the dat-clause).

### 3 kledingkast (`B1:writing:batch015-kledingkast:1`)

Table (seven key–value rows, caption "Gegevens van uw bestelling bij Kast & Co"): order number 48213, a white three-door wardrobe of 180 cm, € 449,00 with € 29,95 delivery costs, ordered dinsdag 25 augustus, promised uiterlijk vrijdag 4 september, delivered woensdag 9 september, one door damaged (deep scratch and dent). The prompt states the goal (klagen and a solution) and that the table is not part of the e-mail; the learner therefore has to name the article, the dates and the damage in the text.

- Model (179 words, "u"): (1) "Op 25 augustus heb ik bij u een witte kledingkast met drie deuren besteld, bestelnummer 48213."; (2) two problems with "Ten eerste … Ten tweede …": delivered on 9 September, five days late, and one door scratched and dented; (3) invented, as the criterion asks: reported the same day, photos sent, an employee promised an answer within two days, nothing heard; (4) a new door or an exchange within two weeks, plus the € 29,95 delivery costs back, with a reason ("Omdat ik … extra vrij heb moeten nemen"); (5) "Ik ontvang graag uiterlijk vrijdag 18 september een reactie van u. Als ik dan nog niets heb gehoord, annuleer ik de bestelling en wil ik mijn geld terug." (polite "graag", firm consequence).
- Sample (102 words) omits criterion 3: it names the order, both problems, the demand with a deadline and a closing request, but never says what the writer has already done. Errors: "omdat de kast is pas op 9 september bezorgd" (word order after omdat) and "één deur is beschadigt" (past participle beschadigd). The sample's second quote runs from "omdat de kast …" to "… beschadigt" so that both problems fall inside one quote.

### 4 pauzerooster (`B1:writing:batch015-pauzerooster:1`)

Table (caption gives the shift, 07.00–15.30, and the canteen's 20 seats; columns Team, Aantal medewerkers, Koffiepauze, Lunchpauze): team A (12, inpakken) and team B (14, orders verzamelen) both 10.00–10.15 and 12.30–13.00; team C (10, laden en lossen) 10.30–10.45 and 13.00–13.30. The overlap (26 people, 20 seats) is the problem; the prompt names it in two short sentences that neither sample nor model repeats.

- Model (178 words, "u"): (1) "team A en team B precies dezelfde pauzes, waardoor er 26 collega's tegelijk in de kantine zitten, terwijl er maar 20 stoelen zijn"; (2) "Dat is om twee redenen een probleem. Ten eerste … een rij bij de koffieautomaat, zodat een kwartier pauze maar tien minuten rust oplevert. Ten tweede … te laat terug, zodat het werk aan de inpaklijn even stilligt."; (3) a concrete rota with times: A 10.00 and 12.15, B 10.15 and 12.45, C 10.30 and 13.15, each break as long as now, never two teams in the canteen (checked: A 10.00–10.15 / 12.15–12.45, B 10.15–10.30 / 12.45–13.15, C 10.30–10.45 / 13.15–13.45 do not overlap); (4) "Het voordeel voor het bedrijf is dat er geen werktijd meer verloren gaat en dat er geen grotere kantine nodig is."; (5) "Zou u dit met mij willen bespreken, bijvoorbeeld donderdag 17 september om 15.30 uur?"; (6) "Alvast bedankt voor uw tijd; ik hoor graag van u."
- Sample (141 words) omits criterion 4: it gives the problem, two reasons, a rota, a meeting request with a moment and a closing thanks, but no advantage for the company. Its rota is consistent (A unchanged, B 10.15–10.30 and 13.00–13.30, C 10.30 and 13.30). Errors: "omdat er zijn maar twintig stoelen" (word order after omdat) and "tien minuut pauze" (plural minuten).

## 3. Sentence starters (`content/batches/015-starters.json`)

One fragment per criterion, in criteria order, each with an ellipsis, in the register of the task. None is a complete answer; facts (reasons, topics, dates, times, rota) are left to the learner.

| Task | Starters |
| --- | --- |
| avondcursus | Ik wil deze cursus volgen, omdat … Bovendien … / Ik heb al ervaring met boekhouden, want … / Op … kan ik niet, omdat … |
| gemiste-werkdag | Vanmorgen was het koffieapparaat …, maar gelukkig … / Om … uur hadden we een teamoverleg over … / Er is een nieuwe collega begonnen, die … / Laat je even weten hoe het gaat en wanneer …? |
| kledingkast | Op … heb ik bij u … besteld. / Ten eerste …, ten tweede … / Ik heb inmiddels al … / Daarom verwacht ik dat u vóór … … / Ik ontvang graag uiterlijk … een reactie, zodat … |
| pauzerooster | Op dit moment hebben team … en team … tegelijk pauze, waardoor … / Dat is een probleem, omdat … Bovendien … / Mijn voorstel is dat team A …, team B … en team C … / Het voordeel voor het bedrijf is dat … / Zou u hierover met mij willen praten, bijvoorbeeld op …? / Alvast bedankt voor … Ik hoor graag … |

The starters for the two-reason criteria (avondcursus 1, pauzerooster 2) carry "Bovendien …" so that the learner is pushed towards a second reason. The avondcursus starter 2 presupposes some experience; a learner without any can write "Ik heb nog geen ervaring met boekhouden, maar …" instead. The starters are delivered here and not merged into `content/hints/sentence-starters.json` (that changes the overlay hash and needs the focused starter review).

## 4. Doubts for the reviewer

1. **Register split 3 formal / 1 informal.** The batch brief fixed the register per task (form, complaint and proposal are formal by nature; only the e-mail to Julio is informal). The "roughly equal" balance of the brief has to come from batch 014's zinstaken; the coordinator may want to check the twelve-task form as a whole.
2. **kledingkast vs. A2 kast (batch 008).** Both involve a new wardrobe. The A2 task asks a neighbour to help carry it; this task complains to a web shop about late delivery and damage. The object was prescribed by the brief; if the reviewer reads it as a repeat, a bookcase or a dining table with a damaged top swaps in without touching criteria or structure.
3. **Two warehouse settings in one batch (werk).** Picture 3 of gemiste-werkdag shows the wholesaler's warehouse; pauzerooster is set in a logistics warehouse. The acts differ (narrating a day to a colleague vs. proposing a rota to a manager) and the wholesaler task is mainly an office scene, but both use the word magazijn.
4. **gemiste-werkdag criterion 3** says "dat iemand hem het magazijn heeft laten zien"; picture 3 shows Sabrina doing this. A learner who writes "Modibo heeft het magazijn bekeken" or "kreeg een rondleiding" meets the criterion in my reading; the assessor sees only the criterion text, not the picture.
5. **gemiste-werkdag sample error "gerepareert"** is a spelling (d/t) error rather than a grammar error; the official scale tolerates gender errors but not spelling, so it should count. If the reviewer wants two grammar errors, "hij heeft het apparaat gerepareert" can become "hij heeft het apparaat repareren".
6. **avondcursus sample: is "Ik wil dat goed leren" a second reason?** I read it as an elaboration of the one reason (work). If the reviewer reads it as a second reason, the sentence should be dropped so that the null quote stays defensible.
7. **kledingkast criterion 5 ("beleefd maar duidelijk")** is met in the model by a deadline plus a consequence (cancel and refund). Whether the sample's "Kunt u mij uiterlijk vrijdag 18 september laten weten wat u gaat doen?" is "firm" enough is a judgement; I count it as met because it sets a date.
8. **pauzerooster advantage.** An earlier draft used "het magazijn valt nooit stil", which is already true of the current rota (team C works while A and B pause); the model now names lost working time and no need for a bigger canteen. The reviewer may prefer one advantage instead of two.
9. **Prompt wording "De tabel komt niet bij uw e-mail. De tekst moet dus te begrijpen zijn zonder de tabel."** follows the formula quoted in the exam blueprint research note, as the brief asked; it is an instruction, not content. The sibling formula "Gebruik alle plaatjes" likewise.
10. **Form field "Huidig werk (functie en werkgever)"** invites an invented employer name; a learner may write a real brand. It could be reduced to "Huidig werk (functie)".
11. **Model sentence length.** The avondcursus model averages 19 words per sentence (max 25) because each open field is answered in two long sentences with a subordinate clause; still within the B1 "none over 30" rule but the reviewer may find it dense for a form.

## 5. Checker

`npm run batch:check content/batches/015-original.json`:

```
> batch:check
> tsx scripts/batch-check.ts content/batches/015-original.json

Checked 4 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

Author self-checks beyond the script: exactly one `null` quote per task; every quote a verbatim substring of its sample; models 116 / 131 / 179 / 178 words (deelschrijftaak 50–150, korte schrijftaak 120–180); model sentences average 13–19 words, longest 27; no prompt sentence equals a sample or model sentence; one starter per criterion, each with an ellipsis; the two proposed rotas (model and sample of pauzerooster) have no overlapping breaks; dates match the 2026 calendar.

SHA-256 at the time of writing: `015-original.json` `47b937d8d023868f14899b98a45e94ce8f70a8ed6be4a305273657ae2ab61709`; `015-starters.json` `59b9ddb0e31fd4f07da4a2b89faa04d1dccb7897fca3cba996d779945a37e1bc`.

## Coordinator revision after the editorial review (10 September 2026)

Applied from `content/reviews/015-review.md`: avondcursus — form labels "Huidige functie" (no employer name invited) and "Op welke avond van de week kunt u niet? Geef een reden." (as wide as criterion 3), and "Volksuniversiteit Oostwaard" in the prompt (Regio College is a real ROC); gemiste-werkdag — the prompt now asks for the closing question that criterion 4 scores ("Vraag Julio ook hoe het met hem gaat of wanneer hij weer komt werken."), picture 3 shows Sabrina shaking hands with Modibo at the start of the tour (first-day cue) with a matching alt, and the invented meeting topic moved from packing to a new telephone system in sample, quote 2 and model so the two warehouse tasks no longer share their vocabulary; kledingkast — the shop is "Kastenzolder" (klantenservice@kastenzolder.nl; "Kast & Co" is a real Belgian cabinet maker); pauzerooster — the firm is "Logistiek Veldwijk" (b.degroot@logistiekveldwijk.nl; Brinkman Logistiek is a real firm). Criteria and starters unchanged. Lesson for authors: check invented organisation names on the web before use.
