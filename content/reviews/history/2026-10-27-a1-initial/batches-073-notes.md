# Batch 073: playful A1 speaking foundation practice

Nine original `A1` speaking items, each with two tiny content goals and one understandable-language criterion. The requested expansion contains nine items in each of four skills. These nine speaking items form three themed sets of three. Each uses `exam: a1-practice`, `taskType: picture-describe`, `rubric: a1-spreken`, a 20-second recording guide and no timed preparation. They make no official exam-format or validated CEFR claim.

The author read the current AGENTS.md, blueprint sections 1, 3, 4.0, 6–10, 12–13, the content workflow, author brief and review rubric. Existing speaking catalogue titles, the open-task records and starters in batch 026, and the pending reading 071 and writing 074 source/notes informed the collision check. No existing item, official scenario or commercial exercise supplied wording. All prompts, examples, models, goals, image scenes and starters were written here.

There are no invented organisations, brands, addresses, legal facts or KNM claims. No external factual research is needed. The names Modibo, Karim, Roos, Hasan, Julio and Sabrina use the established fictional cast. Every relevant image brief copies its fixed trait string verbatim from `config/illustration.json`. Two other pictures use unnamed adults and do not alter a recurring character.

## Proposed set assembly and diversity

| Suggested set | Item suffix | Title | Domain | Small goals | Visual idea |
| --- | --- | --- | --- | --- | --- |
| `a1-speaking-01`, Groot en klein | `reuzenbeker` | Een grote beker | vrije-tijd-familie | Name the cup; describe its size | An adult holds a cup wider than his head. |
| Same set | `miniparaplu` | Een kleine paraplu | vervoer | Name the umbrella's colour; describe its size | A tiny umbrella above a normal adult at a bus shelter. |
| Same set | `langesjaal` | Een heel lange sjaal | vrije-tijd-familie | Name the location; name the scarf's colour | A yellow scarf trails in a broad curve through a park. |
| `a1-speaking-02`, Een andere plek | `koelkastbal` | Een bal in de koelkast | wonen-buurt | Name the ball; name its colour | A red ball occupies an otherwise empty refrigerator. |
| Same set | `tuinbed` | Een bed in de tuin | wonen-buurt | Name the location; describe lying in bed or sleeping | An adult takes a comfortable nap in an outdoor bed. |
| Same set | `boekenpan` | Boeken in een pan | opleiding | Locate the books; count the two books | A cooking pot becomes a classroom book container. |
| `a1-speaking-03`, Samen iets leuks | `hondenboek` | Een boek voor de hond | vrije-tijd-familie | Describe reading; locate the dog | A dog sits on its own chair for a story. |
| Same set | `samenjas` | Samen in een jas | winkels-diensten | Count the people wearing the coat; name its colour | Two adult friends try on one enormous coat. |
| Same set | `stofzuigerdans` | Dansen in de keuken | wonen-buurt | Describe dancing; name the room | A vacuum cleaner becomes a pretend dance partner. |

The theme supplies a link within each set. The individual goals vary across object identity, size, colour, location, count and action. Four items ask for a colour, three ask about an action, and two use small counts. No task requires a reason, a story, a prediction, knowledge of a joke, or a precise account of the surprising visual detail.

The existing speaking bank includes ordinary refrigerator problems, buying a coat, rain at a bus stop and daily domestic tasks. Those items ask for requests, choices, narratives or instructions. Here the learner describes directly visible facts in very short phrases; the new visual premises are a ball in a refrigerator, two people sharing a coat and a tiny umbrella. The settings alone do not carry the novelty.

Reading 071 uses a plant with paper eyes, a hat with ears, a display sock, a duck in a bag, a bear at the doctor, a fish cake, a cat at work, a teacher on a suitcase and a party dog. None of those scenes appears here. Writing 074 uses a shoe as lunch, an onion instead of an apple, breakfast cake, music with a pan, a garden film, a bicycle party, socks on a chair, a spoon in a giant box and a bowl as a hat. A pot, garden, chair and dog occur as ordinary objects in different speaking contexts; none reproduces a sibling task's scene or required response.

## Language control and sample alignment

Counts split words on whitespace and exclude JSON field labels. All models contain two short present-tense main clauses, with no required subordinate clause. The prompts use direct familiar questions. A learner can meet each content goal with one tiny sentence, and one short sentence may meet both where the facts fit naturally together.

| Item suffix | Prompt words | Model words | Model sentence lengths | Prepared sample's missing goal | Deliberate beginner error |
| --- | ---: | ---: | --- | --- | --- |
| `reuzenbeker` | 17 | 9 | 4 / 5 | 2, size | Missing article in “Modibo heeft beker.” |
| `miniparaplu` | 17 | 10 | 4 / 6 | 2, size | Missing verb in “De paraplu blauw.” |
| `langesjaal` | 14 | 10 | 5 / 5 | 1, location | None needed; one clear fact is given. |
| `koelkastbal` | 16 | 11 | 7 / 4 | 2, colour | Missing article in “In de koelkast ligt bal.” |
| `tuinbed` | 13 | 11 | 6 / 5 | 1, location | None needed; one clear fact is given. |
| `boekenpan` | 14 | 10 | 6 / 4 | 2, count | Singular verb with plural subject in “De boeken ligt in een pan.” |
| `hondenboek` | 13 | 10 | 4 / 6 | 1, reading | Missing article in “De hond zit op stoel.” |
| `samenjas` | 16 | 10 | 6 / 4 | 1, count | None needed; one clear fact is given. |
| `stofzuigerdans` | 12 | 10 | 5 / 5 | 2, location | Missing verb ending in “Sabrina dans.” |

