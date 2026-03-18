import { AppShellController } from '../ts/app-shell.js';

const SLOT_NAMES = ['nav', 'toolbar', 'filter-bar', 'main', 'secondary', 'detail', 'bottom', 'overlay'];
const VALID_LAYOUTS = new Set(['full', 'split', 'stacked', 'docked-bottom', 'dual-panel', 'side-detail']);

class MnAppShell extends HTMLElement {
  static get observedAttributes() {
    return ['layout'];
  }

  constructor() {
    super();
    this._controller = null;
    this._orchestrator = null;
  }

  connectedCallback() {
    if (this._controller) return;
    this._controller = new AppShellController(this, {
      layout: this._resolveLayout(this.getAttribute('layout')),
    });
    this._mountSlots();
    if (this._orchestrator) {
      this._controller.orchestrator = this._orchestrator;
    }
  }

  disconnectedCallback() {
    this._controller?.destroy();
    this._controller = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'layout' && oldVal !== newVal && this._controller) {
      this._controller.setLayout(this._resolveLayout(newVal));
    }
  }

  set orchestrator(value) {
    this._orchestrator = value;
    if (this._controller) {
      this._controller.orchestrator = value;
    }
  }

  get orchestrator() {
    return this._orchestrator;
  }

  _resolveLayout(raw) {
    return VALID_LAYOUTS.has(raw) ? raw : 'full';
  }

  _mountSlots() {
    if (!this._controller) return;
    SLOT_NAMES.forEach((name) => {
      const container = this._controller.getSlot(name);
      if (!container || container.querySelector(`:scope > slot[name="${name}"]`)) return;
      const slot = document.createElement('slot');
      slot.name = name;
      container.append(slot);
    });
  }
}

if (!customElements.get('mn-app-shell')) {
  customElements.define('mn-app-shell', MnAppShell);
}
