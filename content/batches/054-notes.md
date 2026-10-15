# Batch 054 author notes

## Authorised replacement

Batch 054 is an authorised replacement (rewrite) batch of eight published B1 reading exercises. Each item keeps its ID, item order, question order, answer keys and set membership:

- `B1:reading:batch034-bewonersvergunning:1`
- `B1:reading:batch010-ploegendienst:1`
- `B1:reading:batch024-gratis-zwemles:1`
- `B1:reading:batch011-verlofregeling:1`
- `B1:reading:batch002-cursusfonds:1`
- `B1:reading:batch010-deelexamens:1`
- `B1:reading:batch034-zelfroosteren:1`
- `B1:reading:batch035-mediatheek:1`

Why: the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, §4, "B1 reading" under Medium and Low) found:

- a rule that leaves one case open (bewonersvergunning q4)
- a prompt that assumes an approval step the text abolished (ploegendienst q4)
- a closing call that supports a distractor, and a purpose key that rests on a planted self-label (gratis-zwemles)
- a distractor that paraphrases the evidence (verlofregeling q2)
- wrong spelling and collocations (cursusfonds, gratis-zwemles)
- a timing inconsistency (deelexamens)
- an ambiguous "laat invullen" (zelfroosteren)
- explanation claims that are not in the text (ploegendienst q2, mediatheek q3)
- one name used for two different people

The project owner authorised the fixes. The fix list is `tmp/content-fix-2026-10-14/spec/053-054.md` (part 054).

Source: `tmp/content-fix-2026-10-14/base/054-base.json`. That file holds the current published records without `revision` and with `status: "draft"`. Reading items carry no generated media. I applied the listed fixes with an assertion-checked script: each replaced fragment had to match exactly once. Apart from the fields in the table below, every field value is identical to the base. A field-by-field comparison confirmed this. Every ID is owned by an earlier reviewed batch (002, 010, 011, 024, 034, 035), so the review JSON must list all eight IDs in `replaces`. The checker's "already in the catalogue" info line is expected. As the spec asks, I did not normalise purpose-option capitalisation (cursusfonds q5 keeps its lowercase options).

## Changes per item

Where only part of a field changed, "Before" and "After" show the changed fragment exactly as it appears in the field.

### B1:reading:batch034-bewonersvergunning:1 (fix 1)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` ("Verhuizen", fragment) | Verhuist u naar een andere zone, dan vraagt u een nieuwe vergunning aan. Verhuist u naar een adres buiten de vergunningzones of naar een andere gemeente, dan hebt u geen vergunning meer nodig. In beide gevallen stopt uw oude vergunning op de dag van de verhuizing. U krijgt dan het geld terug voor de volle maanden die nog niet begonnen zijn. | Verhuist u naar een andere zone, dan vraagt u een nieuwe vergunning aan; uw oude vergunning stopt op de dag van de verhuizing. Verhuist u naar een adres buiten de vergunningzones of naar een andere gemeente, dan hebt u geen vergunning meer nodig. Ook dan stopt uw vergunning op de dag van de verhuizing. Stopt uw vergunning door een verhuizing, dan krijgt u het geld terug voor de volle maanden die nog niet begonnen zijn. | "In beide gevallen" could refer only to the two cases in the sentence before it (outside the zones, other municipality). In that reading the text never said when the permit ends after a move to another zone, and q4 option A could not be ruled out. The stop rule is now stated for the other-zone move as well. The refund applies whenever a move ends the permit; the old "U krijgt dan" had the same scope problem. |
| `questions[q4].evidence` | (the old fragment above, verbatim) | (the new fragment above, verbatim) | Consequential: the quote must match the text. It now entails key C directly (stops on 12 May; refund for the full months not yet begun, so from June). |

The q4 explanation already says what the new text says ("zijn oude vergunning stopt op de dag van de verhuizing, 12 mei, … dus vanaf juni"), so it is unchanged.

