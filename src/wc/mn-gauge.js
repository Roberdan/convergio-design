/**
 * Maranello Design System — <mn-gauge> Web Component
 * Ferrari gauge instrument with canvas rendering and glass overlay.
 *
 * @attr {number}  value  - Current gauge value
 * @attr {number}  max    - Maximum scale value (default 100)
 * @attr {string}  unit   - Unit label (e.g. "km/h", "%")
 * @attr {string}  label  - Bottom label text
 * @attr {string}  size   - Gauge size: sm | md | lg (default md)
 * @attr {string}  config - JSON string for full complication config
 * @fires mn-gauge-ready - Dispatched when gauge engine is initialized
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnGauge extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'unit', 'label', 'size', 'config'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._gauge = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/gauge.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; position: relative; }
      .mn-gauge__wrap { position: relative; }
      canvas { display: block; }
      .mn-gauge__glass {
        position: absolute; inset: 0;
        border-radius: 50%;
        background: radial-gradient(
          ellipse 70% 50% at 50% 35%,
          rgba(255,255,255,0.12) 0%,
          transparent 100%
        );
        pointer-events: none;
      }
    `;

    this._wrap = document.createElement('div');
    this._wrap.className = 'mn-gauge__wrap';

    this._canvas = document.createElement('canvas');
    this._canvas.className = 'mn-gauge__canvas';

    this._glass = document.createElement('div');
    this._glass.className = 'mn-gauge__glass';

    this._wrap.append(this._canvas, this._glass);
    this.shadowRoot.append(link1, link2, style, this._wrap);
  }

  connectedCallback() {
    this.setAttribute('role', 'meter');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', this.getAttribute('max') || '100');
    this.setAttribute('aria-valuenow', this.getAttribute('value') || '0');
    if (this.getAttribute('label')) {
      this.setAttribute('aria-label', this.getAttribute('label'));
    }
    this._init();
  }

  disconnectedCallback() {
    this._gauge = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'value') this.setAttribute('aria-valuenow', newVal || '0');
    if (name === 'max') this.setAttribute('aria-valuemax', newVal || '100');
    if (name === 'label') this.setAttribute('aria-label', newVal || '');
    if (!this._gauge) return;
    this._applyConfig();
    this._gauge.redraw();
  }

  /* ── Public API ─────────────────────────────────────────── */

  animateTo(value) {
    if (!this._gauge) return;
    this._gauge.config.value = Number(value);
    this._gauge.animate();
  }

  redraw() {
    this._gauge?.redraw?.();
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _sizeValue() {
    const s = this.getAttribute('size') || 'md';
    const map = { sm: 120, md: 220, lg: 320 };
    return map[s] || map.md;
  }

  _applyConfig() {
    if (!this._gauge) return;
    const cfg = this._gauge.config;
    const custom = this._parseJSON('config', null);

    if (custom && typeof custom === 'object') {
      Object.assign(cfg, custom);
    }

    if (this.hasAttribute('value')) cfg.value = Number(this.getAttribute('value'));
    if (this.hasAttribute('max')) cfg.max = Number(this.getAttribute('max'));
    if (this.hasAttribute('unit')) cfg.unit = this.getAttribute('unit');
    if (this.hasAttribute('label')) cfg.label = this.getAttribute('label');
  }

  _init() {
    const M = window.Maranello;
    if (!M?.FerrariGauge) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const px = this._sizeValue();
    this._canvas.width = px;
    this._canvas.height = px;
    this._canvas.style.width = px + 'px';
    this._canvas.style.height = px + 'px';
    this._glass.style.width = px + 'px';
    this._glass.style.height = px + 'px';

    this._gauge = new M.FerrariGauge(this._canvas);

    const cfg = this._gauge.config;
    cfg.max = Number(this.getAttribute('max') || 100);
    cfg.value = 0;
    cfg.unit = this.getAttribute('unit') || '';
    cfg.label = this.getAttribute('label') || '';

    const custom = this._parseJSON('config', null);
    if (custom && typeof custom === 'object') {
      Object.assign(cfg, custom);
    }

    this._gauge.init();

    const targetValue = Number(this.getAttribute('value') || 0);
    if (targetValue) {
      cfg.value = targetValue;
      this._gauge.animate();
    } else {
      this._gauge.redraw();
    }

    this.dispatchEvent(new CustomEvent('mn-gauge-ready', {
      bubbles: true, composed: true,
    }));
  }
}

customElements.define('mn-gauge', MnGauge);
