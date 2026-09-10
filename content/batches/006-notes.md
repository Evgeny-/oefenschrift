# Batch 006: design notes (KNM, 24 items, themes 1, 3 and 4)

Batch 006 contains 24 original KNM items in the format DUO has used since 1 July 2025 (`content/blueprint.md` §4.5): one picture, one factual question of at most twenty words, three options, `taskType: feit`. Eight items each for theme 1 *Werk en inkomen* (domain `werk`), theme 3 *Wonen* (`wonen-buurt`) and theme 4 *Gezondheid en gezondheidszorg* (`gezondheid`). The eindterm numbers follow Regeling inburgering 2021, bijlage 2, as published in Staatscourant 2024-15802; the text was read on 10 September 2026 from the repository copy `https://repository.overheid.nl/frbr/officielepublicaties/stcrt/2024/stcrt-2024-15802/1/xml/stcrt-2024-15802.xml` (the `zoek.officielebekendmakingen.nl` URL returned HTTP 500 that day).

Every fact was verified by opening the cited page on 10 September 2026 (`sourceReviewedAt`). No official exam item was read for content; the official practice material was used for shape only. Nothing here copies the eight existing KNM study cards (inschrijven gemeente, verhuizing, DigiD, basisverzekering verplicht/aanvullend vrijwillig, 112, leerplicht, stemmen, discriminatie in general): the discrimination item tests the prohibition at a *sollicitatie*, the insurance item tests the *eigen risico* exemption for the huisarts, and DigiD is not tested.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

Conventions:

- `text` is the fact as explained after answering (one or two A2 sentences, 15–24 words); the `evidence` is a verbatim substring of it. `text` is not shown before the answer.
- `skill` is `rule-application` for persona prompts ("Karim … Wat is …?") and `detail` for direct questions (cao, ondernemingsraad, consultatiebureau, huisartsenpost).
- Cast from `config/illustration.json`: Karim (3 items), Fatima (4), Roos (4), Julio (4), meneer De Vries (3), mevrouw Bakker (2), Sem (1), Amina (1 picture); two non-cast names from blueprint §8 (Modibo, Sabrina) with their own description in the brief. Every `imageBrief` is a drawable scene without text, signage or logos, and shows the situation but not the answer (the recept item shows the consulting room, not the pharmacy; the gft item shows peels, not bins).
- Amounts, dates and phone numbers that change (WW weeks, bijstand norms, eigen risico € 385, KVK fee, storingsnummer, income limits) are never the tested fact; where a page shows them they are named under "volatility".

## 1. Batch matrix

| # | id (slug) | Theme | Eindterm | Fact tested | Key | Skill |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | diplomawaardering | 1 | 1.1.4 | a diplomawaardering compares a foreign diploma with a Dutch one | A | rule-application |
| 2 | ww-uitkering | 1 | 1.1.7 | UWV executes the WW for employees who become unemployed | B | rule-application |
| 3 | bijstandsplicht | 1 | 1.1.8 | on bijstand you must accept offered work | A | rule-application |
| 4 | cao | 1 | 1.2.1 | a cao is a collective agreement on pay and hours for a large group | C | detail |
| 5 | ondernemingsraad | 1 | 1.2.2 | the OR consists of employees who confer with management for the staff | B | detail |
| 6 | loonheffing | 1 | 1.2.3 | loonheffing = tax and premie withheld by the employer | A | rule-application |
| 7 | sollicitatie | 1 | 1.3.1 | rejecting an applicant for his origin is prohibited discrimination | C | rule-application |
| 8 | kvk | 1 | 1.4.1 | a new business is registered with KVK | B | rule-application |
| 9 | huurcontract | 3 | 3.1.1 | a huurcontract records the agreements between tenant and landlord | A | rule-application |
| 10 | huuropzegging | 3 | 3.1.2 | a landlord may only terminate with a valid reason | B | rule-application |
| 11 | huurcommissie | 3 | 3.1.2 | disputes about the rent increase go to the Huurcommissie | C | rule-application |
| 12 | woningcorporatie | 3 | 3.1.3 | for social housing you register with a woningcorporatie | C | rule-application |
| 13 | hypotheek | 3 | 3.1.3 | a hypotheek is the loan for a house | A | rule-application |
| 14 | stroomstoring | 3 | 3.2.1 | gas and power outages are reported to the netbeheerder | B | rule-application |
| 15 | energietarief | 3 | 3.2.2 | a vast tarief keeps the energy price the same | B | rule-application |
| 16 | gft | 3 | 3.3.1 | vegetable and fruit peels go in the gft bin | C | rule-application |
| 17 | huisartskeuze | 4 | 4.1.1 | you usually choose your own huisarts | A | rule-application |
| 18 | receptmedicijnen | 4 | 4.1.2 | prescription medicines come from the apotheek | C | rule-application |
| 19 | consultatiebureau | 4 | 4.1.4 | the consultatiebureau follows the health of young children | B | detail |
| 20 | verwijsbrief | 4 | 4.2.1 | a specialist needs a referral from the huisarts | A | rule-application |
| 21 | huisartsenpost | 4 | 4.3.1 | the huisartsenpost gives GP care when the practice is closed | C | detail |
| 22 | eigenrisico | 4 | 4.4.1 | a huisarts visit does not count against the eigen risico | B | rule-application |
| 23 | zorgnota | 4 | 4.4.3 | health bills are viewed online in the insurer's 'mijn omgeving' | A | rule-application |
| 24 | wmo | 4 | 4.5.1 | help at home (huishouden) is arranged by the gemeente under the Wmo | B | rule-application |

