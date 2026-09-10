# Level check: batch 006 (KNM themes 1, 3, 4) and batch 007 (KNM themes 6, 7, 8)

Independent level check (blueprint section 12, step 5), 10 September 2026. Input: `content/batches/006-original.json` (24 items, SHA-256 `145a5c131b55e405d2961080a1b559e5565c220f18a78377553b94b9ceb720a1`) and `content/batches/007-original.json` (24 items, SHA-256 `9b045ce8798eeb99ed79649222530b472cc173e5cde15e31866b124f97cbe69c`). The catalogue copies differ from the batch files only in `status`, `revision`, the image `file` fields and the `questionAudio` path, so the text judged here is the text learners see. The editorial reviews (`006-review.*`, `007-review.*`) and the authors' notes (`006-notes.md`, `007-notes.md`) were not read.

## Method

1. Read before judging: `content/blueprint.md` sections 2, 4.5, 5 and 10; `docs/research/exam-blueprints-2026-09-10.md` section 3.1 "KNM" (with section 4 on scoring and the KNM rules in 6.5); `content/reviews/rubric.md` checks 1–2; `content/reviews/008-level-check.md` for the format.
2. Yardstick: the official KNM item as described in 3.1 — a photograph plus one factual question of at most twenty words at A2, read aloud, three short options also read aloud, in theme blocks, no behaviour questions, 40 items in 45 minutes (about 67 seconds per item). `content/exemplars/` does not exist, so no official item was compared side by side; the description is the reference. The eindtermen were read in the source text, Staatscourant 2024-15802 (bijlage 2, "Eindtermen KNM"), fetched on the review date; the repository holds no copy. Every item was checked against the literal wording of its eindterm and its indicators, because for KNM "level" is mostly the grain of the fact: an item is comparable when the tested fact is one the eindterm names, easier when the key can be reached from the words alone or from common sense, harder when the tested distinction is finer than the eindterm draws it.
3. Calibration: the eight older KNM cards in the catalogue (`A2:knm:batch003-…`, no `theme`, no `taskType`): a 35–50-word passage that stays on screen, two questions of 4–14 words each, three options, the answer located in the visible text (average sentence 9–13 words, longest 12–19). They are reading items, not recall items, and sit below the official demand in the dimension that matters for KNM; they were used as a lower bound only.
4. For every item: the section 10 heuristics on the fact text (`text`, shown only after answering, per `app/components/Session.tsx`), on the prompt and on the options — word and sentence counts, longest sentence, subordinators (omdat, als, dat, wanneer, toen allowed), tense, numbers, option-length spread; the question form (direct fact, persona fact, yes/no with qualification); what the key demands; distractor plausibility and any signal (length, hedging, polarity, a prompt word repeated only in the key); exam likeness (picture present and neutral, one question, three options, question audio, no situation line, no behaviour question).
5. All 48 drawings were looked at (`assets/images/<file>`, contact sheets at 400 px, two at full size) for one question only: does the picture carry, give away or contradict the answer. Style review is not part of this check.
6. Verdict scale: easier / comparable / harder than the official item of the same type. Flags: too easy, too hard, off-level, off-format, none. "Comparable (easy end)" with flag none means: a genuine KNM fact with a thin distractor, best used early in a drill.

Numbers that hold for all 48 items. Prompts: 4–20 words (the limit is 20; `aansprakelijkheid` sits on it), one to three sentences, longest sentence 4–13 words, one dat-clause (`zelfbeschikking`) and otherwise main clauses only; no preterite. Options: one to eight words, parallel in form within an item; key balance 8/9/7 in batch 006, 8/8/8 in batch 007, and 2–3 per letter in every eight-item theme set. Fact texts: 15–41 words in two to four sentences, average 7.5–12.0 words per sentence, longest 9–17 (limit 18), present tense throughout, one passive (`gft`) and one stative "staat geregistreerd" (`donorregister`), als-clauses in three items, relative clauses with die/dat in nine items and "wie …"-clauses in seven, wat/hoe-clauses in five; no other subordinator. Every item has one question, three options, a theme, an eindterm that exists in the July 2025 list, a source URL and a review date; every item has question audio (question plus options, 10.6–23.7 seconds); no item has a situation line, and none asks what a person "should do".

## Batch 006 — themes 1, 3, 4

