# Batch 039 independent editorial review

13 pass; 11 repaired; 0 rejected. All 31 questions were checked against the full final texts. Exact migration IDs are preserved.

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| A2:reading:p1:1 | pass | comparable | Pickup hours, missing receipt alternative and completed repair purpose are explicit. |
| A2:reading:p2:1 | pass | comparable | Meal choice deadline and adult plus child price require short practical combinations. |
| A2:reading:p3:1 | pass | comparable | Arrival time is separate from lesson start; collection differs from parent waiting. |
| A2:reading:p4:1 | pass | comparable | No prior experience is required, and the application precedes the phone call. |
| A2:reading:batch001-pakketpunt:1 | pass | comparable | Shop hours differ from supermarket hours; storage extension must be requested in advance. |
| A2:reading:batch001-sporthal:1 | pass | comparable | Temporary bike location and assigned helper differ from front building works. |
| A2:reading:batch002-wasserette:1 | pass | comparable | Blanket machine type and selection sequence combine; cash is only for counter detergent. |
| A2:reading:batch002-huisarts:1 | pass | comparable | Waiting upstairs is explicit after repair; rejection deadline differs from appointment time. |
| A2:reading:batch002-speelgoed:1 | pass | comparable | Only four accepted puzzles earn vouchers; spare vouchers may be transferred. |
| A2:reading:batch003-dierenarts:1 | pass | comparable | Label clarification precedes use; collection also requires arranging the later checkup. |
| A2:reading:batch003-lift:1 | pass | comparable | Advance support deadline and removed sign govern different actions. |
| A2:reading:batch003-bibliobus:1 | pass | comparable | New bus hours and card-free returns distinguish adjacent service rules. |
| A2:reading:batch003-kantine:1 | pass | comparable | Allergy discussion precedes ordering; payment belongs to collection. |

## Applied edits

