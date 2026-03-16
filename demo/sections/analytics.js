/**
 * Analytics section — waterfallChart, confidenceChart, decisionMatrix, renderSourceCards
 * Full interactivity: hover tooltips on canvases, live decision matrix ranking.
 */

const WATERFALL_DATA = [
  { label: 'Q4 Budget',  value: 120000, isTotal: true },
  { label: 'Inference',  value: -28400 },
  { label: 'Training',   value: -14200 },
  { label: 'Storage',    value:  -6800 },
  { label: 'Savings',    value:  +9500 },
  { label: 'Overage',    value:  -3100 },
  { label: 'Q4 Actual',  value: 0, isTotal: true },
];

const CONFIDENCE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  values: [62, 68, 71, 75, 79, 83, 86, 89],
  lower:  [55, 59, 61, 63, 66, 70, 72, 74],
  upper:  [69, 77, 81, 87, 91, 95, 98, 102],
};

const MATRIX_CRITERIA = [
  { id: 'cost',     label: 'Cost efficiency', weight: 9 },
  { id: 'latency',  label: 'P95 latency',     weight: 8 },
  { id: 'accuracy', label: 'Accuracy',         weight: 10 },
  { id: 'ops',      label: 'Ops complexity',   weight: 6 },
];
const MATRIX_ALTS = [
  { id: 'a', label: 'Sonnet 4.6', scores: { cost: 8, latency: 9, accuracy: 9, ops: 8 } },
  { id: 'b', label: 'Opus 4.6',   scores: { cost: 5, latency: 6, accuracy: 10, ops: 7 } },
  { id: 'c', label: 'Haiku 4.5',  scores: { cost: 10, latency: 10, accuracy: 6, ops: 9 } },
  { id: 'd', label: 'GPT-5.1',    scores: { cost: 6, latency: 7, accuracy: 8, ops: 6 } },
];

const SOURCE_CARDS = [
  { id: 's1', title: 'Q4 2025 Infrastructure Cost Analysis', excerpt: 'Inference costs grew 23% QoQ driven by increased embedding workloads. Recommend tiered caching to reduce redundant API calls by ~40%.', source: 'FinOps Report Q4-2025.pdf', score: 0.96, date: 'Dec 2025', badge: 'Report' },
  { id: 's2', title: 'Agent Model Selection Guidelines', excerpt: 'Selection criteria for production agents: latency requirements, accuracy benchmarks, and total cost of ownership analysis across major providers.', source: 'Internal Policy v3.2', score: 0.88, date: 'Feb 2026', badge: 'Policy' },
  { id: 's3', title: 'Platform SLA Contract — Clause 4.2', excerpt: 'Response time guarantees: P95 latency must not exceed 450ms for synchronous agent calls. Penalty clause applies above 1.2× threshold.', source: 'Contract MSA-2024-087', score: 0.81, date: 'Jan 2024', badge: 'Contract' },
  { id: 's4', title: 'Prompt Caching ROI Study', excerpt: 'A 3-month study across 6 enterprise deployments showed prompt caching reduces token spend by 28-41% with negligible accuracy degradation.', source: 'Research Paper arXiv:2501.xxxxx', score: 0.74, date: 'Jan 2026', badge: 'Research' },
];

/** Attach hover tooltip to a canvas using a nearest-point strategy. */
function attachCanvasTooltip(canvas, getTooltip) {
  const wrap = canvas.parentElement;
  if (!wrap) return;
  const tip = document.createElement('div');
  tip.style.cssText = 'position:absolute;pointer-events:none;display:none;background:var(--mn-surface);border:1px solid var(--mn-border);border-radius:var(--radius-sm);padding:6px 10px;font-size:0.75rem;color:var(--mn-text);box-shadow:0 4px 12px rgba(0,0,0,0.2);z-index:10;white-space:nowrap;max-width:200px;white-space:normal';
  wrap.style.position = 'relative';
  wrap.appendChild(tip);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const content = getTooltip(x, y, rect.width, rect.height);
    if (content) {
      tip.innerHTML = content;
      tip.style.display = 'block';
      tip.style.left = Math.min(x + 12, rect.width - 170) + 'px';
      tip.style.top = Math.max(y - 40, 4) + 'px';
    } else {
      tip.style.display = 'none';
    }
  });
  canvas.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
}

function fmtNum(n) { return new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(n); }

