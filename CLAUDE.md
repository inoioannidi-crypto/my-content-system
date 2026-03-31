# my-content-system

A personal content system for drafting and reviewing Workable content against brand voice guidelines.

## Project Structure

```
my-content-system/
├── CLAUDE.md          # These instructions and writing rules
├── memory.md          # Running project memory and key decisions
└── skills/
    ├── tone-checker.md  # Skill: check and align content tone
    └── learn.md         # Skill: capture learnings and update memory
```

## Workflow

1. Draft content in context or in files under this project
2. Run `/tone-checker` to review tone consistency before finalizing
3. Run `/learn` after any session that produces new decisions or patterns worth keeping

---

## Brand Voice Rules

### Core Voice (always applies)

- **Empathetic yet Professional** — Acknowledge user needs without losing confidence
- **Innovative yet Practical** — Forward-looking ideas, but always actionable
- **Transparent yet Concise** — Say what you mean, cut what you don't need

### Writing Values (testable on every piece)

1. **Simple** — Use plain, everyday language. If a new user wouldn't know the word, replace it.
2. **Direct** — No filler phrases. No "In this post, I will..." Get to the point.
3. **Efficient** — Every sentence should help the user move toward their goal. If it doesn't, cut it.

---

## The 7 Writing Rules

### Rule 1: Lead with what matters most
- Put the most important information first
- Use short sentences
- Remove anything that doesn't help the user complete their task
- **Test:** Can you cut the first sentence without losing meaning? Then cut it.

### Rule 2: Focus on actions
- Make the required action clear immediately
- Match the verb in the title and the CTA (e.g., "Start review cycle" → button says "Start review cycle", not "Confirm")
- All available actions must be distinct and unambiguous
- **Test:** Does the CTA verb match the title verb?

### Rule 3: Sound simple, not smart
- Avoid adverbs, unnecessary adjectives, and acronyms
- Don't invent new words when a common one exists
- Avoid Workable-specific jargon with users who may not know it (e.g., "AI Recruiter", "auto-source")
- **Test:** Would a brand-new user understand every word without a glossary?

### Rule 4: Write the way you speak
- Read your writing aloud. If it sounds stiff, rewrite it.
- Use contractions: "we've", "you're", "can't", "it's"
- **Test:** Would you actually say this sentence in a conversation?

### Rule 5: Be positive and solution-focused
- When something goes wrong, lead with the fix — not the problem
- Celebrate achievements where appropriate, but sparingly
- Never blame the user. Avoid "you did" / "you didn't"
- Avoid "Oops", "Whoops", or cutesy error language
- **Test:** Does the message tell the user what to do next?

### Rule 6: Use active voice
- Make clear who is doing the action
- Refer to the company as "Workable" or "we" — not "the system" or passive constructions
- **Test:** Can you answer "who is doing this?" from the sentence?

### Rule 7: Match personality to context
- **Use warmth** in: onboarding flows, empty states, tooltips, success messages
- **Use clarity only** in: flash messages, error messages, form labels, CTAs
- **Test:** Is this a moment of user frustration or achievement? Match accordingly.

---

## Grammar & Style Rules (testable)

### Language
- US English throughout (analyze, honor, canceled, canceling, cancellation)
- Use "resume" not "CV"
- Use "email" (one word, no hyphen)
- Use "dropdown" (one word, no hyphen)
- Use "wifi" (lowercase, no hyphen)
- Use "healthcare", "website", "white paper", "skill set", "co-worker", "rehire"

### Capitalization
- **Sentence case** for most UI: page titles, buttons, menu items, roles, settings
- **Title case** only for: branded Workable features (Video Interviews, Hiring Plan), marketing page titles, formal job titles as proper nouns
- **ALL CAPS** only when required by design (navigation tabs, pills)

### Numbers & Symbols
- Always use numerals: "3 plans", not "three plans"
- Use commas in large numbers: 21,568
- Use decimal points, not commas: 558.50 USD
- Always use % not "percent"
- Use "200 USD" format, not "$200"
- Use Oxford comma in all lists of 3+

### Punctuation
- **Full stops:** Use in descriptions, errors, multi-sentence copy. Do NOT use on buttons, headings, or bullet point items.
- **Exclamation marks:** Only when the user is genuinely excited. Max 1. Never on errors or neutral confirmations.
- **Ellipsis (...):** Only for loading/transitional states (Loading…, Generating…)
- **Dashes:** Avoid in body copy. Use en dash (–) with no spaces for number ranges (10–15). Use en dash with spaces for time ranges (09:00 AM – 05:00 PM).
- **Ampersands:** Use "and" in body text. Use "&" only when space is tight (buttons, table headers).
- **Brackets:** Avoid for sub-clauses. OK to expand unknown terms (ATS (Applicant Tracking System)).

### Dates & Times
- Full date: September 13, 2021 (Month DD, YYYY)
- Short date: Sep 13, 21 (MMM DD, YY)
- Never: 09/12/24 (ambiguous)
- Time: 12-hour format, capitalized AM/PM with a space: 04:00 PM, 07:38 AM EST

### Word choices
- Use "your" not "my" (e.g., "Your profile", not "My profile")
- Use "view" not "see" for instructions
- Use "choose" for conceptual decisions; "select" for UI controls and dropdowns
- Use "edit" when modifying existing data; "change" when switching between options
- Use "For example" in body copy; "e.g." only in tight UI spaces (lowercase, no colon)
- Never use "etc." — list up to 3 examples explicitly
- Never use "click" — use "select" (device-agnostic)
- Never use "pick" (too informal)

### Bullet points
- One sentence per bullet
- No capital letter at start, no punctuation at end
- Each bullet must complete the sentence that introduces the list

---

## Tone by Context

| Context | Tone |
|---|---|
| Product UI & Microcopy | Clear, instructive, supportive |
| Marketing Copy | Engaging, persuasive, confident |
| Help Center & Support | Reassuring, empathetic, solution-focused |
| Error Messages | Clear, constructive, action-oriented — never blaming |
| Emails & Notifications | Friendly, concise, informative |
| Onboarding / Empty States | Warm, encouraging, personality allowed |
| Flash Messages | Functional only — no personality, no "Success!" |

---

## Skills Reference

- `/tone-checker` — Reviews content for tone, voice, and style consistency against these rules
- `/learn` — Captures session insights into `memory.md`
