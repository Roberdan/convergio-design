/**
 * Agentic AI — rich composition: live KPI strip, agent trace + latency sparkline,
 * token meter, streaming output with model badge, human-in-the-loop approval chain.
 */

const DEMO_STEPS = [
  { id: 's1', kind: 'tool',      label: 'web_search',              status: 'done',    durationMs: 312, timestamp: '09:00:01', input: '{"query":"Q4 2025 AI infrastructure costs","n":5}', output: '{"results":5}' },
  { id: 's2', kind: 'reasoning', label: 'Analyze search results',  status: 'done',    durationMs: 890, timestamp: '09:00:02', output: 'Found 3 relevant sources. Proceeding.' },
  { id: 's3', kind: 'tool',      label: 'read_document',           status: 'done',    durationMs: 145, timestamp: '09:00:03', input: '{"doc_id":"finops-q4-2025"}', output: '{"inference_cost":28400}' },
  { id: 's4', kind: 'tool',      label: 'run_sql',                 status: 'error',   durationMs:  50, timestamp: '09:00:04', output: 'Error: relation "cost_breakdown" does not exist' },
  { id: 's5', kind: 'reasoning', label: 'Retry with fallback API', status: 'running',                  timestamp: '09:00:05', input: 'Falling back to REST cost endpoint.' },
];

const APPROVALS = [
  { id: 'a1', name: 'Research Agent',  role: 'AI Agent',      status: 'approved', timestamp: '09:00:02', comment: 'web_search completed — 5 results retrieved' },
  { id: 'a2', name: 'SQL Adapter',     role: 'System',        status: 'rejected', timestamp: '09:00:04', comment: 'DB query failed — fallback triggered' },
  { id: 'a3', name: 'Analysis Agent',  role: 'AI Agent',      status: 'approved', timestamp: '09:00:05', comment: 'FinOps synthesis ready for human review' },
  { id: 'a4', name: 'Elena Russo',     role: 'FinOps Lead',   status: 'current',  comment: 'Awaiting final report approval' },
];

const STREAM_TEXT = `Based on the Q4 2025 analysis, **inference costs** represent the largest budget category at €28,400 — a **23% increase** QoQ driven by embedding workloads.

Key recommendations:
1. Implement tiered prompt caching to reduce redundant \`API calls\` by ~40%
2. Route classification tasks to \`Haiku 4.5\` — 10× cheaper at similar accuracy
3. Set hard budget alerts at 80% threshold [1]

Projected savings from these optimizations: **€8,000–€12,000 per quarter** [2].`;

const TOKEN_USAGE = { prompt: 4820, completion: 612, cached: 2100, budget: 8000, costPerMToken: 3.0 };
const LATENCY_VALS = [312, 890, 145, 50];

export function createAgenticSection() {
  const M = window.Maranello;
  const section = document.createElement('section');
  section.id = 'agentic';
  section.className = 'mn-section-dark';

  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">37 — Agentic AI</p>
      <div class="mn-watermark">AGENTIC</div>
      <h2 class="mn-title-section mn-mb-sm mn-anim-fadeInUp">Agentic AI Components</h2>
      <p class="mn-body mn-mb-2xl">Agent execution trace, token budget, streaming output, and human-in-the-loop approval — built for production AI pipelines.</p>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-md);margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="ag-ring-steps" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--mn-accent)">5</span></div>
          <div><div class="mn-body" id="ag-kpi-steps" style="font-variant-numeric:tabular-nums;color:var(--mn-accent);font-weight:700">5</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Steps traced</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="ag-ring-tokens" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.65rem;font-weight:700;color:var(--signal-info)">8.3k</span></div>
          <div><div class="mn-body" id="ag-kpi-tokens" style="font-variant-numeric:tabular-nums;color:var(--signal-info);font-weight:700">8,344</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Tokens used</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="ag-ring-cost" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.65rem;font-weight:700;color:var(--signal-ok)">$0.02</span></div>
          <div><div class="mn-body" id="ag-kpi-cost" style="font-variant-numeric:tabular-nums;color:var(--signal-ok);font-weight:700">$0.025</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Estimated cost</div></div>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-md) var(--space-lg);display:flex;align-items:center;gap:var(--space-md)">
          <div id="ag-ring-cache" style="position:relative;flex-shrink:0;width:52px;height:52px"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:0.7rem;font-weight:700;color:var(--signal-warning)">39%</span></div>
          <div><div class="mn-body" id="ag-kpi-cache" style="font-variant-numeric:tabular-nums;color:var(--signal-warning);font-weight:700">38.7%</div><div class="mn-micro" style="color:var(--mn-text-muted);margin-top:2px">Cache hit ratio</div></div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-xl);margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
            <div style="display:flex;flex-direction:column;gap:2px">
              <span class="mn-label" style="color:var(--mn-accent)">Agent Execution Trace</span>
              <span class="mn-micro" style="color:var(--mn-text-muted)">claude-sonnet-4-6 · session #4821</span>
            </div>
            <div style="display:flex;gap:var(--space-sm)">
              <button class="mn-btn mn-btn--ghost" id="ag-trace-add" style="font-size:var(--text-micro)">+ Step</button>
              <button class="mn-btn mn-btn--ghost" id="ag-trace-clear" style="font-size:var(--text-micro)">Clear</button>
            </div>
          </div>
          <div id="ag-trace"></div>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const t = M.agentTrace(el, steps, { onSelect });
