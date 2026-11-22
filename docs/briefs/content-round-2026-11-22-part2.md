# Content round, 22 November 2026 — part 2 (batches 115–120)

Part 1 (`docs/briefs/content-round-2026-11-22.md`) added batches 101–114. Its sections "Rules every batch shares", "KNM rules", "Reviewer contract for this round", "After review" and "A2 rules from the gap audit" apply here unchanged.

## Why these parts

Production answers up to 22 November 2026 (read-only query), against the bank after part 1:

| Part | Items now | Most items one learner has done | Learners |
| --- | --- | --- | --- |
| A2 writing | 51 | 43 (all of the 43 then live), 34 | 17 |
| A2 speaking | 83 | 59, 22 | 16 |
| KNM | 169 | 104 (five learners: all then live), 86 | 44 |
| A2 reading | 91 | 43 | 48 |
| A2 listening | 97 | 37 | 26 |

Writing and speaking are the parts where the heaviest learner is closest to the end. KNM has by far the most learners, and five of them finish every question. After part 1, 67 of the 78 eindtermen have exactly two KNM items and 1.1.5 has one.

| Batch | Part | Items |
| --- | --- | --- |
| 115 | A2 writing | 10 new |
| 116 | A2 speaking | 12 new |
| 117 | KNM theme 1 (werk en inkomen) | 13 new |
| 118 | KNM theme 4 (gezondheid) and 3.2 (energie) | 13 new |
| 119 | KNM theme 6 (instanties) and 3.3.1 | 13 new |
| 120 | KNM theme 7 (staatsinrichting, grondrechten) and 3.1.1, 3.1.2 | 13 new |

## 115 — A2 writing, 10 new

Names: Esmee, Hamza, Jasper, Tess, Umar, Vera, Wessel, Hind (unused in `content/catalogue.json` on 22 November 2026). Types: email 3, form 3, wijkkrant 2, picture-note 2. Registers: formal 5, informal 3, wijkkrant neutral. Shared writing rules: as for 107 in part 1 (`rubric: a2-schrijven`, model lengths, `sample` missing exactly one criterion, verbatim `quotes` with one null, bilingual criteria, starters in `115-starters.json`, at least one "Bedenk zelf ..." per email, no prompt sentence copied into the model). Slugs must not repeat any existing id.

1. `kind-ziek-school`, email, opleiding, formal. To the teacher of your son (group 5): he is ill with a fever and stays home on Thursday and Friday; ask what homework he can do at home; say when he comes back (Monday, if he is better); Bedenk zelf: one thing the teacher should know (for example that he misses the swimming lesson). Distinct from `ouderavond-afmelden`.
2. `bestelling-kapot`, email, winkels-diensten, formal. To the customer service of an invented webshop (check the name): the set of four plates you ordered arrived, two are broken; say what you ordered and when it arrived; say what you want (new plates or money back: Bedenk zelf); ask how to send the broken plates back. Distinct from `pakket-niet-ontvangen` (nothing arrived) and `klacht-winkel` (form).
3. `dienst-ruilen`, email, werk, informal. To your colleague Hamza: you want to swap your Saturday shift (a family day: Bedenk zelf what) for his Tuesday shift; say which Saturday and which Tuesday; say the team leader agrees if you both ask; ask him to answer before Friday.
4. `reparatie-melden`, form, wonen-buurt. Repair form of an invented housing organisation (check the name). Personal fields (naam, adres, postcode, telefoonnummer, e-mailadres) and open fields: "Wat is er kapot?", "In welke kamer?", "Wanneer bent u thuis?". The form has one picture the answers must use: a bathroom with a shower head that drips and a cracked tile below it. Criteria name the shower and the tile. Distinct from `raam-kapot` (email) and `huismeester-briefje` (note).
5. `computercursus`, form, opleiding. Registration form of the library for a free computer course for beginners. Personal fields and open fields: "Welke cursus kiest u?" (choice of three in the form text: e-mail, internet bankieren, DigiD — the learner names one), "Op welke dag kunt u?", "Wat wilt u leren?" (one short sentence). No pictures. VOCAB: "bankieren" check; if unlisted, write "geld regelen op internet".
6. `hulp-op-school`, form, opleiding. Form of a primary school asking parents for help: which activity (lezen met kinderen, schoolreis, sportdag), which day(s), how the school can reach you. No pictures.
7. `mijn-stad`, wijkkrant, vrije-tijd-familie. The neighbourhood paper asks: in which town or village did you grow up; what was nice there; what do you miss from there, or not. Opening line "Dit is mijn tekst over de stad van vroeger." Keep it light: invented answers are fine; never ask about why someone moved.
8. `mijn-feest`, wijkkrant, vrije-tijd-familie. A favourite celebration (a birthday, a national day, a family party: any kind): which party; what you do and eat; who comes. Opening line "Dit is mijn tekst over mijn favoriete feest." No religious practice beyond naming a party.
9. `schoonmaker-briefje`, picture-note, wonen-buurt, formal ("Geachte mevrouw"). A note for the cleaner who comes while you are at work. Three pictures, objects only, no people, no text: (1) a dirty window with streaks; (2) an open oven with a dark baking tray; (3) a full laundry basket next to a washing machine. Criteria: clean the windows, clean the oven, wash the clothes; thank her. Alts name the objects.
10. `logee-briefje`, picture-note, wonen-buurt, informal ("Hoi Tess"). Your friend Tess stays in your flat while you are away for the weekend. Three pictures, objects only: (1) a key on a hook next to a front door; (2) folded towels on a made bed; (3) a full fridge with milk, cheese and fruit. Criteria: where the spare key is, the towels are for her, she may eat from the fridge. Distinct from `buurman-vakantie` and `oppas-briefje`: check their pictures and make the three facts different.

