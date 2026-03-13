const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const STAFF = [
  { name: 'Dr. Lucia Rinaldi', role: 'Therapist', fte: [0.8, 1.0, 1.2, 1.0, 0.6, 0.4] },
  { name: 'Elia Ferri', role: 'Coordinator', fte: [0.5, 0.7, 0.8, 0.9, 1.0, 1.1] },
  { name: 'Sofia Greco', role: 'Researcher', fte: [0.3, 0.4, 0.6, 0.8, 0.9, 0.7] },
  { name: 'Marco Verdi', role: 'Therapist', fte: [1.0, 0.9, 0.8, 0.7, 0.5, 0.0] },
  { name: 'Sara Moretti', role: 'Volunteer', fte: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0] },
  { name: 'Andrea Ricci', role: 'Data Analyst', fte: [0.6, 0.6, 0.7, 0.7, 0.8, 0.8] },
  { name: 'Elena Russo', role: 'Therapist', fte: [0.9, 1.0, 1.1, 1.2, 0.8, 0.5] },
  { name: 'Paolo Gallo', role: 'Fundraiser', fte: [0.4, 0.3, 0.5, 0.4, 0.6, 0.7] },
];
const IMPACT = {
  summary: [{ text: '2 IDLE', border: 'var(--mn-accent)' }, { text: '1 OVER-ALLOCATED', border: 'var(--rosso-corsa)' }, { text: '3 GAPS', border: 'var(--mn-accent)' }],
  talents: [
    { name: 'Dr. Rossi', role: 'Therapist · T3', allocation: 0.70, delta: 0.40 },
    { name: 'Dr. Bianchi', role: 'Coordinator · C2', allocation: 0.88, delta: 0.18 },
    { name: 'Dr. Verdi', role: 'Therapist · T4', allocation: 1.12, delta: 0.26 },
    { name: 'Dr. Conti', role: 'Speech Therapist · S1', allocation: 0.82, delta: 0.32 },
    { name: 'Dr. Moretti', role: 'Researcher · R2', allocation: 1.06, delta: 0.16 },
  ],
  alert: 'Therapist · T4: 0.50 FTE needed — consider backfill',
};

