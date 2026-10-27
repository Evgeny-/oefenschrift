# Independent A1 reading/listening meaning audit

Audited the complete final source of batches 071 and 072: 18 exercises and 36 questions. Every literal key has a supporting source quote. Every exercise still needs source-level editorial work. This audit does not approve integration.

Verdicts: 0 pass, 14 revise, 4 reject.

The recurring failure is an inventory written to supply distractors. Several dialogues recite the answer choices, change topic without a shared goal, or require the listener to invent a missing reason. The visual jokes can stay. A coherent ordinary exchange must surround them.

The source-only assessment used an extraction of the complete messages and scripts. Full records were then checked, including every option and all written image briefs/alts. Prior reviews and ratings supplied no evidence for these judgments. The JSON records every option separately.

## Source hashes

- `content/batches/071-original.json`: `a60352abbfbf6e25a136523ed12c05ca298bcb228eb7fbc44eef1e6ba736a931`
- `content/batches/072-original.json`: `7c1e97e5ea8b29f02806ad664946ac5b1b104dbcc50cf1be7f37c8c0df32e232`

## Verdicts

| Exercise | Verdict | Semantic coherence / 5 | Reason |
| --- | --- | --- | --- |
| A1:reading:batch071-plant-ogen:1 | revise | 3 | The mug and coffee make a recognisable invitation, but a scattered ingredient inventory replaces a clear practical message. |
| A1:reading:batch071-hoed-les:1 | revise | 3 | Making a birthday card explains a request for pencils, while the numbered book/pen inventory lacks a role in that activity. |
| A1:reading:batch071-winkel-sok:1 | revise | 3 | A coat-pickup notice is recoverable, but the service, payment and unrelated product prices do not form a clear customer message. |
| A1:reading:batch071-eend-tas:1 | revise | 4 | Travel information and a small gift form a plausible friendly message; the unused bicycle statement is the weak addition. |
| A1:reading:batch071-beer-dokter:1 | reject | 2 | A patient appointment message becomes a room inventory and a doctor/patient/toy drinks chart, so its second tested fact has no credible appointment purpose. |
| A1:reading:batch071-taart-staart:1 | revise | 3 | The invitation and bring-a-plate request are understandable, but the extra days create an artificial weekend schedule. |
| A1:reading:batch071-kat-werkt:1 | revise | 3 | A home-working colleague asking for a call is plausible, while the three workplaces and three times resemble a grid made for the questions. |
| A1:reading:batch071-koffer-les:1 | revise | 4 | The outdoor lesson notice has a clear learner purpose and useful equipment instructions; the car/bag detail is an unmotivated extra. |
| A1:reading:batch071-hond-feest:1 | revise | 3 | The dog’s birthday beach outing is a clear social plan, but the uncollected ball and numbered provisions make two distractor inventories. |
| A1:listening:batch072-banaan-telefoon:1 | revise | 2 | The source establishes a banana telephone game, then gives an unexplained writing task and inserts a book/board sentence that nobody responds to. |
| A1:listening:batch072-eend-reis:1 | revise | 3 | Choosing transport and preparing to leave are understandable, but the bicycle and packing inventory give shallow contrasts rather than useful trip planning. |
| A1:listening:batch072-stoel-ogen:1 | revise | 2 | Roos’s search is clear, but Ruben first answers a different question and Roos then recites two candidate locations before he gives the third. |
| A1:listening:batch072-grote-hoed:1 | revise | 3 | The bakery transaction is coherent, but the baker recites the answer set and advertises unrelated goods in the middle of asking a quantity. |
| A1:listening:batch072-bezem-feest:1 | reject | 1 | The central music choice compares a playback device with instruments without establishing performers or recordings; the exchange is written around option lists rather than a shared plan. |
| A1:listening:batch072-doos-oren:1 | revise | 2 | The questions about a box can form one exchange, but unrelated contents and an unjustified pet choice obscure what the box is for. |
| A1:listening:batch072-paraplu-werk:1 | reject | 2 | A drink exchange and a device workaround are spliced together; two inventories fill the gaps, and Sabrina never establishes why she changes to computer failure. |
| A1:listening:batch072-bloem-beker:1 | revise | 3 | A café order gives the speakers a clear purpose, but the menu is recited as a three-option question and the worker offers drinks after the customer has already chosen water. |
| A1:listening:batch072-kat-boeken:1 | reject | 2 | The source starts with reading, then introduces a broken computer whose owner is already reading a book, so the final decision to chat lacks an established practical cause. |

Scores are editorial judgments. Five means a clear purpose with a natural progression; four means a coherent core with an unmotivated addition; three means inventories materially weaken a recognisable purpose; two means missing intentions or causal links; one means the central exchange lacks a coherent practical meaning. Reject marks source/question designs that require replacement rather than cosmetic wording edits.

## Item findings

### A1:reading:batch071-plant-ogen:1

**Revise, 3/5.** The mug and coffee make a recognisable invitation, but a scattered ingredient inventory replaces a clear practical message.

**Intent and progression**

- Omar appears to invite Lina to have coffee and asks her to bring her mug. The source never states a meeting or shared break.
- The plant with paper eyes is an intelligible visual joke and needs no removal.
- Plant joke → mug request: a possible move from small talk to a coffee invitation, but the purpose is only implied.
- Mug request → coffee location: useful practical information.
- Milk on the table → sugar by the window: no recipient need or reason for this distribution is established.