## 2. Key balance

| Key | Count | Items |
| --- | --- | --- |
| A | 8 | 1, 3, 6, 9, 13, 17, 20, 23 |
| B | 9 | 2, 5, 8, 10, 14, 15, 19, 22, 24 |
| C | 7 | 4, 7, 11, 12, 16, 18, 21 |

Per theme: theme 1 A3/B3/C2, theme 3 A2/B3/C3, theme 4 A3/B3/C2. No key is the unique longest option in its item (checked by script); options are parallel in form (three institutions, three "Ja/Nee" answers, three noun phrases). `npm run batch:check content/batches/006-original.json`: 24 items, 24 questions, no failures, no warnings. SHA-256 of the batch at the time of writing these notes: `3628cf2efafdb5012bcac86fc40d01dc0be27294f697c4d8239f6e7061a99ec9`.

## 3. Eindterm coverage

Theme 1 (13 eindtermen 1.1.1–1.4.1): 8 distinct — 1.1.4, 1.1.7, 1.1.8, 1.2.1, 1.2.2, 1.2.3, 1.3.1, 1.4.1. Not covered here: 1.1.1 (MAP), 1.1.2 (ways of finding work), 1.1.3, 1.1.5, 1.1.6.

Theme 3 (6 eindtermen 3.1.1–3.3.1): all 6 — 3.1.1 (1), 3.1.2 (2: opzeggen, Huurcommissie), 3.1.3 (2: woningcorporatie, hypotheek), 3.2.1 (1), 3.2.2 (1), 3.3.1 (1).

Theme 4 (12 eindtermen 4.1.1–4.5.1): 8 distinct — 4.1.1, 4.1.2, 4.1.4, 4.2.1, 4.3.1, 4.4.1, 4.4.3, 4.5.1. Not covered: 4.1.3 (tandarts; no primary page found that states how you choose a dentist — the only verifiable dentist fact is the basispakket rule for under-18s, which belongs to 4.4.1), 4.3.2 (112, already a study card), 4.4.2, 4.4.4 (DigiD, close to the existing card).

## 4. Items: source, supporting sentence, distractor rationales

Format per item: eindterm; source (URL, page title, accessed 2026-09-10); the sentence(s) on the page that support the key; volatility; distractors.

### 1 diplomawaardering — 1.1.4 ("hoe de waarde van een eerder behaald diploma … kan worden gewaardeerd")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/onderwijs-en-internationalisering/hoe-laat-ik-mijn-buitenlandse-diploma-in-nederland-waarderen-of-erkennen — "Hoe laat ik mijn buitenlandse diploma in Nederland waarderen of erkennen? | Rijksoverheid.nl".
- Supports key: "Een diplomawaardering of opleidingswaardering beschrijft met welke Nederlandse opleiding of Nederlands diploma uw buitenlandse diploma of opleiding vergelijkbaar is. De Expertisecentra Internationale diplomawaardering SBB en Nuffic stellen de diplomawaarderingen op."
- Volatility: low; organisation names (SBB, Nuffic, IcDW) could change, they are not in the options.
- B "Een officiële vertaling van het diploma." — confusion with a beëdigde vertaling; a waardering compares levels, it does not translate.
- C "Een nieuw examen op een Nederlandse school." — confusion with having to redo the education; no exam is taken.

### 2 ww-uitkering — 1.1.7 ("bij werkloosheid … na een arbeidsverleden direct contact … met het UWV")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/ww-uitkering/wanneer-heb-ik-recht-op-een-ww-uitkering — "Wanneer heb ik recht op een WW-uitkering? | Rijksoverheid.nl" (reached via the productbeschrijving `wetten-en-regelingen/productbeschrijvingen/ww-uitkering-aanvragen`).
- Supports key: "Als u werknemer bent en geheel of gedeeltelijk werkloos wordt, heeft u mogelijk recht op een WW-uitkering." and "UWV voert de WW uit." Also UWV's own page https://www.uwv.nl/nl/ww/ww-aanvragen ("WW-uitkering aanvragen | UWV": "WW aanvragen kan vanaf 1 week voor uw eerste werkloosheidsdag. En uiterlijk binnen 1 week na deze dag.").
- Volatility: conditions (26 of 36 weeks, 70/75 %) change; the role of UWV is stable.
- A "De gemeente." — the gemeente pays bijstand (no work history); nearby institution.
- C "De Belastingdienst." — pays toeslagen and collects tax, not unemployment benefit.