### B1:reading:batch010-ploegendienst:1 (fix 2)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q4].prompt` (last sentence) | Keurt Farah deze ruil goed? | Is deze ruil volgens de regels toegestaan? | The text says colleagues now enter a swap in the app themselves, so Farah no longer approves swaps. The options ("Ja, want …" / "Nee, want …") fit the new question unchanged. |
| `questions[q2].explanation` (fragment) | De pauze in de nacht is even lang als overdag (alleen het slapen in de rustruimte is nieuw), en | De pauze in de nacht is even lang als overdag, en | The text never says that sleeping in the rest room is new, so the claim is deleted. The rest of the explanation is unchanged. |

### B1:reading:batch024-gratis-zwemles:1 (fix 3)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` (introduction, fragment) | of komen helemaal niet. Dit stuk is een waarschuwing. Als zwemles | of komen helemaal niet. Als zwemles | Removes the planted self-label that the q6 key depended on. |
| `text` ("Het verhaal van Amina", fragment) | Met alleen diploma A kun je in een zwembad vooruitkomen, maar | Met alleen diploma A kun je je in een zwembad redden, maar | "vooruitkomen" was the wrong verb. "je redden" (zich redden) is the natural verb here. |
| `text` (closing call) | Ik roep alle gemeenten op om die keuze terug te draaien voordat de volgende zomer begint. | Ik roep alle gemeenten op om gratis zwemles aan te bieden voordat de volgende zomer begint. | "die keuze" is the disappearance of school swimming. Reversing it partly supported q5 option C ("het schoolzwemmen weer invoeren") and contradicted the q5 explanation. The call now repeats the writer's thesis. |
| `questions[q3].evidence` (fragment) | Met alleen diploma A kun je in een zwembad vooruitkomen, maar | Met alleen diploma A kun je je in een zwembad redden, maar | Consequential: verbatim with the text. |
| `questions[q3].explanation` (fragment) | Amina heeft alleen diploma A en kan daarmee in een zwembad vooruitkomen, maar | Amina heeft alleen diploma A en kan zich daarmee in een zwembad redden, maar | Consequential: follows the corrected verb. |
| `questions[q6].options.A` (key) | De lezer waarschuwen voor de gevolgen als zwemles voor veel gezinnen te duur blijft. | De lezer overtuigen dat gemeenten zwemles voor alle kinderen gratis moeten maken. | Without the self-label the text is persuasive: thesis, arguments, rebuttal and call. The key paraphrases the thesis instead of copying it. The key letter stays A. |
| `questions[q6].options.B` | De lezer overtuigen dat ouders zelf verantwoordelijk zijn voor de zwemles van hun kind. | De lezer waarschuwen voor de gevaren van stroming in recreatieplassen. | The spec's warning distractor: it is anchored in the Amina paragraph ("recreatieplas", "wind en stroming"), but that paragraph is one example, not the purpose. The three options now use the three purpose verbs: overtuigen, waarschuwen, informeren. |
| `questions[q6].options.C` | (unchanged) De lezer informeren over de kosten van een zwemdiploma in verschillende gemeenten. | (unchanged) | Kept as the third option: the text gives costs only "in onze regio", as an argument. |
| `questions[q6].evidence` | Dit stuk is een waarschuwing. Als zwemles een luxe wordt, betalen we daar als land een hoge prijs voor. | Als zwemles een luxe wordt, betalen we daar als land een hoge prijs voor. Daarom vind ik dat elke gemeente gratis zwemles moet aanbieden aan alle kinderen. | The old quote contained the removed label. The new quote is the thesis with its reason, verbatim. |
| `questions[q6].explanation` | De schrijver noemt haar stuk zelf een waarschuwing: als zwemles een luxe wordt, betaalt het land daar een hoge prijs voor, en zij roept gemeenten op om dat te voorkomen. Dat ouders zelf verantwoordelijk zijn, is het argument van de tegenstanders, dat zij afwijst; de kosten van een diploma noemt zij maar één keer, als onderdeel van de waarschuwing. | De schrijver vindt dat elke gemeente gratis zwemles moet aanbieden aan alle kinderen. Zij onderbouwt die mening met argumenten, weerlegt de bezwaren van tegenstanders en roept aan het einde alle gemeenten op om gratis zwemles aan te bieden; dat is overtuigen. Wind en stroming in open water komen alleen voor in het verhaal van Amina, en de kosten van een diploma noemt zij alleen voor haar eigen regio, als argument voor gratis zwemles. | Rewritten for the new key and options. It says why B (one anecdote) and C (costs only for her own region, used as an argument) fail. |

