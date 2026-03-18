<!-- v4.15.0 | 2026-03-17 — 10 Presentation Runtime API contracts added -->
# API Contracts — v4.15.0 Components

## Presentation Runtime

---

## AppShellController (src/ts/app-shell.ts)

```ts
export type LayoutMode = 'full' | 'split' | 'stacked' | 'docked-bottom' | 'dual-panel' | 'side-detail';
export interface AppShellConfig {
  layout?: LayoutMode;
  sidebarCollapsed?: boolean;
  bottomDockHeight?: string;
}
```

```ts
new AppShellController(container: HTMLElement, config?: AppShellConfig)
```

| Method | Signature | Description |
|---|---|---|
| `setLayout` | `(mode: LayoutMode): void` | Switch layout, updates CSS modifier class |
| `getLayout` | `(): LayoutMode` | Returns current layout mode |
| `toggleSidebar` | `(): void` | Toggle `mn-app-shell--sidebar-collapsed` |
| `isSidebarCollapsed` | `(): boolean` | Sidebar collapsed state |
| `setBottomDock` | `(open: boolean): void` | Show/hide bottom dock slot |
| `getSlot` | `(name: string): HTMLElement \| null` | Get named slot element |
| `destroy` | `(): void` | Remove all shell classes and slots |

**Slots**: `nav` · `toolbar` · `filter-bar` · `main` · `secondary` · `detail` · `bottom` · `overlay`
**CSS**: `mn-app-shell`, `mn-app-shell--{mode}`, `mn-app-shell--sidebar-collapsed`, `mn-app-shell--bottom-open`, `mn-app-shell__{slot}`

**Headless JS:**
```ts
const shell = new AppShellController(document.getElementById('app'), { layout: 'split' });
shell.getSlot('nav').appendChild(navEl);
shell.getSlot('main').appendChild(contentEl);
shell.toggleSidebar();
```

**Web Component — `<mn-app-shell>`:**
```html
<mn-app-shell layout="split" sidebar-collapsed>
  <div slot="nav">...</div>
  <div slot="main">...</div>
</mn-app-shell>
```
```ts
document.querySelector('mn-app-shell').setLayout('full');
```

---

## ViewRegistry (src/ts/view-registry.ts)

Singleton. Emits events on `eventBus`.

```ts
export type Placement = 'page' | 'side-panel' | 'bottom-dock' | 'modal' | 'overlay' | 'workspace';
export interface ViewConfig {
  id: string;
  tag?: string;
  factory?: (container: HTMLElement, data?: unknown) => unknown;
  title: string;
  icon?: string;
  defaultPlacement: Placement;
  sizeHint?: { width?: string; height?: string };
}
```

| Method | Signature | Description |
|---|---|---|
| `getInstance` | `(): ViewRegistry` (static) | Get/create singleton |
| `reset` | `(): void` (static) | Destroy singleton (testing) |
| `register` | `(config: ViewConfig): void` | Register a view; throws if duplicate `id` |
| `get` | `(id: string): ViewConfig \| undefined` | Lookup by id |
| `list` | `(): ReadonlyArray<ViewConfig>` | All registered configs |
| `unregister` | `(id: string): boolean` | Remove; returns false if not found |
| `has` | `(id: string): boolean` | Check registration |
| `clear` | `(): void` | Unregister all |

**Events** (via `eventBus`): `view-registered` `{ viewId, config }` · `view-unregistered` `{ viewId }`

**Headless JS:**
```ts
const reg = ViewRegistry.getInstance();
reg.register({ id: 'orders', title: 'Orders', defaultPlacement: 'page',
  factory: (el, data) => new DashboardRenderer(el, { schema, data }) });
console.log(reg.list().map(v => v.id));
```

---

## PanelOrchestrator (src/ts/panel-orchestrator.ts)

```ts
export interface PanelHandle {
  viewId: string;
  placement: Placement;
  container: HTMLElement;
  close(): void;
  moveTo(placement: Placement): void;
}
```

