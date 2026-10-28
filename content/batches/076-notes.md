# Batch 076 author notes

Fifteen new A1 reading messages (`taskType: bericht`), two questions each, written on 28 October 2026 for the A1 rebuild (`docs/briefs/a1-rebuild-2026-10-28.md`, section "076 — reading"). Every record uses `exam: "a1-practice"`, `status: "draft"` and `targetLevelValidated: false`. The level is an authoring target only; no AI or editorial review here validates CEFR difficulty or exam equivalence. No media were generated.

## Sources and provenance

The author read the coordinator plan, `docs/briefs/author.md`, `content/blueprint.md` §3, §4.0 (including "Simplified A1 profile"), §5, §7, §8 and §9, `content/reviews/rubric.md`, `config/a1-vocabulary.json`, `config/illustration.json`, `scripts/a1-vocabulary.ts`, `scripts/batch-validation.ts`, and `content/batches/071-original.json` with `071-notes.md` as a format example. All messages, questions, options and explanations are newly written. The batch names no organisation, shop, street, brand or real person; institutions appear only as generic roles ("de bibliotheek", "de apotheek", "de gemeente", "de supermarkt", "de kapper", "de tandarts"), so there was no invented name to search. No medical, legal or public-service advice is given; facts about days, times and prices belong to the fictional scenarios.

## Items, tone and people

| # | Slug | Domain | Tone | Sender | Learner's role |
| --: | --- | --- | --- | --- | --- |
| 1 | `pas-klaar` | instanties | ordinary | de bibliotheek (letter) | member collecting a new pass |
| 2 | `medicijn` | gezondheid | ordinary | de apotheek | patient |
| 3 | `tandarts-dag` | gezondheid | ordinary | Rosa, assistent van de tandarts | patient |
| 4 | `bus-tram` | vervoer | ordinary | friend Ivan | visitor this evening |
| 5 | `trein-later` | vervoer | ordinary | friend Priya | host waiting for her |
| 6 | `geen-water` | wonen-buurt | ordinary | neighbour Leo (note to the building) | resident of the flat |
| 7 | `vuilnis-dinsdag` | wonen-buurt | ordinary | de gemeente (letter) | resident |
| 8 | `lunch-park` | werk | ordinary | colleague Nina | colleague |
| 9 | `strand-school` | opleiding | ordinary | juf Hana | parent |
| 10 | `ander-lokaal` | opleiding | ordinary | docent Tim | student in the Dutch class |
| 11 | `boodschappen-vrijdag` | winkels-diensten | ordinary | de supermarkt | customer |
| 12 | `kapper-zaterdag` | winkels-diensten | ordinary | Bram, the hairdresser | customer |
| 13 | `voetbal-zoon` | vrije-tijd-familie | ordinary | friend Esra | invited friend |
| 14 | `oma-foto` | vrije-tijd-familie | **lightly funny** | the learner's oma | grandchild |
| 15 | `kat-schoen` | vrije-tijd-familie | **lightly funny** | friend Fleur | friend waiting in a café |

Two funny items, as planned. `oma-foto`: grandma tries to photograph her head with her new phone and sees only her ear. `kat-schoen`: the cat sleeps in her shoe, and she has no other shoes. Both jokes use list words only and need no cultural knowledge.

Names from the pool: Ivan, Priya, Leo, Nina, Hana, Tim, Bram, Rosa, Esra and Fleur, each in exactly one exercise. Five items use only unnamed institutions. No voice names or older cast appear.

Drawn people: only `oma-foto` shows a person. Her traits: older woman of about 75, short grey curly hair, round glasses, dusty blue cardigan. She appears in no other picture. No named character is drawn.

Every situation, prompt and explanation addresses the learner with **u**. Friends and the colleague use **je/jij**. Institutions, the dentist's assistant, the hairdresser, the school and the neighbour's note to the building use **u**. Every premise is a real exchange with someone who is not present. Each message gives the learner information they do not have yet: a day, a time, a room, a tram, a person or a place. `oma-foto` tells the learner about a photo the learner has not seen and asks for help by phone.

