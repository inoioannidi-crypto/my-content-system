/**
 * Populates Sanity with Workable content design system guidelines.
 * Sourced from:
 *   - DES-Tone of Voice (intro + voice traits)
 *   - DES-Tone of Voice - Overview (7 writing rules)
 *   - DES-Tone of Voice - UX text patterns (content types)
 *   - DES-Grammar and style guide (grammar fields)
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/import-guidelines.js
 *
 * Get a token: sanity.io/manage → project → API → Tokens → Add API token (Editor role)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cvggucp0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// ─── 1. Brand Voice ───────────────────────────────────────────────────────────

async function importBrandVoice() {
  await client.createOrReplace({
    _id: 'brand-voice',
    _type: 'brandVoice',
    core: [
      {
        _key: 'empathetic-professional',
        trait: 'Empathetic, yet Professional',
        description:
          "We understand our users' needs and frustrations while maintaining a level of professionalism that instills confidence.",
      },
      {
        _key: 'innovative-practical',
        trait: 'Innovative, yet Practical',
        description:
          'We develop cutting-edge solutions but always ensure they are user-friendly and actionable.',
      },
      {
        _key: 'transparent-concise',
        trait: 'Transparent, yet Concise',
        description:
          'We communicate openly, clearly, and efficiently, without unnecessary complexity.',
      },
    ],
    values: [
      {
        _key: 'simple',
        name: 'Simple',
        description: 'We use plain, everyday language that is easy to understand.',
      },
      {
        _key: 'direct',
        name: 'Direct',
        description: 'We communicate clearly, avoiding unnecessary words or jargon.',
      },
      {
        _key: 'efficient',
        name: 'Efficient',
        description: 'We help users accomplish their tasks quickly and without confusion.',
      },
    ],
    body: [
      ptBlock('What our voice sounds like', 'h2', 'bv-h1'),
      ptBlock(
        "Workable speaks clearly and confidently. We're knowledgeable without being stuffy, friendly without being casual. Our voice stays consistent whether we're onboarding a new user, showing an error, or sending a billing email.",
        'normal',
        'bv-p1'
      ),
      ptBlock('Applying the voice', 'h2', 'bv-h2'),
      ptBullet('Read your copy aloud — if it sounds like a legal document, simplify it', 'bv-b1'),
      ptBullet("Check that you lead with what matters to the user, not to Workable", 'bv-b2'),
      ptBullet('Prefer "you" and "we" over passive constructions', 'bv-b3'),
      ptBullet('Match warmth to context: more in onboarding, less in flash messages', 'bv-b4'),
      ptBlock('The voice in practice', 'h2', 'bv-h3'),
      ptDoAndDont(
        'Your account is ready. Start adding your team.',
        'The account setup process has been completed successfully.',
        'bv-dd1'
      ),
      ptDoAndDont(
        'Something went wrong. Try again or contact support.',
        'An error has occurred in the system.',
        'bv-dd2'
      ),
    ],
  })
  console.log('✓ Brand Voice')
}

// ─── 2. Writing Rules (7 rules from Overview PDF) ────────────────────────────

async function importWritingRules() {
  const rules = [
    {
      _id: 'writing-rule-1',
      number: 1,
      title: 'Lead with what matters most',
      body: [
        ptBullet('keep your messages as short as possible', 'wr1-b0'),
        ptBullet('put the most important information at the start', 'wr1-b1'),
        ptBullet('use short, simple sentences', 'wr1-b2'),
        ptBullet('remove any content that does not help the user move towards their goal', 'wr1-b3'),
        ptDoAndDont(
          'Update your billing details to continue using Workable.',
          'In order to ensure uninterrupted access to the Workable platform, please update your billing details at your earliest convenience.',
          'wr1-dd0'
        ),
      ],
      test: 'Can you cut the first sentence without losing meaning? Then cut it.',
    },
    {
      _id: 'writing-rule-2',
      number: 2,
      title: 'Focus on actions',
      body: [
        ptBullet('make it clear what action the user needs to complete', 'wr2-b0'),
        ptBullet('match the main verb in the title and CTA', 'wr2-b1'),
        ptBullet('make sure all possible actions are distinct from each other and easily understandable', 'wr2-b2'),
        ptDoAndDont(
          'Title: "Start free trial" → Button: "Start free trial"',
          'Title: "Start free trial" → Button: "Begin"',
          'wr2-dd0'
        ),
      ],
      test: 'Does the CTA verb match the title verb?',
    },
    {
      _id: 'writing-rule-3',
      number: 3,
      title: 'Sound simple, not smart',
      body: [
        ptBullet('write simply and honestly', 'wr3-b0'),
        ptBullet('avoid adverbs, adjectives, and acronyms', 'wr3-b1'),
        ptBullet("don't make up a new word when a common one exists", 'wr3-b2'),
        ptBullet('focus on sounding simple, not smart', 'wr3-b3'),
        ptDoAndDont('Add a job', 'Create a new job requisition', 'wr3-dd0'),
      ],
      test: 'Would a brand-new user understand every word without a glossary?',
    },
    {
      _id: 'writing-rule-4',
      number: 4,
      title: 'Write the way you speak',
      body: [
        ptBullet('read your writing out loud — if it sounds stiff, rewrite it', 'wr4-b0'),
        ptBullet("use contractions: we've, you're, can't, it's", 'wr4-b1'),
        ptBullet('be conversational, friendly, and human', 'wr4-b2'),
        ptDoAndDont("You're all set.", 'Your account has been successfully configured.', 'wr4-dd0'),
      ],
      test: 'Would you actually say this sentence in a conversation?',
    },
    {
      _id: 'writing-rule-5',
      number: 5,
      title: 'Be positive and solution-focused',
      body: [
        ptBullet('when something goes wrong, lead with the fix — not the problem', 'wr5-b0'),
        ptBullet("celebrate the user's achievements where appropriate, but sparingly", 'wr5-b1'),
        ptBullet('never blame the user — avoid "you did" or "you didn\'t"', 'wr5-b2'),
        ptBullet('avoid "Oops", "Whoops", or cutesy error language', 'wr5-b3'),
        ptBullet('use adjectives and exclamations sparingly', 'wr5-b4'),
        ptDoAndDont(
          'Add a payment method to continue.',
          "You haven't added a payment method.",
          'wr5-dd0'
        ),
      ],
      test: 'Does the message tell the user what to do next?',
    },
    {
      _id: 'writing-rule-6',
      number: 6,
      title: 'Use active voice',
      body: [
        ptBullet('make it clear who is performing an action', 'wr6-b0'),
        ptBullet('refer to the company as "Workable" or "we" — not "the system" or passive constructions', 'wr6-b1'),
        ptDoAndDont('Workable sent you an email.', 'An email was sent to you.', 'wr6-dd0'),
      ],
      test: 'Can you answer "who is doing this?" from the sentence?',
    },
    {
      _id: 'writing-rule-7',
      number: 7,
      title: 'Support content with visuals or hyperlinks',
      body: [
        ptBullet('sometimes an image describes something more effectively than words', 'wr7-b0'),
        ptBullet('consider adding videos, pictures, GIFs, or hyperlinks to support your messages', 'wr7-b1'),
        ptBullet('use visuals to set context and create understanding of the changes taking place', 'wr7-b2'),
        ptDoAndDont(
          'Use a screenshot to show where a setting is located.',
          'Write a paragraph describing the location of a setting with no visual.',
          'wr7-dd0'
        ),
      ],
      test: 'Is there a visual that could make this clearer or more actionable?',
    },
  ]

  for (const rule of rules) {
    await client.createOrReplace({ _type: 'writingRule', ...rule })
  }
  console.log('✓ Writing Rules (7)')
}

// ─── 3. Tone by Context ───────────────────────────────────────────────────────

async function importToneContexts() {
  const contexts = [
    {
      _id: 'tone-context-1',
      order: 1,
      context: 'Product UI & Microcopy',
      tone: 'Clear, instructive, supportive',
    },
    {
      _id: 'tone-context-2',
      order: 2,
      context: 'Marketing Copy',
      tone: 'Engaging, persuasive, confident',
    },
    {
      _id: 'tone-context-3',
      order: 3,
      context: 'Help Center & Support',
      tone: 'Reassuring, empathetic, solution-focused',
    },
    {
      _id: 'tone-context-4',
      order: 4,
      context: 'Error Messages',
      tone: 'Clear, constructive, action-oriented — never blaming',
    },
    {
      _id: 'tone-context-5',
      order: 5,
      context: 'Emails & Notifications',
      tone: 'Friendly, concise, informative',
    },
    {
      _id: 'tone-context-6',
      order: 6,
      context: 'Onboarding / Empty States',
      tone: 'Warm, encouraging — personality and warmth allowed',
    },
    {
      _id: 'tone-context-7',
      order: 7,
      context: 'Flash Messages',
      tone: 'Functional only — no personality, no "Success!"',
    },
  ]

  for (const tc of contexts) {
    await client.createOrReplace({ _type: 'toneContext', ...tc })
  }
  console.log('✓ Tone Contexts (7)')
}

// ─── 4. Grammar & Style ───────────────────────────────────────────────────────

async function importGrammar() {
  await client.createOrReplace({
    _id: 'grammar',
    _type: 'grammar',
    body: [
      ...buildSection('g-lang', 'Language', [
        'Use US English throughout — spelling, grammar, punctuation, and formatting',
        'Use "resume" not "CV"',
        'Use "email" (one word, no hyphen)',
        'Use "dropdown" (one word, no hyphen)',
        'Use "wifi" (lowercase, no hyphen)',
        'Use "healthcare", "website", "white paper", "skill set", "co-worker", "rehire"',
        'Use "full-time / part-time" as adjective (a full-time role); "full time / part time" as adverb (she works full time)',
        'Use "canceled", "canceling", "cancellation" — US English spellings only',
        'Abbreviate countries as UK, USA, UAE — no full stops between letters',
        "Always respect each company's official capitalization (LinkedIn, Google)",
      ], [
        { doExample: 'canceled, canceling', dontExample: 'cancelled, cancelling' },
        { doExample: 'email', dontExample: 'e-mail' },
      ]),

      ...buildSection('g-cap', 'Capitalization', [
        'Use sentence case for most product UI — page titles, buttons, menu items, access levels, roles, and settings',
        'Sentence case: capitalize only the first word and proper nouns',
        'Use title case only for branded Workable features (Video Interviews, Assessments, Hiring Plan), marketing-style page titles, and formal job titles used as proper nouns',
        'Use ALL CAPS only when explicitly required by design (e.g. navigation tabs, pills)',
      ], [
        { doExample: 'Save changes (button)', dontExample: 'Save Changes (button)' },
        { doExample: 'Video Interviews (branded feature)', dontExample: 'video interviews (branded feature)' },
      ]),

      ...buildSection('g-num', 'Numbers & symbols', [
        'Always use numerals — write "3" not "three"',
        'Use commas in large numbers (21,568 candidates)',
        'Use full stops for decimal numbers (558.50 GBP per month)',
        'Always use % not "percent" or "per cent"',
        'Use the "200 USD" format with a space between number and currency code — avoid "$200"',
        'Use Oxford comma in all lists of 3 or more items',
      ], [
        { doExample: '3 jobs posted', dontExample: 'three jobs posted' },
        { doExample: '200 USD', dontExample: '$200' },
      ]),

      ...buildSection('g-punc', 'Punctuation', [
        'Use full stops for descriptions, errors, and any content with more than 1 sentence',
        'Do not use full stops on buttons, headings, or single-sentence UI elements',
        'Do not use full stops at the end of bullet point items',
        'Use exclamation marks only when users are genuinely feeling excitement or joy — never more than 1',
        'Avoid "Oops" and "Whoops" in error messages — they feel patronizing',
        'Use ellipsis only for loading or transitional states (Loading…, Generating…)',
        'Avoid dashes (-) and em-dashes (—) in body copy — rewrite the sentence instead',
        'Use en dash with no spaces (–) for fixed number ranges (10–15 employees)',
        'Use en dash with spaces on both sides for time ranges (09:00 AM – 05:00 PM)',
        'Avoid brackets unless expanding unknown terminology (ATS (Applicant Tracking System))',
        'Avoid slashes instead of "and" or "or" — write the words out',
        'When slashes divide multiple locations, write without spaces (Athens, Greece / London, UK)',
        'Use ampersands (&) only when space is limited (buttons, navigation, table headers) — use "and" in body text',
      ], [
        { doExample: 'Add at least one job stage. (description, with full stop)', dontExample: 'Save changes. (button, no full stop needed)' },
        { doExample: '10–15 employees (en dash)', dontExample: '10-15 employees (hyphen)' },
      ]),

      ...buildSection('g-dates', 'Dates & times', [
        'Full date format: Month DD, YYYY — e.g. September 13, 2021',
        'Short date for tight spaces: MMM DD, YY — e.g. Sep 13, 21',
        'Avoid all-numeric formats like 09/12/24 — they are ambiguous across regions',
        'Avoid leading zeros in days or months unless required (March 5, 2023 not March 05, 2023)',
        'Use 12-hour time format — AM and PM capitalized with a space before them (04:00 PM)',
        'Times always have 4 numerals (09:45 AM, not 9:45AM)',
        'Use 12:00 AM for midnight and 12:00 PM for midday',
        'Include timezone code when communication spans multiple time zones (11:00 AM GMT)',
      ], [
        { doExample: 'September 13, 2021', dontExample: '09/13/21' },
        { doExample: '04:00 PM', dontExample: '4pm' },
      ]),

      ...buildSection('g-words', 'Word choices', [
        'Use "your" not "my" to describe things belonging to the user (Your profile, not My profile)',
        'Use "view" not "see" when giving instructions to look at something',
        'Use "choose" for conceptual decisions and preferences; "select" for UI controls and dropdowns',
        'Use "edit" when modifying existing data; "change" when switching between options',
        'Use "For example" in body copy; "e.g." only in space-constrained UI (lowercase, no colon after)',
        'Never use "etc." — list up to 3 examples explicitly instead',
        'Never use "click" — use "select" (device-agnostic)',
        'Avoid "pick" — too informal',
        'Use "Workable" or "we" to refer to the company — not "the system", "our product", or "I"',
        'Use "login" as noun or adjective; "log in" as verb',
        'Use "setup" as noun or adjective; "set up" as verb',
        'Use "profile photo" not "profile picture" or "profile image"',
        'Use "self-" prefix with hyphen (self-review, self-motivated, self-improvement)',
        'Avoid emoji — accessibility difficulties, cultural ambiguity, and inappropriate in frustrated moments',
        'Use "Free Tools for Managers" (capitalized); never "FTFM" in customer-facing copy',
        'Use "resume" not "CV" in all materials',
      ], [
        { doExample: 'Your profile', dontExample: 'My profile' },
        { doExample: 'Select from the dropdown', dontExample: 'Click on the dropdown' },
      ]),

      ...buildSection('g-bullets', 'Bullet points', [
        'Only write one sentence per bullet point',
        'Do not use capital letters at the start of bullet points',
        'Do not use punctuation at the end of bullet points',
        'Each bullet must complete the introductory sentence that precedes the list',
      ], [
        { doExample: 'add your job title (no capital, no full stop)', dontExample: 'Add your job title. (capital and full stop)' },
      ]),
    ],
  })
  console.log('✓ Grammar & Style')
}

// ─── 5. Content Types (from UX text patterns PDF) ────────────────────────────

// Portable Text helpers
function ptBlock(text, style, key) {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

function ptBullet(text, key) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

function ptDoAndDont(doExample, dontExample, key) {
  return { _type: 'doAndDont', _key: key, doExample, dontExample }
}

function buildBody(id, rules, doAndDonts = []) {
  const body = [
    ptBlock('Rules', 'h2', `${id}-h`),
    ...rules.map((r, i) => ptBullet(r, `${id}-b${i}`)),
  ]
  if (doAndDonts.length) {
    body.push(ptBlock('Examples', 'h3', `${id}-eh`))
    doAndDonts.forEach(({ doExample, dontExample }, i) => {
      body.push(ptDoAndDont(doExample, dontExample, `${id}-dd${i}`))
    })
  }
  return body
}

function buildSection(id, heading, rules, doAndDonts = []) {
  const items = [
    ptBlock(heading, 'h2', `${id}-h`),
    ...rules.map((r, i) => ptBullet(r, `${id}-b${i}`)),
  ]
  doAndDonts.forEach(({ doExample, dontExample }, i) => {
    items.push(ptDoAndDont(doExample, dontExample, `${id}-dd${i}`))
  })
  return items
}

async function importContentTypes() {
  const types = [
    {
      _id: 'content-type-1',
      order: 1,
      type: 'Action titles / Call-to-action modal',
      body: buildBody('ct1', [
        'start with a clear, actionable verb',
        'match the verb in the primary CTA',
        'aim for 2–4 words while maintaining clarity',
        'clearly communicate what the user needs to do and how it impacts their task',
      ], [
        { doExample: 'Add pipeline stage', dontExample: 'Pipeline stage addition' },
      ]),
    },
    {
      _id: 'content-type-2',
      order: 2,
      type: 'Alerts & flash messages',
      body: buildBody('ct2', [
        'success messages: confirm completion and highlight user benefit',
        'error messages: state what went wrong and provide a clear next step',
        'be concise, scannable, and easy to dismiss',
        'end with a period for consistency',
        'avoid celebratory or empty phrases like "Success!"',
        'tone: confident, direct, neutral — never alarming or blaming',
        'alert severity is indicated by colour: blue (info), yellow (warning), red (danger), green (success)',
      ], [
        { doExample: 'Pipeline stage added.', dontExample: 'Success!' },
      ]),
    },
    {
      _id: 'content-type-3',
      order: 3,
      type: 'Body text (supportive text)',
      body: buildBody('ct3', [
        '3 lines or fewer',
        'less than 15 words wide',
        'written in clear, simple sentences',
        'broken down into bullet points where necessary to segment information',
      ], [
        {
          doExample: 'Your pipeline has 3 stages.',
          dontExample: 'Congratulations! You have successfully configured your pipeline with 3 unique stages.',
        },
      ]),
    },
    {
      _id: 'content-type-4',
      order: 4,
      type: 'Confirmation text (post-action toasts)',
      body: buildBody('ct4', [
        'use a past-tense verb to confirm completion (Saved, Sent, Generated)',
        'keep it short — 1–3 words',
        'automatically update from transitional text when the process finishes',
        'if the action is irreversible, clarify it (Deleted permanently)',
        'consider offering an undo option when appropriate (Email archived. Undo?)',
      ], [
        { doExample: 'Saved', dontExample: 'Your changes have been saved successfully!' },
      ]),
    },
    {
      _id: 'content-type-5',
      order: 5,
      type: 'Content titles / Section titles',
      body: buildBody('ct5', [
        'use a noun or simple noun phrase',
        'keep it concise and scannable — ideally under 3 words',
        'use nouns when the user is entering information (Name, Description)',
        'use verbs when the user is expected to take action (Add reviewer, Exclude employees)',
        'ensure the title accurately represents all content grouped under it',
        'avoid using actions to title sections that group multiple different tasks',
      ], [
        { doExample: 'Pipeline stages', dontExample: 'Manage your pipeline stages here' },
      ]),
    },
    {
      _id: 'content-type-6',
      order: 6,
      type: 'CTAs (buttons and interactive actions)',
      body: buildBody('ct6', [
        'keep it concise — ideally 1–2 words, up to 3 if clarity requires',
        'start with a verb to emphasize action',
        'match the verb in the title to reinforce the action',
        'ensure each CTA is visually and semantically distinct from others',
        'avoid vague CTAs like OK or Yes — use clear, meaningful labels (Cancel subscription, Delete folder)',
      ], [
        { doExample: 'Save changes', dontExample: 'OK' },
        { doExample: 'Cancel subscription', dontExample: 'Yes' },
      ]),
    },
    {
      _id: 'content-type-7',
      order: 7,
      type: 'Empty states',
      body: buildBody('ct7', [
        "use a clear, user-focused title that explains the feature's purpose",
        'provide a brief, guiding description of what users need to do to fill the space',
        'include a clear primary action (CTA) to help users get started quickly',
        'offer links to external resources (help center articles, tutorials) if they add value without cluttering the UI',
      ], [
        { doExample: 'Post your first job to start receiving candidates', dontExample: 'Nothing here yet' },
      ]),
    },
    {
      _id: 'content-type-8',
      order: 8,
      type: 'Error messages',
      body: buildBody('ct8', [
        'clearly state the issue in plain language — avoid technical jargon',
        'provide a clear next step (retry, refresh, contact support)',
        'if there are multiple solutions, list them in order of priority',
        'avoid "Oops" and "Whoops" — they feel patronizing and unprofessional',
        'never blame the user — focus on what they can do next, not what they did wrong',
        'be concise — stick to information that helps users fix the issue',
        'tone: neutral, supportive — not alarming or accusatory',
      ], [
        { doExample: 'Enter a valid email address.', dontExample: 'Oops! Invalid input.' },
      ]),
    },
    {
      _id: 'content-type-9',
      order: 9,
      type: 'Functional field labels (interaction fields)',
      body: buildBody('ct9', [
        'start with a verb (Exclude, Search, Select, Add)',
        'keep labels short — ideally under 5 words',
        'skip unnecessary determiners like "the", "a", or "your" unless needed for clarity',
        'avoid full sentences — labels should be fast and functional',
        'prefer action phrasing over description',
      ], [
        { doExample: 'Search candidates', dontExample: 'You can search for candidates here' },
      ]),
    },
    {
      _id: 'content-type-10',
      order: 10,
      type: 'Modals',
      body: buildBody('ct10', [
        'title: use an action-driven statement (Delete this folder?) not vague phrasing (Are you sure?)',
        'body: provide only necessary context — be concise',
        'limit to 2 actions max (primary action + secondary/cancel)',
        'primary action button should be on the right',
        'buttons should match the action stated in the modal (Yes, delete folder — not just Yes)',
        'avoid vague CTAs like OK or Yes',
        'use only for: confirming important actions, acknowledging essential info, or requiring direct user input',
      ], [
        { doExample: 'Delete this folder?', dontExample: 'Are you sure?' },
      ]),
    },
    {
      _id: 'content-type-11',
      order: 11,
      type: 'Notifications',
      body: buildBody('ct11', [
        'title: concise, action-driven, and scannable at a glance',
        'use a description only when additional context is necessary for the user to take action',
        'prioritize important notifications and group similar messages where possible',
        'avoid overuse — too many notifications leads to notification fatigue',
        'notifications must be relevant, timely, and actionable',
      ], [
        {
          doExample: 'New application received for Senior Designer',
          dontExample: 'You have a new notification',
        },
      ]),
    },
    {
      _id: 'content-type-12',
      order: 12,
      type: 'Text links',
      body: buildBody('ct12', [
        'avoid vague links like "click here" or "tap here"',
        "use descriptive, meaningful text that tells users what they'll find",
        'if a link appears within a sentence, place it at the end for better scannability',
        'do not include the full stop inside the link itself',
        'links should make sense out of context for screen readers (accessibility)',
        'avoid linking long phrases or full sentences — they become hard to tap',
      ], [
        { doExample: 'View billing settings', dontExample: 'Click here' },
      ]),
    },
    {
      _id: 'content-type-13',
      order: 13,
      type: 'Tooltips',
      body: buildBody('ct13', [
        'use for non-essential context only — never hide critical guidance in a tooltip',
        'limit to one idea or piece of context per tooltip',
        'if information is critical to completing a task, show it on the page as helper text instead',
        'if a title is included, make it concise and user-focused (e.g. "Why is this required?")',
        'body text should be understandable on its own, even without a title',
        'links in tooltips should use meaningful, scannable text',
      ], [
        { doExample: 'Why is this required?', dontExample: 'Info' },
      ]),
    },
    {
      _id: 'content-type-14',
      order: 14,
      type: 'Transitional text (loading messages)',
      body: buildBody('ct14', [
        'use a present continuous verb (-ing) to indicate an ongoing process (Loading…, Generating…, Sending…)',
        'avoid vague or passive verbs',
        'use short text (1–2 words) for quick, simple actions',
        'use more descriptive text for longer processes (Analyzing your job title and profile…)',
        'ensure the text updates automatically upon completion with clear confirmation messaging',
      ], [
        { doExample: 'Generating report…', dontExample: 'Please wait…' },
      ]),
    },
    {
      _id: 'content-type-15',
      order: 15,
      type: 'Transactional emails',
      body: buildBody('ct15', [
        'subject line: scannable, action-driven, under 60 characters — lead with the key task',
        'email heading reinforces or mirrors the subject line and acts as the visual title',
        'opening line: clearly state why the user is receiving the email',
        'use short paragraphs or bullet points for key info — front-load deadlines and important details',
        'CTA: clearly visible and prominently placed in the email body',
        'greeting is optional — use only for personalization; keep tone neutral and professional',
        'keep emails text-only to ensure proper rendering across all email clients',
      ], [
        {
          doExample: 'Action required: Complete your onboarding by Friday',
          dontExample: 'Important information inside',
        },
      ]),
    },
  ]

  for (const ct of types) {
    await client.createOrReplace({ _type: 'contentType', ...ct })
  }
  console.log('✓ Content Types (15)')
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error(
      'Error: SANITY_TOKEN environment variable is required.\n' +
      'Get one at: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)\n' +
      'Then run: SANITY_TOKEN=<token> node scripts/import-guidelines.js'
    )
    process.exit(1)
  }

  console.log('Importing Workable content design system guidelines into Sanity...\n')

  await importBrandVoice()
  await importWritingRules()
  await importToneContexts()
  await importGrammar()
  await importContentTypes()

  console.log('\nDone. All documents created or replaced in the "production" dataset.')
}

main().catch((err) => {
  console.error('\nImport failed:', err.message)
  process.exit(1)
})
