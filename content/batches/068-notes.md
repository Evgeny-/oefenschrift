# Batch 068 author notes

Authorised replacement of five published B1 speaking tasks (19 October 2026).

On 19 October 2026 learner report 6 against `A2:speaking:batch001-apotheek:1` showed a prompt that gives away the answer. The project owner asked for every similar exercise to be checked. Independent audits followed (`tmp/content-fix-2026-10-19/audit/b1-speaking.md` for this part). The same day the owner approved hiding the criteria of every speaking task until review (`app/components/OpenExercise.tsx`, around line 300). That includes the sixteen B1 middellang tasks without a cue (`tmp/content-fix-2026-10-19/spec/hidden-criteria.md`). Only the prompt and its pictures or table are now on screen. The sentence starters remain available on request, and the title is the heading. So a learner who does exactly what the prompt says must meet every criterion, and the starters and title must not name what a criterion asks the learner to supply.

I checked all sixteen tasks of `tmp/content-fix-2026-10-19/base/068-base.json` against that rule. Five need a change. The review JSON must list these five IDs in `replaces`, in base order. Their IDs and set membership are unchanged:

1. `B1:speaking:batch017-trein-gemist:1`
2. `B1:speaking:batch017-eerste-schooldag:1`
3. `B1:speaking:batch017-machinestoring:1`
4. `B1:speaking:batch031-portemonnee-tram:1`
5. `B1:speaking:batch031-werktelefoon:1`

Every record is a complete exercise with `status: "draft"` and `targetLevelValidated: false`. This is AI editorial work. It does not validate CEFR difficulty or establish exam equivalence.

## Sources read

- `AGENTS.md`, `docs/briefs/author.md` (shared record contract, rewrite rule), `content/blueprint.md` §1, §3, §4.9, §6, §8 and §10, and `content/reviews/rubric.md`.
- `tmp/content-fix-2026-10-19/spec/common.md`, `spec/hidden-criteria.md` and `audit/b1-speaking.md`, including low-priority notes 1, 3 and 6.
- The format example `content/batches/066-*`, integrated earlier today. I kept all of its fixes.
- `app/components/OpenExercise.tsx` around lines 295–315. Criteria are hidden for every speaking task. Starters are hidden only for cued tasks, so for these sixteen they are visible on request.
- `server/services.ts` around lines 245 and 459. The feedback judge receives the prompt, the Dutch criteria, the table and the image alts, not the English briefs.
- `scripts/content.ts` around lines 280–306. Batch starters are merged only for items the batch itself imports (see "Starter-only items" below).
- I looked at every picture of trein-gemist, eerste-schooldag, machinestoring, portemonnee-tram, afvalcontainers, glasbak, brandalarm, and panel 1 of taalcafe-avond (`public/` + `images[].file` from `content/catalogue.json`).

## Method

A scratch script started from the base and the starters base. For every field it changed, it asserted the exact "before" value, replaced only that field and set `status` to `"draft"`. A comparison with the base confirms the following:

- Only the fields in the table below and `status` differ.
- Key order is identical to the base.
- No cue, image `brief` or alt, `sample`, `quotes`, `model`, `table`, title, domain or timing changed.
- No media or derived field was added.

The base matches the catalogue apart from media fields.

## Verdict for all sixteen tasks

"Prompt words" are the instruction phrases that ask for each criterion (C1–Cn, in order).

