# Batch 063 author notes

A2 speaking, 16 items, 19 October 2026. Authorised replacement (rewrite) batch.

## Replacement and reason

On 19 October 2026 a learner filed report 6 against `A2:speaking:batch001-apotheek:1`: "In de opdracht staat al waar Roos is. De vraag over hulp bij de apotheek is onduidelijk." The project owner confirmed it and asked for every similar exercise to be checked. The independent audit of all 59 A2 speaking items is `tmp/content-fix-2026-10-19/audit/a2-speaking.md`. The fixes accepted by the coordinator are in `tmp/content-fix-2026-10-19/spec/063.md`, and the round rules are in `tmp/content-fix-2026-10-19/spec/common.md`.

The same day the app made the spoken cue the main player ("Luister naar <speaker>"). A printed prompt or title that repeats a cue question makes listening pointless.

Every item keeps its ID, its set membership and its order. All 16 IDs go in the review's `replaces` list, in this order:

1. `A2:speaking:batch001-apotheek:1`
2. `A2:speaking:batch003-jas:1`
3. `A2:speaking:batch003-speeltuin:1`
4. `A2:speaking:batch003-monteur:1`
5. `A2:speaking:batch027-keuken:1`
6. `A2:speaking:batch026-regen:1`
7. `A2:speaking:buurvrouw:1`
8. `A2:speaking:te-laat:1`
9. `A2:speaking:batch001-koelkast:1`
10. `A2:speaking:batch009-bushalte:1`
11. `A2:speaking:batch027-ziekmelden:1`
12. `A2:speaking:batch027-cursuskeuze:1`
13. `A2:speaking:batch009-ochtenddienst:1`
14. `A2:speaking:batch002-burenpakket:1`
15. `A2:speaking:batch009-verjaardag:1`
16. `A2:speaking:batch003-tramkaart:1`

Base: `tmp/content-fix-2026-10-19/base/063-base.json`, which holds the published records with media removed. Starters base: `tmp/content-fix-2026-10-19/base/063-starters-base.json`. In every record `status` is now `"draft"`. Fields not listed below are byte-identical to the base. That covers every image `brief`, `kind` and `size`, every `cue` and all metadata. No media or derived fields were added.

Visibility, from `app/components/OpenExercise.tsx`:

- Items 1–3, 5, 6, 9 and 14–16 have no cue. Their criteria, starters and title are visible while the learner answers.
- Items 4, 7, 8 and 10–13 have a cue. Their criteria and starters appear only at review.
- The feedback judge receives the prompt, the criteria and the numbered alts (`server/services.ts`, `pictureFor`). It does not receive the title, the model or the brief.

I looked at the pictures for items 1, 2, 3, 5, 6, 14 and 15.

## Changes per item

### 1. `A2:speaking:batch001-apotheek:1` (picture-describe, the reported item)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| title | Bij de apotheek | Roos heeft medicijnen nodig | The visible heading named the place that C0 asks for. |
| prompt | Roos is bij de apotheek. Vertel waar Roos is. Noem twee dingen die de mensen doen. Vertel ook wat u van hulp bij de apotheek vindt. Gebruik het plaatje. | Roos heeft medicijnen nodig. Vertel waar Roos is. Noem twee dingen die de mensen doen. Vindt u het zelf makkelijk om medicijnen te halen? Vertel ook waarom. Gebruik het plaatje. | Report 6. The situation is now a neutral need and names no place, action or near-place. As the spec requires, it avoids "recept van de huisarts", which would set a "bij de huisarts" trap. The opinion question is concrete and about the learner's own life. "zelf" makes clear that the question is about the learner, not Roos. The "…? Vertel ook waarom." pattern follows the koelkast prompt. The three kept sentences are unchanged. |
| criteria[1] | Noem twee handelingen op het plaatje. / Name two actions in the picture. | Noem twee dingen die de mensen doen. / Name two things the people are doing. | "handelingen" is above A2 and is visible. The criterion now matches the prompt. |
| criteria[2] | Geef uw mening over hulp bij de apotheek. / Give your opinion of help at the pharmacy. | Zeg of u medicijnen halen makkelijk vindt, en waarom. / Say whether you find collecting medicine easy, and why. | Matches the new question. It names no place. |
| model | … Ik vind hulp daar fijn, omdat ik soms een vraag over mijn medicijnen heb. | … Ik vind medicijnen halen makkelijk, want de apotheek is dicht bij mijn huis. | Answers the new C2 with a reason. The first three sentences are unchanged and keep "papier", as the picture shows. 33 words. |
| images[0].alt | Roos geeft een papier aan een medewerker bij een balie. Hij pakt een doosje. | Roos staat bij de balie van een apotheek. Ze geeft een papier aan een medewerker. Hij pakt een doosje. | The prompt no longer names the place, so the judge can verify "waar Roos is" only through the alt. Wording as the spec proposes. The brief is unchanged. |
| starters[2] | Hulp bij de apotheek vind ik … | Medicijnen halen vind ik …, want … | Follows the new question, names no place and leads to the reason. |

