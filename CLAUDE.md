# SPEC India website — Claude Code

**Read [.agents/GEMINI.md](.agents/GEMINI.md) before any task.** It is the single source of
truth for every agent in this repo: route rules, folder rules, the mandatory
Page Build Checklist, the shared-sections catalogue, Strapi query rules and
styling gotchas. Then read `docs/architecture.md` (structure) and
`docs/design.md` (tokens).

Quick reminders:
- Frontend lives in `frontend/`; run commands from there.
- Never invent a URL route — the user names it.
- Before reporting a page as done: `npm run type-check` and
  `npm run check:layout -- <path>` must both pass.
- Commit format: `feat(scope): …` / `fix(scope): …` / `chore(scope): …`.
