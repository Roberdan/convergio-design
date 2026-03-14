/**
 * Telemetry section — service monitoring with speedometers + signal panel.
 */
const SERVICES = [
  { name: 'Gateway', detail: '212 ms p95 latency', tone: 'green' },
  { name: 'Model Router', detail: '2797 routed req/sec', tone: 'green' },
  { name: 'Vector Store', detail: '57% vector cache pressure', tone: 'green' },
  { name: 'Inference Queue', detail: '258 token windows active', tone: 'green' },
  { name: 'Eval Service', detail: '1.5% failed evals', tone: 'green' },
  { name: 'Budget Sentinel', detail: 'Night digest idle', tone: 'off' },
];

export function createTelemetrySection() {
  const section = document.createElement('section');
  section.id = 'telemetry';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">09B — Live Telemetry</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-sm)">Telemetry Deck</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Unified monitoring for agent orchestration, token routing, and inference pipelines.
      </p>

      <div style="display:flex;flex-wrap:wrap;gap:var(--space-lg);margin-bottom:var(--space-2xl)">
        ${speedo('tel-s1', 'API Latency', '182 ms')}
        ${speedo('tel-s2', 'Throughput', '2.8k req/s')}
        ${speedo('tel-s3', 'GPU Usage', '68%')}
        ${speedo('tel-s4', 'Error Rate', '1.4%')}
      </div>

      <div class="mn-signal-panel" style="padding:var(--space-xl)">
        <p class="mn-micro" style="color:var(--mn-accent);letter-spacing:0.1em;margin-bottom:var(--space-xs)">SIGNAL PANEL</p>
        <h3 class="mn-label" style="margin-bottom:var(--space-md)">Service Readiness</h3>
        ${SERVICES.map(s => serviceRow(s)).join('')}
      </div>
    </div>
  `;

  setTimeout(() => initTelemetry(section), 300);
  return section;
}

function speedo(id, label, fallbackVal) {
  return `<div class="mn-card-dark" style="padding:var(--space-lg);text-align:center;flex:1 1 160px;min-width:160px">
    <p class="mn-label" style="margin-bottom:var(--space-sm)">${label}</p>
    <canvas id="${id}" width="140" height="140" style="width:140px;height:140px"></canvas>
    <p class="mn-micro" id="${id}-val" style="color:var(--mn-accent);margin-top:var(--space-xs)">${fallbackVal}</p>
  </div>`;
}

function serviceRow(s) {
  const color = s.tone === 'green' ? '#00A651' : s.tone === 'amber' ? '#FFC72C' : s.tone === 'red' ? '#DC0000' : 'var(--grigio-scuro)';
  return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid rgba(255,255,255,0.06)">
    <div style="display:flex;align-items:center;gap:var(--space-sm)">
      <span style="width:10px;height:10px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color}60;flex-shrink:0"></span>
      <div>
        <span class="mn-label">${s.name}</span>
        <div class="mn-micro" style="color:var(--grigio-medio)">${s.detail}</div>
      </div>
    </div>
    <span class="mn-micro" style="color:var(--grigio-chiaro);text-transform:uppercase;letter-spacing:0.08em">${s.tone === 'off' ? 'IDLE' : s.tone.toUpperCase()}</span>
  </div>`;
}

function initTelemetry(section) {
  const M = window.Maranello;
  if (!M?.speedometer) return;

  const configs = [
    { id: 'tel-s1', value: 182, max: 400, unit: 'ms', color: '#FFC72C', ticks: [0, 100, 200, 300, 400], label: 'Gateway p95' },
    { id: 'tel-s2', value: 2840, max: 4000, unit: 'req/s', color: '#00A651', ticks: [0, 1000, 2000, 3000, 4000], label: 'Pipeline' },
    { id: 'tel-s3', value: 68, max: 100, unit: '%', color: '#4EA8DE', ticks: [0, 25, 50, 75, 100], label: 'Workers' },
    { id: 'tel-s4', value: 1.4, max: 5, unit: '%', color: '#DC0000', ticks: [0, 1, 2, 3, 4, 5], label: 'Router' },
  ];

  configs.forEach(c => {
    const canvas = section.querySelector('#' + c.id);
    if (canvas) {
      M.speedometer(canvas, {
        value: c.value, max: c.max, unit: c.unit, size: 'sm',
        ticks: c.ticks, arcColor: c.color, needleColor: c.color,
        subLabel: c.label, animate: true,
      });
    }
  });
}
