/** @vitest-environment happy-dom */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as modal from '../src/ts/modal';
import { ViewRegistry, type ViewConfig } from '../src/ts/view-registry';
import { NavigationModel } from '../src/ts/navigation-model';
import { PanelOrchestrator } from '../src/ts/panel-orchestrator';

function config(id: string, placement: ViewConfig['defaultPlacement'] = 'page'): ViewConfig {
  return {
    id,
    title: id,
    defaultPlacement: placement,
    factory: (container: HTMLElement) => {
      const el = document.createElement('div');
      el.textContent = id;
      container.appendChild(el);
      return { destroy: vi.fn() };
    },
  };
}

describe('PanelOrchestrator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    ViewRegistry.reset();
    vi.restoreAllMocks();
  });

  it('open/close lifecycle works', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    const nav = new NavigationModel();
    const orchestrator = new PanelOrchestrator(registry, nav);

    const handle = orchestrator.open('alpha');
    expect(orchestrator.isOpen('alpha')).toBe(true);
    expect(handle.container.isConnected).toBe(true);

    orchestrator.close('alpha');
    expect(orchestrator.isOpen('alpha')).toBe(false);
    expect(handle.container.isConnected).toBe(false);
  });

  it('move preserves DOM node reference', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha', 'page'));
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());

    const handleBefore = orchestrator.open('alpha');
    orchestrator.move('alpha', 'side-panel');
    const handleAfter = orchestrator.getOpen().get('alpha')?.handle;

    expect(handleAfter).toBeDefined();
    expect(handleBefore.container).toBe(handleAfter!.container);
    expect(handleAfter!.placement).toBe('side-panel');
  });

  it('stack pushes current view onto active slot and navigation', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    registry.register(config('beta'));
    const nav = new NavigationModel();
    const orchestrator = new PanelOrchestrator(registry, nav);

    orchestrator.open('alpha');
    orchestrator.open('beta');
    orchestrator.stack('alpha');

    expect(nav.current()?.viewId).toBe('alpha');
    expect(nav.history().map((e) => e.viewId)).toEqual(['alpha', 'beta', 'alpha']);
  });

  it('swap exchanges placements for two views', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha', 'page'));
    registry.register(config('beta', 'side-panel'));
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());

    orchestrator.open('alpha');
    orchestrator.open('beta');
    orchestrator.swap('alpha', 'beta');

    const open = orchestrator.getOpen();
    expect(open.get('alpha')?.placement).toBe('side-panel');
    expect(open.get('beta')?.placement).toBe('page');
  });

  it('delegates modal placement to openModal', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('modal-view', 'modal'));
    const openSpy = vi.spyOn(modal, 'openModal');
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());

    orchestrator.open('modal-view');

    expect(openSpy).toHaveBeenCalledOnce();
    expect(document.querySelector('#mn-panel-modal-modal-view .mn-modal')).not.toBeNull();
  });

  it('emits panel lifecycle events', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());
    const opened = vi.fn();
    const closed = vi.fn();
    const moved = vi.fn();

    document.addEventListener('mn:panel-opened', opened as EventListener);
    document.addEventListener('mn:panel-closed', closed as EventListener);
    document.addEventListener('mn:panel-moved', moved as EventListener);

    orchestrator.open('alpha');
    orchestrator.move('alpha', 'bottom-dock');
    orchestrator.close('alpha');

    expect(opened).toHaveBeenCalledOnce();
    expect(moved).toHaveBeenCalledOnce();
    expect(closed).toHaveBeenCalledOnce();
  });

  it('getOpen and isOpen reflect runtime state', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());

    expect(orchestrator.isOpen('alpha')).toBe(false);
    orchestrator.open('alpha');

    const open = orchestrator.getOpen();
    expect(open.size).toBe(1);
    expect(open.get('alpha')?.placement).toBe('page');
    expect(orchestrator.isOpen('alpha')).toBe(true);
  });

  it('close purges closed view from navigation history even when not current', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    registry.register(config('beta'));
    const nav = new NavigationModel();
    const orchestrator = new PanelOrchestrator(registry, nav);

    orchestrator.open('alpha');
    orchestrator.open('beta');
    orchestrator.close('alpha');

    expect(nav.history().every((e) => e.viewId !== 'alpha')).toBe(true);
    expect(nav.current()?.viewId).toBe('beta');
  });

  it('closeAll clears every open view', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(config('alpha'));
    registry.register(config('beta', 'bottom-dock'));
    const orchestrator = new PanelOrchestrator(registry, new NavigationModel());

    orchestrator.open('alpha');
    orchestrator.open('beta');
    orchestrator.closeAll();

    expect(orchestrator.getOpen().size).toBe(0);
    expect(orchestrator.isOpen('alpha')).toBe(false);
    expect(orchestrator.isOpen('beta')).toBe(false);
  });
});
