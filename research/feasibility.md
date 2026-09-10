# Can we create dependable original practice exams?

Assessment dated 9 September 2026.

Creating an initial practice set is manageable. Producing several dependable mock exams requires editorial work by someone who knows NT2 assessment. Establishing comparable difficulty requires learner evidence. We should initially describe the material as practice targeting a level, with the degree of validation recorded for each item.

## Material collected

The [official NT2 download catalogue](https://oefenexamensnt2.nl/facet-openbaar-portaal/examens-downloaden) supplies 24 papers: four skills at two levels across 2023, 2024 and 2025. Each has a question booklet and marking model. Listening and speaking also have media archives.

Downloaded locally:

| Material | Count |
| --- | ---: |
| NT2 question booklets | 24 PDF files |
| NT2 marking models | 24 PDF files |
| NT2 media archives | 12 ZIP files |
| A2 writing practice booklets | 3 PDF files |
| Total | 63 files, 635,185,988 bytes |

All 51 PDFs opened successfully, comprising 748 pages. Text was extracted locally. All 12 ZIP files passed CRC checks; together they contain 395 entries, which include directory entries and other archive metadata. The media have not all been played or transcribed. Text extraction can miss diagrams and image-based options, so it is not a complete question database.

The twelve A2/KNM online tests are recorded as links. Their contents have not been downloaded. The separate NT2 individual-task bank is also outside this download batch. This collection is not claimed to reproduce the commercial provider's exact 35-set research sample.

## What the reference material tells us

The 2025 B1 reading booklet specifies six texts, 35 questions and 110 minutes. The first five texts require reading the passage; the final text is for looking up information. Its marking model specifies the distribution of questions over domains and text types. I visually inspected the instruction page and the model's content-summary page, alongside extracted instructions and rubrics for the other B1 skills.

The 2025 B1 writing model distinguishes sentence tasks, completion of a short message, and writing a short text. It scores task completion and language using different scales for these task types. B1 speaking needs its own rubric, timing, stimulus media and audio-quality checks. Listening additionally requires control over delivery speed and the amount of information a learner must remember after one playback.

These observations give us a useful design specification. They do not tell us how difficult a newly written question will be for learners.

The official marking models explicitly explain that raw pass thresholds vary because examinations differ in length and difficulty. Their score tables belong to those papers. Copying a table into a new mock would not establish a valid official score. The [official assessment explanation](https://www.staatsexamensnt2.nl/examen-doen-en-uitslag/beoordeling) and [Council of Europe guidance on relating tests to the CEFR](https://www.coe.int/en/web/common-european-framework-reference-languages/relating-examinations-to-the-cefr) are useful references for designing validation.

## Authoring and validation workflow

1. Annotate the references by skill and level. Record task purpose, passage length, vocabulary demands, inference depth, distractor logic, timing and any visual requirements. Keep paper-level metadata separate from question-level records.
2. Write specifications that describe what a learner must do. Create new scenarios and source passages to satisfy those specifications. Changing names or substituting synonyms in an official item does not establish originality, and can change its difficulty.
3. Generate an initial pool larger than the intended exam. For each item, require an answer, the evidence that supports it, and an explanation of why every distractor fails. Screen for ambiguity and answer-position clues.
4. Have an NT2 teacher review Dutch usage, task fit and plausible difficulty. Check new content for similarity to reference items. For KNM, separately check factual answers against current official sources.
5. Pilot with learners at the intended level and nearby levels. Record correctness, completion time, skipped items and which distractors they choose. Avoid using an official paper a participant has already memorised as a comparison measure. A small pilot can expose bad items; strong equivalence claims need a larger, deliberately designed study and assessment expertise.
6. Revise items and assemble complete forms with comparable coverage. Publish only the validation claims the evidence supports. Any AI writing or speaking feedback must also be checked against human ratings.

## Planning estimate

These are rough effort estimates for a narrow initial scope with AI assistance and access to an NT2 reviewer. They are not delivery commitments.

| Scope | Estimated effort or elapsed time |
| --- | --- |
| Download and organise the published files | Completed in this session |
| One full draft reading mock at one level | Roughly 1-3 working days including an editorial pass |
| A reviewed starter collection at one level, across all skills | Roughly 2-4 weeks, depending on reviewer availability and media production |
| Credible evidence of comparable difficulty | Several weeks to months, largely dependent on participant recruitment and revisions |

Starting with one reading level keeps answers directly checkable against a passage. Expanding simultaneously across A2, B1, B2 and KNM would multiply the review and maintenance work. The software for presenting tests can be modest; reliable content and defensible feedback determine the workload.

## First original pilot

[B1 reading pilot 001](../pilots/b1-reading-001.md) contains eight original questions across three passages, with a machine-readable [JSON version](../pilots/b1-reading-001.json). The passages contain 683 whitespace-delimited words. They exercise reasons, conditions, time-dependent rules and finding information. The scenarios were written independently; they are not line-by-line rewrites of official questions.

The set is deliberately limited to demonstrate the authoring structure. It does not reproduce the full official distribution of text types or domains. Its target level and suggested 25-minute duration are editorial estimates. An exhaustive originality audit, teacher review and learner testing remain outstanding. It has no pass mark and no conversion to the official NT2 scale.

## Personal study and future publication

Downloaded reference content stays under `reference-private/`, excluded from Git together with extraction and rendering intermediates. The [NT2 portal's copyright notice](https://oefenexamensnt2.nl/facet-openbaar-portaal/veelgestelde-vragen#auteursrecht) permits personal study copies under its stated conditions and requires written permission for broader reproduction and publication. This local collection does not resolve rights for a later service. The intended original collection should have its own rights review before release.
