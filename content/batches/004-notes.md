# Batch 004: design notes

Twelve original A2 reading exercises (`exam: duo-a2`, `part: reading`) written against `content/blueprint.md` sections 1, 3, 4.1, 5, 8, 9 and 10. Thirty closed questions in total. Every text is invented; official practice items were used for shape only (situation line, 100–250 words, two or three questions, persona and purpose prompts, a mix of three and four options). No text, question or option is copied or paraphrased from an official item, and none of the official practice-exam settings (study tips, village letter, delivery-options folder, staff outing, sports-day programme, wedding committee, first-aid course, recycling centre, sick-call rules) is reused.

Source file: `content/batches/004-original.json`. Checker: `npm run batch:check content/batches/004-original.json` (no failures; four warnings, all explained in section 6).

## 1. Batch matrix and scenarios

Planned before drafting; the concrete scenario for each slot was chosen so that it is not in the existing-topics list of blueprint section 9 and not a renamed version of an existing concept.

| # | Slot (taskType / domain) | Slug | Scenario | Q | Why it is not a duplicate |
| --- | --- | --- | --- | --- | --- |
| 1 | brief / instanties | `parkeervergunning` | Gemeente letter: the resident's parking permit expires on 31 December; renew before 1 December online or at the balie (appointment first); price per year or per month; new car → pass on the kenteken; no car → nothing to do | 3 | First gemeente letter in the bank; permit/deadline logic. The official item about moving a car for a street event is a different rule (removal, not renewal). |
| 2 | brief / werk | `werkkleding` | Employer (cleaning company) announces new work clothing: size form before 9 October, pick-up at the magazijn on 28 or 29 October, hand in old clothes, wash yourself, report damage to the team leader | 2 | No existing item about work clothing or an employer letter to all staff; `kantine lunch` is about ordering food. |
| 3 | email / opleiding | `praktijkles` | Taalschool e-mail: three optional extra lessons in February on three different days and times; free for day students, 15 euro for evening students; sign up by e-mail before 20 January; groups of ten | 3 | First `opleiding` reading item; concept is a course choice under a schedule constraint. `zwemles` is a changed lesson time; `cursusfonds` (B1) is about money for a course. |
| 4 | email / vrije-tijd-familie | `picknick` | Informal e-mail from Roos to family: surprise picnic for mama's 50th; meeting point and time; who brings what; rain plan at Roos's house; bikes at the entrance | 2 | Family event with a weather condition; no birthday, picnic or family-organisation item exists. |
| 5 | folder / winkels-diensten (table) | `telefoon` | Phone-repair shop folder: price and duration table, before/after 12.00 rule for screens, pay on pick-up, six months' guarantee, Saturday batteries only | 3 | First repair-service folder with a price table. `fietsenmaker` is a two-line pick-up note about a bike; `wasserette` describes a rebuilt shop. |
| 6 | folder / vervoer (table) | `stadsbus` | City-bus ticket folder: ticket table with child rules, pin-only with the driver, alternatives without a pinpas, monthly card, weekday/weekend frequency, only line 3 after 22.00 | 3 | First A2 transport reading item. `buurtbus` (B1) is a trial bus service; `stationsomroep`/`tramkaart` belong to other parts. |
| 7 | rooster / gezondheid (table) | `bloedprikken` | Prikpost schedule: three locations with days and morning/afternoon hours, what to bring, what "nuchter" means, children only at the hospital, results go to the huisarts | 2 | First health schedule. `huisarts afspraak` is a rescheduled appointment; `apotheek` exists only as a speaking task. |
| 8 | regels / wonen-buurt | `verwarming` | Housing-association card: three checks before reporting a heating failure, 24/7 web reporting, emergency number only when there is no hot water, never repair or call a monteur yourself | 2 | First `regels` item; instruction sequence plus an emergency condition. `lift onderhoud` is a one-day outage notice; `lekkage` (B1 listening) is a conversation. |
| 9 | advertentie / werk | `magazijn` | Job advertisement for warehouse staff at a bouwmarkt: tasks, two shifts, hours, requirements (18+, lifting, Dutch or English, no experience), pay and shift bonus, how to apply | 2 | Second job ad in the bank but a different sector, shift structure, age rule and application channel than `bloemenwinkel vacature` (Saturday help, e-mail only). |
| 10 | krant / wonen-buurt | `ramen` | Wijkkrant item: 120 rental homes get double glazing; street-by-street schedule; residents must be home one day; free, rent unchanged; walk-in hour | 2 | First `krant` item; planned renovation per street. `lift onderhoud` is a notice about one lift, `wasserette` a shop. |
| 11 | bericht / winkels-diensten | `flessenautomaat` | Supermarket notice: bottle-return machine broken; bring bottles to the service desk on weekdays 9.00–17.00, max 20 per visit, voucher at the desk, small bottles not accepted, nothing at weekends | 3 | First shop notice about a temporary procedure; `pakketpunt` is a pick-up note, `speelgoed ruilen` an event announcement. |
| 12 | brief / gezondheid | `herhaalrecept` | Apotheek letter: from 1 March repeat medicines are ordered online or by phone line, ready the next working day from 14.00 (one day later after 12.00), delivery free for 70+, else 2,50 euro; new medicines still at the counter | 3 | Not a dentist voicemail or a huisarts appointment; the concept is a changed ordering procedure with time and age conditions. `dierenarts` is a dosing note for a cat. |

