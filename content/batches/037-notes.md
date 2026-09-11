# Batch 037: design notes (B1 Luisteren, two texts)

Batch 037 contains two original B1 listening texts in the Staatsexamen NT2 Programma I shape of `content/blueprint.md` §4.7: a printed `situation`, a narrator `intro` of 8–60 words, and one fragment per question, each fragment a continuous stretch of one two-voice conversation with its own `script`. Thirteen closed questions with three options each. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `questions[].text` and the item `text` are the exact mechanical joins of the script turns (built by a throwaway script, not typed by hand).

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id | taskType | textType | domain | Setting | Q | Spoken words | Turns | Est. length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `B1:listening:batch037-hovenier:1` | interview | beschouwend | educatie | Radio interview with Hanna, sixty-eight, who started an mbo course in gardening (hovenier) after retiring: why, the class of sixteen- to eighteen-year-olds, what she finds hardest, the one-day practical exam, her family's reactions, her advice, what the year taught her | 7 | 848 (+45 intro) | 15 | ≈6.1–6.9 min |
| 2 | `B1:listening:batch037-bouwplaats:1` | instructie | instructief | werk | Ricardo, responsible for safety on a building site, walks new worker Julio over the site: helmet and shoes, the walking routes, the evacuation siren and the weekly test, reporting a near miss with a yellow card, breaks and the smoking rule; Julio's verdict at the end | 6 | 857 (+45 intro) | 18 | ≈6.1–7.0 min |

Length estimate: 2.2–2.5 spoken words per second plus the 0.45 s stitching gap per turn from `config/voices.json`, intro included. Item `text` (fragments with speaker labels) is 863 and 875 words, under the checker's 900-word cap; headroom 37 and 25 words, so any revision that adds a sentence needs a matching cut in the same text. Both texts sit at the upper end of the blueprint's 4–7 minute window; at 2.5 words per second they run about six minutes.

## 2. Settings and why they are not duplicates

Existing B1 listening texts: werkoverleg, lekkage, vrijwilligers festival (002); buschauffeur and mantelzorg (012); logistiek (study choice at a college) and ziekenhuiskeuken (013); kinderboeken and medicijnlijst (025); the performance talk and the waste-policy evening of 036 (named in the brief). Blueprint §9 lists education and work as under-represented; neighbourhood and volunteering are not used.

1. **hovenier** — education after retirement. Closest existing text is `012-buschauffeur` (also a radio interview with a woman about a change later in life, `beschouwend`): there a shop worker of forty-three retrains for a paid job, with driving lessons, a failed theory exam and money worries. Here the guest is a pensioner in a class of teenagers; the subjects are the class dynamics, the physical side of the practical lessons, a one-day practical exam with an examiner, the family, and what learning at sixty-eight means to her. `013-logistiek` is a study-choice conversation at a college (fees, evening classes); `025-kinderboeken` is a persuasive interview about a reading method; B1 reading `034-deeltijd-hbo` (another part, in review) is a written interview about part-time higher education next to a job, not about retirement or a practical trade. No fragment is about choosing a course, money or a job; the mbo school is only the setting. Because 012 is the nearest neighbour, two question shapes that 012 uses were deliberately avoided: the family "Wie …?" item (012 q5) became an opinion item about the husband's first reaction, and the advice prompt does not repeat 012's "Wat raadt X mensen aan die …" formula.
2. **bouwplaats** — a workplace safety instruction on a building site. `013-ziekenhuiskeuken` is the other first-day instruction (hygiene, illness, breaks in a hospital kitchen); here the rules are a helmet with a production date and an impact rule, safety shoes, marked walking routes and lorries, a roll call at the assembly point, a weekly siren test, near-miss cards, the smoking place and breaks. The break times differ from 013's (ten o'clock and half past twelve here). The fire-alarm speaking task `031-brandalarm` (an office: stop working, stairs, no lift, assembly point by the tree, wait) is kept apart: the alarm fragment here is one of six, the evacuation itself is two sentences, and the tested content is the roll call by the bedrijfshulpverlener; the siren test adds a rule the office task does not have. The brief offered a construction or a logistics site; the building site was chosen because the warehouse is already the scene of `036-functioneringsgesprek` (same part, in review), `013-logistiek`'s protagonist, A2 reading `004-magazijn` and B1 writing `015-pauzerooster`, and because a helmet rule belongs on a building site. A2 reading `004-werkkleding` (a letter about new work clothing) is another part; no fragment repeats its content.

