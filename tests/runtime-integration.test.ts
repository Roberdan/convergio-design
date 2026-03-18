/**
 * @vitest-environment happy-dom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { AppShellController } from '../src/ts/app-shell';
import { NavigationModel } from '../src/ts/navigation-model';
import { PanelOrchestrator } from '../src/ts/panel-orchestrator';
import { ViewRegistry, type ViewConfig } from '../src/ts/view-registry';

function makeView(id: string): ViewConfig {
  return {
    id,
    title: id,
    defaultPlacement: 'page',
    factory: (container: HTMLElement) => {
      const view = document.createElement('section');
      view.dataset.view = id;
      view.textContent = `runtime-${id}`;
      container.appendChild(view);
    },
  };
}

describe('runtime integration wiring', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    ViewRegistry.reset();
  });

  it('runs the full runtime workflow via API-driven wiring', () => {
    const registry = ViewRegistry.getInstance();
    registry.register(makeView('view1'));
    registry.register(makeView('view2'));

    const navigation = new NavigationModel();
    const shellContainer = document.createElement('div');
    document.body.appendChild(shellContainer);
    const shell = new AppShellController(shellContainer, { layout: 'split' });
    expect(shell.getLayout()).toBe('split');

    const orchestrator = new PanelOrchestrator(registry, navigation);

    const view1 = orchestrator.open('view1', 'page');
    expect(view1.container.textContent).toContain('runtime-view1');
    const originalNode = view1.container;

    orchestrator.move('view1', 'side-panel');
    const movedView1 = orchestrator.getOpen().get('view1')?.handle;
    expect(movedView1).toBeDefined();
    expect(movedView1?.container).toBe(originalNode);
    expect(movedView1?.placement).toBe('side-panel');

    orchestrator.open('view2', 'page');
    expect(navigation.history().map((entry) => entry.viewId)).toEqual(['view1', 'view2']);
    expect(navigation.canGoBack()).toBe(true);

    orchestrator.close('view1');
    expect(orchestrator.isOpen('view1')).toBe(false);

    orchestrator.destroy();
    shell.destroy();
    navigation.destroy();
  });
});
