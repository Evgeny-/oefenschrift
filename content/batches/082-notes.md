# Batch 082: twelve new A1 writing messages

Author draft, 28 October 2026, written to `docs/briefs/a1-rebuild-2026-10-28.md` section "082 — writing", `docs/briefs/author.md`, blueprint §3, §4.0 (Simplified A1 profile; Speaking and writing foundation tasks), §7 and §8, and `content/reviews/rubric.md`. It has not been reviewed. A separate reviewer must read the full final JSON and starters, and record the passing hash.

All twelve items: `exam: a1-practice`, `part: writing`, `taskType: bericht`, `rubric: a1-schrijven`, `status: draft`, `targetLevelValidated: false`, one `drawing` with brief, Dutch alt and `size: still`. Three criteria each: two content goals and the blueprint's language criterion `De ander begrijpt uw bericht. Kleine fouten zijn oké.` Every prompt follows the formula: one or two situation sentences, `Kijk naar het plaatje.`, a "Schrijf … een bericht/kaart" line, and two short commands naming the goals. Every brief ends with "No text, letters, numerals, signs, clock faces or logos." No real organisation, shop, street or brand is named, so no name search was needed. No CEFR validation or exam equivalence is claimed.

## Tone

Ten ordinary, two lightly funny (as planned): `kat-tuin` (the neighbour's cat sleeps in a flower pot as if it were a flower) and `grote-tomaat` (a tomato as big as a chair seat). Both jokes are carried by the picture and need only list words (`kat`, `slaapt`, `bloemen`, `heel grote tomaat`).

## Items

Word counts split on whitespace, as the checker does. No prompt sentence exceeds eight words; no model sentence exceeds eight words.

| Slug | Domain | Tone | Recipient and why they need the message | Prompt words | Model words |
| --- | --- | --- | --- | ---: | ---: |
| pas-kwijt | instanties | ordinary | The library: the learner wants to borrow books and cannot find the pass, so asks for a replacement. | 32 | 10 |
| ziek-les | gezondheid | ordinary | Saskia, the Dutch teacher, at school: she expects the learner in today's lesson. | 29 | 13 |
| tandarts-ander | gezondheid | ordinary | The dentist: the learner must work at the time of Tuesday's appointment and needs another day. | 33 | 10 |
| taart-vrijdag | werk | ordinary | Colleagues (group message from home): the learner's birthday treat on Friday; their drink choice decides what the learner brings. | 27 | 12 |
| pakket-buren | wonen-buurt | ordinary | Noa, the neighbour, is out; her parcel was handed to the learner and she does not know where it is. | 33 | 13 |
| kat-tuin | wonen-buurt | funny | Sven, the neighbour, is looking for his cat; only the learner can see it from the window. | 29 | 13 |
| in-de-trein | vervoer | ordinary | Layla will pick the learner up and asks by message "waar ben je?"; the answer is a reply. | 33 | 15 |
| boek-vergeten | opleiding | ordinary | The teacher: the learner is at home, the book is at school, and a photo of the homework lets the learner do it tonight. | 34 | 14 |
| eten-zaterdag | vrije-tijd-familie | ordinary | Amal, a friend: invitation for Saturday; the table has empty glasses and no drinks. | 29 | 14 |
| vakantie-strand | vrije-tijd-familie | ordinary | Grandma at home, who likes post: a holiday card. | 26 | 11 |
| markt-moeder | winkels-diensten | ordinary | Mother at home: the learner is at the market now and can buy something for her. | 27 | 12 |
| grote-tomaat | vrije-tijd-familie | funny | Bilal, a friend, not present: news of the huge tomato and an invitation for soup. | 28 | 12 |

## Prompt, criteria, model and picture mapping

The prompt names each goal without printing the fact the learner writes. Where a fact is needed, it comes from the picture (P) or is the learner's own choice (C); where a goal is a request, the command names the request and the learner turns it into a question (R).

| Slug | Goal 1 (source) | Goal 2 (source) | Model | Sample omits | Sample errors |
| --- | --- | --- | --- | --- | --- |
| pas-kwijt | pass is lost (P: empty coat pockets; prompt only says "U zoekt uw pas") | ask for a new pass (R) | `Mijn pas is kwijt. Mag ik een nieuwe pas?` | goal 2 | article: `De pasje` |
| ziek-les | ill (P: in bed with thermometer; prompt asks "waarom") | which day the learner comes back (C) | `Ik ben ziek. Ik kom vandaag niet. Vrijdag kom ik weer.` | goal 1 | verb form: `Ik komen` |
| tandarts-ander | cannot come on Tuesday (premise: Tuesday appointment, work then) | ask for another day; naming a day passes (R/C) | `Ik kan dinsdag niet komen. Kan ik donderdag komen?` | goal 2 | negation order: `Ik kan niet dinsdag.` |
| taart-vrijdag | brings a cake on Friday (P: man holding a cake) | ask what colleagues drink (R) | `Vrijdag neem ik een taart mee. Wat willen jullie drinken?` | goal 1 | pronoun/agreement: `Wat willen jij drinken?` |
| pakket-buren | has a parcel for Noa (P: woman holding a parcel; prompt says only "iets") | when Noa can collect it (C) | `Ik heb een pakket voor jou. Je kunt het vanavond halen.` | goal 2 | pronoun: `van jij` |
| kat-tuin | the cat is in the garden (P; prompt says only "U kijkt uit het raam") | the cat sleeps (P) | `Je kat is in mijn tuin. Hij slaapt in de bloemen.` | goal 2 | possessive: `mij tuin` |
| in-de-trein | the learner is on the train (P) | what time at the station (C) | `Ik zit in de trein. Om vier uur ben ik op het station.` | goal 1 | plural: `vier uren` |
| boek-vergeten | the book is at school / in the classroom (P: thought bubble; prompt only says it is not in the bag) | ask for a photo of the homework (R) | `Mijn boek ligt op school. Kunt u een foto van het huiswerk sturen?` | goal 2 | gender: `Hij ligt` for `het boek` |
| eten-zaterdag | ask whether Amal comes to eat on Saturday (R) | ask her to bring a drink; any drink passes (R/C; P: empty glasses) | `Kom je zaterdag bij mij eten? Neem je iets te drinken mee?` | goal 2 | word order: `Zaterdag ik kook.` |
| vakantie-strand | beach or sea (P) | warm or sunny (P) | `Lieve oma, ik ben aan zee. Het is warm en zonnig.` | goal 2 | verb form: `ik bent` |
| markt-moeder | buying pears; "fruit" passes (P) | ask what mother needs (R) | `Ik koop peren op de markt. Wat heb jij nodig?` | goal 1 | spelling: `nodich` |
| grote-tomaat | has a big tomato (P; prompt says "Zeg wat u in uw tuin hebt") | ask whether Bilal comes for soup (R) | `Ik heb een heel grote tomaat. Kom je soep eten?` | goal 2 | verb form: `Ik hebben` |

Errors are varied across the batch: article, verb form (three different verbs), negation order, pronoun (two kinds), possessive, plural, gender, word order and spelling. None makes a message unintelligible. Each sample has exactly one null quote in a content-goal position; the other quotes are verbatim. The samples are not vocabulary-checked by the script but stay within list words apart from the deliberate misspellings.

Titles do not supply picture-derived goals: `De kat van Sven` (no garden), `Layla wacht` (no train), `In de tuin` (no tomato), `Iets voor de buurvrouw` (no parcel), `Jarig op het werk` (no cake), `Op de markt` (no pears). Starters (`082-starters.json`) leave every fact open: e.g. `Mijn pas is …`, `Je kat is …`, `Nu … hij.`, `Ik ben om … daar.`; the third starter of each item is a greeting opener with the recipient's name or role.

## People and visual traits

Names come from the batch pool; each is used once: Saskia (teacher, ziek-les), Noa (neighbour, pakket-buren), Sven (neighbour, kat-tuin), Layla (friend, in-de-trein), Amal (friend, eten-zaterdag), Bilal (friend, grote-tomaat). None of them is drawn, because every recipient is absent. Unnamed roles: de bibliotheek, de tandarts, uw collega's, uw docent, oma, mama, a market seller.

The drawn figure in each picture is the learner (unnamed), each with three traits and no figure reused:

| Slug | Drawn person |
| --- | --- |
| pas-kwijt | woman about 30, short curly black hair, mustard yellow coat |
| ziek-les | man about 40, short brown hair, grey pyjamas |
| tandarts-ander | woman about 50, short grey bob, sage green work apron |
| taart-vrijdag | man about 30, shaved head, dusty blue shirt |
| pakket-buren | woman about 60, white hair in a bun, terracotta cardigan |
| kat-tuin | no person; grey cat in a terracotta pot of yellow flowers |
| in-de-trein | man in his twenties, curly black hair, mustard yellow jumper |
| boek-vergeten | woman about 25, dusty blue headscarf, grey jumper |
| eten-zaterdag | man about 40, short black beard, sage green apron |
| vakantie-strand | woman about 30, long dark hair, straw sun hat |
| markt-moeder | man about 60, short white beard, grey flat cap, dark blue jacket; seller: woman in a terracotta apron |
| grote-tomaat | woman about 40, red-brown ponytail, sage green garden gloves |

Picture checks for media review: pas-kwijt pockets visibly empty and no card anywhere; ziek-les thermometer without a display; pakket-buren parcel without labels and the second door closed; kat-tuin cat clearly asleep inside the pot; boek-vergeten thought bubble reads as a book in a classroom; eten-zaterdag glasses empty and no bottles; markt-moeder pears recognisable, no price tags.

## Proposed sets of three

Each set has three different settings and recipients, at most one funny item, easiest first (both goals from the picture or one picture fact plus a simple request).

| Order | Set | Items | Why this order |
| --- | --- | --- | --- |
| 1 | Even laten weten | `vakantie-strand`, `in-de-trein`, `markt-moeder` | Two picture facts; one picture fact plus a chosen time; one picture fact plus a question to mother. |
| 2 | Bij de buren | `kat-tuin` (funny), `pakket-buren`, `eten-zaterdag` | Two picture facts; a picture fact plus a chosen time; two requests. |
| 3 | Ik kom niet | `ziek-les`, `pas-kwijt`, `tandarts-ander` | Picture fact plus a day; picture fact plus a request; a day from the premise plus a request for another day. |
| 4 | Thuis en werk | `grote-tomaat` (funny), `taart-vrijdag`, `boek-vergeten` | Picture fact plus invitation; picture fact plus a question; picture fact plus a polite `u` request. |

## Deviations and doubts for the reviewer

- `boek-vergeten`: the plan says "ask which page". `bladzijde` and `pagina` are not on the word list, and a page number is of little use without the book. The second goal is therefore "ask for a photo of the homework", which gives the message a working purpose. If the coordinator prefers the plan's version, `bladzijde` would be needed (see Requested words).
- `tandarts-ander`: the Tuesday fact is in the premise, so goal 1 is a transformation (`u kunt niet` → `ik kan niet`) rather than a picture fact. The picture (the learner at work in a shop) agrees with the prompt but supplies no compulsory fact. Accept `Dinsdag kan ik niet.` and similar.
- `eten-zaterdag`: both goals are requests named in the commands, as `schoenlunch` did in batch 074. The empty glasses make the drink request visible. Accept any drink (`sap`, `water`, `cola`, `iets`).
- `in-de-trein` and `pakket-buren`, and `ziek-les`: the time or day is the learner's choice; any time or day passes.
- `ziek-les`: `Dat bent u.` tells the learner the drawn man is themselves. Check that it reads naturally; `koorts` and `griep` are accepted for goal 1.
- `kat-tuin`: the flower pot is drawn, but the Dutch says `in de bloemen` because `bloempot` and `pot` are not on the list. The criterion asks only for the garden.
- `taart-vrijdag`: the prompt says `U bent nu thuis.` so the colleagues cannot see the cake.

## Requested words

None are required for this draft. Optional, only if the coordinator wants the plan's exact wording: `bladzijde` (boek-vergeten, "which page") and `bloempot` (kat-tuin).

## Checker output

```text
npm run batch:check -- content/batches/082-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/082-original.json

Checked 12 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```
