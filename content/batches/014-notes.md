# Batch 014: design notes (B1 Schrijven, eight zinstaken)

Batch 014 contains eight original B1 sentence tasks (`exam: nt2-i`, `part: writing`, `taskType: zinstaak`) in the shape of tasks 1–8 of Staatsexamen NT2 Programma I Schrijven, as pinned in `content/blueprint.md` §4.8 and the "Schrijven I" paragraph of `docs/research/exam-blueprints-2026-09-10.md`: a short e-mail with a printed header, salutation and closing, one gap, and a marking model that names the structure earning the grammar point (adequaatheid 0–1, grammatica 0–1). Every situation, e-mail, criterion, sample, quote, model and starter was written for this project; official material was used for the task shape only. Level labels are authoring targets (`targetLevelValidated: false`); nothing here claims official equivalence or a pass prediction. The sibling batch 015 covers the deelschrijftaken and korte schrijftaken (course application form, picture e-mail to a colleague, complaint to a shop, proposal to a manager); none of those subjects appears here.

Conventions used in every item:

- **The gap is one sentence.** For `hoofdzin` (open) and `vrij` the whole sentence is missing and the prompt reads "Maak de e-mail af. Schrijf één zin op de open plek." For the structures that only a lead-in can force (`bijzin` after "omdat"/"of", `inversie` after "Daarom"/"Misschien", `te-infinitief` after "om", `hoofdzin` after "want") the body prints the lead-in immediately before `___` and the prompt reads "Maak de e-mail af. Maak de zin op de open plek af." This follows the brief's own examples (the gap follows "omdat"; the gap starts with "Morgen"; "Ik probeer ___") and the official description of the task type (a sentence is written or completed inside a given context).
- **`model` and `sample` are exactly what the learner types in the gap.** With a lead-in they are the rest of the sentence (lower-case first letter, no lead-in repeated); the full sentence is lead-in + model. The notes below print the full sentence so the reviewer can read it as prose.
- **Criteria** are the two scoring aspects in the exam's order: adequacy (what the sentence must do, named concretely) and grammar (the target structure with the observable rule, e.g. "persoonsvorm achteraan"). `adequacyNote` repeats the adequacy requirement in one Dutch line for the feedback service, which receives it as `sentence_must` next to `grammar_target` and the gapped body.
- **Samples** miss exactly one criterion (`null` quote) and carry one or two typical B1 learner errors. When the missed criterion is grammar, the error is the one that costs the point (no inversion, main-clause order after a subordinator, "te" outside a separable verb). When the missed criterion is adequacy, the sentence is grammatically correct and its error is one the official scale tolerates in a zinstaak (an article-gender ending or a spelling slip), so the grammar quote can be the whole sentence. Four samples miss grammar (ziekmelding, afscheid, examendatum, groepsverslag), four miss adequacy (vacature, studieadviseur, verjaardag, sportschool).
- **Register** is set by the scaffold: formal "u" with "Beste mevrouw …", "Geachte heer/mevrouw …", "Beste medewerker van …" and "Met vriendelijke groet,"; informal "je/jullie" with "Hoi …," and "Groetjes,". Four of each.
- **Names** follow blueprint §8 and `config/illustration.json`: Karim (colleague), Julio (fellow student), Mila and Farah (friends); mevrouw Bakker (teamleider) and meneer De Vries (hotel manager) from the cast as formal addressees, one woman and one man in charge; mevrouw Yilmaz (studieadviseur) invented. Organisations are invented: Meubelhuis De Linde, Hotel De Zwaan, Drukkerij Van West, ROC Westerhout (the fictional college of batch 011), Cursuscentrum Noord. Dates checked for 2026: vrijdag 30 oktober, donderdag 12 november; 1 november is a contract date.
- No prompt or body sentence is copied into a sample or model; the models paraphrase what the context implies ("laatste dag" → "per 1 november bij een ander bedrijf werken").

## 1. Batch matrix

