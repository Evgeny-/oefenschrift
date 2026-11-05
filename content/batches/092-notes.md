# Batch 092: author notes (A2 Schrijven, eight new tasks)

Batch 092 is part of the A2 expansion round of 5 November 2026 (`docs/briefs/a2-expansion-2026-11-05.md`, section "### 092"). It holds eight original A2 writing tasks: three e-mails, two forms, two wijkkrant pieces and one picture note, with the slugs, domains and registers the plan assigns. Everything was written for this project. Official material was read for structure only (the e-mail header and bullets, "Bedenk zelf …", "Sommige gegevens moet u zelf bedenken", the wijkkrant opening line).

Levels are authoring targets (`status: "draft"`, `targetLevelValidated: false`). Nothing here claims official equivalence, CEFR validation or a pass prediction. AI editorial review does not validate CEFR difficulty or official exam equivalence.

Conventions (as in batch 008):

- E-mail models are the body only. The scaffold prints the header, salutation and closing.
- Form samples and models are the open-field answers in field order, one short sentence per field, without the labels. The personal-data fields and the single choice field of each form carry no criterion.
- Criteria address the learner with "u", also in the informal e-mail. The register is set by the scaffold and the model.
- Every sample meets all criteria but one (that quote is `null`). The other quotes are exact substrings of the sample. Each sample has one or two typical learner errors (listed per item). Models are correct and meet every criterion.
- Picture-note criteria are hidden until review (`app/components/OpenExercise.tsx`), so that prompt asks for everything itself: "Kijk naar de plaatjes. Vertel in het briefje wat Kerem moet doen. Schrijf drie dingen op." For e-mails, forms and wijkkrant pieces the criteria are shown as bullets beside the prompt, as in the official booklets.
- No prompt sentence is copied into a sample or model (checked by script; the model wording was changed where it came close, see raam-kapot and buurman-feest).
- Dates were checked for 2026: maandag 2 november, zaterdag 3 and 10 oktober. Today is 5 November 2026.
- Names from the batch pool: Kerem (buurman-vakantie), Jeroen and Tamara (buurman-feest), Annelies Kramer (raam-kapot; "mevrouw Kramer" in the salutation). Marco and Hatice are not used. No voice name and no old recurring cast name is used as a character. Each name appears in one item.

## 1. Batch matrix and diversity against the catalogue

