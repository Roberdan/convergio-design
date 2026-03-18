/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { AppShellController, type LayoutMode } from '../src/ts/app-shell';

describe('AppShellController', () => {
  let host: HTMLElement;

  beforeEach(() => {
    host = document.createElement('div');
    document.body.append(host);
  });

  it('applies all layout mode classes', () => {
    const modes: LayoutMode[] = ['full', 'split', 'stacked', 'docked-bottom', 'dual-panel', 'side-detail'];
    modes.forEach((layout) => {
      const el = document.createElement('div');
      const ctrl = new AppShellController(el, { layout });
      expect(el.classList.contains(`mn-app-shell--${layout}`)).toBe(true);
      ctrl.destroy();
    });
  });

  it('creates all eight slot containers', () => {
    const ctrl = new AppShellController(host);
    const slots = ['nav', 'toolbar', 'filter-bar', 'main', 'secondary', 'detail', 'bottom', 'overlay'];
    slots.forEach((name) => {
      expect(ctrl.getSlot(name)).toBeInstanceOf(HTMLElement);
    });
  });

  it('setLayout swaps classes', () => {
    const ctrl = new AppShellController(host, { layout: 'full' });
    ctrl.setLayout('split');
    expect(host.classList.contains('mn-app-shell--split')).toBe(true);
    expect(host.classList.contains('mn-app-shell--full')).toBe(false);
  });

  it('toggleSidebar toggles collapsed class', () => {
    const ctrl = new AppShellController(host);
    expect(ctrl.isSidebarCollapsed()).toBe(false);
    ctrl.toggleSidebar();
    expect(ctrl.isSidebarCollapsed()).toBe(true);
    ctrl.toggleSidebar();
    expect(ctrl.isSidebarCollapsed()).toBe(false);
  });

  it('getSlot returns expected slot and null for missing', () => {
    const ctrl = new AppShellController(host);
    expect(ctrl.getSlot('main')?.classList.contains('mn-app-shell__main')).toBe(true);
    expect(ctrl.getSlot('unknown')).toBeNull();
  });

  it('destroy removes shell classes and slots', () => {
    const ctrl = new AppShellController(host, { layout: 'dual-panel', sidebarCollapsed: true });
    ctrl.destroy();
    expect(host.className).toBe('');
    expect(host.children.length).toBe(0);
  });
});