**Concrete findings**

- `text`: “De melk staat op de tafel. De suiker staat bij het raam.” The two locations function as a stock of distractors. The note does not explain why Lina needs this inventory.
- `questions[1].options`: “Op de tafel. / Bij het raam. / In de keuken.” These are overlapping spatial categories: coffee in a kitchen can also be on a table or by a window. The text supplies one direct statement, but does not make the other two locations clearly false.

**Question audit**

- q1: key A follows from “Neem je beker mee.”, which is verbatim. B (De melk.): Milk is already located on the table; the message does not ask Lina to bring it. C (De suiker.): Sugar is already located by the window; the message does not ask Lina to bring it. The options are anchored, but their anchoring comes from the weak inventory.
- q2: key C follows from “De koffie staat in de keuken.”, which is verbatim. A (Op de tafel.): This location is stated for the milk, but can also be true of coffee located in a kitchen. B (Bij het raam.): This location is stated for sugar, but can also be true of coffee located in a kitchen. Different levels of location specificity weaken the claim of one defensible location answer.

**Image and alt**

The plant and paper eyes match the source joke and the alt. Excluding drinks and all three locations avoids a written instruction to reveal either key. The tactile cut-paper direction is an older aesthetic direction; current shared style still governs rendering.

No production model is present or required for this closed task.

### A1:reading:batch071-hoed-les:1

**Revise, 3/5.** Making a birthday card explains a request for pencils, while the numbered book/pen inventory lacks a role in that activity.

**Intent and progression**

- Sara tells Sami about a class activity: making a birthday card for Noor. She asks him to bring pencils.
- The unusual hat is harmless scene-setting; the source does not connect it to the birthday activity, but a teacher can mention a playful hat.
- Hat with ears → card for Noor: a small-talk switch, not a contradiction.
- Noor is having a birthday → card: clear purpose.
- Bring three pencils → I have two books and four pens: books have no stated use and the differing counts become the quantity distractors.

**Concrete findings**

- `text`: “Ik heb twee boeken en vier pennen.” The books are unrelated to making the card, and neither count serves a stated learner need. Both numbers are copied into q2 as competing quantities.

**Question audit**

- q1: key B follows from “We maken een kaart voor Noor.”, which is verbatim. A (Voor Sara.): Sara is the sender/teacher; the source says the card is for Noor. C (Voor Sami.): Sami receives the message; the source says the card is for Noor.
- q2: key B follows from “Neem drie potloden mee.”, which is verbatim. A (Twee.): Two counts the books, not the pencils Sami is asked to bring. C (Vier.): Four counts the pens, not the pencils Sami is asked to bring. The arithmetic-free key is clear, but the two wrong numbers rely on an artificial supply list.

**Image and alt**

The hat with ears matches the joke and alt. A hook-mounted still life differs from the teacher wearing it, without contradicting a tested fact. The brief explicitly hides the card, people and counted supplies, so no key is intentionally shown. Felt-like material needs the current shared flat style to take precedence.

No production model is present or required for this closed task.

### A1:reading:batch071-winkel-sok:1

**Revise, 3/5.** A coat-pickup notice is recoverable, but the service, payment and unrelated product prices do not form a clear customer message.

**Intent and progression**

- The clothing shop wants the customer to collect a coat on Friday. It also announces other days and prices.
- A huge sock in the shop can be an amusing display; the joke does not itself cause a semantic problem.
- Huge sock → coat ready: an advertisement-like opening followed by a personal pickup notice.
- Friday pickup → Monday closed and Saturday early closure: potentially relevant opening information, but no opening times are given and the Friday arrangement already settles the pickup.
- Coat price → sock price → bag price: the message turns into an unexplained sales list.

**Concrete findings**

- `situation + text`: “U leest een bericht van een kledingwinkel. / Uw jas is klaar. / De jas kost twaalf euro.” The source never identifies what has been done to the existing coat. The twelve euros can be read as the coat price or the unstated service charge; the practical transaction is under-specified.
- `text`: “De sok kost vijf euro. Een tas kost drie euro.” The coat-pickup message gives no customer reason for these unrelated prices; they supply q2 distractors.
- `text`: “Wij zijn maandag dicht. Op zaterdag sluiten we vroeg.” These extra days create competing date facts while leaving the useful opening hours unstated.

**Question audit**

- q1: key A follows from “U haalt de jas vrijdag op.”, which is verbatim. B (Op zaterdag.): Saturday is the early-closing day, not the stated pickup day. C (Op maandag.): Monday is the closed day, not the stated pickup day. The key is explicit. The extra days add comparison load without improving the pickup message.
- q2: key C follows from “De jas kost twaalf euro.”, which is verbatim. A (Vijf euro.): Five euros is attached to the sock, not the coat. B (Drie euro.): Three euros is attached to a bag, not the coat. The literal price is supported, while what the customer pays for remains unclear in the practical situation.

**Image and alt**

The huge sock matches text and alt. The brief excludes coat, bag, prices and day clues, so it does not intentionally reveal a key. It also confirms the sock is a display subject, leaving the source transition from display to a priced sock unexplained rather than resolving it.

No production model is present or required for this closed task.

