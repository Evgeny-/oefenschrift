# Exercise blueprint

What an exercise in this project must look like, part by part, for the DUO A2 exams, KNM and Staatsexamen NT2 Programma I (B1). Read this before writing, reviewing, generating media for, or grouping exercises. The analysis behind it is in `docs/research/exam-blueprints-2026-09-10.md`; the review rubric is `content/reviews/rubric.md`; the process is `docs/research/content-workflow.md`. B2 is out of scope.

Facts about the official exams below were verified on 10 September 2026 in DUO's official practice player and in the CvTE openbare examens. When an official format changes, update this file first and the content after it.

## 1. Principles

1. **Exam shape first.** Every exercise is an instance of one official task type, with the stimulus length, question count, option count, media and timing of that type. A learner who finishes our drills must not be surprised by anything in the real exam except the content.
2. **Original content.** Scenarios, texts, questions, options, images and audio are written and produced here. Nothing is copied or closely paraphrased from official practice exams, commercial courses or other sites. Official material is read for structure only.
3. **Evidence and explanation.** Every closed question has a verbatim evidence quote in its stimulus, an explanation, and a rationale for each distractor. The official exams give no explanations; ours do.
4. **Honest labels.** Levels are authoring targets (`targetLevelValidated: false`) until a teacher review or learner pilot says otherwise. No pass predictions, no "official" claims.
5. **Everything traceable.** Items carry tags (section 3) so coverage can be measured; media carry the hash of the script they were made from; KNM facts carry a source and a review date.

## 2. The exams in one table

| Exam part | Form | Stimulus | Options | Time | Notes |
| --- | --- | --- | --- | --- | --- |
| A2 Lezen (DUO) | 25 MC over ≈10 texts, 2–3 Q per text | 100–250 words each | 3 or 4, mixed | 65 min | situation line + "Lees eerst de vraag. Lees daarna de tekst." |
| A2 Luisteren (DUO) | 25 MC over ≈11 fragments, 2–3 Q each | 30–90 s conversations, announcements, voicemails, news; some with a still | 3 or 4 | 45 min | question is printed and read aloud |
| A2 Spreken (DUO) | 16 tasks: 4 × video answer, 4 × one picture, 4 × two pictures, 4 × three pictures | video or pictures + spoken instruction | — | 35 min | no multiple choice since 1 March 2025 |
| A2 Schrijven (DUO) | 4 tasks: 1–2 e-mails, 1 wijkkrant piece, 1 form, sometimes a picture note | printed header, guiding questions, form fields, pictures | — | 40 min | pen and paper |
| KNM (DUO) | 40 MC in 8 theme blocks | photo + factual question, both read aloud | 3 | 45 min | eindtermen of 1 July 2025; A2 language |
| B1 Lezen (NT2 I) | 35 MC over 6 texts, 5–7 Q each; text 6 is a look-up text | 400–700 words | 3 | 110 min | dictionary allowed; each text ends with "Wat is het doel van deze tekst?" |
| B1 Luisteren (NT2 I) | 39 MC over 5 audio texts + 1 video text, in fragments | interviews and conversations, 5–9 Q per text | 3 | 90 min | 25 s to read each question, one listen |
| B1 Schrijven (NT2 I) | 12 tasks: 8 zinstaken, 2 deelschrijftaken, 2 korte schrijftaken | e-mails with gaps, forms, tables, pictures | — | 100 min | scored on adequaatheid, grammatica, spelling, samenhang, woordgebruik |
| B1 Spreken (NT2 I) | 16 tasks: 8 korte (20 s), 8 middellange (15 s prep + 30 s) | spoken cue, pictures | — | ≈25 min | scored on inhoud, woordkeus, woordenschat, zinsvorming, uitspraak, tempo |

## 3. Item record

Items live in `content/catalogue.json` after review; drafts live in `content/batches/`. Every active item uses the current contract. `taskType` is the only format field; the retired `type` field is rejected. `textType` has a separate meaning: the communicative text category for B1 reading and listening. Do not use it as a substitute for `taskType`.

The accepted task types, domains, skills and bilingual display labels are shared in `app/domain/exercise-types.ts`; metadata checks are in `app/domain/exercise-schema.ts`. `scripts/batch-validation.ts` applies the per-part structure checks both in `npm run batch:check` and in `npm run content:integrate` / `npm run content:verify`. A matching review hash does not bypass those checks. Adding a task type requires its Dutch and English labels and its per-part validation before authoring exercises of that type.

