export function meshNetworkSection() {
  return `
    <section class="demo-section" id="mesh-network">
      <h2 class="demo-section__title"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="var(--mn-accent)"><path d="M12 2l6 10-6 10-6-10z"/></svg></span> Mesh Network</h2>
      <p class="demo-section__desc">Convergio-style mesh node visualization for distributed AI agent orchestration.</p>
      <details class="mn-code-snippet">
        <summary class="mn-label" style="cursor:pointer;color:var(--mn-accent);margin-bottom:var(--space-sm)">⟨/⟩ Usage</summary>
        <pre class="mn-card-dark" style="padding:var(--space-md);font-family:var(--font-mono);font-size:var(--text-micro);overflow-x:auto;margin-bottom:var(--space-lg);border-left:3px solid var(--mn-accent)"><code>&lt;article class="mn-mesh-node"&gt;
  &lt;div class="mn-mesh-node__header"&gt;&lt;h4 class="mn-mesh-node__name"&gt;M1-MARIO&lt;/h4&gt;&lt;/div&gt;
  &lt;p class="mn-mesh-node__role"&gt;● Worker · Local&lt;/p&gt;
&lt;/article&gt;</code></pre>
      </details>

      <div class="mn-mesh-network">
        <div class="mn-mesh-network__toolbar mn-mesh-network__top">
          <span class="mn-mesh-network__title"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="var(--mn-accent)"><path d="M12 2l6 10-6 10-6-10z"/></svg></span> MESH NETWORK</span>
          <div class="mn-mesh-network__legend">
            <span class="mn-mesh-status mn-mesh-status--on"></span> On
            <span class="mn-mesh-status mn-mesh-status--off"></span> Off
            <span class="mn-mesh-status mn-mesh-status--sync"></span> Sync
            <span class="mn-mesh-status mn-mesh-status--drift"></span> Drift
          </div>
          <div class="mn-mesh-network__actions">
            <button class="mn-mesh-network__action">+ ADD PEER</button>
            <button class="mn-mesh-network__action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></span> DISCOVER</button>
            <button class="mn-mesh-network__action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg></span> FULL SYNC</button>
            <button class="mn-mesh-network__action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M5 20h14"/></svg></span> PUSH</button>
            <span class="mn-mesh-node__stats">3/3 online</span>
          </div>
        </div>

        <div class="mn-mesh-network__grid">
          <article class="mn-mesh-node" style="--mn-mesh-border-accent: var(--signal-ok);">
            <div class="mn-mesh-node__header">
              <span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2c1 1.5 1 3 0 4"/><path d="M17 8c3 3 3 8 0 12-2 2.5-4 2-5 0-1 2-3 2.5-5 0-3-4-3-9 0-12 2-2 4-2 5 0 1-2 3-2 5 0z"/></svg></span>
              <h4 class="mn-mesh-node__name">M1-MARIO</h4>
              <span class="mn-mesh-status mn-mesh-status--on" title="online"></span>
            </div>
            <p class="mn-mesh-node__role">● Worker · Local</p>
            <div class="mn-mesh-badges">
              <span class="mn-mesh-badge mn-mesh-badge--claude">Claude</span>
              <span class="mn-mesh-badge mn-mesh-badge--copilot">Copilot</span>
            </div>
            <p class="mn-mesh-node__stats">CPU</p>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">CPU</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--cpu" style="width: 12%"></span></span>
              <span class="mn-mesh-bar__label">12%</span>
            </div>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">RAM</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--ram" style="width: 48%"></span></span>
              <span class="mn-mesh-bar__label">48%</span>
            </div>
            <p class="mn-mesh-node__stats">3 active tasks · drift 0.2%</p>
            <div class="mn-mesh-node__actions">
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M5 20h14"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 12c2 0 2-4 4-4s2 8 4 8 2-8 4-8 2 4 4 4 2-4 4-4"/></svg></span></button>
            </div>
          </article>

          <article class="mn-mesh-node" style="--mn-mesh-border-accent: var(--giallo);">
            <div class="mn-mesh-node__header">
              <span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2c1 1.5 1 3 0 4"/><path d="M17 8c3 3 3 8 0 12-2 2.5-4 2-5 0-1 2-3 2.5-5 0-3-4-3-9 0-12 2-2 4-2 5 0 1-2 3-2 5 0z"/></svg></span>
              <h4 class="mn-mesh-node__name">M3-MAX</h4>
              <span class="mn-mesh-status mn-mesh-status--on" title="online"></span>
            </div>
            <p class="mn-mesh-node__role">● Coordinator · Local</p>
            <div class="mn-mesh-badges">
              <span class="mn-mesh-badge mn-mesh-badge--claude">Claude</span>
              <span class="mn-mesh-badge mn-mesh-badge--copilot">Copilot</span>
              <span class="mn-mesh-badge mn-mesh-badge--ollama">Ollama</span>
            </div>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">CPU</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--cpu" style="width: 31%"></span></span>
              <span class="mn-mesh-bar__label">31%</span>
            </div>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">RAM</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--ram" style="width: 74%"></span></span>
              <span class="mn-mesh-bar__label">74%</span>
            </div>
            <p class="mn-mesh-node__stats">5 active tasks · 2 delegated · sync 98%</p>
            <div class="mn-mesh-node__actions">
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M5 20h14"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg></span></button>
            </div>
          </article>

          <article class="mn-mesh-node" style="--mn-mesh-border-accent: var(--azzurro-chiaro, #4EA8DE);">
            <div class="mn-mesh-node__header">
              <span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><ellipse cx="12" cy="14" rx="6" ry="8"/><circle cx="10" cy="11" r="1" fill="currentColor"/><circle cx="14" cy="11" r="1" fill="currentColor"/><path d="M10 14h4"/><path d="M8 20l-2 2M16 20l2 2"/></svg></span>
              <h4 class="mn-mesh-node__name">OMARCHY</h4>
              <span class="mn-mesh-status mn-mesh-status--on" title="online"></span>
            </div>
            <p class="mn-mesh-node__role">● Worker · Remote</p>
            <div class="mn-mesh-badges">
              <span class="mn-mesh-badge mn-mesh-badge--claude">Claude</span>
              <span class="mn-mesh-badge mn-mesh-badge--copilot">Copilot</span>
            </div>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">CPU</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--cpu" style="width: 1%"></span></span>
              <span class="mn-mesh-bar__label">1%</span>
            </div>
            <div class="mn-mesh-bar">
              <span class="mn-mesh-bar__label">RAM</span>
              <span class="mn-mesh-bar__track"><span class="mn-mesh-bar__fill mn-mesh-bar__fill--ram" style="width: 63%"></span></span>
              <span class="mn-mesh-bar__label">63%</span>
            </div>
            <p class="mn-mesh-node__stats">0 active tasks · cold standby · latency 21ms</p>
            <div class="mn-mesh-node__actions">
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M5 20h14"/></svg></span></button>
              <button class="mn-mesh-action"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.7-1.5A4 4 0 1 1 18 18Z"/></svg></span></button>
            </div>
          </article>
        </div>

        <div class="mn-mesh-network__footer mn-mesh-network__bottom">
          <span class="mn-mesh-network__title"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="var(--mn-accent)"><path d="M12 2l6 10-6 10-6-10z"/></svg></span> AUGMENTED BRAIN</span>
          <span class="mn-mesh-node__stats">3/3 online · 8 sessions · 2 plans · 12 tasks · 36 synapses</span>
        </div>
      </div>
    </section>
  `;
}

export function createMeshNetworkSection() {
  const template = document.createElement('template');
  template.innerHTML = meshNetworkSection().trim();
  const section = template.content.firstElementChild;
  section.classList.add('mn-section-dark');
  section.innerHTML = `<div class="mn-container">${section.innerHTML}</div>`;
  return section;
}
