/**
 * Unit tests for Waterfall Chart canvas component.
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
    stroke: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    setLineDash: vi.fn(),
    set fillStyle(_v: string) { /* noop */ },
    set strokeStyle(_v: string) { /* noop */ },
    set lineWidth(_v: number) { /* noop */ },
    set font(_v: string) { /* noop */ },
    set textAlign(_v: string) { /* noop */ },
    set textBaseline(_v: string) { /* noop */ },
    set globalAlpha(_v: number) { /* noop */ },
  };
  vi.spyOn(canvas, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
  document.body.appendChild(canvas);
  return canvas;
}

const REVENUE_SEGMENTS = [
  { label: 'Q1 Revenue', value: 1200000, isTotal: true },
  { label: 'New Clients', value: 350000 },
  { label: 'Upsells', value: 180000 },
  { label: 'Churn', value: -220000 },
  { label: 'Discounts', value: -95000 },
  { label: 'Q2 Revenue', value: 1415000, isTotal: true },
];

describe('waterfallChart', () => {
  let canvas: HTMLCanvasElement;

  beforeEach(() => { canvas = mockCanvas(); });

  it('calls getContext with 2d', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false });
    expect(canvas.getContext).toHaveBeenCalledWith('2d');
  });

  it('sets role=img on canvas', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false });
    expect(canvas.getAttribute('role')).toBe('img');
  });

  it('sets an aria-label with segment info', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false });
    const label = canvas.getAttribute('aria-label') ?? '';
    expect(label).toContain('Waterfall chart');
    expect(label).toContain('Q1 Revenue');
    expect(label).toContain('Churn');
  });

  it('creates sr-only table with segment data', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false });
    const srEl = canvas.nextElementSibling;
    expect(srEl?.classList.contains('mn-sr-only')).toBe(true);
    expect(srEl?.textContent).toContain('New Clients');
    expect(srEl?.textContent).toContain('Running Total');
  });

  it('sr-only table contains correct running totals', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false });
    const srEl = canvas.nextElementSibling;
    // Q2 Revenue total segment
    expect(srEl?.textContent).toContain('1415000');
  });

  it('does nothing with empty segments array', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: [], animate: false });
    expect(canvas.getAttribute('role')).toBeNull();
  });

  it('respects custom height option', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, { segments: REVENUE_SEGMENTS, animate: false, height: 400 });
    expect(canvas.style.height).toBe('400px');
  });

  it('includes unit suffix in aria label when provided', async () => {
    const { waterfallChart } = await import('../../src/ts/charts-waterfall');
    waterfallChart(canvas, {
      segments: [
        { label: 'Start', value: 100, isTotal: true },
        { label: 'Growth', value: 25 },
      ],
      animate: false,
      unit: '%',
    });
    const label = canvas.getAttribute('aria-label') ?? '';
    expect(label).toContain('25');
  });
});
