# A2 word gate, 5 November 2026

Evgeny found that some A2 exercises use words that are far too hard for A2. New A2 batches (087 onward) therefore pass a word gate in the spirit of the A1 list of 28 October 2026.

## Design

- **List.** `config/a2-vocabulary.json` adds about 1,300 everyday words, grouped by the A2 domains (work, education, home, health, shops and services, transport, public bodies, free time), to the 870 words of `config/a1-vocabulary.json`. It is our own editorial list, not an official CEFR list. Irregular past forms and participles are listed; a `names` field holds common first names; a `notA2` field holds words judged too hard for this bank, which always fail.
- **Matching.** `scripts/a2-vocabulary.ts` accepts plurals, -e adjectives, comparatives and superlatives, present and past tense, participles (ge-…-d/t, strong participles, separable verbs such as opgehaald), diminutives, spelled-out numbers (drieëntwintig, tweede) and weekday + daypart compounds (zaterdagochtend). A compound of two listed words (fietsen + winkel) passes and is reported to the reviewer, who judges whether it is transparent at A2. Three-letter parts must be listed words themselves, so spelling normalisation cannot turn "hengel" into hen + geel.
- **Fields.** Titles, situations, prompts, questions, options, explanations, criteria, scaffolds, form labels, models, alts and starters use listed words only. A reading text or listening script may hold one unlisted word per 50 words (blueprint §10), which the context must explain and no question may depend on. Learner samples are not checked: they contain deliberate errors.
- **Scope.** A2 reading, listening, writing and speaking items in batches numbered 087 or higher, through `npm run batch:check`, `batch:adopt` and `content:integrate`. KNM keeps its institutional vocabulary; earlier batches keep their reviewed wording.
- **Tests.** `tests/a2-vocabulary.test.ts`.

## Existing A2 items the gate would reject

Run against the 166 existing A2 reading, listening, writing and speaking items, the gate would reject 61: reading 23 of 43, listening 19 of 37, writing 8 of 27, speaking 11 of 59. These items are unchanged in this round; they are candidates for a revision batch. The words below are those outside the list (in a strict field, or beyond the text allowance). Some are proper names written in lower case inside a web address, which a revision would not need to change.

| Item | Words outside the A2 list |
| --- | --- |
| `A2:reading:p1:1` | identiteitsbewijs, terecht, fietsatelier |
| `A2:reading:p2:1` | aanmelding, ruimen, uiterlijk |
| `A2:listening:tandarts:1` | identiteitsbewijs |
| `A2:reading:batch001-pakketpunt:1` | afzender, identiteitsbewijs |
| `A2:reading:batch001-sporthal:1` | bouwer, bouwers, rekken, pijlen, verbouwing |
| `A2:listening:batch001-markt:1` | parkeerterrein, sluitingstijd, terecht |
| `A2:reading:batch002-wasserette:1` | accepteert, geschikte, verbouwd, verbouwde |
| `A2:reading:batch002-huisarts:1` | akkoord |
| `A2:listening:batch002-trein:1` | koffiebar |
| `A2:listening:batch002-bakker:1` | alternatief, ontbreken |
| `A2:writing:batch002-sleutel:1` | beheerder, kenmerk, ring |
| `A2:writing:batch002-schoenen:1` | merkt, strak |
| `A2:writing:batch002-plant:1` | verzorging |
| `A2:speaking:batch002-kapper:1` | haak |
| `A2:speaking:batch002-portemonnee:1` | bar |
| `A2:reading:batch003-lift:1` | beheerder, kondigt, beschikbaar |
| `A2:reading:batch003-bibliobus:1` | bibliobus, terecht, bepaald, identiteitsbewijs |
| `A2:writing:batch003-sportles:1` | afmelding |
| `A2:listening:batch005-training:1` | certificaat, heftruck, leidinggevende |
| `A2:listening:batch005-parkeervergunning:1` | kentekenbewijs, der, uploaden |
| `A2:listening:batch005-voetbal:1` | ploeg |
| `A2:listening:batch005-winkelcentrum:1` | sluitingstijd |
| `A2:listening:batch005-speelplaats:1` | klimtoestel, waterpomp, regio, speeltoestellen, wethouder |
| `A2:listening:batch005-werkdag:1` | terecht |
| `A2:listening:batch005-computercursus:1` | gevorderden |
| `A2:reading:batch004-parkeervergunning:1` | kenteken, betreft, westerhout |
| `A2:reading:batch004-telefoon:1` | oplaadaansluiting, waterschade |
| `A2:reading:batch004-bloedprikken:1` | nuchter, identiteitsbewijs |
| `A2:reading:batch004-verwarming:1` | deberk, resetknop, thermostaat, woningstichting, ketel |
| `A2:reading:batch004-flessenautomaat:1` | inwisselen, wisselt, ongemak |
| `A2:writing:batch008-huur:1` | woonstichting |
| `A2:writing:batch008-lantaarnpaal:1` | lantaarnpaal, melding, paal |
| `A2:writing:batch008-restaurant:1` | doek |
| `A2:writing:batch008-supermarkt:1` | koeling |
| `A2:speaking:batch009-abonnement:1` | prepaidkaart |
| `A2:speaking:batch009-schoonmaak:1` | doek, spuitfles |
| `A2:speaking:batch009-rijbewijs:1` | pionnen |
| `A2:speaking:batch009-kleermaker:1` | speldt |
| `A2:listening:batch022-garage:1` | accu |
| `A2:listening:batch022-kinderopvang:1` | kinderdagverblijf |
| `A2:listening:batch022-koffiegeld:1` | raadt |
| `A2:listening:batch023-cv-workshop:1` | uiterlijk |
| `A2:listening:batch023-verjaardagstaart:1` | toonbank |
| `A2:listening:batch023-turnles:1` | turnclub, turnvereniging |
| `A2:listening:batch023-hitte:1` | sluitingstijd, hitte, watertappunten |
| `A2:listening:batch023-herhaalmedicijn:1` | fabrikant |
| `A2:reading:batch021-terugbrengen:1` | tegoedbon, termijnen, verzendkosten |
| `A2:reading:batch021-ketel:1` | corporatie, ketel, kondigt, woningcorporatie, betreft |
| `A2:reading:batch021-weekmarkt:1` | fietsenrekken, opgeknapt, opknappen, stenen |
| `A2:reading:batch021-trappenhuis:1` | woningcorporatie, brand |
| `A2:reading:batch020-loonstrook-uitleg:1` | brutoloon, loonheffing, nettoloon, verbetering, betreft, kwekerij, kwekerijgroenwater |
| `A2:reading:batch020-voetbalseizoen:1` | contributie, scheenbeschermers, lidmaatschap |
| `A2:reading:batch020-tandartsregels:1` | tevoren, uiterlijk, identiteitsbewijs, verzekeringspas |
| `A2:reading:batch020-tweedehandsfiets:1` | inch, molenweg, verlichting, versnellingen |
| `A2:reading:batch020-spoorwerk:1` | vouwfiets |
| `A2:reading:batch020-politiebureau:1` | diefstal, voorwerpen, identiteitsbewijs, spoed, westerhout |
| `A2:speaking:batch026-koken-buurvrouw:1` | fornuis |
| `A2:speaking:batch027-wachtkamer:1` | blokken |
| `A2:speaking:batch027-keuken:1` | fornuis |
| `A2:speaking:batch027-bakkerij:1` | schuift |
| `A2:speaking:batch027-contant-pinnen:1` | winkelier |
