# Batch 097 — A2 listening, eight revised items (5 November 2026)

Replacement batch. The A2 word gate of 5 November 2026 rejects eight published A2 listening items because they contain words that are too hard for A2. This batch replaces only those words, and their inflections, with plain A2 wording. It changes spoken text only where the hard word is spoken, so that as little audio as possible must be regenerated. Every item keeps its ID; the reviewer records `replaces`. Base: the current source of each item (named per item below), copied in full with the same field order. Speaker labels, roles and unaffected turns are unchanged, except one label in kinderopvang (see that item). The `text` transcript is rebuilt mechanically from the script ("Speaker: text" lines). Every changed `evidence` is rebuilt verbatim from the changed transcript.

All items: `exam: duo-a2`, `status: draft`, `targetLevelValidated: false`. Tone: unchanged (ordinary). Keys (same letters), option counts and question ids are unchanged.

How audio follows these edits (from `scripts/audio.ts`, `scripts/audio-profile.ts` and `scripts/content.ts`): the fragment clip's cache key covers the turn texts and voice roles, not the speaker labels. An A2 listening question clip is the narrator reading the question `prompt` only; options are read aloud only for KNM. On integration, `content:integrate` keeps a fragment's `audio` only when `text` and `script` are unchanged. It keeps a question's `questionAudio` only when its prompt and options are both unchanged.

## Items

### 1. `A2:listening:batch002-bakker:1`

Source: `content/batches/042-original.json`. voicemail, winkels-diensten.

- q1 explanation: "De aardbeien ontbreken." → "De aardbeien zijn niet gekomen."

Explanation only; it now repeats the evidence. Key B unchanged.

Media to regenerate: none. Pictures: none in this item.

### 2. `A2:listening:batch005-training:1`

Source: `content/batches/005-original.json`. gesprek, werk.

- situation: "Hij praat met zijn leidinggevende." → "Hij praat met zijn chef."
- q1 explanation: "De leidinggevende stelt eerst" → "De chef stelt eerst"
- q3 prompt: "Waarom wil de leidinggevende Karim spreken?" → "Waarom wil de chef Karim spreken?"
- q3 explanation: "De leidinggevende wil dat Karim" → "De chef wil dat Karim"
- imageAlt: "Karim praat op kantoor met zijn leidinggevende." → "Karim praat op kantoor met zijn chef."

"Leidinggevende" becomes "chef" (on the list) in the situation, two explanations, the q3 prompt and the picture alt. The speaker label "Leidinggevende" stays in the script and therefore in the transcript (rule 4: the word is only in the label, and the gate does not count labels); see doubts. The ten script turns are unchanged, so the fragment audio stays. imageBrief unchanged; imageAlt changed only in that word. Keys B, C, A unchanged.

Media to regenerate: question audio q3. Pictures: kept (brief unchanged).

### 3. `A2:listening:batch005-parkeervergunning:1`

Source: `content/batches/005-original.json`. voicemail, instanties.

- script turn 1 text: "een kopie van het kentekenbewijs van uw auto." → "een kopie van de papieren van uw auto."
- q3 evidence: "een kopie van het kentekenbewijs van uw auto." → "een kopie van de papieren van uw auto."
- q3 explanation: "een kopie van het kentekenbewijs." → "een kopie van de papieren van de auto."
- text (transcript): rebuilt from the script.

Only the one turn (the whole voicemail is one turn) changes: "het kentekenbewijs van uw auto" becomes "de papieren van uw auto". q3 evidence rebuilt verbatim; explanation follows. Prompts and options unchanged. Keys B, C, D unchanged. "Der" (van der Berg) and "uploaden" stay in the script (2 allowed).

Media to regenerate: script audio. Pictures: none in this item.

### 4. `A2:listening:batch005-werkdag:1`

Source: `content/batches/005-original.json`. uitleg, werk.

- q3 explanation: "en bij de teamleider kan hij terecht met vragen." → "en naar de teamleider gaat hij met vragen."

Explanation only. Key C unchanged.

