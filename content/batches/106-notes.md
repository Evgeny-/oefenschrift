# Batch 106: design notes

Twelve original A2 reading texts (`exam: duo-a2`, `part: reading`) with 30 closed questions, from `docs/briefs/content-round-2026-11-22.md` (section 106 and the A2 rules from the gap audit), `docs/briefs/author.md`, `content/blueprint.md` (§1, §3, §4.1, §5, §8, §9, §10, §13), `content/reviews/rubric.md` and the A2 Lezen paragraph of the exam-blueprints research. Record shape copied from batch 088 (krant, rooster, folder, advertentie, brief); no `revision`, media or derived fields. Source: `content/batches/106-original.json`. All items `status: "draft"`, `targetLevelValidated: false`.

Keys A 8 / B 8 / C 8 / D 6 (27% / 27% / 27% / 20%); 18 three-option and 12 four-option questions (60/40); no key three times in a row. Persona question in every text; `purpose` question in five texts (parkeren-centrum, banenmarkt, open-dag-college, energie-besparen, digid-brief).

## 1. Matrix

| # | Slug | taskType / domain | Q | Words | Table | Tone |
| --- | --- | --- | ---: | ---: | --- | --- |
| 1 | parkeren-centrum | krant / vervoer | 3 | 121 | no | ordinary |
| 2 | banenmarkt | krant / werk | 3 | 109 | no | ordinary |
| 3 | ijsbaan | krant / vrije-tijd-familie | 2 | 121 | no | ordinary |
| 4 | werkrooster-winkel | rooster / werk | 3 | 106 | yes | ordinary |
| 5 | buslijn-weekend | rooster / vervoer | 3 | 103 | yes | ordinary |
| 6 | tweedehandswinkel | rooster / winkels-diensten | 2 | 117 | yes | ordinary |
| 7 | open-dag-college | folder / opleiding | 3 | 106 | yes | ordinary |
| 8 | werk-via-bureau | folder / werk | 2 | 123 | yes (steps) | ordinary |
| 9 | energie-besparen | folder / wonen-buurt | 2 | 116 | yes | ordinary |
| 10 | huiswerkklas | advertentie / opleiding | 2 | 119 | no | ordinary |
| 11 | klusjes-huis | advertentie / winkels-diensten | 2 | 121 | no | light humour (lamp on the cupboard, spare screw is free) |
| 12 | digid-brief | brief / instanties | 3 | 118 | no | ordinary |

Domains: werk 3 (2, 4, 8), vervoer 2, opleiding 2, winkels-diensten 2, wonen-buurt 1, vrije-tijd-familie 1, instanties 1, as planned. Slugs are new in A2 reading (checked against the catalogue list). Humour is one in twelve (item 11).

Each text is a message a real organisation would publish. Tables (items 4, 5, 6, 7, 8, 9) are written as lines with " – " separators, as in batch 088. The planned "twee mensen op zaterdag" rule (item 4) is stated in the text and the distractor "Met niemand" is built on it.

## 2. Names, dates, places

- **Names.** Pool: Samira, Lucas, Dmitri, Marit, Kwame, Naomi, Henrik, Dilan. Each in at most two items: Dmitri 1; Naomi 2; Henrik 3, 9; Kwame 4, 12; Samira 4 (colleague in the table), 6; Lucas 5, 11; Dilan 4 (colleague), 7; Marit 8, 10. Change to the plan: the rota (item 4) names Samira instead of Henrik as the third colleague, because Henrik is already in 3 and 9. No voice names, no older cast. Names appear mid-sentence in each situation so that the checker treats them as proper nouns.
- **Dates (checked with the system calendar).** Mon 1 March 2027; Sat 20 March; Sat 12 December 2026, Sun 3 January 2027; Thu 24 and Thu 31 December; Sat 19 December; Fri 25 December; Sat 26 December; Sat 6 February 2027; Mon 22 to Sat 27 February; Fri 12 March 2027 (DigiD letter date).
- **Prices.** Street parking 3 euro an hour after 30 free minutes, garage 2 euro an hour with a 9 euro day maximum; ice rink 6/4/free, skates 3, Wednesday afternoon children 2; homework class 30 (two days) or 20 (one day) per month; handyman prices as planned, 10% off from three jobs. Street price and ice-rink prices are invented and plausible. The energy amounts are marked "ongeveer", are invented and make no national claim.
- **Places and numbers.** Stations and stops are generic (Station, Markt, Ziekenhuis, Zuidwijk); line 12 is invented. Phone numbers are invented in the exam pattern: 0345 61 33 20, 0345 55 21 80, 0345 61 27 40, 06 23 45 17 90. The only address is `huiswerk@parklaanklas.nl` (invented, `.nl`).