```ts
new PanelOrchestrator(registry: ViewRegistry, navigation: NavigationModel)
```

| Method | Signature | Description |
|---|---|---|
| `open` | `(viewId, target?, data?): PanelHandle` | Mount view; reuses open instance |
| `close` | `(viewId): void` | Unmount + remove DOM |
| `move` | `(viewId, newTarget): void` | Re-slot to different placement |
| `stack` | `(viewId): void` | Bring to front of slot; open if not open |
| `swap` | `(viewId1, viewId2): void` | Exchange placements of two open views |
| `getOpen` | `(): Map<string, {placement, handle}>` | All currently open views |
| `isOpen` | `(viewId): boolean` | Check open state |
| `closeAll` | `(): void` | Close all open views |
| `destroy` | `(): void` | Close all + clear state |

**Events** (via `eventBus`): `panel-opened` `{ viewId, placement }` · `panel-closed` `{ viewId }` · `panel-moved` `{ viewId, from, to }`
**CSS**: `mn-panel-view` (each mounted view wrapper), `mn-slot mn-slot--{placement}` (auto-created slot containers)

**Headless JS:**
```ts
const orch = new PanelOrchestrator(registry, nav);
const handle = orch.open('orders', 'page', orderData);
handle.moveTo('side-panel');
handle.close();
```

---

## FacetWorkbench (src/ts/facet-workbench.ts)

```ts
export type FacetType = 'select' | 'multi-select' | 'search' | 'date-range' | 'boolean';
export interface FacetOption { value: string; label: string; count?: number }
export interface FacetConfig {
  id: string;
  label: string;
  type: FacetType;
  dataProvider: () => Promise<FacetOption[]>;
  countProvider?: (filters: Map<string,string[]>) => Promise<number>;
  exclusionRules?: { excludes: string[] };
}
export interface FacetPreset { name: string; filters: Map<string, string[]> }
export interface FacetWorkbenchOptions {
  facets: FacetConfig[];
  onFilterChange?: (activeFilters: Map<string, string[]>) => void;
  presets?: FacetPreset[];
}
```

```ts
new FacetWorkbench(container: HTMLElement, options: FacetWorkbenchOptions)
```

| Method | Signature | Description |
|---|---|---|
| `getActiveFilters` | `(): Map<string, string[]>` | Current filter state (cloned) |
| `clearAll` | `(): void` | Reset all filters |
| `clearFacet` | `(id: string): void` | Reset single facet |
| `savePreset` | `(name: string): FacetPreset` | Snapshot current filters as named preset |
| `loadPreset` | `(name: string): void` | Restore filters from named preset |
| `listPresets` | `(): ReadonlyArray<FacetPreset>` | All saved presets |
| `destroy` | `(): void` | Cancel timers, remove keyboard handler, clear DOM |

**CSS**: `mn-facet`, `mn-facet--collapsed`, `mn-facet__option-input`, `mn-facet__header`, `mn-facet__body`, `mn-facet__count`

**Headless JS:**
```ts
const wb = new FacetWorkbench(el, {
  facets: [{ id: 'status', label: 'Status', type: 'multi-select',
    dataProvider: () => fetchStatuses() }],
  onFilterChange: (f) => table.setFilter(f),
});
wb.getActiveFilters(); // Map { 'status' => ['active'] }
```

**Web Component — `<mn-facet-workbench>`:**
```html
<mn-facet-workbench id="filters"></mn-facet-workbench>
```
```ts
document.getElementById('filters').setOptions({ facets: myFacets,
  onFilterChange: (f) => myTable.setFilter(f) });
```

---

## EntityWorkbench (src/ts/entity-workbench.ts)

