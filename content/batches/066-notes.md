# Batch 066 author notes

Authorised replacement of fifteen published B1 speaking tasks (19 October 2026).

On 19 October 2026 learner report 6 against `A2:speaking:batch001-apotheek:1` showed a prompt that gives away the answer and asks a meaningless question. The project owner confirmed the report and asked for every similar exercise to be checked. The B1 speaking audit (`tmp/content-fix-2026-10-19/audit/b1-speaking.md`) found two high and six medium defects, plus low-priority notes. The coordinator accepted fifteen fixes in `tmp/content-fix-2026-10-19/spec/066.md`, and these records apply them.

The app now plays a spoken cue as the main player ("Luister naar <speaker>"). For cued items, `app/components/OpenExercise.tsx` (around line 300) hides the criteria and starters until review. For the seven items without a cue, the criteria, the starters (on request) and the title are visible while the learner answers.

The review JSON must list all fifteen IDs in `replaces`. They are given here in batch order (the base order), and their IDs and set membership are unchanged:

1. `B1:speaking:batch016-slaapkamerraam:1`
2. `B1:speaking:batch031-portemonnee-tram:1`
3. `B1:speaking:batch017-trein-gemist:1`
4. `B1:speaking:batch002-teamtaak:1`
5. `B1:speaking:batch003-werkdruk:1`
6. `B1:speaking:batch002-cursusgemist:1`
7. `B1:speaking:batch003-inwerken:1`
8. `B1:speaking:batch003-cursuslocatie:1`
9. `B1:speaking:batch017-fietskeuze:1`
10. `B1:speaking:batch031-cursus-engels:1`
11. `B1:speaking:batch016-pensioen:1`
12. `B1:speaking:batch030-rijexamen:1`
13. `B1:speaking:batch030-uitlaat:1`
14. `B1:speaking:batch016-medicijn-school:1`
15. `B1:speaking:batch017-machinestoring:1`

Every record is a complete exercise with `status: "draft"` and `targetLevelValidated: false`. This is AI editorial work. It does not validate CEFR difficulty or establish exam equivalence.

## Sources read

- `AGENTS.md`, plus `docs/briefs/author.md`, including the shared record contract and the rewrite rule.
- `content/blueprint.md` §1, §3, §4.9, §6, §7, §8 and §10, plus `content/reviews/rubric.md`.
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters".
- `tmp/content-fix-2026-10-19/spec/common.md`, `spec/066.md` and `audit/b1-speaking.md`.
- The format examples `content/batches/061-*` and `062-*`.
- `app/components/OpenExercise.tsx` around lines 290–315, which control what is visible before answering.
- The pictures of slaapkamerraam, portemonnee-tram, trein-gemist and machinestoring (`public/images/…` per `content/catalogue.json`).

## Method

A scratch script started from `tmp/content-fix-2026-10-19/base/066-base.json` and `066-starters-base.json`. For every field it changed, it asserted the exact "before" value and replaced only that field. It then set `status` to `"draft"` on all fifteen records. Key order and item order are preserved. The output is 2-space JSON with a trailing newline.

A field-by-field comparison with the base confirmed that only the fields in the table below and `status` differ. No `cue` text, image `brief`, `sample`, `quotes`, `model`, `table`, `domain` or timing changed. No media or derived field was added. No new names, organisations or facts were introduced.

## Changes per item

