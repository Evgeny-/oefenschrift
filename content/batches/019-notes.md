# Batch 019: design notes (KNM, twelve gap-filling items for themes 1, 4, 6, 7 and 8)

Batch 019 contains 12 original KNM items in the format DUO has used since 1 July 2025 (`content/blueprint.md` §4.5): one picture, one factual question of at most twenty words, three parallel options, `taskType: feit`, level A2. Each item fills one of the twelve eindtermen that `content/reviews/006-007-level-check.md` ("Eindterm coverage of the six themes") listed as uncovered and that the coordinator named: 1.1.2, 1.1.5, 4.1.3, 4.3.2, 4.4.4, 6.1.1, 6.2.1, 6.3.2, 7.1.4, 7.2.4, 7.2.5, 8.1.3. Themes 1 (`werk`), 4 (`gezondheid`), 6 and 7 (`instanties`), 8 (`opleiding`), the same domain mapping as batches 006 and 007.

The eindterm texts were read on 10 September 2026 in the consolidated Regeling inburgering 2021, bijlage 2, on wetten.overheid.nl: `https://wetten.overheid.nl/BWBR0045574/2026-04-18#Bijlage2` (version "geldend van 18-04-2026 t/m heden"); the version of 1 July 2025 was also fetched and bijlage 2 is byte-identical in the two. The verbatim wording of every eindterm and its indicators is quoted per item in section 3. Every fact was verified by opening the cited page on 10 September 2026 (`sourceReviewedAt`); search snippets were not used as verification. No official exam item was read for content.

Constraints from the coordinator and how they were met:

- **Different fact than the eight batch-003 study cards.** The cards state: inschrijven (register within five days, BSN at registration, BSN used for government and care), verhuizing (new address to the gemeente, four weeks before to five days after, ID and proof of residence), digid (DigiD is a personal login for government services; do not share the password; machtigen), zorgverzekering (basis compulsory, aanvullend voluntary), noodnummer (112 when every second counts, 0900-8844 for non-urgent police, what to tell the operator), leerplicht (5 to 16, report illness to the school, verlof via the head), stemmen (stempas plus ID, ID may be five years expired, stemhokje, stembus), discriminatie (right to equal treatment, antidiscriminatievoorziening in every gemeente, aangifte at the police). None of those facts is the key of an item here: 6.1.1 tests where free help with digital government contact is (the library), not what DigiD is; 4.4.4 tests that the zorgtoeslag application needs DigiD; 6.2.1 tests the geboorteaangifte, not a move; 4.3.2 tests that 112 works without beltegoed, not when to call it; 7.1.4 tests which election a non-EU resident may vote in, not the stempas procedure; 7.2.4 tests what article 1 of the Grondwet says, not where to report; 8.1.3 tests the kwalificatieplicht after 16, not the leerplicht ages.
- **No duplicate of a batch 006/007 item.** Checked against all 48 titles and facts; the nearest neighbours are named in the diversity matrix (section 5) and are all different facts.
- **Level-check rules.** No key decodable from the prompt's words; no prompt content word that recurs only in the key (script check, section 4); no yes/no key that is the odd polarity out; no key that is the longest option (by the checker's own two-character criterion); no "what should you do" question. Keys 4/4/4, no letter twice in a row.
- **Primary sources** with URL, supporting sentence and date on every item; rules that could move within a year are listed in section 6.
- **No invented organisations.** The batch names only real institutions that the items are about (uitzendbureau as a category, UWV, gemeente, SVB, Belastingdienst, Mijn toeslagen, Informatiepunt Digitale Overheid, Juridisch Loket, bibliotheek, Tweede Kamer, Europees Parlement, Grondwet), so no company-name search was needed.

Level labels are authoring targets (`targetLevelValidated: false`); nothing here claims official equivalence or a pass prediction.

`npm run batch:check content/batches/019-original.json` (10 September 2026):

```
Checked 12 items, 12 questions. Keys: {"B":4,"C":4,"A":4}. Options: {"3":12}.
No failures, no warnings.
```

SHA-256 of `content/batches/019-original.json` at the time of writing: `d67502286ef61d6feca0c990cb1a842f2ee49e377d297c6aa756c5e833764642`.

## 1. Batch matrix

