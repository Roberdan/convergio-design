import { areaChart, barChart, bubble, donut, hBarChart, radar, sparkline } from './charts';
import { FerrariGauge } from './gauge-engine';
import { createGauge } from './gauge-engine-class';

export type DashboardWidgetType = 'kpi-strip' | 'stat-card' | 'chart' | 'gauge' | 'legend' | 'table-summary' | 'custom';
export interface WidgetController { render: (container: HTMLElement, data: unknown) => void; update: (data: unknown) => void; destroy: () => void; }
export interface WidgetConfig { type: DashboardWidgetType; options?: Record<string, unknown>; }

type ChartType = 'sparkline' | 'donut' | 'bar' | 'area' | 'radar' | 'bubble' | 'hbar';
type GaugeCtrl = { redraw?: () => void; destroy?: () => void; config?: Record<string, unknown> };
const charts = { sparkline, donut, bar: barChart, area: areaChart, radar, bubble };

function arr(v: unknown): Array<Record<string, unknown>> { return Array.isArray(v) ? v as Array<Record<string, unknown>> : []; }

function kpi(): WidgetController {
  let h: HTMLElement | null = null;
  const draw = (v: unknown): void => { if (!h) return; h.innerHTML = arr(v).map((i) => `<article class="mn-dashboard-kpi"><p class="mn-dashboard-kpi__label">${String(i.label ?? '—')}</p><p class="mn-dashboard-kpi__value">${String(i.value ?? '—')}</p>${i.delta != null ? `<span class="mn-dashboard-kpi__delta">${String(i.delta)}</span>` : ''}</article>`).join(''); };
  return { render(c, v) { h = c; h.classList.add('mn-dashboard-kpi-strip'); draw(v); }, update: draw, destroy() { if (h) h.innerHTML = ''; h = null; } };
}

function stat(o?: Record<string, unknown>): WidgetController {
  let h: HTMLElement | null = null;
  const icon = typeof o?.icon === 'string' ? o.icon : '';
  const draw = (v: unknown): void => {
    if (!h) return;
    const d = v && typeof v === 'object' ? v as Record<string, unknown> : {};
    h.innerHTML = `<article class="mn-dashboard-stat">${icon ? `<span class="mn-dashboard-stat__icon">${icon}</span>` : ''}<p class="mn-dashboard-stat__value">${String(d.value ?? d.metric ?? '—')}</p><p class="mn-dashboard-stat__label">${String(d.label ?? o?.label ?? 'Metric')}</p></article>`;
  };
  return { render(c, v) { h = c; draw(v); }, update: draw, destroy() { if (h) h.innerHTML = ''; h = null; } };
}

function chart(o?: Record<string, unknown>): WidgetController {
  let h: HTMLElement | null = null; let c: HTMLCanvasElement | null = null;
  let hb: { update?: (x: unknown) => void; destroy?: () => void } | null = null;
  const t = (o?.chartType as ChartType) || 'sparkline';
  const draw = (v: unknown): void => {
    if (!h) return;
    if (t === 'hbar') { hb = hb || hBarChart(h, v as Record<string, unknown>) as { update?: (x: unknown) => void; destroy?: () => void } | null; hb?.update?.(v); return; }
    c = c || Object.assign(document.createElement('canvas'), { className: 'mn-dashboard-canvas' });
    if (!c.parentElement) h.appendChild(c);
    (charts[t as keyof typeof charts] || charts.sparkline)(c, v as never, o as never);
  };
  return { render(x, v) { h = x; draw(v); }, update: draw, destroy() { hb?.destroy?.(); if (h) h.innerHTML = ''; h = null; c = null; hb = null; } };
}

function gauge(o?: Record<string, unknown>): WidgetController {
  let h: HTMLElement | null = null; let c: HTMLCanvasElement | null = null; let g: GaugeCtrl | null = null;
  const cfg = (v: unknown): Record<string, unknown> => ({ ...o, ...(v && typeof v === 'object' ? v as Record<string, unknown> : { value: v }) });
  const draw = (v: unknown): void => {
    if (!h) return;
    c = c || Object.assign(document.createElement('canvas'), { className: 'mn-dashboard-canvas' });
    if (!c.parentElement) h.appendChild(c);
    const conf = cfg(v);
    if (!g) { g = createGauge({ target: c, config: conf }) as GaugeCtrl | null; if (!g) { c.dataset.gauge = JSON.stringify(conf); g = new FerrariGauge(c) as unknown as GaugeCtrl; } return; }
    g.config = { ...(g.config || {}), ...conf }; g.redraw?.();
  };
  return { render(x, v) { h = x; draw(v); }, update: draw, destroy() { g?.destroy?.(); if (h) h.innerHTML = ''; h = null; c = null; g = null; } };
}

function legend(): WidgetController {
  let h: HTMLElement | null = null;
  const draw = (v: unknown): void => { if (!h) return; h.innerHTML = `<ul class="mn-dashboard-legend">${arr(v).map((i) => `<li class="mn-dashboard-legend__item"><span class="mn-dashboard-legend__swatch" style="background:${String(i.color ?? 'var(--mn-accent)')}"></span><span>${String(i.label ?? 'Item')}</span></li>`).join('')}</ul>`; };
  return { render(c, v) { h = c; draw(v); }, update: draw, destroy() { if (h) h.innerHTML = ''; h = null; } };
}

function table(): WidgetController {
  let h: HTMLElement | null = null;
  const draw = (v: unknown): void => {
    if (!h) return;
    const d = v && typeof v === 'object' ? v as { headers?: unknown[]; rows?: unknown[][] } : {};
    const th = Array.isArray(d.headers) ? d.headers.map((x) => `<th>${String(x)}</th>`).join('') : '';
    const tr = Array.isArray(d.rows) ? d.rows.map((r) => `<tr>${r.map((x) => `<td>${String(x ?? '')}</td>`).join('')}</tr>`).join('') : '';
    h.innerHTML = `<table class="mn-dashboard-table-summary"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
  };
  return { render(c, v) { h = c; draw(v); }, update: draw, destroy() { if (h) h.innerHTML = ''; h = null; } };
}

function custom(o?: Record<string, unknown>): WidgetController {
  let h: HTMLElement | null = null;
  const fn = typeof o?.render === 'function' ? o.render as (container: HTMLElement, data: unknown) => void : null;
  const draw = (v: unknown): void => { if (h && fn) fn(h, v); };
  return { render(c, v) { h = c; draw(v); }, update(v) { if (h) h.innerHTML = ''; draw(v); }, destroy() { if (h) h.innerHTML = ''; h = null; } };
}

export function createDashboardWidget(config: WidgetConfig): WidgetController {
  if (config.type === 'kpi-strip') return kpi();
  if (config.type === 'stat-card') return stat(config.options);
  if (config.type === 'chart') return chart(config.options);
  if (config.type === 'gauge') return gauge(config.options);
  if (config.type === 'legend') return legend();
  if (config.type === 'table-summary') return table();
  return custom(config.options);
}
