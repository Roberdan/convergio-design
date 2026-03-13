/**
 * Maranello Luce Design - Data binding utilities
 * Binds data from URLs to DOM elements, charts, and controls.
 */

import { eventBus } from './core/events';

interface GaugeLike {
  config: { complications?: Record<string, unknown>; [key: string]: unknown };
  animate: () => void;
}

interface SliderLike {
  setValue: (value: unknown) => void;
}

interface BoundControlElement extends Element {
  _mnSlider?: SliderLike;
}

interface ChartBindOptions {
  url?: string;
  fetch?: () => Promise<unknown>;
  map?: (data: unknown) => unknown;
  interval?: number;
  chartOpts?: Record<string, unknown>;
}

interface ControlBindOptions {
  url: string;
  mapRead?: (data: unknown) => unknown;
  mapWrite?: (value: unknown) => string;
}

interface BindOptions {
  url?: string;
  fetch?: () => Promise<unknown>;
  map?: (data: unknown, el?: Element) => unknown;
  property?: string;
  interval?: number;
  onUpdate?: (el: Element, value: unknown) => void;
  onError?: (el: Element, err: unknown) => void;
}

/** Emit a custom event on the document (legacy compatibility). */
export function emit(name: string, detail: unknown): void {
  eventBus.emit(name as string & keyof Record<string, unknown>, detail);
}

/** Listen for a custom event on the document (legacy compatibility). */
export function on(name: string, handler: (detail: unknown) => void): void {
  eventBus.on(name as string & keyof Record<string, unknown>, handler);
}

/** Update an existing gauge's configuration and re-animate. */
export function updateGauge(
  canvas: HTMLCanvasElement,
  newConfig: Partial<GaugeLike['config']>,
  gaugeMap?: Map<HTMLCanvasElement, GaugeLike>,
): void {
  const gauge = gaugeMap?.get(canvas);
  if (!gauge) return;
  Object.assign(gauge.config, newConfig);
  if (newConfig.complications && gauge.config.complications) {
    Object.assign(gauge.config.complications, newConfig.complications);
  } else if (newConfig.complications) {
    gauge.config.complications = { ...newConfig.complications };
  }
  gauge.animate();
}

/** Bind a chart to a data source with optional polling. */
export function bindChart(
  canvas: HTMLCanvasElement,
  chartType: string,
  options: ChartBindOptions,
  chartRegistry?: Record<string, (c: HTMLCanvasElement, d: unknown, o: Record<string, unknown>) => void>,
): number | undefined {
  const opts = {
    interval: 0,
    map: (d: unknown) => d,
    ...options,
  };
  const maybeFn = chartRegistry?.[chartType];
  if (!maybeFn) {
    console.warn('bindChart: unknown chart type', chartType);
    return undefined;
  }
  const chartFn = maybeFn;

  function update(): void {
    const fetchFn = opts.fetch ?? (() => {
      if (!opts.url) return Promise.reject(new Error('missing URL'));
      return fetch(opts.url).then((r) => r.json());
    });
    fetchFn().then((raw) => {
      const data = opts.map!(raw);
      chartFn(canvas, data, opts.chartOpts ?? {});
      eventBus.emit('chart-update', { canvas, type: chartType, data });
    }).catch((err: unknown) => {
      console.warn('bindChart error:', err);
    });
  }

  update();
  if (opts.interval > 0) return window.setInterval(update, opts.interval);
  return undefined;
}

/** Auto-initialize sliders from data attributes. */
export function autoBindSliders(
  initSlider?: (el: Element, config: Record<string, string | number>) => void,
): void {
  document.querySelectorAll('[data-mn-slider]').forEach((el) => {
    const config: Record<string, string | number> = {};
    const rawSlider = (el as HTMLElement).dataset.mnSlider;
    if (!rawSlider) return;
    rawSlider.split(';').forEach((pair) => {
      const kv = pair.split(':');
      if (kv.length === 2) {
        const key = kv[0].trim();
        const rawValue = kv[1].trim();
        const numericValue = Number(rawValue);
        config[key] = isNaN(numericValue) ? rawValue : numericValue;
      }
    });
    if (initSlider) initSlider(el, config);
  });
}