### A1:reading:batch071-eend-tas:1

**Revise, 4/5.** Travel information and a small gift form a plausible friendly message; the unused bicycle statement is the weak addition.

**Intent and progression**

- Roos tells Karim how she and Noor will arrive and says the plastic duck in her bag is a gift for him.
- Karim is the addressee; the message does not establish any need to locate Roos’s bicycle.
- Train arrival → bicycle at home: a switch from useful arrival mode to a fact whose purpose is unstated.
- Noor arriving by bus: plausible coordination of another visitor.
- Plastic duck in the bag → for you: a clear gift announcement that explains the duck.

**Concrete findings**

- `text`: “Mijn fiets staat thuis.” This is not required to explain arriving by train, since taking a bicycle to or on a train is also possible. The text gives no reason Karim needs this fact; its clear task role is to provide q1’s third transport option.

**Question audit**

- q1: key B follows from “Ik kom met de trein.”, which is verbatim. A (Met de fiets.): The bicycle is said to be at home; train is the explicit arrival mode. C (Met de bus.): The bus is Noor’s mode, not Roos’s stated mode. The bicycle anchor is weak source content even though the intended answer is clear.
- q2: key A follows from “Noor komt met de bus.”, which is verbatim. B (Karim.): Karim receives the message; no bus travel is stated for him. C (Roos.): Roos explicitly arrives by train; Noor is named as the bus traveller.

**Image and alt**

The plastic duck peeking out of a bag agrees with the source and alt. Removing vehicles and people from the brief prevents either transport/person key from being supplied by the illustration. This is the strongest source-level story in the reading batch.

No production model is present or required for this closed task.

### A1:reading:batch071-beer-dokter:1

**Reject, 2/5.** A patient appointment message becomes a room inventory and a doctor/patient/toy drinks chart, so its second tested fact has no credible appointment purpose.

**Intent and progression**

- The practice should be telling mevrouw Ali where to wait for an appointment.
- No patient need is established for the contents of another room or for what the doctor and stuffed bear drink. The bear can remain a playful waiting-room object.
- Wait in room two → doctor in room one: potentially useful orientation.
- Bed in room three: no action or relevance for this patient.
- Stuffed bear → patient water, doctor coffee, bear tea: the source leaves the appointment purpose and assigns three drinks to three subjects.

**Concrete findings**

- `text`: “In kamer drie staat een bed.” No reason for the patient to know this room’s contents is established; it supplies the third numbered-room option.
- `text + questions[1]`: “U krijgt water. De dokter drinkt koffie. De beer heeft een kopje thee. / Wat drinkt de dokter?” The central second question is built around an implausible appointment-notice fact. The supplied bear joke has expanded into a second pretend tea scene solely to complete the drink alternatives.
- `text`: “De dokter zit in kamer één.” The information can orient a patient, but together with the unused bed room it makes the note a memorisation grid rather than a useful waiting instruction.

**Question audit**

- q1: key C follows from “U wacht in kamer twee.”, which is verbatim. A (In kamer één.): Room one is assigned to the doctor, not to the patient’s waiting instruction. B (In kamer drie.): Room three contains a bed; room two is the explicit waiting instruction. Literal evidence is sound, but the third room is arbitrary load.
- q2: key C follows from “De dokter drinkt koffie.”, which is verbatim. A (Thee.): Tea is assigned to the stuffed bear, not to the doctor. B (Water.): Water is offered to the patient, not to the doctor. The quote proves coffee, but a source quote cannot justify the unnatural clinical message or the doctor-drink task.

**Image and alt**

The bear on a waiting-room bench is coherent and matches the alt. The brief excludes the cups, rooms and people needed to answer the questions. The visual joke itself is salvageable; the source/question design needs replacement.

No production model is present or required for this closed task.

### A1:reading:batch071-taart-staart:1

**Revise, 3/5.** The invitation and bring-a-plate request are understandable, but the extra days create an artificial weekend schedule.

**Intent and progression**

- Ivo invites Mila to eat at his home on Saturday and asks her to bring a plate.
- He is making an unusual cake; a cake shaped with a tail is a legible visual joke.
- Saturday meal → making a cake with a tail: relevant food preparation with the requested oddity.
- Friday bread shopping: potentially preparation for the meal, though no link is stated.
- Sunday visit to his sister: no link to Mila’s Saturday visit.
- Bring a plate → I have glasses and spoons: a credible practical distinction between what the guest brings and what is already available.

**Concrete findings**

- `text`: “Vrijdag koop ik brood. Zondag ben ik bij mijn zus.” The two other days flank the Saturday key. The Sunday plan has no established purpose for this invitation; it introduces another person and time only to populate q1.

**Question audit**

- q1: key B follows from “We eten zaterdag bij mij.”, which is verbatim. A (Op vrijdag.): Friday is the bread-shopping day, not the meal day. C (Op zondag.): Sunday is the sister visit, not the meal day. The explicit Saturday key is clear; the surrounding schedule adds unnecessary comparison load.
- q2: key A follows from “Neem een bord mee.”, which is verbatim. B (Een lepel.): Ivo already has spoons and asks for a plate. C (Een glas.): Ivo already has glasses and asks for a plate. Unlike the numbered inventories elsewhere, the available tableware has a plausible function in a bring-your-own-plate request.

