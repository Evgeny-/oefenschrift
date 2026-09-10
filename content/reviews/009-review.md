# Batch 009 editorial review (A2 Spreken, twenty-four tasks in the four official types, and their sentence starters)

**Verdict:** Revise. Twenty-two tasks pass; two need a concrete edit before integration (`ochtenddienst`: one image brief; `gymles`: one image brief and one model sentence). No task is rejected. The starter file passes at its current hash.

> **Superseded on 10 September 2026:** the required and recommended edits were applied and re-reviewed; the batch passes at source hash `e40eadfb…cf10d`. See [Focused re-review (10 September 2026)](#focused-re-review-10-september-2026) at the end of this document. The sections between record the original review of hash `17c77994…b732`.

**Reviewed source:** `content/batches/009-original.json`
**SHA-256:** `17c77994f1abf3dd07cc982f8552200b5fa1c35d25629b6d6e76300cd2b6b732` (matches the hash the author recorded at the end of `009-notes.md` and the hash the coordinator expected, so the reviewed bytes are the author's final bytes)
**Starters:** `content/batches/009-starters.json`
**SHA-256:** `0837329ca2dbbfcc0db5ec1102da3dcb76fdc7404c6501b4f92a59a3ebf56896` (matches the expected hash)
**Review date:** 2026-09-10. Reviewer context: fresh; the author's notes and the eighteen doubts were read only after every task and starter had been judged.

The batch holds six `video-answer`, six `picture-describe`, six `picture-choose` and six `picture-sequence` tasks, all `exam: duo-a2`, `part: speaking`, `rubric: a2-spreken`, `speakingSeconds: 40`, `prepSeconds: 10`, `status: draft`, `targetLevelValidated: false`. Domains: three tasks in each of the eight A2 domains. Every id and slug is new to the catalogue (the catalogue's eleven A2 speaking items are all the older "phone someone and say three things" format; this is the first batch in the blueprint §4.3 format, and the first speaking batch with cues, stills and picture briefs).

## Checker

`npm run batch:check content/batches/009-original.json` (run by the reviewer on the reviewed bytes):

```
Checked 24 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

Reviewer checks beyond the script, all on the reviewed bytes:

- Shape: every task carries `taskType` from the four official types, `domain`, `rubric: a2-spreken`, `speakingSeconds` 40 (inside 20–60), `prepSeconds` 10; `images` has exactly 1, 1, 2 and 3 entries for the four types (the video-answer still is `size: still`, choice pictures `size: pair`, sequence panels `size: sequence`, the six single pictures take the script's default `single`); every entry has an English `brief` ending in a "No text" clause and a Dutch `alt`.
- Cues (video-answer): six cues of 16–21 words, each one two-part question ("… of …? En waarom?", "Hoe …, en hoe vaak …?", "Welke bus …, en hoe vaak …?"), natural spoken Dutch, with roles `m-young`, `f-adult`, `f-older`, `m-older` (twice), `m-shop`, all present in `config/voices.json`; no cue asks for a name, address, date of birth or other identifying data.
- Criteria: three bilingual pairs per task; video-answer = part one, part two, one more detail or reason; describe = the scene, at least two of the things asked for, the opinion; choose = the choice, a reason, something about the other picture; sequence = one criterion per picture in order. English translations are accurate.
- Samples and quotes: every quote is an exact substring of its sample; exactly one `null` per task (null positions: index 0 four times, index 1 ten times, index 2 ten times); the null always marks a criterion the sample really misses (for "minstens twee" criteria, a sample naming one item counts as missed: gymles, ehbo, kringloop); no prompt sentence appears in a sample or model; samples are 13–25 words of plausible learner Dutch without deliberate errors (see doubt 14).
- Models: 27–45 words (kleermaker 45, paspoort 44 at the upper end), 4–6 sentences, averages 5.5–10.5 words per sentence, longest sentence 16 (sportschool-park), all main clauses with at most one subordinate clause per sentence and only `als`, `dat`, `zoals` and a relative `die` as subordinators; every model meets all three criteria of its task.
- Cast: every cast name in a brief is followed by exactly the trait string of `config/illustration.json`, so both the author's text and the script's `expandCast` describe the same person; sequences repeat the traits in all three panels; pairs show the same person and differ only in the thing chosen (or, in flat-dorp, show two places and no person, like the official "welk gebouw" example).
- Level: blueprint §10 heuristics hold for every prompt, cue, sample and model. `content/exemplars/` still does not exist, so the level check compares each task with the official task descriptions in `docs/research/exam-blueprints-2026-09-10.md` §3.1 ("Spreken A2") and blueprint §4.3.
- Originality: no task re-skins a catalogue speaking item or a §9 setting; see the diversity review.

## Task verdicts

| Task | Type, domain | Verdict | Level | Evidence |
| --- | --- | --- | --- | --- |
| `batch009-ochtenddienst` | video-answer, werk | Revise (brief only) | comparable | Cue Julio (`m-young`), 20 words, two parts; quotes exact, null 3; model 33 words meets all three (ochtend; fris, sneller; om zeven uur). The still asks for "a paper calendar", an object made of printed numbers. |
| `batch009-thuis-oefenen` | video-answer, opleiding | Pass | comparable | Cue teacher (`f-adult`), 17 words; null 2 (no frequency); model 36 words: nieuws op tv and buurvrouw, bijna elke dag een half uur, "Zo leer ik nieuwe woorden". Blank whiteboard. |
| `batch009-nieuwe-buurvrouw` | video-answer, wonen-buurt | Pass | comparable | Cue mevrouw Bakker (`f-older`), 21 words; null 1 (no duration); model 33 words: drie jaar, fijn, aardig/rustig/dichtbij/parkeren. Moving box marks the new neighbour. |
| `batch009-slaap` | video-answer, gezondheid | Pass | comparable | Cue huisarts (`m-older`), 20 words; null 2 (no rising time); model 33 words: twaalf uur, zes uur op, zes uur slaap, 's nachts wakker. Nothing graphic. |
| `batch009-abonnement` | video-answer, winkels-diensten | Pass | comparable | Cue shop employee (`m-shop`), 16 words; null 1 (never says abonnement or prepaid); model 33 words: abonnement, veel internet, video calls, muziek, price question. Recommended: "naar muziek". |
| `batch009-bushalte` | video-answer, vervoer | Pass | comparable, different in kind | Cue meneer De Vries (`m-older`), 18 words; null 2 (no frequency); model 27 words: lijn vier, elk kwartier, overkant, tien minuten. The learner invents the line number; accepted (doubt 7). |
| `batch009-schoonmaak` | picture-describe, werk | Pass | comparable | Null 3 (no opinion); model 41 words names bucket with mop, vacuum cleaner, spray bottle, cloth, "zwaar werk, maar het is belangrijk". One action, four separable objects. |
| `batch009-gymles` | picture-describe, opleiding | Revise | comparable after the edit | Null 2 (one activity named); model 41 words meets all three. The brief stacks five figures and five props (rope, ball, vaulting box, mat, whistle) against a house style of "a few simple shapes"; the model's "kast" for a vaulting box is a second meaning of a common word. |
| `batch009-afval` | picture-describe, wonen-buurt | Pass | comparable | Null 3; model 41 words: three containers, lege flessen for the glasbak, karton for the papierbak, "goed voor het milieu, maar het kost wel tijd". |
| `batch009-ehbo` | picture-describe, gezondheid | Pass | comparable | Null 2 (only the bandage named); model 42 words: pleisters, rol verband, kleine schaar, thermometer, "heel handig", a child who falls. |
| `batch009-kringloop` | picture-describe, winkels-diensten | Pass | comparable | Null 2 (only the sofa named); model 39 words: groene bank, lamp, kast met borden en kopjes, goedkoop, minder weggooien. Recommended: "Er staan ook …". |
| `batch009-verjaardag` | picture-describe, vrije-tijd-familie | Pass | comparable | Null 3; model 42 words: taart, kaarsjes, twee vrienden, ballonnen, cadeaus, "gezellig, maar ook druk". Criteria 1 and 2 overlap more than elsewhere; the sample's split (scene sentence / two named things) shows they are separable. |
| `batch009-alleen-samen` | picture-choose, werk | Pass | comparable, slightly fuller | Null 3; model 43 words chooses samen, gives reasons, and describes the other picture. Same person and room, only the number of people differs. Recommended: "vind ik te stil". |
| `batch009-klas-thuis` | picture-choose, opleiding | Pass | comparable | Null 2 ("niets voor mij" is a judgement, not a reason); model 41 words chooses the classroom, gives two reasons, describes the home picture. Blank whiteboard. |
| `batch009-gemeente-bellen` | picture-choose, instanties | Pass | comparable | Null 3; model 39 words chooses the town hall, gives reasons (papieren laten zien), describes phoning as lastig. |
| `batch009-trein-auto` | picture-choose, vervoer | Pass | comparable | Null 3; model 40 words chooses the train, two reasons, "in de file" for the car. The present is the same in both pictures. |
| `batch009-flat-dorp` | picture-choose, wonen-buurt | Pass | comparable | Null 1 (arguments for both, no choice: a realistic failure); model 43 words chooses the village house, reasons, and mentions the flat. Two places, no person (doubt 8). |
| `batch009-sportschool-park` | picture-choose, gezondheid | Pass | comparable | Null 3; model 41 words, longest sentence 16, chooses the park, reasons, and gives the gym its due. Red cardigan in both pictures. |
| `batch009-paspoort` | picture-sequence, instanties | Pass | comparable | Null 2 (jumps from the photo to collecting); model 44 words covers pasfoto, formulier en foto at the counter, collecting the passport. Procedure realistic for the Netherlands; dark-red booklet without text. |
| `batch009-brief-gemeente` | picture-sequence, instanties | Pass | comparable | Null 3 (no appointment); model 40 words: opens and reads, phones, talks with an employee. Blank envelope and sheet; nothing to read. |
| `batch009-vakantie` | picture-sequence, vrije-tijd-familie | Pass | comparable | Null 1 (no packing); model 43 words: koffer inpakken, in de auto, camping bij een meer. Grey jacket plausible in all panels. |
| `batch009-bioscoop` | picture-sequence, vrije-tijd-familie | Pass | comparable | Null 2 (no popcorn); model 42 words: twee kaartjes, popcorn en twee drankjes, in de zaal. The friend in panels 1 and 3 has no fixed traits (media note). |
| `batch009-rijbewijs` | picture-sequence, vervoer | Pass | comparable | Null 3 (no result); model 43 words: rijles, parkeren tussen pionnen, geslaagd with the licence. No roof sign; the pink card is a story shortcut (doubt 12). |
| `batch009-kleermaker` | picture-sequence, winkels-diensten | Pass | comparable | Null 2 (no tailor scene); model 45 words: voor de spiegel, veel te lang, kleermaker meet en maakt korter, ophalen en betalen. Brown cap in all panels. |

## Per-task findings

Each task was checked for: prompt shape (situation first, then the official instruction sentences of its type), cue (video-answer), image briefs (house style, cast traits, no text, one obvious action per single picture, pairs that differ only in the chosen thing, sequences with one character and a clear time order), criteria that mirror the type, sample and quotes, model coverage and level, exam likeness, and originality against the catalogue and blueprint §9.

### 1. `A2:speaking:batch009-ochtenddienst:1` — revise (brief only)

Prompt: "U bent op uw werk. Een collega maakt het rooster. Hij stelt u een vraag. U hoort de vraag. Geef antwoord." Cue by Julio, informal `jij` from a colleague, 20 words, one two-part question (morning or evening, and why); role `m-young` (Nick: "young colleague"). Criteria: preference, reason, one more detail such as a time. Sample: "Ik werk liever in de avond." (1), "Dan is het rustig op het werk." (2), nothing more, so `null` for 3 is right. Model: "Ik werk liever in de ochtend. Dan ben ik nog fris en ik werk sneller. 's Middags ben ik dan thuis als mijn kinderen uit school komen. Ik begin graag om zeven uur." 33 words, one `als` clause, all three criteria. Level: comparable with an official direct question; "shifts" is on the needed list. Originality: no catalogue item asks for a shift preference (te-laat is a lateness message; loonstrook, contract are writing).

The still: "Julio (young man, curly hair, striped shirt) sits at an office desk with a laptop and a paper calendar and turns towards the viewer as if asking a question. No text." A paper calendar is a grid of printed numbers; the closing "No text" contradicts the object and the image model will draw digits or a scribble. Every other text-bearing object in the batch is declared blank (whiteboard, sheet, envelope, screen, form, card); this one is not. Replace the brief with: "Julio (young man, curly hair, striped shirt) sits at an office desk with a laptop and a few blank sheets of paper and turns towards the viewer as if asking a question. No text." The rota is carried by the prompt, not the picture. Alt text unchanged.

### 2. `A2:speaking:batch009-thuis-oefenen:1` — pass

Prompt: "U bent op uw taalschool. Uw docent stelt u een vraag. U hoort de vraag. Geef antwoord." Cue: "Vandaag praten we over leren. Hoe oefent u thuis met Nederlands, en hoe vaak doet u dat?" 17 words, `u` from a teacher (acceptable in adult education and consistent with the exam's register), role `f-adult` (Esmee: "teacher"). Sample quotes 1 and 3 are exact; "hoe vaak" is never answered, `null` for 2 right. Model: tv news and the neighbour (1), "bijna elke dag, een half uur" (2), "Zo leer ik nieuwe woorden en ik versta de mensen beter" (3), 36 words. Brief: a non-cast teacher with three traits (about 50, short grey hair, green blouse) beside a blank whiteboard; the config has no teacher in the cast, and a non-cast character is allowed. Level: comparable. Originality: nothing in the bank asks the learner about their own study habits.

### 3. `A2:speaking:batch009-nieuwe-buurvrouw:1` — pass

Cue: "Hallo, ik ben uw nieuwe buurvrouw. Hoe lang woont u al in deze straat, en wat vindt u van de buurt?" 21 words, `f-older` (Hanneke: "older neighbour"); the still puts mevrouw Bakker (traits exact) at a low fence with a moving box, which tells the story without text. Sample: "Welkom in de straat!" is not a criterion; quotes 2 and 3 exact; no duration, `null` for 1 right. Model: "Ik woon hier al drie jaar." (1), "Ik vind de buurt fijn." (2), people, quiet, shops and bus stop nearby, parking (3), 33 words, six short sentences. Level: comparable. Originality: the catalogue's buurvrouw item cancels a visit by voicemail; an opinion about one's own street is a different act. Wonen-buurt is over-represented in the bank as a whole, but this batch keeps it at three of twenty-four like every other domain.

### 4. `A2:speaking:batch009-slaap:1` — pass

Cue: "U zegt dat u vaak moe bent. Hoe laat gaat u meestal naar bed, en hoe laat staat u op?" 20 words, `m-older` (Arjen; the voices file lists "huisarts" under this role). Criteria are two clock times and one more detail about sleep. Sample quotes exact; no rising time, `null` for 2 right. Model: twaalf uur, zes uur op with a reason, "maar zes uur slaap", "'s nachts ook vaak wakker", 33 words. Brief: a non-cast doctor (about 55, grey beard, light blue shirt) at a desk with a stethoscope, no white coat (right for a Dutch huisarts), no screen. Avoid list: tiredness is not graphic illness; the times are invented role-play facts, not identifying data. Level: comparable. Originality: huisarts is on the needed list; the existing huisarts items are procedural (an appointment letter, a registration form).

### 5. `A2:speaking:batch009-abonnement:1` — pass

Cue: "Goedemiddag. Wilt u een abonnement of een prepaidkaart? En gebruikt u veel internet op uw telefoon?" 16 words, two questions that form one two-part cue, `m-shop` (Jerry: "shopkeeper"). Sample never names abonnement or prepaid, so `null` for 1 is right; quotes 2 and 3 (two contiguous sentences) exact. Model: abonnement (1), veel internet with video calls as the reason (2), music and a price question (3), 33 words, longest sentence 14. Brief: non-cast employee (forties, shaved head, dark polo shirt) behind a counter with "a few plain phones", "No text, no logos". Level: comparable; abonnement and prepaidkaart are everyday words in this situation. Originality: the phone shop exists twice in the bank as a repair setting (batch004-telefoon folder, batch005-scherm conversation); choosing a subscription is a different act in a different part, and "a subscription" is on the needed list. Accepted; see doubt 1.

Recommended, not blocking: "Ik luister ook veel muziek op mijn telefoon." → "Ik luister ook veel naar muziek op mijn telefoon." The prepositionless form is common speech but a model is copied, and `luisteren naar` is what the raters expect.

### 6. `A2:speaking:batch009-bushalte:1` — pass

Cue: "Pardon, ik ken deze buurt niet. Welke bus gaat naar het ziekenhuis, en hoe vaak rijdt die bus?" 18 words, `m-older` (Arjen: "older customer"); the still shows meneer De Vries (traits exact) with a shopping bag at a simple bus stop. Sample quotes 1 and 3 exact; no frequency, `null` for 2 right. Model: "Lijn vier gaat naar het ziekenhuis. Die bus rijdt elk kwartier. U moet aan de overkant wachten, bij die halte daar. De rit duurt ongeveer tien minuten." 27 words. Level: comparable in length and structure, different in kind from the other five: the learner gives information to a stranger rather than talking about themselves and must invent a line number. That is a legitimate everyday speech act, the criteria accept any line and any frequency, and it gives the six video tasks a second act type; kept (doubt 7). Originality: batch003-tramkaart asks for help with a ticket machine; nothing gives directions.

### 7. `A2:speaking:batch009-schoonmaak:1` — pass

Prompt follows the official pattern exactly ("Vertel wat Julio bij zich heeft. Vertel ook wat u van dit werk vindt. Gebruik het plaatje."). Criteria: the scene, at least two things Julio has with him, the opinion. Sample: "Julio staat in een kantoor." (1), "Hij heeft een emmer en een stofzuiger bij zich." (2), "Hij gaat de vloer schoonmaken." is not an opinion, `null` for 3 right. Model names bucket with mop, vacuum cleaner, spray bottle and cloth and gives a two-sided opinion, 41 words. Brief: Julio (traits exact) in an empty office with four separately recognisable objects, one action; alt withholds the objects. Level: comparable with "Vertel wat Sem kan eten". Originality: first cleaning job in the bank; the 008 picture notes are chore lists to a colleague.

### 8. `A2:speaking:batch009-gymles:1` — revise

Prompt: "Sem heeft gymles op school. Vertel wat de leerlingen doen. Vertel ook wat u van sport op school vindt. Gebruik het plaatje." matches the official pattern. Criteria mirror it. Sample: "Ik zie een gymzaal." (1), one activity only ("Sem klimt in een touw."), so `null` for 2 is right, opinion with `want` (3). Model 41 words meets all three. Level: comparable. Originality: sporthal (reading) and sportclub (008 form) are different acts.

The brief fails the house-style check: "Sem … climbs a rope; two other teenagers throw a ball to each other; a girl jumps over a vaulting box onto a blue mat; a teacher with a whistle watches from the side." Five people, a rope, a ball, a vaulting box, a mat and a whistle in one 816×816 flat illustration is the most detailed brief in the batch; `config/illustration.json` asks for "a few simple shapes … no background objects" and blueprint §7 says detail brings artefacts. The vaulting box also puts "kast" into the model in a sense A2 learners do not know (blueprint §10: a less common word only when the context explains it). Replace the brief with: "A school gym hall: Sem (teenage boy, short brown hair, green sweater) climbs a thick rope; two other teenagers throw a ball to each other; a girl jumps on a blue mat. No text." Three simple activities remain, so a learner still has slack for "minstens twee". Replace the model's fourth sentence "Een meisje springt over een kast op een mat." with "Een meisje springt op een mat." (model becomes 38 words). Alt text ("een jongen klimt in een touw, anderen spelen met een bal") and the criteria stay as they are, so the starters are unaffected. Sem's green sweater in a gym is accepted for cast consistency (doubt 9).

### 9. `A2:speaking:batch009-afval:1` — pass

Prompt ("Vertel wat Karim weggooit. Vertel ook wat u van afval scheiden vindt.") follows the pattern. Sample: scene (1), "flessen in de glasbak en karton in de papierbak" (2), no opinion, `null` for 3 right. Model: three containers, lege flessen, oud karton, opinion with `maar`, 41 words. Brief: Karim (traits exact) on a pavement before a green, a blue and a grey container with a bag of bottles and flattened cardboard; the two kinds of waste are visibly different; "No text" (containers carry pictograms in reality, a media check). Level: comparable. Originality: batch003-container (writing) is a wrongly delivered bin; KNM 006/007 has a gft fact card; describing what goes where is a productive task (doubt 18).

### 10. `A2:speaking:batch009-ehbo:1` — pass

Prompt ("Vertel wat er in de doos zit. Vertel ook wat u van zo'n doos vindt.") follows the pattern. Sample names only the bandage, `null` for 2 right; quotes 1 and 3 exact. Model: pleisters, rol verband, kleine schaar, thermometer, opinion with an `als` clause, 42 words. Brief: Roos (traits exact) at a kitchen table with a plain white box and four items, "No text, no symbols" (so no cross; the prompt names the box, which is enough). Level: comparable; EHBO-doos is explained by the prompt and the picture. Originality: apotheek and tabletten are pharmacy visits; no home first-aid item exists.

### 11. `A2:speaking:batch009-kringloop:1` — pass

Prompt ("Vertel wat Fatima daar kan kopen. Vertel ook wat u van tweedehands spullen vindt.") follows the pattern. Sample names only the sofa, `null` for 2 right; quotes 1 and 3 exact. Model: groene bank, lamp, kast met borden en kopjes, opinion, 39 words. Brief: Fatima (traits exact) before a green sofa with a lamp, a shelf with cups and plates, a table with books and a bicycle; "No text, no price tags". Level: comparable. Originality: speelgoed ruilen (reading) is an advertisement; no kringloopwinkel exists.

Recommended, not blocking: "Er staat ook een lamp en een kast met borden en kopjes." → "Er staan ook een lamp en een kast met borden en kopjes." Singular agreement after `er` occurs in speech, but the plural is what careful usage and A2 course books teach, and this is a model.

### 12. `A2:speaking:batch009-verjaardag:1` — pass

Prompt: "Amina viert haar verjaardag. Vertel wat u op het feest ziet. Vertel ook wat u van kinderfeestjes vindt. Gebruik het plaatje." Criterion 1 ("wat u op het plaatje ziet") and criterion 2 ("minstens twee dingen van het feest") sit closer together here than in the other describe tasks because the prompt's own first instruction is also "wat u … ziet"; the sample shows they are separable (a scene sentence about Amina and her friends, then "een taart met kaarsjes en veel ballonnen"), and the feedback instructions should read them that way. `null` for 3 right. Model: cake, candles, two friends, balloons, presents, "gezellig, maar ook druk", 42 words; a learner without children answers in general terms (doubt 10). Brief: Amina (traits exact), two friends, a round cake with lit candles, balloons and wrapped presents; "No text". Level: comparable. Originality: "a birthday" is on the needed list; feestje (listening) is a street party.

### 13. `A2:speaking:batch009-alleen-samen:1` — pass

Prompt follows the official choose pattern ("Werkt u liever alleen of samen met collega's? Vertel ook waarom. Kies een van de plaatjes."). Pair: Sabrina (traits exact) alone at a desk / at a large table with three colleagues "in the same office room": the pictures differ only in the thing chosen. Sample chooses alone with a reason and says nothing about the other picture, `null` for 3 right; the quotes for 1 and 2 are exact (two contiguous sentences for 1). Model chooses samen, gives reasons, and describes the other picture, 43 words. Level: comparable, slightly fuller than the official "choose and say why" because of the third criterion (doubt 4). Originality: no work-preference task exists; the B1 items are problem-solving.

Recommended, not blocking: "Alleen werken, zoals op het eerste plaatje, vind ik stil." → "… vind ik te stil." ("stil" as a bare judgement of an activity is odd; "te stil" or "saai" is what a speaker says.)

### 14. `A2:speaking:batch009-klas-thuis:1` — pass

Prompt: "U wilt Nederlands leren. Leert u liever in een klas of thuis achter de computer? Vertel ook waarom. Kies een van de plaatjes." Not a copy of the official "In welk gebouw hebt u liever les?" example. Pair: meneer De Vries (traits exact) in a classroom with four adult students and a teacher at a blank whiteboard / alone at a kitchen table with laptop and headphones. Sample chooses home and judges the classroom ("niets voor mij") without a reason, `null` for 2 right. Model chooses the classroom, gives two reasons (one with an `als` clause), describes the home picture, 41 words. Level: comparable. Originality: "a course choice" is on the needed list; groep (008) changes a group.

### 15. `A2:speaking:batch009-gemeente-bellen:1` — pass

Prompt follows the pattern. Pair: Karim (traits exact) phoning on a sofa / at a town-hall counter with an employee. Sample chooses phoning with a reason, nothing about the counter, `null` for 3 right. Model chooses the counter, gives reasons (seeing the employee, showing papers), calls phoning lastig, 39 words. Level: comparable. Originality: batch003-speeltuin phones the gemeente to report a fence; a preference about contact channels is new, and instanties is under-represented.

### 16. `A2:speaking:batch009-trein-auto:1` — pass

Prompt follows the pattern. Pair: Fatima (traits exact) in a train with a wrapped present / at the wheel with the same present beside her. Sample chooses the car with reasons, `null` for 3 right (the second quote is 15 words with an embedded "hoe laat ik ga", plausible for a learner). Model chooses the train, two reasons, "sta je vaak in de file" for the car, 40 words; "in de file staan" is everyday and explained by the sentence. Level: comparable. Originality: reizen (008) is a commute description; meerijden asks for a lift.

### 17. `A2:speaking:batch009-flat-dorp:1` — pass

Prompt: "U zoekt een nieuwe woning. Woont u liever in een flat in de stad of in een huis in een dorp? Vertel ook waarom. Kies een van de plaatjes." (the question is 16 words, the longest prompt sentence in the batch, inside the A2 limit). Pair: a tall apartment building on a busy city street with a tram and street-level shops / a small house with a garden on a quiet village street; no person, like the official "welk gebouw" example; both forms are exam-like and no single rule is needed (doubt 8). Sample gives an argument for each picture and never chooses, `null` for 1 right and a realistic learner failure; the reason quote stands even without a choice, which gives the feedback its teaching point ("you gave reasons but did not choose"). Model chooses the house, reasons, mentions the flat, 43 words. Level: comparable. Originality: huur (008) ends a tenancy; no item asks where the learner would rather live.

### 18. `A2:speaking:batch009-sportschool-park:1` — pass

Prompt follows the pattern. Pair: mevrouw Bakker (traits exact) on a treadmill / walking in a park. Sample chooses the gym with reasons, `null` for 3 right. Model chooses the park, two reasons, the gym's drawbacks and one advantage, 41 words, one sentence of exactly 16 words (the limit). Level: comparable. Originality: sportles cancels a class; gezond (008) lists habits.

### 19. `A2:speaking:batch009-paspoort:1` — pass

Prompt follows the official sequence pattern ("Kijk naar de plaatjes. Vertel wat Fatima doet. Vertel iets over alle plaatjes."). Panels: pasfoto at a photographer, form and photo handed in at the town-hall counter, the dark-red booklet handed over at the same counter: same character with the same traits, clear time order, and the real Dutch procedure (apply with a photo, collect later). Sample covers panels 1 and 3, `null` for 2 right. Model: 44 words, one sentence or two per panel, "Ze is blij". Level: comparable with "Ricardo werkt als kapper". Originality: KNM has an inschrijven card and a reisdocument fact (batch 006/007); a narrated application is a productive task (doubt 18).

### 20. `A2:speaking:batch009-brief-gemeente:1` — pass

Panels: Julio (traits exact) opens an envelope and reads a blank sheet at a kitchen table, phones in the same kitchen with the sheet in hand, sits opposite an employee at a town-hall desk with the sheet between them. Nothing needs reading; the prompt supplies the gemeente context and any invented reason for the letter is acceptable. Sample covers panels 1 and 2, `null` for 3 right. Model 40 words, all panels. Level: comparable. Originality: "gemeente letters" is on the needed list; parkeervergunning (reading) is a letter to read. Second instanties sequence at the gemeente after paspoort; keep the two in different drills (set assembly).

### 21. `A2:speaking:batch009-vakantie:1` — pass

Panels: Karim (traits exact) packs a suitcase on a bed, lifts it into a car boot, sits before a tent at a lakeside campsite; the lakeside choice keeps the grey jacket plausible (doubt 11). Sample covers panels 2 and 3, `null` for 1 right. Model 43 words, all panels ("pakt … in", "zet … in de auto", "op de camping"). Level: comparable. Originality: "a holiday" is on the needed list; schoolreis is a voicemail.

### 22. `A2:speaking:batch009-bioscoop:1` — pass

Panels: mevrouw Bakker (traits exact) receives two tickets with a friend beside her, carries popcorn and two cups, sits with the friend before a bright blank screen. Sample covers panels 1 and 3, `null` for 2 right; the 15-word second sentence keeps correct inversion ("Dan zit ze … en kijkt ze …"). Model 42 words, all panels. Level: comparable. Originality: no cinema or outing exists.

Media note (not blocking): the friend appears in panels 1 and 3 without fixed traits; if the panels are generated separately she will differ. Adding "a friend of her age (grey curly hair, green coat)" to both panel briefs costs nothing.

### 23. `A2:speaking:batch009-rijbewijs:1` — pass

Panels: Modibo (traits exact) at the wheel with an instructor, reversing between two orange cones, holding up a small pink card while the instructor applauds; "No text, no roof sign" avoids the L-plate. Sample covers panels 1 and 2 (the first quote spans two sentences), `null` for 3 right. Model 43 words: rijles, parkeren tussen twee pionnen, geslaagd with the licence. Level: comparable; "pionnen" is explained by the picture, "geslaagd" is everyday. Realism: the physical licence is issued by the gemeente days after the exam, not at the car; the pink card is a story shortcut that makes the outcome unambiguous, and the model says "is hij geslaagd" first, so it is accepted (doubt 12). Originality: no driving item exists.

### 24. `A2:speaking:batch009-kleermaker:1` — pass

Panels: Hasan (traits exact) before a mirror in trousers far too long, on a low platform while a tailor with a measuring tape pins the hem, receiving the folded trousers in a paper bag at the counter. Sample covers panels 1 and 3 (the first quote describes the state the picture shows, which is what panel 1 is about), `null` for 2 right. Model 45 words, the upper limit, all panels; "betaalt hij" is not pictured but harmless. Level: comparable. Originality: "a repair" is on the needed list and every existing repair is an appliance; a female tailor and a male customer keep roles unstereotyped.

## Revision requests

Required before integration (the batch verdict is "revise" because of these two):

1. **`batch009-ochtenddienst` `images[0].brief`** — replace with: "Julio (young man, curly hair, striped shirt) sits at an office desk with a laptop and a few blank sheets of paper and turns towards the viewer as if asking a question. No text." Why: a paper calendar is a text object; the brief's "No text" cannot be honoured and the still would go through a regeneration loop.
2. **`batch009-gymles` `images[0].brief`** — replace with: "A school gym hall: Sem (teenage boy, short brown hair, green sweater) climbs a thick rope; two other teenagers throw a ball to each other; a girl jumps on a blue mat. No text." **`model`** — replace "Een meisje springt over een kast op een mat." with "Een meisje springt op een mat." (38 words). Why: the brief exceeds the house style's "a few simple shapes" (five figures, five props, a whistle), and "kast" for a vaulting box is a second meaning of a common word that A2 learners do not know. Alt, criteria, sample and starters stay unchanged.

Recommended in the same pass, not blocking (a pass verdict stands without them):

- `batch009-kringloop` `model`: "Er staat ook een lamp en een kast met borden en kopjes." → "Er staan ook een lamp en een kast met borden en kopjes."
- `batch009-abonnement` `model`: "Ik luister ook veel muziek op mijn telefoon." → "Ik luister ook veel naar muziek op mijn telefoon."
- `batch009-alleen-samen` `model`: "… vind ik stil." → "… vind ik te stil."
- `batch009-bioscoop` `images[0].brief` and `images[2].brief`: describe the friend once with fixed traits, for example "a friend of her age (grey curly hair, green coat)".
- The three non-cast cue speakers are labelled "Docent", "Huisarts", "Medewerker"; the app captions the clip "U hoort: Docent". "de docent", "de huisarts", "de medewerker" read better in that caption. The label is not used by `scripts/audio.ts`, so the change is cosmetic.
- Video-answer prompts say "U hoort de vraag. Geef antwoord." after "… stelt u een vraag."; blueprint §4.3 records "U hoort een vraag. Geef antwoord." The definite article is the natural continuation and no learner will notice, but either the batch should use the blueprint's sentence or the blueprint should record the composite pattern "<situatie>. <Persoon> stelt u een vraag. U hoort de vraag. Geef antwoord." so that later batches match this one. Coordinator's choice; no byte change required for this review.

Any byte change moves the source hash; the focused re-review reads the changed items and records the new hash. The starters file needs no change for the required edits (criteria are untouched).

## Answers to the author's doubts

1. **abonnement in a phone shop.** Accepted. The two existing phone-shop items are receptive repair texts; choosing a subscription is a different act in a different part, and "a subscription" is on the needed list. The sports-club variant is not needed. Do not place abonnement in a mixed-part practice set with scherm or telefoon.
2. **Three criteria for video-answer.** Keep three: part one, part two, one more detail or reason. This is what the coordinator's checklist for this review asks, it matches the checker's lower bound, and the third criterion is what fills 40 seconds; the official minimal answer ("one or two sentences") is the pass line, not the ceiling. No checker change.
3. **Criterion 1 of picture-describe.** Keep "Vertel wat u op het plaatje ziet." It records the on-topic precondition (the scene: who and where), and every sample shows it is separable from the count criterion. The feedback instructions should accept any on-topic scene sentence for criterion 1 and require two named items or actions for criterion 2; naming one item leaves criterion 2 unmet, as the gymles, ehbo and kringloop samples model.
4. **Third criterion of picture-choose.** Keep "Zeg ook iets over het andere plaatje." It is the coordinator's checklist item and the research note's "both pictures mentioned"; a learner who only chooses and reasons scores 2 of 3 with a clear next step, and the feedback must not call such an answer off task. "Geef nog een reden of een detail" would make the third criterion indistinguishable from the second.
5. **slaap as a doctor's question.** Keep the huisarts. Health is under-represented, "huisarts" is on the needed list, nothing graphic follows, and the criteria are two clock times.
6. **Personal data.** Accepted: bedtime, years in the street and study habits are role-play facts a learner may invent; no task asks for identifying data.
7. **bushalte invents facts.** Keep the directions cue; it adds a second speech act (giving information) to the six video tasks, and any line and frequency satisfy the criteria. The alternative cue ("Gaat u vaak met de bus? En wat vindt u van de bussen hier?") is a good candidate for the next video batch.
8. **flat-dorp without a person.** Accepted; both forms are exam-like. No single rule: use a person when the choice is about an activity, places when the choice is about a place.
9. **Sem's sweater in the gym.** Keep the cast traits; a sweater in a flat illustration is unremarkable. The gymles brief is revised for detail, not for the sweater.
10. **verjaardag opinion.** Accepted; the criterion is about children's parties in general and the model's own-children sentence is an extra.
11. **vakantie at a lakeside campsite.** Accepted; no change to the jacket rule.
12. **rijbewijs pink card.** Keep the card; it makes "geslaagd" unambiguous, which the image checklist asks for. If the image review finds it unreadable at display size, the handshake fallback works with the same alt and model. Note the procedural shortcut in the image review (the card is a symbol, not the real issuing moment).
13. **paspoort booklet.** Accepted; a learner who says "ID-kaart" still meets criterion 3.
14. **Samples without deliberate errors.** Accepted. The coordinator's checklist for speaking does not ask for one, the catalogue's speaking samples have none, and speaking feedback starts with content; the feedback evaluation can add error cases separately.
15. **"u" in the criteria.** Accepted; the criteria are exam instructions.
16. **Domain labels.** Accepted as labelled (afval wonen-buurt, ehbo and sportschool-park gezondheid).
17. **Starter merging.** Correct: `npm run content:integrate` merges a batch's starters into `content/hints/sentence-starters.json` when the review JSON records `starters_source`, `starters_sha256` and `starters_verdict: "pass"`; nothing is merged by hand.
18. **KNM 006/007 gft and reisdocument.** Accepted; receptive fact cards and productive narrations are not duplicates. Keep afval and paspoort out of a mixed set that also holds those cards.

## Sentence starters

`content/batches/009-starters.json` keys match the twenty-four item ids in batch order; every task has exactly three starters in criteria order; every starter contains "…"; none is a complete answer and none states a fact the task does not give ("U moet lijn … nemen.", "Ik begin meestal om …" leave the number and the time); the register follows the task (first person for answers and opinions, `u` towards the stranger at the bus stop, third person in the sequences with the persona's name and pronoun); choice starters are neutral between the two pictures. Each fragment was completed with a natural answer:

| Task | Completion test (starter → natural completion) | Verdict |
| --- | --- | --- |
| ochtenddienst | "… ochtend." / "… rustig werken." / "… zeven uur." | pass |
| thuis-oefenen | "… de krant." / "… drie keer per week." / "… nieuwe woorden." | pass |
| nieuwe-buurvrouw | "… twee jaar." / "… fijn." / "Dichtbij is er een park." | pass |
| slaap | "… elf uur …" / "… zes uur …" / "'s Nachts word ik vaak wakker." (inversion left to the learner) | pass |
| abonnement | "… abonnement." / "… veel …" / "… bellen en berichten." | pass |
| bushalte | "… vier …" / "… tien minuten." / "… aan de overkant." | pass |
| schoonmaak | "… een kantoor." / "… emmer … stofzuiger …" / "… zwaar, want …" | pass |
| gymles | "… gymzaal …" / "De leerlingen klimmen en spelen met een bal." / "… goed, want …" | pass |
| afval | "… de containers." / "… flessen in de glasbak." / "… goed, omdat …" | pass |
| ehbo | "… een doos." / "… pleisters en verband." / "… handig, want …" | pass |
| kringloop | "… oude spullen." / "… bank … lamp …" / "… prima, want …" | pass |
| verjaardag | "… haar vrienden." / "… een taart en ballonnen." / "… gezellig, want …" | pass |
| alleen-samen | "… één." / "… alleen, omdat …" / "… druk." | pass |
| klas-thuis | "… in de klas." / "… omdat de docent helpt." / "… een man met een laptop." | pass |
| gemeente-bellen | "… twee." / "… want ik kan mijn papieren laten zien." / "… lastig, omdat …" | pass |
| trein-auto | "… trein." / "… ik kan lezen." / "Met de auto moet je parkeren." | pass |
| flat-dorp | "… een dorp." / "… rustig." / "Op het andere plaatje zie ik een flat." (inversion left to the learner) | pass |
| sportschool-park | "… het park." / "… wandelen, want …" / "Op het andere plaatje is een sportschool." (inversion left to the learner) | pass |
| paspoort | "… een foto maken." / "… een formulier." / "… haar paspoort." | pass |
| brief-gemeente | "… een brief." / "… de gemeente." / "… een medewerker." | pass |
| vakantie | "… kleren …" / "… de koffer …" / "… bij zijn tent." | pass |
| bioscoop | "… kaartjes." / "… popcorn." / "… in de zaal." | pass |
| rijbewijs | "… rijles." / "… parkeren." / "Op het derde plaatje is hij geslaagd." (inversion left to the learner) | pass |
| kleermaker | "… voor de spiegel." / "Bij de kleermaker laat hij de broek korter maken." (inversion left to the learner) / "… de broek op." | pass |

Notes, none blocking: five starters end in a fronted adverbial and leave the inversion to the learner ("'s Nachts …", "Op het andere plaatje …" twice, "Op het derde plaatje …" in rijbewijs, "Bij de kleermaker …"), while the other sequence starters supply the verb ("Op het derde plaatje zit hij …"). Inversion after a fronted adverbial is an A2 structure and the 008 review accepted the same pattern, so these pass; safer fragments that carry the inversion are "'s Nachts slaap ik …", "Op het andere plaatje zie ik …" (flat-dorp and sportschool-park), "Op het derde plaatje is hij …" (rijbewijs) and "Bij de kleermaker laat hij …" (kleermaker, which also models the prompt's `laten` construction). Apply them only if the coordinator wants one rule for the file; the change would move the starters hash and needs the same focused re-review as the batch.

Starters verdict: pass at hash `0837329c…56896`. The required batch edits do not touch any criterion, so this verdict survives them; if the optional starter edits are applied, the re-reviewer records the new hash.

## Diversity review

Twenty-four distinct settings and acts across the four official types and all eight A2 domains, three tasks per domain. No slug reuse; no re-skin of a catalogue speaking item (all eleven are voicemail-style three-point messages) or of a §9 setting; only the fixed exam instruction sentences mirror the official format, and no official scenario (school lunch, shop or building choice, hairdresser) is reused. Needed-list coverage: shifts, huisarts, a subscription, OV, a course choice, gemeente contact and letters, a holiday, a birthday, a repair, a passport.

Near pairs, with the reviewer's decision:

1. abonnement vs batch004-telefoon and batch005-scherm (phone shop): accepted, different act and part (doubt 1).
2. afval vs batch003-container (writing) and the KNM gft card: accepted, different act; do not mix in one set.
3. paspoort and brief-gemeente (both at the gemeente, both instanties sequences): accepted as tasks; different drills.
4. thuis-oefenen and klas-thuis (both about learning Dutch): accepted, different type and act (habits vs preference); they can share a form, not a drill.
5. nieuwe-buurvrouw vs the catalogue's buurvrouw voicemail: accepted, different act.
6. bushalte vs batch003-tramkaart: accepted, giving versus asking for help.
7. verjaardag (describe) and trein-auto (a birthday in another city): a shared motif only.

Cast recurrence: Julio, Karim, Fatima and mevrouw Bakker appear three times each, meneer De Vries twice, in roles consistent with the cast; consecutive tasks in a form should not reuse a name. Non-cast characters (teacher, huisarts, shop employee, photographer, tailor, instructor, friend) are one-off; if a teacher, a huisarts or a shop employee recurs in later batches, add them to the cast so their traits stay fixed.

## Set assembly

A drill is four tasks of one type; a mock form is 4 + 4 + 4 + 4. Six tasks per type give one drill per type with two spares, or one mock form plus one half form (deeltoets, 2 + 2 + 2 + 2) with no shared items. The following form uses every domain exactly twice, no cue voice twice, no cast name in consecutive tasks, and separates the two gemeente sequences:

- Video: ochtenddienst (werk), thuis-oefenen (opleiding), nieuwe-buurvrouw (wonen-buurt), bushalte (vervoer)
- Describe: ehbo (gezondheid), kringloop (winkels-diensten), verjaardag (vrije-tijd-familie), afval (wonen-buurt)
- Choose: alleen-samen (werk), klas-thuis (opleiding), gemeente-bellen (instanties), sportschool-park (gezondheid)
- Sequence: paspoort (instanties), vakantie (vrije-tijd-familie), rijbewijs (vervoer), kleermaker (winkels-diensten)

Half form from the remaining eight: slaap, abonnement / schoonmaak, gymles / trein-auto, flat-dorp / brief-gemeente, bioscoop. Cautions: slaap and bushalte share the `m-older` voice (different characters; keep them apart in a video drill of four, or accept), paspoort and brief-gemeente do not share a drill, gymles enters a set only after its revision, and the launch bank of twelve tasks per type (research note §6) needs one more batch of the same shape before two mocks without shared items exist.

## Notes for media

Audio (after the hash gate, `npm run audio:generate`): 24 prompt clips read by `narrator` (Serge de Beer) and six cue clips, about 3,350 characters in total, negligible against the monthly quota. Cue voices:

| Task | Speaker label | Role | Voice (config) | Note |
| --- | --- | --- | --- | --- |
| ochtenddienst | Julio | m-young | Nick | opens with "Hé"; informal `jij` |
| thuis-oefenen | Docent | f-adult | Esmee | |
| nieuwe-buurvrouw | Mevrouw Bakker | f-older | Hanneke | quiet voice; loudness normalisation applies |
| slaap | Huisarts | m-older | Arjen | |
| abonnement | Medewerker | m-shop | Jerry | |
| bushalte | Meneer De Vries | m-older | Arjen | same voice as slaap |

The round trip may transcribe "Hé" as "Hee" or "He"; that is a one-character difference, well under the 4% gate. The app plays the still plus the cue clip in place of the official video; the research note asks that the app say so, which is an app text, not a content field.

Illustrations (`npm run illustrate:generate`): 42 images (6 stills 1024×640, 6 singles 816×816, 12 pair pictures 1024×640, 18 sequence panels 1024×640). `scripts/illustrate.ts` creates one job per `images[]` entry, so the 18 panels are generated separately, not as the one three-panel image that `config/illustration.json` prefers and that the author's notes assume; either implement the three-panel mode first or accept separate panels with a strict trait check (the briefs repeat the traits in every panel, which is the mitigation). Risks to look for in the image review, per the config checklist:

- Text-bearing objects: bus-stop pole and shelter (bushalte), phone display (abonnement), container pictograms (afval), book spines (kringloop), shop fronts and tram (flat-dorp), form and passport (paspoort), tickets and popcorn bucket (bioscoop), the pink card (rijbewijs); the calendar in ochtenddienst is removed by the revision.
- Small details that artefact in the flat style: lit candles and ribbons (verjaardag), whistle and rope (gymles, reduced by the revision), stethoscope (slaap), measuring tape and pins (kleermaker), cones (rijbewijs).
- Recognisability without text or symbols: a first-aid box without a cross (ehbo), a town-hall counter that reads as an office rather than a shop (gemeente-bellen, paspoort, brief-gemeente), a kringloopwinkel that reads as a shop rather than a living room, a photo studio (paspoort panel 1).
- Consistency: the friend in bioscoop panels 1 and 3 (no traits given), the same suitcase in vakantie, the same present in trein-auto, Sem's sweater and mevrouw Bakker's cardigan in sports settings (accepted by the cast rule), Karim's grey jacket at the campsite.
- Alt texts are ready and neutral; for describe tasks they name the pictured objects, which is right for an open task (a screen-reader user needs the content to answer) and gives away no key.

## Notes for the coordinator

- Integration: after the two required edits and a focused re-review of ochtenddienst and gymles, update `source_sha256` in `009-review.json`, set `batch_verdict: "pass"` and `ready_for_integration: true`, then `npm run content:integrate`, which also merges the starters (the review JSON already carries `starters_source`, `starters_sha256` and `starters_verdict: "pass"`). The reviewer did not run it.
- Blueprint §4.3: record the decided video-answer prompt pattern (see the last recommended edit) and, if the three-criterion scheme for video-answer and the "other picture" criterion for choose are confirmed here, write them into §4.3's "criteria that mirror the type" sentence so later authors do not re-open doubts 2–4.
- `content/exemplars/` still does not exist; this is the second review that compares against the official task descriptions instead. Two stored exemplars per speaking type (four of these tasks would do once integrated) would make the level check reproducible.
- Feedback instructions for `a2-spreken`: criterion 1 of describe tasks is met by any on-topic scene sentence; "minstens twee" criteria are unmet with one item; the third choose criterion is a content point, not the on-task precondition; flat-dorp's reason criterion can be met without a choice.
- Batch size: twenty-four open tasks is three times the 6–8 that blueprint §12 recommends per author run. The batch held up, but the next speaking batch could be split by type.
- Cast: consider adding a teacher, a huisarts and a shop employee to `config/illustration.json` when they recur.

## Limitations

This is an AI editorial review. It does not replace review by Dutch-language educators, learner trials, blueprint validation or psychometric calibration, and it does not establish equivalence with an official exam. The A2 labels remain unvalidated authoring targets; the per-task level judgments compare the tasks with the official task descriptions, not with stored exemplars or learner data. The review covers text fields, cues and image briefs only; the generated illustrations, the audio clips and any feedback prompts that use these criteria need their own review after media production. The approval of the twenty-two passing tasks applies to the exact source hash recorded here; the two revisions and any optional edit move the hash and need a focused re-review.

## Focused re-review (10 September 2026)

**Scope:** the fields the coordinator changed after the review above (see the last section of `content/batches/009-notes.md`), nothing else. **Verdict: pass.** All twenty-four tasks pass; the batch is ready for integration.

**Re-reviewed source:** `content/batches/009-original.json`, SHA-256 `e40eadfbee00f56c5a10ddb5c7f4991fe746bd7c801085d23775f2a2217cf10d` (the hash the coordinator expected). **Starters:** `content/batches/009-starters.json`, SHA-256 `0837329ca2dbbfcc0db5ec1102da3dcb76fdc7404c6501b4f92a59a3ebf56896`, unchanged since the review. `npm run batch:check content/batches/009-original.json`: "Checked 24 items, 0 questions. No failures, no warnings."

**Method.** A field-by-field dump of the current bytes (id, type, domain, title, prompt, cue, every brief and alt with kind and size, criteria, sample, quotes, model, any other field) was diffed against the same dump taken from the reviewed bytes (`17c77994…`). The diff holds exactly eleven changed lines, all inside the six announced tasks; every other field of every task, including all criteria, samples, quotes and alt texts, is byte-identical. The quantitative checks of the review were re-run on the current bytes: 6 × 4 types, 3 × 8 domains, image sizes 6 still / 6 single / 12 pair / 18 sequence, exactly one `null` quote per task (positions 4 / 10 / 10), quotes verbatim in the samples, no prompt sentence in a sample or model, cues 16–21 words, models 27–45 words with the longest sentence still 16 (sportschool-park), every cast name followed by the exact trait string of `config/illustration.json`, every brief with a "No text" clause. The other eighteen tasks were confirmed unchanged by the diff; bushalte, schoonmaak, afval, klas-thuis, paspoort, vakantie and kleermaker were also re-read in full against the per-task findings above and match them.

### Changed items

| Task | Changed field(s) | Check | Verdict |
| --- | --- | --- | --- |
| `batch009-ochtenddienst` | `images[0].brief` | Reads exactly the requested replacement: "… with a laptop and a few blank sheets of paper …". The calendar (a text object) is gone; "No text" can now be honoured; Julio's traits verbatim; few shapes (a person, a desk, a laptop, some sheets). Alt "Een jonge collega aan een bureau kijkt u aan." still describes the still. Cue, criteria, sample, quotes, model untouched. | pass |
| `batch009-gymles` | `images[0].brief`, `model` | Both read exactly the requested replacements. Brief: three activities (Sem climbs a thick rope; two teenagers throw a ball; a girl jumps on a blue mat), no vaulting box, whistle or teacher; Sem's traits verbatim; "No text". Model: "Ik zie een gymzaal op school. Sem klimt in een touw. Twee leerlingen spelen met een bal. Een meisje springt op een mat. Ik vind sport op school goed. Kinderen bewegen dan elke week en dat is gezond." — 38 words, six sentences (6 / 5 / 6 / 6 / 6 / 9 words, longest 9), meets criterion 1 (scene), criterion 2 (three named activities, all in the picture) and criterion 3 (opinion with a reason); "kast" is gone. The sample's "Sem klimt in een touw." still matches the picture; alt ("een jongen klimt in een touw, anderen spelen met een bal") still describes it; criteria and starters unchanged. | pass |
| `batch009-kringloop` | `model` | "Er staan ook een lamp en een kast met borden en kopjes." as recommended; 39 words, nothing else moved. | pass |
| `batch009-abonnement` | `model`, `cue.speaker` | "Ik luister ook veel naar muziek op mijn telefoon." as recommended; model now 34 words, longest sentence 14. Speaker label "de medewerker" (see below). | pass |
| `batch009-alleen-samen` | `model` | "… vind ik te stil." as recommended; model now 44 words (inside 45), longest sentence 11. | pass |
| `batch009-bioscoop` | `images[0].brief`, `images[2].brief` | The friend is now "her friend (a woman of her age, grey curly hair, green coat)" in panel 1 and, with the identical string, in panel 3; panel 2 still shows mevrouw Bakker alone with two cups, so the friend's absence there is consistent with the story and the model ("Ze gaat met een vriendin"). Grey curly hair and a green coat are distinct from mevrouw Bakker's short white hair and red cardigan (her traits verbatim in all three panels), and the three-trait form follows the config's sequence rule. Alts unchanged and still true ("Twee vrouwen zitten in een bioscoopzaal."). | pass |
| `thuis-oefenen`, `slaap`, `abonnement` | `cue.speaker` | Labels "de docent", "de huisarts", "de medewerker". The only consumer is the caption in `app/components/OpenExercise.tsx`, which renders `U hoort: de docent`, `U hoort: de huisarts`, `U hoort: de medewerker` — natural Dutch after the colon. `scripts/audio.ts` builds the cue clip from `role` and `text` only, `scripts/batch-check.ts` checks presence only, and no catalogue item carries a `cue`, so nothing else reads the label. The three cast speakers keep their names (Julio, Mevrouw Bakker, Meneer De Vries). | pass |

**Starters:** no criterion changed, so the starter file and its verdict stand at the unchanged hash; the starters of the six changed tasks were re-read and still fit.

**Record updates:** `009-review.json` now carries `source_sha256` `e40eadfb…cf10d`, `batch_verdict: "pass"`, `ready_for_integration: true`, the ochtenddienst and gymles item verdicts `pass` (with a `re_review` note each), an amended `summary`, and a `revisions` entry dated 2026-09-10 listing the six changed ids and the previous hash; `starters_sha256` and `starters_verdict` are unchanged. The `checks`, `revision_requests`, `media_notes` and `coordinator_notes` blocks are left as the record of the original review; read them with these corrections: the ochtenddienst calendar risk and the gymles detail risk no longer apply, the bioscoop friend now has fixed traits, and the speaker-label table above reads "de docent", "de huisarts", "de medewerker".

**For the coordinator:** nothing further is needed on the batch. Next step is `npm run content:integrate`, which merges the starters as well (the review JSON carries `starters_source`, `starters_sha256` and `starters_verdict: "pass"`). The other notes for the coordinator above (blueprint §4.3 wording, exemplars, feedback instructions, cast additions) are unchanged by this re-review.

**Limitations:** as for the original review; this pass judged only the changed fields and confirmed the rest unchanged, and it does not replace educator review, learner trials or the media review after generation.

## Focused re-review of a picture brief (10 September 2026)

**Scope:** one field, `images[2].brief` of `A2:speaking:batch009-kleermaker:1`, changed by the coordinator after the picture review (see the last section of `content/batches/009-notes.md`: the generated tailor was a woman in panel 2 and a man in panel 3). Nothing else. **Verdict: pass.** The batch stays at pass and ready for integration.

**Re-reviewed source:** `content/batches/009-original.json`, SHA-256 `c02550323cadd0e2e3667c858170ae085f36fc278b5d567e5f4986ac99e1370c` (the hash the coordinator expected). **Starters:** unchanged at `0837329c…`. `npm run batch:check content/batches/009-original.json`: "No failures, no warnings" (its info line says the 24 items are already in the catalogue, which is why this is a focused re-review).

**Proof that only the phrase changed.** Panel 3 now reads "… receives the folded trousers in a paper bag from the same tailor (a woman with a measuring tape around her neck). No text." where it read "… from the tailor. No text.". Putting the old phrase back into the current bytes reproduces the previously reviewed hash `e40eadfb…cf10d` exactly, so the two versions differ in that phrase and in nothing else; no field-by-field diff was needed.

**The brief against the house style.** Hasan's traits ("man in his fifties, grey moustache, brown cap") are verbatim from `config/illustration.json` in all three panels; panels 2 and 3 name the same setting (the tailor shop); the panel is still a few shapes (Hasan, a counter, a paper bag, the tailor); the "No text" clause is there. The tailor's description repeats panel 2's ("a tailor with a measuring tape around her neck") in the parenthetical form the bioscoop friend uses. The parenthetical is what does the work: `scripts/illustrate.ts` generates each panel as its own job, so "the same tailor" has no referent inside one prompt and is harmless. The change also brings panel 3 into line with the model, which already says "Zij meet de broek". Alt text "Een man krijgt een tas aan de balie van een winkel." still describes the picture and reveals nothing. Criteria, sample, quotes, model and the three kleermaker starters are untouched.

**Optional, not blocking:** a third fixed trait for the tailor (hair or a garment colour) would guard against the same drift if the panel is ever redrawn again; the config's sequence rule asks three traits of the main character and the bioscoop friend has three.

**Record updates:** `009-review.json` now carries `source_sha256` `c0255032…370c`, `batch_verdict: "pass"`, `ready_for_integration: true` and a second `revisions` entry dated 2026-09-10 for the kleermaker brief with the previous hash; the starters fields are unchanged. The `summary` still cites `e40eadfb`; the revisions entry supersedes it.

**For the coordinator:** the catalogue copy of the brief still reads "from the tailor", so `npm run content:integrate` needs to be re-run to carry the new wording across. The generated panels themselves are outside this re-review, as in the original limitations.

## Focused re-review of the rijbewijs picture briefs (10 September 2026)

**Scope:** three fields, `images[0].brief`, `images[1].brief` and `images[2].brief` of `A2:speaking:batch009-rijbewijs:1`, changed by the coordinator after the level check (see the last section of `content/batches/009-notes.md`: the generated instructor and car colour drifted in panel 2). Nothing else. **Verdict: pass.** The batch stays at pass and ready for integration.

**Re-reviewed source:** `content/batches/009-original.json`, SHA-256 `e066a92e7f4e4001f25ff32d7189bb5c9afbee449bffb643ca983010e7fd1ca0` (the hash the coordinator expected). **Starters:** unchanged at `0837329c…` (no criterion changed). `npm run batch:check content/batches/009-original.json`: "No failures, no warnings" (its info line says the 24 items are already in the catalogue, which is why this is a focused re-review).

**Proof that only the three briefs changed.** The briefs now name the car ("a small blue car" in panel 1, "the small blue car" in panels 2 and 3) and the instructor with three fixed traits, "the driving instructor (a man of about fifty, short grey hair, dark blue jacket)", identical in all three panels; before, the car was "a small car" / "the small car" / "the car" and the instructor "a driving instructor" / "the instructor". Putting the three previous briefs (taken from the catalogue copy) back into a copy of the current bytes reproduces the previously reviewed hash `c0255032…370c` exactly, so the two versions differ in those three strings and in nothing else; no field-by-field diff was needed.

**The briefs against the house style.** Modibo's traits ("young man, short black hair, light shirt") are verbatim from `config/illustration.json` in all three panels. The instructor's parenthetical does the consistency work in the form the kleermaker tailor and the bioscoop friend use, which matters because `scripts/illustrate.ts` generates each panel as its own job; the same instructor and the same car are now named in every panel, which is what the config's sequence note asks. Each panel is still a few shapes (Modibo, the car, the instructor, plus a road / two cones / the pink card); every brief keeps its "No text" clause and panel 1 its "no roof sign". The alt texts are unchanged and still fit ("Een jonge man zit achter het stuur naast een instructeur.", "Een jonge man parkeert een auto tussen twee pionnen.", "Een jonge man staat blij naast een auto met een klein kaartje in zijn hand."): none names a colour or a trait, none reveals a key. Prompt, criteria, sample, quotes, model and the three rijbewijs starters are untouched.

**Not blocking:** (1) "no roof sign" is stated in panel 1 only, as it was before; "No text" in panels 2 and 3 already forbids a lettered sign, but repeating "no roof sign" there would cost nothing now that the car is described in every panel. (2) The instructor's traits sit close to meneer De Vries ("man of about 60, grey hair, round glasses, dark blue jacket"), who is pictured in bushalte and klas-thuis of this batch; the glasses and the unnamed role keep them apart at display size, but a different jacket colour would remove the resemblance if the panels are ever redrawn again.

**Record updates:** `009-review.json` now carries `source_sha256` `e066a92e…ca0`, `batch_verdict: "pass"`, `ready_for_integration: true` and a third `revisions` entry dated 2026-09-10 (reviewer "focused re-review (picture briefs)", the item id, previous hash `c0255032…`, verdict pass); the starters fields are unchanged. Nothing else in the record was edited.

**For the coordinator:** the catalogue copy and `content/image-manifest.json` still carry the previous briefs and their prompt hashes (no manifest entry has the new wording), so `npm run content:integrate` and the manifest update need to be re-run to carry the new briefs and the redrawn panels across. The generated panels themselves are outside this re-review, as in the original limitations.
