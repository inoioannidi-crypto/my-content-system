module.exports = {
  meta: {
    title: 'Workable Content Design System',
    version: '1.0.0',
  },

  brandVoice: {
    core: [
      { trait: 'Empathetic yet Professional', description: 'Acknowledge user needs without losing confidence' },
      { trait: 'Innovative yet Practical', description: 'Forward-looking ideas, but always actionable' },
      { trait: 'Transparent yet Concise', description: 'Say what you mean, cut what you don\'t need' },
    ],
    values: [
      { name: 'Simple', description: 'Use plain, everyday language. If a new user wouldn\'t know the word, replace it.' },
      { name: 'Direct', description: 'No filler phrases. No "In this post, I will..." Get to the point.' },
      { name: 'Efficient', description: 'Every sentence should help the user move toward their goal. If it doesn\'t, cut it.' },
    ],
  },

  writingRules: [
    {
      number: 1,
      title: 'Lead with what matters most',
      points: [
        'Put the most important information first',
        'Use short sentences',
        'Remove anything that doesn\'t help the user complete their task',
      ],
      test: 'Can you cut the first sentence without losing meaning? Then cut it.',
    },
    {
      number: 2,
      title: 'Focus on actions',
      points: [
        'Make the required action clear immediately',
        'Match the verb in the title and the CTA (e.g. "Start review cycle" → button says "Start review cycle", not "Confirm")',
        'All available actions must be distinct and unambiguous',
      ],
      test: 'Does the CTA verb match the title verb?',
    },
    {
      number: 3,
      title: 'Sound simple, not smart',
      points: [
        'Avoid adverbs, unnecessary adjectives, and acronyms',
        'Don\'t invent new words when a common one exists',
        'Avoid Workable-specific jargon with users who may not know it (e.g. "AI Recruiter", "auto-source")',
      ],
      test: 'Would a brand-new user understand every word without a glossary?',
    },
    {
      number: 4,
      title: 'Write the way you speak',
      points: [
        'Read your writing aloud. If it sounds stiff, rewrite it.',
        'Use contractions: "we\'ve", "you\'re", "can\'t", "it\'s"',
      ],
      test: 'Would you actually say this sentence in a conversation?',
    },
    {
      number: 5,
      title: 'Be positive and solution-focused',
      points: [
        'When something goes wrong, lead with the fix — not the problem',
        'Celebrate achievements where appropriate, but sparingly',
        'Never blame the user. Avoid "you did" / "you didn\'t"',
        'Avoid "Oops", "Whoops", or cutesy error language',
      ],
      test: 'Does the message tell the user what to do next?',
    },
    {
      number: 6,
      title: 'Use active voice',
      points: [
        'Make clear who is doing the action',
        'Refer to the company as "Workable" or "we" — not "the system" or passive constructions',
      ],
      test: 'Can you answer "who is doing this?" from the sentence?',
    },
    {
      number: 7,
      title: 'Match personality to context',
      points: [
        'Use warmth in: onboarding flows, empty states, tooltips, success messages',
        'Use clarity only in: flash messages, error messages, form labels, CTAs',
      ],
      test: 'Is this a moment of user frustration or achievement? Match accordingly.',
    },
  ],

  toneByContext: [
    { context: 'Product UI & Microcopy', tone: 'Clear, instructive, supportive' },
    { context: 'Marketing Copy', tone: 'Engaging, persuasive, confident' },
    { context: 'Help Center & Support', tone: 'Reassuring, empathetic, solution-focused' },
    { context: 'Error Messages', tone: 'Clear, constructive, action-oriented — never blaming' },
    { context: 'Emails & Notifications', tone: 'Friendly, concise, informative' },
    { context: 'Onboarding / Empty States', tone: 'Warm, encouraging, personality allowed' },
    { context: 'Flash Messages', tone: 'Functional only — no personality, no "Success!"' },
  ],

  grammar: {
    language: [
      'US English throughout (analyze, honor, canceled, canceling, cancellation)',
      'Use "resume" not "CV"',
      'Use "email" (one word, no hyphen)',
      'Use "dropdown" (one word, no hyphen)',
      'Use "wifi" (lowercase, no hyphen)',
      'Use "healthcare", "website", "white paper", "skill set", "co-worker", "rehire"',
    ],
    capitalization: [
      'Sentence case for most UI: page titles, buttons, menu items, roles, settings',
      'Title case only for: branded Workable features (Video Interviews, Hiring Plan), marketing page titles, formal job titles as proper nouns',
      'ALL CAPS only when required by design (navigation tabs, pills)',
    ],
    numbersAndSymbols: [
      'Always use numerals: "3 plans", not "three plans"',
      'Use commas in large numbers: 21,568',
      'Use decimal points, not commas: 558.50 USD',
      'Always use % not "percent"',
      'Use "200 USD" format, not "$200"',
      'Use Oxford comma in all lists of 3+',
    ],
    punctuation: [
      'Full stops: Use in descriptions, errors, multi-sentence copy. Do NOT use on buttons, headings, or bullet point items.',
      'Exclamation marks: Only when the user is genuinely excited. Max 1. Never on errors or neutral confirmations.',
      'Ellipsis (...): Only for loading/transitional states (Loading…, Generating…)',
      'Dashes: Avoid in body copy. Use en dash (–) with no spaces for number ranges (10–15). Use en dash with spaces for time ranges (09:00 AM – 05:00 PM).',
      'Ampersands: Use "and" in body text. Use "&" only when space is tight (buttons, table headers).',
      'Brackets: Avoid for sub-clauses. OK to expand unknown terms (ATS (Applicant Tracking System)).',
    ],
    datesAndTimes: [
      'Full date: September 13, 2021 (Month DD, YYYY)',
      'Short date: Sep 13, 21 (MMM DD, YY)',
      'Never: 09/12/24 (ambiguous)',
      'Time: 12-hour format, capitalized AM/PM with a space: 04:00 PM, 07:38 AM EST',
    ],
    wordChoices: [
      'Use "your" not "my" (e.g. "Your profile", not "My profile")',
      'Use "view" not "see" for instructions',
      'Use "choose" for conceptual decisions; "select" for UI controls and dropdowns',
      'Use "edit" when modifying existing data; "change" when switching between options',
      'Use "For example" in body copy; "e.g." only in tight UI spaces (lowercase, no colon)',
      'Never use "etc." — list up to 3 examples explicitly',
      'Never use "click" — use "select" (device-agnostic)',
      'Never use "pick" (too informal)',
    ],
    bulletPoints: [
      'One sentence per bullet',
      'No capital letter at start, no punctuation at end',
      'Each bullet must complete the sentence that introduces the list',
    ],
  },

  contentTypes: [
    { type: 'Button / CTA', rules: ['Active verb, sentence case, no period', 'Verb must match the action exactly'] },
    { type: 'Error message', rules: ['Lead with what to do next, not what went wrong', 'One sentence. Full stop.'] },
    { type: 'Success message', rules: ['Functional only', 'No "Great!", "Success!", or "Awesome!"'] },
    { type: 'Flash message', rules: ['Functional only — no personality', 'No exclamation marks'] },
    { type: 'Onboarding copy', rules: ['Warm, encouraging', 'Short headline + 1 supporting sentence max'] },
    { type: 'Empty state', rules: ['Explain what goes here + one action', 'Friendly but not cute'] },
    { type: 'Form label', rules: ['Concise noun or short phrase', 'Sentence case. No period.'] },
    { type: 'Placeholder text', rules: ['Example of expected input (not a repeat of the label)', 'Sentence case. No period.'] },
    { type: 'Tooltip', rules: ['One sentence max', 'Sentence case. Full stop.'] },
    { type: 'Email subject', rules: ['Action-oriented', 'Sentence case. Under 50 characters.'] },
    { type: 'Email body', rules: ['Friendly, concise', 'One key message per paragraph'] },
    { type: 'Notification', rules: ['Clear and direct', 'Say what happened and what to do next'] },
    { type: 'Page title / Heading', rules: ['Sentence case. No period.'] },
    { type: 'Modal title', rules: ['Sentence case. No period.', 'Matches the primary action'] },
    { type: 'Helper text', rules: ['One sentence', 'Sentence case. Full stop.'] },
  ],
};
