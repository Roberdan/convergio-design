/**
 * Controls section — Ferrari controls, toggles, buttons
 */
export function createControlsSection() {
  const section = document.createElement('section');
  section.id = 'controls';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">04 — Interactive Controls</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Ferrari Controls</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Signature Ferrari-inspired interactive controls: rotary dials,
        cruise levers, and toggle switches.
      </p>

      <div class="mn-grid-3" style="margin-bottom:var(--space-2xl)">
        <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg)">Manettino Dial</h4>
          <mn-ferrari-control type="manettino"
            options='{"positions":["Intake","Review","Therapy","Monitor","Archive"],"label":"Program Stage","initial":2}'>
          </mn-ferrari-control>
          <p class="mn-micro" style="margin-top:var(--space-md)">Drag or click positions to switch</p>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg)">Cruise Lever</h4>
          <mn-ferrari-control type="cruise-lever"
            options='{"positions":["Off","Low","Medium","High","Urgent"],"label":"Priority","initial":1}'>
          </mn-ferrari-control>
          <p class="mn-micro" style="margin-top:var(--space-md)">Vertical lever with labeled steps</p>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg)">Toggle Lever</h4>
          <div style="display:flex;flex-direction:column;gap:var(--space-lg);align-items:center">
            <mn-ferrari-control type="toggle-lever"
              options='{"label":"Auto-Assign","state":true}'>
            </mn-ferrari-control>
            <mn-ferrari-control type="toggle-lever"
              options='{"label":"Notifications","state":false}'>
            </mn-ferrari-control>
          </div>
          <p class="mn-micro" style="margin-top:var(--space-md)">Ferrari-style on/off switches</p>
        </div>
      </div>

      <div class="mn-grid-2">
        <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg)">Stepped Rotary</h4>
          <mn-ferrari-control type="stepped-rotary"
            options='{"positions":["Daily","Weekly","Monthly","Quarterly"],"label":"Report Frequency","initial":1}'>
          </mn-ferrari-control>
          <p class="mn-micro" style="margin-top:var(--space-md)">Compact tick-based selector</p>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg);text-align:center">Status Indicators</h4>
          <div style="display:flex;flex-direction:column;gap:var(--space-md)">
            ${statusRow('Active Programs', 14, 'var(--status-active)')}
            ${statusRow('Pending Reviews', 5, 'var(--status-warning)')}
            ${statusRow('Critical Alerts', 2, 'var(--status-danger)')}
            ${statusRow('Info Updates', 8, 'var(--status-info)')}
          </div>
        </div>
      </div>
    </div>
  `;
  return section;
}

function statusRow(label, count, color) {
  return `<div style="display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:var(--space-sm)">
      <div style="width:8px;height:8px;border-radius:50%;background:${color}"></div>
      <span class="mn-micro" style="color:var(--grigio-chiaro)">${label}</span>
    </div>
    <span style="font-family:var(--font-display);font-weight:700;color:var(--bianco-caldo)">${count}</span>
  </div>`;
}