### B1:reading:batch011-verlofregeling:1 (fix 4)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q2].options.C` | Welke collega zijn werk overneemt en op welke dag hij terugkomt. | Hoeveel vakantiedagen hij nog heeft en wanneer hij die wil opnemen. | The old C nearly paraphrased the evidence ("welk werk moet worden overgenomen", "hoe lang u verwacht afwezig te zijn"). The new C is anchored elsewhere in the text (§4 "vakantiedagen", §5 "Vakantie aanvragen") and is clearly not part of a sick report. |
| `questions[q2].explanation` (last sentence) | De medewerker geeft door welk werk moet worden overgenomen, niet wie dat doet, en de dag van terugkomst meldt hij pas als hij beter is. | Over vakantiedagen gaat de ziekmelding niet: wie tijdens zijn ziekte op vakantie wil, vraagt dat apart aan bij zijn teamleider. | Consequential: the last sentence refuted the old C. The new sentence refutes the new C with §4 ("Wilt u tijdens uw ziekte op vakantie, dan vraagt u dat aan bij uw teamleider …"). |

### B1:reading:batch002-cursusfonds:1 (fix 5)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` ("Eerst bespreken", fragment) | Deze volgorde voorkomt dat medewerkers een rekening aangaan terwijl | Deze volgorde voorkomt dat medewerkers kosten maken terwijl | "een rekening aangaan" is an unnatural collocation. "kosten maken" is natural. |
| `text` ("Als de planning verandert", fragment) | Ga er niet vanuit dat | Ga er niet van uit dat | Spelling: "ervan uitgaan" splits as "er … van uit". |
| `questions[q2].evidence` (fragment) | Deze volgorde voorkomt dat medewerkers een rekening aangaan terwijl | Deze volgorde voorkomt dat medewerkers kosten maken terwijl | Consequential: verbatim with the text. It still entails key C ("risico op eigen kosten"). |
| `questions[q1].evidence` | Een korte cursus omgaan met een nieuw computerprogramma kan bijvoorbeeld passen, ook als u niet op kantoor werkt. Het gaat om de verbinding met uw werk en uw ontwikkeling, niet alleen om de naam van de cursus. | Bespreek met uw leidinggevende wat u wilt leren en op welke manier u dit tijdens het werk kunt gebruiken. Die beoordeelt uw aanvraag voordat u zich inschrijft, zodat u vooraf weet of een bijdrage mogelijk is. | q1 asks what the manager assesses. The quote now gives the sentences about the manager's assessment, verbatim, instead of the fund's general paragraph. |
| `questions[q1].explanation` | De inhoud moet relevant zijn voor werk en ontwikkeling. De cursusnaam of werkplek alleen bepaalt dit niet. | U bespreekt met uw leidinggevende wat u wilt leren en hoe u dat tijdens het werk kunt gebruiken; daarna beoordeelt die uw aanvraag. Het gaat dus om de bruikbaarheid voor het werk; de cursusnaam of werkplek alleen bepaalt dit niet. | Consequential: the explanation now paraphrases the new evidence. The original rationale for A and C stays in the second half. |

### B1:reading:batch010-deelexamens:1 (fix 6)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` (introduction, fragment) | getoetst in één examen aan het einde van het jaar. | getoetst in één examen aan het einde van de opleiding. | Modibo studied for two years and "één toets [kan] twee jaar werk doorstrepen", so the single theory exam must come at the end of the programme, not of a year. The rest of the text agrees: "het grote eindexamen", and the praktijktoets is also "aan het einde van de opleiding". |
| `text` (byline) | Jari Postma is docent bij een ROC. | Thijs Veenstra is docent bij een ROC. | "Jari Postma" was also the 31-year-old nurse in `B1:reading:batch034-zelfroosteren:1`. I renamed the person in this item, because the byline is the only occurrence. No question refers to the writer by name, and the explanations already use "hij". "Thijs Veenstra" (and each part of it) does not occur in `content/catalogue.json`, `content/batches/` or the fix bases. A web search (14 Oct 2026) found no public figure of that name. |

