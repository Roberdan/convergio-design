# Maranello Presentation Runtime — Agent Cookbook

## Quick reference

### AppShellController

```js
const shell = new Maranello.AppShellController(el, { layout: 'side-detail' });
shell.setLayout('split');
shell.toggleSidebar();
```

### ViewRegistry

```js
const registry = Maranello.ViewRegistry.getInstance();
registry.register({ id: 'home', title: 'Home', defaultPlacement: 'page', factory: renderHome });
registry.get('home');
```

### PanelOrchestrator

```js
const orch = new Maranello.PanelOrchestrator(registry, nav);
orch.open('detail', 'side-panel', { id: 42 });
orch.move('detail', 'modal');
```

### NavigationModel

```js
const nav = new Maranello.NavigationModel();
nav.push('detail', { id: 42 });
const unsubscribe = nav.onNavigate((entry, action) => router.navigate(entry.viewId));
```

### DashboardRenderer

```js
const dash = new Maranello.DashboardRenderer(el, { schema });
dash.setData('kpis', data.kpis);
dash.setSchema(newSchema);
```

### FacetWorkbench

```js
const wb = new Maranello.FacetWorkbench(filterEl, { facets, onFilterChange });
wb.clearAll();
wb.savePreset('default');
```

### EntityWorkbench

```js
const editor = new Maranello.EntityWorkbench(el, { schema, data, onSave });
editor.validate();
editor.pushEntity(childSchema, childData);
```

### AsyncSelect

```js
const sel = new Maranello.AsyncSelect(el, { provider, onSelect, placeholder: 'Search...' });
sel.clear();
sel.setProvider(newProvider);
```

### StateScaffold

```js
const scaffold = new Maranello.StateScaffold(el, { state: 'loading' });
scaffold.setState('partial');
scaffold.setState('error', 'Connection failed');
```

---

## Common recipes

### Recipe 1: Build a dashboard from API data

```js
const schema = {
  rows: [
    {
      columns: [
        { type: 'kpi-strip', dataKey: 'kpis', span: 12 },
        { type: 'chart',     dataKey: 'sales', span: 6, options: { chartType: 'sparkline' } },
        { type: 'gauge',     dataKey: 'uptime', span: 6 }
      ]
    }
  ]
};

const dash = new Maranello.DashboardRenderer(el, { schema });

fetch('/api/metrics')
  .then(r => r.json())
  .then(data => {
    dash.setData('kpis',   data.kpis);
    dash.setData('sales',  data.salesHistory);
    dash.setData('uptime', data.uptimePercent);
  });
```

### Recipe 2: Filterable data table

```js
const allData = await fetch('/api/records').then(r => r.json());

const table = Maranello.dataTable(tableEl, { columns, data: allData });

const facets = new Maranello.FacetWorkbench(filterEl, {
  facets: [
    {
      id: 'status',
      label: 'Status',
      type: 'multi-select',
      dataProvider: () => Promise.resolve([
        { value: 'active',   label: 'Active' },
        { value: 'archived', label: 'Archived' }
      ])
    },
    {
      id: 'search',
      label: 'Search',
      type: 'search',
      dataProvider: () => Promise.resolve([])
    }
  ],
  onFilterChange: (filters) => table.setData(applyFilters(allData, filters))
});
```

### Recipe 3: CRUD entity editor

```js
const managerSearch = {
  search: async (q) => fetch(`/api/users?q=${encodeURIComponent(q)}`).then(r => r.json()),
  getLabel: (u) => u.name,
  getId:    (u) => String(u.id)
};

const editor = new Maranello.EntityWorkbench(el, {
  schema: {
    tabs: [{
      id: 'main',
      label: 'Details',
      sections: [{
        fields: [
          { key: 'name',    label: 'Name',    type: 'text',         required: true },
          { key: 'manager', label: 'Manager', type: 'async-select', provider: managerSearch }
        ]
      }]
    }]
  },
  data: currentRecord,
  onSave: (modified) => api.patch(`/records/${id}`, modified)
});
```

### Recipe 4: App shell with navigation

```js
const registry = Maranello.ViewRegistry.getInstance();

registry.register({
  id: 'home',
  title: 'Home',
  defaultPlacement: 'page',
  factory: (container) => { renderHome(container); }
});

registry.register({
  id: 'detail',
  title: 'Detail',
  defaultPlacement: 'side-panel',
  factory: (container, data) => { renderDetail(container, data); }
});

const shell = new Maranello.AppShellController(appEl, { layout: 'side-detail' });
const nav   = new Maranello.NavigationModel();
const orch  = new Maranello.PanelOrchestrator(registry, nav);

orch.open('home');
// Later, when user selects a row:
// orch.open('detail', 'side-panel', { id: 42 });
```

