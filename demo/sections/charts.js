/**
 * Charts section — sparkline, donut, bar, area, gauge, gantt showcase
 */
export function createChartsSection() {
  const section = document.createElement('section');
  section.id = 'charts';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">03 — Data Visualization</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-2xl)">Charts & Gauges</h2>

      <div class="mn-grid-3" style="margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Monthly Donations</h4>
          <mn-chart type="sparkline" width="280" height="80"
            data='[120,145,132,178,195,210,188,225,247,260,238,275]'>
          </mn-chart>
          <p class="mn-micro" style="margin-top:var(--space-sm);color:var(--verde-racing)">+12.3% trend</p>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Program Distribution</h4>
          <mn-chart type="donut" width="180" height="180"
            data='[{"label":"Therapy","value":45,"color":"#FFC72C"},{"label":"Research","value":25,"color":"#4EA8DE"},{"label":"Community","value":20,"color":"#00A651"},{"label":"Admin","value":10,"color":"#616161"}]'>
          </mn-chart>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Regional Donations</h4>
          <mn-chart type="barChart" width="280" height="140"
            data='[{"label":"Lombardia","value":420},{"label":"Lazio","value":310},{"label":"Toscana","value":280},{"label":"Veneto","value":195},{"label":"Piemonte","value":165}]'>
          </mn-chart>
        </div>
      </div>

      <div class="mn-grid-2" style="margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Donations vs Expenses (12 months)</h4>
          <mn-chart type="areaChart" width="440" height="200"
            data='[{"label":"Donations","color":"#FFC72C","values":[120,145,132,178,195,210,188,225,247,260,238,275]},{"label":"Expenses","color":"#DC0000","values":[95,110,125,130,140,155,145,160,170,175,165,180]}]'>
          </mn-chart>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Program Effectiveness</h4>
          <mn-chart type="radar" width="300" height="260"
            data='[{"label":"Mobility","value":85},{"label":"Speech","value":72},{"label":"Cognition","value":68},{"label":"Social","value":90},{"label":"Motor","value":78},{"label":"Emotional","value":82}]'>
          </mn-chart>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Ferrari Gauges</h3>
      <div style="display:flex;gap:var(--space-2xl);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-2xl)">
        <div style="text-align:center">
          <mn-gauge value="73" max="100" unit="%" label="Goal Progress" size="md"></mn-gauge>
        </div>
        <div style="text-align:center">
          <mn-gauge value="312" max="500" unit="" label="Volunteers" size="md"></mn-gauge>
        </div>
        <div style="text-align:center">
          <mn-gauge value="87" max="100" unit="%" label="Satisfaction" size="md"></mn-gauge>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Gantt Timeline</h3>
      <div class="mn-card-dark" style="padding:var(--space-lg)">
        <mn-gantt tasks='${ganttData()}'></mn-gantt>
      </div>
    </div>
  `;
  return section;
}

function ganttData() {
  const base = '2026-';
  const tasks = [
    { id: 'g1', name: 'Spring Therapy Program', start: base+'03-01', end: base+'05-31', progress: 65, color: '#FFC72C' },
    { id: 'g2', name: 'Volunteer Recruitment', start: base+'02-15', end: base+'04-15', progress: 80, color: '#4EA8DE' },
    { id: 'g3', name: 'Research Phase 2', start: base+'04-01', end: base+'07-31', progress: 30, color: '#00A651' },
    { id: 'g4', name: 'Annual Fundraiser', start: base+'06-01', end: base+'06-30', progress: 10, color: '#DC0000' },
    { id: 'g5', name: 'Tech4Good Pilot', start: base+'05-01', end: base+'08-31', progress: 15, color: '#D4622B' },
    { id: 'g6', name: 'Family Camp 2026', start: base+'07-15', end: base+'08-15', progress: 5, color: '#8B5CF6' }
  ];
  return JSON.stringify(tasks).replace(/'/g, '&#39;');
}