"Before" and "After" are the full field values, except for long prompts, where only the changed sentence is shown. The English half of each changed criterion mirrors the Dutch.

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| 1 slaapkamerraam | prompt | Het raam van uw slaapkamer gaat sinds gisteren niet meer goed dicht. | Sinds gisteren is er een probleem met het raam van uw slaapkamer. | High giveaway. The situation spoke the answer to C2 ("Zeg kort wat er mis is met het raam"); the picture now carries it. Audit wording. |
| 1 slaapkamerraam | title | Het raam gaat niet dicht | Een probleem met het raam | The heading also gave the answer away. |
| 1 slaapkamerraam | images[0].alt | Een raam in een slaapkamer staat op een kier; de hendel hangt los naar beneden. | Een raam in een slaapkamer staat op een kier, terwijl de hendel naar beneden wijst. | Spec item 1 / audit note 10. I looked at the drawing: the casement stands ajar with a narrow gap, so "op een kier" is right, and the handle is an ordinary handle, firmly attached, pointing down. Nothing shows that it "hangt los", so the alt misdescribed the picture. The new alt says what is visible. It also keeps the defect legible for the judge: handle down (the closed position) while the window is ajar. The brief is unchanged. |
| 2 portemonnee-tram | prompt | Uw vriendin Roos is vorige week in de tram haar portemonnee kwijtgeraakt, maar ze heeft hem teruggekregen. … Vertel wat er gebeurde, hoe Roos zich voelde en hoe ze haar portemonnee terugkreeg. | Uw vriendin Roos had vorige week pech. … Vertel wat er gebeurde, hoe Roos zich voelde en hoe alles weer goed kwam. | High giveaway. The situation narrated picture 1 and the ending. Audit wording, in the form of the sister item trein-gemist ("onderweg ging er iets mis"). |
| 2 portemonnee-tram | criteria[1] | Vertel hoe Roos merkte dat haar portemonnee weg was (tweede plaatje). | Vertel wat Roos bij de bakker merkte (tweede plaatje). / Say what Roos noticed at the bakery (second picture). | The criteria are visible (no cue) and named the lost wallet. Audit wording. |
| 2 portemonnee-tram | criteria[2] | Vertel hoe ze haar portemonnee terugkreeg (derde plaatje). | Vertel hoe het afliep (derde plaatje). / Say how it ended (third picture). | Named the ending. Audit wording; it matches trein-gemist C2 ("hoe het … afliep"). |
| 2 portemonnee-tram | criteria[3] | Zeg hoe Roos zich voelde toen ze haar portemonnee miste, bijvoorbeeld geschrokken of in paniek. | Zeg hoe Roos zich voelde bij de bakker, bijvoorbeeld geschrokken of in paniek. / Say how Roos felt at the bakery, for example shocked or in a panic. | Named the wallet. I deviated from the audit's "toen ze het merkte": as a stand-alone checklist line, "het" has no antecedent. "bij de bakker" ties the feeling to the same moment and parallels the new trein-gemist C3 ("op het station"). |
| 2 portemonnee-tram | title | Portemonnee kwijt in de tram | Roos heeft pech | The heading named the event. Audit wording. |
| 3 trein-gemist | title | Trein gemist, toch op het gesprek | Op weg naar een sollicitatiegesprek | The heading gave away picture 1 (C0) and the ending. Audit wording. |
| 3 trein-gemist | criteria[3] | Zeg hoe Modibo zich voelde toen de trein wegreed, bijvoorbeeld geschrokken of zenuwachtig. | Zeg hoe Modibo zich voelde op het station, bijvoorbeeld geschrokken of zenuwachtig. / Say how Modibo felt at the station, for example shocked or nervous. | The visible C3 handed over the key phrase for C0. Audit wording. |
| 4 teamtaak | prompt | U organiseert een informatieavond en hebt de zaal geboekt en de uitnodigingen verstuurd; u hoort eerst uw collega. Noem het afgeronde werk, vraag uw collega één andere taak over te nemen en stel een dag voor om de voortgang te bespreken. | U organiseert een informatieavond en hebt al twee dingen geregeld. U hoort eerst uw collega. Vertel wat u al hebt geregeld. Vraag uw collega om een taak over te nemen en zeg welke taak dat is. Stel ook een dag voor om de voortgang te bespreken. | C0 scored only reading the situation back. The hidden C1 ("één concrete … taak; bedenk die zelf") was not announced. The semicolon sentence is split. Audit wording. |
| 4 teamtaak | criteria[0] | Noem de twee taken die u al hebt afgerond. | Noem twee dingen die u al hebt geregeld; bedenk die zelf. / Name two things you have already arranged; invent them yourself. | The learner now invents the two things. The wording follows the prompt and the cue ("Wat heb je al geregeld"). |
| 5 werkdruk | prompt | U moet vrijdag een rapport en een planning inleveren, maar u hebt te weinig tijd; u hoort eerst uw leidinggevende. Noem beide taken, … | Voor vrijdag moet u twee taken afmaken, maar u hebt te weinig tijd. U hoort eerst uw leidinggevende. Zeg welke twee taken het zijn, … | C0 scored only repeating two nouns from the situation. The semicolon sentence is split. Audit wording. The rest of the instruction is unchanged. |
| 5 werkdruk | criteria[0] | Noem beide taken die vrijdag klaar moeten zijn. | Noem de twee taken die vrijdag klaar moeten zijn; bedenk die zelf. / Name the two tasks that must be finished on Friday; invent them yourself. | C0 now asks for invention, like C1. |
| 6 cursusgemist | prompt | U hebt gisteren door ziekte een cursusavond gemist; u hoort eerst uw medecursist. Leg uit waarom u afwezig was, … | U hebt gisteren een cursusavond gemist. U hoort eerst uw medecursist. Leg uit waarom u er niet was, … | "door ziekte" supplied the whole answer to C0. The semicolon sentence is split. "er niet was" is plainer than "afwezig". Audit wording. |
| 7 inwerken | prompt | Een nieuwe collega maakt fouten doordat iedereen andere uitleg geeft; bekijk de tabel. Geef één advies over de begeleider en één over het vastleggen van de werkwijze, en beschrijf hoe u later controleert of dit helpt. | Een nieuwe collega maakt fouten, omdat iedereen het werk anders uitlegt. Uw leidinggevende vraagt u om advies. Bekijk de tabel. Geef één advies over wie de nieuwe collega begeleidt en één advies over het opschrijven van de werkwijze. Vertel ook hoe u later controleert of het helpt. | The prompt now names who asks for the advice, uses plain wording, splits the semicolon sentence and uses short sentences. Audit wording. |
| 7 inwerken | criteria[1] | Geef één concreet advies over hoe de werkwijze wordt vastgelegd. | Geef één concreet advies over hoe de werkwijze wordt opgeschreven. / Give one specific recommendation about how the procedure is written down. | Optional alignment (spec item 7). The criterion is visible, and it now uses the prompt's plain word instead of "vastleggen". |
| 8 cursuslocatie | prompt | Uw avondcursus is verhuisd en u moet na de les lang op de bus wachten; bekijk de tabel. Overtuig uw docent om lokaal B te gebruiken: stel de verhuizing voor en geef twee redenen, één over de terugreis en één over de ruimte voor de groep. | Uw avondcursus is verhuisd naar lokaal A. Nu moet u na de les lang op de bus wachten. Bekijk de tabel. Overtuig uw docent om de cursus naar lokaal B te verplaatsen. Geef twee redenen: één over de terugreis en één over de ruimte voor de groep. | "de verhuizing" pointed back to the move that had already happened. The new instruction names the proposal, which is C0's own wording. Short sentences. I deviated from the audit's "is sinds kort in lokaal A". "Is verhuisd naar lokaal A" keeps the original premise (the move caused the bus problem) and avoids "een cursus is in lokaal A", which is a less natural collocation. The two moves are now distinct: "verhuisd naar lokaal A" versus "naar lokaal B te verplaatsen". |
| 9 fietskeuze | prompt | Adviseer Roos welke fiets ze het beste kan kopen en waarom. | Adviseer Roos welke fiets het beste bij haar situatie past. | Low-priority note 3. The visible C2 ("Verbind uw advies met de situatie van Roos") was not announced. The spec's wording is used, and the prompt is one word shorter. The reasons remain announced by "Noem minstens twee punten uit de tabel" and by C1 "als reden". |
| 10 cursus-engels | prompt | Adviseer Sabrina welke cursus ze het beste kan kiezen en waarom. | Adviseer Sabrina welke cursus het beste bij haar situatie past. | Same as fietskeuze, for C2. |
| 11 pensioen | title | Een collega gaat met pensioen | Nieuws van een collega | Note 5. The heading revealed the news that the cue delivers. It now echoes the prompt ("In de pauze vertelt ze u iets"). No audio. |
| 12 rijexamen | title | Farah is geslaagd | Farah heeft nieuws | Note 5, as pensioen. |
| 12 rijexamen | prompt | Stel ook een vraag over het examen en stel voor om het samen te vieren. | Stel ook een vraag over het rijexamen en stel voor om het samen te vieren. | Note 8. The situation names both the taalcursus and rijles, so "het examen" could mean the language exam until the cue plays. One word removes the ambiguity. It reveals no more than the situation already does (rijles, "blij"). The cue still delivers the news itself ("geslaagd", "in één keer"). |
| 13 uitlaat | prompt | U belt de garage en noemt uw naam. | U belt de garage. | Note 7. The old sentence could be heard as an instruction to say one's real name, and the cue already identifies the caller. |
| 14 medicijn-school | prompt | Uw dochter Amina moet deze week een medicijn innemen, ook op school. | Uw dochter Amina moet een paar dagen een medicijn innemen, ook op school. | Note 4. "deze week" half-answered C2 ("tot wanneer"); the end date is now left to the learner. |
| 15 machinestoring | prompt | Een collega van een andere afdeling valt vandaag in bij uw inpakmachine. Hij vraagt wat hij moet doen als de machine kapotgaat. | Een collega van een andere afdeling helpt vandaag bij uw inpakmachine. Hij vraagt wat hij moet doen als de machine vastloopt. | Note 9. The pictures show a box jammed in a machine that is not broken, and the model already says "vastloopt". "Invallen bij een machine" reads oddly. "Helpt vandaag bij" keeps the stand-in sense, which the audit's "werkt vandaag bij" loses. "Geef ook een waarschuwing." and C3 stay as batch 062 left them. |
| 15 machinestoring | starters[0] | Als de machine kapotgaat, moet je eerst … | Als de machine vastloopt, moet je eerst … | Aligned with the prompt and the pictures. |
| 7 inwerken | starters[1] | Leg de werkwijze vast door … | Schrijf de stappen op in …, zodat … | Follows the changed C1 and the plain prompt word. "De stappen" is the table's own word ("De stappen staan nergens op papier"). Where and why are left to the learner. |

