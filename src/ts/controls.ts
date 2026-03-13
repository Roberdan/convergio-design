/**
 * Maranello Luce Design - Base interactive controls
 * Detail panel open/close, drawer, org tree, command palette,
 * notifications, drill down.
 */

import type { CommandPaletteController } from './core/types';
import { eventBus } from './core/events';

/** Open a detail panel by element id. */
export function openDetailPanel(id: string): void {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.add('mn-detail-panel--open');
  const backdrop = panel.previousElementSibling;
  if (backdrop && backdrop.classList.contains('mn-detail-panel__backdrop')) {
    backdrop.classList.add('mn-detail-panel__backdrop--visible');
    backdrop.addEventListener(
      'click',
      () => closeDetailPanel(id),
      { once: true },
    );
  }
  const first = panel.querySelector<HTMLElement>('button, [href], input');
  if (first) first.focus();
}

/** Close a detail panel by element id. */
export function closeDetailPanel(id: string): void {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.remove('mn-detail-panel--open');
  const backdrop = panel.previousElementSibling;
  if (backdrop && backdrop.classList.contains('mn-detail-panel__backdrop')) {
    backdrop.classList.remove('mn-detail-panel__backdrop--visible');
  }
}

/** Open a mobile drawer by element id. */
export function openDrawer(id: string): void {
  const drawer = document.getElementById(id);
  if (!drawer) return;
  drawer.classList.add('mn-drawer--open');
  const backdrop = drawer.previousElementSibling;
  if (backdrop && backdrop.classList.contains('mn-drawer__backdrop')) {
    backdrop.classList.add('mn-drawer__backdrop--visible');
    backdrop.addEventListener(
      'click',
      () => closeDrawer(id),
      { once: true },
    );
  }
}

/** Close a mobile drawer by element id. */
export function closeDrawer(id: string): void {
  const drawer = document.getElementById(id);
  if (!drawer) return;
  drawer.classList.remove('mn-drawer--open');
  const backdrop = drawer.previousElementSibling;
  if (backdrop && backdrop.classList.contains('mn-drawer__backdrop')) {
    backdrop.classList.remove('mn-drawer__backdrop--visible');
  }
}

/** Initialize org tree expand/collapse and node selection. */
export function initOrgTree(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.mn-org-tree__toggle').forEach((toggle) => {
    if (toggle.classList.contains('mn-org-tree__toggle--leaf')) return;
    toggle.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      const item = toggle.closest('.mn-org-tree__item');
      if (!item) return;
      const children = item.querySelector<HTMLElement>('.mn-org-tree__children');
      if (!children) return;
      const isCollapsed = children.classList.contains('mn-org-tree__children--collapsed');
      children.classList.toggle('mn-org-tree__children--collapsed');
      toggle.classList.toggle('mn-org-tree__toggle--expanded', isCollapsed);
    });
  });

  container.querySelectorAll<HTMLElement>('.mn-org-tree__node').forEach((node) => {
    node.addEventListener('click', () => {
      container.querySelectorAll('.mn-org-tree__node--active').forEach((n) => {
        n.classList.remove('mn-org-tree__node--active');
      });
      node.classList.add('mn-org-tree__node--active');
      const label = node.querySelector('.mn-org-tree__label');
      eventBus.emit('org-tree-select', {
        label: label ? label.textContent ?? '' : '',
        node,
      });
    });
  });
}

/** Toggle notification center visibility. */
export function toggleNotifications(id: string): void {
  const panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.toggle('mn-notification-center--open');
}

/** Initialize drill-down expand/collapse controls. */
export function initDrillDown(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.mn-drill-down').forEach((trigger) => {
    const content = trigger.nextElementSibling;
    if (!content || !content.classList.contains('mn-drill-down__content')) return;
    const contentEl = content as HTMLElement;
    trigger.addEventListener('click', () => {
      const isOpen = contentEl.classList.contains('mn-drill-down__content--open');
      contentEl.classList.toggle('mn-drill-down__content--open');
      trigger.classList.toggle('mn-drill-down--expanded');
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}
