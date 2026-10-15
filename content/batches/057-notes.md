# Batch 057 author notes

Authorised replacement of seven published B1 listening texts, following `tmp/content-fix-2026-10-14/spec/056-057.md` and `spec/common.md`. The fixes come from the editorial audit of 14 October 2026 (`docs/research/content-and-feedback-audit-2026-10-14.md`, section 4, "B1 listening", medium and low items): a wrong speaker label, an inconsistent number, a prompt that refers to fragments the learner does not hear with the question, an explanation that ignores a distractor, an evidence quote with speaker labels, an option that misquotes the deadline, and a prompt that misdescribes an example.

Each record was built from `tmp/content-fix-2026-10-14/base/057-base.json`, which holds the published records without generated media, with status `draft`. Every item keeps its ID, title, situation, intro, task type, text type, domain, set membership, item order, question order and keys. A field-by-field diff against the base shows that only the fields listed below changed. Level is still an authoring target (`targetLevelValidated: false`). This is AI editorial work. It does not validate CEFR difficulty or show exam equivalence.

Replaced IDs, in batch order:

1. `B1:listening:batch036-afvalbeleid:1`: the speaker label "Presentator" does not match the intro and questions, which call the speaker a gemeente employee.
2. `B1:listening:batch037-hovenier:1`: Hanna worked "veertig jaar" at the office in q1, but "dertig jaar" in q7.
3. `B1:listening:batch013-ziekenhuiskeuken:1`: the q6 prompt asks about "het hele gesprek", but only fragment 6 plays with the question.
4. `B1:listening:batch012-mantelzorg:1`: the q6 explanation rejects a claim no option makes and never addresses distractor A.
5. `B1:listening:batch002-lekkage:1`: the q3 evidence spans two turns, including speaker labels and a line break.
6. `B1:listening:batch013-logistiek:1`: q6 option A says "vóór vijftien december", but the script says "uiterlijk vijftien december".
7. `B1:listening:batch036-functioneringsgesprek:1`: the q3 prompt says "beschadigde pallet", but the script has a pallet carrying damaged boxes.

## Sources, names and facts

No new facts, people, places or organisations. Nothing needed a web search. The spec says not to change "hun" (hovenier q2), "van binnen" (bouwplaats, not in this batch) or the TTS spellings "W-M-O" (mantelzorg q2) and "m-b-o" (hovenier intro, q1 and q5). They are untouched.

## Changes per item

When a script changed, each question's `text` was rebuilt from its script ("Speaker: text" lines), and the item `text` was rebuilt as the fragments joined with a blank line.

### 1. B1:listening:batch036-afvalbeleid:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `questions[q1–q6].script[].speaker` (11 turns: one in q1, two in each of q2–q6) | Presentator | Medewerker | The intro says "Een medewerker van de gemeente vertelt…", and the q4 prompt says "de medewerker van de gemeente" (spec). |
| `questions[q1–q6].text`, item `text` | "Presentator: …" lines | "Medewerker: …" lines | Rebuilt mechanically. |

`role` stays `presenter` in every turn, and every spoken word is identical (asserted in the build). No prompt, option, evidence or explanation mentioned "Presentator".

### 2. B1:listening:batch037-hovenier:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q7.script[1].text` (Hanna), sentence 3 | Op kantoor deed ik dertig jaar hetzelfde werk, en daar was ik goed in. | Op kantoor deed ik veertig jaar hetzelfde werk, en daar was ik goed in. | Matches q1: "Ik heb veertig jaar op een kantoor gewerkt" (spec). |
| `q7.text`, item `text` | (old fragment) | rebuilt | Mechanical. |
| `q7.explanation`, start | Op kantoor deed Hanna dertig jaar hetzelfde werk … | Op kantoor deed Hanna veertig jaar hetzelfde werk … | Follows the script. |

`q7.evidence` ("Nu ben ik weer iemand die fouten maakt en dingen voor het eerst doet, en dat vind ik veel minder erg dan ik had gedacht.") contains no number, so it is unchanged. The fragment still has 113 spoken words.

### 3. B1:listening:batch013-ziekenhuiskeuken:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q6.prompt` | Wat blijkt uit het hele gesprek? | Wat blijkt uit dit gesprek over Roos? | Only fragment 6 plays with the question (spec wording). The same phrasing occurs elsewhere: logistiek q7 asks "Welke uitspraak past het best bij dit gesprek?". |

Check that fragment 6 alone entails the key (A, "Roos kent keukenwerk uit een restaurant, maar het ziekenhuis is strenger."):

