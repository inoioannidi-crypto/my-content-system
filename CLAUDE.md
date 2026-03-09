# my-content-system

A personal content management system for drafting, reviewing, and refining written content with consistent tone and style.

## Purpose

This project helps manage content creation workflows — capturing ideas, drafting posts/articles, and ensuring quality and tone consistency across all output.

## Project Structure

```
my-content-system/
├── CLAUDE.md          # These instructions
├── memory.md          # Running project memory and key decisions
└── skills/
    ├── tone-checker.md  # Skill: check and align content tone
    └── learn.md         # Skill: capture learnings and update memory
```

## Key Conventions

- All content should follow the tone guidelines in `skills/tone-checker.md`
- When new patterns, decisions, or insights emerge, use the `learn` skill to update `memory.md`
- Keep `memory.md` concise — bullet points preferred over prose
- Skills in `skills/` define reusable behaviors; invoke them by name (e.g. `/tone-checker`, `/learn`)

## Workflow

1. Draft content in context or in files under this project
2. Run `/tone-checker` to review tone consistency before finalizing
3. Run `/learn` after any session that produces new decisions or patterns worth keeping

## Skills Reference

- `/tone-checker` — Reviews content for tone, voice, and style consistency
- `/learn` — Captures session insights into `memory.md`
