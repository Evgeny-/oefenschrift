# Batch 064 author notes

Authorised replacement batch for ten integrated A2 writing tasks. Written on 19 October 2026 from `tmp/content-fix-2026-10-19/base/064-base.json` and `tmp/content-fix-2026-10-19/base/064-starters-base.json`. It follows `tmp/content-fix-2026-10-19/spec/common.md`, `tmp/content-fix-2026-10-19/spec/064.md` and the audit `tmp/content-fix-2026-10-19/audit/writing.md`. Author: Claude Opus 5.5, in a context separate from the reviewer.

- Every record keeps its ID, its position and its set membership.
- Status is `draft` and `targetLevelValidated` is `false`.
- No media, `revision` or derived fields were added. None of the ten items has images.

This is editorial work. It does not validate CEFR difficulty or establish exam equivalence.

## Why these items are replaced

On 19 October 2026 a learner filed report 6 against `A2:speaking:batch001-apotheek:1`: "In de opdracht staat al waar Roos is. De vraag over hulp bij de apotheek is onduidelijk." The project owner confirmed it and asked for every similar exercise to be checked.

The writing audit (`tmp/content-fix-2026-10-19/audit/writing.md`) found the same two defects in A2 writing:

- **A pointless or pre-answered form question.** These are the two high items, lantaarnpaal and bibliotheekpas.
- **A prompt that hands over the reason or detail a criterion asks for.** The learner only has to copy it. The official e-mails say "Bedenk zelf waarom" instead. These are the medium items.

The audit also found one prompt in stiff, non-A2 Dutch (loonstrook). The coordinator accepted the fixes in `spec/064.md`. The principle stays as the audit set it:

- A fact the recipient needs may stay in the prompt, as in the official booklets.
- A reason or detail the learner should invent is removed from the prompt. The criterion then says "Bedenk zelf …".

`A2:writing:batch008-meerijden:1` is not in this batch; the coordinator left it as it is.

## Replaced IDs

All ten go in `replaces`. All are in `content/catalogue.json`.

- `A2:writing:batch008-lantaarnpaal:1` (set a2-writing-04)
- `A2:writing:bibliotheekpas:1` (a2-writing-01)
- `A2:writing:batch008-kast:1` (a2-writing-06)
- `A2:writing:batch008-oppassen:1` (a2-writing-07)
- `A2:writing:batch008-huur:1` (a2-writing-06)
- `A2:writing:batch008-groep:1` (a2-writing-05)
- `A2:writing:batch001-ladder:1` (a2-writing-01)
- `A2:writing:batch002-schoenen:1` (a2-writing-02)
- `A2:writing:batch002-sleutel:1` (a2-writing-02)
- `A2:writing:batch003-loonstrook:1` (a2-writing-03)

## What the author read and verified

Read:

- `AGENTS.md`
- `docs/briefs/author.md`, including the shared record contract and the rewrite rule
- `content/blueprint.md` §1, §3, §4.4, §8 and §10
- `content/reviews/rubric.md`
- `docs/research/content-workflow.md` §3–4, §10 and "Optional sentence starters"
- the format example `content/batches/058-*`
- the judge payload in `server/services.ts`, which sends `prompt`, the criteria, the form labels and `adequacyNote` (as `sentence_must`)
- `app/components/OpenExercise.tsx` around line 300

For e-mails and forms, the criteria, the title (as the page heading) and the starters (on request) are all visible while the learner writes. Each of them was therefore checked for giveaways, not only the prompt.

Verified before editing, with a script:

- The base records equal the catalogue records apart from `status` and `revision`.
- The starters base equals the ten entries in `content/hints/sentence-starters.json`.

Verified after editing, with a script:

- Only the fields in the table below changed. Key order and item order are unchanged.
- Each sample has exactly one `null` quote, and every other quote is a verbatim substring of its sample.
- No sample or model sentence equals a prompt sentence. The comparison was normalised for case, punctuation and spacing.
- No prompt sentence is longer than 13 words. The spec limit is 16.

## Changes per item