### 3 bijstandsplicht — 1.1.8 ("als uitkeringsgerechtigde in principe aangeboden werk moet accepteren")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/bijstand/wat-zijn-mijn-rechten-en-plichten-in-de-bijstand — "Wat zijn mijn rechten en plichten in de bijstand? | Rijksoverheid.nl".
- Supports key: "Als bijstandsgerechtigde kunt u financiële hulp krijgen van uw gemeente." … arbeidsverplichtingen: "u moet aangeboden werk aanvaarden en zien te behouden" … "Voldoet u niet aan deze plichten? Dan moet uw gemeente uw bijstandsuitkering verlagen."
- Volatility: medium. Rijksoverheid's page "Nieuwe regels bijstand 2026 en 2027" lists changes on 1 January 2026 and 2027 (retroactive payment, gift allowance, buffer budget); the duty to accept work is not among the announced changes, but re-check yearly. Exemptions exist (single parents of children under 5, mantelzorgers), which is why the key says "een plicht" and not "altijd".
- B "Nee, dat is vrijwillig." — reversal of the rule.
- C "Alleen werk in haar eigen vak." — scope error: "algemeen geaccepteerde arbeid" must be accepted, not only work in one's own field.

### 4 cao — 1.2.1 ("voor veel sectoren in Nederland collectieve arbeidsovereenkomsten (cao's) bestaan")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/wat-is-een-cao — "Wat is een cao? | Rijksoverheid.nl".
- Supports key: "Een collectieve arbeidsovereenkomst (cao) is een schriftelijke overeenkomst waarin afspraken over arbeidsvoorwaarden staan. Bijvoorbeeld over loon, toeslagen, betaling van overwerk, werktijden, proeftijd, opzegtermijn of pensioen. Een cao geldt voor een grote groep mensen." and "Een cao wordt afgesloten door 1 of meer werkgevers, 1 of meer werkgeversorganisaties en 1 of meer werknemersorganisaties (meestal vakbonden)."
- Volatility: low.
- A "Een contract voor één werknemer." — that is the individual arbeidsovereenkomst; scope error (one person vs a group).
- B "Een vergunning om in Nederland te werken." — confusion with a tewerkstellingsvergunning/verblijfsvergunning; a cao is an agreement, not a permit.

### 5 ondernemingsraad — 1.2.2 ("kent ondernemingsraad/medezeggenschapsraad … als voorbeelden van werknemersparticipatie")

- Source: https://www.rijksoverheid.nl/themas/werk/ondernemingsraad — "Ondernemingsraad | Rijksoverheid.nl".
- Supports key: "Ondernemingen en organisaties met 50 of meer medewerkers moeten een ondernemingsraad (OR) hebben. Deze raad bestaat uit eigen werknemers die namens het personeel overleggen met directie of bestuur. Zo hebben werknemers inspraak …"
- Volatility: low (Wet op de ondernemingsraden; the 50 threshold has been stable for decades and is in `text`, not in the question).
- A "De directie van het bedrijf." — the OR talks *with* the directie; person confusion.
- C "Een vakbond voor de hele sector." — the other form of participation in the same eindterm; a vakbond is an external organisation for a sector, the OR is inside one company.

### 6 loonheffing — 1.2.3 ("werknemerspremies en belastingen op het salaris worden ingehouden")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/inkomstenbelasting/loonheffing-premies-werkgever — "Wat moet ik als werkgever afdragen over het loon van werknemers? | Rijksoverheid.nl".
- Supports key: "U houdt als werkgever elke maand loonheffing in op het salaris van uw werknemers." and "Loonheffing is de verzamelnaam voor loonbelasting en de premie voor de volksverzekeringen." The loonstrook page (https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao/vraag-en-antwoord/wat-staat-er-op-mijn-loonstrook, "Wat staat er op mijn loonstrook?") confirms that the loonstrook shows the brutoloon and the loonheffingen.
- Volatility: rates change yearly; the mechanism is stable. Note for precision: the premies werknemersverzekeringen (WW, WIA) are paid by the employer and *not* withheld; the item therefore says "belasting en premie voor volksverzekeringen", matching the page.
- B "Extra loon voor overwerk in de avond." — reversal (an addition, not a deduction); overwerkloon is in the same loon list on the page.
- C "Het vakantiegeld dat hij in mei krijgt." — reversal; vakantiegeld is an extra payment on which loonheffing is due.

### 7 sollicitatie — 1.3.1 ("discriminatie op de arbeidsmarkt en de werkvloer wettelijk verboden is")

- Source: https://www.rijksoverheid.nl/themas/werk/gelijke-behandeling-op-het-werk/regels-gelijke-behandeling-op-het-werk — "Regels gelijke behandeling op het werk | Rijksoverheid.nl".
- Supports key: "Bij een sollicitatie en op het werk mag geen sprake zijn van ongelijke behandeling. Dit betekent dat werkgevers geen onderscheid mogen maken op de zogenoemde discriminatiegronden." "Volgens artikel 1 van de Grondwet is discriminatie verboden. … Er staat een aantal discriminatiegronden in de wet, zoals ras, godsdienst en leeftijd." "Werkgevers mogen sollicitanten niet buitensluiten door kenmerken als leeftijd of geslacht. Dit mag alleen als het voor de functie nodig is."
- Volatility: low (constitutional rule). The item uses *afkomst* (ras), for which no job-related exception applies to an ordinary employer; the existing study card covers discrimination in general and where to report it, this item covers the sollicitatie.
- A "Ja, dat mag altijd." — reversal.
- B "Ja, als het een klein bedrijf is." — scope error: the law binds every employer; the size of the company plays no role.