| # | slug | grammarTarget | lead-in | speech act | domain | register | addressee | why it is not a duplicate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ziekmelding | inversie | "Daarom ___." | consequence | werk | formal | teamleider mevrouw Bakker | Sick leave is on the needed list; no ziekmelding exists in any part. |
| 2 | vacature | bijzin | ", omdat ___." | reason | werk | formal | hotel manager meneer De Vries | A job advertisement is on the needed list; the only related items are the A2 reading ad *magazijn* and the KNM card *sollicitatie* (equal treatment), neither a written application. A2 *contract* asks to stay in a job. |
| 3 | afscheid | hoofdzin | open | announcement | werk | informal | colleagues (team mail) | Leaving a company and announcing it exists nowhere in the bank. |
| 4 | studieadviseur | vrij | open | question / request for a meeting | educatie | formal | studieadviseur mevrouw Yilmaz | A study adviser is on the brief's list; *cursusavond gemist* and *cursuslocatie* (B1 speaking) and *groep* (A2) are about lessons, not doubt about a course choice. |
| 5 | examendatum | bijzin | "of ___?" | indirect question | educatie | formal | examenbureau | An exam is on the brief's list; *toets* (A2 listening) and the deelexamens opinion piece (B1 reading 010) are receptive. |
| 6 | groepsverslag | te-infinitief | "om ___." | consequence (what is blocked) | educatie | informal | fellow student Julio | No group assignment exists; *teamtaak* (B1 speaking) is a work task, *cadeau* (A2) is a class present. |
| 7 | verjaardag | hoofdzin | ", want ___." | apology with a cause | overig | informal | friend Mila | A birthday is on the needed list; the cause (a train breakdown) also touches transport. *Oppassen* and *plant* (A2) ask a friend for a favour. |
| 8 | sportschool | inversie | "Misschien ___?" | proposal | overig | informal | friend Farah | A subscription is on the needed list; A2 *sportles opzeggen* cancels a class and A2 *sportclub* registers a child; here an unused gym subscription leads to a proposal to train together. |

Counts: grammarTarget hoofdzin 2 (one open, one after "want"), bijzin 2 ("omdat", "of"), inversie 2 ("Daarom", "Misschien"), te-infinitief 1, vrij 1. Domains werk 3, educatie 3, overig 2. Register formal 4 (1, 2, 4, 5), informal 4 (3, 6, 7, 8). Speech acts: two reasons (the want/omdat contrast), two consequences (inversie, te-infinitief), two questions (open, indirect), one proposal, one announcement. No setting is shared between two tasks; none of the §9 B1 writing settings (rooster conflict, geluid bibliotheek, buurtfeest, oversteekplaats, studietijd, laptopreparatie, vrijwilligersrooster) or the A2 writing settings is reused, and neighbourhood and volunteering do not occur.

## 2. Per task

### 1 ziekmelding (`B1:writing:batch014-ziekmelding:1`, inversie)

- Body: "Vannacht ben ik ziek geworden en ik heb nog steeds koorts. Daarom ___. Mijn collega Karim weet welke klanten ik vandaag zou bellen. Morgen laat ik u weten of ik weer kan werken."
- Why the structure is forced: the gap sentence opens with the printed adverb "Daarom", so the finite verb must come next (inversion). Why the function is forced: after the fever and before the colleague taking over the calls, the only sentence that fits is the consequence for today's work; the subject line "Ziekmelding" confirms it.
- Model: "Daarom kan ik vandaag helaas niet naar mijn werk komen." (9 typed words) — consequence stated (criterion 1), "kan ik" directly after "Daarom" (criterion 2).
- Sample: "Daarom ik kan vandaag niet naar de werk komen." — adequacy met (whole sample quoted); grammar missed (`null`): no inversion after "Daarom". Second error: "de werk" (het werk; gender, tolerated by the scale).

### 2 vacature (`B1:writing:batch014-vacature:1`, bijzin)

