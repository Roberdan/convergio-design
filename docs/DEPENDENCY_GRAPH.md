# Maranello Luce Design -- Dependency Graph

Source: `/VirtualBPM/docs/design/ts/` (77 files)

## File Classification

### DS-Generic (61 files -- migrate to MaranelloLuceDesign)

| Module | Files | Internal Namespace | Depends On |
|--------|-------|--------------------|------------|
| **Charts: Helpers** | `charts-helpers.ts` | `M._charts` | (none -- foundation) |
| **Charts: Basic** | `charts-basic.ts` | `M._charts` | charts-helpers |
| **Charts: Bar** | `charts-bar.ts` | `M._charts` | charts-helpers |
| **Charts: Area** | `charts-area.ts` | `M._charts` | charts-helpers |
| **Charts: Advanced** | `charts-advanced.ts` | `M._charts` | charts-helpers |
| **Charts: Viz** | `charts-viz.ts` | `M._charts` | charts-helpers |
| **Charts: Interact** | `chart-interact-hover.ts`, `chart-interact.ts` | `M._charts` | charts-helpers |
| **Charts: Aggregator** | `charts.ts` | `M.charts` | all chart-* files |
| **Gantt: Defaults** | `gantt-defaults.ts` | `M._gantt` | (none -- foundation) |
| **Gantt: Utils** | `gantt-utils.ts` | `M._gantt` | (none) |
| **Gantt: Layout** | `gantt-layout.ts` | `M._gantt` | gantt-defaults |
| **Gantt: Canvas** | `gantt-canvas.ts` | `M._gantt` | gantt-utils, gantt-layout, gantt-defaults |
| **Gantt: Header** | `gantt-header.ts` | `M._gantt` | gantt-utils, gantt-layout |
| **Gantt: Sidebar** | `gantt-sidebar.ts` | `M._gantt` | gantt-layout, gantt-defaults |
| **Gantt: Events** | `gantt-events.ts` | `M._gantt` | gantt-utils, gantt-layout |
| **Gantt: API** | `gantt-api.ts` | `M.gantt` | gantt-defaults, gantt-utils, gantt-layout, gantt-canvas, gantt-header, gantt-sidebar, gantt-events |
| **Gantt: Aggregator** | `gantt.ts` | (empty) | all gantt-* files |
| **Gauge: Class** | `gauge-engine-class.ts` | `M._gauge`, `M.FerrariGauge` | (none) |
| **Gauge: Draw** | `gauge-engine-draw.ts` | `M._gauge` | gauge-engine-class |
| **Gauge: Complications** | `gauge-engine.ts` | `M._gauge` | gauge-engine-class, gauge-engine-draw |
| **Theme Toggle** | `theme-toggle.ts` | `M.initThemeToggle` | (none) |
| **Observers** | `observers.ts` | `M.initGauges`, `M.initScrollReveal`, `M.initNavTracking`, `M.autoContrast` | gauge-engine-class |
| **Controls: Drag** | `controls-drag.ts` | `M.initRotary`, `M.initSlider` | (none) |
| **Controls: Dialogs** | `controls-dialogs.ts` | `M.initDropdown`, `M.openModal`, `M.toast`, `M.initTabs` | controls-drag (types) |
| **Controls: Nav** | `controls-nav.ts` | `M.initOrgTree`, `M.commandPalette`, etc. | (none) |
| **Controls: Aggregator** | `controls.ts` | (re-exports) | controls-drag, controls-dialogs |
| **Data Binding: Events** | `data-binding-events.ts` | `M.emit`, `M.on`, `M.bind` | (none -- foundation) |
| **Data Binding: Controls** | `data-binding.ts` | `M.updateGauge`, `M.bindChart` | data-binding-events |
| **Data Table: Render** | `data-table-render.ts` | `M._dataTable` | (none) |
| **Data Table: Logic** | `data-table-logic.ts` | `M._dataTable` | data-table-render |
| **Data Table: Factory** | `data-table.ts` | `M.dataTable` | data-table-render, data-table-logic |
| **Date Picker** | `date-picker.ts` | `M.datePicker` | (none) |
| **Funnel: Helpers** | `funnel-helpers.ts` | `M._funnelHelpers` | (none) |
| **Funnel: SVG Sankey** | `funnel.ts` | `M.funnel` | funnel-helpers |
| **Map: Helpers** | `map-view-helpers.ts` | `M._mapView` | (none -- foundation) |
| **Map: Render** | `map-view-render.ts` | `M._mapView` | map-view-helpers |
| **Map: Events** | `map-view-events.ts` | `M._mapView` | map-view-helpers |
| **Map: Factory** | `map-view.ts` | `M.mapView` | map-view-helpers, map-view-render, map-view-events |
| **H-Bar: Draw** | `h-bar-chart-draw.ts` | `M._hbar` | (none) |
| **H-Bar: Controller** | `h-bar-chart.ts` | `M.hBarChart` | h-bar-chart-draw |
| **OKR: Hero/Utils** | `okr-panel-hero.ts` | `M._okrPanel` | (none) |
| **OKR: Cards** | `okr-panel-cards.ts` | `M._okrPanel` | okr-panel-hero |
| **OKR: Aggregator** | `okr-panel.ts` | `M.okrPanel` | okr-panel-hero, okr-panel-cards |
| **AI Chat: DOM** | `ai-chat-dom.ts` | `M._chat` | (none) |
| **AI Chat: Messages** | `ai-chat-messages.ts` | `M._chat` | (none) |
| **AI Chat: Controller** | `ai-chat.ts` | `M.aiChat` | ai-chat-dom, ai-chat-messages |
| **Icons: A-Z** | `icons-az.ts` | `M.icons` | (none) |
| **Icons: Main** | `icons.ts` | `M.icons`, `M.renderIcon` | icons-az |
| **System Status** | `system-status.ts` | `M.systemStatus` | (none) |
| **Login: DOM** | `login-dom.ts` | `M._loginDom` | (none) |
| **Login: Controller** | `login.ts` | `M.loginScreen` | login-dom |
| **Profile: DOM** | `profile-menu-dom.ts` | `M._profileDom` | (none) |
| **Profile: Controller** | `profile-menu.ts` | `M.profileMenu` | profile-menu-dom |
| **Speedometer: Draw** | `speedometer-draw.ts` | `M._speedo` | (none) |
| **Speedometer: Controller** | `speedometer.ts` | `M.speedometer` | speedometer-draw |
| **Detail Panel: UI** | `detail-panel-ui.ts` | `M._detailPanel` | (none) |
| **Detail Panel: Renderers** | `detail-panel-renderers.ts` | `M._detailPanel` | (none) |
| **Detail Panel: Editors** | `detail-panel-editors.ts` | `M._detailPanel` | (none) |
| **Detail Panel: Factory** | `detail-panel.ts` | `M.detailPanel` | detail-panel-ui, renderers, editors |
| **Forms: Validate** | `forms-validate.ts` | `M._forms` | (none) |
| **Forms: Widgets** | `forms-widgets.ts` | `M._forms` | (none) |
| **Forms: Main** | `forms.ts` | `M.initForms` | forms-validate, forms-widgets |
| **Ferrari Controls** | `ferrari-controls.ts`, `ferrari-controls-manettino.ts`, `ferrari-controls-toggle.ts` | `M._ferrariControls` | (none) |
| **A11y Panel** | `a11y-panel.ts`, `a11y-panel-dom.ts` | `M.a11yPanel` | (none) |
| **Main Entry** | `maranello.ts` | DOMContentLoaded bootstrap | observers, theme-toggle, gauge-engine |