| # | Task | Material | Criterion → prompt | Starters / title | Verdict |
| --- | --- | --- | --- | --- | --- |
| 1 | fietsroute | table | C1 "Raad de route door het park aan"; C2 "geef twee redenen uit de tabel"; C3 "vertel hoeveel extra reistijd nodig is" | No leak. The title's "veilige" names the gist but not the table facts the reasons need. | ok, prompt covers all criteria |
| 2 | buurtvergadering | table | C1 "stel dit plan voor"; C2 "één over de bomen"; C3 "één over parkeren" | No leak | ok, prompt covers all criteria |
| 3 | inwerken | table | C1 "één advies over wie de nieuwe collega begeleidt"; C2 "één advies over het opschrijven van de werkwijze"; C3 "Vertel ook hoe u later controleert of het helpt" | No leak | ok, prompt covers all criteria |
| 4 | cursuslocatie | table | C1 "de cursus naar lokaal B te verplaatsen"; C2 "één over de terugreis"; C3 "één over de ruimte voor de groep" | No leak | ok, prompt covers all criteria |
| 5 | trein-gemist | 3 pictures | C1–C3 "Vertel wat er gebeurde … hoe hij toch bij het gesprek kwam. Gebruik alle drie de plaatjes"; C4 "hoe Modibo zich voelde", but the criterion demanded the feeling "op het station" | No leak | **changed:** C4 loosened to any moment |
| 6 | eerste-schooldag | 3 pictures | C1–C3 "Vertel wat er gebeurt … Gebruik alle drie de plaatjes"; C4 "hoe Amina zich voelt en waarom" | Starter 2 "In de klas stelt de juf … voor en …" names the event of panel 2 (C2) | **changed:** starter 2 only |
| 7 | fietskeuze | table | C1 "Adviseer Roos welke fiets"; C2 "Noem minstens twee punten uit de tabel"; C3 "het beste bij haar situatie past" (066); C4 "ook een nadeel van uw keuze" | No leak | ok, prompt covers all criteria |
| 8 | machinestoring | 2 pictures | C1 "wat hij eerst moet doen"; C2 "wie hij daarna moet bellen"; C3 "Leg hem stap voor stap uit wat hij … moet doen" (order and instructions to him); C4 "Geef ook een waarschuwing" | Starter 4 "Doe dat niet zelf, want …" hands over the warning itself (C4) | **changed:** starter 4 only |
| 9 | sportabonnement | table | C1 "zeg welk abonnement u kiest"; C2 "Bekijk de tabel. Vergelijk … Noem twee redenen"; C3 "ook een nadeel van uw keuze" | No leak | ok, prompt covers all criteria |
| 10 | glasbak | 1 picture | C1 "Leg haar uit wat de regel is"; C2 "wat ze nu het beste kan doen"; C3 "waar ze de volle glasbak kan melden"; C4 "en waarom" | No leak. The title repeats the prompt's situation. | ok, prompt covers all criteria |
| 11 | portemonnee-tram | 3 pictures | C1–C3 "Vertel wat er gebeurde … hoe alles weer goed kwam. Gebruik alle drie de plaatjes"; C4 "hoe Roos zich voelde", but the criterion demanded the feeling "bij de bakker" | No wallet named (see doubt 3) | **changed:** C4 loosened to any moment |
| 12 | taalcafe-avond | 3 pictures | C1–C3 "Vertel wat er gebeurt … Gebruik alle drie de plaatjes"; C4 "hoe Karim zich voelt en waarom" | No leak | ok, prompt covers all criteria |
| 13 | cursus-engels | table | as fietskeuze ("het beste bij haar situatie past", 066) | No leak | ok, prompt covers all criteria |
| 14 | afvalcontainers | 2 pictures | C1 "welke container ze gebruikt"; C2 "wanneer ze die aan de straat zet"; C3 "Leg haar uit wat ze moet doen"; C4 "Geef ook een waarschuwing" | Starter 2 names "De grijze container", as the prompt already does (doubt 4) | ok, prompt covers all criteria |
| 15 | werktelefoon | table | C1 "zeg welk abonnement u kiest"; C2 "Bekijk de tabel. Vergelijk … Noem twee redenen"; C3 "Verbind een reden met uw werk" was asked for by nothing; C4 "ook een nadeel van uw keuze" | No leak | **changed:** prompt announces C3 |
| 16 | brandalarm | 1 picture (plan) | C1 "wat hij eerst moet doen"; C2 "welke route hij neemt"; C3 "waar hij buiten naartoe gaat"; C4 "Geef ook een waarschuwing" | No leak. Starter 2's "gebruik niet …" leaves the lift to the plan. | ok, prompt covers all criteria |

Answers named in hidden criteria (audit low-priority note 1) stay. The spec says to remove such content only when the picture or table does not show it. Each of these is shown or is only an example: machinestoring "de machine stoppen" (red button, panel 1); afvalcontainers "de grijze" (panel 1), "zondagavond" (evening, panel 2, plus the prompt's "maandagochtend"); brandalarm "de trap", "de boom", "de lift" (all on the plan); glasbak "bijvoorbeeld bij de gemeente" (an example, not required); the feelings in eerste-schooldag and taalcafe-avond (examples only, consistent with the briefs; in the eerste-schooldag drawing Amina's first-panel unease is faint, and the laughing in panel 3 is clear). The judge needs these hints. They are no longer visible before answering.

## Changes per item

