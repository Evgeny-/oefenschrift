# Batch 081: twelve A1 writing messages (9 rewrites, 3 new)

Author draft, 28 October 2026, following `docs/briefs/a1-rebuild-2026-10-28.md` ("081 — writing"), `docs/briefs/author.md` and the simplified A1 profile in `content/blueprint.md` §4.0. This is an unreviewed draft. A separate reviewer must read the full final JSON and the starters, and record `replaces` for the nine rewrites.

All twelve items use `exam: a1-practice`, `part: writing`, `taskType: bericht`, `rubric: a1-schrijven`, `status: draft` and `targetLevelValidated: false`. Each has one drawing (`size: still`), three bilingual criteria and the blueprint's language criterion "De ander begrijpt uw bericht. Kleine fouten zijn oké.". No difficulty validation, exam likeness or official scoring is claimed. No organisations, brands, addresses or real people appear, so no name search was needed.

## Replaces

The nine rewrites keep their IDs and their existing set membership:

- `A1:writing:batch074-schoenlunch:1`
- `A1:writing:batch074-appelui:1`
- `A1:writing:batch074-ontbijttaart:1`
- `A1:writing:batch074-lepelmuziek:1`
- `A1:writing:batch074-tuinfilm:1`
- `A1:writing:batch074-fietsfeest:1`
- `A1:writing:batch074-stoelsokken:1`
- `A1:writing:batch074-reuzenbox:1`
- `A1:writing:batch074-komhoed:1`

New: `A1:writing:batch081-bus-laat:1`, `A1:writing:batch081-schoenen-klein:1`, `A1:writing:batch081-hond-hoed:1`.

What changed in the rewrites:

- Every prompt now follows the formula: one or two situation sentences, "Kijk naar het plaatje.", two short commands or direct questions. No "Zeg wat/waar …" clauses. Prompts are 23–32 words, previously up to 46.
- Criteria name the goal without the picture fact, because the criteria for `bericht` are shown before the learner writes (`OpenExercise.tsx`). The grader receives the Dutch alt text (`server/services.ts`), so alts carry the facts.
- New people from the pool: Gijs, Hugo, Selma, Ravi, Dewi, Lars, plus unnamed roles (de buurvrouw, uw baas, de winkel). None of the old cast (Julio, Roos, Modibo, Sabrina) remains.
- Samples: each one has a different beginner error, where 074 used "X zijn …" seven times.
- Premises: `appelui` was a mix-up message to a shop, too close to the new `schoenen-klein`. It is now a reply from the supermarket to a brother who asked for apples, when there are no apples. `lepelmuziek` gave the picture no role. Now the picture shows the learner's own piano and answers Ravi's "wat speel jij?". `fietsfeest` had only a context picture. Now the picture shows a flat tyre, and the learner proposes another day. `stoelsokken` (a teacher reserving chairs by photo) is replaced by a classmate who left a scarf on his chair after the lesson. `ontbijttaart`, `tuinfilm`, `komhoed`, `schoenlunch` and `reuzenbox` keep their scenes in simpler words.

## Tone

| Item | Tone |
| --- | --- |
| ontbijttaart | ordinary |
| schoenlunch | ordinary |
| appelui | ordinary |
| lepelmuziek | ordinary |
| tuinfilm | ordinary |
| fietsfeest | ordinary |
| komhoed | ordinary |
| reuzenbox | lightly funny: one spoon in an enormous box (stays funny, as planned) |
| stoelsokken | ordinary |
| bus-laat | ordinary |
| schoenen-klein | ordinary |
| hond-hoed | lightly funny: the dog wears the learner's hat (new, as planned) |

Two funny items in total, as the plan asks.

## People and visual traits

Named people are recipients only and are never drawn, so no named traits need to match across briefs.

| Name | Role | Items |
| --- | --- | --- |
| Selma | friend (vriendin) | ontbijttaart, tuinfilm |
| Hugo | the learner's brother (uw broer) | appelui, fietsfeest |
| Ravi | friend (uw vriend) | lepelmuziek, hond-hoed |
| Gijs | colleague | schoenlunch |
| Dewi | friend (uw vriendin) | komhoed |
| Lars | classmate (cursist) | stoelsokken |

Each name appears in at most two exercises and keeps one relationship. Unnamed drawn figures (each is the learner, drawn once):

- reuzenbox: adult woman, short grey hair, terracotta jumper.
- bus-laat: man in his thirties, short dark hair, dusty blue raincoat (charcoal umbrella).
- schoenen-klein: woman, dark ponytail, sage green jumper.