```ts
export interface EntityField {
  key: string; label: string; type: string;
  options?: Record<string, unknown>; required?: boolean; readOnly?: boolean;
  provider?: AsyncDataProvider; compute?: (data) => unknown; fields?: EntityField[];
}
export interface EntitySection { title?: string; fields: EntityField[] }
export interface EntityTab { id: string; label: string; sections: EntitySection[] }
export interface EntitySchema { tabs: EntityTab[] }
export interface EntityWorkbenchOptions {
  schema: EntitySchema; data: Record<string, unknown>; editable?: boolean;
  actions?: Array<{ id: string; label: string; icon?: string; variant?: string }>;
  onSave?: (data: Record<string, unknown>) => void | Promise<void>;
  onClose?: () => void;
  onAction?: (actionId: string, data: Record<string, unknown>) => void;
}
```

```ts
new EntityWorkbench(container: HTMLElement, options: EntityWorkbenchOptions)
```

| Method | Signature | Description |
|---|---|---|
| `isDirty` | `(): boolean` | True if any field differs from base data |
| `canGoBack` | `(): boolean` | True when back-stack has entries |
| `getCurrentDepth` | `(): number` | Back-stack depth (1 = root) |
| `getModifiedData` | `(): Record<string,unknown>` | Diff of current vs base |
| `validate` | `(): { valid: boolean; errors: Map<string,string> }` | Run field validators |
| `pushEntity` | `(schema, data): void` | Navigate into nested entity |
| `popEntity` | `(): boolean` | Return to previous entity |
| `destroy` | `(): void` | Destroy async controls, clear DOM |

**CSS**: `mn-entity-workbench`, `mn-form-input`, `mn-form-select`, `mn-field__error`, breadcrumb via `mn-breadcrumb`

**Headless JS:**
```ts
const wb = new EntityWorkbench(el, { schema: USER_SCHEMA, data: user,
  onSave: async (delta) => { await api.patch(user.id, delta); } });
wb.pushEntity(ORG_SCHEMA, await fetchOrg(user.orgId));
```

**Web Component — `<mn-entity-workbench>`:**
```html
<mn-entity-workbench id="editor"></mn-entity-workbench>
```
```ts
document.getElementById('editor').configure({ schema: USER_SCHEMA, data: user,
  onSave: delta => api.patch(user.id, delta) });
```

---

## DashboardRenderer (src/ts/dashboard-renderer.ts)

```ts
export type WidgetType = DashboardWidgetType;
export interface DashboardWidget { type: WidgetType; dataKey: string; span?: number; options?: Record<string,unknown> }
export interface DashboardRow { columns: DashboardWidget[] }
export interface DashboardSchema { rows: DashboardRow[] }
```

```ts
new DashboardRenderer(container: HTMLElement, options: { schema: DashboardSchema; data?: Record<string,unknown> })
```

| Method | Signature | Description |
|---|---|---|
| `setData` | `(key: string, value: unknown): void` | Update one widget by `dataKey`; `Error` → error state, `null/undefined` → loading, `[]` → empty |
| `setSchema` | `(schema: DashboardSchema): void` | Full re-render with new schema |
| `getWidget` | `(dataKey: string): unknown` | Get underlying `WidgetController` |
| `destroy` | `(): void` | Destroy all widgets + scaffold + clear DOM |

**CSS**: `mn-dashboard-renderer`, `mn-dashboard-row`, `mn-dashboard-cell`, `mn-dashboard-body`
Each cell wraps a `StateScaffold` — states: `loading` | `empty` | `error` | `partial` | `no-results`.

**Headless JS:**
```ts
const dash = new DashboardRenderer(el, { schema: MY_SCHEMA });
dash.setData('revenue', revenueArray);
dash.setData('errors', new Error('Service unavailable'));
```

**Web Component — `<mn-dashboard>`:**
```html
<mn-dashboard id="main-dash"></mn-dashboard>
```
```ts
const d = document.getElementById('main-dash');
d.schema = MY_SCHEMA;
d.setData('revenue', await fetchRevenue());
```

---

