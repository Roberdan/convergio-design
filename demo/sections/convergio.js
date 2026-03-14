export function convergioSection() {
  return `
    <section class="demo-section" id="convergio">
      <h2 class="demo-section__title"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="var(--mn-accent)"><path d="M12 2l6 10-6 10-6-10z"/></svg></span> Convergio Dashboard</h2>
      <p class="demo-section__desc">Agentic AI orchestration components — toolbars, mission cards, night agents, and the Idea Jar.</p>
      <details class="mn-code-snippet">
        <summary class="mn-label" style="cursor:pointer;color:var(--mn-accent);margin-bottom:var(--space-sm)">⟨/⟩ Usage</summary>
        <pre class="mn-card-dark" style="padding:var(--space-md);font-family:var(--font-mono);font-size:var(--text-micro);overflow-x:auto;margin-bottom:var(--space-lg);border-left:3px solid var(--mn-accent)"><code>&lt;article class="mn-mission-card"&gt;&lt;p class="mn-mission-card__title"&gt;Mission&lt;/p&gt;&lt;/article&gt;
&lt;article class="mn-night-agent"&gt;
  &lt;div class="mn-night-agent__header"&gt;&lt;p class="mn-mission-card__title"&gt;Night Agent&lt;/p&gt;&lt;/div&gt;
&lt;/article&gt;</code></pre>
      </details>

      <div class="mn-convergio-toolbar">
        <div class="mn-convergio-toolbar__nav">
          <button class="mn-convergio-pill mn-convergio-pill--active"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20v-3"/></svg></span> OVERVIEW</button>
          <button class="mn-convergio-pill"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.2a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9h.2a1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.2a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z"/></svg></span> ADMIN</button>
          <button class="mn-convergio-pill"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/></svg></span> PLANNER</button>
          <button class="mn-convergio-pill"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 7a3 3 0 0 1 6 0"/><path d="M8 7a3 3 0 0 0-3 3 3 3 0 0 0 1 5 3 3 0 0 0 4 4h4a3 3 0 0 0 4-4 3 3 0 0 0 1-5 3 3 0 0 0-3-3"/><path d="M12 7v12"/></svg></span> BRAIN</button>
          <button class="mn-convergio-pill"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12c.7.6 1.2 1.3 1.5 2h5c.3-.7.8-1.4 1.5-2A7 7 0 0 0 12 2z"/></svg></span> IDEA JAR</button>
        </div>
        <div class="mn-convergio-toolbar__brand">MARANELLO LUCE</div>
        <div class="mn-convergio-toolbar__status">
          <span class="mn-convergio-toolbar__dot"></span>
          <span class="mn-convergio-toolbar__dot mn-convergio-toolbar__dot--warning"></span>
          <span class="mn-optimize-badge">OPTIMIZE <span class="mn-optimize-badge__count">57</span></span>
          <span>14 Mar 2026 · 10:17</span>
        </div>
      </div>

      <h3 style="margin: var(--mn-space-lg, var(--space-lg)) 0 var(--mn-space-md, var(--space-md));"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="var(--mn-accent)"><path d="M12 2l6 10-6 10-6-10z"/></svg></span> ACTIVE MISSIONS</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--space-md);">
        <article class="mn-mission-card">
          <div class="mn-mission-card__header">
            <div>
              <p class="mn-mission-card__number">F-128</p>
              <p class="mn-mission-card__title">Enterprise Intake Autopilot</p>
            </div>
            <span class="mn-mission-status mn-mission-status--progress">In Progress</span>
          </div>
          <div class="mn-mission-card__progress">
            <span class="mn-mission-progress-ring" style="--mn-mission-progress: 72"></span>
            <div class="mn-mission-progress-bar">
              <span>72% complete · 18/25 tasks · SLA 4h 12m</span>
              <span class="mn-mission-progress-bar__track"><span class="mn-mission-progress-bar__fill" style="width:72%"></span></span>
            </div>
          </div>
          <p class="mn-mesh-node__stats">Agents: Planner, Validator, Reviewer · Budget burn: $1,840/day</p>
          <div class="mn-mission-card__actions">
            <button class="mn-mission-btn mn-mission-btn--delegate">Delegate</button>
            <button class="mn-mission-btn">Inspect</button>
            <button class="mn-mission-btn mn-mission-btn--cancel">Pause</button>
          </div>
        </article>

        <article class="mn-mission-card">
          <div class="mn-mission-card__header">
            <div>
              <p class="mn-mission-card__number">OPS-73</p>
              <p class="mn-mission-card__title">Global Support Deflection Copilot</p>
            </div>
            <span class="mn-mission-status mn-mission-status--done">Healthy</span>
          </div>
          <div class="mn-mission-card__progress">
            <span class="mn-mission-progress-ring" style="--mn-mission-progress: 96"></span>
            <div class="mn-mission-progress-bar">
              <span>96% complete · 48/50 intents covered · CSAT 4.8/5</span>
              <span class="mn-mission-progress-bar__track"><span class="mn-mission-progress-bar__fill" style="width:96%"></span></span>
            </div>
          </div>
          <p class="mn-mesh-node__stats">Volume: 12.4k chats/day · Automation rate: 81% · Escalations: 2.1%</p>
          <div class="mn-mission-card__actions">
            <button class="mn-mission-btn mn-mission-btn--start">Runbook</button>
            <button class="mn-mission-btn">Metrics</button>
            <button class="mn-mission-btn mn-mission-btn--reset">Recalibrate</button>
          </div>
        </article>

        <article class="mn-mission-card">
          <div class="mn-mission-card__header">
            <div>
              <p class="mn-mission-card__number">RISK-22</p>
              <p class="mn-mission-card__title">Contract Drift Sentinel</p>
            </div>
            <span class="mn-mission-status mn-mission-status--failed">At Risk</span>
          </div>
          <div class="mn-mission-card__progress">
            <span class="mn-mission-progress-ring" style="--mn-mission-progress: 41"></span>
            <div class="mn-mission-progress-bar">
              <span>41% complete · 7 unresolved policy checks · 3 blocked dependencies</span>
              <span class="mn-mission-progress-bar__track"><span class="mn-mission-progress-bar__fill" style="width:41%"></span></span>
            </div>
          </div>
          <p class="mn-mesh-node__stats">Critical: GDPR retention mapping pending legal sign-off</p>
          <div class="mn-mission-card__actions">
            <button class="mn-mission-btn mn-mission-btn--delegate">Escalate</button>
            <button class="mn-mission-btn">Open Board</button>
            <button class="mn-mission-btn mn-mission-btn--cancel">Abort Run</button>
          </div>
        </article>
      </div>

      <h3 style="margin: var(--mn-space-lg, var(--space-lg)) 0 var(--mn-space-md, var(--space-md));"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg></span> NIGHTLY JOBS</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--space-md);">
        <article class="mn-night-agent">
          <div class="mn-night-agent__header">
            <p class="mn-mission-card__title">Data Lake Agent</p>
            <span class="mn-night-agent__toggle" data-on="true">ON</span>
          </div>
          <p class="mn-night-agent__schedule">
            <span>Scope: CRM + ERP mirrors into analytics lake</span>
            <span>Schedule: 02:00 CET · weekdays</span>
            <span>Last run: 37m · 1.8M rows synced · 0 drift alerts</span>
          </p>
          <div class="mn-night-agent__actions">
            <button class="mn-night-agent__action">Run Now</button>
            <button class="mn-night-agent__action">View Log</button>
            <button class="mn-night-agent__action">Edit Window</button>
          </div>
        </article>

        <article class="mn-night-agent">
          <div class="mn-night-agent__header">
            <p class="mn-mission-card__title">Process Optimizer</p>
            <span class="mn-night-agent__toggle" data-on="true">ON</span>
          </div>
          <p class="mn-night-agent__schedule">
            <span>Scope: Rebuild process maps + suggest automation opportunities</span>
            <span>Schedule: 03:30 CET · daily</span>
            <span>Last run: 112 workflows scored · 14 high-impact ideas generated</span>
          </p>
          <div class="mn-night-agent__actions">
            <button class="mn-night-agent__action">Preview Queue</button>
            <button class="mn-night-agent__action">Approve Batch</button>
            <button class="mn-night-agent__action">Settings</button>
          </div>
        </article>
      </div>

      <h3 style="margin: var(--mn-space-lg, var(--space-lg)) 0 var(--mn-space-md, var(--space-md));"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12c.7.6 1.2 1.3 1.5 2h5c.3-.7.8-1.4 1.5-2A7 7 0 0 0 12 2z"/></svg></span> Idea Jar</h3>
      <div class="mn-idea-jar">
        <div class="mn-idea-jar__lid"></div>
        <div class="mn-idea-jar__vessel">
          <span class="mn-idea-jar__idea"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mn-accent)" stroke-width="1.5" stroke-linecap="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg></span></span>
          <span class="mn-idea-jar__idea"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mn-accent)" stroke-width="1.5" stroke-linecap="round"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg></span></span>
          <span class="mn-idea-jar__idea"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mn-accent)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><path d="M12 5v14"/><path d="M5 12h14"/></svg></span></span>
          <span class="mn-idea-jar__idea"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg></span></span>
          <span class="mn-idea-jar__idea"><span aria-hidden="true" style="display:inline-flex;align-items:center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mn-accent)" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.5"/></svg></span></span>
        </div>
        <div class="mn-idea-jar__count">23</div>
        <div class="mn-idea-jar__label">Ideas Captured</div>
        <button class="mn-idea-jar__add-btn">+ Add Idea</button>
      </div>
    </section>
  `;
}

export function createConvergioSection() {
  const template = document.createElement('template');
  template.innerHTML = convergioSection().trim();
  const section = template.content.firstElementChild;
  section.classList.add('mn-section-dark');
  section.innerHTML = `<div class="mn-container">${section.innerHTML}</div>`;
  return section;
}
