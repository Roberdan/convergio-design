/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EntityWorkbench, type EntitySchema } from '../src/ts/entity-workbench';

const schema: EntitySchema = {
  tabs: [
    {
      id: 'main',
      label: 'Main',
      sections: [
        {
          title: 'Profile',
          fields: [
            { key: 'name', label: 'Name', type: 'text', required: true },
            { key: 'team', label: 'Team', type: 'group', fields: [{ key: 'team.code', label: 'Code', type: 'text' }] },
            { key: 'total', label: 'Total', type: 'computed', compute: (data) => Number(data.value ?? 0) * 2 },
            { key: 'owner', label: 'Owner', type: 'async-select', provider: { search: vi.fn().mockResolvedValue(['Alice']) } },
          ],
        },
      ],
    },
    { id: 'meta', label: 'Meta', sections: [{ fields: [{ key: 'value', label: 'Value', type: 'number' }] }] },
  ],
};

describe('EntityWorkbench', () => {
  let container: HTMLDivElement;
  const instances: EntityWorkbench[] = [];
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    instances.splice(0).forEach((wb) => wb.destroy());
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renders tabs, sections and fields from schema', () => {
    instances.push(new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 5, team: { code: 'A' } } }));
    expect(container.querySelectorAll('.mn-entity-workbench__tab').length).toBe(2);
    expect(container.querySelector('.mn-entity-workbench__section-title')?.textContent).toBe('Profile');
    expect(container.textContent).toContain('Name');
    expect(container.textContent).toContain('Team');
  });

  it('tracks dirty state after edit', () => {
    const wb = new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 5, team: { code: 'A' } } });
    instances.push(wb);
    expect(wb.isDirty()).toBe(false);
    const input = container.querySelector('input.mn-form-input') as HTMLInputElement;
    input.value = 'Changed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(wb.isDirty()).toBe(true);
  });

  it('validate reports required field errors', () => {
    const wb = new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 5 } });
    instances.push(wb);
    const input = container.querySelector('input.mn-form-input') as HTMLInputElement;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    const result = wb.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.has('name')).toBe(true);
  });

  it('supports back-stack at 3 levels', () => {
    const wb = new EntityWorkbench(container, { schema, data: { id: 'root', name: 'Root', value: 1 } });
    instances.push(wb);
    wb.pushEntity(schema, { id: 'a', name: 'A', value: 2 });
    wb.pushEntity(schema, { id: 'b', name: 'B', value: 3 });
    expect(wb.getCurrentDepth()).toBe(3);
    expect(wb.canGoBack()).toBe(true);
    expect(wb.popEntity()).toBe(true);
    expect(wb.getCurrentDepth()).toBe(2);
  });

  it('updates breadcrumb on push and pop', () => {
    const wb = new EntityWorkbench(container, { schema, data: { id: 'root', name: 'Root', value: 1 } });
    instances.push(wb);
    expect(container.querySelector('.mn-entity-workbench__breadcrumb')?.textContent).toContain('Root');
    wb.pushEntity(schema, { id: 'child', name: 'Child', value: 2 });
    expect(container.querySelector('.mn-entity-workbench__breadcrumb')?.textContent).toContain('Child');
    wb.popEntity();
    expect(container.querySelector('.mn-entity-workbench__breadcrumb')?.textContent).not.toContain('Child');
  });

  it('save emits modified data only', async () => {
    const onSave = vi.fn().mockResolvedValue(undefined);
    instances.push(new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 5 }, onSave }));
    const input = container.querySelector('input.mn-form-input') as HTMLInputElement;
    input.value = 'Changed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    (container.querySelector('[data-action="save"]') as HTMLButtonElement).click();
    await Promise.resolve();
    expect(onSave).toHaveBeenCalledWith({ name: 'Changed' });
  });

  it('cancel reverts modified data', () => {
    const onClose = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const wb = new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 5 }, onClose });
    instances.push(wb);
    const input = container.querySelector('input.mn-form-input') as HTMLInputElement;
    input.value = 'Changed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    (container.querySelector('[data-action="cancel"]') as HTMLButtonElement).click();
    expect(wb.isDirty()).toBe(false);
  });

  it('supports async-select provider integration', async () => {
    const search = vi.fn().mockResolvedValue(['Alice']);
    const localSchema: EntitySchema = { tabs: [{ id: 't', label: 'T', sections: [{ fields: [{ key: 'owner', label: 'Owner', type: 'async-select', provider: { search } }] }] }] };
    instances.push(new EntityWorkbench(container, { schema: localSchema, data: { owner: '' } }));
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    input.value = 'al';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 320));
    expect(search).toHaveBeenCalledWith('al');
  });

  it('async-select stores getId result, not raw object', async () => {
    const provider = {
      search: vi.fn().mockResolvedValue([{ id: '42', name: 'Alice' }]),
      getId: (item: { id: string }) => item.id,
      getLabel: (item: { name: string }) => item.name,
    };
    const onSave = vi.fn().mockResolvedValue(undefined);
    const localSchema: EntitySchema = { tabs: [{ id: 't', label: 'T', sections: [{ fields: [{ key: 'owner', label: 'Owner', type: 'async-select', provider }] }] }] };
    const wb = new EntityWorkbench(container, { schema: localSchema, data: { owner: '' }, onSave });
    instances.push(wb);
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    input.value = 'al';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 320));
    const item = container.querySelector('.mn-async-select__item') as HTMLElement;
    item?.click();
    (container.querySelector('[data-action="save"]') as HTMLButtonElement).click();
    await Promise.resolve();
    expect(onSave).toHaveBeenCalledWith({ owner: '42' });
  });

  it('renders computed field value', () => {
    instances.push(new EntityWorkbench(container, { schema, data: { name: 'Entity', value: 7 } }));
    expect(container.textContent).toContain('14');
  });
});