### App-Level (EXCLUDED -- 8 files)

| File | Reason |
|------|--------|
| `app-dashboard-strip.ts` | VirtualBPM dashboard-specific |
| `app-studio.ts` | VirtualBPM studio page |
| `app-detail.ts` | VirtualBPM detail page |
| `app-detail-gantt.ts` | VirtualBPM detail gantt tab |
| `app-detail-tabs.ts` | VirtualBPM detail tabs |
| `app-edit.ts` | VirtualBPM edit page |
| `app-sim.ts` | VirtualBPM simulator |
| `app-sim-engine.ts` | VirtualBPM simulator engine |

## Load Order (IIFE)

Topological sort for backward-compatible IIFE bundle:

1. `data-binding-events` (M.emit, M.on -- used by many)
2. `icons-az` then `icons` (M.icons, M.renderIcon)
3. `charts-helpers` then `charts-basic`, `charts-bar`, `charts-area`, `charts-advanced`, `charts-viz`, `chart-interact-hover`, `chart-interact`, `charts`
4. `gauge-engine-class` then `gauge-engine-draw` then `gauge-engine`
5. `speedometer-draw` then `speedometer`
6. `h-bar-chart-draw` then `h-bar-chart`
7. `gantt-defaults`, `gantt-utils`, `gantt-layout`, `gantt-canvas`, `gantt-header`, `gantt-sidebar`, `gantt-events`, `gantt-api`, `gantt`
8. `funnel-helpers` then `funnel`
9. `map-view-helpers`, `map-view-render`, `map-view-events`, `map-view`
10. `controls-drag`, `controls-dialogs`, `controls-nav`, `controls`
11. `data-table-render`, `data-table-logic`, `data-table`
12. `data-binding`
13. `date-picker`
14. `forms-validate`, `forms-widgets`, `forms`
15. `okr-panel-hero`, `okr-panel-cards`, `okr-panel`
16. `ai-chat-dom`, `ai-chat-messages`, `ai-chat`
17. `detail-panel-ui`, `detail-panel-renderers`, `detail-panel-editors`, `detail-panel`
18. `login-dom`, `login`
19. `profile-menu-dom`, `profile-menu`
20. `ferrari-controls-manettino`, `ferrari-controls-toggle`, `ferrari-controls`
21. `a11y-panel-dom`, `a11y-panel`
22. `system-status`
23. `theme-toggle`
24. `observers`
25. `maranello` (DOMContentLoaded bootstrap)

