# Batch 036: design notes (B1 Luisteren, two texts)

Batch 036 contains two original B1 listening texts in the Staatsexamen NT2 Programma I shape of `content/blueprint.md` §4.7: a printed `situation`, a narrator `intro` of 8–60 words, and one fragment per question, each fragment a continuous stretch of one two-voice conversation with its own `script`. Thirteen closed questions with three options each. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and `questions[].text` and the item `text` are the exact mechanical joins of the script turns that the audio pipeline will speak.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

## 1. Batch matrix

| # | id | taskType | textType | domain | Setting | Q | Spoken words | Turns | Est. length |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `B1:listening:batch036-functioneringsgesprek:1` | gesprek | beschouwend | werk | A performance talk (functioneringsgesprek) in the warehouse of a webwinkel between Sabrina, the team leader, and Modibo, a magazijnmedewerker of almost a year: what the talk is (no score, no contract), his own view, what went well (few errors, helps new colleagues), the point to improve (report problems, also when solved), his wish for the heftruck course, the roster and his Tuesday language class, four agreements for the coming half year, his reflection | 7 | 859 (+45 intro) | 26 | ≈6.2–7.0 min |
| 2 | `B1:listening:batch036-afvalbeleid:1` | voorlichting | descriptief | overig | An information evening in the gemeentehuis of the fictional gemeente Rietburg about the new waste policy from January: why (half of the residual waste could have been separated), what goes where (gft, a new paper container, PMD bags, rest), the collection days (green weekly, grey in even weeks, blue every four weeks), the milieustraat and grofvuil pickup, the costs (a fixed part plus a fee per emptying of the grey container), where to ask; meneer De Vries asks questions and gives his verdict | 6 | 853 (+45 intro) | 16 | ≈6.1–6.9 min |

Length estimate: 2.2–2.5 spoken words per second plus the 0.45 s stitching gap per turn from `config/voices.json`, intro included. Item `text` (fragments with speaker labels) is 885 and 879 words, under the checker's 900-word cap; the three-word label "Meneer De Vries" costs text 2 fifteen words of budget over its five turns. Headroom: 15 and 21 words, so any revision that adds a sentence needs a matching cut in the same text.

## 2. Settings and why they are not duplicates

Existing B1 listening texts: werkoverleg, lekkage, vrijwilligers festival (batch 002), buschauffeur (radio interview, career change) and mantelzorg (information evening on care for a parent, batch 012), logistiek (study choice at a college) and ziekenhuiskeuken (first day in a hospital kitchen, batch 013), kinderboeken (radio interview on reading) and medicijnlijst (pharmacy instruction, batch 025); in the parallel batch 037 (not yet reviewed) hovenier (radio interview, learning after retirement) and bouwplaats (safety rules for a new worker). The brief asked to avoid the settings of 012, 013 and 025 and the older items; neither text here is a radio interview, a college, a hospital, a pharmacy, a care evening or a first-day instruction.

1. **functioneringsgesprek** — the work domain, which blueprint §9 lists as under-represented and names explicitly ("a performance talk"); the official 2025 Luisteren I list contains a performance review (`docs/research/exam-blueprints-2026-09-10.md`). It is the batch's `beschouwend` text: the two speakers look back over half a year, weigh what went well against what did not, and agree on the next half year. Against the catalogue: 013-logistiek has Karim, a warehouse worker, at a college choosing a course (different task, place and speakers); 002-werkoverleg is a team meeting about a changed procedure; A2 listening 005-training announces a forklift safety training (an A2 two-turn announcement of a date, not a certificate course with figures). The intro places the warehouse at a webwinkel rather than a groothandel, so that it does not repeat 013's "magazijn van een groothandel". The improvement point (report problems even when solved), the roster rule and the four agreements do not occur anywhere in the catalogue.
2. **afvalbeleid** — instanties and public life (`overig`), a gemeente information evening in the `voorlichting` shape of 012-mantelzorg (a speaker plus one questioner from the audience) but `descriptief`: the speaker describes a new arrangement rather than instructing an individual, and the questions are what/when/how much. Waste appears in other parts, never in B1 listening: A2 writing 003-container (a wrongly delivered container), KNM card gft (one sentence), A2 speaking 009-afval (a picture), B1 writing 028-afvalpas (one gap sentence), B1 speaking 031-afvalcontainers (which container, put it out the evening before). Parts never share a set; the facts are consistent with 031 (the container goes out the evening before) and nothing here contradicts the KNM card. The diftar system (a fee per emptying), the even/odd weeks, the milieustraat pass and the afvalcoaches are new content.