**Image and alt**

A fish-shaped cake makes the tail ordinary within a playful design; the alt is consistent. No day clues or tableware are deliberately shown. The source does not need an explanation of how a cake has a tail to remain simple.

No production model is present or required for this closed task.

### A1:reading:batch071-kat-werkt:1

**Revise, 3/5.** A home-working colleague asking for a call is plausible, while the three workplaces and three times resemble a grid made for the questions.

**Intent and progression**

- Nora tells Amir that she works from home and asks him to call at four.
- Her cat lying on the desk makes the claim that the cat also works understandable as a joke.
- Cat “works” → lies on desk → Nora works at home: coherent humorous opening.
- You work at the office → Sara works in the shop: the addressee already knows his own workplace and Sara’s relevance is unstated.
- Call at four → eat at twelve → stop at five: ending work can constrain availability; lunch at twelve does not explain a four-o’clock call.

**Concrete findings**

- `text`: “Jij werkt op kantoor. Sara werkt in de winkel.” The message does not assign work, coordinate locations or explain why the recipient needs these facts; they mainly create two wrong workplace choices.
- `text`: “Ik eet om twaalf uur.” The lunch time has no stated relation to a call four hours later. It supplies q2’s third time and increases memory load.
- `text`: “Bel me om vier uur. Ik eet om twaalf uur. Om vijf uur stop ik.” The times occur out of day order and have mixed relevance, making a simple call arrangement less natural.

**Question audit**

- q1: key C follows from “Ik werk thuis.”, which is verbatim. A (In de winkel.): The shop is Sara’s workplace, not Nora’s. B (Op kantoor.): The office is Amir’s workplace, not Nora’s. The two wrong workplaces rely on unmotivated reporting of other people’s locations.
- q2: key B follows from “Bel me om vier uur.”, which is verbatim. A (Om twaalf uur.): Twelve is lunch time, not the requested call time. C (Om vijf uur.): Five is the work ending time, not the requested call time. Stopping at five can be relevant context; the earlier lunch fact is filler.

**Image and alt**

The cat on a desk matches source and alt. Excluding domestic or office setting cues protects the home-versus-office key. The desk is an ordinary work cue shared by both alternatives and does not alone identify home.

No production model is present or required for this closed task.

### A1:reading:batch071-koffer-les:1

**Revise, 4/5.** The outdoor lesson notice has a clear learner purpose and useful equipment instructions; the car/bag detail is an unmotivated extra.

**Intent and progression**

- Mevrouw Bakker tells Noor that the lesson is outdoors, asks her to bring a coat, tells her no book is needed and promises a pen.
- The teacher sitting on a suitcase is a clear visual oddity within an outdoor class.
- Outside lesson → bring coat: direct practical connection.
- Book stays home → teacher provides pen: plausible preparation instructions.
- Students on grass → teacher on suitcase: coherent scene and joke.
- Bags in the car: no instruction, owner or reason for that storage is supplied.

**Concrete findings**

- `text`: “De tassen staan in de auto.” The final sentence neither tells Noor what to do with her bag nor explains how the bags relate to the lesson. Its only established task role is to anchor “In de auto” in q2.

**Question audit**

- q1: key A follows from “Neem je jas mee.”, which is verbatim. B (Haar pen.): The teacher will give Noor a pen; it is not the object she is asked to bring. C (Haar boek.): The book explicitly stays at home.
- q2: key B follows from “Vandaag is de les buiten.”, which is verbatim. A (Thuis.): Home is stated for the book; outside is the explicit lesson setting. “Thuis” is also broader than an indoor/outdoor category. C (In de auto.): The car is assigned to the bags, not to the lesson. The explicit outside key is usable, but q2 depends on the unmotivated bag/car addition for its third option.

**Image and alt**

The isolated teacher on a suitcase matches the source joke and alt. The detailed ban on all outdoor setting clues intentionally protects q2. No coat, book or pen is shown in the brief. The scene remains recognisable as the suitcase joke without revealing the lesson setting.

No production model is present or required for this closed task.

### A1:reading:batch071-hond-feest:1

**Revise, 3/5.** The dog’s birthday beach outing is a clear social plan, but the uncollected ball and numbered provisions make two distractor inventories.

**Intent and progression**

- Ben invites Dina to come to the beach for the dog’s birthday. Water and picnic food can be useful shared-trip information.
- The dog’s birthday hat is the permitted playful detail.
- Dog birthday → hat → beach outing: coherent celebration.
- Park closed: can explain choosing the beach, though the link is unstated.
- Ball in garden: no request to fetch it or plan to use it follows.
- Two water bottles → three apples and four rolls: food is plausible for a picnic, but the exact contrasting counts have no stated planning function.

**Concrete findings**

- `text`: “In de tuin ligt zijn bal.” No one is asked to bring or collect the ball. The garden supplies the third destination alternative without advancing the trip.
- `text`: “Ik heb ook drie appels en vier broodjes.” The source does not explain how these exact counts affect what Dina should bring or do. Along with two water bottles they form the same three-number pattern used elsewhere.

**Question audit**

