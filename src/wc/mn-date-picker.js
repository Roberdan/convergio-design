/**
 * <mn-date-picker> — Web Component wrapper for Maranello.datePicker
 * Calendar date picker with min/max constraints and disabled dates.
 *
 * @attr {string}  value          - ISO date string (YYYY-MM-DD)
 * @attr {string}  min            - Minimum selectable date
 * @attr {string}  max            - Maximum selectable date
 * @attr {string}  disabled-dates - JSON array of disabled ISO dates
 * @fires mn-change - {detail: {date}}
 * @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnDatePicker extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max', 'disabled-dates'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const tokens = cssLink("../css/tokens.css");

    const link = cssLink("../css/forms-file-date-range.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; position: relative }
      .mn-wc-trigger { display: flex; align-items: center; gap: 8px;
        padding: 8px 12px; border-radius: 8px; cursor: pointer;
        background: var(--nero-soft, #1a1a1a);
        border: 1px solid var(--grigio-scuro, #444);
        color: var(--grigio-chiaro, #ccc);
        font-family: var(--font-body, sans-serif); font-size: .9rem;
        transition: border-color var(--duration-sm, .15s) }
      .mn-wc-trigger:hover { border-color: var(--grigio-medio, #777) }
      .mn-wc-trigger:focus { outline: 2px solid var(--rosso-corsa, #DC0000);
        outline-offset: 2px }
      .mn-wc-icon { font-size: 1rem }
    `;

    this._trigger = document.createElement('button');
    this._trigger.className = 'mn-wc-trigger';
    this._trigger.setAttribute('aria-label', 'Pick a date');
    const icon = document.createElement('span');
    icon.className = 'mn-wc-icon';
    icon.textContent = '\uD83D\uDCC5';
    this._label = document.createElement('span');
    this._label.textContent = 'Select date';
    this._trigger.append(icon, this._label);

    this._anchor = document.createElement('div');
    this._anchor.style.position = 'relative';

    this._trigger.addEventListener('click', () => this._toggle());

    this.shadowRoot.append(tokens, link, style, this._trigger, this._anchor);
  }

  connectedCallback() {
    this._updateLabel();
  }

  disconnectedCallback() {
    this.close();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'value') this._updateLabel();
  }

  /* ── Public API ─────────────────────────────────────────── */

  getValue() {
    return this.getAttribute('value') || '';
  }

  close() {
    this._ctrl?.close?.();
    this._ctrl = null;
  }

  /* ── Private ────────────────────────────────────────────── */

  _toggle() {
    if (this._ctrl) { this.close(); return; }
    this._tryInit();
  }

  _tryInit() {
    const M = window.Maranello;
    if (!M?.datePicker) {
      if (this._initAttempts++ < 20) {
        requestAnimationFrame(() => this._tryInit());
      }
      return;
    }

    const disabledRaw = this.getAttribute('disabled-dates');
    let disabledSet = new Set();
    try { disabledSet = new Set(JSON.parse(disabledRaw)); } catch { /* ignore */ }

    this._ctrl = M.datePicker(this._anchor, {
      value: this.getAttribute('value') || undefined,
      min: this.getAttribute('min') || undefined,
      max: this.getAttribute('max') || undefined,
      onSelect: (dateStr) => {
        if (disabledSet.has(dateStr)) return;
        this.setAttribute('value', dateStr);
        this._updateLabel();
        this.dispatchEvent(new CustomEvent('mn-change', {
          detail: { date: dateStr },
          bubbles: true, composed: true,
        }));
      },
    });
  }

  _updateLabel() {
    const v = this.getAttribute('value');
    this._label.textContent = v || 'Select date';
  }
}

customElements.define('mn-date-picker', MnDatePicker);
