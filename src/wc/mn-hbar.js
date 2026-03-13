/**
 * Maranello Design System — <mn-hbar> Web Component
 * Horizontal bar chart with animated bars, grid, and tooltips.
 *
 * @attr {string} data    - JSON array of bar objects {label, value, color?}
 * @attr {string} options - JSON options: {title, unit, maxValue, showValues,
 *                          showGrid, sortDescending, animate, barHeight}
 * @fires mn-hbar-ready - Dispatched when chart is rendered
 * @fires mn-hbar-click - {detail: {bar, index}} on bar click
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnHbar extends HTMLElement {
  static get observedAttributes() {
    return ['data', 'options'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/layouts-horizontal-bar-1.css");

    const link3 = cssLink("../css/layouts-horizontal-bar-2.css");

    const link4 = cssLink("../css/layouts-horizontal-bar-3.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; width: 100%; }
      .mn-hbar__root { width: 100%; }
    `;

    this._container = document.createElement('div');
    this._container.className = 'mn-hbar__root';

    this.shadowRoot.append(link1, link2, link3, link4, style, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'figure');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Horizontal bar chart');
    }
    this._init();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal || !this._ctrl) return;
    switch (name) {
      case 'data': {
        const parsed = this._parseJSON('data', null);
        if (Array.isArray(parsed)) this._ctrl.update(parsed);
        break;
      }
      case 'options':
        this._rebuild();
        break;
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  update(data) {
    this._ctrl?.update?.(data);
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.hBarChart) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const bars = this._parseJSON('data', []);
    const opts = this._parseJSON('options', {});

    this._ctrl = M.hBarChart(this._container, {
      bars,
      ...opts,
      onClick: (bar, index) => {
        this.dispatchEvent(new CustomEvent('mn-hbar-click', {
          detail: { bar, index },
          bubbles: true,
          composed: true,
        }));
      },
    });

    this.dispatchEvent(new CustomEvent('mn-hbar-ready', {
      bubbles: true, composed: true,
    }));
  }

  _rebuild() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
    this._container.innerHTML = '';
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-hbar', MnHbar);
