# Batch 007: design notes (KNM, themes 6, 7 and 8)

Batch 007 contains 24 original KNM items in the format DUO has used since 1 July 2025 (`content/blueprint.md` §4.5): one picture, one factual question of at most twenty words, three options, one eindterm from the list in Staatscourant 2024-15802 (the authoritative text at https://zoek.officielebekendmakingen.nl/stcrt-2024-15802.html, fetched on 10 September 2026 for the exact wording of every eindterm). Eight items per theme: theme 6 Instanties, theme 7 Staatsinrichting en rechtsstaat, theme 8 Onderwijs en opvoeding; `domain` is `instanties` for themes 6 and 7 and `opleiding` for theme 8. Themes 1, 3 and 4 belong to the parallel batch 006 and were not touched.

Every fact was verified by opening a current primary page (rijksoverheid.nl, belastingdienst.nl, ind.nl, duo.nl, rechtspraak.nl or the law text on wetten.overheid.nl) on 10 September 2026; a search snippet was never used as verification. Each item records the direct URL, and the table below records the page title, the sentence that supports the key and whether the fact may change. Scenarios, questions, options and explanations are written for this project; nothing is copied from official practice items. The `text` field is the fact card shown after answering; the evidence quote is a verbatim substring of it. Level labels are authoring targets (`targetLevelValidated: false`); nothing here claims official equivalence.

The eight existing KNM study cards (inschrijven, verhuizing, DigiD, basisverzekering, 112, leerplicht, stemmen, discriminatie) are not repeated: no item in this batch tests BSN or the five-day registration rule, moving house, DigiD safety, the basisverzekering, the emergency number, leerplicht 5–16 and verlof, the stempas procedure, or reporting discrimination.

`npm run batch:check content/batches/007-original.json`: 24 items, keys A 8 / B 8 / C 8, no failures, no warnings (10 September 2026).

## 1. Batch matrix

| # | id (slug) | Theme | Eindterm | Skill | Persona | Key |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | reisdocument | 6 | 6.2.2 | rule-application | meneer De Vries | A |
| 2 | naturalisatie | 6 | 6.2.3 | rule-application | Fatima | B |
| 3 | jaaropgave | 6 | 6.3.1 | detail | — | C |
| 4 | kinderbijslag | 6 | 6.3.3 | rule-application | Julio | A |
| 5 | identificatieplicht | 6 | 6.4.1 | rule-application | Sem | B |
| 6 | bezwaar | 6 | 6.5.1 | rule-application | Karim | C |
| 7 | juridischloket | 6 | 6.5.2 | detail | — | A |
| 8 | wa-verzekering | 6 | 6.6.1 | rule-application | Roos | B |
| 9 | wetten | 7 | 7.1.1 | detail | — | C |
| 10 | europese-unie | 7 | 7.1.2 | rule-application | (unnamed Dutch citizen) | A |
| 11 | hoger-beroep | 7 | 7.1.3 | rule-application | meneer De Vries | B |
| 12 | meningsuiting | 7 | 7.2.2 | detail | — | C |
| 13 | godsdienstvrijheid | 7 | 7.2.3 | detail | — | A |
| 14 | geweldloos-opvoeden | 7 | 7.2.6 | rule-application | (unnamed parents) | B |
| 15 | donorregister | 7 | 7.2.7 | rule-application | mevrouw Bakker | C |
| 16 | zelfbeschikking | 7 | 7.2.8 | rule-application | Roos | A |
| 17 | vmbo | 8 | 8.1.1 | rule-application | Sem | B |
| 18 | bijzondere-school | 8 | 8.1.2 | detail | — | C |
| 19 | seksuele-vorming | 8 | 8.1.5 | rule-application | Amina | A |
| 20 | aansprakelijkheid | 8 | 8.2.1 | rule-application | Fatima | B |
| 21 | medezeggenschapsraad | 8 | 8.2.2 | rule-application | Karim | C |
| 22 | ouderbijdrage | 8 | 8.3.1 | detail | — | B |
| 23 | kinderopvangtoeslag | 8 | 8.3.2 | rule-application | Julio | A |
| 24 | studiefinanciering | 8 | 8.3.3 | rule-application | Sem | C |

Question forms: 15 persona facts, 7 direct facts, 4 yes/no questions with a qualified answer (identificatieplicht, geweldloos-opvoeden, seksuele-vorming, ouderbijdrage). No behaviour questions ("wat kan hij het beste doen"); the two prompts that ask for an option ("Welk recht heeft hij?", "Welke mogelijkheid heeft hij?") test knowledge of a legal right, not advice.

Cast use (`config/illustration.json`): every cast member appears at most twice, in different themes and different scenes, and the stories do not contradict each other (Julio is a young father in both of his items; Sem goes from vmbo to mbo to studiefinanciering; Roos is 22 in one item and buys a car in the other). Nine picture briefs use unnamed figures because the question has no persona (jaaropgave, juridischloket, wetten, europese-unie, meningsuiting, godsdienstvrijheid, geweldloos-opvoeden, bijzondere-school, ouderbijdrage).

## 2. Per item: eindterm, source, distractors

Access date for every source: 10 September 2026.

### 1. reisdocument — 6.2.2 (officiële documenten)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/moet-ik-mijn-paspoort-of-identiteitskaart-meenemen-tijdens-reizen-naar-het-buitenland — "Moet ik mijn paspoort of identiteitskaart meenemen tijdens reizen naar het buitenland?" (Rijksoverheid.nl). Supporting sentences: "Ja, u heeft een paspoort of identiteitskaart nodig als u de grens over gaat … Ook naar een Europees land zonder grenscontrole." and "Het rijbewijs is in het buitenland geen officieel identiteitsbewijs." Volatility: low.
- Key A (zijn paspoort of identiteitskaart). B "Zijn Nederlandse rijbewijs": the rijbewijs is a valid identity document inside the Netherlands, which is exactly the confusion; abroad it is not. C "Zijn zorgpas": a card people carry that identifies them to a provider but is no identity document anywhere. (Revised after review: the prompt now asks "Welk identiteitsbewijs moet hij meenemen?" and the options share the form "Zijn + noun"; the earlier "Alleen …" distractors signalled the key.)

### 2. naturalisatie — 6.2.3 (verblijfsvergunningen en naturalisatie)

- Source: https://ind.nl/nl/nederlanderschap/nederlander-worden-door-naturalisatie — "Nederlander worden door naturalisatie | IND", page states "Laatste update: 1 september 2026". Supporting sentences: "U voldoet aan het inburgeringsvereiste. Dit betekent dat u het inburgeringsexamen moet hebben gehaald op minimaal taalniveau A2. Soms hebt u vrijstelling …"; "U vraagt naturalisatie aan bij de gemeente waar u woont."; "De IND beslist op uw verzoek om naturalisatie." Companion page https://ind.nl/nl/inburgering-voor-naturalisatie: "Dit betekent meestal dat u een inburgeringsdiploma moet hebben." Volatility: medium. The residence term (now 5 years) and the language level (now A2) are the subject of announced legislative changes; the item deliberately avoids both numbers ("woont al lang in Nederland", "meestal"), but re-check the page before every release.
- Key B (inburgeringsexamen gehaald). A "eigen huis gekocht": owning property is not a condition anywhere in the list. C "vast arbeidscontract": income or a permanent job is not a condition either; both are common assumptions imported from other countries' rules.

### 3. jaaropgave — 6.3.1 (salarisstrook en jaaropgave)

- Source: https://www.belastingdienst.nl/wps/wcm/connect/nl/belastingaangifte/content/welke_gegevens_heb_ik_nodig_voor_mijn_belastingaangifte — "Deze gegevens hebt u nodig bij het invullen van uw belastingaangifte | Belastingdienst". Supporting text: under "Inkomsten": "uw jaaropgaven over 2025. En als u die niet hebt: uw salarisstroken". Companion page https://www.belastingdienst.nl/wps/wcm/connect/nl/jongeren/content/wat-staat-er-in-een-jaaropgaaf — "Wat staat er in een jaaropgaaf? | Belastingdienst": "Op een jaaropgaaf staat wat je in dat jaar hebt verdiend bij 1 werkgever … Je werkgever stuurt de jaaropgaaf aan het begin van het nieuwe jaar - meestal in januari of februari". Volatility: low (the year in the checklist changes, the rule does not).
- Key C (jaaropgave). A "arbeidscontract": the other document you receive from an employer, but it says nothing about what was earned or withheld. B "pensioenoverzicht": also an annual statement (UPO), but it comes from the pension fund and is not used for the aangifte. Salarisstroken were kept out of the options because the checklist names them as a fallback.

### 4. kinderbijslag — 6.3.3 (toeslagen en kinderbijslag)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/kinderbijslag/hoe-vraag-ik-kinderbijslag-aan — "Hoe vraag ik kinderbijslag aan? | Rijksoverheid.nl". Supporting sentences: "Kinderbijslag vraagt u aan bij de Sociale Verzekeringsbank (SVB)."; "De gemeente geeft de aangifte van de geboorte van uw kind door aan de SVB. Ongeveer 2 tot 4 weken na de aangifte krijgt u van de SVB een brief." Volatility: low.
- Key A (SVB). B "Belastingdienst": the toeslagen confusion the eindterm itself names (toeslagen come from the Belastingdienst, kinderbijslag from the SVB). C "gemeente waar zij wonen": the gemeente is where the birth is registered and it passes the birth on to the SVB, but it does not handle the application.

### 5. identificatieplicht — 6.4.1 (taken van de politie)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/paspoort-en-identiteitskaart/wat-is-de-identificatieplicht — "Wat is de identificatieplicht? | Rijksoverheid.nl". Supporting sentence: "De identificatieplicht houdt in dat iedereen vanaf 14 jaar een geldig identiteitsbewijs moet kunnen tonen als de politie daar om vraagt." Companion page https://www.rijksoverheid.nl/vraag-en-antwoord/identificatieplicht/geldt-de-identificatieplicht-ook-voor-minderjarigen: "In het openbaar vervoer geldt een identificatieplicht bij personen vanaf 12 jaar bij reizen zonder geldig vervoersbewijs …" (used only in the explanation). Volatility: low (Wet op de uitgebreide identificatieplicht).
- Key B (vanaf 14). A "pas vanaf 16": the leerplicht age, a nearby number. C "pas vanaf 18": the age of majority, the most common assumption.

### 6. bezwaar — 6.5.1 (bezwaar tegen de overheid)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/bezwaar-en-beroep/bezwaar-tegen-beslissing-overheid — "Hoe kan ik bezwaar maken tegen een beslissing van de overheid? | Rijksoverheid.nl". Supporting sentence: "U kunt een bezwaar opsturen naar de overheidsorganisatie die de beslissing heeft genomen. Dit kan per post en digitaal. U moet uw bezwaar indienen binnen 6 weken na bekendmaking van het besluit." Volatility: low (Algemene wet bestuursrecht).
- Key C (binnen zes weken bezwaar). A "aangifte doen bij de politie": aangifte is for criminal offences; the police do not review municipal decisions. B "het besluit gewoon negeren": a decision stays in force until it is changed through bezwaar or beroep.

### 7. juridischloket — 6.5.2 (juridische hulp)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/bescherming-van-consumenten/waar-kan-ik-terecht-voor-hulp-bij-een-juridisch-probleem-of-conflict — "Waar vind ik gratis hulp of advies bij een juridisch probleem? | Rijksoverheid.nl". Supporting sentence: "Het Juridisch Loket geeft daarnaast gratis persoonlijk advies als u een inkomen en vermogen onder een bepaalde grens heeft. Juristen helpen u om een oplossing te vinden voor uw situatie." and "Voor telefonisch contact met het Juridisch Loket kunt u gratis bellen naar 0800 - 8020." Volatility: low for the rule; the income limit changes yearly and is not stated in the item.
- Key A (Juridisch Loket). B "Nationale ombudsman": a theme-6 institution too, but for complaints about government conduct, not legal advice. C "politiebureau": the police take aangifte; they give no legal advice.

### 8. wa-verzekering — 6.6.1 (verzekeringen)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/auto/wa-verzekering-voertuig — "Moet ik een WA-verzekering afsluiten als ik een auto of ander voertuig heb? | Rijksoverheid.nl". Supporting sentence: "Heeft u een auto, motor, scooter, brommer of snorfiets? Dan moet u volgens de Wet aansprakelijkheidsverzekering motorrijtuigen (Wam) een WA-verzekering afsluiten. … Als uw motorrijtuig schade veroorzaakt dekt een WA-verzekering deze in de meeste gevallen." Volatility: low.
- Key B (WA). A "allriskverzekering": the fuller car policy many people take, but it is voluntary. C "inboedelverzekering": a common household policy, also voluntary and unrelated to the car.

### 9. wetten — 7.1.1 (staatsinrichting)

- Source: https://www.rijksoverheid.nl/themas/overheid-en-democratie/wetgeving/hoe-komt-een-wet-tot-stand — "Hoe komt een wet tot stand? | Rijksoverheid.nl". Supporting sentence: "De regering maakt wetten in samenwerking met de Eerste en Tweede Kamer (wetgevende macht)." Companion page https://www.rijksoverheid.nl/themas/overheid-en-democratie/parlement/taken-en-rechten-parlement — "Taken en rechten parlement": "Het parlement bestaat uit de Eerste Kamer en de Tweede Kamer. … Een wet gaat pas in als de Eerste en de Tweede Kamer het wetsvoorstel hebben aangenomen." Volatility: none (constitutional structure).
- Key C (regering en parlement). A "De Koning alleen": the monarchy misconception; the King is part of the regering but does not legislate alone. B "De rechters van de Hoge Raad": rechters apply the law (rechterlijke macht); they do not make it.

### 10. europese-unie — 7.1.2 (EU)

- Source: https://www.rijksoverheid.nl/themas/migratie-en-reizen/immigratie-naar-nederland/vrij-verkeer-en-verblijf-personen-binnen-eu-eer-en-zwitserland — "Vrij verkeer en verblijf personen binnen EU/EER en Zwitserland | Rijksoverheid.nl". Supporting sentences: "Hebben personen de nationaliteit van 1 van deze landen of van Zwitserland? Dan mogen zij binnen deze landen vrij reizen. Ze mogen ook binnen de deze landen wonen en werken. Ze hebben geen visum, verblijfsvergunning of werkvergunning nodig. Wel hebben ze een geldig paspoort of een identiteitskaart nodig". The rule is stated for nationals of any EU/EEA country within any of these countries, so it covers a Dutch citizen in Spain. Volatility: none (EU treaties).
- Key A ("Nee, EU-burgers mogen daar vrij wonen en werken."), entailed by the evidence sentence. B "Ja, hij heeft een werkvergunning van Spanje nodig.": the assumption that working abroad needs a permit; inside the EU it does not. C "Nee, maar hij heeft wel een visum nodig.": the assumption that another country always needs a visa, refuted by the same sentence. (Revised after review: the question now asks "Heeft hij daarvoor een werkvergunning nodig?" so the evidence entails the key and the fact no longer duplicates item 1; all three options are eight words, two of them start with "Nee".)

### 11. hoger-beroep — 7.1.3 (scheiding der machten, uitspraak accepteren, hoger beroep)

- Source: https://www.rechtspraak.nl/organisatie-en-contact/rechtspraak-in-nederland — "Rechtspraak Nederland | Hoe werkt het recht? | Rechtspraak". Supporting sentences: "Bij een juridisch conflict beslist de rechter. Is 1 van de partijen het niet eens met het vonnis, dan kan deze in hoger beroep bij het gerechtshof"; "Het oordeel van de rechter is bindend." Companion page https://www.rijksoverheid.nl/vraag-en-antwoord/rechtspraak-en-geschiloplossing/kan-ik-als-verdachte-in-een-strafzaak-in-hoger-beroep-tegen-de-uitspraak-van-de-rechter: "Bij veel strafzaken kunt u in hoger beroep tegen de uitspraak." (hence "meestal" in the text). Volatility: none.
- Key B (in hoger beroep). A "klacht bij de ombudsman": the ombudsman handles complaints about government conduct (6.5.1), not court judgments. C "Niets, altijd definitief": the opposite of the eindterm's point; a judgment must be accepted but can be appealed.

### 12. meningsuiting — 7.2.2 (vrijheid van meningsuiting)

- Source: https://wetten.overheid.nl/BWBR0045555/2026-04-02#Bijlage — "Besluit inburgering 2021 - BWBR0045555" (wetten.overheid.nl, version in force 2 April 2026), bijlage "Participatieverklaring als bedoeld in artikel 3.1, zesde lid" (published as an image, read on 10 September 2026). Supporting sentences: "In Nederland mag iedereen denken, doen en zeggen wat hij wil. Dit betekent dat: iedereen zijn eigen mening mag uiten; … Hier zijn ook grenzen aan verbonden. Wat iemand doet of zegt mag nooit in strijd zijn met de wet. Je mag bijvoorbeeld niet discrimineren, aanzetten tot haat of oproepen tot vijandigheid." Grondwet art. 7 lid 1 (https://wetten.overheid.nl/BWBR0001840/2023-02-22): "Niemand heeft voorafgaand verlof nodig om door de drukpers gedachten of gevoelens te openbaren, behoudens ieders verantwoordelijkheid volgens de wet." Volatility: none.
- Key C (aanzetten tot haat). A "kritiek op de regering": protected speech; the classic misconception of newcomers from countries where it is not. B "een mening die veel mensen niet delen": being in a minority is not a legal limit.

### 13. godsdienstvrijheid — 7.2.3 (godsdienstvrijheid)

- Source: the same participatieverklaring (https://wetten.overheid.nl/BWBR0045555/2026-04-02#Bijlage): "iedereen een eigen geloof mag hebben en vrij is wel of niet te geloven". Grondwet art. 6 lid 1: "Ieder heeft het recht zijn godsdienst of levensovertuiging, individueel of in gemeenschap met anderen, vrij te belijden, behoudens ieders verantwoordelijkheid volgens de wet." (supports the third sentence of the text: everyone must keep to the law). Volatility: none.
- Key A (zelf kiezen, wel of geen geloof). B "de overheid kiest één geloof": a state religion, which the Netherlands does not have. C "het geloof van zijn ouders houden": the assumption that religion is inherited and fixed; the law leaves the choice to each person.

### 14. geweldloos-opvoeden — 7.2.6 (integriteit van het lichaam)

- Source: https://wetten.overheid.nl/jci1.3:c:BWBR0002656&boek=1&titeldeel=14&afdeling=2&artikel=247 — "Burgerlijk Wetboek Boek 1 - BWBR0002656" (wetten.overheid.nl, version in force 5 July 2025), artikel 247 lid 2: "In de verzorging en opvoeding van het kind passen de ouders geen geestelijk of lichamelijk geweld of enige andere vernederende behandeling toe." Volatility: none (in force since 2007).
- Key B (verboden). A "als het kind niet luistert": the "corrective smack" belief; the law makes no exception for disobedience. C "alleen thuis": the belief that the home is outside the law; the rule applies to the upbringing wherever it happens.

### 15. donorregister — 7.2.7 (orgaandonatie)

- Source: https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/orgaandonatie-en-weefseldonatie/actieve-donorregistratie — "Orgaan- en weefseldonatie na overlijden | Rijksoverheid.nl". Supporting sentences: "Wie 18 wordt, krijgt een brief met de vraag om een keuze in te vullen in het Donorregister."; "Als mensen geen keuze invullen, komen zij in het Donorregister met 'geen bezwaar tegen orgaandonatie'. Hun organen en weefsels mogen dan na hun overlijden aan een patiënt gedoneerd worden. Ze zijn orgaandonor."; "Iemand kan op elk moment de keuze in het Donorregister veranderen." Also relevant for newcomers: "Mensen die in Nederland komen wonen … Na 3 jaar in Nederland krijgen zij de vraag om hun keuze in het Donorregister in te vullen." Volatility: low (Donorwet since 1 July 2020).
- Key C (orgaandonor, 'geen bezwaar'). A "geen orgaandonor": the pre-2020 default, and what many people assume when nothing was filled in. B "haar familie beslist": one of the four registrable choices, but it applies only when someone has chosen it.

### 16. zelfbeschikking — 7.2.8 (zelfbeschikkingsrecht van vrouwen)

- Sources: https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/huwelijksdwang/huwelijksdwang-voorkomen — "Aanpak huwelijksdwang | Rijksoverheid.nl": "Als 1 of beide partners onder grote druk worden gezet om te trouwen, is er sprake van huwelijksdwang. … De druk komt van ouders, familie of breder vanuit de gemeenschap."; "Huwelijksdwang is strafbaar. … Daders kunnen maximaal 2 jaar gevangenisstraf krijgen."; "Beide partners moeten minimaal 18 jaar zijn om in Nederland te kunnen trouwen." Participatieverklaring (https://wetten.overheid.nl/BWBR0045555/2026-04-02#Bijlage): "iedereen recht heeft op eigen keuzen en zelfstandigheid (zelfbeschikkingsrecht)". Volatility: low.
- Key A (Roos beslist zelf; dwang strafbaar). B "familie mag beslissen": the arranged-marriage assumption that the eindterm targets. C "dwang mag omdat zij ouder is dan 18": mixes up the minimum marriage age with consent; coercion is punishable at any age.

### 17. vmbo — 8.1.1 (opbouw van het onderwijssysteem)

- Sources: https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-het-vmbo-in-elkaar — "Hoe zit het vmbo in elkaar? | Rijksoverheid.nl": "Het vmbo maakt leerlingen klaar voor een opleiding in het mbo. Soms stromen leerlingen na het vmbo door naar de havo." Companion pages "Hoe zit de havo in elkaar?" (https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-de-havo-in-elkaar): "De havo bereidt leerlingen voor op een studie in het hoger beroepsonderwijs (hbo)." and "Hoe zit het vwo in elkaar?" (https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/hoe-zit-het-vwo-in-elkaar): "Het voorbereidend wetenschappelijk onderwijs (vwo) bereidt leerlingen voor op een studie aan de universiteit." Volatility: none.
- Key B (mbo). A "hbo": follows the havo, not the vmbo. C "universiteit": follows the vwo. The havo was deliberately not used as a distractor because the page says some pupils do continue to the havo; the prompt asks where most pupils go.

### 18. bijzondere-school — 8.1.2 (vrijheid van onderwijs)

- Source: https://www.rijksoverheid.nl/themas/onderwijs/vrijheid-van-onderwijs/openbaar-en-bijzonder-onderwijs — "Openbaar en bijzonder onderwijs | Rijksoverheid.nl". Supporting sentences: "Bijzondere scholen geven les vanuit een godsdienst, levensovertuiging of een visie op het onderwijs. De lessen op een openbare school zijn niet vanuit een godsdienst of levensovertuiging."; "De overheid betaalt voor beide soorten onderwijs."; examples listed: Hindoe, Islamitisch, Protestants-christelijk, Reformatorisch, Rooms-katholiek, algemeen bijzonder. Volatility: none (Grondwet art. 23).
- Key C (geloof of onderwijsvisie). A "kinderen met een beperking": the frequent confusion of "bijzonder onderwijs" with "speciaal onderwijs". B "extra schoolgeld": the assumption that a school with a denomination is a private, fee-paying school; the government funds both types.

### 19. seksuele-vorming — 8.1.5 (verplichte lessen over seksualiteit)

- Source: https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/gezondheid-en-preventie/seksuele-gezondheid/relationele-en-seksuele-vorming — "Relationele en seksuele vorming | Rijksoverheid.nl". Supporting sentences: "landelijke kerndoelen … van en voor het basisonderwijs en de onderbouw van het voortgezet onderwijs. Hierdoor zijn scholen verplicht aandacht te geven aan relationele en seksuele vorming"; "Er zijn landelijke kerndoelen voor het onderwijs. Daardoor zijn scholen verplicht om aandacht te besteden aan relationele en seksuele vorming."; "Scholen bepalen zelf op welke manier zij aandacht geven aan de onderwijsdoelen." Volatility: low; the page notes that the kerndoelen are being revised, the obligation stays.
- Key A (verplicht). B "de ouders beslissen": the opt-out assumption; the obligation is on the school. C "alleen op de middelbare school": the obligation already applies in primary school.

### 20. aansprakelijkheid — 8.2.1 (ouders verantwoordelijk voor gedrag van kinderen)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/ouderlijk-gezag/rechten-plichten-ouderlijk-gezag — "Welke rechten en plichten gelden er bij ouderlijk gezag? | Rijksoverheid.nl". Supporting sentences: "Uw kind is jonger dan 14 jaar. Dan bent u aansprakelijk voor wat het kind doet. U moet dan bijvoorbeeld de kosten betalen als het kind schade aanricht."; 14–16: "hangt het van de situatie af"; "Vanaf 16 jaar is een kind zelf aansprakelijk." Volatility: none (Burgerlijk Wetboek 6:169). Note for the reviewer: the eindterm's bullet says parents are liable "tot het zestiende levensjaar"; the law makes them fully liable under 14 and conditionally at 14 and 15. The item uses a nine-year-old, so both readings give the same key.
- Key B (Fatima, als ouder). A "de dochter zelf": true only from 16. C "niemand, zij is een kind": the assumption that damage by a child needs no compensation.

### 21. medezeggenschapsraad — 8.2.2 (betrokkenheid van ouders)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/basisonderwijs/hoe-kan-ik-als-ouder-bij-de-school-betrokken-zijn — "Hoe kan ik als ouder bij de school betrokken zijn? | Rijksoverheid.nl". Supporting sentences: "Meepraten over het schoolbeleid kan door lid te worden van de medezeggenschapsraad of de ouderraad."; "In het basisonderwijs en voortgezet onderwijs heeft elke school een medezeggenschapsraad (MR). … De MR overlegt met de directie en het schoolbestuur over het beleid, zoals het schoolplan of het schoolreglement. Om lid te worden van de MR moet u gekozen worden."; "Een school mag van u verwachten dat: u de school informeert over belangrijke ontwikkelingen (van uw kind) thuis …" Volatility: low (Wet medezeggenschap op scholen).
- Key C (medezeggenschapsraad). A "gemeenteraad": the other "raad" a newcomer knows; it governs the municipality, not a school. B "leerlingenraad": exists in secondary schools but is for pupils.

### 22. ouderbijdrage — 8.3.1 (schoolkosten en ouderbijdrage)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/financiering-onderwijs/is-de-vrijwillige-ouderbijdrage-op-de-basisschool-en-middelbare-school-verplicht — "Is de vrijwillige ouderbijdrage voor extra activiteiten op school verplicht? | Rijksoverheid.nl". Supporting sentence: "De vrijwillige ouderbijdrage voor extra activiteiten buiten de lessen om is niet verplicht. Extra activiteiten zijn bijvoorbeeld schoolreizen, sportdagen of speciale onderwijsprogramma's zoals tweetalig onderwijs. Kinderen van ouders die hiervoor niet betalen, mogen altijd meedoen." Companion pages on costs (basisschool, voortgezet onderwijs) confirm "geen lesgeld" and "De vrijwillige ouderbijdrage is altijd vrijwillig". Volatility: low (law since 2021).
- Key B (vrijwillig). A "anders mag het kind niet mee": the pre-2021 practice the law ended. C "alleen op een bijzondere school": ties the contribution to the school type; the rule is the same for all schools.

### 23. kinderopvangtoeslag — 8.3.2 (vergoedingsregelingen voor school, studie, zorg of opvang)

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/kinderopvangtoeslag/wanneer-heb-ik-recht-op-kinderopvangtoeslag — "Wanneer heb ik recht op kinderopvangtoeslag? | Rijksoverheid.nl". Supporting sentences: "Kinderopvangtoeslag is een tegemoetkoming voor ouders in de kosten van de kinderopvang."; conditions include "U werkt, studeert of volgt een traject om werk te vinden. Of u volgt verplicht een inburgeringscursus bij een gecertificeerde instelling." Companion page "Welke soorten kinderopvang zijn er?" (https://www.rijksoverheid.nl/vraag-en-antwoord/kinderopvang/soorten-kinderopvang). The SVB sentence in the text is supported by the kinderbijslag page (item 4). Volatility: medium. The government has announced a new financing system for childcare that would replace the toeslag; the page still describes the toeslag on the access date. Retire the item when the new system starts.
- Key A (kinderopvangtoeslag). B "kinderbijslag": the general child allowance from the SVB, paid regardless of childcare. C "zorgtoeslag": the other well-known toeslag, for health insurance.

### 24. studiefinanciering — 8.3.3 (aanvraag bij DUO)

- Source: https://duo.nl/particulier/studiefinanciering/aanvragen.jsp — "Aanvragen – Studiefinanciering – DUO", page states "Laatste update was op 07 september 2026". Supporting sentences: "Log in op Mijn DUO om studiefinanciering aan te vragen."; overview page https://duo.nl/particulier/studiefinanciering/ — "Hoe werkt het? – Studiefinanciering – DUO": "Als u staat ingeschreven als student aan het mbo, hbo of universiteit, kunt u geld krijgen voor uw opleiding: studiefinanciering." The text's last sentence (DUO organises the inburgeringsexamen) is supported by the IND page of item 2: "U doet het inburgeringsexamen bij DUO." Volatility: low for the role of DUO; amounts and components change yearly and are not in the item.
- Key C (DUO). A "gemeente": the DUO page itself sends students with a disability to the gemeente for the studietoeslag, a real confusion. B "Belastingdienst": the toeslagen confusion.

## 3. Key balance

| Theme | A | B | C | Items |
| --- | --- | --- | --- | --- |
| 6 Instanties | 3 | 3 | 2 | 8 |
| 7 Staatsinrichting en rechtsstaat | 3 | 2 | 3 | 8 |
| 8 Onderwijs en opvoeding | 2 | 3 | 3 | 8 |
| Total | 8 | 8 | 8 | 24 |

No key is the single longest option in its set (after the review revisions the reisdocument key is longest by one word, 4/3/2, which the two-document rule makes unavoidable); the generator that produced the first draft checked this together with prompt length (max 20 words; the revised aansprakelijkheid prompt is exactly 20), option length (max 8 words) and text length (max 30 words). Every option set has parallel form (three noun phrases, three short sentences, or three qualified yes/no answers).

## 4. Eindterm coverage

| Theme | Eindtermen in the Staatscourant list | Covered in this batch | Not covered here |
| --- | --- | --- | --- |
| 6 | 6.1.1, 6.1.2, 6.2.1, 6.2.2, 6.2.3, 6.2.4, 6.3.1, 6.3.2, 6.3.3, 6.4.1, 6.5.1, 6.5.2, 6.6.1 (13) | 6.2.2, 6.2.3, 6.3.1, 6.3.3, 6.4.1, 6.5.1, 6.5.2, 6.6.1 (8 distinct) | 6.1.1 (DigiD study card exists), 6.1.2, 6.2.1 (verhuizing study card exists), 6.2.4, 6.3.2 |
| 7 | 7.1.1, 7.1.2, 7.1.3, 7.1.4, 7.2.1, 7.2.2, 7.2.3, 7.2.4, 7.2.5, 7.2.6, 7.2.7, 7.2.8 (12) | 7.1.1, 7.1.2, 7.1.3, 7.2.2, 7.2.3, 7.2.6, 7.2.7, 7.2.8 (8 distinct) | 7.1.4 (stemmen study card exists), 7.2.1, 7.2.4 (discriminatie study card exists), 7.2.5 |
| 8 | 8.1.1, 8.1.2, 8.1.3, 8.1.4, 8.1.5, 8.2.1, 8.2.2, 8.2.3, 8.3.1, 8.3.2, 8.3.3 (11) | 8.1.1, 8.1.2, 8.1.5, 8.2.1, 8.2.2, 8.3.1, 8.3.2, 8.3.3 (8 distinct) | 8.1.3 (leerplicht study card exists), 8.1.4, 8.2.3 |

Each theme covers eight distinct eindtermen (the brief asked for at least six) and no two items test the same fact. The uncovered eindtermen were left for the next batch; verified candidates for them are listed in section 5 so that the research does not have to be repeated.

## 5. Verified spare facts, not used (for batch 008)

All opened on 10 September 2026; none of these is in the batch file.

- 6.1.1 — MijnOverheid Berichtenbox: "U kunt ervoor kiezen post van de overheid digitaal te ontvangen via de Berichtenbox van MijnOverheid." https://www.rijksoverheid.nl/vraag-en-antwoord/digitale-overheid/wat-is-mijnoverheid. Also: help with digital government at the Informatiepunt Digitale Overheid and the DigiHulplijn 0800 1508, https://www.rijksoverheid.nl/vraag-en-antwoord/digitale-overheid/waar-kan-ik-hulp-vinden-om-vaardiger-te-worden-met-de-computer-en-internet.
- 6.1.2 — schuldhulpverlening: "Voor hulp bij uw schulden kunt u zich melden bij uw gemeente." https://www.rijksoverheid.nl/vraag-en-antwoord/schulden/schuldhulpverlening-aanvragen.
- 6.2.1 — geboorteaangifte: "U moet binnen 3 dagen na de geboorte van uw baby aangifte doen. Dat doet u in de gemeente waar uw kind is geboren." https://www.rijksoverheid.nl/vraag-en-antwoord/aangifte-geboorte-en-naamskeuze-kind/aangifte-geboorte.
- 6.2.2 (alternative) — rijbewijs: "U moet het rijbewijspasje persoonlijk bij de gemeente aanvragen." https://www.rijksoverheid.nl/onderwerpen/rijbewijs/vraag-en-antwoord/waar-en-hoe-kan-ik-mijn-eerste-rijbewijs-aanvragen.
- 6.2.4 — gemeentelijke belastingen: "De gemeente heft een aantal gemeentelijke belastingen … Voorbeelden … afvalstoffenheffing; onroerendezaakbelasting (OZB); … parkeerbelasting; hondenbelasting; … rioolheffing". https://www.rijksoverheid.nl/vraag-en-antwoord/gemeenten/welke-belastingen-heft-de-gemeente.
- 6.3.2 — aangiftebrief: "Als u een aangiftebrief van ons hebt gehad, moet u aangifte doen." https://www.belastingdienst.nl/wps/wcm/connect/nl/belastingaangifte/content/moet_ik_aangifte_doen (the thresholds on that page change yearly).
- 7.1.4 — gemeenteraadsverkiezingen for non-EU residents after five years of legal residence: https://www.rijksoverheid.nl/vraag-en-antwoord/verkiezingen/wie-mag-stemmen-bij-de-gemeenteraadsverkiezingen and https://www.kiesraad.nl/verkiezingen/gemeenteraden/stemmen/niet-nederlandse-inwoners ("ten minste vijf jaar legaal en onafgebroken in Nederland").
- 7.2.1 — gelijke beloning: "Alle medewerkers binnen een bedrijf moeten bij gelijkwaardig werk een gelijkwaardige beloning krijgen." https://www.rijksoverheid.nl/themas/werk/gelijke-behandeling-op-het-werk/regels-gelijke-behandeling-op-het-werk (the same page states "Volgens artikel 1 van de Grondwet is discriminatie verboden").
- 7.2.4 — Grondwet artikel 1, verbatim on https://wetten.overheid.nl/BWBR0001840/2023-02-22: "Allen die zich in Nederland bevinden, worden in gelijke gevallen gelijk behandeld. Discriminatie wegens godsdienst, levensovertuiging, politieke gezindheid, ras, geslacht, handicap, seksuele gerichtheid of op welke grond dan ook, is niet toegestaan."
- 7.2.5 — privacy rights (inzage, correctie): "Daarom heeft iedereen het recht op: Inzage: u kunt de gegevens bekijken die van u verzameld zijn. Correctie: u kunt gegevens die niet kloppen, laten aanpassen." https://www.rijksoverheid.nl/themas/overheid-en-democratie/privacy-en-persoonsgegevens/privacyregels-beschermen-persoonsgegevens (the Autoriteit Persoonsgegevens site blocks automated fetching; use the rijksoverheid page).
- 8.1.1 (alternative) — "De meeste kinderen gaan al naar school als ze 4 jaar zijn. Maar zij vallen dan nog niet onder de leerplicht." and 8.1.3 — kwalificatieplicht: "Jongeren tussen de 16 en 18 jaar die nog geen startkwalificatie hebben behaald zijn kwalificatieplichtig. Een startkwalificatie is (minimaal) een diploma havo, vwo of mbo (niveau 2 of hoger)." https://www.rijksoverheid.nl/themas/onderwijs/leerplicht/leerplicht-en-kwalificatieplicht.
- 8.1.4 — bso and dagopvang: "Buitenschoolse opvang (bso) is opvang voor schoolgaande kinderen." https://www.rijksoverheid.nl/vraag-en-antwoord/kinderopvang/soorten-kinderopvang; "Buitenschoolse opvang (bso) is de opvang voor en na schooltijd, op vrije dagen en tijdens schoolvakanties." https://www.rijksoverheid.nl/vraag-en-antwoord/basisonderwijs/kosten-basisschool-kind; voorschoolse educatie for toddlers at risk of a language delay via the consultatiebureau, on the kinderopvangtoeslag page of item 23.
- 8.2.3 — opvoedvragen: "Het CJG helpt u bij vragen over opvoeden en ontwikkeling van uw kind." https://www.rijksoverheid.nl/vraag-en-antwoord/jeugdhulp/hulp-vinden-voor-kind-4-18-jaar.
- 8.3.1/8.3.2 (alternative) — gratis schoolboeken: "Scholen stellen de meeste schoolboeken en lesmateriaal gratis beschikbaar aan hun leerlingen." and what parents pay themselves (gymkleding, atlas, woordenboeken, rekenmachine): https://www.rijksoverheid.nl/vraag-en-antwoord/voortgezet-onderwijs/kosten-voor-kind-in-voortgezet-onderwijs.

Nothing had to be dropped for lack of a source; the candidates above were left out only to keep eight items per theme.

## 6. Open doubts for the reviewer

1. **naturalisatie (item 2).** The IND page is current (1 September 2026) and still names 5 years and A2, but a bill to lengthen the residence term and raise the language level has been announced. The item deliberately avoids both numbers; do not add the level or the term to the fact card. Re-check the page at every release.
2. **kinderopvangtoeslag (item 23).** The toeslag is scheduled to be replaced by direct financing of childcare; the date has shifted more than once. Flag the item for retirement when the new system starts.
3. **aansprakelijkheid (item 20).** The eindterm text says "tot het zestiende levensjaar", the law says fully liable under 14 and conditionally at 14 and 15. The item uses age 9 so the key holds under both; the fact card states the under-14 rule from the source. Say so if the exam is known to use 16.
4. **europese-unie (item 10).** The rijksoverheid page phrases the rule for EU/EEA nationals "binnen deze landen"; the item applies it to a Dutch citizen in Spain. The reviewer may want a second source (europa.eu is not on the provenance list, so it was not used).
5. **meningsuiting and godsdienstvrijheid (items 12, 13).** The primary source is the participatieverklaring, a legal appendix published as an image on wetten.overheid.nl; the quotes were transcribed from that image. The Grondwet articles are cited as the second source.
6. **Persona ages.** Sem is described in the cast as a teenage boy; he is 15 (identificatieplicht), a vmbo graduate, and 18 (studiefinanciering) in three items. Mevrouw Bakker (65) never filling in the Donorregister is plausible because the 2020 letters went to everyone; if the reviewer prefers a newcomer scenario, the source also supports "after 3 years in the Netherlands".
7. **Two option sets use a slightly longer distractor** to keep the key from being the longest (kinderbijslag C "Bij de gemeente waar zij wonen"; identificatieplicht, all three options seven words). Check that the longer distractor does not read as more specific and therefore attractive.
8. **Sensitive topics** (geweldloos opvoeden, zelfbeschikking, godsdienstvrijheid) are stated as legal facts without evaluation, as the eindtermen require; the pictures are calm domestic scenes. The reviewer should confirm the tone is neutral at A2.

## Coordinator revision after the editorial review (10 September 2026)

Applied from `content/reviews/007-review.md`: reisdocument asks "Welk identiteitsbewijs moet hij meenemen?" with parallel options (paspoort of identiteitskaart / Nederlandse rijbewijs / zorgpas) and an explanation that names both distractors; europese-unie asks "Heeft hij daarvoor een werkvergunning nodig?" keyed "Nee, EU-burgers mogen daar vrij wonen en werken." so that the existing evidence entails the key and the fact no longer duplicates the reisdocument item; aansprakelijkheid states the age in words ("is 9 jaar") for the read-aloud question; kinderopvangtoeslag uses "kinderdagverblijf" in the prompt and dates the retire trigger in the source note (planned abolition 1 January 2029). The recommended newcomer sentence was added to the donorregister fact card ("Wie nieuw in Nederland komt, krijgt die brief na 3 jaar.", from the same Rijksoverheid page). Keys unchanged: A 8 / B 8 / C 8.

## Second coordinator revision (10 September 2026)

The focused re-review accepted four of the five revised items and asked for the europese-unie distractors to be rebalanced: the key had become the single longest option, the only full clause and the only "Nee". Options are now A "Nee, EU-burgers mogen daar vrij wonen en werken." (key), B "Ja, hij heeft een werkvergunning van Spanje nodig.", C "Nee, maar hij heeft wel een visum nodig." (8/8/8 words; both distractors refuted by the evidence sentence). The item rationales for reisdocument and europese-unie and the option-length claim above were updated to match the file. Nothing else changed.