The other nine pictures show objects or a place without people (the learner's bag, a fruit table, a piano, a garden, a bicycle, a classroom chair, a drawing, the dog).

## Why the learner writes to this recipient

| Item | Recipient | Reason, recipient absent |
| --- | --- | --- |
| ontbijttaart | Selma | She sent a photo of her birthday cake and asks what the learner drinks tomorrow. |
| schoenlunch | Gijs | He is at the bakery and asks what the learner has for lunch; he can buy something. |
| appelui | Hugo | He is at home and asked the learner to bring apples; the shop has none. |
| lepelmuziek | Ravi | He plays guitar and asks what the learner plays; the learner invites him to play together. |
| tuinfilm | Selma | She comes to watch a film tonight and does not know it is outside; she needs to know what to bring. |
| fietsfeest | Hugo | He wants to cycle tomorrow; the learner's bicycle is broken, so they need another day. |
| komhoed | Dewi | She sent a photo of her drawing from her course; a reaction and a request for more is natural. |
| reuzenbox | buurvrouw | She brought the huge parcel and asks by message what was inside. |
| stoelsokken | Lars | He has gone home and asks if something is on his chair; the learner wants to bring it to him. |
| bus-laat | uw baas | The bus does not come; the boss must know the learner is late and when they arrive. |
| schoenen-klein | de winkel | The shop sent the shoes, which are too small; only the shop can send another size. |
| hond-hoed | Ravi | Ravi likes the dog; the funny sight is a reason to invite him over. |

None of the messages tells the recipient something they already see: Selma and Dewi see their own work, but the opinion is new to them. The picture shows what the learner sees.

## Prompt, criteria and model

| Item | Goal 1 (prompt → criterion → model) | Goal 2 (prompt → criterion → model) | Picture supplies | Sample omits / error |
| --- | --- | --- | --- | --- |
| ontbijttaart | "Zeg iets over haar taart." → U zegt iets over de taart. → "Wat een mooie taart!" | "Geef ook antwoord op haar vraag." → U noemt iets om te drinken. → "Ik drink graag thee." | the cake to react to | goal 1 / "Ik drinkt" (verb ending after ik) |
| schoenlunch | "Noem het eten in uw tas." → U noemt het eten in uw tas. → "Ik heb een banaan." | "Vraag Gijs om iets van de bakker." → same → "Neem je een broodje voor mij mee?" | banana in the bag | goal 1 / "Jij kopen" (infinitive for finite verb) |
| appelui | "Vertel Hugo over de appels." → U vertelt Hugo iets over de appels. → "Er zijn hier geen appels." | "Noem ander fruit in de winkel." → same → "Wil je peren?" | no apples; pears and bananas | goal 2 / "heeft niet appels" (niet for geen) |
| lepelmuziek | "Geef Ravi antwoord." (to "wat speel jij?") → U geeft antwoord op de vraag van Ravi. → "Ik speel piano." | "Vraag hem om bij u te komen spelen." → U vraagt Ravi om bij u te spelen. → "Kom je zaterdag bij mij spelen?" | the learner's piano | goal 1 / "Zaterdag wij spelen" (no inversion) |
| tuinfilm | "Vertel Selma: waar is de film?" → same → "De film is buiten in de tuin." | "Vraag haar om iets mee te nemen." → same → "Neem je een jas mee?" | garden screen, evening | goal 1 / "Neem je mee een deken?" (separable particle) |
| fietsfeest | "Vertel Hugo: wat is er met uw fiets?" → same → "Mijn fiets is kapot." | "Noem een andere dag." → same → "Kunnen we zaterdag fietsen?" | flat front tyre | goal 2 / "mijn fiets heeft kapot" (hebben for zijn) |
| komhoed | "Zeg iets over haar tekening." → U zegt iets over de tekening. → "Je bloem is heel mooi!" | "Vraag om nog een foto." → same → "Stuur je nog een foto?" | the flower drawing | goal 1 / "Stuurt je" (-t after inversion with je) |
| reuzenbox | "Vertel het haar." (to "wat zit er in de doos?") → U vertelt: wat zit er in de doos? → "Er zit één lepel in!" | "Zeg ook iets over de doos." → same → "De doos is veel te groot." | one spoon in a huge box | goal 2 / "het doos" (article) |
| stoelsokken | "Vertel Lars: wat ligt er?" → U vertelt Lars: wat ligt er op zijn stoel? → "Je blauwe sjaal ligt op je stoel." | "Vraag hem om zijn adres." → U vraagt Lars om zijn adres. → "Wat is je adres?" | blue scarf on the chair | goal 1 / "Waar is je adres?" (question word) |
| bus-laat | "Vertel uw baas over de bus." → same → "Mijn bus is laat." | "Zeg ook: hoe laat bent u er?" → U noemt de tijd. Dan bent u op uw werk. → "Ik ben om tien uur op het werk." | waiting in the rain, no bus | goal 1 / "op werk" (missing article) |
| schoenen-klein | "Vertel de winkel over de schoenen." → same → "Mijn nieuwe schoenen zijn te klein." | "Vraag om een andere maat." → same → "Heeft u maat 42?" | heel sticks out of the shoe | goal 2 / "De schoenen is" (agreement) |
| hond-hoed | "Vertel Ravi: wat draagt de hond?" → same → "Mijn hond draagt mijn hoed!" | "Vraag hem om te komen kijken." → same → "Kom je kijken?" | dog in the learner's hat | goal 2 / "mij hoed" (mij for mijn) |

Prompts are 23–32 words with sentences of at most eight words; models are 8–12 words in two sentences. Seven samples omit goal 1, five omit goal 2. Every non-null quote is verbatim. The language-criterion quote repeats the sentence that carries the error, which is still understandable.

## Proposed sets of three (easiest first)

The three existing sets keep their members; the new items form a fourth set.

| Set | Order | People | Domains |
| --- | --- | --- | --- |
| existing set 1 (food) | ontbijttaart, schoenlunch, appelui | Selma, Gijs, Hugo | vrije-tijd-familie, werk, winkels-diensten |
| existing set 2 (doing things together) | lepelmuziek, tuinfilm, fietsfeest | Ravi, Selma, Hugo | vrije-tijd-familie |
| existing set 3 (looking at something) | komhoed, reuzenbox, stoelsokken | Dewi, buurvrouw, Lars | opleiding, winkels-diensten, opleiding |
| new set (problems and surprises) | schoenen-klein, bus-laat, hond-hoed | de winkel, uw baas, Ravi | winkels-diensten, werk, vrije-tijd-familie |

Each set has three different people and three different settings. The two funny items are in different sets (set 3, new set).

## Overlap with other batches

Checked against the 082 plan. `tuinfilm` and 082 `eten-zaterdag` both ask a friend to bring something; here the reason is that the film is outside in the evening. 082 `markt-moeder` also has the learner in a shop; `appelui` reports a missing item and offers a substitute rather than listing purchases. New slugs do not collide with writing slugs in the catalogue (`002-schoenen` exists; `schoenen-klein` is distinct).

## Requested words

None required. Words I avoided for lack of a list entry, which could make later scenes easier: `later` (comparative of laat), `groter` (so "een andere maat" instead of "een grotere maat"), `ding`, `plek`, `scherm`, `wiel`, `kaars`, `aardbei`. The coordinator said `passen` is too hard, although it is on the list, so `schoenen-klein` uses "doet u ze aan".

## Doubts for the reviewer

- `lepelmuziek`: a piano without a person must read as "this is what I play". The alt says "Bij u thuis staat een piano". If the rendered image is unclear, consider "Op het plaatje ziet u uw piano." as a second situation sentence.
- `appelui`: an empty crate must read as "no apples". The prompt names apples and the picture has none, so "Er zijn geen appels" should follow even if the crate is ignored.
- `bus-laat`: goal 1 ("Vertel uw baas over de bus") accepts "De bus komt niet" or "De bus is laat". "U wacht al lang op de bus" implies the delay without printing it.
- `stoelsokken`: the sample "Ik neem het mee" implies something lies there but does not name it, so it fails goal 1 as intended. Bringing a classmate's scarf to his home (hence the address) is plausible, but "Ik neem hem mee naar de les" would be just as natural. The reviewer may prefer a different second goal.
- Criteria of the form "U vertelt X: wat …?" mirror the direct-question commands. They are main clauses but read a little stiffly.
- `ontbijttaart`: the original breakfast was dropped. Selma asks what the learner drinks at her birthday. The slug no longer describes the scene, which the plan allows.

## Checker output

```text
npm run batch:check -- content/batches/081-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/081-original.json

Checked 12 items, 0 questions. Keys: {}. Options: {}.
  info  9 of 12 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

The starters (`081-starters.json`) pass the same word check. Both JSON files pass `prettier --check`.
