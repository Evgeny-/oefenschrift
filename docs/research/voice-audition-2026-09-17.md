# Dutch voice audition, 17 September 2026 (recording quality)

Purpose: the user heard poor recording quality on the `m-young` voice (Nick) in the pharmacy conversation of set a2-listening-09 and asked for a review of every voice in use plus a search for Dutch voices with a professional recording. Listen and mark on the audition page (artifact "Studio Voice Audition", https://claude.ai/artifact/A9mVJRBLL3MFGuPfF37Lrq); the marks are saved to the page's store (`picks/voices3`) and to `config/voices.json` once decided.

## What the library offers

- The ElevenLabs Voice Library carries a **Studio Quality** badge (API: `category: "high_quality"`, the black tick in the web app): "voices that have been recorded with proper equipment, mixed well, and tested to be free from most audio problems such as reverb/echo, distortion, or other artifacts". A plain **Professional Voice Clone** (`category: "professional"`, yellow tick) has no such check.
- Native Netherlands Dutch voices (primary language `nl`, not Flemish): 109 in the whole library on 17 September 2026, of which 32 carry the Studio Quality badge. Only 23 of the 109 are women.
- Of the nine voices in use, only Hanneke (`tfweP7lGJyLeNV9dH1Rm`, listed as "Marianne - Senior Dutch voice") has the badge. Nick, Roos, Esmee, Serge de Beer, Peter, Robert, Arjen and Jerry are plain professional clones.

## Method

- Library scan: `GET /v1/shared-voices?language=nl` in several sorts and splits (the unsorted listing is capped at 3,200 of 5,239 voices verified for Dutch); `library.json` holds the metadata of all 5,239.
- Candidates: every unused native Studio Quality voice (31, five of them with a ×2 or ×3 credit multiplier, flagged on the page) plus the 14 most-used plain professional natives not heard before. Excluded: Flemish voices, the four rejected on 10 September (Eric Sijbesma, Marlies, Emma, Jennifer) and the eight auditioned then but not chosen.
- Every voice read the same 208-character line with the production model and settings (`eleven_multilingual_v2`, `language_code: nl`, stability 0.5, similarity 0.75, style 0, speaker boost, speed 1.0), requested as `mp3_44100_192`, level-matched by a constant gain to −18 LUFS (peak-limited at −1.5 dBTP) and encoded once to 44.1 kHz MP3 at 320 kbps. "Goedemiddag, u spreekt met de bibliotheek. Uw boeken moeten uiterlijk donderdag terug zijn. Maar u kunt ze ook online verlengen, dat kost niets. Zal ik dat nu voor u doen? Dan stuur ik u straks een berichtje."
- Extras: Nick with similarity 0.45, Nick without speaker boost, Nick and Serge from a 24 kHz PCM source (the format the production script falls back to, see below).
- Objective scores per clip (`metrics.py`, Python 3.12 venv with `speechmos`): DNSMOS P.835 (SIG/BAK/OVRL, P.808), noise floor (level of the quietest 3 % of 50 ms frames, dBFS), energy above 12 kHz relative to the whole clip, envelope tail after word offsets (ms to fall 20 dB), and a Scribe v2 round trip (WER, longest run of inserted words).
- Cost: about 12,100 characters of the monthly quota (the key is on the Creator plan, 396,000 characters per month). Samples, scripts and results are in `var/voice-samples/2026-09-17/` (ignored by git).

## Findings

- The metrics agree with the complaint. On the production clips, Nick's carry about 20 dB more energy above 12 kHz than every other voice (−17 to −25 dB against −35 to −46 dB) and the lowest DNSMOS background score among the men; on the audition line Nick has a noise floor of −55 dBFS (studio voices: −65 to −90) and −19 dB above 12 kHz. Lower similarity or no speaker boost changes none of this: the noise is part of the clone.
- Roos (−50 dBFS) and Hanneke (−51 dBFS) have the highest noise floors of the voices in use; both are quiet voices whose level the pipeline raises by 10–14 dB, noise included. Esmee, Serge de Beer and Peter measure clean (−72 to −90 dBFS).
- Roland (`h6uBOiAjLKklte8hdYio`) inserts "uh" and "uhm" that are not in the script, the same failure as Eric Sijbesma; added to the exclusion list. Every other clip transcribed back exactly (Noa 94W4… says "goeiemiddag", which is pronunciation, not a script change).
- Studio-quality candidates that measure cleanest, by DNSMOS overall: men Daan (3.62), Peter de Ruiter (3.57), Lars (3.57), Victor (3.52, ×3), Marti (3.51), Bram (3.49), James (3.49, ×3), Giovanni (3.49); women Noa 94W4… (3.42), Lieke (3.39), Ruth ×2 (3.39), Ruth yO6w… (3.37), Jasmijn (3.33), Anne (3.32), Jolanda (3.31, plays quieter because of a peak). No studio-quality native voice is labelled as an older woman; Hanneke remains the only senior female voice.
- DNSMOS differences under about 0.15 are generation noise (two generations of Serge de Beer scored 3.35 and 3.05).

## Production chain finding

The ElevenLabs key is now on the **Creator** tier. `pcm_44100` is refused ("only available on the Pro tier and above"), so `scripts/audio.ts` falls back to `pcm_24000` as designed, and every clip generated since the plan changed has no content above 12 kHz. `mp3_44100_192` is allowed on this tier: full bandwidth, one extra lossy encode. The audition page has A/B pairs (Nick, Serge) to judge whether the missing top octave is audible; the manifest does not record the source format, so which production clips are affected can only be told from the spectrum.

## Results

| Voice | ID | Group | Badge | Overall | Noise floor | Top end | Tail | WER | Ins. |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Peter (presenter) | 60CwgZt94Yf7yYIXMDDe | current | pro | 3.52 | -72.3 | -37 | 65 | 0 | 0 |
| Robert (m-adult) | cblS8WYNsiBLGnlV6jjx | current | pro | 3.48 | -66.8 | -46.8 | 165 | 0 | 0 |
| Jerry (m-shop) | gdTrLNuwWUaxC0z5n1j7 | current | pro | 3.46 | -58.1 | -35.9 | 180 | 0 | 0 |
| Nick (m-young) | 6kGjm3FeadxmRCkt22Pc | current | pro | 3.44 | -55.2 | -19 | 165 | 0 | 0 |
| Nick [sim45] (m-young) | 6kGjm3FeadxmRCkt22Pc-sim45 | current | pro | 3.37 | -55.3 | -18.4 | 170 | 0 | 0 |
| Serge de Beer (narrator) | UNBIyLbtFB9k7FKW8wJv | current | pro | 3.35 | -90.4 | -36.4 | 145 | 0 | 0 |
| Nick [pcm24] (m-young) | 6kGjm3FeadxmRCkt22Pc-pcm24 | current | pro | 3.34 | -55.6 | -50 | 160 | 0 | 0 |
| Esmee (f-adult) | TuUL8QNimlzrTWC5Op2c | current | pro | 3.30 | -85.1 | -28.7 | 140 | 0 | 0 |
| Roos (f-young) | 7qdUFMklKPaaAVMsBTBt | current | pro | 3.21 | -49.6 | -28.4 | 120 | 0 | 0 |
| Nick [noboost] (m-young) | 6kGjm3FeadxmRCkt22Pc-noboost | current | pro | 3.20 | -54.2 | -19.4 | 170 | 0 | 0 |
| Arjen (m-older) | 62klqbsYqbynbr66ypRt | current | pro | 3.19 | -67 | -33.3 | 160 | 0 | 0 |
| Serge de Beer [pcm24] (narrator) | UNBIyLbtFB9k7FKW8wJv-pcm24 | current | pro | 3.05 | -67.1 | -57.3 | 150 | 0 | 0 |
| Hanneke (f-older) | tfweP7lGJyLeNV9dH1Rm | current | studio | 3.04 | -51 | -33.4 | 305 | 0 | 0 |
| Daan | SFlhmoT9q6x81D3fl3dp | studio | studio | 3.62 | -71.8 | -38.2 | 90 | 0 | 0 |
| Lars | zSAOIn3zf2OdODzepYyA | studio | studio | 3.57 | -76.4 | -30 | 170 | 0 | 0 |
| Peter de Ruiter | Kv97WYcYaIv0A06FfXcK | studio | studio | 3.57 | -71.9 | -38 | 260 | 0 | 0 |
| Victor | vEJ3qtg3sMsfnn5mIDnG | studio | studio ×3 | 3.52 | -60.2 | -48 | 60 | 0 | 0 |
| Marti | O6T1kBrE24M8XXmkSWaO | studio | studio | 3.51 | -75.3 | -40.6 | 80 | 0 | 0 |
| Bram | 2GJZCZIWrWiGFDntCFaz | studio | studio | 3.49 | -85.6 | -29.1 | 60 | 0 | 0 |
| Giovanni | G9lzzm05bGAXnuymdcqF | studio | studio | 3.49 | -70.4 | -39.5 | 170 | 0 | 0 |
| James | G53Wkf3yrsXvhoQsmslL | studio | studio ×3 | 3.49 | -87.3 | -43.9 | 40 | 0 | 0 |
| Richard | eQIVHCAcQuAFeJps0K5l | professional | pro | 3.45 | -63 | -36.4 | 180 | 0 | 0 |
| Thijs | DYfqtQfWhbc1Z0SLiCWw | studio | studio | 3.43 | -90.6 | -30.3 | 90 | 0 | 0 |
| Bart | gCJROUe9eMZaWlhNj1z0 | studio | studio | 3.43 | -68.3 | -40 | 90 | 0 | 0 |
| Noa | 6e6TrJGLhrDGMKOy5x2i | studio | studio | 3.42 | -65.4 | -25.3 | 140 | 0 | 0 |
| Chris | XGJi1nDzsnoajt8kevuG | studio | studio | 3.41 | -90.7 | -28.2 | 70 | 0 | 0 |
| Ramon | QkkCTFipKAsDWEnEuFkb | studio | studio | 3.40 | -78.5 | -48.6 | 100 | 0 | 0 |
| Bernard | RRH9oZEaBFwuWBWtFxC4 | studio | studio | 3.40 | -90 | -47.5 | 40 | 0 | 0 |
| Lieke | kZQ3IGqYUStQ8u1Y62s6 | studio | studio | 3.39 | -83.5 | -25.5 | 40 | 0 | 0 |
| Ruth | yO6w2xlECAQRFP6pX7Hw | studio | studio | 3.39 | -80.1 | -27.2 | 30 | 0 | 0 |
| Vincent | 49dczJmfGX7RoeudoOPi | studio | studio | 3.38 | -66.7 | -41.4 | 110 | 0 | 0 |
| Ruth | YUdpWWny7k5yb4QCeweX | studio | studio ×2 | 3.37 | -82.1 | -26.4 | 30 | 0 | 0 |
| Dean | NZxSzTQSMSWwkdFLuZsv | studio | studio | 3.36 | -65 | -48.2 | 120 | 0 | 0 |
| YME | lyMhRNSScIYS9YRQitfK | studio | studio | 3.36 | -72.8 | -18.5 | 70 | 0 | 0 |
| Koen | jfwdd64Nlhnj6vcFqRHZ | studio | studio | 3.36 | -74 | -31.6 | 60 | 0 | 0 |
| John | Jn7U4vF8ZkmjZIZRn4Uk | professional | pro | 3.36 | -90.5 | -29.1 | 100 | 0 | 0 |
| Dirk | ARIOBKJtltx2F7r1TMzI | professional | pro | 3.35 | -81 | -34.1 | 100 | 0 | 0 |
| Arno Drost | GiGOaehga8enaTnFQvb4 | studio | studio ×2 | 3.34 | -77.9 | -28.5 | 150 | 0 | 0 |
| Eric | vY9oBYvK4JJ9fCOB5lmn | professional | pro | 3.34 | -90.3 | -29.8 | 70 | 0 | 0 |
| Tom Smit | 4lUd3J8K9ufxisvqDzR0 | professional | pro | 3.34 | -70.4 | -40.7 | 110 | 0 | 0 |
| Joanne Zwolgen | 7OMIHDA6SHxNlNDgPRdB | professional | pro | 3.34 | -67.8 | -31.1 | 130 | 0 | 0 |
| Jasmijn | PWSsuWP2rj5xoCLT1qsQ | studio | studio | 3.33 | -59.2 | -33 | 50 | 0 | 0 |
| Thomas | tvFp0BgJPrEXGoDhDIA4 | studio | studio | 3.33 | -68.3 | -34.4 | 105 | 0 | 0 |
| Anne | 46eAUFOjYHnAbq9XpWMc | studio | studio | 3.32 | -65.1 | -23.3 | 40 | 0 | 0 |
| Jolanda | DiUBVrSFwkMaPz4XqWvR | studio | studio | 3.31 | -61.8 | -31.9 | 240 | 0 | 0 |
| Bastiaan | YRORJcvMnpUiBrb18YEJ | professional | pro | 3.31 | -56.5 | -31 | 220 | 0 | 0 |
| Tijs | YgjXqgzBJa9op0K278OW | professional | pro | 3.29 | -57.4 | -37.8 | 170 | 0 | 0 |
| Daniel Wichers | UdwnkJaZxPCOeR3qITvA | professional | pro | 3.28 | -78.3 | -69.2 | 80 | 0 | 0 |
| Noa | 94W4cf0CMSgymY1uoRiX | studio | studio | 3.26 | -63.6 | -44.1 | 110 | 0.027 | 0 |
| Eric Pro | DUhjXXCXHQWckglMUnOv | studio | studio ×3 | 3.25 | -70 | -28.7 | 60 | 0 | 0 |
| Ido | dLPO5AsXc3FZDbTh1IKa | studio | studio | 3.23 | -64.3 | -31.8 | 60 | 0 | 0 |
| Fenna | p4efl2GlWK0o6sAQEEkp | studio | studio | 3.19 | -74.3 | -33.7 | 150 | 0 | 0 |
| Hugo V | rbqBOMK4BPTMGvIB7N8w | professional | pro | 3.16 | -85.2 | -29.8 | 180 | 0 | 0 |
| Willem | yBtEjlHaWNu9xrYohjbA | professional | pro | 3.16 | -52.1 | -33.5 | 170 | 0 | 0 |
| Roland | h6uBOiAjLKklte8hdYio | professional | pro | 3.15 | -57 | -41.5 | 145 | 0.081 | 1 |
| Melanie | SXBL9NbvTrjsJQYay2kT | studio | studio | 3.14 | -65.5 | -47.3 | 85 | 0 | 0 |
| Timmermans | L757MWWEO8SYJccYP8lT | professional | pro | 3.12 | -53 | -42.1 | 240 | 0 | 0 |
| Lucas | T6sdx9oLQ9xfxeKIi6AM | professional | pro | 3.08 | -90.9 | -38.6 | 125 | 0 | 0 |

Overall: DNSMOS OVRL (1–5). Noise floor: dBFS. Top end: energy above 12 kHz in dB relative to the whole clip. Tail: ms. Ins.: longest run of inserted words in the round trip.

## Decision

Pending the user's marks on the audition page.
