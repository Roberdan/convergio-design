/**
 * Map section — therapy center locations across Italy (canvas-based)
 */
export function createMapSection() {
  const section = document.createElement('section');
  section.id = 'map';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">12 — Geography</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Map Visualization</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Canvas-based interactive map with clustered markers, zoom/pan,
        and theme-aware styling. Shows therapy center locations across Italy.
      </p>

      <div class="mn-card-dark" style="padding:var(--space-lg);margin-bottom:var(--space-2xl)">
        <h4 class="mn-label" style="margin-bottom:var(--space-md)">Therapy Center Network</h4>
        <mn-map
          markers='${mapMarkers()}'
          zoom="1"
          style="height:400px"
        ></mn-map>
      </div>

      <div class="mn-grid-2">
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-lg)">
            Centers by City
          </h4>
          ${cityRow('Milano', 3, 'active')}
          ${cityRow('Roma', 2, 'active')}
          ${cityRow('Torino', 1, 'active')}
          ${cityRow('Firenze', 1, 'active')}
          ${cityRow('Bologna', 1, 'planned')}
        </div>
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-lg)">
            Network Statistics
          </h4>
          ${statRow('Total Centers', '8')}
          ${statRow('Active Centers', '7')}
          ${statRow('Planned Openings', '1')}
          ${statRow('Cities Covered', '5')}
          ${statRow('Regions Reached', '4')}
          ${statRow('Avg Capacity', '120 children')}
        </div>
      </div>
    </div>
  `;
  return section;
}

function esc(str) { return str.replace(/'/g, '&#39;'); }

function mapMarkers() {
  const markers = [
    { id: 'm1', lat: 45.464, lon: 9.190, label: 'Milano Center 1', size: 'lg', status: 'active', color: '#FFC72C' },
    { id: 'm2', lat: 45.470, lon: 9.205, label: 'Milano Center 2', size: 'md', status: 'active', color: '#FFC72C' },
    { id: 'm3', lat: 45.458, lon: 9.175, label: 'Milano Center 3', size: 'md', status: 'active', color: '#FFC72C' },
    { id: 'm4', lat: 41.902, lon: 12.496, label: 'Roma Center 1', size: 'lg', status: 'active', color: '#4EA8DE' },
    { id: 'm5', lat: 41.890, lon: 12.510, label: 'Roma Center 2', size: 'md', status: 'active', color: '#4EA8DE' },
    { id: 'm6', lat: 45.070, lon: 7.687, label: 'Torino Center', size: 'md', status: 'active', color: '#00A651' },
    { id: 'm7', lat: 43.769, lon: 11.255, label: 'Firenze Center', size: 'md', status: 'active', color: '#D4622B' },
    { id: 'm8', lat: 44.494, lon: 11.343, label: 'Bologna (Planned)', size: 'sm', status: 'planned', color: '#8B5CF6' },
  ];
  return esc(JSON.stringify(markers));
}

function cityRow(city, count, status) {
  const color = status === 'planned' ? 'var(--grigio-medio)' : 'var(--verde-racing)';
  const badge = status === 'planned' ? 'Planned' : 'Active';
  return `<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-sm) 0;border-bottom:1px solid var(--grigio-scuro)">
    <span class="mn-body">${city}</span>
    <div style="display:flex;align-items:center;gap:var(--space-sm)">
      <span class="mn-micro" style="color:${color}">${badge}</span>
      <span class="mn-label" style="color:var(--mn-accent)">${count}</span>
    </div>
  </div>`;
}

function statRow(label, value) {
  return `<div style="display:flex;justify-content:space-between;padding:var(--space-sm) 0;border-bottom:1px solid var(--grigio-scuro)">
    <span class="mn-micro">${label}</span>
    <span class="mn-label" style="color:var(--mn-accent)">${value}</span>
  </div>`;
}