Unchanged on purpose:

- **Cue texts:** all eight are unchanged.
- **C1 of rijexamen:** "Stel een vraag over het examen." stays. It is hidden until review and unambiguous once the cue has played. The judge receives the cue.
- **Machinestoring sample:** it keeps "Als de machine kapot is", because it is a learner's answer and "kapot" is a typical simplification. The spec limits the "kapot" alignment to criteria, model and starters, and none of the criteria or the model contains "kapot".
- **C3 of machinestoring:** "… waarom hij de machine niet zelf mag repareren" stays, as the spec requires.

## Every criterion against the prompt

**Cued items.** The criteria are hidden, so each must be asked for by the prompt or the cue:

| Item | C0 | C1 | C2 |
| --- | --- | --- | --- |
| slaapkamerraam | "wanneer het raam wordt gerepareerd" | "of u de reparatie moet betalen" | "Zeg kort wat er mis is met het raam" + picture |
| teamtaak | "hebt al twee dingen geregeld … Vertel wat u al hebt geregeld" (cue: "Wat heb je al geregeld") | "Vraag uw collega om een taak over te nemen en zeg welke taak dat is" | "Stel ook een dag voor om de voortgang te bespreken" |
| werkdruk | "Zeg welke twee taken het zijn" | "beschrijf één mogelijk gevolg van de tijdsdruk" | "vraag welke taak voorrang heeft" |
| cursusgemist | "Leg uit waarom u er niet was" | "vraag naar de lesstof" | "stel een dag en tijd voor om samen de aantekeningen te bekijken" |
| pensioen (prompt unchanged) | "Reageer op het nieuws: zeg wat u ervan vindt" | "en waarom" | "Stel ook een vraag over haar plannen of wens haar iets toe" |
| rijexamen | "Reageer op het nieuws" | "Stel ook een vraag over het rijexamen" | "stel voor om het samen te vieren" |
| uitlaat | "wat de reparatie kost" | "wanneer de auto klaar is" | "Zeg ook waarom u de auto snel nodig hebt" |
| medicijn-school | "wanneer … Amina het medicijn moet innemen" | "hoe" | "Zeg ook tot wanneer dat nodig is" |

