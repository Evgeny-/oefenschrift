# Batch 022: design notes (A2 Luisteren, nine fragments)

Batch 022 contains nine original A2 listening fragments with 26 closed questions, written to the shape of the DUO "Luisteren A2" exam as described in `content/blueprint.md` §4.2: a situation line, a script with voice roles from `config/voices.json`, 30–90 seconds of spoken Dutch, two or three questions with three or four options. Every scenario, script, question and option was written for this project; official material was read for structure only. Audio does not exist yet: the scripts go to review first, and the `text` field is the exact mechanical join of the script turns ("Speaker: text" per line) that the audio pipeline will speak. The batch was built with a small builder script so that `text` cannot drift from `script`.

Level labels are authoring targets (`targetLevelValidated: false`). Nothing here claims official equivalence or a pass prediction.

The settings were assigned by the coordinator (batch 022); the sibling batch 023 takes a doctor's-assistant call, a school announcement, a station announcement, a job-centre explanation, a furniture-shop spot, a bakery conversation, a sports-club voicemail, a heat-wave news item and a pharmacy conversation, none of which appears here.

## 1. Batch matrix

| # | id (slug) | taskType | domain | Scenario | Q | Spoken words | ≈ s |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | garage | gesprek | vervoer | Sabrina phones the garage: brakes done, battery nearly dead and must be ordered, car ready tomorrow at three, garage open until six | 3 | 168 | 72 |
| 2 | kinderopvang | voicemail | vrije-tijd-familie | The daycare calls Karim: Lina has a fever, must be collected, oma may collect her, back only after a full day without fever | 3 | 147 | 59 |
| 3 | sluitingstijd | omroep | winkels-diensten | Supermarket announcement: closing at eight instead of nine because the checkouts get a new floor; tills close at five to eight; home deliveries go ahead | 3 | 105 | 42 |
| 4 | fietsbrug | nieuws | vrije-tijd-familie | Regional radio: a new bicycle bridge to the woods and the swimming lake; ten minutes instead of twenty-five; bikes and walkers only; opening Saturday at eleven | 3 | 157 | 63 |
| 5 | koffiegeld | uitleg | werk | Colleague Ruud explains the coffee-money jar to Roos: five euro a month for coffee or tea, pay at the start of the month, make fresh coffee after the last cup | 3 | 157 | 63 |
| 6 | taalcafe | reclame | opleiding | Radio spot for a Taalcafé in an eetcafé: Wednesday evenings, free, walk in, pay only for other drinks, Saturday-morning session for parents with children | 3 | 137 | 55 |
| 7 | loket | gesprek | vervoer | Meneer De Vries at the station counter: change in Zwolle (not Amersfoort), thirty euro before nine and twenty after, grandson under four travels free | 2 | 140 | 61 |
| 8 | paspoort-klaar | voicemail | instanties | The gemeente tells Modibo his passport is ready: no appointment, Tuesday evening opening, collect in person with the old passport, within three months | 3 | 156 | 62 |
| 9 | pakket | gesprek | wonen-buurt | Julio asks mevrouw Bakker to accept a parcel on Tuesday afternoon while he is away; if she is out it goes to the pakketpunt; he collects it Monday evening | 3 | 157 | 67 |

Totals: 9 items, 26 questions (8 × 3, 1 × 2), 8 four-option questions (31%), 12 persona-scenario prompts, 4 purpose questions. Spoken length 105–168 words per fragment; seconds estimated at 2.5 words per second plus 0.45 s per turn gap for the conversations, so 42–72 seconds, inside the 30–90 s window. Conversations have ten turns each; monologues are one turn (the checker requires two roles as soon as a script has more than one turn).

