# Batch 102 author notes

Author: Claude author agent (Sonnet), 22 November 2026. Six new A1 step 2 listening conversations (`a1Step: 2`), written under `docs/briefs/content-round-2026-11-22.md` (section 102), `docs/briefs/author.md`, blueprint §4.0 (simplified profile, listening, A1 step 2), §5–§9 and the rubric. Difficulty is an authoring target only (`targetLevelValidated: false`). No audio or pictures were generated. A separate reviewer must read the full final source.

## Provenance and facts

Everything is original. No real organisations, shops, brands, addresses or people are named: roles only ("de kapper", "de verkoper", "de juf"). Prices (haircut twenty euro, bike repair fifteen euro) and times are plausible round figures, not claims about a provider. Item 3 uses "het bos" instead of the zoo, because "dierentuin" is not on the word list; the slug is therefore `juf-bos`, not `juf-dierentuin`. No requested words.

## Items and figures

Spoken words exclude speaker labels. Each turn has at most twelve words and each sentence at most nine (enforced by the checker).

| Slug | Domain | Tone | Words | Turns | Roles | Skills | Keys |
| --- | --- | --- | ---: | ---: | --- | --- | --- |
| `kapper-bellen` | winkels-diensten | ordinary | 50 | 6 | De kapper `f-adult`, Mert `m-young` | person, time-place, quantity | A, C, B |
| `fiets-klaar` | vervoer | ordinary | 48 | 7 | Aylin `f-young`, De verkoper `m-shop` | time-place, detail, quantity | B, A, C |
| `juf-bos` | opleiding | ordinary | 54 | 7 | Jonas `m-adult`, De juf `f-mature` | time-place, detail, time-place | C, B, A |
| `nieuwe-buren` | wonen-buurt | ordinary | 48 | 6 | Saar `f-young`, Joep `m-casual` | detail, time-place, time-place | A, B, C |
| `pauze-werk` | werk | **lightly funny** ("de koffie is gratis, maar niet lekker") | 51 | 7 | Lena `f-young`, Timo `m-young` | time-place, detail, time-place | C, A, B |
| `oma-jarig` | vrije-tijd-familie | ordinary | 48 | 6 | Nora `f-young`, Mert `m-young` | time-place, time-place, person | B, C, A |

Key sequence: A C B B A C C B A A B C C A B B C A. Six per letter, no letter three times in a row, no key is the longest option. Each name appears in at most two items (Mert in 1 and 6). No `m-adult` with `f-adult`; no voice name used as a character. `text` is the mechanical join of the script lines; every evidence quote is a verbatim substring of one turn. All numbers and times are in words. People inside conversations use je (friends, colleagues, neighbours) or u (kapper, verkoper, juf).

## Questions: key rationale and distractors

Each question tests one fact stated once in one turn; the three facts of an item sit in three different turns.

1. `kapper-bellen`
   - q1 (turn 2): the appointment is for his son. B tests a familiar relative, C tests the caller himself.
   - q2 (turn 3): Friday at four. The distractors are other full hours (three, five), not stated.
   - q3 (turn 5): twenty euro. The distractors are other round prices (fifteen, thirty).
2. `fiets-klaar`
   - q1 (turn 2): Thursday. The distractors are the days on either side.
   - q2 (turn 4): a new lamp. The distractors are a familiar bike part (band) and an unrelated object (tas).
   - q3 (turn 6): fifteen euro. The distractors are the sound-alike fifty and the plausible twenty.
3. `juf-bos`
   - q1 (turn 2): the woods. The distractors are park and strand, both usual class outings.
   - q2 (turn 4): lunch. The distractors are jas and bal, plausible school-trip items not stated.
   - q3 (turn 6): three o'clock. The distractors are the hours on either side.
4. `nieuwe-buren`
   - q1 (turn 1): number twelve. The distractors are the neighbouring numbers eleven and thirteen. Twelve against "twee" (the children) is a small memory load; the children are asked about nowhere.
   - q2 (turn 3): hospital. The distractors are school and shop, other familiar workplaces.
   - q3 (turn 5): Sunday. The distractors are Saturday and Monday.
5. `pauze-werk`
   - q1 (turn 3): half past twelve. The distractors are twelve and one o'clock.
   - q2 (turn 5): the coffee is free. B is a drink not mentioned, C the lunch.
   - q3 (turn 7): four o'clock on Friday. The distractors are three and five.
6. `oma-jarig`
   - q1 (turn 1): Sunday. The distractors are Saturday and Monday.
   - q2 (turn 2): two o'clock. The distractors are three and four.
   - q3 (turn 4): Mert buys the flowers. Nora is the tempting name, because she brings the cake, and "their mother" is a familiar family member who is not mentioned.

## Language control

Present tense, main clauses only, at most one en/maar/want/of/dan per sentence (only "maar" in `pauze-werk`). Modals on the list only (kunt). Separable verb on the list: meenemen. The checker reported no word outside `config/a1-vocabulary.json` and no warnings. "Pinpas", "kapot" and "lunch" are plain list words tied to their pictures.

## Tone, pictures and diversity

Only `pauze-werk` is lightly funny; the joke uses list words and adds no tested fact. Each item has one context picture that shows the setting and not a tested fact. These cast traits are authored in the briefs; no person is drawn in two items except Mert (item 1 and 6 briefs use the same traits: young man, short curly dark hair, olive green jacket).
- `kapper-bellen`: Mert alone at home on the phone, with no child, hairdresser or clock.
- `fiets-klaar`: a bike shop with a customer and a seller, with no lamp, price or day shown.
- `juf-bos`: a parent and a teacher at a school door, with no trees, bags or lunch shown.
- `nieuwe-buren`: two neighbours at a front door, with no number or hospital clothes shown.
- `pauze-werk`: two colleagues with cups at a kitchen table, with no clock or lunch shown.
- `oma-jarig`: two siblings on a sofa with a phone, with no cake, flowers or presents shown.

Against the catalogue: settings are new in A1 listening (kapper, fietsenwinkel, schoolbos, nieuwe buren, pauze, verjaardag of oma); `gemeente`, `dokter`, `markt` and `zwembad` are untouched.

## Doubts for the reviewer

- `juf-bos` and `fiets-klaar` name a day or hour in two turns, and the day or hour is a tested fact only once. Check for memory load.
- `kapper-bellen` mentions Saturday (Mert's wish and the "vol" reply) before the tested Friday and four o'clock. This is a natural competing detail, but it is the item with the most.
- `nieuwe-buren` Saar is the caller's neighbour, and the invitation comes from Saar, as planned. Is "Heb je ook kinderen?" an unneeded extra? It adds length and no tested fact.
- Word counts of 48–54 are in the lower half of 45–65, as the word list leaves little room for plain detail.

## Checker output

```
$ npx tsx scripts/batch-check.ts content/batches/102-original.json
Checked 6 items, 18 questions. Keys: {"A":6,"C":6,"B":6}. Options: {"3":18}.
No failures, no warnings.
```
