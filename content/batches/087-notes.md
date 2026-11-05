# Batch 087: design notes

Twelve original A2 reading texts (`exam: duo-a2`, `part: reading`), 34 closed questions, written against `content/blueprint.md` §1, §3, §4.1, §5, §8, §9, §10 and §13, `docs/briefs/author.md`, the plan in `docs/briefs/a2-expansion-2026-11-05.md` (section "087") and the A2 Lezen paragraph of `docs/research/exam-blueprints-2026-09-10.md`. Record shape copied from the current catalogue records `batch021-zwemrooster`, `batch021-weekmarkt`, `batch021-gezinskaart`, `batch020-tandartsregels` and `batch020-identiteitskaart`; their vocabulary was not reused. Every text is invented; official practice items were used for shape only (situation line, 100–250 words, two or three questions, persona and purpose prompts, a mix of three and four options).

Source file: `content/batches/087-original.json` (SHA-256 at the time of writing: `a52b8a014eea9703f6faec010d1a89a9f6198f5ebe39ac1433195d964585f392`). Checker: `npx tsx scripts/batch-check.ts content/batches/087-original.json`, no failures; every warning is handled in section 7. No media, `revision`, `images` or audio fields. All items `status: "draft"`, `targetLevelValidated: false`.

## 1. Batch matrix and scenarios

Slugs, task types, domains and topics are the ones the plan assigns. Tone: eleven items ordinary, one lightly humorous (`retour-ontvangen`, as the plan allows).

