/**
 * Unit tests for Confidence Interval Chart canvas component.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

function mockCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  Object.defineProperty(canvas, 'offsetWidth', { value: 600, configurable: true });
  const ctx = {
    scale: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 40 })),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    set fillStyle(_v: string) { /* noop */ },
    set strokeStyle(_v: string) { /* noop */ },
    set lineWidth(_v: number) { /* noop */ },
    set font(_v: string) { /* noop */ },
    set textAlign(_v: string) { /* noop */ },
    set textBaseline(_v: string) { /* noop */ },
    set lineJoin(_v: string) { /* noop */ },
  };
  vi.spyOn(canvas, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
  document.body.appendChild(canvas);
  return canvas;
}

const FORECAST_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [120, 135, 128, 142, 155, 168],
  lower:  [105, 118, 110, 125, 138, 150],
  upper:  [135, 152, 146, 159, 172, 186],
};

describe('confidenceChart', () => {
  let canvas: HTMLCanvasElement;

  beforeEach(() => { canvas = mockCanvas(); });

  it('calls getContext with 2d', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false });
    expect(canvas.getContext).toHaveBeenCalledWith('2d');
  });

  it('sets role=img on canvas', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false });
    expect(canvas.getAttribute('role')).toBe('img');
  });

  it('sets an aria-label with trend direction', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false });
    const label = canvas.getAttribute('aria-label') ?? '';
    expect(label).toContain('Confidence chart');
    expect(label).toContain('upward');
  });

  it('detects downward trend when last value < first', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, {
      labels: ['Q1', 'Q2', 'Q3'],
      values: [200, 180, 150],
      lower: [190, 170, 140],
      upper: [210, 190, 160],
      animate: false,
    });
    expect(canvas.getAttribute('aria-label')).toContain('downward');
  });

  it('creates sr-only table with data points', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false });
    const srEl = canvas.nextElementSibling;
    expect(srEl?.classList.contains('mn-sr-only')).toBe(true);
    expect(srEl?.textContent).toContain('Jan');
    expect(srEl?.textContent).toContain('Jun');
    expect(srEl?.textContent).toContain('Label');
    expect(srEl?.textContent).toContain('Upper');
  });

  it('includes unit suffix in sr-only table when provided', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false, unit: 'k' });
    const srEl = canvas.nextElementSibling;
    expect(srEl?.textContent).toContain('120k');
    expect(srEl?.textContent).toContain('186k');
  });

  it('does nothing with empty labels array', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, {
      labels: [], values: [], lower: [], upper: [], animate: false,
    });
    expect(canvas.getAttribute('role')).toBeNull();
  });

  it('respects custom height option', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false, height: 350 });
    expect(canvas.style.height).toBe('350px');
  });

  it('aria-label includes data range', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    confidenceChart(canvas, { ...FORECAST_DATA, animate: false });
    const label = canvas.getAttribute('aria-label') ?? '';
    expect(label).toContain('105');
    expect(label).toContain('186');
  });

  it('accepts custom color option without error', async () => {
    const { confidenceChart } = await import('../../src/ts/charts-confidence');
    expect(() => {
      confidenceChart(canvas, { ...FORECAST_DATA, animate: false, color: '#3B82F6' });
    }).not.toThrow();
  });
});