## 116 — A2 speaking, 12 new

Names: Leyla, Marco, Reza, Tijmen, Anouk, Carmen, Derya, Guus, Hester. Three of each task type (blueprint §4.3), `speakingSeconds: 40`, `prepSeconds: 10`, `rubric: a2-spreken`, a model of 25–45 words, criteria that mirror the type and are each asked for in the prompt (the app hides criteria until review), starters in `116-starters.json`. A person drawn in more than one picture keeps three traits copied verbatim into every brief. Video-answer items have `cueAudio` text (the question the speaker asks, with a voice role) and one still of the speaker; picture-choose has two pictures, picture-sequence three. Slugs must not repeat an existing id; the list of existing speaking slugs is in `content/catalogue.json` (part 1 printed it on 22 November).

Video answer:
1. `bibliotheek-boek`: a librarian (woman, about 50) asks: "Wat voor boek zoekt u? Is het voor uzelf of voor een kind?" Criteria: the kind of book; for whom; one more detail (why, or how long you want to borrow it).
2. `sportschool-intake`: a trainer at a sports school asks: "Hoe vaak wilt u sporten? En waarom wilt u gaan sporten?" Criteria: how often; why; one more detail.
3. `apotheek-ophalen`: the pharmacy assistant says your new medicine is ready tomorrow and asks: "Hoe laat komt u het ophalen? En komt u zelf of iemand anders?" Criteria: time; who; one more detail. Distinct from `apotheek` (picture-describe).

Picture describe:
4. `ziekenhuis-bezoek`: a hospital room where a woman visits her father; she brings flowers and a bag of grapes. Prompt: say what you see; name two things people often bring on a visit; say what you would bring. Calm, no illness shown.
5. `sneeuw-straat`: a street in winter with snow; a man clears the pavement with a shovel, children with a sledge. Prompt: say what you see; name two things you wear in winter; say what you think of snow.
6. `kinderboerderij`: a children's farm with goats and chickens, a parent with a small child feeding a goat. Prompt: say what you see; name two animals; say if you would go there and why.

Picture choose:
7. `werk-dag-nacht`: picture 1 a factory worker in daylight, picture 2 the same kind of work at night under lamps. Which shift do you prefer and why; say something about the other picture.
8. `markt-supermarkt`: picture 1 an outdoor market with vegetable stalls, picture 2 a supermarket aisle with a trolley. Where do you prefer to shop and why; say something about the other picture.
9. `boek-papier-tablet`: picture 1 a person reading a paper book on a sofa, picture 2 the same person reading on a tablet (blank screen). Which do you prefer and why; say something about the other picture.

Picture sequence (one criterion per picture; the same person in all three):
10. `telefoon-kapot`: Derya drops her phone on the street (the screen cracks); she brings it to a repair shop; she gets it back whole and smiles.
11. `huisarts-apotheek`: Guus feels ill at home; he talks with the GP; he collects medicine at the pharmacy counter.
12. `zwemdiploma`: Reza's daughter has a swimming lesson; she swims in the exam with other children; the family celebrates with the diploma (a blank paper) and a cake.

## KNM batches 117–120

Each batch adds a third item to the eindtermen listed, one item per eindterm. Before choosing a fact, read the existing KNM items for that eindterm in `content/catalogue.json` (and the paraphrase in `docs/research/knm-coverage-2026-11-22.md`). The new item must test a different fact from both existing items, not the same fact asked another way. Prefer facts that the eindterm paraphrase names directly and that do not change every year. Everything in part 1's "KNM rules" applies (sources opened today and quoted, `sourceReviewedAt: "2026-11-22"`, three options, every distractor false in the Netherlands, conditions in the prompt, at most two or three yes/no items, no behaviour questions, balanced keys, one picture that shows the setting and never the answer).

