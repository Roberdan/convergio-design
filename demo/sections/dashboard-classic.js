export function createDashboardClassicSection() {
  const section = document.createElement('section');
  section.id = 'dashboard-classic';
  section.className = 'mn-section-dark';

  const colors = {
    success: token('--mn-success', '#00A651'),
    accent: token('--mn-accent', '#FFC72C'),
    info: token('--mn-info', '#448AFF'),
    danger: token('--mn-error', '#DC0000'),
  };

  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">04B — Dashboard Classic</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-sm)">Dashboard Prototype</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">All components assembled. A complete dashboard composition view.</p>
      <div class="mn-flex-between mn-flex-wrap mn-gap-md" style="margin-bottom:var(--space-2xl)">
        <div><h3 class="mn-title-sub">EMEA Studio 3</h3><p class="mn-micro" style="color:var(--mn-text-muted)">Portfolio Overview · March 2026</p></div>
        <div class="mn-flex-center mn-gap-md">
          <div class="mn-input-group" style="max-width:280px"><input class="mn-input" type="text" placeholder="Search..." style="padding:8px 12px;font-size:0.8rem"><button class="mn-btn mn-btn--accent mn-btn--sm" style="padding:8px 16px">Go</button></div>
          <button class="mn-btn mn-btn--ghost-light mn-btn--sm">Export</button>
        </div>
      </div>
      <div class="mn-tag-group" style="margin-bottom:var(--space-2xl)">
        <span class="mn-tag mn-tag--light mn-tag--active">All (47)</span>
        <span class="mn-tag mn-tag--light">Active (32)</span>
        <span class="mn-tag mn-tag--light">Planning (8)</span>
        <span class="mn-tag mn-tag--light">At Risk (5)</span>
        <span class="mn-tag mn-tag--light">Completed (2)</span>
      </div>
      <div class="mn-grid-4" style="margin-bottom:var(--space-2xl)">
        ${gaugeCard('Utilization', utilizationGauge(colors))}
        ${gaugeCard('6Q Score', scoreGauge(colors))}
        ${gaugeCard('On Track', trackGauge(colors))}
        <div class="mn-card-dark" style="border-radius:var(--radius-lg)"><div class="mn-stat" style="padding:var(--space-xl);text-align:center"><div class="mn-stat__value" style="font-size:2.5rem">47</div><div class="mn-stat__unit">engagements</div><div class="mn-flex-center mn-gap-sm" style="margin-top:var(--space-md)"><span class="mn-status mn-status--active mn-status--sm"><span class="mn-status__dot"></span> 32</span><span class="mn-status mn-status--warning mn-status--sm"><span class="mn-status__dot"></span> 5</span><span class="mn-status mn-status--info mn-status--sm"><span class="mn-status__dot"></span> 8</span></div></div></div>
      </div>
      <div class="mn-card-dark" style="padding:0;overflow:hidden"><div class="mn-table-wrap"><table class="mn-table"><thead><tr><th>ID</th><th>Engagement</th><th>Type</th><th>Owner</th><th>Status</th><th>Quality</th><th>FTE</th></tr></thead><tbody>
        ${row('#66464', 'Contoso Cloud Native', 'MVP', 'M. Rossi', 'active', 'Active', 92, 'mn-progress__fill--green', '2.4')}
        ${row('#68210', 'Fabrikam AI Copilot', 'MVE', 'J. Smith', 'warning', 'At Risk', 58, 'mn-progress__fill--yellow', '3.0')}
        ${row('#71055', 'Northwind Data Platform', 'TECH ADV', 'A. Kumar', 'active', 'Active', 85, 'mn-progress__fill--green', '1.5')}
        ${row('#72340', 'Adventure Works IoT', 'MVP', 'Y. Tanaka', 'danger', 'Blocked', 32, 'mn-progress__fill--red', '2.0')}
        ${row('#73890', 'Wide World Sustainability', 'ARCH REV', 'L. Chen', 'info', 'Planning', 45, 'mn-progress__fill--yellow', '1.0')}
        ${row('#74112', 'Alpine Retail Modernization', 'MVP', 'R. Costa', 'active', 'Active', 88, 'mn-progress__fill--green', '2.8')}
      </tbody></table></div></div>
    </div>
  `;

  requestAnimationFrame(() => {
    const M = window.Maranello;
    if (M?.initGauges) M.initGauges(section);
    else if (M?.createGaugesInContainer) M.createGaugesInContainer(section);
  });
  return section;
}

function token(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function gaugeCard(label, config) {
  return `<div class="mn-card-dark mn-flex-center" style="border-radius:var(--radius-lg)"><div class="mn-gauge" style="padding:var(--space-md)"><div class="mn-gauge__instrument mn-gauge__instrument--sm" style="width:150px;height:150px;padding:6px"><div class="mn-gauge__dial"><canvas class="mn-gauge__canvas" data-gauge='${JSON.stringify(config)}'></canvas><div class="mn-gauge__glass"></div></div></div><span class="mn-gauge__label">${label}</span></div></div>`;
}

function row(id, engagement, type, owner, statusTone, status, quality, fillClass, fte) {
  return `<tr><td class="mn-table__cell-id">${id}</td><td class="mn-table__cell-primary"><strong>${engagement}</strong></td><td><span class="mn-tag mn-tag--light mn-tag--xs">${type}</span></td><td class="mn-table__cell-secondary">${owner}</td><td><span class="mn-status mn-status--${statusTone}"><span class="mn-status__dot"></span> ${status}</span></td><td><div class="mn-flex-center mn-gap-xs"><div class="mn-progress" style="width:60px"><div class="mn-progress__fill ${fillClass}" style="width:${quality}%"></div></div><span class="mn-micro" style="color:var(--mn-text-muted)">${quality}%</span></div></td><td class="mn-table__cell-value">${fte}</td></tr>`;
}

function utilizationGauge(colors) {
  return { value: 87, max: 100, color: colors.success, ticks: 10, subticks: 5, startAngle: -225, endAngle: 45, showNeedle: true, numbers: [0, 25, 50, 75, 100], complications: { centerValue: '87', centerUnit: '%', statusLed: { color: colors.success, label: 'OK' }, trend: { direction: 'up', delta: '+2', color: colors.success } } };
}

function scoreGauge(colors) {
  return { value: 65, max: 100, color: colors.accent, ticks: 10, subticks: 5, startAngle: -225, endAngle: 45, showNeedle: true, numbers: [0, 25, 50, 75, 100], complications: { centerValue: '65', centerUnit: '%', statusLed: { color: colors.accent, label: 'WARN' }, innerRing: { value: 58, max: 100, color: colors.danger, label: 'KPI' } } };
}

function trackGauge(colors) {
  return { value: 85, max: 100, color: colors.info, ticks: 10, subticks: 5, startAngle: -225, endAngle: 45, showNeedle: true, numbers: [0, 25, 50, 75, 100], complications: { centerValue: '85', centerUnit: '%', statusLed: { color: colors.info, label: 'TRACK' }, trend: { direction: 'up', delta: '+7', color: colors.success } } };
}
