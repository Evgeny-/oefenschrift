# Batch 080: new A1 speaking picture tasks

Twelve new `A1` speaking items for the A1 rebuild of 28 October 2026 (`docs/briefs/a1-rebuild-2026-10-28.md`, section "080 — speaking"). None replaces an existing ID. Every item uses `exam: a1-practice`, `taskType: picture-describe`, `rubric: a1-spreken`, `speakingSeconds: 20`, `prepSeconds: 0`, `status: draft` and `targetLevelValidated: false`. The items are local foundation practice. They make no official exam-format claim and no validated CEFR difficulty claim.

The author read the rebuild plan, `docs/briefs/author.md`, blueprint §3, §4.0 (with the simplified A1 profile), §7 and §8, the review rubric, `config/a1-vocabulary.json`, `config/illustration.json`, the "Optional sentence starters" section of the content workflow, and batch 073 as a format example. All wording, scenes and starters were written here. There are no organisations, brands, addresses or KNM facts, so no external research was needed.

## Prompt shape

Each prompt follows the blueprint formula: one or two short situation sentences, "Kijk naar het plaatje.", then two short questions, one per goal. Criteria stay hidden until review, so the prompt asks for each goal itself. The questions are direct main clauses ("Waar zit de pleister?"). Indirect commands such as "Zeg waar de pleister zit" would need a subordinate clause, which the simplified profile forbids. The situation names a real listener who cannot see the scene, usually a caller, and a reason to ask. It never supplies a picture fact.

Criteria follow one pattern: the question, then "U zegt: …" with the expected content, plus an accepted variant when there is room. The language criterion is the blueprint's wording: "De ander begrijpt u. Kleine fouten zijn oké." / "The other person understands you. Small mistakes are okay."

## Tone per item

| Item | Tone |
| --- | --- |
| `voetbal-straat` | ordinary |
| `ballonnen` | ordinary |
| `pleister` | ordinary |
| `halte-regen` | ordinary |
| `bakker-brood` | ordinary |
| `kat-fruitschaal` | **lightly funny**: a cat sleeps curled up in the fruit bowl |
| `picknick-park` | ordinary |
| `vuilniszak` | ordinary |
| `docent-bord` | ordinary |
| `lang-brood` | **lightly funny**: two friends carry one bread as long as a car |
| `apotheek-tas` | ordinary |
| `bij-de-kassa` | ordinary |

There are two funny items, as planned. Each joke is one familiar object or animal in a surprising place or size, and needs only list words ("kat", "fruit", "appels", "lang brood").

## People and visual traits

Names come from the batch pool (Wim, Ilse, Tariq, Mira, Joost, Femke). Each name appears in at most two exercises. Only Tariq appears twice, as an unseen caller in two different sets.

| Person | Items | Role | Drawn? | Visual traits (brief) |
| --- | --- | --- | --- | --- |
| Mira | `pleister` | learner's daughter | yes | girl of about six, short curly black hair, terracotta dress |
| Joost | `bakker-brood` | learner's colleague at the bakery | yes | young man, short red hair, round glasses, white apron |
| Wim | `bij-de-kassa` | neighbour | yes | man of about seventy, short white beard, dusty blue cap, mustard yellow cardigan |
| Femke | `voetbal-straat` | neighbour, caller | no | — |
| Tariq | `halte-regen`, `docent-bord` | friend / classmate, caller | no | — |
| Ilse | `kat-fruitschaal` | friend whose home the learner visits | no | — |

Unnamed roles: oma (`pleister`), uw zus (`ballonnen`, `lang-brood`, different sets), de baas (`bakker-brood`), uw zoon (`kat-fruitschaal`, `vuilniszak`, different sets), opa (`picknick-park`), uw broer (`apotheek-tas`), Wim's vrouw (`bij-de-kassa`), and drawn unnamed figures: two children (`voetbal-straat`), three adults at the stop (`halte-regen`), a doctor (`pleister`), a family of three (`picknick-park`), a woman with the bag (`vuilniszak`), a teacher and four students (`docent-bord`), two friends (`lang-brood`), the learner's mother (`apotheek-tas`: woman of about sixty, short grey hair, round glasses, terracotta coat), a cashier (`bij-de-kassa`). No drawn person appears in two items, so no traits need to match across briefs. No voice names or older recurring cast appear.

## Prompt, criteria, sample and model

Word counts split on whitespace. All prompt sentences have at most eight words. All models are two present-tense main clauses of at most seven words each. Each sample leaves out exactly one content goal (`null` quote). Its other quotes are verbatim substrings, and the language quote is the whole sample.

