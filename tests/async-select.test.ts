/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AsyncSelect } from '../src/ts/async-select';

function fireInput(input: HTMLInputElement, value: string): void {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function fireKey(input: HTMLInputElement, key: string): void {
  input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

describe('AsyncSelect', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('search fires after debounce delay', async () => {
    const search = vi.fn().mockResolvedValue([]);
    const ctrl = new AsyncSelect(container, { provider: { search }, debounceMs: 300 });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'al');
    vi.advanceTimersByTime(299);
    expect(search).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    await Promise.resolve();
    expect(search).toHaveBeenCalledTimes(1);
    ctrl.destroy();
  });

  it('keyboard nav cycles through items', async () => {
    const ctrl = new AsyncSelect(container, {
      provider: { search: vi.fn().mockResolvedValue(['A', 'B', 'C']) },
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'a');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    fireKey(input, 'ArrowDown');
    fireKey(input, 'ArrowDown');
    fireKey(input, 'ArrowDown');
    fireKey(input, 'ArrowDown');
    let active = container.querySelector('.mn-async-select__item--active');
    expect(active?.textContent).toContain('A');
    fireKey(input, 'ArrowUp');
    active = container.querySelector('.mn-async-select__item--active');
    expect(active?.textContent).toContain('C');
    ctrl.destroy();
  });

  it('Enter selects highlighted item', async () => {
    const onSelect = vi.fn();
    const ctrl = new AsyncSelect(container, {
      provider: { search: vi.fn().mockResolvedValue(['Alpha', 'Beta']) },
      onSelect,
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'a');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    fireKey(input, 'ArrowDown');
    fireKey(input, 'Enter');
    expect(onSelect).toHaveBeenCalledWith('Alpha');
    expect(input.value).toBe('Alpha');
    expect(ctrl.getValue()).toBe('Alpha');
    ctrl.destroy();
  });

  it('Escape closes dropdown', async () => {
    const ctrl = new AsyncSelect(container, {
      provider: { search: vi.fn().mockResolvedValue(['One']) },
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'o');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    fireKey(input, 'Escape');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    const dropdown = container.querySelector('.mn-async-select__dropdown') as HTMLDivElement;
    expect(dropdown.hidden).toBe(true);
    ctrl.destroy();
  });

  it('sets ARIA attributes for combobox and active option', async () => {
    const ctrl = new AsyncSelect(container, {
      provider: { search: vi.fn().mockResolvedValue(['One', 'Two']) },
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    const dropdown = container.querySelector('.mn-async-select__dropdown') as HTMLDivElement;
    expect(input.getAttribute('role')).toBe('combobox');
    expect(dropdown.getAttribute('role')).toBe('listbox');
    fireInput(input, 'o');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    fireKey(input, 'ArrowDown');
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.getAttribute('aria-controls')).toBe(dropdown.id);
    expect(input.getAttribute('aria-activedescendant')).toBeTruthy();
    ctrl.destroy();
  });

  it('shows loading state during async fetch', async () => {
    let resolveSearch: ((items: string[]) => void) | undefined;
    const search = vi.fn().mockImplementation(() => new Promise<string[]>((resolve) => { resolveSearch = resolve; }));
    const ctrl = new AsyncSelect(container, { provider: { search } });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'de');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    const loading = container.querySelector('.mn-async-select__loading');
    expect(loading).not.toBeNull();
    resolveSearch?.(['Delta']);
    await Promise.resolve();
    ctrl.destroy();
  });

  it('clear() resets value', async () => {
    const ctrl = new AsyncSelect(container, {
      provider: { search: vi.fn().mockResolvedValue(['One']) },
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'o');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    fireKey(input, 'ArrowDown');
    fireKey(input, 'Enter');
    expect(ctrl.getValue()).toBe('One');
    ctrl.clear();
    expect(ctrl.getValue()).toBeUndefined();
    expect(input.value).toBe('');
    ctrl.destroy();
  });

  it('respects minChars threshold', async () => {
    const search = vi.fn().mockResolvedValue([]);
    const ctrl = new AsyncSelect(container, {
      provider: { search },
      minChars: 3,
    });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'ab');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    expect(search).not.toHaveBeenCalled();
    fireInput(input, 'abc');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    expect(search).toHaveBeenCalledTimes(1);
    ctrl.destroy();
  });

  it('calls provider.search with correct query', async () => {
    const search = vi.fn().mockResolvedValue([]);
    const ctrl = new AsyncSelect(container, { provider: { search } });
    const input = container.querySelector('.mn-async-select__input') as HTMLInputElement;
    fireInput(input, 'Ferrari');
    vi.advanceTimersByTime(300);
    await Promise.resolve();
    expect(search).toHaveBeenCalledWith('Ferrari');
    ctrl.destroy();
  });
});