### Recipe 5: Loading/error states

```js
const scaffold = new Maranello.StateScaffold(el, {
  state: 'loading',
  message: 'Fetching data...'
});

try {
  const data = await fetch('/api/data').then(r => r.json());
  if (data.length === 0) {
    scaffold.setState('empty', 'No records found');
  } else {
    scaffold.setState('partial'); // content slot becomes visible
    renderContent(el, data);
  }
} catch (e) {
  scaffold.setState('error', e.message);
}
```

### Recipe 6: Move view between placements

```js
orch.open('detail', 'page');        // opens as full page
orch.move('detail', 'side-panel');  // moves to side panel — same DOM node, state preserved
orch.move('detail', 'modal');       // moves to modal overlay
```

---

## Anti-patterns

| Don't | Do Instead |
|-------|-----------|
| `document.createElement('div')` soup for layouts | `new DashboardRenderer(el, { schema })` |
| Inline CSS: `el.style.display = 'grid'` for app layout | `shell.setLayout('split')` |
| Custom filter UI reimplemented per page | `new FacetWorkbench(el, { facets })` |
| Manual loading spinner / blank container | `new StateScaffold(el, { state: 'loading' })` |
| Feature-specific layout CSS in page JS | `orch.move(viewId, 'side-panel')` |
| Re-mounting a view to change its placement | `orch.move(viewId, newPlacement)` — DOM preserved |
| Custom back-navigation stack | `EntityWorkbench.pushEntity()` + `NavigationModel` |

---

## Minimal schema reference

### DashboardSchema

```json
{
  "rows": [
    {
      "columns": [
        { "type": "kpi-strip", "dataKey": "kpis",   "span": 12 },
        { "type": "chart",     "dataKey": "sales",  "span": 6  },
        { "type": "gauge",     "dataKey": "uptime", "span": 6  }
      ]
    }
  ]
}
```

Widget `type` values: `kpi-strip` · `chart` · `gauge` · `data-table` · `text` · `html`

### EntitySchema

```json
{
  "tabs": [
    {
      "id": "main",
      "label": "Details",
      "sections": [
        {
          "title": "Basic Info",
          "fields": [
            { "key": "name",   "label": "Name",    "type": "text",         "required": true },
            { "key": "status", "label": "Status",  "type": "select",       "options": { "values": ["active","archived"] } },
            { "key": "owner",  "label": "Owner",   "type": "async-select", "provider": "<AsyncDataProvider>" }
          ]
        }
      ]
    }
  ]
}
```

Field `type` values: `text` · `number` · `textarea` · `select` · `async-select` · `date` · `boolean` · `computed` · `group`

### FacetConfig[]

```json
[
  {
    "id": "status",
    "label": "Status",
    "type": "multi-select",
    "dataProvider": "<() => Promise<FacetOption[]>>"
  },
  {
    "id": "date",
    "label": "Date Range",
    "type": "date-range",
    "dataProvider": "<() => Promise<[]>>"
  },
  {
    "id": "active",
    "label": "Active Only",
    "type": "boolean",
    "dataProvider": "<() => Promise<[]>>"
  }
]
```

Facet `type` values: `select` · `multi-select` · `search` · `date-range` · `boolean`

### DataTable columns (v2 types)

```json
[
  { "key": "name",   "label": "Name",   "type": "text",     "sortable": true },
  { "key": "status", "label": "Status", "type": "badge" },
  { "key": "score",  "label": "Score",  "type": "sparkbar", "max": 100 },
  { "key": "action", "label": "",       "type": "actions",  "actions": [{ "id": "edit", "label": "Edit" }] }
]
```

---

## Event wiring

```js
// FacetWorkbench → DataTable
const wb = new Maranello.FacetWorkbench(filterEl, {
  facets,
  onFilterChange: (filters) => table.setData(applyFilters(allData, filters))
});

// DataTable drilldown → EntityWorkbench
Maranello.onDrillDown((row) => {
  editor.pushEntity(detailSchema, row);
});

// PanelOrchestrator custom events (dispatched on document)
// 'mn:panel-opened'  — { detail: { viewId, placement } }
// 'mn:panel-closed'  — { detail: { viewId } }
// 'mn:panel-moved'   — { detail: { viewId, from, to } }
document.addEventListener('mn:panel-opened', ({ detail }) => {
  console.log(`${detail.viewId} opened in ${detail.placement}`);
});

// NavigationModel → consumer router
const unsubscribe = nav.onNavigate((entry, action) => {
  if (action === 'push') router.push(`/${entry.viewId}`);
  if (action === 'pop')  router.back();
});
```
