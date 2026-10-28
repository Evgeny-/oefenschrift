# Batch 077: independent source and question review

Pass: 15 items and 30 questions (10 unchanged, 5 edited by the reviewer). Rejected: 0. A1 is a foundation authoring target; difficulty is unvalidated.

Proposed SHA-256: `9f9fc37f1636ec5c215a26ad9a1149d726aea038279b2ccabf1968bcb9649a41`. Final source-packet SHA-256: `c4a5e346735549260d9eafbf98eb3160bb5cb9bf08dee05d7191316f383187bb`. Keys: A 10, B 10, C 10; every set of three has two per letter.

| ID | Verdict | Level target | Reason |
| --- | --- | --- | --- |
| `A1:listening:batch070-foto-werk:1` | pass | A1 simplified | Emma weet na het gesprek waar het teamfoto-moment plaatsvindt (bij de grote boom buiten) en wie fotografeert (de baas), zodat ze direct mee kan. |
| `A1:listening:batch070-potlood-lenen:1` | pass | A1 simplified | Aya krijgt een potlood en weet wanneer ze het terugbrengt (na de les) en waar ze het neerlegt (op de tafel van de docent). |
| `A1:listening:batch070-tas-kopen:1` | pass (edited) | A1 simplified | De klant koopt een zwarte tas voor dertig euro en bedankt; de luisteraar hoort de kleur en de prijs van een gewone winkelaankoop. |
| `A1:listening:batch072-banaan-telefoon:1` | pass | A1 simplified | Pedro maakt een echte afspraak bij de dokter; de luisteraar hoort de reden (keel) en het afgesproken tijdstip. |
| `A1:listening:batch072-eend-reis:1` | pass | A1 simplified | De twee spreken af hoe ze naar oma reizen en wat ze meebrengen, zodat het bezoek van morgen geregeld is. |
| `A1:listening:batch072-stoel-ogen:1` | pass (edited) | A1 simplified | Kim vindt haar kwijtgeraakte sleutel dankzij Max en kan daardoor haar werkdag afsluiten; de luisteraar hoort de plaats en wat ze nu doet. |
| `A1:listening:batch072-grote-hoed:1` | pass | A1 simplified | Ahmed koopt brood en betaalt; de luisteraar hoort het aantal broden en de betaalwijze in een gewone winkel. |
| `A1:listening:batch072-bezem-feest:1` | pass (edited) | A1 simplified | Emma en Pedro sluiten de voorbereiding van het feest vrolijk af: muziek aan, starttijd bekend, samen dansen. |
| `A1:listening:batch072-doos-oren:1` | pass | A1 simplified | De buren maken een praatje over een cadeau; de luisteraar hoort voor wie het cadeau is en wat erin zit. |
| `A1:listening:batch072-paraplu-werk:1` | pass (edited) | A1 simplified | Sofie komt droog thuis en weet dat ze de paraplu morgen terugbrengt; de luisteraar hoort het vervoer en het afgesproken moment van terugbrengen. |
| `A1:listening:batch072-bloem-beker:1` | pass | A1 simplified | De mevrouw bestelt eten en drinken; de luisteraar hoort twee gewone caféwensen en een vriendelijke opmerking. |
| `A1:listening:batch072-kat-boeken:1` | pass (edited) | A1 simplified | Aya en haar vriend spreken af om samen naar de bibliotheek te gaan; de luisteraar hoort wanneer en wat ze teruggeeft. |
| `A1:listening:batch077-apotheek-pil:1` | pass | A1 simplified | Kim weet na het gesprek hoeveel pillen ze per dag neemt en wanneer, zodat ze het medicijn goed gebruikt. |
| `A1:listening:batch077-dienst-ruilen:1` | pass | A1 simplified | De twee regelen een dienstwissel: Ahmed neemt de zaterdagdienst over en weet hoe laat hij begint. |
| `A1:listening:batch077-hond-banaan:1` | pass | A1 simplified | Max weet wat en hoeveel hij de hond moet geven terwijl de buurvrouw weg is; de luisteraar hoort wanneer ze vertrekt en het aantal bananen. |

The blind meaning findings were written to the scratch file before the questions, keys and author notes were opened. Each item and every exact listening turn has a source-specific function in the JSON report.

## Reviewer edits