## Cross-Reference Map

| Provider | Symbol | Consumers |
|----------|--------|-----------|
| `data-binding-events` | `M.emit` | controls-drag, controls-nav, data-binding, chart-interact |
| `data-binding-events` | `M.on` | data-binding |
| `data-binding-events` | `M.bind` | data-binding |
| `charts-helpers` | `M._charts.hiDpiCanvas`, `M._charts.getCanvasSize`, `M._charts.SERIES` | all chart-* files |
| `gantt-defaults` | `G.DEFAULTS`, `G.DEFAULT_PALETTE`, `G.cssVar`, `G.textOnBg` | gantt-api, gantt-canvas, gantt-sidebar |
| `gantt-utils` | `G.parseDate`, `G.daysBetween`, `G.buildRange` | gantt-api, gantt-canvas, gantt-events |
| `gantt-layout` | `G.buildRows`, `G.rowY`, `G.roundRect`, `G.truncText` | gantt-canvas, gantt-header, gantt-sidebar, gantt-events |
| `gauge-engine-class` | `M.FerrariGauge` | observers, gauge-engine-draw, gauge-engine |
| `theme-toggle` | `M.initThemeToggle` | maranello (bootstrap) |
| `observers` | `M.initGauges`, `M.initScrollReveal`, `M.initNavTracking`, `M.autoContrast` | maranello (bootstrap), theme-toggle |
| `icons-az` + `icons` | `M.icons`, `M.renderIcon` | various UI modules |
