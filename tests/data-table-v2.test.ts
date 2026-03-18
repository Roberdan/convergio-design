/** @vitest-environment happy-dom */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { dataTable } from '../src/ts/data-table';

describe('dataTable v2', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="host"></div>';
  });

  function createTable(extra: Record<string, unknown>): HTMLElement {
    const host = document.querySelector('#host') as HTMLElement;
    dataTable(host, {
      columns: [{ key: 'value', label: 'Value', type: 'text' }],
      data: [{ value: 'x' }],
      ...extra,
    });
    return host;
  }

  it('metric cell renders value and trend arrow', () => {
    const host = createTable({
      columns: [{ key: 'm', type: 'metric' }],
      data: [{ m: { value: 42, trend: 'up', delta: '+4%' } }],
    });
    expect(host.querySelector('.mn-dt__cell-metric')?.textContent).toContain('42');
    expect(host.querySelector('.mn-dt__cell-trend--up')?.textContent).toContain('▲');
  });

  it('person cell renders avatar and name', () => {
    const host = createTable({
      columns: [{ key: 'p', type: 'person' }],
      data: [{ p: { name: 'Ada Lovelace', email: 'ada@mn.dev' } }],
    });
    expect(host.querySelector('.mn-dt__avatar')).not.toBeNull();
    expect(host.querySelector('.mn-dt__cell-person')?.textContent).toContain('Ada Lovelace');
  });

  it('progress cell renders bar', () => {
    const host = createTable({
      columns: [{ key: 'p', type: 'progress' }],
      data: [{ p: { value: 50, max: 100, label: '50%' } }],
    });
    expect(host.querySelector('.mn-dt__progress-fill')).not.toBeNull();
  });

  it('action cell renders buttons', () => {
    const host = createTable({
      columns: [{ key: 'a', type: 'action' }],
      data: [{ a: { actions: [{ label: 'Open', onClick: 'open-row' }] } }],
    });
    expect(host.querySelectorAll('.mn-dt__action-btn').length).toBe(1);
  });

  it('link cell renders anchor with href', () => {
    const host = createTable({
      columns: [{ key: 'l', type: 'link' }],
      data: [{ l: { text: 'Details', href: 'https://example.com', external: true } }],
    });
    const a = host.querySelector('.mn-dt__cell-link') as HTMLAnchorElement;
    expect(a.getAttribute('href')).toBe('https://example.com');
    expect(a.getAttribute('target')).toBe('_blank');
  });

  it('icon cell renders icon', () => {
    const host = createTable({
      columns: [{ key: 'i', type: 'icon' }],
      data: [{ i: { icon: 'search' } }],
    });
    expect(host.querySelector('.mn-dt__cell-icon svg')).not.toBeNull();
  });

  it('row grouping collapses and expands', () => {
    const host = document.querySelector('#host') as HTMLElement;
    dataTable(host, {
      columns: [{ key: 'name', type: 'text' }, { key: 'group', type: 'text' }],
      groupBy: 'group',
      data: [{ name: 'A', group: 'Ops' }, { name: 'B', group: 'Ops' }],
    });
    const header = host.querySelector('.mn-dt__group-row') as HTMLTableRowElement;
    expect(host.querySelectorAll('.mn-dt__row').length).toBe(2);
    header.click();
    expect(host.querySelectorAll('.mn-dt__row').length).toBe(0);
    const reopened = host.querySelector('.mn-dt__group-row') as HTMLTableRowElement;
    reopened.click();
    expect(host.querySelectorAll('.mn-dt__row').length).toBe(2);
  });

  it('drill-down emits event on Enter key', () => {
    const host = document.querySelector('#host') as HTMLElement;
    const onDrillDown = vi.fn();
    const drillEvt = vi.fn();
    host.addEventListener('mn:table-drilldown', drillEvt as EventListener);
    dataTable(host, {
      columns: [{ key: 'name', type: 'text' }],
      data: [{ name: 'Alpha' }],
      onDrillDown,
    });
    const row = host.querySelector('.mn-dt__row') as HTMLTableRowElement;
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onDrillDown).toHaveBeenCalledTimes(1);
    expect(drillEvt).toHaveBeenCalledTimes(1);
  });

  it('existing column types still render (smoke)', () => {
    const host = document.querySelector('#host') as HTMLElement;
    dataTable(host, {
      columns: [
        { key: 't', type: 'text' },
        { key: 'n', type: 'number' },
        { key: 'd', type: 'date' },
        { key: 's', type: 'status' },
        { key: 'b', type: 'badge' },
        { key: 'c', type: 'custom', render: (v) => '<strong>' + String(v) + '</strong>' },
      ],
      data: [{ t: 'txt', n: 7, d: '2026-01-01', s: 'active', b: 9, c: 'ok' }],
    });
    expect(host.querySelector('.mn-dt__cell-text')?.textContent).toContain('txt');
    expect(host.querySelector('.mn-dt__cell-number')?.textContent).toContain('7');
    expect(host.querySelector('.mn-status')).not.toBeNull();
    expect(host.querySelector('.mn-dt__badge')).not.toBeNull();
  });
});
