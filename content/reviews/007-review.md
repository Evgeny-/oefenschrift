# Batch 007 editorial review (KNM, themes 6, 7 and 8)

**Verdict:** Revise. 20 of 24 items pass; 4 need a concrete edit (reisdocument, europese-unie, aansprakelijkheid, kinderopvangtoeslag). No item is rejected. The batch is not ready for integration until the four items are revised and re-reviewed under a new hash.

**Status after three focused re-reviews (10 September 2026):** Pass. All 24 items pass; the batch is cleared for integration at SHA-256 `3779a18e289232c9d65ac290f7c350eee0f5c6bf8a4eca2d1db94c66ce885a4c` (previously `9b045ce8798eeb99ed79649222530b472cc173e5cde15e31866b124f97cbe69c` after the second focused re-review). See the last section, "Focused re-review after the level check".

**Reviewed source:** `content/batches/007-original.json`  
**SHA-256 of the reviewed draft:** `bf4d149cc231df32d1acba2d751ffdffa932518c5247b2e79fab9683079b0a00`  
**Review date:** 10 September 2026. Independent reviewer; the batch was not authored or edited by the reviewer. The author's notes (`content/batches/007-notes.md`) were read only after the items had been judged, and were used to check the claimed source sentences.

## Summary

The batch holds 24 original KNM items in the July 2025 format (one picture brief, one question of at most twenty words, three options), eight per theme, with `theme`, `eindterm`, `sourceUrl`, `sourceNote` and `sourceReviewedAt` on every item. All 24 cited pages were opened on 10 September 2026 (HTTP 200 for all; the participatieverklaring appendix, which wetten.overheid.nl publishes as an image, was downloaded and read as an image). Every key is stated by its source and every distractor is false by that source; no fact is unverifiable. All 24 eindterm numbers exist in bijlage 2 of the Regeling inburgering 2021 (wetten.overheid.nl BWBR0045574, geldend van 18-04-2026) and belong to the stated theme; 19 items test a bullet of their eindterm almost literally, 5 are on topic but map loosely (noted per item, accepted).

The four revisions are editorial, not factual: one option set signals the key by form (reisdocument), one evidence quote does not entail its key and the item repeats the fact of item 1 (europese-unie), one prompt uses a bracketed age that the question audio cannot read (aansprakelijkheid), and one prompt spells its own key while its retire trigger is undated (kinderopvangtoeslag). Key balance stays 8/8/8 if the proposed repairs keep the key letters.

## Checker output

```
npm run batch:check content/batches/007-original.json
Checked 24 items, 24 questions. Keys: {"A":8,"B":8,"C":8}. Options: {"3":24}.
No failures, no warnings.
```

Reviewer's own measurements: prompts 5–18 words (limit 20); fact cards 24–30 words in 3–4 sentences, longest sentence 17 words, average 7.5–10.0 words per sentence (A2 targets: under 12 average, none over 18); options 1–8 words; every evidence quote is a verbatim substring of `text`; IDs and slugs unique and unused in the catalogue; cast descriptions match `config/illustration.json` for all eight characters; every image brief says "no text" and shows nothing that answers its question; all alt texts are neutral Dutch.

## Per-item findings

Source sentences are quoted as read on the cited page on 10 September 2026. "Exact" means the item tests a bullet of the eindterm almost literally; "on topic" means the item sits inside the eindterm's subject but tests something its bullets do not spell out.

### Theme 6 — Instanties

**1. `A2:knm:batch007-reisdocument:1` — 6.2.2 — Revise (options).**  
Source: [rijksoverheid.nl, Moet ik mijn paspoort of identiteitskaart meenemen tijdens reizen naar het buitenland?](https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/moet-ik-mijn-paspoort-of-identiteitskaart-meenemen-tijdens-reizen-naar-het-buitenland): "Ja, u heeft een paspoort of identiteitskaart nodig als u de grens over gaat … Daarom moet u altijd een geldig paspoort of geldige identiteitskaart meenemen. Ook naar een Europees land zonder grenscontrole." and "Het rijbewijs is in het buitenland geen officieel identiteitsbewijs."  
Fact verified; key A true, B and C false; stable rule. Eindterm on topic but loose: 6.2.2 is about the rules and procedures for obtaining documents and where to apply; no closer eindterm exists. Failure: the distractors begin with "Alleen" and the key does not, so the options are not parallel and the odd one out signals the key (blueprint §5). "Alleen" was needed because a train ticket is indeed something he must take.  
Level: comparable (18-word persona prompt, three 4-word options).