The sample and quotes are unchanged. Quote 0 "Roos staat in een apotheek." still meets C0, quote 1 meets the reworded C1, and the null stays on C2. Starters 0 and 1 name no place and are unchanged.

### 2. `A2:speaking:batch003-jas:1` (picture-describe)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | … meegenomen. Nu is zij thuis. Vertel waar Roos is. Noem … | … meegenomen. Vertel wat Roos doet. Noem … | "Nu is zij thuis." answered C0. The picture shows no home, so C0 now asks for something the picture shows. This is the audit proposal. |
| criteria[0] | Zeg waar Roos is. / Say where Roos is. | Zeg wat Roos doet. / Say what Roos is doing. | The audit proposal. |
| sample | Roos is thuis. Ze heeft een blauw jas vast en er ligt een telefoon op tafel. | Roos kijkt naar een jas. Ze heeft een blauw jas vast en er ligt een telefoon op tafel. | The audit proposal. The learner errors "een blauw jas" and "heeft … vast" stay. |
| quotes[0] | Roos is thuis. | Roos kijkt naar een jas. | Verbatim, and meets the new C0. The null stays on C2. |
| model | Roos staat thuis bij de tafel. Ze houdt een blauwe jas vast. Op de tafel ligt een telefoon. … | Roos houdt een blauwe jas vast. Ze kijkt niet blij. Op de tafel ligt een telefoon. … | Drops "thuis". I wrote "Ze kijkt niet blij." where the audit had "Ze kijkt er verbaasd naar.". Roos's face in the picture is worried rather than surprised, and "niet blij" is simpler A2 than "verbaasd" with "er … naar". 28 words. |
| images[0].alt | Roos met een jas bij een tafel. | Roos houdt een blauwe jas vast en kijkt er bezorgd naar. Naast haar ligt een telefoon op een tafeltje. | This is a consequential edit, although the audit said to keep the alt. C0 now asks for an action, and the old alt names none. The judge needs "houdt een jas vast" to credit C0, and it needs the coat, table and phone to credit C1. This is checked against the picture. |
| starters[0] | Roos is … | Roos houdt … | The audit proposal. The old "Roos is …" led to "thuis". |

The title "Roos heeft de verkeerde jas" stays, because it repeats only the situation.

### 3. `A2:speaking:batch003-speeltuin:1` (picture-describe)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| title | Een kapot hek bij de speeltuin | Fatima maakt een wandeling | The visible heading gave away C0 (the playground) and one C1 item (the broken fence). |
| prompt | Fatima staat bij een speeltuin. Vertel waar Fatima is. … | Fatima maakt een wandeling. Vertel waar Fatima is. … | The situation answered C0. I used "Fatima maakt een wandeling." rather than the audit's "Fatima wandelt door haar buurt." and title "Fatima in haar buurt". "in haar buurt" is itself an answer to "Waar is Fatima?", so "Fatima is in haar buurt" would repeat the prompt, which is the defect of report 6. The new line gives no place at all. |
| images[0].alt | Fatima bij de ingang van een speeltuin. | Fatima staat op de stoep bij de ingang van een speeltuin. Een stuk van het hek is kapot. In de speeltuin staat een glijbaan. | The prompt no longer names the place, so the alt is the judge's only description of the scene. A learner may answer "op de stoep" or "bij een hek" as well as "bij de speeltuin", and the alt lets the judge accept all three. C1 (fence, slide) and C2 ("deze situatie", the broken fence) also depend on details the old alt did not give. This is checked against the picture. |

