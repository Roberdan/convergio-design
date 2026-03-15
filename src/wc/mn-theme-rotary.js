/**
 * <mn-theme-rotary> — Dual-level theme rotary Web Component
 * Outer ring: 4 theme positions (editorial, nero, avorio, colorblind).
 * Center button: glass overlay toggle.
 *
 * @attr {number} size - Diameter in px (default: 140)
 * @fires mn-theme-change - {detail: {theme, glass}}
 * @fires mn-glass-change - {detail: {glass, theme}}
 * @version 1.0.0
 */

const resolve = (path, fallback = null) => {
  try { return globalThis.Maranello?.[path] ?? fallback; } catch { return fallback; }
};

class MnThemeRotary extends HTMLElement {
  static get observedAttributes() {
    return ['size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._controller = null;
  }

  connectedCallback() {
    // Restore saved theme before rendering so the dial reflects correct position
    const saved = localStorage.getItem('mn-theme');
    if (saved) {
      document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
      if (saved !== 'editorial') document.body.classList.add('mn-' + saved);
    }
    const size = parseInt(this.getAttribute('size') || '140', 10);
    this._render(size);
  }

  disconnectedCallback() {
    this._controller?.destroy();
    this._controller = null;
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'size' && oldVal !== newVal && this.isConnected) {
      this.shadowRoot.innerHTML = '';
      this._render(parseInt(newVal || '140', 10));
    }
  }

  _render(size) {
    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; }
      .wrap { display: inline-flex; flex-direction: column; align-items: center; user-select: none; gap: 8px; }
      .dial { position: relative; border-radius: 50%; }
      .ring { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--grigio-scuro, #444); pointer-events: none; }
      .pointer { position: absolute; top: 8px; left: 50%; width: 2px; border-radius: 1px; background: var(--mn-accent, #FFC72C); transform: translateX(-50%); transform-origin: 50% var(--ptr-origin); pointer-events: none; transition: transform .3s cubic-bezier(.4,0,.2,1); }
      .pos { position: absolute; font-family: var(--font-body, sans-serif); font-size: .55rem; color: var(--grigio-medio, #777); text-transform: uppercase; letter-spacing: .04em; cursor: pointer; transform: translate(-50%, -50%); white-space: nowrap; transition: color .15s; }
      .pos--active { color: var(--bianco-caldo, #f5f0e8); font-weight: 700; }
      .center { position: absolute; top: 50%; left: 50%; border-radius: 50%; cursor: pointer; transform: translate(-50%, -50%); transition: background .2s, box-shadow .2s; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 40% 35%, var(--grigio-scuro, #444), var(--nero-soft, #1a1a1a)); box-shadow: 0 3px 8px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.15); }
      .center:hover { box-shadow: 0 0 12px rgba(255,199,44,.3); }
      .center--glass { background: rgba(255,255,255,.12); box-shadow: 0 0 16px rgba(255,199,44,.4), inset 0 1px 0 rgba(255,255,255,.15); }
      .glass-icon { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.5; opacity: .7; transition: opacity .15s; }
      .center--glass .glass-icon { opacity: 1; stroke: var(--mn-accent, #FFC72C); }
    `;
    this.shadowRoot.appendChild(style);

    const POSITIONS = [
      { mode: 'editorial', label: 'ED', angle: -45 },
      { mode: 'nero', label: 'NR', angle: 45 },
      { mode: 'avorio', label: 'AV', angle: 135 },
      { mode: 'colorblind', label: 'CB', angle: 225 },
    ];

    const center = size / 2;
    const labelR = size / 2 + 18;
    const pointerLen = size * 0.18;
    const centerSize = size * 0.32;

    const wrap = document.createElement('div');
    wrap.className = 'wrap';

    const dial = document.createElement('div');
    dial.className = 'dial';
    dial.style.width = dial.style.height = size + 'px';
    wrap.appendChild(dial);

    const ring = document.createElement('div');
    ring.className = 'ring';
    dial.appendChild(ring);

    const pointer = document.createElement('div');
    pointer.className = 'pointer';
    pointer.style.height = pointerLen + 'px';
    pointer.style.setProperty('--ptr-origin', (center - 8) + 'px');
    dial.appendChild(pointer);

    const labels = {};
    for (const pos of POSITIONS) {
      const rad = (pos.angle - 90) * (Math.PI / 180);
      const lx = center + Math.cos(rad) * labelR;
      const ly = center + Math.sin(rad) * labelR;

      const el = document.createElement('div');
      el.className = 'pos';
      el.textContent = pos.label;
      el.style.left = lx + 'px';
      el.style.top = ly + 'px';
      el.addEventListener('click', () => this._applyTheme(pos.mode));
      dial.appendChild(el);
      labels[pos.mode] = el;
    }

    const centerBtn = document.createElement('div');
    centerBtn.className = 'center';
    centerBtn.style.width = centerBtn.style.height = centerSize + 'px';
    centerBtn.innerHTML = `<svg class="glass-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/><path d="M12 4v2m0 12v2M4 12h2m12 0h2"/></svg>`;
    centerBtn.title = 'Toggle glass mode';
    centerBtn.setAttribute('role', 'switch');
    centerBtn.setAttribute('tabindex', '0');
    centerBtn.addEventListener('click', () => this._toggleGlass());
    centerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._toggleGlass(); }
    });
    dial.appendChild(centerBtn);

    this.shadowRoot.appendChild(wrap);

    this._labels = labels;
    this._pointer = pointer;
    this._centerBtn = centerBtn;
    this._positions = POSITIONS;

    this._update();
  }

  _getTheme() {
    const fn = resolve('getTheme');
    if (fn) return fn();
    const cl = document.body.classList;
    if (cl.contains('mn-nero')) return 'nero';
    if (cl.contains('mn-avorio')) return 'avorio';
    if (cl.contains('mn-colorblind')) return 'colorblind';
    return 'editorial';
  }

  _getGlass() {
    const fn = resolve('getGlass');
    if (fn) return fn();
    return document.body.classList.contains('mn-glass');
  }

  _applyTheme(mode) {
    const fn = resolve('setTheme');
    if (fn) fn(mode);
    else {
      document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
      const map = { nero: 'mn-nero', avorio: 'mn-avorio', colorblind: 'mn-colorblind' };
      if (map[mode]) document.body.classList.add(map[mode]);
    }
    localStorage.setItem('mn-theme', mode);
    this._update();
    this.dispatchEvent(new CustomEvent('mn-theme-change', {
      detail: { theme: mode, glass: this._getGlass() }, bubbles: true, composed: true,
    }));
  }

  _toggleGlass() {
    const fn = resolve('toggleGlass');
    let next;
    if (fn) { next = fn(); }
    else { next = !this._getGlass(); document.body.classList.toggle('mn-glass', next); }
    this._update();
    this.dispatchEvent(new CustomEvent('mn-glass-change', {
      detail: { glass: next, theme: this._getTheme() }, bubbles: true, composed: true,
    }));
  }

  _update() {
    if (!this._pointer) return;
    const current = this._getTheme();
    const pos = this._positions.find((p) => p.mode === current);
    const angle = pos ? pos.angle : -45;
    this._pointer.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    for (const [mode, el] of Object.entries(this._labels)) {
      el.classList.toggle('pos--active', mode === current);
    }

    const glass = this._getGlass();
    this._centerBtn.classList.toggle('center--glass', glass);
    this._centerBtn.setAttribute('aria-checked', String(glass));
  }
}

customElements.define('mn-theme-rotary', MnThemeRotary);