## AsyncSelect (src/ts/async-select.ts)

```ts
export interface AsyncDataProvider<T = unknown> {
  search(query: string): Promise<T[]>;
  renderItem?: (item: T) => string;
  getLabel?: (item: T) => string;
  getId?: (item: T) => string;
}
export interface AsyncSelectOptions<T = unknown> {
  provider: AsyncDataProvider<T>;
  onSelect?: (item: T) => void;
  placeholder?: string;
  debounceMs?: number;   // default 300
  minChars?: number;     // default 1
}
```

```ts
new AsyncSelect<T>(container: HTMLElement, options: AsyncSelectOptions<T>)
```

| Method | Signature | Description |
|---|---|---|
| `open` | `(): void` | Show dropdown |
| `close` | `(): void` | Hide dropdown, reset active index |
| `clear` | `(): void` | Clear selection + input + close |
| `getValue` | `(): T \| undefined` | Currently selected item |
| `setProvider` | `(provider: AsyncDataProvider<T>): void` | Swap data source + clear |
| `destroy` | `(): void` | Remove event listeners, clear DOM |

**Keyboard**: `↑`/`↓` navigate, `Enter` select, `Escape`/`Tab` close.
**CSS**: `mn-async-select`, `mn-async-select__input`, `mn-async-select__dropdown`, `mn-async-select__item`, `mn-async-select__item--active`, `mn-async-select__loading`, `mn-async-select__spinner`
**ARIA**: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `role="listbox"`, `role="option"`, `aria-activedescendant`

**Headless JS:**
```ts
const sel = new AsyncSelect(el, { provider: { search: q => api.searchUsers(q),
  getLabel: u => u.name, getId: u => u.id },
  onSelect: user => form.setField('assignee', user.id) });
```

**Web Component — `<mn-async-select>`:**
```html
<mn-async-select placeholder="Search users..." id="user-sel"></mn-async-select>
```
```ts
document.getElementById('user-sel').provider = { search: q => api.searchUsers(q) };
document.getElementById('user-sel').addEventListener('mn-select', e => console.log(e.detail));
```

---

## StateScaffold (src/ts/state-scaffold.ts)

```ts
export interface StateScaffoldOptions {
  state: 'loading' | 'empty' | 'error' | 'partial' | 'no-results';
  message?: string;
  actionLabel?: string;
  onRetry?: () => void;
  onAction?: () => void;
}
```

```ts
new StateScaffold(container: HTMLElement, options: StateScaffoldOptions)
```

| Method | Signature | Description |
|---|---|---|
| `setState` | `(state, message?): void` | Transition state; updates CSS + ARIA |
| `getState` | `(): string` | Current state name |
| `destroy` | `(): void` | Move content back to container, remove scaffold markup |

**States**:

| State | Behaviour | ARIA |
|---|---|---|
| `loading` | 3 skeleton bars | `role="status"` `aria-busy="true"` `aria-live="polite"` |
| `empty` | Message + optional action button | `role="status"` `aria-live="polite"` |
| `error` | Message + Retry button | `role="status"` `aria-live="polite"` |
| `partial` | Banner only; content visible | `role="status"` `aria-live="polite"` |
| `no-results` | Message + optional Clear filters button | `role="status"` `aria-live="polite"` |

**CSS**: `mn-scaffold`, `mn-scaffold--{state}`, `mn-scaffold__status`, `mn-scaffold__content`, `mn-scaffold__content--hidden`, `mn-scaffold__skeleton-bar`, `mn-scaffold__panel`, `mn-scaffold__message`, `mn-scaffold__action`, `mn-scaffold__banner`

**Headless JS:**
```ts
const scaffold = new StateScaffold(el, { state: 'loading' });
const data = await fetchData().catch(err => err);
scaffold.setState(data instanceof Error ? 'error' : data.length ? 'partial' : 'empty',
  data instanceof Error ? data.message : undefined);
```

