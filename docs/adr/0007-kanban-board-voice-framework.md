# ADR-0007: Kanban Board + Voice Adapter Framework

**Date:** 2026-03-27
**Status:** Accepted
**Version:** 5.16.0

## Context

Plan 721 (SwiftUI Command Center) requires a "Plan kanban view" for the web dashboard.
Plan 718 (Voice) requires voice input capability. The DS had a voice button UI placeholder in `aiChat` but no speech framework.

## Decision

### Kanban Board
Headless factory `kanbanBoard(container, opts)` returning a `KanbanController` with drag-drop, keyboard navigation, and WCAG 2.2 AA compliance. Split across 3 files (board, drag, dom) to respect 250-line limit. Exposed as `window.Maranello.kanbanBoard` (IIFE) and `<mn-kanban-board>` Web Component.

### Voice Framework
Generic multi-provider `VoiceAdapter` interface with `VoiceManager` state machine controller. **Consumer boundary: consumers own speech recognition and API keys.** The DS provides the framework (adapter interface, UI state management, aiChat integration) and a reference GPT Realtime adapter. This keeps the DS provider-agnostic while enabling plug-and-play voice for any STT service.

### IIFE Bundle Limit
Bumped from 450KB to 500KB to accommodate new components. Current bundle: ~471KB gzipped to ~130KB.

## Consequences

- Consumers implementing voice must provide a `VoiceAdapter` (or use `createRealtimeAdapter` with their API key)
- Kanban drag-drop uses native mouse/touch events, no external library (zero-dep constraint)
- SwiftUI will reimplement kanban natively; the web component serves dashboard consumers