Media to regenerate: none. Pictures: none in this item.

### 5. `A2:listening:batch005-computercursus:1`

Source: `content/batches/005-original.json`. reclame, opleiding.

- script turn 1 text: "Dan is er ook een cursus voor gevorderden, op donderdagavond." → "Dan is er ook een moeilijkere cursus, op donderdagavond."
- q1 explanation: "40 euro is de prijs van de cursus voor gevorderden." → "40 euro is de prijs van de moeilijkere cursus."
- text (transcript): rebuilt from the script.

"Een cursus voor gevorderden" becomes "een moeilijkere cursus", which answers the preceding "te makkelijk". q1 explanation follows; the 40 euro distractor still points at that course. Keys C, B unchanged.

Media to regenerate: script audio. Pictures: kept (brief unchanged).

### 6. `A2:listening:batch022-kinderopvang:1`

Source: `content/batches/022-original.json`. voicemail, vrije-tijd-familie.

- title: "Voicemail van het kinderdagverblijf" → "Voicemail van de kinderopvang"
- situation: "Het is van het kinderdagverblijf van zijn dochter Lina." → "Het is van de kinderopvang van zijn dochter Lina."
- script turn 1 speaker: "Medewerker kinderdagverblijf" → "Medewerker kinderopvang"
- script turn 1 text: "met Jolien van het kinderdagverblijf, van de groep van Lina." → "met Jolien van de kinderopvang, van de groep van Lina."
- q2 explanation: "Het kinderdagverblijf brengt Lina niet thuis" → "De kinderopvang brengt Lina niet thuis"
- q3 prompt: "Wanneer mag Lina weer naar het kinderdagverblijf?" → "Wanneer mag Lina weer naar de kinderopvang?"
- text (transcript): rebuilt from the script.

"Kinderdagverblijf" becomes "kinderopvang" (on the list; also the slug) in title, situation, the spoken turn, the q2 explanation and the q3 prompt. The speaker label "Medewerker kinderdagverblijf" becomes "Medewerker kinderopvang": the fragment is regenerated anyway, and the label is not voiced (the clip cache key covers turn text and roles, not labels), so this costs nothing extra. Keys A, C, B unchanged.

Media to regenerate: script audio, question audio q3. Pictures: none in this item.

### 7. `A2:listening:batch023-cv-workshop:1`

Source: `content/batches/023-original.json`. uitleg, werk.

- script turn 1 text: "Meld u dan aan bij de balie beneden, uiterlijk vrijdag." → "Meld u dan aan bij de balie beneden. Dat kan tot en met vrijdag."
- q3 options.A: "Uiterlijk dinsdag." → "Tot en met dinsdag."
- q3 options.B: "Uiterlijk donderdag." → "Tot en met donderdag."
- q3 options.C: "Uiterlijk vrijdag." → "Tot en met vrijdag."
- q3 evidence: "Meld u dan aan bij de balie beneden, uiterlijk vrijdag." → "Meld u dan aan bij de balie beneden. Dat kan tot en met vrijdag."
- text (transcript): rebuilt from the script.

"Meld u dan aan bij de balie beneden, uiterlijk vrijdag." becomes "Meld u dan aan bij de balie beneden. Dat kan tot en met vrijdag." The q3 options change from "Uiterlijk dinsdag/donderdag/vrijdag." to "Tot en met dinsdag/donderdag/vrijdag."; the explanation already said "Aanmelden kan tot en met vrijdag" and is unchanged. q3 prompt unchanged. Keys D, A, C unchanged.

Media to regenerate: script audio, question audio q3 (options changed; the prompt the narrator reads is unchanged). Pictures: kept (brief unchanged).

### 8. `A2:listening:batch023-verjaardagstaart:1`

Source: `content/batches/023-original.json`. gesprek, winkels-diensten.

- images[0].alt: "Roos staat bij de toonbank van een bakkerij en praat met de verkoper." → "Roos staat in een bakkerij en praat met de verkoper."