| Item | Field | Before | After | Reason |
| --- | --- | --- | --- | --- |
| lantaarnpaal | `prompt` | "De lantaarnpaal voor uw huis is kapot. Het licht doet het al een week niet. 's Avonds is het heel donker op straat. U meldt dit bij de gemeente. Vul het formulier in. Sommige gegevens moet u zelf bedenken." | "Er is een probleem met een lantaarnpaal in uw straat. U meldt dit bij de gemeente. Vul het formulier in. Sommige gegevens moet u zelf bedenken." | The old prompt answered all three open fields: the problem, where it is and since when. The new wording is the audit's. "in uw straat" names the street only. The precise spot ("Waar is het probleem precies?") is the learner's own. |
| lantaarnpaal | `criteria[0]` | "Schrijf wat het probleem is." / "Say what the problem is." | "Schrijf wat het probleem is. Bedenk dit zelf." / "Say what the problem is. Make this up yourself." | Audit and spec. The English says "this" rather than the audit's "it", to match bibliotheekpas c0. |
| lantaarnpaal | `criteria[2]` | "Schrijf sinds wanneer het probleem er is." / "Say since when the problem has existed." | "Schrijf sinds wanneer het probleem er is. Bedenk dit zelf." / "Say since when the problem has existed. Make this up yourself." | as above |
| lantaarnpaal | `title` | "Melding: kapotte lantaarnpaal" | "Melding over een lantaarnpaal" | The audit said the title could stay. However, `spec/common.md` rules that a visible title may not give away a criterion. Criterion 0 now asks the learner to invent the problem, and "kapotte" is that answer. |
| lantaarnpaal | starter 2 | "Het licht is kapot sinds …" | "Het probleem is er sinds …" | The old starter handed over the problem (the light is broken) that c0 now asks the learner to invent. The new one mirrors the form label "Sinds wanneer is het probleem er?". |
| bibliotheekpas | `prompt` | "Uw bibliotheekpas is weg. Bij de balie krijgt u een formulier voor een nieuwe pas. … Schrijf wat er met uw pas is gebeurd. Vraag om een nieuwe pas. …" | "U hebt een nieuwe bibliotheekpas nodig. Bij de balie krijgt u een formulier. … Schrijf wat er met uw oude pas is gebeurd. Bedenk dit zelf. Vraag hoeveel een nieuwe pas kost. …" | "Uw bibliotheekpas is weg." answered field 1. "Vraag om een nieuwe pas." was pointless on a form for a new card. The audit wording is used, with one difference: "Bedenk dit zelf." replaces "Bedenk zelf wat er is gebeurd.". That avoids "wat er … is gebeurd" twice in a row and matches the criterion. The unchanged sentences were kept as they were. |
| bibliotheekpas | `formFields[2].label` | "Wat is er met uw pas gebeurd?" | "Wat is er met uw oude pas gebeurd?" | Audit; it matches the new prompt. |
| bibliotheekpas | `formFields[3].label` | "Wat vraagt u aan de bibliotheek?" | "Hebt u een vraag voor de bibliotheek?" | Audit; this is a realistic open question on a counter form. |
| bibliotheekpas | `criteria[0]` | "Schrijf wat er met uw bibliotheekpas is gebeurd." / "Say what happened to your library card." | "Schrijf wat er met uw oude bibliotheekpas is gebeurd. Bedenk dit zelf." / "Say what happened to your old library card. Make this up yourself." | Audit and spec |
| bibliotheekpas | `criteria[1]` | "Vraag om een nieuwe bibliotheekpas." / "Ask for a new library card." | "Vraag hoeveel een nieuwe pas kost." / "Ask how much a new card costs." | Audit and spec: a real question the library can answer. |
| bibliotheekpas | `sample` | "Ik ben mijn pas van de bibliotheek verloren. Mag ik een nieuwe pas krijg?" | "Ik ben mijn pas van de bibliotheek verloren. Hoeveel kost een nieuw pas?" | The second sentence now answers the new c1. One typical learner error is kept: "een nieuw pas" instead of "een nieuwe pas" (adjective ending with a de-word). It replaces the old verb error "krijg". |
| bibliotheekpas | `quotes[1]` | "Mag ik een nieuwe pas krijg?" | "Hoeveel kost een nieuw pas?" | Verbatim from the new sample. Quote 0 is unchanged and quote 2 stays `null` (no pick-up moment). |
| bibliotheekpas | `model` | "… Kunt u een nieuwe bibliotheekpas voor mij maken? …" (25 words) | "… Hoeveel kost een nieuwe pas? …" (22 words, 3 sentences) | Audit wording. One short sentence per open field (blueprint §10). |
| bibliotheekpas | `adequacyNote` | "… De drie open antwoorden melden verlies, vragen een vervangende pas en noemen een ophaalmoment." | "… De drie open antwoorden vertellen wat er met de oude pas is gebeurd, vragen wat een nieuwe pas kost en noemen een ophaalmoment." | The judge receives this as `sentence_must`. "melden verlies" would make the judge reject an invented theft or a broken card. "vragen een vervangende pas" described the old c1. The first sentence is unchanged. |
| bibliotheekpas | starter 0 | "Mijn bibliotheekpas is …." | "Mijn oude pas is …." | Matches the changed c0. It completes naturally to "kapot", "gestolen" or "kwijt", and it no longer leads back to the old prompt's "weg". |
| bibliotheekpas | starter 1 | "Kunt u voor mij …?" | "Hoeveel kost …?" | Audit; it matches the new c1. |
| kast | `prompt` | "U hebt een nieuwe kast gekocht. De kast is zwaar en u woont op de derde verdieping. U kunt de kast niet alleen naar boven dragen. U schrijft een e-mail …" | "U hebt een nieuwe kast gekocht. U hebt hulp nodig met de kast. U schrijft een e-mail …" | The old prompt gave the whole reason that c0 asks for. This deviates from the audit's sentence "U kunt de kast niet alleen naar uw woning brengen.". That sentence is itself a reason a learner can copy ("Ik kan de kast niet alleen naar mijn woning brengen."). "naar uw woning brengen" is also unclear: from the shop, or up the stairs? The new sentence states only that help is needed. |
| kast | `criteria[0]` | "Schrijf waarom u hulp nodig hebt." / "Say why you need help." | "Schrijf waarom u hulp nodig hebt. Bedenk zelf een reden." / "Say why you need help. Think of a reason yourself." | Audit and spec |
| kast | `title` | "Hulp bij een zware kast" | "Hulp bij een nieuwe kast" | Not in the audit, but required by the `spec/common.md` title rule. "zware" hands over the reason c0 now asks the learner to invent; the model and sample quote 0 use it ("De kast is heel zwaar"). |
| oppassen | `prompt` | "Donderdagavond moet u werken tot tien uur. …" | "Donderdagavond moet u weg. …" | The old prompt gave the reason for c1 and part of c2 (the time). Audit wording. |
| oppassen | `criteria[1]` | "Schrijf waarom u weg moet." / "Say why you have to be away." | "Schrijf waarom u weg moet. Bedenk zelf een reden." / "Say why you have to go out. Think of a reason yourself." | Audit and spec, including the audit's English. |
| huur | `prompt` | "… U gaat verhuizen naar een andere stad. U wilt de huur opzeggen. …" | "U huurt een woning van Woonstichting De Brug. U wilt de huur opzeggen. …" | The moving sentence answered c1. Audit wording. |
| huur | `criteria[1]` | "Schrijf waarom u de huur opzegt." / "Say why you are ending the rental." | "Schrijf waarom u de huur opzegt. Bedenk zelf een reden." / "Say why you are ending the rental. Think of a reason yourself." | Audit and spec. All four huur criteria now say "Bedenk zelf". |
| groep | `prompt` | "… U hebt nieuw werk en u werkt nu elke avond. …" | "… U kunt niet meer 's avonds naar de les. …" | The work sentence answered c1. Audit wording. "op dinsdagavond" stays: it is the fact the teacher needs for c0. |
| groep | `criteria[1]` | "Schrijf waarom u niet meer 's avonds naar de les kunt." / "Say why you can no longer come to the lesson in the evening." | same + "Bedenk zelf een reden." / "Think of a reason yourself." | Audit and spec |
| ladder | `prompt` | "Een lamp aan uw plafond is kapot. U wilt de lamp vervangen. Uw buurman Tom … Leg uit waarvoor u de ladder nodig hebt. Schrijf wanneer …" | "U wilt thuis iets doen en u hebt daarvoor een ladder nodig. Uw buurman Tom … Leg uit waarvoor u de ladder nodig hebt. Bedenk zelf wat u wilt doen. Schrijf wanneer …" | The lamp sentences answered c1. Audit wording. |
| ladder | `criteria[1]` | "Vertel waarvoor u de ladder nodig hebt." / "Say what you need the ladder for." | "Vertel waarvoor u de ladder nodig hebt. Bedenk zelf wat u wilt doen." / "Say what you need the ladder for. Decide yourself what you want to do." | Audit and spec |
| schoenen | `prompt` | "U hebt gisteren schoenen gekocht. Thuis merkt u dat ze te klein zijn. … Zeg wanneer u de schoenen hebt gekocht. Leg uit …" | "U hebt deze week schoenen gekocht. Thuis merkt u dat ze niet goed passen. … Zeg wanneer u de schoenen hebt gekocht. Bedenk zelf een dag. Leg uit …" | The old prompt gave the day (c0) and the problem (c1). Audit wording. |
| schoenen | `criteria[0]` | "Zeg wanneer u de schoenen hebt gekocht." / "Say when you bought the shoes." | "Zeg wanneer u de schoenen hebt gekocht. Bedenk zelf een dag." / "Say when you bought the shoes. Choose a day yourself." | Audit and spec |
| sleutel | `prompt` | "U vindt een sleutel in de hal van uw flat. De beheerder verzamelt berichten over gevonden spullen voor de buren. … Schrijf waar u de sleutel hebt gevonden. Beschrijf …" | "U vindt een sleutel in uw flatgebouw. De beheerder heeft een formulier voor gevonden spullen. … Schrijf waar u de sleutel hebt gevonden. Bedenk zelf een plek. Beschrijf …" | The first sentence answered field 1. The second was hard to parse: were the messages for the neighbours? Audit wording. |
| sleutel | `criteria[0]` | "Zeg waar u de sleutel hebt gevonden." / "Say where you found the key." | "Zeg waar u de sleutel hebt gevonden. Bedenk zelf een plek." / "Say where you found the key. Choose a place yourself." | Audit and spec |
| loonstrook | `prompt` | "… U werkte die maand 80 uur, maar het overzicht vermeldt 72 uur. Schrijf een e-mail aan uw werkgever. Noem de maand en beide aantallen uren. Vraag om controle. Vertel ook …" | "… U werkte die maand 80 uur, maar op de loonstrook staat 72 uur. Schrijf een e-mail aan uw werkgever. Schrijf hoeveel uur u in augustus hebt gewerkt. Schrijf ook hoeveel uur er op de loonstrook staat. Vraag of uw werkgever de uren wil controleren. Vertel ook …" | "vermeldt", "Noem … beide aantallen uren" and "Vraag om controle" are not plain A2 Dutch. This follows the audit, with one difference: its 16-word sentence with two "hoeveel" clauses is split into two sentences of 9 words. Each sentence now has one indirect question (blueprint §10, A2 stimuli average under 12 words). The facts (augustus, 80, 72) and everything else stay as they were. |
| all ten | `status` | "ai-editorially-reviewed" | "draft" | `spec/common.md` |