**2. `A2:knm:batch007-naturalisatie:1` — 6.2.3 — Pass.**  
Source: [ind.nl, Nederlander worden door naturalisatie](https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie) (Laatste update: 1 september 2026): "U voldoet aan het inburgeringsvereiste. Dit betekent dat u het inburgeringsexamen moet hebben gehaald op minimaal taalniveau A2. Soms hebt u vrijstelling van het inburgeringsexamen."; "U vraagt naturalisatie aan bij de gemeente waar u woont."; "De IND beslist op uw verzoek om naturalisatie." Companion [ind.nl, Inburgering voor naturalisatie](https://ind.nl/nl/inburgering-voor-naturalisatie): "Dit betekent meestal dat u een inburgeringsdiploma moet hebben."  
Fact verified; a house or a permanent contract is nowhere among the conditions. Pending law checked: the bill lengthening the residence term (consultation 30-09-2025 to 01-12-2025, "De overige voorwaarden voor naturalisatie wijzigen niet") and the announced B1 level do not touch the key, because the item names neither the term nor the level; the fact card's "meestal" covers exemptions. No retire-by; re-check the IND page at every release. Eindterm on topic (rules for naturalisation; the bullets name where to apply, which the fact card also states).  
Level: comparable. Optional: replace "inburgeringsvereiste" in the explanation with plainer words.

**3. `A2:knm:batch007-jaaropgave:1` — 6.3.1 — Pass.**  
Source: [belastingdienst.nl, Deze gegevens hebt u nodig bij het invullen van uw belastingaangifte](https://www.belastingdienst.nl/wps/wcm/connect/nl/belastingaangifte/content/welke_gegevens_heb_ik_nodig_voor_mijn_belastingaangifte), under Inkomsten: "uw jaaropgaven over 2025. En als u die niet hebt: uw salarisstroken". Companion [Wat staat er in een jaaropgaaf?](https://www.belastingdienst.nl/wps/wcm/connect/nl/jongeren/content/wat-staat-er-in-een-jaaropgaaf): "Je werkgever stuurt de jaaropgaaf aan het begin van het nieuwe jaar - meestal in januari of februari".  
Fact verified; the contract is not on the checklist, the pensioenoverzicht comes from a pension fund. Salary slips rightly kept out of the options (a fallback on the checklist). The tax year changes yearly and is not in the item. Eindterm exact.  
Level: comparable (10-word question, 2-word options).

**4. `A2:knm:batch007-kinderbijslag:1` — 6.3.3 — Pass.**  
Source: [rijksoverheid.nl, Hoe vraag ik kinderbijslag aan?](https://www.rijksoverheid.nl/vraag-en-antwoord/kinderbijslag/hoe-vraag-ik-kinderbijslag-aan): "Kinderbijslag vraagt u aan bij de Sociale Verzekeringsbank (SVB)."; "De gemeente geeft de aangifte van de geboorte van uw kind door aan de SVB. Ongeveer 2 tot 4 weken na de aangifte krijgt u van de SVB een brief. Daarna kunt u de kinderbijslag aanvragen op de website van de SVB."  
Fact verified; the gemeente only passes the birth on, the Belastingdienst handles toeslagen. The explanation's "De Belastingdienst gaat over belasting en toeslagen" follows the wording of eindterm 6.3.3 (execution sits with Dienst Toeslagen; acceptable at A2). Eindterm exact bullet.  
Level: comparable; the longer distractor "Bij de gemeente waar zij wonen" does not read as more specific than the key.

**5. `A2:knm:batch007-identificatieplicht:1` — 6.4.1 — Pass.**  
Source: [rijksoverheid.nl, Wat is de identificatieplicht?](https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/wat-is-de-identificatieplicht): "De identificatieplicht houdt in dat iedereen vanaf 14 jaar een geldig identiteitsbewijs moet kunnen tonen als de politie daar om vraagt."; "U bent strafbaar als u geen origineel en geldig identiteitsbewijs kunt of wilt laten zien. U loopt dan het risico op een boete." Companion [Geldt de identificatieplicht ook voor minderjarigen?](https://www.rijksoverheid.nl/vraag-en-antwoord/identificatieplicht/geldt-de-identificatieplicht-ook-voor-minderjarigen): "Er zijn 2 uitzonderingen: in de zorg en in het openbaar vervoer."; "In het openbaar vervoer geldt een identificatieplicht bij personen vanaf 12 jaar bij reizen zonder geldig vervoersbewijs …".  
Fact verified; exceptions checked: the police may not check without reason and healthcare has no age limit, neither makes 16 or 18 defensible; the prompt has the officer asking. The explanation's 12-year aside matches the companion page and the eindterm's own parenthesis. Eindterm exact bullet.  
Level: comparable (one 16-word sentence, within the ceiling). Optional: drop the public-transport aside for A2 readers.

**6. `A2:knm:batch007-bezwaar:1` — 6.5.1 — Pass.**  
Source: [rijksoverheid.nl, Hoe kan ik bezwaar maken tegen een beslissing van de overheid?](https://www.rijksoverheid.nl/vraag-en-antwoord/bezwaar-en-beroep/bezwaar-tegen-beslissing-overheid): "U kunt een bezwaar opsturen naar de overheidsorganisatie die de beslissing heeft genomen. Dit kan per post en digitaal. U moet uw bezwaar indienen binnen 6 weken na bekendmaking van het besluit."  
Fact verified; the exceptions on the page (general rules, administratief beroep) do not apply to a decision addressed to Karim. "Welk recht heeft hij?" asks for a legal right, not for behaviour. Eindterm on topic (bezwaar against the government is the core of 6.5.1).  
Level: comparable.

**7. `A2:knm:batch007-juridischloket:1` — 6.5.2 — Pass.**  
Source: [rijksoverheid.nl, Waar vind ik gratis hulp of advies bij een juridisch probleem?](https://www.rijksoverheid.nl/vraag-en-antwoord/bescherming-van-consumenten/waar-kan-ik-terecht-voor-hulp-bij-een-juridisch-probleem-of-conflict): "Het Juridisch Loket geeft daarnaast gratis persoonlijk advies als u een inkomen en vermogen onder een bepaalde grens heeft. Juristen helpen u om een oplossing te vinden voor uw situatie."; "Voor telefonisch contact met het Juridisch Loket kunt u gratis bellen naar 0800 - 8020."  
Fact verified; the page's other free helpers (rechtswinkels, sociaal raadslieden) are not options, so one defensible answer; the ombudsman and the police give no legal advice. The income limit changes yearly and is not in the item. Eindterm exact (its eigen-bijdrage bullet concerns subsidised lawyers, not the Loket).  
Level: comparable. Optional: the key repeats "juridisch" from the prompt; inherent in the name.

**8. `A2:knm:batch007-wa-verzekering:1` — 6.6.1 — Pass.**  
Source: [rijksoverheid.nl, Moet ik een WA-verzekering afsluiten als ik een auto of ander voertuig heb?](https://www.rijksoverheid.nl/vraag-en-antwoord/auto/wa-verzekering-voertuig): "Heeft u een auto, motor, scooter, brommer of snorfiets? Dan moet u volgens de Wet aansprakelijkheidsverzekering motorrijtuigen (Wam) een WA-verzekering afsluiten."; "Als uw motorrijtuig schade veroorzaakt dekt een WA-verzekering deze in de meeste gevallen."  
Fact verified; allrisk is voluntary, inboedel is unrelated. Does not repeat the basisverzekering card. Eindterm exact bullet.  
Level: comparable.

### Theme 7 — Staatsinrichting en rechtsstaat

**9. `A2:knm:batch007-wetten:1` — 7.1.1 — Pass.**  
Source: [rijksoverheid.nl, Hoe komt een wet tot stand?](https://www.rijksoverheid.nl/themas/overheid-en-democratie/wetgeving/hoe-komt-een-wet-tot-stand): "De regering maakt wetten in samenwerking met de Eerste en Tweede Kamer (wetgevende macht)."; "Meestal dient de regering (de Koning en de ministers) een wetsvoorstel in." Companion [Taken en rechten parlement](https://www.rijksoverheid.nl/themas/overheid-en-democratie/parlement/taken-en-rechten-parlement): "Het parlement bestaat uit de Eerste Kamer en de Tweede Kamer."  
Fact verified; the King does not legislate alone, judges apply law. Eindterm exact bullet.  
Level: comparable.

**10. `A2:knm:batch007-europese-unie:1` — 7.1.2 — Revise (prompt, options, explanation).**  
Source: [rijksoverheid.nl, Vrij verkeer en verblijf personen binnen EU/EER en Zwitserland](https://www.rijksoverheid.nl/themas/migratie-en-reizen/immigratie-naar-nederland/vrij-verkeer-en-verblijf-personen-binnen-eu-eer-en-zwitserland): "Hebben personen de nationaliteit van 1 van deze landen of van Zwitserland? Dan mogen zij binnen deze landen vrij reizen. Ze mogen ook binnen de deze landen wonen en werken. Ze hebben geen visum, verblijfsvergunning of werkvergunning nodig. Wel hebben ze een geldig paspoort of een identiteitskaart nodig en gelden er bepaalde voorwaarden." The rule is stated for nationals of any EU/EER country within any of these countries, so it covers a Dutch citizen in Spain.  
Facts verified: B and C false, A true by the source. Failure: the stored evidence ("Zij hebben daarvoor geen visum, verblijfsvergunning of werkvergunning nodig") only rules out the distractors; the fact card never says a passport or identity card is needed, so the quote does not entail the key (rubric 6, 12) and the explanation asserts something the text does not contain. Also: the key repeats the fact of item 1, both distractors end in "van Spanje" while the key does not, and the eindterm's bullet is free movement ("vrij verkeer van personen … vrije vestiging in lidstaten"), which the key does not test.  
Level: comparable.

**11. `A2:knm:batch007-hoger-beroep:1` — 7.1.3 — Pass.**  
Source: [rechtspraak.nl, Rechtspraak in Nederland](https://www.rechtspraak.nl/organisatie-en-contact/rechtspraak-in-nederland): "Bij een juridisch conflict beslist de rechter. Is 1 van de partijen het niet eens met het vonnis, dan kan deze in hoger beroep bij het gerechtshof …"; "Wie het niet eens is met een vonnis, kan in hoger beroep gaan. Een hogere rechter kijkt opnieuw naar de zaak, met een frisse blik."; "Het oordeel van de rechter is bindend." Companion [rijksoverheid.nl, Kan ik als verdachte in een strafzaak in hoger beroep …](https://www.rijksoverheid.nl/vraag-en-antwoord/rechtspraak-en-geschiloplossing/kan-ik-als-verdachte-in-een-strafzaak-in-hoger-beroep-tegen-de-uitspraak-van-de-rechter): "Bij veel strafzaken kunt u in hoger beroep tegen de uitspraak."  
Fact verified with the responsible body; "meestal" in the fact card covers cases without appeal. "Welke mogelijkheid heeft hij?" asks for a legal option, not advice; it is the closest of the batch to the retired behaviour form. Eindterm exact bullet.  
Level: comparable. Optional safer form: "Wat is hoger beroep?" keyed "Een hogere rechter bekijkt de zaak opnieuw."

**12. `A2:knm:batch007-meningsuiting:1` — 7.2.2 — Pass.**  
Source: [wetten.overheid.nl, Besluit inburgering 2021, bijlage Participatieverklaring](https://wetten.overheid.nl/BWBR0045555/2026-04-02#Bijlage), published as an image ([266378.png](https://wetten.overheid.nl/afbeelding?toestandid=BWBR0045555/2026-04-02_0&naam=266378.png)) that the reviewer downloaded and read: "In Nederland mag iedereen denken, doen en zeggen wat hij wil. Dit betekent dat: - iedereen zijn eigen mening mag uiten; … Hier zijn ook grenzen aan verbonden. Wat iemand doet of zegt mag nooit in strijd zijn met de wet. Je mag bijvoorbeeld niet discrimineren, aanzetten tot haat of oproepen tot vijandigheid." Second sources read: Wetboek van Strafrecht art. 137d lid 1 ([BWBR0001854](https://wetten.overheid.nl/BWBR0001854/2026-01-01)): "Hij die in het openbaar … aanzet tot haat tegen of discriminatie van mensen … wordt gestraft …"; Grondwet art. 7 lid 1 ([BWBR0001840](https://wetten.overheid.nl/BWBR0001840/2023-02-22)) "behoudens ieders verantwoordelijkheid volgens de wet".  
Fact verified; criticism of the government and minority opinions are protected. Eindterm exact bullet.  
Level: comparable. Optional: "Wat is toch verboden?" reads oddly; "Wat mag volgens de wet niet?" is plainer.

**13. `A2:knm:batch007-godsdienstvrijheid:1` — 7.2.3 — Pass.**  
Source: the same participatieverklaring image: "iedereen een eigen geloof mag hebben en vrij is wel of niet te geloven"; Grondwet art. 6 lid 1: "Ieder heeft het recht zijn godsdienst of levensovertuiging, individueel of in gemeenschap met anderen, vrij te belijden, behoudens ieders verantwoordelijkheid volgens de wet."  
Fact verified; no state religion, religion not inherited by law. Eindterm exact bullet.  
Level: comparable.

**14. `A2:knm:batch007-geweldloos-opvoeden:1` — 7.2.6 — Pass.**  
Source: [wetten.overheid.nl, Burgerlijk Wetboek Boek 1, artikel 247](https://wetten.overheid.nl/jci1.3:c:BWBR0002656&boek=1&titeldeel=14&afdeling=2&artikel=247) (resolves to BWBR0002656/2025-07-05), lid 2: "In de verzorging en opvoeding van het kind passen de ouders geen geestelijk of lichamelijk geweld of enige andere vernederende behandeling toe."  
Fact verified from the law text; no exception for disobedience or for the home. Neutral tone, calm picture. Eindterm exact ("slaan van kinderen").  
Level: comparable.

**15. `A2:knm:batch007-donorregister:1` — 7.2.7 — Pass.**  
Source: [rijksoverheid.nl, Orgaan- en weefseldonatie na overlijden](https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/orgaandonatie-en-weefseldonatie/actieve-donorregistratie): "Als mensen geen keuze invullen, komen zij in het Donorregister met 'geen bezwaar tegen orgaandonatie'. Hun organen en weefsels mogen dan na hun overlijden aan een patiënt gedoneerd worden. Ze zijn orgaandonor."; "Wie 18 wordt, krijgt een brief met de vraag om een keuze in te vullen in het Donorregister."; "Iemand kan op elk moment de keuze in het Donorregister veranderen."; for newcomers: "Na 3 jaar in Nederland krijgen zij de vraag om hun keuze in het Donorregister in te vullen."; exception: "In sommige gevallen beslissen nabestaanden over donatie. Dit gebeurt bijvoorbeeld als de overledene (nog) niet in het Donorregister staat."  
Fact verified. Exception check: relatives decide only for someone not yet in the register (newcomers in their first three years) and can object in some situations; for a 65-year-old resident the registration is "geen bezwaar", so B stays false. Eindterm exact.  
Level: comparable. Recommended (not blocking), because the learners are newcomers: add "Wie nieuw in Nederland komt, krijgt die brief na 3 jaar." to the fact card.

**16. `A2:knm:batch007-zelfbeschikking:1` — 7.2.8 — Pass.**  
Source: [rijksoverheid.nl, Aanpak huwelijksdwang](https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/huwelijksdwang/huwelijksdwang-voorkomen): "Als 1 of beide partners onder grote druk worden gezet om te trouwen, is er sprake van huwelijksdwang. … De druk komt van ouders, familie of breder vanuit de gemeenschap."; "Huwelijksdwang is strafbaar."; "Daders kunnen maximaal 2 jaar gevangenisstraf krijgen."; "Beide partners moeten minimaal 18 jaar zijn om in Nederland te kunnen trouwen." Participatieverklaring image: "iedereen recht heeft op eigen keuzen en zelfstandigheid (zelfbeschikkingsrecht)".  
Fact verified; the page's note that soft pressure is not always prosecuted does not touch the key, which speaks of dwang. Eindterm exact.  
Level: comparable.

### Theme 8 — Onderwijs en opvoeding

**17. `A2:knm:batch007-vmbo:1` — 8.1.1 — Pass.**  
Source: [rijksoverheid.nl, Hoe zit het vmbo in elkaar?](https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-het-vmbo-in-elkaar): "Het vmbo maakt leerlingen klaar voor een opleiding in het mbo. Soms stromen leerlingen na het vmbo door naar de havo." Companions: [havo](https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-de-havo-in-elkaar) "De havo bereidt leerlingen voor op een studie in het hoger beroepsonderwijs (hbo)."; [vwo](https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-het-vwo-in-elkaar) "… bereidt leerlingen voor op een studie aan de universiteit."  
Fact verified; the havo was rightly avoided as a distractor. "De meeste leerlingen" is a soft inference from the source (true, defensible, not literal). Eindterm exact.  
Level: comparable. Optional: "Welke opleiding volgt meestal na het vmbo?" mirrors the source more closely.

**18. `A2:knm:batch007-bijzondere-school:1` — 8.1.2 — Pass.**  
Source: [rijksoverheid.nl, Openbaar en bijzonder onderwijs](https://www.rijksoverheid.nl/themas/onderwijs/vrijheid-van-onderwijs/openbaar-en-bijzonder-onderwijs): "Bijzondere scholen geven les vanuit een godsdienst, levensovertuiging of een visie op het onderwijs. De lessen op een openbare school zijn niet vanuit een godsdienst of levensovertuiging."; "De overheid betaalt voor beide soorten onderwijs."  
Fact verified; speciaal onderwijs and fee-paying are the intended confusions; the page's openbare montessorischool remark makes no distractor true. Eindterm exact bullet.  
Level: comparable (one 17-word sentence at the ceiling, with "levensovertuiging" explained by the example).

**19. `A2:knm:batch007-seksuele-vorming:1` — 8.1.5 — Pass.**  
Source: [rijksoverheid.nl, Relationele en seksuele vorming](https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/gezondheid-en-preventie/seksuele-gezondheid/relationele-en-seksuele-vorming): "landelijke kerndoelen … van en voor het basisonderwijs en de onderbouw van het voortgezet onderwijs. Hierdoor zijn scholen verplicht aandacht te geven aan relationele en seksuele vorming"; "Scholen bepalen zelf op welke manier zij aandacht geven aan de onderwijsdoelen."; "Op dit moment worden alle doelen voor basisscholen en middelbare scholen aangepast."  
Fact verified; the kerndoelen are being revised, the obligation is the eindterm itself. No retire-by; re-check yearly. Eindterm exact.  
Level: comparable.

**20. `A2:knm:batch007-aansprakelijkheid:1` — 8.2.1 — Revise (prompt form).**  
Source: [rijksoverheid.nl, Welke rechten en plichten gelden er bij ouderlijk gezag?](https://www.rijksoverheid.nl/vraag-en-antwoord/ouderlijk-gezag/rechten-plichten-ouderlijk-gezag): "Uw kind is jonger dan 14 jaar. Dan bent u aansprakelijk voor wat het kind doet. U moet dan bijvoorbeeld de kosten betalen als het kind schade aanricht."; "Uw kind is tussen de 14 jaar en 16 jaar. Dan hangt het van de situatie af of u aansprakelijk bent."; "Vanaf 16 jaar is een kind zelf aansprakelijk."  
Fact verified; the eindterm says "tot het zestiende levensjaar", the law makes parents fully liable under 14 and conditionally at 14–15; with a nine-year-old the key holds under both. Failure is the prompt form only: "De dochter van Fatima (9)" uses a bracketed age that the generated question audio will read as a parenthesis or skip; official prompts state ages in words. Eindterm exact.  
Level: comparable.

**21. `A2:knm:batch007-medezeggenschapsraad:1` — 8.2.2 — Pass.**  
Source: [rijksoverheid.nl, Hoe kan ik als ouder bij de school betrokken zijn?](https://www.rijksoverheid.nl/vraag-en-antwoord/basisonderwijs/hoe-kan-ik-als-ouder-bij-de-school-betrokken-zijn): "Meepraten over het schoolbeleid kan door lid te worden van de medezeggenschapsraad of de ouderraad."; "In het basisonderwijs en voortgezet onderwijs heeft elke school een medezeggenschapsraad (MR). … De MR overlegt met de directie en het schoolbestuur over het beleid, zoals het schoolplan of het schoolreglement. Om lid te worden van de MR moet u gekozen worden."  
Fact verified; the ouderraad is not an option, so one defensible answer. Eindterm on topic (parental involvement; the bullets name overlegmomenten and voluntary help rather than the MR).  
Level: comparable.

**22. `A2:knm:batch007-ouderbijdrage:1` — 8.3.1 — Pass.**  
Source: [rijksoverheid.nl, Is de vrijwillige ouderbijdrage voor extra activiteiten op school verplicht?](https://www.rijksoverheid.nl/vraag-en-antwoord/financiering-onderwijs/is-de-vrijwillige-ouderbijdrage-op-de-basisschool-en-middelbare-school-verplicht): "De vrijwillige ouderbijdrage voor extra activiteiten buiten de lessen om is niet verplicht. Extra activiteiten zijn bijvoorbeeld schoolreizen, sportdagen of speciale onderwijsprogramma's zoals tweetalig onderwijs. Kinderen van ouders die hiervoor niet betalen, mogen altijd meedoen."  
Fact verified; same rule for all school types. Eindterm exact bullet.  
Level: comparable. Optional: "Nee, die bijdrage is vrijwillig." removes the key-only echo of "ouderbijdrage".

**23. `A2:knm:batch007-kinderopvangtoeslag:1` — 8.3.2 — Revise (prompt word; dated retire trigger).**  
Source: [rijksoverheid.nl, Wanneer heb ik recht op kinderopvangtoeslag?](https://www.rijksoverheid.nl/vraag-en-antwoord/kinderopvangtoeslag/wanneer-heb-ik-recht-op-kinderopvangtoeslag): "Kinderopvangtoeslag is een tegemoetkoming voor ouders in de kosten van de kinderopvang."; condition: "U werkt, studeert of volgt een traject om werk te vinden. Of u volgt verplicht een inburgeringscursus bij een gecertificeerde instelling." Pending change checked on [Plannen kabinet voor nieuwe financiering kinderopvang](https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/kinderopvang/plannen-kabinet-voor-nieuwe-financiering-kinderopvang): "De kinderopvangtoeslag wordt afgeschaft. … De nieuwe financiering moet op 1 januari 2029 ingaan."; "De Eerste en de Tweede kamer moeten nog over het wetsvoorstel beslissen. … Daarna komt het wetsvoorstel in het najaar van 2026 bij de Tweede Kamer."  
Fact verified and true today. Retire-by: the wording does not survive the abolition of the toeslag, so the item must be retired when the new financing starts (planned 1 January 2029) and re-checked yearly; the sourceNote's trigger should carry that date. Failure (minor): the prompt word "kinderopvang" together with "toeslag" spells the key and appears in no distractor (blueprint §5). Eindterm exact.  
Level: comparable.

**24. `A2:knm:batch007-studiefinanciering:1` — 8.3.3 — Pass.**  
Source: [duo.nl, Aanvragen – Studiefinanciering](https://duo.nl/particulier/studiefinanciering/aanvragen.jsp) (Laatste update 07 september 2026): "Doet u mbo, hbo of universiteit? Dan kunt u studiefinanciering aanvragen."; "Log in op Mijn DUO om studiefinanciering aan te vragen." The fact card's last sentence is supported by [ind.nl, Inburgering voor naturalisatie](https://ind.nl/nl/inburgering-voor-naturalisatie): "U doet het inburgeringsexamen bij DUO."  
Fact verified; the gemeente (studietoeslag) and the Belastingdienst run other schemes; Sem being 18 avoids the under-18 mbo rule; amounts are not in the item. Eindterm exact.  
Level: comparable.

## Revision requests

**`A2:knm:batch007-reisdocument:1`**
- Field: `questions[0].options` (and prompt). Failure: two distractors start with "Alleen", the key does not; options are not parallel and the odd one out signals the key. Repair: ask for the identity document so "alleen" is unnecessary: prompt "Meneer De Vries woont in Nederland. Hij gaat met de trein naar Duitsland. Welk identiteitsbewijs moet hij meenemen?" (18 words); options A "Zijn paspoort of identiteitskaart", B "Zijn Nederlandse rijbewijs", C "Zijn OV-chipkaart" (a card with a photo, a plausible confusion; "Zijn zorgpas" also works). Key stays A. Acceptance condition: three parallel noun phrases without "alleen".

**`A2:knm:batch007-europese-unie:1`**
- Fields: `questions[0].prompt`, `options`, `explanation` (evidence may stay). Failure: the evidence quote does not entail the key; the key repeats item 1's fact; both distractors share the tail "van Spanje"; the eindterm bullet is free movement. Repair: reframe on the free-movement rule so the existing evidence keys the answer: prompt "Een Nederlander wil in Spanje wonen en werken. Heeft hij daarvoor een werkvergunning nodig?" (14 words); options A "Nee, EU-burgers mogen daar vrij wonen en werken.", B "Ja, hij heeft een werkvergunning van Spanje nodig.", C "Ja, hij heeft een visum van Spanje nodig."; key stays A; explanation "Nederland is lid van de EU. Binnen de EU geldt vrij verkeer van personen: een Nederlander mag in Spanje wonen en werken zonder visum, verblijfsvergunning of werkvergunning. Hij heeft wel een geldig paspoort of een geldige identiteitskaart nodig." Minimal alternative if the document question is kept: add "Zij hebben alleen een geldig paspoort of een geldige identiteitskaart nodig." to `text`, quote it as evidence, and rewrite the distractors without the shared tail; this still leaves the overlap with item 1.

**`A2:knm:batch007-aansprakelijkheid:1`**
- Field: `questions[0].prompt`. Failure: bracketed age "(9)" is not read-aloud friendly and not the official question form. Repair: "De dochter van Fatima is 9 jaar. Zij maakt de fiets van de buurman kapot. Wie moet de schade betalen?" (19 words). Nothing else changes.

**`A2:knm:batch007-kinderopvangtoeslag:1`**
- Field: `questions[0].prompt`. Failure: the prompt word "kinderopvang" appears only in the key. Repair: "Julio en zijn vrouw werken allebei. Hun dochter van 2 gaat naar een kinderdagverblijf. Welke toeslag is daarvoor?" (18 words); the fact card may keep "kinderopvang".
- Field: `sourceNote`. Failure: the retire trigger is undated. Repair: append "Planned abolition 1 January 2029 (wetsvoorstel financiering kinderopvang, to the Tweede Kamer autumn 2026); retire when the new financing starts; re-check yearly."

Recommended, not blocking: `donorregister` — add the three-year rule for newcomers to the fact card. Optional polish (item notes above): naturalisatie (explanation wording), juridischloket and ouderbijdrage (prompt-word echo), meningsuiting ("toch"), vmbo ("de meeste"), identificatieplicht (explanation aside), hoger-beroep (safer definitional form).

## Coverage per theme

Eindtermen verified against bijlage 2 of the Regeling inburgering 2021 on [wetten.overheid.nl (BWBR0045574, geldend van 18-04-2026)](https://wetten.overheid.nl/BWBR0045574/2026-04-18); the Staatscourant page cited in the author's notes (stcrt-2024-15802) returned HTTP 500 at review time.

| Theme | Items | Distinct eindtermen covered | Exact bullet | On topic, loose | Not covered in this batch |
| --- | --- | --- | --- | --- | --- |
| 6 Instanties | 8 | 6.2.2, 6.2.3, 6.3.1, 6.3.3, 6.4.1, 6.5.1, 6.5.2, 6.6.1 | 6.3.1, 6.3.3, 6.4.1, 6.5.2, 6.6.1 | 6.2.2, 6.2.3, 6.5.1 | 6.1.1 (DigiD card exists), 6.1.2, 6.2.1 (verhuizing card exists), 6.2.4, 6.3.2 |
| 7 Staatsinrichting en rechtsstaat | 8 | 7.1.1, 7.1.2, 7.1.3, 7.2.2, 7.2.3, 7.2.6, 7.2.7, 7.2.8 | 7.1.1, 7.1.3, 7.2.2, 7.2.3, 7.2.6, 7.2.7, 7.2.8 | 7.1.2 (after revision: exact) | 7.1.4 (stemmen card exists), 7.2.1, 7.2.4 (discriminatie card exists), 7.2.5 |
| 8 Onderwijs en opvoeding | 8 | 8.1.1, 8.1.2, 8.1.5, 8.2.1, 8.2.2, 8.3.1, 8.3.2, 8.3.3 | 8.1.1, 8.1.2, 8.1.5, 8.2.1, 8.3.1, 8.3.2, 8.3.3 | 8.2.2 | 8.1.3 (leerplicht card exists), 8.1.4, 8.2.3 |

Keys: A 8, B 8, C 8 (theme 6: 3/3/2; theme 7: 3/2/3; theme 8: 2/3/3). Question forms: 15 persona facts, 7 direct facts, 4 yes/no with qualification; no behaviour questions. Each eindterm in the batch is covered once; the launch-bank target of twice per eindterm needs the next batch, for which the author's section 5 lists verified spare facts (not reviewed here).

Overlap: no item repeats a study card (inschrijven, verhuizing, DigiD, basisverzekering, 112, leerplicht, stemmen, discriminatie) or a batch 006 item (themes 1, 3, 4). Within the batch, items 1 and 10 currently share the key "paspoort of identiteitskaart" (resolved by the europese-unie revision); items 4 and 23 both feature Julio's young children and mention kinderbijslag, but test different facts.

## Stability and retire-by notes

- `kinderopvangtoeslag`: retire when the kinderopvangtoeslag is abolished (planned 1 January 2029; bill to the Tweede Kamer autumn 2026, both chambers still to decide). Re-check yearly and at every release.
- `naturalisatie`: no retire-by. The bill lengthening the residence term to ten years (consultation closed 1 December 2025; "De overige voorwaarden voor naturalisatie wijzigen niet") and the announced B1 level do not change the key; the item names neither number. Re-check the IND page at every release.
- `seksuele-vorming`: no retire-by; the kerndoelen are being revised, the obligation stays. Re-check yearly.
- `juridischloket`, `studiefinanciering`, `jaaropgave`: yearly amounts, limits and tax years change; none is in the items.
- All other items rest on constitutional, statutory or structural rules (Grondwet, BW, Awb, Wam, Donorwet, WMS, EU treaties) with no announced change.

## Limitations

- This is an AI editorial review. It does not replace review by Dutch-language educators, learner trials, blueprint validation or psychometric calibration, and it does not establish equivalence with the official DUO KNM exam. The A2 label remains an unvalidated authoring target.
- Official pages support the facts, not the difficulty or exam likeness of the questions. `content/exemplars/` does not exist, so the level check compares each item with the official item shape described in the blueprint and the research document (photo, question of at most twenty words, three short options, A2 language), not with two exemplars.
- Facts were checked on 10 September 2026; time-sensitive items must be rechecked as noted above.
- The participatieverklaring (items 12, 13, 16) is published as an image on wetten.overheid.nl; the reviewer read the image itself. The Staatscourant publication of the eindtermen returned a server error; the consolidated regulation on wetten.overheid.nl was used instead.
- Several fact-card sentences stay close to the Rijksoverheid wording (kinderbijslag, bijzondere school, vmbo). Government information is free to reuse and the rubric's originality check targets official exam items and commercial courses; questions, options and explanations are original.
- The SHA-256 above is that of the reviewed draft. The revision round changes the file; a focused re-review of the four changed items with a new hash is required before `ready_for_integration` can be set. `npm run content:integrate` was not run.

## Focused re-review (10 September 2026)

**Scope:** the five items the coordinator changed after the review above (four revision requests plus the donorregister recommendation), as described at the end of `content/batches/007-notes.md`. Independent reviewer; the batch file was not edited.

**Verdict:** Revise. Four of the five items pass (reisdocument, aansprakelijkheid, kinderopvangtoeslag, donorregister); europese-unie needs one more option edit. `ready_for_integration` stays false and `source_sha256` stays at the first review's hash until that edit is re-reviewed under a new hash.

**File re-reviewed:** `content/batches/007-original.json`, SHA-256 `b3aa398a9be0db8a1cf81c82121a60113af251e992f5ac124966a743f13507c8` (the hash the coordinator announced). `npm run batch:check content/batches/007-original.json`: "Checked 24 items, 24 questions. Keys: {"A":8,"B":8,"C":8}. Options: {"3":24}. No failures, no warnings."

**Nothing else changed.** The author's generator (`build007.mjs` in the shared scratchpad) was re-run into a private scratch file; its output hashes to `bf4d149c…` exactly, so it is the draft reviewed above. A field-by-field comparison of that draft with the current file shows changes in exactly five items and only in the fields listed below; the other 19 items are byte-identical. Their prompt word counts, theme, eindterm and source URL match the per-item record above, as do the strings the first review quotes from eight of them (kinderbijslag option C "Bij de gemeente waar zij wonen" and its Belastingdienst sentence, the hoger-beroep and meningsuiting prompt phrases, "inburgeringsvereiste" in the naturalisatie explanation, the 12-year aside in identificatieplicht, "de meeste leerlingen" in vmbo, the key echoes in ouderbijdrage and juridischloket, Sem's age and the DUO evidence in studiefinanciering). Keys: A 8, B 8, C 8 (theme 6: 3/3/2; theme 7: 3/2/3; theme 8: 2/3/3), unchanged. All 24 items still carry `sourceReviewedAt` 2026-09-10, `status` draft, `taskType` feit.

Sources for the five items were fetched again on 10 September 2026 with curl (all HTTP 200): the five cited pages, the kinderopvang policy page and one page of the responsible body for the Donorregister.

### Per item

**1. `A2:knm:batch007-reisdocument:1` — Pass.** Changed: prompt, options B and C, explanation.  
Prompt "Meneer De Vries woont in Nederland. Hij gaat met de trein naar Duitsland. Welk identiteitsbewijs moet hij meenemen?" is 18 words (limit 20), three short main clauses in everyday words; "identiteitsbewijs" is the official term the identificatieplicht item also uses. Options "Zijn paspoort of identiteitskaart" / "Zijn Nederlandse rijbewijs" / "Zijn zorgpas" are three parallel noun phrases of the form "Zijn + noun" without "alleen", which was the acceptance condition. Key A is stated by the fact text (evidence "heeft een geldig paspoort of een geldige identiteitskaart nodig", verbatim) and by the cited page: "Ja, u heeft een paspoort of identiteitskaart nodig als u de grens over gaat … Daarom moet u altijd een geldig paspoort of geldige identiteitskaart meenemen. Ook naar een Europees land zonder grenscontrole." B is false by "Het rijbewijs is in het buitenland geen officieel identiteitsbewijs." (plausible: the licence is valid identification inside the Netherlands); C is false because a health-insurance card is not an identity document (plausible: a named card shown at the doctor next to an identity document); the new explanation names both. No prompt word recurs only in the key ("identiteitsbewijs" shares a stem with A "identiteitskaart" and with B "rijbewijs").  
Residual, not blocking: the key is now the longest option by one word (4/3/2 words, 33/26/12 characters). The two-noun key is inherent to the rule, the form is parallel, and the checker's spread warning does not fire. Optional: C "Zijn persoonlijke OV-chipkaart" (4 words; a named card with a photo, grounded in the train scenario, also offered in the first review) evens the lengths. The rationale for "Zijn zorgpas" must be recorded in the batch notes, which still explain the retired "treinkaartje" distractor.

**2. `A2:knm:batch007-europese-unie:1` — Revise (options B and C).** Changed: prompt, options, explanation.  
What now holds: the prompt "Een Nederlander wil in Spanje wonen en werken. Heeft hij daarvoor een werkvergunning nodig?" (14 words) is a yes/no with qualification; the unchanged evidence "Zij hebben daarvoor geen visum, verblijfsvergunning of werkvergunning nodig" entails the keyed answer, and the key's qualification "EU-burgers mogen daar vrij wonen en werken" is the preceding sentence of the fact text. The cited page still reads: "Hebben personen de nationaliteit van 1 van deze landen of van Zwitserland? Dan mogen zij binnen deze landen vrij reizen. Ze mogen ook binnen de deze landen wonen en werken. Ze hebben geen visum, verblijfsvergunning of werkvergunning nodig." Both distractors are false by that sentence. The fact no longer duplicates item 1 (that item keys the travel document, this one the absence of a work permit; the passport sentence in the explanation is source-supported context, as proposed above). Eindterm 7.1.2 fit is now exact ("vrij verkeer van personen … vrije vestiging in lidstaten").  
Failure (blueprint §5, rubric 7): the key "Nee, EU-burgers mogen daar vrij wonen en werken." is a full clause of 8 words / 48 characters that carries the reason; the distractors "Ja, een werkvergunning van Spanje." and "Ja, een werkvergunning van Nederland." are fragments of 5 words / 34–37 characters. The key is the single longest option by three words, the only full sentence, the most specific option and the only "Nee". The repair proposed above had three full clauses of 8 words each; the applied variant shortened the distractors and introduced the signal, and it breaks the batch's own rule in notes §3 ("No key is the single longest option in its set"). Secondary: "een werkvergunning van Nederland" is grounded in neither the fact text nor the source (a work permit comes from the country of work), so C is a weak distractor, while the fact text's "visum" is the grounded confusion.  
Repair: options B "Ja, hij heeft een werkvergunning van Spanje nodig." (8 words) and C "Nee, maar hij heeft wel een visum nodig." (8 words); prompt, key A, evidence, explanation and image unchanged. This gives 8/8/8 words (48/50/40 characters), three full clauses, the key among two "Nee" options so the lone polarity no longer marks it, and two distractors refuted by the evidence sentence: B is the assumption that working in another country needs that country's permit, C the assumption that living abroad always needs a visa. Minimal alternative that keeps the applied content: B "Ja, hij heeft een werkvergunning van Spanje nodig." and C "Ja, hij heeft een werkvergunning van Nederland nodig." (8/8/8); this removes the length and form signal but keeps the lone "Nee" and the weakly grounded C. Acceptance condition: three options of the same form (Ja/Nee plus a full clause) within one word of each other, each distractor false by the evidence sentence with its rationale in the batch notes, key still A, `batch:check` ending with "No failures", new hash recorded by a focused re-review of this item.

**3. `A2:knm:batch007-aansprakelijkheid:1` — Pass.** Changed: prompt only.  
"De dochter van Fatima is 9 jaar. Zij maakt de fiets van de buurman kapot. Wie moet de schade betalen?" is 20 words, not the 19 counted in the repair above; the blueprint allows at most twenty and the checker raises no warning, so it is at the limit, not over it. Three short main clauses, everyday words, "kapotmaken" used correctly as a separable verb; the age is stated as it is spoken ("is 9 jaar"), no brackets, so the narrated question reads naturally. Options, key B, evidence and explanation unchanged; the source still reads "Uw kind is jonger dan 14 jaar … Dan bent u aansprakelijk voor wat het kind doet." and "Vanaf 16 jaar is een kind zelf aansprakelijk."

**4. `A2:knm:batch007-kinderopvangtoeslag:1` — Pass.** Changed: prompt, sourceNote.  
"Julio en zijn vrouw werken allebei. Hun dochter van 2 gaat naar het kinderdagverblijf. Welke toeslag is daarvoor?" (18 words) no longer contains "kinderopvang"; "kinder-" now recurs in distractor B "Kinderbijslag" and "toeslag" in distractor C "Zorgtoeslag", so no prompt word appears only in the key. "naar het kinderdagverblijf" is idiomatic, everyday vocabulary for parents of young children, and matches the picture. The sourceNote now dates the trigger: "the cabinet plans a new financing system for childcare from 1 January 2029 (bill to the Tweede Kamer in autumn 2026, both chambers still to decide); retire this item when the toeslag is abolished", which matches the policy page today: "De kinderopvangtoeslag wordt afgeschaft. … De nieuwe financiering moet op 1 januari 2029 ingaan." and "Daarna komt het wetsvoorstel in het najaar van 2026 bij de Tweede Kamer." The cited page still states "Kinderopvangtoeslag is een tegemoetkoming voor ouders in de kosten van de kinderopvang." Key A, options, evidence and explanation unchanged.

**5. `A2:knm:batch007-donorregister:1` — Pass.** Changed: one sentence added to `text`.  
"Wie nieuw in Nederland komt, krijgt die brief na 3 jaar." is supported by the cited page: "Mensen die in Nederland komen wonen en zich inschrijven in een Nederlandse gemeente. Na 3 jaar in Nederland krijgen zij de vraag om hun keuze in het Donorregister in te vullen." The page says "de vraag"; that it arrives as a letter is confirmed by the responsible body, [donorregister.nl, Nieuw of terug in Nederland](https://www.donorregister.nl/uitleg-over-het-donorregister/nieuw-of-terug-in-nederland): "U krijgt na drie jaar een brief van ons om u te herinneren om een keuze te maken." The evidence quote is still a verbatim substring of the text (checker confirms). The card is now 41 words in four sentences (was 30; the longest in the batch), longest sentence 15 words, average 10.3; the A2 heuristics hold, and the card is shown only after the answer as the "Feit" sheet. Prompt, options, key C, evidence, explanation and image are unchanged; the sourceNote already said "newcomers are asked after 3 years".  
Optional: donorregister.nl adds that newcomers are not in the register until that letter. The prompt does not say Mevrouw Bakker is new, the picture shows a woman of about 65 at home, and the card's general rule is unconditional, so C stays the single defensible answer; "Mevrouw Bakker woont al lang in Nederland. Zij heeft nooit een keuze ingevuld in het Donorregister. Wat geldt voor haar?" (20 words) would close even that reading.

### What the coordinator must do

1. Apply the europese-unie option repair (B and C only), run `npm run batch:check`, record the new hash and request a focused re-review of that item.
2. Update `content/batches/007-notes.md`: section 2, items 1 and 10 still give the rationales of the retired distractors ("Alleen zijn geldige treinkaartje"; "visum van Spanje" / "werkvergunning van Spanje" under the old key "paspoort of identiteitskaart"); record the rationales for the current distractors (rubric 12). Section 3's "No key is the single longest option in its set" no longer holds for reisdocument (4/3/2 words) and, until repaired, europese-unie; amend it.
3. Optional, at the same time: reisdocument C "Zijn persoonlijke OV-chipkaart"; the donorregister prompt above. For future batches: in all five yes/no items of this batch the key is the minority polarity (the single Ja or the single Nee); vary this so the odd answer out does not become a tell.

### Record

`content/reviews/007-review.json`: the five per-item verdicts are updated (four pass, europese-unie revise) with a `re_review` block each, `verdict_counts` is 23 pass / 1 revise, `batch_verdict` stays "revise", `ready_for_integration` stays false, `source_sha256` stays `bf4d149c…` (the hash of the draft the full review covers), the re-reviewed hash `b3aa398a…` is recorded in `re_review_checks` and in a `revisions` entry, and the round-2 requests are appended to `batch_level_requests`. Limitations of the full review apply; this is an AI editorial re-review of five items, not a validation of level or exam equivalence.

## Second focused re-review (10 September 2026)

**Scope:** the one item the coordinator changed after the focused re-review above, `A2:knm:batch007-europese-unie:1`, options B and C only, as described in the "Second coordinator revision" section at the end of `content/batches/007-notes.md`. Independent reviewer; the batch file, the catalogue, the config and the app code were not edited.

**Verdict:** Pass. All 24 items now pass. `batch_verdict` is "pass", `ready_for_integration` is true and `source_sha256` is the hash below; the batch is cleared for integration.

**File re-reviewed:** `content/batches/007-original.json`, SHA-256 `9b045ce8798eeb99ed79649222530b472cc173e5cde15e31866b124f97cbe69c` (the hash the coordinator announced). `npm run batch:check content/batches/007-original.json`: "Checked 24 items, 24 questions. Keys: {"A":8,"B":8,"C":8}. Options: {"3":24}. No failures, no warnings."

**Nothing else changed.** Replacing the two current option strings with the two the first re-review quoted ("Ja, een werkvergunning van Spanje." and "Ja, een werkvergunning van Nederland.") in a private scratch copy reproduces the previously re-reviewed file byte for byte (SHA-256 `b3aa398a9be0db8a1cf81c82121a60113af251e992f5ac124966a743f13507c8`). The current file therefore differs from that file in exactly those two strings: the other 23 items, and every other field of the europese-unie item (prompt, answer, evidence, explanation, text, image brief and alt, source fields), are identical to what the focused re-review above examined. Independently of that reconstruction: every item's theme, eindterm and sourceUrl match the review record; every evidence quote is a verbatim substring of its text; prompts are 5–20 words (aansprakelijkheid at 20); and the strings the earlier reviews quote (kinderbijslag option C, the reisdocument options, the kinderopvangtoeslag prompt and dated sourceNote, the donorregister newcomer sentence, "inburgeringsvereiste" in naturalisatie, the 12-year aside in identificatieplicht, "de meeste leerlingen" in vmbo, the DUO evidence in studiefinanciering, the hoger-beroep, meningsuiting and aansprakelijkheid prompts) are present unchanged. Keys A 8 / B 8 / C 8 (theme 6: 3/3/2; theme 7: 3/2/3; theme 8: 2/3/3). All 24 items still carry `sourceReviewedAt` 2026-09-10, `status` draft, `taskType` feit.

### The item

Options as they now stand (words / characters): A "Nee, EU-burgers mogen daar vrij wonen en werken." (8 / 48, key), B "Ja, hij heeft een werkvergunning van Spanje nodig." (8 / 50), C "Nee, maar hij heeft wel een visum nodig." (8 / 40). This is the option set the first re-review proposed, applied verbatim.

- Length and form (blueprint §5, rubric 7): 8/8/8 words; three full clauses of the same form, Ja or Nee followed by a main clause. The key is not the longest option (B is, by two characters), not the only full sentence, not the most specific (B names Spanje, C names visum) and not the most hedged (C carries "maar … wel").
- Polarity: Nee / Ja / Nee. The lone polarity is now distractor B; the key no longer stands out as the only "Nee".
- Prompt-word echo: B repeats the most prompt words (hij, heeft, een, werkvergunning, Spanje, nodig), C repeats hij, heeft, een, nodig, and the key repeats only the situation words "wonen en werken", which restate the premise rather than the asked-for fact. Lexical matching points at B, not at the key.
- Superset: none. B and C each contradict A ("vrij" against "werkvergunning nodig" and "visum nodig"); no "alle antwoorden zijn goed".
- Evidence (rubric 6, 9, 12): "Zij hebben daarvoor geen visum, verblijfsvergunning of werkvergunning nodig" is a verbatim substring of `text` (checker and reviewer confirm). It answers the prompt directly ("geen werkvergunning nodig", so Nee); the key's qualification restates the preceding card sentence ("Burgers van EU-landen mogen in andere EU-landen vrij reizen, wonen en werken", with "Nederland is lid van de Europese Unie" as the card's first sentence). The same sentence refutes B (geen werkvergunning) and C (geen visum), so each distractor is wrong for one nameable reason.
- Distractor rationales: `content/batches/007-notes.md` §2 item 10 now records them (B: the assumption that working abroad needs that country's permit; C: the assumption that another country always needs a visa), item 1 records the "zorgpas" rationale, and §3's option-length statement has been amended, which closes the round-2 request on the notes.
- Prompt: "Een Nederlander wil in Spanje wonen en werken. Heeft hij daarvoor een werkvergunning nodig?" is 14 words (limit 20), situation first and question second, a yes/no with qualification (blueprint §4.5, third question form). Unchanged since the first re-review.
- Explanation: unchanged and consistent with key A; it paraphrases the evidence ("zonder visum, verblijfsvergunning of werkvergunning"), which names both distractor confusions, and its passport sentence is supported by the cited page.
- A2 wording: common words and short clauses; "EU-burgers" matches the card's "Burgers van EU-landen"; "maar … wel" is idiomatic and simple.
- Source: fetched on 10 September 2026 with curl into a private scratch directory (HTTP 200). The page still reads: "Hebben personen de nationaliteit van 1 van deze landen of van Zwitserland? Dan mogen zij binnen deze landen vrij reizen. Ze mogen ook binnen de deze landen wonen en werken. Ze hebben geen visum, verblijfsvergunning of werkvergunning nodig. Wel hebben ze een geldig paspoort of een identiteitskaart nodig en gelden er bepaalde voorwaarden."
- Eindterm 7.1.2, re-read on wetten.overheid.nl (BWBR0045574, geldend van 18-04-2026): "weet dat lidmaatschap van de EU voor burgers betekent dat er in principe vrij verkeer van personen en goederen tussen lidstaten bestaat, vrije vestiging in lidstaten …". The item tests that bullet exactly; the first review's "on topic, loose" classification described the draft's travel-document key.
- Key A, so the batch balance stays 8/8/8. The acceptance condition set by the first re-review is met in full.

Residual, not blocking, no change requested: the two distractors share the clause frame "hij heeft (wel) een … nodig", which answers the question literally, while the key gives the reason instead. The two odd-one-out cues cancel (polarity points at B, frame points at A), the key is not the longest, most specific or most hedged option, and a Nee answer to "heeft hij … nodig?" with a qualification cannot share that frame without becoming a bare restatement. The prompt also takes it as known that Spain is an EU member, which the card does not state; general knowledge at KNM level, accepted by both earlier reviews.

### What the coordinator must do

1. Nothing further on the batch file or the notes. Any further edit to `content/batches/007-original.json` invalidates this clearance until it is re-reviewed under a new hash.
2. Integrate: add the 24 items to `content/practice-sets.json` as KNM theme drills (themes 6, 7 and 8; eight to ten items per set, blueprint §11) and run `npm run content:integrate -- --refresh-hints "batch 007"`. The read-only `npm run content:verify` now passes the review gate for batch 007 (hash, verdict and readiness) and stops at the expected next step, the merged catalogue's hash that the integrate command records in the hints review; it will also require the practice-set coverage above.
3. Optional, unchanged from the first re-review: reisdocument C "Zijn persoonlijke OV-chipkaart"; the donorregister prompt that says Mevrouw Bakker has lived in the Netherlands for a long time. For future batches: vary the polarity of the key in yes/no items (in four of this batch's five yes/no items the key is still the minority polarity; europese-unie no longer is).

### Record

`content/reviews/007-review.json`: `source_sha256` is `9b045ce8…`, `batch_verdict` "pass", `ready_for_integration` true, `verdict_counts` 24 pass; the europese-unie item verdict is "pass" with a `re_review_2` block; a `re_review_2_checks` block records the checker output, key counts, the reconstruction method and the refetched sources; the two round-2 required `batch_level_requests` are marked resolved; the limitation about the SHA-256 is reworded; and a `revisions` entry (reviewer "focused re-review 2", previous hash `b3aa398a…`, re-reviewed hash `9b045ce8…`, verdict pass) is appended. Limitations of the full review apply; this is an AI editorial re-review of one item plus an integrity check of the file, not a validation of level or exam equivalence.

## Focused re-review after the level check (10 September 2026)

**Reviewed SHA-256:** `3779a18e289232c9d65ac290f7c350eee0f5c6bf8a4eca2d1db94c66ce885a4c` (supersedes `9b045ce8798eeb99ed79649222530b472cc173e5cde15e31866b124f97cbe69c`). **Verdict:** pass; all 24 items pass, `ready_for_integration` stays true.

**Scope.** The revision recorded under "Revision after the level check" at the end of `content/batches/007-notes.md`, which applies the required actions of `content/reviews/006-007-level-check.md`: `juridischloket` (prompt), `godsdienstvrijheid` (`text` third sentence, prompt, options, evidence, explanation, `sourceNote`), `geweldloos-opvoeden` (options B and C, explanation). Each item was checked for: the change against the level check's request; the key against the fact `text` and the cited source, re-fetched today with curl (all HTTP 200; the participatieverklaring bijlage image was downloaded and read; the jci link resolves to BWBR0002656/2025-07-05); both distractors false and plausible; `evidence` a verbatim substring of `text`; prompt at most twenty words; three parallel options without a length, polarity or keyword signal; the explanation against the current distractors; A2 wording. Eindtermen 6.5.2, 7.2.3 and 7.2.6 were read in the Staatscourant 2024-15802 XML fetched today from repository.overheid.nl.

**Nothing else changed.** `content/catalogue.json` still holds the copies integrated from the previously reviewed file. A copy of the current batch in which the catalogue's values were substituted back for exactly nine leaf fields of the three items, serialised with the batch's own formatting, hashes to `9b045ce8…` byte for byte; a field-by-field comparison of all 24 items against the catalogue copies shows no other difference. `npm run batch:check content/batches/007-original.json`: "Checked 24 items, 24 questions. Keys: {"A":8,"B":8,"C":8}. Options: {"3":24}. No failures, no warnings." (plus the info line that the batch is a revision of an integrated batch). Every evidence verbatim; prompts 7–20 words; keys per theme unchanged (6 A3/B3/C2, 7 A3/B2/C3, 8 A2/B3/C3).

**Per item.**

- **`juridischloket`** — pass. Prompt "Waar krijgen mensen met een laag inkomen gratis advies bij een conflict over huur of werk?" is the level check's text, 16 words; *juridisch* is gone from the prompt, so the key "Bij het Juridisch Loket" no longer shares a word with it. The page states "Het Juridisch Loket geeft daarnaast gratis persoonlijk advies als u een inkomen en vermogen onder een bepaalde grens heeft" and lists *ontslag* and *huur/wonen* among juridische problemen; the fact text's second sentence covers *huur* and *werk*. Ombudsman and police remain false and refuted by the unchanged explanation; the page's other free helpers are not options. Options 4/4/3 words. The picture still fits. The item's optional note in the full review is thereby applied in a variant.
- **`godsdienstvrijheid`** — pass. Now the level check's "wet boven geloof" item, every changed field as proposed: third `text` sentence "De wet van de staat gaat boven de regels van een geloof of traditie." (text 33 words, longest sentence 15), prompt "In Nederland geldt godsdienstvrijheid. Wat is belangrijker: de wet of de regels van een geloof?" (15 words), options "De wet van de staat." / "De regels van het geloof." / "Dat kiest iedereen zelf." (key A; 5/5/4 words), evidence verbatim in the new sentence, explanation as proposed. Eindterm 7.2.3 wording confirmed in the Staatscourant XML: "weet dat de wetten van de staat boven die van religie en traditie staan"; the `sourceNote` quotes it verbatim, an improvement on the level check's paraphrase. The cited participatieverklaring supports the substance ("Hier zijn ook grenzen aan verbonden. Wat iemand doet of zegt mag nooit in strijd zijn met de wet."). B is false by the indicator; C over-generalises the text's second sentence to the law and the explanation says exactly that. The either/or prompt names both alternatives, so *wet* recurs in A and *regels/geloof* in B symmetrically; no signal. The full review's finding 13 and the record's `eindterm_check`, `evidence` and `level_reason` fields describe the retired definitional item.
- **`geweldloos-opvoeden`** — pass. B "Nee, dat is bij wet verboden." (key) and C "Nee, maar een tik mag wel.", explanation ending "Ook een tik is lichamelijk geweld en mag niet.", as proposed. Options 6/6/6 words, polarity Ja/Nee/Nee, so the key shares its polarity with a distractor; no prompt word recurs in the key. BW 1:247 lid 2 re-read: "In de verzorging en opvoeding van het kind passen de ouders geen geestelijk of lichamelijk geweld of enige andere vernederende behandeling toe." A tik is lichamelijk geweld under that article, so C is false and now a real belief; A is false; the explanation refutes both ("ook niet thuis" now addresses a retired distractor, harmlessly).

**Media.** The three questions need new question audio (`content/audio-manifest.json` still carries the previous prompts and options; `scripts/content.ts` drops `questionAudio` on a changed question). No picture changes.

**Record.** `007-review.json`: `source_sha256` `3779a18e…`, `previous_source_sha256` `9b045ce8…`, verdict pass and ready, a `level_check_rereview` block on each of the three items, a `re_review_3_checks` block, and a `revisions` entry (reviewer "focused re-review (level check)"). The full review's findings 7, 13 and 14 above describe the previous versions. Any further byte change to the batch file needs another focused re-review. This is an AI editorial re-review, not a validation of level or exam equivalence.