- q1: key A follows from “We gaan naar het strand.”, which is verbatim. B (Naar het park.): The park is closed; the stated destination is the beach. C (Naar de tuin.): The ball is in the garden; no garden outing is stated. The garden is only anchored by an unrelated object location.
- q2: key C follows from “We nemen twee flessen water mee.”, which is verbatim. A (Drie.): Three counts apples, not water bottles. B (Vier.): Four counts rolls, not water bottles. The quantity distractors are literal and distinct, but rely on unnecessary exact counts.

**Image and alt**

The dog in a party hat matches the celebration and alt. A close portrait avoids supplying the destination or counts. The image joke can remain while the practical message is revised.

No production model is present or required for this closed task.

### A1:listening:batch072-banaan-telefoon:1

**Revise, 2/5.** The source establishes a banana telephone game, then gives an unexplained writing task and inserts a book/board sentence that nobody responds to.

**Intent and progression**

- Roos plays with a banana as a telephone during a lesson.
- Ruth asks her to write her name, but the source never says why a telephone game requires writing. Roos seeks clarification about personal details.
- Roos announces banana phone → Ruth says “Leuk!”: natural acknowledgement of the joke.
- “Leuk!” → write your name on paper: no activity link or purpose is stated.
- Roos asks whether to add address/number: understandable clarification of the writing instruction.
- “Mijn boek ligt bij het bord” follows that clarification without a reason. Ruth ignores it and returns to “Alleen je naam”.

**Concrete findings**

- `script[1].text`: “Leuk! Schrijf je naam op het papier.” Ruth changes from the game to a writing instruction without establishing what they are trying to complete.
- `script[2].text`: “En mijn adres of nummer? Mijn boek ligt bij het bord.” The second sentence is an unrelated location report. It introduces precisely the book and board used as q2 distractors.
- `questions`: “Wat moet Roos schrijven? / Waar moet Roos schrijven?” Both questions mine the same short imperative. There is little independent listening information once that instruction is understood.

**Question audit**

- q1: key A follows from “Schrijf je naam op het papier.”, which is verbatim. B (Haar adres.): Roos asks about an address, but Ruth specifies only the name. C (Haar nummer.): Roos asks about a number, but Ruth specifies only the name. “Nummer” has no type stated; the three personal-data alternatives contribute to a form-filling exchange that the lesson game has not introduced.
- q2: key B follows from “Schrijf je naam op het papier.”, which is verbatim. A (In een boek.): The book is merely said to be near the board; it is not the writing surface. C (Op het bord.): The board is only a location reference for the book; Ruth explicitly specifies paper. The two surface distractors arise from the unrelated book/board sentence.

**Image and alt**

The banana-phone gesture, lesson setting and alt agree with the source opening. The brief excludes all three writing surfaces and any personal details. This protects answer secrecy without fixing the missing connection between the game and the writing task.

No production model is present or required for this closed task.

### A1:listening:batch072-eend-reis:1

**Revise, 3/5.** Choosing transport and preparing to leave are understandable, but the bicycle and packing inventory give shallow contrasts rather than useful trip planning.

**Intent and progression**

- Sabrina checks whether they will take the bus and asks what Julio will bring.
- Julio clarifies that they will use the train and says he will bring a bag. Neither person explains a purpose for the bicycle fact or why the bag is useful information.
- Sabrina notices a huge duck → asks about the bus: a plausible small-talk switch before leaving.
- Julio rejects bus and says train: direct answer.
- “De fiets blijft thuis”: no prior proposal to bring a bicycle.
- Sabrina’s coat/book → Julio’s bag: packing is relevant, but container-versus-contents is an uneven comparison; everyone’s bag could contain the named objects.

**Concrete findings**

- `script[1].text`: “De fiets blijft thuis.” The bicycle has not been proposed or connected to the trip; it supplies q1’s third mode.
- `script[2:4].text`: “Mijn jas en boek gaan mee. Wat neem jij mee? / Ik neem mijn tas.” The exchange contrasts specific items with a container. The source never makes it clear what practical information Sabrina obtains from learning only that Julio brings a bag.
- `questions[1].options`: “Zijn tas. / Zijn jas. / Zijn boek.” The source establishes Sabrina’s coat and book, but does not state whether Julio also brings his own. A is the only explicit answer, while the other items are not explicitly ruled out.

**Question audit**

- q1: key C follows from “we nemen de trein.”, which is verbatim. A (Met de bus.): Bus is Sabrina’s suggestion, rejected by Julio. B (Met de fiets.): The bicycle is said to stay home; train is the chosen mode. The train choice is direct, but the bicycle line adds an unmotivated third alternative.
- q2: key A follows from “Ik neem mijn tas.”, which is verbatim. B (Zijn jas.): A coat is stated for Sabrina; no Julio coat is stated. This is unsupported, rather than explicitly false. C (Zijn boek.): A book is stated for Sabrina; no Julio book is stated. This is unsupported, rather than explicitly false. The answer is a direct source match; the distractor rationale depends on absence and changed possessives.

**Image and alt**

An enormous toy duck in a public hall is an understandable visual oddity. The alt matches the brief. Transport and luggage are explicitly excluded, so neither key is intentionally revealed. The visual does not supply the missing packing purpose.

No production model is present or required for this closed task.

### A1:listening:batch072-stoel-ogen:1

**Revise, 2/5.** Roos’s search is clear, but Ruben first answers a different question and Roos then recites two candidate locations before he gives the third.

**Intent and progression**