| Item | Domain | Listener and reason | Goal 1 | Goal 2 | Prompt words | Model (words) | Sample omits | Beginner error in sample |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- |
| `voetbal-straat` | wonen-buurt | Neighbour Femke looks for her children | count: twee | action: ze spelen voetbal | 21 | "Ik zie twee kinderen. Ze spelen voetbal op straat." (9) | 1, count | no article, singular verb: "Kinderen speelt voetbal." |
| `ballonnen` | vrije-tijd-familie | Sister brings more balloons and wants to match | count: vijf | colour: geel | 24 | "Er zijn al vijf ballonnen. Ze zijn allemaal geel." (9) | 2, colour | singular verb and noun: "Er is vijf ballon." |
| `pleister` | gezondheid | Oma calls while daughter is at the doctor | place: op haar arm | colour: blauw | 23 | "Mira heeft een pleister op haar arm. De pleister is blauw." (11) | 2, colour | "is" for "zit", missing "haar": "De pleister is op arm." |
| `halte-regen` | vervoer | Friend Tariq is coming to the same stop (busy? umbrella?) | count: drie | weather: het regent / regen | 21 | "Ik zie drie mensen. Het regent, neem een paraplu mee." (10) | 1, count | noun for verb: "Het is regen." |
| `bakker-brood` | werk | The boss calls the learner at work | place: in de keuken | object: brood | 22 | "Joost is in de keuken. Hij heeft brood in zijn handen." (11) | 1, place | verb form: "Joost heb brood." |
| `kat-fruitschaal` | wonen-buurt | Son asks about the animal at Ilse's home | animal: een kat | place: in het fruit / tussen de appels | 21 | "Ik zie een kat. De kat slaapt tussen de appels." (10) | 1, animal | verb ending and de/het: "Hij slaap in de fruit." |
| `picknick-park` | vrije-tijd-familie | Opa calls the family during a meal out | place: in het park | food: broodjes / brood | 18 | "We zijn in het park. We eten broodjes op een deken." (11) | 1, place | missing plural: "We eten broodje." |
| `vuilniszak` | wonen-buurt | Son will take the rubbish away and asks which bag and where | colour: groen | place: bij / naast de deur | 23 | "De zak is groen. Hij staat buiten naast de deur." (10) | 2, place | -e on predicate adjective: "De zak is groene." |
| `docent-bord` | opleiding | Classmate Tariq is late and asks about the lesson | count: vier | action: ze schrijft op het bord | 21 | "Ik zie vier studenten. De docent schrijft op het bord." (10) | 1, count | verb ending and de/het: "De docent schrijf op de bord." |
| `lang-brood` | vrije-tijd-familie | Sister cooks for the guests: how many, what do they bring | count: twee | object: een brood | 21 | "Er komen twee mensen. Ze brengen een heel lang brood mee." (11) | 1, count | singular verb, "groot" for "lang": "Ze brengt een groot brood mee." |
| `apotheek-tas` | gezondheid | Brother asks while the learner waits in the car | place: bij de apotheek | object: een kleine tas / zak | 26 | "Mama is bij de apotheek. Ze heeft een kleine tas." (9) | 1, place | missing articles: "Ze heeft kleine tas in hand." |
| `bij-de-kassa` | winkels-diensten | Wim's wife asks while the learner shops with him | purchase: melk of brood | payment: met de pinpas | 20 | "Wim koopt melk en brood. Hij betaalt met zijn pinpas." (10) | 1, purchase | verb ending, no article: "Wim betaal met pinpas." |

Criteria lengths are 5 to 12 words. Picture alts are 6 to 14 words. Titles have 2 to 4 words and name only the setting or the caller, never a tested fact. Counts in the batch are two, three, four and five, each drawn as clearly separate people or objects. Colours are blue, yellow and green; grey and black are avoided because the house palette uses charcoal and could make them ambiguous.

## Pictures

Each item has one `drawing` brief with Dutch alt (`size: still`). These are open picture tasks, so picture and alt show the facts the goals ask for. Every brief ends with "No text, letters, numerals, signs, clock faces or logos." Rendering risks for the media reviewer:

- `voetbal-straat`: exactly two children and one ball; the action must read as playing football.
- `ballonnen`: exactly five separate balloons, all the same mustard yellow; no candles (no numerals).
- `pleister`: the plaster must be clearly blue and clearly on the arm; no injury detail.
- `halte-regen`: exactly three adults; rain lines must be obvious; no route numbers on the shelter.
- `bakker-brood`: the room must read as a (bakery) kitchen, not a shop; the loaves must read as bread.
- `kat-fruitschaal`: the cat must lie inside the bowl among the fruit, asleep.
- `picknick-park`: trees and grass must say park; the food must read as sandwiches.
- `vuilniszak`: the bag must read as clearly green (not grey) and stand right next to the door.
- `docent-bord`: exactly four students; the board must show wavy lines, never letters.
- `lang-brood`: exactly two people sharing one continuous very long bread.
- `apotheek-tas`: without a green cross or text the pharmacy must still read through the medicine boxes on the shelves (see doubts).
- `bij-de-kassa`: exactly milk and bread on the belt; the card and card machine carry no markings or digits.