A six-word phrase scan of both items (all strings) against every string in `content/catalogue.json` and in every other batch file found only formula phrases: "duidelijk maken met het voorbeeld van" (the official prompt form, used in reading batches 010, 011, 024, 034, 035), "u hoort een deel van een" (the 012 intro form), "gaan in de groene container en" and "aan het eind van de avond" (031 speaking model and starters), "hij vindt het te ingewikkeld en" (a 025 distractor; the distractor here was rewritten so that it no longer repeats that pattern). The two texts share no six-word phrase with each other.

## 3. Voice roles and speakers

Roles come from `config/voices.json`; each text uses exactly two roles, and the narrator reads the intro and the questions. No third voice.

| # | Speaker → role | Why |
| --- | --- | --- |
| 1 | Sabrina → f-adult; Modibo → m-young | `f-adult` is the manager/teacher voice (Esmee); Sabrina is the cast's woman in her thirties, here the team leader, as the intro says. Modibo is the cast's young man, hence `m-young` (Nick). They say *je* to each other, as colleagues in a Dutch warehouse do; the app shows the names, and the intro states who is the team leader. |
| 2 | Presentator → presenter; Meneer De Vries → m-older | The brief fixed both: `presenter` (Peter) is the voice for "uitleg by an organisation", and the label "Presentator" is the one the catalogue uses for the person leading a programme or evening; the intro calls the speaker "een medewerker van de gemeente". Meneer De Vries is the cast's man of about sixty (`config/illustration.json`), hence `m-older` (Arjen). Both say *u*. |

Names: Sabrina, Modibo and Julio are blueprint §8 / cast names (Sabrina and Julio already work in a warehouse in B1 writing 015-gemiste-werkdag, so the casting is consistent); meneer De Vries was set by the brief, and his daughter, who helped him with a website in 025, installs the app here. No invented company, shop, opleider or web address appears in text 1 ("een webwinkel", "een opleider hier in de buurt", "de app" are generic). Text 2 reuses the fictional **gemeente Rietburg** of A2 listening 005-parkeervergunning and 022-paspoort-klaar; re-checked on the web on 11 September 2026: "Rietburg" is a castle ruin near Rhodt unter Rietburg in Germany and is not a Dutch gemeente, place or firm. No street, address, phone number, price in digits or brand appears in either text.

## 4. Fragments

Spoken words exclude the speaker labels; seconds by the estimate in §1.

### Text 1: functioneringsgesprek (7 fragments, 859 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Sabrina 65 + Modibo 14 + Sabrina 20 + Modibo 34 | 133 | 55–62 | What the talk is: not a beoordelingsgesprek (no score, not about the contract), looking back and forward together; Modibo expected a list of his mistakes; his own view: good, he reaches his number of orders per hour almost every day, only the Tuesday evening shift is difficult | opinion | B |
| q2 | Sabrina 74 + Modibo 26 + Sabrina 23 | 123 | 51–57 | What went well: he reaches his numbers, but more important are the few errors (one in three hundred against one in a hundred for the team); colleagues say he helps new people unasked; Julio learned the scanner in a day; why Modibo does that; "snel zijn kan iedereen leren; zorgvuldig werken en oog hebben voor anderen, dat is zeldzamer" | detail | A |
| q3 | Sabrina 84 + Modibo 17 + Sabrina 27 | 128 | 53–60 | The point to improve: the damaged pallet he sorted out cleverly, which she heard about a week later from the driver; he solves things and tells nobody, so she cannot phone the supplier and the customer waits; his reason (did not want to bother her; at his previous job asking meant you could not do it); here it is the other way round: report, one minute in the app, also when already solved | inference | C |
| q4 | Sabrina 9 + Modibo 31 + Sabrina 66 + Modibo 8 + Sabrina 11 | 125 | 52–59 | His wish: the heftruckcertificaat (waits a quarter of an hour for pallets from the top shelf; more varied work); two forklift drivers retire in spring; the course takes two days, the exam is a week later on a separate day; the company pays course and exam, hours count as work time, one free retake; first group in March | quantity | A |
| q5 | Modibo 34 + Sabrina 67 + Modibo 10 + Sabrina 12 | 123 | 51–58 | The roster: Tuesday evening language class since September, once a month rostered until ten; the roster is made on the fifteenth of the month before, so preferences go into the app before that day; one fixed evening a week nearly always works except in busy months; if Tuesday is rostered anyway she says so at once and he swaps; tell the teacher when it fails | rule-application | B |
| q6 | Sabrina 73 + Modibo 15 + Sabrina 25 | 113 | 47–53 | The four agreements for the verslag: report every problem the same day; she enrols him for the March course; once he has the certificate, one day a week at goods receiving where the lorries are unloaded; next talk in June; why not now (everything there is done with the forklift) | sequence | C |
| q7 | Sabrina 14 + Modibo 72 + Sabrina 24 + Modibo 4 | 114 | 47–54 | His reflection: nervous all week because at his old job you only heard something when it went wrong; she named the good things first, he now understands the reporting point, he has concrete things to work on (the app, the course, goods receiving), more motivation than in the morning; the verslag comes by mail tomorrow | summary | A |