## 3. Invented names, web checks (WebSearch, 22 November 2026)

- **Werkplan** (planned name): FOUND a real company, "Werkplan Uitzendbureau" (Meppel, KvK 4056017). Dropped. Replaced by **Werkbrug**: no temp-work agency of that name found.
- **Buurthuis De Oever** (planned): FOUND a real "Wijkcentrum De Oever" in Alkmaar. Dropped. A second try, "De Rietkraag", is a real school and childcare name (Oostzaan, Boskoop), dropped. **Buurthuis De Kersenhof**: no community centre of that name (only a housing project in Geldrop and a street in Assen).
- **Vakcollege Oosterkade**: no result (other Vakcolleges exist, e.g. Tilburg, Amersfoort, Uithoorn; different names). Only "Vakcollege Oosterkade" occurs in the text heading; the questions say "de school".
- **Tweedehandswinkel Zolderkamer**: no shop of that name (nearest: Zolder023, Haarlem; Stichting Zolder, Den Helder; different).
- **Klusservice Schroef en Plug**: no business of that name (nearest: "Schets en Schroef" on Werkspot; different).
- **huiswerkklas / parklaanklas.nl**, the street "Parklaan" and line 12 are generic. The buurthuis aan de Parklaan is unnamed. No domain lookup was done for `parklaanklas.nl`; a reviewer may want a quick check.
- No brand names. Real public bodies: gemeente (items 1, 9), DigiD (item 12), only where the item is about them.

## 4. Official source for item 12 (DigiD)

