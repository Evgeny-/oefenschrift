# Original exercise illustration prompt, 27 October 2026

The accepted house prompt is the existing `stylePrefix` in [config/illustration.json](../../config/illustration.json). Its exact text already appears in the first repository commit, `ba8ef4195b65555bf7b6ac2298973e8c3b667baa`, dated 10 September 2026 at 13:24 +0200:

> Minimal flat illustration made of a few simple shapes: no outlines, no texture, no background objects. Palette: warm off-white paper, charcoal grey, mustard yellow, plus one or two muted colours used sparingly (dusty blue, sage green, soft terracotta). Large empty space, deliberately low detail, friendly and calm, everyday Netherlands. No text, no captions, no logos.

SHA-256 of the UTF-8 prefix, without a trailing newline: `af5cc1b64534f76550e045ee989d3e81bf3c3915746c432325087737e2075fc1`.

## Historical evidence

The prefix has the same hash in commits `ba8ef4195b65555bf7b6ac2298973e8c3b667baa`, `ecf109d0708113b3e9a7995cc9676a9cf9ca6fe0`, `993371831e933514487fc6eb0c6708345646b16f` and `a65e864e2f637e66d2b9022e93f39c00d0e988b0`. These cover the September baseline and subsequent changes to this config. The working copy retains those exact prefix bytes.

[The September style record](illustration-style-2026-09-10.md), “Round 5”, records the user's choice of finalist A, flat minimal with slightly more colour. Its earlier “Decisions so far” paragraph describes the ink style from an earlier comparison round. That paragraph is stale. Round 4's one-object yellow restriction also predates the final coloured prefix. The final config supplies the exact wording.

The optional `sketchPrefix` remains a separate alternative in the config. The illustration script reads `stylePrefix`; it does not select `sketchPrefix`.

## How the original script assembled a prompt

The baseline and September production version of [scripts/illustrate.ts](../../scripts/illustrate.ts) use:

```ts
const prompt = `${style.stylePrefix} ${expandCast(job.spec.brief!)}`;
```

`expandCast` preserves the scene brief, then appends `NAME is TRAITS.` for every named cast member found in that brief, in config order. It appends these sentences even when the brief already includes the traits in parentheses. The script adds one space between the style prefix and the expanded brief. There is no separate `NoText` suffix: the prefix contains “No text, no captions, no logos.” and each scene keeps its own recorded text exclusions.

The two September reference images were added in `a65e864e2f637e66d2b9022e93f39c00d0e988b0` on 11 September 2026 at 17:16 +0200. Rebuilding each prompt from that commit's config, script and [image manifest](../../content/image-manifest.json) reproduces both its full `prompt_sha256` and its filename token.

| Reference | Exact scene brief after the common prefix | Appended cast text |
| --- | --- | --- |
| `images/275fdacae480526d.webp`, A2 pharmacy | `Roos (young woman, dark hair in a bun, yellow scarf) stands at a pharmacy counter, extending a blank paper towards Modibo (young man, short black hair, light shirt). He is reaching for a single plain medicine box on the counter. Keep both actions clearly visible No text.` | `Roos is young woman, dark hair in a bun, yellow scarf. Modibo is young man, short black hair, light shirt.` |
| `images/a789653285ebaee5.webp`, A2 coat | `Roos (young woman, dark hair in a bun, yellow scarf) stands inside her home holding a plain dusty blue coat in both hands with a puzzled expression. A phone with a blank screen lies on a small table beside her. Only Roos, coat and table with phone. No text, captions or logos.` | `Roos is young woman, dark hair in a bun, yellow scarf.` |

| Reference | Verified full prompt SHA-256 | Verified asset SHA-256 |
| --- | --- | --- |
| Pharmacy | `3ade3730a5f36e59954377f670d4a9be5c0181c0c0a153b5ccd16da102e96c15` | `21d53344354a9130f6bb436c58bfce2bdc0ed98f6c28964b50c2acaeaa00fd77` |
| Coat | `e06c237a82553d4c70b3b5de812afdcd15feef4ea39c6792066102c69a63b180` | `865c60f6ebca6bb20ac7196b285ff66b68bc79ce3b93d6fbff3de0e3cd19ff43` |

Both records use `gpt-image-2.5-flare`, `quality: low`, `size: 816x816`. These settings are separate request fields. The filename token is the first 16 hexadecimal characters of SHA-256 over `JSON.stringify({ prompt, size, model, quality })`.

## First A1 listening batch

The permanent [070 media record](../../content/reviews/070-media-review.json) saves each full prompt verbatim. All three start with the exact common prefix quoted above. They then use the recorded scene brief and this suffix:

> Canvas and composition: landscape 16:10, calm empty space, main figures large enough to remain clear at the exercise player width.

These direct tool calls did not append the script's extra `NAME is TRAITS.` sentences. Cast traits are already in each scene brief. The full saved prompt hashes recompute correctly:

| Image | Full prompt SHA-256 |
| --- | --- |
| `images/f6083943ed1c9ce3.webp`, work photo | `c88df1f74370662e0a31478960153d1c87cdc654b587021b4d174c28555f85ef` |
| `images/09cedb946f96b4c9.webp`, borrowing | `66c35119966250a5eaa718f74c1901c4cd3cd8d8c009cc3a36c48ac44198beea` |
| `images/5cb6046c1873815a.webp`, shop | `fd54549e569fb755e3e28d0c4597a84d3ede0147f06566b9833dbedc717693b1` |

The work-photo asset hash is `f6083943ed1c9ce3a38e7c4cac8258f8cd31f15f92cb052bfdabf68a41f3073a`. Its record identifies built-in `image_gen`, default generation quality and conversion to 1024 × 640 WebP at quality 88. It therefore shares the original style wording while using a different generation path from the September A2 references.

## Where the richer A1 style entered

The pre-restoration snapshot `var/a1-style-restoration-2026-10-27/config-illustration.json.before` contains an additional `a1StylePrefix` starting “Playful editorial illustration for adult beginner Dutch practice.” It adds “tactile cut-paper and gouache surfaces” and “a few meaningful background details”. Its SHA-256 is `b61910ad9791c3723686b4d3e88f616b5e3f91e2d61da5a3a793c9b5e1d3de8f`.

The saved `a1StyleNote` connects that addition to expanded A1 scenes and richer graphics on 27 October. [Batch 072 author notes](../../content/batches/072-notes.md) explicitly say the coordinator selected the new prefix. The note's word “Requested” records the agent's interpretation; this repository evidence cannot establish that the user requested gouache or a separate aesthetic. The 36 stored prompts in `var/a1-fun-2026-10-27/{071,072,073,074}/image-manifest.json` preserve what was generated from that interpretation.

That A1 addition is absent from the September config history. The original `stylePrefix` remained intact. Reusing its exact bytes with the approved scene brief restores the recorded house prompt without introducing another aesthetic description. Existing images and their saved prompts remain the provenance references. This audit made no source, config or image changes and made no provider calls.
