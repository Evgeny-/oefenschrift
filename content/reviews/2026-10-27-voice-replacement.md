# Voice replacement: 27 October 2026

Technical review passes for all 79 replacement clips across 41 exercises, including the six repaired clips. The files are approved for local testing. The reviewer did not generate or adopt these files. All final MP3s were independently probed and decoded in full after the final repairs. No auditory review was performed.

An independent supplementary transcription review inspected 28 clips and identified six with unsupported additions, fillers or false starts. All six were regenerated. Two conversations required another repair targeting Robert's turns; the construction-site conversation then triggered the generator's automatic retry, which discards cached turns before generating the conversation again. Fresh transcripts pass the source-wording check for all six final files. Their installed SHA-256 hashes match the independently reviewed staged files, and no repair keys remain pending.

The permanent JSON retains the initial classifications, superseded attempts and transcript findings. At that stage, 73 replacement clips and all 488 unselected manifest records remained unchanged from the initial integrity review.

The user then selected Ruben as the main younger male voice and kept Daan for casual voices. Twenty-seven clips switched from Daan to Ruben. Four exercises retain Daan for a friend calling at lunchtime, classmates discussing study, a fellow student offering help and a neighbour asking a favour. Their audio bytes remain unchanged; the manifest now records the deliberate casting. Ruth is configured for future mature female roles.

Supplementary transcripts cover all 27 Ruben clips. Three wording uncertainties prompted targeted regeneration of the corresponding Ruben turns: `bezorgdag`, `daar` and `Doe ik`. Fresh transcripts of those final files have zero character errors and no word edits. The installed hashes match the final audit. Three other transcript differences concern accents or a compound-word boundary. The 52 previously checked turns reused during the Ruben stage still match their source WAV hashes after all repairs.

The final integrity check decoded all 79 files again. Compared with the approved pre-Ruben stage, 27 audio files changed, four entries gained casting metadata, and the other 48 replacement files retain every audio value. All 488 unselected manifest records remain unchanged.

## Adoption and source checks

The comparison uses the catalogue and manifest snapshots in `var/voice-replacement-2026-10-27/`. Exactly the 79 selected manifest records changed. The other 488 records retain every value. There are 41 changed exercises, whose edits concern only the selected derived audio fields. The other 351 exercises are unchanged.

Every reviewed exercise ID and revision remains identical. Questions, keys, scripts, images and other media references retain their prior values. All 17 relevant source reviews still pass and match their recorded SHA-256 hashes. Each replacement's script hash matches its unchanged reviewed source.

| Clip kind                          | Replacements |
| ---------------------------------- | -----------: |
| Complete listening fragment        |           16 |
| B1 fragment attached to a question |           45 |
| Speaking cue                       |           18 |

Two clips are A1, 20 are A2 and 57 are B1. The complete JSON report records each exact key, old and new file hashes, source provenance, role mapping and effective voice settings.

## Encoding and transcription

Every final file decodes as mono MP3 at 44.1 kHz and 192 kbps. Independently decoded durations match the manifest. All 61 listening waveforms were recomputed from the final audio and match their catalogue and manifest values. No decoded sample reached the clipping threshold.

The recorded provider source is `mp3_44100_192`, followed by WAV processing and the final MP3 encode. Generation code, configuration and manifest entries agree on that path. Final-file encoding alone cannot prove the original recording's bandwidth.

The maximum reported transcription character error rate is 0.028. Fourteen clips have a nonzero rate. Ten clips have a longest inserted word run of one; the rest report zero. All pass the existing limits of 0.04 for clips containing at least ten words and 0.15 for shorter clips. An inserted run of two blocks a clip containing at least ten words. Successful transcription does not establish pronunciation or audible quality.

The final six-clip transcript review accepts currency notation and compound-word boundaries where the underlying words or amounts agree. The earlier review also records three minor wording variations and a street-name uncertainty among clips that did not require repair. Those findings remain in the JSON; they do not establish exact pronunciation by ear.

Every former Esmee assignment now uses Lieke. Former Nick assignments use Ruben in 27 clips and Daan in four casual exercises. Other voice IDs retain their assignments. Conversations retain distinct voice IDs, and each B1 exercise keeps the same casting across its fragments. The A1 Lieke and Ruben settings use an explicit speed of 0.9 with the existing 0.9-second turn gap.

## Retained files and learning history

All 79 former files remain available. Their bytes match either a prior permanent media review, covering 21 files, or the Git HEAD blob, covering 58 files. The 27 replaced Daan files also remain intact and match the approved pre-Ruben review. Retaining them preserves the files referenced by historical database payloads.

The response migration in `content/migrations/2026-10-27-voices.json` contains 16 exact prior audio URLs bound to unchanged exercise revisions. Compatible `q1` answers can move to a `q2` checksum that excludes derived audio URLs. Unknown URLs or changed source fields fail the compatibility check. Active and saved sessions continue to use exercise revisions.

This reviewer authored the history migration and its tests. The parent agent independently reviewed it and reports that its tests pass. A combined run of the audio and history suites passed all 47 tests. This media reviewer does not claim independent review of their own migration changes.

## Listening review remains pending

Pronunciation, pacing, useful pauses, intelligibility, emphasis and audible artefacts remain unchecked by ear. The user's audition preferences apply to the selected voices, not to a full listening inspection of every replacement.

Local technical adoption passes after the transcript repairs and fresh checks of the final hashes, durations and waveforms. This review does not validate CEFR difficulty, an exam format or equivalence with an official exam. The [JSON integrity record](2026-10-27-voice-replacement.json) identifies the exact files and final catalogue, manifest and configuration hashes covered.
