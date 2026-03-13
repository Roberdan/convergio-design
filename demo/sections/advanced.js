/**
 * Advanced section — AI Chat, System Status, Command Palette,
 * Modal, Toast, Funnel, Flip Counter, Progress Rings
 */
export function createAdvancedSection() {
  const section = document.createElement('section');
  section.id = 'advanced';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">13 — Advanced Components</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-2xl)">Advanced Components</h2>

      ${aiChatBlock()}
      ${systemStatusBlock()}
      ${commandPaletteBlock()}
      ${modalToastBlock()}
      ${funnelBlock()}
      ${flipCounterBlock()}
      ${progressRingsBlock()}
    </div>
  `;
  wireAdvancedEvents(section);
  return section;
}

function aiChatBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">AI Chat</h3>
    <div class="mn-grid-2" style="margin-bottom:var(--space-3xl)">
      <div class="mn-card-dark" style="padding:var(--space-lg)">
        <mn-chat
          title="Foundation Assistant"
          welcome="Hello! I can help you explore therapy programs, donation data, and volunteer opportunities."
          avatar="../src/assets/avatar.jpeg"
          placeholder="Ask about programs..."
          quick-actions='["Show therapy stats","Donation summary","Volunteer openings"]'
        ></mn-chat>
      </div>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Chat Features</h4>
        <ul style="list-style:none;padding:0">
          ${chatFeature('User avatar and branding')}
          ${chatFeature('Quick action buttons')}
          ${chatFeature('Agent selector for multi-model')}
          ${chatFeature('Voice input (mic button)')}
          ${chatFeature('Markdown message rendering')}
          ${chatFeature('Theme-aware styling')}
        </ul>
      </div>
    </div>`;
}

function chatFeature(text) {
  return `<li class="mn-body" style="padding:var(--space-xs) 0;border-bottom:1px solid var(--grigio-scuro)">${text}</li>`;
}

function systemStatusBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">System Status</h3>
    <div class="mn-card-dark" style="padding:var(--space-lg);margin-bottom:var(--space-3xl)">
      <mn-system-status
        services='${svcEsc([
          { name: 'Therapy Portal' },
          { name: 'Volunteer Hub' },
          { name: 'Research Database' },
          { name: 'Donation Gateway' },
          { name: 'Notification Service' },
        ])}'
        version="2.0.0"
        environment="Demo"
      ></mn-system-status>
    </div>`;
}

function commandPaletteBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Command Palette</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center;margin-bottom:var(--space-3xl)">
      <p class="mn-body" style="margin-bottom:var(--space-md)">
        Press <kbd style="background:var(--grigio-scuro);padding:2px 8px;border-radius:4px">Cmd+K</kbd>
        or click below to open the command palette.
      </p>
      <button class="mn-btn mn-btn--ghost-light" id="demo-open-palette">Open Command Palette</button>
      <mn-command-palette
        items='${svcEsc([
          { text: 'View Therapy Programs', icon: 'heart', group: 'Navigation' },
          { text: 'Donation Dashboard', icon: 'chart', group: 'Navigation' },
          { text: 'Volunteer Directory', icon: 'users', group: 'Navigation' },
          { text: 'Export Report', icon: 'download', group: 'Actions', shortcut: 'Cmd+E' },
          { text: 'Toggle Theme', icon: 'palette', group: 'Settings', shortcut: 'Cmd+T' },
          { text: 'System Status', icon: 'activity', group: 'Settings' },
        ])}'
        placeholder="Search commands..."
      ></mn-command-palette>
    </div>`;
}

function modalToastBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Modal & Toast</h3>
    <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;margin-bottom:var(--space-3xl)">
      <button class="mn-btn mn-btn--accent" id="demo-toast-success">Success Toast</button>
      <button class="mn-btn mn-btn--ghost" id="demo-toast-warning">Warning Toast</button>
      <button class="mn-btn" id="demo-toast-info">Info Toast</button>
      <button class="mn-btn mn-btn--ghost-light" id="demo-toast-danger">Error Toast</button>
    </div>`;
}

function funnelBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Donation Pipeline</h3>
    <div class="mn-card-dark" style="padding:var(--space-lg);margin-bottom:var(--space-3xl)">
      <mn-funnel
        stages='${svcEsc([
          { label: 'Awareness', count: 5000, color: '#FFC72C' },
          { label: 'Interest', count: 2800, color: '#4EA8DE' },
          { label: 'Consideration', count: 1200, color: '#00A651' },
          { label: 'Pledge', count: 650, color: '#D4622B' },
          { label: 'Donation', count: 420, color: '#DC0000' },
          { label: 'Recurring Donor', count: 180, color: '#8B5CF6' },
        ])}'
        show-conversion
        animate
      ></mn-funnel>
    </div>`;
}

function flipCounterBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Donation Counter</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center;margin-bottom:var(--space-3xl)">
      <p class="mn-label" style="margin-bottom:var(--space-md)">Total Donations Received (EUR)</p>
      <div id="demo-flip-counter" style="display:flex;justify-content:center"></div>
      <button class="mn-btn mn-btn--sm mn-btn--ghost-light" id="demo-flip-increment" style="margin-top:var(--space-lg)">
        Simulate New Donation
      </button>
    </div>`;
}

function progressRingsBlock() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Progress Rings</h3>
    <div style="display:flex;gap:var(--space-2xl);justify-content:center;flex-wrap:wrap">
      ${ringCard('Summer Therapy Fund', 72, '#FFC72C')}
      ${ringCard('Brain Research Initiative', 45, '#4EA8DE')}
      ${ringCard('Volunteer Network Expansion', 88, '#00A651')}
      ${ringCard('Tech4Good Pilot', 33, '#D4622B')}
    </div>`;
}

function ringCard(label, pct, color) {
  return `<div class="mn-card-dark" style="padding:var(--space-xl);text-align:center;min-width:160px">
    <div id="ring-${pct}" data-ring-value="${pct}" data-ring-color="${color}" style="display:flex;justify-content:center;margin-bottom:var(--space-md)"></div>
    <p class="mn-micro">${label}</p>
    <p class="mn-label" style="color:${color};margin-top:var(--space-xs)">${pct}%</p>
  </div>`;
}

function svcEsc(obj) {
  return JSON.stringify(obj).replace(/'/g, '&#39;');
}

function wireAdvancedEvents(section) {
  requestAnimationFrame(() => {
    wireToasts(section);
    wireFlipCounter(section);
    wirePalette(section);
    wireProgressRings(section);
  });
}

function wireToasts(section) {
  const M = window.Maranello;
  if (!M?.toast) return;
  const toasts = [
    ['demo-toast-success', 'success', 'Donation Confirmed', 'EUR 250 received for Summer Therapy Fund.'],
    ['demo-toast-warning', 'warning', 'Low Capacity', 'Milano Center 2 is at 92% capacity.'],
    ['demo-toast-info', 'info', 'New Volunteer', 'A new volunteer registered in Torino.'],
    ['demo-toast-danger', 'danger', 'Service Alert', 'Research Database is experiencing delays.'],
  ];
  toasts.forEach(([id, type, title, message]) => {
    section.querySelector('#' + id)?.addEventListener('click', () => M.toast({ type, title, message }));
  });
}

function wireFlipCounter(section) {
  const M = window.Maranello;
  if (!M?.flipCounter) return;
  const el = section.querySelector('#demo-flip-counter');
  if (!el) return;
  const ctrl = M.flipCounter(el, { value: 284700, digits: 7, prefix: '', suffix: '', separator: ',' });
  section.querySelector('#demo-flip-increment')?.addEventListener('click', () => ctrl.increment(Math.floor(Math.random() * 500) + 50));
}

function wirePalette(section) {
  const palette = section.querySelector('mn-command-palette');
  section.querySelector('#demo-open-palette')?.addEventListener('click', () => palette?.open?.());
}

function wireProgressRings(section) {
  const M = window.Maranello;
  if (!M?.progressRing) return;
  section.querySelectorAll('[data-ring-value]').forEach(el => {
    M.progressRing(el, { value: parseInt(el.dataset.ringValue), max: 100, size: 80, color: el.dataset.ringColor });
  });
}