**Web Component — `<mn-state-scaffold>`:**
```html
<mn-state-scaffold state="loading" id="wrap"><div>Real content</div></mn-state-scaffold>
```
```ts
document.getElementById('wrap').setState('partial');
```

---

## NavigationModel (src/ts/navigation-model.ts)

```ts
export interface ViewEntry { viewId: string; params?: Record<string,unknown>; timestamp: number }
export type NavigateAction = 'push' | 'pop' | 'replace';
export type NavigateCallback = (entry: ViewEntry, action: NavigateAction) => void;
```

```ts
new NavigationModel()
```

| Method | Signature | Description |
|---|---|---|
| `push` | `(viewId, params?): ViewEntry` | Push entry onto stack; emits `navigate` |
| `pop` | `(): ViewEntry \| undefined` | Pop top; emits `navigate` with previous entry |
| `replace` | `(viewId, params?): ViewEntry` | Replace top entry; emits `navigate` |
| `current` | `(): ViewEntry \| undefined` | Peek top of stack |
| `canGoBack` | `(): boolean` | True if stack has > 1 entry |
| `history` | `(): ReadonlyArray<ViewEntry>` | Full stack snapshot |
| `clear` | `(): void` | Empty stack (no event) |
| `onNavigate` | `(cb): () => void` | Subscribe; returns unsubscribe fn |
| `destroy` | `(): void` | Clear stack + all callbacks |

**Events**: `navigate` on both instance bus and global `eventBus` — payload `{ entry: ViewEntry, action: NavigateAction }`

**Headless JS:**
```ts
const nav = new NavigationModel();
const unsub = nav.onNavigate((entry, action) => updateBreadcrumb(entry, action));
nav.push('dashboard'); nav.push('detail', { id: 42 });
nav.canGoBack(); // true
nav.pop();
unsub();
```

---

## v4.11.0 Components

## userTable (src/ts/user-table.ts)

```ts
function userTable(el: HTMLElement, users: AdminUser[], opts?: UserTableOptions): UserTableController
```

**AdminUser**: `id`, `name`, `email`, `role: UserRole`, `status: UserStatus`, `lastActive?`, `avatarUrl?`, `teams?`
**UserRole**: `'admin' | 'member' | 'viewer' | 'billing'`
**UserStatus**: `'active' | 'inactive' | 'suspended' | 'invited'`
**UserTableOptions**: `searchable?`, `selectable?`, `onSelect?(user)`, `onAction?(user, action)`, `pageSize?`
**Controller**: `update(users)`, `setFilter(query)`, `getSelected()`, `destroy()`
**CSS**: `mn-user-table` prefix. Actions: `edit | suspend | delete | resend-invite`.

## auditLog (src/ts/audit-log.ts)

```ts
function auditLog(el: HTMLElement, entries?: AuditEntry[], opts?: AuditLogOptions): AuditLogController
```

**AuditEntry**: `id`, `timestamp`, `actor`, `actorRole?`, `action`, `resource?`, `severity: AuditSeverity`, `metadata?`, `ipAddress?`
**AuditSeverity**: `'info' | 'warning' | 'error' | 'critical' | 'success'`
**AuditLogOptions**: `maxEntries?` (default 100), `filterable?`, `onSelect?`, `live?`
**Controller**: `prepend(entry)`, `append(entry)`, `setFilter(severity | 'all')`, `clear()`, `destroy()`
**CSS**: `mn-audit` prefix. ARIA: `role="log"`, expandable entries, live region.

## agentCostBreakdown (src/ts/agent-cost-breakdown.ts)

```ts
function agentCostBreakdown(el: HTMLElement, rows: AgentCostRow[], opts?: AgentCostBreakdownOptions): AgentCostBreakdownController
```

