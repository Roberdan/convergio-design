/**
 * Maranello Design System — <mn-funnel> Web Component
 * Pipeline funnel visualization with conversion rates.
 *
 * @attr {string}  stages          - JSON array of stage objects
 * @attr {boolean} show-conversion - Show conversion % between stages
 * @attr {boolean} animate         - Enable entrance animation
 * @fires mn-funnel-ready  - Dispatched when funnel is rendered
 * @fires mn-funnel-click  - {detail: {stage, index}} on stage click
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnFunnel extends HTMLElement {
  static get observedAttributes() {
    return ['stages', 'show-conversion', 'animate'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/layouts-funnel.css");

    const link3 = cssLink("../css/charts-heatmap-funnel-flip.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; width: 100%; }
      .mn-funnel__root { width: 100%; }
    `;

    this._container = document.createElement('div');
    this._container.className = 'mn-funnel__root';

    this.shadowRoot.append(link1, link2, link3, style, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'figure');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Pipeline funnel');
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
      case 'stages': {
        const parsed = this._parseJSON('stages', null);
        if (Array.isArray(parsed)) this._ctrl.update(parsed);
        break;
      }
      case 'show-conversion':
      case 'animate':
        this._rebuild();
        break;
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  update(stages) {
    this._ctrl?.update?.(stages);
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.funnel) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const stages = this._parseJSON('stages', []);
    const showConversion = this.hasAttribute('show-conversion');
    const animate = this.hasAttribute('animate');

    this._ctrl = M.funnel(this._container, {
      stages,
      showConversion,
      showPercentages: showConversion,
      animate,
      onClick: (stage, index) => {
        this.dispatchEvent(new CustomEvent('mn-funnel-click', {
          detail: { stage, index },
          bubbles: true,
          composed: true,
        }));
      },
    });

    this.dispatchEvent(new CustomEvent('mn-funnel-ready', {
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

customElements.define('mn-funnel', MnFunnel);
