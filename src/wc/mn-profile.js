/**
 * <mn-profile> — Web Component wrapper for Maranello.profileMenu
 * Profile dropdown menu with avatar trigger, keyboard nav, and viewport-aware positioning.
 *
 * @attr {string} name       - Display name
 * @attr {string} email      - Email address
 * @attr {string} avatar-url - URL for avatar image
 * @attr {string} sections   - JSON array of menu sections [{title, items: [{label, icon, badge, action, variant}]}]
 * @slot (default) - Optional custom trigger content (replaces default avatar)
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnProfile extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'email', 'avatar-url', 'sections'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/extended-avatar-spinner.css");

    const link3 = cssLink("../css/extended-toast-dropdown.css");

    // Host style — the element itself acts as trigger
    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; position: relative; cursor: pointer; }
      .mn-wc-trigger { display: inline-flex; align-items: center; }
    `;

    // Trigger wraps the slot (custom content) or default avatar
    this._trigger = document.createElement('div');
    this._trigger.className = 'mn-wc-trigger';
    this._trigger.setAttribute('role', 'button');
    this._trigger.setAttribute('tabindex', '0');
    this._trigger.setAttribute('aria-haspopup', 'true');
    this._trigger.setAttribute('aria-expanded', 'false');

    const slot = document.createElement('slot');
    this._trigger.appendChild(slot);

    // Dropdown container (profileMenu renders into this)
    this._dropdown = document.createElement('div');
    this._dropdown.className = 'mn-wc-dropdown';

    this.shadowRoot.append(link1, link2, link3, style, this._trigger, this._dropdown);
  }

  connectedCallback() {
    this._init();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal || !this._ctrl) return;
    this._handleAttr(name, newVal);
  }

  /* ── Public API ─────────────────────────────────────────── */

  open() {
    this._ctrl?.open?.();
    this._trigger.setAttribute('aria-expanded', 'true');
  }

  close() {
    this._ctrl?.close?.();
    this._trigger.setAttribute('aria-expanded', 'false');
  }

  setUser(name, email, url) {
    if (typeof name === 'object' && name !== null) {
      // Accept object form: setUser({name, email, avatarUrl})
      this._ctrl?.setUser?.(name);
    } else {
      this._ctrl?.setUser?.(name, email, url);
    }
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.profileMenu) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const sections = this._parseJSON('sections', []);

    // profileMenu expects a trigger element and renders the dropdown
    this._ctrl = M.profileMenu(this._trigger, {
      name: this.getAttribute('name') || '',
      email: this.getAttribute('email') || '',
      avatarUrl: this.getAttribute('avatar-url') || undefined,
      sections,
    });
  }

  _handleAttr(name, value) {
    if (!this._ctrl) return;
    switch (name) {
      case 'name':
      case 'email':
      case 'avatar-url':
        this._ctrl.setUser?.({
          name: this.getAttribute('name') || '',
          email: this.getAttribute('email') || '',
          avatarUrl: this.getAttribute('avatar-url') || undefined,
        });
        break;
      case 'sections':
        this._rebuild();
        break;
    }
  }

  _rebuild() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
    this._dropdown.innerHTML = '';
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-profile', MnProfile);
