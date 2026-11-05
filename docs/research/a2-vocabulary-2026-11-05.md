# A2 word gate, 5 November 2026

Evgeny found that some A2 exercises use words that are far too hard for A2. New A2 batches (087 onward) therefore pass a word gate in the spirit of the A1 list of 28 October 2026.

## Design

- **List.** `config/a2-vocabulary.json` adds about 1,300 everyday words, grouped by the A2 domains (work, education, home, health, shops and services, transport, public bodies, free time), to the 870 words of `config/a1-vocabulary.json`. It is our own editorial list, not an official CEFR list. Irregular past forms and participles are listed; a `names` field holds common first names; a `notA2` field holds words judged too hard for this bank, which always fail.
- **Matching.** `scripts/a2-vocabulary.ts` accepts plurals, -e adjectives, comparatives and superlatives, present and past tense, participles (ge-…-d/t, strong participles, separable verbs such as opgehaald), diminutives, spelled-out numbers (drieëntwintig, tweede) and weekday + daypart compounds (zaterdagochtend). A compound of two listed words (fietsen + winkel) passes and is reported to the reviewer, who judges whether it is transparent at A2. Three-letter parts must be listed words themselves, so spelling normalisation cannot turn "hengel" into hen + geel.
- **Fields.** Titles, situations, prompts, questions, options, explanations, criteria, scaffolds, form labels, models, alts and starters use listed words only. A reading text or listening script may hold one unlisted word per 50 words (blueprint §10), which the context must explain and no question may depend on. Learner samples are not checked: they contain deliberate errors.
- **Scope.** A2 reading, listening, writing and speaking items in batches numbered 087 or higher, through `npm run batch:check`, `batch:adopt` and `content:integrate`. KNM keeps its institutional vocabulary; earlier batches keep their reviewed wording.
- **Tests.** `tests/a2-vocabulary.test.ts`.

## Easy words added after review

Evgeny reviewed the first list of 87 words that failed older items and judged most of them easy enough: English cognates (corporatie, accepteren, alternatief, thermostaat, certificaat, prepaidkaart, regio), transparent compounds of A2 words (sluitingstijd, parkeerterrein, verlichting, verzekeringspas, identiteitsbewijs, resetknop, heftruck) and plain everyday words (doek, haak, ring, blok, bar, ploeg, merken, raden, schuiven, strak). Those 62 words are now on the list, and 15 of them left `notA2`. Web and e-mail addresses (www.deberk.nl, info@deberk.nl) are no longer read as words. Only really hard words stay out: formal letter language (terecht, uiterlijk, tevoren, aankondigen, betreft, ongemak), payroll and car jargon (loonheffing, kenteken, kentekenbewijs) and long or uncommon words without an easy clue (oplaadaansluiting, scheenbeschermers, tegoedbon, toonbank, kinderdagverblijf).

## Existing A2 items the gate would reject

Run against the 166 existing A2 reading, listening, writing and speaking items with the revised list, the gate rejects 30 (it rejected 61 with the first list): reading 16, listening 8, writing 2, speaking 4. These items are unchanged in this round; they are candidates for a revision batch that replaces only these words. The words below are those outside the list in a strict field or beyond the text allowance. A few are borderline and could be added to the list instead of rewritten (fornuis, diefstal, afzender, beheerder, pionnen).

| Item | Words outside the A2 list |
| --- | --- |
| `A2:reading:p1:1` | terecht |
| `A2:reading:batch001-pakketpunt:1` | afzender |
| `A2:reading:batch002-wasserette:1` | geschikte |
| `A2:listening:batch002-bakker:1` | ontbreken |
| `A2:writing:batch002-sleutel:1` | beheerder, kenmerk |
| `A2:reading:batch003-lift:1` | beheerder, kondigt |
| `A2:reading:batch003-bibliobus:1` | terecht |
| `A2:listening:batch005-training:1` | leidinggevende |
| `A2:listening:batch005-parkeervergunning:1` | kentekenbewijs |
| `A2:listening:batch005-werkdag:1` | terecht |
| `A2:listening:batch005-computercursus:1` | gevorderden |
| `A2:reading:batch004-parkeervergunning:1` | kenteken |
| `A2:reading:batch004-telefoon:1` | oplaadaansluiting |
| `A2:reading:batch004-bloedprikken:1` | nuchter |
| `A2:reading:batch004-verwarming:1` | woningstichting |
| `A2:writing:batch008-huur:1` | woonstichting |
| `A2:speaking:batch009-rijbewijs:1` | pionnen |
| `A2:speaking:batch009-kleermaker:1` | speldt |
| `A2:listening:batch022-kinderopvang:1` | kinderdagverblijf |
| `A2:listening:batch023-cv-workshop:1` | uiterlijk |
| `A2:listening:batch023-verjaardagstaart:1` | toonbank |
| `A2:reading:batch021-terugbrengen:1` | tegoedbon, termijnen |
| `A2:reading:batch021-ketel:1` | kondigt |
| `A2:reading:batch021-weekmarkt:1` | opgeknapt, opknappen |
| `A2:reading:batch020-loonstrook-uitleg:1` | loonheffing |
| `A2:reading:batch020-voetbalseizoen:1` | scheenbeschermers |
| `A2:reading:batch020-tandartsregels:1` | tevoren, uiterlijk |
| `A2:reading:batch020-politiebureau:1` | diefstal, voorwerpen |
| `A2:speaking:batch026-koken-buurvrouw:1` | fornuis |
| `A2:speaking:batch027-keuken:1` | fornuis |