Unchanged: all sample, quote and model texts except in bibliotheekpas, all scaffolds, the other form fields, the other criteria, `grammarTarget`, the other `adequacyNote`s and the situation lines.

## Criteria, sample quotes and models after the edit

Items 3–9 keep their samples and models; the formerly given details now read as invented content. Each quote still meets its criterion:

- **lantaarnpaal**
  - c0: "De lantaarnpaal voor mijn huis is kapot. Het licht doet het niet en het is 's avonds heel donker." → model "De lantaarnpaal voor mijn huis is kapot. Het licht gaat 's avonds niet aan."
  - c1: "De paal staat voor de Meidoornstraat 12, naast de bus halte." This is a precise spot of the learner's own.
  - c2: null → model "Het licht doet het sinds vorige week maandag niet meer." This is now an invented date, which also settles the 14 October mismatch with the old "al een week".
  - c3: "Ik wil antwoord per e-mail."
- **bibliotheekpas**
  - c0: "Ik ben mijn pas van de bibliotheek verloren." This is an invented event, the same sentence in the model.
  - c1: "Hoeveel kost een nieuw pas?" → model "Hoeveel kost een nieuwe pas?"
  - c2: null → model "Ik kan de pas woensdag om twee uur ophalen."
- **kast:** c0 "De kast is heel zwaar. Ik woon op de derde verdieping en ik kan de kast niet alleen dragen." This is the learner's own reason now. The model says the same.
- **oppassen:** c1 "Ik moet dan werken tot tien uur." → model "Ik moet die avond werken tot tien uur." The c2 times (half zeven, half elf) fit that invented shift.
- **huur:** c1 "Ik ga verhuizen naar Utrecht, omdat ik daar een nieuwe baan heb." The same sentence is in the model.
- **groep:** c1 "Daar werk ik elke avond tot tien uur. Daarom kan ik niet meer naar de les komen." → the model's restaurant job.
- **ladder:** c1 "Ik wil de kapotte lamp vervangen." → model "De lamp in mijn keuken doet het niet meer. Ik wil de kapotte lamp vervangen."
- **schoenen:** c0 "Gisteren heb ik bij u een paar schoenen gekocht." → model "Gisteren heb ik in uw winkel een paar schoenen gekocht." "Gisteren" names a day, and it is no longer taken from the prompt.
- **sleutel:** c0 "Ik heb de sleutel in de hal van mijn flat gevonden." → model "… beneden in de hal van mijn flat …". This is an invented place inside the building.
- **loonstrook:** criteria, sample, quotes and model are unchanged. The quotes still give 80, 72 and the check request. The null quote is the moment to talk.

