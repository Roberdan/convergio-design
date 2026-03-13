/**
 * Maranello Design System — <mn-okr> Web Component
 * OKR dashboard panel with hero gauge, objective cards, and key results.
 *
 * @attr {string} objectives - JSON array of objective objects
 * @attr {string} options    - JSON options: {title, period}
 * @fires mn-okr-ready - Dispatched when panel is rendered
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnOkr extends HTMLElement {
  static get observedAttributes() {
    return ['objectives', 'options'];
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
      :host { display: block; width: 100%; }
      .mn-okr__root { width: 100%; }
    `;

    this._container = document.createElement('div');
    this._container.className = 'mn-okr__root';

    this.shadowRoot.append(link1, link2, link3, style, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'region');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'OKR dashboard');
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
      case 'objectives': {
        const parsed = this._parseJSON('objectives', null);
        if (Array.isArray(parsed)) this._ctrl.update(parsed);
        break;
      }
      case 'options':
        this._rebuild();
        break;
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  update(objectives) {
    this._ctrl?.update?.(objectives);
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.okrPanel) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const objectives = this._parseJSON('objectives', []);
    const opts = this._parseJSON('options', {});

    this._ctrl = M.okrPanel(this._container, {
      objectives,
      ...opts,
    });

    this.dispatchEvent(new CustomEvent('mn-okr-ready', {
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

customElements.define('mn-okr', MnOkr);