### B1:reading:batch034-zelfroosteren:1 (fix 7)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q7].options.C` | De lezer waarschuwen voor de nadelen van zelfroosteren voor collega's die hun wensen laat invullen. | De lezer waarschuwen voor de nadelen van zelfroosteren voor collega's die hun wensen pas laat invullen. | "die hun wensen laat invullen" can be read as "laten invullen" (have someone else fill them in). "pas laat" fixes the meaning: they fill in their wishes late. |

### B1:reading:batch035-mediatheek:1 (fix 8)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q3].explanation` (middle sentence) | De student die het boek nog heeft, krijgt geen bericht over de reservering; hij kan alleen niet verlengen. | Over een bericht aan de student die het boek nog heeft, zegt de tekst niets; die kan het boek alleen niet meer verlengen en levert het uiterlijk op de inleverdatum in. | The text does not say the current borrower gets no message. The new sentence says only what the text supports: "Een gereserveerd boek kun je niet verlengen; je levert het dan uiterlijk op de inleverdatum in." That still refutes option B (an e-mail with a one-week deadline). |

## Key rationale for the affected questions

The keys did not change. For each question whose wording or options changed:

- **bewonersvergunning q4 (key C):** a move to another zone means the old permit stops on the day of the move (12 May), and the refund covers the full months not yet begun (from June). A (valid until the new permit starts) is now contradicted in so many words. B (moves automatically) applies only to a move within the same zone.
- **ploegendienst q4 (key C):** Julio's afternoon shift on Monday ends at 22.00 and the morning shift on Tuesday starts at 6.00. That is 8 hours of rest, against the minimum of 11. A is true about the 48 hours, but that does not make the swap allowed. B is contradicted by "in welke ploeg die collega zit, maakt niet uit".
- **gratis-zwemles q3 (key A):** unchanged logic, with the corrected verb.
- **gratis-zwemles q6 (key A):** persuasion: thesis ("Daarom vind ik dat …"), arguments, rebuttal of two objections and a closing call. B blows up one anecdote into the purpose. C misstates the scope: the costs are given for "onze regio" only, as an argument.
- **verlofregeling q2 (key A):** the report covers the expected duration and the address and phone number where the employee can be reached. B (complaints, medicines) is explicitly not shared. C (holiday days) belongs to a separate procedure in §4 and §5.
- **cursusfonds q1 (key B):** the manager assesses the application after you discuss what you want to learn and how you can use it at work. A (reputation of the provider) and C (where the lessons take place) have no support in the text.
- **cursusfonds q2 (key C):** unchanged logic. Enrolling first means you cannot claim the costs afterwards.
- **zelfroosteren q7 (key A):** unchanged logic. C is now unambiguous: one paragraph of doubt from the works council is not the purpose of the text.
- **mediatheek q3 (key A):** unchanged key. The explanation no longer claims more than the text says.

## Language control

Word counts use the checker's whitespace count. Sentence figures split on sentence punctuation and line breaks, ignoring fragments of three words or fewer such as headings.

| Item | Words before → after | Sentences: average, maximum before → after | Changed or new sentences (words) |
| --- | --- | --- | --- |
| bewonersvergunning | 628 → 642 | 15.8, 29 → 16.1, 29 | 23, 11, 21 |
| gratis-zwemles | 627 → 623 | 14.9, 27 → 15.2, 27 | 23 (Met alleen diploma A …), 16 (Ik roep …); one sentence removed |
| cursusfonds | 459 → 459 | 16.7, 20 → 16.7, 20 | 15 (Deze volgorde …), 20 (Ga er niet van uit …) |
| deelexamens | 550 → 550 | 13.3, 24 → 13.3, 24 | 20 (Bij veel opleidingen …), 7 (byline) |
| other four | unchanged | unchanged | none (questions and explanations only) |

