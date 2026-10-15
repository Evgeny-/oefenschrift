# Batch 055 author notes

Authorised replacement (rewrite) of nine published A2 KNM facts. The editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, §4 "A2 KNM" medium findings and the "KNM" low findings) found these defects, and the project owner authorised the fixes listed in `tmp/content-fix-2026-10-14/spec/055.md`. The batch starts from `tmp/content-fix-2026-10-14/base/055-base.json`: the published records without generated media, with `status: "draft"`. Every item keeps its ID, set membership, position, title, theme, eindterm, domain and image brief. Only the listed fixes and the edits they force were applied: evidence, explanations, option order for key balance, source notes and `sourceReviewedAt`. No `revision`, `questionAudio` or `images[].file` was added, no media was made, and no other project file was touched. Status stays `draft` and `targetLevelValidated` stays `false`. This is author work, not CEFR validation and not exam equivalence.

Replaced IDs, in batch order:

1. `A2:knm:batch006-eigenrisico:1`: the card does not rule out option C (medicines), and C is not false in every case.
2. `A2:knm:batch033-schoolvakantie:1`: in option C, "zij" could be read as Amina.
3. `A2:knm:batch032-direct-nee:1`: the prompt does not say what Sabrina asked, and the options do not answer "Welk Nederlands gebruik".
4. `A2:knm:batch019-scholing:1`: the fact card restated Julio's case instead of the rule.
5. `A2:knm:batch006-stroomstoring:1`: "112 is alleen voor levensgevaar" is too narrow.
6. `A2:knm:batch007-kinderopvangtoeslag:1`: the prompt was unnatural, and kinderbijslag is not a toeslag.
7. `A2:knm:batch007-bezwaar:1`: the evidence left out the six weeks, and option A was a right everyone has.
8. `A2:knm:batch006-huisartsenpost:1`: the prompt had a curly apostrophe, and the alt text said 's avonds where the prompt says 's nachts.
9. `A2:knm:batch032-jeugdfonds:1`: "betaalt dan de contributie" overstates the fund.

## Changes per item

Fields not listed are byte-identical to the base. The only file-level difference is the trailing newline that the batch format requires. Long `sourceNote` texts are summarised here and given in full in the JSON.

### 1. A2:knm:batch006-eigenrisico:1 (key B, unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].options.C` | Nee, en medicijnen op recept ook niet. | Ja, maar alleen bij een bezoek 's avonds. | The old C was not ruled out by the card. It was also not false in every case, because insurers may exclude some medicines from the eigen risico. The card's unconditional "Voor de huisarts geldt geen eigen risico" rules out the new C. The source rules it out as well, because the exemption covers huisartsenzorg, including the huisartsenpost, at any hour. |
| `questions[0].explanation` | Huisartsenzorg valt niet onder het verplichte eigen risico; de zorgverzekeraar betaalt de rekening van de huisarts. Medicijnen of bloedonderzoek die de huisarts aanvraagt vallen er wel onder. | Huisartsenzorg valt niet onder het verplichte eigen risico; de zorgverzekeraar betaalt de rekening van de huisarts. Ook 's avonds bij de huisartsenpost betaalt u geen eigen risico. Medicijnen of bloedonderzoek via de huisarts vallen er meestal wel onder. | The new sentence says why the evening distractor fails. "meestal" corrects the mirror image of the removed C: medicines usually count, but an insurer may exclude some. |
| `sourceNote` | ends after "…'Moet ik de huisartskosten zelf betalen?'." | same text plus a recheck sentence | Records the page for the new explanation, the insurer-exclusion sentence and the distractor rationale. |
| `sourceReviewedAt` | 2026-09-10 | 2026-10-14 | Verified today. |

### 2. A2:knm:batch033-schoolvakantie:1 (key C, unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].options.C` | Alleen als zij door haar werk in geen enkele schoolvakantie weg kan. | Alleen als Fatima door haar werk in geen enkele schoolvakantie weg kan. | "zij" could be read as Amina. The explanation already names Fatima. |
| `sourceReviewedAt` | 2026-09-11 | 2026-10-14 | Verified today. |

