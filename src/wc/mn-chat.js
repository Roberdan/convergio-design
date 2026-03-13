/**
 * <mn-chat> — Web Component wrapper for Maranello.aiChat
 * AI chat panel with floating action button, typing indicator, and quick actions.
 *
 * @attr {string} title           - Chat panel header title
 * @attr {string} welcome-message - Initial greeting shown in empty chat
 * @attr {string} avatar          - URL or emoji for the assistant avatar
 * @attr {string} quick-actions   - JSON array of quick-action definitions
 * @fires mn-send         - {detail: {message}} when user sends a message
 * @fires mn-quick-action - {detail: {action, context}} on quick-action click
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnChat extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'welcome-message', 'avatar', 'quick-actions'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const link1 = cssLink("../css/tokens.css");

    const link2 = cssLink("../css/layouts-chat-login.css");

    const link3 = cssLink("../css/extended-toast-dropdown.css");

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

  open() {
    this._ctrl?.open?.();
  }

  close() {
    this._ctrl?.close?.();
  }

  addMessage(role, text) {
    this._ctrl?.addMessage?.(role, text);
  }

  setTyping(on) {
    this._ctrl?.setTyping?.(!!on);
  }

  /* ── Internals ──────────────────────────────────────────── */

  _parseJSON(attr, fallback) {
    try { return JSON.parse(this.getAttribute(attr) || ''); }
    catch { return fallback; }
  }

  _init() {
    const M = window.Maranello;
    if (!M?.aiChat) {
      if (++this._initAttempts < 60) {
        requestAnimationFrame(() => this._init());
      }
      return;
    }

    this._ctrl = M.aiChat(this._container, {
      title: this.getAttribute('title') || 'Chat',
      welcomeMessage: this.getAttribute('welcome-message') || undefined,
      avatar: this.getAttribute('avatar') || undefined,
      quickActions: this._parseJSON('quick-actions', []),

      onSend: (msg) => {
        this.dispatchEvent(new CustomEvent('mn-send', {
          detail: { message: msg },
          bubbles: true,
          composed: true,
        }));
        // Return a resolved promise so the chat UI doesn't block
        return Promise.resolve();
      },

      onQuickAction: (action, ctx) => {
        this.dispatchEvent(new CustomEvent('mn-quick-action', {
          detail: { action, context: ctx },
          bubbles: true,
          composed: true,
        }));
      },
    });
  }

  _handleAttr(name) {
    // Most chat attrs require rebuild since the controller
    // doesn't expose individual setters for title/avatar/etc.
    this._rebuild();
  }

  _rebuild() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
    this._container.innerHTML = '';
    this._initAttempts = 0;
    this._init();
  }
}

customElements.define('mn-chat', MnChat);
