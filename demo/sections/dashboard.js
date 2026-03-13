const SPARKS = [
  { id: 'engagements', label: 'Engagements trend', color: '#FFC72C', data: [32, 34, 35, 38, 40, 39, 42, 44, 45, 47] },
  { id: 'fte', label: 'FTE trend', color: '#00A651', data: [8.8, 9.1, 9.5, 9.8, 10.2, 10.6, 10.9, 11.3, 11.8, 12.4] },
];

export function createDashboardSection() {
  const section = document.createElement('section');
  section.id = 'dashboard';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">04 — Dashboard</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-sm)">Dashboard Strip</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        KPI stat cards, live telemetry, and a sortable therapy portfolio view built with FightTheStroke demo data.
      </p>
      ${livePanel()}
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:var(--space-md);margin:var(--space-2xl) 0 var(--space-xl)">
        <div>
          <h3 class="mn-title-sub">FightTheStroke Portfolio Desk</h3>
          <p class="mn-micro" style="color:var(--grigio-medio)">Foundation overview · March 2026</p>
        </div>
        <div style="display:flex;gap:var(--space-sm)">
          <button class="mn-btn mn-btn--ghost-light mn-btn--sm">Export</button>
          <button class="mn-btn mn-btn--accent mn-btn--sm">+ Program</button>
        </div>
      </div>
      <div class="mn-grid-4" style="margin-bottom:var(--space-xl)">
        ${statCard('47', 'Programs', '+18%', 'up', '#FFC72C')}
        ${statCard('12.4', 'FTE', '+6%', 'up', '#00A651')}
        ${statCard('92%', 'Quality', '+3%', 'up', '#4EA8DE')}
        ${statCard('3', 'At Risk', '-1', 'down', '#DC0000')}
      </div>
      <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-xl)">
        <span class="mn-tag mn-tag--light mn-tag--active">All (47)</span>
        <span class="mn-tag mn-tag--light">Active (32)</span>
        <span class="mn-tag mn-tag--light">Assessment (7)</span>
        <span class="mn-tag mn-tag--light">Planned (5)</span>
        <span class="mn-tag mn-tag--light">At Risk (3)</span>
      </div>
      <div class="mn-card-dark" style="padding:0;overflow:hidden;margin-bottom:var(--space-xl)">
        <div class="mn-table-wrap">
          <table class="mn-table">
            <thead>
              <tr><th>ID</th><th>Program</th><th>Track</th><th>Owner</th><th>Status</th><th>Quality</th><th>FTE</th></tr>
            </thead>
            <tbody>
              ${tableRow('#66464', 'Milano Therapy Hub', 'Motor rehab', 'Dr. Lucia Rinaldi', 'active', 'Active', 92, 'mn-progress__fill--green', 2.4)}
              ${tableRow('#68210', 'Torino Assessment Lab', 'Speech', 'Elia Ferri', 'warning', 'At Risk', 58, 'mn-progress__fill--yellow', 3.0)}
              ${tableRow('#71055', 'Roma Research Mesh', 'Neuro data', 'Sofia Greco', 'active', 'Active', 85, 'mn-progress__fill--green', 1.5)}
              ${tableRow('#72340', 'Firenze Family Studio', 'Caregiver support', 'Marta Leone', 'danger', 'Blocked', 32, 'mn-progress__fill--red', 2.0)}
              ${tableRow('#73890', 'Bologna Outreach Route', 'Community care', 'Paolo Ricci', 'info', 'Planning', 45, 'mn-progress__fill--blue', 1.0)}
            </tbody>
          </table>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:var(--space-md);flex-wrap:wrap">
        <span class="mn-micro" style="color:var(--grigio-medio)">Showing 5 of 47 programs</span>
        <div style="display:flex;gap:var(--space-xs)">
          <button class="mn-dot mn-dot--active" aria-label="Page 1"></button>
          <button class="mn-dot" aria-label="Page 2"></button>
          <button class="mn-dot" aria-label="Page 3"></button>
          <button class="mn-dot" aria-label="Page 4"></button>
        </div>
      </div>
    </div>
  `;
  requestAnimationFrame(() => initDashboard(section));
  return section;
}

function livePanel() {
  return `
    <div class="mn-card-dark" style="padding:var(--space-lg);display:flex;gap:var(--space-xl);align-items:center;justify-content:space-between;flex-wrap:wrap">
      <div style="display:grid;gap:var(--space-sm);min-width:220px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:max-content;padding:6px 12px;border:1px solid var(--mn-accent);border-radius:999px;color:var(--mn-accent);font:600 var(--text-micro)/1 var(--font-display);letter-spacing:.08em;text-transform:uppercase">Mode: Active</span>
        <div style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;line-height:1;color:var(--bianco-caldo)">47 <span style="font-size:var(--text-caption);color:var(--grigio-chiaro)">programs</span></div>
        <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;color:var(--grigio-chiaro)">
          <span class="mn-label" style="color:var(--mn-accent)">Pipeline: Healthy</span>
          <span class="mn-micro">12.4 FTE</span>
        </div>
      </div>
      <div style="display:flex;gap:var(--space-lg);flex:1 1 320px;flex-wrap:wrap">
        ${SPARKS.map((spark) => `
          <div style="flex:1 1 180px;min-width:180px">
            <div class="mn-micro" style="color:var(--grigio-medio);margin-bottom:var(--space-xs)">${spark.label}</div>
            <canvas id="dashboard-spark-${spark.id}" style="width:100%;height:52px;display:block"></canvas>
          </div>`).join('')}
      </div>
      <div style="display:grid;gap:var(--space-xs);text-align:right;min-width:140px">
        <div style="font-family:var(--font-display);font-size:clamp(1.25rem,3vw,2rem);letter-spacing:.08em">10:10 MON 25</div>
        <div class="mn-label" style="color:var(--verde-racing)">92% Quality Score</div>
        <div class="mn-micro" style="color:var(--mn-accent)">3 at risk</div>
      </div>
    </div>`;
}

function initDashboard(section) {
  const charts = window.Maranello?.charts;
  if (!charts?.sparkline) return;
  SPARKS.forEach((spark) => {
    const canvas = section.querySelector(`#dashboard-spark-${spark.id}`);
    if (!(canvas instanceof HTMLCanvasElement)) return;
    charts.sparkline(canvas, spark.data, {
      color: spark.color,
      width: canvas.clientWidth || 220,
      height: 52,
      lineWidth: 2,
      fillOpacity: 0.18,
    });
  });
}

