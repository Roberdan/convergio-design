/**
 * Maranello Luce Design - Bullet Chart
 * Target-vs-actual comparison chart rendered on canvas.
 */

export interface BulletRange {
  max: number;
  color?: string;
  label?: string;
}

export interface BulletChartOptions {
  value: number;
  target: number;
  max: number;
  label?: string;
  unit?: string;
  ranges?: BulletRange[];
  height?: number;
  animate?: boolean;
}

/** Resolve a CSS variable name to its computed value. */
function resolveCssVar(varName: string): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return raw || '#888';
}

/** Resolve a color string — handles var(--x) syntax and plain colors. */
function resolveColor(color: string): string {
  if (color.startsWith('var(')) {
    const varName = color.slice(4, color.indexOf(')')).split(',')[0].trim();
    return resolveCssVar(varName);
  }
  return color;
}

/** Ease-out cubic for smooth animation deceleration. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function defaultRanges(max: number): BulletRange[] {
  return [
    { max: max * 0.33, color: 'var(--signal-danger)' },
    { max: max * 0.67, color: 'var(--signal-warning)' },
    { max: max, color: 'var(--signal-ok)' },
  ];
}

/**
 * Render a bullet chart (target-vs-actual) on a canvas element.
 * Draws qualitative background bands, a value bar, and a target marker.
 */
export function bulletChart(
  canvas: HTMLCanvasElement,
  opts: BulletChartOptions,
): void {
  const dpr = window.devicePixelRatio || 1;
  const barH = opts.height ?? 40;
  const hasLabel = Boolean(opts.label);
  const labelH = hasLabel ? 20 : 0;
  const totalH = barH + labelH;

  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = totalH * dpr;
  canvas.style.width = `${canvas.offsetWidth}px`;
  canvas.style.height = `${totalH}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const w = canvas.offsetWidth;
  const ranges = opts.ranges ?? defaultRanges(opts.max);
  const animate = opts.animate !== false;
  const duration = 600;

  const textColor = resolveCssVar('--mn-text');
  const mutedColor = resolveCssVar('--mn-text-muted');
  const accentColor = resolveCssVar('--mn-accent');

  const resolvedRanges = ranges.map((r) => ({
    max: r.max,
    color: r.color ? resolveColor(r.color) : '#888',
  }));

  function draw(currentValue: number): void {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, totalH);

    /* Label above the bar */
    if (hasLabel && opts.label) {
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = mutedColor;
      ctx.textBaseline = 'top';
      ctx.fillText(opts.label, 0, 2);
    }

    const barTop = labelH;
    const barW = w - 40;

    /* Background ranges at 15% opacity */
    let prevX = 0;
    for (const r of resolvedRanges) {
      const x = (r.max / opts.max) * barW;
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = r.color;
      ctx.fillRect(prevX, barTop, x - prevX, barH);
      prevX = x;
    }
    ctx.globalAlpha = 1;

    /* Value bar — centered vertically, 50% of bar height */
    const valBarH = barH * 0.5;
    const valBarTop = barTop + (barH - valBarH) / 2;
    const valW = Math.min((currentValue / opts.max) * barW, barW);
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, valBarTop, valW, valBarH);

    /* Target marker — vertical line, full bar height, 2px */
    const targetX = (opts.target / opts.max) * barW;
    ctx.fillStyle = textColor;
    ctx.fillRect(targetX - 1, barTop, 2, barH);

    /* Value text at right end */
    const displayVal = Math.round(currentValue);
    const valText = opts.unit ? `${displayVal}${opts.unit}` : `${displayVal}`;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(valText, barW + 4, barTop + barH / 2);
  }

  if (!animate) {
    draw(opts.value);
    return;
  }

  let start: number | null = null;

  function frame(ts: number): void {
    if (start === null) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    draw(eased * opts.value);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