| # | id (`A2:knm:batch019-…`) | Theme | Eindterm | Fact tested | Form | Persona | Key |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | uitzendbureau | 1 | 1.1.2 | an uitzendbureau may not charge the worker for registering or placing | yes/no, qualified | Fatima | B |
| 2 | scholing | 1 | 1.1.5 | training the employer requires for the job is free for the employee | persona, who pays | Julio | C |
| 3 | tandartskeuze | 4 | 4.1.3 | the tandarts is eerstelijnszorg: no referral, you choose one yourself | yes/no, qualified | Roos | A |
| 4 | alarmnummer | 4 | 4.3.2 | 112 is always reachable, also from a mobile without beltegoed or SIM | yes/no, qualified | Modibo | C |
| 5 | zorgtoeslag | 4 | 4.4.4 | zorgtoeslag is applied for in Mijn toeslagen with DigiD | persona, document | Sabrina | A |
| 6 | informatiepunt | 6 | 6.1.1 | free help with digital government contact at an Informatiepunt Digitale Overheid, in the library | persona, institution | mevrouw Bakker | B |
| 7 | geboorteaangifte | 6 | 6.2.1 | a birth is registered at the gemeente (within three days, by the father) | persona, institution | Karim | A |
| 8 | belastingteruggave | 6 | 6.3.2 | tax withheld in excess comes back through the aangifte inkomstenbelasting | yes/no, qualified | Sem | C |
| 9 | kiesrecht | 7 | 7.1.4 | a non-EU resident votes for the gemeenteraad after five years of legal residence, not for the Tweede Kamer or the EP | persona, which election | Hasan | B |
| 10 | grondwet | 7 | 7.2.4 | article 1 of the Grondwet is about gelijke behandeling and the discriminatieverbod | persona, definition | Amina | A |
| 11 | privacy | 7 | 7.2.5 | everyone may inspect and correct the personal data an organisation holds | yes/no, qualified | meneer De Vries | C |
| 12 | kwalificatieplicht | 8 | 8.1.3 | a 17-year-old with only a vmbo diploma must stay in education until 18 | yes/no, qualified | Sem | B |

`skill` is `rule-application` throughout (every prompt is a persona case, as in batches 006 and 007). Cast traits are copied verbatim from `config/illustration.json`; every `imageBrief` shows the situation and not the answer (the tandarts item shows Roos with toothache, not a dentist; the informatiepunt item shows a puzzled tablet user, not a library; the geboorteaangifte item shows a father with a baby, not a town hall).

## 2. Key balance and answer signals

| Key | Items |
| --- | --- |
| A | 3 tandartskeuze, 5 zorgtoeslag, 7 geboorteaangifte, 10 grondwet |
| B | 1 uitzendbureau, 6 informatiepunt, 9 kiesrecht, 12 kwalificatieplicht |
| C | 2 scholing, 4 alarmnummer, 8 belastingteruggave, 11 privacy |

Sequence B C A C A B A C B A C B: no letter twice in a row, 4/4/4 overall, and per theme 1 (B, C), 4 (A, C, A), 6 (B, A, C), 7 (B, A, C), 8 (B).

Yes/no items (six). The level check found that in batches 006/007 the key was the odd polarity out in eight of nine two-polarity items. Here:

- Two items have a 2-against-1 polarity split and in both the key sits in the majority: tandartskeuze (Nee*, Ja, Nee) and alarmnummer (Nee, Ja, Ja*).
- Four items use the ja / nee / neutral-qualification shape the level check recommended (the bijstandsplicht shape), so there is no odd polarity at all: uitzendbureau (Ja, Nee*, "Alleen als …"), belastingteruggave (Nee, "Alleen als …", Ja*), privacy (Nee, "Alleen met …", Ja*), kwalificatieplicht (Ja, Nee*, "Alleen als …"). Across the four, the key is the Ja twice and the Nee twice, and the neutral option is always a distractor; I mention this because a learner could learn "never the Alleen-option" over a long drill, and the reviewer may want one item where the neutral qualification is the key.

Prompt-word echo: a script compared every content word of each prompt with the options; no content word of a prompt recurs only in the key (the one hit in a draft, "112" only in the alarmnummer key, was removed by putting 112 in distractor A as well). Option length: no key is longer than every distractor by more than two characters; the scholing options were rewritten as three parallel sentences for that reason and the grondwet distractor C was lengthened. No key contains "altijd", "alleen maar" or "alle antwoorden".

## 3. Per item: eindterm, source, supporting sentence, distractors

Access date for every source: 10 September 2026. Eindterm wording is quoted from the Regeling (see above).

### 1. uitzendbureau — 1.1.2 "Is op de hoogte van de manieren waarop mensen in Nederland vacatures/ werk vinden" (indicator: "weet hoe hij zich kan inschrijven bij uitzendbureaus")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/arbeidsovereenkomst-en-cao/welke-arbeidsvoorwaarden-heb-ik-als-uitzendkracht — "Welke arbeidsvoorwaarden heb ik als uitzendkracht? | Rijksoverheid.nl". Supporting sentences: "Als uitzendkracht heeft u een arbeidscontract met het uitzendbedrijf, maar werkt u voor een ander bedrijf (de inlener)." and, in the list of rules for uitzendbureaus, "Het uitzendbureau mag u geen geld of een andere tegenprestatie vragen voor het uitzenden." Volatility: low (Wet allocatie arbeidskrachten door intermediairs); the 2025 flex-work bills change contract phases, not this rule.
- Key B ("Nee, het bureau mag geen geld vragen."). A "Ja, een vast bedrag per maand.": the assumption that an agency charges the job seeker a fee, which the rule forbids. C "Alleen als zij via het bureau werk vindt.": the placement-fee belief (common abroad); the page forbids any tegenprestatie for the uitzenden itself. The key says "het bureau", not "uitzendbureau", so the prompt's noun is not echoed only in the key.
- Why this fact and not "what is a cv" or "with whom is the contract": the cv page on werk.nl (UWV) could not be opened by any tool (redirect to a login gateway, empty render in the browser), and a contract question cannot be asked without repeating "uitzendbureau" or its stem in the key. The fact card still carries the contract fact from the same page.