Every sample has exactly one null quote, always for one of the two content goals. Each remaining quote is a verbatim substring, including the quote supporting understandable Dutch. The language criterion accepts these comprehensible beginner errors; it does not ask for perfect grammar. The pan sample's plural “boeken” does not supply the required exact count of two. None of the location-omitting samples names the pictured room or outdoor setting.

The 27 optional starters contain one ellipsis each and follow criteria order. They provide a sentence beginning without supplying a colour, count, size, action or answer object. A known referent in a starter, such as “De paraplu” or “In de koelkast”, comes from the printed question. The generic third starter supports saying something understandable, rather than adding another required content goal.

## Image production and review notes

Each item has exactly one `drawing` brief and Dutch alt. These are open picture tasks, so their pictures and alt text may show the requested facts. The closed-question rule about hiding answers does not apply. Generate the new assets using `a1StylePrefix` from `config/illustration.json`: warm paper, cut-paper and gouache surfaces, expressive adults and purposeful colour. These authored files contain no generated image path or media-review claim.

| Item suffix | Goal 1 must be visible | Goal 2 must be visible | Particular rendering risk |
| --- | --- | --- | --- |
| `reuzenbeker` | A cup with a clear rim and handle, not an ambiguous bucket. | Its size compared with the man's head and torso. | Hands must hold the cup naturally; the object must remain recognisable. |
| `miniparaplu` | A clearly blue canopy. | A hand-sized canopy compared with a normal adult. | The tiny object must still read as an umbrella at display size. |
| `langesjaal` | Trees, grass, path and park bench; “outside” is also accepted. | One continuous yellow scarf around Roos and along the path. | The long scarf must not look like a detached ribbon or a trip accident. |
| `koelkastbal` | A round ball alone inside an open refrigerator. | Clearly red rather than orange or pink. | The open refrigerator and ball must both be easy to recognise. |
| `tuinbed` | Grass and a garden fence around the bed; “outside” is accepted. | The woman lying in bed with closed eyes. | The pose may support “lies in bed” or “sleeps”; the criterion accepts both. |
| `boekenpan` | Both books inside the open rim of a cooking pot. | Exactly two separate book covers and page edges. | Do not add background books or merge the two books into one. |
| `hondenboek` | Julio's eyes and hands show reading a book. | The dog sits on its own clearly visible chair. | Keep the dog's body separate from the chair and book. |
| `samenjas` | Exactly two people share one continuous coat. | The shared coat is blue. | No mirrors or bystanders. Two heads and two bodies must remain anatomically clear. |
| `stofzuigerdans` | A lifted arm, bent knees and lifted heel form a clear dancing pose. | A sink, cupboards and counter identify the kitchen. | If it reads only as cleaning, redraw the pose. The word “stofzuiger” is not required from the learner. |

All briefs exclude readable text, signs, numerals, logos and clock faces. The pot's book covers and the reading book's pages contain no lettering. The shared coat brief excludes a mirror because reflections could confuse the tested count. The dance brief keeps loose cables out of the scene. Actual images still require independent review at the displayed size; a specific brief cannot prove a media pass.

The root coordinator will generate printed prompt narration after the exact source passes independent review. There is no dialogue or new voice assignment here. Do not generate these clips with Hanneke, Esmee or Nick. No provider call, production catalogue edit, set integration, config change or media generation was made by the author.

## Author checks

The same-part slug check strips the batch prefix before comparing with the full speaking catalogue. It found no collisions. An exact-title comparison found none. The following literal scene phrases were searched across the full catalogue and returned no matches: “grote beker”, “kleine paraplu”, “lange gele sjaal”, “bal in de koelkast”, “bed in de tuin”, “boeken in een pan”, “hond op een stoel”, “dragen samen een jas” and “danst met een stofzuiger”. The full prompt and model structures were then checked in task context for distinct premises.

```text
$ npm run batch:check content/batches/073-original.json

> batch:check
> tsx scripts/batch-check.ts content/batches/073-original.json

Checked 9 items, 0 questions. Keys: {}. Options: {}.
No failures, no warnings.
```

The author also checked 9 unique IDs, 18 content goals, 27 bilingual criteria, 9 illustrations, 27 ordered incomplete starters, model lengths, exact sample-quote containment, one omitted content goal per sample and copied cast strings. The batch is a draft awaiting a separate reviewer. It has no author-issued pass verdict or integration approval.

## Decisions requested from the independent reviewer

- Read all final source fields and starters, including the short samples. Confirm that their remaining factual statements do not accidentally satisfy the deliberately omitted content goal.
- Check the broad location variants “buiten” for the park and garden scenes. The purpose is a tiny location statement, so the criteria allow that less precise wording.
- Check the two size tasks within the first theme and four colour goals across the batch for enough variety given the very simple target. Each picture has a different purpose and composition.
- Judge whether “paraplu”, “sjaal” and the optional model word “stofzuiger” remain appropriate concrete vocabulary. The humour does not require an explanation, and the vacuum word is explicitly optional.
- Assess the anatomical and counting risks of the shared-coat scene before media generation. If the resulting image cannot show two adults and one coat clearly, it needs a redraw rather than a stricter language criterion.
- Rate language simplicity, clarity, variety, visual interest and task/image fit from 1 to 5, with concrete repairs where needed. These editorial ratings do not establish a validated A1 level.