Picture alt only: "bij de toonbank van een bakkerij" becomes "in een bakkerij". The brief (counter, baker, cake) is unchanged and the alt stays true to it. Keys C, B, A unchanged.

Media to regenerate: none. Pictures: kept (brief unchanged).

## Media to regenerate (summary)

| Item | Script audio | Question audio | Picture |
| --- | --- | --- | --- |
| bakker | no | none | none in item |
| training | no (turns unchanged) | q3 (prompt changed) | kept (imageBrief unchanged; imageAlt changed) |
| parkeervergunning | **yes** (one-turn voicemail) | none | none in item |
| werkdag | no | none | none in item |
| computercursus | **yes** (one-turn advertisement) | none | kept (imageBrief unchanged) |
| kinderopvang | **yes** (one-turn voicemail) | q3 (prompt changed) | none in item |
| cv-workshop | **yes** (one-turn explanation) | q3 (options changed; prompt unchanged) | kept (brief unchanged) |
| verjaardagstaart | no | none | kept (brief unchanged; alt changed) |

Script audio: parkeervergunning, computercursus, kinderopvang, cv-workshop (each a single turn, so the whole clip). Question audio: training q3, kinderopvang q3, cv-workshop q3. For cv-workshop q3 the narrator text (the prompt) is identical. Integration still drops the field because the options changed. The existing manifest clip for that key is an older PCM clip (no `sourceFormat`), so with the current `mp3_44100_192` source an audio run will probably synthesise it again rather than reuse it.

## Doubts for the reviewer

1. **training: speaker label kept.** The five turns of the supervisor are still labelled "Leidinggevende", so the transcript shows the word five times, while the situation, question, explanations and alt now say "chef". I kept it under the coordinator's rule: the word is only in the label, and the gate does not count labels. Changing the label to "Chef" would need no new synthesis, because labels are not in the clip's cache key and the training fragment clip is already an mp3-source clip. Integration would still drop the fragment `audio` field (the script JSON changes), so an `npm run audio -- --keys` run for `A2:listening:batch005-training:1#fragment` would be needed to re-attach the same clip. I recommend that change if the coordinator agrees.
2. **kinderopvang: speaker label changed.** "Medewerker kinderdagverblijf" became "Medewerker kinderopvang", because the fragment is regenerated anyway and the label is not voiced.
3. **parkeervergunning.** The voicemail says "nog één document: een kopie van de papieren van uw auto". Plural "papieren" as one document is ordinary spoken Dutch for the registration papers, but it is less exact than "kentekenbewijs".
4. **computercursus.** "Een moeilijkere cursus" for "een cursus voor gevorderden" follows "Is de cursus voor beginners te makkelijk voor u?", so the contrast is explicit.
5. **cv-workshop.** "Meld u dan aan bij de balie beneden. Dat kan tot en met vrijdag." adds one short sentence to the script (153 → 157 words). The q3 options "Tot en met dinsdag/donderdag/vrijdag." are parallel and the key is not the longest.
6. **training: imageBrief/imageAlt.** The source (batch 005) still uses the legacy `imageBrief`/`imageAlt` fields, as does computercursus. I kept them as in the source. `scripts/content.ts` keeps the catalogue picture when `imageBrief` equals the stored brief. Both briefs are byte-identical.

## Checks

The field check confirmed that, for each item, only the fields listed above differ from the source. Unchanged script turns, labels and roles, and the prompts and options of unaffected questions, are byte-identical. In kinderopvang the speaker label is the one deliberate exception (doubt 2).

```
> npx tsx scripts/batch-check.ts content/batches/097-original.json

Checked 8 items, 22 questions. Keys: {"B":6,"C":8,"A":5,"D":3}. Options: {"3":13,"4":9}.
  info  8 of 8 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.

> npx tsx <scratchpad>/a2gate.ts content/batches/097-original.json   (A2 word gate applied to every item, old ids included)

  warn  A2:listening:batch005-parkeervergunning:1: unlisted words in the script (allowed 2; the context must explain them and no question may depend on them): der, uploaden
A2 word gate: no failures.
```
