/**
 * Unit tests for BCG Matrix canvas chart.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

function mockCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  Object.defineProperty(canvas, 'getBoundingClientRect', {
    value: () => ({ width: 400, height: 320, top: 0, left: 0, right: 400, bottom: 320 }),
  });
  const ctx = {
    scale: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 60 })),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    setLineDash: vi.fn(),
    closePath: vi.fn(),
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

const SAMPLE_ITEMS = [
  { id: 'cloud-platform', label: 'Cloud Platform', marketShare: 0.7, growthRate: 15, size: 8 },
  { id: 'legacy-erp', label: 'Legacy ERP', marketShare: 0.6, growthRate: 3, size: 6 },
  { id: 'mobile-app', label: 'Mobile App', marketShare: 0.2, growthRate: 18, size: 4 },
  { id: 'print-media', label: 'Print Media', marketShare: 0.1, growthRate: -2, size: 3 },
];

describe('bcgMatrix', () => {
  let canvas: HTMLCanvasElement;

  beforeEach(() => { canvas = mockCanvas(); });

  it('returns a controller with update and destroy', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    const ctrl = bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    expect(ctrl).toBeDefined();
    expect(typeof ctrl!.update).toBe('function');
    expect(typeof ctrl!.destroy).toBe('function');
  });

  it('calls getContext with 2d', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    expect(canvas.getContext).toHaveBeenCalledWith('2d');
  });

  it('sets role=img on canvas for accessibility', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    expect(canvas.getAttribute('role')).toBe('img');
  });

  it('creates sr-only element with item labels', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    const srEl = canvas.nextElementSibling;
    expect(srEl?.classList.contains('mn-sr-only')).toBe(true);
    expect(srEl?.textContent).toContain('Cloud Platform');
    expect(srEl?.textContent).toContain('Legacy ERP');
  });

  it('sr-only text includes quadrant classification', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    const srEl = canvas.nextElementSibling;
    expect(srEl?.textContent).toContain('Stars');
    expect(srEl?.textContent).toContain('Dogs');
  });

  it('update replaces items and refreshes accessibility data', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    const ctrl = bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    const newItems = [
      { id: 'ai-assistant', label: 'AI Assistant', marketShare: 0.8, growthRate: 25, size: 7 },
    ];
    ctrl!.update(newItems);
    const srEl = canvas.nextElementSibling;
    expect(srEl?.textContent).toContain('AI Assistant');
    expect(srEl?.textContent).not.toContain('Cloud Platform');
  });

  it('destroy removes event listeners and sr-only element', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    const ctrl = bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    ctrl!.destroy();
    const srEl = canvas.nextElementSibling;
    expect(srEl?.classList.contains('mn-sr-only') ?? false).toBe(false);
  });

  it('accepts custom share and growth thresholds', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    const ctrl = bcgMatrix(canvas, {
      items: SAMPLE_ITEMS,
      animate: false,
      shareThreshold: 0.3,
      growthThreshold: 5,
    });
    expect(ctrl).toBeDefined();
    ctrl!.destroy();
  });

  it('dispatching mousemove does not throw', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    expect(() => {
      canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: 200, clientY: 160 }));
    }).not.toThrow();
  });

  it('dispatching mouseleave does not throw', async () => {
    const { bcgMatrix } = await import('../../src/ts/charts-bcg-matrix');
    bcgMatrix(canvas, { items: SAMPLE_ITEMS, animate: false });
    expect(() => {
      canvas.dispatchEvent(new MouseEvent('mouseleave'));
    }).not.toThrow();
  });
});