Domains as assigned: vervoer ×2 (garage, loket), vrije-tijd-familie ×2 (kinderopvang, fietsbrug), winkels-diensten (sluitingstijd), wonen-buurt (pakket), werk (koffiegeld), instanties (paspoort-klaar), opleiding (taalcafe). The garage call is filed under vervoer (the car, when it is back on the road) rather than winkels-diensten, and the bridge news under vrije-tijd-familie (a family route to the woods and the swimming lake, a children's ride at the opening) rather than vervoer; with the assigned counts this is the only consistent mapping, and the coordinator can re-tag either if the bank needs it elsewhere.

## 2. Why each topic is not a duplicate

The existing A2 listening items are: tandarts voicemail, taalles buurthuis, marktomroep, schoolreis voicemail, stationsomroep (platform change), bakker telefoon, zwembad uitleg, and batch 005 (training, telefoonscherm, apotheek tabletten, buurtfeestje, toets, gemeente parkeervergunning, voetbaltrainer, bus omroep, winkelcentrum omroep, speelplaats nieuws, hotel werkdag, computercursus). The batch avoids those settings and the other topics in blueprint §9.

1. **garage** — a repair intake by phone with a second problem found. Not the fietsenmaker (A2 reading), not the telefoonwinkel screen repair (005: shop counter, price with or without a battery, e-mail instead of a call), not "monteur te laat" (A2 speaking). The tested facts are the closing time, the extra problem and the reason for the call.
2. **kinderopvang** — a daycare calling a parent about a sick child. The existing school voicemail is about a school trip; the football voicemail (005) is a match change. No existing item is about childcare or a sick child; the illness is a mild fever, nothing graphic.
3. **sluitingstijd** — a supermarket closing early for a reason. The market announcement in the bank is about a market closing because of wind; the winkelcentrum announcement (005) lists closing times of a garage and a bicycle shed. Here the questions ask the closing time, the reason and what happens to a home delivery; no found object, no lift, no parking garage.
4. **fietsbrug** — regional news about new infrastructure. The playground news (005) asks who pays and where volunteers report; here the tested facts are the opening time, who may use the bridge and who pays most. Not the B1 "fietsroute" speaking task (advice on a safe route).
5. **koffiegeld** — a colleague explaining a workplace money rule. The hotel first-day briefing (005) covers clocking in, locker and sick leave; the B1 speaking "koffiemachine" task is about cleaning a machine. Nothing in the bank is about a shared kitty.
6. **taalcafe** — a radio spot for a conversation café in an eetcafé. "Taalles buurthuis" is a room announcement for a lesson; the library course (005) is a paid computer course with a group maximum. Here the rules are walk-in, free except other drinks, and a second session for parents; the spot says explicitly that there is no lesson and no test.
7. **loket** — a ticket-counter conversation: a change of trains, a price that depends on the departure time, a child fare. The station announcement in the bank is a platform change; the A2 speaking "kaartautomaat" asks the learner to get help at a machine; the B1 speaking "trein gemist" is a story about a missed interview.
8. **paspoort-klaar** — a gemeente voicemail that a document is ready. The parkeervergunning voicemail (005) asks for a missing document and tests the Thursday desk hours and when to pay; here the passport is ready, the tested facts are the purpose, what to bring and the three-month rule. The A2 speaking "paspoort" task is a three-picture narration of Fatima applying; this is a different person, a different channel and the pick-up stage.
9. **pakket** — a neighbour asks another neighbour to accept a parcel next week. The A2 speaking "burenpakket" task has the learner tell the neighbours that their parcel is at the learner's house; the A2 reading "pakketpunt" is a card about collecting a parcel. Here the roles are reversed (a request in advance), and the tested facts are the purpose, the delivery slot and what happens if nobody is home.

## 3. Voice roles

Roles come from `config/voices.json`; every conversation uses two different roles. Monologues are one turn.

| # | Speakers → role | Why |
| --- | --- | --- |
| 1 | Medewerker (Bart) → m-shop; Sabrina → f-adult | m-shop is the repair-service voice; Sabrina is in her thirties (cast), so f-adult. |
| 2 | Medewerker kinderdagverblijf (Jolien) → f-young | a young pedagogisch medewerker; the friendly "Hallo Karim" register fits the young-colleague voice. |
| 3 | Omroeper → narrator | announcement voice (omroep). |
| 4 | Nieuwslezer → presenter | presenter is the news voice. |
| 5 | Ruud → m-adult | a colleague explaining a rule in person, so the colleague/manager voice rather than the presenter; Roos (cast) is addressed but does not speak. |
| 6 | Presentator → presenter | organisation presenting itself. |
| 7 | Meneer De Vries → m-older; Medewerker → f-adult | De Vries is about 60 (cast); f-adult is the receptionist/counter voice. |
| 8 | Medewerker gemeente (Wouter) → m-adult | a male official, to balance the female gemeente clerk of batch 005. |
| 9 | Julio → m-young; Mevrouw Bakker → f-older | Julio is a young man, mevrouw Bakker about 65 (cast); Julio says u to his older neighbour. |

Role use across the batch: f-adult 2, m-adult 2, presenter 2, f-young 1, f-older 1, m-young 1, m-older 1, m-shop 1, narrator 1. All nine roles are exercised. The three conversations carry `notes` saying that the official exam may show such a conversation on video and that here it is audio with one still (item 1 is a telephone call, so the still shows the caller).

## 4. Questions: keys, evidence and distractor rationales

Every key is proven by the `evidence` substring; the competing detail is said elsewhere in the fragment. Rationales name the misunderstanding behind each distractor.

### 1 garage

- **q1** rule-application (4 options), key **C** "Tot zes uur." — evidence "Wij zijn open tot zes uur."
  - A "Tot drie uur.": the time the car is ready, not the closing time.
  - B "Tot vijf uur.": the time Sabrina works until (her own line).
  - D "Tot één uur.": Saturday's closing time; the pick-up is tomorrow, a weekday.
- **q2** detail, key **B** "De accu is bijna kapot." — "De accu is bijna kapot."
  - A "De remmen werken niet.": the brakes were the original job and are already done ("De remmen zijn gemaakt").
  - C "De banden zijn te oud.": Sabrina fears this, but the garage says "die zijn nog goed".
- **q3** purpose, key **A** "Ze wil weten of haar auto klaar is." — "Ik bel over mijn auto. Die staat sinds vanochtend bij u. Is hij al klaar?"
  - B "Ze wil een nieuwe accu bestellen.": the battery is the garage's proposal during the call, not her reason for calling.
  - C "Ze wil een afspraak maken voor de remmen.": the brakes are already done; no appointment is discussed.

### 2 kinderopvang

- **q1** purpose, key **A** "Lina heeft koorts en moet naar huis." — "Ik bel omdat Lina ziek is. Ze heeft koorts, achtendertig en een half."
  - B "Lina heeft niet goed gegeten.": reversal of "Vanochtend heeft ze nog goed gegeten en gespeeld".
  - C "Karim moet de lijst met namen invullen.": the list already exists and oma is on it; nothing is asked about it.
- **q2** rule-application (4 options), key **C** "Oma vragen om Lina te halen." — "Kunt u niet weg van uw werk? Dan mag oma haar ook halen."
  - A "Jolien vragen om Lina thuis te brengen.": excluded ("Wij kunnen haar ook niet thuisbrengen").
  - B "Lina om half zeven ophalen.": half zeven is the closing time, "maar zo lang kan Lina niet blijven".
  - D "Morgen weer bellen naar Jolien.": Jolien asks for a call back today ("Dan weet ik wie er komt"); tomorrow Lina stays home.
- **q3** rule-application, key **B** "Als ze een dag geen koorts heeft." — "Lina mag pas weer komen als ze een hele dag geen koorts meer heeft."
  - A "Morgen, na het slapen.": "Morgen blijft ze dus thuis"; "na het slapen" is when the fever started.
  - C "Als ze weer goed eet en speelt.": eating and playing describe this morning, not the rule for returning.

### 3 sluitingstijd

- **q1** time-place, key **B** "Om acht uur." — "Let op: onze winkel sluit vandaag om acht uur."
  - A "Om vijf voor acht.": the tills close then, not the shop.
  - C "Om negen uur.": the normal closing time ("Normaal zijn wij open tot negen uur").
- **q2** detail, key **C** "De kassa's krijgen een nieuwe vloer." — "De kassa's krijgen vanavond namelijk een nieuwe vloer."
  - A "Er komen nieuwe kassa's.": mishearing; the floor at the tills is new, the tills stay.
  - B "De winkel bezorgt vanavond boodschappen.": true as a fact but said as reassurance, not as the reason for closing early.
- **q3** rule-application, key **A** "Die wordt vanavond bezorgd." — "Hebt u boodschappen besteld voor thuis? Die bezorgen wij vanavond gewoon."
  - B "Die wordt morgen bezorgd.": tomorrow's opening time refers to the shop, not to deliveries.
  - C "Fatima moet die zelf ophalen.": the early closing might suggest collecting in person; the announcement says deliveries go ahead.

### 4 fietsbrug

- **q1** time-place, key **B** "Zaterdag om elf uur." — "De opening is zaterdag om elf uur."
  - A "Zaterdag om twaalf uur.": the start of the children's ride.
  - C "Zondag om elf uur.": Sunday is when everyone may use the bridge; no time is given.
- **q2** detail (4 options), key **D** "Fietsers en voetgangers." — "De brug is alleen voor fietsers en voetgangers."
  - A "Fietsers en scooters.": scooters are excluded ("Auto's en scooters mogen er niet op").
  - B "Iedereen, ook auto's.": cars keep using the old bridge.
  - C "Alleen kinderen op de fiets.": the children's ride is one event at the opening, not the rule.
- **q3** person, key **A** "De gemeente." — "De gemeente betaalt twee miljoen, de provincie betaalt één miljoen."
  - B "De provincie.": pays one million, the smaller part.
  - C "De bewoners van de wijk.": asked for the bridge for years; they do not pay.

### 5 koffiegeld

- **q1** quantity (4 options), key **C** "Vijf euro." — "Iedereen die koffie of thee drinkt, betaalt vijf euro per maand."
  - A "Niets.": only for people who drink water only ("Drink je alleen water? Dan betaal je niets"); tea counts.
  - B "Drie euro.": the old price ("Vroeger was het drie euro").
  - D "Tien euro.": what the Friday biscuits cost.
- **q2** time-place, key **A** "Aan het begin van de maand." — "Het geld doe je in de pot, aan het begin van de maand."
  - B "Aan het eind van de maand.": explicitly discouraged ("Betaal dus liever niet aan het eind van de maand").
  - C "Op vrijdag, als er koek is.": Friday is when Ruud buys biscuits, not a payment day.
- **q3** rule-application, key **B** "Nieuwe koffie zetten." — "Dan zet je nieuwe koffie."
  - A "Het aan Ruud vertellen.": Ruud is the person to go to with questions, not about an empty pot.
  - C "Geld in de pot doen.": the jar is paid once a month, not per pot.

### 6 taalcafe

- **q1** advice, key **A** "Gewoon binnenlopen." — "Aanmelden is niet nodig, u loopt gewoon binnen."
  - B "Zich aanmelden bij het café.": reversal of "Aanmelden is niet nodig".
  - C "Eerst een toets doen.": "er is geen toets".
- **q2** rule-application, key **B** "Alleen de cola." — "Wilt u iets anders drinken? Dat betaalt u zelf."
  - A "De cola en de koffie.": coffee and tea are free.
  - C "Helemaal niets.": the café itself and coffee/tea are free, but another drink is paid.
- **q3** time-place (4 options), key **D** "Zaterdagochtend, van tien tot twaalf." — "Nieuw: op zaterdagochtend is er ook een Taalcafé voor ouders met kinderen, van tien tot twaalf uur."
  - A "Woensdagavond, van zeven tot negen.": the regular Taalcafé.
  - B "Elke eerste woensdag van de maand.": the games evening.
  - C "Zaterdagavond, van zeven tot negen.": the right day with the Wednesday time; both parts are said, in different places.

### 7 loket

- **q1** time-place (4 options), key **B** "In Zwolle." — "In Zwolle stapt u over op de trein naar Groningen."
  - A "In Amersfoort.": the train stops there, "maar daar blijft u gewoon zitten".
  - C "In Groningen.": the destination.
  - D "Nergens, hij blijft zitten.": reversal; he changes once.
- **q2** quantity, key **C** "Twintig euro." — "Vertrekt u na negen uur? Dan is het twintig euro."
  - A "Dertig euro.": the fare before nine; tien over negen is after nine.
  - B "Niets.": the grandson under four travels free, not meneer De Vries.

### 8 paspoort-klaar

- **q1** purpose (4 options), key **D** "Het paspoort van Modibo is klaar." — "Ik bel over uw nieuwe paspoort. Twee weken geleden hebt u dat paspoort aangevraagd. Het is nu klaar."
  - A "Modibo moet een afspraak maken.": "Daarvoor hebt u geen afspraak nodig".
  - B "Modibo moet nog betalen.": "Betalen hoeft u ook niet meer".
  - C "Modibo moet een nieuwe pasfoto brengen.": "Een nieuwe pasfoto is niet nodig".
- **q2** advice, key **A** "Zijn oude paspoort." — "Neem uw oude paspoort mee, want dat nemen wij in."
  - B "Een nieuwe pasfoto.": not needed, the gemeente has one.
  - C "Geld voor het paspoort.": paid at the application.
- **q3** rule-application, key **C** "Hij vraagt een nieuw paspoort aan." — "Haalt u het paspoort binnen drie maanden op? Anders moet u een nieuw paspoort aanvragen, en dan betaalt u opnieuw."
  - A "Hij maakt eerst een afspraak bij de balie.": no appointment is ever needed.
  - B "Zijn vrouw haalt het paspoort voor hem.": "Uw vrouw of een vriend mag dat niet voor u doen".

### 9 pakket

- **q1** purpose, key **C** "Hij wil dat zij een pakket aanneemt." — "Maar dinsdag komt er een pakket voor mij. Wilt u dat pakket aannemen?"
  - A "Hij wil een pakket bij haar ophalen.": reversed direction; he collects it only next Monday evening.
  - B "Hij wil met haar naar de markt.": the market is mevrouw Bakker's own Tuesday-morning plan.
- **q2** time-place (4 options), key **D** "Dinsdagmiddag." — "De bezorger komt dinsdag tussen twee en vijf uur. Dus 's middags."
  - A "Dinsdagochtend.": when mevrouw Bakker goes to the market.
  - B "Maandagavond.": when Julio collects the parcel.
  - C "Zondag.": when Julio is back.
- **q3** rule-application, key **B** "Het pakket gaat naar de supermarkt." — "Hij brengt het pakket naar het pakketpunt in de supermarkt."
  - A "De bezorger komt later nog een keer.": "Dan komt de bezorger niet terug".
  - C "De bezorger zet het pakket buiten.": "Buiten zetten mag niet, want het is te duur".

## 5. Key balance and option counts

| Key | Count | Share |
| --- | --- | --- |
| A | 7 | 27% |
| B | 8 | 31% |
| C | 7 | 27% |
| D | 4 | 15% (of all 26; 4 of the 8 four-option questions) |

Three-option questions: 18 (69%); four-option: 8 (31%). No letter above 40%, A/B/C all above 20%. Within each item no two questions share a key; across the batch in reading order (C B A A C B B C A B D A C A B A B D B C D A C C D B) no key occurs three times in a row.

Option lengths per question (words/characters, key starred): the key is never the longest option by more than two characters; where it is the longest by words (sluitingstijd q2, 6 words against 4 and 5) a distractor is longer in characters. Options are parallel in form (all "Tot … uur.", all "Die wordt … bezorgd." / "Fatima moet …", all noun phrases, all "Hij …"/"Zijn vrouw …"). No option is a superset of another; no "alle antwoorden".

Skills: rule-application 8, time-place 6, purpose 4, detail 3, quantity 2, advice 2, person 1. Persona-scenario prompts: 12 (at least one per item). Purpose questions: 4 (garage, kinderopvang, paspoort-klaar, pakket), one per two or three items. No `picture` item; the stills support the situation only.

## 6. Level and audio notes

- Sentence statistics on the spoken words (sentences split on . ! ?): average 5.4–9.2 words per sentence, longest 10–17 words (conversations 5.4–5.6 / 10–12; monologues 7.8–9.2 / 13–17). With the checker's method (including the "Speaker:" prefix) the averages are 5.9–9.3 and the longest sentence 17; all under the A2 targets of 12 and 18.
- Subordinate clauses only with omdat ("Ik bel omdat Lina ziek is"), als ("als ze een hele dag geen koorts meer heeft", "als ik toch niet thuis ben"), dat ("Elk kind dat meefietst", "Iedereen die koffie of thee drinkt"); want/dus/maar as coordinators; conditions as questions with "Dan …" ("Vertrekt u na negen uur? Dan is het twintig euro."). Tenses present and perfect, one simple past in dialogue ("Vroeger was het drie euro", "Vroeger fietste je", "Bewoners … vroegen"), future with gaan/komen.
- Less common words are carried by context: accu ("bijna kapot", "nieuwe accu nodig"), remmen and banden (parts of the car in a garage), koorts ("achtendertig en een half", "ziek"), op schoot ("ligt ze rustig bij mij"), zwemplas ("het water", "naar het bos en het water"), provincie (next to gemeente as a payer), koffiegeld (explained as "een pot", "betalen dat samen"), vrijwilligers (people you talk with), overstappen (spelled out as "stapt u over op de trein naar Groningen"), enkele reis (a ticket price), Burgerzaken (the balie in the stadhuis), innemen ("Neem uw oude paspoort mee, want dat nemen wij in"), pakketpunt ("in de supermarkt"), handtekening ("zetten").
- Numbers and times in words throughout: honderdveertig, tweehonderdtien, drie uur, vijf uur, zes uur, één uur, half zes, achtendertig en een half, half zeven, acht uur, negen uur, vijf voor acht, vijfentwintig minuten, tien minuten, elf uur, twaalf uur, drie miljoen, twee miljoen, één miljoen, vijf euro, drie euro, tien euro, zeven tot negen, tien tot twaalf, dertig euro, twintig euro, tien over negen, spoor drie, vier jaar, half negen, drie maanden, twee en vijf uur. No digits, no years, no phone numbers, no abbreviations (no "APK", "ov-chipkaart" or "NS"); a scan of the scripts for digits, capital-letter abbreviations and fillers (nou, eh, hoor) found none.
- Register: u between customer and business or institution (garage, loket, gemeente, daycare to a parent, the announcements and the spot), je between colleagues (Ruud to Roos), u from Julio to his older neighbour and from mevrouw Bakker "je" back to the young neighbour.
- Names and places: first names only for the employees (Bart, Jolien, Ruud, Wouter), "Sabrina Jansen" as a deliberately generic caller name, the cast names for the personas. Invented: the wijk Kanaalzicht (a descriptive name, no street or number), eetcafé De Bonte Ekster at "het Marktplein", the gemeente Rietburg (the fictional gemeente already used in batch 005, kept for a consistent world). Real place names: Groningen, Zwolle, Amersfoort (a real train route with a change in Zwolle; the fares and the "before nine / after nine" rule are invented and not those of any carrier). The institutional details (passport collected in person, old passport taken in, no new photo, a three-month pick-up window; a daycare's fever rule) are plausible everyday practice stated inside the fragment; no question depends on knowledge from outside the fragment.
- Web checks of invented names (10 September 2026): "De Bonte Ekster" — no café or restaurant of that name found (search hits were De Bonte Koe, De Bonte Veer, De Bonte Os, De Bonte Haas); "Rietburg" — not a Dutch gemeente (a castle ruin in Germany; Dutch hits are Rimburg and Rijnsburg); "Vogelhoek" and "Reigerveld" were rejected as wijk names because they are a Belgian neighbourhood and a street in Emmen, hence the descriptive "Kanaalzicht"; "Erik Smit" was rejected for the gemeente clerk because Eric Smit is a known Dutch journalist; "Modibo" with a surname was rejected because the tried Malian surnames hit public figures (a judge, a former prime minister), so the voicemail addresses the listener as "u" and the persona only appears in the situation line; "Wouter Brinkman" was rejected because a gemeente employee of that name exists, hence first names only for all staff.

## 7. Checker result

`npm run batch:check content/batches/022-original.json` (10 September 2026):

```
Checked 9 items, 26 questions. Keys: {"C":7,"B":8,"A":7,"D":4}. Options: {"3":18,"4":8}.
No failures, no warnings.
```

An earlier run warned about four option-length spreads (kinderopvang q2, koffiegeld q2, loket q1), a 19-word sentence in fietsbrug (split into two), and the slug "paspoort" (used by the A2 speaking item, so renamed to "paspoort-klaar"); all were fixed before the final run. A six-word phrase comparison of the nine texts against `content/catalogue.json` and all earlier batch files found only stock formulas ("wij wensen u een fijne avond", "hier is het nieuws uit de regio", "van maandag tot en met vrijdag"). Listening slugs are all new; "pakket" and "paspoort-klaar" do not repeat the reading slug "pakketpunt", the speaking slugs "burenpakket" and "paspoort", or any listening slug.

SHA-256 of the batch file at the time of these notes: `359745e04e0464827dd5b996f2bb1973c2585680d57a26510e9478750ab8765d`.

## 8. Image briefs

Five items carry an `imageBrief` (English scene; cast names are expanded with their fixed traits by `scripts/illustrate.ts`, as in batch 005) and a Dutch `imageAlt`. None of the images answers a question.

- **1 garage**: Sabrina at her kitchen table on the phone, a car key on the table; no clock, no calendar, no text. (The conversation is by telephone, so the still shows the caller, not the workshop; shows neither the time nor the battery.)
- **4 fietsbrug**: a bicycle bridge with a gentle arch over a canal, two cyclists and a walker, trees and a small lake on the far bank; no sign or banner. (Shows cyclists and a walker, which q2 asks about, but only as generic scenery — the reviewer may prefer cyclists alone; see §9.)
- **6 taalcafe**: adults of different ages at two café tables with cups, children playing on a rug in a corner; no menu board, no text. (Shows neither day, price nor sign-up.)
- **7 loket**: meneer De Vries at a station ticket counter with a female clerk behind the window; no departure board, no clock. (Shows no station name, no price, no platform.)
- **9 pakket**: Julio at the open front door of a terraced house talking to mevrouw Bakker in the doorway; no house number, no parcel. (Shows neither the day nor the parcel's fate.)

The voicemails, the announcement and the uitleg have no still, following batch 005.

## 9. Points for the reviewer

- Domain tags: garage → vervoer and fietsbrug → vrije-tijd-familie are the only mapping that meets the assigned counts (§1); if the coordinator would rather have the garage under winkels-diensten ("a repair"), the bridge would have to move to vervoer and the supermarket announcement to another domain, which does not fit. A decision either way changes only the tag.
- Item 2 (kinderopvang): the fever is stated in words as "achtendertig en een half"; confirm that the voice reads it naturally (an alternative is "achtendertig komma vijf"). The daycare's rules (fever means going home, one full day without fever before returning, only people on the parent's list may collect) are ordinary childcare practice presented as this daycare's own rule, not as guidance the app gives.
- Item 4 (fietsbrug): the still includes a walker on the bridge; q2's key "Fietsers en voetgangers" is proven by the text, and the picture shows the normal use of such a bridge rather than the rule, but if the reviewer thinks it leans towards the key, cut the walker from the brief. "De burgemeester opent de brug" is the only official; no politics.
- Item 7 (loket): the Zwolle change on the route to Groningen is real; the fares (dertig/twintig euro), the "voor negen uur / na negen uur" rule and "kinderen tot vier jaar reizen gratis" are simplified fiction and the item says nothing about a carrier or a discount product. If the reviewer prefers no real route at all, Groningen/Zwolle/Amersfoort can become invented towns without touching the questions.
- Item 8 (paspoort-klaar): "Uw vrouw of een vriend mag dat niet voor u doen" assumes Modibo has a wife; the line anchors distractor q3-B. "Iemand anders mag dat niet voor u doen" would be neutral but leaves that distractor unanchored, so the choice is left to the reviewer. The three-month pick-up rule and "collect in person with the old passport" are stated as this gemeente's message, not as a KNM fact; the item is not a KNM item and cites no source.
- Item 9 (pakket): "Buiten zetten mag niet, want het is te duur" is Julio's own reason, not a carrier rule.
- Item 1 (garage): "met het werk erbij" is the plainest way to say "inclusief montage" at A2; "accu" is the one technical word, glossed by "bijna kapot" and "nieuwe accu nodig".
- Gender and roles: two female employees (daycare, counter clerk), two male (garage, gemeente), a male colleague explaining, a female caller, an older male and an older female neighbour; no all-male authority pattern.