A six-word phrase scan of both items (all strings) against every string in `content/catalogue.json` and in every other batch file found only the situation formula "U hoort een interview uit een radioprogramma over …" (shared with 012 and 025). The two texts share no six-word phrase with each other.

## 3. Voice roles and speakers

Roles come from `config/voices.json`; each text uses exactly two roles, and the narrator reads the intro and the questions. No third voice.

| # | Speaker → role | Why |
| --- | --- | --- |
| 1 | Presentator → presenter; Hanna → f-older | `presenter` is the radio programme voice (as in 012 and 025). Hanna is sixty-eight: the older female voice ("older customer, grandmother"). The presenter says *je* to a studio guest, as Dutch radio does; Hanna answers in the same register and addresses listeners as *je* in the advice fragment. The name "Hanna" was proposed by the coordinator; it is not used anywhere in the catalogue or the batches, and the cast's mevrouw Bakker (about sixty-five) was not used because a radio guest is introduced by her first name. |
| 2 | Ricardo → m-adult; Julio → m-young | The coordinator's second option: the safety officer on the adult male voice ("manager, colleague") and the new worker on the young male voice, so that Karim (`m-adult`, already the warehouse worker of 013-logistiek) is not needed and the 013 pairing Hasan (`m-older`) instructing a newcomer is not repeated. Julio is the cast's young man (`config/illustration.json`); Ricardo is a name from blueprint §8, so far only a colleague in speaking cues. Both say *je*, as colleagues on a site do. |

Names: Hanna, Ricardo, Julio. Ricardo's function is described in the intro ("zorgt daar voor de veiligheid") rather than by a title, so the learner does not need the word preventiemedewerker; the bedrijfshulpverlener in the alarm fragment is introduced with a paraphrase ("de collega met het oranje hesje") and the questions use the paraphrase. No invented organisation, shop, firm or web address appears in either text: "een kantoor", "de mbo-opleiding tot hovenier", "de school", "het hoveniersbedrijf waar ik als leerling werk", "een bouwplaats", "de keet" are all generic, so there was nothing to search as a company name (checklist §13 item 1: nothing to check). No brand of helmet, shoe or tool is named.

## 4. Fragments

Spoken words exclude the speaker labels; seconds by the estimate in §1.

### Text 1: hovenier (7 fragments, 848 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Presentator 39 + Hanna 92 | 131 | 53–60 | Introduction; why: forty years in an office, the garden as outlet; after half a year of retirement she knew her own garden and nothing else (the hedge that dies on one side of the street), wanted to learn from people who know the trade; the neighbour's joke, the open day | detail | B |
| q2 | Presentator 10 + Hanna 116 | 126 | 51–58 | The class: sixteen students, most seventeen or eighteen, she the oldest; the first weeks silent, "mevrouw" and doors held open; the change at the first practical lesson (shade plants); since then they ask her advice and she asks them for computer help; "gewoon Hanna"; half their jokes | detail | A |
| q3 | Presentator 9 + Hanna 107 | 116 | 47–54 | Hardest part: not the theory (two hundred Latin plant names on cards at the kitchen table, she has the time) but the physical work: a morning of twenty-kilo tiles; the arrangement with the teacher (swap more often, more precise work such as pruning and measuring) | opinion | C |
| q4 | Presentator 9 + Hanna 111 | 120 | 49–55 | The practical exam: a drawing at eight, the garden finished by four; in those eight hours a tiled path, a border, a hedge; the examiner asks why; the path is measured, half a centimetre tolerance; last week's practice took nine hours, one hour to gain | quantity | B |
| q5 | Presentator 5 + Hanna 113 | 118 | 48–55 | Family: the husband first thought it a passing whim, now drives her on Tuesdays (too far to cycle); the daughter worried about her back and phones after every practical day; the grandson of sixteen, training as a cook, tests her on plant names on Sundays and tells his friends | opinion | C |
| q6 | Presentator 13 + Hanna 107 | 120 | 49–55 | Advice: go to an open day and ask whether they take older students; choose a trade you already know a little (something to offer, less of a stranger); her arrangement of one school day and two work days instead of four; do not wait until you are sure; she doubted a year after the open day | advice | A |
| q7 | Presentator 14 + Hanna 93 + Presentator 10 | 117 | 48–55 | What the year brought: more than plant knowledge; she learned she can still change; thirty years of the same office work she was good at, now someone who makes mistakes and does things for the first time, and that is less bad than she thought; the diploma "al moet ik het pad drie keer opnieuw leggen"; sign-off | inference | B |

