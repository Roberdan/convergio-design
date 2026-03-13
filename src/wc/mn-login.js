/**
 * <mn-login> — Web Component wrapper for Maranello.loginScreen
 * Login screen with SSO sign-in button and service health gauges.
 *
 * @attr {string} health-url - URL for health endpoint polling
 * @attr {string} title      - Application title
 * @attr {string} subtitle   - Subtitle / version string
 * @fires mn-login - Dispatched when the user clicks the sign-in button
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnLogin extends HTMLElement {
  static get observedAttributes() {
    return ['health-url', 'title', 'subtitle'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/layouts-chat-login.css");

    const link3 = cssLink("../css/gauge.css");

    this._container = document.createElement('div');
    this._container.className = 'mn-wc-root';
    this.shadowRoot.append(link1, link2, link3, this._container);
  }

  connectedCallback() {
    this._init();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this._ctrl) this._handleAttr(name, newVal);
  }

  /* ── Public API ─────────────────────────────────────────── */

  updateStatus(data) {
    this._ctrl?.updateStatus?.(data);
  }

  setError(msg) {
    this._ctrl?.setError?.(msg);
  }

  /* ── Internals ──────────────────────────────────────────── */

  _init() {
    const M = window.Maranello;
    if (!M?.loginScreen) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    const healthUrl = this.getAttribute('health-url') || undefined;

    this._ctrl = M.loginScreen(this._container, {
      subtitle: this.getAttribute('subtitle') || undefined,
      version: undefined,
      healthUrl,
      autoHealth: !!healthUrl,
      onLogin: () => {
        this.dispatchEvent(new CustomEvent('mn-login', {
          bubbles: true,
          composed: true,
        }));
      },
    });
  }

  _handleAttr(name, value) {
    switch (name) {
      case 'title':
      case 'subtitle':
      case 'health-url':
        // These require a full rebuild since loginScreen
        // doesn't expose individual property setters
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

customElements.define('mn-login', MnLogin);
