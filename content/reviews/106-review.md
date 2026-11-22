# Review 106: A2 reading, twelve new items (22 November 2026)

## Meaning first (blind packet)

Blind meaning-first pass on `content/batches/106-meaning-packet.json`, initial packet_sha256 `fd08fd1c0cf104c258debc9131c7a1754c377759df7f73cf6a49f4b05c4ad069`. Only title, situation and text were visible; no questions, options, keys, notes or plan assignment.

- parkeren-centrum: the council announces that paid street parking in the centre runs until nine in the evening from Monday 1 March (a Monday in 2027), because evenings are busier. Rates (first 30 minutes free, 3 euro per hour, garage 2 euro per hour, 9 euro daily cap) and the Sunday exception are what a driver needs. Coherent, ordinary. Risk: two rate systems, but both serve the decision where to park. Rating 5.
- banenmarkt: neighbourhood paper invites job seekers to a job fair on Saturday 20 March (a Saturday in 2027). Entry free, 25 firms, ten-minute talks, bring three paper CVs, volunteer CV help 11-13, play corner. Everything serves a job seeker's preparation. Ordinary. Rating 5.
- ijsbaan: Saturday 12 December to Sunday 3 January (both correct weekdays), opening hours, early closing on 24 and 31 December, prices by age, skate hire, Wednesday-afternoon child price. A usual municipal winter attraction. Risk: "woensdagmiddag" has no hours, acceptable. Ordinary. Rating 5.
- werkrooster-winkel: a week schedule for three colleagues (Kwame, Dilan, Samira) with early and late shifts, the shop hours, and the swap rule. Shifts fit the opening hours (early opens at 8, late closes after 19.00). The Saturday rule "altijd twee mensen" matches the table. Ordinary and realistic. Rating 5.
- buslijn-weekend: line 12 times for four stops, first bus per day, a bus every 30 minutes after, last bus from the station, holiday rule. Complete for a passenger planning a weekend trip. Ordinary. Rating 5.
- tweedehandswinkel: opening hours and drop-off hours differ, large items are collected at home only on Thursday for 15 euro, closed over Christmas, card only. Realistic for a charity shop. The collection day sits inside the drop-off days, no conflict. Ordinary. Rating 5.
- open-dag-college: open day Saturday 6 February (a Saturday in 2027), four trial lessons at two times each with rooms, soup at 12.30, no parking, take the bus. A plausible folder. Risk: "bus 12" echoes the bus item (different town, harmless). Ordinary. Rating 5.
- werk-via-bureau: a temporary-work agency explains five steps (sign up, interview, contract, Friday pay, sick call before 9.00). Each step serves a newcomer. Ordinary. Risk: invented agency name needs a web check. Rating 5.
- energie-besparen: a council leaflet lists four small habits with approximate yearly savings and offers a free home visit with LED lamps. Realistic purpose; the amounts are marked "ongeveer". Ordinary. Rating 4 (the amounts should not be mistaken for exact official figures; they are labelled approximate).
- huiswerkklas: a library notice for a homework class for ages 10-14: days, hours, group size, prices for one or two days, free first lesson, laptop loan, how to register. Coherent and practical. Ordinary. Rating 5.
- klusjes-huis: a handyman advert opens with a light joke (lamp on the cupboard for a year; a leftover screw is free), then prices, a discount from three jobs, free travel, opening hours and phone. The joke is mild and the prices are usable. The one light-humour item. Rating 5.
- digid-brief: a letter to Kwame after requesting a DigiD: the activation code is in the letter, must be used within a number of days, one new code on the website if lost, new request when late, warning not to share the code with callers. Coherent. Risk: "In deze brief staat uw code. Uw code staat hieronder." repeats itself and the "21 dagen" and "one new code" claims must match digid.nl today (checked below). Rating 4 pending the fact check.

No topic jumps, no stocktaking, no messages to someone beside the writer. Blind tone: 11 ordinary, 1 light humour (klusjes-huis).

Update after the full pass: the blind rating for digid-brief is now 5 (facts verified on digid.nl, redundant sentence removed, situation line no longer leaks the purpose key). Final proposed-packet sha256 `da5056f832c3b7cf6bf6172c9c4d98cd50eabc7797de42c96370a12118a92a2f`.

## Verdicts

Proposed file `content/batches/106-proposed.json`, sha256 `258a219d89f4ea726208ade39acb7247ca3f0bf8f17379946a1e2a7ef2caa7dd`.

