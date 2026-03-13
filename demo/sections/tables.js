/**
 * Tables section — data table with fictional donation/volunteer data
 */
export function createTablesSection() {
  const section = document.createElement('section');
  section.id = 'tables';
  section.className = 'mn-section-light';

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'amount', label: 'Amount (EUR)', sortable: true, align: 'right' },
    { key: 'program', label: 'Program', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const rows = [
    { name: 'Elena Marchetti', type: 'Donation', amount: '2,500', program: 'Therapy', date: '2026-03-10', status: 'Confirmed' },
    { name: 'Marco De Luca', type: 'Volunteer', amount: '—', program: 'Tech4Good', date: '2026-03-08', status: 'Active' },
    { name: 'Giulia Ferrari', type: 'Donation', amount: '1,000', program: 'Research', date: '2026-03-05', status: 'Confirmed' },
    { name: 'Antonio Ricci', type: 'Volunteer', amount: '—', program: 'Family Support', date: '2026-03-03', status: 'Active' },
    { name: 'Sofia Colombo', type: 'Donation', amount: '750', program: 'General Fund', date: '2026-02-28', status: 'Pending' },
    { name: 'Luca Moretti', type: 'Donation', amount: '5,000', program: 'Therapy', date: '2026-02-25', status: 'Confirmed' },
    { name: 'Chiara Russo', type: 'Volunteer', amount: '—', program: 'Fundraising', date: '2026-02-20', status: 'Active' },
    { name: 'Alessandro Conti', type: 'Donation', amount: '350', program: 'Technology', date: '2026-02-18', status: 'Confirmed' }
  ];

  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">06 — Data Display</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Data Table</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Recent donations and volunteer registrations with sorting,
        filtering, and status indicators.
      </p>
      <div id="table-host"></div>
    </div>
  `;

  requestAnimationFrame(() => {
    const host = section.querySelector('#table-host');
    if (!host) return;

    const table = document.createElement('mn-data-table');
    table.setAttribute('columns', JSON.stringify(columns));
    table.setAttribute('data', JSON.stringify(rows));
    table.setAttribute('page-size', '5');
    host.appendChild(table);

    buildFallbackTable(host, columns, rows);
  });

  return section;
}

function buildFallbackTable(host, columns, rows) {
  setTimeout(() => {
    const existing = host.querySelector('mn-data-table');
    if (existing && existing.shadowRoot && existing.shadowRoot.querySelector('table')) return;

    const wrap = document.createElement('div');
    wrap.className = 'mn-table-wrap';
    wrap.style.cssText = 'border:1px solid var(--grigio-scuro);border-radius:var(--radius-md);overflow:auto;margin-top:var(--space-md)';

    let html = '<table class="mn-table" style="width:100%;border-collapse:collapse">';
    html += '<thead><tr>';
    columns.forEach(c => {
      html += `<th style="padding:var(--space-sm) var(--space-md);text-align:${c.align || 'left'};font-family:var(--font-display);font-size:var(--text-micro);text-transform:uppercase;letter-spacing:0.08em">${c.label}</th>`;
    });
    html += '</tr></thead><tbody>';
    rows.forEach(r => {
      html += '<tr>';
      columns.forEach(c => {
        const val = r[c.key];
        let cell = val;
        if (c.key === 'status') {
          const color = val === 'Active' ? 'var(--status-active)' : val === 'Confirmed' ? 'var(--mn-accent)' : 'var(--status-warning)';
          cell = `<span style="color:${color};font-weight:600">${val}</span>`;
        }
        html += `<td style="padding:var(--space-sm) var(--space-md);border-top:1px solid var(--grigio-scuro);text-align:${c.align || 'left'};font-size:var(--text-caption)">${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    wrap.innerHTML = html;
    host.appendChild(wrap);
  }, 1500);
}