## Language figures

Prompts after the edit (whitespace tokens):

| Item | Prompt words | Sentences | Longest sentence |
| --- | --- | --- | --- |
| lantaarnpaal | 26 | 4 | 10 |
| bibliotheekpas | 61 | 9 | 9 |
| kast | 28 | 5 | 8 |
| oppassen | 32 | 6 | 8 |
| huur | 27 | 5 | 8 |
| groep | 38 | 6 | 10 |
| ladder | 64 | 8 | 12 |
| schoenen | 61 | 9 | 11 |
| sleutel | 66 | 11 | 9 |
| loonstrook | 78 | 10 | 13 |

Models: only bibliotheekpas changed, from 25 words in 3 sentences to 22 words in 3. That is one short sentence per open field, and the checker's A2 floor is 20 words. Unchanged models:

- lantaarnpaal: 41 words, 5 sentences
- kast: 54 words, 8 sentences
- oppassen: 59 words, 8 sentences
- huur: 57 words, 7 sentences
- groep: 59 words, 7 sentences
- ladder: 48 words, 6 sentences
- schoenen: 47 words, 6 sentences
- sleutel: 32 words, 3 sentences
- loonstrook: 54 words, 7 sentences

No model sentence is over 14 words.

## Sentence starters

`content/batches/064-starters.json` has an entry for all ten IDs, in batch order. Each entry has one fragment per criterion, and each fragment contains "…". Three fragments changed: lantaarnpaal 2 and bibliotheekpas 0 and 1 (see the table). The others are identical to the base. The starters of criteria that only gained "Bedenk zelf …" still fit and give nothing away:

