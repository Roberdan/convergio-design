/**
 * Maranello Luce Design System — Demo App
 * Hash-based SPA routing: one section at a time.
 * Dynamic imports: only the current section's JS loads on demand.
 * Works on local dev server AND GitHub Pages static hosting.
 */

const root = document.getElementById('demo-root');
if (!root) throw new Error('Missing #demo-root');

// Dynamic import map — sections load only when navigated to (browser caches modules)
const SECTIONS = new Map([
  ['hero',           () => import('./sections/hero.js').then(m => m.createHeroSection)],
  ['tokens',         () => import('./sections/tokens.js').then(m => m.createTokensSection)],
  ['cards',          () => import('./sections/cards.js').then(m => m.createCardsSection)],
  ['dashboard',      () => import('./sections/dashboard.js').then(m => m.createDashboardSection)],
  ['charts',         () => import('./sections/charts.js').then(m => m.createChartsSection)],
  ['network',        () => import('./sections/network.js').then(m => m.createNetworkSection)],
  ['controls',       () => import('./sections/controls.js').then(m => m.createControlsSection)],
  ['forms',          () => import('./sections/forms.js').then(m => m.createFormsSection)],
  ['tables',         () => import('./sections/tables.js').then(m => m.createTablesSection)],
  ['gauges',         () => import('./sections/gauges.js').then(m => m.createGaugesSection)],
  ['cockpit',        () => import('./sections/cockpit.js').then(m => m.createCockpitSection)],
  ['telemetry',      () => import('./sections/telemetry.js').then(m => m.createTelemetrySection)],
  ['gantt',          () => import('./sections/gantt.js').then(m => m.createGanttSection)],
  ['icons',          () => import('./sections/icons.js').then(m => m.createIconsSection)],
  ['animations',     () => import('./sections/animations.js').then(m => m.createAnimationsSection)],
  ['heatmap',        () => import('./sections/heatmap.js').then(m => m.createHeatmapSection)],
  ['treemap',        () => import('./sections/treemap.js').then(m => m.createTreemapSection)],
  ['layouts',        () => import('./sections/layouts.js').then(m => m.createLayoutsSection)],
  ['detail-panel',   () => import('./sections/detail-panel.js').then(m => m.createDetailPanelSection)],
  ['interactive',    () => import('./sections/interactive.js').then(m => m.createInteractiveSection)],
  ['okr',            () => import('./sections/okr-panel.js').then(m => m.createOkrSection)],
  ['map',            () => import('./sections/map.js').then(m => m.createMapSection)],
  ['social-graph',   () => import('./sections/social-graph.js').then(m => m.createSocialGraphSection)],
  ['advanced',       () => import('./sections/advanced.js').then(m => m.createAdvancedSection)],
  ['mesh-network',   () => import('./sections/mesh-network.js').then(m => m.createMeshNetworkSection)],
  ['convergio',      () => import('./sections/convergio.js').then(m => m.createConvergioSection)],
  ['web-components', () => import('./sections/web-components.js').then(m => m.createWebComponentsSection)],
  ['glass',          () => import('./sections/section-glass.js').then(m => m.createGlassSection)],
  ['launch',         () => import('./sections/launch.js').then(m => m.createLaunchSection)],
  ['accessibility',  () => import('./sections/accessibility.js').then(m => m.createAccessibilitySection)],
  ['api-reference',  () => import('./sections/api-reference.js').then(m => m.createApiReferenceSection)],
  ['data-binding',   () => import('./sections/data-binding.js').then(m => m.createDataBindingSection)],
  ['overlays',       () => import('./sections/overlays.js').then(m => m.createOverlaysSection)],
  ['org-tree',       () => import('./sections/org-tree.js').then(m => m.createOrgTreeSection)],
]);

const SECTION_KEYS = [...SECTIONS.keys()];

function safe(el, name) {
  // el is already created; wrap errors only if it's actually an Error
  return el;
}

function safeErr(name, err) {
  console.error(`[demo] ${name} crashed:`, err);
  const el = document.createElement('section');
  el.className = 'mn-section-dark';
  el.innerHTML = `<div class="mn-container" style="padding:var(--space-xl)">
    <p style="color:var(--rosso-corsa)">⚠ Section "${name}" failed to render</p>
    <pre class="mn-micro" style="color:var(--grigio-medio)">${String(err?.message ?? err)}</pre></div>`;
  return el;
}

function makeSectionNav(current, pos) {
  const el = document.createElement('mn-section-nav');
  el.setAttribute('sections', SECTION_KEYS.join(','));
  el.setAttribute('current', current);
  el.setAttribute('data-pos', pos);
  return el;
}

function currentSection() {
  const hash = window.location.hash.replace('#', '').trim();
  return SECTIONS.has(hash) ? hash : 'hero';
}

function setActiveNav(name) {
  document.querySelectorAll('.demo-nav__links a').forEach((a) => {
    a.classList.toggle('demo-nav__link--active', a.getAttribute('href') === '#' + name);
  });
}

// Loading placeholder while dynamic import resolves
function showLoader() {
  root.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;min-height:60vh">
    <div class="mn-spinner mn-spinner--lg"><div class="mn-spinner__ring"></div></div>
  </div>`;
}

async function render(name) {
  setActiveNav(name);
  showLoader();
  try {
    const factory = await SECTIONS.get(name)();
    // Clear after load (stops canvas/RAF of removed elements)
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(makeSectionNav(name, 'top'));
    root.appendChild(factory());
    root.appendChild(makeSectionNav(name, 'bottom'));
  } catch (err) {
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(safeErr(name, err));
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Hash navigation
window.addEventListener('hashchange', () => render(currentSection()));

// Theme label sync
function updateThemeLabel() {
  const label = document.getElementById('demo-theme-label');
  if (!label) return;
  const theme = window.Maranello?.getTheme?.() ?? 'nero';
  const names = { nero: 'Nero', avorio: 'Avorio', colorblind: 'Colorblind', editorial: 'Editorial' };
  label.textContent = `Current: ${names[theme] ?? theme}`;
}

document.addEventListener('mn-theme-change', (event) => {
  const nav = document.querySelector('.demo-nav');
  if (!nav) return;
  if (event.detail?.theme === 'avorio') {
    nav.style.background = 'rgba(250,243,230,0.95)';
    nav.style.borderBottomColor = 'var(--avorio-scuro)';
  } else {
    nav.style.background = 'rgba(10,10,10,0.92)';
    nav.style.borderBottomColor = 'var(--grigio-scuro)';
  }
  updateThemeLabel();
});

requestAnimationFrame(updateThemeLabel);

// Initial render
render(currentSection());
