# 🏎️ Maranello Luce Design System

<p align="center">
  <img src="https://img.shields.io/badge/🚧_BETA-work_in_progress-FFC72C?style=for-the-badge" alt="BETA">
</p>

<p align="center">
  <a href="https://roberdan.github.io/MaranelloLuceDesign/">
    <img src="docs/screenshots/hero-nero.png" alt="Maranello Luce — Hero" width="800">
  </a>
</p>

<p align="center">
  <strong>Ferrari Luce-inspired design system for AI agent dashboards.</strong><br>
  Inspired by <a href="https://www.ferrari.com/it-IT/auto/ferrari-luce">Ferrari Luce</a>. Part of <a href="https://github.com/Roberdan/MyConvergio">Convergio</a>. Aligned with the <a href="https://github.com/Roberdan/MyConvergio/blob/master/AgenticManifesto.md">Agentic Manifesto</a>.
</p>

<p align="center">
  <a href="https://roberdan.github.io/MaranelloLuceDesign/"><img src="https://img.shields.io/badge/🏎️_Live_Demo-GitHub_Pages-FFC72C?style=for-the-badge&logo=github" alt="Live Demo"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-4.0.2-FFC72C?style=flat-square">
  <img src="https://img.shields.io/badge/license-MPL_2.0-green?style=flat-square">
  <img src="https://img.shields.io/badge/tests-354_passed-00A651?style=flat-square">
  <img src="https://img.shields.io/badge/zero_deps-vanilla_TS-4EA8DE?style=flat-square">
  <img src="https://img.shields.io/badge/WCAG_2.2-AA-8B5CF6?style=flat-square">
  <img src="https://img.shields.io/badge/themes-4_(nero%2C_avorio%2C_editorial%2C_colorblind)-D4622B?style=flat-square">
  <img src="https://img.shields.io/badge/components-150%2B_APIs-00A651?style=flat-square">
  <img src="https://img.shields.io/badge/icons-149%2B_SVGs-4EA8DE?style=flat-square">
</p>

---

> **[▶ Open Full Interactive Demo](https://roberdan.github.io/MaranelloLuceDesign/)** — 30+ sections, every component, 4 themes, self-documenting API snippets · 🇬🇧 EN / 🇮🇹 IT language selector included

---

## Dashboard & KPI Cards

<img src="docs/screenshots/dashboard-nero.png" alt="Dashboard with KPI cards" width="800">

## Charts & Data Visualization

<img src="docs/screenshots/charts-nero.png" alt="Charts" width="800">

## Ferrari Instrument Binnacle

<img src="docs/screenshots/gauges-nero.png" alt="Gauges" width="800">

## Cockpit Controls

<img src="docs/screenshots/controls-nero.png" alt="Controls" width="800">

<img src="docs/screenshots/cockpit-nero.png" alt="Cockpit" width="800">

## Layouts & Pipeline Funnel

<img src="docs/screenshots/layouts-nero.png" alt="Layouts" width="800">

## Mesh Network — AI Agent Orchestration

<img src="docs/screenshots/mesh-network-nero.png" alt="Mesh Network" width="800">

## Convergio Dashboard — Missions & Ideas

<img src="docs/screenshots/convergio-nero.png" alt="Convergio" width="800">

---

## Install

```bash
npm install github:Roberdan/MaranelloLuceDesign#v4.0.2
```

Or CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Roberdan/MaranelloLuceDesign@v4.0.2/dist/css/index.css">
<script src="https://cdn.jsdelivr.net/gh/Roberdan/MaranelloLuceDesign@v4.0.2/dist/iife/maranello.min.js"></script>
```

> **Breaking change (v4.0.0):** Glass theme removed. Themes are now **editorial · nero · avorio · colorblind**. See [CHANGELOG.md](CHANGELOG.md).

> **New in v4.0.0:** `Maranello.palette()` — reads all 20 semantic color tokens live from the active theme, no caching. Use it inside render functions instead of capturing CSS vars at load time.

## NaSra — Built-in AI Design System Expert

Maranello ships with **NaSra**, an AI agent that knows every token, theme, WCAG rule, and
responsive pattern. She prevents regressions and guides correct usage across all 4 themes.

**In this repo (Claude Code) — auto-loads:**
```
@NaSra what token should I use for a dashboard data label?
@NaSra is this component responsive? does it work on Avorio?
@NaSra check this component for WCAG 2.2 AA compliance
```

**In your project — one line in `CLAUDE.md`:**
```
@node_modules/maranello-luce-design-business/.github/agents/NaSra.agent.md
```

NaSra covers: adaptive token rules · all 4 themes · WCAG 2.2 AA · color blindness prevention ·
responsive checklist · CI constitution. Full guide: [`.github/agents/README.md`](.github/agents/README.md)

## For AI Agents → [AGENT.md](AGENT.md)

## Rules & Governance → [CONSTITUTION.md](CONSTITUTION.md)

## Development

```bash
npm run build && npm run test:unit && npm run dev
```

## Sponsor ❤️

[🫶 Donate to Fightthestroke](https://www.fightthestroke.org/donorbox)

## License

[MPL-2.0](LICENSE) — (c) Roberdan 2026 — Roberto D'Angelo