Question count: six texts with three questions and six with two = 30. Twelve questions have four options (40%), eighteen have three.

## 2. Names, places, dates and register

- Cast names from `config/illustration.json` used as personas: Karim (items 1, 3, 8, 11), Julio (2, 5), Fatima (3, 6, 7, 8, 10), Sem (4, 9), Roos (4, 5, 6, 9, 11), meneer De Vries (6, 7), mevrouw Bakker (12), Amina (mentioned in 4). Other invented names: Ilse Vermeer (director, item 2), Tom (office, 2), Marieke Smit (3), tante Nadia (4), Els Mulder (housing association spokesperson, 10), Petra Jansen (recruiter, 9). Roles are mixed deliberately: the director and the spokesperson are women, the office contact is a man.
- All organisations, streets, phone numbers, e-mail addresses and websites are invented (Gemeente Westerhout, Schoonmaakbedrijf Helder, Taalschool Vooruit, Telefoonwinkel De Knop, Stadsbus Westerhout, Woningstichting De Berk, Bouwmarkt Hamer, Supermarkt Groenhof, Apotheek De Wilg; 0299 45 67 89 and similar). Real institutions named: gemeente, DigiD, huisarts, ziekenhuis, apotheek. Names that already exist in the catalogue as buurthuizen (De Brug, De Linde) were avoided.
- Weekday/date pairs were checked against the real calendar: October–November 2026 for items 2 and 10 (maandag 5 oktober, donderdag 24 september, vrijdag 9 oktober, woensdag 28/donderdag 29 oktober, maandag 2 november) and 2027 for items 3, 4 and 11 (dinsdag 2/donderdag 4/zaterdag 6 februari, zondag 13 juni, vrijdag 7 mei). Prices are plausible for 2026 (bus ticket 3,00, day ticket 7,50, permit 96 euro per year, warehouse pay 14,50 per hour).
- Register: institutions and employers write formally with `u` (items 1, 2, 3, 5, 6, 7, 8, 9, 11, 12); the family e-mail (4) is informal with `je`; the newspaper item (10) is neutral third person.

## 3. Level control (A2)

Prose sentences (table rows and header lines excluded) average 6.6–9.8 words per item; no prose sentence exceeds 18 words. Subordinate clauses use only `als`, `dat`, `omdat`-type links or question-plus-`dan` conditions ("Bestelt u vóór 12.00 uur? Dan …"), which is the pattern of official A2 texts. Less common words are explained in the text where they carry an answer: `nuchter` ("vanaf 12 uur 's nachts niets meer eten"), `herhaalmedicijnen` ("medicijnen voor langere tijd, u bestelt ze steeds opnieuw"), `waterdruk` ("moet tussen 1 en 2 staan"). Difficulty comes from combining two details: a day and a time window (2, 5, 11, 12), a person's constraint and a schedule (3, 7), a condition and a place (4, 8), an age and a price (6, 12), a weekend rule and an evening rule (6).