### 3. A2:knm:batch032-direct-nee:1 (key C → A)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].prompt` | Sabrina's buurvrouw zegt: 'Nee, ik heb geen zin.' Welk Nederlands gebruik past bij dit antwoord? | Sabrina vraagt haar buurvrouw op de koffie. De buurvrouw zegt: 'Nee, ik heb geen zin.' Wat betekent dat meestal? | The prompt now says what was asked and asks a question that the options answer. It has 19 words. |
| `questions[0].options` | A De buurvrouw is boos op haar. / B De buurvrouw wil helemaal geen contact meer. / C De buurvrouw zegt direct wat zij wil. | A De buurvrouw wil nu niet en zegt dat direct. / B De buurvrouw is boos op haar. / C De buurvrouw wil helemaal geen contact meer. | The reworded key states what the answer means: she does not want to now and says so directly. The two distractors are kept word for word; they are now possible readings of "Wat betekent dat". The new order supports the key balance. |
| `questions[0].answer` | C | A | Key balance. |
| `questions[0].evidence` | Veel mensen in Nederland zeggen direct wat zij willen. | Veel mensen in Nederland zeggen direct wat zij willen. Zij kunnen bijvoorbeeld een uitnodiging duidelijk weigeren. | The prompt now describes a refused invitation. The second card sentence entails the "wil nu niet" half of the key. |
| `questions[0].explanation` | De buurvrouw zegt duidelijk wat zij wil. Dat past … | De buurvrouw wil nu niet op de koffie komen en zegt dat duidelijk. Dat past … | Matches the new prompt and key. The rest is unchanged. |
| `sourceUrl` | https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2 | https://wetten.overheid.nl/BWBR0045574/2026-10-07#Bijlage2 | The cited version was "Geldend van 18-04-2026 t/m 06-10-2026". The current version has been valid since 07-10-2026. Bijlage 2 is unchanged and has been in force since 2025-07-01. |
| `sourceNote` | version 2026-04-18, retrieved 2026-09-11 | current version, opened 2026-10-14, verbatim eindterm, "an invitation" | Records the current version. |
| `sourceReviewedAt` | 2026-09-11 | 2026-10-14 | Verified today. |

### 4. A2:knm:batch019-scholing:1 (key C, unchanged; prompt and options unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` | Julio moet leren werken met het nieuwe computersysteem van zijn werkgever. Zijn werkgever betaalt deze verplichte cursus. | Moet u voor uw werk een verplichte cursus volgen? Dan betaalt de werkgever die cursus. Als het kan, volgt u de cursus in werktijd. | The card now states the general rule from the cited FAQ in 24 words. It leaves out "De cursus telt als werktijd" from the spec example, because the FAQ does not say it (see doubts). |
| `questions[0].evidence` | Zijn werkgever betaalt deze verplichte cursus. | Moet u voor uw werk een verplichte cursus volgen? Dan betaalt de werkgever die cursus. | Verbatim from the new card. The condition and the consequence together entail "Zijn werkgever betaalt de cursus." for Julio's compulsory course. |
| `sourceNote` | "card now uses only the explicit computer-system case" | rewritten: the FAQ rule (free; in working time where reasonably possible), the computer-system example, exclusions | The old note described the old card. |
| `sourceReviewedAt` | 2026-09-11 | 2026-10-14 | Verified today. |

The explanation is unchanged; "Hij moet Julio de cursus gratis aanbieden" still paraphrases the rule.