- Body: "Op uw website zag ik de vacature voor receptionist. Ik wil graag op deze functie solliciteren. Deze baan past goed bij mij, omdat ___. Mijn cv stuur ik mee als bijlage. Ik hoor graag of ik op gesprek mag komen."
- Forced: "omdat" requires a subordinate clause with the finite verb at the end; after "Deze baan past goed bij mij" only a reason fits (experience, training or a quality).
- Model: "…, omdat ik drie jaar als receptionist in een hotel in Rotterdam heb gewerkt." (12) — experience as the reason (1), "heb gewerkt" at the end (2).
- Sample: "…, omdat ik de vakature op de website van uw hotel heb gezien." — grammar met (correct bijzin, whole sample quoted); adequacy missed (`null`): having seen the advertisement is not a reason why the job suits the writer. Error: "vakature" (spelling).

### 3 afscheid (`B1:writing:batch014-afscheid:1`, hoofdzin, open gap)

- Body: "Ik heb nieuws en ik wil het jullie zelf vertellen. ___ Ik heb hier veel geleerd en ik zal jullie missen. Op vrijdag 30 oktober trakteer ik op taart in de kantine, want dat is mijn laatste dag."
- Forced: the gap is the announced news itself; "ik zal jullie missen" and "mijn laatste dag" leave only "I am leaving (for another job)". A statement is expected, so the marking structure is a main clause with the verb in second position; a sentence that fronts a time phrase with inversion ("Vanaf 1 november werk ik …") is also a correct hoofdzin and the criterion says so.
- Model: "Ik ga per 1 november bij een ander bedrijf werken." (10) — the news (1), "ga" in second position (2).
- Sample: "Vanaf 1 november ik ga werken bij een andere bedrijf." — adequacy met (whole sample quoted); grammar missed (`null`): after the fronted time phrase the subject precedes the verb ("ik ga"), so the finite verb is in third position. Second error: "een andere bedrijf" (het bedrijf; ending, tolerated).

### 4 studieadviseur (`B1:writing:batch014-studieadviseur:1`, vrij, open gap)

- Body: "Sinds september volg ik de opleiding Logistiek medewerker, maar ik twijfel of deze opleiding bij mij past. Ik wil hier graag met u over praten. ___ Op dinsdag en donderdag ben ik de hele dag op school. Alvast bedankt voor uw antwoord."
- Forced: between "ik wil hier graag met u over praten" and the writer's availability plus "Alvast bedankt voor uw antwoord", the sentence must ask for a meeting or a moment. Either a question ("Heeft u …?", "Wanneer kan ik …?") or a request statement ("Ik wil graag een afspraak maken.") does the job, which is why the target is `vrij`: any correct structure earns the grammar point.
- Model: "Heeft u volgende week een moment vrij voor een gesprek?" (10) — asks for a moment (1); correct question order (2).
- Sample: "Ik denk dat ik liever een opleiding in het zorg wil doen." — grammar met (correct dat-clause, whole sample quoted); adequacy missed (`null`): it states a preference and asks for nothing. Error: "het zorg" (de zorg; gender, tolerated).

### 5 examendatum (`B1:writing:batch014-examendatum:1`, bijzin)

- Body: "Op donderdag 12 november heb ik het examen van mijn cursus Engels, maar op die dag is de bruiloft van mijn zus in Portugal. De vliegtickets heb ik al in mei geboekt. Kunt u mij laten weten of ___? Ik kan elke andere dag in november."
- Forced: "of" introduces an indirect yes/no question, a subordinate clause with the verb at the end; the clash and "Ik kan elke andere dag in november" leave one question: whether the exam can be taken on another day.
- Model: "Kunt u mij laten weten of ik het examen op een andere dag kan maken?" (9) — the alternative-date question (1), "kan maken" at the end (2).
- Sample: "… of ik kan het examen op een ander datum maken?" — adequacy met (whole sample quoted); grammar missed (`null`): main-clause order inside the of-clause. Second error: "een ander datum" (andere; adjective ending).

### 6 groepsverslag (`B1:writing:batch014-groepsverslag:1`, te-infinitief)

