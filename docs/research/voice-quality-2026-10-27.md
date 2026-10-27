# Dutch listening audio quality, 27 October 2026

The current cast follows the user's listening choices on 27 October: Lieke replaces Esmee, Ruben replaces Nick for general younger male roles, and Daan remains available for selected casual exchanges. Ruth supplies mature female roles. The user also approved the cleaned Hanneke comparison; `f-older` retains Hanneke with the saved `spectral-v1` filter.

The user rejected Robert paired with energetic Lieke. [config/voices.json](../../config/voices.json) blocks that exact pairing. Source scripts retain their reviewed role labels; per-exercise casting maps `m-adult` to Ruben for those conversations. Robert remains available in other pairings. Casting validation rejects a blocked pair or two source roles resolving to the same voice before generation.

| Role | Current voice | Pace |
| --- | --- | --- |
| `narrator` | Serge de Beer | 0.95 |
| `presenter` | Peter | 0.93 |
| `f-young` | Roos | 0.85 |
| `f-adult` | Lieke | 0.9, including explicit A1 override |
| `f-older` | Cleaned Hanneke | 0.95 |
| `m-young` | Ruben | 0.9, including explicit A1 override |
| `m-adult` | Robert | 0.92; blocked alongside Lieke |
| `m-older` | Arjen | 1 |
| `m-shop` | Jerry | 1 |
| `m-casual` | Daan | 0.9, including explicit A1 override |
| `f-mature` | Ruth | 0.9, including explicit A1 override |

The table gives base role speeds. For A1, roles without an explicit override use the configured 0.82 multiplier with a 0.7 floor.

## Final replacement evidence

The [Robert/Lieke replacement review](../../content/reviews/2026-10-27-robert-lieke-replacement.json) approves fourteen exact clips across the existing training, logistics and leakage conversations. Ruben supplies the male turns with Lieke. The reviewed scripts and exercise IDs remain unchanged. `/root/voice_generation_targeting`, separate from the generator, checked source hashes, effective casting, encoding and the supplied supplementary transcripts. The technical verdict passes all fourteen; the record leaves auditory approval pending.

All six A1 pilot exercises in batches 069–070 now use simpler, connected practical sources and have fresh source-first review contract version 2 approvals. The three listening pilots use four turns and 30–33 spoken words. Their current purpose and answers follow from the same exchange. Older pilot text and approvals remain in [the history archive](../../content/reviews/history/2026-10-27-a1-pilot-before-meaning/). The current [069](../../content/reviews/069-review.json) and [070](../../content/reviews/070-review.json) reviews supersede them.

The [final A1 audio review](../../content/reviews/2026-10-27-a1-tone-audio.json) covers all 45 final clips for batches 070, 072 and 073. This comprises twelve conversations, 24 question narrations and nine speaking instructions. It verifies the adopted version 2 source hashes for all three batches and passes every exact recorded file for technical application. Nineteen clips received fresh supplementary transcript checks; 26 use byte-identical audio with retained text and transcript evidence. The user has not listened to every clip. The review records remaining name-transcription ambiguity separately from the answer-bearing wording.

Earlier replacement records remain useful within their recorded scope: [Esmee/Nick replacement](../../content/reviews/2026-10-27-voice-replacement.json) and [Hanneke cleanup](../../content/reviews/2026-10-27-hanneke-cleanup.json). They do not approve later source rewrites. The final A1 inventory above is the current technical gate for the repaired A1 exercises.

## Generation and saved history

Current synthesis uses `eleven_multilingual_v2`, per-turn generation and provider `mp3_44100_192`. The dated capability probe found that the active Creator plan permits this MP3 source; 44.1 kHz PCM required Pro. The [ElevenLabs conversion reference](https://elevenlabs.io/docs/api-reference/text-to-speech/convert) describes the output formats. A 44.1 kHz final header alone does not prove the original source bandwidth. Manifest records carry source format and sample rate.

Provider MP3 is decoded to WAV, then each turn receives constant-gain level matching toward −18 LUFS with a −1.5 dBTP ceiling. Hanneke's saved filter runs after that initial level match, followed by another level and peak check. Stitched A1 conversations use 0.9-second gaps. Final delivery uses 44.1 kHz, 192 kbps MP3, with one provider encode and one final encode. The generator rejects whole-dialogue synthesis with per-role processing.

The default PCM probe retries transient network failures and HTTP 429/5xx responses. It downgrades only when the provider explicitly identifies the requested format and its subscription restriction. Other failures stop with a sanitized error category. Exact `--keys` lists bound replacement runs to selected jobs; cache inputs include effective voices, A1 pacing and any processing preset.

Source IDs and database history are preserved. Pure audio replacements retain the reviewed content revision. New saved-response fingerprints exclude derived media URLs, and exact old-URL aliases migrate earlier responses only when their source content and revision still match. A genuine source repair receives a fresh revision and invalidates affected saved judgments. Older audio remains available for historical payloads.

## Final local validation

The [release validation record](../../content/reviews/2026-10-27-a1-release-validation.json) confirms exact approved bytes for all 45 A1 clips and fourteen legacy recasts. Effective voices, settings, casting, processing and cache inputs were recomputed against the current formatted configuration and matched the approval evidence. None of the 595 current catalogue audio links refers to Esmee or Nick.

`npm run check` passed all 165 tests and the production build. All ten isolated Firefox journeys passed, including real A1 playback, audio failure recovery and speaking instruction retry with the transcript preserved. HTTP delivery checks verified full-file hashes, MPEG headers and correct partial responses for all 59 selected clips. The remote production database has an online backup with a passing integrity check. Production deployment will be verified separately.

Technical transcription and signal checks do not establish pleasant sound or validated A1 difficulty. Complete user listening approval remains pending.