- Roos wants to find her pen.
- Ruben is in a position to help, but his first reply locates a book and telephone instead. His last reply finally gives the pen location.
- Chair with eyes → looking for pen: permissible small-talk opening.
- Pen search → “Je boek en telefoon zijn hier”: nonresponsive without a stated connection to the search.
- Roos asks “op of naast de tafel”: no reason is given for restricting her guess to those two positions.
- Ruben says under the table and invites her to take it: the final reply solves the actual request.

**Concrete findings**

- `script[1].text`: “Je boek en telefoon zijn hier.” Ruben does not respond to the stated missing pen. The two unrelated belongings are exactly q1’s wrong options.
- `script[2].text`: “Ligt mijn pen op of naast de tafel?” The binary question supplies both wrong positions for q2. It sounds shaped around the multiple-choice options rather than Roos’s practical need.

**Question audit**

- q1: key B follows from “Ik zoek mijn pen.”, which is verbatim. A (Haar boek.): Ruben locates her book; Roos says she is looking for her pen. C (Haar telefoon.): Ruben locates her phone; Roos says she is looking for her pen. The wrong objects are anchored in the nonresponsive reply.
- q2: key C follows from “Je pen ligt onder de tafel.”, which is verbatim. A (Op de tafel.): This is Roos’s guess; Ruben explicitly states under the table. B (Naast de tafel.): This is Roos’s other guess; Ruben explicitly states under the table. The answer is clear, but both distractors are spoken as a contrived choice list.

**Image and alt**

The chair’s paper eyes and alt agree with the joke. Tables, all three belongings and search-pointing are explicitly hidden, protecting both questions. Ruben’s shrug in the brief adds no helpful response; the source itself must carry the search logic.

No production model is present or required for this closed task.

### A1:listening:batch072-grote-hoed:1

**Revise, 3/5.** The bakery transaction is coherent, but the baker recites the answer set and advertises unrelated goods in the middle of asking a quantity.

**Intent and progression**

- Fatima wants to buy bread.
- Jerry needs to know how many loaves and then prepares the order. The large hat is a harmless visual comment.
- Comment on hat → wants bread: a believable customer opening.
- Jerry asks “één, twee of drie”: quantity is relevant but this exact three-way recital is not justified by a standard pack size or restriction.
- “We hebben ook koek en taart” interrupts the unresolved quantity question.
- Fatima requests two; Jerry says he will get them: sensible completion, although goodbye comes before the exchange is visibly completed.

**Concrete findings**

- `script[1].text`: “Wilt u één, twee of drie broden?” The baker speaks q2’s complete answer set. No reason is stated to offer exactly these three quantities.
- `script[1].text`: “We hebben ook koek en taart.” The two extra product categories interrupt the quantity request and supply q1’s two distractors. Fatima has already said she wants bread.
- `script[0].text`: “Ik koop brood.” This is understandable, but as a direct opening order it sounds like a factual exercise declaration rather than a request to a baker.

**Question audit**

- q1: key B follows from “Ik koop brood.”, which is verbatim. A (Taart.): Cake is only advertised as available; Fatima orders bread. C (Koek.): Cake/biscuit product “koek” is only advertised as available; Fatima orders bread. The availability pair exists mainly to supply the wrong product options.
- q2: key C follows from “Twee broden, graag.”, which is verbatim. A (Eén brood.): One is offered by Jerry, but Fatima chooses two. B (Drie broden.): Three is offered by Jerry, but Fatima chooses two. Both wrong quantities are copied from Jerry’s artificial three-way question.

**Image and alt**

The oversized baker’s hat, counter and oven establish the shop and match the alt. No food or counting gesture is requested in the brief, so the two purchasing keys are not deliberately shown. The visual joke fits the transaction.

No production model is present or required for this closed task.

### A1:listening:batch072-bezem-feest:1

**Reject, 1/5.** The central music choice compares a playback device with instruments without establishing performers or recordings; the exchange is written around option lists rather than a shared plan.

**Intent and progression**

- Daan notices Roos dancing with a broom and asks whether she will turn on music. He later says he will prepare chairs.
- Roos agrees about music and offers a radio/guitar/piano choice, but the source never establishes what action she would perform for any of those alternatives.
- Dancing with broom → asking to turn music on: possible, even if she is dancing without it; this is not itself an error.
- “Ja” → radio/guitar/piano: the reply changes from switching on music to a choice between a device and two instruments. No performer, recordings or selection context is established.
- Daan chooses “de radio” → chairs: party preparation explains the chore, but music selection has not become a coherent action.
- Roos says plates and glasses are ready: plausible chore status, serving as two more object alternatives in q2.

**Concrete findings**

- `script[1].text`: “Ja. Wil je de radio, gitaar of piano horen?” Radio is a music source/device, while guitar and piano are instruments. Everyday choice language could be coherent with an established performer or recordings; this source supplies neither. A1 listeners must invent that context.
- `script[0:2].text`: “Zet je muziek aan? / Wil je de radio, gitaar of piano horen?” The answer does not resolve the requested action in an ordinary way. The central q1 answer exists because Roos speaks the multiple-choice set.
- `questions[0]`: “Wat wil Daan horen?” The question faithfully tests an unnatural choice rather than a clear practical intention.
- `situation`: “Roos en Daan maken een feest klaar.” “Een feest klaarmaken” is an awkward collocation; the Dutch situation line itself needs editorial attention.