- A2:reading:p1:1 / `questions.2.evidence` → "Uw fiets is klaar. We hebben de achterband vervangen en de remmen gecontroleerd. U kunt de fiets dinsdag 12 mei ophalen tussen 13.00 en 18.00 uur." Reason: Include explicit pickup permission, not just completion of repair.
- A2:reading:p2:1 / `text` → "Samen aan tafel\n\nOp vrijdag 16 oktober kunt u in het buurthuis komen eten. De deuren gaan om 18.00 uur open. Om 18.30 uur brengt de kok soep naar de tafels. Daarna eten we rijst met groenten en kip. Eet u geen vlees? Dan krijgt u rijst met bonen.\n\nGeef u uiterlijk woensdag 14 oktober op bij de balie. Vertel dan ook welke maaltijd u wilt. De kok koopt donderdag het eten. Op vrijdag kunt u uw keuze daarom niet meer veranderen.\n\nVolwassenen betalen 7 euro en kinderen tot en met elf jaar 4 euro. U betaalt vrijdag bij de ingang. Water staat gratis op tafel. Thee na het eten kost 1 euro. Om 20.00 uur ruimen we samen op. U mag daarbij helpen, maar dat hoeft niet." Reason: Replace relative clause with direct A2 condition.
- A2:reading:p2:1 / `questions.0.options` → {"A": "Bij het betalen aan de ingang.", "B": "Bij het opruimen na de maaltijd.", "C": "Bij het aanmelden vóór donderdag."} Reason: Parallel length and paraphrase; Wednesday deadline remains unambiguous.
- A2:reading:p3:1 / `questions.1.options` → {"A": "In het café bij het bad.", "B": "In de grote kleedkamer.", "C": "Bij de balie met gevonden tassen."} Reason: Remove uniquely longest key, retain nearby location distractors.
- A2:reading:p4:1 / `questions.0.options` → {"A": "Nee, hij moet eerst winkelervaring opdoen.", "B": "Nee, hij moet al bloemen kunnen inpakken.", "C": "Ja, hij hoeft geen klanten te helpen.", "D": "Ja, de eigenaar leert hem het werk."} Reason: Replace implausible owner qualification and remove uniquely longest key.
- A2:reading:p4:1 / `questions.0.evidence` → "Hebt u nog nooit in een winkel gewerkt? Dat is geen probleem. In de eerste weken werkt u samen met de eigenaar. Zij laat u zien wat u moet doen." Reason: Include explicit teaching evidence for repaired key.
- A2:reading:batch001-pakketpunt:1 / `text` → "Beste meneer El Amrani,\n\nWe hebben uw pakket dinsdag bij u thuis gebracht, maar u was niet thuis. Het ligt vanaf woensdag 13 mei in de winkel naast de supermarkt. U kunt het daar woensdag tussen 12.00 en 19.00 uur ophalen. De supermarkt is al om 8.00 uur open, maar het pakketpunt opent later.\n\nLaat bij het ophalen deze code zien: 6049. Neem ook uw identiteitsbewijs mee. De medewerker controleert uw naam en geeft u dan het pakket. U hoeft niets te betalen. Alleen voor het versturen van een nieuw pakket betaalt u aan de balie.\n\nUw pakket blijft tot en met maandag 18 mei liggen. Daarna gaat het terug naar de afzender. Kunt u niet op tijd komen? Vraag de winkel vóór maandag om het pakket langer te bewaren." Reason: Supply the code the fictional message tells its recipient to show.
- A2:reading:batch001-sporthal:1 / `questions.0.options.A` → "Binnen bij de kleedkamer." Reason: Avoid two front-entrance distractors describing the same place; kleedkamer remains text-anchored.
- A2:reading:batch001-sporthal:1 / `questions.1.prompt` → "Sem kent de sporthal nog niet. Wie helpt nieuwe bezoekers volgens het bericht?" Reason: Ask for the assigned helper rather than anyone who could conceivably help.
- A2:reading:batch002-wasserette:1 / `text` → "Welkom terug in de wasserette\n\nOnze winkel is weer open. De kleine wasmachines staan links van de ingang. Voor dekens en grote hoeveelheden was gebruikt u de grote machines achter in de winkel. De drogers staan rechts. Leg uw spullen niet op de stoelen. Daar kunnen klanten wachten.\n\nKies eerst een vrije machine en onthoud het nummer. Loop daarna naar de betaalautomaat naast de deur. Kies daar het nummer en betaal met uw bankpas. De automaat neemt geen contant geld aan.\n\nWasmiddel zit niet bij de prijs. U kunt het meenemen of bij de balie kopen. Daar kunt u wel contant betalen. Een medewerker helpt u als een machine niet start. Blijf dan bij uw was en druk op de bel naast de machine." Reason: Remove relative clause beyond the A2 blueprint list.
- A2:reading:batch002-wasserette:1 / `questions.0.options` → {"A": "Een droger kiezen en het nummer onthouden.", "B": "Een kleine machine kiezen en het nummer onthouden.", "C": "Een grote machine kiezen en het nummer onthouden."} Reason: Parallel plausible machine-choice distractors replace unrelated combinations.
- A2:reading:batch002-wasserette:1 / `questions.0.evidence` → "Voor dekens en grote hoeveelheden was gebruikt u de grote machines achter in de winkel. De drogers staan rechts. Leg uw spullen niet op de stoelen. Daar kunnen klanten wachten.\n\nKies eerst een vrije machine en onthoud het nummer. Loop daarna naar de betaalautomaat naast de deur." Reason: Include the large-machine requirement as well as selection-before-payment sequence.
- A2:reading:batch002-wasserette:1 / `questions.1.evidence` → "Wasmiddel zit niet bij de prijs. U kunt het meenemen of bij de balie kopen. Daar kunt u wel contant betalen." Reason: Include the antecedent of het to prove what can be bought for cash.
- A2:reading:batch002-huisarts:1 / `text` → "Beste mevrouw Jansen,\n\nUw afspraak van dinsdag 12 mei kan niet doorgaan. Dokter De Wit is ziek. Wij hebben voor u een nieuwe afspraak gemaakt op donderdag 14 mei. U bent dan om 9.20 uur welkom bij dokter Smit.\n\nKunt u donderdag komen? Dan hoeft u niet te reageren. Past de tijd niet? Bel ons dan vóór woensdag 12.00 uur. De assistent zoekt met u een andere tijd. U hoeft niet opnieuw uit te leggen waarom u de dokter wilt spreken.\n\nMeld u bij aankomst eerst bij de balie. Wacht daarna in de wachtkamer op de eerste verdieping. Naast de trap is een lift. De wachtkamer beneden is deze week alleen voor het bloedprikken. U kunt uw jas en tas meenemen naar boven.\n\nMet vriendelijke groet,\nDe assistenten van de praktijk" Reason: State the waiting location explicitly; an upstairs appointment alone does not establish a waiting room.
- A2:reading:batch002-huisarts:1 / `questions.0.evidence` → "Wacht daarna in de wachtkamer op de eerste verdieping." Reason: Use the explicit final waiting instruction.
- A2:reading:batch002-huisarts:1 / `questions.0.options` → {"A": "In de wachtkamer op de eerste verdieping.", "B": "In de wachtkamer beneden voor het bloedprikken.", "C": "Bij de balie beneden, naast de ingang."} Reason: Parallel option lengths remove uniquely longest key.
- A2:reading:batch003-lift:1 / `text` → "Beste bewoners,\n\nDinsdag 17 maart vervangen we een onderdeel van de lift. Vanaf 8.00 uur kunt u de lift niet gebruiken. De trap blijft beschikbaar. Om 16.00 uur test de monteur de lift. Gebruik de lift pas als de monteur het bord bij de deur heeft weggehaald.\n\nKunt u moeilijk traplopen? Bel de beheerder vóór maandag 15.00 uur. We bespreken dan welke hulp u dinsdag nodig hebt. Een buur kan bijvoorbeeld boodschappen voor u meenemen. De beheerder kan contact met een buur voor u regelen.\n\nHoud de hal dinsdag vrij. De monteur moet daar met zijn gereedschap langs kunnen. Fietsen kunt u in de berging zetten. Verwacht u een groot pakket? Vraag de bezorger om woensdag te komen.\n\nMet vriendelijke groet,\nDe beheerder" Reason: Avoid suggesting automatic reopening at 16.00 while the test/sign condition still applies.
- A2:reading:batch003-lift:1 / `questions.2.options.D` → "De monteur gaat de lift repareren." Reason: Use natural Dutch for the communicative purpose instead of er komt tijdelijk werk.
- A2:reading:batch003-bibliobus:1 / `questions.1.prompt` → "Jari wil alleen boeken terugbrengen. Moet hij daarvoor zijn pas laten zien?" Reason: Exclude the defensible but unnecessary action of requesting a replacement card.
- A2:reading:batch003-bibliobus:1 / `questions.1.options` → {"A": "Nee, terugbrengen kan zonder pas.", "B": "Ja, hij moet eerst een nieuwe pas aanvragen.", "C": "Ja, hij moet eerst een boek bestellen."} Reason: Make both distractors false requirements rather than optional actions a person could take.
- A2:reading:batch003-kantine:1 / `questions.1.options` → {"A": "Bij het bestellen vóór 10.30 uur.", "B": "Bij de kok vanaf 9.00 uur.", "C": "Bij het ophalen vanaf 12.00 uur."} Reason: Remove uniquely longest correct option while retaining timing contrast.

