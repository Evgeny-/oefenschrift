# Batch 101 author notes

Six new A1 step 2 reading messages (`taskType: bericht`, `a1Step: 2`), written on 22 November 2026 (`docs/briefs/content-round-2026-11-22.md`, section "101"; blueprint §4.0 "A1 step 2"). Each has 50–80 words, three questions with three options, and one context picture. All records are `status: "draft"`, `targetLevelValidated: false`, with no media or derived fields. The level is an authoring target; this is not validated CEFR difficulty or exam equivalence.

## Sources and provenance

Read: AGENTS.md, `docs/briefs/author.md`, the round brief, blueprint §1, §3, §4.0, §5, §7, §8, §9, §13, the rubric, `batch076-pas-klaar`, `batch076-vuilnis-dinsdag`, `076-notes.md`, `config/a1-vocabulary.json` and `scripts/a1-vocabulary.ts`. All texts are newly written. No organisation, shop, brand, street or web address is named; senders are roles ("het zwembad", "de bibliotheek", "de huisarts") plus first names from the batch pool, so there was no invented name to search.

## Items, tone, people

| # | Slug | Domain | Words | Tone | Sender | Keys |
| --: | --- | --- | --: | --- | --- | --- |
| 1 | `zwemles-donderdag` | vrije-tijd-familie | 55 | ordinary | Femke, het zwembad, to a parent (u) | B A C |
| 2 | `bieb-tijden` | vrije-tijd-familie | 56 | ordinary, notice as lines | de bibliotheek | C B A |
| 3 | `nieuwe-collega` | werk | 53 | ordinary | Omar, team leader (je/jullie); Rosa new, Ivo helps | A C B |
| 4 | `markt-buurvrouw` | wonen-buurt | 56 | **lightly funny** (the dog eats apples every day) | Dina, neighbour (je) | B A C |
| 5 | `nieuwe-dokter` | gezondheid | 53 | ordinary | de huisarts (u); new doctor Sara | C B A |
| 6 | `menu-week` | opleiding | 54 | ordinary, notice as lines | school menu | A C B |

Set 1 (items 1–3): vrije tijd, vrije tijd, werk. Set 2 (items 4–6): wonen, gezondheid, opleiding. Set 1 has two vrije-tijd items by plan, with different senders and purposes (a lesson change and opening hours). Names: Femke 1, Omar 1, Rosa 1, Ivo 1, Dina 1, Sara 1 (the doctor). Each is in one item. No voice names or older cast appear. No named person is drawn, so there are no trait lists to copy.

Premises are real: a swimming pool writes to a parent who is not there; a library notice; a team e-mail to people who are not in the room; a neighbour's message; a GP letter; a school menu. Each message gives the reader facts they do not yet have. The two notices (2, 6) are lines, one fact per line, with `\n` in `text`. Every situation and question addresses the learner with u. Friends and colleagues use je/jullie; institutions use u.

## Key balance

File order: B A C · C B A · A C B · B A C · C B A · A C B. Totals: 6 A, 6 B, 6 C. The longest run is two equal keys (items 1/2, 2/3, 3/4, 4/5, 5/6 each have a single doubled letter at the join), never three. Skills: time-place 11, detail 3, quantity 2, person 1.

## Key evidence and distractors

Wrong choices are familiar alternatives of the same kind (§4.0, §5). No object, number or person was added to a text only to feed a distractor. Where the text itself names a competing value it is the tempting distractor.

