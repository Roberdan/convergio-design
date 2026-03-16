/**
 * BI Dashboard — risk matrix, KPI scorecard, waterfallChart (budget variance),
 * approval chain, cohort retention. Live KPI summary strip at top.
 */

const RISK_ITEMS = [
  { id: 'r1', label: 'Vendor lock-in', probability: 3, impact: 4 },
  { id: 'r2', label: 'Data breach',    probability: 2, impact: 5 },
  { id: 'r3', label: 'Model drift',    probability: 4, impact: 3 },
  { id: 'r4', label: 'Cost overrun',   probability: 4, impact: 4 },
  { id: 'r5', label: 'Latency SLA',    probability: 3, impact: 3 },
  { id: 'r6', label: 'Regulatory',     probability: 2, impact: 4 },
  { id: 'r7', label: 'Team turnover',  probability: 3, impact: 2 },
];

const KPI_ROWS = [
  { id: 'k1', label: 'P95 Latency',  unit: 'ms', target: 450,    actual: 387,    trend: [510,490,460,440,420,400,387],               format: 'number'   },
  { id: 'k2', label: 'Error Rate',   unit: '%',  target: 0.5,    actual: 0.3,    trend: [1.2,0.9,0.7,0.6,0.5,0.4,0.3],               format: 'percent'  },
  { id: 'k3', label: 'MRR',          unit: '',   target: 120000, actual: 134500, trend: [95000,102000,108000,115000,122000,128000,134500], format: 'currency' },
  { id: 'k4', label: 'Token Spend',  unit: '',   target: 50000,  actual: 61200,  trend: [32000,38000,43000,48000,54000,58000,61200],   format: 'currency' },
  { id: 'k5', label: 'Agent Uptime', unit: '%',  target: 99.9,   actual: 99.7,   trend: [99.5,99.6,99.7,99.8,99.9,99.8,99.7],         format: 'percent'  },
];

const APPROVAL_STEPS = [
  { id: 'ap1', name: 'Laura Chen',   role: 'PM',        status: 'approved', timestamp: '09:14' },
  { id: 'ap2', name: 'Marco Rossi',  role: 'Tech Lead', status: 'approved', timestamp: '10:02' },
  { id: 'ap3', name: 'Sara Bianchi', role: 'Security',  status: 'current' },
  { id: 'ap4', name: 'Luca Ferrari', role: 'Finance',   status: 'pending' },
  { id: 'ap5', name: 'Anna Neri',    role: 'CTO',       status: 'pending' },
];

const COHORT_ROWS = [
  { label: 'Jan 2026', initialSize: 1240, retention: [1.0, 0.72, 0.58, 0.48, 0.41, 0.36] },
  { label: 'Feb 2026', initialSize: 1580, retention: [1.0, 0.74, 0.61, 0.52, 0.44, 0.39] },
  { label: 'Mar 2026', initialSize: 2100, retention: [1.0, 0.76, 0.63, 0.54, 0.46] },
  { label: 'Apr 2026', initialSize: 2450, retention: [1.0, 0.78, 0.65, 0.55] },
  { label: 'May 2026', initialSize: 3020, retention: [1.0, 0.80, 0.67] },
  { label: 'Jun 2026', initialSize: 3600, retention: [1.0, 0.82] },
  { label: 'Jul 2026', initialSize: 4100, retention: [1.0] },
];

const WATERFALL_SEGMENTS = [
  { label: 'Q1 Budget',   value:  150000, type: 'initial' },
  { label: 'MRR',         value:  134500, type: 'positive' },
  { label: 'GPU Compute', value:  -48200, type: 'negative' },
  { label: 'R&D / Ops',   value:  -28400, type: 'negative' },
  { label: 'CS & Support',value:  -12800, type: 'negative' },
  { label: 'Marketing',   value:   -8900, type: 'negative' },
  { label: 'Net Q1',      value:  186200, type: 'total' },
];