**AgentCostRow**: `id`, `agentName`, `model`, `totalTokens`, `cachedTokens?`, `cost`, `costDelta?`, `calls`, `avgLatencyMs?`, `budget?`, `tags?`
**Options**: `currency?` (USD), `period?`, `onSelect?`, `onBudgetAlert?`, `sortable?`
**Controller**: `update(rows)`, `destroy()`
**CSS**: `mn-cost-breakdown` prefix. Fires budget alert when cost > 80% of budget.

## costTimeline (src/ts/charts-cost-timeline.ts)

```ts
function costTimeline(canvas: HTMLCanvasElement, opts: CostTimelineOptions): CostTimelineController
```

**CostSeries**: `id`, `label`, `color?`, `values: number[]`
**Options**: `labels: string[]`, `series: CostSeries[]`, `height?`, `stacked?`, `animate?`, `unit?` ($), `onHover?`
**Controller**: `update(partial)`, `destroy()`
**A11y**: sr-only data table with period rows and series columns.

## businessModelCanvas (src/ts/business-model-canvas.ts)

```ts
function businessModelCanvas(el: HTMLElement, opts?: BusinessModelCanvasOptions): BusinessModelCanvasController
```

**BmcBlockId**: 9 Osterwalder blocks (`key-partners`, `key-activities`, `value-proposition`, etc.)
**BmcItem**: `id`, `text`, `blockId: BmcBlockId`
**Options**: `blocks?`, `editable?` (default true), `onChange?`
**Controller**: `getBlocks()`, `addItem(blockId, text)`, `removeItem(id)`, `update(blocks)`, `destroy()`
**CSS**: `mn-bmc` prefix. CSS grid layout matching Osterwalder 9-block.

## agentTrace (src/ts/agent-trace.ts)

```ts
function agentTrace(el: HTMLElement, steps?: TraceStep[], opts?: AgentTraceOptions): AgentTraceController
```

**TraceStep**: `id`, `kind: TraceStepKind`, `label`, `status: TraceStepStatus`, `durationMs?`, `input?`, `output?`, `timestamp?`
**TraceStepKind**: `'tool' | 'reasoning' | 'result' | 'handoff'`
**TraceStepStatus**: `'pending' | 'running' | 'done' | 'error'`
**Options**: `maxVisible?`, `onSelect?`
**Controller**: `add(step)`, `update(id, partial)`, `clear()`, `destroy()`
**CSS**: `mn-agent-trace` prefix. Expandable steps with input/output detail.

## tokenMeter (src/ts/token-meter.ts)

```ts
function tokenMeter(el: HTMLElement, usage?: TokenUsage, opts?: TokenMeterOptions): TokenMeterController
```

**TokenUsage**: `prompt`, `completion`, `cached?`, `budget?`, `costPerMToken?`
**Options**: `label?`, `showCost?`, `showBreakdown?`, `animate?`, `onChange?`
**Controller**: `update(usage)`, `reset()`, `destroy()`
**CSS**: `mn-token-meter` prefix. ARIA: `role="meter"` on bar.

## streamingText (src/ts/streaming-text.ts)

```ts
function streamingText(el: HTMLElement, opts?: StreamingTextOptions): StreamingTextController
```

**Options**: `onCitationClick?`, `onDone?`, `typingCursor?` (true), `processMarkdown?` (true)
**Controller**: `append(chunk)`, `done()`, `reset()`, `setText(text)`, `destroy()`
**CSS**: `mn-stream` prefix. Markdown-lite: bold `**text**`, inline `` `code` ``, citations `[N]`.
**A11y**: `role="log"`, `aria-live="polite"`, sr-only live region.

## riskMatrix (src/ts/charts-risk-matrix.ts)

```ts
function riskMatrix(canvas: HTMLCanvasElement, opts: RiskMatrixOptions): RiskMatrixController | undefined
```

**RiskItem**: `id`, `label`, `probability: 1-5`, `impact: 1-5`, `color?`
**Options**: `items[]`, `height?`, `gridSize?`, `animate?`, `onHover?`, `onClick?`
**Controller**: `update(items)`, `destroy()`
**A11y**: sr-only data table with risk level per item.