| id | verdict | level verdict | reason |
| --- | --- | --- | --- |
| batch106-parkeren-centrum | pass (edited) | comparable | Krant item, about 120 words, average sentence about 9 words |
| batch106-banenmarkt | pass | comparable | Krant item, 109 words, mostly short main clauses |
| batch106-ijsbaan | pass (edited) | comparable | Krant item, 122 words |
| batch106-werkrooster-winkel | pass (edited) | comparable | Rooster, table as lines plus four rule sentences |
| batch106-buslijn-weekend | pass | comparable | Rooster with stop table |
| batch106-tweedehandswinkel | pass (edited) | comparable | Rooster with a two-column hours table plus rules |
| batch106-open-dag-college | pass (edited) | comparable | Folder with a four-row table |
| batch106-werk-via-bureau | pass (edited) | comparable | Folder with a five-step table, 129 words |
| batch106-energie-besparen | pass (edited) | comparable | Folder with a four-row table of approximate savings |
| batch106-huiswerkklas | pass (edited) | comparable | Advertentie, 119 words in short question-and-answer lines |
| batch106-klusjes-huis | pass (edited) | comparable | Advertentie with a price list and a 10 percent rule, 118 words |
| batch106-digid-brief | pass (edited) | comparable | Brief, 113 words in short sentences |

Counts: 12 pass (10 with reviewer edits), 0 revise, 0 reject. Tone: 11 ordinary, 1 light humour (klusjes-huis).

## Edits

