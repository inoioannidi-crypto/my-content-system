const staticGuidelines = require('../data/guidelines');

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_VERSION = '2024-01-01';
const SANITY_TOKEN = process.env.SANITY_API_TOKEN; // optional — only needed for private datasets

const GROQ_QUERY = encodeURIComponent(`{
  "brandVoice": *[_type == "brandVoice"][0] { core, values },
  "writingRules": *[_type == "writingRule"] | order(number asc) { number, title, points, test },
  "toneByContext": *[_type == "toneContext"] | order(order asc) { context, tone },
  "grammar": *[_type == "grammar"][0] {
    language, capitalization, numbersAndSymbols,
    punctuation, datesAndTimes, wordChoices, bulletPoints
  },
  "contentTypes": *[_type == "contentType"] | order(order asc) { type, rules }
}`);

async function fetchFromSanity() {
  if (!SANITY_PROJECT_ID || SANITY_PROJECT_ID === 'REPLACE_WITH_YOUR_PROJECT_ID') return null;

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${GROQ_QUERY}`;
  const headers = { 'Content-Type': 'application/json' };
  if (SANITY_TOKEN) headers['Authorization'] = `Bearer ${SANITY_TOKEN}`;

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`Sanity responded with ${response.status}`);

  const { result } = await response.json();

  // If Sanity hasn't been populated yet, fall back to static
  if (!result || !result.writingRules || result.writingRules.length === 0) return null;

  return {
    meta: staticGuidelines.meta,
    brandVoice: result.brandVoice || staticGuidelines.brandVoice,
    writingRules: result.writingRules || staticGuidelines.writingRules,
    toneByContext: result.toneByContext || staticGuidelines.toneByContext,
    grammar: result.grammar || staticGuidelines.grammar,
    contentTypes: result.contentTypes || staticGuidelines.contentTypes,
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = await fetchFromSanity();
    return res.status(200).json(data || staticGuidelines);
  } catch (err) {
    console.error('Sanity fetch failed, using static guidelines:', err.message);
    return res.status(200).json(staticGuidelines);
  }
};