- Body: "Ik heb jouw deel van het verslag nog niet ontvangen. Zonder jouw tekst lukt het mij niet om ___. Kun je het uiterlijk donderdag sturen? Vrijdag moeten we namelijk het hele verslag inleveren."
- Forced: "lukt het mij niet om" must be completed by "… te + infinitive"; the content is what cannot be done without Julio's part (finish the report, write a section).
- Model: "… om de inleiding en de conclusie van het verslag te schrijven." (10) — what is blocked (1), "te schrijven" at the end (2).
- Sample: "… om de inleiding te schrijven en het verslag te afmaken." — adequacy met (whole sample quoted); grammar missed (`null`): "te afmaken" instead of "af te maken" (te must stand inside the separable verb). One error only; it is the one that decides the point.

### 7 verjaardag (`B1:writing:batch014-verjaardag:1`, hoofdzin after "want")

- Body: "Sorry dat ik gisteren niet op je verjaardag was. Ik wilde echt komen, maar het lukte niet, want ___. Ik hoop dat je toch een gezellige avond hebt gehad. Zaterdag kom ik langs met je cadeau."
- Forced: "want" is a coordinating conjunction, so the reason keeps main-clause order (the finite verb in second position, after the subject or after a fronted element such as "gisteren"; not at the end as in a bijzin); this is the deliberate counterpart of task 2's "omdat". The apology and "het lukte niet" leave only the cause of the absence.
- Model: "…, want mijn trein stond door een storing twee uur stil bij Utrecht." (11) — a concrete cause (1), "mijn trein stond" in main-clause order (2).
- Sample: "…, want ik wilde heel graag naar de feest komen." — grammar met (correct main clause, whole sample quoted); adequacy missed (`null`): it repeats the wish and gives no cause. Error: "de feest" (het feest; gender, tolerated).

### 8 sportschool (`B1:writing:batch014-sportschool:1`, inversie)

- Body: "Sinds januari heb ik een abonnement bij de sportschool, maar ik ga bijna nooit. In mijn eentje vind ik het saai. Misschien ___? Dan motiveren we elkaar en is het ook nog gezellig."
- Forced: the fronted "Misschien" requires the finite verb next; "Dan motiveren we elkaar" only follows a proposal to train together. The question mark makes it the tentative proposal Dutch speakers write ("Misschien kunnen we …?").
- Model: "Misschien kunnen we twee keer per week samen gaan sporten?" (9) — proposal to go together with a frequency (1), "kunnen we" after "Misschien" (2).
- Sample: "Misschien stop ik gewoon met mijn abonement?" — grammar met (inversion, whole sample quoted); adequacy missed (`null`): cancelling the subscription is not a proposal to sport together and contradicts the next sentence. Error: "abonement" (spelling).

## 3. Sentence starters (`content/batches/014-starters.json`)

Two fragments per task in criteria order (adequacy, grammar), each with an ellipsis, each fitting the gap as it is printed (after the lead-in where there is one) and in the register of the e-mail. None is a complete answer; the facts are left to the learner.

| Task | Starters (fit the gap) |
| --- | --- |
| ziekmelding (after "Daarom") | kan ik vandaag … / blijf ik vandaag … |
| vacature (after "omdat") | ik al … jaar als … werk / ik graag met … werk en … |
| afscheid (open) | Ik ga per … bij … werken. / Vanaf … werk ik … |
| studieadviseur (open) | Heeft u … tijd voor …? / Wanneer kan ik …? |
| examendatum (after "of") | ik het examen … kan … / er … mogelijk is |
| groepsverslag (after "om") | … te schrijven / het verslag … te … |
| verjaardag (after "want") | ik moest … tot … / er was een probleem met … |
| sportschool (after "Misschien") | kunnen we samen … / wil jij … met mij … |

Both starters of a task show the target structure (verb first after "Daarom"/"Misschien", verb last after "omdat"/"of", "te" at the end after "om", subject then finite verb after "want", one of the main-clause orders the revised criterion accepts), so a learner who uses one still has to supply the content that the adequacy criterion checks. The starters are delivered here and not merged into `content/hints/sentence-starters.json`; merging moves the overlay hash and needs the focused starter review.

## 4. Doubts for the reviewer