The English half of each changed criterion mirrors the Dutch.

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| trein-gemist | criteria[3] | Zeg hoe Modibo zich voelde op het station, bijvoorbeeld geschrokken of zenuwachtig. / Say how Modibo felt at the station, for example shocked or nervous. | Zeg hoe Modibo zich voelde, bijvoorbeeld geschrokken of zenuwachtig op het station, of opgelucht bij het bedrijf. / Say how Modibo felt, for example shocked or nervous at the station, or relieved at the company. | Stricter than the prompt. The prompt asks only "hoe Modibo zich voelde". A learner who says he was relieved or happy at the interview did what was asked but failed the hidden criterion. The loosened criterion accepts a feeling at any moment, and the examples point the judge at both ends of the story. Panel 3 shows Modibo smiling during the handshake, so "opgelucht" fits. Batch 066's fix stays: the criterion still does not mention the train leaving. No audio. |
| portemonnee-tram | criteria[3] | Zeg hoe Roos zich voelde bij de bakker, bijvoorbeeld geschrokken of in paniek. / Say how Roos felt at the bakery, for example shocked or in a panic. | Zeg hoe Roos zich voelde, bijvoorbeeld geschrokken of in paniek bij de bakker, of opgelucht bij de balie. / Say how Roos felt, for example shocked or in a panic at the bakery, or relieved at the counter. | Same mismatch: the prompt asks "hoe Roos zich voelde". Batch 066 doubt 4 noted that relief at the lost-property office alone failed. That is no longer acceptable now that the criterion is hidden. Panel 3 shows Roos smiling with relief, and the alt names "een balie". Batch 066's fix stays: the criterion does not mention the wallet. No audio. |
| werktelefoon | prompt | … Uw leidinggevende vraagt welk abonnement u kiest. Bekijk de tabel. Vergelijk de twee abonnementen en zeg welk abonnement u kiest. Noem twee redenen en ook een nadeel van uw keuze. | … Uw leidinggevende vraagt welk abonnement u kiest. Bekijk de tabel. Vergelijk de twee abonnementen en zeg welk abonnement het beste bij uw werk past. Noem twee redenen en ook een nadeel van uw keuze. | C3 ("Verbind een reden met uw werk") used to be visible and so announced itself. Now it is hidden and nothing in the instruction asks for it. A learner who names two table facts ("onbeperkt bellen en 25 GB") does what the prompt says and fails C3. The fix follows the fietskeuze/cursus-engels fix of batch 066 ("het beste bij haar situatie past"). It also removes the repeated "welk abonnement u kiest" (audit low-priority note 6). C1 "Zeg welk abonnement u kiest" is still asked by the leidinggevende's question and by "zeg welk abonnement …". The prompt goes from 67 to 70 words, still 7 sentences, longest 14. |
| eerste-schooldag | starters[1] | In de klas stelt de juf … voor en … | In de klas staat Amina … en … | The old starter names the event of panel 2, the introduction to the class, which is what C2 asks the learner to tell. Filled with one word ("Amina"), it already met C2. The new starter names only who and where, which the picture and criterion label show. The learner supplies the position and what happens. No invented fact: the drawing shows Amina standing at the front next to the teacher. |
| machinestoring | starters[3] | Doe dat niet zelf, want … | Je mag nooit …, want … | The old starter supplied the warning itself, "don't do it yourself", which is C4's example content. It also had an unclear "dat". The new frame matches the sister items afvalcontainers ("Zet nooit …, want …") and brandalarm ("Neem nooit …, want …"), and leaves the warning to the learner. Batch 066's starters[0] ("vastloopt") is kept. |

### Starter-only items

eerste-schooldag and machinestoring change only a starter. Their records are included unchanged apart from `status: "draft"`. The reason is that `content:integrate` merges a batch's starters only for IDs the batch imports (`scripts/content.ts`, `owners.get(id) === batch.filename`). Without the record, the reviewed starter would never reach `content/hints/sentence-starters.json`. Their prompts are unchanged, so their prompt clips stay valid.

## Unchanged on purpose

- **portemonnee-tram starter 1** "In de tram legde Roos …, en toen ze uitstapte, …" frames the action but leaves the wallet and the forgetting to the learner. The audit and batch 066 both kept it.
- **trein-gemist starter 2** "Daarom nam hij … naar …" leaves the bus open.
- **eerste-schooldag starter 3** "In de pauze speelt Amina … met …": "speelt" is the default for a break. The skipping rope and the two girls are left to the learner.
- **taalcafe-avond starter 2** "Aan de tafel praat hij met … over …" works the same way.
- **sportabonnement** keeps its repeated "welk abonnement u kiest" (audit note 6). No criterion depends on it, and a change would cost a prompt clip.
- **fietsroute** keeps its semicolon prompt (audit note 10 says to split it only when its audio is regenerated anyway).
- **inwerken C1/C2 "concreet"** and **cursuslocatie C3 "groepsgrootte en het aantal zitplaatsen"** were re-read. "Advies over wie …" can only be answered by naming who, and "de ruimte voor de groep" is exactly group size against seats. They were reviewed in 066 today and are left alone.
- **Alts:** none changed. The feeling examples in the loosened criteria carry what the judge needs, and the panel-3 alts already name the setting ("een kantoor", "een balie").