- parkeren-centrum, `text`: "Veel winkels en restaurants zijn 's avonds lang open." (Relative clause with 'die' is outside the A2 subordinate-clause list; plain main clause.)
- parkeren-centrum, `questions.q1.prompt`: "Dmitri parkeert op zaterdag 6 maart om half acht" (Without a date the question is ambiguous: before 1 March the evening was already free after six. 6 March 2027 is a Saturday.)
- parkeren-centrum, `questions.q2.options`: "{"A": "3 euro.", "B": "9 euro.", "C": "14 euro.", "D": "21 euro."}" ('7 euro' was not anchored in the text; '3 euro' is the street hourly price misread as a day price.)
- parkeren-centrum, `questions.q2.explanation`: "3 euro is de prijs per uur op straat, en 21 euro is zeven uur op straat." (Old explanation named 21 euro as the street price; the free first half hour makes that inexact. Explanation now covers the new option.)
- ijsbaan, `text`: "sluit de ijsbaan al om 17.00 uur" (A newspaper item does not speak as 'wij'; keeps register consistent.)
- ijsbaan, `questions.q2.evidence`: "sluit de ijsbaan al om 17.00 uur" (Evidence follows the text.)
- tweedehandswinkel, `text`: "Wilt u spullen weggeven? Breng ze dan naar onze winkel." (Relative clause outside the A2 list; plain question.)
- tweedehandswinkel, `questions.q1.options`: "{"A": "Op zaterdag voor 16.00 uur naar de winkel komen.", "B": "Bellen voor een afspraak op zaterdag.", "C": "Op vrijdag na 15.00 uur naar de winkel komen.", "D" (Key was the only 'bellen' option and the longest. Now two 'komen' and two 'bellen' options; the wrong 'bellen' day (Saturday) is anchored in the pick-up rule.)
- tweedehandswinkel, `questions.q1.explanation`: "Spullen brengen kan niet op zaterdag, en op vrijdag alleen tot 15.00 uur. Een afspraak voor ophalen kan alleen voor donderdag." (Explanation covers the new distractors.)
- open-dag-college, `text`: "Auto's – 10.30 en 13.30 uur – B 12" ('techniek' was the one unlisted word; 'auto's' is plain A1.)
- open-dag-college, `questions.q1.evidence`: "Auto's – 10.30 en 13.30 uur – B 12" (Evidence follows the table.)
- open-dag-college, `text`: "Kom met bus 7." (Bus 12 is the line of the buslijn-weekend item; avoids a false link inside a set.)
- open-dag-college, `questions.q2.options`: "{"A": "Mensen moeten zich aanmelden voor de open dag.", "B": "Mensen kunnen soep eten in de kantine van de school.", "C": "Mensen kunnen op zaterdag kijken en e" (Old A (aanmelden voor de opleiding op 6 februari) was not clearly false. New A reverses 'U hoeft zich niet aan te melden'.)
- open-dag-college, `questions.q2.explanation`: "De folder nodigt mensen uit voor een open dag. Zij moeten zich niet aanmelden voor de open dag." (Explanation covers the new distractor A; old text 'U hoeft zich niet aan te melden' kept.)
- werk-via-bureau, `text`: "1 – U meldt zich aan op onze website." (Correct reflexive form for the polite 'u'.)
- energie-besparen, `text`: "De bedragen zijn niet precies." ('De bedragen zijn ongeveer.' is not a Dutch sentence.)
- energie-besparen, `text`: "Een vrijwilliger komt gratis bij u thuis en geeft u tips." (Embedded question and 'hij of zij' removed; plain sentence.)
- energie-besparen, `questions.q1.prompt`: "Henrik doet twee tips uit de folder. Samen betaalt hij daarmee ongeveer 50 euro per jaar minder. Welke twee tips zijn dat?" (The forced refusals ('wil niet korter douchen') are removed; the question now asks for the one pair that adds up to 50.)
- energie-besparen, `questions.q1.options`: "{"A": "Korter douchen en de gordijnen dicht doen.", "B": "De verwarming lager zetten en korter douchen.", "C": "De verwarming lager zetten en LED-lampen gebruik" (Four pairs with sums 70, 150, 130 and 50; only the key adds up to 50.)
- energie-besparen, `questions.q1.explanation`: "De andere paren zijn samen ongeveer 70, 150 en 130 euro." (Explanation matches the new options.)
- energie-besparen, `questions.q2.options`: "{"A": "Inwoners kunnen LED-lampen kopen bij de gemeente.", "B": "Inwoners kunnen vrijwilliger worden voor hulp thuis.", "C": "Inwoners lezen hoe zij minder voor" (Key was the longest option and echoed the title; options now parallel in form and length.)
- huiswerkklas, `text`: "Wilt u uw kind aanmelden?" ('opgeven' also means 'give up'; 'aanmelden' is the clear A2 verb.)
- huiswerkklas, `questions.q2.prompt`: "Hoe meldt Marit haar zoon aan?" (Follows the text.)
- klusjes-huis, `text`: "Staat uw lamp al een jaar op de kast?" (Relative clause in the headline; a question keeps the light joke.)
- klusjes-huis, `text`: "Staat de kast nog in de doos?" (Avoids repeating the headline.)
- klusjes-huis, `text`: "Klaar? Dan nemen wij ook de doos mee." ('schroef' and 'overblijven' are B1 words and only a side joke; plain A2 line with the same light tone.)
- digid-brief, `situation`: "Kwame krijgt een brief van DigiD." (The situation gave away the key of q2 (Waarom krijgt Kwame deze brief?).)
- digid-brief, `text`: "In deze brief staat uw code." (Redundant: nothing follows below.)
- digid-brief, `text`: "Ook niet als iemand belt en zegt dat hij van DigiD is." (Relative clause replaced by 'als'.)
- digid-brief, `questions.q3.evidence`: "Ook niet als iemand belt en zegt dat hij van DigiD is." (Evidence follows the text.)
- digid-brief, `questions.q1.options`: "{"A": "Een nieuwe code vragen op de website.", "B": "Iemand van DigiD bellen en de code vragen.", "C": "Niets doen, want de code werkt altijd."}" (Key copied the text's wording ('één keer', 'nieuwe code vragen') and was the longest; now a paraphrase of equal length.)
- digid-brief, `questions.q3.options`: "{"A": "De code vertellen, want de man werkt bij DigiD.", "B": "De code vertellen als de man zijn naam zegt.", "C": "Een deel van de code vertellen.", "D": "De c" (The key was the only option with 'geven' instead of 'vertellen'; all four options are now parallel.)
- digid-brief, `questions.q3.explanation`: "In de brief staat dat u de code aan niemand geeft, ook niet als iemand zegt dat hij van DigiD is." (Matches the text.)
- huiswerkklas, `questions.q2.explanation`: "die al zijn aangemeld" (Matches the verb used in the text.)
- klusjes-huis, `questions.q2.explanation`: "Lucas werkt van maandag tot en met vrijdag tot 21.00 uur" (Plain wording instead of the compound 'doordeweeks'.)
- werkrooster-winkel, `questions.q1.prompt`: "een feest" (Plain word; 'verjaardagsfeest' is only a compound of A1 words, but the party reason does not need it.)

## Words

Zero unlisted words remain in the proposed texts. Replaced: techniek (auto's), schroef and overblijven, opgeven (aanmelden), verjaardagsfeest in a prompt. Relative clauses with "die" removed in five texts. Hard-in-context but listed: loonstrook (explained in its row), cv, bankrekeningnummer; no key depends on them.

## Rejected items

None.

## Facts and names

DigiD (opened 22 Nov 2026, digid.nl): code valid 21 days, one new code, expired means new application; the letter matches. Invented names (Werkbrug, De Kersenhof, Vakcollege Oosterkade, Zolderkamer, Schroef en Plug) found nowhere; parklaanklas.nl does not resolve. Calendar dates verified.

## Diversity and set notes

Five task types, seven domains, no clash with existing A2 reading titles. buslijn-weekend q1 is a two-step item, slightly harder than its siblings; use it in a later position of a set. Names appear at most twice each.

## Media notes

Reading only; no media.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. DigiD facts may change.
