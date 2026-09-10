# Free public Dutch exam practice

Proposal, 9 September 2026. Working name in the mockup: Samen. The name and domain have not been checked. This is a product plan and interface preview; no service has been deployed and no paid API has been called.

## Product decision

Start with A2 and KNM. People can open a public URL, choose a part, and practise without an account. The initial A2 reading pilot felt appropriate to the user; that is useful early feedback, not evidence of equivalent exam difficulty.

Provide all five parts at launch, with different feedback capabilities. Unlimited access to the published question bank, explanations and model answers forms the free core. Recording and replaying one's own answers should also work without purchasing AI feedback. If usage becomes expensive, apply a visible allowance to automated feedback while leaving practice available. Do not promise unlimited hosted AI until it has a funding source.

Make registration optional for synchronising progress across devices. Guest progress stays on the device, with an export and a clear delete control. A guest should reach a question in two choices: exam part, then practice or mock. Keep essential instructions in simple Dutch; offer English help in learning mode. Language support can expand after the core flows are stable.

## Which exams belong here?

| Track | Scope | Order |
| --- | --- | --- |
| A2 | Reading, listening, writing, speaking | First release |
| KNM | Current knowledge-of-society content, organised by official themes | First release after factual review |
| NT2 Programma I, B1 | Separate blueprint for each of the four language skills | Next expansion |
| NT2 Programma II, B2 | Its own materials, timings and rubrics | After B1 |
| ONA, MAP and PVT | Explain what these involve and link to official guidance | Guidance only initially |
| A1 exam abroad and other exam systems | Separate future products if demand exists | Outside the first scope |

KNM is a knowledge component, not a B1/B2 language level. The website should not infer a person's legal requirements from a quick quiz. Point them to Mijn Inburgering and their municipality when they are unsure. ONA, MAP and PVT involve processes beyond taking a multiple-choice practice test. [DUO knowledge components](https://inburgeren.nl/examen-doen/inhoud-kennisexamens.jsp).

