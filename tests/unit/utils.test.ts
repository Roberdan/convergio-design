/**
 * Unit tests for core utility functions.
 * DOM-dependent functions (cssVar, getTheme, setTheme, hiDpiCanvas) use happy-dom.
 * Pure functions (formatNumber, formatDate, clamp, lerp, debounce, throttle) run in node.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  clamp,
  lerp,
  formatNumber,
  formatDate,
  getTheme,
  setTheme,
  cycleTheme,
  cssVar,
  hiDpiCanvas,
  debounce,
  throttle,
} from '../../src/ts/core/utils';

// --- Pure math functions ---

describe('clamp', () => {
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps to min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps to max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('handles equal min and max', () => {
    expect(clamp(7, 5, 5)).toBe(5);
  });
});

describe('lerp', () => {
  it('returns a at t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });

  it('returns b at t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });

  it('returns midpoint at t=0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('works with negative values', () => {
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });
});

// --- String formatting ---

describe('formatNumber', () => {
  it('formats integer with default locale en-US', () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  it('formats with decimals', () => {
    expect(formatNumber(3.14159, { decimals: 2 })).toBe('3.14');
  });

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('accepts locale option', () => {
    // de-DE uses . as thousands separator
    const result = formatNumber(1000, { locale: 'de-DE' });
    expect(result).toContain('1');
    expect(result).toContain('000');
  });
});

describe('formatDate', () => {
  it('formats a valid ISO date string', () => {
    const result = formatDate('2025-01-15');
    expect(result).toContain('2025');
    expect(result).toContain('15');
  });

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('returns original string for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });

  it('supports short format option', () => {
    const result = formatDate('2025-06-01', { format: 'short' });
    expect(result).toContain('2025');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

// --- DOM-dependent utils (happy-dom) ---

describe('getTheme / setTheme', () => {
  beforeEach(() => {
    // reset to default (editorial) by clearing all theme classes
    document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
  });

  it('returns editorial when no theme class is set', () => {
    expect(getTheme()).toBe('editorial');
  });

  it('setTheme(nero) adds mn-nero class', () => {
    setTheme('nero');
    expect(document.body.classList.contains('mn-nero')).toBe(true);
    expect(getTheme()).toBe('nero');
  });

  it('setTheme(avorio) adds mn-avorio class', () => {
    setTheme('avorio');
    expect(document.body.classList.contains('mn-avorio')).toBe(true);
    expect(getTheme()).toBe('avorio');
  });

  it('setTheme(colorblind) adds mn-colorblind class', () => {
    setTheme('colorblind');
    expect(document.body.classList.contains('mn-colorblind')).toBe(true);
    expect(getTheme()).toBe('colorblind');
  });

  it('setTheme removes previous theme class', () => {
    setTheme('nero');
    setTheme('avorio');
    expect(document.body.classList.contains('mn-nero')).toBe(false);
    expect(document.body.classList.contains('mn-avorio')).toBe(true);
  });

  it('setTheme(editorial) removes all theme classes', () => {
    setTheme('nero');
    setTheme('editorial');
    expect(document.body.classList.contains('mn-nero')).toBe(false);
    expect(getTheme()).toBe('editorial');
  });
});

describe('cycleTheme', () => {
  beforeEach(() => {
    document.body.classList.remove('mn-nero', 'mn-avorio', 'mn-colorblind');
  });

  it('cycles from editorial to nero', () => {
    const next = cycleTheme();
    expect(next).toBe('nero');
    expect(getTheme()).toBe('nero');
  });

  it('cycles through all 4 themes and wraps', () => {
    // editorial → nero → avorio → colorblind → editorial
    expect(cycleTheme()).toBe('nero');
    expect(cycleTheme()).toBe('avorio');
    expect(cycleTheme()).toBe('colorblind');
    expect(cycleTheme()).toBe('editorial');
  });
});

describe('cssVar', () => {
  it('returns fallback when variable is not defined', () => {
    const result = cssVar('--nonexistent-var', 'fallback-value');
    expect(result).toBe('fallback-value');
  });

  it('returns empty string fallback by default', () => {
    const result = cssVar('--nonexistent-var');
    expect(result).toBe('');
  });
});

describe('hiDpiCanvas', () => {
  it('sets canvas dimensions and returns dpr', () => {
    const canvas = document.createElement('canvas');
    const dpr = hiDpiCanvas(canvas, 200, 100);
    expect(typeof dpr).toBe('number');
    expect(dpr).toBeGreaterThan(0);
    expect(canvas.style.width).toBe('200px');
    expect(canvas.style.height).toBe('100px');
  });

  it('canvas logical dimensions match requested size', () => {
    const canvas = document.createElement('canvas');
    const dpr = hiDpiCanvas(canvas, 400, 300);
    expect(canvas.width).toBe(400 * dpr);
    expect(canvas.height).toBe(300 * dpr);
  });
});

// --- Async helpers ---

describe('debounce', () => {
  it('delays function execution', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});

describe('throttle', () => {
  it('calls function immediately on first invocation', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('suppresses subsequent calls within the throttle window', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });
});