Checked on 22 November 2026 at digid.nl ("Activate your DigiD", https://www.digid.nl/en/apply-and-activate/activate-your-digid, and "Code received", https://www.digid.nl/en/apply-and-activate/code-received):

- "The activation code expires after 21 days." The plan said twenty; the official period is **21 days**, so the text says "binnen 21 dagen". The page does not say from which day the 21 days count; the text therefore gives no calendar question about the end date.
- If the code is lost: a new code can be requested via the DigiD app or website, "only once"; it arrives by post within 5 working days. If the code has expired, the person must apply for a new DigiD. The text mirrors this ("één keer een nieuwe code vragen", "Bent u te laat? Dan moet u een nieuwe DigiD aanvragen"). The plan said "too late: ask for a new code"; the official source says apply again, so that was changed.
- The letter arrives within 3 to 5 working days (not used in the text).
- Warning about sharing: digid.nl states "DigiD employees will never ask you for your login credentials" and warns about fake messages. The activation code is entered by the user in the app or website. The text says "Geef uw code aan niemand. Ook niet aan iemand die belt en zegt dat hij van DigiD is." It makes no claim about what DigiD staff do or the helpdesk. Reviewer: please re-open digid.nl on the review day.
- The text avoids "activeren" and "activeringscode" ("de code", "gebruiken").

## 5. Questions, keys, distractors

Evidence is a verbatim substring of `text` (multi-line where the table needs it). Each distractor sits on a detail in the text.

1. **parkeren-centrum**
   - q1 C. A: the old rule (zes uur). B: confuses Saturday with the free Sunday.
   - q2 B (9). A 7: hours. C 14: no maximum. D 21: street price for seven hours.
   - q3 A. B: Sunday stays free (reversed). C: garage price unchanged (reversed).
2. **banenmarkt**
   - q1 D (cv help stops at one). A, B, C are still possible at half past one (open until 15.00, coffee and play corner free).
   - q2 B. A 10: ten-minute talks. C 25: employers.
   - q3 C. A: one employer of 25. B: not stated.
3. **ijsbaan**
   - q1 B (6+4+0+3=13). A 10: forgets skates. C 15: uses the Wednesday price 2 for the girl (6+4+2+3). D 17: charges the son 4.
   - q2 A. B: normal hours. C: dicht (reversed, exception is shorter hours).
4. **werkrooster-winkel**
   - q1 C Dilan (Saturday early shift, same day). A Samira: free on Saturday, cannot swap. B niemand: the two-people rule.
   - q2 A. B, C: later days (Thursday is the limit).
   - q3 D 20.00. A 12.00: start. B 16.00: early shift. C 19.00: shop closing time.
5. **buslijn-weekend**
   - q1 C 9.40. A 9.10: first bus. B 9.25: first bus arrives at hospital. D 10.10: arrives 10.25, too late.
   - q2 B. A: Saturday time. C: second bus.
   - q3 A. B: Sunday last bus. C: first bus Saturday.
6. **tweedehandswinkel**
   - q1 D. A: Saturday bringing is not possible. B: Sunday closed. C: Friday bringing ends at 15.00.
   - q2 A. B: normal Saturday. C: payment rule that does not rescue the closed shop.
7. **open-dag-college**
   - q1 B. A: reversed order, no such time. C: afternoon.
   - q2 C. A: no registration needed (reversed condition). B: soup is a side detail.
   - q3 C (2 x 3 = 6). A: entrance only. B: one soup. D: three soups.
8. **werk-via-bureau**
   - q1 D. A, B: only one of the two. C: after 9.00.
   - q2 A (step 2). B: step 3. C: step 4.
9. **energie-besparen**
   - q1 D (30+20=50). A: uses lower heating (refused). B: uses shorter showers (refused). C: only 20.
   - q2 C. A, B: details of the free visit, not the aim.
10. **huiswerkklas**
    - q1 B (20, one day). A: first lesson only. C: two-day price.
    - q2 A. B: no phone number in the advert. C: the library is only the notice board. D: the first lesson.
11. **klusjes-huis**
    - q1 B (80 minus 10% = 72). A 70: 80 minus 10 euro. C 80: no discount. D 88: plus 10%.
    - q2 B (Saturday). A: Sunday closed. C: Friday evening after 20.00 closed (Lucas works until 21.00).
12. **digid-brief**
    - q1 A. B: reversed warning. C: reversed 21-day rule.
    - q2 C. A: not stated. B: reversed warning.
    - q3 D. A, B: variants of giving the code. C: giving part of it.

## 6. Language control

Words are whitespace-separated tokens containing a letter or digit. Prose sentences exclude " – " table rows and the checker's crude splitter merges headings with the next sentence; the reported "longest sentence" warnings of 21, 22, 25, 33, 41 and 74 words are such merged headings or tables. Real prose sentences are at most 18 words (item 7: the table header plus line, 18; item 9: 19 after the heading merge, the longest real prose sentence is 15).

| Item | Words | Prose sentences | Average | Longest (merged) | Unlisted text words (allowed) |
| --- | ---: | ---: | ---: | ---: | --- |
| parkeren-centrum | 121 | 13 | 9.3 | 21 | none (2) |
| banenmarkt | 109 | 14 | 7.8 | 15 | none (2) |
| ijsbaan | 121 | 12 | 10.1 | 22 | none (2) |
| werkrooster-winkel | 106 | 7 | 11.1 | 25 | none (2) |
| buslijn-weekend | 103 | 10 | 8.8 | 13 | none (2) (Zuidwijk is a place name, written mid-sentence) |
| tweedehandswinkel | 117 | 11 | 8.2 | 13 | none (2) |
| open-dag-college | 106 | 9 | 8.1 | 18 | techniek (2) |
| werk-via-bureau | 123 | 5 | 9.6 | 14 | none (2) |
| energie-besparen | 116 | 8 | 9.0 | 19 | none (2) |
| huiswerkklas | 119 | 18 | 6.6 | 15 | none (2) |
| klusjes-huis | 121 | 12 | 8.2 | 14 | schroef (2) |
| digid-brief | 118 | 16 | 7.0 | 13 | none (2) |

- `techniek` (item 7): a cognate of "technical"; sits in a table row beside "Zorg" and "Computers"; no question uses it.
- `schroef` (item 11): the joke line "Blijft er een schroef over? Die is gratis." follows "een kast in elkaar zetten"; no question depends on it, and the joke is optional.
- Subordinate clauses: omdat, als, dat only; conditions written as "Hebt u ...? Dan ...". Tenses: present, one perfect ("heeft ... aangevraagd" in the situation).
- Difficulty comes from combining two details: day and hour of a rule (1), a number rule and a table (3, 4, 5, 7), a day maximum (1), an exception day (3, 6), two savings added (9), a discount rule (11), a letter rule (12).

**Compounds reported, with judgement.** All transparent at A2: betaaltijd (removed from the final text and explanations), banenmarkt (baan + markt; the paper's title and the situation explain the job fair; also "Zoekt u werk?"), busbedrijf, buurtkrant, speelhoek, toegang (toe + gang; "U betaalt niets voor de toegang" and "De toegang is gratis"; learners know "ingang"), chocolademelk, ijsbaan (ijs + baan; used in title and text), marktplein, verjaardagsfeest, boekenkast, tweedehandswinkel (in title and question; "tweedehands" is common on markets), proefles (proef + les, explained by "korte proefles van dertig minuten"), bankrekeningnummer (bank + rekening + nummer; item 8 asks for it only in step 1), hieronder (listed parts), huiswerkklas, opgeven/opgegeven (separable verb of op + geven; q2 uses "geeft ... op"), prikbord (prik + bord; the situation says it is in the library), doordeweeks (text only; "van maandag tot en met vrijdag" nearby), klusservice (in the advert name), ophangen. `verjaardagsfeest` and `opgeven` are used in questions; a reviewer may prefer "feest" and "aanmelden" if the A2 learner finds them hard.

## 7. Premise changes and doubts for the reviewer

- Item 4: third colleague Samira instead of Henrik (name limit). Rule "ruilen only on the same day" added so that Samira, who is free, cannot be the answer.
- Item 5: "Daarna rijdt er elke 30 minuten een bus" applies to both days; the question needs addition (9.10 + 30 + 30 = 10.10). It is a two-step calculation, the intended A2 "combine details" item.
- Item 6: the questions use "boekenkast"; the text has "kast of bank".
- Item 7: lessons last thirty minutes, set so that care at 10.30 and computers at 11.30 fit one morning.
- Item 9: persona changed from "ten-minute showers" to "does not want shorter showers or lower heating", so that the answer needs two savings (30 + 20); otherwise the key word "douchen" would appear only in the key. The persona refusals are a little forced; the reviewer may judge this.
- Item 10: the one-day price (20 euro) was added so that the persona question has a clear answer.
- Item 12: 21 days, not twenty; expired code means a new application (section 4).
- Item 1: the street price (3 euro per hour) was added so that the garage maximum is a real comparison.
- Possible doubt: item 3 q1 has two child prices in the text and the key adds four numbers.

**Requested words.** None.

## 8. Checker output

`npx tsx scripts/batch-check.ts content/batches/106-original.json`: 12 items, 30 questions, keys {"C":8,"B":8,"A":8,"D":6}, options {"3":18,"4":12}, 23 warnings (compound reports, the merged-heading sentence lengths, `techniek` and `schroef` above) and no failures.

```
Checked 12 items, 30 questions. Keys: {"C":8,"B":8,"A":8,"D":6}. Options: {"3":18,"4":12}.
  warn  A2:reading:batch106-parkeren-centrum:1: longest sentence 21 words (A2 target 18)
  warn  A2:reading:batch106-banenmarkt:1: compounds of listed words (reviewer: transparent at A2?): banenmarkt, busbedrijf, buurtkrant, speelhoek, toegang
  warn  A2:reading:batch106-ijsbaan:1: compounds of listed words (reviewer: transparent at A2?): chocolademelk, ijsbaan, marktplein
  warn  A2:reading:batch106-ijsbaan:1: longest sentence 22 words (A2 target 18)
  warn  A2:reading:batch106-werkrooster-winkel:1: compounds of listed words (reviewer: transparent at A2?): verjaardagsfeest
  warn  A2:reading:batch106-werkrooster-winkel:1: average sentence length 18.1 words (A2 target under 12)
  warn  A2:reading:batch106-werkrooster-winkel:1: longest sentence 74 words (A2 target 18)
  warn  A2:reading:batch106-buslijn-weekend:1: longest sentence 33 words (A2 target 18)
  warn  A2:reading:batch106-tweedehandswinkel:1: compounds of listed words (reviewer: transparent at A2?): boekenkast, tweedehandswinkel
  warn  A2:reading:batch106-tweedehandswinkel:1: longest sentence 41 words (A2 target 18)
  warn  A2:reading:batch106-open-dag-college:1: unlisted words in the text (allowed 2; the context must explain them and no question may depend on them): techniek
  warn  A2:reading:batch106-open-dag-college:1: compounds of listed words (reviewer: transparent at A2?): proefles, toegang
  warn  A2:reading:batch106-open-dag-college:1: average sentence length 12.9 words (A2 target under 12)
  warn  A2:reading:batch106-open-dag-college:1: longest sentence 52 words (A2 target 18)
  warn  A2:reading:batch106-werk-via-bureau:1: compounds of listed words (reviewer: transparent at A2?): bankrekeningnummer
  warn  A2:reading:batch106-energie-besparen:1: compounds of listed words (reviewer: transparent at A2?): hieronder
  warn  A2:reading:batch106-energie-besparen:1: average sentence length 15.1 words (A2 target under 12)
  warn  A2:reading:batch106-energie-besparen:1: longest sentence 56 words (A2 target 18)
  warn  A2:reading:batch106-huiswerkklas:1: compounds of listed words (reviewer: transparent at A2?): huiswerkklas, opgegeven, opgeven, prikbord
  warn  A2:reading:batch106-klusjes-huis:1: unlisted words in the text (allowed 2; the context must explain them and no question may depend on them): schroef
  warn  A2:reading:batch106-klusjes-huis:1: compounds of listed words (reviewer: transparent at A2?): doordeweeks, klusservice, ophangen
  warn  A2:reading:batch106-klusjes-huis:1: longest sentence 36 words (A2 target 18)
  warn  A2:reading:batch106-digid-brief:1: compounds of listed words (reviewer: transparent at A2?): hieronder
23 warning(s), no failures.
```