## 4. Questions: skills, keys and distractor rationales

Skill spread over 30 questions: rule-application 12, purpose 6, time-place 3, quantity 3, detail 2, sequence 2, person 1, advice 1. Every text has at least one persona-scenario prompt (a named person, a situation sentence, then the question); six texts have a purpose question.

Each distractor below is wrong for one nameable reason and sits on a detail the text mentions.

### Item 1 — parkeervergunning

- q1 (rule-application, key C "Vóór 1 december zijn vergunning verlengen"): A "Na 31 december een nieuwe vergunning vragen" — takes the expiry date as the moment to act; the letter says renew before 1 December. B "Vóór 1 december zijn kenteken doorgeven" — right deadline, wrong action; the kenteken is only for a new car. D "Niets doen, de vergunning gaat vanzelf door" — reverses the "no car" rule; the permit stops automatically, it does not continue.
- q2 (sequence, key A "Een afspraak maken"): B "Inloggen met zijn DigiD" — belongs to the online route, not the balie route. C "96 euro betalen" — paying is part of renewing but is not the first step and is not tied to the balie.
- q3 (purpose, key B "Zijn vergunning loopt bijna af"): A "Hij heeft een nieuwe auto gekocht" — the new-car paragraph is a conditional instruction, not the reason for the letter. C "Hij heeft een afspraak op het gemeentehuis" — an appointment is something he may make, not something he has.

### Item 2 — werkkleding

- q1 (rule-application, key A "Op donderdag 29 oktober"): B "Op vrijdag 9 oktober" — the deadline for the size form, not a pick-up day. C "Op maandag 2 november" — the first day the new clothing is worn, not a pick-up day.
- q2 (purpose, key D "Iedereen krijgt nieuwe werkkleding"): A "Het bedrijf gaat verhuizen" — misreads the magazijn address (same street as the company) as a move. B "De medewerkers moeten kleding kopen" — reversed: the clothing is free. C "Het magazijn gaat twee dagen dicht" — reversed: on 28 and 29 October the magazijn is exactly where staff collect the clothing.

### Item 3 — praktijkles

- q1 (rule-application, key C "Praten in de winkel", Saturday): A "Nederlands op het werk" — tempting because Fatima works, but the lesson is on Tuesday morning during her working hours. B "Computer en DigiD" — Thursday afternoon, also within her working hours.
- q2 (quantity, key B "15 euro"): A "Niets" — the free rule applies only to day-course students; Karim follows the evening class. C "10 euro" — the number ten belongs to the group size. D "20 euro" — the number 20 belongs to the sign-up deadline (20 januari).
- q3 (purpose, key A "De cursisten moeten een les kiezen"): B "De school verhuist naar de Schoolstraat" — the address is only where the lessons take place. C "De groepen zijn al vol" — the text describes what happens if a group becomes full; nothing is full yet.

### Item 4 — picknick

- q1 (rule-application, key C "Naar het huis van Roos"): A "Naar het Stadspark, bij de vijver" — the fair-weather location; the rain rule cancels it. B "Naar de ingang aan de Parklaan" — the fair-weather meeting point, also cancelled by rain.
- q2 (person, key D "Papa"): A "Roos" — she organises the picnic and brings the cake, but does not bring mama. B "Sem" — brings drinks and cups. C "Tante Nadia" — brings fruit and biscuits.

### Item 5 — telefoon

- q1 (rule-application, key B "Op woensdag"): A "Op dinsdag" — the table's "dezelfde dag" without the before-12.00 condition. C "Op donderdag" — applies the two-day row (oplaadaansluiting) to a screen. D "Op zaterdag" — imports the Saturday rule, which is about bringing a phone on Saturday.
- q2 (rule-application, key A "Een nieuwe batterij"): B "Een nieuw scherm" — accepted on Saturday but ready on Monday. C "Een nieuwe oplaadaansluiting" — accepted on Saturday but ready on Monday, and in the table two days anyway.
- q3 (detail, key C "Als hij de telefoon ophaalt"): A "Als hij de telefoon brengt" — reverses the moment of payment. B "Als de winkel hem belt" — the phone call only announces that the phone is ready.

### Item 6 — stadsbus