1. **Lead-in gaps versus "one whole sentence".** Six of the eight gaps sit after a printed lead-in ("Daarom", "omdat", "of", "om", "want", "Misschien"), because a bijzin, an inversion or a te-infinitief cannot be forced by context alone. The brief's own examples use lead-ins, and the official task type includes completing a sentence, but if the coordinator wants every gap to be an unprefixed sentence, only the two `hoofdzin`/`vrij` tasks qualify and the other six need the grammarTarget downgraded to `vrij`.
2. **Two prompt wordings.** "Schrijf één zin op de open plek." for the open gaps and "Maak de zin op de open plek af." for the lead-in gaps. One wording for all would either invite a second capitalised sentence after "Daarom" or misdescribe the open gaps.
3. **"of" as the bijzin marker (examendatum).** An indirect yes/no question is a subordinate clause with the verb at the end and is a common B1 error site, but it is less canonical than "omdat"/"dat"; "Ik hoop dat ___" is the fallback if the reviewer prefers it.
4. **"Misschien ___?" (sportschool).** A question mark after an inverted statement is the natural way to write a tentative proposal, but a learner might read the mark as a request for a subject-verb inversion question ("Wil jij …?") — which also has the verb first and therefore also earns the point. The criterion names the structure, not the sentence type.
5. **Open hoofdzin (afscheid) accepts inversion.** A learner who writes "Vanaf 1 november werk ik …" produces a correct main clause; the criterion is phrased as "persoonsvorm op de tweede plaats" so that the judge does not demand subject-first order.
6. **Illness in ziekmelding.** "Koorts" is the mildest plausible reason for a ziekmelding; the reviewer may prefer no symptom at all ("Ik ben vannacht ziek geworden.").
7. **Adequacy-missed samples carry only tolerated errors** (gender ending or spelling) so that the grammar point stands and exactly one criterion fails, as the brief asks. If the reviewer prefers a scored error in every sample, those four samples would fail both criteria.
8. **ROC Westerhout** repeats the fictional college of batch 011 (reading). Cursuscentrum Noord was invented for the exam task so that the two education e-mails do not go to the same institution.
9. **vacature slug.** The catalogue has `A2:knm:batch006-sollicitatie` (a KNM card on equal treatment); the writing slug was changed from `sollicitatie` to `vacature` to keep the slug unique across parts even though the rule only forbids reuse within a part.
10. **te-infinitief model is a clause of ten words**, not a full sentence; that is inherent to the target after "om". The sample for this task has a single error because "te afmaken" alone decides the point.

## 5. Checker

`npm run batch:check content/batches/014-original.json`:

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

That run predates the integration of batch 009 (A2 speaking), which carries `A2:speaking:batch009-verjaardag:1`; since then the checker adds `warn B1:writing:batch014-verjaardag:1: slug "verjaardag" already used in the catalogue` (cross-part, accepted by the review because blueprint §3 forbids reuse within a part only). The current output is recorded in the revision section below.

Author self-checks beyond the script: exactly one `null` quote per task; both criteria bilingual; bodies of four or five sentences including the gap sentence, 33–46 words; models 9–12 typed words (full sentences 10–13); samples 6–12 words; every quote an exact substring of its sample; two starters per task, each with an ellipsis; dates checked against the 2026 calendar; no sample or model repeats a body sentence.

SHA-256 of `014-original.json` at the time of writing (the bytes the editorial review judged): `80f97b98de381d9936f05405534a33e10b44740dbbf9a598e55d227dbd3823a7`. The hash after the revision is in the section below.

## Revision after the editorial review (10 September 2026)

The editorial review (`content/reviews/014-review.md`, verdict revise) made one required revision request and four recommended edits; all five were applied in one pass, since each moves the source hash, using the reviewer's replacement text verbatim. The optional slug rename (`verjaardag-gemist`) was not applied: the slug, the item id and the starters key stay `batch014-verjaardag`, and `014-starters.json` is unchanged (no criterion was deleted, and the reviewer confirmed that every starter remains valid under the new wording). Four items changed; vacature, studieadviseur, groepsverslag and sportschool are byte-for-byte as reviewed.

