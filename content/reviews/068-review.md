# Batch 068 review: B1 speaking, hidden criteria (19 October 2026)

This is an independent AI editorial review of `content/batches/068-original.json`, `068-starters.json` and `068-notes.md`. The reviewer did not write the batch. It does not validate CEFR difficulty or establish exam equivalence.

## Files

- `content/batches/068-proposed.json` is a byte-identical copy of the author's file. SHA-256: `5d3f49e797c094230876341e201f7cefbd18bf9062e1ff2a2e6375a5fde05f3f`.
- There is no proposed starters file, because no starter needed a change. The starters source is `content/batches/068-starters.json`, SHA-256 `4711eb9ee103b9cdf8367c615b369d2b1054eef94a72047fc7c9cf881624c0cd`.
- `npx tsx scripts/batch-check.ts content/batches/068-proposed.json` printed "Checked 5 items, 0 questions", an info line saying all 5 items are already in the catalogue, and "No failures, no warnings."

## Verdicts on the batch items

| ID | Verdict | Level | Reason |
| --- | --- | --- | --- |
| B1:speaking:batch017-trein-gemist:1 | pass | comparable | The prompt asks only "hoe Modibo zich voelde". The hidden C4 now accepts a feeling at any point in the story, not only "op het station". Batch 066's fix stays, and the sample's null is still at C2. |
| B1:speaking:batch017-eerste-schooldag:1 | pass | comparable | Starter-only record. Old starter 2 ("stelt de juf … voor en …") contained panel 2's event: filling in "Amina" alone met C2. The new "In de klas staat Amina … en …" leaves the event to the learner. |
| B1:speaking:batch017-machinestoring:1 | pass | comparable | Starter-only record. Old starter 4 ("Doe dat niet zelf, want …") was the warning itself. The new "Je mag nooit …, want …" is a frame only, like the brandalarm and afvalcontainers starters. |
| B1:speaking:batch031-portemonnee-tram:1 | pass | comparable | This is the same loosening as trein-gemist: C4 no longer requires the feeling "bij de bakker". The sample still has exactly one null, at C4. |
| B1:speaking:batch031-werktelefoon:1 | pass | comparable | Nothing in the prompt asked for the hidden C3 ("Verbind een reden met uw werk"). "zeg welk abonnement het beste bij uw werk past" now asks for it. This is the same form as the fietskeuze and cursus-engels fix in batch 066. |

Totals: 5 pass, 0 edited, 0 rejected. Starters: pass, with no edits.

## The author's "ok" verdicts (11 base tasks not in the batch)

For each of these tasks I mapped every criterion to a prompt phrase. I re-read the title and the starters, which are visible on request because there is no cue. I agree with all 11 verdicts:

- fietsroute: C1 "Raad … aan", C2 "twee redenen uit de tabel", C3 "hoeveel extra reistijd".
- buurtvergadering: C1 "stel dit plan voor", C2 "één over de bomen", C3 "één over parkeren".
- inwerken: C1 and C2 "één advies over wie … / over het opschrijven …", C3 "hoe u later controleert".
- cursuslocatie: C1 "naar lokaal B te verplaatsen", C2 "terugreis", C3 "ruimte voor de groep".
- fietskeuze and cursus-engels: C1 "Adviseer … welke", C2 "minstens twee punten uit de tabel", C3 "het beste bij haar situatie past", C4 "een nadeel van uw keuze".
- sportabonnement: C1 "zeg welk abonnement u kiest", C2 "Bekijk de tabel. Vergelijk … Noem twee redenen", C3 "een nadeel van uw keuze".
- glasbak: "wat de regel is en waarom", "wat ze nu het beste kan doen", "waar ze … kan melden".
- taalcafe-avond: "Vertel wat er gebeurt, hoe Karim zich voelt en waarom. Gebruik alle drie de plaatjes". C4 does not tie the feeling to one moment.
- afvalcontainers: "welke container", "wanneer ze die aan de straat zet", "Leg haar uit wat ze moet doen", "Geef ook een waarschuwing".
- brandalarm: "wat hij eerst moet doen", "welke route", "waar hij buiten naartoe gaat", "Geef ook een waarschuwing".

