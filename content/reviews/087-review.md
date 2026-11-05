# Review of batch 087 (A2 reading, 12 new)

## Meaning first (blind packet)

Blind packet hash (original bytes): 10c5ef55e2dfd6344ae494c7b40bed9793662ae52559ffc506e966d76f9cd68e. Written before opening questions, notes or the plan assignment.

1. gezondheidscentrum: A local paper announces a new health centre (opening 1 Feb 2027, Esdoornlaan 40, two GPs, physio, pharmacy). Old-practice patients move automatically; newcomers register online from 4 Jan or at the desk from 1 Feb with ID; parking behind. Weekday/date arithmetic checks out (4 Jan and 1 Feb 2027 are Mondays, 29 Jan a Friday). Real purpose: tell residents what to do. Coherent.
2. schoolstraat: Paper explains a street closure at school start/end (two slots, shorter Wednesday), why (cars on the pavement), alternative parking, three-month trial, parents' evening. Coherent. Risk: the evening (10 December) is before the start date; the text never says "this year", so a reader can wonder. Acceptable, as the article is evidently published ahead of the trial.
3. vakantiesport: Sports hall programme with a table (activity, age, day, time, price), registration deadline, what to bring. Coherent and realistic. Risk: no year given for the deadline; harmless.
4. stagedagen: School timetable for internship weeks plus a return day, plus what to do when ill on an internship day or school day. Coherent. Risk: the sick-call rules also appear in item 8; they differ (stage supervisor then mentor vs. team leader), so the pair is repeated in topic but not duplicated.
5. fietsles: Community-centre folder for adult cycling lessons; group table; price; free bikes; phone registration with a stated reason. Coherent.
6. consultatiebureau: Clinic folder with an age table of check-ups, free, how to move an appointment, what to do if the child is ill. Coherent and realistic.
7. werkplaatsregels: New-staff rules of a furniture workshop with numbered sections. Coherent. The glove rule (off at the saw, on for lifting) is the correct safety logic and the text explains why.
8. ziekmelden: Garden-centre sick-call procedure in six steps, with a fallback (reception) if the team leader does not answer. Coherent. A doctor's note is not mentioned; the "after a week" element became a company-doctor appointment (author's change).
9. kamer-te-huur: Family advertises an attic room: size, furnishings, price, start date, who they seek, how to respond (message, not call, with reason) and a viewing day. Coherent. Risk: "vierkante meter" is a measurement word an A2 learner may not know.
10. huur-omhoog: Landlord letter: rent rises on 1 July; old/new/difference numbers agree (683,40 + 24,60 = 708,00); what to do when paying by direct debit or by hand; help if unaffordable; objection; phone hours. Coherent. Notice period (22 April to 1 July) is plausible.
11. stagegesprek: Mentor e-mails a student about an interview at a care home: date, time, address, who to ask for, what to bring and wear, message afterwards, what to do if the date fails. Coherent, warm.
12. retour-ontvangen: Webshop confirms a returned jumper, refund of 55,00 (59,95 minus 4,95 label), within five working days, discount code. Arithmetic agrees. Light humour in the customer's own reason ("Mijn man en ik passen er samen in"). Coherent.

Meaning verdict on the blind packet: pass for all twelve; items 9 and 2 carry small risks noted above.

Repeat after repairs: packet rebuilt from the proposed bytes, hash 97773d1e1d6c25f8f739670ddda037251def6ef6efb3d4abc9fafa4435a59445. Only three texts changed (kamer-te-huur "14 m²", huur-omhoog debit sentence, retour-ontvangen refund sentence); meaning verdict unchanged, all twelve pass. Tone: 11 ordinary, 1 light-humor (retour-ontvangen).

## Verdicts

Proposed file SHA-256: dc28f710cdd04e676ea97a2be7c6edadbd898c5747ab7e9528e9e8a48cad8bfa. `batch-check` on the proposed file: no failures.

| id | verdict | level vs existing A2 | reason |
| --- | --- | --- | --- |
| gezondheidscentrum | pass | comparable | all keys proved; persona and purpose present |
| schoolstraat | pass (edited) | comparable | q3 distractor B no longer an absolute-versus-hedge cue |
| vakantiesport | pass (edited) | comparable | q3 key was odd polarity out; new distractor false by age band |
| stagedagen | pass (edited) | slightly harder | q1 evidence now the table row; options simplified |
| fietsles | pass | comparable | clean combination of level and work clash |
| consultatiebureau | pass (edited) | comparable | q1 "over een maand" contradicted "een paar afspraken"; prompt names the age |
| werkplaatsregels | pass (edited) | comparable | q3 option C was a defensible alternative; prompt fixed |
| ziekmelden | pass | comparable | own details; premise factually sound |
| kamer-te-huur | pass (edited) | comparable | "vierkante meter" -> "14 m²"; q3 polarity fixed |
| huur-omhoog | pass (edited) | comparable | unnatural "betaalt de bank" sentence reworded |
| stagegesprek | pass | comparable | warm, concrete e-mail; keys proved |
| retour-ontvangen | pass (edited) | comparable | near-repeat of batch021 refund sentence reworded |

Six items edited, none rejected.

## Edits

See the `edits` array in 087-review.json (15 field changes: before, after, reason). In short: schoolstraat q3 B; vakantiesport q3 B and explanation; stagedagen q1 A/B, evidence and explanation; consultatiebureau q1 prompt and explanation; werkplaatsregels q3 prompt; kamer-te-huur q3 B, explanation and "m²"; huur-omhoog direct-debit sentence; retour-ontvangen refund sentence. Key letters, option counts and key balance are unchanged (A 26%, B 26%, C 26%, D 21%; 41% four-option).

## Rejected

None.

## Author's doubts resolved

- "Vierkante meter": replaced by "14 m²" (one unlisted token, explained by context).
- Overlap with batch021-terugbrengen: different text type (single confirmation versus policy); one near-identical phrase reworded.
- Reused slugs consultatiebureau (KNM) and ziekmelden (speaking): other parts, assigned by the plan; kept.
- Changed premises: gloves off at machines, company doctor instead of doctor's note, and the deducted return label are all true to Dutch practice; nothing untrue is stated.
- Originality of ziekmelden: no A2 reading practice text is held locally to compare, but the text is a garden-centre procedure with its own details, not copied.
- Vocabulary: compounds judged transparent. retouretiket sits in a key but is explained by the next two sentences; flagged only.

## Diversity and set notes

Eight task types over seven domains. ziekmelden and stagedagen both carry a sick-call rule (different organisations and procedures); coordinators may wish to place them in different sets. Persona question in every text, purpose question in five (>= plan target). One light-humour item.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. Organisation names were checked by the author only; 2027 holiday dates come from the author's secondary sources. The proposed packet file content/batches/087-meaning-packet.json was regenerated by the review-source command and now reflects the proposed bytes.