**Question audit**

- q1: key A follows from “De radio, graag.”, which is verbatim. B (De gitaar.): Guitar is offered but not chosen. The offering itself lacks an established practical meaning. C (De piano.): Piano is offered but not chosen. The offering itself lacks an established practical meaning. The exact quote proves the radio answer; it does not make the radio/instrument choice sensible.
- q2: key B follows from “Ik zet de stoelen klaar.”, which is verbatim. A (Borden.): Plates are already ready according to Roos; Daan says he will prepare chairs. C (Glazen.): Glasses are already ready according to Roos; Daan says he will prepare chairs. This chore distinction is understandable, but it cannot rescue the broken central music exchange.

**Image and alt**

The broom dance and alt are a clear, acceptable joke. Music sources and all three chore objects are excluded from the brief. There is no requirement to remove the broom humour; the human exchange around it needs replacement.

No production model is present or required for this closed task.

### A1:listening:batch072-doos-oren:1

**Revise, 2/5.** The questions about a box can form one exchange, but unrelated contents and an unjustified pet choice obscure what the box is for.

**Intent and progression**

- Karim wants to know the box contents and whom it is for.
- Lieke says socks are inside and that the box is for a cat that likes sleeping in boxes. The source does not connect the socks to the cat’s bed or explain why Karim offers a dog or bird.
- Box with ears → asking contents: understandable curiosity.
- “Sokken” answers the question; apples and book on a table add unrelated stocktaking.
- Dog-or-bird question: no preceding animal information or feature motivates these alternatives.
- Cat likes boxes: a clear reason for using a box, but how the currently sock-filled box serves that purpose remains unstated.

**Concrete findings**

- `script[1].text`: “De appels en het boek liggen op tafel.” These objects do not help answer what is in the box or explain its intended use. They supply both q1 distractors.
- `script[2].text`: “Is de doos voor de hond of de vogel?” A bird is not an ordinary alternative for an unexplained closed household box, and neither animal has been introduced. The sentence supplies q2’s two wrong animals.
- `script[1].text + script[3].text`: “Sokken. / Voor de kat. Ze slaapt graag in dozen.” The source leaves open whether this is storage or a cat bed. It never says the socks form bedding or will be removed. That missing connection should not be invented by the listener.

**Question audit**

- q1: key C follows from “Sokken.”, which is verbatim. A (Appels.): The apples are said to be on the table, not in the box. B (Een boek.): The book is said to be on the table, not in the box. The explicit answer is clear, but the table inventory is unmotivated.
- q2: key A follows from “Voor de kat.”, which is verbatim. B (Voor de hond.): Dog is Karim’s suggestion, while Lieke explicitly says cat. C (Voor de vogel.): Bird is Karim’s other suggestion, while Lieke explicitly says cat. The two wrong animals come from a forced binary guess.

**Image and alt**

The closed box with unmistakably human paper ears and the alt agree. Animal features and contents are excluded, protecting both keys. Making the box a closed craft object does not clarify how the socks and the cat’s intended sleeping place relate.

No production model is present or required for this closed task.

### A1:listening:batch072-paraplu-werk:1

**Reject, 2/5.** A drink exchange and a device workaround are spliced together; two inventories fill the gaps, and Sabrina never establishes why she changes to computer failure.

**Intent and progression**

- Sabrina asks what Julio is drinking, although Julio replies with what he wants.
- Julio then states he uses his phone for work after Sabrina announces his computer is broken. No work problem or request for help is introduced before that announcement.
- Umbrella in office → drink question: the visual observation is allowed small talk, but a standing umbrella is not itself surprising; only the unseen-in-speech open canopy supplies the joke.
- What are you drinking → I want coffee: current activity and desired drink do not exactly match.
- Milk and tea stand here: unrelated to the coffee preference and no offer follows.
- Computer broken → pen/paper: an unannounced topic change that implies a proposed workaround without stating it.
- I work with my phone: understandable as rejecting the implied workaround, but the intended problem must be inferred.

**Concrete findings**

- `script[0:2].text`: “Wat drink je? / Ik wil koffie.” The question asks about present drinking and the answer gives a preference. The exercise question later silently adopts the preference version.
- `script[1].text`: “Melk en thee staan hier.” The pair adds drink distractors without answering Sabrina’s question or advancing a coffee order.
- `script[2].text`: “Je computer is kapot. Hier liggen pen en papier.” Sabrina abruptly asserts Julio’s broken computer, then displays writing materials. There is no established work task, discovery or request linking this turn to the conversation.
- `script[0].text + images[0].brief`: “Er staat een paraplu op kantoor! / wide open mustard-yellow umbrella” The script treats an ordinary stored umbrella as a surprise. The feature that makes the scene unusual is available only in the visual brief.

**Question audit**

- q1: key C follows from “Ik wil koffie.”, which is verbatim. A (Melk.): Milk is present, but Julio explicitly wants coffee. B (Thee.): Tea is present, but Julio explicitly wants coffee. The key is supported by Julio’s preference despite the earlier present-activity question.
- q2: key A follows from “Ik werk met mijn telefoon.”, which is verbatim. B (Zijn computer.): His computer is said to be broken; he explicitly says he works with his phone. C (Een pen.): A pen is present, but he explicitly says he works with his phone. The phone quote is direct. The pen distractor relies on the unspoken suggestion that Julio should use the displayed supplies.