### 2. scholing — 1.1.5 "Is op de hoogte van het belang van (bij)scholing voor de kansen op de arbeidsmarkt" (no indicators)

- Source: https://www.rijksoverheid.nl/documenten/publicaties/2022/08/02/faq-transparante-arbeidsvoorwaarden — "FAQ Transparante arbeidsvoorwaarden | Rijksoverheid.nl" (Ministerie van SZW brochure, 2 August 2022; the PDF is linked from that page). Supporting text, section "2. Kosteloze scholing": "Opleidingen die de werkgever op grond van de wet of cao verplicht aan de werknemer moet verstrekken, moeten, kosteloos worden aangeboden. Er mag dus geen studiekostenbeding gelden voor deze opleidingen. Als dat redelijkerwijs mogelijk is, moet de werknemer de mogelijkheid krijgen de opleiding tijdens werktijd te volgen. Bijvoorbeeld scholing die de werknemer moet volgen om met een nieuw computersysteem te kunnen werken dat door de werkgever wordt ingevoerd." Law text read on wetten.overheid.nl, Burgerlijk Wetboek boek 7, artikel 611a: lid 1 "De werkgever stelt de werknemer in staat scholing te volgen die noodzakelijk is voor de uitoefening van zijn functie …", lid 2 "… wordt de in lid 1 bedoelde scholing kosteloos aangeboden aan de werknemers, beschouwd als arbeidstijd …". Volatility: low (in force since 1 August 2022). Secondary page for the fact card's first two sentences: https://www.rijksoverheid.nl/vraag-en-antwoord/leven-lang-ontwikkelen/hoe-kan-ik-leren-naast-mijn-werk ("Hoe kan ik leren naast mijn werk?": "Bijscholing naast werk … Cursus: een korte opleiding die u naast uw werk kunt volgen.").
- Key C ("Zijn werkgever betaalt de cursus."). A "Julio moet de cursus zelf betalen.": the studiekostenbeding belief, which the FAQ rules out for required training. B "Het UWV betaalt de cursus voor hem.": institution confusion with the scholing that UWV or the gemeente may arrange for people on a benefit (indicator 1.1.7); Julio is employed.
- The prompt uses "het bedrijf van Julio" and the key "zijn werkgever" so that no prompt word recurs only in the key. The persona mirrors the FAQ's own example (a new computer system), so the item does not stretch the rule beyond its stated case.

### 3. tandartskeuze — 4.1.3 "Is op de hoogte van hoe hij een tandarts kan vinden" (indicators: "Weet dat een regelmatig bezoek aan een tandarts en/of mondhygiënist gebruikelijk is"; "weet hoe hij een eigen tandarts kan kiezen")

- Source: https://www.rijksoverheid.nl/onderwerpen/eerstelijnszorg — "Eerstelijnszorg | Rijksoverheid.nl". Supporting sentence: "Eerstelijnszorg is zorg waar u zelf zonder verwijzing naartoe kunt gaan. Dit kan behandeling zijn door de huisarts, tandarts, fysiotherapeut, apotheker, maatschappelijk werker of wijkverpleegkundige." Volatility: none (structural). The verwijsbrief page (cited in batch 006) lists the mondhygiënist among the providers reachable without referral; it does not mention the tandarts, which is why the eerstelijnszorg page is cited. The fact card's third sentence (regular check-ups) is the eindterm's own first indicator.
- Key A ("Nee, zij kan zelf naar een tandarts gaan."). B "Ja, de huisarts moet haar eerst doorverwijzen.": the referral rule of the specialist (batch 006 verwijsbrief) wrongly applied to the dentist. C "Nee, maar de zorgverzekeraar wijst haar een tandarts toe.": the assignment confusion, the same wrong body as in the 006 huisartskeuze item; the insurer chooses no provider.
- Batch 006 left 4.1.3 empty for lack of a primary page on choosing a dentist; the eerstelijnszorg page supplies the "zelf, zonder verwijzing" fact. What the basispakket pays for dental care (children under 18) belongs to 4.4.1 and is not tested.

### 4. alarmnummer — 4.3.2 "Weet dat bij levensbedreigende situaties het nummer 112 moet worden gebeld" (no indicators)

