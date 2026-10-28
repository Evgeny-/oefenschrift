# Batch 077 author notes

Author: Claude (Opus) author agent, 28 October 2026. Fifteen A1 listening conversations for local foundation practice under the simplified A1 profile (blueprint §4.0, 28 October 2026). Twelve rewrite existing exercises under their own IDs; three are new. Every item is `exam: a1-practice`, `taskType: gesprek`, `status: draft`, `targetLevelValidated: false`. No audio or pictures were generated. A separate reviewer must read the full final source before any media is made. The editorial target is not a validated CEFR level and makes no exam claim.

## Contract and provenance

Read before writing: `docs/briefs/a1-rebuild-2026-10-28.md` (section 077), `docs/briefs/author.md`, `content/blueprint.md` §3, §4.0, §5–§8, `content/reviews/rubric.md`, `config/a1-vocabulary.json`, `config/voices.json`, `config/illustration.json`, `content/batches/072-original.json` and `072-notes.md`, and the current catalogue versions of the twelve rewritten exercises. All scripts, questions, options, explanations, briefs and alts are newly written. There are no named businesses, real organisations, addresses, prices beyond everyday amounts, KNM facts or legal claims; the shop, bakery, café, pharmacy, doctor's practice, library and offices are generic, so no name search was needed.

## Replaces

These rewrites keep their exact IDs and set membership. The reviewer records `replaces` for each.

