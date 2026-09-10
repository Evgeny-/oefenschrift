# Shared audio player and restored layout

The user rejected the separate header, full-width shell, gray sidebar, active-menu markers and inconsistent settings arrangement. The app again uses a centered sidebar-and-content shell capped at 80rem. The sidebar shares the page background and highlights the active subject through text weight. Language and theme both place their labels above aligned controls. The centered footer occupies one row on desktop and wraps when necessary on smaller screens. These preferences replace the earlier full-width direction in DESIGN.md.

Speaking recordings and uploaded audio now use AudioPlayback, the same component as listening exercises. It provides playback, a seekable waveform, elapsed/total time and three fixed-width speed choices. Learner audio omits the listening player's synthetic-voice caption. Starting another recording pauses the previous preview. Replacing the recording resets playback state and revokes the old object URL; stale decode results cannot overwrite the new clip.

Waveforms are calculated in the browser from the complete local Blob, using OfflineAudioContext.decodeAudioData. The decoded channels produce 64 equal-time RMS energy bins, normalized to the recording's maximum. Squaring samples before combining channels avoids stereo phase cancellation; silence remains zero. This adds no network requests. The decoded duration also handles recordings whose media metadata is missing or infinite. When the waveform cannot be decoded, ordinary audio playback and a visible seek bar remain available.

Browser API reference: [MDN decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData). Decoding requires complete audio data and may reject unsupported formats; the existing transcription upload is independent of waveform generation.

## Verification

`npm run build` and `npm test` passed with 16 JavaScript and nine Python tests. New signal tests cover pauses, relative energy, the final audio samples, stereo phase cancellation and silence.

Firefox checks used an isolated profile and a synthetic microphone. Transcription was stubbed to avoid paid calls. Twenty browser checks covered the restored layout, single-row desktop footer, settings alignment, actual waveform shape from a test signal, seeking, speed and language changes, decoding failure, replacement recordings, mobile overflow and existing listening playback. Four focused follow-up checks verified infinite-duration fallback, Dutch theme-label spacing, the narrow layout and compact-sidebar settings visibility. Screenshots were inspected at desktop and mobile sizes; a real Dutch sample produced the final waveform preview.

No learner recording or browser data was used or cleared during testing. The updated service remains local at http://127.0.0.1:8766/.
