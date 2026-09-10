# Dutch voice audition, 10 September 2026

Purpose: choose native Netherlands Dutch voices for multi-voice listening audio, replacing the single narrator used so far. Listen and mark choices on the audition page (artifact "Dutch Voice Audition"); record the result in `config/voices.json`.

## Method

- Candidates: the Dutch professional voices already in the account plus the most used native Dutch voices in the ElevenLabs library (`GET /v1/shared-voices?language=nl`, sorted by usage). Flemish voices and voices with a usage-rate multiplier above 1 were excluded. Library voices can be used directly by ID without adding them to the account.
- Every voice read the same 150-character line (`eleven_multilingual_v2`, `language_code: nl`, stability 0.5, similarity 0.75): "Hallo, met Sanne van de bibliotheek. Uw boeken moeten uiterlijk donderdag terug zijn, maar u kunt ze ook online verlengen. Zal ik dat nu voor u doen?"
- Every clip was transcribed with Scribe v2 (`nld`) and compared with the script (word error rate, no normalisation).
- Two versions of one 72-word dialogue (Marlies and Marcèles) were made: one request to the dialogue endpoint (`eleven_v3`) and per-turn generation stitched with 0.45 s gaps.
- Samples and the generator are in `var/voice-samples/` (ignored by git); cost about 3,500 characters of the monthly quota.

## Results

| Voice | ID | Duration of the line | WER |
| --- | --- | ---: | ---: |
| Roos | 7qdUFMklKPaaAVMsBTBt | 7.3 s | 0 |
| Emma | OlBRrVAItyi00MuGMbna | 9.5 s | 0 |
| Marlies | mNOlrB5V39qx4wQwSjG3 | 11.3 s | 0 |
| Jennifer | D6MRWCKoavI2xUJXmaCb | 8.4 s | 0 |
| Leonie | 7kJ33vnB1HkX76L4U5km | 7.9 s | 0 |
| Hanneke | tfweP7lGJyLeNV9dH1Rm | 9.2 s | 0 |
| Chloe | 1qEAoMPNMshP2ZjYIKup | 9.0 s | 0 |
| Annelise | oIOmkwCWrZas3A06ucag | 8.1 s | 0 |
| Serge de Beer (current narrator) | UNBIyLbtFB9k7FKW8wJv | 8.5 s | 0 |
| Marcèles | fzC7H9Y1bPn3gzVLtghe | 7.8 s | 0 |
| Eric Sijbesma | AVIlLDn2TVmdaDycgbo3 | 7.6 s | 0.148 |
| Arjen | 62klqbsYqbynbr66ypRt | 9.7 s | 0 |
| Jerry | gdTrLNuwWUaxC0z5n1j7 | 11.7 s | 0 |
| Nick | 6kGjm3FeadxmRCkt22Pc | 8.5 s | 0 |
| Jaimie | hLnc7y4d152WGG2BQlAY | 8.5 s | 0 |
| Wilco | KMO1oZ40uZdePc9to9nC | 7.3 s | 0 |
| Peter | 60CwgZt94Yf7yYIXMDDe | 8.5 s | 0 |
| Robert | cblS8WYNsiBLGnlV6jjx | 8.2 s | 0 |

Dialogue: `eleven_v3` 30.2 s, WER 0.028; stitched `multilingual_v2` 30.7 s, WER 0.042 (both differences are transcription variance such as "hij" heard as "die").

## Findings

- Eric Sijbesma's clip begins "Nou ja, hallo, uh, met Sanne" — words that are not in the script. Excluded; the round-trip check in `scripts/audio.ts` blocks this class of failure automatically (longest run of inserted words ≥ 2).
- Pace differs by 60% between voices for the same line. Slow, clear voices (Marlies, Jerry, Arjen, Emma, Hanneke) suit A2 fragments; the faster ones (Roos, Wilco, Marcèles, Leonie) sound like natural B1 speech.
- Both dialogue methods are intelligible. The dialogue model gives more natural turn-taking in one request; stitching gives per-turn files, cheaper retries and deterministic timing. `scripts/audio.ts` supports both (`audioMode: "stitched" | "dialogue"` on the item).
- Quota: the Starter plan (≈72,000 characters per month) is enough for an A2 listening launch bank with question audio in one month; the B1 bank needs a second month or an upgrade.

## Decision

Pending the user's marks on the audition page. Fill `config/voices.json` roles from the marks; keep at least two female and two male voices with different ages, plus the narrator.
