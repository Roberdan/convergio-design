const PAGE_SIZE = 9;
const GROUP_ORDER = ['Active', 'Assessment', 'Planned'];
const COLUMNS = [
  { key: 'program', label: 'Program' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'quality', label: 'Quality' },
  { key: 'impact', label: 'Impact' },
  { key: 'city', label: 'City' },
];
const PROGRAMS = [
  { group: 'Active', program: 'Milano Therapy Sprint', owner: 'Dr. Lucia Rinaldi', role: 'Therapist', status: 'Active', quality: 92, impact: 'High', city: 'Milano' },
  { group: 'Active', program: 'Torino Mobility Lab', owner: 'Elia Ferri', role: 'Coordinator', status: 'At Risk', quality: 67, impact: 'Critical', city: 'Torino' },
  { group: 'Active', program: 'Bologna Outreach Route', owner: 'Paolo Ricci', role: 'Program Lead', status: 'Active', quality: 81, impact: 'Med', city: 'Bologna' },
  { group: 'Active', program: 'Firenze Family Studio', owner: 'Marta Leone', role: 'Care Navigator', status: 'Blocked', quality: 41, impact: 'Critical', city: 'Firenze' },
  { group: 'Assessment', program: 'Roma Intake Atlas', owner: 'Sofia Greco', role: 'Researcher', status: 'Planning', quality: 58, impact: 'Med', city: 'Roma' },
  { group: 'Assessment', program: 'Genova Speech Review', owner: 'Giulia Serra', role: 'Speech Therapist', status: 'At Risk', quality: 72, impact: 'High', city: 'Genova' },
  { group: 'Planned', program: 'Padova Remote Bridge', owner: 'Elena Piva', role: 'Telehealth Lead', status: 'Planning', quality: 63, impact: 'Med', city: 'Padova' },
  { group: 'Planned', program: 'Napoli Recovery Mesh', owner: 'Chiara D Amico', role: 'Therapist', status: 'Planning', quality: 76, impact: 'High', city: 'Napoli' },
  { group: 'Planned', program: 'Cagliari Island Pilot', owner: 'Davide Piras', role: 'Coordinator', status: 'Planning', quality: 54, impact: 'Med', city: 'Cagliari' },
  { group: 'Active', program: 'Verona Upper Limb Lab', owner: 'Federica Longhi', role: 'Therapist', status: 'Active', quality: 87, impact: 'High', city: 'Verona' },
  { group: 'Active', program: 'Bari Speech Reset', owner: 'Andrea Valente', role: 'Speech Therapist', status: 'At Risk', quality: 69, impact: 'Critical', city: 'Bari' },
  { group: 'Assessment', program: 'Milano Insight Board', owner: 'Beatrice Rota', role: 'Psychologist', status: 'Planning', quality: 64, impact: 'High', city: 'Milano' },
  { group: 'Planned', program: 'Palermo Home Practice', owner: 'Sara Fontana', role: 'Family Coach', status: 'Planning', quality: 57, impact: 'Med', city: 'Palermo' },
  { group: 'Planned', program: 'Trento Data Checkpoint', owner: 'Lorenzo Sala', role: 'Analyst', status: 'Planning', quality: 71, impact: 'High', city: 'Trento' },
  { group: 'Active', program: 'Como Precision Track', owner: 'Riccardo Villa', role: 'Therapist', status: 'Blocked', quality: 48, impact: 'Critical', city: 'Como' },
  { group: 'Assessment', program: 'Parma Triage Studio', owner: 'Alice Neri', role: 'Care Planner', status: 'At Risk', quality: 74, impact: 'High', city: 'Parma' },
  { group: 'Planned', program: 'Lecce Family Orbit', owner: 'Francesca Greco', role: 'Family Coach', status: 'Planning', quality: 62, impact: 'Med', city: 'Lecce' },
  { group: 'Active', program: 'Aosta Daily Motion', owner: 'Tommaso Galli', role: 'Therapist', status: 'Active', quality: 90, impact: 'High', city: 'Aosta' },
];

