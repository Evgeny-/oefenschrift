# Batch 070: media review

All three final illustrations pass visual review. All nine audio clips pass source, manifest and encoding checks. Specialist listening remains pending because this reviewer had no auditory access.

Source: content/batches/070-original.json. SHA-256: 638850e3b48d020587ea6e6a51616152252a70f09779abc4da6b8475a0731743.

## Final images

| Item          | Final WebP                   | Verdict | Visual findings                                                                                                  |
| ------------- | ---------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| foto-werk     | images/f6083943ed1c9ce3.webp | pass    | Sabrina and Julio match their cast traits beside a bare desk. No photographer action or tested location appears. |
| potlood-lenen | images/09cedb946f96b4c9.webp | pass    | Roos and Mark match their traits. Empty hands and table supply no loan object or return-time clue.               |
| tas-kopen     | images/5cb6046c1873815a.webp | pass    | Fatima and Ruben match their traits at an empty counter. No product, payment object or payment action appears.   |

I viewed each complete final 1024×640 WebP and its 520 px preview. Faces, hands and furniture remain clear at player size. Clothing separates from the pale background. No text, numeral, logo, sign or clock appears. Every question, option and evidence quote was checked against the picture. No key or distractor gains visual support. The classroom chairs and seller's plain apron add neutral context and do not alter the tested facts.

Each image is opaque. Recomputed output, source PNG and prompt hashes match the generation record. The permanent JSON contains the full prompts, built-in image_gen mode, original source paths, conversion command and complete source/output hashes. It is the prompt set and integrity record for these final visuals.

## Audio technical checks

The three conversations and six question narrations match the adopted source exactly. Every per-clip script hash, configured voice-role mapping and adjusted speed matches the generation manifest. All nine actual file hashes are stored in the JSON. Independent ffprobe checks confirm mono MP3 at 44.1 kHz and agreement with the manifest durations.

Reported transcription character error rates and inserted runs are zero for every clip. Reported maximum sample levels range from −2.6 to −1.7 dBFS. Those readings do not establish perceptual balance or absence of audible artefacts.

| Fragment      | Spoken words | Complete duration, seconds | Overall words/second |
| ------------- | -----------: | -------------------------: | -------------------: |
| foto-werk     |           51 |                      25.37 |                 2.01 |
| potlood-lenen |           48 |                      23.74 |                 2.02 |
| tas-kopen     |           48 |                      29.08 |                 1.65 |

The rates include silence. The A1 generation profile multiplies role speeds by 0.82, applies a 0.7 floor and configures a 0.9-second turn gap. These are measurements and settings. They cannot certify the intended A1 pace.

## Listening review still required

No auditory review was performed. Pronunciation, careful articulation, useful pauses, intelligibility, voice balance, audible artefacts and answer-revealing emphasis remain unchecked by ear. A perfect transcription round trip does not settle those questions. The JSON records audio technical pass and specialist listening pending as separate statuses.

Only the exact image and audio hashes recorded here are covered. This local-testing review makes no CEFR difficulty or official exam-equivalence claim. No source, catalogue, media asset or global manifest was changed by this reviewer.

## User quality follow-up, 27 October 2026

The user rejected the sound quality of Sabrina and Julio. A subsequent source inspection confirmed that all nine original source WAVs are 24 kHz, 16-bit mono. The original MP3s were resampled to 44.1 kHz, which does not restore source bandwidth. Their original hashes remain recorded above. The [quality investigation and same-text audition](../../docs/research/voice-quality-2026-10-27.md) record the known Nick noise issue and A1 slowdown.

The user selected Lieke and initially accepted Daan. The two batch 070 fragments containing Esmee were then replaced locally. After another audition, the user chose Ruben as the main younger male voice and kept Daan for selected casual exercises. The workplace fragment now uses Lieke and Ruben at a speed of 0.9; the shop conversation retains Jerry with Lieke.

The final workplace file is `audio/e9396f0813d61a01.mp3`, SHA-256 `61297fb57286dc6c03150e89eb911fd43c7c98586ec61af4c696f9d6b7ce617b`. Its source-wording transcript passed the supplementary Ruben audit. The current shop file is `audio/2bf4a611ccbbc03d.mp3`, SHA-256 `6e50cb3f796f799e22a39b600c1cd0c0b881c68b9fe084b3ff459dcca4e24a1f`.

Both final files passed independent decoding, duration, waveform, role and source-hash checks. Their provider source is `mp3_44100_192`. The [separate replacement review](2026-10-27-voice-replacement.json) preserves the replacement stages and current settings. The other seven clips retain their original bytes, verified again against this review. The JSON follow-up identifies the exact replacements and keeps the earlier Daan hashes as history. Per-clip auditory review remains pending.