- `batch070-tas-kopen` situation: "Bas koopt een tas in een winkel." becomes "Een klant koopt een tas in een winkel.". Bas also plays the café worker in bloem-beker; the name plan prefers one role per name. 'ober' and 'kelner' are not on the word list, so the customer here became 'Klant'.
- `batch070-tas-kopen` script[1].speaker and script[3].speaker: "Bas" becomes "Klant". Same reason; text rebuilt.
- `batch070-tas-kopen` script[3].text: "Goed, die neem ik. Ik betaal met mijn pinpas." becomes "Goed, die neem ik. Dank u wel.". The bakery item already tests paying by card; two shop items ended identically. 28 words remain.
- `batch070-tas-kopen` questions[0].explanation: "Bas zoekt een zwarte tas. Bruin en blauw noemt hij niet." becomes "De klant zoekt een zwarte tas. Bruin en blauw noemt hij niet.". Name removed.
- `batch070-tas-kopen` images[0].brief: "Bas (young man, short blond hair, dusty blue shirt) talks with ..." becomes "A customer (young man, short blond hair, dusty blue shirt) talks with ...". Name removed; traits unchanged.
- `batch072-stoel-ogen` title: "Waar is de sleutel?" becomes "Een sleutel zoeken". The title restated q1 as a question; neutral title.
- `batch072-stoel-ogen` script[2].text: "Dank je! Nu kan ik naar huis." becomes "Dank je! Nu ga ik naar huis.". Author doubt decided: 'kan ik' (modal) only implies leaving; 'ga ik' states it plainly for a beginner.
- `batch072-stoel-ogen` questions[1].evidence: "Nu kan ik naar huis." becomes "Nu ga ik naar huis.". Follows the script.
- `batch072-stoel-ogen` questions[1].explanation: "Kim zegt: nu kan ik naar huis." becomes "Kim zegt: nu ga ik naar huis.". Follows the script.
- `batch072-bezem-feest` title: "Dansen met een plant" becomes "Dansen met een bezem". Broom restored; 'bezem' is now on the word list.
- `batch072-bezem-feest` script[0].text: "Emma, je danst met de plant!" becomes "Emma, je danst met de bezem!". Broom restored.
- `batch072-bezem-feest` script[1].text: "Ja! Hij moet naar buiten. Zet jij de radio aan?" becomes "Ja! Het huis is schoon. Zet jij de radio aan?". The plant needing to go outside explained nothing and used 'hij' for a plant; the clean house is the reason a broom is in her hands and she celebrates with a dance.
- `batch072-bezem-feest` images[0].brief: "... holds a tall green potted plant in both arms like a dance partner ..." becomes "... holds a tall straw-headed broom in both arms like a dance partner ...". Picture follows the script; exclusions unchanged.
- `batch072-bezem-feest` images[0].alt: "Een vrouw danst met een grote plant. Een man lacht." becomes "Een vrouw danst met een bezem. Een man lacht.". Alt follows the picture.
- `batch072-paraplu-werk` script[2].text: "Neem mijn paraplu. Hoe laat ga je weg?" becomes "Neem mijn paraplu. Breng hem morgen terug.". After lending the umbrella nothing explained why the colleague asks her leaving time; the return condition is the natural next step.
- `batch072-paraplu-werk` script[3].text: "Om vijf uur. Dank je wel!" becomes "Dank je wel!". Time removed with the question; 24 words remain.
- `batch072-paraplu-werk` questions[1]: "Hoe laat gaat Sofie weg? A Om vijf uur. (key) B Om zes uur. C Om zeven uur." becomes "Wanneer brengt Sofie de paraplu terug? A Morgen. (key) B Vandaag. C Vrijdag.". Follows the changed turn. Evidence 'Breng hem morgen terug.' Explanation 'De collega zegt: breng hem morgen terug. Niet vandaag.' Key letter stays A.
- `batch072-kat-boeken` script[2].text: "Vanmiddag. Ik breng mijn boeken terug." becomes "Vanmiddag. Ik breng mijn films terug.". A library trip made 'boeken' guessable without listening; the less obvious item removes the cue.
- `batch072-kat-boeken` questions[1]: "Wat brengt Aya terug? A Films. B Spelletjes. C Boeken. (key C)" becomes "Same prompt: A Boeken. B Spelletjes. C Films. (key C)". Key becomes films. Evidence 'Ik breng mijn films terug.'; explanation follows. Key letter unchanged.

## Author doubts decided

- `stoel-ogen`: "Nu kan ik naar huis" alone was too indirect; the line is now "Nu ga ik naar huis" and Max's farewell confirms it.
- `dienst-ruilen` q1: pass. Saturday is said once, in the request; Ahmed's "Ja" accepts it.
- `bezem-feest`: the plant is replaced by the broom; "Het huis is schoon" explains the broom and the dance.
- `hond-banaan`: the light tone is clear ("Echt waar!"); no advice is implied.
- Skill spread (two time-place or two detail questions in four items): acceptable.
- Bas now appears once, as the café worker.

## Tone

13 ordinary, 2 light-humor (`bezem-feest`, `hond-banaan`), 13.3 percent. The funny scenes use one familiar object or animal; pet, cat and flower decorations elsewhere stay ordinary. The coordinator checks the program-wide count.

## Diversity and media notes

Settings and domains differ across the batch and within each set; see the JSON. All fifteen need audio and pictures after adoption. bezem-feest needs a broom picture; tas-kopen's customer is unnamed with the same three traits. Voice pairs never combine m-adult with f-adult. The obsolete `batch072-doos-oren` casting override in `config/voices.json` can be removed by the coordinator.

## Limitations

Independent AI editorial judgment only. No audio or image was generated; no catalogue, config or app code was edited.