### Text 2: bouwplaats (6 fragments, 857 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Ricardo 73 + Julio 13 + Ricardo 69 | 155 | 63–72 | Helmet always inside the fence, off only in the keet (office and canteen by the entrance); shoes with a steel toe and a nail-proof sole; Julio's old helmet: the date inside, five years from that date, the plastic weakens; a helmet that falls from height or takes a hard blow is handed in and replaced even without a visible crack | rule-application | C |
| q2 | Ricardo 74 + Julio 11 + Ricardo 42 | 127 | 52–59 | Walking routes between yellow lines and fences; outside them lorries and the crane; never under a hanging load; to the storage on the far side: round the back past the keet, three minutes longer; a lorry unloading on the route: wait or ask the driver, never round it outside the lines, the driver cannot see you, reversing all day | rule-application | B |
| q3 | Ricardo 88 + Julio 14 + Ricardo 37 | 139 | 57–65 | A siren that does not stop: tools down, stairs, walking route to the assembly point (the lawn by the entrance); report to the bedrijfshulpverlener in the orange vest, who ticks off who is off the site; otherwise someone goes looking for you; the weekly test: Friday at ten, ten seconds; stops, work on; continues, real | detail | A |
| q4 | Ricardo 85 + Julio 10 + Ricardo 55 | 150 | 61–70 | Near misses: a plank lands a metre from a colleague, nobody hurt; yellow cards in the keet (what, where, when), no name needed; nobody is punished; the point is to fix things before someone is hurt; three cards about the same loose stair rail, fixed; without them someone might have fallen | inference | C |
| q5 | Ricardo 64 + Julio 18 + Ricardo 59 | 141 | 58–65 | Breaks: ten o'clock a quarter of an hour, half past twelve half an hour, in the keet; smoking only in the break and only at the bench behind the keet; never on the scaffold, in the building or near the gas cylinders; coffee stays in the keet (a cup is a hand less on the ladder), a bottle of water in the jacket is always allowed; in heat an extra break at eleven | rule-application | A |
| q6 | Ricardo 27 + Julio 92 + Ricardo 26 | 145 | 59–67 | Close: the rules hang on the board in the keet; Julio's verdict: his last site was looser (helmets off in the heat), here it feels stricter and he has to get used to it, but he saw a colleague fall there and lose three months of work, so rather a few rules too many than one too few; his remaining question about the storage; Ricardo repeats the route and they walk it, then check the helmet date | opinion | B |

## 5. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring of its own fragment; every distractor is anchored in something said in that fragment and is wrong for one nameable reason.

### Text 1: hovenier

- **q1** detail, key **B** "Ze wilde het vak leren van mensen die er verstand van hebben." — "Dat wilde ik leren van mensen die het vak kennen." Paraphrase: "er verstand van hebben" ↔ "het vak kennen". A second reason she gives (the hedge question) is an example of the same point; no option covers anything else she says.
  - A "Ze had na haar pensioen geen eigen tuin meer om in te werken.": reversal; the garden was her outlet for forty years and she finally had time for it.
  - C "Haar buurvrouw wilde graag samen met haar naar school.": the neighbour's remark was a joke ("voor de grap"); she did not want to come herself.
- **q2** detail (cause), key **A** "Doordat ze in de praktijkles liet zien wat ze van planten wist." — "Dat veranderde bij de eerste praktijkles. We moesten een border beplanten, en ik wist welke planten in de schaduw kunnen staan, … Sindsdien vragen ze mij om advies".
  - B "Doordat ze hen hielp met het inleveren van opdrachten op de computer.": reversal of direction; she asks *them* for computer help.
  - C "Doordat ze in de pauze hun grappen ging begrijpen.": reversal of "de helft van hun grappen begrijp ik niet".
- **q3** opinion, key **C** "Het tillen van tegels in de praktijklessen." — "Nee, het zwaarste is het lichamelijke werk. In een praktijkles tillen we de hele ochtend tegels van twintig kilo". Paraphrase: "moeilijkst" (prompt) ↔ "zwaarste".
  - A "Het leren van tweehonderd Latijnse plantennamen.": what everyone expected to be hard; she says it goes well because she has the time.
  - B "Het precieze werk, zoals snoeien en meten.": the work she does *more* of in exchange for less lifting.