- In fragment 6 Roos says "het zijn veel regels in één keer. In het restaurant waar ik werkte, was het minder streng, maar ik snap wel waarom het hier zo is". So she has worked in a restaurant, and the hospital is stricter.
- Hasan contrasts a restaurant guest who chooses his food with a patient who relies on the kitchen.
- The intro says that Roos starts today in the hospital kitchen.

"Keukenwerk" is the inference step. This is an `inference` question. The distractors also fail on fragment 6 alone:

- B fails because she has worked in a restaurant, and Hasan says "Wat je niet zeker weet, vraag je aan haar, en anders aan mij". She does not learn everything from Fatima.
- C is contradicted by "minder streng" and "veel regels in één keer".

Options, evidence and explanation are unchanged (see doubt 1).

### 4. B1:listening:batch012-mantelzorg:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q6.explanation` | Zijn slotboodschap is: vraag op tijd hulp en zorg ook voor uzelf. Alles zelf regelen raadt hij af, en de gemeente en de verzekeraar zijn hulp naast de familie, niet in plaats van de familie. | Zijn slotboodschap is: vraag op tijd hulp en zorg ook voor uzelf. Pas hulp zoeken als het thuis echt niet meer gaat, is precies het omgekeerde van wat hij zegt: wacht niet tot u het niet meer volhoudt. En de gemeente en de verzekeraar zijn hulp naast de familie, niet in plaats van de familie. | No option says "alles zelf regelen". Distractor A is now explained as the opposite of his advice, quoting his words from fragment 6 ("wacht niet tot u het niet meer volhoudt"). The rationale for B is kept. |

### 5. B1:listening:batch002-lekkage:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q3.evidence` | Ricardo: Ik wilde eigenlijk ook een foto van het plafond maken voor mijn melding. Kan dat zonder dat ik dichter bij de lamp kom, gewoon vanuit de deuropening?⏎Medewerker: Als u de foto vanaf een droge plek op afstand kunt maken, is dat voldoende. Een scherpe foto van binnen in de lamp hebben we niet nodig. | Als u de foto vanaf een droge plek op afstand kunt maken, is dat voldoende. | Only the sentence that entails the key, verbatim from fragment 3, with no speaker labels or line break (spec). |

### 6. B1:listening:batch013-logistiek:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q6.options.A` (key) | Zich toch vóór vijftien december aanmelden. | Zich toch uiterlijk vijftien december aanmelden. | The adviser says "uiterlijk vijftien december". "vóór" would exclude the deadline day itself (spec). |

### 7. B1:listening:batch036-functioneringsgesprek:1

| Field | Before | After | Reason |
| --- | --- | --- | --- |
| `q3.prompt` | Wat wil Sabrina duidelijk maken met het voorbeeld van de beschadigde pallet? | Wat wil Sabrina duidelijk maken met het voorbeeld van de pallet met beschadigde dozen? | The script says "een pallet … met beschadigde dozen" (spec). |

## Key and distractor rationale for changed questions

Keys and option order are unchanged in this batch.

- **hovenier q7, B (het valt haar mee om weer beginner te zijn).** A: she never says the office work was heavier. C: she has learnt that she can still change, so she does not prefer the same work. The number fix only removes the inconsistency with q1.
- **ziekenhuiskeuken q6, A.** See item 3: B fails because she has worked in a restaurant and asks Hasan as well as Fatima; C fails because the restaurant was less strict.
- **mantelzorg q6, C (vraag op tijd hulp en zorg ook voor uzelf).** A is the opposite of "wacht niet tot u het niet meer volhoudt". B: the gemeente and the insurer are where you call for particular help; he does not tell families to hand over the care.
- **lekkage q3, C (overzichtsfoto vanuit de deuropening op een droge vloer).** The new evidence entails it: the doorway is at a distance, and the dry floor is "een droge plek". A needs the lamp cover removed, which she rules out ("Laat de lamp zoals hij is"). B stands next to the lamp, the opposite of "op afstand" and "blijf uit de buurt van die natte plek".
- **logistiek q6, A (zich toch uiterlijk vijftien december aanmelden).** The evidence is "Nee, meld je juist alvast aan. De aanmelding kost niets en je zit nergens aan vast.", and the deadline comes earlier in the fragment. B is what she advises against. C, starting in September, is the consequence of waiting.
- **functioneringsgesprek q3, C (een probleem melden, ook als hij het zelf oplost).** A: she calls his solution clever ("Slim opgelost"). B: the driver told her; he was not the one who should have reported.

## Key distribution

Unchanged: A 14 (31.1%), B 16 (35.6%), C 15 (33.3%), 45 questions, all with three options. Keys per text:

- afvalbeleid CBABCB
- hovenier BACBCAB
- ziekenhuiskeuken BACBCA
- mantelzorg ACBCAC
- lekkage BACABC
- logistiek ABCBCAB
- functioneringsgesprek BACABCA