## Starters

`080-starters.json` has three incomplete starters per item, in criteria order, each with "…". The first two begin the sentence for each goal ("Ik zie … kinderen.", "De zak is …", "Hij betaalt …") without a count, colour, place, object or action. A referent in a starter ("De pleister", "De ballonnen", "De docent") comes from the printed question. The third starter is a phone opening or a neutral "Ik zie …" / "Het is …" to support speaking understandably; it adds no goal. The checker verified every starter word against the list.

## Proposed sets of three (easiest first)

| Set | Order | Item | Domain | Setting | People |
| --- | --- | --- | --- | --- | --- |
| A, Tellen en kleuren | 1 | `voetbal-straat` | wonen-buurt | street | Femke, two children |
| | 2 | `ballonnen` | vrije-tijd-familie | party table | uw zus |
| | 3 | `pleister` | gezondheid | doctor's room | Mira, oma, doctor |
| B, Waar is het? | 1 | `halte-regen` | vervoer | bus stop | Tariq, three adults |
| | 2 | `bakker-brood` | werk | bakery kitchen | Joost, de baas |
| | 3 | `kat-fruitschaal` (funny) | wonen-buurt | friend's kitchen table | Ilse, uw zoon |
| C, Thuis en buiten | 1 | `picknick-park` | vrije-tijd-familie | park | gezin, opa |
| | 2 | `vuilniszak` | wonen-buurt | front door | a woman, uw zoon |
| | 3 | `docent-bord` | opleiding | classroom | Tariq, teacher, four students |
| D, Even weg | 1 | `lang-brood` (funny) | vrije-tijd-familie | pavement | two friends, uw zus |
| | 2 | `apotheek-tas` | gezondheid | pharmacy front | uw moeder, uw broer |
| | 3 | `bij-de-kassa` | winkels-diensten | supermarket checkout | Wim, his wife |

Each set has three different settings and people; the two funny items sit in different sets. Sets A and B start with a count, the easiest goal type. The set titles are suggestions; the coordinator assigns set IDs.

## Requested words

None was needed to pass. For the coordinator's consideration only:

- `schaal` or `fruitschaal` (bowl): a learner would naturally say "in de schaal". The criterion accepts "in het fruit" or "tussen de appels" instead.
- `vuilniszak` (rubbish bag): very common in daily life; the item uses "de zak" and "het vuilnis".
- `stokbrood` (French loaf): would name the long bread; "een (heel) lang brood" works.

## Doubts for the reviewer

- **Questions vs commands.** The blueprint formula says "two short commands"; the rebuild plan for 079 says "two short questions". I used direct questions because an indirect command ("Zeg waar …") is a subordinate clause. Please confirm.
- **Real premises.** Most items use a caller who cannot see the scene. The weakest reasons are `bij-de-kassa` (why Wim's wife asks how he pays) and `docent-bord` (why a late classmate asks how many students). Each still has a plausible, everyday motive.
- **`apotheek-tas`.** Without a green cross the pharmacy may read only as "a shop". The criterion accepts only "bij de apotheek". If the rendered image is ambiguous, either accept "bij de winkel" too or regenerate.
- **`kat-fruitschaal`.** A beginner may answer "op de tafel", which is true but misses the joke. The criterion does not accept it; please judge whether it should.
- **`halte-regen`.** Batch 073 `miniparaplu` (rewritten in 079) also shows rain at a bus shelter. The task goals differ (count and weather vs umbrella colour and size), but the setting repeats. The coordinator's plan asked for this scene.
- **Counting the learner.** Counting questions say "ziet u", so the learner counts only the people drawn, not themselves.
- **"dragen".** `lang-brood` asks "Wat brengen ze mee?" rather than "Wat dragen ze?", because "dragen" also means "wear" and could invite clothing answers.

## Author checks

The same-part slug check (batch prefix stripped) found no collision with the speaking catalogue. No title repeats an existing A1 speaking title. `npx prettier --check` passes for both JSON files.

```text
$ npm run batch:check -- content/batches/080-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/080-original.json

Checked 12 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

The first run reported one failure (a 13-word criterion in `kat-fruitschaal`), which was shortened. No media was generated, and the catalogue, config, app code and other batches were not changed. The batch is a draft and awaits an independent reviewer.
