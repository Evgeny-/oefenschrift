# Review of batch 123 (one revised A2 writing item: new first picture brief)

## Meaning first (blind packet)

Packet of the author's exact file: sha256 e1169aadc31a3702826329a8ea8e88c2b4c7d8000170d0bd092485e482a8abed (content/batches/123-original.json; equal to the author's 123-meaning-packet.json). Written before criteria, sample, model, notes or the batch 115 source were opened.

- Briefje voor Hind (A2:writing:batch115-schoonmaker-briefje:1): a household leaves a note on the kitchen table for Hind, who cleans every Thursday while the writer is at work. Three pictures: an empty room with a tall window whose glass is clouded with grey dirt, an open oven with burnt stains, a basket of clothes next to a washing machine. The learner writes the three chores and thanks her. A note is the natural medium for a cleaner who is alone in the home. The brief of the first picture is now a plain, empty, sunny room with a dirty window, so the panel supports the task and adds no person, event or off-page story. Ordinary.

Blind verdict: pass. The only open point is whether the rendered picture will show dirt rather than frosted glass; that is a media check.

## Verdict

Source sha256: afcc92f9ba30ee108622f4e4fce6b9e7d1e882b030daf6738ce67afed65ea121. All ordinary tone.

| id | verdict | level verdict | reason |
|---|---|---|---|
| A2:writing:batch115-schoonmaker-briefje:1 | pass | unchanged from batch 115 | Only images[0].brief changed; the new brief shows a dirty window without a person or rain and agrees with the alt |

Counts: 1 pass, 0 edited, 0 rejected.

## What was compared

- Field by field against `content/batches/115-original.json`: the only differing path is `images[0].brief`. With the old brief put back, the item serialises byte-identically to the 115 item (key order included). Prompt, scaffold, criteria, sample, quotes, model, `images[0].alt` and `kind`, `images[1]` and `images[2]` are unchanged. The author's claim holds.
- Brief against criterion 1 ("Schrijf dat Hind het raam of de ramen schoon moet maken"): a pane covered by grey dirt, dust smudges and fingerprints in an empty, dry, sunny room is a clearer picture of a dirty window than "streaks", which five drawings read as rain with a person at the window. "On the inside" and "cloudy and dirty" tell the model the dirt is on the glass.
- House style: no text, no person, one object, low detail. Fingerprints and smudges are a fine detail for a flat style, so the contact-sheet check must confirm the dirt reads as dirt at display size.
- No leak and no favour: the brief adds only atmosphere (empty, dry, sunny) and the one panel fact. It names no oven, laundry, tool or chore verb; the prompt still leaves the learner to say what to do. Panels 2 and 3 are untouched.
- Alt text: "Een raam met veel vuil op het glas." is still exactly the pictured fact (it need not mention the room, sun or curtain). The sample's "Er zit veel vuil op" matches.
- Local model: `localBrief` in `scripts/illustrate.ts` drops the sentences beginning with "No" (the exclusions and "No text.") and has no mid-sentence ", no" clause to strip. What remains is "An empty room on a dry, sunny day. A tall window with a white frame. The glass is covered on the inside with grey dirt, dust smudges and fingerprints, so it looks cloudy and dirty. A plain white curtain hangs open at one side." The positive wording alone removes the person and the rain, so the brief works without the negations. They only serve the API fallback, where naming rain and people is the right use. The author's length doubt is accepted: the extra words are the dirt wording the five failures needed.

## Edits

None.

## Rejected

None.

## Media notes

The first picture must be redrawn (new brief, new image hash); panels 2 and 3 keep their drawings. Draw only after this review passes. Look at the render before setting `reviewed`: no text, no person, glass clearly dirty and not frosted, foggy or rainy, curtain present. The author's fallback (a closer crop of the glass) would change the brief and need a new hash and focused re-review.

## Limitations

AI editorial review does not validate CEFR difficulty or official exam equivalence. A brief cannot guarantee what the image model draws; only the rendered picture can be judged. The criteria are unchanged, so the existing reviewed sentence starters stay valid and no starters source is attached.