### Text 2: afvalbeleid (6 fragments, 853 spoken words)

| Fragment | Turns (words) | Spoken | ≈ s | Content | Skill | Key |
| --- | --- | --- | --- | --- | --- | --- |
| q1 | Presentator 124 | 124 | 50–57 | Welcome and the why: about two hundred kilos of residual waste per inhabitant a year, more than half of which did not belong there (a sorting analysis); burning is expensive, separated waste costs the gemeente much less; therefore separating is made easier and the grey container is paid per emptying; the four topics of the evening | detail | C |
| q2 | Presentator 76 + De Vries 11 + Presentator 41 | 128 | 53–60 | What goes where: gft unchanged (also meat and fish); new blue container for paper and cardboard, the bundles at the kerb disappear (unusable after rain); plastic, tins and drink cartons stay in the transparent bags, free at the supermarket or gemeentehuis; rest (nappies, broken toys); the blue container is delivered in December, refusal via the website, then the paper bank at the supermarket as now | detail | B |
| q3 | Presentator 107 + De Vries 11 + Presentator 18 | 136 | 56–63 | Collection days: one fixed day per street, Tuesday in the centre and surrounding wijken, Thursday in the villages; green every week, grey only in even weeks, blue once every four weeks on a Friday; out before half past seven with the lid closed and the handle to the road, back in the same day; the evening before from eight is allowed, earlier not | rule-application | A |
| q4 | Presentator 102 + De Vries 13 + Presentator 38 | 153 | 63–71 | The milieustraat at the edge of town: bulky items, appliances, paint, wood, rubble; open Tuesday to Saturday nine to five, closed Monday; entry only with the afvalpas, six free visits a year, then ten euros; Saturday queues to the road, come on a weekday; no car: grofvuil is collected at home by appointment via the website, out before eight, fifteen euros a time | advice | B |
| q5 | Presentator 110 + De Vries 16 + Presentator 28 | 154 | 63–71 | Costs: now three hundred and fifty euros for every household; from January a fixed part of two hundred and forty euros (green, blue and bags included) plus five euros per emptying of the grey container; every two weeks is twenty-six times, so a hundred and thirty euros; ten times is fifty euros, two hundred and ninety in total; neighbours' bags in his container: you pay per emptying, not per kilo, so an extra bag costs nothing | quantity | C |
| q6 | Presentator 84 + De Vries 63 + Presentator 11 | 158 | 65–73 | Where to ask: the app and website (calendar and what-goes-where list), phone on weekdays nine to five (number on the folder), afvalcoaches who visit for free, meant to help, not to punish; his verdict: he came thinking the gemeente just wants more money, no longer thinks so because he will pay less if he separates well, but the even and odd weeks will go wrong; calendar on the fridge, his daughter installs the app | opinion | B |