### 5. A2:knm:batch006-stroomstoring:1 (key B, unchanged; prompt and options unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].explanation` | … De gemeente gaat er niet over, en 112 is alleen voor levensgevaar. … | … De gemeente gaat er niet over, en 112 is alleen voor spoed, zoals levensgevaar, brand of een misdrijf dat nu gebeurt. … | The old wording was too narrow. The key logic still holds: the 112 page lists "De elektriciteit is uitgevallen, de hele straat zit zonder stroom." as a case where you do not call 112, unless the outage causes a life-threatening situation. |
| `sourceNote` | netbeheerder page only | adds the 112 page | Provenance for the new explanation sentence. |
| `sourceReviewedAt` | 2026-09-10 | 2026-10-14 | Verified today. |

### 6. A2:knm:batch007-kinderopvangtoeslag:1 (key A, unchanged; options unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].prompt` | Julio en zijn vrouw werken allebei. Hun dochter van 2 gaat naar het kinderdagverblijf. Welke toeslag is daarvoor? | Julio en zijn vrouw werken allebei. Hun dochter van 2 gaat naar het kinderdagverblijf. Welke regeling helpt bij de kosten? | The new question is natural Dutch, and all three options are regelingen; kinderbijslag is not a toeslag. Eindterm 8.3.2 also speaks of "regelingen". The prompt has exactly 20 words. The spec example "Welke regeling helpt hen met de kosten van de opvang?" would give 24 words. It would also put "opvang" in the prompt, a word that only the key shares. |
| `sourceNote` | "from 1 January 2029 (bill to the Tweede Kamer in autumn 2026 …)" | adds the SVB sentence; "from 2029 … 21 September 2026: the bill has gone to the Raad van State; both chambers still to decide" | Updates the time-sensitive status and records the source for the card's SVB claim. |
| `sourceReviewedAt` | 2026-09-10 | 2026-10-14 | Verified today. |

### 7. A2:knm:batch007-bezwaar:1 (key C → B)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].options` | A Hij mag aangifte doen bij de politie. / B Hij mag het besluit gewoon negeren. / C Hij mag binnen zes weken bezwaar maken. | A Hij mag bij de politie bezwaar maken. / B Hij mag binnen zes weken bezwaar maken. / C Hij mag het besluit gewoon negeren. | The old A was literally a right everyone has. The new A has the same form as the key but names the wrong institution, which the card rules out ("bij de organisatie die het besluit heeft genomen"). I did not use the spec's example, "Hij kan de politie vragen het besluit te veranderen", because anyone can ask, which repeats the weakness of the old A (see doubts). The new order supports the key balance. |
| `questions[0].answer` | C | B | Key balance. |
| `questions[0].evidence` | Dan kunt u bezwaar maken bij de organisatie die het besluit heeft genomen | Dan kunt u bezwaar maken bij de organisatie die het besluit heeft genomen. Dat moet binnen zes weken. | The key states six weeks. |
| `sourceReviewedAt` | 2026-09-10 | 2026-10-14 | Verified today. |

The explanation is unchanged. "bij dezelfde organisatie, hier de gemeente" and "De politie gaat niet over besluiten van de gemeente" already explain why the new A fails.

### 8. A2:knm:batch006-huisartsenpost:1 (key C → A)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[0].prompt` | Amina is ’s nachts ziek. Wat is de huisartsenpost? | Amina is 's nachts ziek. Wat is de huisartsenpost? | Straight apostrophe, as in option "Een apotheek die 's nachts open is." and the card. |
| `questions[0].options` | A De spoedafdeling van het ziekenhuis. / B Een apotheek die 's nachts open is. / C Huisartsenzorg als de eigen praktijk dicht is. | A Huisartsenzorg als de eigen praktijk dicht is. / B De spoedafdeling van het ziekenhuis. / C Een apotheek die 's nachts open is. | Order only, for key balance. The wording is unchanged. |
| `questions[0].answer` | C | A | Key balance. |
| `images[0].alt` | Amina ligt 's avonds onder een deken op de bank; een vrouw naast haar belt. | Amina ligt 's nachts onder een deken op de bank; een vrouw naast haar belt. | Aligned with the prompt. The brief ("at night … a dark window") is unchanged, so the drawing stays valid. |
| `sourceReviewedAt` | 2026-09-10 | 2026-10-14 | Verified today. |

