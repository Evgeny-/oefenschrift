# Interface refinement, 10 September 2026

The screenshot showed competing text sizes, staggered sidebar alignment and too much pale yellow across active controls. A slogan and a second progress summary made the sidebar busier without helping navigation. Hovering a navigation item could also resemble a second selected page.

The stylesheet now defines four sizes: 14px for interface/supporting text, 16px for exercise content, 20px for section headings and the wordmark, and 28px for page headings and the result total. It uses the real 400/600 Public Sans faces. The previous CSS contained several overlapping sets of size and spacing overrides; those were replaced with one organised stylesheet.

The sidebar has a single text alignment and two navigation groups, with language and theme settings arranged as two rows at the bottom. The slogan and duplicate progress counter were removed. All destinations and settings remain available. Active navigation uses a restrained olive tint and short marker. Hover changes text colour without introducing another filled row.

The main accent is deep olive (#4d603e), with sage controls in dark mode. Yellow remains for source evidence, browser text selection and inserted words. Input borders were darkened after a contrast check. The light primary button has a 6.87:1 text contrast ratio; secondary text has 5.50:1 against the page surface.

Firefox checks covered desktop, a 900px compact viewport and 390px mobile. The checks confirmed consistent control sizes, fixed filter widths, one active navigation item, accessible sidebar settings, evidence highlights, dialog Escape/focus return and a simulated feedback failure that retained the answer. Light/dark Progress, reading, speaking, dialog and mobile screenshots were inspected. No provider requests were needed for this visual change.