The longest run of one letter is two.

## Media consequences

New audio is needed for three clips (702 script characters):

| Clip key | Why |
| --- | --- |
| `B1:listening:batch037-hovenier:1#q7-fragment` | Spoken text changed ("dertig" → "veertig"). |
| `B1:listening:batch013-ziekenhuiskeuken:1#q6` | Question prompt changed. |
| `B1:listening:batch036-functioneringsgesprek:1#q3` | Question prompt changed. |

No new audio is needed for these:

- **afvalbeleid, all six fragments.** Only the speaker label changed. The audio hash covers spoken text only, and role `presenter` and its voice are unchanged.
- **logistiek q6.** Only option text changed, and listening question audio reads only the prompt.
- **mantelzorg q6 explanation and lekkage q3 evidence.** No media effect.
- **The rest.** All intros (`introAudio`), the hovenier q7 question audio, the ziekenhuiskeuken q6 fragment, the functioneringsgesprek q3 fragment and every other clip are unchanged.

Integration has one quirk for the coordinator. `scripts/content.ts` keeps a B1 fragment clip only when the whole `script` JSON is unchanged, speaker labels included (lines 120–124 and 162–168). It keeps `questionAudio` only when the options JSON is unchanged (lines 159–161). The six afvalbeleid fragments and logistiek q6 therefore lose their media fields at integration. `npm run audio:generate -- --apply` re-attaches the same files from `content/audio-manifest.json` without new synthesis, because the key, spoken-text hash and voice token are unchanged. I checked that every current clip of these seven texts is in the manifest with a matching hash.

## Language control

Spoken words per fragment, all within 50–190:

| Text | Fragments (words) | Total | Est. minutes (2.5 w/s) |
| --- | --- | ---: | ---: |
| afvalbeleid | 124, 128, 138, 153, 154, 158 | 855 | 5.7 |
| hovenier | 131, 126, 116, 120, 120, 120, 113 | 846 | 5.6 |
| ziekenhuiskeuken | 152, 135, 127, 140, 128, 139 | 821 | 5.5 |
| mantelzorg | 117, 131, 157, 135, 136, 125 | 801 | 5.3 |
| lekkage | 127, 123, 131, 129, 128, 128 | 766 | 5.1 |
| logistiek | 127, 115, 118, 111, 121, 109, 110 | 811 | 5.4 |
| functioneringsgesprek | 133, 123, 128, 125, 123, 113, 114 | 859 | 5.7 |

The only changed spoken fragment, hovenier q7, keeps 113 words, a mean sentence length of 12.6 and a longest sentence of 25 words. Topics, text types and voices are unchanged.

## Doubts for the reviewer

1. **ziekenhuiskeuken q6.** I judge the key entailed by fragment 6 together with the intro, with "keukenwerk" as the inference step, so I left the options unchanged.
   - If you want strictly literal entailment, option A could read "Roos heeft in een restaurant gewerkt, maar het ziekenhuis is strenger." This changes option text only, with no audio effect. But B's "nog nooit in een keuken gewerkt" would then be refuted only by inference.
   - The unchanged explanation also says "alleen nog niet in een ziekenhuis". That comes from fragment 1 ("ik heb nog nooit in een ziekenhuis gewerkt"). It is true, and in a drill the learner has heard fragment 1 before q6, but it is not in fragment 6.
2. **logistiek q6 evidence.** This is unchanged and outside the spec. It entails registering now despite the open payment question, but not the date in the key. "uiterlijk vijftien december" is in the same fragment two turns earlier. A contiguous quote covering both would cross speaker turns, which is the defect fixed in lekkage q3.
3. **functioneringsgesprek q3.** The corrected prompt now shares "beschadigde dozen" with distractor A ("Dat Modibo de beschadigde dozen niet zelf apart had moeten zetten."). The overlap is in a distractor, so it does not signal the key, but it makes A a little more tempting.
4. **afvalbeleid label.** I used "Medewerker", as in the spec. "Medewerker gemeente" (the label in A2 paspoort-klaar) would also fit. The label is printed in the transcript only, and either choice keeps the audio.
5. **mantelzorg quote style.** No explanation in the catalogue uses quotation marks, so his words follow a colon: "… is precies het omgekeerde van wat hij zegt: wacht niet tot u het niet meer volhoudt."

## batch:check output

```
$ npx tsx scripts/batch-check.ts content/batches/057-original.json
Checked 7 items, 45 questions. Keys: {"C":15,"B":16,"A":14}. Options: {"3":45}.
  info  7 of 7 items are already in the catalogue: this is a revision of an integrated batch and needs a focused re-review.
No failures, no warnings.
```