The criteria, sample, quotes, model and starters are unchanged. "Fatima staat …" leads to a place without naming one.

### 4. `A2:speaking:batch003-monteur:1` (video-answer)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | U wacht thuis op een monteur. Hij zou tussen negen en elf uur komen. Het is nu half twaalf. U belt het bedrijf van de monteur. Medewerker Sabrina neemt op. Zij stelt u een vraag. U hoort de vraag. Geef antwoord. Zeg ook hoe laat het nu is. | U wacht thuis op een monteur. Hij is te laat. U belt het bedrijf van de monteur. Sabrina van de klantenservice neemt op. Zij stelt u een vraag. U hoort de vraag. Geef antwoord. Vraag ook wanneer de monteur nu komt. | The prompt supplied the answers to C0 and C2. The learner now invents the appointment time, as in the official video pattern. "Sabrina van de klantenservice" replaces the calque "Medewerker Sabrina". The prompt announces only C2. |
| criteria[2] | Zeg hoe laat het nu is. / Say what time it is now. | Vraag wanneer de monteur nu komt. / Ask when the technician will come now. | The natural purpose of the call. |
| model | Ik heb een afspraak tussen negen en elf uur. De monteur is nog steeds niet hier. Nu is het half twaalf. Ik zit al de hele ochtend thuis te wachten. | Ik had een afspraak tussen negen en elf uur. Het is nu half twaalf en de monteur is er nog niet. Ik zit al de hele ochtend thuis te wachten. Wanneer kan hij nu komen? | Answers C0, C1 and the new C2. "had" follows the cue's "had u een afspraak". I kept "al" in "al de hele ochtend", where the audit's version dropped it. 35 words. |
| starters[2] | Het is nu … | Wanneer komt …? | Matches the new C2. Starters are shown only at review because the item has a cue. |

"Hij is te laat." check, as the spec asks. It does not hand over C1 "Zeg dat de monteur er nog niet is." word for word: C1 asks the learner to answer the cue's yes/no question ("is de monteur al bij u?"), and "te laat" gives only the reason for the call. "Hij is er nog niet." would give C1 verbatim, so I kept "Hij is te laat.". The learner still knows why they are calling. C0 and C1 are asked only by the cue. The cue text, speaker and role are unchanged. The sample and quotes stay valid, with the null still on C2.

### 5. `A2:speaking:batch027-keuken:1` (picture-describe)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | Fatima kookt thuis met haar kinderen. Het is druk … | Fatima is thuis met haar kinderen. Het is druk … | The situation named the main action that C1 asks for. This is the spec's wording. |

Everything else is unchanged. I checked against the picture: stirring a pot, cutting vegetables and setting plates all stay visible and answerable.

### 6. `A2:speaking:batch026-regen:1` (picture-describe)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| title | Wachten op de bus in de regen | Regen bij de bushalte | The visible heading gave away one of the two actions C1 asks for (waiting for the bus). |
| prompt | Sabrina wacht op de bus. Het regent. … | Sabrina gaat naar haar werk. Het regent. … | The situation gave away half of C1. "wacht op de bus" now has to come from the picture, where the bus is approaching. |

Everything else is unchanged. Sample quote 1 ("… en wacht op de bus. …") is now the learner's own observation, not a repeat of the prompt.

### 7. `A2:speaking:buurvrouw:1` (video-answer)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | U kunt morgen niet bij uw buurvrouw op bezoek. Uw buurvrouw is mevrouw Bakker. Zij stelt u een vraag. U hoort de vraag. Geef antwoord. Bedenk zelf een reden en een andere dag. Geef ook een tijd voor uw bezoek. | U kunt morgen niet op bezoek bij uw buurvrouw, mevrouw Bakker. Zij stelt u een vraag. U hoort de vraag. Geef antwoord. Geef ook een tijd voor uw bezoek. | "Bedenk zelf een reden en een andere dag." announced both cue questions. The stiff second sentence is merged into the first. I put the name at the end ("… op bezoek bij uw buurvrouw, mevrouw Bakker.") rather than in the middle, as the audit had it ("… bij uw buurvrouw, mevrouw Bakker, op bezoek."). A trailing apposition is easier to follow when heard. The extra third requirement stays. |