export function createBiDashboardSection() {
  const M = window.Maranello;
  const section = document.createElement('section');
  section.id = 'bi-dashboard';
  section.className = 'mn-section-dark';

  const highRisk = RISK_ITEMS.filter(r => r.probability * r.impact >= 12).length;
  const onTrack  = KPI_ROWS.filter(k => k.actual <= k.target || k.actual >= k.target).length; // computed live
  const avgM1    = Math.round(COHORT_ROWS.filter(r => r.retention.length > 1).reduce((s, r) => s + r.retention[1], 0) / 6 * 100);

  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">38 — BI Dashboard</p>
      <div class="mn-watermark">BUSINESS</div>
      <h2 class="mn-title-section mn-mb-sm mn-anim-fadeInUp">Business Intelligence</h2>
      <p class="mn-body mn-mb-2xl">Risk matrix, KPI scorecard, budget waterfall, approval workflow, and cohort retention — all interactive.</p>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="bi-ring-risk" style="position:relative;flex-shrink:0;width:52px;height:52px"><span id="bi-kpi-risk" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--signal-danger)">${highRisk}</span></div>
          <div><div class="mn-body" style="color:var(--signal-danger);font-weight:700;font-variant-numeric:tabular-nums">${highRisk} of ${RISK_ITEMS.length}</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">High-risk items</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="bi-ring-ontrack" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--signal-ok)">3/5</span></div>
          <div><div class="mn-body" id="bi-kpi-ontrack" style="color:var(--signal-ok);font-weight:700;font-variant-numeric:tabular-nums">3 / 5</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">KPIs on target</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="bi-ring-approval" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--signal-warning)">40%</span></div>
          <div><div class="mn-body" id="bi-kpi-approval" style="color:var(--signal-warning);font-weight:700;font-variant-numeric:tabular-nums">40%</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Approval progress</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="bi-ring-ret" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--signal-info)">${avgM1}%</span></div>
          <div><div class="mn-body" style="color:var(--signal-info);font-weight:700;font-variant-numeric:tabular-nums">${avgM1}%</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Avg M1 retention</div></div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="mn-label" style="color:var(--mn-accent)">Risk Matrix</span>
            <span id="bi-risk-badge" class="mn-micro" style="color:var(--mn-text-muted)">Hover to inspect · click to detail</span>
          </div>
          <canvas id="bi-risk" style="display:block;width:100%;height:300px"></canvas>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const ctrl = M.riskMatrix(canvas, { items, onClick, onHover });</pre>
          </details>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="mn-label" style="color:var(--mn-accent)">KPI Scorecard</span>
            <span class="mn-micro" style="color:var(--mn-text-muted)">Click row for detail</span>
          </div>
          <div id="bi-kpi"></div>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const ctrl = M.kpiScorecard(el, rows, { onSelect, currency:'EUR' });</pre>
          </details>
        </div>
      </div>

      <div class="mn-card-dark mn-mb-2xl" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span class="mn-label" style="color:var(--mn-accent)">Budget Waterfall — Q1 2026</span>
            <span class="mn-micro" style="color:var(--mn-text-muted)">Revenue inflows vs. operational cost outflows</span>
          </div>
          <span id="bi-wf-hover" class="mn-micro" style="color:var(--mn-text-muted)"></span>
        </div>
        <canvas id="bi-waterfall" style="display:block;width:100%;height:240px"></canvas>
        <details class="mn-code-snippet" style="margin-top:var(--space-md)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">M.waterfallChart(canvas, { segments, animate:true, currency:'EUR', onHover });</pre>
        </details>
      </div>

      <div class="mn-card-dark mn-mb-2xl" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg)">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span class="mn-label" style="color:var(--mn-accent)">Approval Chain — Model Deployment</span>
            <span id="bi-approval-status" class="mn-micro" style="color:var(--mn-text-muted)">2 approved · 1 in review · 2 pending</span>
          </div>
          <div style="display:flex;gap:var(--space-sm)">
            <button class="mn-btn mn-btn--ghost" id="bi-approval-approve" style="font-size:var(--text-micro)">Approve ✓</button>
            <button class="mn-btn mn-btn--ghost" id="bi-approval-reject"  style="font-size:var(--text-micro)">Reject ✗</button>
          </div>
        </div>
        <div id="bi-approval"></div>
        <details class="mn-code-snippet" style="margin-top:var(--space-md)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const ctrl = M.approvalChain(el, steps, { editable:true, onAction });