## kpiScorecard (src/ts/kpi-scorecard.ts)

```ts
function kpiScorecard(el: HTMLElement, rows: KpiRow[], opts?: KpiScorecardOptions): KpiScorecardController
```

**KpiRow**: `id`, `label`, `unit?`, `target`, `actual`, `trend?: number[]`, `status?: KpiStatus`, `format?`
**KpiStatus**: `'green' | 'yellow' | 'red' | 'neutral'`
**Options**: `currency?`, `onSelect?`, `animate?`
**Controller**: `update(rows)`, `destroy()`
**CSS**: `mn-kpi` prefix. Inline sparkline in trend column.

## cohortGrid (src/ts/cohort-grid.ts)

```ts
function cohortGrid(el: HTMLElement, rows: CohortRow[], opts?: CohortGridOptions): CohortGridController
```

**CohortRow**: `label`, `initialSize`, `retention: number[]` (0-1 fractions)
**Options**: `periodLabels?`, `showAbsolute?`, `onHover?`, `colorHigh?`, `colorLow?`
**Controller**: `update(rows, opts?)`, `destroy()`
**CSS**: `mn-cohort` prefix. Color-interpolated cells from low (red) to high (green).

## approvalChain (src/ts/approval-chain.ts)

```ts
function approvalChain(el: HTMLElement, steps: ApprovalStep[], opts?: ApprovalChainOptions): ApprovalChainController
```

**ApprovalStep**: `id`, `name`, `role?`, `status: ApprovalStatus`, `timestamp?`, `comment?`
**ApprovalStatus**: `'pending' | 'approved' | 'rejected' | 'skipped' | 'current'`
**Options**: `onAction?`, `editable?`, `orientation?` (`horizontal` | `vertical`)
**Controller**: `update(steps)`, `setStatus(id, status, timestamp?)`, `destroy()`
**CSS**: `mn-approval` prefix. Avatar initials, status badges, action buttons on current step.

## bcgMatrix (src/ts/charts-bcg-matrix.ts)

```ts
function bcgMatrix(canvas: HTMLCanvasElement, opts: BCGMatrixOptions): BCGMatrixController | undefined
```

**BCGItem**: `id`, `label`, `marketShare` (0-1), `growthRate` (%), `size?`, `color?`
**Options**: `items[]`, `height?`, `shareThreshold?` (0.5), `growthThreshold?` (10), `onHover?`, `onClick?`, `animate?`
**Controller**: `update(items)`, `destroy()`
**Quadrants**: Stars, Cash Cows, ? Marks, Dogs. A11y sr-only table with quadrant labels.

## nineBoxMatrix (src/ts/nine-box-matrix.ts)

```ts
function nineBoxMatrix(el: HTMLElement, opts: NineBoxMatrixOptions): NineBoxMatrixController
```

**NineBoxItem**: `id`, `label`, `x: 1|2|3`, `y: 1|2|3`, `subtitle?`, `color?`
**Options**: `items[]`, `xLabel?`, `yLabel?`, `xAxisLabels?`, `yAxisLabels?`, `onSelect?`, `onMove?`
**Controller**: `update(items)`, `moveItem(id, x, y)`, `getItems()`, `destroy()`
**CSS**: `mn-nine-box` prefix. Click-to-select + arrow-key move. Tier colors: invest/selective/divest.

## swotMatrix (src/ts/swot-matrix.ts)

```ts
function swotMatrix(el: HTMLElement, opts?: SwotMatrixOptions): SwotMatrixController
```

**SwotItem**: `id`, `text`, `quadrant: SwotQuadrant`
**SwotQuadrant**: `'strengths' | 'weaknesses' | 'opportunities' | 'threats'`
**Options**: `items?`, `editable?` (true), `onChange?`, `quadrantLabels?`
**Controller**: `getItems()`, `addItem(quadrant, text)`, `removeItem(id)`, `update(items)`, `destroy()`
**CSS**: `mn-swot` prefix. 2x2 grid, inline add/remove per quadrant.