t.add(step); t.update(id, { status:'done', durationMs:120 });</pre>
          </details>
        </div>

        <div class="mn-card-dark" style="padding:var(--space-xl);display:flex;flex-direction:column">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
            <span class="mn-label" style="color:var(--mn-accent)">Token Budget Meter</span>
            <button class="mn-btn mn-btn--ghost" id="ag-token-sim" style="font-size:var(--text-micro)">Simulate</button>
          </div>
          <div id="ag-token"></div>
          <div style="margin-top:var(--space-lg);padding-top:var(--space-md);border-top:1px solid var(--mn-border)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xs)">
              <span class="mn-micro" style="color:var(--mn-text-muted)">Step latency trend (ms)</span>
              <span class="mn-micro" id="ag-lat-label" style="color:var(--mn-accent);font-variant-numeric:tabular-nums"></span>
            </div>
            <canvas id="ag-latency" style="display:block;width:100%;height:56px"></canvas>
          </div>
          <details class="mn-code-snippet" style="margin-top:var(--space-md)">
            <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
            <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const m = M.tokenMeter(el, usage, { showCost:true });
m.update({ prompt:5000, completion:800, cached:2000 });</pre>
          </details>
        </div>
      </div>

      <div class="mn-card-dark mn-mb-2xl" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
          <div style="display:flex;align-items:center;gap:var(--space-sm)">
            <div style="width:30px;height:30px;border-radius:var(--radius-full);background:var(--mn-accent);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:700;color:#000;flex-shrink:0;font-family:var(--font-display)">C</div>
            <div style="display:flex;flex-direction:column;gap:2px">
              <span class="mn-label" style="color:var(--mn-accent)">Streaming LLM Output</span>
              <span class="mn-micro" style="color:var(--mn-text-muted)">claude-sonnet-4-6 · streaming</span>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-sm)">
            <button class="mn-btn mn-btn--ghost" id="ag-stream-play" style="font-size:var(--text-micro)">▶ Play</button>
            <button class="mn-btn mn-btn--ghost" id="ag-stream-reset" style="font-size:var(--text-micro)">Reset</button>
          </div>
        </div>
        <div style="border-left:2px solid var(--mn-accent);padding-left:var(--space-md)">
          <div id="ag-stream" class="mn-stream" style="min-height:80px;padding:var(--space-xs) 0"></div>
        </div>
        <details class="mn-code-snippet" style="margin-top:var(--space-md)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const s = M.streamingText(el, { onCitationClick: n => showSource(n) });
s.append(chunk); s.done();</pre>
        </details>
      </div>

      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md)">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span class="mn-label" style="color:var(--mn-accent)">Human-in-the-Loop Approval</span>
            <span class="mn-micro" style="color:var(--mn-text-muted)">4-step multi-agent workflow — awaiting human sign-off</span>
          </div>
          <div style="display:flex;gap:var(--space-sm)">
            <button class="mn-btn mn-btn--ghost" id="ag-approve" style="font-size:var(--text-micro)">Approve ✓</button>
            <button class="mn-btn mn-btn--ghost" id="ag-reject" style="font-size:var(--text-micro)">Reject ✗</button>
          </div>
        </div>
        <div id="ag-approval"></div>
        <details class="mn-code-snippet" style="margin-top:var(--space-md)">
          <summary class="mn-micro" style="cursor:pointer;color:var(--mn-text-muted)">Usage</summary>
          <pre style="font-family:var(--font-mono);font-size:var(--text-micro);padding:var(--space-sm) 0;color:var(--mn-text-muted);overflow-x:auto">const chain = M.approvalChain(el, steps, { editable:true, onAction });
