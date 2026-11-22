# Review of batch 111 (KNM, themes 7 and 8)

## Meaning first (blind packet)

Packet hash (original source): 6db5d6cc3d07abed828770bad33d03f04953ae774068b46b673affabc4942f49. Written before opening questions, keys, notes or the plan assignment. In this KNM batch the "source" is the fact card plus the persona prompt.

1. schoolreisje-ouders: coherent. A father's daughter goes on a school trip; the question asks who helps. Card names the two ordinary jobs. Risk: "leesouder" may be unknown to A2 learners; the card does not explain it.
2. vve-peuters: coherent (girl of 3 who speaks little, programme for toddlers). Risks: "ontwikkeling" and "spelenderwijs" are B1 words; "extra hulp nodig" is vague.
3. bso: coherent (boy of 6 at school, which care?). Card defines both forms. Clear.
4. cjg-opvoedvragen: coherent (mother with upbringing questions, where to go). Clear; "opvoeden" is plain enough.
5. kinderrechter: coherent but heavy: "maatregel", "beschermingsmaatregel", "ernstige problemen thuis" are hard words; prompt has no persona, which is calmer. Image of a courthouse without people is appropriate.
6. bijzondere-school-betaalt: coherent (father chooses a Catholic school, who pays). Risk: "voorwaarden voldoen" is hard; a prompt that states "katholieke" supports the term "bijzondere school" without defining it.
7. diversiteit-les: coherent yes/no. Risks: "kerndoelen" is a hard word and not explained; the tested term "seksuele diversiteit" is the subject, fine.
8. aansprakelijk-12: coherent (girl of 12 breaks neighbours' window). The card states ages 14 and 16 and the question only gives 12; whether the card is legally complete (14 to 15) must be checked against the source.
9. mening-voorwaarde: coherent. "in strijd met de wet" is a hard phrase; "belediging" is a hard word.
10. geloof-kiezen: coherent. Prompt "Wie bepaalt dat?" is clear; card cites Artikel 6.
11. geweld-thuis: coherent and calm; prompt "Wie kan hem voor de rechter brengen?" assumes the learner knows the legal route; card says "pleger", "aangifte", "slachtoffer" (hard words).
12. donor-vanaf-12: coherent direct fact. Image of a girl with a woman is calm.
13. zelfbeschikking-werk: coherent. Prompt asks who decides; card repeats "zelfbeschikking" with a gloss. Risk: question is easy to answer from common sense.

No item is incoherent. Main blind concern is vocabulary (leesouder, spelenderwijs, ontwikkeling, maatregel, kerndoelen, belediging, pleger, aangifte, slachtoffer).

## Full review

Proposed file: `content/batches/111-proposed.json`, SHA-256 90ba7e977c8460447fc4b51082d87c8362365924847a7543fbac887ba8e69230. Rebuilt blind packet hash: bb6d8ef99b00611a122c3d0df8135c986e7d7c25259708aa88a692568fa17404 (meaning pass repeated for the changed items). Batch check: no failures, no warnings. Keys A5 / B4 / C4. All 13 sourceUrls opened today (HTTP 200) and the quoted sentences found.

| id | verdict | level | reason |
|---|---|---|---|
| schoolreisje-ouders | pass | easier | Plain persona question |
| vve-peuters | pass | comparable | One fact (age range plus extra help) applied to a persona |
| bso | pass | easier | Direct match between 'zit op school' and the card sentence |
| cjg-opvoedvragen | pass | easier | One fact |
| kinderrechter | pass | comparable | Single institution fact with a rare word (kinderrechter) |
| bijzondere-school-betaalt | pass | easier | Single fact, distractors parallel and obviously not the main payer |
| diversiteit-les | pass | comparable | Yes/no with qualification as in official items |
| aansprakelijk-12 | pass | comparable | Persona with a stated age that sets up the rule |
| mening-voorwaarde | pass | comparable | One rule asked as a condition ('Wat is de voorwaarde?') as blueprint section 5 requires |
| geloof-kiezen | pass | easier | One 'wie bepaalt' question with three clearly different deciders |
| geweld-thuis | pass | comparable | Institution question where the burgemeester is a tempting wrong option |
| donor-vanaf-12 | pass | comparable | Direct number question with one stated threshold |
| zelfbeschikking-werk | pass | easier | Plain persona question on a general principle |

## Coordinator note checks

- aansprakelijk-12: the page says under 14 parents are liable, 14-15 the child is liable (parents too if they could have stopped it), 16 or older the child alone. The author's card (under 14, 16-plus) is true but the item tested the same fact as 007 aansprakelijkheid. The proposed item uses age 17 and keys the 16-plus rule. The id still says 12; keep or rename at adoption.
- zelfbeschikking-werk: the 2025 news item with the staatssecretaris quote does state 'als vrouw mag werken en je eigen leven mag inrichten' and 'zelfbeschikkingsrecht van vrouwen'; accepted as the primary source. 'opleiding' was removed from the card because it is not on that page.
- geweld-thuis: the 'who can bring him to court' form is supported by the page (OM can prosecute and berechten, also without aangifte); the burgemeester's huisverbod is a different measure. Accepted.

## Edits (word difficulty first)

- Hard words replaced in cards, prompts, options and explanations: ambtenaren, ontwikkeling, spelenderwijs, voldoen aan voorwaarden, in strijd met, belediging, pleger, aangifte, inrichten, betrokken, terecht kunnen; kerndoelen, leesouder, huisverbod and aansprakelijk glossed.
- Answer signals: 'alleen' only in distractors (bijzondere-school-betaalt), key the only Ja (diversiteit-les), key longest (geweld-thuis), name only in the key (geloof-kiezen, zelfbeschikking-werk).
- vve-peuters: BSO distractor replaced, because BSO is the key of the bso item and its explanation gave that answer away.
- kinderrechter: courthouse picture cued the key; replaced by an empty child's room. donor-vanaf-12: picture brief no longer says 'about twelve'.
- aansprakelijk-12: tested fact changed to the 16-plus rule (duplicate of 007 otherwise).

Full list with before and after text: `content/reviews/111-review.json`, field `edits` (30 entries).

## Rejected

None.

## Diversity and set notes

Eleven different institutions or rules in 13 items; three themes of question form (direct, persona, one yes/no). Closest older items are named in the JSON checks. Names: Tarik, Sofia twice, others once; no voice or old-cast names. All items ordinary; no light humour in KNM.

## Media notes

Pictures not drawn yet. One brief changed: kinderrechter now an empty child's room (a courthouse cued the key). donor-vanaf-12 brief no longer names an age. aansprakelijk-12 brief shows a girl of seventeen; the id still says 12. Alts reveal no key. No question audio exists yet; generate it with --keys for the 13 items.

## Limitations

- AI editorial review does not validate CEFR difficulty or official exam equivalence.
- Check yearly: VVE age range and hours (hours not used), Donorregister ages, kerndoelen (being revised), kinderbescherming (Staatscommissie since 1 April 2026), zelfbeschikking source is a 2025 news item.
- The 14-15 liability rule is deliberately not asked; the card names only the under-14 and 16-plus rules.
- Eindterm mappings checked against docs/research/knm-coverage-2026-11-22.md, not re-read in the Regeling inburgering 2021.
- Pictures not inspected; sources outside rijksoverheid.nl and donorregister.nl not needed.