For A2, current DUO durations are reading 65 minutes, listening 45, speaking 35, and writing 40 with four writing tasks. Those durations belong to complete exam formats. Our shorter practice sessions get their own clearly labelled estimates. A2 writing is currently pen-and-paper, so offer printable tasks and a handwriting option; typing practice alone does not rehearse that experience. [DUO language exams](https://inburgeren.nl/examen-doen/inhoud-taalexamens-a2-b1-b2.jsp).

## Useful task types and how to evaluate them

| Part | Initial exercise types | Evaluation | Effort |
| --- | --- | --- | --- |
| Reading | Messages, notices, advertisements, short emails, opening hours and simple tables; one-best-answer questions | Fixed keys with passage evidence and explanations | Low software effort; substantial content review |
| Listening | Short phone calls, announcements and dialogues; spoken instructions with text or image answer choices | Fixed keys; transcript and replay revealed in learning/review mode | Medium, mostly audio production and review |
| KNM | Everyday scenarios tied to the current official themes, including image-supported questions | Reviewed keys, explanation, source URL and last factual review date | Medium; continuous maintenance |
| Writing | Fill a form, write a short message, reply to a request or invitation | Completion checklist and several acceptable examples; optional rubric-based AI feedback | Medium; grading requires validation |
| Speaking | Respond to a spoken prompt; describe a situation/picture; use a sequence of pictures to describe events | Local recording/playback and checklist first; transcription plus content feedback next | Medium for recording; higher for dependable feedback |
| Pronunciation practice | Listen and repeat a short phrase, then compare recordings | Optional acoustic assessment, separately labelled | Later experiment |

This is an authoring menu. Before calling a generated form an exam-format mock, map every task type, count and playback rule against the current official practice player. The A2 online item bank has not yet been fully audited. Do not import old speaking multiple-choice tasks merely because an older preparation site contains them. KNM changed in July 2025, which makes content-version tracking necessary. [DUO change notice](https://www.inburgeren.nl/nieuwsberichten/artikel.jsp?cid=tcm%3A94-225285).

## Modes and result screens

**Practice:** short sessions, optional help, audio replay, explanations after checking an answer, and a queue of questions the learner wants to repeat. The learner can slow down audio here. Assistance is recorded so a helped attempt is not counted as an independent assessment.

**Mock exam:** a frozen form, the part's verified time limit and playback behaviour, no hints, and feedback after submission. Do not randomise a fresh uncontrolled set for every mock. Group questions with their source passage and preserve dependent media ordering.

**Review:** show what was answered, evidence for each key and a specific next exercise. Results from fixed-key questions are exact for that exercise. Writing and speaking feedback is an estimate. Display completed tasks and observed errors; avoid invented readiness percentages or promises of passing DUO.

**Speaking study:** users listen to their own answer and compare it with one possible answer. Several answers can be valid. A tutor-style example must not become the single required wording.

## Audio, images and video

Use ElevenLabs as an authoring tool first. Generate each approved script once, listen to the complete output, and store the approved audio alongside its script and voice settings. A CDN serves the saved file to every learner; there is no synthesis call each time someone presses play.

ElevenLabs documents multilingual speech generation and multi-speaker dialogue. Test Dutch voices with Multilingual v2 for stable narration and v3 for short dialogues. Select by intelligibility and natural Dutch delivery in our own sample, not by the provider's general quality claims. [TTS guide](https://elevenlabs.io/docs/eleven-creative/playground/text-to-speech), [supported languages](https://help.elevenlabs.io/hc/en-us/articles/13313366263441-What-languages-do-you-support).

A production asset includes the final audio, exact transcript, speaker labels, duration, licensing record and reviewer approval. Regenerate whenever the script changes. Check spoken dates, negation and numbers particularly carefully. During generation, place answer-bearing details neutrally; exaggerated emphasis can reveal the correct option.

Audio with an original illustration is suitable when all required information is auditory. Some tasks depend on an action sequence or visual detail: use a short storyboard or several stills that preserve that information. A single generic image does not replace all videos. Mark a mock's format limitations where necessary, and use original licensed video later only if validation shows it matters.

Prefer commissioned or generated illustrations whose rights we can document. Avoid arbitrary image-search results. An illustration must not reveal the listening answer unintentionally, and image-choice questions need equally clear, equally detailed alternatives. Plan text descriptions and alternative accessible exercises without revealing an answer before assessment.

## Speaking and writing feedback

Recommended speaking flow:

1. Record locally after an explicit microphone action. Let the learner replay, discard or retry.
2. Offer optional automated feedback with a clear notice before sending audio to a provider.
3. Transcribe using batch STT. ElevenLabs Scribe supports Dutch and supplies word timestamps. [STT documentation](https://elevenlabs.io/docs/overview/capabilities/speech-to-text/).
4. If audio is clipped, silent or unclear, ask for a retry rather than awarding a low language score. When recognition is uncertain, show the transcript for correction in practice mode. A corrected transcript supports text feedback, not a claim about the original spoken performance.
5. Give an LLM the task, rubric, transcript and acceptable response conditions. Require structured feedback: requirement coverage with evidence, one or two useful corrections, and an A2-level example. Learner text is untrusted input and cannot change the rubric or system instructions.
6. Report task completion and language feedback separately from acoustic observations. Transcription systems can normalise learner grammar or successfully decode unclear speech; their output alone cannot validate pronunciation. Do not use exact transcript matching as the score.

Writing uses a similar rubric-driven process without transcription. A grammatical answer that misses the requested action is different from an understandable A2 answer with minor errors. Keep the original wording visible, avoid rewriting everything into advanced Dutch, and make every suggested correction traceable to the answer.

Detailed pronunciation analysis is a later, separate study. Microsoft's pronunciation-assessment language table lists `nl-NL`; that makes it a candidate to test, not proof that its scores match DUO. Begin with known-text read-aloud exercises, evaluate accent fairness, and only then consider free responses. Some adjacent Microsoft language-learning features are English-only, so verify the exact feature. [Dutch pronunciation support](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=pronunciation-assessment).

Avoid a live conversational agent in the first release. Asynchronous responses fit the planned tasks and simplify latency, moderation and cost control. Put STT, TTS and LLM calls behind replaceable server-side provider adapters.

## Keeping the public service free

Public access and an open-source codebase are separate choices. Proposed policy: publish the application source under a permissive licence, and the human-reviewed original question corpus under an appropriate open content licence after a rights review. Official reference files remain excluded. This is a proposal, not an assertion that every generated asset can already be relicensed.

The largest avoidable cost is generating content during learner sessions. Precompute questions, explanations and audio. Fixed-key scoring runs without an LLM. Use hosted AI only when a learner explicitly requests feedback on an individual response.

As checked on 9 September 2026, the ElevenLabs API page lists Multilingual v2/v3 at $0.10 per 1,000 characters and Scribe v2 at $0.22 per audio hour. These rates exclude our other costs; verify the user's actual account entitlements before integration. [API pricing](https://elevenlabs.io/pricing/api).

Illustrative arithmetic, not a monthly quote:

- 100 clips averaging 500 characters = 50,000 characters, about $5 for one generation pass at that TTS rate. Revisions and alternative takes add to it.
- 1,000 learners each requesting ten 30-second transcriptions = 83.3 audio hours, about $18.33 for STT at that rate.
- Add the LLM tokens, hosting, database, storage and media transfer. LLM cost cannot be priced responsibly before choosing a model and measuring real prompts. Use `requests × (input tokens × input rate + output tokens × output rate)` with retries included.

Set a monthly spending cap and measure cost per successful feedback request. Use maximum recording duration, request limits, a job queue and idempotency to control abuse and duplicate charges. When the budget is exhausted, continue serving model answers and self-review. A modest free daily AI allowance is a fallback proposal; its size remains open. Funding could come from the owner, donations or institutional support without restricting access to the core materials.

## Technical shape

A responsive web client presents versioned exercises. A small API handles optional accounts, feedback requests and progress sync. Use SQL for content metadata, attempts and reviews; object storage for audio/images; and a queue for feedback jobs. Keep secrets on the server. No public endpoint should generate arbitrary new exam content.

Keep one reusable exercise renderer with a small number of input and media components: passage, audio, image sequence, choices, form fields, free text and recording. An exam blueprint defines counts, time rules, allowed controls and scoring for a particular level/version. B1/B2 then extend data and rubrics while reusing the interface.

Key records: `ExerciseVersion`, `Stimulus`, `Asset`, `RubricVersion`, `ExamBlueprintVersion`, `ExamFormVersion`, `Attempt`, `Response`, `FeedbackJob`, `ReviewDecision`. Every response retains the exact exercise and rubric version. Store expected answers and feedback authority appropriately for mode; public practice is not a high-stakes secure examination.

Content publishing flow: specification → draft → language/factual review → media review → pilot → publish. A question needs an authoring history, evidence for the answer, explanations for distractors and rights provenance. Retire flawed questions without rewriting historical attempts. Hold out some complete forms from routine practice to reduce memorisation when evaluating readiness.

Choose the hosting platform after agreeing on the prototype. Requirements are public guest access, a custom domain, background jobs, object storage and a hard spend cap. This plan does not require a large framework or a vector database. We can use Sites for deployment if its runtime and public access settings fit these requirements.

## Privacy and accessibility

Default to local recording/playback. Upload only when feedback is requested; show the processor and purpose. Proposed app policy: delete temporary uploaded recordings after the job, within 24 hours, unless the learner chooses to save them. Implement this with a deletion job and verify it. Do not equate app deletion with provider deletion: ElevenLabs currently documents zero-retention STT as enterprise-only. Confirm account retention and training settings before promising anything about provider copies. [STT API retention option](https://elevenlabs.io/docs/api-reference/speech-to-text/convert?explorer=true).

Target WCAG 2.2 AA with keyboard navigation, visible focus, mobile reflow and readable type. No forced audio autoplay. Provide captions/transcripts in learning mode and review; explain when assistance changes exam-like conditions. Save answers through navigation and recover interrupted sessions. Provide useful states for microphone denial, network loss, failed recognition and exhausted AI allowance.

## Delivery sequence and acceptance criteria

| Stage | Deliverable | Exit condition |
| --- | --- | --- |
| 0. Design | Clickable home, reading, listening, writing/speaking feedback and mock setup | User chooses visual direction and evaluates flows |
| 1. Working A2 slice | Existing eight-question reading pilot, guest progress, review; one original listening exercise; local writing and recording | Mobile and keyboard flows work; scoring is correct; sample media reviewed |
| 2. Public core | Reviewed A2 bank and KNM bank, complete forms where blueprint audit is done, model answers, issue reporting | Every published item has review and provenance; incomplete parts labelled honestly |
| 3. AI feedback beta | Optional writing feedback and Dutch STT for speaking | Checked against a human-rated set; failure states and spend controls work |
| 4. Expand | B1, then B2; optional pronunciation experiment | New blueprints, reviewers and learner pilots exist for each scope |

Proposed starting review targets: 100 reading questions, 100 listening questions, 80 KNM questions, 24 writing tasks and 32 speaking tasks. These are capacity estimates, not numbers of completed content or claims of sufficient exam coverage. Audit task distribution before determining how many balanced mock forms the pool supports. Begin with fewer fully reviewed items if necessary.

For AI, collect a consented evaluation set with diverse A2 accents, devices and error patterns. An initial 100-200 answers can expose major failures; it does not establish equivalence. Include unanswered requirements, negation errors, silent audio, valid alternative answers and prompt-injection text. Compare with human judgments, measure false reassurance and excessive correction, and withhold readiness/pass claims until evidence supports them. Agree quantitative release gates with the reviewer before scoring the held-out set.

## Design preview

The conversation preview uses a calm guest-first layout, simple Dutch exercise text and English navigation. It includes local navigation, an answer-checking reading example, a listening layout with a clearly marked audio placeholder, and explicitly labelled sample AI feedback. It never records or uploads audio and makes no API calls. All example results are demonstration states.

The host's design controls offer a warm green palette or a blue palette, a serif reading passage, and roomier or more compact spacing. This helps choose appearance without pretending the production app already exists.

Decisions after review: visual direction, working name, the initial AI spending cap, account/provider settings for ElevenLabs, and who can review spoken Dutch and KNM facts. We can build the guest reading slice while those nonblocking choices are settled.
