/**
 * Unit tests for kanban-board headless logic.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  document.body.innerHTML = '';
});

function makeContainer(): HTMLElement {
  const el = document.createElement('div');
  el.id = 'kanban-root';
  document.body.appendChild(el);
  return el;
}

const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'doing', title: 'In Progress', color: '#FFC72C' },
  { id: 'done', title: 'Done' },
];

const CARDS = [
  { id: 'c1', columnId: 'todo', title: 'Design homepage', subtitle: 'Landing page redesign', tags: ['design'], priority: 'high' as const },
  { id: 'c2', columnId: 'todo', title: 'API integration', priority: 'medium' as const },
  { id: 'c3', columnId: 'doing', title: 'Database migration', tags: ['backend', 'infra'] },
];

// --- kanban-board-dom ---
describe('kanban-board-dom', () => {
  describe('renderBoard', () => {
    it('creates mn-kanban container with columns', async () => {
      const { renderBoard } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      const board = root.querySelector('.mn-kanban');
      expect(board).toBeTruthy();
      const cols = root.querySelectorAll('.mn-kanban__column');
      expect(cols.length).toBe(3);
    });

    it('renders column headers with title and count', async () => {
      const { renderBoard } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      const headers = root.querySelectorAll('.mn-kanban__column-header');
      expect(headers.length).toBe(3);
      expect(headers[0].textContent).toContain('To Do');
      const count = root.querySelectorAll('.mn-kanban__column-count');
      expect(count[0].textContent).toBe('2');
    });

    it('renders cards with correct a11y attributes', async () => {
      const { renderBoard } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      const cards = root.querySelectorAll('.mn-kanban__card');
      expect(cards.length).toBe(3);
      const first = cards[0] as HTMLElement;
      expect(first.getAttribute('tabindex')).toBe('0');
      expect(first.getAttribute('role')).toBe('option');
      expect(first.getAttribute('aria-grabbed')).toBe('false');
      expect(first.getAttribute('data-card-id')).toBe('c1');
    });

    it('renders card priority, subtitle, and tags', async () => {
      const { renderBoard } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      const first = root.querySelector('[data-card-id="c1"]') as HTMLElement;
      expect(first.querySelector('.mn-kanban__card-priority--high')).toBeTruthy();
      expect(first.querySelector('.mn-kanban__card-subtitle')).toBeTruthy();
      expect(first.querySelector('.mn-kanban__card-tags')).toBeTruthy();
      const tags = first.querySelectorAll('.mn-kanban__card-tag');
      expect(tags.length).toBe(1);
    });

    it('sets role=listbox on cards container with aria-label', async () => {
      const { renderBoard } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      const containers = root.querySelectorAll('.mn-kanban__cards');
      expect(containers[0].getAttribute('role')).toBe('listbox');
      expect(containers[0].getAttribute('aria-label')).toBe('To Do');
    });
  });

  describe('renderCard', () => {
    it('escapes HTML in title and subtitle', async () => {
      const { renderCard } = await import('../../src/ts/kanban-board-dom');
      const el = renderCard({
        id: 'xss',
        columnId: 'todo',
        title: '<script>alert("xss")</script>',
        subtitle: '<img onerror="alert(1)">',
        tags: ['<b>bold</b>'],
      });
      expect(el.innerHTML).not.toContain('<script>');
      expect(el.innerHTML).not.toContain('<img');
      expect(el.innerHTML).not.toContain('<b>');
    });
  });

  describe('updateCardDom', () => {
    it('updates card title in the DOM', async () => {
      const { renderBoard, updateCardDom } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      updateCardDom(root, 'c1', { title: 'Updated title' });
      const card = root.querySelector('[data-card-id="c1"]') as HTMLElement;
      const titleEl = card.querySelector('.mn-kanban__card-title');
      expect(titleEl?.textContent).toBe('Updated title');
    });
  });

  describe('removeCardDom', () => {
    it('removes a card from the DOM', async () => {
      const { renderBoard, removeCardDom } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      expect(root.querySelector('[data-card-id="c1"]')).toBeTruthy();
      removeCardDom(root, 'c1');
      expect(root.querySelector('[data-card-id="c1"]')).toBeNull();
    });
  });

  describe('moveCardDom', () => {
    it('moves a card to a different column', async () => {
      const { renderBoard, moveCardDom } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      moveCardDom(root, 'c1', 'doing', 0);
      const doingCards = root.querySelectorAll('[data-column-id="doing"] .mn-kanban__card');
      const ids = Array.from(doingCards).map(c => c.getAttribute('data-card-id'));
      expect(ids).toContain('c1');
    });
  });

  describe('updateColumnCount', () => {
    it('updates the count badge text', async () => {
      const { renderBoard, updateColumnCount } = await import('../../src/ts/kanban-board-dom');
      const root = makeContainer();
      renderBoard(root, COLUMNS, CARDS);
      updateColumnCount(root, 'todo', 5);
      const col = root.querySelector('[data-column-id="todo"]') as HTMLElement;
      const count = col.querySelector('.mn-kanban__column-count');
      expect(count?.textContent).toBe('5');
    });
  });
});

// --- kanban-board (main factory) ---
describe('kanbanBoard', () => {
  it('resolves container from string id', async () => {
    const { kanbanBoard } = await import('../../src/ts/kanban-board');
    const root = makeContainer();
    const ctrl = kanbanBoard('kanban-root', { columns: COLUMNS, cards: CARDS });
    expect(root.querySelector('.mn-kanban')).toBeTruthy();
    ctrl.destroy();
  });

  it('resolves container from HTMLElement', async () => {
    const { kanbanBoard } = await import('../../src/ts/kanban-board');
    const root = makeContainer();
    const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
    expect(root.querySelector('.mn-kanban')).toBeTruthy();
    ctrl.destroy();
  });

  it('warns on empty columns', async () => {
    const { kanbanBoard } = await import('../../src/ts/kanban-board');
    const root = makeContainer();
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const ctrl = kanbanBoard(root, { columns: [], cards: [] });
    expect(spy).toHaveBeenCalled();
    ctrl.destroy();
    spy.mockRestore();
  });

  it('warns on empty cards', async () => {
    const { kanbanBoard } = await import('../../src/ts/kanban-board');
    const root = makeContainer();
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: [] });
    expect(spy).toHaveBeenCalled();
    ctrl.destroy();
    spy.mockRestore();
  });

  describe('getState', () => {
    it('returns frozen deep copy of state', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      const state = ctrl.getState();
      expect(Object.isFrozen(state)).toBe(true);
      expect(state.columns.length).toBe(3);
      expect(state.cards.length).toBe(3);
      ctrl.destroy();
    });

    it('state copy is independent of internal state', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      const state1 = ctrl.getState();
      ctrl.addCard({ id: 'c4', columnId: 'todo', title: 'New card' });
      const state2 = ctrl.getState();
      expect(state1.cards.length).toBe(3);
      expect(state2.cards.length).toBe(4);
      ctrl.destroy();
    });
  });

  describe('addCard', () => {
    it('adds a card to internal state and DOM', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      ctrl.addCard({ id: 'c4', columnId: 'done', title: 'Deploy release' });
      expect(ctrl.getState().cards.length).toBe(4);
      expect(root.querySelector('[data-card-id="c4"]')).toBeTruthy();
      ctrl.destroy();
    });
  });

  describe('removeCard', () => {
    it('removes a card from state and DOM', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      ctrl.removeCard('c1');
      expect(ctrl.getState().cards.length).toBe(2);
      expect(root.querySelector('[data-card-id="c1"]')).toBeNull();
      ctrl.destroy();
    });
  });

  describe('moveCard', () => {
    it('moves a card between columns', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      ctrl.moveCard('c1', 'done', 0);
      const state = ctrl.getState();
      const moved = state.cards.find(c => c.id === 'c1');
      expect(moved?.columnId).toBe('done');
      ctrl.destroy();
    });
  });

  describe('updateCard', () => {
    it('updates card fields in state and DOM', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      ctrl.updateCard('c1', { title: 'Revised design' });
      const state = ctrl.getState();
      const updated = state.cards.find(c => c.id === 'c1');
      expect(updated?.title).toBe('Revised design');
      ctrl.destroy();
    });
  });

  describe('onCardClick', () => {
    it('fires onCardClick callback via event delegation', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const onClick = vi.fn();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS, onCardClick: onClick });
      const card = root.querySelector('[data-card-id="c1"]') as HTMLElement;
      card.click();
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick.mock.calls[0][0].id).toBe('c1');
      ctrl.destroy();
    });
  });

  describe('destroy', () => {
    it('clears the container and removes listeners', async () => {
      const { kanbanBoard } = await import('../../src/ts/kanban-board');
      const root = makeContainer();
      const ctrl = kanbanBoard(root, { columns: COLUMNS, cards: CARDS });
      ctrl.destroy();
      expect(root.innerHTML).toBe('');
    });
  });
});

// --- kanban-board-drag ---
describe('kanban-board-drag', () => {
  it('exports initDrag function', async () => {
    const mod = await import('../../src/ts/kanban-board-drag');
    expect(typeof mod.initDrag).toBe('function');
  });

  it('returns a controller with destroy method', async () => {
    const { initDrag } = await import('../../src/ts/kanban-board-drag');
    const { renderBoard } = await import('../../src/ts/kanban-board-dom');
    const root = makeContainer();
    renderBoard(root, COLUMNS, CARDS);
    const ctrl = initDrag(root, { onMove: vi.fn() });
    expect(typeof ctrl.destroy).toBe('function');
    ctrl.destroy();
  });
});