- **q4** quantity, key **B** "Acht uur." — "In die acht uur leg ik een pad van tegels, plant ik een border volgens de tekening en snoei ik een heg." Also derivable from eight o'clock to four o'clock.
  - A "Een uur.": the hour she still has to gain.
  - C "Negen uur.": last week's practice time.
- **q5** opinion (a third person's view), key **C** "Dat het snel weer over zou gaan." — "Mijn man dacht in het begin dat het een bevlieging was, iets wat na een maand over zou zijn." The word "bevlieging" is glossed in the same sentence.
  - A "Dat het te ver weg was om te fietsen.": the reason he now drives her, not his view of the plan.
  - B "Dat het te zwaar was voor haar rug.": the daughter's worry.
- **q6** advice, key **A** "Kies een vak waar je al iets van weet." — "Kies een vak dat je al een beetje kent, want dan heb je in de klas iets te bieden en voel je je minder een vreemde."
  - B "Werk dezelfde dagen als de jonge studenten.": reversal; she arranged two work days instead of four "zoals de jongeren".
  - C "Wacht met beginnen tot je zeker weet dat je het kunt.": reversal of "Wat ik niet zou doen, is wachten tot je zeker weet dat je het kunt."
- **q7** inference (function of a comparison), key **B** "Dat ze het niet erg vindt om weer een beginner te zijn." — "Nu ben ik weer iemand die fouten maakt en dingen voor het eerst doet, en dat vind ik veel minder erg dan ik had gedacht." "Beginner" is not said; the learner must read "iemand die fouten maakt en dingen voor het eerst doet" as that, against the thirty years of the same work she was good at.
  - A "Dat het werk op kantoor zwaarder was dan het werk als hovenier.": never said; the office is mentioned only as thirty years of the same work.
  - C "Dat ze liever hetzelfde werk doet dan steeds iets nieuws.": reversal of "ik heb vooral geleerd dat ik op mijn leeftijd nog kan veranderen".

### Text 2: bouwplaats

- **q1** rule-application (a helmet falls from the scaffold, no crack visible), key **C** "De helm bij Ricardo inleveren en een andere halen." — "Valt je helm van hoogte, of krijgt hij een harde klap, dan lever je hem bij mij in. Je krijgt dan een andere, ook als je geen barst ziet." Two rules are heard (the five-year date and the impact rule); the case triggers the second.
  - A "De datum aan de binnenkant controleren en de helm houden als die goed is.": applies the wrong rule; the date rule does not cancel the impact rule.
  - B "De helm gewoon blijven gebruiken, omdat er geen barst in zit.": contradicted by "ook als je geen barst ziet" and "van binnen beschadigd".
- **q2** rule-application (a lorry unloading on the route), key **B** "Wachten, of de chauffeur vragen of hij erlangs mag." — "Dan wacht je tot hij weg is, of je vraagt de chauffeur of je erlangs mag."
  - A "Buiten de gele lijnen om de vrachtwagen heen lopen.": the forbidden move ("Je loopt niet zelf buiten de lijnen om de wagen heen").
  - C "Achter de vrachtwagen langs lopen, waar de chauffeur hem ziet.": reversal; the driver cannot see you from the cab and reversing happens all day.
- **q3** detail, key **A** "Omdat die bijhoudt wie er van het terrein af is." — "Bij hem meld je je, want hij streept op zijn lijst af wie van het terrein is." Paraphrase: "bijhoudt" ↔ "streept op zijn lijst af".
  - B "Omdat die controleert of de sirene goed werkt.": the siren test, which is a separate matter and not his roll call.
  - C "Omdat die het gereedschap van de medewerkers bewaart.": anchored in "Je legt je gereedschap neer"; nobody keeps it.
- **q4** inference (function of an example), key **C** "Om te laten zien dat een melding een ongeluk kan voorkomen." — "We willen weten waar het bijna misgaat, zodat we het kunnen oplossen voordat er echt iemand gewond raakt. Vorig jaar kwamen er drie kaarten over dezelfde losse trapleuning. Toen hebben we die vastgezet. Zonder die kaarten was daar misschien iemand van de trap gevallen."
  - A "Om te laten zien dat de collega die het meldde, is gestraft.": reversal of "niemand wordt gestraft voor een melding".
  - B "Om te laten zien dat je bij een melding je naam moet opschrijven.": reversal of "Je naam hoeft er niet op".
- **q5** rule-application (a cigarette at eleven at the bench, an ordinary day), key **A** "Nee, want buiten de pauze wordt niet gerookt." — "Roken mag alleen in de pauze en alleen op de rookplek, dat is de bank achter de keet, bij de asbak." The learner combines three things: the two conditions of the smoking rule, the break times (ten and half past twelve) and the heat clause (an extra break at eleven only in heat, excluded by the prompt).
  - B "Ja, want de bank achter de keet is de rookplek.": right place, wrong time; applies only one of the two conditions.
  - C "Nee, want op het terrein wordt nergens gerookt.": over-generalises "wordt niet gerookt"; smoking is allowed at the bench during breaks.
- **q6** opinion (whole text), key **B** "Hij vindt ze streng, maar liever te veel regels dan te weinig." — "Hier voelt het strenger, en ik moet eraan wennen … Dus als ik moet kiezen, dan liever een paar regels te veel dan één te weinig."
  - A "Hij vindt de regels even los als op zijn vorige bouwplaats.": reversal; the previous site was looser, this one stricter.
  - C "Hij vindt ze te streng en wil zijn helm afzetten als het warm is.": takes his example of the old site as his wish; contradicted by his choice for more rules.

## 6. Key balance and skills

| Key | Count | Share |
| --- | --- | --- |
| A | 4 | 31% |
| B | 5 | 38% |
| C | 4 | 31% |

Per text: hovenier B A C B C A B; bouwplaats C B A C A B. No letter above 40% or below 20%; no key three times in a row; all questions have three options, as the exam does.

Skills: detail 3 (text 1 q1, q2; text 2 q3), opinion 3 (text 1 q3, q5; text 2 q6), rule-application 3 (text 2 q1, q2, q5 — the brief asked for at least two), inference 2 (text 1 q7; text 2 q4), quantity 1, advice 1. Each text ends with a whole-text item (inference on the meaning of her comparison; Julio's opinion after all the rules). Option lengths per question (words/characters, key starred): text 1 — 13/61 *12/61 9/54, *12/63 12/69 9/50, 6/48 7/42 *7/43, 2/8 *2/9 2/10, 9/37 8/35 *7/32, *9/38 7/43 11/53, 12/63 *12/55 10/57; text 2 — 14/73 11/61 *9/50, 9/51 *9/51 10/62, *10/48 8/46 8/53, 12/60 13/65 *11/59, *8/45 10/47 8/47, 11/59 *12/62 14/65. By the checker's rule the key is never the longest option; it is never the only option of its form (text 2 q5 has two "Nee" options and one "Ja", so the key is not the odd one out). Prompt words that recur only in the key: none (checked per item; text 2 q5's key was reworded from "om elf uur is er geen pauze" to avoid repeating the prompt's "om elf uur", and text 2 q6's distractor A names "de regels" so that the word is not exclusive to the key).

## 7. Language control

Figures from the build script (spoken turns only, sentences split on . ! ?):

| Text | Sentences | Average words | Longest | Over 20 words | Over 30 |
| --- | --- | --- | --- | --- | --- |
| hovenier | 62 | 13.7 | 27 | 14 | 0 |
| bouwplaats | 73 | 11.7 | 26 | 5 | 0 |

Per speaker: Hanna 47 sentences, average 15.7, 72% at twelve words or more; the presenter 7.3. Ricardo 58 sentences, average 12.1, 47% at twelve or more; Julio 10.5. Hanna's narrative sits in the upper half of the blueprint's 12–18 range; the instruction text sits at the lower edge, which is right for spoken rules (013 and 025's instruction texts are 11.9–12.6). Two sentences of 32 and 33 words were split before the final build; none exceeds 27.

- Connectors and structures in use: hovenier — want 5, omdat, dus, daarom, sindsdien, concessive al ("al had iedereen dat verwacht", "al moet ik het pad drie keer opnieuw leggen"), relative clauses ("mensen die het vak kennen", "het hoveniersbedrijf waar ik als leerling werk", "iemand die fouten maakt", "een vak dat je al een beetje kent"), an indirect question ("of ik dan niet naar school moest"), comparatives ("veel minder erg dan ik had gedacht"), a counterfactual ("in dat jaar had ik al kunnen leren"), passive ("worden online ingeleverd", "wordt nagemeten"); bouwplaats — want 3, dus 2, daarom, zodat, voordat 2, bovendien, ook als 2, inverted conditionals throughout ("Valt je helm van hoogte, … dan …", "Hoor je een sirene die niet stopt, dan …", "Meld je je niet, dan …", "Stopt hij na tien seconden, dan …", "Wil je naar de opslag …, dan …"), passives ("wordt het terrein ontruimd", "wordt niet gerookt", "wordt de hele dag achteruitgereden", "wordt gestraft"), a counterfactual ("Zonder die kaarten was daar misschien iemand van de trap gevallen"), relative clauses ("een zool waar geen spijker doorheen komt", "een situatie waarbij het net goed ging").
- Paraphrase between prompt or key and fragment: "er verstand van hebben" ↔ "het vak kennen"; "moeilijkst" ↔ "zwaarste"; "snel weer over zou gaan" ↔ "een bevlieging … na een maand over"; "weer een beginner" ↔ "iemand die fouten maakt en dingen voor het eerst doet"; "bijhoudt wie er van het terrein af is" ↔ "streept op zijn lijst af wie van het terrein is"; "een ongeluk kan voorkomen" ↔ "oplossen voordat er echt iemand gewond raakt"; "buiten de pauze" computed from "alleen in de pauze" plus the break times; "liever te veel regels dan te weinig" ↔ "een paar regels te veel dan één te weinig".
- Numbers in words: achtenzestig, veertig jaar, een half jaar, een week, zestien studenten, zeventien of achttien, de helft, tweehonderd planten, twintig kilo, vier uur, acht uur, een halve centimeter, negen uur, een uur, een maand, dinsdag, zestien, één dag, twee dagen, vier, een jaar, dertig jaar, drie keer; vijf jaar, drie minuten, vrijdag, tien uur, tien seconden, een meter, drie kaarten, twee keer, een kwartier, half één, een half uur, elf uur, één ochtend, drie maanden. No digits, years, prices or phone numbers in any turn.
- Less common words carried by context: uitlaatklep (the garden after forty years indoors), border (beplanten, planten in de schaduw), bevlieging (glossed: "iets wat na een maand over zou zijn"), overhoren (plantennamen and recepten across the table), examinator (walks around all day, asks why), keet (glossed: "het kantoor met de kantine bij de ingang"), stalen neus, hangende last (the crane), ontruimd (siren, everyone out), bedrijfshulpverlener (glossed: "de collega met het oranje hesje", with a list), bijna-ongeval (defined: "een situatie waarbij het net goed ging", then the plank example), rookplek (the bench with the ashtray).
- Register: *je* between radio presenter and guest and between colleagues on the site. No transcribed hesitations ("uh", "nou", "hè") and no "eerlijk gezegd"; the build script's filler scan hit only "weet je" inside "Dat weet je pas als je begonnen bent", which is the verb, not a filler. No quotation marks inside spoken turns (the neighbour's joke and the students' "mevrouw" are reported indirectly).
- Words that could trip a voice: "'s ochtends" appears once, mid-sentence ("om acht uur 's ochtends"); "mbo" is spoken as letters in Dutch and appears in the intro (narrator) and in two turns ("de mbo-opleiding tot hovenier", "op het mbo"); the catalogue already has "EHBO-doos" in a spoken prompt, so the round-trip check has met an abbreviation; "één" three times; "Zo'n" once; "Hanna's" only in a printed prompt read by the narrator.

## 8. Facts kept generic

Text 2 states only rules that are common practice on Dutch building sites or are presented as this site's own arrangements; no firm, certification scheme or law is named.

- Helmet: the production date is printed inside a safety helmet; the working life runs from that date and is three to five years depending on the material (five for ABS, polyamide and polycarbonate shells), and a helmet that has taken a hard blow or a fall is replaced even without visible damage because the shell can be damaged inside (checked on the web on 11 September 2026 against several Dutch safety suppliers' guidance). The script says "vijf jaar" as this site's rule and gives the impact rule as stated.
- Shoes with a steel toe cap and a penetration-resistant sole are the usual site standard (S3 class, not named).
- Marked walking routes, no walking under a suspended load, reversing lorries and the assembly point with a roll call by the bedrijfshulpverlener are standard site practice; the siren test day and time, the yellow near-miss cards, the break times, the smoking bench, the water bottle and the heat break at eleven are this site's arrangements.
- "Bijna-ongeval" is the ordinary Dutch term for a near miss; reporting without punishment ("geen schuldvraag") is the common approach, stated here as Ricardo's own policy.
- The one accident mentioned (a colleague on the previous site fell from a scaffold and was off work for three months) is one sentence, without detail, as Julio's reason for accepting the rules; the near-miss example has nobody hurt. Blueprint §9 rules out graphic accidents; this is not graphic, but see doubt 4.

Text 1 states almost no institutional facts: mbo courses in gardening (hovenier) exist for adults without an age limit, Latin plant names are part of the curriculum, and the practical part is done at a recognised company (checked on the web on 11 September 2026 on the sites of several green mbo schools). Her arrangement of one school day and two company days is presented as agreed with the school (the usual work-based pathway is three or four company days; two days a week over a school year is around the legal minimum of practical hours). The exam described (a drawing at eight, a path, a border and a hedge by four, an examiner asking why, half a centimetre tolerance) is her account of her school's practical exam, not a description of a national exam; no school, exam board or qualification name is used. Two hundred plant names, twenty-kilo tiles, sixteen students and the ages are the story's own.

## 9. Checker result

```
> batch:check
> tsx scripts/batch-check.ts content/batches/037-original.json

Checked 2 items, 13 questions. Keys: {"B":5,"A":4,"C":4}. Options: {"3":13}.
No failures, no warnings.
```

SHA-256 of `content/batches/037-original.json` at the time of writing: `74b1585fd5b9d9848d34f2ef2ae8d821d478854a5d2e1209afa93bd977cea57f`. There is no starters file (no open tasks).

## 10. Doubts for the reviewer

- **Three `rule-application` items in text 2** (q1, q2, q5) against the brief's "at least two", as in 025-medicijnlijst. The alternative for q3 was a fourth applied rule (the ten-second siren test: "Het is vrijdag tien uur, de sirene stopt na tien seconden; wat doet Julio?" → "Hij werkt door"), which is arguably the best listening item in the fragment; it was not used to keep the skill spread. Swap q3 for it if the reviewer prefers the applied item over the detail item; the fragment supports both without change.
- **Text 1 q5 labelled `opinion`.** It asks what her husband thought at first; the evidence states it literally ("dacht … dat het een bevlieging was"). It could be labelled `detail` or `person`; `opinion` was chosen because the question is about someone's judgement of the plan, and 012's family item ("Wie maakte zich zorgen …") was deliberately not repeated in shape.
- **Text 1 q7 labelled `inference`.** The key ("weer een beginner") is not said; the evidence sentence gives the two halves ("fouten maakt en dingen voor het eerst doet", "veel minder erg dan ik had gedacht"). If the reviewer reads this as stated, relabel `summary`; the option set does not change.
- **The accident sentence in text 2 q6** ("een collega van een steiger zien vallen, en die heeft drie maanden niet kunnen werken") is Julio's reason for accepting stricter rules and anchors distractor C's reversal. If the coordinator wants no injury at all, "Daar is een collega van een ladder gevallen en drie weken thuis gebleven" works with the same key and evidence; the sentence is inside the evidence quote, so the quote would change with it.
- **Hanna's work-and-school pattern** (one school day, two company days) is lighter than the standard work-based mbo pattern of three or four company days. It is presented as an arrangement with the school and is needed for distractor B of q6. If a reviewer with mbo knowledge finds it implausible for a hovenier course, "drie dagen bij het bedrijf, en niet vier" keeps the item intact (two words change in q6's script, key unaffected).
- **The five-year helmet figure** depends on the shell material (three years for polyethylene); it is stated as the site's rule ("mag een helm vijf jaar mee") and no option depends on the number. Say if a hedge is wanted ("meestal vijf jaar").
- **Length.** Both texts run close to seven minutes at the slow end of the estimate (6.1–6.9 and 6.1–7.0 with intro and gaps); fragments 47–72 s, all inside 50–190 words and the 30–75 s band. Headroom under the 900-word cap is 37 and 25 words.
- **"mbo" in spoken turns.** Spoken as letters, three occurrences including the intro. If the round trip normalises it oddly, "de opleiding tot hovenier" can replace "de mbo-opleiding tot hovenier" in q1's presenter turn, and "op het mbo" in q5 can become "op school"; no evidence quote contains the word.
- **No persona prompts beyond the speakers themselves.** Text 2's rule items put Julio or "een collega van Julio" in the case; text 1 has no third-person persona item. The official Luisteren I items mostly ask about the speakers, so this was left as is.