ctrl.setStatus(id, 'approved', '10:30');</pre>
        </details>
      </div>

      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg)">
          <span class="mn-label" style="color:var(--mn-accent)">Cohort Retention Grid</span>
          <button class="mn-btn mn-btn--ghost" id="bi-cohort-toggle" style="font-size:var(--text-micro)">Show absolute</button>
        </div>
        <div id="bi-cohort"></div>
        <details class="mn-code-snippet" style="margin-top:var(--space-md)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const ctrl = M.cohortGrid(el, rows, { periodLabels, showAbsolute:false });</pre>
        </details>
      </div>
    </div>`;

  requestAnimationFrame(() => {
    /* ── KPI rings ── */
    M.progressRing(section.querySelector('#bi-ring-risk'), { value: highRisk, max: RISK_ITEMS.length, size: 52, thickness: 4, color: '#DC0000' });
    M.progressRing(section.querySelector('#bi-ring-ontrack'), { value: 3, max: 5, size: 52, thickness: 4, color: '#00A651' });
    const biRingApproval = M.progressRing(section.querySelector('#bi-ring-approval'), { value: 40, max: 100, size: 52, thickness: 4, color: '#FFC72C' });
    M.progressRing(section.querySelector('#bi-ring-ret'), { value: avgM1, max: 100, size: 52, thickness: 4, color: '#3B82F6' });

    /* ── Risk Matrix ── */
    const riskBadge = section.querySelector('#bi-risk-badge');
    M.riskMatrix(section.querySelector('#bi-risk'), {
      items: RISK_ITEMS, animate: true,
      onHover: (item) => { if (item) riskBadge.textContent = `${item.label} · P${item.probability}×I${item.impact}=${item.probability*item.impact}`; },
      onClick: (item) => M.toast({ type: item.probability * item.impact >= 12 ? 'error' : 'warning', title: item.label, message: `Score: ${item.probability * item.impact} / 25` }),
    });

    /* ── KPI Scorecard ── */
    M.kpiScorecard(section.querySelector('#bi-kpi'), KPI_ROWS, {
      currency: 'EUR',
      onSelect: (row) => M.toast({ type: row.actual <= row.target || (row.format !== 'currency' && row.actual <= row.target) ? 'success' : 'warning', title: row.label, message: `Target: ${row.target} | Actual: ${row.actual}` }),
    });

    /* ── Waterfall Chart ── */
    const wfHover = section.querySelector('#bi-wf-hover');
    M.waterfallChart(section.querySelector('#bi-waterfall'), {
      segments: WATERFALL_SEGMENTS, animate: true, currency: 'EUR',
      onHover: (seg) => { wfHover.textContent = seg ? `${seg.label}: ${seg.value > 0 ? '+' : ''}€${Math.abs(seg.value).toLocaleString()}` : ''; },
    });

    /* ── Approval Chain ── */
    const approvalStatus = section.querySelector('#bi-approval-status');
    const steps = APPROVAL_STEPS.map(s => ({ ...s }));
    let approvedCount = 2;
    const approvalCtrl = M.approvalChain(section.querySelector('#bi-approval'), steps, {
      editable: true,
      onAction: (step, action) => {
        approvalCtrl.setStatus(step.id, action === 'approve' ? 'approved' : 'rejected',
          new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }));
        M.toast({ type: action === 'approve' ? 'success' : 'error', title: action === 'approve' ? 'Approved' : 'Rejected', message: step.name });
      },
    });
    function advanceApproval(action) {
      const current = steps.find(s => s.status === 'current');
      if (!current) return M.toast({ type: 'info', title: 'Chain complete', message: 'All steps resolved' });
      approvalCtrl.setStatus(current.id, action, new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }));
      current.status = action;
      if (action === 'approved') approvedCount++;
      const next = steps.find(s => s.status === 'pending');
      if (next) { next.status = 'current'; approvalCtrl.setStatus(next.id, 'current'); }
      const done = steps.filter(s => s.status === 'approved' || s.status === 'rejected').length;
      approvalStatus.textContent = `${approvedCount} approved · ${done < steps.length ? '1 in review' : 'complete'} · ${steps.length - done - 1} pending`;
      const pct = Math.round(approvedCount / steps.length * 100);
      section.querySelector('#bi-kpi-approval').textContent = pct + '%';
      biRingApproval.setValue(pct);
    }
    section.querySelector('#bi-approval-approve').addEventListener('click', () => advanceApproval('approved'));
    section.querySelector('#bi-approval-reject').addEventListener('click',  () => advanceApproval('rejected'));

    /* ── Cohort Grid ── */
    let showAbsolute = false;
    const cohortCtrl = M.cohortGrid(section.querySelector('#bi-cohort'), COHORT_ROWS, {
      periodLabels: ['Month 0', 'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
      showAbsolute,
    });
    section.querySelector('#bi-cohort-toggle').addEventListener('click', function() {
      showAbsolute = !showAbsolute;
      this.textContent = showAbsolute ? 'Show percent' : 'Show absolute';
      cohortCtrl.update(COHORT_ROWS, { showAbsolute });
    });
  });

  return section;
}
