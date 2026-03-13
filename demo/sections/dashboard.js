/**
 * Dashboard section — KPI stat cards strip + engagement data table
 */
export function createDashboardSection() {
  const section = document.createElement('section');
  section.id = 'dashboard';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">04 — Dashboard</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-sm)">Dashboard Strip</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        KPI stat cards with delta indicators, filter tags, and a sortable engagement table.
        All data is fictional FightTheStroke portfolio data.
      </p>

      <!-- Header bar -->
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:var(--space-md);margin-bottom:var(--space-xl)">
        <div>
          <h3 class="mn-title-sub">EMEA Studio 3</h3>
          <p class="mn-micro" style="color:var(--grigio-medio)">Portfolio Overview · March 2026</p>
        </div>
        <div style="display:flex;gap:var(--space-sm)">
          <button class="mn-btn mn-btn--ghost-light mn-btn--sm">Export</button>
          <button class="mn-btn mn-btn--accent mn-btn--sm">+ New</button>
        </div>
      </div>

      <!-- KPI stat cards -->
      <div class="mn-grid-4" style="margin-bottom:var(--space-xl)">
        ${statCard('47', 'Programs', '+18%', 'up', '#FFC72C')}
        ${statCard('124', 'FTE', '+6%', 'up', '#00A651')}
        ${statCard('92%', 'Quality', '+3%', 'up', '#4EA8DE')}
        ${statCard('€2.4M', 'Pipeline', '-5%', 'down', '#DC0000')}
      </div>

      <!-- Filter tags -->
      <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-xl)">
        <span class="mn-tag mn-tag--light mn-tag--active">All (47)</span>
        <span class="mn-tag mn-tag--light">Active (32)</span>
        <span class="mn-tag mn-tag--light">Planning (8)</span>
        <span class="mn-tag mn-tag--light">At Risk (5)</span>
        <span class="mn-tag mn-tag--light">Completed (2)</span>
      </div>

      <!-- Engagement table -->
      <div class="mn-card-dark" style="padding:0;overflow:hidden;margin-bottom:var(--space-xl)">
        <div class="mn-table-wrap">
          <table class="mn-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Engagement</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Quality</th>
                <th>FTE</th>
              </tr>
            </thead>
            <tbody>
              ${tableRow('#66464','Milano Therapy Hub','MVP','M. Rossi','active','Active',92,'mn-progress__fill--green',2.4)}
              ${tableRow('#68210','Torino Early Intervention','MVE','J. Smith','warning','At Risk',58,'mn-progress__fill--yellow',3.0)}
              ${tableRow('#71055','Roma Data Platform','TECH ADV','A. Kumar','active','Active',85,'mn-progress__fill--green',1.5)}
              ${tableRow('#72340','Firenze Rehab Center','MVP','Y. Tanaka','danger','Blocked',32,'mn-progress__fill--red',2.0)}
              ${tableRow('#73890','Bologna Outreach Program','ARCH REV','L. Chen','info','Planning',45,'mn-progress__fill--blue',1.0)}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="mn-micro" style="color:var(--grigio-medio)">Showing 5 of 47 engagements</span>
        <div style="display:flex;gap:var(--space-xs)">
          <button class="mn-dot mn-dot--active" aria-label="Page 1"></button>
          <button class="mn-dot" aria-label="Page 2"></button>
          <button class="mn-dot" aria-label="Page 3"></button>
          <button class="mn-dot" aria-label="Page 4"></button>
        </div>
      </div>
    </div>
  `;
  return section;
}

function statCard(value, label, delta, dir, accentColor) {
  const arrow = dir === 'up' ? '▲' : '▼';
  const deltaColor = dir === 'up' ? 'var(--verde-racing)' : 'var(--rosso-corsa)';
  return `
    <div class="mn-card-dark mn-stat" style="padding:var(--space-xl);text-align:center;border-top:3px solid ${accentColor}">
      <div class="mn-stat__value" style="font-size:2rem;color:${accentColor}">${value}</div>
      <div class="mn-stat__label" style="margin:var(--space-xs) 0">${label}</div>
      <div class="mn-stat__delta" style="color:${deltaColor};font-size:0.75rem;font-variant-numeric:tabular-nums">
        ${arrow} ${delta}
      </div>
    </div>`;
}

function tableRow(id, name, type, owner, statusKey, statusLabel, quality, fillClass, fte) {
  return `<tr>
    <td class="mn-table__cell-id">${id}</td>
    <td class="mn-table__cell-primary"><strong>${name}</strong></td>
    <td><span class="mn-tag mn-tag--light mn-tag--xs">${type}</span></td>
    <td class="mn-table__cell-secondary">${owner}</td>
    <td><span class="mn-status mn-status--${statusKey}"><span class="mn-status__dot"></span> ${statusLabel}</span></td>
    <td>
      <div style="display:flex;align-items:center;gap:var(--space-xs)">
        <div class="mn-progress" style="width:60px">
          <div class="mn-progress__fill ${fillClass}" style="width:${quality}%"></div>
        </div>
        <span class="mn-micro" style="color:var(--grigio-medio)">${quality}%</span>
      </div>
    </td>
    <td class="mn-table__cell-value">${fte}</td>
  </tr>`;
}