**Items without a cue.** The criteria, starters and title are visible. None of them now names what a criterion asks the learner to say:

- **portemonnee-tram:**
  - The title, prompt and criteria no longer mention the wallet, losing it or getting it back.
  - C0 keeps "in de tram" and C1 keeps "bij de bakker". These name the visible setting of each panel, not what happened there.
  - The starters were checked and are unchanged. None names the wallet.
- **trein-gemist:** neither the title nor C3 names the train leaving any more. Starter 1 mentions "met de trein", which the picture shows, and leaves the problem open.
- **inwerken / cursuslocatie:** C0–C2 match the new instructions word for word in their key verbs ("wie de nieuwe collega begeleidt", "opschrijven", "controleert"; "naar lokaal B te verplaatsen", "terugreis", "ruimte").
- **fietskeuze / cursus-engels:** C2 is now announced by "het beste bij haar situatie past". C3 is announced by "ook een nadeel van uw keuze", as in batch 061.
- **machinestoring:** unchanged. C0 still names "de machine stoppen", the audit's code-level note 1, which is not part of this spec.

## Samples, quotes and models

**Samples and quotes.** No `sample`, `quotes` or `model` changed. Each sample still has exactly one `null` quote, at the same position as before, and every other quote is a verbatim substring of its sample (checked by script). Under the reworded criteria:

