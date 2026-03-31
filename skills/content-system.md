# Skill: content-system

Activates the Workable content system context for drafting, reviewing, and rewriting content.

## Trigger Conditions

Invoke this skill when:
- Starting a content drafting or review session
- You want Claude to apply Workable brand voice rules to any piece of writing
- You need to check, rewrite, or create UI copy, emails, error messages, CTAs, or notifications

## What it does

Loads the writing rules from `CLAUDE.md` and applies them as the active standard. Then helps with:

- **Draft** — Write new content for a given context (UI, email, error, CTA, etc.)
- **Review** — Check existing content against the 7 writing rules and grammar guide
- **Rewrite** — Fix copy that violates tone, voice, or style rules
- **Check** — Answer specific questions about a single element

## Installed as

Global slash command: `/content-system`
Location: `~/.claude/commands/content-system.md`

## Related skills

- `/tone-checker` — focused tone and voice review
- `/learn` — save session decisions to `memory.md`