| # | slug | taskType | Register | Domain | Recipient | Tone | Closest existing items and why this one differs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | pakket-niet-ontvangen | email | formal (u) | winkels-diensten | klantenservice of webwinkel Bestelhoek | ordinary | A2 writing *bezorging* reschedules a washing-machine delivery; *schoenen* exchanges shoes; A2 reading *pakketpunt*, A2 listening *pakket* and speaking *burenpakket* are about receiving or holding a parcel; B1 zinstaak *verkeerd-bezorgd* is a parcel at the wrong address. A parcel marked delivered that never came, with a search and a choice of remedy, is new in A2 writing. |
| 2 | raam-kapot | email | formal (u) | wonen-buurt | private landlord, mevrouw Kramer | ordinary | No A2 writing repair request exists (*huur* ends a tenancy, *ladder*/*kast* are favours). **B1 speaking *slaapkamerraam* (batch 016) is a phone call to the landlord about a bedroom window**: same setting, other part and level; see doubt 1. |
| 3 | buurman-feest | email | informal (je) | wonen-buurt | neighbours Jeroen and Tamara | warm | A2 listening *feestje* (batch 005) is a new neighbour announcing a house-warming at the door; B1 writing *buurtfeest* is volunteering for a street party; A2 speaking *feest-thuis* is a choice of venue. Writing a party notice with an invitation and a noise arrangement is new in A2 writing. |
| 4 | woning-zoeken | form | formal | wonen-buurt | Woonbureau Lindenhoek (registration form) | ordinary | A2 writing *huur* ends a tenancy (opposite act); KNM *woningcorporatie* is a fact card about registering. A house-seeker registration form is new. |
| 5 | klacht-winkel | form | formal | winkels-diensten | Elektro Kortman (complaint form) | ordinary | *schoenen* is an exchange e-mail for a wrong size; B1 *kledingkast* is a persuasive complaint about a damaged wardrobe. An A2 complaint form about an appliance that stopped working is new. |
| 6 | weekend | wijkkrant | personal | vrije-tijd-familie | wijkkrant readers | ordinary | No A2 writing weekend piece in the catalogue; B1 *kustweekend* is one weekend that went wrong. **The official practice booklet 3 also has a weekend wijkkrant**; see doubt 2. |
| 7 | nederlands-leren | wijkkrant | personal | opleiding | wijkkrant readers | ordinary | First writing item about learning Dutch itself; A2 listening *taalles buurthuis* is receptive. |
| 8 | buurman-vakantie | picture-note | informal (je) | wonen-buurt | neighbour Kerem | lightly humorous (the cat that always asks for more) | A2 writing *plant* (batch 002) asks a friend by e-mail to water a plant (duration, key, day). **B1 speaking *kat-voeren* (batch 030) and A1 listening *buren-sleutel* (batch 078) are also holiday favours from a neighbour**; see doubt 3. Three picture-supplied chores in a note are new in A2 writing. |

Counts: 3 e-mails (2 formal: webwinkel, verhuurder; 1 informal: buren), 2 forms, 2 wijkkrant, 1 picture note (informal). Domains: wonen-buurt 4 (as the plan assigns), winkels-diensten 2, vrije-tijd-familie 1, opleiding 1. Every e-mail has at least one "Bedenk zelf …" criterion (all three have two or more). Omitted criterion per sample: 3, 3, 4, 2, 3, 3, 1, 2 (spread over positions). Tone: one lightly humorous item of eight (buurman-vakantie), one warm item (buurman-feest), six ordinary.

## 2. Per item

### 1. `A2:writing:batch092-pakket-niet-ontvangen:1` (email, formal)

- **Purpose, medium, recipient.** The shop's website says the parcel was delivered yesterday; the learner has nothing. A customer writes to the webshop's customer service by e-mail because that is how an online shop is reached; the shop needs the order, the problem, what was already checked and the wanted remedy to act.
- **What the prompt gives and what the learner supplies.** The prompt gives the shop and the problem (website says delivered, nothing received). Criterion 2 ("Schrijf wat het probleem is.") is the fact the recipient needs; it is worded as a function, not as a sentence to copy. The learner invents what was ordered and when (1), where they searched (3) and chooses the remedy (4).
- **Sample.** Omits criterion 3 (no place searched). Errors: "Vorige week ik heb" (no inversion after a fronted time), "terug betalen" (separable verb written as two words). "niks" is informal but correct.
- **Model (57 words, 7 sentences, max 14 words).** "Op maandag 2 november heb ik bij u een blauwe winterjas besteld" (1, with an order number as a natural extra); "Volgens uw website is het pakket gisteren bij mij bezorgd. Maar ik heb niets gekregen." (2); "Ik heb al bij mijn buren gevraagd en ik heb bij de voordeur gezocht." (3); "Kunt u mij een nieuwe jas sturen?" (4).

### 2. `A2:writing:batch092-raam-kapot:1` (email, formal)

- **Purpose, medium, recipient.** The tenant of a privately rented flat reports a defect. The prompt states that the landlord sends a repairman when something breaks, so the e-mail has a concrete result: an appointment. A private landlord (Annelies Kramer) was chosen instead of an invented housing company, which avoids a real-firm risk and the blocked words woningcorporatie/woonstichting.
- **What the learner supplies.** Since when (1, "Bedenk zelf een dag"), why it is a problem for them (2, "Bedenk zelf een reden"; the prompt gives no reason), when the repairman can come (3, day and time). The window problem itself is in the prompt and must be passed on; criterion 1 includes it ("sinds wanneer het raam niet goed dichtgaat").
- **Sample.** Omits criterion 3 ("Kunt u snel iets doen?" names no day or time). Errors: "hij gaat niet dicht" (het raam → het), "In de nacht" (unidiomatic for 's nachts; minor).
- **Model (59 words, 7 sentences, max 13).** "Sinds zondag kan ik het raam van mijn slaapkamer niet meer helemaal dichtdoen." (1; reworded so it does not echo the prompt sentence); cold at night, sleeping badly, traffic noise (2); "Kan de monteur volgende week dinsdag komen? Ik ben die dag thuis van negen tot twaalf uur." (3).

### 3. `A2:writing:batch092-buurman-feest:1` (email, informal)

- **Purpose, medium, recipient.** A considerate notice to the next-door neighbours before a birthday party: when it ends, an invitation, and a way to tell the writer if the music is too loud. The neighbours are not beside the writer; a written message they can keep, with a contact route for the evening itself, is what people actually send (by e-mail or app). The plan's premise is kept.
- **What the learner supplies.** The prompt gives the occasion (birthday) and the day (Saturday evening). The learner adds the age (1, "Bedenk zelf een leeftijd"), the end time (2), the invitation (3) and an arrangement for loud music (4, "Bedenk dit zelf"). Criterion 1 asks for the age so that the learner does not just repeat the prompt.
- **Sample.** Omits criterion 4 (nothing about loud music). Error: "Jullie kan" (jullie kunnen).
- **Model (58 words, 8 sentences, max 11).** "Volgende week zaterdag word ik veertig! Dat vier ik 's avonds met een feest in mijn huis." (1); "Het feest duurt tot twaalf uur 's nachts." (2); "Komen jullie ook iets drinken? Jullie zijn welkom vanaf acht uur." (3); "Is de muziek te hard? Stuur me dan een berichtje, dan zet ik hem zachter." (4). The first model draft repeated the prompt sentence "U geeft die avond een feest bij u thuis" almost word for word and was rewritten.

### 4. `A2:writing:batch092-woning-zoeken:1` (form)

- **Purpose, recipient.** Registering on a landlord's website as a house seeker. The landlord needs the household size, the reason and the preferred district to match homes. The prompt gives no reason to move, so criterion 2 cannot be copied (lesson of the prompt audit).
- **Fields.** Six personal-data text fields, one choice field without a criterion ("Wat voor woning zoekt u?": een flat / een huis met een tuin / dat maakt niet uit), three open fields matching the three criteria.
- **Sample.** Omits criterion 2: the second field answers *when* ("het liefst voor de zomer") instead of *why*, a typical misreading. Errors: "drie persoon" (personen), "omdat mijn werk is daar" (verb not at the end of the omdat-clause).
- **Model (41 words, 3 sentences, max 16).** "Wij zijn met vier mensen: mijn vrouw, onze twee kinderen en ik." (1); "Onze flat heeft maar één slaapkamer, en dat is te klein voor ons." (2); "Ik wil graag in de wijk Oost wonen, want daar is de school van de kinderen." (3, sixteen words, at the limit).

### 5. `A2:writing:batch092-klacht-winkel:1` (form)

- **Purpose, recipient.** A customer reports an appliance that stopped working a few weeks after purchase, through the shop's complaint form. "Elektronicawinkel" is not in the word list, so the prompt says what the shop sells ("telefoons, laptops en apparaten voor in huis"). The product is left to the learner, so the title and prompt name only "apparaat".
- **Fields.** Five personal-data fields, one choice field without a criterion ("Waar hebt u het gekocht?": in de winkel / op de website), three open fields: "Wat hebt u gekocht en wanneer?", "Wat is het probleem?", "Wat kunnen wij voor u doen?" (the usual shop wording; the criterion says "Schrijf wat de winkel moet doen.").
- **Sample.** Omits criterion 3 (the third field gives an unrelated fact). Errors: "gekoopt" (gekocht), "de scherm" (het scherm; a gender error, tolerated by the official grammar scale but typical).
- **Model (32 words, 3 sentences, max 11).** "Op 10 oktober heb ik in uw winkel een stofzuiger gekocht." (1); "Sinds vorige week gaat de stofzuiger na twee minuten vanzelf uit." (2); "Kunt u de stofzuiger repareren of mij een nieuwe geven?" (3).

### 6. `A2:writing:batch092-weekend:1` (wijkkrant)

- **Frame.** The prompt uses our own wording ("Elke maand krijgt u de wijkkrant van uw buurt. Deze keer schrijven mensen uit de buurt over hun weekend.") rather than the official booklet sentence that older catalogue items reuse. Opening "Dit is mijn tekst over het weekend:".
- **Guiding questions.** "Wat doet u meestal op zaterdag en zondag?", "Met wie bent u dan meestal?", "Wat is voor u het fijnste moment van het weekend?" The third question asks for a favourite moment, which the official weekend task does not ask.
- **Sample.** Omits question 3. Error: "Dan wij maken" (no inversion after "Dan").
- **Model (43 words, 4 sentences, max 12).** Saturday shopping and cleaning, Sunday park or parents (1); "Ik ben dan met mijn man en onze dochter." (2); "Het fijnste moment is zondagochtend, want dan ontbijten we lang samen." (3).

### 7. `A2:writing:batch092-nederlands-leren:1` (wijkkrant)

- **Frame.** "De wijkkrant van uw buurt vraagt lezers om een korte tekst. Het onderwerp is deze keer: Nederlands leren." Opening "Dit is mijn tekst over Nederlands leren:".
- **Guiding questions.** "Waar en hoe leert u Nederlands?", "Wat vindt u moeilijk aan het Nederlands?", "Welke tip hebt u voor andere cursisten?" (a relative clause "mensen die ook Nederlands leren" was avoided; see doubt 5).
- **Sample.** Omits question 1 (where and how). Error: "moelijk" (spelling of moeilijk).
- **Model (42 words, 4 sentences, max 13).** "op een taalschool in het centrum, twee ochtenden per week" and the radio at home (1); "Praten vind ik moeilijk, want veel mensen spreken heel snel." (2); "Mijn tip is: praat elke dag Nederlands, ook in de winkel." (3). An earlier draft used "uitspraak" (a compound the checker reports) and "de g en de ui" (the letter "g" fails the gate); both were replaced.

### 8. `A2:writing:batch092-buurman-vakantie:1` (picture note, informal)

- **Purpose, medium, recipient.** The learner goes on holiday for two weeks in July; the neighbour comes in every day. The learner puts the key and a note in his letterbox, so the note is read while the writer is away. July matches the ripe tomatoes in the third picture.
- **Pictures.** Three separate drawings of the same neighbour. Kerem's traits, copied verbatim in all three briefs: "a man of about forty with short black hair and a blue jumper". (1) kneels in a small kitchen and fills a bowl with cat food, a grey cat beside the bowl; (2) picks up a few blank envelopes from the doormat inside the front door; (3) waters tomato plants in pots on a small balcony with a green watering can. Each brief ends with "No text." and lists no excluded objects (local-model guidance in blueprint §7). Alts name the pictured action in listed words ("mat" for deurmat, "eten geven" for voeren).
- **Criteria (hidden until review).** Feed the cat; pick up the post from the mat; water the tomatoes on the balcony. The prompt names the task ("wat Kerem moet doen … drie dingen").
- **Sample.** Omits criterion 2 (post). Error: "De tomaten … moet" (moeten).
- **Model (38 words, 5 sentences, max 10).** "Wil je de kat elke ochtend eten geven? Ze vraagt altijd om meer, maar één bakje is genoeg." (1, the light joke); "Wil je ook de post van de mat pakken?" (2); "Geef de tomaten op het balkon ook elke dag water." (3). The tomatoes are watered "ook elke dag", during the same daily visit the prompt describes.

## 3. Sentence starters (`content/batches/092-starters.json`)

One fragment per criterion, in criteria order, each with "…". None supplies the invented fact (day, product, reason, age, time, district, tip).

| Item | Starters |
| --- | --- |
| pakket-niet-ontvangen | Op … heb ik bij u … besteld. / Volgens uw website …, maar … / Ik heb al gezocht bij … / Kunt u mij …? |
| raam-kapot | Sinds … kan ik het raam niet … / Dat is een probleem, omdat … / De monteur kan komen op … |
| buurman-feest | Volgende week zaterdag word ik … / Het feest duurt tot … / Komen jullie ook …? / Is de muziek te hard? Dan … |
| woning-zoeken | Wij zijn met … mensen: … / Ik wil verhuizen, omdat … / Ik wil graag in de wijk … wonen, want … |
| klacht-winkel | Op … heb ik een … gekocht. / Het probleem is dat … / Ik wil graag dat u … |
| weekend | Op zaterdag … / Ik ben dan meestal met … / Het fijnste moment van het weekend is … |
| nederlands-leren | Ik leer Nederlands bij … / Moeilijk vind ik … / Mijn tip is: … |
| buurman-vakantie | Wil je eerst …? / Daarna moet je … / Wil je ook …? |

The picture-note starters keep only order and request words and name nothing the pictures supply (prompt audit, batch 067 rule). They are hidden until review in the app, like the criteria. The starters pass the A2 word gate (checked by `batch-check.ts`).

## 4. Language control

All prompts, criteria, scaffolds, form labels and options, models, alts and starters pass the A2 word gate. Figures (words / sentences / average / longest):

| Item | Prompt | Model | Sample |
| --- | --- | --- | --- |
| pakket-niet-ontvangen | 40 / 6 / 6.7 / 12 | 57 / 7 / 8.1 / 14 | 37 / 5 / 7.4 / 11 |
| raam-kapot | 39 / 6 / 6.5 / 10 | 59 / 7 / 8.4 / 13 | 40 / 5 / 8.0 / 12 |
| buurman-feest | 38 / 6 / 6.3 / 9 | 58 / 8 / 7.2 / 11 | 34 / 4 / 8.5 / 12 |
| woning-zoeken | 34 / 5 / 6.8 / 9 | 41 / 3 / 13.7 / 16 | 33 / 3 / 11.0 / 12 |
| klacht-winkel | 50 / 6 / 8.3 / 11 | 32 / 3 / 10.7 / 11 | 30 / 3 / 10.0 / 11 |
| weekend | 33 / 5 / 6.6 / 10 | 43 / 4 / 10.8 / 12 | 32 / 3 / 10.7 / 14 |
| nederlands-leren | 35 / 5 / 7.0 / 11 | 42 / 4 / 10.5 / 13 | 26 / 3 / 8.7 / 12 |
| buurman-vakantie | 49 / 7 / 7.0 / 11 | 38 / 5 / 7.6 / 10 | 30 / 4 / 7.5 / 13 |

Targets met: e-mail models 57–59 words in 7–8 sentences (45–70, 4–8); wijkkrant models 42–43 words in 4 sentences (25–45, 3–5); form models one sentence per open field (32 and 41 words); picture-note model 38 words (20–40). The form average of 13.7 comes from three one-sentence answers; none is over 16 words. Subordinate clauses only with als, omdat, dat (prompt "Als er iets kapot is", criterion "als de muziek te hard is", starter "Het probleem is dat …"), plus the indirect questions that every criterion of this kind uses ("Schrijf wat …", "Schrijf waarom …", "sinds wanneer …"), as in batch 008; no relative clauses.

Words avoided because they fail the gate, with the replacement: appartement → flat; elektronicawinkel → "deze winkel verkoopt telefoons, laptops en apparaten voor in huis"; deurmat → mat; voeren/voer → eten geven; uitspraak → praten; journaal → radio; borrel → iets drinken.

### Compounds reported by the checker, judged

- **bestelnummer** (pakket model): bestel + nummer, transparent; it follows "heb ik … besteld" and is a plain number.
- **dichtgaat** (raam criterion 1): the separable verb dicht + gaan in the indirect question "sinds wanneer …"; transparent, and the prompt says "gaat niet meer goed dicht" just before.
- **wijkkrant** (weekend, nederlands-leren prompts): wijk + krant, transparent and the name of the task type; all older wijkkrant items use it.
- **tomatenplanten** (buurman-vakantie alt 3): tomaten + planten, transparent, and the picture shows them.

"Woonbureau Lindenhoek" and "Elektro Kortman" stand inside a sentence and count as names.

## 5. Invented organisations, checked on the web (5 November 2026)

| Name | Search | Result |
| --- | --- | --- |
| Bestelhoek (webwinkel; klantenservice@bestelhoek.nl) | "Bestelhoek" webwinkel; bestelhoek.nl | No shop or site of that name found. |
| Elektro Kortman | "Elektro Kortman"; "Kortman Elektro" OR "elektrokortman" OR "Elektrowinkel Kortman"; "Kortman" elektronica winkel Nederland witgoed | No Dutch shop found. The only hit is Kortman Inc. (formerly Kortman Electric), an electrical contractor in Phoenix, Arizona, a different name in a different country and trade. |
| Woonbureau Lindenhoek | "Woonbureau Lindenhoek" OR "lindenhoekwonen" OR "Lindenhoek Wonen" | No organisation found. "Lindenhoek" occurs only as a house name (a villa in Lunteren, a historic villa in Haarlem), not as a landlord. |
| rejected: Woonbureau Lindeveld | "Woonbureau Lindeveld" | No organisation, but Lindeveld is a real neighbourhood of Heerlen, so it was not used. |
| rejected: De Sleutelbos | "De Sleutelbos" verhuurder woningen | No organisation, but Woningbouwvereniging De Sleutels in Leiden is close, so it was not used. |

Mevrouw Annelies Kramer is a private person with a common surname, not a firm. The addresses kandidaat@mail.nl, a.kramer@mail.nl and jeroenentamara@mail.nl follow the mail.nl placeholder of batch 008.

## 6. Requested words

None is required. Every scene works with listed words. If the coordinator wants more natural wording, these everyday words would help (optional):

- **appartement**: common in housing ads and letters; "flat" is used now.
- **deurmat**: "de post van de mat" works but "deurmat" is the everyday word.
- **elektronicawinkel** (or **elektronica**): the plan's own name for the shop type; now paraphrased.

## 7. Doubts for the reviewer

1. **raam-kapot vs B1 speaking slaapkamerraam (batch 016).** Same setting (bedroom window, landlord), different part, level and act: a B1 phone call with two questions about repair and cost, against an A2 e-mail with since when, why it matters and an appointment. The plan assigned the topic. If the reviewer finds the overlap too close, a different defect in the same e-mail shape (a kitchen tap that keeps dripping) would keep the item.
2. **weekend vs the official practice booklet 3.** Booklet 3 has a weekend wijkkrant with three guiding questions (what you like to do, with whom, where). The plan's topic is the same and two concepts overlap (activities, company). Our questions are worded differently ("Wat doet u meestal op zaterdag en zondag?", "Met wie bent u dan meestal?") and the third asks for the favourite moment instead of a place. The prompt framing and the opening line ("over het weekend", not "over mijn weekend") are our own. The reviewer should judge whether this is still too close to the official task. If so, the third question could stay and the first two could change to "Wat deed u afgelopen weekend?" / "Wat wilt u een keer in het weekend doen?".
3. **buurman-vakantie vs older holiday favours.** A2 writing *plant* (e-mail: how long away, water the plant, key, day), B1 speaking *kat-voeren* (instructions for feeding the cat) and A1 listening *buren-sleutel* also have a neighbour or friend helping during a holiday. This item is a picture note with three different chores, and only the third chore resembles *plant*. The plan assigned it.
4. **pakket-niet-ontvangen and klacht-winkel both end with "what you want".** Both are winkels-diensten and both ask the learner to name a remedy. The situations differ (a lost delivery from a webshop against a defect from a shop), and so do the medium (e-mail vs form) and the information (search places vs fault description). The remedy in pakket is a closed choice (new parcel or money back); in klacht-winkel it is open (the model asks for a repair or a replacement).
5. **"cursisten" in nederlands-leren criterion 3.** It assumes the readers take a course; nearly every inburgering learner does. The alternative "mensen die ook Nederlands leren" needs a relative clause, which the A2 rule avoids.
6. **Fact transfer.** pakket criterion 2 ("Schrijf wat het probleem is.") and the window problem in raam-kapot criterion 1 pass on a fact the prompt gives. This is the official form (prompt audit: passing on a fact the recipient needs stays). In both items the other criteria are invented by the learner.
7. **Choice fields without a criterion** (woning-zoeken: kind of home; klacht-winkel: where bought) follow the nieuwe-patient pattern of batch 008. The reviewer may prefer to drop them or to make them criteria.
8. **woning-zoeken model sentence 3 is 16 words**, at the limit of §10. "Ik wil graag in Oost wonen, want daar is de school van de kinderen." (14) would also work, but "de wijk Oost" is clearer.
9. **Sample errors that the official scale tolerates.** klacht-winkel "de scherm" is a gender error; the same sample also has "gekoopt", which is scored.
10. **Picture 2 (post on the mat).** The local model must draw envelopes clearly on a doormat inside a front door. A drawing of envelopes on a floor would still support "de post pakken"; the alt names "de mat bij de voordeur".

## 8. Checker

`npx tsx scripts/batch-check.ts content/batches/092-original.json` (final run; the starters file beside it was checked by the same run):

```
Checked 8 items, 0 questions. Keys: {}. Options: {}.
  warn  A2:writing:batch092-pakket-niet-ontvangen:1: compounds of listed words (reviewer: transparent at A2?): bestelnummer
  warn  A2:writing:batch092-raam-kapot:1: compounds of listed words (reviewer: transparent at A2?): dichtgaat
  warn  A2:writing:batch092-weekend:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
  warn  A2:writing:batch092-nederlands-leren:1: compounds of listed words (reviewer: transparent at A2?): wijkkrant
  warn  A2:writing:batch092-buurman-vakantie:1: compounds of listed words (reviewer: transparent at A2?): tomatenplanten
5 warning(s), no failures.
```

Earlier runs failed once on the letter "g" in the nederlands-leren model (replaced) and reported "uitspraak" and "woonbureau" (the first replaced, the second moved inside a sentence so it reads as a name).

Author self-checks beyond the script: exactly one `null` quote per task; all quotes verbatim; no model or sample sentence equals a prompt sentence; models within the §10 targets per task type; no sentence over 16 words in a model; every starter has "…" and there is one per criterion; Prettier formatting passes on both JSON files.

SHA-256 at the time of writing: `092-original.json` `dbee6e02721742d345b59afa7c065edcf4ac9008bdbdc4b8112ea15c0629cc1f`; `092-starters.json` `ab374b7f42aad8f0d9f3dddf6ca207401ca62e9dc8689f641d686497156beebe`.