- kast: "Ik heb hulp nodig, omdat …"
- oppassen: "Ik moet dan …"
- huur: "Ik zeg de huur op, omdat …"
- groep: "Ik kan niet meer 's avonds komen, omdat …"
- ladder: "Ik heb de ladder nodig om …."
- schoenen: "Ik heb de schoenen … gekocht."
- sleutel: "Ik heb de sleutel in … gevonden."
- lantaarnpaal 0: "Het probleem is dat …"

## Media consequences

- **Audio:** none. A2 writing prompts have no audio, so no `<id>#prompt` or `<id>#cue` clip needs generating.
- **Images:** none. No item in this batch has images.
- **Revisions:** every record changes at least one revision field (prompt, criteria and others). Integration gives all ten new revisions, so saved answers to them start fresh.
- **Starters:** after a passing review, integration merges the starters into the overlay (`npm run content:integrate -- --refresh-hints "<reason>"`).

## Doubts for the reviewer

1. **lantaarnpaal c1 has no "Bedenk dit zelf".** The spec limits the change to c0 and c2, so c1 ("Schrijf waar het probleem precies is.") is unchanged. "precies" and the prompt line "Sommige gegevens moet u zelf bedenken." both ask for a spot beyond "in uw straat". A learner who sees "Bedenk dit zelf" on c0 and c2 only might still answer just "In mijn straat." The reviewer may want "Bedenk dit zelf." on c1 as well, for consistency.
2. **Two title changes the audit did not ask for** (lantaarnpaal, kast). I made them because of the title rule in `spec/common.md`. If the reviewer prefers other neutral titles, nothing else depends on them.
3. **kast prompt deviates from the audit.** I wrote "U hebt hulp nodig met de kast." instead of "U kunt de kast niet alleen naar uw woning brengen." (reason in the table). "hulp nodig met" is everyday Dutch; "hulp nodig bij de kast" could be misread as a location. The prompt no longer says what kind of help it is, so a learner may also ask for help assembling the cupboard. c1 and c2 ("Karim kan komen helpen") accept that.
4. **bibliotheekpas c1 is nearly a dictation.** The visible criterion "Vraag hoeveel een nieuwe pas kost." becomes "Hoeveel kost een nieuwe pas?" by word order alone, and the starter "Hoeveel kost …?" leaves only the object. This is the official "Vraag …" pattern (compare ladder c0) and the audit's choice. It is easy, but it is no longer pointless.
5. **schoenen "Gisteren" against "deze week".** Sample and model keep "Gisteren". That is a valid invented day, except on a Monday, when "gisteren" falls in the previous week. This is pedantic, and I left both unchanged. The prompt still implies "too small" through "ruilen voor een grotere maat", so c1 (the problem) remains partly given. The audit accepted this.
6. **loonstrook split.** The audit's single 16-word sentence was within the spec limit. I split it for one indirect question per sentence. The prompt is now 10 sentences and 78 words, the longest in the batch, but each sentence is plain.
7. **sleutel starter "Ik heb de sleutel in … gevonden."** It presupposes the preposition "in", which suits most places in a flat building (hal, lift, trappenhuis, fietsenstalling). I left it because c0 only gained "Bedenk zelf een plek".
8. **No judge runs.** The added "Bedenk zelf …" sentences do not change what is checked, because any answer is now the learner's own. The bibliotheekpas c1 and `adequacyNote` did change. A judge run with a few answers ("Hoeveel kost een nieuwe pas?", "Wat kost dat?", and a control that asks for a new card) would confirm the new c1 before release.

## Checker output

`npx tsx scripts/batch-check.ts content/batches/064-original.json`:

```
Checked 10 items, 0 questions. Keys: {}. Options: {}.
  info  10 of 10 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```

SHA-256 at the time of writing:

- `content/batches/064-original.json`: `baad2e7776fabf5c2bb05abbfdb0881297f9788aeab0550942794a1b742076b1`
- `content/batches/064-starters.json`: `26144a201b4f575b4edf880cedea264144f08523c0818ea1987b6b72f5857319`
