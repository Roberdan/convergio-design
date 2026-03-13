const PAGE_SIZE = 5;
const FILTERS = ['All tracks', 'Motor rehab', 'Speech', 'Tele-rehab', 'Family coaching', 'Neuropsychology'];

const PROGRAMS = [
  { center: 'Milano Niguarda', city: 'Milano', program: 'Early motion restart', track: 'Motor rehab', cohort: '0–6 years', status: 'Active', score: 92, lead: 'Alessio Bianchi', review: '2026-04-12', seats: '16 / 18' },
  { center: 'Torino Regina', city: 'Torino', program: 'Speech rebound lab', track: 'Speech', cohort: '7–12 years', status: 'Active', score: 88, lead: 'Giulia Serra', review: '2026-04-15', seats: '11 / 14' },
  { center: 'Bologna Sant’Orsola', city: 'Bologna', program: 'Family resilience sprint', track: 'Family coaching', cohort: 'Caregivers', status: 'At Risk', score: 63, lead: 'Marta Greco', review: '2026-04-17', seats: '9 / 12' },
  { center: 'Roma Gemelli', city: 'Roma', program: 'Tele-rehab bridge', track: 'Tele-rehab', cohort: 'Hybrid care', status: 'Planned', score: 54, lead: 'Paolo Ricci', review: '2026-04-18', seats: '24 / 30' },
  { center: 'Napoli Vomero', city: 'Napoli', program: 'Cognitive recovery lane', track: 'Neuropsychology', cohort: '8–14 years', status: 'Active', score: 81, lead: 'Chiara D’Amico', review: '2026-04-20', seats: '13 / 16' },
  { center: 'Firenze Meyer', city: 'Firenze', program: 'Motor follow-up clinic', track: 'Motor rehab', cohort: '6–10 years', status: 'Completed', score: 96, lead: 'Luca Moretti', review: '2026-04-22', seats: '10 / 10' },
  { center: 'Padova Centro', city: 'Padova', program: 'Speech carryover pods', track: 'Speech', cohort: 'Home practice', status: 'Active', score: 85, lead: 'Elena Piva', review: '2026-04-24', seats: '18 / 20' },
  { center: 'Genova Gaslini', city: 'Genova', program: 'Parent coaching round', track: 'Family coaching', cohort: 'Caregiver lab', status: 'At Risk', score: 59, lead: 'Sara Fontana', review: '2026-04-25', seats: '7 / 12' },
  { center: 'Cagliari Hub', city: 'Cagliari', program: 'Island tele-intake', track: 'Tele-rehab', cohort: 'Remote triage', status: 'Planned', score: 48, lead: 'Davide Piras', review: '2026-04-26', seats: '20 / 28' },
  { center: 'Verona Borgo', city: 'Verona', program: 'Upper-limb boost', track: 'Motor rehab', cohort: '10–16 years', status: 'Active', score: 77, lead: 'Federica Longhi', review: '2026-04-27', seats: '14 / 18' },
  { center: 'Bari Levante', city: 'Bari', program: 'Speech + swallow recovery', track: 'Speech', cohort: 'Intensive block', status: 'Warning', score: 69, lead: 'Andrea Valente', review: '2026-04-29', seats: '8 / 12' },
  { center: 'Milano Niguarda', city: 'Milano', program: 'Executive function studio', track: 'Neuropsychology', cohort: '12–16 years', status: 'Active', score: 83, lead: 'Beatrice Rota', review: '2026-05-02', seats: '15 / 18' },
];

const COLUMNS = [
  { key: 'center', label: 'Center', sortable: true, render: (_, row) => `<div><strong>${row.center}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.city}</div></div>`, type: 'custom' },
  { key: 'program', label: 'Program', sortable: true, render: (_, row) => `<div><strong>${row.program}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.track} · ${row.cohort}</div></div>`, type: 'custom' },
  { key: 'status', label: 'Status', sortable: true, type: 'status', align: 'center' },
  { key: 'score', label: 'Score', sortable: true, type: 'progress' },
  { key: 'lead', label: 'Lead therapist', sortable: true, type: 'person' },
  { key: 'review', label: 'Next review', sortable: true, type: 'date' },
];

/**
 * Tables section — interactive therapy program table showcase.
 */