No title names criterion content. No visible starter is complete once a single obvious word is filled in.

The fietsroute, buurtvergadering and cursuslocatie prompts state the position the learner argues for. That is how the official convince and advise tasks work, and their C1 checks the learner's own speech act, so they are not report-6 giveaways.

The answers named in hidden criteria are really in the pictures. I viewed them:

- machinestoring: the red button and the technician;
- afvalcontainers: the grey container and the evening;
- brandalarm: the stairs at both ends, the crossed-out lift and the tree by the exit.

## Edits

None. Every author change is a spec fix (a criterion the prompt does not ask for, or a leaking starter). A field diff against `tmp/content-fix-2026-10-19/base/068-base.json` shows no other change apart from `status: "draft"`.

## Rejected items

None.

## Decisions on the author's doubts

1. **Starter-only records: accepted.** The hidden-criteria review notes say such records are intended. `scripts/content.ts` merges batch starters only for IDs the batch owns, so the records must be imported. Their content fields are unchanged, and `status` is not part of the `c1:` revision hash. Their revisions, prompt clips and stored answers therefore stay valid.
2. **Feeling criteria loosened rather than prompts changed: accepted.** "Vertel wat er gebeurde, hoe … zich voelde en hoe …" is a list of three things to tell. It does not tie the feeling to the mishap. The loosened criteria still give the judge the mishap examples, and they add relief at the end, which panel 3 shows in both stories: Modibo smiling at the handshake, Roos smiling at the counter. No audio is needed.
3. **portemonnee-tram starter 1 kept.** "legde Roos …, en toen ze uitstapte, …" needs two pieces of real content, the wallet on the seat and the forgetting. Old eerste-schooldag starter 2 was different: there one obvious name completed the event. The frame agrees with panel 1, so it invents no fact.
4. **afvalcontainers "de grijze" in the prompt: kept.**
   - The prompt never says which container takes restafval. It names the grey one only to give the collection day that C2 needs.
   - Panel 1 shows the answer plainly in any case.
   - The B1 work is turning "emptied Monday morning" plus an evening picture into "Sunday evening", and giving it as an instruction.
   - This is not a report-6 statement of the answer, so it does not justify a new prompt clip.
   - Optional: if this prompt's audio is ever regenerated for another reason, "het restafval wordt elke maandagochtend opgehaald" with starter 2 "Die container zet u …" would be cleaner.
5. **werktelefoon C1 kept.** The leidinggevende "vraagt welk abonnement u kiest", and naming the one that fits best is the choice.
6. **"gebruik daarbij de tabel" (sportabonnement C2, werktelefoon C2): sufficient.** "Bekijk de tabel. Vergelijk de twee abonnementen" asks for a comparison of the table rows. Any reason about calls, data, price or contract is a table point.

## Diversity and sets

There are no new concepts. Set membership is unchanged:

- trein-gemist and machinestoring: b1-speaking-03;
- eerste-schooldag: b1-speaking-04;
- portemonnee-tram: b1-speaking-09;
- werktelefoon: b1-speaking-10.

## Media notes

- Exactly one clip needs new audio: `B1:speaking:batch031-werktelefoon:1#prompt` (narrator), because its prompt text changed.
- No cue clips: none of the 16 tasks has a cue.
- The prompts of trein-gemist, eerste-schooldag, machinestoring and portemonnee-tram are byte-identical to the published text, so their prompt clips stay.
- No pictures need redrawing: no brief or alt changed.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- The werktelefoon prompt changed. Its new audio still needs generation from the adopted text, with a transcription round trip. No audio was generated in this review.
- I made no feedback calls, so I did not measure how the judge handles the loosened feeling criteria or the werktelefoon prompt.
- `content/exemplars/` does not exist. The level verdicts compare each item with its sister middellang items in the bank, which does not calibrate difficulty.