## Proposed sets of three

Each set has three different domains and settings, three different senders, and keys A, B and C twice each. The order inside a set runs from easiest to hardest. Sets are listed in the order learners should meet them.

| Set | Title proposal | Items in order | Keys | Why this order |
| --- | --- | --- | --- | --- |
| 1 | Vandaag en morgen | `lunch-park`, `boodschappen-vrijdag`, `kat-schoen` | B A · C B · A C | Informal lunch invite first (25 words), then a two-fact delivery message, then the funny item. |
| 2 | Wie komt er? | `trein-later`, `pas-klaar`, `voetbal-zoon` | C A · A B · B C | Shortest text (21 words) first. One person question appears in the first and last item. |
| 3 | Op de goede plek | `ander-lokaal`, `medicijn`, `vuilnis-dinsdag` | A B · C A · B C | Room and time, then pharmacy day and time, then the gemeente letter, which has three day words. |
| 4 | Een afspraak | `kapper-zaterdag`, `bus-tram`, `oma-foto` | B A · A C · C B | Short confirmation first, then directions, then the longer funny item (34 words). |
| 5 | Even plannen | `strand-school`, `geen-water`, `tandarts-dag` | C A · A B · B C | The school outing first. `tandarts-dag` comes last because it is the longest text (39 words) with an old and a new day. |

The two funny items are in different sets (1 and 4). Sets 1 and 4 each contain one funny item and two ordinary items.

## Key balance

Batch keys in file order: A B · C A · B C · A C · C A · A B · B C · B A · C A · A B · C B · B A · B C · C B · A C. This gives 10 A, 10 B and 10 C, and no letter appears three times in a row.

Skills: time-place 23, detail 4, person 2, quantity 1. The plan is mostly about days, times and places, so time-place dominates. Inside each item the two questions ask about different facts.

## Key evidence and distractors

Most distractors are familiar unmentioned alternatives of the same kind (§4.0 allows this for single stated facts). Where the text itself names a competing value, that value is the tempting distractor. No object, number or person was added to a message only to create a distractor.

### 1 `pas-klaar`

- **q1, A "In de bibliotheek."** Evidence: "U kunt de pas ophalen in de bibliotheek." B "Bij de gemeente": the gemeente also issues passes and IDs, so it is a plausible confusion for "uw nieuwe pas". C "In de supermarkt": a familiar collection point for parcels. The situation line says only "uw nieuwe pas", not the library. The signature "de bibliotheek" also supports the key, which keeps the item easy on purpose.
- **q2, B "Op woensdag."** Evidence: "Kom op woensdag." A and C are other weekdays that are not mentioned.
- The sentence "Neem uw oude pas mee." is a coherent instruction for a replacement pass and is not tested.

### 2 `medicijn`

- **q1, C "Op donderdag."** Evidence: "U kunt het op donderdag ophalen." A Tuesday and B Saturday are unmentioned days. The closing "Tot donderdag!" repeats the key, which helps a beginner.
- **q2, A "Na twee uur."** Evidence: "Kom na twee uur, alstublieft." B five and C nine are plausible pharmacy hours, both unmentioned. All three options use the same "Na … uur." pattern, so the learner must read the number.

### 3 `tandarts-dag`

- **q1, B "Op vrijdag."** Evidence: "Uw nieuwe afspraak is op vrijdag." A "Op dinsdag" is the old appointment named in the first sentence. It tests whether the reader notices "nieuwe". C Monday is unmentioned.
- **q2, C "Om tien uur."** Evidence: "Dat is om tien uur." A eight and B nine are nearby morning hours, both unmentioned. "Dat" points back to the new appointment in the sentence just before.

### 4 `bus-tram`