/** Bind a control element to a REST endpoint. */
export function bindControl(
  el: BoundControlElement,
  options: ControlBindOptions,
): void {
  const opts = {
    mapRead: (d: unknown) => (d as { value?: unknown }).value,
    mapWrite: (v: unknown) => JSON.stringify({ value: v }),
    ...options,
  };

  if (opts.url) {
    fetch(opts.url)
      .then((r) => r.json())
      .then((data: unknown) => {
        const val = opts.mapRead(data);
        if (el._mnSlider) el._mnSlider.setValue(val);
      })
      .catch((err: unknown) => {
        console.warn('bindControl: failed to read initial value', err);
      });
  }

  eventBus.on('slider-change', (detail: unknown) => {
    const d = detail as { element?: Element; value?: unknown };
    if (d.element !== el) return;
    if (opts.url) {
      fetch(opts.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: opts.mapWrite(d.value),
      }).catch((err: unknown) => {
        console.warn('bindControl: failed to write value', err);
      });
    }
  });
}

function toElementArray(selector: string | Element): Element[] {
  if (typeof selector === 'string') return Array.from(document.querySelectorAll(selector));
  return [selector];
}

function setElementProperty(el: Element, property: string, value: unknown): void {
  if (property === 'textContent') {
    el.textContent = value == null ? '' : String(value);
  } else if (property === 'innerHTML') {
    el.innerHTML = value == null ? '' : String(value);
  } else if (property.startsWith('style.')) {
    if (el instanceof HTMLElement) {
      (el.style as unknown as Record<string, string>)[property.slice(6)] = value == null ? '' : String(value);
    }
  } else if (property.startsWith('data-')) {
    const attrValue = typeof value === 'object' && value !== null
      ? JSON.stringify(value) : String(value ?? '');
    el.setAttribute(property, attrValue);
  } else {
    (el as unknown as Record<string, unknown>)[property] = value;
  }
}

/** Bind data from a URL or fetch function to DOM elements. */
export function bind(
  selector: string | Element,
  options: BindOptions,
): number | undefined {
  const elements = toElementArray(selector);
  const opts = {
    property: 'textContent',
    interval: 0,
    map: (data: unknown) => data,
    ...options,
  };

  function update(): void {
    const fetchFn = opts.fetch ?? (() => {
      if (!opts.url) return Promise.reject(new Error('bind: missing URL'));
      return fetch(opts.url).then((r) => r.json() as Promise<unknown>);
    });
    fetchFn().then((data) => {
      for (const el of elements) {
        const value = opts.map(data, el);
        setElementProperty(el, opts.property, value);
        el.classList.add('mn-anim-count');
        setTimeout(() => el.classList.remove('mn-anim-count'), 300);
        if (opts.onUpdate) opts.onUpdate(el, value);
      }
    }).catch((err: unknown) => {
      if (opts.onError) {
        for (const el of elements) opts.onError(el, err);
      }
    });
  }

  update();
  if (opts.interval > 0) return window.setInterval(update, opts.interval);
  return undefined;
}

/** Auto-bind elements with data-mn-bind attributes. */
export function autoBind(): void {
  document.querySelectorAll('[data-mn-bind]').forEach((el) => {
    const config: Record<string, string> = {};
    const rawBind = (el as HTMLElement).dataset.mnBind;
    if (!rawBind) return;
    rawBind.split(';').forEach((pair) => {
      const kv = pair.split(':');
      if (kv.length === 2) config[kv[0].trim()] = kv[1].trim();
    });
    if (config.url) {
      bind(el, {
        url: config.url,
        property: config.prop ?? 'textContent',
        interval: parseInt(config.refresh ?? '', 10) || 0,
      });
    }
  });
}

/** Register drill-down click handlers on matching elements. */
export function onDrillDown(
  selector: string,
  handler: (element: Element, contextData: Record<string, string | null>) => void,
): void {
  document.querySelectorAll(selector).forEach((el) => {
    if (el instanceof HTMLElement) el.style.cursor = 'pointer';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.classList.add('mn-hover-lift');

    function trigger(): void {
      const context: Record<string, string | null> = {};
      Array.from(el.attributes).forEach((attr) => {
        if (attr.name.startsWith('data-')) {
          context[attr.name.slice(5)] = attr.value;
        }
      });
      context.text = el.textContent;
      handler(el, context);
    }

    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
        keyEvent.preventDefault();
        trigger();
      }
    });
  });
}