export function createAnalyticsSection() {
  const M = window.Maranello;
  const section = document.createElement('section');
  section.id = 'analytics';
  section.className = 'mn-section-dark';

  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">35 — Analytics &amp; Intelligence</p>
      <div class="mn-watermark">ANALYTICS</div>
      <h2 class="mn-title-section mn-mb-sm mn-anim-fadeInUp">Analytics &amp; AI Components</h2>
      <p class="mn-body mn-mb-2xl">Financial waterfall, confidence forecast, decision matrix, and RAG source citations — all interactive.</p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-bottom:var(--space-2xl)">

        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="mn-label" style="color:var(--mn-accent)">Waterfall — Budget Variance</span>
            <span class="mn-micro" style="color:var(--mn-text-muted)">Hover for details</span>
          </div>
          <div style="position:relative"><canvas id="anl-waterfall" style="display:block;width:100%;height:200px"></canvas></div>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">M.waterfallChart(canvas, { segments, unit: '€' });</pre>
          </details>
        </div>

        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm)">
            <span class="mn-label" style="color:var(--mn-accent)">Confidence Interval — Forecast</span>
            <button class="mn-btn mn-btn--ghost" id="anl-cf-replay" style="font-size:var(--text-micro)">↺ Replay</button>
          </div>
          <div style="position:relative"><canvas id="anl-confidence" style="display:block;width:100%;height:200px"></canvas></div>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">M.confidenceChart(canvas, { labels, values, lower, upper });</pre>
          </details>
        </div>
      </div>

      <div class="mn-card-dark mn-mb-2xl" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg)">
          <span class="mn-label" style="color:var(--mn-accent)">Decision Matrix — Model Selection</span>
          <div style="display:flex;gap:var(--space-sm);align-items:center">
            <span class="mn-micro" style="color:var(--mn-text-muted)">Click score to edit (1–10)</span>
            <div id="anl-matrix-badge" class="mn-micro" style="background:var(--mn-accent);color:var(--mn-accent-text);padding:2px 10px;border-radius:999px;display:none"></div>
          </div>
        </div>
        <div id="anl-matrix"></div>
        <details class="mn-code-snippet" style="margin-top:var(--space-lg)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const mx = M.decisionMatrix(el, { criteria, alternatives, editable: true, onChange });</pre>
        </details>
      </div>

      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-lg)">
          <span class="mn-label" style="color:var(--mn-accent)">RAG Source Citations</span>
          <div style="display:flex;gap:var(--space-sm)">
            <button class="mn-btn mn-btn--ghost" id="anl-src-grid" style="font-size:var(--text-micro)">⊞ Grid</button>
            <button class="mn-btn mn-btn--ghost" id="anl-add-source" style="font-size:var(--text-micro)">+ Add</button>
          </div>
        </div>
        <div id="anl-sources"></div>
      </div>
    </div>`;

  requestAnimationFrame(() => {
    /* ── Waterfall with hover tooltip ── */
    const wfCanvas = section.querySelector('#anl-waterfall');
    M.waterfallChart(wfCanvas, { segments: WATERFALL_DATA, unit: '€', animate: true });
    attachCanvasTooltip(wfCanvas, (x, _y, w) => {
      const rightPad = 50;
      const trackW = w - rightPad;
      const n = WATERFALL_DATA.length;
      const idx = Math.floor((x / trackW) * n);
      const seg = WATERFALL_DATA[Math.max(0, Math.min(idx, n - 1))];
      if (!seg) return null;
      const sign = seg.value > 0 ? '+' : '';
      return `<strong>${seg.label}</strong><br>${seg.isTotal ? 'Total' : (sign + fmtNum(seg.value) + ' €')}`;
    });

    /* ── Confidence with hover + replay ── */
    const cfCanvas = section.querySelector('#anl-confidence');
    const renderCf = () => M.confidenceChart(cfCanvas, { ...CONFIDENCE_DATA, unit: '%', animate: true });
    renderCf();
    section.querySelector('#anl-cf-replay').addEventListener('click', renderCf);
    attachCanvasTooltip(cfCanvas, (x, _y, w) => {
      const labels = CONFIDENCE_DATA.labels;
      const leftPad = 48;
      const rightPad = 16;
      const trackW = w - leftPad - rightPad;
      const step = trackW / (labels.length - 1);
      const idx = Math.max(0, Math.min(Math.round((x - leftPad) / step), labels.length - 1));
      return `<strong>${labels[idx]}</strong><br>Value: ${CONFIDENCE_DATA.values[idx]}%<br>Range: ${CONFIDENCE_DATA.lower[idx]}–${CONFIDENCE_DATA.upper[idx]}%`;
    });

    /* ── Decision Matrix with live winner badge ── */
    const badge = section.querySelector('#anl-matrix-badge');
    const weightedScore = (alt) => {
      const total = MATRIX_CRITERIA.reduce((s, c) => s + c.weight, 0);
      return MATRIX_CRITERIA.reduce((s, c) => s + (alt.scores[c.id] || 0) * c.weight, 0) / total;
    };
    M.decisionMatrix(section.querySelector('#anl-matrix'), {
      criteria: MATRIX_CRITERIA, alternatives: MATRIX_ALTS, editable: true,
      onChange: (alts) => {
        const winner = alts.reduce((b, a) => weightedScore(a) > weightedScore(b) ? a : b);
        badge.textContent = `Winner: ${winner.label}`;
        badge.style.display = '';
      },
    });

    /* ── Source Cards with grid/list toggle ── */
    let currentLayout = 'list';
    let extraIdx = SOURCE_CARDS.length;
    let allCards = [...SOURCE_CARDS];
    const sourcesEl = section.querySelector('#anl-sources');
    const sc = M.renderSourceCards(sourcesEl, allCards, {
      maxVisible: 3, layout: currentLayout,
      onSelect: (card) => M.toast({ type: 'info', title: 'Source selected', message: card.title }),
    });
    section.querySelector('#anl-src-grid').addEventListener('click', function() {
      currentLayout = currentLayout === 'list' ? 'grid' : 'list';
      this.textContent = currentLayout === 'list' ? '⊞ Grid' : '☰ List';
      sc.update(allCards);  // re-render same cards (layout change not supported live → re-init)
      sourcesEl.className = `mn-source-cards mn-source-cards--${currentLayout}`;
    });
    section.querySelector('#anl-add-source').addEventListener('click', () => {
      extraIdx++;
      allCards = [...SOURCE_CARDS, {
        id: `s${extraIdx}`, title: `Synthetic result #${extraIdx}`,
        excerpt: 'Auto-generated citation for demo purposes.', source: 'Demo corpus',
        score: Math.random() * 0.4 + 0.55, date: 'Mar 2026', badge: 'Demo',
      }];
      sc.update(allCards);
    });
  });

  return section;
}
