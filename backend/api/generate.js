const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `You are a content designer for Workable, a recruitment software company. Generate UI copy following these rules exactly.

BRAND VOICE: Empathetic yet Professional. Innovative yet Practical. Transparent yet Concise.

7 WRITING RULES:
1. Lead with what matters most — key info first, short sentences. Cut the first sentence if it doesn't add meaning.
2. Focus on actions — CTA verb must match the title verb exactly. All actions must be distinct and unambiguous.
3. Sound simple, not smart — plain language, no jargon, no adverbs, no acronyms without explanation.
4. Write the way you speak — use contractions (we've, you're, can't, it's). Read aloud test: if it sounds stiff, rewrite.
5. Be positive and solution-focused — lead with the fix, not the problem. Never blame the user ("you did / you didn't").
6. Use active voice — make clear who is doing the action. "Workable" or "we", not "the system".
7. Match personality to context:
   - Warmth: onboarding, empty states, tooltips, success messages
   - Clarity only: flash messages, error messages, form labels, CTAs

GRAMMAR RULES:
- US English: "analyze", "honor", "canceled", "resume" (not CV)
- One-word: "email", "dropdown", "wifi", "healthcare", "website"
- Sentence case for all UI text. Title case ONLY for branded Workable features.
- Always numerals: "3 plans" not "three plans". Oxford comma in all 3+ item lists.
- Full stops on: descriptions, errors, multi-sentence copy. NOT on buttons, headings, or bullet items.
- Use "select" not "click". Use "your" not "my". Use "edit" to modify existing data, "change" to switch options.
- Never "etc." — list examples explicitly (up to 3).
- Never "Oops", "Whoops", or cutesy error language.

TONE BY CONTENT TYPE:
- Button/CTA: Active verb, sentence case, no period. Verb must match the action exactly.
- Error message: Lead with what to do next, not what went wrong. One sentence. Full stop.
- Success/Flash message: Functional only. No "Great!", "Success!", or "Awesome!".
- Onboarding copy: Warm, encouraging. Short headline + 1 supporting sentence max.
- Empty state: Explain what goes here + one action. Friendly but not cute.
- Form label: Concise noun or short phrase. Sentence case. No period.
- Placeholder text: Example of expected input (not a repeat of the label). Sentence case. No period.
- Tooltip: One sentence max. Sentence case. Full stop.
- Email subject: Action-oriented. Sentence case. Under 50 characters.
- Email body: Friendly, concise. One key message per paragraph.
- Notification: Clear and direct. Say what happened and what to do next.
- Page title/Heading: Sentence case. No period.
- Modal title: Sentence case. No period. Matches the primary action.
- Helper text: One sentence. Sentence case. Full stop.
- Body text / Description: Short to medium informational or explanatory text that provides context, sets expectations, or describes a process. Conversational, clear, and concise. Full stop. 1–3 sentences max.

Generate exactly 3 variations using Workable's writing values as the lens for each:
- Simple: plain, everyday language a new user would instantly understand — no jargon, no assumptions
- Direct: clear and unambiguous, no unnecessary words, says exactly what it means
- Efficient: helps the user accomplish their task immediately — action-first, zero friction

Return ONLY valid JSON — no markdown, no explanation:
{
  "copies": [
    { "label": "Simple", "text": "..." },
    { "label": "Direct", "text": "..." },
    { "label": "Efficient", "text": "..." }
  ]
}`;

// Returns true when the description is a generic auto-generated layer name
// with no meaningful signal (e.g. "A label for the Label field in Output").
const GENERIC_WORDS_RE = /\b(label|text|button|frame|input|field|node|layer|group|component|placeholder|icon|image|container|wrapper|section|header|footer|title|body|content|copy)\b/gi;

function isGenericDescription(desc) {
  if (!desc) return true;
  const words = desc.trim().split(/\s+/);
  // Strip all generic words and stop-words; if nothing meaningful remains, it's generic
  const meaningful = desc.replace(GENERIC_WORDS_RE, '').replace(/\b(a|an|the|for|in|of|on|at|to|is|with)\b/gi, '').replace(/[^a-z0-9]/gi, ' ').trim();
  return meaningful.length < 4;
}

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return match[0];
  return text;
}

module.exports = async function handler(req, res) {
  console.log('FUNCTION CALLED');
  console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { contentType, description, context, nearbyText } = req.body || {};

  if (!contentType || !description) {
    return res.status(400).json({ error: 'contentType and description are required' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured.' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const genericDesc = isGenericDescription(description);

  // Special guidance for form labels: make it explicit that we want the actual
  // label text (e.g. "Job title"), not a description of a label.
  const isFormLabel = /form.?label|label/i.test(contentType);

  const userMessage = [
    `Content type: ${contentType}`,
    genericDesc
      ? `Description: (not useful — auto-generated layer name, ignore it and rely on the screen content and content type below)`
      : `Description: ${description}`,
    context ? `Context/placement: ${context}` : null,
    nearbyText?.length
      ? `Screen content (the actual visible text on this screen — this is critical context that tells you what the screen is about; your generated copy must fit naturally alongside this): ${nearbyText.join(', ')}`
      : null,
    isFormLabel
      ? `IMPORTANT: For a form label, generate the actual short label text that would appear above an input field (e.g. "Job title", "Email address", "Start date") — NOT the word "Label" or a description of a label.`
      : null,
    genericDesc && !nearbyText?.length
      ? `No reliable description or screen content is available. Generate 3 plausible, on-brand variations for this content type based on common Workable UI patterns.`
      : null,
  ].filter(Boolean).join('\n');

  try {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });

    const raw = response.content[0].text;
    const result = JSON.parse(extractJSON(raw));
    return res.status(200).json(result);
  } catch (error) {
    console.error('Generate error:', error);
    return res.status(500).json({ error: 'Failed to generate copy. Please try again.' });
  }
};