Rewritten exercises retain their IDs and set membership. The historical source and review artifacts remain intact; a later reviewed batch supplies the replacement. Original IDs that predate the batch naming rule are accepted only when already present in the catalogue. Integration replaces retired fields and invalidates media whose source changed. Stored sessions and completion records carry exercise revisions; a rewrite cannot reuse answers to the prior version.

Common fields:

| Field | Meaning |
| --- | --- |
| `id` | `<LEVEL>:<part>:batch<NNN>-<slug>:<version>`, for example `A2:listening:batch004-fietsenmaker:1`. KNM uses `A2:knm:…`. Slugs are lowercase ASCII, one topic word or two. Never reuse a slug within a part. |
| `level`, `part` | `A2` or `B1`; `reading`, `listening`, `writing`, `speaking`, `knm`. |
| `exam` (required, new) | `duo-a2`, `knm` or `nt2-i`. |
| `taskType` (required, new) | one of the task types listed per part in section 4. |
| `domain` (required, new) | A2 and KNM: `werk`, `opleiding`, `wonen-buurt`, `gezondheid`, `winkels-diensten`, `instanties`, `vervoer`, `vrije-tijd-familie`. B1: `werk`, `educatie`, `overig`. |
| `textType` (B1 reading and listening, required) | `persuasief`, `descriptief`, `instructief`, `beschouwend`. |
| `situation` (reading, listening, KNM scenes; required) | The one-line context shown before the stimulus. A2: a person and a source, "Sabrina krijgt een brief van haar werk." B1: the reader's position and the text's source, "U leest een interview uit een personeelsblad." / "U hoort een gesprek bij een ROC." |
| `title` | Short Dutch title for catalogues. Not shown in exam mode. |
| `status`, `targetLevelValidated`, `revision` | as today. |
| `images` (new) | Array of `{file, alt, kind, credit?, licence?, sourceUrl?}`; `kind` is `photo`, `drawing` or `table`. `alt` is a Dutch description that does not give away an answer. |

Closed questions (`questions[]`): `id`, `prompt`, `options` (`A`–`C` or `A`–`D`), `answer`, `evidence` (verbatim in `text`), `explanation`, and `skill` (required, new vocabulary): `detail`, `time-place`, `quantity`, `person`, `rule-application`, `purpose`, `advice`, `sequence`, `opinion`, `inference`, `summary`, `picture`. Distractor rationales go in the batch notes.

Open tasks: `prompt`, `criteria` (`[[nl, en], …]`), `sample`, `quotes`, `model`, plus the per-part fields in section 4 and `rubric` (new): `a2-schrijven`, `a2-spreken`, `b1-schrijven`, `b1-spreken`.

## 4. Specifications per part

### 4.1 A2 Lezen — `exam: duo-a2`, `part: reading`

Task types (`taskType`): `brief` (letter from an organisation, employer, school, neighbour), `email`, `folder` (brochure or web page, often with a table or list), `bericht` (short message, note, notice), `advertentie`, `krant` (short newspaper or neighbourhood-paper item), `regels` (house rules, instructions, tips), `rooster` (schedule, opening hours, programme).

Requirements per item:

- 100–250 words of Dutch in `text`; a `situation` line; the standard instruction is added by the app.
- Two or three questions. Across a batch: at least one persona-scenario question per text ("Gaston woont in de Flamingostraat. Wanneer moet hij zijn auto weghalen op zaterdag 13 juni?"), one `purpose` question per two or three texts ("Waarom krijgen de bewoners deze brief?"), and a mix of three- and four-option items (roughly 60/40).
- A2 language: common words, main clauses and simple subordinate clauses (omdat, als, dat), explicit dates, times, prices and places, no idiom that the context does not explain. Difficulty comes from having to find and combine two details, not from vocabulary.
- Distractors sit on nearby details: another day, the other person, the wrong price, a reversed condition. Never a distractor the text does not mention at all in some form.
- Keys balanced across the batch: no letter above 40%, none below 20%.
- Per launch bank: at least three texts with a table (`folder`, `rooster`), and one picture-answer item (four pictures as options, `skill: picture`).