**ziekmelding** (`B1:writing:batch014-ziekmelding:1`), fields `criteria[0]` (nl and en) and `adequacyNote` — recommended edit 1. The adequacy criterion now reads "De zin geeft het gevolg van de ziekte: de schrijver komt vandaag niet werken (blijft thuis of meldt zich ziek)." / "The sentence gives the consequence of the illness: the writer is not coming to work today (stays home or reports sick)." and the note "Gevolg noemen: de schrijver komt vandaag niet werken, blijft thuis of meldt zich ziek.", so that the most idiomatic completions, "Daarom meld ik mij vandaag ziek." and "Daarom blijf ik vandaag thuis.", count as adequate without argument; the old criterion named only "kan vandaag niet komen werken" while the note already included "blijft thuis". Sample, quotes, model and the starters ("kan ik vandaag …", "blijf ik vandaag …") are unchanged.

**afscheid** (`B1:writing:batch014-afscheid:1`), field `criteria[1]` (nl and en) — recommended edit 4, cosmetic. The illustrations "na het onderwerp of na een tijdsbepaling" became "na het onderwerp of na een ander zinsdeel vooraan (bijvoorbeeld een tijdsbepaling)" / "after the subject or after another fronted element (for example a time phrase)", so that a fronted clause such as "Omdat ik een nieuwe baan heb, stop ik hier." is visibly covered; the main rule ("op de tweede plaats") already covered it. Nothing else in the item changed.

**examendatum** (`B1:writing:batch014-examendatum:1`), fields `scaffold.subject` and `scaffold.body` — recommended edit 2. The course is Engels instead of Boekhouden: subject "Examen Engels op 12 november", body "… het examen van mijn cursus Engels, maar op die dag is de bruiloft …". Reason: a boekhouden course also carries 015-avondcursus (task 9 of the same Schrijven I form) and the 016-examendatum speaking model. These were the only two mentions of the subject in the item; title, criteria, sample, quotes, model and starters do not name it. One word replaced one word, so the body figures stand (opening sentence 24 words, body length unchanged). The body quote in §2.5 was updated to match.

**verjaardag** (`B1:writing:batch014-verjaardag:1`), fields `criteria[1]` (nl and en) and `title` — required revision request 1 and recommended edit 3. Criterion 2 now states a second-position rule: "De zin is een correcte hoofdzin na 'want': de persoonsvorm staat op de tweede plaats (hoofdzinsvolgorde), niet achteraan zoals in een bijzin." / "The sentence is a correct main clause after 'want': the finite verb is in second position (main-clause order), not at the end as in a subordinate clause." The old wording ("eerst het onderwerp, dan de persoonsvorm") would have failed a correct inverted main clause after "want" ("want gisteren was ik ziek", "want 's avonds moest ik werken") in the learner's self-check and for the feedback judge (rubric 4, 5); the official grammar point for a want-task is a correct hoofdzin, not subject-first order. The title is now "Verjaardag gemist" (the old "Sorry voor de verjaardag" read as an apology for the birthday itself); the slug is not renamed. `adequacyNote`, sample, quotes, model and the starters ("ik moest … tot …", "er was een probleem met …", both subject-first and therefore valid under the new rule) are unchanged. The reasoning in §2.7 and the structure description in §3 above were reworded to match the new criterion.

Checker after the revision, `npm run batch:check content/batches/014-original.json`:

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  warn  B1:writing:batch014-verjaardag:1: slug "verjaardag" already used in the catalogue; make sure the topic differs
1 warning(s), no failures.
```

The same output as the reviewer's run; the warning is the accepted cross-part slug (A2 speaking batch009).

Hashes after the revision:

- `content/batches/014-original.json`: `ea8b929f5b19cf79cf737abff59528d0ab93a4670284db0ef455b4f0bf7ccd04` (was `80f97b98de381d9936f05405534a33e10b44740dbbf9a598e55d227dbd3823a7`)
- `content/batches/014-starters.json`: `e2b2293aca868352291c5e674067d519524c3fed362068f47640d4ef4d285462` (unchanged)