## 5. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring of its own fragment; every distractor is anchored in something said in that fragment and is wrong for one nameable reason. Options within a question share one frame (all "Goed/Niet goed, …", all "Dat hij …", all "Dat …", all instructions, all time phrases, all "Modibo …", all "Omdat …", all "Het gaat voortaan …", all noun phrases, all "Ga op …, dan …", all "Hij …"), so no option stands out by form.

### Text 1: functioneringsgesprek

- **q1** opinion (his own view), key **B** "Goed, maar de avonddienst op dinsdag vindt hij lastig." — "Goed, denk ik. In het begin was alles nieuw, maar nu haal ik mijn aantal orders per uur bijna elke dag. Alleen de avonddienst op dinsdag is lastig; daar kom ik straks op terug." Paraphrase: "is lastig" ↔ "vindt hij lastig". The intro announces that the talk covers what goes well and what could be better, so the question deliberately asks something the intro does not give away.
  - A "Goed, maar zijn aantal orders per uur haalt hij nog niet.": reversal of "nu haal ik mijn aantal orders per uur bijna elke dag".
  - C "Niet goed, want in het begin heeft hij veel fouten gemaakt.": takes his fear of "een lijst met mijn fouten" for a fact; he says only that everything was new at the start, and his verdict is "Goed".
- **q2** detail, key **A** "Dat hij zorgvuldig werkt en nieuwe collega's helpt." — "want snel zijn kan iedereen leren; zorgvuldig werken en oog hebben voor anderen, dat is zeldzamer." (with "belangrijker vind ik dat je weinig fouten maakt" and "je nieuwe mensen helpt zonder dat iemand het vraagt" earlier in the fragment). Paraphrase: "oog hebben voor anderen" ↔ "nieuwe collega's helpt".
  - B "Dat hij meer orders per uur haalt dan de rest van het team.": she says only that he reaches his numbers; the team comparison (one in a hundred against one in three hundred) is about errors, and speed is what "iedereen kan leren".
  - C "Dat hij als enige in het team de scanner goed begrijpt.": distortion of Julio's remark; Julio understands the scanner too, thanks to Modibo.
- **q3** inference (function of an example, the official "Wat wil X duidelijk maken met het voorbeeld van …" form), key **C** "Dat Modibo een probleem moet melden, ook als hij het zelf oplost." — "je lost iets zelf op en zegt het tegen niemand. Dat lijkt handig, maar ik kan de leverancier pas bellen als ik het weet, en de klant wachtte intussen op zijn spullen." The last turn adds "ook als je het al hebt opgelost"; the listener must combine the example, the general pattern and the rule.
  - A "Dat Modibo de beschadigde dozen niet zelf apart had moeten zetten.": reversal of "Slim opgelost, daar gaat het niet om."
  - B "Dat de chauffeur problemen met een levering eerder moet doorgeven.": misattribution; the driver is the one who told her, the point is about Modibo.
- **q4** quantity (two figures combined), key **A** "Drie dagen." — "De cursus duurt twee dagen, bij een opleider hier in de buurt. Het examen is een week later, op een aparte dag": two course days plus one exam day.
  - B "Twee dagen.": the course alone.
  - C "Een week.": the interval between course and exam.
- **q5** rule-application (persona: Modibo wants no Tuesday evening shift in May), key **B** "Vóór de vijftiende april zijn voorkeur in de app aangeven." — "Ik maak het rooster altijd op de vijftiende van de maand ervoor, dus geef vóór die dag in de app aan op welke avonden je liever niet werkt." The listener must apply "de maand ervoor" to May.
  - A "Vóór de vijftiende mei een kort berichtje aan Sabrina sturen.": wrong month and wrong channel (the app, not a message).
  - C "Op de eerste dinsdag van mei ruilen met een collega.": the fallback for when the Tuesday is rostered anyway, not the first step.
- **q6** sequence, key **C** "Zodra hij het certificaat heeft." — "zodra je het certificaat hebt, werk je één dag per week bij de goederenontvangst, waar de vrachtwagens worden gelost".
  - A "Meteen na dit functioneringsgesprek.": Modibo's own proposal ("Ik kan er toch nu al beginnen?"), which Sabrina rejects.
  - B "Na het volgende gesprek in juni.": June is agreement four, the next talk.
