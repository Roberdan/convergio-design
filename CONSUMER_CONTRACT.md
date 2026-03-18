<!-- v4.15.0 | 2026-03-17 -->
# Consumer Contract — Maranello Presentation Runtime

Defines what consumer apps own vs what Maranello Runtime owns. Violation = domain leak.

---

## What Consumer Apps Own

| Concern | Examples |
|---|---|
| **Data fetching** | REST/GraphQL calls, caching, polling, auth tokens |
| **Business rules** | Eligibility checks, access control, field derivation |
| **Permissions** | Which views/actions the current user may see |
| **Navigation state** | Active route, deep-link params, history push |
| **Actions / workflows** | Submit, approve, delete — the actual side-effects |
| **Domain-specific calculations** | Margin %, burn rate, custom KPI formulas |
| **Vocabulary** | Entity names, column labels, error messages |

Consumer code calls Maranello with pre-resolved data + pre-bound callbacks. It never renders DOM directly for views it has registered.

---

## What Maranello Owns

| Concern | APIs |
|---|---|
| **Rendering** | `DashboardRenderer`, `FacetWorkbench`, `EntityWorkbench`, `DataTable` |
| **Layout composition** | `AppShellController` — slots: nav, toolbar, filter-bar, main, secondary, detail, bottom, overlay |
| **Shell / workspace behaviour** | Layout mode switching, sidebar collapse, bottom dock |
| **Panel orchestration** | `PanelOrchestrator` — open, close, move, swap, stack |
| **Interaction patterns** | Keyboard navigation, drag handles, focus management |
| **Loading / empty / error states** | `StateScaffold` — 5 states with ARIA live regions |
| **Responsive adaptation** | CSS breakpoints, `autoResize()`, fluid canvas |
| **Accessibility** | WCAG 2.2 AA, `<mn-a11y>` FAB, focus trapping in modals |
| **Themes** | Token system, `setTheme()`, `cycleTheme()` |

Consumer code never writes CSS that overrides `mn-app-shell`, `mn-panel-view`, `mn-scaffold`, or `mn-dashboard-*` internals.

---

## How to Use the Runtime

### Step 1 — Register Views

```ts
import { ViewRegistry, DashboardRenderer } from 'maranello-luce-design-business';

const registry = ViewRegistry.getInstance();
registry.register({
  id: 'overview',
  title: 'Overview',
  defaultPlacement: 'page',
  factory: (el, data) => new DashboardRenderer(el, { schema, data }),
});
```

### Step 2 — Configure the Shell

```ts
import { AppShellController } from 'maranello-luce-design-business';

const shell = new AppShellController(document.getElementById('app'), {
  layout: 'split',
  sidebarCollapsed: false,
});
// Populate slots with nav / toolbar markup as needed
shell.getSlot('nav').appendChild(myNavEl);
```

### Step 3 — Bind Data and Actions via Orchestrator

```ts
import { PanelOrchestrator, NavigationModel } from 'maranello-luce-design-business';

const nav = new NavigationModel();
const orchestrator = new PanelOrchestrator(registry, nav);

// Open a registered view (data passed to factory)
orchestrator.open('overview', 'page', await fetchOverviewData());

// React to navigation changes
nav.onNavigate((entry, action) => {
  console.log('active view:', entry.viewId, action);
});
```

---

## Anti-Patterns

| Anti-Pattern | Why it's Wrong | Correct Alternative |
|---|---|---|
| `createElement`-heavy rendering inside views | Bypasses Maranello render pipeline; no state scaffold | Use `DashboardRenderer`, `EntityWorkbench`, or `DataTable` |
| Custom layout CSS targeting `mn-app-shell__*` slots | Breaks layout mode switching and responsive overrides | Configure layout via `AppShellController.setLayout()` |
| Inline styles on `mn-panel-view` containers | Conflicts with placement logic in `PanelOrchestrator` | Use `sizeHint` in `ViewConfig` |
| Feature-specific presentation shells (per-app wrappers) | Duplicates shell behaviour; creates inconsistent UX | Extend via `AppShellConfig`; use slots |
| Calling `openDetailPanel()` directly inside a registered view | Bypasses orchestrator; breaks panel stack | Fire a domain action callback; let orchestrator decide placement |
| Hard-coding domain labels in `FacetConfig.type` | `FacetConfig` is generic — type is a UI concept | Keep labels in consumer-owned config objects |

---

## Migration Guide

### Old Pattern: Manual DOM

```ts
// ❌ Before — consumer builds DOM
const panel = document.createElement('div');
panel.className = 'my-custom-layout';
document.getElementById('app').appendChild(panel);
renderMyTable(panel, data);
```

Problems: no state scaffold, no theme tokens, no responsive handling, no accessibility.

### New Pattern: Schema-Driven Runtime

```ts
// ✅ After — consumer provides config + data
registry.register({
  id: 'my-view',
  title: 'My View',
  defaultPlacement: 'page',
  factory: (el, data) => {
    return new Maranello.DashboardRenderer(el, { schema: MY_SCHEMA, data });
  },
});
orchestrator.open('my-view', 'page', await fetchData());
```

Benefits: automatic loading/empty/error states via `StateScaffold`, theme tokens, keyboard navigation, responsive layout, WCAG 2.2 AA.

### Migration Checklist

| Step | Action |
|---|---|
| 1 | Move DOM-building code into a `factory` function in `ViewConfig` |
| 2 | Replace custom layout divs with `AppShellController` + slot assignment |
| 3 | Replace manual loading spinners with `StateScaffold` |
| 4 | Replace `openDetailPanel()` calls with `orchestrator.open('detail-view', 'side-panel')` |
| 5 | Replace filter UI with `FacetWorkbench` + `onFilterChange` callback |
| 6 | Replace entity forms with `EntityWorkbench` + `onSave` / `onAction` callbacks |