| # | Slug | taskType / domain | Scenario | Q | Tone |
| --- | --- | --- | --- | --- | --- |
| 1 | `gezondheidscentrum` | krant / gezondheid | Wijkkrant item: Gezondheidscentrum Wilgenkamp opens Monday 1 February 2027 with two GPs, a physiotherapist and the pharmacy; the old practice on the Kerkstraat closes on Friday 29 January; its patients move automatically and get a letter; new patients register online from 4 January and at the desk from 1 February with passport or ID card; free parking behind the building, bus 5 | 3 | ordinary |
| 2 | `schoolstraat` | krant / opleiding | Newspaper item: from Monday 11 January 2027 the Populierstraat with a primary school is closed to cars twice a day (8.15–8.45, 14.00–14.30; Wednesday 12.00–12.30); a gate; cyclists and pedestrians may pass, residents cannot drive in or out; parents park at the sporthal (three minutes' walk); a three-month trial; parents' evening Thursday 10 December | 3 | ordinary |
| 3 | `vakantiesport` | rooster / vrije-tijd-familie (table) | Sports hall's autumn-holiday programme: six rows of activity, age, day, time, price; register online up to and including Friday 8 October; twenty places; bring sports shoes and a drink; helmet at climbing, lunch included on the sports day | 3 | ordinary |
| 4 | `stagedagen` | rooster / opleiding (table) | MBO "verkoper", second year: six weeks from 8 February to 19 March 2027 (two school days + three internship days, the spring holiday, two full internship weeks, a week with a return day on Wednesday 17 March); what to do when ill on an internship day (phone the supervisor before 8.30, then e-mail the mentor, report back better to both, make up the day) versus a school day (the school app) | 3 | ordinary |
| 5 | `fietsles` | folder / vervoer (table) | Wijkcentrum folder: cycling lessons for adults; four groups in a table (beginners Tuesday, beginners women only Thursday, some experience Wednesday evening or Saturday morning); ten lessons for 25 euro; bikes and helmets provided; register only by phone on weekday mornings | 2 | ordinary |
| 6 | `consultatiebureau` | folder / gezondheid (table) | Child health clinic folder: what happens at six of the roughly fifteen visits (weighing, measuring, injections, talks about food and about talking and playing, eyes); free; move an appointment in the app or by phone at least two working days ahead; a sick child on the day itself: do not come, phone that morning | 2 | ordinary |
| 7 | `werkplaatsregels` | regels / werk | Furniture workshop rules for new staff: safety shoes (provided), gloves for lifting planks and painting but not at the saw or other machines, phones stay in the locker, office number for an important call, food only in the canteen and three breaks, report every small injury to the team leader, switch off machines | 3 | ordinary |
| 8 | `ziekmelden` | regels / werk | Garden centre's sick-call rules: phone the team leader before 8.00 (no app or e-mail), reception as fallback from 7.30, say how long you expect to be away but not what you have, stay reachable, phone again when better, company doctor after a week, call in sick during a holiday too | 3 | ordinary |
| 9 | `kamer-te-huur` | advertentie / wonen-buurt | A family rents out its attic room: 14 m², furniture, own washbasin, shared kitchen and bathroom, 495 euro including energy and internet, from 1 February 2027 for at least a year; a student or someone with a job; no smoking, no pets (son allergic); reply by text message, viewing on Saturday 9 January by invitation | 3 | ordinary |
| 10 | `huur-omhoog` | brief / wonen-buurt | Landlord's letter of 22 April 2027: rent rises on 1 July by 24,60 euro (683,40 → 708,00); the landlord adjusts a bank payment, tenants who pay themselves pay the new amount; cannot pay: huurtoeslag (Belastingdienst website) or a talk; disagree: letter before 1 July; phone on weekday mornings only | 3 | ordinary |
| 11 | `stagegesprek` | email / opleiding | Mentor's e-mail to an MBO student: interview at Zorgcentrum Hof van Lommeren on Thursday 21 January at 14.00, address, ask for the team leader, ten minutes early, bring CV and ID card, ordinary clean clothes (jeans yes, sportswear no), send the mentor a message the same day, tell the mentor before Monday 18 January if the date does not suit and do not phone the care home | 3 | ordinary |
| 12 | `retour-ontvangen` | bericht / winkels-diensten | Webshop message: the returned jumper (size XL, "my husband and I both fit in it") arrived on Tuesday 17 November; the size advice on the website was changed; 59,95 minus 4,95 for the return label = 55,00 back within five working days; a one-time 10% code valid to 31 December 2026 | 3 | lightly humorous (the customer's return reason and the shop's reply) |

Question count: ten texts with three questions, two (`fietsles`, `consultatiebureau`) with two = 34. Fourteen questions have four options (41%), twenty have three. Tables in `vakantiesport`, `stagedagen`, `fietsles` and `consultatiebureau` (plain-text rows separated by ` – `, as in batch 021); `huur-omhoog` has a two-line amount block and `kamer-te-huur` a bullet list.

Premise details adjusted from the plan, as the plan allows:

- `werkplaatsregels`: the plan says "gloves for the saw". Real workshop safety rules say the opposite: no gloves at a saw or any rotating machine, because a glove can be pulled in; gloves are for handling rough timber or paint. The text follows the real rule ("Werk je met de zaag of een andere machine? Doe dan je handschoenen uit.") and q1 tests that reversed condition.
- `ziekmelden`: the plan says "a doctor's note only after a week". In the Netherlands an employer may not ask for a doctor's statement or for the diagnosis (privacy rules for health data); the company doctor (bedrijfsarts) handles longer absence. The text therefore says "Uw ziekte hoeft u niet te noemen" and "Bent u na een week nog ziek? Dan maken wij voor u een afspraak met de bedrijfsarts." One ordinary rule is added: calling in sick during a holiday gives the holiday days back (the general Dutch rule), which q3 tests.
- `retour-ontvangen`: the plan says "the shipping cost is not refunded". Under EU and Dutch consumer law a webshop must refund the original standard delivery cost; only the cost of sending the item back may stay with the customer. The text therefore has free delivery and a 4,95 euro return label that the shop subtracts, which keeps the plan's point (not all money comes back) and is lawful.
- `huur-omhoog`: the letter is dated 22 April for 1 July, more than two months ahead as Dutch rent rules require, and adds the tenant's ordinary option to object before 1 July; q3 uses it as a distractor.
- `stagedagen`: the plan leaves the programme open; "verkoper" (retail, MBO level 2) keeps it apart from item 11, which is in care.

## 2. Names, places, dates and register

- Personas from the plan's pool, each in at most two items: Dirk (1, 10), Shirin (1 q2, 11), Aziz (2 q1, 8), Yasmin (2 q2, 9), Tomasz (3, 7), Wout (4, 9 q2), Grace (5; the mentor in 11), Marloes (6, 12). No voice names and none of the older recurring cast. Unnamed roles: de teamleider, de begeleider, de mentor (named Grace only in item 11), een van de huisartsen, de verhuurder, the family in item 9, a student in 9 q3. The same name in two items stands for two unrelated people, as in the official bank. No pictures in this batch, so no visual traits are needed.
- Invented organisations, each searched on the web on 5 November 2026 (exact-phrase search) with no business or institution of that name found: Gezondheidscentrum Wilgenkamp (only other health centres such as Spechtenkamp), Sporthal Kievitsweide (closest: sporthal De Kieviten in Wassenaar and "de Kievit" in Geldrop-Mierlo, different names), Wijkcentrum De Kraanvogel (only the bird and a bridge in Spijkenisse), Meubelwerkplaats Eikenhout (only oak furniture in general), Tuincentrum Vlinderveld (only butterfly gardens), Hoogkamp Wonen (Hoogkamp is a neighbourhood in Arnhem and a street name; no landlord or housing company of that name), Zorgcentrum Hof van Lommeren (only Hof van Lely, Hof van Staten and Belgian homes), Truienhuis (no webshop; closest Truus.nl, unrelated), Consultatiebureau Zuid (generic district label like "Sportcentrum Oost"; no clinic of that exact name found). Names tried and dropped: Sporthal De Kolk (a real sports and swimming centre "De Kolk" in Wierden), Tuincentrum De Groene Hoven ("De Groene Hoven" is a real care centre), Zorgcentrum De Lindeboog (too close to several real "De Linde" homes). The primary school in item 2 is left unnamed, like the school in batch 021.
- Streets (Esdoornlaan, Kerkstraat, Populierstraat, Beukenlaan, Kastanjelaan) are generic street names with no town; no real address is meant. Phone numbers use the 0299 pattern of earlier batches with new digits and one invented 06 number; the only web address is www.truienhuis.nl, invented. Real public bodies named: gemeente (item 2, the trial), Belastingdienst (item 10, huurtoeslag), both because the item is about them.
- Weekday–date pairs checked against the calendar: maandag 1 februari 2027, vrijdag 29 januari 2027, maandag 4 januari 2027, maandag 11 januari 2027, donderdag 10 december 2026, vrijdag 8 oktober / zaterdag 9 oktober (2027), maandag 8 februari to vrijdag 19 maart 2027 with woensdag 17 maart, woensdag 3 maart, dinsdag 9 februari, zaterdag 9 januari 2027, donderdag 21 januari and maandag 18 januari 2027, dinsdag 17 november 2026. Spring holiday 22–26 February 2027 matches the recommended dates for regions Noord and Midden (20–28 February 2027; region Zuid is a week earlier), found via holiday overviews (tuxx.nl, corendon.nl); the autumn-holiday programme gives no holiday dates, only weekdays and a registration deadline before every region's holiday.
- Prices and amounts are plausible for 2026–2027: holiday sport 4–12 euro, cycling course 25 euro, room 495 euro all-in, rent 683,40 → 708,00 (+3,6%), jumper 59,95 with a 4,95 return label, 10% code.
- Register: the newspaper items are neutral third person with one quote (item 1); organisations address the reader with `u` (items 1–3, 5, 6, 8–10, 12); the MBO rooster and the workshop rules use `je`, as schools and small workshops do with students and staff; the mentor writes `je` to her student. Questions, situations and explanations address the learner with `u` or speak about the persona in the third person.

## 3. Level control (A2)

Prose sentences only (headers, table rows and list lines excluded; times and prices kept as one word):

| Item | Words (checker) | Prose sentences | Average | Longest | Unlisted text words | Compounds reported |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| gezondheidscentrum | 159 | 18 | 8.2 | 17 | none | wijkkrant (situation, q3) |
| schoolstraat | 195 | 20 | 9.4 | 17 | none | none |
| vakantiesport | 219 | 13 | 7.5 | 14 | none | none |
| stagedagen | 207 | 14 | 6.8 | 12 | none | stagerooster, stageboek, stagedag, terugkomdag |
| fietsles | 224 | 15 | 8.5 | 16 | none | fietsles |
| consultatiebureau | 206 | 15 | 7.7 | 13 | consultatiebureau | none |
| werkplaatsregels | 196 | 24 | 7.4 | 11 | none | meubelwerkplaats, veiligheidsschoenen, verbanddoos |
| ziekmelden | 151 | 21 | 6.8 | 11 | none | bedrijfsarts, tuincentrum |
| kamer-te-huur | 174 | 13 | 8.8 | 15 | none | vierkante |
| huur-omhoog | 177 | 18 | 7.7 | 13 | none | none |
| stagegesprek | 146 | 19 | 6.9 | 14 | none | stagedag (explanation), zorgcentrum |
| retour-ontvangen | 151 | 15 | 8.5 | 15 | none | retouretiket, truienhuis |

No prose sentence is over 17 words. Subordinate clauses only with `als`, `dat` and `wanneer` ("Als de school begint en eindigt, …", "Zorg dat uw telefoon aan staat", "zeg wanneer u weer komt werken"); conditions are mostly the question-plus-`dan` form ("Bent u daar patiënt? Dan hoeft u niets te doen."). Indirect questions were rewritten as direct ones ("Vertel daarin: wie bent u, wat doet u …?", "Vertel ook: hoe lang bent u ongeveer ziek?"), and two `of`-clauses in early drafts ("kijken … of het goed werkt") were replaced by main clauses. Tenses: present and perfect, one simple past in a quoted reason ("kostte", "schreef"). Difficulty comes from combining two details: a date and two registration routes (1 q2), a weekday exception and a resident rule (2 q1), two age ranges (3 q1), a deadline (3 q3), a table row and a prose rule (4 q1–q3), level and availability (5 q1), an age and a schedule (6 q1), the same-day exception to the moving rule (6 q2), a reversed glove condition (7 q1), a holiday rule (8 q3), a pet rule and a minimum term (9 q1, q3), a payment method and the new amount (10 q2), a free delivery and a subtracted label (12 q2), a validity date (12 q3).

Compound judgements (all two listed parts; none is the only route to a key unless stated):

- wijkkrant (wijk + krant), fietsles (fiets + les), tuincentrum (tuin + centrum), zorgcentrum (zorg + centrum), stagedag (stage + dag), stagerooster (stage + rooster): transparent.
- stageboek (stage + boek): transparent enough ("the book for your internship"); only in "Neem je stageboek mee", no question.
- terugkomdag (terugkomen + dag): transparent and defined in the text ("Op de terugkomdag ben je … op school"); 4 q1 depends on that defining sentence, not on guessing the word.
- meubelwerkplaats (meubel + werkplaats): company name, transparent. veiligheidsschoenen (veiligheid + schoenen), verbanddoos (verband + doos): transparent, no question.
- bedrijfsarts (bedrijf + arts): transparent ("the company's doctor"); appears in distractor 8 q3 D, which is rejected by the time rule ("na een week"), not by the meaning of the word.
- retouretiket (retour + etiket): transparent; it is in the key of 12 q2, and the text explains it ("U hebt ons retouretiket gebruikt. Dat kost 4,95 euro.").
- truienhuis (truien + huis): shop name.
- vierkante (the checker splits vier + kant): the fixed unit "vierkante meter" in a housing advert; the parts do not give the meaning, but the number and "meter" do; no question depends on the size. Reviewer: replace with "14 m²" or drop the size if judged above A2.

Unlisted text word: `consultatiebureau` (item 6, one of three allowed). The context explains it in the next two sentences ("kijken wij naar de gezondheid van uw kind. Wij wegen en meten uw kind."), and no title, situation, question or option uses it (the title is "Uw kind wegen en meten"). See "Requested words".

Words that pass the gate by a matching rule rather than as listed words, flagged for the reviewer: `zaag` (matches the past tense "zag" after normalisation; explained by "de zaag of een andere machine", and 7 q1 is phrased with "machine"), `ziekte` (matches ziek + suffix; an everyday A2 word), `beginners` (matches beginnen + -ers; meaning fits), `prik` (from "prikken").

## 4. Questions: skills, keys and distractor rationales

Skill spread over 34 questions: rule-application 18, purpose 5, detail 3, sequence 3, time-place 2, advice 2, quantity 1. Every text has at least one named-persona prompt (27 prompts match the checker's persona pattern; the named personas are in 1 q1–q2, 2 q1–q2, 3 q1, 4 q2–q3, 5 q1–q2, 6 q1, 7 q1–q3, 8 q1–q3, 9 q1–q2, 10 q2–q3, 11 q2, 12 q3). Purpose questions in five texts: gezondheidscentrum, schoolstraat, huur-omhoog, stagegesprek, retour-ontvangen.

Each distractor below is wrong for one nameable reason and sits on a detail the text mentions.

### Item 1 — gezondheidscentrum

- q1 (rule-application, key C "Niets, hij gaat vanzelf mee."): A "Zich inschrijven op de website." — the route for new patients. B "Met zijn id-kaart naar de balie gaan." — the desk route for new patients from 1 February; the ID card belongs to that route.
- q2 (rule-application, key B "Zich inschrijven op de website."): 11 January is before the opening. A "Zich inschrijven bij de balie." — only from 1 February. C "Naar de praktijk aan de Kerkstraat gaan." — the old practice is for existing patients; the text sends new patients to the website. D "Wachten op een brief in januari." — the letter is for patients of the old practice.
- q3 (purpose, key A "In februari opent een nieuw gezondheidscentrum."): B "De huisartsen aan de Kerkstraat stoppen met werken." — reversed: they move to the new building. C "Alle patiënten moeten zich opnieuw inschrijven." — reversed: existing patients move automatically.

### Item 2 — schoolstraat

- q1 (time-place, key B "Vanaf 12.30 uur."): Wednesday 12.00–12.30, residents included. A "Vanaf 12.15 uur." — the time the lessons end, not the time the street opens. C "Vanaf 14.30 uur." — the afternoon closure of the other days.
- q2 (rule-application, key C "Op de parkeerplaats bij de sporthal."): A "Op de stoep bij de school." — the cause of the problem. B "Bij het hek aan het begin van de straat." — the gate closes the street; it is not a parking place.
- q3 (purpose, key A "De straat bij de school is soms dicht voor auto's."): B "Auto's mogen nooit meer in de Populierstraat komen." — overgeneralises "twee keer per dag". C "Bij de sporthal komt een nieuwe parkeerplaats." — the car park is existing advice, not news. D "De school zoekt ouders voor een avond in december." — the evening is for parents' questions; nobody is sought.

### Item 3 — vakantiesport

- q1 (rule-application, key D "Dansen."): ages 7 and 11 both fit 6–12. A "Voetbal." — 6–9, the daughter is too old. B "Klimmen." — 8–12, the son is too young. C "De sportdag." — 8–12, the son is too young. (Thursday has judo for the son and basketball for the daughter, but not together, and is not an option.)
- q2 (detail, key B "Sportschoenen en iets te drinken."): A "Een broodje en iets te drinken." — the sandwich is provided on the sports day. C "Een helm en sportschoenen." — helmets are provided, and only for climbing.
- q3 (rule-application, key C "Nee, dat kan niet meer."): deadline "tot en met vrijdag 8 oktober". A "Ja, op de website van de sporthal." — the right channel after the deadline. B "Ja, als er nog plaats is." — the "vol" sentence is about places, not about the deadline.

### Item 4 — stagedagen

- q1 (time-place, key A "De hele dag op school."): Wednesday 17 March is the return day, 9.00–15.00 at school. B "De hele dag op zijn stageplaats." — true for the other days of that week. C "Vrij, want het is vakantie." — the holiday is the week of 22 February.
- q2 (sequence, key D "Vóór 8.30 uur zijn begeleider bellen."): 3 March is in a full internship week. A "Zich afmelden in de app van school." — the school-day rule. B "Een e-mail sturen naar zijn mentor." — step 2, not first. C "Een appje sturen naar zijn begeleider." — "Een appje is niet genoeg."
- q3 (rule-application, key B "Zich vóór 8.30 uur afmelden in de app."): 9 February is a school day. A "Vóór 8.30 uur zijn begeleider bellen." — the internship-day rule. C "Een e-mail sturen naar zijn mentor." — internship-day step 2. D "Een dag extra stage afspreken." — only for a missed internship day.

### Item 5 — fietsles

- q1 (rule-application, key D "Zaterdag van 10.00 tot 11.30 uur."): she can already cycle a little, so "een beetje ervaring"; she works on Wednesday evening. A "Dinsdag van 9.30 tot 11.00 uur." and C "Donderdag van 9.30 tot 11.00 uur." — the beginners' groups. B "Woensdag van 19.00 tot 20.30 uur." — the right group at a time she works.
- q2 (rule-application, key A "Op een werkdag in de ochtend bellen."): B "Een e-mail sturen naar het wijkcentrum." and C "Zich aanmelden op de website." — both explicitly excluded ("Daarom kan aanmelden niet per e-mail of op de website.").

### Item 6 — consultatiebureau

- q1 (rule-application, key C "Wegen, meten en een gesprek over eten."): 5 months + 1 = the 6-month row. A "Wegen, meten en een prik." — the 3- and 11-month rows. B "Wegen, meten en een eerste gesprek." — the 4-week row. D "Meten en een gesprek over praten en spelen." — the 2-year row.
- q2 (rule-application, key B "Die ochtend bellen voor een nieuwe afspraak."): A "Met haar dochter gewoon naar de afspraak gaan." — reversed: "Kom dan niet." C "In de app een andere tijd kiezen." — the app route needs two working days' notice; illness on the day itself has its own rule.

### Item 7 — werkplaatsregels

- q1 (rule-application, key A "Alleen als hij de planken tilt."): B "Alleen als hij met de machine werkt." — the reversed condition, which is what the plan's wording would suggest. C "De hele tijd, ook bij de machine." — ignores the machine rule. D "Nooit, ook niet bij de planken." — ignores the planks rule.
- q2 (rule-application, key C "Het melden bij de teamleider."): A "Niets, want het is maar klein." — reversed by "ook maar een klein beetje". B "Het melden bij het kantoor." — the office handles important calls.
- q3 (advice, key B "De school het nummer van het kantoor geven."): A "Zijn telefoon in de werkplaats bij zich houden." — the phone may not go into the workshop. C "Wachten tot de pauze en dan de school bellen." — break-time calling is allowed, but for an important incoming call the text gives the office route; waiting risks missing the call.

### Item 8 — ziekmelden

- q1 (rule-application, key D "Vóór 8.00 uur zijn teamleider bellen."): A "Om 9.00 uur een e-mail sturen aan zijn teamleider." — wrong channel and too late. B "Om 9.00 uur de receptie bellen." — the reception is only the fallback, and 9.00 is too late. C "Vóór 8.00 uur een appje sturen." — right time, wrong channel ("Een appje … is niet genoeg").
- q2 (detail, key A "Hoe lang hij ongeveer ziek is."): B "Welke ziekte hij heeft." — reversed: "Uw ziekte hoeft u niet te noemen." C "Bij welke huisarts hij is geweest." — the GP is mentioned only as allowed while reachable.
- q3 (rule-application, key C "Zijn teamleider bellen."): A "Niets, want hij hoeft niet te werken." — reversed by the holiday rule. B "Na de vakantie een e-mail sturen." — wrong time and wrong channel. D "Een afspraak maken met de bedrijfsarts." — the company makes that appointment, and only after a week.

### Item 9 — kamer-te-huur

- q1 (rule-application, key D "Nee, want er mogen geen huisdieren in huis."): A "Ja, want de kamer is ook voor mensen met een baan." — true about the job, but the cat rules her out. B "Nee, want de kamer is alleen voor studenten." — reversed: also for people with a job. C "Ja, als de kat op haar eigen kamer blijft." — no such exception; the reason is the son's allergy.
- q2 (sequence, key C "Een berichtje sturen over zichzelf."): A "Het gezin overdag bellen." — "bel liever niet", they work during the day. B "Op zaterdag 9 januari naar het huis gaan." — only invited people come on that day.
- q3 (rule-application, key A "Nee, want hij moet minstens een jaar huren."): February to June is five months. B "Ja, want de kamer is goed voor een student." — true but does not answer the term rule. C "Ja, als hij vóór 9 januari een berichtje stuurt." — the reply route, unrelated to the minimum term.

### Item 10 — huur-omhoog

- q1 (purpose, key B "Zijn huur gaat in juli omhoog."): A "Hij krijgt vanaf juli huurtoeslag." — huurtoeslag is a possibility for tenants who cannot pay. C "Hij moet een gesprek aanvragen." — a talk is an option, not a duty.
- q2 (quantity, key C "708,00 euro."): A "24,60 euro." — the increase alone. B "683,40 euro." — the old rent.
- q3 (advice, key D "Een gesprek met de verhuurder aanvragen."): A "Vóór 1 juli een brief sturen." — the route for disagreeing, not for being unable to pay. B "'s Middags de verhuurder bellen." — reversed: no calls in the afternoon. C "Wachten tot de verhuurder het bedrag aanpast." — the adjustment is about a bank payment, not a solution. Huurtoeslag, the other correct route, is deliberately not among the options.

### Item 11 — stagegesprek

- q1 (purpose, key B "Shirin heeft een gesprek voor een stage."): A "Shirin moet zelf een stageplaats zoeken." — the mentor has found one. C "Shirin begint op 21 januari met haar stage." — 21 January is the interview. D "Shirin moet het zorgcentrum bellen." — reversed: "Bel het zorgcentrum niet zelf."
- q2 (rule-application, key A "Het vóór 18 januari aan Grace laten weten."): B "Het zorgcentrum bellen voor een andere dag." — explicitly not allowed. C "Op 21 januari een berichtje sturen aan Grace." — the message on the day belongs to after the interview, and it would be too late.
- q3 (sequence, key C "Grace die dag nog een berichtje sturen."): A "Het contract met het zorgcentrum regelen." — the mentor does that. B "De teamleider van het zorgcentrum bellen." — the team leader is whom she meets; the text asks for a message to the mentor.

### Item 12 — retour-ontvangen

- q1 (purpose, key A "De webwinkel heeft haar trui terug."): B "Zij krijgt een nieuwe trui in een kleinere maat." — the smaller size is advice for next time; no new jumper is sent. C "Zij moet de trui nog terugsturen." — reversed: the parcel has arrived.
- q2 (detail, key D "Omdat het retouretiket 4,95 euro kost."): A "Omdat de bezorging niet gratis was." — reversed: delivery was free. B "Omdat zij een code voor korting krijgt." — the code is for a next order and does not change the refund. C "Omdat de trui veel te groot was." — the reason for returning, not for the lower amount.
- q3 (rule-application, key B "Nee, want de code geldt tot en met december."): A "Ja, want zij kan de code één keer gebruiken." — true about the number of uses, but the date has passed. C "Nee, want zij heeft de code al gebruikt." — she has not used it.

## 5. Key balance and option counts

| Key | Count | Share |
| --- | ---: | ---: |
| A | 9 | 26% |
| B | 9 | 26% |
| C | 9 | 26% |
| D | 7 | 21% (7 of the 14 four-option questions) |

Key sequence in file order: C B A · B C A · D B C · A D B · D A · C B · A C B · D A C · D C A · B C D · B A C · A D B — no letter three times in a row. Keys within the fourteen four-option questions: A2 / B3 / C2 / D7; D is the key in half of them so that D also reaches 20% of the batch. Option counts: 20 questions with three options, 14 with four (41%). Checked by script: in no question is the key longer than every other option by more than two characters, and the checker reports no option-length spread.

## 6. Diversity against the catalogue

| New item | Nearest existing A2 reading items | Difference |
| --- | --- | --- |
| gezondheidscentrum | `batch002-huisarts` (e-mail moving an appointment), `batch020-huisartsenpost-folder`, `batch004-herhaalrecept` | First item about a practice moving and registering as a new patient; a newspaper piece, not a practice message. |
| schoolstraat | `batch004-ramen` (krant, window replacement), `batch021-weekmarkt` (krant, market moves) | First traffic measure around a school: time windows with a weekday exception and a residents rule. |
| vakantiesport | `batch021-zwemrooster`, `batch020-voetbalseizoen` | A one-week children's programme with age bands and a deadline, not a pool timetable or a club season. |
| stagedagen | `batch004-praktijkles` (extra lessons), `batch020-politiebureau` (opening hours) | First internship schedule; combines a week table with two different sick rules. B1 `stage` is a different level and concept (choosing a placement). |
| fietsles | `batch004-stadsbus` (vervoer folder, tickets) | First course folder in vervoer; group choice by level and time. |
| consultatiebureau | `batch020-huisartsenpost-folder`, `batch020-tandartsregels` | First child-health text; age table plus two rescheduling rules. KNM `batch006-consultatiebureau` is a one-line fact card in another part. |
| werkplaatsregels | `batch003-kantine` (canteen lunch rules), `batch004-werkkleding` (letter about new uniforms) | Safety rules in a workshop with a reversed condition; not about ordering food or collecting clothes. |
| ziekmelden | official practice exam 1 has company sick-call rules (structure only, not seen in wording); `batch020-dienstwissel` (shift change) | Garden-centre rules written here, with the privacy rule, the reception fallback and the holiday rule. Speaking `batch027-ziekmelden` is another part. |
| kamer-te-huur | `batch020-tweedehandsfiets`, `batch021-schoonmaker`, `batch004-magazijn` (advertisements) | First housing advertisement; rules for who may rent. |
| huur-omhoog | `batch003-lift`, `batch021-ketel` (landlord letters about maintenance) | First letter about money from a landlord; amounts, payment method and options. |
| stagegesprek | `batch021-dierentuin`, `batch004-praktijkles` (school e-mails) | First mentor–student e-mail; an interview with logistics and a reporting duty. |
| retour-ontvangen | `batch021-terugbrengen` (a clothing shop's return rules), `batch001-pakketpunt` (parcel ready) | A confirmation of one completed return with a refund calculation and a voucher date, not a policy text; the wording was kept apart (the refund sentence was rephrased so that it does not repeat batch 021). |

Domains in the batch: opleiding 3, gezondheid 2, werk 2, wonen-buurt 2, vrije-tijd-familie 1, vervoer 1, winkels-diensten 1. Neighbourhood appears only as housing (a room advert and a rent letter), not as neighbour or volunteering scenes.

## 7. Checker result and how each warning is handled

`npx tsx scripts/batch-check.ts content/batches/087-original.json`:

```
Checked 12 items, 34 questions. Keys: {"C":9,"B":9,"A":9,"D":7}. Options: {"3":20,"4":14}.
  warn  A2:reading:batch087-gezondheidscentrum:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
  warn  A2:reading:batch087-schoolstraat:1: longest sentence 24 words (A2 target 18)
  warn  A2:reading:batch087-vakantiesport:1: average sentence length 16.8 words (A2 target under 12)
  warn  A2:reading:batch087-vakantiesport:1: longest sentence 132 words (A2 target 18)
  warn  A2:reading:batch087-stagedagen:1: compounds of listed words (reviewer: transparent at A2?): stageboek, stagedag, stagerooster, terugkomdag
  warn  A2:reading:batch087-stagedagen:1: average sentence length 14.6 words (A2 target under 12)
  warn  A2:reading:batch087-stagedagen:1: longest sentence 121 words (A2 target 18)
  warn  A2:reading:batch087-fietsles:1: compounds of listed words (reviewer: transparent at A2?): fietsles
  warn  A2:reading:batch087-fietsles:1: average sentence length 14.9 words (A2 target under 12)
  warn  A2:reading:batch087-fietsles:1: longest sentence 99 words (A2 target 18)
  warn  A2:reading:batch087-consultatiebureau:1: slug "consultatiebureau" already used in the catalogue; make sure the topic differs
  warn  A2:reading:batch087-consultatiebureau:1: unlisted words in the text (allowed 3; the context must explain them and no question may depend on them): consultatiebureau
  warn  A2:reading:batch087-consultatiebureau:1: average sentence length 12.9 words (A2 target under 12)
  warn  A2:reading:batch087-consultatiebureau:1: longest sentence 69 words (A2 target 18)
  warn  A2:reading:batch087-werkplaatsregels:1: compounds of listed words (reviewer: transparent at A2?): meubelwerkplaats, veiligheidsschoenen, verbanddoos
  warn  A2:reading:batch087-ziekmelden:1: slug "ziekmelden" already used in the catalogue; make sure the topic differs
  warn  A2:reading:batch087-ziekmelden:1: compounds of listed words (reviewer: transparent at A2?): bedrijfsarts, tuincentrum
  warn  A2:reading:batch087-kamer-te-huur:1: compounds of listed words (reviewer: transparent at A2?): vierkante
  warn  A2:reading:batch087-kamer-te-huur:1: average sentence length 12.4 words (A2 target under 12)
  warn  A2:reading:batch087-kamer-te-huur:1: longest sentence 55 words (A2 target 18)
  warn  A2:reading:batch087-huur-omhoog:1: longest sentence 25 words (A2 target 18)
  warn  A2:reading:batch087-stagegesprek:1: compounds of listed words (reviewer: transparent at A2?): stagedag, zorgcentrum
  warn  A2:reading:batch087-retour-ontvangen:1: compounds of listed words (reviewer: transparent at A2?): retouretiket, truienhuis
  warn  A2:reading:batch087-retour-ontvangen:1: longest sentence 20 words (A2 target 18)
24 warning(s), no failures.
```

- Compounds (9 warnings): judged one by one in section 3.
- Unlisted word `consultatiebureau`: within the allowance, explained by context, used by no question; requested below.
- Slugs `consultatiebureau` and `ziekmelden`: the matches are KNM `batch006-consultatiebureau` (a fact card) and speaking `batch027-ziekmelden` (a video answer). The plan fixes these slugs as new in A2 reading, and the topics differ by part and format, so they stay.
- Sentence length (13 warnings): all are splitter artefacts. The checker splits only on `. `, `! ` and `? `, so table rows (vakantiesport 132, stagedagen 121, fietsles 99, consultatiebureau 69), the bullet list (kamer-te-huur 55) and header lines without end punctuation (schoolstraat headline 24, huur-omhoog letter header 25, retour-ontvangen e-mail header 20) merge with the next sentence. The averages for those four tables and the list come from the same merge. The real prose figures are in section 3: no sentence over 17 words, averages 6.8–9.4. Table rows and list lines are left without full stops because the app renders `text` with `white-space: pre-line`, as in batches 004 and 021. One real sentence of 19 words (the three break times in `werkplaatsregels`) was split into four short sentences before this run.

## 8. Things the reviewer should look at

- `werkplaatsregels` and `ziekmelden` change a detail of the plan for realism (no gloves at machines; company doctor instead of a doctor's note, plus the holiday rule). If the coordinator wants the plan's literal versions, those versions would teach practices that are unsafe or not allowed in the Netherlands.
- `ziekmelden`: official practice exam 1 also has company sick-call rules (structure only; the official wording was not used or seen while writing). The plan assigned this topic; the content here is written new.
- `retour-ontvangen` and catalogue `batch021-terugbrengen` share the theme of returning clothes; see section 6. The humour is in one quoted customer line and the shop's reply; it adds no hard word.
- `consultatiebureau` q1: the table shows "een paar van die afspraken" (the text says so). In reality there are more visits (for example an injection at 5 months); the question asks about the appointment one month after 5 months, which is the 6-month row, so the omission does not change the key.
- `vakantiesport` q1: on Thursday the son (judo) and the daughter (basketball) can both do sport, but not together; "samen doen" and the options make dansen the only answer. q3 relies on "tot en met vrijdag 8 oktober"; the text has no year, which keeps the weekday–date pair (2027) out of view.
- `stagedagen` q1 starts with a soft persona line ("Wout kijkt naar de week van 15 maart."); it can be dropped without changing the key.
- `kamer-te-huur` q3 uses an unnamed persona ("Een student") because all eight names already appear twice.
- `huur-omhoog` q3: huurtoeslag is a second correct route in the text and is deliberately not among the options.
- `vierkante meter` (item 9) and `zaag` (item 7): see section 3.
- Level: an unvalidated authoring target (`targetLevelValidated: false`); no exemplar comparison was made.

## 9. Requested words

- `consultatiebureau` — the everyday name of the child health clinic that every parent in the Netherlands deals with; a learner meets it in letters and at the clinic, and it is also a KNM topic. Without it the item can only say "de verpleegkundige" or "een folder voor ouders". Used once in the text, explained by context.
- `zaag` / `zagen` — needed for any workshop or DIY scene; it currently passes the gate only by accident (it normalises to "zag").
- `ziekte` — passes by the suffix rule; listing it would make the gate's acceptance deliberate.
- `beginner` — passes by the suffix rule from "beginnen"; common in course folders.

## 10. Limitations

AI editorial authoring does not validate CEFR difficulty or official exam equivalence. Organisation names were checked by web search for exact matches on 5 November 2026; a search cannot prove that no small business uses a name. Holiday dates for 2027 come from secondary holiday overviews, not from the Rijksoverheid page.