**Image and alt**

The open umbrella supplies a workable office joke; the alt also calls it open. The script omits that important feature. The brief hides drinks and work devices, so no question key is deliberately revealed. The story still needs a coherent conversational purpose.

No production model is present or required for this closed task.

### A1:listening:batch072-bloem-beker:1

**Revise, 3/5.** A café order gives the speakers a clear purpose, but the menu is recited as a three-option question and the worker offers drinks after the customer has already chosen water.

**Intent and progression**

- Fatima wants food and orders soup plus water.
- Jerry acknowledges the flower joke, asks for a food choice and directs her to sit. His final drink inventory has no stated purpose after the completed order.
- Flower in cup → “Ja, dat is leuk”: coherent acknowledgement.
- Soup/bread/rice choice: these can be foods sold in a café, but a bare exact three-way list sounds made for q1 rather than an introduced menu.
- Soup and water: a normal customer order.
- Milk and juice also available: no request to reconsider water, offer of anything further or other reason follows; then Jerry tells her to sit.

**Concrete findings**

- `script[1].text`: “Wilt u soep, brood of rijst?” The bare categories are offered as an exact three-option list. No menu context explains this particular set, and it maps directly to q1.
- `script[3].text`: “Er is ook melk en sap.” Fatima has already ordered water. The unused drinks enter only after her choice and create q2’s two wrong options.
- `script[3].text`: “Goed. Er is ook melk en sap. Gaat u maar zitten.” The worker confirms the order, announces alternatives, then closes the exchange without allowing a response to those alternatives.

**Question audit**

- q1: key B follows from “Soep, graag.”, which is verbatim. A (Brood.): Bread is offered, but Fatima chooses soup. C (Rijst.): Rice is offered, but Fatima chooses soup. Food-order intent is clear; the source still uses options-as-dialogue.
- q2: key C follows from “Ik neem ook water.”, which is verbatim. A (Melk.): Milk is advertised after the order; Fatima chooses water. B (Sap.): Juice is advertised after the order; Fatima chooses water. The post-order alternatives are not needed for a natural transaction.

**Image and alt**

The flower in a mug is coherent, and the alt matches. The brief specifies paper petals to avoid a second biological oddity and excludes liquids and food. The paper material is an illustrative interpretation, not a tested source fact; no key is deliberately shown.

No production model is present or required for this closed task.

### A1:listening:batch072-kat-boeken:1

**Reject, 2/5.** The source starts with reading, then introduces a broken computer whose owner is already reading a book, so the final decision to chat lacks an established practical cause.

**Intent and progression**

- Ruth asks what Roos is reading, then says she wants to read email but her phone has no charge.
- Roos says she is reading a new book. Her subsequent broken-computer announcement has no established connection to Ruth’s email problem or to her own book.
- Cat sleeping on bag → what are you reading: a plausible library small-talk switch.
- New book answers the question; newspaper location is an unused alternative.
- Ruth wants email but phone is empty: a clear obstacle to her own goal.
- Roos’s computer is broken → “Dan praten we even”: the computer was never offered or needed for Roos’s book; no shared plan to use it was established. The conclusion depends on missing intentions.

**Concrete findings**

- `script[1].text`: “De krant ligt hier.” The newspaper is not offered to Ruth or linked to Roos’s book. It supplies q1’s third reading object.
- `script[3].text`: “Mijn computer is kapot. Dan praten we even.” Roos’s computer has not been introduced as an option for Ruth’s email. It also does not stop Roos reading the book she already has. The stated consequence therefore lacks a clear cause.
- `questions[1].options`: “Hij is nieuw. / Hij is leeg. / Hij is kapot.” The new-book adjective and broken-computer adjective are transplanted to the phone solely to form a second attribute-matching question.
- `script[2:4].text`: “Mijn telefoon is leeg. / Mijn computer is kapot.” The pair introduces two device problems and owner tracking into a short beginner exchange, without an ordinary shared problem being solved.

**Question audit**

- q1: key A follows from “Ik wil mijn mail lezen.”, which is verbatim. B (Een boek.): Roos reads a book; Ruth explicitly says she wants to read email. C (De krant.): A newspaper is present, but Ruth explicitly says she wants email. The email key is direct; the unused newspaper is distractor stock.
- q2: key B follows from “Mijn telefoon is leeg.”, which is verbatim. A (Hij is nieuw.): “Nieuw” describes Roos’s book, not Ruth’s phone. C (Hij is kapot.): “Kapot” describes Roos’s computer, not Ruth’s phone. The attributes are anchored, but the broken computer exists in a turn whose practical consequence is not established.

**Image and alt**

The sleeping cat on Ruth’s bag is clear and the alt agrees. The brief hides all reading materials and devices, protecting the two questions. A quiet reading-room setting alone does not explain why Roos’s broken computer prevents either woman’s current activity.

No production model is present or required for this closed task.

## Limits

Only authored image briefs and alt text were inspected. No rendered image or audio received a review. No source or earlier review was changed, and no repair text was proposed. This AI editorial audit does not validate CEFR level, learner difficulty or exam equivalence.