- q1 (quantity, key A "Niets"): B "1,50 euro" — the child ticket, which starts at age 4. C "3,00 euro" — the adult driver ticket.
- q2 (rule-application, key B "Bij de balie op het station"): A "Bij de chauffeur in de bus" — the driver takes pin only, so no pinpas means no ticket there. C "Alleen op de website" — the website is named only as an information source; the app and the balie sell tickets.
- q3 (time-place, key C "Alleen lijn 3, elk half uur"): A "Alleen lijn 4, elk half uur" — the wrong line survives after 22.00. B "Lijn 3 en lijn 4, elk kwartier" — weekday daytime frequency and both lines. D "Lijn 3 en lijn 4, elk half uur" — correct weekend frequency but ignores the after-22.00 rule.

### Item 7 — bloedprikken

- q1 (rule-application, key D "In het ziekenhuis"): A "Bij Gezondheidscentrum Noord" — morning hours only (8.00–10.30). B "Bij Apotheek Zuid" — morning hours only (7.30–9.30). C "Bij zijn huisarts" — the huisarts only receives the result.
- q2 (detail, key B "Een glas water drinken"): A "Een kopje thee drinken" — the text says coffee and tea are not allowed. C "Een boterham eten" — eating stops at midnight.

### Item 8 — verwarming

- q1 (sequence, key C "Op de thermostaat kijken"): A "Op de resetknop drukken" — step 3, not step 1. B "De storing melden bij De Berk" — only after the three checks fail.
- q2 (rule-application, key A "De storing melden op www.deberk.nl"): B "Meteen 0299 66 77 88 bellen" — the emergency number is for no hot water; Fatima has hot water. C "Zelf een monteur bellen" — explicitly forbidden; costs are not refunded. D "Tot maandag wachten en dan bellen" — the web report is open day and night, so the weekend is no reason to wait.

### Item 9 — magazijn

- q1 (rule-application, key D "Nee, want hij is te jong"): A "Ja, want hij spreekt Nederlands" — language is required but does not override the age rule. B "Ja, want ervaring is niet nodig" — true statement, wrong conclusion; age still blocks. C "Nee, want hij heeft geen ervaring" — right conclusion for the wrong reason; experience is not required.
- q2 (advice, key B "Op maandag om 10.00 uur Petra bellen"): A "Op maandag om 15.00 uur Petra bellen" — outside the 9.00–12.00 calling window. C "Op zaterdag naar het magazijn gaan" — the ad says not to come without an appointment.

### Item 10 — ramen

- q1 (time-place, key B "Op 12 oktober"): A "Op 5 oktober" — the Tulpstraat start date. C "Op 19 oktober" — the Irisstraat start date.
- q2 (purpose, key A "Bewoners informeren over het werk aan de ramen"): B "Bewoners vragen om nieuwe ramen te kopen" — reversed: the windows are free. C "Bewoners vertellen dat de huur omhoog gaat" — reversed: the quote says the rent does not go up. D "Bewoners vragen om zelf een dag te kiezen" — reversed: residents receive the exact day by letter.

### Item 11 — flessenautomaat

- q1 (time-place, key C "Om 10.00 uur"): A "Om 8.30 uur" — before the 9.00 start. B "Om 19.00 uur" — after the 17.00 end.
- q2 (rule-application, key D "De flesjes nog even thuis bewaren"): A "De flesjes bij de servicebalie inleveren" — small bottles are the one thing the desk does not accept. B "De flesjes bij de kassa inwisselen" — the kassa is where the voucher is redeemed, not where bottles go. C "De flesjes in het weekend inleveren" — nothing is accepted at weekends.
- q3 (purpose, key A "Uitleggen waar klanten nu flessen inleveren"): B "Vertellen dat de servicebalie dicht is" — reversed: the desk is the temporary place to go. C "Vragen of klanten op zaterdag komen" — reversed: Saturday and Sunday are excluded.

### Item 12 — herhaalrecept

