# Local image model for exercise pictures, 5 November 2026

Evgeny asked to draw the new A2 pictures with the local image model installed earlier on his Mac, because it is free, and to fall back to the earlier method if the quality is poor.

## What is installed

- **Model:** Z-Image Turbo (Tongyi-MAI, Apache 2.0), 4-bit build `mflux-community/z-image-turbo-mflux-q4`, already in the Hugging Face cache (`~/.cache/huggingface/hub`, 5.5 GB).
- **Runner:** [mflux](https://github.com/filipstrand/mflux) on Apple silicon, started through `uv run --no-project --with mflux`, the same way the `food-arrows` and `cooking` projects on this Mac use it. Nothing is installed globally.
- No ComfyUI, Draw Things or diffusers install was found.

## Trial

Four existing A2 briefs were redrawn at 1024 × 640 with 8 steps and seed 7 and compared with the published API pictures (`gpt-image-2.5-flare`, low quality). Each picture took 46–52 seconds.

| Round | Prompt | Result |
| --- | --- | --- |
| 1 ([sheet](local-image-model-2026-11-05/trial1.webp)) | house `stylePrefix` + brief, as the API path builds it | Style right, but the people are tiny in a large empty field; "no clock" in a brief produced a clock. Not usable. |
| 2 ([sheet](local-image-model-2026-11-05/trial2.webp)) | exclusion sentences dropped, a "medium shot" line added after the prefix | Pharmacy picture good; others still small; one desk disappeared. |
| 3 ([sheet](local-image-model-2026-11-05/trial3.webp)) | brief first, then a framing line, then the prefix with "Large empty space" replaced by "Plain light background" | Comparable to the API pictures in style and size. One picture added blurred foreground people; one office worker came out faceless. |

The left column of each sheet is local, the right column the published picture.

A fourth check on two more briefs (a square speaking picture and a landscape still, two seeds each) still showed a blurred foreground object with a "nothing blurred" line; "Everything is flat and equally sharp: no depth of field, no blur, no objects in the foreground." removed it in all four pictures.

Decision: use the local model for new pictures with the round-3 prompt shape and that framing line. Review every picture on a contact sheet as before; redraw a failed picture with `--redo` (the next attempt uses the next seed); use `--engine api` for a picture that fails twice.

## How it is wired

- `config/illustration.json` sets `engine: "local"` and a `local` block (model, steps, seed, the prefix edit and the framing line). The house `stylePrefix` itself is unchanged.
- `scripts/illustrate.ts` builds the local prompt (scene first, exclusion sentences removed, framing, style), writes one queue per run and calls `scripts/illustrate-local.py`, which loads the model once and draws every missing PNG. WebP conversion, the manifest, `--redo`, `--apply` and the review flag work as before. Manifest records carry `engine: "local"`, the model, `8 steps` and the seed.
- `--engine api` restores the paid path unchanged.

## Results in the A2 expansion

Batches 089–095 needed 75 pictures: 24 listening stills, 42 speaking pictures and 9 writing picture-note panels. Each was looked at on a contact sheet and, where a detail carried the task, at full size (`content/reviews/2026-11-05-a2-expansion-media-review.md`).

| Kind | First local attempt passed | Second attempt (next seed) passed | Drawn by the API |
| --- | --- | --- | --- |
| Listening stills (context only) | 23 of 24 | 1 of 1 | 0 |
| Speaking (describe, choose, sequence, video still) | 29 of 42 | 6 of 13 | 10 |
| Writing picture-note panels | 7 of 9 | 0 of 2 | 3 |
| **All** | **59 of 75 (79%)** | **7 of 16** | **13** |

Nine pictures failed twice and went to `--engine api`; four pictures that had passed locally went with them so that every sequence and pair comes from one engine (the people would otherwise look different between panels). In the end 62 pictures are local and 13 come from the API (14 API drawings: the used bike needed a second try to show its wear).

Drawing took about 56 seconds a picture on this Mac (91 local drawings, roughly 85 minutes in all, run in the background while the batches were reviewed), with no per-picture cost.

What went wrong locally:

- **People counted or placed wrongly:** a meeting with two colleagues instead of three, a teacher drawn twice, the new employee missing from his own handshake, two people hanging one person's balloons, a father standing on the staff side of the library desk.
- **The detail that carries the task:** a flat tyre that is not flat, a watch the man does not look at, two pots of paint that are not in the trolley, an old and a new bike that look the same, two crates drawn as one box. These are the facts a learner must name, so they decide whether a picture passes.
- **Poses outside the brief:** a man riding a bike he should stand beside, twice.
- **Traits drifting across panels:** a girl with curly hair in one panel and a straight bob in the next two.
- **Style:** one office background stayed blurred despite the framing line; one faint ghost bicycle.

What went right: the house style holds (flat, light, no text, no logos), clothing colours and hair follow the brief in most single pictures, and context-only listening stills almost always pass first time.

Conclusion: the local model is good enough for listening stills and single speaking pictures, and saves most of the API cost. Pictures whose task depends on a precise detail, a count or the same person across panels fail often enough that the second-attempt rule (`--redo`, then `--engine api`) is needed, and sequences or pairs should move to the API together.