No learner-facing field in the batch still contains a curly apostrophe. The only ones left are inside two English `sourceNote` texts, in a verbatim source quote and in "speaker’s".

### 9. A2:knm:batch032-jeugdfonds:1 (key C, unchanged; prompt and options unchanged)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `text` | … Het Jeugdfonds Sport en Cultuur betaalt dan de contributie. … | … Het Jeugdfonds Sport en Cultuur kan dan de contributie betalen. … | The old wording overstated the fund: it works through local funds in "veel" (not all) gemeenten and reviews each application. The card has 30 words, the limit. |
| `questions[0].evidence` | Het Jeugdfonds Sport en Cultuur betaalt dan de contributie. Ook de gemeente helpt gezinnen met een laag inkomen | Het Jeugdfonds Sport en Cultuur kan dan de contributie betalen. Ook de gemeente helpt gezinnen met een laag inkomen | Verbatim from the new card. It still entails C, "De gemeente of een jeugdfonds", for "Wie kan helpen". |
| `questions[0].explanation` | … sportclub: het fonds betaalt de contributie of het lesgeld. … | … sportclub: na een aanvraag kan het fonds de contributie of het lesgeld betalen. … | Fixes the same overstatement in the explanation. |
| `sourceNote` | ends "…Re-check yearly (fund conditions and the age limit change)." | same plus the fund's own FAQ | Provenance for the hedge. |
| `sourceReviewedAt` | 2026-09-11 | 2026-10-14 | Verified today. |

## Sources verified on 2026-10-14

I opened every page below on 14 October 2026 with WebFetch. For exact quotes I also downloaded the HTML by HTTP and searched it. Two exceptions: svb.nl refused WebFetch (HTTP 403), so the Rijksoverheid kinderbijslag page was used instead, and WebFetch could not decode the FAQ PDF, so I extracted its text locally with `pdftotext`. I did not rely on search snippets.