Layout the app should reproduce: stimulus left, question right, "Lees eerst de vraag. Lees daarna de tekst." above the text.

### 4.2 A2 Luisteren — `exam: duo-a2`, `part: listening`

Task types: `gesprek` (two people: colleagues, neighbours, customer and employee, parent and teacher), `voicemail`, `omroep` (announcement in a station, school, shop, market), `nieuws` (short news item), `uitleg` (one person explaining something: a course, a job, a procedure), `reclame` (a company or organisation presenting itself).

Requirements:

- `script` (required, new): an array of turns `{speaker, role, text}`. `speaker` is the character's name or function; `role` is a voice role key from `config/voices.json` (section 6). `text` is the full transcript, one turn per line prefixed with the speaker name, and must equal the joined script; evidence quotes are checked against `text`.
- Length 30–90 seconds when spoken (roughly 70–200 words). Conversations have four to ten turns; announcements and voicemails are one speaker.
- Two or three questions per fragment. Each question is read aloud by the narrator voice (`questionAudio`, generated). Options are text, occasionally pictures.
- Information the questions ask for is said once, plainly, with the competing detail (the distractor) said elsewhere in the fragment. Numbers, days and names are spoken in full; no meaning that depends on punctuation.
- Where the official item shows a still (a course flyer, a shop), add one image (`images`, `kind: photo`) that supports the situation without answering a question.
- Video is not produced. A conversation the official exam would show on video is an audio conversation with one still. Say so in the item's `notes`.

### 4.3 A2 Spreken — `exam: duo-a2`, `part: speaking`

Task types, in the official proportions (one form = 4 + 4 + 4 + 4):

| `taskType` | Stimulus | Instruction pattern | Learner produces |
| --- | --- | --- | --- |
| `video-answer` | a person asks one question (audio of the question, `cueAudio`, plus one still of the speaker or scene) | "… Hij/Zij stelt u een vraag. U hoort de vraag. Geef antwoord." (the situation names the speaker first) | one or two sentences |
| `picture-describe` | one picture | "X luncht op school. Vertel wat X kan eten. Vertel ook wat u van dit eten vindt. Gebruik het plaatje." | description + opinion |
| `picture-choose` | two pictures | "U zoekt werk in een winkel. In welke winkel werkt u liever? Vertel ook waarom. Kies een van de plaatjes." | choice + reason |
| `picture-sequence` | three pictures | "X werkt als kapper. Kijk naar de plaatjes. Vertel wat X doet. Vertel iets over alle plaatjes." | narration covering all three |

Requirements: `promptAudio` (the instruction read by the narrator), `images` with `alt`, `speakingSeconds: 40`, `prepSeconds: 10`, `criteria` that mirror the type (video answer: both parts of the cue answered plus one more detail, which fills the 40 seconds; one picture: the scene, two things or actions named, an opinion; two pictures: a choice, a reason, a word about the other picture — the official scoring counts both pictures; three pictures: one criterion per picture), a `model` answer of 25–45 words in A2 Dutch, and `rubric: a2-spreken`. Situations: everyday life, work, school, shops, health, neighbourhood. Never ask for real personal data.

### 4.4 A2 Schrijven — `exam: duo-a2`, `part: writing`

| `taskType` | Fields | Learner produces |
| --- | --- | --- |
| `email` | `scaffold: {to, from, subject, salutation, closing}`, `criteria` (3–4 bullets, at least one "Bedenk zelf …") | 4–8 sentences |
| `wijkkrant` | `criteria` (three guiding questions), `minSentences: 3`, opening line "Dit is mijn tekst over …" | at least three sentences about themselves |
| `form` | `formFields: [{label, kind}]` with personal-data fields plus two or three open fields; optional `images` the answers must use | filled form |
| `picture-note` | `images` (two or three), `scaffold` with salutation and closing | a note listing what the pictures show |

Requirements: `rubric: a2-schrijven`; a `model` answer; `sample` and `quotes` as today; a printable rendering (the real exam is on paper). Feedback follows the official scales in order: adequaatheid/begrijpelijkheid (0–3; 0 stops scoring), grammaticale correctheid (0–2), spelling (0–2), coherentie (0–1), woordenschat (0–2); flag sentences copied from the prompt. Registers: formal (docent, chef, gemeente, winkel) and informal (collega, medestudent, buur) in roughly equal numbers.

