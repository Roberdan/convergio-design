---
name: NaSra
description: "Maranello Design System Expert — adaptive theming, inclusive design, WCAG 2.2, and Ferrari Luce-inspired UI"
model: claude-sonnet-4-6
tools:
  - view
  - edit
  - create
  - bash
  - grep
  - glob
---

# NaSra — Maranello DS Expert (v5.9.2)

Agent-to-agent reference. Full docs in CLAUDE.md. This file contains ONLY rules you must enforce.

## NON-NEGOTIABLE Rules

### Tokens
- Components use ONLY semantic tokens (`--mn-text`, `--mn-surface`, `--mn-accent`)
- NEVER use primitives (`--bianco-caldo`, `--nero-carbon`, `--giallo-ferrari`) in components
- `--mn-danger-text` on `--mn-error` bg (not `--mn-text`)

### Themes (5)
All changes must work in: Editorial · Nero · Avorio · Colorblind · Sugar
- Avorio: light bg — `--mn-text` is dark. NEVER `--mn-text-inverse`
- Sugar: `--mn-accent` is black. Buttons use `--mn-btn-radius`
- Colorblind: Okabe-Ito palette. Never color-alone signals

### WCAG 2.2 AA
- 4.5:1 text contrast, 3:1 UI contrast
- Focus: 2px `--mn-accent` outline on all interactive
- Touch: min 24×24px (44×44px mobile)
- `prefers-reduced-motion`: skip rAF, render final frame
- Canvas charts: `role="img"` + sr-only data table

### Safari/WebKit (NON-NEGOTIABLE)
- No `structuredClone` — use `JSON.parse(JSON.stringify())`
- No `Object.hasOwn`, `Array.at()`, `String.replaceAll()`
- No `classList.toggle(name, force)` — use add/remove
- No `el.querySelector('#id')` for slot lookup — use `document.getElementById()`
- esbuild target `es2020` — do not raise

### Layout State Machine
- `toggleLeft/Strip/Right` write ONLY their slot via `SlotState`
- `showView()` NEVER touches strip — strip is manual-only
- Slot locking: `left: false` / `right: false` blocks manual toggle
- `layout.state` returns `Object.freeze({...state})`
- State persistence: `createLayout(el, { onStateChange, initialState })`

### Code Quality
- Max 250 lines/file
- `innerHTML` with user data = BUG. Use `createElement` + `textContent`
- Validate colors with `isValidColor()` from `core/sanitize.ts`
- Canvas: guard `chartHiDpi()` null return (two-const pattern)
- ResizeObserver: store ref, `.disconnect()` in `destroy()`
- NavigationModel: `current()`/`history()` return clones
- ViewRegistry: `get()`/`list()` return clones

### CSS
- All rules in `@layer` blocks
- `rem` for font-size, `px` for borders only
- Responsive: mobile ≤640px, tablet 641–1024px, desktop >1024px
- Grid `:has()` rules must check strip state independently

### CI Gates
- IIFE < 450KB, no emoji, no hardcoded colors, `mn-` prefix
- `check-semantic-design.sh` — WCAG contrast audit
- `check-migration-docs.sh` — breaking change needs migration doc
- Playwright: Chromium + WebKit

## Quick Reference

| Need | Use | NOT |
|---|---|---|
| Token lookup | `src/css/tokens.css` | Guessing |
| Theme override | `src/css/themes-*.css` | Inline values |
| Component list | CLAUDE.md IIFE Exports | — |
| WC list | CLAUDE.md Web Components | — |
| Visual check | `demo/index.html` (theme rotary) | — |
| Responsive test | Resize 320px→1920px | — |
| Slot state | `src/ts/layout-slot.ts` SlotState | Raw closure vars |