| Item | URL | Page title | Supported claim |
| --- | --- | --- | --- |
| 1 | https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/eigen-risico-zorgverzekering | Wanneer betaal ik een eigen risico voor mijn zorg? | No eigen risico for "huisartsenzorg (waaronder de huisartsenpost)". "Het verplichte eigen risico voor 2026 is € 385" (not tested). "De zorgverzekeraar kan ook bepaalde zorgaanbieders, zorgprogramma’s, medicijnen en hulpmiddelen uitsluiten van het eigen risico." |
| 1 | https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartskosten-op-zorgnota | Moet ik de huisartskosten zelf betalen? | "En een bezoek aan de huisarts gaat niet ten koste van uw verplichte eigen risico." Extra onderzoek such as bloedprikken: "Deze zorg valt wel onder uw verplichte eigen risico. Net als de geneesmiddelen die een huisarts voorschrijft." "De zorg op de huisartsenpost wordt volledig vergoed." and does not count against the eigen risico. "Uw zorgverzekeraar betaalt rechtstreeks de rekening van uw huisarts." |
| 2 | https://www.rijksoverheid.nl/vraag-en-antwoord/leerplicht/leerplicht-schoolvakanties | Mag ik mijn kind meenemen op vakantie buiten de schoolvakantie? | "U mag uw kind niet meenemen op vakantie buiten de schoolvakanties wanneer deze leerplichtig is. U kunt een boete krijgen als u dit wel doet. Als u in de schoolvakanties niet weg kunt door uw werk kunt u toestemming vragen …". Permission from the directeur, "maximaal 10 dagen", "1 keer in een schooljaar", "niet in de eerste 2 weken na de zomervakantie". Seasonal work is one of the page's examples. The source note's quotes are still verbatim. |
| 3 | https://wetten.overheid.nl/BWBR0045574/2026-10-07#Bijlage2 | Regeling inburgering 2021 (wetten.nl; "Geldend van 07-10-2026 t/m heden") | Eindterm 2.1.2: "Weet dat veel mensen in Nederland zich direct kunnen uiten." The previously cited 2026-04-18 version shows "Geldend van 18-04-2026 t/m 06-10-2026". Bijlage 2 carries in-force date 2025-07-01. |
| 4 | https://www.rijksoverheid.nl/documenten/2022/08/02/faq-transparante-arbeidsvoorwaarden | FAQ Transparante arbeidsvoorwaarden | A brochure of 02-08-2022 linking the PDF below. |
| 4 | https://open.overheid.nl/repository/ronl-ca958cf89d600038ed4b243754af202a74e183dc/1/pdf/FAQ%20Transparante%20arbeidsvoorwaarden.pdf | Vraag & Antwoord Richtlijn transparante en voorspelbare arbeidsvoorwaarden (versie 1.0, 27-07-2022; PDF last modified 22 May 2025) | §2 "Kosteloze scholing": "Opleidingen die de werkgever op grond van de wet of cao verplicht aan de werknemer moet verstrekken, moeten, kosteloos worden aangeboden." "Als dat redelijkerwijs mogelijk is, moet de werknemer de mogelijkheid krijgen de opleiding tijdens werktijd te volgen." Its example is training "om met een nieuw computersysteem te kunnen werken dat door de werkgever wordt ingevoerd". Diplomas or certificates legally required before starting are "niet per definitie" covered. |
| 5 | https://www.rijksoverheid.nl/vraag-en-antwoord/energie-thuis/vragen-over-gas-of-stroomstoringen | Waar kan ik terecht bij vragen over gas- of stroomstoringen? | "Bij vragen over gas- of stroomstoringen moet u bij de netbeheerder zijn." "De netbeheerders hebben 1 landelijk storingsnummer: 0800-9009." The netbeheerder handles cables, pipes and transport. |
| 5 | https://www.rijksoverheid.nl/vraag-en-antwoord/alarmnummer-112/wanneer-112-bellen | Wanneer kan ik alarmnummer 112 bellen? | "U belt het alarmnummer 112 voor spoedeisende hulp." "Bel 112 in levensbedreigende en heterdaad situaties." The examples include "Bij brand." and witnessing "een misdrijf". "De elektriciteit is uitgevallen, de hele straat zit zonder stroom." is not a 112 case; "Ontstaat door de uitval een levensbedreigende situatie, bel dan 112." |
| 6 | https://www.rijksoverheid.nl/vraag-en-antwoord/kinderopvangtoeslag/wanneer-heb-ik-recht-op-kinderopvangtoeslag | Wanneer heb ik recht op kinderopvangtoeslag? | "Kinderopvangtoeslag is een tegemoetkoming voor ouders in de kosten van de kinderopvang." The parents work, study, follow a trajectory to work or a compulsory inburgering course ("Dit geldt ook voor uw toeslagpartner"), and the provider is registered in the LRK. |
| 6 | https://www.rijksoverheid.nl/onderwerpen/kinderbijslag/vraag-en-antwoord/hoe-vraag-ik-kinderbijslag-aan | Hoe vraag ik kinderbijslag aan? | "Kinderbijslag vraagt u aan bij de Sociale Verzekeringsbank (SVB)." |
| 6 | https://www.rijksoverheid.nl/actueel/nieuws/2026/09/21/kabinet-zet-belangrijke-stap-naar-nieuwe-financieringsstelsel-kinderopvang | Kabinet zet belangrijke stap naar nieuwe financieringsstelsel kinderopvang (21-09-2026) | The bill went to the Raad van State (the page itself says "Raad van de State"). "In plaats van de kinderopvangtoeslag komt er vanaf 2029 een inkomensonafhankelijke subsidie …". The toeslag still exists in 2026 and 2027. |
| 7 | https://www.rijksoverheid.nl/vraag-en-antwoord/bezwaar-en-beroep/bezwaar-tegen-beslissing-overheid | Hoe kan ik bezwaar maken tegen een beslissing van de overheid? | "U kunt een bezwaar opsturen naar de overheidsorganisatie die de beslissing heeft genomen." "U moet uw bezwaar indienen binnen 6 weken na bekendmaking van het besluit." The page does not mention the police. |
| 8 | https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartsenpost-spoedeisende-hulp | Wanneer moet ik naar de huisartsenpost of de spoedeisende hulppost? | "Is uw huisartsenpraktijk dicht? Dan verwijst de huisarts u door naar de huisartsenpost." "Neem altijd eerst contact op met uw huisartsenpost voordat u naar de spoedeisende hulppost gaat.", except in a life-threatening situation: "Dan kunt u het beste direct 112 bellen." |
| 8 | https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/ben-ik-vrij-om-zelf-een-huisarts-te-kiezen-en-hoe-verander-ik-van-huisarts | Hoe verander ik van huisarts? | "in de avond, nacht of in het weekend kunt u gebruikmaken van een huisartsenpost". The card's "voor spoed" also matches eindterm 4.3.1 ("Weet dat voor spoedgevallen avond- en weekenddiensten zijn geregeld") in the Regeling above. |
| 9 | https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/sport-en-bewegen/sporten-en-bewegen-voor-kinderen | Sporten en bewegen voor kinderen | "Dit fonds betaalt het lesgeld voor kinderen van wie de ouders het lidmaatschap niet kunnen betalen." The page also says "Het fonds verlaagt de leeftijdsgrens van 4 naar 2 jaar." |
| 9 | https://jeugdfondssportencultuur.nl/veelgestelde-vragen/ | Veelgestelde vragen \| Jeugdfonds Sport & Cultuur (the responsible body) | "We werken samen met veel Nederlandse gemeenten." "Aanvragen gaan via een fonds bij jou in de buurt." "Het Jeugdfonds bekijkt de aanvraag en laat weten of je kind mee kan doen." "Meestal betalen we een groot deel of het hele bedrag van de contributie of het lesgeld." The "Voor ouders" page adds that the application is final only when the Meerkracht reports approval. |
| 9 | https://www.rijksoverheid.nl/vraag-en-antwoord/armoedebestrijding/kan-ik-ondersteuning-voor-mijn-kinderen-krijgen | Kan ik ondersteuning krijgen voor mijn kind(eren)? | "Elke gemeente ondersteunt huishoudens met een laag inkomen. Bijvoorbeeld met een kindpakket." |

