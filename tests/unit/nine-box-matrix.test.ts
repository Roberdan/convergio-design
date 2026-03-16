/**
 * Unit tests for GE-McKinsey 9-box strategic matrix.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nineBoxMatrix, type NineBoxItem } from '../../src/ts/nine-box-matrix';

const SAMPLE_ITEMS: NineBoxItem[] = [
  { id: 'cloud-services', label: 'Cloud Services', x: 3, y: 3, subtitle: '$4.2M revenue' },
  { id: 'data-analytics', label: 'Data Analytics', x: 2, y: 3, subtitle: '$1.8M revenue' },
  { id: 'legacy-support', label: 'Legacy Support', x: 1, y: 1, subtitle: '$0.3M revenue' },
  { id: 'mobile-platform', label: 'Mobile Platform', x: 2, y: 2, subtitle: '$1.1M revenue' },
];

describe('nineBoxMatrix', () => {
  let container: HTMLDivElement;

  beforeEach(() => { container = document.createElement('div'); });

  it('renders a 9-cell grid', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    const cells = container.querySelectorAll('.mn-nine-box__cell');
    expect(cells.length).toBe(9);
    ctrl.destroy();
  });

  it('renders items inside correct cells', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    const investCell = container.querySelector('[data-x="3"][data-y="3"]');
    expect(investCell?.textContent).toContain('Cloud Services');
    ctrl.destroy();
  });

  it('sets role=grid with aria-label on the grid element', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    const grid = container.querySelector('[role="grid"]');
    expect(grid).not.toBeNull();
    expect(grid?.getAttribute('aria-label')).toContain('matrix');
    ctrl.destroy();
  });

  it('cells have data-tier attribute (invest/selective/divest)', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    const topRight = container.querySelector('[data-x="3"][data-y="3"]');
    expect(topRight?.getAttribute('data-tier')).toBe('invest');
    const bottomLeft = container.querySelector('[data-x="1"][data-y="1"]');
    expect(bottomLeft?.getAttribute('data-tier')).toBe('divest');
    ctrl.destroy();
  });

  it('uses custom axis labels when provided', () => {
    const ctrl = nineBoxMatrix(container, {
      items: SAMPLE_ITEMS,
      xLabel: 'Competitive Advantage',
      yLabel: 'Market Growth',
      xAxisLabels: ['Weak', 'Moderate', 'Strong'],
      yAxisLabels: ['Declining', 'Stable', 'Growing'],
    });
    expect(container.textContent).toContain('Competitive Advantage');
    expect(container.textContent).toContain('Market Growth');
    expect(container.textContent).toContain('Strong');
    ctrl.destroy();
  });

  it('update replaces all items and re-renders', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    ctrl.update([
      { id: 'ai-ops', label: 'AI Operations', x: 3, y: 2 },
    ]);
    expect(container.textContent).toContain('AI Operations');
    expect(container.textContent).not.toContain('Cloud Services');
    ctrl.destroy();
  });

  it('moveItem changes item position and triggers onMove', () => {
    const onMove = vi.fn();
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS, onMove });
    ctrl.moveItem('legacy-support', 2, 2);
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'legacy-support', x: 2, y: 2 }),
      2, 2,
    );
    ctrl.destroy();
  });

  it('getItems returns a deep copy of items', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    const items = ctrl.getItems();
    expect(items.length).toBe(SAMPLE_ITEMS.length);
    items[0].label = 'Mutated';
    expect(ctrl.getItems()[0].label).toBe('Cloud Services');
    ctrl.destroy();
  });

  it('fires onSelect when an item element is clicked', () => {
    const onSelect = vi.fn();
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS, onSelect });
    const itemEl = container.querySelector('[data-id="cloud-services"]') as HTMLElement;
    itemEl?.click();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'cloud-services' }),
    );
    ctrl.destroy();
  });

  it('destroy clears container', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    ctrl.destroy();
    expect(container.innerHTML).toBe('');
  });

  it('renders subtitle when provided', () => {
    const ctrl = nineBoxMatrix(container, { items: SAMPLE_ITEMS });
    expect(container.textContent).toContain('$4.2M revenue');
    ctrl.destroy();
  });
});
