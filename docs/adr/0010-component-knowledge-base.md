# ADR-0010: Component Knowledge Base (CKB)

**Status:** Accepted
**Date:** 2026-03-29
**Deciders:** Roberto D'Angelo (Roberdan)

## Context

convergio-design has grown to 31 Web Components, 100+ TypeScript API exports, 12 composition patterns, and 6 themes. Despite comprehensive documentation (AGENT.md, DATA_CONTRACTS.md, NaSra agent, agent-cookbook.md), AI agents and consumers consistently fail to leverage the full design system when building UIs in other repos.

Evidence from session history:
- 32+ sessions on convergio-web with poor UI results
- ~9 sessions on VirtualBPM with incomplete DS adoption
- convergio-web imports only CSS tokens but zero WCs or TS APIs

Root cause: documentation is human-readable but not machine-actionable. No automated way exists to go from "this API returns X" to "use mn-data-table with these columns."

## Decision

Create a **Component Knowledge Base (CKB)** — a machine-readable JSON catalog auto-generated from source code at build time.

### Location
- Schema: `packages/elements/src/knowledge/ckb-schema.json`
- Generator: `scripts/generate-ckb.mjs`
- Output: `packages/elements/dist/knowledge/ckb.json`
- npm export: `@convergio/design-elements/knowledge`

### Content
1. **Web Components** — tag, attributes, events, imports, bestFor, dataShape, SSR safety
2. **TS Modules** — exports, types, controller methods, import paths
3. **Composition Rules** — patterns for combining components (e.g., FacetWorkbench + DataTable)
4. **Mapping Hints** — heuristics for mapping API response shapes to components
5. **Themes** — all 6 themes with variants and accent colors
6. **Constraints** — Safari compat, WCAG, token rules, SSR requirements

### Integration
The CKB is consumed by the `nasra-app-builder` agent in ConvergioPlatform, which uses it to:
- Analyze any repo's backend API surface
- Map endpoints to optimal convergio-design components
- Generate/fix/rebuild Next.js + Tauri applications

## Alternatives Considered

### A. Enhance existing documentation only
Rejected: AI agents can read docs but cannot reliably extract actionable component selection rules from prose. 32+ failed sessions prove this.

### B. Standalone CKB repo
Rejected: The CKB must stay synchronized with component source. Co-locating in the monorepo and auto-generating at build time eliminates drift.

### C. Manual curation of CKB
Rejected: components-detail.json was manually curated and drifted (22 WCs listed vs 31 in source). Auto-generation from source is the only sustainable approach.

## Consequences

### Positive
- Any AI agent with MCP access can discover all DS components and their data shapes
- API-to-component mapping is deterministic, not guesswork
- Adding new components automatically updates the CKB on next build
- Consumer repos get machine-readable integration guidance via npm

### Negative
- CKB `bestFor` and composition rules require manual curation (not auto-extractable)
- Generator script must be maintained alongside source changes
- CKB file adds ~25KB to the npm package

### Risks
- Composition rules may become stale if not reviewed during component changes
- Mapping hints are heuristic, not guaranteed — the agent must still apply judgment

## Compliance

- **CONSTITUTION.md**: CKB generator is under 250 lines, uses no emoji, follows kebab-case naming
- **WCAG**: Not applicable (data artifact, not UI)
- **CI**: CKB generation runs as part of `pnpm build`, validation in unit tests