Background checks, which are not cited in records: Burgerlijk Wetboek Boek 7 art. 611a (wetten.overheid.nl, "Geldend van 08-10-2026 t/m heden") and Algemene wet bestuursrecht art. 6:15 ("Geldend van 15-08-2026 t/m heden"); see doubts. The eindterm texts of all nine items (1.1.5, 2.1.2, 2.2.1, 3.2.1, 4.3.1, 4.4.1, 6.5.1, 8.1.3, 8.3.2) were read in the current Regeling; none of the mappings changed.

## Key rationale and distractors

1. **Eigen risico, key B.** "Voor de huisarts geldt geen eigen risico" entails "Nee, voor de huisarts geldt het niet." A reverses the rule. C invents a time condition: the evening and huisartsenpost confusion, where the source exempts huisartsenzorg including the huisartsenpost.
2. **Schoolvakantie, key C.** The work exception is the only way to get a holiday outside the school holidays. A has parents decide for themselves, which ignores leerplicht and the fine. B ("nooit") ignores the work exception.
3. **Direct nee, key A.** The card says many people say directly what they want and may clearly refuse an invitation. The key reads the "nee" as a plain, direct refusal for now. B (anger) and C (no contact any more) add emotions or permanent intentions that the words do not carry.
4. **Scholing, key C.** The rule is that the employer pays for a compulsory course for the job. A has Julio pay, which reverses the rule. B names the wrong institution (UWV).
5. **Stroomstoring, key B.** Outages go to the netbeheerder. A names the wrong institution (gemeente). C is the emergency-number confusion; the 112 page names a street-wide power cut as a non-112 case.
6. **Kinderopvangtoeslag, key A.** It is the contribution to childcare costs. B is another regeling for the costs of raising a child, from the SVB. C is another toeslag, for health-insurance costs.
7. **Bezwaar, key B.** Bezwaar goes to the deciding organisation, within six weeks. A names the wrong institution. C (ignoring the decision) is no right.
8. **Huisartsenpost, key A.** Huisartsenzorg when the own practice is closed. B is the hospital emergency department, which you visit only after contacting the huisartsenpost, or via 112. C is the pharmacy.
9. **Jeugdfonds, key C.** The fund can pay and the gemeente helps. A (Belastingdienst, UWV) and B (school, sportleraar) name bodies that do not pay contributie.