### 4.5 KNM — `exam: knm`, `part: knm`

- `taskType: feit`. One picture (`images[0]`; a drawing in the house style of §7, a photo only for a real place, document or object), a fact card `text` of at most thirty words shown after answering, one question of at most twenty words, three options, `questionAudio` for the question and each option, `theme` (1–8) and `eindterm` (for example `6.3.2`) from the July 2025 list, `sourceUrl`, `sourceNote`, `sourceReviewedAt`.
- Question forms: a direct fact ("Wanneer was de Holocaust?"), a persona fact ("Erik woont in een sociale huurwoning. Wat is dat?"), a yes/no with qualification ("Is belastingaangifte doen verplicht in Nederland?" — "Ja, dat is vaak verplicht."). No behaviour questions ("Wat kan hij het beste doen?").
- Options are short noun phrases or short sentences at A2; one is correct by the cited source; the two others are plausible confusions (another institution, another rule, another period).
- Coverage: every eindterm at least twice in the launch bank; blocks assembled per theme.
- Retire an item immediately when the cited rule changes; re-check all time-sensitive items yearly.
- The existing eight passage-style KNM items are study cards, not exam items; give them `taskType: leerkaart`.

### 4.6 B1 Lezen — `exam: nt2-i`, `part: reading`

- 400–700 words; `textType` and `domain` set; the batch spreads six texts over werk/educatie/overig and the four text types; text 6 of any mock is a look-up text (`taskType: opzoektekst`: a regulation, general information page, terms) with persona questions; other task types: `artikel`, `interview`, `studieboek`, `website`, `nieuwsbericht`, `voorwaarden`.
- Five to seven questions per text, three options each. A look-up text (text 6) carries persona scanning questions instead of paragraph-span detail items: at least one `quantity` item that combines two figures and two `rule-application` items, then the purpose question. For the other five texts: one `purpose` question last ("Wat is het doel van deze tekst?" with options of the form "de lezer informeren over … / de lezer overtuigen dat … / de lezer waarschuwen voor …"), at least one `opinion` or `inference` item ("Wat vindt X van …?", "Wat wil X duidelijk maken met het voorbeeld van …?", "Welke zin vat de mening van de schrijver het beste samen?"), and detail items whose evidence spans a paragraph rather than a sentence.
- B1 language: connected paragraphs with subheadings, paraphrase between question and text, subordinate clauses, reasons, conditions and consequences. No rare vocabulary as the sole obstacle.
- Keys balanced as in A2.

### 4.7 B1 Luisteren — `exam: nt2-i`, `part: listening`