chain.setStatus(id, 'approved', timestamp);</pre>
        </details>
      </div>
    </div>`;

  requestAnimationFrame(() => {
    let latencyData = LATENCY_VALS.slice();
    let extraStep = DEMO_STEPS.length;
    let agRingTokens, agRingCache;

    /* KPI helpers */
    function refreshKpis(usage) {
      const totalTok = (usage.prompt ?? TOKEN_USAGE.prompt) + (usage.completion ?? TOKEN_USAGE.completion);
      const cost = (totalTok / 1_000_000) * TOKEN_USAGE.costPerMToken;
      const cacheRatio = ((usage.cached ?? TOKEN_USAGE.cached) / totalTok * 100).toFixed(1);
      section.querySelector('#ag-kpi-tokens').textContent = totalTok.toLocaleString();
      section.querySelector('#ag-kpi-cost').textContent = '$' + cost.toFixed(3);
      section.querySelector('#ag-kpi-cache').textContent = cacheRatio + '%';
      if (agRingTokens) agRingTokens.setValue(totalTok);
      if (agRingCache) agRingCache.setValue(parseFloat(cacheRatio));
    }

    /* Agent Trace */
    const traceCtrl = M.agentTrace(section.querySelector('#ag-trace'), DEMO_STEPS, {
      onSelect: (step) => M.toast({ type: 'info', title: step.label, message: `${step.status}${step.durationMs ? ' · ' + step.durationMs + 'ms' : ''}` }),
    });
    section.querySelector('#ag-trace-add').addEventListener('click', () => {
      extraStep++;
      const kinds = ['tool', 'reasoning', 'tool'];
      const labels = ['call_api', 'validate_output', 'write_report', 'summarize', 'fetch_context'];
      traceCtrl.add({ id: `s${extraStep}`, kind: kinds[extraStep % 3], label: labels[extraStep % labels.length],
        status: 'running', timestamp: new Date().toLocaleTimeString('en', { hour12: false }) });
      section.querySelector('#ag-kpi-steps').textContent = String(extraStep);
      const ms = Math.round(Math.random() * 600 + 80);
      setTimeout(() => {
        traceCtrl.update(`s${extraStep}`, { status: 'done', durationMs: ms });
        latencyData = [...latencyData.slice(-7), ms];
        renderSparkline();
        section.querySelector('#ag-lat-label').textContent = ms + 'ms';
      }, 1100);
    });
    section.querySelector('#ag-trace-clear').addEventListener('click', () => {
      traceCtrl.clear();
      section.querySelector('#ag-kpi-steps').textContent = '0';
    });

    /* Token Meter */
    const meterCtrl = M.tokenMeter(section.querySelector('#ag-token'), TOKEN_USAGE, { showCost: true, showBreakdown: true });
    agRingTokens = M.progressRing(section.querySelector('#ag-ring-tokens'), { value: TOKEN_USAGE.prompt + TOKEN_USAGE.completion, max: TOKEN_USAGE.budget, size: 52, thickness: 4, color: '#3B82F6' });
    agRingCache = M.progressRing(section.querySelector('#ag-ring-cache'), { value: 38.7, max: 100, size: 52, thickness: 4, color: '#FFC72C' });
    section.querySelector('#ag-token-sim').addEventListener('click', () => {
      const u = { prompt: Math.round(Math.random() * 6000 + 1000), completion: Math.round(Math.random() * 1000 + 200),
        cached: Math.round(Math.random() * 3000), budget: 8000, costPerMToken: 3.0 };
      meterCtrl.update(u);
      refreshKpis(u);
    });
    refreshKpis(TOKEN_USAGE);

    /* Latency sparkline */
    const latCanvas = section.querySelector('#ag-latency');
    function renderSparkline() {
      if (M.sparkline) M.sparkline(latCanvas, latencyData, { color: '--mn-accent', filled: true });
    }
    renderSparkline();
    section.querySelector('#ag-lat-label').textContent = latencyData[latencyData.length - 1] + 'ms';

    /* Streaming Text */
    const streamCtrl = M.streamingText(section.querySelector('#ag-stream'), {
      onCitationClick: (n) => M.toast({ type: 'info', title: `Source [${n}]`, message: 'Navigating to citation...' }),
    });
    let streamInterval = null;
    section.querySelector('#ag-stream-play').addEventListener('click', function() {
      if (streamInterval) return;
      streamCtrl.reset();
      const chunks = STREAM_TEXT.split('');
      let i = 0;
      streamInterval = setInterval(() => {
        if (i < chunks.length) { streamCtrl.append(chunks[i++]); }
        else { clearInterval(streamInterval); streamInterval = null; streamCtrl.done(); }
      }, 18);
    });
    section.querySelector('#ag-stream-reset').addEventListener('click', () => {
      if (streamInterval) { clearInterval(streamInterval); streamInterval = null; }
      streamCtrl.reset();
    });

    /* Approval Chain */
    const approvalCtrl = M.approvalChain(section.querySelector('#ag-approval'), APPROVALS, {
      editable: true,
      onAction: (step, action) => M.toast({ type: action === 'approve' ? 'success' : 'error', title: `${step.name} — ${action}d`, message: step.comment ?? '' }),
    });
    section.querySelector('#ag-approve').addEventListener('click', () => {
      approvalCtrl.setStatus('a4', 'approved', new Date().toLocaleTimeString('en', { hour12: false }));
      M.toast({ type: 'success', title: 'Report approved', message: 'Elena Russo approved the FinOps report' });
    });
    section.querySelector('#ag-reject').addEventListener('click', () => {
      approvalCtrl.setStatus('a4', 'rejected', new Date().toLocaleTimeString('en', { hour12: false }));
      M.toast({ type: 'error', title: 'Report rejected', message: 'Returned to Analysis Agent for revision' });
    });
  });

  return section;
}