function statCard(value, label, delta, dir, accentColor) {
  const arrow = dir === 'up' ? '▲' : '▼';
  const deltaColor = dir === 'up' ? 'var(--verde-racing)' : 'var(--rosso-corsa)';
  return `
    <div class="mn-card-dark mn-stat" style="padding:var(--space-xl);text-align:center;border-top:3px solid ${accentColor}">
      <div class="mn-stat__value" style="font-size:2rem;color:${accentColor}">${value}</div>
      <div class="mn-stat__label" style="margin:var(--space-xs) 0">${label}</div>
      <div class="mn-stat__delta" style="color:${deltaColor};font-size:.75rem;font-variant-numeric:tabular-nums">${arrow} ${delta}</div>
    </div>`;
}

function tableRow(id, name, track, owner, statusKey, statusLabel, quality, fillClass, fte) {
  return `<tr>
    <td class="mn-table__cell-id">${id}</td>
    <td class="mn-table__cell-primary"><strong>${name}</strong></td>
    <td><span class="mn-tag mn-tag--light mn-tag--xs">${track}</span></td>
    <td class="mn-table__cell-secondary">${owner}</td>
    <td><span class="mn-status mn-status--${statusKey}"><span class="mn-status__dot"></span> ${statusLabel}</span></td>
    <td><div style="display:flex;align-items:center;gap:var(--space-xs)"><div class="mn-progress" style="width:60px"><div class="mn-progress__fill ${fillClass}" style="width:${quality}%"></div></div><span class="mn-micro" style="color:var(--grigio-medio)">${quality}%</span></div></td>
    <td class="mn-table__cell-value">${fte}</td>
  </tr>`;
}