## Samples, quotes and models

No `sample`, `quotes` or `model` changed. Each of the five samples still has exactly one `null` quote, and every other quote is a verbatim substring (checked by script):

- **trein-gemist:** null at C2 (the sample never says how he travelled on). quotes[3] "hij was heel zenuwachtig" meets the loosened C4.
- **portemonnee-tram:** null at C4. The sample names no feeling at all, so it still misses only C4.
- **werktelefoon:** null at C2 (only one reason). quotes[2] "omdat ik bel elke dag met veel cliënten" meets C3. quotes[0] "Ik kies voor abonnement twee" meets C1 under the new prompt.
- **eerste-schooldag, machinestoring:** records unchanged.

Every model meets every criterion, including the changed ones. trein-gemist has "Hij schrok", portemonnee-tram "ze schrok enorm". The werktelefoon model links calls and navigation to the work: "bel ik de hele dag met cliënten", "rijd ik met de navigatie naar cliënten". Model lengths are 62–68 words (target 40–70). No prompt sentence appears in any sample or model; the check was punctuation-insensitive.

## Starters

`068-starters.json` holds the full starters for the five items, in batch order. Two lines differ from the base: eerste-schooldag [1] and machinestoring [3]. Every list has one fragment per criterion, and each fragment contains "…". The other starters of the five items were re-read against the changed criteria and prompt:

- "Modibo was heel …, want …" and "Roos voelde zich …, omdat …" fit the loosened C4.
- werktelefoon's "Voor mijn werk is dat belangrijk, omdat ik …" now matches the prompt's "bij uw werk past".

## Media consequences

- **New prompt audio, one clip:** `B1:speaking:batch031-werktelefoon:1#prompt`.
- **No new audio** for trein-gemist, portemonnee-tram, eerste-schooldag and machinestoring. Their prompts are unchanged; only criteria or starters changed.
- **Cue audio:** none. None of the sixteen tasks has a cue.
- **Illustrations:** none. No brief changed.

Generate the werktelefoon prompt clip only after the batch passes review.

## Doubts for the reviewer

1. **Starter-only records.** eerste-schooldag and machinestoring are in the batch only so that their corrected starters can be integrated (see "Starter-only items"). If the coordinator prefers a different route for starter-only fixes, drop both records and their starters. The rest of the batch does not depend on them.
2. **Strictness of the two feeling criteria.** I read "op het station" / "bij de bakker" as stricter than "hoe … zich voelde". If the reviewer reads the prompt order ("wat er gebeurde, hoe … zich voelde en hoe …") as pinning the feeling to the mishap, the alternative is a prompt change, which costs two prompt clips. I preferred the no-audio fix.
3. **portemonnee-tram starter 1** ("legde Roos …, en toen ze uitstapte, …") gives the action frame of panel 1. I kept it, following the audit and batch 066, because the wallet and the forgetting stay with the learner. A stricter alternative is "In de tram …, en toen ze uitstapte, …".
4. **afvalcontainers and "de grijze".** The prompt itself says "de grijze wordt elke maandagochtend geleegd" so that the learner knows the collection day. That half-signals C1 (the grey container for restafval), and starter 2 "De grijze container zet u …" echoes it. Panel 1 shows the answer plainly, so I left both. A cleaner prompt would be "het restafval wordt elke maandagochtend opgehaald", which costs one prompt clip; the starter would then become "Die container zet u …".
5. **werktelefoon C1.** C1 still reads "Zeg welk abonnement u kiest" while the instruction now says "zeg welk abonnement het beste bij uw werk past". The leidinggevende's question ("vraagt welk abonnement u kiest") keeps the two aligned, so I left the criterion alone.
6. **sportabonnement / werktelefoon C2 "gebruik daarbij de tabel".** It is announced only by "Bekijk de tabel. Vergelijk de twee abonnementen". I judged that sufficient, because the comparison is of the table's rows, but it is less explicit than fietsroute's "redenen uit de tabel".

## Checker output

```
$ npx tsx scripts/batch-check.ts content/batches/068-original.json
Checked 5 items, 0 questions. Keys: {}. Options: {}.
  info  5 of 5 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