export function createHeatmapSection() {
  const section = document.createElement('section');
  section.id = 'heatmap';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <style>
      #heatmap .mn-impact-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--space-md);margin-bottom:var(--space-lg)}
      #heatmap .mn-impact-summary__card{padding:var(--space-lg);border:1px solid var(--grigio-scuro);border-radius:18px;background:rgba(255,255,255,.02);font:700 var(--text-caption)/1.1 var(--font-display);letter-spacing:.08em;text-transform:uppercase}
      #heatmap .mn-impact-list{display:grid;gap:var(--space-sm)}
      #heatmap .mn-impact-row{display:grid;grid-template-columns:minmax(180px,1.4fr) minmax(160px,1fr) auto;gap:var(--space-md);align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08)}
      #heatmap .mn-impact-track{height:10px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}#heatmap .mn-impact-track span{display:block;height:100%;border-radius:999px}
      #heatmap .mn-impact-alert{margin-top:var(--space-lg);padding:var(--space-md) var(--space-lg);border-left:3px solid var(--mn-accent);border-radius:16px;background:rgba(255,199,44,.08)}
    </style>
    <div class="mn-container">
      <p class="mn-section-number">12 — Resource Heatmap</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-sm)">Resource Heatmaps</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">Capacity grid and staffing impact simulation built with FightTheStroke therapy foundation data.</p>
      <h3 class="mn-title-sub" style="margin-bottom:var(--space-md)">Capacity Grid</h3>
      <div style="margin-bottom:var(--space-2xl);position:relative;overflow-x:auto">${buildCapacityGrid()}</div>
      <div class="mn-divider-gold" style="margin-bottom:var(--space-2xl)"></div>
      <h3 class="mn-title-sub" style="margin-bottom:var(--space-md)">Impact Heatmap with Staffing</h3>
      ${buildImpactSimulation()}
    </div>`;
  requestAnimationFrame(() => initHeatmap(section));
  return section;
}

function buildCapacityGrid() {
  const head = MONTHS.map((month) => `<div class="mn-cap-grid__month">${month} 2026</div>`).join('');
  const rows = STAFF.map((person) => `<div class="mn-cap-grid__label"><span class="mn-cap-grid__label-role">${person.name}</span><span class="mn-micro" style="color:var(--grigio-medio)">${person.role}</span></div>${person.fte.map((fte, index) => `<div class="mn-cap-grid__cell mn-cap-grid__cell--${fteLevel(fte)}" data-mn-tip="${person.name} — ${MONTHS[index]} · ${fte.toFixed(1)} FTE">${fte > 0 ? fte.toFixed(1) : ''}</div>`).join('')}`).join('');
  return `<div class="mn-cap-heatmap"><div class="mn-cap-heatmap__header"><div class="mn-cap-heatmap__title">Capacity Grid — Apr–Sep 2026</div><div class="mn-cap-heatmap__legend"><span class="mn-micro" style="color:var(--grigio-chiaro)">FTE Load:</span><span class="mn-cap-heatmap__legend-bar mn-cap-grid__cell--empty"></span> 0 <span class="mn-cap-heatmap__legend-bar mn-cap-grid__cell--low"></span> &lt;0.5 <span class="mn-cap-heatmap__legend-bar mn-cap-grid__cell--mid"></span> 0.5–0.8 <span class="mn-cap-heatmap__legend-bar mn-cap-grid__cell--high"></span> 0.8–1.0 <span class="mn-cap-heatmap__legend-bar mn-cap-grid__cell--over"></span> &gt;1.0</div></div><div class="mn-cap-grid" style="grid-template-columns:180px repeat(${MONTHS.length},1fr)"><div class="mn-cap-grid__corner">Talent</div>${head}${rows}</div><div class="mn-cap-tooltip" id="mn-cap-tip"></div></div>`;
}

function buildImpactSimulation() {
  const cards = IMPACT.summary.map((card) => `<div class="mn-impact-summary__card" style="border-color:${card.border};color:${card.border === 'var(--rosso-corsa)' ? 'var(--bianco-caldo)' : 'var(--mn-accent)'}">${card.text}</div>`).join('');
  const rows = IMPACT.talents.map((talent) => {
    const tone = talent.allocation > 1 ? 'var(--rosso-corsa)' : 'var(--verde-racing)';
    const delta = `${talent.delta >= 0 ? '+' : ''}${talent.delta.toFixed(2)}`;
    return `<div class="mn-impact-row"><div><strong>${talent.name}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${talent.role}</div></div><div class="mn-impact-track"><span style="width:${Math.min(talent.allocation / 1.2 * 100, 100)}%;background:${tone}"></span></div><div style="font-variant-numeric:tabular-nums;text-align:right">${talent.allocation.toFixed(2)} <span style="color:${tone}">${delta}</span></div></div>`;
  }).join('');
  return `<div class="mn-card-dark" style="padding:var(--space-xl)"><div class="mn-impact-summary">${cards}</div><div class="mn-impact-list">${rows}</div><div class="mn-impact-alert"><div class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-xs)">Staffing gaps alert</div><div class="mn-body" style="margin:0">${IMPACT.alert}</div></div></div>`;
}

function fteLevel(value) { return value === 0 ? 'empty' : value < 0.5 ? 'low' : value <= 0.8 ? 'mid' : value <= 1.0 ? 'high' : 'over'; }
function initHeatmap(section) {
  const tip = section.querySelector('#mn-cap-tip');
  if (!tip) return;
  let selectedCell = null;
  section.querySelectorAll('[data-mn-tip]').forEach((cell) => {
    cell.style.cursor = 'pointer';
    cell.style.transition = 'outline .15s, transform .1s';
    cell.addEventListener('mouseenter', (event) => {
      tip.textContent = event.currentTarget.dataset.mnTip;
      tip.classList.add('mn-cap-tooltip--visible');
      const rect = event.currentTarget.getBoundingClientRect();
      const host = section.getBoundingClientRect();
      tip.style.left = `${rect.left - host.left + rect.width / 2}px`;
      tip.style.top = `${rect.top - host.top - 32}px`;
    });
    cell.addEventListener('mouseleave', () => tip.classList.remove('mn-cap-tooltip--visible'));
    cell.addEventListener('click', () => {
      if (selectedCell) Object.assign(selectedCell.style, { outline: '', outlineOffset: '', transform: '', zIndex: '' });
      selectedCell = cell;
      Object.assign(cell.style, { outline: '2px solid var(--mn-accent, #FFC72C)', outlineOffset: '-2px', transform: 'scale(1.03)', zIndex: '1' });
    });
  });
}
