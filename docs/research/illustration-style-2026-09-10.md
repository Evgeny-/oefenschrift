# Illustration style for exercises, 10 September 2026

How pictures for speaking tasks, listening stills, picture notes and KNM scenes will be produced. Three rounds of samples on the same two scenes (a pupil with his lunch; a three-panel bicycle repair story) were put in front of the user; choices were saved on the comparison pages.

## Round 1: production modes

Artifact "Exercise Image Options". Generated photographs (OpenAI image API), a flat SVG parts library drawn by us, Wikimedia Commons photographs, and a hybrid.

Result: generated photographs rejected as "too AI-sloppy" (floating objects, a character losing his glasses between panels). Real photographs preferred for what they can cover; drawn illustrations acceptable only with a real style, probably from a library.

## Round 2: drawn approaches

Artifact "Illustration Styles". Open Peeps (CC0) full-body ink figures composed with props drawn by us; three model-drawn styles (clear line, ink with one accent colour, flat shapes); the earlier SVG parts for reference.

Result: the model-drawn styles look best overall; the SVG compositions (Open Peeps and our own parts) rejected as looking bad. The user prefers the ink-with-one-accent style (2B): fewer visible errors and a look they like, to be used consistently. Open question: whether a slightly better model reduces the remaining artefacts.

## Round 3: models

Artifact "Image Model Comparison". The ink-accent prompt and both scenes across gpt-image-1 (high quality), gpt-image-1.5, gpt-image-2, gpt-image-2.5 sunburst and gpt-image-2.5 flare. Output-token prices per million: $40, $32, $30, $30, $30, so a newer model costs the same or less; a medium square image is about 1,050 output tokens, a 1536×1024 image about 1,570, high quality about four times that.

Result: recorded in `config/illustration.json` (`model`) once the user rates the samples.

## Decisions so far

- House style: loose hand-drawn ink line on off-white paper, one mustard-yellow accent, minimal detail; the exact prefix is in `config/illustration.json`.
- Sequences are generated as one three-panel image describing the character with three fixed traits, then split; a trait that changes between panels means regenerate.
- Pairs are two single images that differ only in the thing the task asks about.
- Every image is reviewed against the checklist in the config before use; no text or logos; alt text in Dutch without revealing a key.
- A recurring cast of eight named characters with fixed traits is described identically in every prompt and matches the persona names used in questions.
- Real photographs (Wikimedia Commons with attribution, or our own) only for KNM items about real places, documents and objects.
- Tables, forms and schedules are rendered as text in the app, never as images.

Samples from all three rounds are in the session scratchpad (`images/`, `styles/`, `models/`, `peeps/`); the pages embed them.

## Round 4: cheapest model, softer styles

Artifact "Cheap Model Styles". The user found gpt-image-1 far too expensive and the newest models too sharp and detailed, and asked for the cheapest model with a lower-detail style, evaluated by the agent.

Cost per image at medium quality, from the API's reported output tokens at the published per-token rates: gpt-image-1 high $0.17–0.25; gpt-image-1 medium $0.04–0.06; gpt-image-2 $0.04–0.05; gpt-image-2.5 (sunburst or flare) about $0.01 (439 tokens square, 343 landscape). The usage dashboard should confirm the 2.5 figure; the key lacks the usage scope.

Four low-detail prefixes on both 2.5 models: sparse line, soft pencil, flat minimal, ink wash. Soft pencil and ink wash reintroduced detail on the three-panel story (tool walls, lamps, textures). Flat minimal and sparse line stayed calm and kept the character consistent; flat minimal over-used the yellow until the prefix restricted it to one object per panel.

Recommendation recorded in `config/illustration.json`: gpt-image-2.5-flare, medium, flat minimal with the one-object yellow rule as the house style; sparse line kept as `sketchPrefix` for picture notes if wanted. Pending the user's confirmation on the page.

## Round 5: finalist A with a little colour, smaller and cheaper

The user chose finalist A (flat minimal) with slightly more colour and asked whether smaller images would save money, since they are shown at about 500 px wide.

Findings on gpt-image-2.5-flare: the API refuses sizes under 655,360 pixels (640×640 rejected), so 816×816 and 1024×640 are the smallest practical sizes. Reported output tokens: 1024² medium 439, 816² medium 384, 816² low 171; 1536×1024 medium 343, 1024×640 medium 239, 1024×640 low 107. At $30 per million that is about $0.005 for a low-quality square and $0.003 for a low-quality landscape; a 300-image launch bank costs roughly $1–2 including retries. For this flat style, low quality looked as good as medium; the low-quality three-panel story was the cleanest of the three. The prefix now allows dusty blue, sage green and soft terracotta "used sparingly", and the result stays calm.

Decision recorded in `config/illustration.json`: gpt-image-2.5-flare, low quality, 816×816 for single pictures and 1024×640 for pairs, sequences and stills, the coloured flat-minimal prefix, delivery at 600 px WebP.