All texts stay within 400–700 words, and no sentence is over 30 words.

## Media consequences

None. B1 reading items carry no audio and no images. No reading item in `content/catalogue.json` has a media field. No clip or picture needs to be generated or reviewed. Integration assigns new `revision` values.

## Key distribution

A 17, B 17, C 17 of 51 questions (33 % each), all three-option. This is identical to the published items: no key moved. The per-item key sequences are unchanged.

## Doubts for the reviewer

1. **bewonersvergunning:** I chose the smallest rewrite that leaves no reading open. The stop rule is in the other-zone sentence, repeated with "Ook dan" for leaving the zones or the municipality, and the refund is conditional on "Stopt uw vergunning door een verhuizing". Because the q4 evidence must be contiguous, it is now four sentences. Distractor A is now contradicted directly, but the item still needs the month calculation. The text grows from 628 to 642 words.
2. **ploegendienst q4:** option A says "doorgegeven", while the text says a swap must "in de app staan". I left it, because the meaning is the same and the option is outside the fix list.
3. **gratis-zwemles, q5 and the closing call:** the sentence before the call ("Dat is geen pech, maar het gevolg van een keuze die gemeenten jaren geleden hebben gemaakt.") remains. It diagnoses the cause, the disappearance of school swimming. The call now asks for free lessons, so q5 C (reintroduce school swimming at all primary schools) is no longer the writer's stated aim. If you still read C as partly supported, the next step is to replace C rather than rewrite more text. Two further points:
   - The call is followed by "Gratis zwemles voor elk kind kost geld, …", a deliberate repetition.
   - "alle gemeenten" includes Westerhout, which already offers free lessons. The published call had the same feature.
4. **gratis-zwemles q6:** the key paraphrases the thesis, which is also q5's evidence, so q5 B and q6 A overlap in content. That is normal for a summary and a purpose question on a persuasive text, but please confirm it is acceptable. With the self-label gone, the text still contains warning-like sentences ("betalen we daar als land een hoge prijs voor", "ongelukken in het water"). The warning distractor is deliberately narrow (currents in recreational lakes) so that it cannot compete as the purpose.
5. **cursusfonds q1:** the new evidence entails the key through "op welke manier u dit tijdens het werk kunt gebruiken". The explicit criterion ("Het gaat om de verbinding met uw werk en uw ontwikkeling …") is in the first paragraph and cannot be joined to the quote contiguously. Distractor C ("Op de afdeling waar de lessen plaatsvinden") is only weakly anchored. That is pre-existing and not in the fix list.
6. **Historical evidence overlay:** `content/evidence/001-existing.json` still holds old quotes for this cursusfonds ID (and for `A2:reading:batch001-pakketpunt:1` in batch 053). `scripts/content.ts` (around line 194) skips overlays for items owned by a reviewed batch, so they cannot override the new evidence once the review lists these IDs in `replaces`.
7. **deelexamens:**
   - The nurse in zelfroosteren keeps the name Jari Postma: its text, q2 prompt and q2 explanation are unchanged.
   - Mediatheek q4 still uses the first name Jari for a student, which is ordinary reuse of a persona name.
   - "aan het einde van de opleiding" now appears twice, for the theory exam and the praktijktoets, which is consistent.
   - Not changed, because pre-existing and rhetorical: "Wie een deel niet haalt, verliest een maand en geen jaar", while Modibo waited half a year for his resit.
8. **verlofregeling q2:** all three options are now parallel indirect-question clauses of 10–12 words. The key is not the longest (62 characters against 67 and 67).

## batch:check output

`npx tsx scripts/batch-check.ts content/batches/054-original.json`

```
Checked 8 items, 51 questions. Keys: {"B":17,"A":17,"C":17}. Options: {"3":51}.
  info  8 of 8 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

SHA-256 of `content/batches/054-original.json` when these notes were written: `0d89ea0d51bce1051b35f51dc1adec931d69ed0c10872988d8aa25298af603cc`.