| id (`A2:knm:batch006-…`) | theme / eindterm | form | prompt words | fact words / sentences (longest) | option words | verdict | flag |
| --- | --- | --- | --- | --- | --- | --- | --- |
| diplomawaardering | 1 / 1.1.4 | persona, definition | 11 | 20 / 2 (10) | 6-6-7 | comparable | none |
| ww-uitkering | 1 / 1.1.7 | persona, institution | 12 | 18 / 2 (9) | 2-2-2 | comparable | none |
| bijstandsplicht | 1 / 1.1.8 | persona, yes/no | 12 | 20 / 2 (12) | 5-4-6 | comparable | none |
| cao | 1 / 1.2.1 | direct, definition | 4 | 24 / 2 (17) | 5-7-7 | comparable | none |
| ondernemingsraad | 1 / 1.2.2 | direct, definition | 4 | 24 / 2 (14) | 5-6-6 | comparable | none |
| loonheffing | 1 / 1.2.3 | persona, definition | 10 | 24 / 2 (16) | 7-7-7 | comparable | none |
| sollicitatie | 1 / 1.3.1 | persona, yes/no | 13 | 24 / 2 (12) | 4-7-4 | easier | none |
| kvk | 1 / 1.4.1 | persona, institution | 12 | 22 / 2 (14) | 6-5-6 | comparable | none |
| huurcontract | 3 / 3.1.1 | persona, definition | 11 | 22 / 2 (15) | 5-7-7 | easier | too easy |
| huuropzegging | 3 / 3.1.2 | persona, yes/no | 11 | 21 / 2 (15) | 4-6-7 | comparable | none † |
| huurcommissie | 3 / 3.1.2 | persona, institution | 15 | 23 / 2 (14) | 2-2-2 | easier | too easy |
| woningcorporatie | 3 / 3.1.3 | persona, institution | 10 | 24 / 2 (13) | 3-3-3 | comparable | none |
| hypotheek | 3 / 3.1.3 | persona, definition | 11 | 24 / 2 (14) | 5-5-5 | comparable (easy end) | none |
| stroomstoring | 3 / 3.2.1 | persona, institution | 17 | 24 / 2 (13) | 3-3-3 | harder | too hard |
| energietarief | 3 / 3.2.2 | persona, definition | 11 | 22 / 2 (12) | 6-8-8 | comparable | none |
| gft | 3 / 3.3.1 | persona, rule | 12 | 22 / 2 (15) | 3-3-3 | comparable (easy end) | none |
| huisartskeuze | 4 / 4.1.1 | persona, yes/no | 16 | 15 / 2 (9) | 3-7-6 | easier as written | too easy |
| receptmedicijnen | 4 / 4.1.2 | persona, institution | 13 | 19 / 2 (10) | 3-3-3 | comparable | none |
| consultatiebureau | 4 / 4.1.4 | direct, definition | 4 | 22 / 2 (12) | 7-7-7 | comparable | none |
| verwijsbrief | 4 / 4.2.1 | persona, rule | 14 | 24 / 2 (15) | 5-5-5 | comparable | none |
| huisartsenpost | 4 / 4.3.1 | persona, definition | 9 | 22 / 2 (13) | 5-7-7 | comparable | none |
| eigenrisico | 4 / 4.4.1 | persona, yes/no | 12 | 20 / 2 (13) | 6-7-7 | comparable | none † |
| zorgnota | 4 / 4.4.3 | persona, institution | 12 | 22 / 2 (12) | 6-6-6 | comparable (easy end) | none |
| wmo | 4 / 4.5.1 | persona, institution | 16 | 24 / 2 (12) | 2-2-2 | comparable | none |

### Item notes, batch 006