- **q7** summary (whole talk, through Modibo's own recap), key **A** "Modibo doet het goed en weet nu waar hij aan gaat werken." — "Je noemde eerst wat goed gaat, en het punt over het melden begrijp ik nu; ik dacht altijd dat ik je daarmee stoorde. En ik heb concrete dingen om aan te werken: de app, de cursus, de ontvangst."
  - B "Modibo maakt te veel fouten en moet daarom een cursus volgen.": reversal; the course is his own wish and q2 established the few errors.
  - C "Modibo heeft geen zin meer in het werk en zoekt een andere baan.": reversal of "Ik heb nu meer zin in mijn werk dan vanochtend."

### Text 2: afvalbeleid

- **q1** detail, key **C** "Omdat de helft van het restafval gescheiden had kunnen worden." — "Wij hebben dat afval laten onderzoeken, en meer dan de helft hoorde er niet in: groente- en fruitresten, papier, plastic verpakkingen." Paraphrase: "hoorde er niet in" ↔ "gescheiden had kunnen worden".
  - A "Omdat het verbranden van restafval vanaf januari niet meer mag.": burning continues; it is "duur", not forbidden.
  - B "Omdat gescheiden afval de gemeente meer geld kost dan restafval.": reversal of "dat kost de gemeente veel minder".
- **q2** detail, key **B** "Het gaat voortaan in een eigen container." — "Nieuw is de blauwe container voor papier en karton. De bundels aan de straat verdwijnen, want bij regen was het papier onbruikbaar."
  - A "Het gaat voortaan samen met het plastic in een zak.": the transparent bags are for plastic, tins and drink cartons.
  - C "Het gaat voortaan naar de bak bij de supermarkt.": only for whoever refuses the container, "zoals nu"; not the change.
- **q3** rule-application (persona: the centre, a Tuesday in an odd week; two rules combined), key **A** "Alleen de groene container." — "De groene container legen wij elke week, want etensresten gaan snel stinken. De grijze container legen wij alleen in de even weken; in de oneven weken blijft hij dus binnen."
  - B "De groene en de grijze container.": the even-week case.
  - C "Alleen de grijze container.": reversal of both rules.
- **q4** advice, key **B** "Ga op een doordeweekse dag, dan is er geen rij." — "Op zaterdag staat er vaak een rij tot op de weg. Kunt u doordeweeks komen, doe dat dan; op een dinsdagochtend rijdt u zo door." Paraphrase: "rijdt u zo door" ↔ "geen rij".
  - A "Ga op zaterdag, dan is het minder druk.": reversal of the Saturday queue.
  - C "Ga op maandag, dan is de milieustraat het langst open.": reversal of "op maandag is hij dicht".
- **q5** quantity (two figures combined), key **C** "Driehonderdzeventig euro." — "Het vaste deel is tweehonderdveertig euro per jaar. Daarvoor legen wij de groene en de blauwe container en halen wij de zakken op. Het tweede deel betaalt u per keer dat de grijze container wordt geleegd: vijf euro per keer. Zet u hem elke twee weken buiten, dan is dat zesentwintig keer, dus honderddertig euro." The listener adds the fixed part to the variable part the speaker has already computed; the speaker models the same addition for the ten-times case ("in totaal tweehonderdnegentig euro"), and the total is consistent with "wie niets verandert, betaalt iets meer dan nu" (three hundred and fifty now).
  - A "Honderddertig euro.": the variable part alone.
  - B "Tweehonderdveertig euro.": the fixed part alone.
- **q6** opinion (whole evening), key **B** "Hij verwacht minder te betalen, maar vindt de ophaaldagen lastig." — "Dat denk ik nu niet meer, want als ik goed scheid, betaal ik minder. Alleen die even en oneven weken, daar ga ik fouten mee maken, dat weet ik nu al." Paraphrase: "die even en oneven weken" ↔ "de ophaaldagen".
  - A "Hij denkt nog steeds dat de gemeente er vooral meer geld mee wil verdienen.": his thought before the evening, explicitly abandoned ("Dat denk ik nu niet meer").
  - C "Hij vindt het beleid goed, maar hij wil de app niet gebruiken.": contradicted by "de app laat ik door mijn dochter installeren".

## 6. Key balance and skills

| Key | Count | Share |
| --- | --- | --- |
| A | 4 | 31% |
| B | 5 | 38% |
| C | 4 | 31% |

Per text: functioneringsgesprek B A C A B C A; afvalbeleid C B A B C B. Across the batch in order: BACABCA CBABCB, no letter three times in a row, no letter above 40% or below 20%; all questions have three options, as the exam does.

Skills: opinion 2 (text 1 q1, text 2 q6), detail 3, inference 1, quantity 2 (both combine two figures: course days plus exam day; fixed part plus variable part), rule-application 2 (text 1 q5, text 2 q3; the brief asked for one in text 2), sequence 1, advice 1, summary 1. Each text ends with a whole-text item (summary, opinion). Option lengths per question (words/characters, key starred): text 1 — 11/57 *9/54 11/59, *8/51 13/59 11/55, 11/66 10/66 *12/65, *2/11 2/11 2/9, 10/61 *10/58 10/52, 4/36 6/32 *5/32, *12/57 11/61 13/64; text 2 — 10/63 10/64 *10/62, 10/51 *7/41 9/48, *4/27 6/33 4/27, 8/39 *10/47 10/54, 2/19 2/24 *2/25, 14/75 *10/65 12/62. By the checker's rule (longest by more than two characters) the key is never the longest option; by exact count it is one character over in text 2 q5 ("Driehonderdzeventig euro." against "Tweehonderdveertig euro."), which number words cannot avoid. No prompt word recurs only in the key (checked mechanically for words of four letters or more).

## 7. Language control

Figures from the build script (spoken turns only, sentences split on . ! ?):

| Text | Sentences | Average words | Longest | Over 20 words |
| --- | --- | --- | --- | --- |
| functioneringsgesprek | 72 | 11.9 | 28 | 13 |
| afvalbeleid | 71 | 12.0 | 29 | 6 |

Per speaker: Sabrina 43 sentences, average 13.8, 56% at twelve words or more, longest 28; Modibo 29 sentences, average 9.1 (a young employee answering, and the persona of the rule item). Presentator 59 sentences, average 12.5, 56% at twelve or more, longest 29; meneer De Vries 9.5. Both texts sit at the low end of the blueprint's 12–18 average, which is written for reading, and inside the spoken target of 8–20 words per sentence that the 025 notes and review used; no sentence exceeds 29, so none reaches the 30-word ceiling (one 30-word sentence was split before the final build).

- Connectors and structures in use: functioneringsgesprek — want 4, omdat, dus 2, zodra, zodat, behalve, toen, sinds, intussen, conditionals with inversion ("Zak je, dan mag je één keer gratis opnieuw", "Staat je dinsdag toch in het rooster, dan zeg ik dat meteen", "klopt er iets niet, dan pas ik het aan"), "als"-conditionals ("als je het op tijd doorgeeft", "ook als je het al hebt opgelost"), relative clauses ("de orders die jij klaarzet", "de goederenontvangst, waar de vrachtwagens worden gelost"), a passive ("worden gelost"); afvalbeleid — want 5, omdat 2, dus 5, daarom, voortaan, daarna, inverted conditionals throughout ("Zet u hem elke twee weken buiten, dan is dat zesentwintig keer", "Zet u hem tien keer buiten, dan …", "Wilt u hem niet, omdat u geen plek heeft, meld dat dan", "Belt u liever, dan kan dat", "Kunt u doordeweeks komen, doe dat dan"), passives ("wordt verbrand", "wordt opnieuw gebruikt", "wordt geleegd"), relative clauses ("alles wat niet in een container past", "afvalcoaches, die bij u langskomen", "het enige wat telt").
- Paraphrase between prompt or key and fragment: "vindt hij lastig" ↔ "is lastig"; "nieuwe collega's helpt" ↔ "oog hebben voor anderen" / "nieuwe mensen helpt"; "ook als hij het zelf oplost" ↔ "ook als je het al hebt opgelost"; "drie dagen" computed from "twee dagen" plus "een aparte dag"; "vóór de vijftiende april" computed from "de vijftiende van de maand ervoor" for May; "gescheiden had kunnen worden" ↔ "hoorde er niet in"; "een eigen container" ↔ "de blauwe container voor papier en karton"; "alleen de groene" derived from two rules; "geen rij" ↔ "rijdt u zo door"; "driehonderdzeventig" computed from "tweehonderdveertig" plus "honderddertig"; "de ophaaldagen" ↔ "die even en oneven weken".
- Numbers in words: bijna een jaar, een half jaar, één op de honderd, één op de driehonderd, één dag, één minuut, een week, een kwartier, twee heftruckchauffeurs, twee dagen, één keer, één keer per maand, tot tien uur, de vijftiende, één vaste avond, één dag per week; tweehonderd kilo, de helft, vier dingen, één vaste dag, elke week, even en oneven weken, één keer per vier weken, half acht, acht uur, negen tot vijf, zes keer, tien euro, vijftien euro, driehonderdvijftig euro, tweehonderdveertig euro, vijf euro, elke twee weken, zesentwintig keer, honderddertig euro, tien keer, vijftig euro, tweehonderdnegentig euro, negen en vijf. No digits, years, phone numbers or addresses in any turn. "'s ochtends" and "'s avonds" occur only mid-sentence.
- Less common words carried by context: functioneringsgesprek and beoordelingsgesprek (defined against each other in the first turn), pallet and stelling (the forklift context), heftruckcertificaat (a course with an exam), goederenontvangst ("waar de vrachtwagens worden gelost"), verslag (written and mailed), bezinken ("zodat de theorie kan bezinken"); restafval, gft (spelled out as "groente, fruit en tuinafval"), drankpakken, milieustraat (what you bring there), afvalpas ("u komt er alleen in met"), grof vuil ("een oude bank"), afvalstoffenheffing ("uit twee delen"), lediging avoided in favour of "per keer dat de grijze container wordt geleegd", afvalcoaches ("die bij u langskomen").
- Register: *je* between team leader and employee; *u* from the gemeente speaker to the room and from meneer De Vries. No transcribed hesitations ("uh", "nou", "hè", "tja") and no "eerlijk gezegd"; "gewoon" occurs once in its full sense ("de gemeente wil gewoon meer geld"). No quotation marks inside spoken turns; the abbreviation gft is spelled the way it is said. Colons and semicolons mark pauses.
- Words that could trip a voice: "gft" (three letters, read letter by letter in Dutch; expected), "één" and "vóór" with accents, "'s ochtends" / "'s avonds" never sentence-initial, "webwinkel" only in the intro. The round-trip check may normalise "één" to "1"; expected.

## 8. Facts kept generic

Text 2 presents the arrangements as those of one fictional gemeente ("wij", "onze gemeente", "vanaf januari") and states only two things that hold nationally:

- Meat and fish remains belong in gft: Milieu Centraal's afvalscheidingswijzer says so (checked on the web on 11 September 2026). Paper bundles, PMD bags (plastic verpakkingen, blik en drankpakken), a blue paper container, nappies and broken toys as rest: standard Dutch practice, presented as this gemeente's arrangement.
- A waste levy with a fixed part plus a fee per emptying of the residual-waste container (diftar) is a real Dutch system used by many gemeenten (checked on the web on 11 September 2026: for example a fixed annual part of about two hundred and fifty euros plus about seven euros per emptying in one gemeente, two hundred plus a small fee per emptying and per kilo in another). The figures here (three hundred and fifty now; two hundred and forty fixed plus five euros per emptying) sit inside that range and are this gemeente's own.
- Everything else is this gemeente's own rule and is worded as such: the two hundred kilos per inhabitant and the sorting result ("Wij hebben dat afval laten onderzoeken"), the even/odd-week schedule and the Tuesday/Thursday days, half past seven and the evening before from eight, the milieustraat hours, the six free visits and the ten-euro fee, the fifteen-euro grofvuil pickup, the free PMD bags at the supermarket, the December delivery of the blue container, the phone hours, the afvalcoaches (a service several gemeenten offer). "Dat kost de gemeente veel minder" was chosen over an absolute claim so that the text does not assert that separated waste costs nothing.

Text 1 states no institutional facts: that a functioneringsgesprek gives no score and looks forward together, unlike a beoordelingsgesprek, is the common Dutch HR distinction, stated as what this talk is; the course format (two days, an exam a week later, one free retake, paid by the employer, hours as work time), the roster cut-off on the fifteenth via an app, and the error rates are the story's own. No legal claim is made about forklift certificates (no "verplicht", no law).

## 9. Checker result

```
> batch:check
> tsx scripts/batch-check.ts content/batches/036-original.json

Checked 2 items, 13 questions. Keys: {"B":5,"A":4,"C":4}. Options: {"3":13}.
No failures, no warnings.
```

SHA-256 of `content/batches/036-original.json` at the time of writing: `60e4eace4cbc35e3ab1a034f6bf260306633b1649733f22f035a2ddc9b2fe353`. There is no starters file (no open tasks).

## 10. Doubts for the reviewer

- **Text 1 q1 labelled `opinion`.** "Hoe gaat het volgens Modibo zelf?" asks for his own assessment, which he states almost literally ("Goed, denk ik … Alleen de avonddienst op dinsdag is lastig"); a strict reader may call it `detail`. It was aimed at his view because the narrator's intro already tells the listener that the talk covers what goes well and what could be better, which would have made a "what is this talk about" item trivial. Relabel to `detail` if preferred; the text keeps `summary` (q7) as its whole-text item.
- **Text 1 q3 labelled `inference`.** The official "function of an example" form; the key needs the example, the generalisation ("zo gaat het vaker") and the rule in the last turn ("ook als je het al hebt opgelost") combined, and no single sentence says "Modibo moet melden, ook als hij het oplost". The 025 review relabelled a meaning-of-expression item to `detail` because the evidence sentence stated the answer; here it does not, but the decision is the reviewer's.
- **Text 1 q6 labelled `sequence`.** "Wanneer gaat Modibo bij de goederenontvangst werken?" with the key "Zodra hij het certificaat heeft" orders two agreements relative to each other; `time-place` would also fit.
- **Text 2 q5 arithmetic.** The key requires adding two hundred and forty (fixed) to a hundred and thirty (the speaker's own computation for twenty-six emptyings). The speaker models the same addition for the ten-times case, and the total agrees with "iets meer dan nu"; still, it is the heaviest item of the batch. If the reviewer wants pure retrieval, the speaker could state the every-two-weeks total ("dus driehonderdzeventig euro in totaal") and the prompt could ask for the ten-times total instead (the fragment already states two hundred and ninety); that would turn the item into a one-figure lookup.
- **Text 2 q3 persona condition.** "Meneer De Vries woont in het centrum" is needed because the fragment gives Tuesday for the centre and Thursday for the villages; the intro says only that he is a resident. If the reviewer finds the villages a needless complication, "in de dorpen de donderdag" can be cut (five words) and the prompt shortened to "Het is dinsdag in een oneven week".
- **Register of text 1.** Sabrina and Modibo say *je* to each other, as is usual between a team leader and a warehouse employee; a reviewer who wants *u* from Modibo should say so, but it would sound stiff in this setting.
- **Text type of text 1.** `beschouwend` was chosen because the talk weighs the past half year and ends in a reflection; a reviewer who reads a functioneringsgesprek as `descriptief` (what happens next) can relabel without touching the text. Text 2 is `descriptief` (what changes, when, how much) rather than `instructief`, which 012-mantelzorg already covers for the voorlichting type.
- **Meneer De Vries's daughter.** She helped him with the pharmacy website in 025 and installs the app here; kept for cast continuity (`config/illustration.json` asks for consistent links). The distractor about her was written so that it does not repeat the 025 pattern ("te ingewikkeld … dochter").
- **Cross-part echoes.** A2 listening 005-training (a forklift safety training on a Thursday) and B1 writing 015-gemiste-werkdag (Sabrina shows a new colleague the warehouse, Julio as a colleague) share the warehouse cast; B1 speaking 031-afvalcontainers shares the "container out the evening before" rule; parts never share a set, and the tested points differ.
- **Length.** Texts run about six to seven minutes with the intro and turn gaps (6.2–7.0 and 6.1–6.9), inside the 4–7 minute window; fragments 47–73 s. The 900-word cap leaves 15 and 21 words of headroom, so any added sentence needs an offsetting cut in the same text.
- **Speaker label "Presentator" for a gemeente employee.** Set by the brief and matching the catalogue's use of the label for whoever leads a programme or an evening; the intro identifies the speaker as "een medewerker van de gemeente", so the learner is not led to expect a radio host.
