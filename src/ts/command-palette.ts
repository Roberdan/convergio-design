/**
 * Maranello Luce Design - Command palette (Cmd+K style)
 * Provides a searchable command overlay with keyboard navigation.
 */

import type { CommandPaletteController } from './core/types';
import { eventBus } from './core/events';

/**
 * Initialize a command palette on an existing DOM element.
 * Registers Ctrl/Cmd+K global shortcut.
 * Emits 'command-select' event when an item is chosen.
 */
export function commandPalette(id: string): CommandPaletteController {
  const palette = document.getElementById(id);
  if (!palette) return { open: () => {}, close: () => {} };

  const input = palette.querySelector<HTMLInputElement>('.mn-command-palette__input');
  const items = palette.querySelectorAll<HTMLElement>('.mn-command-palette__item');

  function open(): void {
    palette!.classList.add('mn-command-palette--open');
    if (input) {
      input.value = '';
      input.focus();
    }
    filterItems('');
  }

  function close(): void {
    palette!.classList.remove('mn-command-palette--open');
  }

  function filterItems(query: string): void {
    const q = query.toLowerCase();
    items.forEach((item) => {
      const text = item.querySelector<HTMLElement>('.mn-command-palette__item-text');
      const match = !q || (text?.textContent?.toLowerCase().includes(q) ?? false);
      item.style.display = match ? '' : 'none';
    });
  }

  if (input) {
    input.addEventListener('input', () => filterItems(input.value));
    input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    });
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      palette!.classList.contains('mn-command-palette--open') ? close() : open();
    }
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const text = item.querySelector<HTMLElement>('.mn-command-palette__item-text');
      eventBus.emit('command-select', { text: text?.textContent ?? '' });
      close();
    });
  });

  return { open, close };
}