- `A1:listening:batch070-foto-werk:1` — scenario kept (team photo); "bureau" and "gang" removed; the third named person (Karim) replaced by "de baas".
- `A1:listening:batch070-potlood-lenen:1` — scenario kept (borrow a pencil in class); "tekenles" and "schaar" removed; now tests when and where to return it.
- `A1:listening:batch070-tas-kopen:1` — scenario kept (buy a bag); "toonbank" and "munten" removed; now tests colour and price.
- `A1:listening:batch072-banaan-telefoon:1` — scenario replaced: the classroom phone role-play becomes a real call to the doctor's assistant for an appointment; domain `opleiding` → `gezondheid`; the picture shows one person phoning. The slug no longer describes the scene.
- `A1:listening:batch072-eend-reis:1` — scenario simplified: siblings plan a train trip to grandma and bring a cake. The toy duck is gone (it was an unused prop); slug no longer descriptive.
- `A1:listening:batch072-stoel-ogen:1` — scenario replaced: a colleague's key lies under her chair; she can go home. The pen/form exchange is gone.
- `A1:listening:batch072-grote-hoed:1` — scenario kept (bakery); now tests number of breads and payment.
- `A1:listening:batch072-bezem-feest:1` — stays funny. "Bezem" is not on the word list, so the dance partner is now a big plant; slug no longer exact.
- `A1:listening:batch072-doos-oren:1` — scenario kept (a birthday present); "strik" removed; speakers are now two neighbours on the doorstep; domain → `wonen-buurt`.
- `A1:listening:batch072-paraplu-werk:1` — scenario kept (rain after work, bus home, five o'clock); a colleague now lends an umbrella; "drogen" removed; domain `werk` → `vervoer`.
- `A1:listening:batch072-bloem-beker:1` — scenario kept (ordering in a café); "medewerker" removed: the café worker is named (Bas) and the customer is "de mevrouw". Food and drink now soup and tea.
- `A1:listening:batch072-kat-boeken:1` — scenario replaced: a phone call inviting a friend to the library; the cat is only part of the home picture. Made ordinary (the old cat-on-the-bag premise was mildly funny).

New: `A1:listening:batch077-apotheek-pil:1`, `A1:listening:batch077-dienst-ruilen:1`, `A1:listening:batch077-hond-banaan:1`.

## Tone

Two lightly funny items, as planned: `batch072-bezem-feest` (Emma dances with a big plant while tidying for a party) and `batch077-hond-banaan` (the neighbour's dog only eats bananas, four a day). All other thirteen are ordinary. Both jokes use list words only and need no idiom; neither joke is the answer to a question whose prompt could be guessed from the picture.

## Speakers, voice roles and people

Each conversation has two speakers with two different roles. `m-adult` (Robert) is never paired with `f-adult` (Lieke). Each named person keeps the same role and the same three visual traits wherever drawn.

| Person | Exercises | Voice role | Visual traits (verbatim in briefs) |
| --- | --- | --- | --- |
| Emma | foto-werk, bezem-feest | f-young | young woman, short red hair, mustard yellow jumper |
| Pedro | banaan-telefoon, bezem-feest | m-young | young man, dark curly hair, terracotta jumper |
| Aya | potlood-lenen, kat-boeken | f-young | young woman, long black ponytail, sage green coat |
| Bas | tas-kopen (customer), bloem-beker (café worker) | m-young | young man, short blond hair, dusty blue shirt |
| Sofie | eend-reis, paraplu-werk | f-adult | woman in her thirties, shoulder-length brown hair, grey cardigan |
| Kim | stoel-ogen, apotheek-pil | f-mature | woman in her fifties, short grey bob, round glasses |
| Max | stoel-ogen, hond-banaan | m-casual | young man, messy brown hair, green hoodie |
| Ahmed | grote-hoed, dienst-ruilen | m-adult | man in his forties, shaved head and short black beard, charcoal jacket |

Unnamed roles (one exercise each): Collega in foto-werk (m-adult; man in his forties, short brown hair, white shirt), Docent (m-older; man of about sixty, grey hair, brown jacket), Verkoper (m-shop; man in his fifties, grey beard, terracotta apron), Assistent in banaan-telefoon (f-adult; heard only), Broer (m-young; young man, short black hair, mustard yellow jacket), Bakker (f-mature; woman in her fifties, brown hair in a bun, white apron), Buurvrouw in doos-oren (f-young; young woman, curly black hair, terracotta coat), Buurman (m-older; older man, white hair, dark green cardigan), Collega in paraplu-werk (m-older; man of about sixty, grey moustache, charcoal coat), Mevrouw (f-older; woman of about seventy, white hair in a bun, dusty blue coat), Vriend (m-casual; heard only), Assistent in apotheek-pil (m-young; young man, short black hair, white coat), Collega in dienst-ruilen (f-young; young woman, long blond hair, sage green shirt), Buurvrouw in hond-banaan (f-older; woman of about seventy, short white curly hair, lilac cardigan).

Every pool name appears in exactly two exercises; no voice name or older cast name is used. `config/voices.json` still has a casting override `A1:listening:batch072-doos-oren:1: m-adult → m-young`; the rewrite has no `m-adult` speaker, so the override no longer applies and can be removed by the coordinator.

## Proposed sets of three

Existing set IDs keep their members; the order inside each set is the suggested order, easiest first. Every set uses different people in its three exercises and has two keys per letter.

| Set | Items in order | Settings and purposes |
| --- | --- | --- |
| `a1-listening-01` | `tas-kopen`, `potlood-lenen`, `foto-werk` | buy a bag in a shop; borrow a pencil in class; a team photo at work |
| `a1-listening-02` | `eend-reis`, `stoel-ogen`, `banaan-telefoon` | plan a train trip with a brother; find a key at work; phone the doctor for an appointment |
| `a1-listening-03` | `grote-hoed`, `doos-oren`, `bezem-feest` (funny) | buy bread; a neighbour's present; prepare a party |
| `a1-listening-04` | `bloem-beker`, `paraplu-werk`, `kat-boeken` | order in a café; go home in the rain; invite a friend to the library |
| new `a1-listening-05` | `dienst-ruilen`, `apotheek-pil`, `hond-banaan` (funny) | swap a work day; pills at the pharmacy; feed the neighbour's dog |

People per set: 01 Bas + Verkoper / Aya + Docent / Emma + Collega; 02 Sofie + Broer / Kim + Max / Pedro + Assistent; 03 Ahmed + Bakker / Buurman + Buurvrouw / Emma + Pedro; 04 Bas + Mevrouw / Sofie + Collega / Aya + Vriend; 05 Ahmed + Collega / Kim + Assistent / Max + Buurvrouw.

## Language figures

Words are whitespace tokens in the spoken script only (speaker labels excluded). Sentences end at `.`, `?` or `!`. These describe the written script; they do not certify spoken difficulty.

| Item | Domain | Spoken words | Turns | Sentences | Mean words/sentence | Longest sentence | Longest turn | Skills | Keys |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `batch070-foto-werk` | werk | 31 | 5 | 9 | 3.44 | 8 | 10 | time-place; person | B, C |
| `batch070-potlood-lenen` | opleiding | 30 | 4 | 8 | 3.75 | 6 | 9 | time-place; time-place | A, B |
| `batch070-tas-kopen` | winkels-diensten | 30 | 4 | 8 | 3.75 | 5 | 9 | detail; quantity | C, A |
| `batch072-banaan-telefoon` | gezondheid | 31 | 4 | 7 | 4.43 | 7 | 10 | detail; time-place | A, C |
| `batch072-eend-reis` | vervoer | 26 | 4 | 7 | 3.71 | 7 | 7 | detail; detail | B, A |
| `batch072-stoel-ogen` | werk | 26 | 4 | 8 | 3.25 | 5 | 8 | time-place; detail | C, B |
| `batch072-grote-hoed` | winkels-diensten | 25 | 4 | 8 | 3.13 | 5 | 8 | quantity; detail | C, A |
| `batch072-bezem-feest` | vrije-tijd-familie | 29 | 4 | 8 | 3.63 | 6 | 10 | detail; time-place | B, C |
| `batch072-doos-oren` | wonen-buurt | 27 | 4 | 7 | 3.86 | 6 | 8 | person; detail | A, B |
| `batch072-paraplu-werk` | vervoer | 28 | 4 | 8 | 3.50 | 5 | 8 | detail; time-place | B, A |
| `batch072-bloem-beker` | winkels-diensten | 25 | 4 | 8 | 3.13 | 5 | 8 | detail; detail | C, B |
| `batch072-kat-boeken` | vrije-tijd-familie | 26 | 4 | 9 | 2.89 | 6 | 8 | time-place; detail | A, C |
| `batch077-apotheek-pil` | gezondheid | 30 | 5 | 9 | 3.33 | 6 | 8 | quantity; time-place | A, B |
| `batch077-dienst-ruilen` | werk | 31 | 4 | 8 | 3.88 | 5 | 9 | time-place; time-place | C, A |
| `batch077-hond-banaan` | vrije-tijd-familie | 35 | 5 | 10 | 3.50 | 6 | 11 | time-place; quantity | B, C |

Domains: werk 3, winkels-diensten 3, vrije-tijd-familie 3, gezondheid 2, vervoer 2, opleiding 1, wonen-buurt 1, instanties 0 (batch 078 supplies `gemeente-foto`). Skills per question: detail 12, time-place 12, quantity 4, person 2. Clock-time questions: four (banaan-telefoon, bezem-feest, paraplu-werk, dienst-ruilen); each conversation contains at most one clock time.

Key sequence in file order: B C A B C A · A C B A C B · C A B C A B · B A C B A C · A B C A B C — ten of each letter, no letter three times in a row. Each `text` is the mechanical `Speaker: text` join of the script. Every evidence quote is verbatim in one turn. All scripts are present tense with main clauses only; no digits, perfect tense, subordinate clause, correction chain or third named person. Questions never reveal another question's key (for example, `eend-reis` asks "Hoe reizen…" and never mentions the train; `hond-banaan` q1 asks the day so q2 may say "bananen").

## Key and distractor audit

### `A1:listening:batch070-foto-werk:1` (ordinary)

- q1 B, "Buiten, bij de grote boom." A door and C window are ordinary photo spots at an office; neither is said. They test whether the learner heard "boom".
- q2 C, "De baas." A Emma is the person who asks the question, so she is not the photographer (tests speaker confusion). B a customer is a familiar alternative not mentioned.

### `A1:listening:batch070-potlood-lenen:1` (ordinary)

- q1 A, "Breng het na de les terug." B "Voor de les" tests the preposition `na` against its common opposite. C the break is a familiar lesson moment not mentioned.
- q2 B, "Leg het op mijn tafel." A his bag and C his chair are other places for a teacher's things; neither is said.

### `A1:listening:batch070-tas-kopen:1` (ordinary)

- q1 C, "Ik zoek een zwarte tas." A brown and B blue are common bag colours not mentioned.
- q2 A, "Hij kost dertig euro." B forty and C fifty are neighbouring tens; they test hearing `dertig`.

### `A1:listening:batch072-banaan-telefoon:1` (ordinary)

- q1 A, "Mijn keel doet pijn." B stomach and C back are the other common reasons to phone the doctor; neither is said.
- q2 C, "Kunt u morgen om tien uur komen?" Pedro accepts. A eight and B nine are nearby morning hours not mentioned. Only one time occurs.

### `A1:listening:batch072-eend-reis:1` (ordinary)

- q1 B, "Met de trein." A bus and C car are the other ordinary ways to visit family; neither is said.
- q2 A, "Een taart." B a plant and C a book are ordinary visit presents not mentioned.

### `A1:listening:batch072-stoel-ogen:1` (ordinary)

- q1 C, "Hij ligt onder je stoel." A on the table and B in the bag are the usual places to look for a key; neither is said.
- q2 B, "Nu kan ik naar huis." A keep working fits the workplace but is wrong because she says she can go home now. C sport is a familiar after-work plan not mentioned.

### `A1:listening:batch072-grote-hoed:1` (ordinary)

- q1 C, "Twee broden, graag." A four and B three are other small bread quantities; the price "vijf euro" is the only other number and is not an option.
- q2 A, "Ik betaal met mijn pinpas." B cash and C phone are the other usual ways to pay; neither is said.

### `A1:listening:batch072-bezem-feest:1` (funny)

- q1 B, "Zet jij de radio aan?" A the TV and C the lamp are other things one switches on at home; neither is said.
- q2 C, "Om acht uur." A six and B seven are earlier evening hours not mentioned.

### `A1:listening:batch072-doos-oren:1` (ordinary)

- q1 A, "Voor mijn zoon." B his wife and C his brother are other family members not mentioned.
- q2 B, "Een trui voor de winter." A a book is a common present not mentioned. C a scarf is another winter garment, testing whether the learner heard `trui`.

### `A1:listening:batch072-paraplu-werk:1` (ordinary)

- q1 B, "Met de bus." A train and C bicycle are the other ordinary ways home; neither is said.
- q2 A, "Om vijf uur." B six and C seven are later finishing times not mentioned.

### `A1:listening:batch072-bloem-beker:1` (ordinary)

- q1 C, "Soep, graag." A pizza and B salad are other café meals not mentioned.
- q2 B, "Een kop thee, graag." A coffee is the most common café alternative and tests hearing `thee`. C water is another ordinary drink not mentioned.

### `A1:listening:batch072-kat-boeken:1` (ordinary)

- q1 A, "Vanmiddag." B this morning and C this evening are the two other parts of the day; neither is said.
- q2 C, "Ik breng mijn boeken terug." A films and B games are other things a Dutch library lends; neither is said.

### `A1:listening:batch077-apotheek-pil:1` (ordinary)

- q1 A, "Elke dag twee pillen." B one and C three are the other usual daily doses; neither is said.
- q2 B, "Na het eten." A "Voor het eten" tests the preposition `na` against its opposite. C before sleeping is another common medicine moment not mentioned.

### `A1:listening:batch077-dienst-ruilen:1` (ordinary)

- q1 C, "kun jij zaterdag werken?" Ahmed answers "Ja, dat is goed." A Friday and B Sunday are the days around Saturday; neither is said. The day is said once, by the colleague; Ahmed's "ja" confirms it.
- q2 A, "Om acht uur." B nine and C ten are later starting hours not mentioned.

### `A1:listening:batch077-hond-banaan:1` (funny)

- q1 B, "ik ga morgen weg." A today and C Monday are other near days not mentioned.
- q2 C, "Vier bananen." A two and B three are smaller quantities; no other number occurs.

## Pictures

One drawing brief per item, each ending with "No text, letters, numerals, signs, clock faces or logos." Each brief excludes every option object for both questions (for example no radio, TV or lamp in `bezem-feest`; no key, chair, table, bag or coats in `stoel-ogen`; no bananas, food or bowls in `hond-banaan`; no throat gesture or scarf in `banaan-telefoon`). The umbrella in `paraplu-werk`, the flower in `bloem-beker`, the plant in `bezem-feest`, the gift box in `doos-oren` and the cat in `kat-boeken` are setting details that no question asks about. Alts are Dutch, at most fourteen list words, and name no key.

## Requested words

None required. Wishes noted for the coordinator: `bezem` (to keep the original broom joke in `bezem-feest`) and `naartoe` (the natural question form "Waar gaat … naartoe?"; without it, destination questions had to be avoided).

## Doubts for the reviewer

- `stoel-ogen` q2 "Wat doet Kim nu?" with key "Ze gaat naar huis." rests on "Nu kan ik naar huis." Check that "kan" (can) reads clearly enough as "she now goes home" for a beginner.
- `potlood-lenen` and `dienst-ruilen` each ask two `time-place` questions; `eend-reis` and `bloem-beker` each ask two `detail` questions. Acceptable for A1, but skills could be spread more.
- `dienst-ruilen` q1 prompt "Welke dag werkt Ahmed voor zijn collega?" relies on the swap being understood from "kun jij zaterdag werken?" plus "Ja"; the day itself is said only once.
- `bezem-feest`: "Hij moet naar buiten" uses `hij` for `de plant`; natural Dutch, but check it is heard as the plant.
- `hond-banaan`: an all-banana diet is a joke, not advice; the reviewer may want to confirm the light tone is clear.
- Two conversations have the same general shape as others in the program: `paraplu-werk` (transport + time) and `eend-reis` (transport + object). They sit in different sets.
- Bas is the customer in `tas-kopen` and the café worker in `bloem-beker` (same traits, different sets). Plausible, but a reviewer may prefer distinct people.

## Checker output

```
> batch:check
> tsx scripts/batch-check.ts content/batches/077-original.json

Checked 15 items, 30 questions. Keys: {"B":10,"C":10,"A":10}. Options: {"3":30}.
  info  12 of 15 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

`npx prettier --check content/batches/077-original.json` also passes.