- A2:reading:batch003-bibliobus:1 / `questions.1.prompt` → "Jari wil alleen boeken terugbrengen en heeft zijn pas niet bij zich. Welke regel geldt?" Reason: Ask which rule applies without introducing an odd-polarity option.

- A2:reading:batch003-bibliobus:1 / `questions.1.options` → {"A": "Hij mag boeken zonder pas terugbrengen.", "B": "Hij moet eerst een nieuwe pas aanvragen.", "C": "Hij moet eerst een boek bestellen."} Reason: Remove the uniquely negative correct option while keeping false requirements.

- A2:reading:batch003-lift:1 / `questions.2.options` → {"A": "De beheerder begint woensdag in deze flat.", "B": "De bezorger brengt dinsdag een groot pakket.", "C": "De bewoners krijgen dinsdag allemaal nieuw gereedschap.", "D": "De monteur gaat dinsdag de lift repareren."} Reason: Use parallel subject/action options so the key has no unique construction.

- A2:reading:batch003-lift:1 / `questions.2.evidence` → "Dinsdag 17 maart vervangen we een onderdeel van de lift. Vanaf 8.00 uur kunt u de lift niet gebruiken. De trap blijft beschikbaar. Om 16.00 uur test de monteur de lift." Reason: Include the named mechanic as well as planned repair.

## Diversity and assembly

The 13 existing scenario IDs deliberately replace earlier sources. Domains include work, shops, health, education, leisure and housing. The full A2 catalogue titles were inspected. Keep the two pickup texts and nearby healthcare texts apart in sets. Five purpose questions across 13 texts meet the batch mix; 19 three-option and 12 four-option questions provide the required mixture. Keys A/B/C = 8 each and D = 7. Table and picture-answer coverage still belongs to the wider launch bank.

## Media and names

These prose types require no media. Exact web search for Fietsatelier Velmora on 11 September 2026 returned no results. No other named organisation remains.

## Limitations and adoption

No items rejected or off-level flagged. The missing content/exemplars directory prevented two named references per type; the reviewer used the official A2 format analysis and read integrated parkeervergunning/werkkleding examples. Editorial judgement does not validate CEFR difficulty or official exam equivalence. Fictional practice arrangements carry no KNM claims.

All author-note doubts are resolved: receipt identity alternative is explicit; lift sign controls reopening; only counter detergent is cash-payable. Verbatim evidence and distractor rationales for every final question are recorded in the JSON.

Proposed SHA-256: `9279d74c58a11fee71c2dd367862909a64096dba3b63d19de4527674cd99ef3e`

Checker passed: 13 items, 31 questions; no failures, no warnings. Coordinator should adopt with `npm run batch:adopt 039`, then integrate through the normal hash gate.
