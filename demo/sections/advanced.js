/**
 * Advanced section — Extended Components.
 */
export function createAdvancedSection() {
  const section = document.createElement('section');
  section.id = 'advanced';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">06 / INTERFACE · PATTERNS</p>
      <div class="mn-watermark">INTERFACCIA</div>
      <h2 class="mn-title-section mn-mb-sm">Extended Components</h2>
      <p class="mn-body mn-mb-2xl">Tooltip, modal, toast, dropdown, tabs, breadcrumb, avatar, spinner — every pattern a dashboard needs.</p>
      <div class="demo-section-label mn-mt-2xl">Breadcrumb</div>
      <nav class="mn-breadcrumb mn-mb-2xl" aria-label="Breadcrumb"><a href="#" class="mn-breadcrumb__item">Portfolio</a><span class="mn-breadcrumb__sep">▸</span><a href="#" class="mn-breadcrumb__item">Milano Center</a><span class="mn-breadcrumb__sep">▸</span><span class="mn-breadcrumb__item mn-breadcrumb__item--active">Therapy Hub</span></nav>
      <div class="demo-section-label">Tooltips</div>
      <div class="mn-flex-wrap mn-gap-xl mn-mb-2xl">
        <span class="mn-tooltip-wrap"><button class="mn-machined-btn">Hover me</button><span class="mn-tooltip" role="tooltip">Quality score: 92%</span></span>
        <span class="mn-tooltip-wrap"><span class="mn-status mn-status--warning"><span class="mn-status__dot"></span> At Risk</span><span class="mn-tooltip mn-tooltip--bottom" role="tooltip">3 checks failing since Mar 8</span></span>
        <span class="mn-tooltip-wrap"><span class="mn-tag mn-tag--active">Therapy</span><span class="mn-tooltip" role="tooltip">234 children enrolled in movement therapy</span></span>
      </div>
      <div class="demo-section-label">Avatars</div>
      <div class="mn-flex-wrap mn-gap-lg mn-mb-lg" style="align-items:center"><div class="mn-avatar mn-avatar--xs">MR</div><div class="mn-avatar mn-avatar--sm">JS</div><div class="mn-avatar">AK<span class="mn-avatar__status mn-avatar__status--online"></span></div><div class="mn-avatar mn-avatar--lg">YT<span class="mn-avatar__status mn-avatar__status--busy"></span></div><div class="mn-avatar mn-avatar--xl">LP<span class="mn-avatar__status mn-avatar__status--away"></span></div></div>
      <div class="mn-flex-wrap mn-gap-lg mn-mb-2xl" style="align-items:center"><span class="mn-micro mn-text-muted">Group:</span><div class="mn-avatar-group"><div class="mn-avatar mn-avatar--sm">MR</div><div class="mn-avatar mn-avatar--sm">JS</div><div class="mn-avatar mn-avatar--sm">AK</div><div class="mn-avatar mn-avatar--sm">+4</div></div></div>
      <div class="demo-section-label">Badges & Tags</div>
      <div class="mn-flex-wrap mn-gap-md mn-mb-2xl" style="align-items:center"><span class="mn-tag mn-tag--active">Active</span><span class="mn-tag">Therapy</span><span class="mn-tag mn-tag--sm">Research</span><span class="mn-tag mn-tag--xs">Q1 2026</span><span class="mn-status mn-status--success"><span class="mn-status__dot"></span>Online</span><span class="mn-status mn-status--danger"><span class="mn-status__dot mn-anim-pulseDot"></span>Live Alert</span><span class="mn-status mn-status--warning"><span class="mn-status__dot"></span>At Risk</span></div>
      <div class="demo-section-label">Dropdown</div>
      <div class="mn-mb-xl"><div class="mn-dropdown" id="adv-dropdown"><button class="mn-dropdown__trigger">Milano Center</button><div class="mn-dropdown__menu"><button class="mn-dropdown__item mn-dropdown__item--active">Milano Center</button><button class="mn-dropdown__item">Roma Studio</button><button class="mn-dropdown__item">Torino Hub</button><div class="mn-dropdown__divider"></div><button class="mn-dropdown__item">All Centers</button></div></div></div>
      <div class="demo-section-label">Multi-Select Dropdown</div>
      <div class="mn-mb-xl"><div class="mn-dropdown" id="adv-multi-dropdown"><button class="mn-dropdown__trigger" style="border-color:var(--mn-accent);color:var(--mn-accent)">Select Programs</button><div class="mn-dropdown__menu" style="border-color:rgba(255,199,44,.45);min-width:240px"><label class="mn-dropdown__item" data-label="MVP Therapy"><input type="checkbox" tabindex="-1" style="accent-color:var(--mn-accent)"> <span>MVP Therapy</span></label><label class="mn-dropdown__item" data-label="Adaptive Sport"><input type="checkbox" tabindex="-1" style="accent-color:var(--mn-accent)"> <span>Adaptive Sport</span></label><label class="mn-dropdown__item" data-label="Family Coaching"><input type="checkbox" tabindex="-1" style="accent-color:var(--mn-accent)" checked> <span>Family Coaching</span></label><label class="mn-dropdown__item" data-label="Research Lab"><input type="checkbox" tabindex="-1" style="accent-color:var(--mn-accent)"> <span>Research Lab</span></label></div></div></div>
      <div class="demo-section-label">Exclusive-Select Dropdown</div>
      <div class="mn-mb-2xl"><div class="mn-dropdown" id="adv-exclusive-dropdown"><button class="mn-dropdown__trigger" style="border-color:var(--mn-accent);color:var(--mn-accent)">Priority Focus</button><div class="mn-dropdown__menu" style="border-color:rgba(255,199,44,.45);min-width:220px"><label class="mn-dropdown__item mn-dropdown__item--active" data-label="Gold Tier"><input type="radio" name="adv-exclusive" tabindex="-1" style="accent-color:var(--mn-accent)" checked> <span>Gold Tier</span></label><label class="mn-dropdown__item" data-label="Silver Tier"><input type="radio" name="adv-exclusive" tabindex="-1" style="accent-color:var(--mn-accent)"> <span>Silver Tier</span></label><label class="mn-dropdown__item" data-label="Bronze Tier"><input type="radio" name="adv-exclusive" tabindex="-1" style="accent-color:var(--mn-accent)"> <span>Bronze Tier</span></label></div></div></div>
      <div class="demo-section-label">Tabs</div>
      <div class="mn-tabs mn-mb-2xl" id="adv-tabs" style="max-width:600px"><div class="mn-tabs__list" role="tablist"><button class="mn-tabs__tab mn-tabs__tab--active" role="tab">Overview</button><button class="mn-tabs__tab" role="tab">Activities</button><button class="mn-tabs__tab" role="tab">Resources</button><button class="mn-tabs__tab" role="tab">Quality</button></div><div class="mn-tabs__panel mn-tabs__panel--active" role="tabpanel"><p class="mn-micro mn-text-muted">47 active programs · 87% utilization · 65/100 quality score</p></div><div class="mn-tabs__panel" role="tabpanel"><p class="mn-micro mn-text-muted">128 therapy activities running across MVP, MVE, and Technical Advisory types</p></div><div class="mn-tabs__panel" role="tabpanel"><p class="mn-micro mn-text-muted">46.4 FTE allocated · 12 specialists across 3 time zones</p></div><div class="mn-tabs__panel" role="tabpanel"><p class="mn-micro mn-text-muted">9 quality checks: 6 passing, 2 warnings, 1 critical</p></div></div>
      <div class="demo-section-label">Spinners</div>
      <div class="mn-flex-wrap mn-gap-2xl mn-mb-2xl" style="align-items:center"><div class="mn-text-center"><div class="mn-spinner mn-spinner--sm"><div class="mn-spinner__ring"></div></div><div class="mn-spinner__label">Small</div></div><div class="mn-text-center"><div class="mn-spinner"><div class="mn-spinner__ring"></div></div><div class="mn-spinner__label">Default</div></div><div class="mn-text-center"><div class="mn-spinner mn-spinner--lg"><div class="mn-spinner__ring"></div></div><div class="mn-spinner__label">Large</div></div><div class="mn-text-center"><div class="mn-spinner mn-spinner--gauge"><div class="mn-spinner__ring"></div></div><div class="mn-spinner__label">Gauge</div></div></div>
      <div class="demo-section-label">Modal</div>
      <div class="mn-mb-2xl"><button class="mn-machined-btn" id="adv-modal-open"><span class="mn-machined-btn__indicator"></span>Open Modal</button></div>
      <div class="mn-modal-backdrop" id="adv-modal"><div class="mn-modal"><div class="mn-modal__header"><span class="mn-modal__title">Engagement Detail</span><button class="mn-modal__close" id="adv-modal-close" aria-label="Close">✕</button></div><div class="mn-modal__body"><p><strong>Milano Therapy Hub</strong> — MVP program in Milano Center.</p><p style="margin-top:var(--space-md)">Quality: 92% · FTE: 2.4 · Status: Active</p><p style="margin-top:var(--space-md)">Click outside or press Escape to close.</p></div><div class="mn-modal__footer"><button class="mn-btn mn-btn--ghost mn-btn--sm" id="adv-modal-cancel">Cancel</button><button class="mn-btn mn-btn--accent mn-btn--sm" id="adv-modal-confirm">View Full Detail</button></div></div></div>
      <div class="demo-section-label">Toast Notifications</div>
      <div class="mn-flex-wrap mn-gap-md mn-mb-2xl"><button class="mn-machined-btn" id="adv-toast-success">Success Toast</button><button class="mn-machined-btn mn-machined-btn--amber" id="adv-toast-warning">Warning Toast</button><button class="mn-machined-btn" id="adv-toast-danger">Error Toast</button><button class="mn-machined-btn mn-machined-btn--off" id="adv-toast-info">Info Toast</button></div>
      <div class="demo-section-label">Command Palette (⌘K)</div>
      <div class="mn-mb-2xl"><button class="mn-machined-btn" id="adv-cmd-palette"><span class="mn-machined-btn__indicator"></span>Open Palette</button><span class="mn-micro mn-text-muted" style="margin-left:var(--space-md)">or press ⌘K / Ctrl+K</span></div>
      <div id="demo-cmd-palette" style="position:fixed;inset:0;z-index:9000;display:none;align-items:flex-start;justify-content:center;padding-top:20vh;background:rgba(0,0,0,.6);backdrop-filter:blur(4px)"><div class="mn-command-palette" style="position:relative;top:auto;left:auto;transform:none;width:480px;max-width:90vw;overflow:hidden"><input class="mn-command-palette__input" placeholder="Search commands…" style="width:100%;padding:14px 16px;background:transparent;border:none;border-bottom:1px solid var(--grigio-scuro,#333);color:var(--grigio-alluminio,#ccc);font-size:.95rem;outline:none"><div class="mn-command-palette__results" style="max-height:240px;overflow-y:auto;padding:8px"><div class="mn-command-palette__item" data-action="theme-nero"><span class="mn-command-palette__item-text">🌙 Switch to Nero theme</span></div><div class="mn-command-palette__item" data-action="theme-avorio"><span class="mn-command-palette__item-text">☀️ Switch to Avorio theme</span></div><div class="mn-command-palette__item" data-action="go-charts"><span class="mn-command-palette__item-text">📊 Go to Charts</span></div><div class="mn-command-palette__item" data-action="go-gauges"><span class="mn-command-palette__item-text">🔧 Go to Gauges</span></div><div class="mn-command-palette__item" data-action="go-controls"><span class="mn-command-palette__item-text">🎛️ Go to Controls</span></div><div class="mn-command-palette__item" data-action="go-forms"><span class="mn-command-palette__item-text">📝 Go to Forms</span></div></div></div></div>
      <div class="demo-section-label">Drawer Panel</div>
      <div class="mn-mb-2xl"><button class="mn-machined-btn" id="adv-drawer-open"><span class="mn-machined-btn__indicator"></span>Open Drawer</button></div>
      <div class="mn-drawer__backdrop" id="adv-drawer-backdrop" style="z-index:8000"></div>
      <div class="mn-drawer" id="adv-drawer" style="left:auto;right:0;bottom:0;width:360px;max-width:90vw;height:100%;z-index:8001;background:var(--nero-soft,#1a1a1a);border-left:1px solid var(--grigio-scuro,#333);box-shadow:-10px 0 30px rgba(0,0,0,.4);transform:translateX(100%);transition:transform .3s ease;overflow-y:auto;padding:var(--space-xl)"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl)"><span class="mn-label" style="color:var(--mn-accent)">Detail Drawer</span><button class="mn-machined-btn mn-machined-btn--off" id="adv-drawer-close" style="padding:4px 8px;font-size:.7rem">✕</button></div><p class="mn-body" style="margin-bottom:var(--space-lg)">Drawer panel for side content. Click × or outside to close.</p><div class="mn-card-dark" style="padding:var(--space-lg);margin-bottom:var(--space-md)"><div class="mn-label" style="margin-bottom:var(--space-sm)">Quick Stats</div><div class="mn-micro" style="color:var(--grigio-medio)">Active programs: 47</div><div class="mn-micro" style="color:var(--grigio-medio)">Children enrolled: 340</div><div class="mn-micro" style="color:var(--grigio-medio)">Quality score: 92%</div></div></div>
    </div>
  `;
  requestAnimationFrame(() => initAdvanced(section));
  return section;
}

function initAdvanced(section) {
  if (!section.isConnected) return requestAnimationFrame(() => initAdvanced(section));
  const M = window.Maranello;
  const hoist = (selector) => {
    const el = section.querySelector(selector);
    if (el && el.parentElement !== document.body) document.body.appendChild(el);
    return el;
  };
  M?.initDropdown?.(section.querySelector('#adv-dropdown'));
  M?.initTabs?.(section.querySelector('#adv-tabs'));

  const modal = section.querySelector('#adv-modal');
  const openModal = () => M?.openModal ? M.openModal('adv-modal') : modal?.classList.add('mn-modal-backdrop--open');
  const closeModal = () => M?.closeModal ? M.closeModal('adv-modal') : modal?.classList.remove('mn-modal-backdrop--open');
  ['#adv-modal-open', '#adv-modal-close', '#adv-modal-cancel', '#adv-modal-confirm'].forEach((id, i) => section.querySelector(id)?.addEventListener('click', i ? closeModal : openModal));
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  [['adv-toast-success', { type: 'success', title: 'Donation Confirmed', message: 'EUR 250 received for Summer Therapy Fund.' }], ['adv-toast-warning', { type: 'warning', title: 'Low Capacity', message: 'Milano Center is at 92% capacity.' }], ['adv-toast-danger', { type: 'danger', title: 'Service Alert', message: 'Research Database is experiencing delays.' }], ['adv-toast-info', { type: 'info', title: 'New Volunteer', message: 'A new volunteer registered in Torino.' }]].forEach(([id, opts]) => section.querySelector(`#${id}`)?.addEventListener('click', () => M?.toast?.(opts)));

  const paletteHost = hoist('#demo-cmd-palette');
  const palette = paletteHost?.querySelector('.mn-command-palette');
  const paletteInput = paletteHost?.querySelector('.mn-command-palette__input');
  const paletteItems = [...(paletteHost?.querySelectorAll('.mn-command-palette__item') || [])];
  const filterPalette = (query = '') => paletteItems.forEach((item) => {
    const text = item.querySelector('.mn-command-palette__item-text')?.textContent?.toLowerCase() || '';
    item.style.display = !query || text.includes(query.toLowerCase()) ? 'flex' : 'none';
  });
  const openPalette = () => {
    if (!paletteHost || !palette) return;
    paletteHost.style.display = 'flex';
    palette.classList.add('mn-command-palette--open');
    filterPalette('');
    if (paletteInput) { paletteInput.value = ''; paletteInput.focus(); }
  };
  const closePalette = () => { palette?.classList.remove('mn-command-palette--open'); if (paletteHost) paletteHost.style.display = 'none'; };
  paletteInput?.addEventListener('input', () => filterPalette(paletteInput.value));
  paletteInput?.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePalette(); });
  paletteHost?.addEventListener('click', (e) => { if (e.target === paletteHost) closePalette(); });
  paletteItems.forEach((item) => item.addEventListener('click', () => {
    const action = item.dataset.action || '';
    if (action === 'theme-nero') M?.setTheme?.('nero');
    else if (action === 'theme-avorio') M?.setTheme?.('avorio');
    else if (action.startsWith('go-')) document.querySelector(`#${action.slice(3)}`)?.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }));
  section.querySelector('#adv-cmd-palette')?.addEventListener('click', openPalette);
  document.addEventListener('keydown', (e) => {
    const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable="true"]');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !typing) { e.preventDefault(); openPalette(); }
    if (e.key === 'Escape' && paletteHost?.style.display === 'flex') closePalette();
  });

  const drawerBackdrop = hoist('#adv-drawer-backdrop');
  const drawerEl = hoist('#adv-drawer');
  const openDrawerPanel = () => { if (drawerEl) drawerEl.style.transform = 'translateX(0)'; drawerBackdrop?.classList.add('mn-drawer__backdrop--visible'); };
  const closeDrawerPanel = () => { if (drawerEl) drawerEl.style.transform = 'translateX(100%)'; drawerBackdrop?.classList.remove('mn-drawer__backdrop--visible'); };
  section.querySelector('#adv-drawer-open')?.addEventListener('click', openDrawerPanel);
  drawerEl?.querySelector('#adv-drawer-close')?.addEventListener('click', closeDrawerPanel);
  drawerBackdrop?.addEventListener('click', closeDrawerPanel);

  const initChoiceDropdown = (id, mode) => {
    const root = section.querySelector(id);
    if (!root) return;
    const trigger = root.querySelector('.mn-dropdown__trigger');
    const items = [...root.querySelectorAll('.mn-dropdown__item')];
    const sync = () => {
      const selected = items.filter((item) => item.querySelector('input')?.checked).map((item) => item.dataset.label);
      if (trigger) trigger.textContent = mode === 'multi' ? (selected.length ? `${selected.length} program${selected.length > 1 ? 's' : ''} selected` : 'Select Programs') : (selected[0] || 'Priority Focus');
      items.forEach((item) => item.classList.toggle('mn-dropdown__item--active', !!item.querySelector('input')?.checked));
    };
    const close = () => root.classList.remove('mn-dropdown--open');
    trigger?.addEventListener('click', (e) => { e.stopPropagation(); root.classList.toggle('mn-dropdown--open'); });
    items.forEach((item) => item.addEventListener('click', (e) => {
      e.preventDefault();
      const input = item.querySelector('input');
      if (!input) return;
      if (mode === 'exclusive') items.forEach((entry) => { const control = entry.querySelector('input'); if (control) control.checked = entry === item; });
      else input.checked = !input.checked;
      sync();
      if (mode === 'exclusive') close();
    }));
    document.addEventListener('click', (e) => { if (!root.contains(e.target)) close(); });
    sync();
  };
  initChoiceDropdown('#adv-multi-dropdown', 'multi');
  initChoiceDropdown('#adv-exclusive-dropdown', 'exclusive');
}