export function createTablesSection() {
  const section = document.createElement('section');
  section.id = 'tables';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <style>
      #tables .mn-rich-table__headbtn{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:0;background:none;border:0;color:inherit;font:600 var(--text-caption)/1.2 var(--font-display);text-transform:uppercase;letter-spacing:.06em;cursor:pointer}
      #tables .mn-rich-table__filter{width:100%;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.03);color:var(--bianco-caldo);font-size:var(--text-micro)}
      #tables .mn-rich-table__group td{padding:12px;background:rgba(255,199,44,.08);font:700 var(--text-caption)/1 var(--font-display);letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      #tables .mn-rich-table__row:hover{background:rgba(255,199,44,.08)}
      #tables .mn-rich-table__owner{display:flex;align-items:center;gap:10px}#tables .mn-rich-table__avatar{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:rgba(255,199,44,.16);color:var(--mn-accent);font:700 var(--text-micro)/1 var(--font-display)}
      #tables .mn-rich-table__quality{display:flex;align-items:center;gap:10px}#tables .mn-rich-table__quality .mn-progress{width:72px}
      #tables .mn-rich-table__badge{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border-radius:999px;font-size:var(--text-micro);font-weight:700;text-transform:uppercase}#tables .mn-rich-table__badge--critical{background:rgba(220,0,0,.16);color:#DC0000}#tables .mn-rich-table__badge--high{background:rgba(255,199,44,.18);color:#FFC72C}#tables .mn-rich-table__badge--med{background:rgba(78,168,222,.16);color:#4EA8DE}
      #tables .mn-rich-table__footer{display:flex;justify-content:space-between;align-items:center;gap:var(--space-md);flex-wrap:wrap;margin-top:var(--space-lg)}
    </style>
    <div class="mn-container">
      <p class="mn-section-number">06 — Data Display</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Interactive Therapy Table</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">Column filters, grouped portfolio rows, status LEDs, quality bars, and ownership detail for FightTheStroke programs.</p>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div class="mn-tag-group" style="margin-bottom:var(--space-md)"><span class="mn-tag mn-tag--light mn-tag--xs">Filter every column</span><span class="mn-tag mn-tag--light mn-tag--xs">Sort with header arrows</span><span class="mn-tag mn-tag--light mn-tag--xs">Collapse each group</span></div>
        <div id="therapy-table-host"></div>
      </div>
    </div>`;
  requestAnimationFrame(() => initTable(section));
  return section;
}

function initTable(section) {
  const host = section.querySelector('#therapy-table-host');
  const state = { page: 1, sortKey: 'program', sortDir: 1, filters: Object.fromEntries(COLUMNS.map((col) => [col.key, ''])), collapsed: {} };
  const render = () => {
    const filtered = orderRows(PROGRAMS.filter((row) => COLUMNS.every((col) => String(row[col.key]).toLowerCase().includes(state.filters[col.key]))), state);
    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    state.page = Math.min(state.page, pages);
    const pageRows = filtered.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE);
    host.innerHTML = `<div class="mn-table-wrap"><table class="mn-table"><thead><tr>${COLUMNS.map((col) => `<th><button type="button" class="mn-rich-table__headbtn" data-sort="${col.key}">${col.label}<span>${arrow(col.key, state)}</span></button></th>`).join('')}</tr><tr>${COLUMNS.map((col) => `<th><input class="mn-rich-table__filter" data-filter="${col.key}" value="${esc(state.filters[col.key])}" placeholder="Filter"></th>`).join('')}</tr></thead><tbody>${groupedRows(pageRows, state)}</tbody></table></div><div class="mn-rich-table__footer"><span class="mn-micro" style="color:var(--grigio-chiaro)">Showing ${pageRows.length} of ${filtered.length} programs</span><div class="mn-dots">${Array.from({ length: pages }, (_, index) => `<button class="mn-dot ${index + 1 === state.page ? 'mn-dot--active' : ''}" data-page="${index + 1}" aria-label="Page ${index + 1}"></button>`).join('')}</div></div>`;
    bind(host, state, render);
  };
  render();
}

function bind(host, state, render) {
  host.querySelectorAll('[data-sort]').forEach((btn) => btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-sort');
    state.sortDir = state.sortKey === key ? state.sortDir * -1 : 1;
    state.sortKey = key;
    render();
  }));
  host.querySelectorAll('[data-filter]').forEach((input) => input.addEventListener('input', () => {
    state.filters[input.getAttribute('data-filter')] = input.value.trim().toLowerCase();
    state.page = 1;
    render();
  }));
  host.querySelectorAll('[data-group]').forEach((row) => row.addEventListener('click', () => {
    const group = row.getAttribute('data-group');
    state.collapsed[group] = !state.collapsed[group];
    render();
  }));
  host.querySelectorAll('[data-page]').forEach((btn) => btn.addEventListener('click', () => { state.page = Number(btn.getAttribute('data-page')); render(); }));
}

function groupedRows(rows, state) {
  return GROUP_ORDER.map((group) => {
    const items = rows.filter((row) => row.group === group);
    if (!items.length) return '';
    const open = !state.collapsed[group];
    return `<tr class="mn-rich-table__group" data-group="${group}"><td colspan="${COLUMNS.length}">${open ? '▼' : '▶'} ${group.toUpperCase()} ${items.length}</td></tr>${open ? items.map((row) => `<tr class="mn-rich-table__row"><td><strong>${row.program}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.group}</div></td><td>${ownerCell(row)}</td><td><span class="mn-status mn-status--${statusTone(row.status)}"><span class="mn-status__dot"></span> ${row.status}</span></td><td>${qualityCell(row.quality)}</td><td><span class="mn-rich-table__badge mn-rich-table__badge--${row.impact.toLowerCase()}">${row.impact}</span></td><td>${row.city}</td></tr>`).join('') : ''}`;
  }).join('');
}

function orderRows(rows, state) {
  return GROUP_ORDER.flatMap((group) => rows.filter((row) => row.group === group).sort((a, b) => compare(a[state.sortKey], b[state.sortKey], state.sortDir)));
}
function compare(a, b, dir) { return (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))) * dir; }
function arrow(key, state) { return state.sortKey !== key ? '▲▼' : state.sortDir > 0 ? '▲' : '▼'; }
function ownerCell(row) { return `<div class="mn-rich-table__owner"><span class="mn-rich-table__avatar">${row.owner.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><strong>${row.owner}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.role}</div></div></div>`; }
function qualityCell(value) { return `<div class="mn-rich-table__quality"><div class="mn-progress"><div class="mn-progress__fill ${value >= 85 ? 'mn-progress__fill--green' : value >= 65 ? 'mn-progress__fill--yellow' : 'mn-progress__fill--red'}" style="width:${value}%"></div></div><span class="mn-micro">${value}%</span></div>`; }
function statusTone(status) { return status === 'Active' ? 'active' : status === 'At Risk' ? 'warning' : status === 'Blocked' ? 'danger' : 'info'; }
function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
