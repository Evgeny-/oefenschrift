# Hanneke cleanup: audio technical review

All 16 final clips pass source, encoding and script/transcript checks for local testing. Auditory review remains pending. Only the hashes in [the JSON record](2026-10-27-hanneke-cleanup.json) are covered.

The seven source batches have adopted passing reviews with matching SHA-256 values. I decoded every final staged MP3 and verified its configured voices, speeds, mode, script hash, cache token, duration and fragment waveform. The 23 reused turns from other speakers match both recorded source and destination WAV hashes.

The implementation applies an initial level match, then highpass=f=80,afftdn=nr=12:nf=-42:tn=1:gs=8, followed by level and peak matching again. The filter and after-level-match stage enter the affected clip's cache and manifest. Dialogue mode is rejected for this per-voice processing. The earlier processing-order attempt is outside this approval.

Five supplementary transcripts contain differences: Hanna/Hannah spelling, m-b-o/mbo abbreviation tokenization, or Goede/Goeie in the closing greeting. None adds a filler or changes an answer-bearing fact. The other eleven match after Dutch number/time normalization. Decoded sample peaks range from −3.45 to −1.69 dBFS.

I inspected these files without hearing them. Residual noise, timbre, processing artifacts, pronunciation and perceived quality remain unchecked by ear. The review makes no CEFR or exam-equivalence claim.
