/**
 * Maranello Luce Design - Dual-Level Theme Rotary Controller
 * Outer ring: 4 color theme positions (editorial, nero, avorio, colorblind).
 * Center button: glass toggle (on/off).
 */

import type { ThemeMode } from './core/types';
import { getTheme, setTheme, getGlass, setGlass, createElement } from './core/utils';
import { eventBus } from './core/events';

export interface ThemeRotaryOptions {
  container: HTMLElement;
  size?: number;
  onChange?: (theme: ThemeMode, glass: boolean) => void;
}

export interface ThemeRotaryController {
  getTheme: () => ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  getGlass: () => boolean;
  setGlass: (on: boolean) => void;
  destroy: () => void;
}

const THEME_POSITIONS: { mode: ThemeMode; label: string; angle: number }[] = [
  { mode: 'editorial', label: 'ED', angle: -45 },
  { mode: 'nero',      label: 'NR', angle: 45 },
  { mode: 'avorio',    label: 'AV', angle: 135 },
  { mode: 'colorblind', label: 'CB', angle: 225 },
];

const STYLE_ID = 'mn-theme-rotary-css';

function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
.mn-theme-rotary{display:inline-flex;flex-direction:column;align-items:center;user-select:none;gap:8px}
.mn-theme-rotary__dial{position:relative;border-radius:50%}
.mn-theme-rotary__ring{position:absolute;inset:0;border-radius:50%;border:2px solid var(--grigio-scuro,#444);pointer-events:none}
.mn-theme-rotary__pointer{position:absolute;top:8px;left:50%;width:2px;border-radius:1px;background:var(--mn-accent,#FFC72C);transform:translateX(-50%) rotate(0deg);transform-origin:50% calc(var(--rotary-center) - 8px);pointer-events:none;transition:transform .3s cubic-bezier(.4,0,.2,1)}
.mn-theme-rotary__pos{position:absolute;font-family:var(--font-body,sans-serif);font-size:.55rem;color:var(--grigio-medio,#777);text-transform:uppercase;letter-spacing:.04em;cursor:pointer;transform:translate(-50%,-50%);white-space:nowrap;transition:color .15s}
.mn-theme-rotary__pos--active{color:var(--bianco-caldo,#f5f0e8);font-weight:700}
.mn-theme-rotary__center{position:absolute;top:50%;left:50%;border-radius:50%;cursor:pointer;transform:translate(-50%,-50%);transition:background .2s,box-shadow .2s;display:flex;align-items:center;justify-content:center}
.mn-theme-rotary__center:hover{box-shadow:0 0 12px rgba(255,199,44,.3)}
.mn-theme-rotary__center--glass{background:rgba(255,255,255,.12)!important;box-shadow:0 0 16px rgba(255,199,44,.4),inset 0 1px 0 rgba(255,255,255,.15)}
.mn-theme-rotary__glass-icon{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.5;opacity:.7;transition:opacity .15s}
.mn-theme-rotary__center--glass .mn-theme-rotary__glass-icon{opacity:1;stroke:var(--mn-accent,#FFC72C)}
`;
  document.head.appendChild(s);
}

function angleForTheme(mode: ThemeMode): number {
  return THEME_POSITIONS.find((p) => p.mode === mode)?.angle ?? -45;
}

const GLASS_SVG = `<svg class="mn-theme-rotary__glass-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/><path d="M12 4v2m0 12v2M4 12h2m12 0h2"/></svg>`;

/** Create a dual-level theme rotary controller. */
export function themeRotary(opts: ThemeRotaryOptions): ThemeRotaryController {
  ensureStyles();
  const { container, size = 140 } = opts;
  const center = size / 2;
  const labelRadius = size / 2 + 18;
  const pointerLen = size * 0.18;
  const centerSize = size * 0.32;

  const root = createElement('div', 'mn-theme-rotary');
  const dial = createElement('div', 'mn-theme-rotary__dial');
  dial.style.width = dial.style.height = size + 'px';
  root.appendChild(dial);

  // outer ring decoration
  const ring = createElement('div', 'mn-theme-rotary__ring');
  dial.appendChild(ring);

  // pointer
  const pointer = createElement('div', 'mn-theme-rotary__pointer');
  pointer.style.height = pointerLen + 'px';
  pointer.style.setProperty('--rotary-center', center + 'px');
  dial.appendChild(pointer);

  // position labels around dial
  const labels = new Map<ThemeMode, HTMLElement>();
  for (const pos of THEME_POSITIONS) {
    const rad = (pos.angle - 90) * (Math.PI / 180);
    const lx = center + Math.cos(rad) * labelRadius;
    const ly = center + Math.sin(rad) * labelRadius;

    const el = createElement('div', 'mn-theme-rotary__pos');
    el.textContent = pos.label;
    el.style.left = lx + 'px';
    el.style.top = ly + 'px';
    el.dataset.theme = pos.mode;
    el.addEventListener('click', () => applyTheme(pos.mode));
    dial.appendChild(el);
    labels.set(pos.mode, el);
  }

  // center glass toggle button
  const centerBtn = createElement('div', 'mn-theme-rotary__center');
  centerBtn.style.width = centerBtn.style.height = centerSize + 'px';
  centerBtn.style.background = 'radial-gradient(circle at 40% 35%, var(--grigio-scuro, #444), var(--nero-soft, #1a1a1a))';
  centerBtn.style.boxShadow = '0 3px 8px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.15)';
  centerBtn.innerHTML = GLASS_SVG;
  centerBtn.title = 'Toggle glass mode';
  centerBtn.setAttribute('role', 'switch');
  centerBtn.setAttribute('tabindex', '0');
  centerBtn.addEventListener('click', () => toggleGlassMode());
  centerBtn.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGlassMode(); }
  });
  dial.appendChild(centerBtn);

  container.appendChild(root);

  function applyTheme(mode: ThemeMode): void {
    setTheme(mode);
    updateVisual();
    eventBus.emit('theme:change', { theme: mode, glass: getGlass() });
    opts.onChange?.(mode, getGlass());
  }

  function toggleGlassMode(): void {
    const next = !getGlass();
    setGlass(next);
    updateVisual();
    eventBus.emit('glass:change', { glass: next, theme: getTheme() });
    opts.onChange?.(getTheme(), next);
  }

  function updateVisual(): void {
    const current = getTheme();
    const angle = angleForTheme(current);
    pointer.style.transform = `translateX(-50%) rotate(${angle}deg)`;

    for (const [mode, el] of labels) {
      el.classList.toggle('mn-theme-rotary__pos--active', mode === current);
    }

    const glass = getGlass();
    centerBtn.classList.toggle('mn-theme-rotary__center--glass', glass);
    centerBtn.setAttribute('aria-checked', String(glass));
  }

  // initial render
  updateVisual();

  return {
    getTheme,
    setTheme: applyTheme,
    getGlass,
    setGlass: (on: boolean) => { setGlass(on); updateVisual(); opts.onChange?.(getTheme(), on); },
    destroy: () => { root.remove(); },
  };
}
