# Word lists, 22 November 2026

Evgeny asked for study material next to the exercises: lists of the most common Dutch words with an English translation, a short example and, where it helps, a one-line note. They live at `/words` (`/en/words` in the English interface) and are reached from the sidebar ("Woorden"). The Dutch material and its English are the same in both interface languages; only the page around them is translated.

## What ships

1,936 entries in `content/words/words-01.json` … `words-13.json` (150 per file, one entry per line). 1,322 carry a frequency rank; the rest were added for the themes, the verb lists and the small words.

| List | Slug | Entries |
| --- | --- | --- |
| Meest gebruikt (ranked, ten parts of 100) | `top` | 1,000 |
| Regelmatige werkwoorden | `regular-verbs` | 241 |
| Onregelmatige werkwoorden | `irregular-verbs` | 199 |
| Zelfstandige naamwoorden (de/het filter) | `nouns` | 967 |
| Bijvoeglijke naamwoorden | `adjectives` | 192 |
| Bijwoorden | `adverbs` | 130 |
| Kleine woorden (particles: er, toch, maar, even …) | `small-words` | 31 |
| Voorzetsels | `prepositions` | 39 |
| Voegwoorden | `conjunctions` | 23 |
| Voornaamwoorden en lidwoorden | `pronouns` | 63 |
| Vraagwoorden | `question-words` | 13 |
| Getallen | `numbers` | 50 |
| Tijd | `time` | 77 |
| Groeten en reageren | `greetings` | 16 |
| Wonen | `housing` | 151 |
| Werk | `work` | 101 |
| Gezondheid | `health` | 113 |
| Gemeente en instanties | `municipality` | 75 |
| Winkels en geld | `shopping` | 107 |
| Vervoer | `transport` | 97 |
| School en cursus | `school` | 100 |
| Familie en mensen | `family` | 49 |
| Eten en drinken | `food` | 101 |
| Vrije tijd | `free-time` | 104 |
| Mijn lijst (the viewer's own marks) | `my-list` | — |

An entry may sit in several lists. By part of speech: 967 nouns, 440 verbs, 192 adjectives, 161 adverbs, 39 prepositions, 39 numerals, 37 pronouns, 26 determiners, 19 conjunctions and 16 interjections. 800 entries have a note.

Each entry has an `id` (the Dutch word, with `-noun`, `-pron` and similar for split homographs such as `haar-noun` beside `haar`), `nl`, `pos`, `rank`, `en` (at most three senses separated by semicolons, verbs as "to work"), and by kind: `article` and `plural` for nouns (`plural: null` when there is none); `verb {past, pastPlural, participle, aux, irregular, separable}`; `forms` for the 26 adjectives and adverbs with irregular forms (goed · beter · best). Then `ex` and `exEn` (a short sentence of real usage), `note` (English, at most 120 characters), `themes` and `tags` (particle, preposition, conjunction, question, number, time). The groups and their order live in `app/domain/words.ts`. Ids are stable: My list stores them in the browser, so renaming an id silently empties that word from someone's list.

## Sources and licences

- **FrequencyWords** by Hermit Dave, `content/2018/nl/nl_50k.txt`: the 50,000 most frequent word forms in the Dutch part of OpenSubtitles 2018 (OPUS). Code MIT, content **CC BY-SA 4.0**. The order of the lists derives from these counts, so the page credits it with a link and the licence at the foot of every word page. https://github.com/hermitdave/FrequencyWords
- **SUBTLEX-NL** (Keuleers, Brysbaert & New 2010, Behavior Research Methods 42(3), 643–650, doi:10.3758/BRM.42.3.643), the file "SUBTLEX-NL with pos and Zipf cd minimally 2" from the OSF project https://osf.io/3d8cx/. Licence **CC BY-NC-SA 4.0**. Used only on the editor's machine to group word forms under their lemma and dominant part of speech (begon, begonnen → beginnen). None of its counts, lemmas or columns are checked in or shipped; the shipped rank is our own order. If the site ever turns commercial, replace this step with an openly licensed lemmatiser before rebuilding the ranks, as the NonCommercial clause would then be in question.
- **This site's exercises** (`content/catalogue.json`): how often each lemma occurs in the learner-visible Dutch of the published bank.
- **The project's A1 and A2 word lists** (`config/a1-vocabulary.json`, `config/a2-vocabulary.json`): which domain names a word, given to the authors as a hint for themes.

The downloads were kept in their own scratch directories, read as text and never executed; Python that read them ran with `-I`. They are not in the repository.

## Method

1. **Candidates.** `scripts/word-frequency.ts --forms nl_50k.txt --lemmas subtlex-nl.tsv --out candidates.tsv` maps every form to its lemma, adds the subtitle counts per lemma, counts the lemma in the site's exercises and keeps lemmas seen 200 times in the subtitles or twice on the site. It drops names (SUBTLEX tag SPEC), punctuation, unknown tags, single letters other than "u" and strings without a vowel, and folds one spelling's parts of speech into one row.
2. **Order.** Each lemma's frequency becomes a Zipf value (log10 per billion words) in both sources and the order is `0.65 · subtitles + 0.35 · site`. Subtitles alone favour drama: moordenaar, gevangenis and kapitein sit among the first 600 lemmas, while euro, medewerker, examen and website sit below 2,500. With the blend those four enter the first thousand and 32 film-heavy words drop out of it; gemeente rises from 4,446 to 1,057. The site alone would rank its own exam topics far too high. The weight is an editorial choice, not a fitted value. 15,446 lemmas come out; the authors saw the top 1,400, and words such as huisarts (2,255) came in through the theme chunks without a rank.
3. **Authoring.** Sonnet sub-agents, one per chunk, following `docs/briefs/words-author.md`: ten chunks of 140 ranked candidates, three theme chunks (frequent words of inburgering life below rank 1,400: reparatie, aanmelding, boete, oudergesprek …), one chunk of further common verbs and one of numbers, time words and particles. They skip names, profanity, film-crime vocabulary and inflected forms, split true homographs, and write examples of at most twelve words from ordinary life without the blueprint's avoided topics. 1,955 drafted entries, 1,937 after merging duplicates across chunks.
4. **Review.** A different Sonnet sub-agent checked every entry against `docs/briefs/words-review.md` (meaning, article and plural, verb forms and auxiliary, example and its translation, note, themes, keep or drop): 1,937 checked in 13 batches, 392 entries corrected, 1 dropped. Most corrections removed a loosely assigned theme (211 entries); then notes (110: a wrong verb in a note, bees "prikken" where Dutch says steken, notes that only repeated the translation), example translations (102: added or lost words, wrong tense), examples (85: stilted, or duplicating another entry's), meanings (14), plurals (6, such as mam's), adjective forms (6), part of speech (3) and verb forms (3).
5. **Recheck.** A third pass, again by a separate Sonnet sub-agent, reread the 213 entries changed by review and corrected 26 more.
6. **Finalising.** Ranks were renumbered 1–1,322 over the kept entries; `haar-noun` (hair) lost the rank of its spelling, as nearly every subtitle "haar" is "her". Adjective forms that follow the rule (lang → lange, langer, langst) were removed so `forms` shows only irregular ones.

This is AI editorial review, not validated CEFR difficulty and not a claim about exam vocabulary. The Sources line on the page says the translations and examples were written with AI and checked separately.

## Runtime

- `server/words.ts` reads the JSON files (cached in production). The study route's loader sends the index only a summary per list, and a list page only its own entries (the 967 nouns are the largest, about 240 KB before gzip).
- The whole dictionary (477 KB, 129 KB gzipped) is fetched from `GET /api/words` only when the learner searches across lists or opens My list. Failure shows "Zoeken lukt nu niet" with a retry.
- Long lists page through `?page=N` in a hundred; `shouldRevalidate` in `app/routes/study.tsx` keeps the page from reloading data it already has.
- Search folds accents and matches Dutch, the listed past forms and participles (begon → beginnen), the plural and the English senses ("to call" → bellen).
- Per viewer, in `localStorage` under `oefenschrift.words.v1` (with `@<profile>` in teacher mode): the marked words, Hide English and Examples. Nothing reaches the server. If storage fails the page says the list lasts only until it is closed.
- Every list except My list is in the sitemap with its own title and description; My list is `noindex`.
- Tests: `tests/browser/words.mjs` (navigation, paging, search, marking, hide English, My list, failed load and retry, English interface, 360 and 390 px without sideways scrolling).

## Updating

Edit the entry in its `content/words/words-NN.json` file and keep its id. A new list is a `WORD_GROUPS` entry in `app/domain/words.ts` (by part of speech, tag or theme). To rebuild the order, download the two lists again, convert the SUBTLEX workbook to TSV, run the script above and give new candidates to an author and a separate reviewer with the two briefs.

## Known limits

- Subtitle frequencies favour speech and drama: "politie" and "dokter" rank high, "formulier" and "huur" lower than in a learner's life; the site blend corrects only part of it.
- A ranked homograph shares the rank of its spelling except where the second sense is clearly rare (only `haar-noun` so far).
- Theme membership is an editorial judgement and deliberately strict, so the themes are shorter than the noun list.
- My list lives in one browser; clearing site data or moving device loses it.
