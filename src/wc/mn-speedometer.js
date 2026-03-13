/**
 * Maranello Design System — <mn-speedometer> Web Component
 * Tachometer gauge with animated needle and optional arc bar.
 *
 * @attr {number} value - Current speedometer value
 * @attr {number} max   - Maximum scale value (default 320)
 * @attr {string} size  - Gauge size: sm | md | lg (default md)
 * @attr {string} label - Sub-label text beneath the value
 * @attr {string} unit  - Unit label (default "km/h")
 * @fires mn-speedometer-ready - Dispatched when speedometer is initialized
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnSpeedometer extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'max', 'size', 'label', 'unit'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/gauge.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; }
      canvas { display: block; }
    `;

    this._canvas = document.createElement('canvas');
    this._canvas.className = 'mn-speedometer__canvas';

    this.shadowRoot.append(link1, link2, style, this._canvas);
  }

  connectedCallback() {
    this.setAttribute('role', 'meter');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', this.getAttribute('max') || '320');
    this.setAttribute('aria-valuenow', this.getAttribute('value') || '0');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label',
        this.getAttribute('label') || 'Speedometer');
    }
    this._init();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'value') this.setAttribute('aria-valuenow', newVal || '0');
    if (name === 'max') this.setAttribute('aria-valuemax', newVal || '320');
    if (name === 'label') this.setAttribute('aria-label', newVal || 'Speedometer');
    if (!this._ctrl) return;
    switch (name) {
      case 'value':
        this._ctrl.setValue(Number(newVal));
        break;
      case 'max':
      case 'size':
      case 'label':
      case 'unit':
        this._rebuild();
        break;
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  setValue(n) {
    this._ctrl?.setValue?.(Number(n));
  }

  setBar(n) {
    this._ctrl?.setBar?.(Number(n));
  }

  /* ── Internals ──────────────────────────────────────────── */

  _sizeValue() {
    const s = this.getAttribute('size') || 'md';
    const map = { sm: 120, md: 220, lg: 320 };
    return map[s] || map.md;
  }

  _buildOpts() {
    return {
      value: Number(this.getAttribute('value') || 0),
      max: Number(this.getAttribute('max') || 320),
      unit: this.getAttribute('unit') || 'km/h',
      size: this.getAttribute('size') || 'md',
      subLabel: this.getAttribute('label') || undefined,
      animate: true,
    };
  }

  _init() {
    const M = window.Maranello;
    if (!M?.speedometer) {
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

    this._ctrl = M.speedometer(this._canvas, this._buildOpts());

    this.dispatchEvent(new CustomEvent('mn-speedometer-ready', {
      bubbles: true, composed: true,
    }));
  }

  _rebuild() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-speedometer', MnSpeedometer);
