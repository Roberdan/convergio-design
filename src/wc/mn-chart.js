/**
 * Maranello Design System — <mn-chart> Web Component
 * Universal chart element supporting all Maranello chart types.
 *
 * @attr {string} type    - Chart type: sparkline | donut | barChart | areaChart |
 *                          radar | bubble | heatmap | treemap | halfGauge | liveGraph
 * @attr {string} data    - JSON data for the chart
 * @attr {string} options - JSON options object
 * @attr {number} width   - Canvas width in px (default 300)
 * @attr {number} height  - Canvas height in px (default 200)
 * @fires mn-chart-ready  - Dispatched when chart is rendered
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnChart extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'data', 'options', 'width', 'height'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/charts.css");

    const link3 = cssLink("../css/charts-base.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; }
      canvas { display: block; }
      .mn-chart__root { position: relative; }
    `;

    this._container = document.createElement('div');
    this._container.className = 'mn-chart__root';

    this._canvas = document.createElement('canvas');
    this._container.append(this._canvas);

    this.shadowRoot.append(link1, link2, link3, style, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'img');
    const type = this.getAttribute('type') || 'chart';
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', `${type} visualization`);
    }
    this._init();
  }

  disconnectedCallback() {
    if (this._ctrl && typeof this._ctrl === 'object') {
      this._ctrl.destroy?.();
    }
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'type') {
      this._rebuild();
    } else if (this._ctrl) {
      this._rebuild();
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  update(data, opts) {
    if (this._ctrl && typeof this._ctrl === 'object' && this._ctrl.update) {
      this._ctrl.update(data, opts);
    } else {
      if (data) this.setAttribute('data', JSON.stringify(data));
      if (opts) this.setAttribute('options', JSON.stringify(opts));
    }
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.charts) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const type = this.getAttribute('type') || 'sparkline';
    const factory = M.charts[type];
    if (typeof factory !== 'function') {
      console.warn(`<mn-chart>: unknown chart type "${type}"`);
      return;
    }

    const w = parseInt(this.getAttribute('width') || '300', 10);
    const h = parseInt(this.getAttribute('height') || '200', 10);
    this._canvas.width = w;
    this._canvas.height = h;
    this._canvas.style.width = w + 'px';
    this._canvas.style.height = h + 'px';

    const data = this._parseJSON('data', []);
    const opts = this._parseJSON('options', {});

    // Chart factories accept (canvas, data, opts) or (canvas, opts-with-data)
    const merged = { ...opts, data, width: w, height: h };
    this._ctrl = factory(this._canvas, merged);

    this.dispatchEvent(new CustomEvent('mn-chart-ready', {
      bubbles: true, composed: true,
    }));
  }

  _rebuild() {
    if (this._ctrl && typeof this._ctrl === 'object') {
      this._ctrl.destroy?.();
    }
    this._ctrl = null;
    this._canvas.getContext('2d')?.clearRect(
      0, 0, this._canvas.width, this._canvas.height
    );
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-chart', MnChart);
