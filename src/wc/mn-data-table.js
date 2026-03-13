/**
 * <mn-data-table> — Web Component wrapper for Maranello.dataTable
 * Sortable, filterable, groupable data table with row selection.
 *
 * @attr {string} columns  - JSON array of column definitions
 * @attr {string} data     - JSON array of row objects
 * @attr {number} page-size - Rows per page (0 = no pagination)
 * @attr {string} groupBy  - Column key to group rows by
 * @attr {boolean} selectable - Enable row checkboxes
 * @attr {boolean} compact  - Compact row height
 * @fires mn-row-click  - {detail: {row, index}}
 * @fires mn-sort       - {detail: {key, direction}}
 * @fires mn-filter     - {detail: {key, value}}
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnDataTable extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'data', 'page-size', 'group-by', 'selectable', 'compact'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/layouts-data-table-1.css");

    const link3 = cssLink("../css/layouts-data-table-2.css");

    const link4 = cssLink("../css/components-tables-status.css");

    this._container = document.createElement('div');
    this._container.className = 'mn-wc-root';
    this.shadowRoot.append(link1, link2, link3, link4, this._container);
  }

  connectedCallback() {
    this.setAttribute('role', 'table');
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Data table');
    }
    this._init();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal || !this._ctrl) return;
    this._update(name, newVal);
  }

  /* ── Public API ─────────────────────────────────────────── */

  setData(arr) {
    this._ctrl?.setData?.(arr);
  }

  setFilter(key, val) {
    this._ctrl?.setFilter?.(key, val);
  }

  clearFilters() {
    this._ctrl?.clearFilters?.();
  }

  refresh() {
    this._ctrl?.refresh?.();
  }

  getSelected() {
    return this._ctrl?.getSelected?.() ?? [];
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.dataTable) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const columns = this._parseJSON('columns', []);
    const data = this._parseJSON('data', []);
    const pageSize = parseInt(this.getAttribute('page-size') || '0', 10);
    const groupBy = this.getAttribute('group-by') || undefined;
    const selectable = this.hasAttribute('selectable');
    const compact = this.hasAttribute('compact');

    this._ctrl = M.dataTable(this._container, {
      columns,
      data,
      pageSize: pageSize || undefined,
      groupBy,
      selectable,
      compact,
      onRowClick: (row, idx) => {
        this.dispatchEvent(new CustomEvent('mn-row-click', {
          detail: { row, index: idx },
          bubbles: true,
          composed: true,
        }));
      },
      onSort: (key, dir) => {
        this.dispatchEvent(new CustomEvent('mn-sort', {
          detail: { key, direction: dir },
          bubbles: true,
          composed: true,
        }));
      },
      onFilter: (key, val) => {
        this.dispatchEvent(new CustomEvent('mn-filter', {
          detail: { key, value: val },
          bubbles: true,
          composed: true,
        }));
      },
    });
  }

  _update(name, value) {
    if (!this._ctrl) return;
    switch (name) {
      case 'data': {
        const parsed = (() => { try { return JSON.parse(value); } catch { return null; } })();
        if (Array.isArray(parsed)) this._ctrl.setData(parsed);
        break;
      }
      case 'group-by':
        this._ctrl.setGroup?.(value || undefined);
        break;
      case 'columns':
      case 'page-size':
      case 'selectable':
      case 'compact':
        this._rebuild();
        break;
    }
  }

  _rebuild() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
    this._container.innerHTML = '';
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-data-table', MnDataTable);
