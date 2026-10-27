# Batch 073 independent speaking review

All nine proposed items pass after nine field edits across eight items. One item passes unchanged; none is rejected. The proposal preserves every ID. The reviewer was a separate Codex AI agent who did not author this batch; Opus 5 was unavailable.

| ID | Verdict | Level verdict | Basis |
| --- | --- | --- | --- |
| `A1:speaking:batch073-reuzenbeker:1` | Pass | Local A1 target; unvalidated | The nine-word model has four- and five-word present main clauses. Cup and big are concrete, familiar concepts. The size joke never needs an explanation. |
| `A1:speaking:batch073-miniparaplu:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has four- and six-word main clauses. Paraplu is a common concrete rain object, pictured and named in the prompt. Only colour and size are required. |
| `A1:speaking:batch073-langesjaal:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has two five-word main clauses. The target is a familiar place and colour, with no need to describe the unusual long curve. |
| `A1:speaking:batch073-koelkastbal:1` | Pass, edited | Local A1 target; unvalidated | The eleven-word model has seven- and four-word main clauses. Bal, rood and koelkast are familiar household words. The revised criterion removes any demand to restate the already supplied location. |
| `A1:speaking:batch073-tuinbed:1` | Pass, edited | Local A1 target; unvalidated | The eleven-word model has six- and five-word present clauses. The revised fifteen-word prompt uses the familiar binnen/buiten contrast and a simple action question. It requires no account of why the bed is there. |
| `A1:speaking:batch073-boekenpan:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has six- and four-word present clauses. Pan, boek and twee are familiar concrete vocabulary. Count two requires no calculation or narrative. |
| `A1:speaking:batch073-hondenboek:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has four- and six-word main clauses. Leest, hond and stoel support two concrete visible facts. The location criterion now accepts beside him as a correct natural answer. |
| `A1:speaking:batch073-samenjas:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has six- and four-word main clauses. Count two and blue are tiny content goals; the learner never has to explain how the shared coat works. |
| `A1:speaking:batch073-stofzuigerdans:1` | Pass, edited | Local A1 target; unvalidated | The ten-word model has two five-word main clauses. Danst and keuken are everyday concepts. The longer optional noun stofzuiger appears only as an extra detail in the model and alt; learners need not produce it. |

## Edits in the proposal

- `miniparaplu.images[0].brief`: added waist-up framing with the adult head, raised hand and complete miniature umbrella visible. This protects object recognition at the exercise’s display size.
- `langesjaal.criteria[0]` → “Zeg waar Roos is, bijvoorbeeld in het park of buiten.” Accurate short location variants now match the broad question.
- `koelkastbal.criteria[0]` → “Zeg wat er in de koelkast ligt: een bal. 'Een bal' is genoeg.” The learner may name the object without repeating the refrigerator.
- `tuinbed.prompt` → “Kijk naar het plaatje. Is de vrouw binnen of buiten? Wat doet ze? Vertel het.” The first goal now explicitly asks about outdoors, so “in bed” cannot accidentally satisfy it.
- `tuinbed.criteria[1]` → “Zeg dat ze ligt of slaapt.” A tiny action statement suffices.
- `boekenpan.criteria[0]` → “Zeg waar de boeken liggen, bijvoorbeeld in een pan of op tafel.” Both accurate location answers satisfy the question.
- `hondenboek.criteria[1]` → “Zeg waar de hond zit, bijvoorbeeld op een stoel of naast Julio.” The criterion accepts another plainly correct pictured location.
- `samenjas.images[0].brief`: specified hidden inner arms, four natural lower legs grouped as two per adult, and separately readable faces. Two heads must belong to two clear adults inside one garment.
- `stofzuigerdans.criteria[1]` → “Zeg waar Sabrina is, bijvoorbeeld in de keuken of thuis.” A correct ordinary home location is sufficient.

The JSON report records exact old/new values, English pairs, both prompt-to-goal traces, model support, the single omission proof and each starter’s natural completion for every item. The proposed starter file is byte-identical to the author’s file and passes against the revised criteria.

## Ratings and author decisions

Scores run from 1 to 5. Visual interest and task/image fit judge the briefs only. Concrete score bases are in the JSON review.

| Item | Simplicity | Clarity | Variety | Visual interest | Task/image fit |
| --- | ---: | ---: | ---: | ---: | ---: |
| reuzenbeker | 5 | 5 | 4 | 5 | 5 |
| miniparaplu | 5 | 4 | 4 | 5 | 4 |
| langesjaal | 5 | 5 | 4 | 5 | 5 |
| koelkastbal | 5 | 5 | 4 | 5 | 5 |
| tuinbed | 5 | 5 | 5 | 5 | 5 |
| boekenpan | 5 | 5 | 5 | 5 | 4 |
| hondenboek | 5 | 5 | 5 | 5 | 5 |
| samenjas | 5 | 4 | 4 | 5 | 4 |
| stofzuigerdans | 5 | 4 | 5 | 5 | 4 |

The two size goals and four colour goals suit this small foundation batch because the objects, places and pictured relationships change. The learner never needs to explain the humour. Paraplu and sjaal remain common concrete pictured nouns; stofzuiger is optional. Short understandable fragments and beginner article/agreement errors may meet the goals. One utterance may meet both content goals.

Every prepared sample omits exactly the goal marked null. In particular, plural boeken does not give two, sleeping does not give outdoors, and a blue coat does not give the number of wearers. The park accepts buiten. Garden answers must state outside or the garden, while lying down and sleeping both satisfy its action goal. The closer umbrella framing and strengthened coat anatomy are brief repairs. The actual dance pose must read as dancing; an ordinary cleaning pose needs a redraw.

## Diversity, sets and media

All 98 existing speaking titles/prompts and relevant full single-picture tasks were checked. The nine titles and same-part slugs are unique. Existing refrigerator choice, wrong coat, bus-stop rain and domestic-work tasks have different premises and broader communication goals. No new organisation, brand, address or externally checkable factual claim appears.

Retain the author’s three sets of three: Groot en klein (reuzenbeker, miniparaplu, langesjaal); Een andere plek (koelkastbal, tuinbed, boekenpan); Samen iets leuks (hondenboek, samenjas, stofzuigerdans). Ordinary adults take part in the jokes; names, ages and unnamed adults vary without stereotyped jobs or childish instructions.

Generate each picture with `a1StylePrefix`. All fixed cast descriptions match the config verbatim. Review the rendered cup/handle, tiny blue canopy, attached yellow scarf, red ball, outdoor bed, two separate books, dog/chair anatomy, shared coat and dance pose at the app’s display size. No picture, audio or provider call was made here. Speaking prompts need narration after approval; no dialogue pairing is needed.

## Validation and limits

`npm run batch:check content/batches/073-proposed.json` reports nine items, zero questions, no failures and no warnings. Prompts have 12–17 words; models have 9–11 words in clauses of 4–7 words. The nine samples have exactly one content-goal null each, all retained quotes occur verbatim, and all 27 starters are incomplete.

The [Council of Europe CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-forlanguages-learning-teaching/16809ea0d4), printed page 62, was reopened on 27 October 2026. Its brief oral-production descriptor supports the general target. These task shapes and the recording guide remain local choices. There is no official A1 format comparison or validated difficulty claim. No existing A1 speaking exemplar is available; complete the separate fresh-context first-batch target check before adoption. Media checks remain outstanding.

Proposal SHA-256: `9c5b921de710b71a82f9222aaccb88e8cb98ed38677c5828e9fc66cebc0e2d87`.

Starters SHA-256: `fe65a50f89ce7eb69f10f727cde70d4b748240eed920516714f94b2a35333431`.

The author’s files are unchanged. The coordinator should read the edit list, complete the target check, adopt using `npm run batch:adopt 073`, then finish media and set integration through the normal hash gates.