- **q1, A "Tram drie."** Evidence: "Neem tram drie." B four and C six are other tram numbers. The bus is not offered as an option.
- **q2, C "Bij het station."** Evidence: "De tram stopt bij het station. Ik wacht daar op je." A "Bij de school" is a familiar meeting place. B "In het centrum" is a plausible tram destination. Neither is mentioned. The key needs "daar" linked to the station in the sentence before. That link is short and explicit, but the reviewer may want "Ik wacht bij het station." instead.

### 5 `trein-later`

- **q1, C "Om vijf uur."** Evidence: "Ik kom om vijf uur aan." A three and B four are unmentioned. They suggest the earlier planned time that a learner might assume for a late train. No calculation is needed.
- **q2, A "Haar zus."** Evidence: "Mijn zus komt ook mee." B brother and C mother are other family members. The key is the shortest option.

### 6 `geen-water`

- **q1, A "Op maandag."** Evidence: "Maandag is er geen water in de flat." B "Op zondag" is the day the text names for filling a bottle. It tests whether the reader keeps the outage and the preparation apart. C Tuesday is unmentioned.
- **q2, B "Van acht tot twaalf."** Evidence: "Dat is van acht tot twaalf uur." A "Van twaalf tot vier" starts at the stated end hour, and a reader may grab "twaalf" first. C "Van vier tot acht" ends at the stated start hour. All three are four-word ranges built from the same numbers, so the learner must read both ends.

### 7 `vuilnis-dinsdag`

- **q1, B "Op dinsdag."** Evidence: "Zet uw vuilnis op dinsdag klaar." A "Op maandag" is named in "Niet op maandag, alstublieft." C "Op woensdag" is the day the gemeente collects. Each wrong option is a day in the text with a different role. This is the most demanding question in the batch, and it comes last in set 3.
- **q2, C "Voor uw huis."** Evidence: "Zet de zak voor uw huis." A the garden and B the balcony are places where people keep rubbish at home, both unmentioned. The q1 prompt says "klaar", not "voor uw huis", so it does not leak q2.

### 8 `lunch-park`

- **q1, B "Om twaalf uur."** Evidence: "Om twaalf uur in het park?" A eleven and C two are plausible lunch times, both unmentioned.
- **q2, A "Koffie."** Evidence: "Ik neem koffie mee." B "Brood" is what Nina asks the learner to bring ("Neem jij brood mee?"), so it tests who brings what. C tea is an unmentioned drink.

### 9 `strand-school`

- **q1, C "Op vrijdag."** Evidence: "Vrijdag gaat de klas naar het strand." A Monday and B Wednesday are unmentioned school days.
- **q2, A "Lunch en een pet."** Evidence: "Geef uw kind lunch mee. Geef ook een pet mee." B jacket and C ball are familiar things to send with a child on an outing. All options begin "Lunch en een", so only the second object decides. All options have four words.

### 10 `ander-lokaal`

- **q1, A "In kamer vier."** Evidence: "De les is vandaag in kamer vier." B "In kamer twee" is the usual room, named as closed ("Kamer twee is vandaag dicht."). C six is unmentioned.
- **q2, B "Om negen uur."** Evidence: "De les begint om negen uur." A eight and C ten are neighbouring hours, both unmentioned.

### 11 `boodschappen-vrijdag`

- **q1, C "Op vrijdag."** Evidence: "Wij brengen uw boodschappen op vrijdag." A Wednesday and B Thursday are unmentioned days.
- **q2, B "Tussen twee en vier."** Evidence: "We komen tussen twee en vier uur." A ten to twelve and C four to six are other delivery slots. C shares the hour "vier" with the key, so the learner must read the start of the range.

### 12 `kapper-zaterdag`

- **q1, B "Om elf uur."** Evidence: "Uw afspraak is op zaterdag om elf uur." A ten and C twelve are neighbouring hours, both unmentioned.
- **q2, A "Twintig euro."** Evidence: "Het kost twintig euro." B ten and C thirty are plausible haircut prices, both unmentioned.

### 13 `voetbal-zoon`

