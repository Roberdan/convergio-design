# ADR-0006: Sugar Theme — Cool Gray Light Theme

**Status:** Accepted
**Date:** 2026-03-20
**Context:** Need for a modern SaaS-style light theme alongside existing Ferrari-inspired dark themes.

## Decisions
1. Token-only theme (body.mn-sugar) — no component JS changes needed
2. !important used selectively to beat inline dark backgrounds in demo sections
3. Canvas engines (gantt, gauge, speedometer, map, social-graph, BCG) made theme-aware via cssVar() reading from document.body
4. Sugar+Colorblind cross-theme for accessibility
5. Button radius: var(--radius-sm) fallback for all themes, removing hardcoded border-radius: 0
