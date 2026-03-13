/**
 * <mn-a11y> — Accessibility settings panel WC (FAB + panel).
 * Wraps Maranello.a11yPanel. Font size, motion, contrast, focus.
 * @method getSettings() @method reset() @version 1.4.0
 */
const _base = new URL('.', import.meta.url).href;
function cssLink(path) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = new URL(path, _base).href;
  return link;
}
class MnA11y extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._ctrl = null;
    this._initAttempts = 0;

    const tokens = cssLink("../css/tokens.css");

    const link = cssLink("../css/accessibility.css");

    const style = document.createElement('style');
    style.textContent = `
      :host { display: contents }
      .mn-a11y-fab { position: fixed; bottom: 20px; right: 20px; z-index: 8500;
        width: 44px; height: 44px; border-radius: 50%; border: none;
        background: var(--nero-soft, #1a1a1a);
        border: 1px solid var(--grigio-scuro, #444);
        color: var(--grigio-chiaro, #ccc); cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,.4);
        transition: background .15s, transform .15s; font-size: 1.1rem }
      .mn-a11y-fab:hover { background: var(--grigio-scuro, #333);
        transform: scale(1.05) }
      .mn-a11y-panel { position: fixed; bottom: 74px; right: 20px; z-index: 8500;
        width: 280px; background: var(--nero-soft, #1a1a1a);
        border: 1px solid var(--grigio-scuro, #444); border-radius: 12px;
        padding: 16px; box-shadow: 0 12px 32px rgba(0,0,0,.5);
        opacity: 0; transform: translateY(8px); pointer-events: none;
        transition: opacity .2s, transform .2s;
        font-family: var(--font-body, sans-serif);
        color: var(--grigio-chiaro, #ccc) }
      .mn-a11y-panel--open { opacity: 1; transform: translateY(0);
        pointer-events: auto }
      .mn-a11y-panel__title { font-weight: 600; font-size: .95rem;
        color: var(--bianco-caldo, #f5f0e8); margin-bottom: 14px;
        display: flex; align-items: center; gap: 6px }
      .mn-a11y-panel__group { margin-bottom: 12px }
      .mn-a11y-panel__label { font-size: .75rem; text-transform: uppercase;
        letter-spacing: .06em; color: var(--grigio-medio, #777);
        margin-bottom: 6px }
      .mn-a11y-panel__size-btns { display: flex; gap: 4px }
      .mn-a11y-panel__size-btn { padding: 6px 12px; border-radius: 6px;
        border: 1px solid var(--grigio-scuro, #444); background: transparent;
        color: var(--grigio-chiaro, #ccc); cursor: pointer; font-size: .8rem;
        transition: all .15s }
      .mn-a11y-panel__size-btn--active { background: var(--rosso-corsa, #DC0000);
        border-color: var(--rosso-corsa, #DC0000);
        color: var(--bianco-puro, #fff) }
      .mn-a11y-panel__row { display: flex; align-items: center;
        justify-content: space-between; padding: 6px 0 }
      .mn-a11y-panel__row-label { font-size: .85rem }
      .mn-a11y-toggle { width: 40px; height: 22px; border-radius: 11px;
        background: var(--grigio-scuro, #444); border: none; cursor: pointer;
        position: relative; transition: background .15s; padding: 0 }
      .mn-a11y-toggle--on { background: var(--rosso-corsa, #DC0000) }
      .mn-a11y-toggle__thumb { width: 18px; height: 18px; border-radius: 50%;
        background: var(--bianco-puro, #fff); position: absolute; top: 2px;
        left: 2px; transition: left .15s }
      .mn-a11y-toggle--on .mn-a11y-toggle__thumb { left: 20px }
      .mn-a11y-panel__divider { height: 1px; background: var(--grigio-scuro, #333);
        margin: 10px 0 }
      .mn-a11y-panel__reset { width: 100%; padding: 8px; border-radius: 6px;
        border: 1px solid var(--grigio-scuro, #444); background: transparent;
        color: var(--grigio-chiaro, #ccc); cursor: pointer; font-size: .8rem;
        margin-top: 8px; transition: background .15s }
      .mn-a11y-panel__reset:hover { background: var(--grigio-scuro, #333) }
    `;

    this.shadowRoot.append(tokens, link, style);
  }

  connectedCallback() {
    this._tryInit();
  }

  disconnectedCallback() {
    this._ctrl?.destroy?.();
    this._ctrl = null;
  }

  /* ── Public API ─────────────────────────────────────────── */

  getSettings() {
    return this._ctrl?.getSettings?.() ?? {};
  }

  reset() {
    this._ctrl?.reset?.();
  }

  /* ── Private ────────────────────────────────────────────── */

  _tryInit() {
    const M = window.Maranello;
    if (M?.a11yPanel && M._a11yDom) {
      this._ctrl = M.a11yPanel();
      return;
    }
    if (this._initAttempts++ < 30) {
      requestAnimationFrame(() => this._tryInit());
      return;
    }
    this._buildFallback();
  }

  _buildFallback() {
    const STORAGE = 'mn-a11y';
    const DEFAULTS = { fontSize: 'md', reducedMotion: false,
      highContrast: false, focusVisible: true, lineSpacing: 'normal' };
    const SIZES = { sm: 0.875, md: 1.0, lg: 1.125, xl: 1.25 };

    let settings;
    try { settings = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE)) }; }
    catch { settings = { ...DEFAULTS }; }

    const apply = () => {
      const root = document.documentElement;
      root.style.fontSize = ((SIZES[settings.fontSize] || 1) * 16) + 'px';
      root.classList.toggle('mn-reduced-motion', settings.reducedMotion);
      root.classList.toggle('mn-high-contrast', settings.highContrast);
      root.classList.toggle('mn-no-focus-ring', !settings.focusVisible);
      try { localStorage.setItem(STORAGE, JSON.stringify(settings)); } catch { /* noop */ }
    };

    const fab = document.createElement('button');
    fab.className = 'mn-a11y-fab';
    fab.innerHTML = '\u2699';
    fab.setAttribute('aria-label', 'Display settings');

    const panel = document.createElement('div');
    panel.className = 'mn-a11y-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility settings');

    const title = document.createElement('div');
    title.className = 'mn-a11y-panel__title';
    title.textContent = '\u2699 Display';
    panel.appendChild(title);

    const mkSizeRow = (label, key, opts) => {
      const g = document.createElement('div');
      g.className = 'mn-a11y-panel__group';
      const l = document.createElement('div');
      l.className = 'mn-a11y-panel__label';
      l.textContent = label;
      g.appendChild(l);
      const row = document.createElement('div');
      row.className = 'mn-a11y-panel__size-btns';
      const btns = {};
      Object.keys(opts).forEach((k) => {
        const b = document.createElement('button');
        b.className = 'mn-a11y-panel__size-btn';
        if (settings[key] === k) b.classList.add('mn-a11y-panel__size-btn--active');
        b.textContent = opts[k];
        b.addEventListener('click', () => {
          settings[key] = k;
          Object.values(btns).forEach((x) => x.classList.remove('mn-a11y-panel__size-btn--active'));
          b.classList.add('mn-a11y-panel__size-btn--active');
          apply();
        });
        btns[k] = b;
        row.appendChild(b);
      });
      g.appendChild(row);
      return { el: g, btns };
    };

    const fs = mkSizeRow('Text Size', 'fontSize', { sm: 'S', md: 'M', lg: 'L', xl: 'XL' });
    panel.appendChild(fs.el);

    const mkToggle = (label, key) => {
      const r = document.createElement('div');
      r.className = 'mn-a11y-panel__row';
      const l = document.createElement('span');
      l.className = 'mn-a11y-panel__row-label';
      l.textContent = label;
      const t = document.createElement('button');
      t.className = 'mn-a11y-toggle' + (settings[key] ? ' mn-a11y-toggle--on' : '');
      t.setAttribute('role', 'switch');
      t.setAttribute('aria-checked', String(!!settings[key]));
      const thumb = document.createElement('span');
      thumb.className = 'mn-a11y-toggle__thumb';
      t.appendChild(thumb);
      t.addEventListener('click', () => {
        settings[key] = !settings[key];
        t.classList.toggle('mn-a11y-toggle--on', settings[key]);
        t.setAttribute('aria-checked', String(settings[key]));
        apply();
      });
      r.append(l, t);
      return r;
    };

    const div1 = document.createElement('div');
    div1.className = 'mn-a11y-panel__divider';
    panel.appendChild(div1);
    panel.appendChild(mkToggle('Reduced Motion', 'reducedMotion'));
    panel.appendChild(mkToggle('High Contrast', 'highContrast'));
    panel.appendChild(mkToggle('Focus Indicators', 'focusVisible'));

    const div2 = document.createElement('div');
    div2.className = 'mn-a11y-panel__divider';
    panel.appendChild(div2);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'mn-a11y-panel__reset';
    resetBtn.textContent = 'Reset to Defaults';
    resetBtn.addEventListener('click', () => {
      Object.assign(settings, DEFAULTS);
      apply();
      this.shadowRoot.querySelectorAll('.mn-a11y-panel__size-btn').forEach((b) => {
        b.classList.toggle('mn-a11y-panel__size-btn--active', b.textContent === 'M');
      });
    });
    panel.appendChild(resetBtn);

    let isOpen = false;
    fab.addEventListener('click', () => {
      isOpen = !isOpen;
      panel.classList.toggle('mn-a11y-panel--open', isOpen);
    });

    this.shadowRoot.append(fab, panel);
    apply();

    this._ctrl = {
      getSettings: () => ({ ...settings }),
      reset: () => resetBtn.click(),
      destroy: () => { fab.remove(); panel.remove(); },
    };
  }
}

customElements.define('mn-a11y', MnA11y);