### 8 kvk — 1.4.1 ("inschrijving bij de Kamer van Koophandel verplicht is om een bedrijf te kunnen starten")

- Source: https://ondernemersplein.overheid.nl/bedrijf-starten/inschrijven-bij-kvk/inschrijven-bij-kvk/ — "Inschrijven bij KVK: dit moet u weten | Ondernemersplein" (overheid.nl; Ondernemersplein is run by KVK on behalf of the government). KVK's own entry page https://www.kvk.nl/inschrijven/ says the same ("Als je een bedrijf of organisatie begint, dan moet je je onderneming meestal inschrijven in het Handelsregister bij KVK.").
- Supports key: "Start u een eigen bedrijf, dan moet u zich inschrijven in het Handelsregister van KVK. … U hoeft zich niet apart in te schrijven bij de Belastingdienst. Dat gebeurt automatisch na uw inschrijving bij KVK."
- Volatility: the fee (€ 85,15 on the page) changes yearly and is not used; the duty is stable.
- A "Bij de Belastingdienst in haar regio." — the page says this is *not* needed separately: KVK passes the data on.
- C "Bij de gemeente waar zij woont." — institution confusion (the gemeente handles permits and the BRP, not business registration).
- Note: the key "Bij de Kamer van Koophandel." (5 words) sits between two 6-word distractors so that the institution's long name does not mark it.

### 9 huurcontract — 3.1.1 ("weet wat een huurcontract inhoudt")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/woning-huren/welke-afspraken-staan-er-in-het-huurcontract-van-mijn-woning — "Welke afspraken staan er in het huurcontract van mijn woning? | Rijksoverheid.nl".
- Supports key: "In een huurcontract staan de afspraken tussen u en uw verhuurder. Bijvoorbeeld hoe hoog de huur is. Ook staat er een omschrijving van de woning in." and "Uw verhuurder moet een schriftelijk huurcontract opstellen."
- Volatility: low.
- B "Een bewijs dat hij de woning koopt." — confusion with a koopcontract/leveringsakte; huur is not koop.
- C "Een brief van de gemeente over huurtoeslag." — huurtoeslag is a toeslag from Dienst Toeslagen, not from the gemeente, and not a contract.

### 10 huuropzegging — 3.1.2 ("huurders in Nederland wettelijke rechten hebben")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/woning-huren/verhuurder-zegt-huur-op-woning — "Mag mijn verhuurder de huur opzeggen van mijn woning? | Rijksoverheid.nl".
- Supports key: "Uw verhuurder mag niet zomaar de huur opzeggen van uw woning. Dat kan alleen met een goede reden. Bijvoorbeeld als u al meerdere maanden geen huur betaalt. Als u het niet eens bent met de opzegging, kunt u bezwaar maken." and "De rechter doet dan een uitspraak. Tot die tijd mag u in de woning blijven wonen."
- Volatility: the list of valid reasons and the rules for tijdelijke contracten changed in 2024 (Wet vaste huurcontracten); the principle "not without a valid reason" is stable. A tijdelijk contract ends on its end date without opzegging; the item's persona simply "huurt een woning", and the key "alleen met een goede reden" holds for the opzegging the question asks about.
- A "Ja, dat mag altijd." — reversal.
- C "Ja, als hij een maand eerder belt." — confusion with the opzegtermijn; notice alone, and by phone, is not enough, a legal reason is needed.

### 11 huurcommissie — 3.1.2 ("hoe hij hulp kan inschakelen in geval van … onterechte huurverhoging, achterstallig onderhoud")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/woning-huren/wanneer-kan-ik-terecht-bij-de-huurcommissie-en-wanneer-bij-de-kantonrechter — "Wanneer kan ik terecht bij de Huurcommissie, de gemeente en de kantonrechter? | Rijksoverheid.nl".
- Supports key: "Huurt u een sociale huurwoning of middenhuurwoning? En bent u het niet eens met de hoogte van de huur of de jaarlijkse huurverhoging? Of heeft u een verschil van mening met uw verhuurder over het onderhoud of de servicekosten? Als u hier samen niet uitkomt, kijk dan wanneer u de Huurcommissie kunt inschakelen." Also "De partij die het niet eens is met de uitspraak van de Huurcommissie kan een uitspraak van de kantonrechter vragen."
- Volatility: medium; the Wet betaalbare huur (1 July 2024) widened the Huurcommissie's scope to middenhuur and to servicekosten in newer contracts. The page also says the gemeente can act when the *huurprijs* is too high, which is why "de gemeente" is deliberately not a distractor.
- A "De politie." — institution confusion; a rent dispute is not a criminal matter.
- B "De Belastingdienst." — confusion with huurtoeslag/tax; it does not judge rents.

