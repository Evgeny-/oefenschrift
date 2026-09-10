# Current implementation, 9 September 2026

The source project is `/Users/evgeny.nikiforov/Projects/inburgering`. The old Documents/ChatGPT path is a compatibility symlink. The service remains local at port 8766 and opens in Firefox.

## Interface and learning flow

React uses a single root, plain CSS and unstyled Base UI primitives. Public Sans is hosted locally with its license. Language and light/dark text controls sit in the sidebar; Back and the level control share the toolbar. Filters reserve the bold label's width. Yellow marks selections, exact answer evidence and inserted words in suggested rewrites.

Speaking follows Record → stop and automatically transcribe → check one editable transcript → Get feedback. Selecting an audio file also transcribes immediately. The recording control explains this processing boundary. The extra transcript card, second transcription, sample insertion and online self-review actions were removed from the main speaking flow. Offline self-review remains available when the grading service is unavailable.

Feedback replaces the answer area with a summary, expandable criteria and an inline word diff. Edit answer restores the text and local recording. The diff compares against the exact submitted answer. Request cancellation prevents stale feedback from replacing newer work. A stable status area shows ongoing work and allows retry on failure. Grading receives the learner's checked text; audio is used only for transcription. Pronunciation assessment is not implemented.

Exercise reports open in a Base UI dialog with keyboard focus handling. They include the exact content revision but never attach an answer or recording. Closed questions reveal reviewer-approved exact evidence after checking; practice tests reveal explanations after completion.

## Content and progress

The catalogue has 77 original exercises: 42 language exercises targeting A2, 27 targeting B1 and eight KNM sets. KNM is independent of the CEFR control. There are 92 closed questions and ten synthetic Dutch listening clips. B2 content remains unavailable. This is independent practice, without validated exam difficulty or official score conversion.

The [content workflow](content-workflow.md) governs new batches. Three batches have independent author/reviewer artifacts with SHA-256 gates. Each of the eight KNM sources was opened and checked against an official Government.nl page. The integration command uses explicit checks even under Python optimization, assigns stable content revisions and replaces the catalogue atomically. Evidence overlays are separately reviewed.

Progress remains in `inburgering.study.v2` and preserves valid older records. Completed closed questions now save selected answers and content fingerprints. Review mistakes offers full-exercise retries for current wrong answers; source or question changes remove stale detail while aggregate history remains. Progress also links to unfinished open-response drafts.

## Providers and privacy

The Python server serves `demo/` only. Same-origin JSON requests, loopback Host validation, payload and rate limits protect the local API. Audio validation checks MIME, signature, audio streams and duration using ffprobe. A temporary validation file is removed after use. Feedback and transcription caches expire after 30 minutes. Reports live in a separate local SQLite database, with an exact matching exercise revision required at submission.

Authorized keys are read on the server from the configured credential file. No keys are copied into browser assets. ElevenLabs supplies the existing Dutch Serge de Beer voice and Scribe v2 transcription. OpenAI GPT-5.4 nano grades answers using strict JSON, no reasoning and `store:false`.

The [model comparison](feedback-latency.md) measured the original direct nano grader at a median 2.60 seconds across three synthetic cases. GPT-4.1 mini did not improve speed in this small sample. A later focused prompt addition passed four fact-preservation checks, including placeholders for missing personal facts. Stylistic overcorrection remains an evaluation concern. These measurements are not a reliability or Dutch-language quality benchmark.

The Privacy page uses a short AI label at the action and provider details in the linked notice. This follows the layered-information approach described by the [EDPB](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en). The local notice does not establish public-service legal compliance. Controller details, legal basis, retention, processing agreements and launch protections remain open decisions.

## Verification

Twelve Node tests cover progress migration, scoring, content, question fingerprints, KNM sessions, exact highlights and diff reconstruction. Eight Python tests cover media validation, report fields and revisions, cache expiry, provider request compatibility, evidence integrity, review gates under `python -O`, and atomic-write failure recovery.

An isolated Firefox profile passed 26 checks across desktop and 390px mobile layouts. The journey covers stable filter widths, sidebar settings, evidence disclosure, correct/incorrect styling, report dialog Escape/focus return, persisted mistakes, KNM at B2 selection, automatic transcription failure recovery, a real ElevenLabs transcript, a real grading response, changed-word markup and restoring an answer after feedback. Microphone capture used a synthetic test device. The real transcription used an existing generated Dutch clip. User microphone quality and accent accuracy remain untested.

Desktop feedback, dark speaking and mobile screenshots were inspected. GET/HEAD boundary checks and a scan of browser assets against configured key values confirm that private configuration, reports and reference files are not served. Nothing has been published.
