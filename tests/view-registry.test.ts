/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { eventBus } from '../src/ts/core/events';
import { type ViewConfig, ViewRegistry } from '../src/ts/view-registry';

function makeConfig(id: string, title = 'View'): ViewConfig {
  return { id, title, defaultPlacement: 'page', tag: 'mn-data-table' };
}

describe('ViewRegistry', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    ViewRegistry.reset();
  });

  it('register + get round-trip works', () => {
    const registry = ViewRegistry.getInstance();
    const config = makeConfig('sales-kpi', 'Sales KPI');
    registry.register(config);
    expect(registry.get('sales-kpi')).toEqual(config);
  });

  it('register throws on duplicate id', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(makeConfig('dup'));
    expect(() => registry.register(makeConfig('dup'))).toThrow(/already registered/i);
  });

  it('list returns all registered configs', () => {
    const registry = ViewRegistry.getInstance();
    const a = makeConfig('a');
    const b = makeConfig('b');
    registry.register(a);
    registry.register(b);
    expect(registry.list()).toEqual([a, b]);
  });

  it('unregister removes config and returns true', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(makeConfig('drop'));
    expect(registry.unregister('drop')).toBe(true);
    expect(registry.get('drop')).toBeUndefined();
  });

  it('unregister returns false for non-existent id', () => {
    const registry = ViewRegistry.getInstance();
    expect(registry.unregister('missing')).toBe(false);
  });

  it('has reports membership correctly', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(makeConfig('exists'));
    expect(registry.has('exists')).toBe(true);
    expect(registry.has('other')).toBe(false);
  });

  it('clear empties registry', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(makeConfig('v1'));
    registry.register(makeConfig('v2'));
    registry.clear();
    expect(registry.list()).toEqual([]);
  });

  it('emits registration event on register', () => {
    const registry = ViewRegistry.getInstance();
    const config = makeConfig('emit-register');
    const emitSpy = vi.spyOn(eventBus, 'emit');
    registry.register(config);
    expect(emitSpy).toHaveBeenCalledWith('view-registered', { viewId: 'emit-register', config });
  });

  it('emits unregistration event on unregister', () => {
    const registry = ViewRegistry.getInstance();
    const emitSpy = vi.spyOn(eventBus, 'emit');
    registry.register(makeConfig('emit-unregister'));
    emitSpy.mockClear();
    registry.unregister('emit-unregister');
    expect(emitSpy).toHaveBeenCalledWith('view-unregistered', { viewId: 'emit-unregister' });
  });

  it('getInstance returns the same singleton instance', () => {
    const one = ViewRegistry.getInstance();
    const two = ViewRegistry.getInstance();
    expect(one).toBe(two);
  });
});