### 12 woningcorporatie — 3.1.3 ("het belang van spoedige inschrijving als woningzoekende"; "contact … met de passende instantie")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/huurwoning-zoeken/wanneer-kom-ik-in-aanmerking-voor-een-sociale-huurwoning — "Kom ik in aanmerking voor een sociale huurwoning van een woningcorporatie? | Rijksoverheid.nl".
- Supports key: "Voor een sociale huurwoning van een woningcorporatie gelden voorwaarden. U moet zich bijvoorbeeld inschrijven bij een woningcorporatie. Woningbouwcorporaties mogen eisen stellen aan uw inkomen. Of aan de grootte van uw gezin." and "U moet zich inschrijven bij een woningcorporatie. Of bij een andere organisatie die sociale huurwoningen aanbiedt. Welke organisaties dit zijn, kunt u navragen bij uw gemeente." The related page "Hoe lang duurt het voordat ik een huurwoning krijg?" adds "Meestal is dit de persoon die het langst ingeschreven staat."
- Volatility: income limits (€ 51.537 / € 56.910 for 2026) change yearly and are not used. In some regions registration runs through a regional platform on behalf of the corporations; the page's wording "of bij een andere organisatie die sociale huurwoningen aanbiedt" covers this, and "de gemeente" is deliberately not a distractor.
- A "Bij een makelaar." — a makelaar mediates koopwoningen and vrije-sector rentals, not social housing lists.
- B "Bij de notaris." — the notaris handles the deed of a purchase; nothing to do with rental registration.

### 13 hypotheek — 3.1.3 ("woonruimte … via sociale huur, vrije huursector en koopsector")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/huis-kopen/hypotheek-aanvragen-wat-moet-ik-regelen — "Hypotheek aanvragen: maak een overzicht van wat u moet weten en regelen | Rijksoverheid.nl".
- Supports key: "U wilt een huis kopen. Om dat te betalen wilt u een hypotheek afsluiten." Supported further by https://www.rijksoverheid.nl/vraag-en-antwoord/huis-kopen/maximaal-bedrag-lenen-koopwoning ("Hoeveel kan ik maximaal lenen voor mijn koopwoning?"): "U kunt een hypotheek afsluiten tot 100% van de waarde van het huis. U kunt dus niet meer lenen dan het huis waard is."
- Volatility: low; lending norms change yearly and are not tested.
- B "Een belasting op het huis." — confusion with onroerendezaakbelasting (ozb) or overdrachtsbelasting.
- C "Een verzekering voor het huis." — confusion with an opstalverzekering, which a lender may require but which is not the loan.

