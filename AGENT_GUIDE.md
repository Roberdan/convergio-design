# Maranello Luce Design - AI Agent Guide

## Quick Start

```bash
npm install maranello-luce-design-business
```

```ts
// ES Module
import { sparkline, gantt, FerrariGauge } from 'maranello-luce-design-business';

// CSS (required)
import 'maranello-luce-design-business/css';
```

## Decision Tree

| I need... | Use | Layer |
|---|---|---|
| Inline trend line | `sparkline` | Canvas |
| Category breakdown | `donut` | Canvas |
| Vertical bars | `barChart` | Canvas |
| Horizontal bars | `hBarChart` | DOM |
| Time series overlay | `areaChart` | Canvas |
| Real-time metric | `liveGraph` | Canvas |
| Multi-axis scoring | `radar` | Canvas |
| 3D scatter | `bubble` | Canvas |
| KPI gauge | `FerrariGauge` | Canvas |
| Speed/velocity | `speedometer` | Canvas |
| Semicircular gauge | `halfGauge` | Canvas |
| Project timeline | `gantt` | Canvas+DOM |
| Pipeline stages | `funnel` | SVG+DOM |
| Data grid | `dataTable` | DOM |
| Record detail | `openDetailPanel` | DOM |
| OKR tracking | OKR panel (via WC `mn-okr`) | DOM |
| Geographic data | `mapView` | Canvas+DOM |
| Animated counter | `flipCounter` | DOM |
| Progress circle | `progressRing` | SVG |
| Date input | `datePicker` | DOM |
| Notifications | `toast` | DOM |
| Dialog | `openModal` | DOM |
| Quick actions | `commandPalette` | DOM |
| AI assistant | `buildUI` (ai-chat) | DOM |
| Login page | `loginScreen` | DOM |
| System health | `systemStatus` | DOM |
| User menu | `profileMenu` | DOM |
| Mode selector | `manettino` | DOM |
| On/off switch | `toggleLever` | DOM |
| Stepped dial | `steppedRotary` | DOM |
| Form validation | `initForms` / `forms` | DOM |
| Theme switching | `initThemeToggle` | DOM |
| Org hierarchy | `initOrgTree` | DOM |

## Layer Selection

### CSS-only (safest for any framework)

Use class names like `mn-card`, `mn-sidebar`, `mn-heatmap`.
No JS dependency. Works in React, Vue, Svelte, plain HTML.

```html
<div class="mn-card">
  <div class="mn-card__header">Title</div>
  <div class="mn-card__body">Content</div>
</div>
```

### Headless JS (vanilla TS functions)

Import functions that accept a container element and options object.
Return a controller for programmatic updates.

```ts
import { gantt } from 'maranello-luce-design-business/gantt';
const ctrl = gantt(document.getElementById('gantt'), tasks);
ctrl.setZoom(2);
```

### Web Components (`mn-*` tags)

Self-registering custom elements. Import and use in any framework.

```ts
import { registerAll } from 'maranello-luce-design-business/wc';
await registerAll();
```

```html
<mn-gauge data-gauge='{"value":75,"max":100}'></mn-gauge>
<mn-chart type="sparkline" data-values="[10,20,15,30]"></mn-chart>
```

## Framework Compatibility

| Framework | CSS-only | Headless JS | Web Components |
|---|---|---|---|
| Vanilla HTML | Yes | Yes | Yes |
| React | Yes | Yes (useRef) | Yes |
| Vue | Yes | Yes (ref) | Yes |
| Svelte | Yes | Yes (bind:this) | Yes |
| Angular | Yes | Yes (ViewChild) | Yes |
| Next.js SSR | Yes | Client-only | Client-only |

### React Pattern

```tsx
import { useRef, useEffect } from 'react';
import { sparkline } from 'maranello-luce-design-business/charts';

function SparklineChart({ data }: { data: number[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (ref.current) sparkline(ref.current, data);
  }, [data]);
  return <canvas ref={ref} width={200} height={60} />;
}
```

### domSafe vs canvasOnly

- **canvasOnly: true** = renders to `<canvas>`, safe in virtual DOM
- **domSafe: false** = does direct DOM manipulation (innerHTML, createElement)
  - In React/Vue: mount in a `useRef` container, never re-render parent
  - Call `controller.destroy()` in cleanup

## Theme System

4 themes applied via body class:

| Theme | Class | Description |
|---|---|---|
| Editorial | (default, no class) | Mixed dark/light |
| Nero | `mn-nero` | Full dark |
| Avorio | `mn-avorio` | Full light |
| Colorblind | `mn-colorblind` | Accessible palette |

```ts
import { setTheme } from 'maranello-luce-design-business';
setTheme('nero'); // switches globally
```

## Common Patterns

### Data polling with bindChart

```ts
import { bindChart } from 'maranello-luce-design-business';
bindChart(canvas, 'sparkline', {
  url: '/api/metrics',
  map: (d) => d.values,
  interval: 5000,
});
```

### Event system

```ts
import { eventBus } from 'maranello-luce-design-business';
eventBus.on('manettino-change', ({ index, label }) => { });
eventBus.on('command-select', ({ text }) => { });
```

### Toast notifications

```ts
import { toast } from 'maranello-luce-design-business';
toast({ title: 'Saved', message: 'Changes applied', type: 'success' });
```

## Anti-Patterns

| Do NOT | Do instead |
|---|---|
| Import entire library for one chart | Use subpath: `maranello-luce-design-business/charts` |
| Re-render React parent of DOM components | Use `useRef` + `useEffect` with `destroy()` cleanup |
| Set theme via CSS class directly | Use `setTheme()` for proper event propagation |
| Create `<canvas>` in JSX without ref | Pass canvas element to chart function via ref |
| Assume SSR compatibility for JS components | All JS components require browser DOM |
| Use `innerHTML` to inject chart HTML | Use the factory functions that build DOM safely |
| Skip CSS import | All components require their CSS file for styling |
| Mix theme classes on body | Only one theme class at a time (or none for editorial) |