- **portemonnee-tram:**
  - quotes[1] "Bij de bakker wilde ze betalen, maar haar portemonnee was weg." meets "wat Roos bij de bakker merkte".
  - quotes[2] "De volgende dag kon ze hem ophalen bij de balie voor gevonden voorwerpen." meets "hoe het afliep".
  - The sample names no feeling, so C3 stays null.
- **trein-gemist:** quotes[3] "hij was heel zenuwachtig" directly follows "Op het station hij zag dat zijn trein net wegreed. Hij is de trein gemist", so it meets "op het station".
- **teamtaak:** quotes[0] "De zaal is geboekt en de uitnodigingen zijn verstuurd." now counts as two invented things. C2 is still null.
- **werkdruk:** quotes[0] "Het rapport en de planning moet vrijdag af zijn." now counts as two invented tasks.
- **inwerken:** quotes[1] "Zet de stappen op papier, …" meets "hoe de werkwijze wordt opgeschreven".
- **cursusgemist:** the sample's illness is now the learner's own reason.

**Models.**

- Every model meets every criterion, including the reworded ones:
  - portemonnee: "Pas bij de bakker merkte ze …, en ze schrok enorm", "Gelukkig had iemand hem gevonden …".
  - trein-gemist: "Hij schrok".
  - teamtaak: zaal and uitnodiging as invented content.
  - werkdruk: rapport and planning.
  - inwerken: "Schrijf daarnaast samen de stappen op". This is addressed to the leidinggevende the prompt now names.
  - medicijn-school: "tot en met vrijdag".
- **Lengths:**
  - Kort models are 32–44 words (target 25–45).
  - Middellang models are 51–68 words (target 40–70).
- **No copied prompt sentences.** No prompt sentence appears in any sample or model; the check was punctuation-insensitive. The machinestoring model opens with the clause "Als de machine vastloopt", which now overlaps a clause of the prompt. That is the natural opening of the answer, not a copied sentence.

## Prompt language figures (changed prompts)

Every prompt is now free of semicolons. No sentence has more than 24 words (limit 30).

| Item | Before | After |
| --- | --- | --- |
| slaapkamerraam | 53 words, 7 sentences, longest 16 | 53, 7, longest 16 |
| portemonnee-tram | 47, 5, longest 17 | 37, 5, longest 14 |
| teamtaak | 41, 2 (one semicolon-joined), longest 23 | 46, 5, longest 15 |
| werkdruk | 36, 2 (semicolon), longest 20 | 37, 3, longest 19 |
| cursusgemist | 36, 2 (semicolon), longest 23 | 35, 3, longest 24 |
| inwerken | 36, 2 (semicolon), longest 23 | 47, 5, longest 18 |
| cursuslocatie | 46, 2 (semicolon), longest 28 | 47, 5, longest 15 |
| fietskeuze | 64, 6, longest 20 | 63, 6, longest 20 |
| cursus-engels | 70, 7, longest 21 | 69, 7, longest 21 |
| rijexamen | 53, 6, longest 15 | 53, 6, longest 15 |
| uitlaat | 48, 5, longest 13 | 44, 5, longest 13 |
| medicijn-school | 42, 5, longest 12 | 43, 5, longest 13 |
| machinestoring | 56, 6, longest 17 | 55, 6, longest 17 |

## Starters