- q1 (rule-application, key C "Dinsdag vanaf 14.00 uur"): A "Maandag vanaf 14.00 uur" — ignores "de volgende werkdag". B "Dinsdag vóór 12.00 uur" — takes the ordering cut-off as a pick-up time. D "Woensdag vanaf 14.00 uur" — applies the after-12.00 rule to a 10.00 order.
- q2 (quantity, key B "2,50 euro per bezorging"): A "Niets, bezorgen is gratis" — free delivery starts at 70; she is 66. C "2,50 euro per maand" — the amount is right, the unit is wrong (per delivery).
- q3 (purpose, key C "Bestellen gaat vanaf 1 maart anders"): A "Mevrouw Bakker krijgt een nieuw medicijn" — new medicines are mentioned only as the exception that still goes via the counter. B "De balie van de apotheek gaat dicht" — only ordering at the counter stops; the counter stays open for new medicines.

## 5. Key balance and option counts

| Key | Count | Share |
| --- | ---: | ---: |
| A | 8 | 27% |
| B | 8 | 27% |
| C | 9 | 30% |
| D | 5 | 17% (of all questions; 5 of the 12 four-option questions) |

No letter above 40%, A/B/C each above 20%. Key positions per item (in question order): 1 C-A-B, 2 A-D, 3 C-B-A, 4 C-D, 5 B-A-C, 6 A-B-C, 7 D-B, 8 C-A, 9 D-B, 10 B-A, 11 C-D-A, 12 C-B-C. Option counts: 18 questions with three options, 12 with four (40%). No key is the single longest option in its question; option lengths within a question differ by at most a few words (the checker's length-spread warning did not fire).

## 6. Checker result and remaining warnings

`npm run batch:check content/batches/004-original.json`: 12 items, 30 questions, no failures.

Remaining warnings (4), all caused by the plain-text tables: the checker splits sentences on `. `, `! ` or `? ` followed by whitespace, so a block of table rows without terminal punctuation merges with the next sentence into one long "sentence".

- `telefoon`: "longest sentence 48 words" — the five-row repair table.
- `stadsbus`: "longest sentence 60 words" and "average 12.2" — the five-row ticket table; without the table rows the average is 8.2 and the longest prose sentence 15 words.
- `bloedprikken`: "longest sentence 52 words" — the four-row location table; prose average 6.9, longest 12.

Table rows were deliberately left without trailing periods because the app renders `text` with `white-space: pre-line`, so each row shows as a line and a period would look wrong in a table. If the reviewer prefers a clean checker run, adding a period to each row is a cosmetic change that does not affect any evidence quote.

## 7. Things the reviewer should look at

- Item 1 q1: option A ("Na 31 december een nieuwe vergunning vragen") was chosen over "vóór 31 december verlengen" so that no distractor is logically contained in the key; check that it still reads as a natural misreading.
- Item 2 q1: the persona constraint is stated as "kan op woensdag 28 oktober niet naar het magazijn" (not "werkt op woensdag niet"), because a day off would make Wednesday possible rather than impossible.
- Item 6 q2: the text offers two valid places without a pinpas (the app and the balie); only the balie is among the options, so the key is unique, but confirm this is acceptable exam practice.
- Item 9 q1 uses a "Ja/Nee, want …" option format; confirm it is close enough to official A2 usage.
- Item 12: `herhaalmedicijnen` is explained in the text; a reviewer may prefer the everyday term `herhaalrecept` in the title only.
- Level: unvalidated authoring target (`targetLevelValidated: false`); no exemplar comparison was possible because `content/exemplars/` does not exist yet.

## 8. Limitations

Original practice material with unvalidated difficulty labels. No claim of official approval, scoring or exam equivalence. The items have not been reviewed yet; `status` stays `draft` until the batch passes editorial review and the hash gate.

## Coordinator revision after review (10 September 2026)

The review passed 10 items and asked for two repairs and a rebalance of four-option keys. Applied: bloedprikken q1 prompt now gives a start time ("van 7.00 tot 12.00 uur"), so only the hospital fits, and its options were reordered with the hospital as A; praktijkles q1 prompt now reads "van 9.00 tot 17.00 uur" and its q3 key reads "De cursisten kunnen een extra les kiezen." (the e-mail invites rather than obliges); picknick q2 options reordered with Papa as B. Explanations and evidence quotes are unchanged and do not refer to option letters. Four-option keys are now A3 / B3 / C3 / D3. The checker reports no failures; the four table-row warnings remain as documented in section 6.
