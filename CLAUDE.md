# MaranelloLuceDesign

Ferrari Luce-inspired design system for business dashboards. Part of Convergio.

## Build / Test / Lint

| Command | Purpose |
|---|---|
| `npm run build` | esbuild ESM+CJS+IIFE, CSS concat, type declarations |
| `npm run test:unit` | vitest |
| `npm run test:e2e` | playwright |
| `npx tsc --noEmit` | Type-check |
| `scripts/check-tokens.sh` | Token scrub check (no hardcoded secrets) |

## Architecture

3-layer design system:

| Layer | Path | Purpose |
|---|---|---|
| CSS-only | `src/css/` | Tokens, themes, components, layouts — zero JS |
| Web Components | `src/wc/` | Custom elements wrapping CSS layer |
| Headless JS | `src/ts/` | Charts, gauge, controls, forms — framework-agnostic |

Exports: `./css`, `./wc`, `./charts`, `./gantt`, `./gauge`, `./controls`, `./forms`

## Token System

Italian naming convention from Ferrari heritage:

| Token | Meaning |
|---|---|
| `nero` | Black/dark |
| `avorio` | Ivory/light |
| `grigio` | Grey |
| `giallo` | Yellow (Ferrari accent) |
| `rosso` | Red (Ferrari primary) |

Defined in `src/css/tokens.css`, consumed by all themes.

## Themes

4 themes: **nero** (dark default), **avorio** (light), **editorial** (print-friendly), **colorblind** (accessible).

Theme CSS in `src/css/themes-*.css`. Switch via `data-theme` attribute on root element.

## Night Agent

Automated maintenance runs daily at 03:00 CET on omarchy (Linux mesh peer).

Tasks: `git pull` | `npm run build` | `npm test` | `npm audit` | `scripts/check-tokens.sh`

Cron/systemd setup deferred to omarchy post-deployment (repo clone required first).

## Conventions

- Max 250 lines per file — split if exceeds
- All code/comments in English
- License: MIT, (c) Roberdan 2026
- Demo: `npm run dev` serves `demo/` on port 3000

## Key Paths

| Path | Content |
|---|---|
| `src/css/tokens.css` | Design tokens (colors, spacing, type) |
| `src/css/themes.css` | Theme barrel |
| `src/wc/` | Web Components |
| `src/ts/` | Headless JS modules |
| `esbuild.config.mjs` | Build config |
| `dist/` | Build output (gitignored) |
| `demo/` | Interactive demo pages |
| `tests/` | Unit tests (vitest) |
| `e2e/` | E2E tests (playwright) |
