const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `You are a content designer reviewing UI copy for Workable. Check the provided text against these guidelines.

WHAT TO CHECK:
1. Opening — Does it lead with what matters? Is the first word or phrase doing work?
2. Word choice — Flag: "click" (use "select"), passive constructions, jargon, adverbs, "etc.", "Oops/Whoops", "my" (use "your")
3. Tone match — Does it match the content type? (no warmth in errors; no "Success!" in flash messages; no personality in form labels)
4. Punctuation — Full stop on descriptions and errors. NOT on buttons, headings, bullet items.
5. Voice — Active or passive? Clear who is doing the action?
6. User blame — Does it say "you did" or "you didn't"? It shouldn't.
7. Language — US English? Sentence case? Contractions used naturally?

VERDICT SCALE:
- READY: Follows all rules. Publish as-is.
- NEEDS REVISION: Minor issues. Suggest fixes.
- MAJOR REVISION NEEDED: Significant problems with tone, structure, or rules.

Return ONLY valid JSON — no markdown, no explanation:
{
  "verdict": "READY" | "NEEDS REVISION" | "MAJOR REVISION NEEDED",
  "checks": [
    { "area": "string", "status": "pass" | "flag" | "suggestion", "note": "string" }
  ],
  "revised": "improved version of the copy, or null if READY"
}

Include 4–6 checks covering the most relevant areas for this content type.`;

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return match[0];
  return text;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, contentType } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'text is required' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured.' });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const userMessage = [
    contentType ? `Content type: ${contentType}` : null,
    `Text to review: "${text.trim()}"`,
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
    console.error('Tone check error:', error);
    return res.status(500).json({ error: 'Failed to check tone. Please try again.' });
  }
};