- **q1, B "Haar zoon."** Evidence: "Mijn zoon speelt zondag voetbal." A husband and C daughter are other family members who could play. The prompt repeats "zondag voetbal" from the message so the learner can find the sentence.
- **q2, C "Bij de school."** Evidence: "Het is om tien uur bij de school." A park and B beach are familiar places to play football, both unmentioned. The picture shows no grass or field, so it does not favour "In het park".

### 14 `oma-foto` (funny)

- **q1, C "Haar oor."** Evidence: "Maar ik zie alleen mijn oor!" A eye and B nose are other parts of the face that a selfie would show. The joke is the tested fact.
- **q2, B "Om zeven uur."** Evidence: "Ik bel je vanavond om zeven uur." A six and C eight are neighbouring evening hours, both unmentioned.

### 15 `kat-schoen` (funny)

- **q1, A "In haar schoen."** Evidence: "Mijn kat slaapt in mijn schoen." B scarf and C hat are other pieces of clothing where a cat could plausibly curl up. The joke is the tested fact.
- **q2, C "Om vier uur."** Evidence: "Ik kom om vier uur." A two and B three are unmentioned afternoon hours. "Sorry, ik ben laat" gives no other time.

## Language figures

Word counts are whitespace-delimited and include greeting and signature. Units are split as the A1 checker splits them (on `.`, `!` or `?` followed by whitespace, or on a newline), and one-word units are ignored.

| Item | Words | Units | Mean | Longest |
| --- | --: | --: | --: | --: |
| `pas-klaar` | 27 | 6 | 4.33 | 8 |
| `medicijn` | 23 | 6 | 3.67 | 6 |
| `tandarts-dag` | 39 | 8 | 4.75 | 7 |
| `bus-tram` | 23 | 5 | 4.20 | 6 |
| `trein-later` | 21 | 5 | 3.80 | 6 |
| `geen-water` | 30 | 5 | 5.60 | 8 |
| `vuilnis-dinsdag` | 31 | 7 | 4.29 | 6 |
| `lunch-park` | 25 | 5 | 4.60 | 6 |
| `strand-school` | 26 | 6 | 4.17 | 7 |
| `ander-lokaal` | 23 | 5 | 4.40 | 7 |
| `boodschappen-vrijdag` | 25 | 6 | 4.00 | 7 |
| `kapper-zaterdag` | 22 | 4 | 4.75 | 8 |
| `voetbal-zoon` | 24 | 4 | 5.25 | 8 |
| `oma-foto` | 34 | 5 | 6.20 | 8 |
| `kat-schoen` | 27 | 5 | 5.00 | 6 |

All messages are 21–39 words, inside the 20–45 limit. Every sentence is a present-tense main clause of at most eight words. There are no subordinate clauses, perfect tense, abbreviations or idioms needed for an answer.

Some small grammar points remain:

- separable verbs: "kom … aan", "komt … mee", "zet … klaar", "neem … mee", "geef … mee";
- "dan" for "at that time" or "in that case", in `tandarts-dag` and `boodschappen-vrijdag`;
- the short tag "Leuk, hè?".

Prompts have 3–8 words, options 1–4 words and explanations 5–13 words. Titles have at most four words and situations at most ten. Picture alt texts have 5–9 words.

## Pictures

Each item has one `{brief, alt, kind: "drawing"}` entry in the flat house style. Every brief ends with "No text, letters, numerals, signs, clock faces or logos." No picture shows a clock, calendar, numeral or person count. No picture shows any option of either question.