- `taskType`: `interview`, `gesprek`, `voorlichting`, `instructie`. Each text has a `situation` line, an `intro` of 8–60 words (printed and spoken by the narrator: who speaks, about what; generated as `introAudio`), and five to nine questions that each carry their own fragment: `questions[].script` (turns with `speaker`, `role`, `text`), `questions[].text` (the fragment as "Speaker: text" lines) and, after generation, `questions[].audio`, `duration`, `peaks`. The item's `text` is the fragments joined with a blank line between them, so evidence quotes work as everywhere else; each `evidence` comes from its own fragment. Fragments are 50–190 spoken words (30–75 seconds); a text runs 4–7 minutes in total.
- Questions have three options; in the exam they are shown 25 seconds before the fragment plays and the fragment plays once (the app's drills allow replay; the mock-mode rule is not built yet).
- Speakers are two different voice roles across the text (an interviewer and a guest, a presenter and a caller); the narrator voice reads the intro and the questions.
- Content: study choice, work situations, neighbourhood initiatives, professions, health and care, public life. `textType` set.

### 4.8 B1 Schrijven — `exam: nt2-i`, `part: writing`

| `taskType` | Fields | Scoring |
| --- | --- | --- |
| `zinstaak` | `scaffold: {to, from, subject, salutation, body, closing}` where `body` is a short e-mail with exactly one gap marked `___`, either an open gap (prompt "Schrijf één zin op de open plek.") or a gap after a printed lead-in that fixes the structure — "omdat ___", "Daarom ___.", "Misschien ___?", "om ___.", "…, maar ___.", a fronted phrase such as "Volgens het huurcontract ___." — (prompt "Maak de zin op de open plek af."; the learner types what follows the lead-in); `grammarTarget`: `hoofdzin`, `bijzin`, `inversie`, `te-infinitief` or `vrij`; `adequacyNote` (what the sentence must do: give a reason, propose a solution, ask a question); exactly two `criteria` (adequacy, grammar); `model` one sentence of 5–25 words | adequaatheid 0–1, grammatica 0–1 |
| `deelschrijftaak` | either `formFields` (four or more, at least two `kind: open`, e.g. "Geef minimaal twee redenen") or `scaffold` plus `images` the completion must use; 3–6 `criteria`; `model` 50–150 words | adequaatheid 0–3, grammatica 0–2, spelling, samenhang, woordgebruik 0–1 |
| `korte-schrijftaak` | `scaffold` as for an e-mail, five or six `criteria`, a `table: {caption, columns, rows}` or `images`, `goal`: `informeren`, `overtuigen`, `klagen` or `voorstellen`; the prompt says that the table or pictures are not part of the e-mail; `model` 120–180 words | as deelschrijftaak |

`rubric: b1-schrijven`. A form of twelve is 8 + 2 + 2. Models for korte schrijftaken are 120–180 words. Feedback lists, in order: adequacy per element, grammar (word order, congruence, prepositions, missing articles; gender errors tolerated), spelling, coherence (signal words), word choice; flags copied prompt sentences.

### 4.9 B1 Spreken — `exam: nt2-i`, `part: speaking`

| `taskType` | Timing | Stimulus | Asks for |
| --- | --- | --- | --- |
| `kort` | `speakingSeconds: 20`, no `prepSeconds` | `cue` (a spoken line by another character with a voice role, generated as `cueAudio`; the prompt says "U hoort eerst uw collega.") and at most one picture; `model` 25–45 words | a question (two parts), a description, a preference with one reason, a short instruction (two steps), a reaction to news, an invitation declined with a reason |
| `middellang` | `prepSeconds: 15`, `speakingSeconds: 30` | `cue` or none; one to three `images` or a `table`; `model` 40–70 words | narrate all pictures; convince with two reasons; advise with at least two points; instruct step by step |

`rubric: b1-spreken`, `speakingSeconds`, `prepSeconds`, `promptAudio`, `criteria` naming the speech act and the required count ("noem twee redenen"), `model` of 40–70 words for middellang. Feedback in the official order: precondition (on topic), content (speech act realised, count met, clarity), word choice, vocabulary, sentence formation (small errors: articles, plurals, diminutives; larger: verb forms, word order, dropped "het"), a pronunciation note from the transcript only, tempo.

## 5. Questions, distractors, keys

- Prompts are one or two sentences; a persona prompt states the situation first and asks second.
- Options are parallel in form and length; no option is a superset of another; no "alle antwoorden zijn goed".
- One option is correct by the evidence quote. Each distractor is wrong for one nameable reason, recorded in the batch notes.
- Do not signal the key: no longer, more specific or more hedged option; no repeating a word from the prompt only in the key.
- Balance keys per batch and per mock form (no letter above 40%, none below 20%).
- Explanations quote or paraphrase the evidence and say why the tempting distractor fails.

## 6. Audio

All listening fragments, question audio, speaking instructions and speaking cues are generated with ElevenLabs from the reviewed script, after the batch passes review, never before.

- **Voices.** `config/voices.json` maps voice roles to ElevenLabs voice IDs: `narrator` (instructions, questions, announcements), `f-young`, `f-adult`, `f-older`, `m-young`, `m-adult`, `m-older`. Scripts name roles, not voice IDs, so a voice can be replaced without touching content. Only voices verified as native Netherlands Dutch are allowed; Flemish voices are excluded; voices that add words that are not in the script (observed with one library voice in the audition of 10 September 2026) are excluded. The chosen voices are recorded in that file with the date of the audition.
- **Dialogues.** Two different roles per conversation, never the same voice for both parties. Conversations use the dialogue endpoint (`eleven_v3`) in one request by default (decision of 10 September 2026: better turn-taking and level matching); single-speaker clips and any item with `audioMode: "stitched"` use per-turn `eleven_multilingual_v2` (`language_code: nl`) stitched with 0.45 s of silence. Every clip is loudness-normalised (EBU R128, −18 LUFS integrated) because the chosen voices differ in level. The manifest records the mode. Speaking pace for A2 is deliberate: prefer the slower voices for A2 fragments and the natural ones for B1.
- **Round trip.** Every generated clip is transcribed with Scribe (`scribe_v2`, `nld`) and compared with the script after number normalisation ("24" and "vierentwintig" match). A character error rate above 4% or a run of two or more inserted words blocks the clip; regenerate with a different seed or voice, and listen to any clip near the limit. The rate is stored in the manifest.
- **Manifest.** `content/audio-manifest.json` records per clip: item id, file, role → voice id, model, settings, script hash, duration, WER. A changed script invalidates the clip.
- **Quota.** The ElevenLabs Starter plan allows about 72,000 characters per month; an A2 listening launch bank with question audio needs roughly 25,000, a B1 one roughly 45,000. Plan batches per month or upgrade before the B1 bank.
- **Delivery.** MP3 44.1 kHz 128 kbps in `public/audio/<hash>.mp3`; peaks and duration computed at generation time as today.

## 7. Images

Decided on 10 September 2026 after five rounds of samples (`docs/research/illustration-style-2026-09-10.md`): exercise pictures are **drawn illustrations generated by the image model in one house style**, not photographs and not SVG figure compositions. Real photographs are used only for KNM items about real places, documents and objects. The style prefix, model, sizes, cast and review checklist live in `config/illustration.json`; generation code reads that file so the style never drifts between batches.

- **Style.** Minimal flat illustration: a few simple shapes, no outlines, no texture, no background objects; paper, charcoal and mustard yellow plus one or two muted colours used sparingly; large empty space, no text or logos. Generated with the cheapest image model (`gpt-image-2.5`) at the smallest allowed size (816×816 or 1024×640) and low quality, which for this style is indistinguishable from medium: about half a cent per image. Served at 1024 px wide as WebP (quality 88; 600 px looked soft on retina screens in the review of 10 September 2026). The prefix in the config is the only styling text; the item prompt describes the scene and the character in plain words. Detail is the enemy: styles that invite texture bring back tool walls and artefacts.
- **Cast.** Eight recurring named characters with three fixed visual traits each (in the config). A character is always described with the same traits; the persona in the question uses the same name.
- **Sequences.** A three-picture task is three separate generations whose briefs repeat the character's fixed traits verbatim and name the same setting; the review compares the traits across the panels and regenerates the one that drifted (a single three-panel image was the first plan; separate panels proved consistent in batch 008). Pairs are two single generations that differ only in the thing the task asks about.
- **Review.** Every image is looked at against the checklist in the config (no text, artefacts at display size, the answer-relevant detail unambiguous, traits consistent, nothing wrong for the Netherlands) and gets Dutch `alt` text that does not reveal a key.
- **Photographs.** Wikimedia Commons with CC BY or CC BY-SA, or our own; author, licence and source URL in `images[].credit/licence/sourceUrl`; shown on a credits page; no recognisable faces.
- **Tables, forms, schedules and maps** are real text in the app (HTML or SVG with text), never images.

## 8. Names, places, facts

- People: varied, realistic names as in the official items (Karim, Amina, Jari, Modibo, Thérèse, Sabrina, Hasan, Julio, Farah, Sem, Ricardo, Mila). Never real public figures.
- Organisations, streets, phone numbers and e-mail addresses are invented and plausible (Fietsenwinkel De Hoek, Flamingostraat 12, 06 12 34 56 78 written as the exam does, info@…). Real institutions (UWV, DUO, gemeente, huisartsenpost, NS) may be named when the item is about them.
- Prices, times and dates are realistic for the Netherlands in the year of writing.
- KNM facts come from a primary government or responsible-body page; see the workflow document.

## 9. Topics: what exists, what to add, what to avoid

Existing settings per part (September 2026) so that new items do not repeat them. Repeating the setting with new names is not a new item.

- A2 reading: fietsenmaker, buurthuis eten, zwemles, bloemenwinkel vacature, pakketpunt, sporthal ingang, wasserette, huisarts afspraak, speelgoed ruilen, dierenarts, lift onderhoud, bibliobus, kantine lunch.
- A2 listening: tandarts voicemail, taalles buurthuis, marktomroep, schoolreis voicemail, stationsomroep, bakker telefoon, zwembad uitleg.
- A2 writing: afspraak verzetten, bibliotheekpas, ladder lenen, kookcursus, gevonden sleutel, schoenen terugbrengen, plant water geven, afvalcontainer, sportles opzeggen, logeerkamer, loonstrook.
- A2 speaking: buurvrouw bericht, te laat werk, apotheek, koelkast kapot, kapper afspraak, portemonnee café, pakket buren, kaartautomaat, jas verwisseld, monteur te laat, speeltuin hek.
- KNM cards: inschrijven gemeente, verhuizing, DigiD, basisverzekering, 112, leerplicht, stemmen, discriminatie.
- B1 reading: gereedschap delen, dienst ruilen, bakfiets lenen, gedeelde tuin, buurtbus, cursusfonds, deelauto regels, stageplaats, energiegesprek, ouderavond.
- B1 listening: werkoverleg, lekkage, vrijwilligers festival.
- B1 writing: rooster conflict, geluid bibliotheek, buurtfeest helpen, oversteekplaats, studietijd, laptopreparatie, vrijwilligersrooster.
- B1 speaking: fietsroute, cursusavond gemist, teamtaak, werkdruk, straatplan, collega inwerken, cursuslocatie.

Under-represented and needed: work (contracts, shifts, sick leave, a performance talk, a job advertisement, a payslip), education (a rooster, an exam regulation, a course choice, a stage), shops and services (delivery, returns, a repair, a subscription), health (huisarts, apotheek, tandarts, huisartsenpost, zorgverzekering), transport (OV, train changes, a parking rule), instanties (gemeente letters, toeslagen, DigiD, a police report), family and free time (school of the children, a sports club, a birthday, a holiday). Neighbourhood and volunteering are already over-represented; use them sparingly until the others catch up.

Avoid: political opinions and party politics; religious practice beyond the factual KNM objectives; graphic illness, accidents, crime or violence; asylum procedures and individual legal advice; debt collection details; jokes that depend on Dutch cultural knowledge; brand names; real addresses; anything DUO removed from KNM in 2025 (the "what should you do" behaviour questions); stereotyped roles (all bosses male, all nurses female).

## 10. Level control

Level is an authoring target checked by a separate reviewer and a few automatic heuristics; neither is a validation.

- A2 stimuli: average sentence length under 12 words, no sentence over 18; subordinate clauses only with omdat, als, dat, wanneer, toen; present and perfect tense, simple future with gaan; numbers, days, prices explicit; at most one less common word per 50, explained by context.
- B1 stimuli: average sentence length 12–18 words, none over 30; paragraphs with subheadings for reading; passive voice, conditionals, relative clauses, signal words (daarom, hoewel, terwijl, ondanks) in use; paraphrase between question and text.
- Open-task models: A2 e-mail 45–70 words in four to eight sentences (the four bullets each need a sentence or two); A2 wijkkrant 25–45 words in three to five sentences; A2 form the open fields only, one short sentence each; A2 picture note 20–40 words, one sentence per picture; A2 speaking 25–45 words; all in main clauses with at most one subordinate clause per sentence and no sentence over 16 words. B1 zinstaak one correct clause of the required type, korte schrijftaak 120–180 words with signal words. The checker enforces 20–90 words for A2 models; the figures here are the editorial targets per task type.
- The reviewer compares each item against two exemplars of the same task type (kept in `content/exemplars/`, our own items marked as reference) and states whether it is easier, comparable or harder, and why.
- The automatic check (`npm run content:verify`) reports sentence-length statistics, option-length spread, key balance and coverage per tag; it fails on missing required fields, evidence not found, unbalanced keys within a mock form, or a form that does not match its blueprint.

## 11. Sets and forms

`content/blueprints/<exam>-<part>.json` declares the block counts, questions per block, option rules, timing, media and spread for each exam part. Sets are built from tags:

- **Drill (oefenset):** one task type, usually one domain; A2 reading 3–4 texts, A2 listening 4 fragments, KNM 8–10 facts of one theme, A2 writing 1 task, A2 speaking one type × 4, B1 reading 2 texts, B1 listening 1 text, B1 writing 4 zinstaken or 2 longer tasks of one type, B1 speaking 4 korte or 3 middellange. Explanations after each item.
- **Half form (deeltoets):** half the blueprint at half the time; explanations at the end.
- **Mock (proefexamen):** the blueprint exactly, frozen membership, official time and playback rules, explanations only after submission. Two mocks per part at launch with no shared items.

Existing sets keep their IDs and membership; new content goes into new sets. A mock's membership is a file, never a random draw.

## 12. Producing a batch with sub-agents

Use Opus 5 for every role. Roles run in separate contexts so that the reviewer never sees the author's reasoning. Two agents per batch; the briefs they follow live in `docs/briefs/`.

1. **Brief.** The coordinator names the exam part, task types and counts, domains, the batch id and the subjects to avoid (section 9 plus the catalogue titles); `docs/briefs/author.md` carries the rest.
2. **Author.** Writes `content/batches/<NNN>-original.json`, `<NNN>-notes.md` and, for open tasks, `<NNN>-starters.json`. Runs `npm run batch:check` until it reports no failures; checks invented organisation names on the web; warnings go into the notes.
3. **Reviewer.** Fresh context, `docs/briefs/review.md`. Applies `content/reviews/rubric.md`, the per-part requirements and the level control in one pass: proves each key from the evidence, tests each distractor, judges level and exam likeness per item (the former separate level check). Small repairs are not requested but made: the reviewer writes `content/batches/<NNN>-proposed.json` (and `-proposed-starters.json` when a criterion changed) with every required and recommended edit applied, lists the edits in the review, and records the hash of the proposed file in `content/reviews/<NNN>-review.json`. An item that needs a new premise is rejected instead of rewritten.
4. **Adoption.** `npm run batch:adopt <NNN>` moves the proposed files over the originals, verifies the review hash against the adopted bytes and runs the checker; the coordinator reads the diff the review lists. No separate reviser or re-review round: the reviewer has already read the edited items. A rejected item is dropped from the batch before adoption.
5. **Level check.** Only for the first batch of a part or task type (calibration), as a separate fresh-context pass (`content/reviews/<NNN>-level-check.md`); later batches of the same shape rely on the reviewer's level column.
6. **Media.** After the hash gate: `npm run audio:generate` (round-trip checked, retried once on a filler, manifest updated) and `npm run illustrate:generate` (house style from `config/illustration.json`); both run four generations at a time (`--concurrency`) and accept `--apply` to write the media fields into the catalogue; every picture is looked at on a contact sheet before `reviewed: true` in the manifest; `illustrate --redo <key>` redraws a drifted panel. Afterwards `npm run content:integrate -- --refresh-hints "<reason>"` re-records the starter-review hash (never `hints:refresh` alone, which can leave key order out of sync).
7. **Integration.** `npm run content:integrate`, set definitions in `content/practice-sets.json`, coverage report; `npm run media:prune` removes superseded clips and pictures.
8. **Revising an integrated batch.** Edit the batch file, never the catalogue; `npm run batch:check` prints an info line that the items are already in the catalogue (an id carries its batch number, so this is a revision, not a collision). A focused re-reviewer (fresh context) reads only the changed fields, records the new `source_sha256` and a `revisions` entry in the review JSON, and `npm run content:integrate -- --refresh-hints "<reason>"` re-merges; a changed prompt or option drops that question's clip, a changed brief its picture, and the generators make them again. When the criteria of an open task changed, the starters for that task are re-reviewed with it.

Batch size: 10–15 closed items or 6–8 open tasks per author run keeps review thorough; several batches run in parallel.

## 13. Checklist before an item is called done

- [ ] invented organisation names, shops, firms and web addresses checked on the web: none belongs to a real business (two of three invented names in batch 015 did)
- [ ] `exam`, `taskType`, `domain` (and `textType` for B1) set; `situation` present where required
- [ ] stimulus length, question count and option count match section 4
- [ ] every key has verbatim evidence, an explanation and distractor rationales
- [ ] keys balanced in the batch; no answer-signalling option
- [ ] level heuristics pass; reviewer and level check recorded
- [ ] scripts use voice roles; audio generated from the reviewed script, round trip passed, manifest updated
- [ ] images reviewed, `alt` written, credits recorded
- [ ] KNM: eindterm, theme, source URL and review date present
- [ ] topic not in the existing list; names, places and facts follow section 8
- [ ] item added to a set defined in `content/practice-sets.json` or a blueprint form
