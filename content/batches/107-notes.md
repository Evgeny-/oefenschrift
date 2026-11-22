# Batch 107: author notes (A2 writing, eight new tasks)

Plan: `docs/briefs/content-round-2026-11-22.md`, section "107". Eight original A2 writing tasks: two e-mails, two forms, two wijkkrant pieces, two picture notes. Levels are authoring targets (`status: "draft"`, `targetLevelValidated: false`). AI editorial review does not validate CEFR difficulty or official exam equivalence.

Conventions as in batch 092: e-mail models are the body only; form samples/models are the open-field answers in field order; picture-note criteria are hidden until review, so the prompt asks for everything itself. Names used: Nuria (brief-hulp), Emre (fiets-lenen), Ioana (model of mijn-familie, once); Mateo, Zainab, Wiebe, Maud, Cem unused. No people in pictures, so no cast traits. All items are ordinary in tone (no humour planned for W).

## 1. Matrix

| # | slug | taskType | domain | register | Model words / sentences | Omitted in sample |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | huisarts-zoeken | email | gezondheid | formal | 48 / 7 | crit 4 (extra question) |
| 2 | brief-hulp | email | instanties | informal | 46 / 6 | crit 4 (thanks in return) |
| 3 | maandkaart-aanvragen | form | vervoer | formal | 30 / 3 | crit 3 (start date) |
| 4 | straatfeest-aanvragen | form | instanties | formal | 28 / 3 | crit 3 (music end and quiet) |
| 5 | mijn-straat | wijkkrant | wonen-buurt | neutral | 39 / 5 | crit 3 (what is missing) |
| 6 | mijn-familie | wijkkrant | vrije-tijd-familie | neutral | 40 / 4 | crit 2 (free day) |
| 7 | fiets-lenen | picture-note | vervoer | informal | 33 / 3 | crit 3 (shed) |
| 8 | huismeester-briefje | picture-note | wonen-buurt | formal | 39 / 5 | crit 5 (thanks) |

Domains: wonen 2, instanties 2, vervoer 2, gezondheid 1, vrije-tijd 1, as planned. Longest model sentence 14 words; no prompt over 14.

## 2. Per item

1. **huisarts-zoeken.** Subject "Inschrijven als nieuwe patiënt", practice invented. Criteria: register + for whom; what to bring (Bedenk zelf); days/times (Bedenk zelf); one more question (Bedenk zelf). Sample errors: "ons inschrijven" (mij), "woensdag middag" (one word). Differs from the tandarts form: this is an e-mail with questions.
2. **brief-hulp.** Letter topic (invented, model: a new pass for waste), ask Nuria for Thursday evening after seven at home, what is ready, a thank-you offer. Model avoids the prompt wording ("post van de gemeente", "begrijp niet helemaal"). Sample error: "Ik begrijp niet de brief".
3. **maandkaart-aanvragen.** Fields: name, address, postcode, woonplaats, geboortedatum, phone (no real data), three open fields. Start date in the model is Monday 4 January 2027 (checked). Sample error: "naar halte Ziekenhuis" (missing article).
4. **straatfeest-aanvragen.** The prompt says "feest in de straat" and "een ja" from the gemeente (no "evenement", "vergunning"). Street names Leliestraat and Kastanjelaan are generic, no address given; 15 May 2027 is a Saturday (checked). Sample error: "Er komt ongeveer veertig mensen". The last field asks two things in one sentence; criterion 3 accepts both parts in one sentence.
5. **mijn-straat.** Opening "Dit is mijn tekst over mijn straat." Sample error: "twee kind".
6. **mijn-familie.** Prompt and criterion 1 say that names and answers may be invented. Sample error: "Dan wij eten" (no inversion). The sample's middle sentence quote is null (free day missing).
7. **fiets-lenen.** Prompt: Emre has a house key, the note lies on the table. Pictures (objects only): soft tyre with a pump beside it; bike with chain lock and a key on a hook; bike in an open garden shed. Sample errors: "bij de haak" (aan), comma instead of connector.
8. **huismeester-briefje.** Pictures: dripping kitchen tap; ceiling lamp with empty socket; letterbox with loose flap. Criteria: three problems, when at home (Bedenk zelf), thanks. Sample errors: "De kraan van de keuken" (in). Distinct from raam-kapot (e-mail).

## 3. Language control

Prompt, criteria, scaffolds, form labels, models, alts and starters pass the A2 gate. Words replaced because unlisted: uzelf, snap, pomp/oppompen/fietspomp/voorwiel, aanrecht, druppel, klep. Plain phrases used: "lucht in de banden", "het deurtje van de brievenbus", "een beetje water aan de kraan".

Compounds reported, judged: **maandkaart** (maand + kaart, transparent, the plan's own word, and the form title shows the pass); **busbedrijf** (bus + bedrijf, transparent); **wijkkrant** (wijk + krant, name of the task type, as in all older items).

## 4. Invented organisations (searched 22 November 2026)

| Name | Search | Result |
| --- | --- | --- |
| Huisartsenpraktijk Wilgenhof (info@huisartswilgenhof.nl) | "Huisartsenpraktijk Wilgenhof" OR "huisartswilgenhof" | No practice of that name; nearest hit is Huisartsenpraktijk De Wilg (Papendrecht), a different name. |
| Busbedrijf Hazelaar | "Busbedrijf Hazelaar" | No bus operator. Only unrelated firms named De Hazelaar (a bakery in Woerden, a Belgian company). The name is used with "Busbedrijf" only. |

Stops "Markt" and "Ziekenhuis" and the streets are generic. E-mail addresses use the mail.nl placeholders of earlier batches.

## 5. Requested words (optional)

pomp / oppompen / fietspomp (bike-pump scene; now "lucht in de banden"), klep / klepje (letterbox, now "deurtje"), druppel / aanrecht (alt text, now plain phrases).

## 6. Doubts for the reviewer

1. fiets-lenen criterion 1 "lucht in de banden doen" is a plain phrase, slightly less idiomatic than "oppompen". The picture brief still draws a pump.
2. straatfeest field 3 asks two things in one sentence (music end plus quiet measure), as the plan wants.
3. huismeester-briefje has five criteria for a picture note (three problems, time, thanks); each model sentence is short.
4. mijn-familie criterion 3 offers "moment or food", an either/or.
5. brief-hulp model is 46 words, just above the 45 e-mail minimum.

## 7. Checker

`npx tsx scripts/batch-check.ts content/batches/107-original.json`:

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  warn  A2:writing:batch107-maandkaart-aanvragen:1: compounds of listed words (reviewer: transparent at A2?): busbedrijf, maandkaart
  warn  A2:writing:batch107-mijn-straat:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
  warn  A2:writing:batch107-mijn-familie:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
3 warning(s), no failures.
```