export function createTablesSection() {
  const section = document.createElement('section');
  section.id = 'tables';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <style>
      #tables .mn-table-toolbar{display:flex;justify-content:space-between;gap:var(--space-md);align-items:flex-end;flex-wrap:wrap;margin-bottom:var(--space-lg)}
      #tables .mn-table-footer{display:flex;justify-content:space-between;gap:var(--space-md);align-items:center;flex-wrap:wrap;margin-top:var(--space-lg)}
      #tables .mn-table--compact th,#tables .mn-table--compact td{padding:8px 12px;font-size:var(--text-micro)}
      #tables .mn-table-compact-note{display:flex;justify-content:space-between;gap:var(--space-md);align-items:center;flex-wrap:wrap;margin-bottom:var(--space-md)}
    </style>
    <div class="mn-container">
      <p class="mn-section-number">06 — Data Display</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Interactive Therapy Table</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Sortable therapy program data for FightTheStroke centers, with a thematic filter, status LEDs, inline score bars, and row-level interaction.
      </p>

      <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
        <div class="mn-table-toolbar">
          <div>
            <div class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-xs)">Program focus</div>
            <select id="therapy-filter" class="mn-form-select" style="min-width:220px">${FILTERS.map((label) => `<option value="${label}">${label}</option>`).join('')}</select>
          </div>
          <div class="mn-tag-group">
            <span class="mn-tag mn-tag--light mn-tag--xs">Click headers to sort</span>
            <span class="mn-tag mn-tag--light mn-tag--xs">Click rows for toast</span>
          </div>
        </div>
        <div id="therapy-table"></div>
        <div id="therapy-table-footer" class="mn-table-footer"></div>
        <div id="therapy-selection" class="mn-micro" style="margin-top:var(--space-sm);color:var(--grigio-chiaro)">Tip: select a row to inspect the live program context.</div>
      </div>

      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div class="mn-table-compact-note">
          <div>
            <div class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-xs)">Compact variant</div>
            <p class="mn-card__text">A dense operations snapshot for coordinators scanning next reviews and open seats.</p>
          </div>
          <span class="mn-tag mn-tag--light mn-tag--xs">mn-table--compact</span>
        </div>
        <div class="mn-table-wrap">
          <table class="mn-table mn-table--compact">
            <thead><tr><th>Center</th><th>Program</th><th>Status</th><th>Seats</th></tr></thead>
            <tbody>${PROGRAMS.slice(0, 5).map((row) => `
              <tr>
                <td>${row.center}</td>
                <td>${row.program}</td>
                <td><span class="${statusClass(row.status)}">${row.status}</span></td>
                <td>${row.seats}</td>
              </tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => initTherapyTable(section));
  return section;
}

function initTherapyTable(section) {
  const host = section.querySelector('#therapy-table');
  const filter = section.querySelector('#therapy-filter');
  const footer = section.querySelector('#therapy-table-footer');
  const selection = section.querySelector('#therapy-selection');
  const M = globalThis.Maranello;
  let rows = PROGRAMS.slice();

  const syncFooter = () => {
    const info = host?.querySelector('.mn-dt__page-info')?.textContent || '';
    updateFooter(footer, rows.length, info);
  };

  if (host && M?.dataTable) {
    const ctrl = M.dataTable(host, {
      columns: COLUMNS,
      data: rows,
      pageSize: PAGE_SIZE,
      showFilters: false,
      stripedRows: true,
      onRowClick(row) {
        if (selection) selection.textContent = `${row.program} · ${row.center} · ${row.score}% readiness · review ${formatDate(row.review)}`;
        M.toast?.({ type: 'info', title: row.program, message: `${row.center} · ${row.track} · lead ${row.lead}` });
      },
    });

    filter?.addEventListener('change', () => {
      rows = filterPrograms(filter.value);
      ctrl?.setData?.(rows);
      syncFooter();
    });

    new MutationObserver(syncFooter).observe(host, { childList: true, subtree: true, characterData: true });
    syncFooter();
    return;
  }

  renderFallbackTable(host, rows, selection);
  filter?.addEventListener('change', () => {
    rows = filterPrograms(filter.value);
    renderFallbackTable(host, rows, selection);
    syncFooter();
  });
  syncFooter();
}

function filterPrograms(filter) {
  return filter === 'All tracks' ? PROGRAMS.slice() : PROGRAMS.filter((row) => row.track === filter);
}

function updateFooter(footer, totalRows, infoText) {
  if (!footer) return;
  const match = infoText.match(/Page\s+(\d+)\s+of\s+(\d+)/i);
  const page = match ? Number(match[1]) : 1;
  const pages = match ? Number(match[2]) : Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
  const start = totalRows ? (page - 1) * PAGE_SIZE + 1 : 0;
  const end = totalRows ? Math.min(page * PAGE_SIZE, totalRows) : 0;
  footer.innerHTML = `
    <span class="mn-micro" style="color:var(--grigio-chiaro)">Showing ${start}–${end} of ${totalRows} therapy programs</span>
    <div class="mn-dots">${Array.from({ length: pages }, (_, index) => `<span class="mn-dot ${index + 1 === page ? 'mn-dot--active' : ''}"></span>`).join('')}</div>
  `;
}

function renderFallbackTable(host, rows, selection) {
  if (!host) return;
  host.innerHTML = `
    <div class="mn-table-wrap">
      <table class="mn-table">
        <thead><tr><th>Center</th><th>Program</th><th>Status</th><th>Score</th><th>Lead</th><th>Next review</th></tr></thead>
        <tbody>${rows.map((row, index) => `
          <tr data-index="${index}" style="cursor:pointer">
            <td><strong>${row.center}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.city}</div></td>
            <td><strong>${row.program}</strong><div class="mn-micro" style="color:var(--grigio-medio)">${row.track} · ${row.cohort}</div></td>
            <td><span class="mn-status ${statusTone(row.status)}"><span class="mn-status__dot"></span>${row.status}</span></td>
            <td><div style="display:flex;align-items:center;gap:10px"><div class="mn-progress" style="width:72px"><div class="mn-progress__fill ${progressTone(row.score)}" style="width:${row.score}%"></div></div><span>${row.score}%</span></div></td>
            <td>${row.lead}</td>
            <td>${formatDate(row.review)}</td>
          </tr>`).join('')}</tbody>
      </table>
    </div>
  `;

  host.querySelectorAll('tbody tr').forEach((rowEl) => rowEl.addEventListener('click', () => {
    const row = rows[Number(rowEl.getAttribute('data-index'))];
    if (selection) selection.textContent = `${row.program} · ${row.center} · ${row.score}% readiness · review ${formatDate(row.review)}`;
  }));
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function statusTone(status) {
  return `mn-status--${status === 'Active' || status === 'Completed' ? 'active' : status === 'At Risk' || status === 'Warning' ? 'warning' : 'info'}`;
}

function statusClass(status) {
  return `mn-status-${status.toLowerCase().replace(/\s+/g, '-')}`;
}

function progressTone(score) {
  return score >= 80 ? 'mn-progress__fill--green' : score >= 60 ? 'mn-progress__fill--yellow' : 'mn-progress__fill--red';
}