`cue.speaker` ("mevrouw Bakker") is unchanged, so the label stays "Luister naar mevrouw Bakker". The criteria, sample, quotes, model and starters are unchanged.

### 8. `A2:speaking:te-laat:1` (video-answer)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | … Geef antwoord. Bedenk zelf de reden en de tijd. Vertel ook hoe u nu naar uw werk gaat. | … Geef antwoord. Vertel ook hoe u nu naar uw werk gaat. | The removed sentence announced both cue questions, and "de tijd" was vague. The extra third requirement stays. |

Everything else is unchanged.

### 9. `A2:speaking:batch001-koelkast:1` (picture-choose)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| title | Een andere koelkast kiezen | Een nieuwe koelkast kiezen | Resolves the double meaning of "andere". |
| prompt | Uw koelkast is kapot. U koopt een andere koelkast. … Zeg ook iets over de andere koelkast. … | Uw koelkast is kapot. U koopt een nieuwe. … Zeg ook iets over het andere plaatje. … | "andere" meant both "replacement" and "the fridge not chosen", and could be read as the old, broken fridge. The new wording matches the other two-picture items. |
| criteria[2] | Zeg iets over de andere koelkast. / Say something about the other fridge. | Zeg iets over het andere plaatje. / Say something about the other picture. | Same reason. |
| starters[2] | De andere koelkast … | Op het andere plaatje … | Same reason. |

The model ("De grote koelkast op het tweede plaatje …"), sample, quotes and alts are unchanged and still fit.