## Language control

| # | Item | Card words (sentences) | Prompt words | Option characters A/B/C | Key |
| --- | --- | --- | --- | --- | --- |
| 1 | eigenrisico | 20 (13/7) | 12 | 49/37/41 | B |
| 2 | schoolvakantie | 30 (10/12/8) | 17 | 49/71/71 | C |
| 3 | direct-nee | 16 (9/7) | 19 | 44/29/44 | A |
| 4 | scholing | 24 (9/6/9) | 18 | 34/35/33 | C |
| 5 | stroomstoring | 24 (11/13) | 17 | 16/20/24 | B |
| 6 | kinderopvangtoeslag | 29 (3/16/10) | 20 | 19/13/11 | A |
| 7 | bezwaar | 29 (11/13/5) | 15 | 37/39/35 | B |
| 8 | huisartsenpost | 22 (13/9) | 9 | 46/36/35 | A |
| 9 | jeugdfonds | 30 (5/6/10/9) | 17 | 30/28/30 | C |

All cards are at most 30 words, all prompts at most 20, and every question has three options. No sentence exceeds 18 words. The key is the longest option by more than two characters only in items 6 and 8; both are inherited and discussed under doubts.

## Media consequences

KNM question audio reads the prompt and every option with its letter (`scripts/audio.ts`). Any change to the prompt, an option or the option order therefore needs a new clip.

- **New question audio** (`questions[0].questionAudio`) is needed for six items:
  - `A2:knm:batch006-eigenrisico:1#q1`: option C
  - `A2:knm:batch033-schoolvakantie:1#q1`: option C
  - `A2:knm:batch032-direct-nee:1#q1`: prompt, options and order
  - `A2:knm:batch007-kinderopvangtoeslag:1#q1`: prompt
  - `A2:knm:batch007-bezwaar:1#q1`: option A and order
  - `A2:knm:batch006-huisartsenpost:1#q1`: prompt apostrophe and order
- **Question audio stays valid** for three items, whose prompt, options and order are unchanged: `A2:knm:batch019-scholing:1`, `A2:knm:batch006-stroomstoring:1`, `A2:knm:batch032-jeugdfonds:1`. Their cards, evidence, explanations and sources are not spoken.
- **Images:** no brief changed, so no new drawings. Only the alt text of `batch006-huisartsenpost` changed; the illustration hash covers the brief only.

## Key distribution

Answer order: B C A C B A B A C. A 3, B 3, C 3, which matches the 3/3/3 target. No key appears twice in a row. Items 4, 5 and 9 keep their base keys (C, B, C) as the spec requires. Items 3, 7 and 8 were reordered. Items 1, 2 and 6 keep their option order, because their keys already fit the balance.

## Doubts for the reviewer

