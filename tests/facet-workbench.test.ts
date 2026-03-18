/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FacetWorkbench, type FacetConfig } from '../src/ts/facet-workbench';

function flush(): Promise<void> {
  return Promise.resolve();
}

describe('FacetWorkbench', () => {
  let container: HTMLDivElement;

  const facets: FacetConfig[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'multi-select',
      dataProvider: async () => [
        { id: 'open', label: 'Open' },
        { id: 'closed', label: 'Closed' },
      ],
      exclusionRules: { excludes: ['archived'] },
    },
    {
      id: 'archived',
      label: 'Archived',
      type: 'boolean',
      dataProvider: async () => [],
    },
  ];

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('multi-select toggles options and returns active filters', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const active = wb.getActiveFilters();
    expect(active.get('status')).toEqual(['open']);
    wb.destroy();
  });

  it('clearAll resets all filters', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    wb.clearAll();
    expect(wb.getActiveFilters().size).toBe(0);
    wb.destroy();
  });

  it('clearFacet resets single facet', async () => {
    const wb = new FacetWorkbench(container, {
      facets: [
        ...facets,
        {
          id: 'priority',
          label: 'Priority',
          type: 'multi-select',
          dataProvider: async () => [{ id: 'high', label: 'High' }],
        },
      ],
    });
    await flush();
    const status = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    status.checked = true;
    status.dispatchEvent(new Event('change', { bubbles: true }));
    const priority = container.querySelector('section[data-facet-id="priority"] input[value="high"]') as HTMLInputElement;
    priority.checked = true;
    priority.dispatchEvent(new Event('change', { bubbles: true }));
    wb.clearFacet('status');
    expect(wb.getActiveFilters().get('status')).toBeUndefined();
    expect(wb.getActiveFilters().get('priority')).toEqual(['high']);
    wb.destroy();
  });

  it('renders chip and removes filter from chip button', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const chip = container.querySelector('.mn-facet-chip');
    expect(chip).not.toBeNull();
    const remove = container.querySelector('.mn-facet-chip__remove') as HTMLButtonElement;
    remove.click();
    expect(wb.getActiveFilters().has('status')).toBe(false);
    wb.destroy();
  });

  it('applies exclusion rule and disables excluded facet', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    const archived = container.querySelector('section[data-facet-id="archived"]') as HTMLElement;
    expect(archived.classList.contains('mn-facet--disabled')).toBe(true);
    wb.destroy();
  });

  it('preset save and load performs round-trip', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    wb.savePreset('my-preset');
    wb.clearAll();
    wb.loadPreset('my-preset');
    expect(wb.getActiveFilters().get('status')).toEqual(['open']);
    expect(wb.listPresets().map((p) => p.name)).toContain('my-preset');
    wb.destroy();
  });

  it('fires onFilterChange callback', async () => {
    const onFilterChange = vi.fn();
    const wb = new FacetWorkbench(container, { facets, onFilterChange });
    await flush();
    const input = container.querySelector('section[data-facet-id="status"] input[value="open"]') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onFilterChange).toHaveBeenCalled();
    wb.destroy();
  });

  it('toggles boolean facet', async () => {
    const wb = new FacetWorkbench(container, { facets });
    await flush();
    wb.clearFacet('status');
    const toggle = container.querySelector('section[data-facet-id="archived"] .mn-facet__boolean-input') as HTMLInputElement;
    toggle.checked = true;
    toggle.dispatchEvent(new Event('change', { bubbles: true }));
    expect(wb.getActiveFilters().get('archived')).toEqual(['true']);
    wb.destroy();
  });
});