### 10–13. Cued items whose titles printed the cue question

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| `A2:speaking:batch009-bushalte:1` | title | Welke bus naar het ziekenhuis? | Een vraag bij de bushalte | The heading printed the cue question. The new title names only the situation, which the prompt already gives ("U staat bij een bushalte."). |
| `A2:speaking:batch027-ziekmelden:1` | title | Hoe meld je je ziek? | Een nieuwe collega | Same. The prompt already says "Een nieuwe collega stelt u een vraag." |
| `A2:speaking:batch027-cursuskeuze:1` | title | Welke avondcursus? | Avondcursussen op school | Same. The spec suggested "Avondcursussen in het buurthuis", but the prompt has the learner talking to "de adviseur van de school", so "op school" agrees with the prompt. |
| `A2:speaking:batch009-ochtenddienst:1` | title | Ochtend of avond werken | Het rooster voor volgende maand | Same. The title names the situation (the cue's opening line), not the either/or question. |

All four titles are unique among the A2 speaking titles (checked against `content/catalogue.json`). Nothing else changed in these items.

### 14. `A2:speaking:batch002-burenpakket:1` (picture-sequence)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | Karim neemt een pakket voor zijn buurvrouw aan. Kijk naar de plaatjes. … | De buurvrouw van Karim is niet thuis. Er komt een pakket voor haar. Kijk naar de plaatjes. … | The situation narrated panel 1, so C0 could be met by repeating the prompt. The new line sets up the story without narrating a panel. This is the spec's wording. |
| images[0].alt | Karim bij zijn voordeur op het eerste plaatje. | Karim staat in zijn voordeur. Een bezorger geeft hem een pakket. | The judge needs the action in each panel (checked against the pictures and briefs). The alts reach the judge numbered, so "op het … plaatje" is no longer needed. |
| images[1].alt | Karim thuis op het tweede plaatje. | Karim zet het pakket binnen op een tafeltje bij de open voordeur. | Same. |
| images[2].alt | Karim met Sabrina op het derde plaatje. | Karim geeft het pakket bij de voordeur aan zijn buurvrouw. | Same. The alt says "zijn buurvrouw", not "Sabrina". The learner is never told her name, and `server/services.ts` keeps cast names the learner never sees away from the judge. |

The sample and quotes are unchanged. Quote 0 "Karim neem het pakket van de bezorger aan." is still verbatim and meets C0. It no longer copies a prompt sentence, because the prompt changed. The model, criteria and starters are unchanged, and the briefs are unchanged.

### 15. `A2:speaking:batch009-verjaardag:1` (picture-describe)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| prompt | Amina viert haar verjaardag. Vertel wat u op het feest ziet. Vertel ook wat u van kinderfeestjes vindt. Gebruik het plaatje. | Amina viert haar verjaardag. Vertel wie er op het feest zijn. Noem twee dingen die u op de tafel ziet. Vertel ook wat u van kinderfeestjes vindt. Gebruik het plaatje. | Learners could not tell C0 and C1 apart. The prompt now announces two distinct, checkable criteria. |
| criteria[0] | Vertel wat u op het plaatje ziet. / Say what you see in the picture. | Zeg wie er op het feest zijn. / Say who is at the party. | I chose this over "Vertel wat Amina doet.", because the situation line already says what Amina does ("viert haar verjaardag"), which is the same giveaway as the keuken item. The picture shows Amina and two friends. |
| criteria[1] | Noem minstens twee dingen van het feest. / Name at least two things from the party. | Noem twee dingen die u op de tafel ziet. / Name two things you see on the table. | Concrete. The table holds a cake with candles and three presents. |
| sample | Amina zit aan tafel met haar vrienden. Ik zie een taart met kaarsjes en veel ballonnen. | Amina zit aan tafel met haar vrienden. Op de tafel ik zie een taart en cadeaus. | The old second sentence named balloons, which are above the table and do not meet the new C1. The new sentence names two things on the table. It carries one typical learner error, the word order "Op de tafel ik zie" (inversion missing). The old sample had no learner error. |
| quotes | ["Amina zit aan tafel met haar vrienden.", "Ik zie een taart met kaarsjes en veel ballonnen.", null] | ["Amina zit aan tafel met haar vrienden.", "Op de tafel ik zie een taart en cadeaus.", null] | Verbatim. Quote 0 names who is there and quote 1 names two table items. The null stays on the opinion. |
| model | Ik zie Amina aan een tafel met een taart. … Boven de tafel hangen ballonnen en er liggen cadeaus. Ik vind kinderfeestjes gezellig, maar ook druk. Mijn kinderen vinden ze geweldig. | Op het feest zijn Amina en twee vrienden. Ze zitten samen aan tafel. Op de tafel staat een taart met kaarsjes. Er liggen ook cadeaus. Ik vind kinderfeestjes gezellig, maar ook druk. Mijn kinderen vinden ze geweldig. | Follows the new criteria in order. The opinion sentences are unchanged. 37 words. It does not copy the prompt sentence "Vertel wie er op het feest zijn." |
| images[0].alt | Een meisje zit met twee vrienden aan een tafel met een taart en ballonnen. | Amina zit met twee vrienden aan een tafel. Op de tafel staat een taart met kaarsjes en er liggen cadeaus. Boven de tafel hangen ballonnen. | The judge needs who is there and what is on the table, and the old alt did not mention the presents. Checked against the picture and the brief. The brief is unchanged. |
| starters[1] | Ik zie ook … en … | Op de tafel zie ik … en … | Matches the new C1. |

Starter 0 "Amina zit aan tafel met …" still leads to C0 (who is there) and is unchanged. Starter 2 is unchanged.

### 16. `A2:speaking:batch003-tramkaart:1` (picture-choose)

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| criteria[2] | Vertel ook iets over de andere manier op het andere plaatje. / Also say something about the other method in the other picture. | Zeg ook iets over het andere plaatje. / Say something about the other picture too. | The old wording was clumsy. This is the spec's wording, and it matches the prompt's "Vertel ook iets over het andere plaatje." |

The prompt is unchanged, so no audio is needed.

## Self-check

- Every sample has exactly one null quote, and every other quote is a verbatim substring of its sample (checked by script and by `batch-check`).
- No prompt sentence appears in any sample or model (checked by script).
- The models run from 27 to 44 words, and no model sentence is longer than 13 words.
- In every item the prompt, or for cued items the cue, asks for each criterion. A learner who does what the prompt says meets every criterion.
- No visible title, criterion or starter of the nine uncued items names the place or action that a criterion asks for.
- Starters: one fragment per criterion, in order, each with "…", and no complete answers. Only five fragments changed: apotheek 2, jas 0, monteur 2, koelkast 2 and verjaardag 1.
- The image briefs, cues and metadata are identical to the base, as is the key order of every record.

## Media consequences

New narrator audio is needed for the 11 changed prompts:

- `A2:speaking:batch001-apotheek:1#prompt`
- `A2:speaking:batch003-jas:1#prompt`
- `A2:speaking:batch003-speeltuin:1#prompt`
- `A2:speaking:batch003-monteur:1#prompt`
- `A2:speaking:batch027-keuken:1#prompt`
- `A2:speaking:batch026-regen:1#prompt`
- `A2:speaking:buurvrouw:1#prompt`
- `A2:speaking:te-laat:1#prompt`
- `A2:speaking:batch001-koelkast:1#prompt`
- `A2:speaking:batch002-burenpakket:1#prompt`
- `A2:speaking:batch009-verjaardag:1#prompt`

No cue changed, so no `#cue` clip needs new audio. That includes monteur, buurvrouw and te-laat, whose cues are unchanged. No image brief changed, so no new drawing is needed.

The other five items changed only their title (bushalte, ziekmelden, cursuskeuze, ochtenddienst) or a criterion (tramkaart). They keep their audio.

## Doubts for the reviewer

1. **Apotheek opinion question.** "Vindt u het zelf makkelijk om medicijnen te halen? Vertel ook waarom." makes C2 a two-part criterion (opinion plus reason). Most other picture-describe opinions ask only "wat u van … vindt". The alternative is "Vertel ook wat u van medicijnen halen vindt." with C2 "Zeg wat u van medicijnen halen vindt.". It is closer to the official form and the bank's "samen koken" items, but it is vaguer for the learner. Report 6 complained about exactly that kind of vagueness.
2. **Apotheek judge check.** "medicijnen nodig" points towards the pharmacy without naming it. The judge now learns the place only from the alt. Before release, run a bounded judge check, as the audit recommends: "Roos is bij de apotheek" should pass C0, and "Roos is bij de huisarts" or "Roos is bij de dokter" should fail.
3. **Speeltuin situation.** I used "Fatima maakt een wandeling." instead of the spec's "Fatima wandelt door haar buurt." and its title "Fatima in haar buurt". The reason is given in the item 3 table. If you prefer the neighbourhood framing, the alt still lets the judge expect "speeltuin". However, "Fatima is in haar buurt" would then be a prompt-repeating answer that the judge may or may not credit.
4. **Extra alt edits.** The alts for jas and speeltuin changed although the audit said to keep them. Both are consequential: C0 changed (jas) or the prompt lost the place (speeltuin), and the judge sees only the alts. Revert them if you consider them out of scope. Neither change needs new media.
5. **Jas, gaze and starter.** In the picture Roos's eyes are turned slightly away from the coat, so "kijkt naar een jas" (sample quote 0) and "kijkt er bezorgd naar" (alt) are a fair reading, not a certain one. The starter "Roos houdt …" supplies the verb of the C0 answer. The audit proposed it and the spec accepted it, but it is a strong hint.
6. **Monteur.** A learner who answers only "Hij is te laat." copies the prompt and probably passes C1. I judged this acceptable, because C1 is in any case the yes/no part of the cue and the call itself implies it. A more neutral alternative is "U wacht al lang.".
7. **Verjaardag C1.** Balloons hang above the table, not on it. A learner who names "ballonnen" as one of two table items would miss C1. The alt states this so that the judge can tell.
8. **Not changed, but noticed.**
   - Keuken still has the title "Druk in de keuken" and the prompt line "Het is druk in de keuken." Regen's new title "Regen bij de bushalte" and its prompt "bij de halte" still name the setting. In both items C0 is the broad "Vertel wat u op het plaatje ziet.", so the audit and the spec left this as the official pattern.
   - Koelkast C2 ("Zeg iets over het andere plaatje.") and tramkaart C2 ("Zeg ook iets over het andere plaatje.") differ by "ook". Both are as the spec gave them.

## Check output

```
$ npx tsx scripts/batch-check.ts content/batches/063-original.json
Checked 16 items, 0 questions. Keys: {}. Options: {}.
  info  16 of 16 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