### 14 stroomstoring — 3.2.1 ("weet hoe hij een storing meldt bij de leverancier van de nutsvoorziening")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/energie-thuis/vragen-over-gas-of-stroomstoringen — "Waar kan ik terecht bij vragen over gas- of stroomstoringen? | Rijksoverheid.nl".
- Supports key: "Bij vragen over gas- of stroomstoringen moet u bij de netbeheerder zijn. De netbeheerders hebben 1 landelijk storingsnummer: 0800-9009. De netbeheerder is verantwoordelijk voor: de aanleg van elektriciteitskabels en gasleidingen; het transport van elektriciteit of gas over zijn netwerk."
- Volatility: low; the number is not tested. (A storing of a warmtenet goes to the warmtebedrijf; the item is about stroom.)
- A "Bij de gemeente." — institution confusion; the gemeente handles public space, not the energy network.
- C "Bij de energieleverancier." — the tempting one: the leverancier sells and bills the energy; the network and its outages belong to the netbeheerder (the page's own distinction).

### 15 energietarief — 3.2.2 ("kent het verschil tussen een energiecontract met tijdelijke en vaste tarieven")

- Source: https://consument.acm.nl/elektriciteit-en-gas/wat-betaal-ik-voor-mijn-energie/vaste-variabele-leveringskosten-energie — "Vaste en variabele leveringskosten energie | ACM ConsuWijzer" (consumer site of the Autoriteit Consument & Markt, the public supervisor of the energy market).
- Supports key: "Bij een contract met een vast tarief betaalt u dezelfde prijs voor elektriciteit of gas. Daardoor betaalt u niet meer als de prijzen stijgen. Maar u hebt ook geen voordeel als de prijzen dalen. Uw vaste tarief geldt voor bepaalde tijd: bijvoorbeeld 1 of 3 jaar. Zegt u vóór de einddatum op? Dan mag uw energieleverancier een opzegvergoeding vragen." and "Bij een contract met een variabel tarief mag de leverancier het tarief per kWh en m3 veranderen."
- Volatility: low; opzegvergoeding rules (2023) are not tested. Other parts of the bill (belastingen, netbeheerkosten) can still change during a fixed contract; the item speaks of "de prijs voor stroom en gas", i.e. the leveringstarief.
- A "Hij mag nooit van leverancier veranderen." — scope error: switching is allowed, at most with an opzegvergoeding.
- C "De leverancier mag de prijs elk halfjaar veranderen." — that describes the variabel tarief (the page: many suppliers change around 1 July and 1 January).

### 16 gft — 3.3.1 ("kent de lokale regels voor … afvalscheiding; weet waarom afvalscheiding belangrijk is")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/afval/welk-afval-mag-ik-in-de-gft-bak-doen — "Waar kan ik mijn groente, fruit en tuinafval (gft) inleveren? | Rijksoverheid.nl".
- Supports key: "Groenteafval, fruitafval en tuinafval mag u in de gft-bak doen. Van dit afval kan compost gemaakt worden." and "Hoe u het gft-afval moet inleveren, verschilt per gemeente."
- Volatility: low.
- A "Bij het restafval." — the tempting everyday mistake; peels are compostable and belong in the gft stream.
- B "In de glasbak." — another separated stream, clearly for glass.

### 17 huisartskeuze — 4.1.1 ("weet hoe hij een huisarts kan kiezen")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/ben-ik-vrij-om-zelf-een-huisarts-te-kiezen-en-hoe-verander-ik-van-huisarts — "Hoe verander ik van huisarts? | Rijksoverheid.nl".
- Supports key: "Het is meestal mogelijk om zelf uw huisarts te kiezen en ook om van huisarts te veranderen. Een huisarts mag in bepaalde situaties weigeren u als patiënt aan te nemen. Bijvoorbeeld als u te ver weg woont." and "Lukt het niet een nieuwe huisarts te vinden, neem dan contact op met uw zorgverzekeraar. De verzekeraar helpt een nieuwe huisarts te zoeken."
- Volatility: low. The key is qualified ("meestal") because a full practice may refuse.
- B "Nee, de gemeente wijst een huisarts aan." — institution confusion (the gemeente registers residents, not patients).
- C "Nee, de zorgverzekeraar kiest de huisarts." — the insurer only helps when you cannot find one; it does not choose.

### 18 receptmedicijnen — 4.1.2 ("weet dat hij een recept nodig heeft voordat hij bij de apotheek medicijnen kan ophalen")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/geneesmiddelen/waar-kan-ik-medicijnen-kopen — "Waar kan ik medicijnen kopen? | Rijksoverheid.nl".
- Supports key: "Receptmedicijnen kunt u alleen bij een apotheek kopen. Voor zelfzorgmedicijnen heeft u geen recept nodig. Deze zijn ook bij de drogist of andere winkels te koop." and "Receptmedicijnen krijgt u alleen met een recept van uw (huis)arts. Deze geneesmiddelen koopt u in een apotheek."
- Volatility: low.
- A "Bij de drogist." — the other half of the eindterm: the drogist sells only medicines without prescription.
- B "Bij de huisartsenpost." — the out-of-hours GP service does not dispense prescription medicines; institution confusion.

### 19 consultatiebureau — 4.1.4 ("weet welke diensten de kraam-, geboortezorg en een consultatiebureau bieden")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zwangerschap-en-geboorte/bij-wie-kan-ik-terecht-met-vragen-over-de-gezondheid-en-opvoeding-van-mijn-kind — "Waar kan ik vragen stellen over de gezondheid en opvoeding van mijn kind van 0–4 jaar? | Rijksoverheid.nl".
- Supports key: "U kunt met vragen over de gezondheid, opvoeding en ontwikkeling terecht bij het consultatiebureau." "U kunt vragen stellen over uw baby aan de jeugdarts of verpleegkundige van het consultatiebureau (gratis jeugdgezondheidszorg). … Ook krijgt uw baby inentingen tegen kinderziekten op het consultatiebureau. Het consultatiebureau nodigt u uit als uw baby 1 maand is."
- Volatility: low.
- A "Het past op kinderen als ouders werken." — confusion with kinderopvang.
- C "Het regelt de aangifte van een geboorte." — confusion with the gemeente (geboorteaangifte within 3 working days, per the "Ik krijg een kind" page).

### 20 verwijsbrief — 4.2.1 ("de huisarts doorverwijst naar specialistische zorg")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/wanneer-heb-ik-een-verwijsbrief-van-mijn-huisarts-nodig-en-wanneer-mag-hij-deze-weigeren — "Wanneer heb ik een verwijsbrief van de huisarts nodig? | Rijksoverheid.nl".
- Supports key: "Voor specialistische zorg, bijvoorbeeld in ziekenhuizen, heeft u een verwijsbrief nodig." "De huisarts geeft alleen een verwijzing als dit medisch nodig is." "Heeft u geen geldige verwijsbrief en gaat u toch naar de specialist? Dan kan het zijn dat u de behandeling zelf moet betalen."
- Volatility: low; the list of paramedics reachable without referral (fysiotherapeut, diëtist …) is not tested.
- B "Een recept van de apotheek." — document confusion (a recept is for medicines, and it comes from a doctor, not the pharmacy).
- C "Een brief van de gemeente." — institution confusion; the gemeente has no role in hospital referrals.

### 21 huisartsenpost — 4.3.1 ("weet dat voor spoedgevallen avond- en weekenddiensten zijn geregeld")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartsenpost-spoedeisende-hulp — "Wanneer moet ik naar de huisartsenpost of de spoedeisende hulppost? | Rijksoverheid.nl".
- Supports key: "Is uw huisartsenpraktijk dicht? Dan verwijst de huisarts u door naar de huisartsenpost. De huisartsenpost geeft aan of u moet langskomen of beter een afspraak kunt maken met uw huisarts binnen zijn werktijden. Ook kunnen zij u verwijzen naar de spoedeisende hulppost van een ziekenhuis." and "Neem altijd eerst contact op met uw huisartsenpost voordat u naar de spoedeisende hulppost gaat. Behalve bij een levensbedreigende situatie. Dan kunt u het beste direct 112 bellen." The huisarts page (item 17) states the hours: "in de avond, nacht of in het weekend kunt u gebruikmaken van een huisartsenpost".
- Volatility: low.
- A "De spoedafdeling van het ziekenhuis." — the page's own contrast: the SEH is in the hospital and is reached after the huisartsenpost.
- B "Een apotheek die 's nachts open is." — confusion with a dienstapotheek; the huisartsenpost is GP care, not a pharmacy.

### 22 eigenrisico — 4.4.1 ("weet dat een bezoek aan de huisarts niet ten koste gaat van het eigen risico")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/eigen-risico-zorgverzekering — "Wanneer betaal ik een eigen risico voor mijn zorg? | Rijksoverheid.nl".
- Supports key: "U betaalt een eigen risico als u 18 jaar of ouder bent en gebruikmaakt van zorg uit het basispakket. Behalve als het over zorg gaat waarvoor geen eigen risico geldt, zoals de huisarts." and "Voor de volgende zorg uit het basispakket betaalt u geen eigen risico: huisartsenzorg (waaronder de huisartsenpost); …". Confirmed on https://www.rijksoverheid.nl/vraag-en-antwoord/eerstelijnszorg/huisartskosten-op-zorgnota ("Moet ik de huisartskosten zelf betalen?": "een bezoek aan de huisarts gaat niet ten koste van uw verplichte eigen risico").
- Volatility: the amount (€ 385 in 2026) changes and is expected to fall in 2027; it is not tested. The exemption for huisartsenzorg is stable. Tests and medicines the huisarts orders do fall under the eigen risico; the explanation says so.
- A "Ja, elk bezoek kost eigen risico." — reversal.
- C "Ja, alleen het eerste bezoek per jaar." — invented partial rule; no huisarts visit counts.

### 23 zorgnota — 4.4.3 ("veel administratieve aspecten van de zorg digitaal geregeld worden")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/zorgnota-controleren — "Hoe kan ik een zorgnota controleren? | Rijksoverheid.nl".
- Supports key: "U kunt een zorgnota inzien op de website van uw zorgverzekeraar." "Een zorgverlener stuurt een rekening meestal rechtstreeks naar uw zorgverzekeraar. … Daarna kunt u de rekening zien via 'mijn omgeving' op de website van uw zorgverzekeraar."
- Volatility: low.
- B "Op de website van de gemeente." — institution confusion (the gemeente has no health bills).
- C "Op de website van de huisartsenpost." — the huisartsenpost is a care provider, not the place where bills are collected.

### 24 wmo — 4.5.1 ("welzijnsfaciliteiten waarvoor hij terecht kan bij een gemeenteloket of wijkteam … hulp thuis, bijvoorbeeld voor ouderen")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorg-en-ondersteuning-thuis/ondersteuning-gemeente-wmo-2015-aanvragen — "Hoe krijg ik ondersteuning van de gemeente vanuit de Wmo? | Rijksoverheid.nl".
- Supports key: "Meldt u zich bij de gemeente met het verzoek om ondersteuning, zodat u thuis kunt blijven wonen? Dan moet de gemeente onderzoek doen naar uw persoonlijke situatie." "Het Wmo-loket of het sociale wijkteam van uw gemeente geeft u informatie over de Wmo. En helpt u bij de aanvraag van voorzieningen uit de Wmo." The companion page https://www.rijksoverheid.nl/vraag-en-antwoord/zorg-en-ondersteuning-thuis/ondersteuning-gemeente-wmo-2015 ("Welke hulp kan ik thuis krijgen van de gemeente vanuit de Wmo?") lists "huishoudelijke hulp (zoals hulp bij het opruimen, schoonmaken en ramen zemen)" among the maatwerkvoorzieningen.
- Volatility: medium; Wmo reforms are under discussion, and the gemeente may ask an eigen bijdrage. The division gemeente (Wmo, household help) versus zorgverzekeraar (wijkverpleging) is stable as of 2026.
- A "De zorgverzekeraar." — the tempting one: it covers medical care at home (wijkverpleging), not household help.
- C "Het ziekenhuis." — institution confusion.

## 5. Verified reserves (not in the batch)

Facts verified on the same day that can replace an item if the reviewer rejects one; they are not written up as items.

- 1.1.2 / 1.2.1: "Als uitzendkracht heeft u een arbeidscontract met het uitzendbedrijf, maar werkt u voor een ander bedrijf (de inlener)." — https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/welke-arbeidsvoorwaarden-heb-ik-als-uitzendkracht ("Welke arbeidsvoorwaarden heb ik als uitzendkracht?").
- 1.1.7: bijstand is applied for at the gemeente (or via werk.nl) — https://www.rijksoverheid.nl/onderwerpen/bijstand/vraag-en-antwoord/waar-kan-ik-mijn-bijstand-regelen.
- 3.2.2: the jaarrekening — "U ontvangt 1 keer per jaar de rekening van uw energieverbruik. … U betaalt dan een termijnbedrag. … Heeft u te veel voorschot betaald? Dan krijgt u een bedrag terug." — https://www.rijksoverheid.nl/vraag-en-antwoord/energie-thuis/energierekening-betalen ("Wanneer betaal ik mijn energierekening?").
- 3.3.1: grofvuil — "U kunt grofvuil laten ophalen door uw gemeente. Of het afval zelf wegbrengen naar de milieustraat of het milieustation van uw gemeente." — https://www.rijksoverheid.nl/vraag-en-antwoord/afval/wat-kan-ik-doen-met-grofvuil.
- 4.4.1: switching insurer once a year (polis in November, opzeggen uiterlijk 31 december) — https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/overstappen-zorgverzekeraar; dental care for children under 18 in the basispakket, periodic check-up for adults not — https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/krijg-ik-tandartskosten-vergoed.
- 4.4.4: "U kunt zorgtoeslag online aanvragen met Mijn toeslagen. Hiervoor heeft u DigiD nodig." — https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/kan-ik-zorgtoeslag-krijgen (left out because it is close to the existing DigiD card).

## 6. Open doubts for the reviewer

1. **`situation` field.** Blueprint §3 lists `situation` as required for "KNM scenes", but the batch brief's item shape has no such field and `batch-check` does not require it for KNM. The items follow the brief; add a `situation` line at integration if the app expects one.
2. **Item 3 (bijstandsplicht).** The duty to accept work has exemptions (single parents of under-fives, mantelzorgers, full arbeidsongeschiktheid). The key says "een plicht", not "altijd"; confirm this qualification is enough at A2, and re-check the wording against the 2027 Participatiewet changes.
3. **Item 6 (loonheffing).** The eindterm speaks of "werknemerspremies en belastingen"; the page distinguishes loonheffing (withheld: loonbelasting + premie volksverzekeringen) from premies werknemersverzekeringen (paid by the employer). The item says "belasting en premie", which is correct for loonheffing; confirm the reviewer is comfortable that "premie" is not read as WW/WIA premiums.
4. **Item 8 (kvk).** The key is the institution's full name (5 words) between two 6-word distractors; if the reviewer prefers bare institution names, the key becomes the longest option. Also: not every one-off seller has to register (the page: "meestal"); the persona explicitly "wil een eigen bedrijf starten".
5. **Item 10 (huuropzegging).** A tijdelijk huurcontract ends automatically on its end date without opzegging; the item's answer concerns opzegging of a running contract. If the reviewer finds the persona too open, add "voor onbepaalde tijd" to the prompt (word count allows it).
6. **Item 11 (huurcommissie).** The Huurcommissie can only issue a temporary rent reduction for maintenance defects; enforcing maintenance needs the kantonrechter. The question is limited to the huurverhoging, where the Huurcommissie is the first body; the `text` sentence "beoordeelt ook conflicten over onderhoud en servicekosten" follows the page but the reviewer may prefer "kan ook helpen bij".
7. **Item 12 (woningcorporatie).** In some regions the registration is a shared regional system; the page's "of bij een andere organisatie die sociale huurwoningen aanbiedt" covers it and "gemeente" is not offered as a distractor. Acceptable?
8. **Item 15 (energietarief).** Source is ACM ConsuWijzer (a public supervisor's consumer site), not rijksoverheid.nl; Rijksoverheid has no page defining vast/variabel tarief. The workflow allows "the responsible agency".
9. **Item 21 (huisartsenpost).** The hours ("'s avonds, 's nachts of in het weekend") come from the huisarts page, the function from the huisartsenpost page; both are cited. Confirm one `sourceUrl` is enough.
10. **Item 24 (wmo).** "Hulp bij het schoonmaken" is huishoudelijke hulp under the Wmo (gemeente). Someone with a Wlz indication gets it through the Wlz instead; the persona has no such indication. Acceptable at A2?
11. **Theme 4 gap.** 4.1.3 (tandarts) has no item because no primary page states how a dentist is chosen; the under-18 basispakket fact is verified (reserve list) if the coordinator wants 4.1.3 represented by proxy.
12. **Pictures.** Item 2 shows Karim leaving an office with a box (a lost job); confirm the tone is acceptable. Item 21 shows Amina ill on a sofa with an adult on the phone; nothing graphic.

## Coordinator revision after review (10 September 2026)

Applied the three review requests: the woningcorporatie explanation now argues from registering as woningzoekende (the cited page also names other organisations that offer social housing); the hypotheek item cites the page that states the loan fact (maximaal-bedrag-lenen-koopwoning); the huisartsenpost prompt is a persona case ("Amina is 's nachts ziek. Wat is de huisartsenpost?") that no longer restates the key. No other field changed. Checker: no failures.
