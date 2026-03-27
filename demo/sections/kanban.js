export function createKanbanSection() {
  const section = document.createElement('section');
  section.id = 'kanban';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">42 — Kanban Board</p>
      <h2 class="mn-title-section">Kanban Board</h2>
      <p class="mn-body">Drag-and-drop kanban board with columns, cards, keyboard navigation, and WCAG 2.2 AA compliance. Supports all 5 themes.</p>
      <details class="mn-code-snippet">
        <summary>Usage</summary>
        <pre><code>const ctrl = Maranello.kanbanBoard('#board', {
  columns: [
    { id: 'backlog', title: 'Backlog' },
    { id: 'progress', title: 'In Progress' },
    { id: 'review', title: 'Code Review' },
    { id: 'done', title: 'Done' },
  ],
  cards: [
    { id: 'c1', columnId: 'backlog', title: 'Authentication flow', priority: 'high' },
    { id: 'c2', columnId: 'progress', title: 'Database migration v3', tags: ['backend'] },
  ],
  onMove: (cardId, from, to, pos) => console.log(cardId, from, to, pos),
  onCardClick: (card) => console.log('clicked', card.id),
});

// Dynamic updates
ctrl.addCard({ id: 'c3', columnId: 'backlog', title: 'New feature' });
ctrl.moveCard('c1', 'progress');
ctrl.destroy();</code></pre>
      </details>
      <div id="demo-kanban" style="margin-top: var(--space-lg, 24px);"></div>
    </div>
  `;

  requestAnimationFrame(() => initKanban(section));
  return section;
}

function initKanban(section) {
  const M = window.Maranello;
  if (!M || !M.kanbanBoard) return;

  const container = section.querySelector('#demo-kanban');
  if (!container) return;

  M.kanbanBoard(container, {
    columns: [
      { id: 'backlog', title: 'Backlog' },
      { id: 'in-progress', title: 'In Progress' },
      { id: 'review', title: 'Code Review' },
      { id: 'done', title: 'Done' },
    ],
    cards: [
      { id: 'k1', columnId: 'backlog', title: 'Implement authentication flow', subtitle: 'OAuth 2.0 + OIDC integration', priority: 'high', tags: ['security', 'backend'] },
      { id: 'k2', columnId: 'backlog', title: 'Database migration v3', subtitle: 'Add composite indexes', priority: 'medium', tags: ['database'] },
      { id: 'k3', columnId: 'in-progress', title: 'Dashboard layout refactor', subtitle: 'CSS Grid migration', priority: 'low', tags: ['frontend'] },
      { id: 'k4', columnId: 'review', title: 'API rate limiting', subtitle: 'Token bucket implementation', priority: 'high', tags: ['backend', 'security'] },
      { id: 'k5', columnId: 'done', title: 'CI pipeline optimization', subtitle: 'Parallel test execution', priority: 'medium', tags: ['devops'] },
    ],
    onMove: (cardId, fromCol, toCol) => {
      M.toast && M.toast(`Moved card to ${toCol}`, { type: 'info' });
    },
    onCardClick: (card) => {
      M.toast && M.toast(`Clicked: ${card.title}`, { type: 'info' });
    },
  });
}