- Source: https://www.rijksoverheid.nl/onderwerpen/alarmnummer-112/vraag-en-antwoord/wat-gebeurt-er-als-ik-alarmnummer-112-bel — "Wat gebeurt er als ik alarmnummer 112 bel? | Rijksoverheid.nl". Supporting sentences: "U kunt het alarmnummer 112 altijd bereiken. Ook als u met uw mobiel belt zonder beltegoed en zonder een (geldige) simkaart." and "De medewerker van de centrale meldkamer verbindt u onmiddellijk door met de politie, brandweer of ambulancedienst in uw regio." Companion page https://www.rijksoverheid.nl/onderwerpen/alarmnummer-112/vraag-en-antwoord/112-bellen-in-buitenland: "Net als in Nederland is dit alarmnummer gratis en te bereiken vanaf vaste en mobiele telefoons." Volatility: none.
- Key C ("Ja, 112 werkt ook zonder beltegoed."). A "Nee, zonder beltegoed werkt 112 niet.": the belief that an empty prepaid balance blocks every call. B "Ja, maar alleen met een vaste telefoon.": the belief that emergency calls need a landline; the page says fixed and mobile.
- The card already covers when to call 112 and the non-urgent police number, so this item tests the reachability rule, which is the practical obstacle a newcomer with a prepaid phone actually meets. A "which services" question was rejected because "politie, brandweer en ambulance" would be a superset option.

