# ADR-0005: Liquid Glass Theme

**Status:** Accepted  
**Date:** 2026-03-14

## Context

Modern UI design trends (Apple Vision Pro, iOS 18+) emphasize translucent "glass" surfaces using `backdrop-filter`. Maranello's theme system needed a non-destructive overlay that composites with all 4 existing themes.

## Decision

Glass is an **overlay**, not a 5th theme. Applied via `body.mn-glass` class alongside any theme class (`mn-nero.mn-glass`, `mn-avorio.mn-glass`, etc.).

| Layer | File | Purpose |
|---|---|---|
| Tokens | `tokens-glass.css` | `--glass-*` custom properties (blur, tint, border, shadow) |
| Base | `themes-glass-base.css` | Section-level surfaces + `@supports` fallback |
| Components | `themes-glass-components.css` | Card, btn, input, tag, accordion, signal-panel |
| Layouts | `themes-glass-layouts.css` | Sidebar, nav, modal, drawer, detail-panel, data-table, toast |
| Variants | `themes-glass-variants.css` | Per-theme tint overrides (nero+glass, avorio+glass, etc.) |

JS API: `setGlass()`, `toggleGlass()`, `getGlass()` in `core/utils.ts`.

Dual-level rotary (`theme-rotary.ts` + `mn-theme-rotary` WC): outer ring = theme, center = glass toggle.

## Consequences

- All glass tokens scoped to `body.mn-glass` — zero overhead when glass is off
- `@supports` fallback for browsers without `backdrop-filter` (solid semi-transparent)
- No `!important` used — clean `@layer themes` cascade
- Glass composites with existing themes via CSS specificity (`body.mn-nero.mn-glass`)