#### 117 — KNM batch F: theme 1, 13 new

Eindtermen: 1.1.1, 1.1.2, 1.1.3, 1.1.4, 1.1.5 (it has one item; its first second item was rejected in part 1 because the source did not state the fact — read `content/reviews/108-review.md` first), 1.1.6, 1.1.7, 1.1.8, 1.2.1, 1.2.2, 1.2.3, 1.3.1, 1.4.1. Names: Imane, Jelle, Karin, Orlando, Sevda, Thomas, Ufuk. Domain `werk` except where the subject is clearly another.

#### 118 — KNM batch G: theme 4 and 3.2, 13 new

Eindtermen: 4.1.1, 4.1.2, 4.1.3, 4.1.4, 4.2.1, 4.3.1, 4.3.2, 4.4.2, 4.4.3, 4.4.4, 4.5.1, 3.2.1, 3.2.2. Names: Valerie, Yasmina, Zakaria, Arjan, Bo, Cas, Demi. Domain `gezondheid` (4.x) and `wonen-buurt` (3.2). No graphic illness; pictures stay calm.

#### 119 — KNM batch H: theme 6 and 3.3.1, 13 new

Eindtermen: 6.1.1, 6.1.2, 6.2.2, 6.2.3, 6.2.4, 6.3.1, 6.3.2, 6.3.3, 6.4.1, 6.5.1, 6.5.2, 6.6.1, 3.3.1. Names: Linda, Paula, Pim, Quinten, Xander, Gerben, Otto. Domain `instanties` (6.x) and `wonen-buurt` (3.3.1). Avoid asylum procedures and individual legal advice; amounts that change yearly only with "re-check yearly" in the notes.

#### 120 — KNM batch I: theme 7, 3.1.1 and 3.1.2, 13 new

Eindtermen: 7.1.1, 7.1.2, 7.1.3, 7.2.1, 7.2.2, 7.2.3, 7.2.4, 7.2.5, 7.2.6, 7.2.7, 7.2.8, 3.1.1, 3.1.2. Names: Priscilla, Hester, Zoë, Ugo, Rania. Domain by subject (7.x mostly `instanties`; 3.1 `wonen-buurt`). No party politics or opinions about religion; test only the rule or right the source states.

## Reviewers

As in part 1: a separate Sonnet reviewer per batch, blind meaning packet first (`npm run batch:review-source`), then `NNN-proposed.json` and `reviews/NNN-review.json` (contract v2). KNM reviewers open every source themselves today. Writing and speaking reviewers check that the prompt asks for every criterion in its own words (criteria are hidden until review), that pictures can show every fact the criteria need, and the A2 word gate.

## KNM batches 121–122 (added after 115–120)

After 117–120 the bank has 220 KNM items. Eighteen eindtermen still had only two items: the whole of theme 8 (onderwijs en opvoeding, missing from the 117–120 plan), 2.1.1, 3.1.3, 4.1.3 (its third item was rejected in 118), 1.1.5, and theme 5, whose four eindtermen have only the eight items from batch 110. The rules of "KNM batches 117–120" apply.

#### 121 — KNM batch J: theme 8, 2.1.1 and 3.1.3, 12 new

Eindtermen, one new item each: 8.1.1, 8.1.2, 8.1.4, 8.1.5, 8.2.1, 8.2.2, 8.2.3, 8.3.1, 8.3.2, 8.3.3, 2.1.1, 3.1.3. Names: Wilma, Renske, Nadir, Babette, Ercan, Feline, Hanan. Domain `opleiding` (8.x), by subject for 2.1.1 (omgangsvormen: a stated custom or rule, never a cultural joke or stereotype) and `wonen-buurt` (3.1.3). Children's topics stay calm; 8.2.3 (help with upbringing) names where help is, never a crisis scene.

#### 122 — KNM batch K: theme 5, 4.1.3 and 1.1.5, 10 new

Eindtermen: 5.1.1 (two new), 5.1.2 (two new), 5.2.1 (two new), 5.2.2 (two new), 4.1.3 (one; the rejected `tandarts-poetstips` in content/reviews/118-review.md shows what not to do: test a stated rule about the tandarts in the Netherlands, not a health tip), 1.1.5 (one; read content/reviews/108-review.md and 117-review.md, and test only what an official page states). Names: Ilias, Jorien, Nabil, Olaf, Pien, Rachida, Sjoerd. Theme 5 facts come from rijksoverheid.nl, government.nl, the Canon van Nederland (canonvannederland.nl), the Nationaal Archief, the 4 en 5 mei comité, NS or 9292 pages, and test what a learner of the KNM exam is expected to know (major events and dates of Dutch history named in the eindterm, the provinces and big cities, the main rivers, travelling by public transport). No party politics; wars and persecution are written calmly and factually.