### 5. zorgtoeslag — 4.4.4 "Weet dat voor het aanvragen en declareren van veel zorgvoorzieningen een DigiD nodig is" (indicator: "Weet waar hij hulp bij het aanvragen van zorgregelingen kan krijgen")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/kan-ik-zorgtoeslag-krijgen — "Kan ik zorgtoeslag krijgen? | Rijksoverheid.nl". Supporting sentences: "Zorgtoeslag is een bijdrage in de kosten van uw Nederlandse zorgverzekering."; "U kunt zorgtoeslag online aanvragen met Mijn toeslagen. Hiervoor heeft u DigiD nodig."; "U vraagt zorgtoeslag aan via Mijn toeslagen op toeslagen.nl."; help: "een toeslagenservicepunt. Dit zijn bijvoorbeeld sociaal raadslieden of buurtteams.", "een bibliotheek", "de Belastingtelefoon", "De balie van uw belastingkantoor". Volatility: the income and asset limits change every year and are not used; the DigiD login is stable; the toeslagen system is under review (kinderopvangtoeslag to be replaced in 2029) but zorgtoeslag is unchanged for 2027.
- Key A ("Haar DigiD."). B "Haar zorgpas.": the zorg association (the insurer's card identifies you to a provider, not to the government). C "Haar bankpas.": the bank-login confusion (bank identification is used for government login in several other countries, and iDIN exists for some Dutch services, but not for Mijn toeslagen).
- Relation to the digid card: the card says what DigiD is in general and how to keep it safe; this item tests that a specific zorg regeling, the zorgtoeslag, is applied for with it, which is the literal 4.4.4 statement. The indicator about help is in the fact card and the explanation, not in the question, because the 6.1.1 item already keys the library.

### 6. informatiepunt — 6.1.1 "Is ervan op de hoogte dat informatie vanuit en contact met overheidsinstanties meestal digitaal plaatsvindt" (indicators: "Weet hoe hij veilig gebruik kan maken van burgerservicenummer en DigiD"; "kan belangrijke informatie van overheidsinstanties online vinden en afspraken online maken"; "weet waar je hulp kunt krijgen bij vragen rondom digitaal contact")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/digitale-overheid/waar-kan-ik-hulp-vinden-om-vaardiger-te-worden-met-de-computer-en-internet — "Waar kan ik hulp vinden om beter te worden met de computer en internet? | Rijksoverheid.nl". Supporting sentences: "Het Informatiepunt Digitale Overheid helpt u om zelfstandig gebruik te maken van digitale dienstverlening. Bijvoorbeeld van gemeenten, UWV en de Belastingdienst." and "Voor hulp en cursussen over omgaan met computer en internet kunt u vaak ook terecht in een openbare bibliotheek." Second source (Ministerie van BZK): https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/overheidsbrede-dienstverlening/informatiepunt-digitale-overheid/ — "Een Informatiepunt Digitale Overheid (IDO) biedt laagdrempelig, gratis en voor iedereen toegankelijke ondersteuning bij vragen over het gebruik van de digitale overheid. De Informatiepunten zijn vooral in lokale bibliotheken te vinden … Bij een IDO, uitgevoerd door de bibliotheek, kunnen mensen terecht als zij vragen hebben over bijvoorbeeld toeslagen, belastingen, DigiD, AOW, werk, uitkering, rijbewijs en zorg." (871 points in December 2025). Volatility: medium-low; a planned 10 % funding cut for 2026 was reversed and gemeenten now finance the points; re-check yearly that the network still exists.
- Key B ("In de bibliotheek."). A "Bij het Juridisch Loket.": the other free help desk of theme 6 (legal advice, batch 007 juridischloket), wrong discipline. C "Bij de bank.": the assumption that DigiD is a banking matter.
- "Bij de gemeente" was deliberately not offered as a distractor: gemeenten finance the IDO's and have their own balies, so it would be defensible. The card facts (BSN at registration, DigiD safety) are not tested; the third indicator is. A reserve item on "DigiD aanvragen needs a BSN" is in section 7.

### 7. geboorteaangifte — 6.2.1 "Is ervan op de hoogte dat hij wijzigingen in de gezinssamenstelling moet doorgeven aan de gemeente (BRP)" (indicator: "Geeft wijzigingen door zoals geboorte, huwelijk, samenwonen, echtscheiding, overlijden, verhuizing en migratie")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/aangifte-geboorte-en-naamskeuze-kind/aangifte-geboorte — "Hoe doe ik aangifte van een geboorte? | Rijksoverheid.nl". Supporting sentences: "U moet binnen 3 dagen na de geboorte van uw baby aangifte doen. Dat doet u in de gemeente waar uw kind is geboren. Na de aangifte geeft de ambtenaar van de burgerlijke stand een geboorteakte af." and "De vader of duomoeder van het kind is verplicht om de geboorteaangifte te doen. De moeder uit wie het kind is geboren, mag aangifte doen, maar dat is niet verplicht." Volatility: none (Burgerlijk Wetboek boek 1, artikel 19e).
- Key A ("Bij de gemeente."). B "Bij het ziekenhuis.": in many countries the hospital registers births, and some gemeenten run a desk inside a hospital, but the registration is the gemeente's. C "Bij de SVB.": the body of the kinderbijslag (batch 007 kinderbijslag keyed SVB with the gemeente as distractor; here the pair is reversed, which discriminates between learners who understood that item and learners who memorised "SVB").
- The card on verhuizing states the address change; this item states a different wijziging of the same eindterm. The prompt avoids the "Julio en zijn vrouw hebben een baby gekregen" opening of the 007 kinderbijslag item.

### 8. belastingteruggave — 6.3.2 "Is ervan op de hoogte dat hij in sommige gevallen belasting moet betalen, maar in andere gevallen belasting terug kan krijgen" (indicators: aangifte "in veel gevallen verplicht"; hulp bij het invullen; waarvoor belastinggeld wordt gebruikt)

- Source: https://www.belastingdienst.nl/wps/wcm/connect/nl/jongeren/content/kan-ik-belasting-terugvragen — "Kan ik belasting terugvragen? | Belastingdienst". Supporting sentences: "Als je in loondienst werkte, is er mogelijk over je loon te veel belasting ingehouden. Je kunt de te veel betaalde belasting na afloop van het jaar terugkrijgen via de aangifte." and the worked example "Je werkt in de zomervakantie 2 maanden fulltime als afwasser. … Die € 104 loonheffing kun je terugvragen door aangifte te doen." Companion pages: https://www.belastingdienst.nl/wps/wcm/connect/nl/belastingaangifte/content/moet_ik_aangifte_doen ("Als u een aangiftebrief van ons hebt gehad, moet u aangifte doen.") and https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/belasting_betalen_terugvragen/belasting_betalen_terugvragen ("U kunt recht hebben op een belastingteruggave. Vul daarom altijd de aangifte om te zien of u geld terugkrijgt."). Volatility: the thresholds (€ 19 back, € 58 to pay, and the 14 July date for tax year 2025) change yearly and are not used; the mechanism is stable.
- Key C ("Ja, via de aangifte inkomstenbelasting."). A "Nee, betaalde belasting krijgt hij niet terug.": the belief that withheld tax is final. B "Alleen als zijn werkgever het terugbetaalt.": the employer confusion; the employer has already paid the loonheffing to the Belastingdienst.
- The blueprint's own example question for this eindterm is the "verplicht" half; this item takes the "terug kan krijgen" half, which the summer-job persona makes concrete. Sem is 17 here and in item 12, a consistent persona.

### 9. kiesrecht — 7.1.4 "Is op de hoogte van wat 'kiesrecht' inhoudt en wat het belang van stemmen is" (indicator: "weet dat niet-Nederlanders die langer dan vijf jaar in Nederland wonen, mogen deelnemen aan de gemeenteraadsverkiezingen")

- Source: https://www.rijksoverheid.nl/vraag-en-antwoord/verkiezingen/wie-mag-stemmen-bij-de-gemeenteraadsverkiezingen — "Wie mag stemmen bij de gemeenteraadsverkiezingen? | Rijksoverheid.nl". Supporting sentence: "U heeft de Nederlandse nationaliteit. Of de nationaliteit van een ander land uit de Europese Unie. Of u heeft de nationaliteit van een land buiten de EU én u woont op 2 februari 2026 5 jaar of langer legaal in Nederland." Second source: https://www.kiesraad.nl/verkiezingen/gemeenteraden/stemmen/niet-nederlandse-inwoners — "Niet-Nederlandse inwoners | Kiesraad.nl": non-EU residents may vote for the gemeenteraad if "ze verblijven op de dag van kandidaatstelling voor ten minste vijf jaar legaal en onafgebroken in Nederland" with a valid verblijfstitel. Volatility: none in the rule (Kieswet artikel B 3); the page's dates belong to the election of 18 March 2026 and will be replaced.
- Key B ("Voor de gemeenteraad."). A "Voor de Tweede Kamer.": requires Dutch nationality; the most common assumption of long-term residents. C "Voor het Europees Parlement.": requires the nationality of an EU member state.
- The eindterm says "langer dan vijf jaar", the law "ten minste vijf jaar"; the persona has six years so both readings give the same answer, and the fact card says "na vijf jaar". The waterschappen were kept out of the options because non-Dutch residents with a verblijfstitel may vote there too.

### 10. grondwet — 7.2.4 "Is op de hoogte van wat 'gelijke behandeling' en 'discriminatieverbod' inhoudt" (indicator: "Weet dat Artikel 1 van de Grondwet gelijke behandeling in gelijke gevallen voorschrijft en onderscheid maken op grond van godsdienst, levensovertuiging, politieke gezindheid, ras, geslacht, handicap, seksuele gerichtheid of op welke grond dan ook verbiedt")

- Source: https://wetten.overheid.nl/BWBR0001840/2023-02-22 — "wetten.nl - Regeling - Grondwet - BWBR0001840", artikel 1: "Allen die zich in Nederland bevinden, worden in gelijke gevallen gelijk behandeld. Discriminatie wegens godsdienst, levensovertuiging, politieke gezindheid, ras, geslacht, handicap, seksuele gerichtheid of op welke grond dan ook, is niet toegestaan." Volatility: none (the article number is stable; the grounds were last extended in 2023).
- Key A ("Over gelijke behandeling van iedereen."). B "Over de taken van de Koning.": the assumption that a constitution opens with the head of state (the Koning is in artikel 24 and further). C "Over het recht van kinderen op onderwijs.": a real constitutional subject (artikel 23), wrong article; the prompt's "school" pulls a guessing learner towards it.
- The discriminatie card states the right to equal treatment and where to get help; it never names the Grondwet or article 1, which is the fact this item tests. The fact card lists four grounds in A2 words ("geloof, afkomst, geslacht of handicap") rather than the legal list.

### 11. privacy — 7.2.5 "Is ervan op de hoogte dat de privacy van de burger door de wet wordt beschermd" (indicators: "Weet dat hij alleen die persoonsgegevens deelt met overheids- en andere instanties die zij nodig hebben voor hun taak"; "weet dat hij de persoonsgegevens die hij heeft gedeeld met overheids- en andere instanties altijd mag inzien en zo nodig wijzigen")

- Source: https://www.rijksoverheid.nl/themas/overheid-en-democratie/privacy-en-persoonsgegevens/privacyregels-beschermen-persoonsgegevens — "Privacyregels beschermen persoonsgegevens | Rijksoverheid.nl". Supporting sentences: "Daarom heeft iedereen het recht op: Inzage: u kunt de gegevens bekijken die van u verzameld zijn. Correctie: u kunt gegevens die niet kloppen, laten aanpassen. … Beperking: een organisatie mag niet meer gegevens van u verzamelen dan nodig." and "moeten zij binnen 1 maand reageren". Volatility: none (Algemene verordening gegevensbescherming).
- Key C ("Ja, en fouten mag hij laten corrigeren."), the second indicator verbatim in A2 words. A "Nee, die gegevens zijn alleen voor de organisatie.": the belief that the holder owns the data. B "Alleen met toestemming van de rechter.": the belief that inspection needs a court; the page says everyone has the right and the organisation must answer within a month.
- "Alle gegevens laten verwijderen" was not used as a distractor because the page also lists a (limited) right to verwijdering, which would make it defensible.

### 12. kwalificatieplicht — 8.1.3 "Is ervan op de hoogte dat er een wettelijke verplichting is om kinderen van 5 tot 18 jaar onderwijs te laten volgen" (indicators: "Weet wat het betekent dat kinderen tussen 5 en 16 jaar leerplichtig zijn en tussen 16 en 18 jaar kwalificatieplichtig"; "weet dat de door de school vastgestelde vakantietijden bindend zijn")

- Source: https://www.rijksoverheid.nl/themas/onderwijs/leerplicht/leerplicht-en-kwalificatieplicht — "Leerplicht en kwalificatieplicht | Rijksoverheid.nl". Supporting sentences: "Leerlingen van 5 tot 16 jaar zijn leerplichtig. Jongeren tussen de 16 en 18 jaar die nog geen startkwalificatie hebben behaald zijn kwalificatieplichtig. Een startkwalificatie is (minimaal) een diploma havo, vwo of mbo (niveau 2 of hoger)." and "De kwalificatieplichtige jongeren moeten volledig dagonderwijs volgen. Ze mogen niet voltijd werken. Volgt een leerling de beroepsbegeleidende leerweg (bbl) in het mbo? Dan kan hij leren en werken combineren." Volatility: none (Leerplichtwet 1969); no bill pending that changes the ages.
- Key B ("Nee, hij moet tot zijn achttiende naar school."). A "Ja, na het vmbo hoeft hij niet meer naar school.": the belief that any diploma ends the obligation; a vmbo diploma is no startkwalificatie. C "Alleen als hij een baan met een contract heeft.": the belief that work replaces school; the page says kwalificatieplichtige jongeren may not work full-time (bbl combines both, which is still an opleiding).
- The leerplicht card states the 5–16 rule, illness and verlof; this item tests the 16–18 half of the same eindterm. Exceptions (praktijkonderwijs, vso) do not apply to a vmbo graduate. The key's "tot zijn achttiende" is a simplification: the obligation also ends earlier if he obtains a startkwalificatie before 18; the explanation says so.

## 4. Language control

Prompts 11–19 words (limit 20), two or three sentences each, all main clauses; options 2–10 words and parallel in form within each item (three sentences, three noun phrases, or three qualified yes/no answers). Fact texts, shown after answering:

| item | prompt words | text words / sentences (longest) | avg per sentence | option words | subordinators in text |
| --- | --- | --- | --- | --- | --- |
| uitzendbureau | 11 | 32 / 3 (13) | 10.7 | 6-7-8 | none ("dat bedrijf" is a demonstrative) |
| scholing | 18 | 35 / 3 (14) | 11.7 | 6-7-5 | relative "die" |
| tandartskeuze | 17 | 29 / 3 (12) | 9.7 | 8-7-9 | none |
| alarmnummer | 16 | 30 / 3 (15) | 10.0 | 6-7-6 | none |
| zorgtoeslag | 15 | 36 / 4 (12) | 9.0 | 2-2-2 | none |
| informatiepunt | 17 | 29 / 3 (12) | 9.7 | 4-3-3 | "wie"-clause |
| geboorteaangifte | 17 | 35 / 3 (16) | 11.7 | 3-3-3 | relative "waar" |
| belastingteruggave | 18 | 32 / 4 (12) | 8.0 | 7-6-5 | "wie"-clause |
| kiesrecht | 19 | 35 / 3 (17) | 11.7 | 4-3-4 | "wie"-clause |
| grondwet | 15 | 27 / 3 (9) | 9.0 | 5-6-7 | none |
| privacy | 15 | 30 / 3 (16) | 10.0 | 8-6-7 | none |
| kwalificatieplicht | 13 | 33 / 3 (14) | 11.0 | 10-8-9 | none |

All texts are in the present tense, average sentence length 8.0–11.7 words (target under 12), longest sentence 17 (limit 18); the checker prints no length warning. Less common words that a learner meets here are the eindterm's own terms and are explained in the text or the explanation: uitzenden, startkwalificatie, kwalificatieplicht, eerstelijnszorg, loonheffing, geboorteakte, toeslagenservicepunt, inzage/corrigeren. Numbers in prompts are written as digits as in batch 007 ("Sem is 17 jaar"); "112" is read as a number by the narrator.

## 5. Diversity matrix against the catalogue

| item | nearest catalogue item(s) | why it is a different item |
| --- | --- | --- |
| uitzendbureau | 006 cao (1.2.1 also names the contract via an uitzendbureau), kvk | first item on job-finding channels; tests a rule about the agency, not a contract type or a definition |
| scholing | 006 diplomawaardering (1.1.4), loonheffing (1.2.3) | first 1.1.5 item; the payment rule for required training is new |
| tandartskeuze | 006 huisartskeuze (4.1.1: you choose your own huisarts), verwijsbrief (4.2.1: specialist needs a referral) | dentist, no referral; the verwijsbrief item is the complement, not a duplicate; slug avoids the listening slug `tandarts` |
| alarmnummer | card noodnummer (when to call, 0900-8844, what to say); 006 huisartsenpost (4.3.1) | reachability without beltegoed; not stated on the card |
| zorgtoeslag | card digid (what DigiD is, password, machtigen); 006 zorgnota (4.4.3, insurer's website), eigenrisico; 007 kinderopvangtoeslag, kinderbijslag | the zorg application that needs DigiD; first zorgtoeslag item |
| informatiepunt | card digid, card inschrijven (BSN); 007 juridischloket (free legal advice) | where help with digital government contact is; the Juridisch Loket appears here only as a distractor |
| geboorteaangifte | card verhuizing, card inschrijven (both key "gemeente"); 007 kinderbijslag (SVB after a birth); 006 consultatiebureau | a different wijziging (birth), different deadline, different body than kinderbijslag |
| belastingteruggave | 007 jaaropgave (6.3.1, the document for the aangifte); 006 loonheffing (what is withheld) | tests that excess loonheffing comes back through the aangifte; the jaaropgave is not mentioned in the question |
| kiesrecht | card stemmen (procedure with stempas); 007 europese-unie (7.1.2) | which election a non-EU resident may vote in; the five-year rule is on the fact card |
| grondwet | card discriminatie (where to get help); 006 sollicitatie (1.3.1); 007 godsdienstvrijheid, meningsuiting | the constitutional location of the rule (article 1) |
| privacy | 006 huisartskeuze (medisch beroepsgeheim is not tested there either) | first privacy item |
| kwalificatieplicht | card leerplicht (5–16, ziek melden, verlof); 007 vmbo (8.1.1, route after vmbo), studiefinanciering | the 16–18 obligation; the 007 vmbo item asks where most pupils go next, this one whether Sem may stop |

Settings are new for KNM: an employment agency desk, an office training, toothache at home, a street with a phone, a kitchen-table application, a puzzled tablet user, a father with a newborn, a summer-job tax refund, a polling station entrance, a classroom, a letter about personal data, a bus stop after vmbo. Neighbourhood and volunteering do not appear; work, health, instanties and education do, as blueprint §9 asks.

## 6. Rules that could change within a year

None of the twelve keys rests on a rule scheduled to change before September 2027. Watch list:

| item | rule | known movement | effect on the key | action |
| --- | --- | --- | --- | --- |
| uitzendbureau | no fee for placement (Waadi) | flex-work bills (2025) on contract phases and certification of agencies | none | yearly check |
| scholing | required training free (BW 7:611a) | none announced | none | yearly check |
| zorgtoeslag | DigiD login for Mijn toeslagen | toeslagen reform; kinderopvangtoeslag replaced 2029; income limits yearly | none for the login; limits not tested | yearly check |
| informatiepunt | IDO network in libraries | funding cut for 2026 reversed; gemeenten finance since 2022 | key stays as long as the points exist | re-check at every release that IDO's still exist |
| belastingteruggave | refund via aangifte | thresholds and dates yearly | none | yearly check |
| kiesrecht | five years for non-EU residents | none announced | none | check after the next Kieswet amendment |
| kwalificatieplicht | 16–18, startkwalificatie | none announced | none | yearly check |

The other five (tandartskeuze, alarmnummer, geboorteaangifte, grondwet, privacy) are structural or constitutional.

## 7. Verified reserves, not used

- 6.1.1 alternative: DigiD is requested with a BSN — https://www.digid.nl/aanvragen-en-activeren/digid-aanvragen ("DigiD aanvragen | DigiD", Logius): "Voor uw aanvraag heeft u het volgende nodig: burgerservicenummer (BSN)". Kept out because the card already links BSN and government contact; usable if the reviewer prefers a BSN/DigiD item over the library.
- 4.3.2 alternative: 112 is the emergency number in every EU country — https://www.rijksoverheid.nl/onderwerpen/alarmnummer-112/vraag-en-antwoord/112-bellen-in-buitenland: "U kunt het alarmnummer 112 bellen in alle landen van de Europese Unie (EU)".
- 1.1.5 alternative (easier, terminology): "Cursus: een korte opleiding die u naast uw werk kunt volgen" and "Leerbaan: een combinatie van een opleiding in het middelbaar beroepsonderwijs (mbo) en een werkplek bij een erkend leerbedrijf" — https://www.rijksoverheid.nl/vraag-en-antwoord/leven-lang-ontwikkelen/hoe-kan-ik-leren-naast-mijn-werk.
- 6.2.1 alternative: the three-day deadline as the tested number (same page as item 7).
- 7.2.5 alternative: an organisation must answer a data request within one month (same page as item 11).
- 7.1.4 alternative: yes/no form with a three-year persona ("Nee, pas na vijf jaar legaal in Nederland.") on the same sources.

## 8. Open doubts for the reviewer

1. **scholing (1.1.5).** The eindterm is about the *importance* of bijscholing and has no indicators; the item tests the one hard rule about bijscholing that a primary page states (required training is free and counts as work time), with the FAQ's own example as the persona. If the reviewer wants an item closer to the eindterm's wording, the terminology variant in section 7 ("Hoe heet een cursus naast je werk?" → bijscholing) is sourced but decodable and easier. The fact card carries both.
2. **zorgtoeslag (4.4.4) and the digid card.** The card says DigiD is the login for government services; this item says the zorgtoeslag application needs it. I read the coordinator's instruction as allowing this (the level check lists 4.4.4 as a gap to fill "touched only by the old study cards"), but the overlap is closer than in the other eleven items.
3. **informatiepunt (6.1.1).** The key "In de bibliotheek" rests on "vooral in lokale bibliotheken" (BZK) and "vaak ook … in een openbare bibliotheek" (Rijksoverheid); both hedge, and a few IDO's sit in wijkgebouwen. The fact card says "meestal". Acceptable at A2?
4. **alarmnummer (4.3.2).** The eindterm's own fact (call 112 in life-threatening situations) is the card's; this item is the reachability rule. If the coordinator would rather retire the card and have the core fact as an exam item, item 4 should be rewritten around "Welk nummer belt hij?" with 0900-8844 and the huisartsenpost as distractors.
5. **kwalificatieplicht (8.1.3).** The key "tot zijn achttiende" omits that the obligation ends earlier with a startkwalificatie; the explanation states it. Alternative key: "Nee, hij moet nog een opleiding volgen." (no age).
6. **kiesrecht (7.1.4).** "Hasan komt van buiten de EU" avoids naming a country; if the reviewer prefers a concrete origin, any non-EU country works, but the cast entry for Hasan does not fix one.
7. **Yes/no shape.** Four items use the ja / nee / neutral shape and in all four the neutral "Alleen …" option is a distractor. Over a long drill that is learnable; a later KNM batch should key a neutral qualification at least once (the bijstandsplicht shape allows it), or the reviewer may prefer to turn one of the four here into a plain two-polarity item.
8. **Pictures.** Item 4 shows a bicycle lying on the road in the distance and nobody hurt; item 7 shows a newborn; both are calm scenes in the house style. The reviewer should confirm the tone.
9. **Concurrent work.** While this batch was written, `content/batches/006-notes.md` changed on disk (the level-check revisions being applied by another session) and batch 018 (theme 2) appeared; neither was touched, and no item here overlaps with 018.
