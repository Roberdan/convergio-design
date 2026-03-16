/**
 * Unit tests for SWOT Matrix component.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { swotMatrix, type SwotItem } from '../../src/ts/swot-matrix';

const SAMPLE_ITEMS: SwotItem[] = [
  { id: 's1', text: 'Strong brand recognition', quadrant: 'strengths' },
  { id: 'w1', text: 'Limited R&D budget', quadrant: 'weaknesses' },
  { id: 'o1', text: 'Emerging Asian markets', quadrant: 'opportunities' },
  { id: 't1', text: 'New regulatory compliance', quadrant: 'threats' },
];

describe('swotMatrix', () => {
  let container: HTMLDivElement;

  beforeEach(() => { container = document.createElement('div'); });

  it('renders all 4 quadrants', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    const quads = container.querySelectorAll('.mn-swot__quadrant');
    expect(quads.length).toBe(4);
    ctrl.destroy();
  });

  it('sets role=region with aria-label on container', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    expect(container.getAttribute('role')).toBe('region');
    expect(container.getAttribute('aria-label')).toBe('SWOT Analysis');
    ctrl.destroy();
  });

  it('adds the mn-swot class to container', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    expect(container.classList.contains('mn-swot')).toBe(true);
    ctrl.destroy();
  });

  it('renders initial items in correct quadrants', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    const strengthsList = container.querySelector('.mn-swot__quadrant--strengths .mn-swot__list');
    expect(strengthsList?.textContent).toContain('Strong brand recognition');
    const threatsList = container.querySelector('.mn-swot__quadrant--threats .mn-swot__list');
    expect(threatsList?.textContent).toContain('New regulatory compliance');
    ctrl.destroy();
  });

  it('renders with default labels when none provided', () => {
    const ctrl = swotMatrix(container);
    expect(container.textContent).toContain('Strengths');
    expect(container.textContent).toContain('Weaknesses');
    expect(container.textContent).toContain('Opportunities');
    expect(container.textContent).toContain('Threats');
    ctrl.destroy();
  });

  it('accepts custom quadrant labels', () => {
    const ctrl = swotMatrix(container, {
      quadrantLabels: { strengths: 'Forze', weaknesses: 'Debolezze' },
    });
    expect(container.textContent).toContain('Forze');
    expect(container.textContent).toContain('Debolezze');
    ctrl.destroy();
  });

  it('addItem inserts a new item into the specified quadrant', () => {
    const ctrl = swotMatrix(container, { items: [] });
    ctrl.addItem('opportunities', 'Digital transformation initiative');
    const oppList = container.querySelector('.mn-swot__quadrant--opportunities .mn-swot__list');
    expect(oppList?.textContent).toContain('Digital transformation initiative');
    ctrl.destroy();
  });

  it('addItem with blank text is a no-op', () => {
    const ctrl = swotMatrix(container, { items: [] });
    ctrl.addItem('strengths', '   ');
    expect(ctrl.getItems().length).toBe(0);
    ctrl.destroy();
  });

  it('removeItem removes item from data', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    ctrl.removeItem('s1');
    expect(ctrl.getItems().find(i => i.id === 's1')).toBeUndefined();
    ctrl.destroy();
  });

  it('getItems returns a copy of the items array', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    const items = ctrl.getItems();
    expect(items.length).toBe(4);
    items.push({ id: 'x', text: 'mutant', quadrant: 'strengths' });
    expect(ctrl.getItems().length).toBe(4);
    ctrl.destroy();
  });

  it('update replaces all items and re-renders', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    ctrl.update([{ id: 'n1', text: 'Vertical integration', quadrant: 'opportunities' }]);
    expect(ctrl.getItems().length).toBe(1);
    expect(container.textContent).toContain('Vertical integration');
    ctrl.destroy();
  });

  it('fires onChange callback on addItem', () => {
    const onChange = vi.fn();
    const ctrl = swotMatrix(container, { items: [], onChange });
    ctrl.addItem('strengths', 'Patent portfolio');
    expect(onChange).toHaveBeenCalled();
    ctrl.destroy();
  });

  it('renders add buttons when editable (default)', () => {
    const ctrl = swotMatrix(container, { items: [] });
    expect(container.querySelectorAll('.mn-swot__add').length).toBe(4);
    ctrl.destroy();
  });

  it('omits add buttons when editable is false', () => {
    const ctrl = swotMatrix(container, { items: [], editable: false });
    expect(container.querySelectorAll('.mn-swot__add').length).toBe(0);
    ctrl.destroy();
  });

  it('destroy clears container and removes attributes', () => {
    const ctrl = swotMatrix(container, { items: SAMPLE_ITEMS });
    ctrl.destroy();
    expect(container.innerHTML).toBe('');
    expect(container.classList.contains('mn-swot')).toBe(false);
    expect(container.getAttribute('role')).toBeNull();
  });
});