| Item | Picture | Kept out because of the questions |
| --- | --- | --- |
| `pas-klaar` | blank card, envelope, letter on a table | books, shelves, buildings, shops, counters, calendars |
| `medicijn` | small pharmacy bag and pill box on a counter | clocks, windows, sun or moon, calendars |
| `tandarts-dag` | empty dentist's chair under a lamp | clocks, calendars, phones, windows |
| `bus-tram` | numberless tram on an empty street | route number, station, school, shops, houses, stop shelter |
| `trein-later` | yellow train in flat fields | people at windows (sister), station, clocks, low sun |
| `geen-water` | sink, closed tap, one bottle of water | calendars, clocks, window |
| `vuilnis-dinsdag` | hand holding a tied rubbish bag, plain background | house, door, garden, balcony, street, sky or moon |
| `lunch-park` | empty park bench under a tree | cups, flasks, bread, food, clocks (the park itself is not tested) |
| `strand-school` | empty beach with a small yellow bucket | caps, hats, jackets, balls, bags, food, calendars |
| `ander-lokaal` | empty classroom, blank board | doors and door numbers, clocks, writing |
| `boodschappen-vrijdag` | grocery box at a closed front door | clocks, calendars, van, sun or moon |
| `kapper-zaterdag` | hairdresser's chair and mirror, a comb | money, cards, payment terminal, price list, clocks |
| `voetbal-zoon` | ball and children's football boots on a plain floor | grass, field, park, school, beach, people |
| `oma-foto` | oma on a sofa, puzzled, holding a phone away from her | the screen and any photo, clocks, window, lamp (evening) |
| `kat-schoen` | café table with one cup and an empty chair | cats, shoes, scarves, hats, clocks |

In both funny items the joke is the tested fact. The picture therefore shows the setting and not the joke: oma with her phone, the screen hidden; an empty café chair. A cat asleep in a shoe would answer `kat-schoen` q1.

## Requested words

None of these words is needed for the batch. Each would have made one phrase more natural:

- "gezicht": `oma-foto` uses "een foto van mijn hoofd" instead;
- "kraan" and "verhuurder": `geen-water` is a neighbour's note, with "een fles water" and no tap or landlord;
- "liefs": oma signs "Groetjes";
- "wedstrijd": "speelt voetbal" is used.

## Diversity against the catalogue

No slug repeats a reading slug in `content/catalogue.json`. Some settings are already in A1 or A2:

- A1 `beer-dokter` concerns a waiting room. `medicijn` and `tandarts-dag` concern a pick-up time and a moved appointment.
- A1 `winkel-sok` concerns collecting a repaired coat. `boodschappen-vrijdag` concerns a home delivery window, and `kapper-zaterdag` concerns an appointment and a price.
- A1 `eend-tas` concerns a friend arriving by train with a gift. `trein-later` concerns a delay and who comes along, and `bus-tram` concerns a substitute route.
- A2 reading `bibliobus` and A2 writing `bibliotheekpas` share the library theme with `pas-klaar`, at a far simpler level.

There are two neighbourhood items, as planned, and no volunteering.

## Doubts for the reviewer

1. `vuilnis-dinsdag` names three days with different roles (put out, not, collection). That is the heaviest load in the batch. If it is too much, delete "Wij komen woensdag vroeg." and replace option C with an unmentioned day.
2. `bus-tram` q2 needs "daar" to point to the station. "Ik wacht bij het station." would remove the reference. It would also change the evidence.
3. `pas-klaar` q1: the signature "de bibliotheek" also states the key. I kept this on purpose for beginners. A reviewer may prefer an unsigned letter.
4. The key is the longest option by one or two characters in five questions: `pas-klaar` q1, `medicijn` q1, `lunch-park` q1, `kapper-zaterdag` q2 and `kat-schoen` q1. The checker allows this. Weekday and number names make an exact length match impossible.
5. `oma-foto`: "een foto van mijn hoofd maken" is plain, if slightly literal, Dutch for a selfie. Please check that it reads naturally.
6. Skill spread leans heavily on time-place (23 of 30), because the plan's subjects are appointments and arrangements.

## Checker output

```text
$ npm run batch:check -- content/batches/076-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/076-original.json

Checked 15 items, 30 questions. Keys: {"A":10,"B":10,"C":10}. Options: {"3":30}.
No failures, no warnings.
```
