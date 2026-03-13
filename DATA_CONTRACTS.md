# Maranello Luce Design - Data Contracts

Typed interfaces for complex components. Import types from `maranello-luce-design-business`.

## Gantt

```ts
interface GanttTask {
  id: string | number;
  title: string;
  start: string;   // ISO date "2025-01-15"
  end: string;      // ISO date "2025-03-20"
  children?: GanttTask[];
  [key: string]: unknown; // status, progress, etc.
}

// Usage
import { gantt } from 'maranello-luce-design-business/gantt';
const ctrl = gantt(container, [
  { id: '1', title: 'Phase 1', start: '2025-01-01', end: '2025-06-30',
    children: [
      { id: '1a', title: 'Design', start: '2025-01-01', end: '2025-03-15' },
      { id: '1b', title: 'Build', start: '2025-03-01', end: '2025-06-30' },
    ]},
]);
ctrl.expandAll();
ctrl.scrollToToday();
```

## DataTable

```ts
interface DataTableOptions<RowT> {
  columns: Array<{
    key: string;
    label?: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    type?: 'text' | 'number' | 'date' | 'status' | 'badge' | 'custom';
    render?: (value: unknown, row: RowT) => string | HTMLElement;
  }>;
  data?: RowT[];
  groupBy?: string;
  pageSize?: number;         // 0 = no pagination
  selectable?: boolean;      // default: true
  crosshair?: boolean;       // default: true
  compact?: boolean;
  onRowClick?: (row: RowT, index: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}

// Usage
import { dataTable } from 'maranello-luce-design-business';
const ctrl = dataTable('#my-table', {
  columns: [
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'score', label: 'Score', align: 'right', sortable: true },
    { key: 'status', label: 'Status', type: 'status' },
  ],
  data: [{ name: 'Alpha', score: 85, status: 'Active' }],
  pageSize: 20,
});
```

## FerrariGauge

```ts
// Config via data-gauge attribute on <canvas>
interface GaugeConfig {
  value?: number;     // needle position
  min?: number;       // default: 0
  max?: number;       // default: 100
  label?: string;     // center label
  unit?: string;      // unit suffix
  size?: 'sm' | 'md' | 'lg';
  ticks?: number;     // number of major ticks
  redline?: number;   // danger zone start
}

// Usage
import { FerrariGauge } from 'maranello-luce-design-business/gauge';
const canvas = document.querySelector<HTMLCanvasElement>('[data-gauge]');
canvas.dataset.gauge = JSON.stringify({ value: 73, max: 100, label: 'CPU' });
const gauge = new FerrariGauge(canvas);
```

## Speedometer

```ts
interface SpeedometerOptions {
  value?: number;           // current value
  max?: number;             // default: 100
  unit?: string;            // label below value
  size?: 'sm' | 'md' | 'lg';
  ticks?: number[];         // major tick values, e.g. [0, 25, 50, 75, 100]
  minorTicks?: number;      // minor ticks between majors
  needleColor?: string;
  arcColor?: string;
  arcStart?: number;        // arc highlight start
  arcEnd?: number | null;   // arc highlight end (null = follows value)
  bar?: { value?: number; color?: string; label?: string } | null;
  animate?: boolean;        // default: true
}

// Usage
import { speedometer } from 'maranello-luce-design-business';
const ctrl = speedometer(canvas, { value: 42, max: 120, unit: 'km/h' });
ctrl.setValue(88);
```

## Charts (Canvas-based)