- **diplomawaardering.** Eindterm 1.1.4 is exactly "hoe de waarde van een eerder behaald diploma … kan worden gewaardeerd". The three options are the three things learners actually confuse (comparison, translation, new exam); the key is not the longest or the most hedged. Fact text of two 10-word sentences.
- **ww-uitkering.** The distractor "De gemeente" is the indicator's own neighbour (with an arbeidsverleden UWV, without it the gemeente); "De Belastingdienst" is the toeslagen confusion. Two-word options, nothing to decode.
- **bijstandsplicht.** The key ("Ja, dat is een plicht") is the literal indicator "in principe aangeboden werk moet accepteren"; option C ("Alleen werk in haar eigen vak") is the passende-arbeid misunderstanding. The only yes/no item with a ja / nee / qualified split, which is the shape the others should copy (see the set note). "aanvaarden" in the fact text is above "accepteren" in the prompt; harmless after the answer.
- **cao.** Direct definitional question; the distractor "Een contract voor één werknemer" is the arbeidsovereenkomst/cao confusion the indicator names. The first fact sentence is 17 words, the longest in the batch; a split is suggested below.
- **ondernemingsraad.** Indicator 1.2.2 lists "ondernemingsraad/medezeggenschapsraad en personeelsvereniging" and the vakbond in the next line, so "Een vakbond voor de hele sector" is the right distractor. The 50-employee threshold in the fact is extra and not tested.
- **loonheffing.** Indicator 1.2.3: "werknemerspremies en belastingen op het salaris worden ingehouden". Options 7-7-7 words, the cleanest set in the batch. The 16-word fact sentence carries a relative clause and "volksverzekeringen"; a simpler version is suggested below.
- **sollicitatie.** A values fact every course teaches; "Ja, dat mag altijd" is an absolute nobody picks, so the item is really a two-option item and the key is the odd polarity out. Easier, but exam-shaped and the eindterm is a one-liner (1.3.1), so no flag.
- **kvk.** Indicator 1.4.1: "inschrijving bij de Kamer van Koophandel verplicht"; the Belastingdienst distractor is the natural confusion, and the fact text explains why it is wrong.
- **huurcontract, huurcommissie, stroomstoring, huisartskeuze.** See flagged items.
- **huuropzegging.** Indicator 3.1.2 ("contractbreuk door de verhuurder"). "Ja, als hij een maand eerder belt" is a good wrong rule; "Ja, dat mag altijd" is the same weak absolute as in sollicitatie and makes the key the odd polarity out (†).
- **woningcorporatie.** Indicator 3.1.3 names sociale huur and "spoedige inschrijving als woningzoekende". "Bij de notaris" is weak (nobody registers for housing with a notary); "Bij de gemeente" would be the real confusion (indicator 3.1.1 says first housing often comes via the gemeente). Optional swap below.
- **hypotheek.** Definitional; "hypotheek" is not transparent for a learner, and tax and insurance are the two things it is mistaken for. Easy end because most adults know the word. The fact sentence "U kunt niet meer lenen dan het huis waard is" is a simplification (up to 106% is allowed for energy-saving measures); not tested.
- **energietarief.** Indicator 3.2.2 literally asks for the difference between fixed and variable tariffs; option C is the variable-tariff description, option A the "locked in" myth. Options 6-8-8.
- **gft.** Indicator 3.3.1. The glasbak distractor is implausible (peels in a bottle bank); restafval is the real confusion. Optional: "In de bak voor plastic." Easy end; the abbreviation gft must be known, which is KNM content.
- **receptmedicijnen.** Indicator 4.1.2 is exactly this contrast (recept → apotheek; some medicines at the drogist). Three-word options.
- **consultatiebureau.** Indicator 4.1.4 names the consultatiebureau; the distractors are the two neighbouring institutions (kinderopvang, gemeente for the geboorteaangifte). "inentingen" in the fact is the one lower-frequency word and is not needed.
- **verwijsbrief.** Indicator 4.2.1. Options 5-5-5, each a document from a different body.
- **huisartsenpost.** Indicator 4.3.1; the spoedeisende hulp confusion is the point of the eindterm. Because the compound contains "huisarts" and only the key contains "huisartsenzorg", a learner can decode the key; mild, optional fix below.
- **eigenrisico.** Indicator 4.4.1 literally: "een bezoek aan de huisarts gaat niet ten koste van het eigen risico". Good item; the key is the odd polarity out (†).
- **zorgnota.** Eindterm 4.4.3 is only "veel administratieve aspecten van de zorg worden digitaal geregeld"; the item makes that concrete (the insurer's portal). The gemeente and huisartsenpost websites are thin distractors; optional swap below. Easy end.
- **wmo.** Indicator 4.5.1 names "hulp thuis … voor ouderen … bij een gemeenteloket of wijkteam"; "De zorgverzekeraar" is the real confusion (wijkverpleging). Two-word options; the 11-word prompt sentence is the longest in the batch and still plain.

## Batch 007 — themes 6, 7, 8

| id (`A2:knm:batch007-…`) | theme / eindterm | form | prompt words | fact words / sentences (longest) | option words | verdict | flag |
| --- | --- | --- | --- | --- | --- | --- | --- |
| reisdocument | 6 / 6.2.2 | persona, document | 18 | 28 / 3 (14) | 4-3-2 | comparable | none |
| naturalisatie | 6 / 6.2.3 | persona, condition | 16 | 25 / 3 (12) | 6-5-5 | comparable | none |
| jaaropgave | 6 / 6.3.1 | direct, document | 10 | 28 / 3 (11) | 2-2-2 | comparable | none |
| kinderbijslag | 6 / 6.3.3 | persona, institution | 15 | 27 / 3 (12) | 4-3-6 | comparable | none |
| identificatieplicht | 6 / 6.4.1 | persona, yes/no (age) | 17 | 28 / 3 (16) | 7-7-7 | comparable | none † |
| bezwaar | 6 / 6.5.1 | persona, right | 15 | 29 / 3 (13) | 7-6-7 | comparable (easy end) | none |
| juridischloket | 6 / 6.5.2 | direct, institution | 10 | 28 / 3 (13) | 4-4-3 | easier | too easy |
| wa-verzekering | 6 / 6.6.1 | persona, rule | 11 | 29 / 3 (13) | 2-2-2 | comparable | none |
| wetten | 7 / 7.1.1 | direct, structure | 7 | 29 / 3 (13) | 3-6-5 | comparable | none |
| europese-unie | 7 / 7.1.2 | persona, yes/no | 14 | 29 / 3 (12) | 8-8-8 | comparable | none |
| hoger-beroep | 7 / 7.1.3 | persona, right | 17 | 30 / 4 (12) | 6-4-6 | comparable | none |
| meningsuiting | 7 / 7.2.2 | direct, rule | 11 | 29 / 3 (14) | 5-7-6 | comparable | none |
| godsdienstvrijheid | 7 / 7.2.3 | direct, definition | 5 | 27 / 3 (15) | 7-7-7 | easier | too easy (mild) |
| geweldloos-opvoeden | 7 / 7.2.6 | persona, yes/no | 15 | 24 / 3 (11) | 6-4-4 | comparable (easy end) | none † |
| donorregister | 7 / 7.2.7 | persona, rule | 15 | 41 / 4 (15) | 4-6-5 | comparable | none |
| zelfbeschikking | 7 / 7.2.8 | persona, rule | 18 | 25 / 3 (10) | 6-7-8 | comparable | none |
| vmbo | 8 / 8.1.1 | persona, structure | 14 | 29 / 3 (12) | 3-3-3 | comparable | none |
| bijzondere-school | 8 / 8.1.2 | direct, definition | 13 | 28 / 3 (17) | 7-6-7 | comparable | none |
| seksuele-vorming | 8 / 8.1.5 | persona, yes/no | 14 | 27 / 3 (14) | 6-5-6 | comparable | none † |
| aansprakelijkheid | 8 / 8.2.1 | persona, rule | 20 | 28 / 3 (12) | 3-3-5 | comparable | none |
| medezeggenschapsraad | 8 / 8.2.2 | persona, institution | 18 | 26 / 3 (13) | 2-2-2 | comparable | none |
| ouderbijdrage | 8 / 8.3.1 | generic, yes/no | 14 | 25 / 3 (11) | 7-5-7 | comparable | none † |
| kinderopvangtoeslag | 8 / 8.3.2 | persona, institution | 18 | 29 / 3 (16) | 1-1-1 | comparable (easy end) | none |
| studiefinanciering | 8 / 8.3.3 | persona, institution | 14 | 26 / 3 (11) | 3-3-2 | comparable | none |

### Item notes, batch 007

- **reisdocument.** The rijbewijs distractor is the real confusion (it is an identiteitsbewijs inside the Netherlands, not abroad), the zorgpas a plain wrong document. Eindterm 6.2.2 is about obtaining official documents, so the fit is loose but defensible. The prompt's "identiteitsbewijs" is echoed only by the key ("identiteitskaart"); optional prompt tweak below.
- **naturalisatie.** The inburgering requirement is not among the 6.2.3 indicators but is the central condition on the cited IND page; "eigen huis" and "vast contract" are what people believe is required. The key uses "meestal" in the fact text, not in the option, so nothing is hedged in the options. On the watch list (see retire triggers).
- **jaaropgave.** Indicator 6.3.1 literally. Two-word options; "pensioenoverzicht" is the one lower-frequency word and it is a distractor, not the key.
- **kinderbijslag.** Indicator 6.3.3 ends with "kinderbijslag kan aanvragen bij de Sociale Verzekeringsbank"; the Belastingdienst is the toeslag/bijslag confusion the same indicator invites.
- **identificatieplicht.** Indicator 6.4.1 gives 14 and the 12-year rule in public transport; the item tests 14 against 16 and 18. Comparable; the key is the odd polarity out (†). The 16-word fact sentence stacks three verbs ("moet … kunnen laten zien") plus an als-clause — one of the densest sentences in the batch, still under the limit.
- **bezwaar.** Eindterm 6.5.1 is about objecting to treatment by the government; the item's Awb fact (bezwaar within six weeks to the body that decided) is the standard KNM version and the key does not depend on the number. "Hij mag het besluit gewoon negeren" is not a plausible belief; optional swap below. Easy end.
- **juridischloket, godsdienstvrijheid.** See flagged items.
- **wa-verzekering.** Indicator 6.6.1: "motorvoertuigbezitters verplicht … een WA-verzekering". Allrisk is the confusion, inboedel the wrong domain. Two-word options.
- **wetten.** Indicator 7.1.1: "de Tweede en Eerste Kamer samen met de regering wetten maken"; the Koning and the rechters are the two other powers, which is the right pair of distractors. The drawing of a plenary hall cues the topic, as an official photograph would; it does not choose between the options.
- **europese-unie.** Indicator 7.1.2 ("vrij verkeer van personen … vrije vestiging"). Options 8-8-8, and the only yes/no item in the pair whose key shares its polarity with a distractor — the model for the fix in the set note.
- **hoger-beroep.** Indicator 7.1.3 literally: "een uitspraak van een rechter moet accepteren, maar … in hoger beroep kan gaan". The ombudsman distractor is a genuine confusion. Key is the shortest option (4 vs 6-6); optional padding below.
- **meningsuiting.** Indicator 7.2.2; "aanzetten tot haat" is the participatieverklaring wording. The prompt "Wat is toch verboden?" reads as an exasperated question unless "toch" is stressed; wording fix below.
- **geweldloos-opvoeden.** Eindterm 7.2.6 names "slaan van kinderen" outright. A norm item with thin distractors ("Ja, maar alleen thuis"); easy end, and the key is the odd polarity out (†). The fix below also makes the distractor a real belief (a light tik).
- **donorregister.** The best recall item in the pair: the default registration is exactly eindterm 7.2.7, and "geen donor" and "familie beslist" are the other two register choices. The fact text is the longest (41 words, four sentences, "staat geregistreerd", "is … te veranderen") but stays under every limit.
- **zelfbeschikking.** Eindterm 7.2.8 plus huwelijksdwang from the cited page. Option C ("Dwang mag, omdat zij ouder is dan 18") is logically odd and rarely chosen; B is the real distractor. Acceptable.
- **vmbo.** Indicator 8.1.1 ("verschillende schoolsoorten", "toelatingseisen"). "de meeste leerlingen" keeps the havo route out of the way. Three-word options.
- **bijzondere-school.** Indicator 8.1.2 literally; "Een school voor kinderen met een beperking" (speciaal onderwijs) is an excellent distractor. The first fact sentence is 17 words with "levensovertuiging"; it is the eindterm's own word, shown after the answer.
- **seksuele-vorming.** Eindterm 8.1.5 literally. Key is the odd polarity out (†). The fact text is the most B1-flavoured in the pair ("aandacht besteden aan relationele en seksuele vorming", "landelijke kerndoelen"); simplification below.
- **aansprakelijkheid.** Persona of 9 keeps the item inside both the Rijksoverheid rule (under 14: parents liable) and the indicator's coarser "tot het zestiende levensjaar". Prompt exactly 20 words. Both "dochter" (option A) and "Fatima" (option B) echo the prompt, so neither cues the key.
- **medezeggenschapsraad.** The MR is not in the 8.2.2 indicators (which name overlegmomenten and volunteering) but is the first thing the cited page lists. "De gemeenteraad" is far-fetched; "De ondernemingsraad" would be the sharper confusion (the workplace body of 1.2.2). Optional swap below.
- **ouderbijdrage.** Indicator 8.3.1 names the "(vrijwillige) ouderbijdrage"; option C (bijzondere school) is a real belief. Key is the odd polarity out (†) and the only option that repeats "ouderbijdrage"; optional rewording below.
- **kinderopvangtoeslag.** Indicator 8.3.2 ("vergoeding van onkosten voor … opvang"). One-word options; the kinderbijslag/kinderopvangtoeslag confusion is squarely KNM, though "toeslag" in the prompt lets a careful learner eliminate "Kinderbijslag". Easy end. Hard retire date 2029 (see triggers).
- **studiefinanciering.** Eindterm 8.3.3 literally. Key "Bij DUO" is two words against three; trivial. The fact text's "DUO organiseert ook het inburgeringsexamen" is a useful hook.

## Flagged items

### huurcontract — easier, too easy

"Karim tekent een huurcontract voor een woning. Wat is een huurcontract?" can be answered from the word itself: "huur" plus "contract" gives option A, option B contradicts "huur", and option C is a letter, not a contract. Eindterm 3.1.1 does say "weet wat een huurcontract inhoudt", so the topic is right; the question tests vocabulary, not knowledge. Replacement that keeps the fact text, the picture and the key letter, and tests the parties to the contract (the gemeente and the notary are the two confusions of a newcomer):

- prompt: "Karim gaat een woning huren. Wie maken samen de afspraken in het huurcontract?" (13 words)
- A* "De huurder en de verhuurder." — B "De huurder en de gemeente." — C "De verhuurder en de notaris."
- evidence: "de afspraken tussen de huurder en de verhuurder"
- explanation: "Een huurcontract is een afspraak tussen twee partijen: de huurder en de verhuurder. De gemeente en de notaris zijn geen partij bij een huurcontract; een notaris hoort bij het kopen van een huis."

Alternative from the fact's unused second sentence: "Karim gaat een woning huren. Moet de verhuurder het huurcontract op papier zetten?" — A* "Ja, dat is verplicht." B "Nee, mondeling afspreken is genoeg." C "Alleen bij een sociale huurwoning." (evidence "De verhuurder moet het contract schriftelijk maken").

### huurcommissie — easier, too easy

The fact (rent disputes in social housing go to the Huurcommissie) is the heart of eindterm 3.1.2, but the options do not test it: "De politie" and "De Belastingdienst" are not bodies anyone consults about a huurverhoging, and the key is the only option containing "huur" while the prompt says huurt, huurwoning and huurverhoging (blueprint section 5: no prompt word repeated only in the key). Replace the two distractors with the bodies a tenant actually considers:

- A "De gemeente." — B "De woningcorporatie zelf." — C* "De Huurcommissie."
- explanation, add: "De woningcorporatie is de verhuurder en beoordeelt haar eigen huurverhoging niet; de gemeente gaat niet over de huurprijs."

Do not use "De rechter": the `huuropzegging` fact in the same set says "Bij een conflict beslist de rechter", which would make it defensible.

### stroomstoring — harder, too hard

The key (netbeheerder) is correct by the cited Rijksoverheid page, but eindterm 3.2.1 itself says "weet hoe hij een storing meldt bij de leverancier van de nutsvoorziening" — so distractor C, "Bij de energieleverancier", is the answer in the eindterm's own words, and the netbeheerder/leverancier split is finer than the July 2025 list draws it (many native speakers do not know it either). An official item written from the eindterm is unlikely to hinge on this contrast. Keep the fact and the key; replace the defensible distractor with a wrong body at the eindterm's grain:

- A "Bij de gemeente." — B* "Bij de netbeheerder." — C "Bij het alarmnummer 112."
- explanation: "Storingen in het netwerk meldt u bij de netbeheerder, die de kabels en leidingen beheert. De gemeente gaat er niet over, en 112 is alleen voor levensgevaar. De energieleverancier stuurt de rekening, maar lost geen storing op."

Picture: the prompt says the whole street is without power, but the houses across the street have lit windows (`images/1c715ee881b5c048.webp`). Not answer-relevant; regenerate with dark windows when convenient.

### huisartskeuze — easier as written, too easy

The fact is the first indicator of 4.1.1 ("weet hoe hij een huisarts kan kiezen") and the distractors (gemeente, zorgverzekeraar) are the right bodies. The options give the key away three times over: "Ja, meestal wel." is the shortest option (3 words against 7 and 6), the only hedged one, and the only "Ja" against two "Nee" — every signal section 5 forbids, in one item. Rewrite the options so that the key is parallel in length and shares its polarity with a distractor, and make the second distractor the fact's own second sentence (changing huisarts is allowed):

- A* "Ja, zij kiest meestal zelf een huisarts." — B "Nee, de gemeente wijst een huisarts aan." — C "Ja, maar zij mag later niet meer veranderen."
- evidence unchanged; explanation unchanged (it already says "u mag ook veranderen").

### juridischloket — easier, too easy

"Waar krijgen mensen met een laag inkomen gratis juridisch advies?" — the prompt word "juridisch" appears in the key ("Juridisch Loket") and nowhere else, so lexical matching answers the item; "Bij het politiebureau" is a weak third option. The fact (6.5.2, literally "bij advocaten of een Juridisch Loket") is right. Reword the prompt so that it names the situation, not the discipline; the picture (a woman with a folder opposite an adviser) still fits:

- prompt: "Waar krijgen mensen met een laag inkomen gratis advies bij een conflict over huur of werk?" (16 words)
- options, evidence and explanation unchanged.

A persona version ("Karim heeft een conflict met zijn verhuurder. Hij heeft een laag inkomen. Waar krijgt hij gratis advies?", 17 words) would be more exam-like but needs a picture of a cast member.

### godsdienstvrijheid — easier, too easy (mild)

"Wat betekent godsdienstvrijheid in Nederland?" is answered by decoding "vrijheid": both distractors are the opposite of freedom. The definitional form is exam-like (the blueprint's own example is "Erik woont in een sociale huurwoning. Wat is dat?"), so this item can stay as the warm-up of the theme, but it should not be the only 7.2.3 item. The indicator that the minister added to 7.2.3 — "de wetten van de staat staan boven die van religie en traditie" — is the fact an exam writer will reach for. Either replace, or add as the second 7.2.3 item the launch bank needs anyway:

- prompt: "In Nederland geldt godsdienstvrijheid. Wat is belangrijker: de wet of de regels van een geloof?" (15 words)
- A* "De wet van de staat." — B "De regels van het geloof." — C "Dat kiest iedereen zelf."
- fact text: replace the third sentence with "De wet van de staat gaat boven de regels van een geloof of traditie."; evidence: "De wet van de staat gaat boven de regels van een geloof"
- explanation: "Iedereen kiest zelf een geloof, maar de wet van de staat gaat altijd boven de regels van een geloof of traditie. 'Dat kiest iedereen zelf' geldt voor het geloof, niet voor de wet."
- source: eindterm 7.2.3, Staatscourant 2024-15802, plus the participatieverklaring already cited.

## Set-level finding: the yes/no items signal their key (†)

Ten items are yes/no questions with a qualification, the third form section 4.5 asks for. In eight of them the two distractors share one polarity and the key has the other: sollicitatie (ja, ja, nee*), huuropzegging (ja, nee*, ja), huisartskeuze (ja*, nee, nee), eigenrisico (ja, nee*, ja), identificatieplicht (nee, ja*, nee), geweldloos-opvoeden (ja, nee*, ja), seksuele-vorming (ja*, nee, nee), ouderbijdrage (ja, nee*, ja). bijstandsplicht is ja / nee / neutral, and only europese-unie (nee*, ja, nee) breaks the pattern. A learner who always picks the odd polarity scores eight of the nine two-polarity items without knowing anything — the kind of signal section 5 rules out, and across a theme drill it is learnable within a few items. Four small edits break the pattern (after them the odd polarity is the key in four of nine, which is chance):

- **huisartskeuze** — as above.
- **huuropzegging** — A "Ja, dat mag altijd." → "Nee, dat mag nooit." (the item then tests that huurbescherming is strong but not absolute); explanation, add: "Opzeggen mag dus niet zomaar, maar ook niet nooit."
- **eigenrisico** — A → "Ja, elk bezoek aan de huisarts kost eigen risico." (so "huisarts" is no longer only in the key); C "Ja, alleen het eerste bezoek per jaar." → "Nee, en medicijnen op recept ook niet." (the explanation already says medicines do count).
- **geweldloos-opvoeden** — B* "Nee, dat is verboden." → "Nee, dat is bij wet verboden."; C "Ja, maar alleen thuis." → "Nee, maar een tik mag wel."; explanation, add: "Ook een tik is lichamelijk geweld en mag niet."

Optional, same purpose: **seksuele-vorming** B → "Nee, alleen op de middelbare school.", C → "Ja, maar alleen als de ouders het willen."; **identificatieplicht** as a direct age question with the indicator's own second threshold as distractor — prompt "Sem is 15. Een politieagent vraagt op straat om zijn identiteitsbewijs. Vanaf welke leeftijd is dat verplicht?" (17 words), A "Vanaf 12 jaar." B* "Vanaf 14 jaar." C "Vanaf 18 jaar.", explanation noting that 12 applies only in public transport. Key letters do not move in any of these edits, so the per-set balance stays 2–3 per letter.

## Notes that do not change a verdict

- **Wording.** meningsuiting prompt: "Wat is toch verboden?" → "Wat is wél verboden?". hoger-beroep key: "In hoger beroep gaan." → "Hij kan in hoger beroep gaan." (6 words, parallel with the distractors). reisdocument prompt: "Welk identiteitsbewijs moet hij meenemen?" → "Welk document moet hij meenemen?" (removes the identiteits- echo). ouderbijdrage key: "Nee, de ouderbijdrage is vrijwillig." → "Nee, die bijdrage is vrijwillig."
- **Sharper distractors, optional.** woningcorporatie B "Bij de notaris." → "Bij de gemeente."; gft B "In de glasbak." → "In de bak voor plastic."; zorgnota C "Op de website van de huisartsenpost." → "Op de website van de Belastingdienst."; bezwaar B "Hij mag het besluit gewoon negeren." → "Hij mag meteen naar de rechter gaan." (tests bezwaar before beroep; slightly harder); medezeggenschapsraad A "De gemeenteraad" → "De ondernemingsraad"; huisartsenpost B "Een apotheek die 's nachts open is." → "Uw eigen huisarts, maar dan 's nachts.".
- **Fact texts at the top of A2.** These are shown after the answer, so they do not change the level of the item, but they are what learners study. cao: split the 17-word sentence — "Een cao is een collectieve arbeidsovereenkomst. Daarin staan afspraken over loon en werktijden voor een grote groep werknemers." loonheffing: "Loonheffing is belasting en premie voor de volksverzekeringen. De werkgever houdt die elke maand in op het loon. Daarom is het nettoloon lager dan het brutoloon." (evidence would become "De werkgever houdt die elke maand in op het loon"). seksuele-vorming: "Basisscholen en middelbare scholen moeten les geven over relaties en seksualiteit. Dat staat in de landelijke regels voor het onderwijs, de kerndoelen. Scholen kiezen zelf hoe zij dit doen." (evidence "moeten les geven over relaties en seksualiteit", which also matches the prompt's wording). bijzondere-school keeps "levensovertuiging" because it is the eindterm's word.
- **Fact texts and the eindtermen.** aansprakelijkheid states "jonger dan 14 jaar" where indicator 8.2.1 says "tot het zestiende levensjaar"; both are true (14–16 is conditional) and the persona of 9 sits under both; a learner who meets an official item with "16" will not be contradicted if the fact adds "Tussen 14 en 16 jaar zijn ouders vaak ook nog aansprakelijk." hypotheek's "niet meer lenen dan het huis waard is" is 100% by rule and up to 106% for energy-saving measures; untested, but "meestal niet meer" would be exact. donorregister's explanation could add that with 'geen bezwaar' the family can only object if it can show the person did not want to be a donor.
- **Pictures.** None of the 48 carries or gives away an answer; all are text-free scene-setters in the house style, cast traits consistent (Karim, Fatima, Roos, Julio, Sem, meneer De Vries, mevrouw Bakker, Amina appear as briefed). Two scenario mismatches, neither answer-relevant: stroomstoring (lit windows across the street during a street-wide outage) and ouderbijdrage (the yellow bus reads as an American school bus rather than a Dutch touringcar; a palette effect). Section 4.5 asks for `kind: photo`, section 7 for drawings except for "real places, documents and objects"; all 48 are `kind: drawing`. That is a deliberate project decision, but it is the one visible difference from the official item, whose photograph often shows the real thing. For the items about a real place or object — wetten (the plenary hall), hoger-beroep (a rechtbank), reisdocument (a Dutch paspoort or identiteitskaart), jaaropgave/loonheffing (a payslip), gft (a gft-container) — a licensed photograph as section 7 allows would raise exam likeness; section 4.5 should say "photo or drawing" either way.
- **Punctuation.** Batch 006 ends every option with a full stop; batch 007 does so only for sentence options and not for noun phrases (reisdocument, jaaropgave, kinderbijslag, juridischloket, wa-verzekering, wetten, meningsuiting, vmbo, bijzondere-school, aansprakelijkheid, medezeggenschapsraad, kinderopvangtoeslag, studiefinanciering). Consistent within each item, so cosmetic; one house rule would be tidier.
- **Persona ages.** Sem is 15 in identificatieplicht and 18 in studiefinanciering; the cast entry says "teenage boy", so both fit.

## Coverage, balance and retire triggers

### Eindterm coverage of the six themes

By my count of the Staatscourant text the eight themes hold 78 numbered eindtermen (13, 7, 6, 12, 4, 13, 12, 11). The two batches cover 46 distinct eindtermen with 48 items — every item maps to a real eindterm, 44 once and two twice — which is an efficient spread. Uncovered in the six themes (21 of 67):

| theme | eindtermen | covered | not yet covered |
| --- | --- | --- | --- |
| 1 Werk en inkomen | 13 | 8 | 1.1.1 (MAP, regelingen), 1.1.2 (vacatures, cv, uitzendbureau, sollicitatiegesprek), 1.1.3 (kansen op de arbeidsmarkt), 1.1.5 (bijscholing), 1.1.6 (eisen van de werkgever) |
| 3 Wonen | 6 | 6 (3.1.2 and 3.1.3 twice) | — |
| 4 Gezondheid | 12 | 8 | 4.1.3 (tandarts), 4.3.2 (112), 4.4.2 (declareren), 4.4.4 (DigiD voor zorg) |
| 6 Instanties | 13 | 8 | 6.1.1 (digitaal contact, BSN, DigiD), 6.1.2 (Nibud, voedselbank, GGD …), 6.2.1 (wijzigingen doorgeven, BRP), 6.2.4 (taken gemeente, gemeentelijke belastingen), 6.3.2 (belastingaangifte) |
| 7 Rechtsstaat | 12 | 8 | 7.1.4 (kiesrecht, stemmen na vijf jaar), 7.2.1 (gelijkwaardigheid m/v), 7.2.4 (gelijke behandeling, meldpunt), 7.2.5 (privacy) |
| 8 Onderwijs | 11 | 8 | 8.1.3 (leerplicht, kwalificatieplicht), 8.1.4 (vve, bso), 8.2.3 (opvoedingsondersteuning) |

Is the balance right? Eight items per theme is the right shape for one drill set per theme (section 11) and the sets `knm-knm-03` … `08` are exactly that, keys 2–3 per letter in each. Measured against the eindtermen it is uneven in a predictable way: theme 3 (six eindtermen) is complete with two doubles, while themes 1, 4, 6 and 7 each leave four or five objectives untouched, and some of the gaps are the most classic KNM facts — belastingaangifte (6.3.2, the blueprint's own example question), kiesrecht and the five-year rule for gemeenteraadsverkiezingen (7.1.4), leerplicht (8.1.3), 112 (4.3.2), DigiD (4.4.4, 6.1.1), and the whole job-search cluster of 1.1.2. Seven of these gaps are touched only by the old study cards (digid, noodnummer, stemmen, leerplicht, discriminatie, inschrijven, verhuizing), which are reading items and should not stand in for exam items. Within themes the spread is sensible: theme 4 circles the huisarts four times (keuze, verwijzing, post, eigen risico) but each is a distinct eindterm; theme 7 gives 7.2 five items and 7.1 three, matching the eindterm counts.

For the launch bank ("every eindterm at least twice", section 4.5) the next KNM batches should be allocated by gap, not by theme: 21 uncovered eindtermen × 2 plus 44 once-covered × 1 in these six themes (86 items), plus themes 2 and 5 from zero (22 items). A full 40-item mock in eight theme blocks cannot be assembled until themes 2 and 5 exist; a half form of six blocks can.

### Rules that could change within a year

None of the 48 keys rests on a rule scheduled to change before September 2027. The items that carry named legislative movement, with the trigger that would retire them:

| item | rule tested | known movement | effect on the key | action |
| --- | --- | --- | --- | --- |
| bijstandsplicht | duty to accept offered work (1.1.8) | Participatiewet in balans, tranches 1 Jan 2026 and 2027 | duty stays "in principe"; wording of exceptions may change | re-check 1 Jan 2027; retire if the arbeidsverplichting is softened |
| naturalisatie | inburgeringsexamen as a condition | announced bills on a B1 language requirement and a longer residence term | key stays true at either level; "meestal" already hedges | re-check before each release; retire only if inburgering stops being a condition |
| kinderopvangtoeslag | toeslag for registered childcare | new financing system planned for 1 Jan 2029 (bill expected autumn 2026) | none until 2029 | hard retire date 2029; watch the bill |
| eigenrisico | huisarts exempt from eigen risico | amount and possible per-treatment cap planned for 2027 | exemption for huisartsenzorg unaffected; amount not tested | yearly check |
| wmo | gemeente arranges hulp thuis | income-dependent eigen bijdrage discussed for 2027 | who arranges it is unaffected | yearly check |
| seksuele-vorming | obligation in the kerndoelen | kerndoelen revision in progress, political debate | obligation retained in the drafts | re-check when the new kerndoelen are set |
| huurcommissie | disputes on huurverhoging in social housing | Wet betaalbare huur (1 Jul 2024) widened scope | unaffected (item names a sociale huurwoning) | yearly check |
| juridischloket | free advice for low incomes | income limit adjusted yearly | limit not tested | yearly check |

Everything else in the pair is constitutional or structural (which body does what, what a document is) and stable; fee and amount details (KVK fee, eigen risico amount, income limits, WW percentages, energy prices) are deliberately kept out of the questions.

## Conclusion

### A fair KNM drill, with one systematic weakness

Forty-one items are comparable to the official July 2025 item: a real eindterm fact, a plain question under twenty words, three short parallel options, plausible confusions, a neutral picture, question audio, no behaviour question. Six are easier — one values fact with a throwaway distractor (sollicitatie) and five where the words, not the knowledge, give the key (huurcontract, huurcommissie, huisartskeuze, juridischloket, godsdienstvrijheid) — and one is harder than the eindterm draws it (stroomstoring). None is off-level in language: no prompt or option is above A2, and the fact texts pass every section 10 heuristic with two 17-word sentences at the edge. None is off-format. Against the calibration cards the pair is a clear step up — the answer is no longer on the screen — while the language is simpler.

The one thing that would hurt learners in the real exam is the yes/no pattern: nine of ten yes/no items reward picking the odd polarity, which a drill teaches within a few items and the official exam presumably does not. Four option edits fix it.

### Order in drills (one theme per drill, section 11)

- Theme 1: kvk → ww-uitkering → cao → ondernemingsraad → diplomawaardering → loonheffing → bijstandsplicht → sollicitatie.
- Theme 3: hypotheek → gft → huurcontract (revised) → woningcorporatie → energietarief → huurcommissie (revised) → huuropzegging → stroomstoring (revised).
- Theme 4: receptmedicijnen → huisartskeuze (revised) → verwijsbrief → consultatiebureau → huisartsenpost → wmo → zorgnota → eigenrisico.
- Theme 6: reisdocument → wa-verzekering → jaaropgave → kinderbijslag → identificatieplicht → bezwaar → juridischloket (revised) → naturalisatie.
- Theme 7: godsdienstvrijheid → meningsuiting → wetten → europese-unie → geweldloos-opvoeden → zelfbeschikking → hoger-beroep → donorregister.
- Theme 8: vmbo → ouderbijdrage → studiefinanciering → kinderopvangtoeslag → bijzondere-school → medezeggenschapsraad → seksuele-vorming → aansprakelijkheid.

### Recommended actions

1. **Author, required:** huurcontract (new question and options), huurcommissie (two distractors), stroomstoring (distractor C and explanation), huisartskeuze (three options), juridischloket (prompt), godsdienstvrijheid (replace, or add the "wet boven geloof" twin), plus the polarity edits in huuropzegging, eigenrisico and geweldloos-opvoeden. Key letters stay where they are.
2. **Author, optional:** the wording and distractor tweaks and the three fact-text simplifications listed under notes; the seksuele-vorming and identificatieplicht polarity variants.
3. **Coordinator:** reconcile section 4.5 (`kind: photo`) with section 7 (drawings), and consider licensed photographs for the five real-object items; add the theme divider ("De volgende vragen gaan over het thema …") to KNM sets in the player; give the eight batch-003 cards `taskType: leerkaart` (they still have none) and keep them out of any KNM form; allocate the next KNM batches by the coverage table above, starting with 6.3.2, 7.1.4, 8.1.3, 4.3.2, 6.1.1 and the 1.1.2 cluster, and with themes 2 and 5; regenerate the stroomstoring picture with dark windows across the street.
4. **Media:** the revised items need new question audio (the prompt or options change in every required edit).

## Limitations

- No official KNM item was available in the repository; exam likeness is judged against the verified description in the research document, not against a real item, and I cannot say how often the official exam itself lets the odd polarity mark the key.
- The eindtermen were read from the Staatscourant text fetched on 10 September 2026; the count of 78 is mine and the research document's "about seventy" is a rounding of the same list.
- Legislative movement in the retire-trigger table reflects what was announced by the review date; the coordinator should confirm the status of the naturalisation and Participatiewet bills at the next yearly check rather than rely on this table.
- Pictures were judged only for answer relevance, at contact-sheet size with two at full size; the house-style review is a separate step.
- This is an AI review of level and exam likeness; it is not a validation of difficulty and does not establish equivalence with the official exam.