`066-starters.json` holds the full starters for all fifteen items, in batch order. Two lines differ from the base: inwerken [1] and machinestoring [0] (see the table). Every list has one fragment per criterion, and each fragment contains "…". The other starters were re-read against the reworded criteria:

- **portemonnee-tram:** "Bij de bakker merkte ze dat …" and "Roos voelde zich …, omdat …" fit the new C1 and C3, and none names the wallet.
- **teamtaak and werkdruk:** "Ik heb … en …" and "Vrijdag moeten … en … klaar zijn." fit the invented content.
- **cursusgemist, cursuslocatie, fietskeuze, cursus-engels, pensioen, rijexamen, uitlaat and medicijn-school:** the starters still fit and are unchanged.

## Media consequences

**New prompt audio, thirteen clips.** Every one of these prompts changed:

- `B1:speaking:batch016-slaapkamerraam:1#prompt`
- `B1:speaking:batch031-portemonnee-tram:1#prompt`
- `B1:speaking:batch002-teamtaak:1#prompt`
- `B1:speaking:batch003-werkdruk:1#prompt`
- `B1:speaking:batch002-cursusgemist:1#prompt`
- `B1:speaking:batch003-inwerken:1#prompt`
- `B1:speaking:batch003-cursuslocatie:1#prompt`
- `B1:speaking:batch017-fietskeuze:1#prompt`
- `B1:speaking:batch031-cursus-engels:1#prompt`
- `B1:speaking:batch030-rijexamen:1#prompt`
- `B1:speaking:batch030-uitlaat:1#prompt`
- `B1:speaking:batch016-medicijn-school:1#prompt`
- `B1:speaking:batch017-machinestoring:1#prompt`

**No new audio:** trein-gemist and pensioen changed only their title and/or criteria, so their prompt clips stay valid.

**Cue audio: none.** The eight cue texts are unchanged and keep their clips: slaapkamerraam, teamtaak, werkdruk, cursusgemist, pensioen, rijexamen, uitlaat and medicijn-school.

**Illustrations: none.** No image `brief` changed. The only alt change (slaapkamerraam) needs no new drawing.

Generate the thirteen prompt clips only after the batch passes review.

## Doubts for the reviewer

1. **The slaapkamerraam alt.** The spec says to change it only if it misdescribes. I judged that "de hendel hangt los" does misdescribe: the drawing shows an ordinary, attached handle pointing down. The English brief, which the judge also receives, still says "hanging loose". If the reviewer prefers to keep the reviewed alt, revert only `images[0].alt`; nothing else depends on it. The model's "De hendel zit los" is the learner's interpretation and still meets C2.
2. **The rijexamen prompt change.** It costs one extra prompt clip, for an ambiguity that lasts only until the cue plays. I made it because the spec allows a short wording fix and one word removes the ambiguity. C1 still says "het examen". If the reviewer prefers, align it to "het rijexamen" (hidden criterion, no audio).
3. **"en waarom" dropped** in fietskeuze and cursus-engels, following the spec's example, so that the prompts do not grow. The reason requirement is still carried by "Noem minstens twee punten uit de tabel" and by the visible C1 "… als reden". "… past, en waarom" would add two words.
4. **The portemonnee-tram C3 wording** "bij de bakker" instead of the audit's "toen ze het merkte" (reason in the table). A learner who only describes relief at the lost-property office does not meet either version.
5. **The cursuslocatie situation** "is verhuisd naar lokaal A" instead of the audit's "is sinds kort in lokaal A" (reason in the table). The compromise reason on space (audit note 2) is left as is: B has 20 seats for 16 learners, so "lokaal B is groot genoeg" works.
6. **The machinestoring sample** still says "kapot". This is deliberate (learner wording), but the reviewer may want it aligned. If so, quotes[0] must change with it.
7. **Visible criteria that still name answers** in machinestoring (C0 "de machine stoppen") and similar items (audit note 1). These are outside this spec; the audit recommends a code-level decision.
8. **The inwerken model** gives imperatives to the leidinggevende ("Laat één ervaren medewerker …", "Schrijf daarnaast samen de stappen op"). I read that as normal advice register, so the model is unchanged.

## Checker output

```
$ npx tsx scripts/batch-check.ts content/batches/066-original.json
Checked 15 items, 0 questions. Keys: {}. Options: {}.
  info  15 of 15 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