```ts
// Sparkline: number[]
sparkline(canvas, [10, 20, 15, 30, 25], { color: '#FFC72C' });

// Donut: DonutSegment[]
interface DonutSegment { value: number; color: string; }
donut(canvas, [
  { value: 40, color: '#DC0000' },
  { value: 30, color: '#FFC72C' },
  { value: 30, color: '#00A651' },
]);

// Area: AreaDataset[]
interface AreaDataset { color?: string; data: number[]; }
areaChart(canvas, [
  { data: [10, 20, 30, 25], color: '#FFC72C' },
  { data: [5, 15, 20, 18], color: '#4EA8DE' },
]);

// Radar: RadarDataItem[]
interface RadarDataItem { label: string; value: number; }
radar(canvas, [
  { label: 'Speed', value: 80 },
  { label: 'Power', value: 65 },
  { label: 'Handling', value: 90 },
]);

// Bubble: BubbleDataItem[]
interface BubbleDataItem { x: number; y: number; z?: number; label?: string; color?: string; }
bubble(canvas, [{ x: 10, y: 20, z: 5, label: 'A' }]);

// Bar: BarDataItem[]
interface BarDataItem { value: number; label?: string; color?: string; }
barChart(canvas, [{ value: 80, label: 'Q1' }, { value: 60, label: 'Q2' }]);

// HBar (DOM-based)
hBarChart('#container', {
  title: 'Revenue', bars: [{ label: 'EMEA', value: 85 }],
  unit: '%', maxValue: 100,
});
```

## MapView

```ts
interface MapMarker {
  id: string | number;
  lat: number;
  lon: number;
  label: string;
  detail?: string;
  size?: number;
  color?: string;
  count?: number;  // for clustering display
}

// Usage
import { mapView } from 'maranello-luce-design-business';
const ctrl = mapView(container, {
  markers: [
    { id: '1', lat: 48.85, lon: 2.35, label: 'Paris', detail: '12 engagements' },
    { id: '2', lat: 40.71, lon: -74.01, label: 'NYC', detail: '8 engagements' },
  ],
  onClick: (marker) => console.log('Clicked:', marker.label),
});
```

## Funnel / Sankey

```ts
interface SankeyData {
  pipeline: Array<{
    label: string; count: number; color: string;
    holdCount?: number; withdrawnCount?: number;
  }>;
  onHold?: { label: string; count: number; color: string };
  withdrawn?: { label: string; count: number; color: string };
  total?: number;
}

// Usage
import { funnel } from 'maranello-luce-design-business';
const ctrl = funnel('#funnel', { data: {
  pipeline: [
    { label: 'Prospect', count: 120, color: '#4EA8DE' },
    { label: 'Qualified', count: 80, color: '#FFC72C', holdCount: 5 },
    { label: 'Won', count: 30, color: '#00A651' },
  ],
  total: 120,
}});
```

## DetailPanel

```ts
interface DetailPanelOptions {
  title?: string;
  schema?: Array<{ section?: string; tab?: string; fields?: Array<{
    key: string; label: string;
    type?: 'text' | 'number' | 'date' | 'select' | 'status' | 'person' | 'score' | 'textarea';
    editable?: boolean; options?: Array<string | { value: string; label: string }>;
  }>; }>;
  data?: Record<string, unknown>;
  editable?: boolean;
  onSave?: (changes: Record<string, unknown>, data: Record<string, unknown>) => Promise<void>;
  onClose?: () => void;
  tabs?: string[];
}
```

## OKR Panel

```ts
interface OkrPanelOptions {
  title?: string;
  period?: string;   // e.g. "Q1 2025"
  objectives?: Array<{
    title?: string; scope?: 'STUDIO' | 'ORG' | 'GLOBAL';
    progress?: number; status?: 'on-track' | 'at-risk' | 'behind';
    keyResults?: Array<{ title?: string; current?: number; target?: number; unit?: string }>;
  }>;
}
```

## Ferrari Controls

All accept `{ positions?: string[], initial?: number, label?: string, onChange? }`.

```ts
manettino(container, { positions: ['WET', 'SPORT', 'RACE'], initial: 1, label: 'Mode' });
steppedRotary(container, { positions: ['0', '1', '2', 'A'], label: 'Channel' });
cruiseLever(container, { positions: ['OFF', 'SET', 'RES'], label: 'Cruise' });
toggleLever(container, { label: 'Traction', initial: false, onChange: (on) => {} });
```
