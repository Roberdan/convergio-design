/**
 * Maranello Design System — <mn-gantt> Web Component
 * Interactive Gantt timeline with zoom, expand/collapse, and task selection.
 *
 * @attr {string} tasks       - JSON array of task objects
 * @attr {number} zoom        - Zoom level (px per day)
 * @attr {number} label-width - Sidebar label width in px
 * @fires mn-gantt-ready     - Dispatched when gantt is initialized
 * @fires mn-gantt-select    - {detail: {task, type, id}} when a task bar is selected
 * @fires mn-gantt-click     - {detail: {task, type, id}} when a task bar is clicked
 * @version 1.5.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnGantt extends HTMLElement {
  static get observedAttributes() {
    return ['tasks', 'zoom', 'label-width'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/charts-gantt-timeline.css");

    const link3 = cssLink("../css/charts-treemap-radar-gantt.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; width: 100%; }
      .mn-gantt__root { width: 100%; overflow: hidden; }
    `;

    this._container = document.createElement('div');
    this._container.className = 'mn-gantt__root';

    this.shadowRoot.append(link1, link2, link3, style, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'figure');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Gantt timeline');
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
      case 'tasks': {
        const parsed = this._parseJSON('tasks', null);
        if (Array.isArray(parsed)) this._ctrl.setTasks(parsed);
        break;
      }
      case 'zoom':
        this._ctrl.setZoom(Number(newVal));
        break;
      case 'label-width':
        this._rebuild();
        break;
    }
  }

  /* ── Public API ─────────────────────────────────────────── */

  setTasks(arr) {
    this._ctrl?.setTasks?.(arr);
  }

  setZoom(n) {
    this._ctrl?.setZoom?.(Number(n));
  }

  scrollToToday() {
    this._ctrl?.scrollToToday?.();
  }

  expandAll() {
    this._ctrl?.expandAll?.();
  }

  collapseAll() {
    this._ctrl?.collapseAll?.();
  }

  fit() {
    this._ctrl?.fit?.();
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.gantt) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const tasks = this._parseJSON('tasks', []);
    const zoom = Number(this.getAttribute('zoom') || 0) || undefined;
    const labelWidth = Number(this.getAttribute('label-width') || 0) || undefined;

    const opts = {};
    if (zoom) opts.zoom = zoom;
    if (labelWidth) opts.labelWidth = labelWidth;
    opts.onSelect = (task, type) => {
      this.dispatchEvent(new CustomEvent('mn-gantt-select', {
        detail: { task, type, id: task?.id },
        bubbles: true,
        composed: true,
      }));
    };
    opts.onClick = (task, type) => {
      this.dispatchEvent(new CustomEvent('mn-gantt-click', {
        detail: { task, type, id: task?.id },
        bubbles: true,
        composed: true,
      }));
    };

    this._ctrl = M.gantt(this._container, tasks, opts);

    this.dispatchEvent(new CustomEvent('mn-gantt-ready', {
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

customElements.define('mn-gantt', MnGantt);