1. **Bezwaar distractor (item 7).** I used "Hij mag bij de politie bezwaar maken." instead of the spec's example, "Hij kan de politie vragen het besluit te veranderen.", because anyone can ask, the same weakness as the removed "aangifte" option. A strict reader could cite Awb art. 6:15: a bezwaarschrift sent to an "onbevoegd bestuursorgaan" is forwarded, and the filing date counts. That rule repairs a mistake; it does not create a right to object at the police. Eindterm 6.5.1 mentions bezwaar against bad treatment by the police, which is about police conduct, not gemeente decisions. If you prefer the spec wording, the explanation fits it too.
2. **Scholing card (item 4).** "Moet u voor uw werk een verplichte cursus volgen?" simplifies the FAQ's "opleidingen die de werkgever op grond van de wet of cao verplicht aan de werknemer moet verstrekken". The FAQ says diplomas legally required before a job starts are not automatically covered, and the card does not mention them. I left out the spec's "De cursus telt als werktijd": it is true under BW 7:611a lid 2 ("beschouwd als arbeidstijd"), but the cited FAQ only says "tijdens werktijd … als dat redelijkerwijs mogelijk is". If you want the stronger sentence, add BW 7:611a as a source. Lid 3 excludes some domestic workers, an edge case the card ignores.
3. **Direct nee (item 3).** "zegt dat direct" can also be heard as "says it straight away". I kept "direct" to match the card and eindterm 2.1.2. The rewrite now sits closer to `batch018-directheid` ("Hoe is dat … meestal bedoeld?", with a "boos" distractor); the audit's low "near-duplicate directness" finding stays open. A distractor that would set this item apart is "De buurvrouw wil dat Sabrina het nog een keer vraagt." (a first "no" taken as politeness). It is not applied, because the spec only asked for options that answer the question.
4. **Kinderopvangtoeslag prompt (item 6).** In "Welke regeling helpt bij de kosten?", "de kosten" refers to the daycare just mentioned. A pedantic reader could argue that kinderbijslag also helps with the costs of raising a child; the card and the explanation set the two apart. The key, "Kinderopvangtoeslag", is the longest option because the options are single words; this is inherited.
5. **Huisartsenpost key (item 8).** The key, "Huisartsenzorg als de eigen praktijk dicht is.", is the longest option by 10 characters and repeats the stem "huisarts" from the prompt. Both are inherited and outside the fix list. The clip has to be regenerated anyway, so balancing the lengths would cost no extra media.
6. **Schoolvakantie key (item 2).** The key is still the qualified "Alleen als …" option and ties with B for length (71 characters). This is inherited and follows the KNM pattern of a yes/no answer with a qualification. The source note still mentions a "5-to-18" sentence that is no longer in the card; I left it, per the rule to keep other fields identical.
7. **Stroomstoring (item 5).** The 112 page says "Bel uw elektriciteitsmaatschappij om de stroomstoring te melden.", and eindterm 3.2.1 says "weet hoe hij een storing meldt bij de leverancier van de nutsvoorziening". Both could be read as the supplier. The key is unaffected, because no option offers the supplier and the specific source names the netbeheerder. The kept explanation sentence, "De energieleverancier … lost geen storing op", reads slightly against that wording.
8. **Jeugdfonds (item 9).** The fund does not say in so many words that it is not active everywhere. Its FAQ says it works with "veel" gemeenten through local funds and reviews every application, and the hedge rests on that. Rijksoverheid's own page still says "Dit fonds betaalt het lesgeld …". The card is exactly 30 words.
9. **Eigen risico (item 1).** The card itself does not mention the huisartsenpost. The evening option is ruled out because the card states the exemption without any condition; the explanation adds the huisartsenpost. The medicines sentence is now hedged ("meestal"); delete it if you would rather not discuss medicines at all.
10. **Source notes.** Notes changed only where the verification found something new: the eindterm version (3), a new page for a new claim (1, 5, 9), the time-sensitive 2029 status and the SVB claim (6), and the card rewrite (4). Kinderopvangtoeslag (6) must be retired when the toeslag ends; the plan says 2029, subject to parliament.

## Checker

```text
$ npx tsx scripts/batch-check.ts content/batches/055-original.json
Checked 9 items, 9 questions. Keys: {"B":3,"C":3,"A":3}. Options: {"3":9}.
  info  9 of 9 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