### 1 `zwemles-donderdag`
- q1 B "Op donderdag." Evidence: "De les van uw kind is deze week op donderdag." A "Op woensdag." is the old day, named in "Niet op woensdag" and tests the change. C Friday is unmentioned.
- q2 A "Handdoek en water." Evidence: "Neem een handdoek en een fles water mee." B "Jas en pet." and C "Bal en tas." are familiar swim-class or child items not mentioned.
- q3 C "In het café." Evidence: "U kunt wachten in het café." A "Bij de deur." and B "In de auto." are familiar waiting places, not mentioned.
- Facts not tested: the time (four o'clock) and "Kom vijf minuten vroeg."

### 2 `bieb-tijden` (notice)
- q1 C "Op zondag." Evidence: "Zondag: dicht." A Saturday and B Friday are open days with shorter hours ("Vrijdag en zaterdag: van tien tot vijf uur").
- q2 B "Op donderdag." Evidence: "Donderdag: van negen tot negen uur." A Monday and C Wednesday are open until six, so they are plausible but not late.
- q3 A "Niets." Evidence: "Nieuw: de kaart voor kinderen is gratis." B three and C five euro are plausible card prices, not mentioned. "Niets" is the shortest option and is not the most specific; the key is still checked against "gratis" in the evidence.
- Facts not tested: the new children's books on the table at the door; lending with a pass.

### 3 `nieuwe-collega`
- q1 A "Om negen uur." Evidence: "Zij begint om negen uur." B ten is a nearby hour; C twelve is the cake time in the same message ("Dat is om twaalf uur"), the tempting distractor.
- q2 C "Ivo." Evidence: "Ivo gaat met haar naar de keuken en de kasten." A "Omar." is the writer. B "De baas." is a plausible helper role, unmentioned.
- q3 B "Op vrijdag." Evidence: "Op vrijdag is er taart." A Monday is the start day named in the message. C Thursday is unmentioned.
- "Kasten" stands for lockers; the word list has "kast" and the picture brief shows no cupboards.

### 4 `markt-buurvrouw`
- q1 B "Op zaterdag." Evidence: "Ik ga zaterdag naar de markt." A Friday is named later as the reply deadline ("voor vrijdag"), the tempting distractor. C Sunday is unmentioned.
- q2 A "Appels." Evidence: "Ik koop ook appels voor mijn hond." B "Brood." is bought for herself in the same message. C "Een bal." is a familiar dog item, unmentioned. "Fruit" was not offered because apples are fruit.
- q3 C "Om tien uur." Evidence: "Ik wacht om tien uur bij de deur." A nine and B eleven are nearby hours, unmentioned.

### 5 `nieuwe-dokter`
- q1 C "Op 1 december." Evidence: "Op 1 december begint er een nieuwe huisarts." A and B are other first-of-the-month dates, unmentioned.
- q2 B "In de ochtend." Evidence: "Bel dan in de ochtend." C "In de middag." is the closed time in the next sentence, the tempting distractor. A evening is unmentioned.
- q3 A "Woensdag." Evidence: "Op woensdag in de middag zijn wij gesloten." B Friday and C Monday are unmentioned. The prompt "Welke dag is de huisarts gesloten?" does not say "in de middag"; see doubts.

### 6 `menu-week` (notice)
- q1 A "Op vrijdag." Evidence: "Vrijdag: soep, 2 euro." B Thursday (the cheapest broodje line) and C Monday are other lines of the menu.
- q2 C "Rijst met kip." Evidence: "Dinsdag: rijst met kip, 5 euro." A "Pasta met tomaat." (Monday) and B "Pizza." (Wednesday) are neighbouring lines.
- q3 B "Drie euro." Evidence: "Woensdag: pizza, 3 euro." A two is the soup and broodje price; C four is the pasta price. Both are on the menu, so the learner must match the dish.

## Language control

All 18 questions have prompts of at most eight words, options of at most four words, explanations of at most fourteen words. Titles are at most four words and situations at most ten. Sentences have at most ten words and join clauses at most once with en/maar/of. The checker's 13-word warning on item 1 is the greeting "Beste meneer, mevrouw," joined to the first sentence; the sentence itself has ten words. No word outside `config/a1-vocabulary.json` was needed.

## Diversity against A1 reading

Settings that are new for A1 reading: swimming lesson, library opening hours, new colleague, market trip, new GP, school menu. Neighbour (4) and library (2) echo step 1 topics (`pas-klaar`, `vuilnis-dinsdag`) but the purpose differs. The six messages ask for six different information structures: a changed day, a weekly table, an introduction and a schedule, an invitation with a deadline, an announcement with conditions, and a menu.

## Requested words

None. Rephrased instead: "zwemles" to "de les" at "het zwembad"; "kantine" to "school"; "praktijk" and "gebouw" to "wij zitten op hetzelfde adres"; "voordeur" to "de deur"; "woensdagmiddag" to "op woensdag in de middag".

## Doubts for the reviewer

1. `nieuwe-dokter` q3 asks for the closed day, but the practice is closed only on Wednesday afternoon. A reader may say "closed in the afternoon" is the true fact. Possible repair: "Wanneer is de huisarts gesloten?" with options "Woensdag in de middag." etc.
2. `nieuwe-dokter` uses a digit date ("1 december"); the checker accepts it. A1 learners know dates in digits, but the reviewer may prefer "op de eerste van december".
3. `menu-week` and `bieb-tijden`: the notice lines use "van … tot … uur" and "euro" with digits; both pass the checker.
4. `nieuwe-collega` "de kasten" for lockers may be unclear without a picture; the picture deliberately does not show them.
5. `markt-buurvrouw`: the dog joke is one sentence and sits inside a plain errand; it does not use idiom. If the reviewer finds it unrelated, replace with "Ik koop ook een kilo appels."
6. `zwemles-donderdag`: "Heeft u een vraag? Bel ons." adds no tested fact; it makes the message complete.

## Checker output

```
Checked 6 items, 18 questions. Keys: {"B":6,"A":6,"C":6}. Options: {"3":18}.
  warn  A1:reading:batch101-zwemles-donderdag:1: longest sentence 13 words (A1 target 12)
1 warning(s), no failures.
```