## decisionMatrix (src/ts/decision-matrix.ts)

```ts
function decisionMatrix(el: HTMLElement, opts: DecisionMatrixOptions): DecisionMatrixController
```

**DecisionCriterion**: `id`, `label`, `weight: number`
**DecisionAlternative**: `id`, `label`, `scores: Record<string, number>` (1-10)
**Options**: `criteria[]`, `alternatives[]`, `editable?`, `onChange?`
**Controller**: `update(alternatives)`, `getScores()`, `destroy()`
**CSS**: `mn-decision-matrix` prefix. Weighted totals, auto-ranking, inline editing.

## waterfallChart (src/ts/charts-waterfall.ts)

```ts
function waterfallChart(canvas: HTMLCanvasElement, opts: WaterfallChartOptions): void
```

**WaterfallSegment**: `label`, `value`, `isTotal?`
**Options**: `segments[]`, `unit?`, `animate?` (true), `height?`
**A11y**: `role="img"`, sr-only table with segment/value/running-total columns. Fire-and-forget (no controller).

## confidenceChart (src/ts/charts-confidence.ts)

```ts
function confidenceChart(canvas: HTMLCanvasElement, opts: ConfidenceChartOptions): void
```

**Options**: `labels[]`, `values[]`, `lower[]`, `upper[]`, `unit?`, `color?`, `animate?`, `height?`
**A11y**: `role="img"`, sr-only table with label/value/lower/upper columns. Fire-and-forget (no controller).

## dateRangePicker (src/ts/date-range-picker.ts)

```ts
function dateRangePicker(el: HTMLElement, opts?: DateRangePickerOptions): DateRangePickerController
```

**DateRange**: `{ from: string | null; to: string | null }` (ISO dates)
**Options**: `value?`, `min?`, `max?`, `placeholder?`, `onChange?`
**Controller**: `getValue()`, `setValue(range)`, `open()`, `close()`, `destroy()`
**CSS**: `mn-drp` prefix. Calendar popup, Monday-start weeks, min/max constraints.

## activityFeed (src/ts/activity-feed.ts)

```ts
function activityFeed(el: HTMLElement, items?: ActivityItem[], opts?: ActivityFeedOptions): ActivityFeedController
```

**ActivityItem**: `id`, `title`, `body?`, `meta?`, `icon?` (SVG string), `type?`
**Options**: `maxItems?`, `animate?` (true)
**Controller**: `add(item)`, `prepend(item)`, `clear()`, `destroy()`
**CSS**: `mn-feed` prefix. ARIA: `role="feed"`. Slide-in animation.

## bulletChart (src/ts/charts-bullet.ts)

```ts
function bulletChart(canvas: HTMLCanvasElement, opts: BulletChartOptions): void
```

**BulletRange**: `max`, `color?`, `label?`
**Options**: `value`, `target`, `max`, `label?`, `unit?`, `ranges?`, `height?`, `animate?`
**A11y**: `role="img"` with value/target/percentage label. Fire-and-forget (no controller).

## notificationCenter (src/ts/notification-center.ts)

```ts
function notificationCenter(triggerEl: HTMLElement, opts?: NotificationCenterOptions): NotificationCenterController
```

**MnNotification**: `id`, `title`, `body?`, `type?`, `timestamp?`, `read?`, `action?`
**Options**: `maxVisible?` (50), `onAction?`, `position?` (`right` | `left`)
**Controller**: `add(n)`, `markRead(id)`, `markAllRead()`, `remove(id)`, `clear()`, `getUnreadCount()`, `open()`, `close()`, `toggle()`, `destroy()`
**CSS**: `mn-notif-panel`, `mn-notif-item` prefixes. ARIA: `role="dialog"`. Backdrop + Escape close.
