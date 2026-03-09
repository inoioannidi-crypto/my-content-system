# Skill: tone-checker

Review content for tone, voice, and style consistency.

## Trigger Conditions

Invoke this skill when:
- A draft is ready for review before publishing or sharing
- Content feels off-brand or inconsistent in voice
- The user asks to "check the tone", "review this", or "does this sound right?"
- Before finalizing any long-form content (posts, emails, docs)

## Instructions

When invoked, review the provided content against these guidelines:

### Voice & Tone

- **Direct**: Get to the point. No filler phrases like "In this post, I will..."
- **Human**: Write like a thoughtful person, not a press release
- **Confident but not arrogant**: Assert ideas clearly without hedging excessively
- **Consistent**: Maintain the same register throughout — don't shift between formal and casual

### What to Check

1. **Opening line** — Does it hook without being clickbait?
2. **Sentence rhythm** — Vary length. Avoid walls of long sentences or too many staccato fragments.
3. **Word choice** — Flag jargon, buzzwords, or filler words (leverage, utilize, synergy, etc.)
4. **Passive voice** — Flag excessive use; prefer active constructions
5. **Closing** — Does it end with purpose? Avoid weak endings like "I hope this helps"

### Output Format

Report findings as:
- **Pass** — element meets the guideline
- **Flag** — specific issue with suggested fix
- **Suggestion** — optional improvement (not required)

End with an overall verdict: `READY`, `NEEDS REVISION`, or `MAJOR REVISION NEEDED`

## Notes

- Update tone guidelines in this file as the project's voice becomes more defined
- If the user's content consistently violates a guideline, consider whether the guideline needs updating
