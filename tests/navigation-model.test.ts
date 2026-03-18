/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';
import { NavigationModel, type NavigateAction, type ViewEntry } from '../src/ts/navigation-model';

describe('NavigationModel', () => {
  it('supports push/pop/replace lifecycle', () => {
    const model = new NavigationModel();
    const first = model.push('home');
    const second = model.push('details', { id: 7 });
    const replaced = model.replace('edit', { id: 7 });
    const afterPop = model.pop();

    expect(first.viewId).toBe('home');
    expect(second.params).toEqual({ id: 7 });
    expect(replaced.viewId).toBe('edit');
    expect(afterPop?.viewId).toBe('home');
    expect(model.current()?.viewId).toBe('home');
  });

  it('canGoBack is false when empty and true after push', () => {
    const model = new NavigationModel();
    expect(model.canGoBack()).toBe(false);
    model.push('home');
    expect(model.canGoBack()).toBe(false);
    model.push('details');
    expect(model.canGoBack()).toBe(true);
  });

  it('current returns the last pushed entry', () => {
    const model = new NavigationModel();
    model.push('home');
    model.push('reports');
    expect(model.current()?.viewId).toBe('reports');
  });

  it('onNavigate fires for push/pop/replace with action', () => {
    const model = new NavigationModel();
    const events: Array<{ entry: ViewEntry; action: NavigateAction }> = [];
    model.push('home');
    model.onNavigate((entry, action) => events.push({ entry, action }));

    model.push('details');
    model.replace('settings');
    model.pop();

    expect(events.map((e) => e.action)).toEqual(['push', 'replace', 'pop']);
    expect(events[0].entry.viewId).toBe('details');
    expect(events[1].entry.viewId).toBe('settings');
    expect(events[2].entry.viewId).toBe('home');
  });

  it('clear resets the stack', () => {
    const model = new NavigationModel();
    model.push('home');
    model.push('details');
    model.clear();
    expect(model.current()).toBeUndefined();
    expect(model.history()).toHaveLength(0);
    expect(model.canGoBack()).toBe(false);
  });

  it('history returns a readonly copy', () => {
    const model = new NavigationModel();
    model.push('home');
    const snapshot = model.history() as ViewEntry[];
    snapshot.push({ viewId: 'tamper', timestamp: Date.now() });
    expect(model.history()).toHaveLength(1);
    expect(model.current()?.viewId).toBe('home');
  });

  it('remove purges a specific viewId from the stack', () => {
    const model = new NavigationModel();
    model.push('home');
    model.push('details');
    model.push('settings');
    model.push('details');
    model.remove('details');
    expect(model.history().map((e) => e.viewId)).toEqual(['home', 'settings']);
  });

  it('destroy clears state and listeners', () => {
    const model = new NavigationModel();
    const cb = vi.fn();
    model.onNavigate(cb);
    model.push('home');
    expect(cb).toHaveBeenCalledOnce();

    model.destroy();
    model.push('details');
    expect(model.history()).toHaveLength(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
