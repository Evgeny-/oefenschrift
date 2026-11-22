# Word list review brief

You independently review entries written by another author for the word lists at `/words` on Oefenschrift, a free practice site for the Dutch inburgering exams. Read the author brief first, `docs/briefs/words-author.md`: it defines every field and the standard. You did not write these entries; check every one as if a learner will memorise it.

The user's standard: plentiful, plain, exact, never AI filler. A wrong article, plural, past tense, participle or auxiliary is the worst fault; a stilted or unnatural example is the second worst.

## Check every entry

1. **Meaning.** `en` is right, the commonest sense comes first, at most three senses, British spelling, verbs as "to …". `pos` fits the word as listed.
2. **Grammar.** Nouns: `article` (de/het) and `plural` exactly right; `null` only when there is really no usual plural. Verbs: `past`, `pastPlural`, `participle`, `aux` (hebben / zijn / hebben/zijn), `irregular` (true for strong, mixed and irregular verbs, including kopen, zoeken, denken, brengen, vragen, zeggen, lachen, bakken, wassen) and `separable` (true for scheidbare werkwoorden; then the pasts read "belde op" and the participle is one word). Adjectives and adverbs: `forms` correct, and present only where forms are irregular or change spelling.
3. **Example.** Natural Dutch that a native speaker would really say, grammatically correct, at A1–A2: short main clauses, common words, at most 12 words. It shows a real use of the word (usual partners, an everyday situation), with the headword itself or a normal form of it — not only inside a compound (`wandelvereniging` does not show `vereniging`). Frame sentences ("Dit is een …", "Ik zie een …", "De … is mooi") are filler. No brands, real firms, people's names beyond the plain pool, politics, religion beyond plain facts, crime, violence, graphic illness or stereotyped roles.
4. **Translation of the example.** `exEn` says what the Dutch says, in natural English, nothing added or lost.
5. **Note.** Correct, plain, useful to a learner, at most 120 characters. Remove a note that only repeats the translation, says the word is common, explains English, or is vague. Add a short note only where a learner would clearly go wrong without it (a false friend, a confusable pair, a fixed preposition, an irregular present).
6. **Themes.** Strict: only themes a learner opening that list would expect (`wonen`, `werk`, `gezondheid`, `gemeente`, `winkel`, `vervoer`, `school`, `familie`, `eten`, `vrije-tijd`). Remove loose ones.
7. **Keep or drop.** Drop an entry that is noise (a name, a foreign word, a fragment), offensive, violence-heavy film vocabulary, a duplicate of another entry in your file, or so rare that it does not help an A1–B1 learner. Do not drop a plain everyday word because it is easy.

Do not rewrite what is right. Do not touch `id` or `rank`. Prefer the smallest fix: a corrected plural, a new example, a deleted note.

## Output

Write one JSON file at the given path:

```json
{
  "checked": 130,
  "fixes": [
    { "id": "huis", "set": { "plural": "huizen" }, "why": "plural was huisen" },
    { "id": "lopen", "set": { "verb": { "past": "liep", "pastPlural": "liepen", "participle": "gelopen", "aux": "hebben/zijn", "irregular": true, "separable": false } }, "why": "aux: zijn with a direction" },
    { "id": "kast", "set": { "note": null }, "why": "note repeated the translation" }
  ],
  "drop": [{ "id": "dollar", "why": "foreign currency, film noise" }]
}
```

- `checked` is the number of entries you reviewed: all of them.
- In `set`, each field replaces the old value whole (give the whole `verb` object when one verb field changes; give `ex` and `exEn` together when the example changes); `null` deletes an optional field (`note`, `forms`, `themes`).
- `why` is a few words.

Check that the file parses (`node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))" <path>`). Report in a few lines: entries checked, fixes by kind (grammar, meaning, example, note, theme), drops, and anything you were unsure about.
