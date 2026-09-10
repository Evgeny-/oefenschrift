# Batch 018: design notes (KNM, theme 2 *Omgangsvormen, waarden en normen*, 12 items)

Batch 018 contains 12 original KNM items in the format DUO has used since 1 July 2025 (`content/blueprint.md` §4.5): one picture, one factual question of at most twenty words read by the narrator, three parallel options, `taskType: feit`, level A2, `theme: 2`. All seven eindtermen of theme 2 are covered at least once; 2.1.3 (afspraken, op tijd komen), 2.1.4 (samenlevingsvormen) and 2.1.5 (feest- en gedenkdagen) twice or three times. The eindtermen were read on 10 September 2026 in the consolidated Regeling inburgering 2021, bijlage 2, on wetten.overheid.nl (`https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2`, version in force since 18 April 2026); the theme 2 text is identical to the version of 1 July 2025, which was also opened.

Theme 2 in the Regeling, verbatim headings: 2.1 *Duiden van verschillende omgangsvormen in Nederland* — 2.1.1 omgangsvormen, waarden en normen verschillen per sociale groep, regio, generatie en sociaaleconomische klasse; 2.1.2 veel mensen in Nederland uiten zich direct; 2.1.3 van tevoren afspraken maken, op tijd komen, tijdig afmelden; 2.1.4 verschillende samenlevingsvormen, ook voor partners van gelijk geslacht, huwelijk en geregistreerd partnerschap in de wet geregeld, ongehuwd samenwonen komt vaak voor; 2.1.5 officiële feest- en gedenkdagen (Pasen, Koningsdag, 4 en 5 mei, Kerst, Oud en Nieuw) en in sommige kringen relevante feestdagen (Sinterklaas, Carnaval, Suikerfeest, Keti Koti). 2.2 *Deelnemen aan sociale netwerken* — 2.2.1 veel organisaties en verenigingen, vrijwilligerswerk helpt bij het opbouwen van een netwerk; 2.2.2 gebruiken bij familiegebeurtenissen (verjaardag, geboorte, slagen voor examen, bruiloft, overlijden).

Every fact was verified by opening the cited page on 10 September 2026 (`sourceReviewedAt`); no search snippet was used as verification. Where the eindterm is itself the only primary statement of a custom (2.1.1, 2.1.2, the punctuality indicator of 2.1.3), the Regeling on wetten.overheid.nl is the cited source, as batch 007 did for 7.2.3. Nothing is copied from official practice items; the official material was used for shape only. The rules from the level check of batches 006–007 (`content/reviews/006-007-level-check.md`) were applied while writing: no key decodable from the question's words, no prompt word that recurs only in the key, in the one yes/no item the key shares its polarity with a distractor, no key that is the longest option, and every question asks what a rule, custom or right *is* — never what the learner should do (DUO dropped the behaviour questions in 2025). Facts only: the items describe what the custom or rule is; no item asks whether it is good.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

Conventions:

- `text` is the fact shown after answering (two or three A2 sentences, 19–30 words); the `evidence` is a verbatim substring of it and entails the key. `text` is not shown before the answer.
- Every prompt is a persona fact (`skill: rule-application`), 11–19 words; options 5–9 words, parallel in form within an item.
- `domain` follows the setting: `werk` (directheid, op-tijd), `gezondheid` (wegblijftarief), `vrije-tijd-familie` (the other nine — the blueprint lists birthdays, the children's school and a sports club under family and free time).
- Cast from `config/illustration.json`, traits copied verbatim: Karim (2), Julio (2), Roos (2), Amina (2), Fatima (1), meneer De Vries (1), mevrouw Bakker (1), Sem (1). Every brief ends with "no text"; no picture shows the answer (the geslaagd picture has no flag, the 4 mei picture no monument or flags, the trakteren picture a birthday chair but nothing being handed out).
- Sources that could change are named under "volatility" per item; the only date-bound fact is Koningsdag = the birthday of the current King.

`npm run batch:check content/batches/018-original.json`: 12 items, keys A 4 / B 4 / C 4, no failures, no warnings (10 September 2026). SHA-256 of the batch at the time of writing these notes: `d1ef87f3eae449ae8e8415cc0a1ec0cdaecf8f1181c4d791a7b4315f6523a847`.

## 1. Batch matrix

| # | id (slug) | Eindterm | Fact tested | Persona | Domain | Key |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | omgangsvormen | 2.1.1 | customs and norms differ per group, region and generation; they are not uniform and not in the law | Karim | vrije-tijd-familie | A |
| 2 | directheid | 2.1.2 | a colleague saying directly what she thinks is an ordinary way of speaking, not anger or a complaint | Julio | werk | B |
| 3 | op-tijd | 2.1.3 | an appointment at ten means being there at ten | Fatima | werk | C |
| 4 | wegblijftarief | 2.1.3 | not cancelling a hospital appointment can cost a wegblijftarief, not reimbursed by the insurer | meneer De Vries | gezondheid | A |
| 5 | gelijk-geslacht | 2.1.4 | two women (or two men) may marry: the law opens marriage to two persons of different or the same sex | Roos | vrije-tijd-familie | B |
| 6 | burgerlijk-huwelijk | 2.1.4 | a religious ceremony (mosque, church) may only follow the civil marriage at the gemeente | Karim | vrije-tijd-familie | C |
| 7 | samenwonen | 2.1.4 | unmarried cohabitation is allowed and common; a samenlevingscontract is optional | Julio | vrije-tijd-familie | A |
| 8 | dodenherdenking | 2.1.5 | on 4 May the war dead are commemorated (two minutes' silence at 20:00) | mevrouw Bakker | vrije-tijd-familie | C |
| 9 | koningsdag | 2.1.5 | Koningsdag (27 April) celebrates the King's birthday | Amina | vrije-tijd-familie | B |
| 10 | vrijwilligerswerk | 2.2.1 | a volunteer works unpaid and by choice | Roos | vrije-tijd-familie | C |
| 11 | geslaagd | 2.2.2 | after passing an exam families fly the flag (often with a schoolbag) | Sem | vrije-tijd-familie | A |
| 12 | trakteren | 2.2.2 | at primary school the birthday child hands out a treat | Amina | vrije-tijd-familie | B |

Question forms: 11 persona facts with a "what is / what applies" question, 1 yes/no with qualification (samenwonen: ja / ja-maar / nee, key shares the "ja" polarity). No behaviour questions.

## 2. Key balance

| Key | Count | Items |
| --- | --- | --- |
| A | 4 | 1, 4, 7, 11 |
| B | 4 | 2, 5, 9, 12 |
| C | 4 | 3, 6, 8, 10 |

Sequence A B C A B C A C B C A B: no letter three times in a row. In no item is the key the longest option by words or by characters (checked by the build script and by `batch-check`). Option lengths per item (words): 7-7-7, 6-6-7, 8-8-7, 7-7-6, 6-7-7, 9-9-8, 7-6-7, 7-7-7, 7-8-8, 7-7-7, 5-5-5, 6-6-6.

## 3. Eindterm coverage

| Eindterm | Items | Not covered here |
| --- | --- | --- |
| 2.1.1 | omgangsvormen | the indicator "weet hoe hij zich op de hoogte kan stellen …" is a skill, not a testable fact |
| 2.1.2 | directheid | — |
| 2.1.3 | op-tijd, wegblijftarief | "weet hoe hij een afspraak … kan maken" (procedure, differs per gemeente and practice) |
| 2.1.4 | gelijk-geslacht, burgerlijk-huwelijk, samenwonen | geregistreerd partnerschap as a form of its own (in the options of item 5 and the text of item 7) |
| 2.1.5 | dodenherdenking, koningsdag | 5 mei, Pasen, Kerst, Oud en Nieuw, Sinterklaas, Carnaval, Suikerfeest, Keti Koti (Keti Koti verified in the reserve list) |
| 2.2.1 | vrijwilligerswerk | verenigingen and contributie (no primary page found that states the custom) |
| 2.2.2 | geslaagd, trakteren | geboorte (beschuit met muisjes, reserve), bruiloft, overlijden |

Seven of seven eindtermen covered; twelve items over seven eindtermen leaves five doubles, given to the three eindtermen with the most testable facts and to the coordinator's emphasis on appointments and punctuality, samenlevingsvormen and birthdays.

## 4. Items: source, supporting sentence, distractor rationales

Format per item: eindterm; source (URL, page title, accessed 2026-09-10); the sentence(s) on the page that support the key; volatility; distractors; language figures (prompt words; fact words / sentences (longest)).

### 1 omgangsvormen — 2.1.1

- Source: https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2 — "Regeling inburgering 2021", bijlage 2, eindterm 2.1.1: "Is ervan op de hoogte dat omgangsvormen, waarden en normen kunnen verschillen per sociale groep, regio, generatie en sociaaleconomische klasse."
- Volatility: none (the eindterm itself). "sociaaleconomische klasse" is left out of the A2 text.
- B "Ze zijn overal in Nederland precies hetzelfde." — the uniformity assumption the eindterm was written against.
- C "Ze staan allemaal vast in de wet." — confusion of customs with law; the explanation draws the line (only the law applies to everyone).
- Key A shares its length with B (45/46 characters); nothing in the prompt recurs only in the key.
- Language: prompt 13; fact 19 / 2 (10).

### 2 directheid — 2.1.2

- Source: same Regeling, eindterm 2.1.2: "Weet dat veel mensen in Nederland zich direct kunnen uiten."
- Volatility: none. The clause "geen teken van boosheid" in the fact text is the item's gloss on what "direct" does not mean; see doubt 2.
- A "Als een officiële klacht over hem." — reading direct feedback as a formal step.
- C "Als een teken dat zij boos is." — the tempting one: reading directness as hostility.
- The prompt's "direct" does not appear in any option, so it cannot be matched to the key.
- Language: prompt 17; fact 23 / 2 (12).

### 3 op-tijd — 2.1.3

- Source: same Regeling, eindterm 2.1.3, indicator: "weet dat veel mensen in Nederland waarde hechten aan op tijd komen en aan het tijdig afmelden van afspraken."
- Volatility: none.
- A "Dat zij tussen tien en half elf komt." — the flexible-window belief; it repeats "tien" so that the key is not the only option echoing the prompt.
- B "Dat de afspraak begint als iedereen er is." — the belief that a meeting starts when everyone has arrived.
- The question asks what people expect (the norm), not what Fatima should do.
- Language: prompt 19; fact 28 / 3 (10).

### 4 wegblijftarief — 2.1.3 ("tijdig afmelden van afspraken")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/moet-ik-een-boete-betalen-als-ik-niet-op-een-ziekenhuisafspraak-kom — "Moet ik een boete betalen als ik niet op een ziekenhuisafspraak kom? | Rijksoverheid.nl".
- Supports key: "U moet een bedrag betalen als u zonder geldige reden niet op uw afspraak in het ziekenhuis bent. Of de afspraak niet op tijd afzegt. Dit is het wegblijftarief, ook wel het no-show tarief. Het wegblijftarief moet u zelf betalen. U kunt het niet bij uw zorgverzekeraar declareren." and "Ziekenhuizen mogen zelf bepalen of en wanneer zij een wegblijftarief in rekening brengen. Dit is niet verplicht."
- Volatility: low; amounts differ per hospital and are not tested. Because hospitals *may* charge, the prompt asks "Wat mag het ziekenhuis doen?" and the key says the hospital may send a bill.
- B "Niets, want de zorgverzekeraar betaalt de afspraak." — the tempting one; the page says the opposite (not declarable).
- C "Hem geen nieuwe afspraak meer geven." — the belief that a no-show blocks further care; the page names only the fee.
- Language: prompt 19; fact 26 / 3 (11).

### 5 gelijk-geslacht — 2.1.4 ("ook voor partners van gelijk geslacht"; "huwelijk in de wet geregeld")

- Source: https://wetten.overheid.nl/jci1.3:c:BWBR0002656&boek=1&titeldeel=5&artikel=30 — "Burgerlijk Wetboek Boek 1 - BWBR0002656" (wetten.overheid.nl, version in force 5 July 2025), artikel 30 lid 1: "Een huwelijk kan worden aangegaan door twee personen van verschillend of van gelijk geslacht."
- Also: https://www.rijksoverheid.nl/vraag-en-antwoord/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/trouwen-of-geregistreerd-partnerschap-sluiten lists "Een huwelijk tussen personen van hetzelfde geslacht" among Dutch marriages that are not recognised in every country — i.e. it exists.
- Volatility: none (in force since 1 April 2001, Wet openstelling huwelijk, Stb. 2001, 9; the year is not in the learner-facing text).
- A "Alleen een geregistreerd partnerschap is mogelijk." — the situation in several other countries, and the other legal form in the same eindterm.
- C "Twee vrouwen kunnen alleen samenwonen, niet trouwen." — reversal; repeats the prompt's "trouwen" so that the key does not stand out.
- Language: prompt 11; fact 27 / 3 (11).

### 6 burgerlijk-huwelijk — 2.1.4 ("huwelijk in de wet geregeld")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/trouwen-of-geregistreerd-partnerschap-sluiten — "Waar moet ik aan denken als ik wil trouwen of een geregistreerd partnerschap wil sluiten? | Rijksoverheid.nl".
- Supports key: "Voor een huwelijk of een geregistreerd partnerschap kunt u terecht bij uw gemeente." and, under "Religieus huwelijk na burgerlijk huwelijk": "Wilt u een religieuze ceremonie in bijvoorbeeld een kerk of moskee houden? Die ceremonie mag u pas houden nadat u het burgerlijk huwelijk heeft voltrokken bij de ambtenaar van de burgerlijke stand."
- Volatility: none (Burgerlijk Wetboek Boek 1, artikel 68).
- A "Trouwen in de moskee is genoeg voor de wet." — the tempting one: a religious wedding taken as legally valid.
- B "Trouwen in de moskee is in Nederland niet toegestaan." — over-correction; the page allows the ceremony, only the order is fixed.
- Language: prompt 15; fact 22 / 2 (14).

### 7 samenwonen — 2.1.4 ("ongehuwd samenwonen komt vaak voor")

- Sources: https://www.rijksoverheid.nl/vraag-en-antwoord/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/wat-is-het-verschil-tussen-een-huwelijk-geregistreerd-partnerschap-en-samenlevingscontract — "Wat is het verschil tussen trouwen of geregistreerd partnerschap en een samenlevingscontract? | Rijksoverheid.nl": "Bij een samenlevingscontract hoort u volgens de wet niet bij elkaar. En moet u meer zaken zelf regelen. Dat kan in een samenlevingscontract."; https://www.rijksoverheid.nl/vraag-en-antwoord/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/checklist-samenwonen ("Samenwonen: maak een overzicht van wat u moet weten en regelen"): "Deze afspraken kunnen jullie vastleggen in een samenlevingscontract." — optional, "kunnen".
- Frequency: eindterm 2.1.4, indicator "weet dat ongehuwd samenwonen in Nederland vaak voorkomt"; CBS, Dashboard bevolking, "Samenwonen" (https://www.cbs.nl/nl-nl/visualisaties/dashboard-bevolking/levensloop/samenwonen): "Jongere generaties gingen vaker eerst ongehuwd samenwonen. … Van de vrouwen die tussen 1970 en 1975 zijn geboren was dat al bijna drie kwart."
- Volatility: none.
- B "Ja, maar alleen met een samenlevingscontract." — the contract taken as a condition; the page presents it as a way to record agreements.
- C "Nee, samenwonen mag pas na het huwelijk." — the norm of some other cultures, presented as a Dutch rule.
- The only yes/no item: ja / ja-maar / nee, so the key is not the odd polarity out.
- Language: prompt 15; fact 23 / 3 (11).

### 8 dodenherdenking — 2.1.5 ("4 en 5 mei")

- Source: https://www.rijksoverheid.nl/themas/overheid-en-democratie/tweede-wereldoorlog/nationale-herdenkingen — "Nationale herdenkingen Tweede Wereldoorlog | Rijksoverheid.nl".
- Supports key: "Tijdens de Nationale Herdenking herdenkt Nederland allen – burgers en militairen – die in het Koninkrijk der Nederlanden of waar ook ter wereld zijn omgekomen of vermoord; zowel tijdens de Tweede Wereldoorlog en de onafhankelijkheidsoorlog in Indonesië, als in oorlogssituaties en bij vredesoperaties daarna.", "Tussen 20:00 en 20:02 uur is iedereen 2 minuten stil.", "De nationale herdenking is altijd op 4 mei."
- Volatility: none. The companion page "Bevrijdingsdag 5 mei" ("Bevrijdingsdag is de nationale feestdag waarop we de bevrijding van Nederland in 1945 vieren") grounds distractor A.
- A "Het einde van de oorlog wordt gevierd." — the 4/5 May confusion, the point of the eindterm.
- B "De verjaardag van de Koning wordt gevierd." — the other spring feestdag (27 April).
- The prompt says only that she goes to the square in the evening; "stil" and "herdenken" are kept out of the prompt so that the key cannot be inferred from mood words.
- Language: prompt 18; fact 30 / 3 (13).

### 9 koningsdag — 2.1.5 ("Koningsdag")

- Sources: https://www.koninklijkhuis.nl/onderwerpen/activiteiten-en-werkzaamheden/koningsdag — "Koningsdag | Het Koninklijk Huis" (Rijksvoorlichtingsdienst): "Koningsdag is de nationale feestdag waarop de verjaardag van de Koning wordt gevierd. Als 27 april op een zondag valt, wordt Koningsdag de dag ervoor gevierd." and "Sinds 2014 wordt Koningsdag gevierd op 27 april, de verjaardag van Koning Willem-Alexander."; https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/koningsdag-27-april-vrije-dag — "Is Koningsdag (27 april) een vrije dag? | Rijksoverheid.nl": "Koningsdag (27 april) is een officiële feestdag in Nederland, maar niet iedereen is dan vrij." and "Scholen zijn bijna altijd gesloten op Koningsdag." (supports the prompt's "vrij van school").
- Volatility: tied to the current King; retire or rewrite at a change of monarch.
- A "De dag dat Nederland een koninkrijk werd." — confusion with Koninkrijksdag (15 December, in the vlaginstructie).
- C "De trouwdag van de Koning en de Koningin." — another royal date; all three options contain "Koning", so the prompt's "Koningsdag" marks none of them.
- Language: prompt 15; fact 26 / 3 (13).

### 10 vrijwilligerswerk — 2.2.1

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/vrijwilligerswerk/wat-is-vrijwilligerswerk — "Wat valt er onder vrijwilligerswerk? | Rijksoverheid.nl".
- Supports key: "Vrijwilligerswerk is werk dat u onbetaald en onverplicht doet, voor anderen of voor de samenleving. Bijvoorbeeld voor iemand die beter Nederlands wil leren of eenzaam is. Of voor een sportclub of een dierenasiel." and "Het komt niet in de plaats van een betaalde baan."
- Second sentence of the fact: eindterm 2.2.1, indicator "Weet dat vrijwilligerswerk en actieve betrokkenheid bij verenigingen en organisaties kunnen helpen om sociale netwerken op te bouwen."
- Volatility: low; the vrijwilligersvergoeding limit changes yearly and is not tested.
- A "Zij krijgt loon, maar werkt zonder contract." — informal paid work; repeats "werkt" and "zonder" so that the key is not the only option echoing the prompt.
- B "Zij moet dit doen voor haar uitkering." — the tegenprestatie confusion; vrijwilligerswerk is "onverplicht".
- Language: prompt 15; fact 28 / 3 (15).

### 11 geslaagd — 2.2.2 ("slagen voor examen")

- Sources: https://www.rijksoverheid.nl/vraag-en-antwoord/grondwet-en-statuut/wanneer-kan-ik-de-vlag-uithangen-en-wat-is-de-vlaginstructie — "Wanneer kan ik de Nederlandse vlag uithangen? | Rijksoverheid.nl": "U mag altijd de vlag uithangen. Bijvoorbeeld bij een feestelijke gebeurtenis als een huwelijk of het slagen voor een examen. Ook halfstok vlaggen bij een overlijden mag."; https://www.rijksoverheid.nl/actueel/nieuws/2020/04/08/landelijk-moment-voor-geslaagden — "Landelijk moment voor geslaagden | Rijksoverheid.nl" (8 April 2020), minister Slob: "ik hoop dat er die dag veel vlaggen met schooltassen uit kunnen, zoals de jaarlijkse traditie."
- Volatility: none.
- B "Zij hangen de vlag halfstok." — the flag custom for a death, from the same page.
- C "Zij eten beschuit met muisjes." — the custom for a birth (2.2.2's "geboorte"); verified in the reserve list.
- The picture shows Sem at the door with a phone and a happy adult, no flag.
- Language: prompt 13; fact 29 / 3 (14).

### 12 trakteren — 2.2.2 ("verjaardag")

- Source: https://www.voedingscentrum.nl/nl/zwanger-en-kind/eten-4-12/traktaties-en-kinderfeest.aspx — "Traktaties en kinderfeest | Voedingscentrum" (the public nutrition institute, funded by the ministries of VWS and LVVN).
- Supports key: "Is je kind binnenkort jarig en wil je trakteren of meer weten over verjaardagen vieren zonder traktaties?" and, under "Wie jarig is viert feest": "Kinderen die jarig zijn trakteren niet maar ze worden in het zonnetje gezet en er wordt feest gevierd. Steeds meer scholen en BSO's stappen hiernaar over." The professionals page "Van trakteren naar feestbeleid op de basisschool" (https://www.voedingscentrum.nl/professionals/gezond-op-school/gezond-eten-op-de-basisschool/van-trakteren-naar-feestbeleid-op-de-basisschool.aspx) describes the birthday chair and crown, which the picture uses.
- Volatility: a custom, not a rule; the fact text already says that some schools celebrate without a treat. Re-check if the feestbeleid becomes the norm.
- A "De kinderen geven Amina een cadeau." — the reversal newcomers expect (the birthday child receives).
- C "De juf geeft de klas vrij." — a made-up school rule.
- Language: prompt 12; fact 25 / 3 (11).

## 5. Diversity matrix against the catalogue

The 56 KNM items in `content/catalogue.json` cover themes 1, 3, 4, 6, 7, 8 (batches 006, 007) plus the eight batch-003 study cards. No title, slug or fact is repeated: the catalogue has no item on customs, appointments, samenlevingsvormen, feestdagen, vrijwilligerswerk or family customs. Nearest neighbours and how this batch keeps its distance:

| This batch | Nearest catalogue item | Difference |
| --- | --- | --- |
| gelijk-geslacht, burgerlijk-huwelijk | batch007-zelfbeschikking (huwelijksdwang, 18 jaar) | this batch tests who may marry and where the legal marriage takes place, not coercion or age |
| omgangsvormen | batch003-discriminatie, batch007-godsdienstvrijheid | customs differ per group (2.1.1); no rights or discrimination content |
| wegblijftarief | batch006-verwijsbrief, batch006-eigenrisico, batch006-huisartsenpost | a missed hospital appointment and its bill, not referral, eigen risico or out-of-hours care |
| vrijwilligerswerk | batch006-bijstandsplicht, batch006-ww-uitkering | the uitkering appears only as a distractor; the fact is the definition of volunteer work |
| koningsdag, dodenherdenking | batch007-wetten (koningshuis in the fact text) | dates and their meaning, not the state structure |
| trakteren, geslaagd | batch007-ouderbijdrage, batch007-vmbo | school customs, not school costs or school types |

Settings: a village square, a small office, an office entrance, a living room (2), a park bench, a flat doorway, a town square at dusk, a vrijmarkt pavement, a sports field, a front door, a classroom. Domains: werk 2, gezondheid 1, vrije-tijd-familie 9 — the theme is by nature about family and free time; work and health are represented where the eindterm allows (2.1.2, 2.1.3). No neighbourhood or volunteering scenario except the vrijwilligerswerk definition the eindterm requires.

Coordinator topic list, mapped: greeting customs — no primary public source found for a Dutch greeting norm, not written (see doubt 6); punctuality and appointments — items 3, 4; equality, freedom of choice, position of women and men — the eindtermen for these are 7.2.1 and 7.2.4 (theme 7), so they are not placed in theme 2, except where 2.1.4 carries them (item 5) and 2.1.1 (customs are not uniform); sexual orientation — item 5; neighbours and noise — no theme 2 (or theme 3) eindterm names it, not written (doubt 6); gifts and birthdays — item 12 (and the birth custom in the reserve list); directness and politeness — item 2.

## 6. Verified reserves (not in the batch)

Facts verified on the same day that can replace an item if the reviewer rejects one.

- 2.1.5 Keti Koti: Rijksoverheid, "Veelgestelde vragen over het Herdenkingsjaar Slavernijverleden" (https://www.rijksoverheid.nl/themas/migratie-en-reizen/discriminatie-en-racisme/veelgestelde-vragen-herdenkingsjaar-slavernijverleden): "Op 1 juli 1863 werd de slavernij in de voormalige koloniën formeel afgeschaft. Het is ook de datum waarop de Nationale Herdenking Slavernijverleden plaatsvindt." and the question "Wordt Keti Koti vanaf 2023 een nationale feestdag?"; the toespraak page https://www.rijksoverheid.nl/documenten/toespraken/2023/06/30/speech-karien-van-gennip-keti-koti: "Dat wij hier samen de afschaffing van de slavernij herdenken, Keti Koti, …". Draft item: "Julio hoort collega's praten over Keti Koti op 1 juli. Wat wordt er die dag herdacht?" — A "Het einde van de Tweede Wereldoorlog." B* "Het einde van de slavernij." C "De onafhankelijkheid van Suriname."
- 2.1.5 Bevrijdingsdag: https://www.rijksoverheid.nl/themas/overheid-en-democratie/tweede-wereldoorlog/bevrijdingsdag-5-mei: "Bevrijdingsdag is de nationale feestdag waarop we de bevrijding van Nederland in 1945 vieren." and "Bevrijdingsdag valt altijd op 5 mei".
- 2.1.5 Officiële feestdagen and days off: https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/officiele-feestdagen: the list (Nieuwjaarsdag, Goede Vrijdag, Pasen, Koningsdag, Bevrijdingsdag, Hemelvaartsdag, Pinksteren, Kerstmis) and "Er is geen wet die heeft vastgelegd dat bepaalde feestdagen vrije dagen zijn voor werknemers. … In uw cao of arbeidsovereenkomst staat of u vrij bent op feestdagen." (also usable for 1.2.1).
- 2.2.2 Beschuit met muisjes: Kenniscentrum Immaterieel Erfgoed Nederland, "De cultuur van beschuit met muisjes" (https://www.immaterieelerfgoed.nl/nl/page/5447/de-cultuur-van-beschuit-met-muisjes): "Na de geboorte komt er veel bezoek en om te vieren dat er een baby is geboren, trakteert men beschuit met muisjes." — a network entry written by practitioners on the Kenniscentrum's site, weaker than a government page; used only as the basis of a distractor in item 11.
- 2.2.1 / 1.1.8 Vrijwilligerswerk naast een uitkering: https://www.rijksoverheid.nl/vraag-en-antwoord/vrijwilligerswerk/mag-ik-vrijwilligerswerk-doen-als-ik-een-uitkering-heb: "Als u een uitkering heeft, mag u vrijwilligerswerk doen. Er gelden wel voorwaarden." and "U moet wel blijven zoeken naar een betaalde baan."
- 2.1.4 Voorwaarden huwelijk: the trouwen page cited under item 6: both partners 18 or older, not already married or registered, notice to the gemeente at least two weeks before, two to four witnesses of 18 or older.

Not usable: the Sinterklaasfeest page on immaterieelerfgoed.nl is behind a login since the entry was withdrawn; the Rijksoverheid brochure "Nieuw in Nederland" (open.overheid.nl) has no section on customs; the paspoort page says only "Vraag bij uw gemeente of u hiervoor een afspraak moet maken", too weak for an item on appointments with instanties.

## 7. Open doubts for the reviewer

1. **Sources that are the eindterm itself (items 1, 2, 3).** For 2.1.1, 2.1.2 and the punctuality indicator of 2.1.3 no government page states the custom; the Regeling on wetten.overheid.nl is cited, as batch 007 did for 7.2.3. If the reviewer wants a second source for these, none was found on rijksoverheid.nl on 10 September 2026.
2. **Item 2 (directheid).** The fact text adds "geen teken van boosheid" and the key says the directness is "een gewone manier van praten"; the eindterm only says people "zich direct kunnen uiten". The gloss is the standard KNM teaching and stays descriptive, but it is the one place where the text goes beyond the source's words. Cut the last clause if it reads as opinion.
3. **Item 3 (op-tijd).** The key ("Dat zij om tien uur aanwezig is") repeats the prompt's "tien uur"; distractor A also contains "tien", so lexical matching does not decide, but a learner may still reach the key by common sense. Comparable at the easy end; the norm is what the indicator names.
4. **Item 4 (wegblijftarief).** The Rijksoverheid page speaks of the ziekenhuis; huisartsen and other practices charge similar fees but the page does not say so, hence the hospital setting. "Wat mag het ziekenhuis doen?" is a rule question ("may"), not advice; confirm the reviewer reads it so.
5. **Item 9 (koningsdag).** The key includes the date ("op 27 april") to keep the three options equal in length; the prompt does not mention the date, so nothing is given away. Tied to the current King (retire trigger).
6. **Coordinator topics without a theme 2 eindterm.** Greeting customs (a handshake, first names) and dealing with neighbours and noise have no primary public source and no eindterm in theme 2 or 3; the position of women and men and equal treatment belong to 7.2.1 and 7.2.4 (theme 7). None were written; the reserve list has no substitute for them.
7. **Item 12 (trakteren).** The source is the Voedingscentrum, a public institute but not a ministry page, and the custom is shifting (feestbeleid). The fact text says so; confirm this is enough.
8. **Item 11 (geslaagd).** "vaak met een schooltas eraan" rests on a minister's quote in a 2020 news item ("zoals de jaarlijkse traditie"); the tested fact (the flag) rests on the vlag page. Cut the schooltas clause if a news quote is too thin.
9. **Item 5 (gelijk-geslacht).** The key says "Het huwelijk is ook voor twee vrouwen" and the persona wants to marry her "vriendin"; the word is unambiguous in context (wil trouwen met). If the reviewer prefers, "partner" works with the same options.
10. **Pictures.** Item 5 shows Roos holding hands with another woman on a park bench and item 6 a couple with a ring box; item 8 deliberately shows a square at dusk without monument or flags so that the picture does not choose between the options; item 9 shows a vrijmarkt with people in orange, which cues the day already named in the prompt.

## 8. Checker output

```
> batch:check
> tsx scripts/batch-check.ts content/batches/018-original.json

Checked 12 items, 12 questions. Keys: {"A":4,"B":4,"C":4}. Options: {"3":12}.
No failures, no warnings.
```
