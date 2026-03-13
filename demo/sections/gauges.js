/**
 * Gauges section — FerrariGauge + Speedometer showcase
 */
export function createGaugesSection() {
  const section = document.createElement('section');
  section.id = 'gauges';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">08 — Instrumentation</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Gauges & Speedometers</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Ferrari-inspired gauges with animated needles, sub-dials, and theme-aware palettes.
      </p>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Foundation KPIs</h3>
      <div style="display:flex;gap:var(--space-2xl);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-3xl)">
        <div style="text-align:center">
          <mn-gauge value="847" max="1000" unit="" label="Children Helped" size="lg"></mn-gauge>
        </div>
        <div style="text-align:center">
          <mn-gauge value="92" max="100" unit="%" label="Volunteer Score" size="lg"></mn-gauge>
        </div>
        <div style="text-align:center">
          <mn-gauge value="78" max="100" unit="%" label="Therapy Completion" size="lg"></mn-gauge>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Compact Gauges</h3>
      <div class="mn-grid-4" style="margin-bottom:var(--space-3xl)">
        ${compactGauge('Donations', 68, '%')}
        ${compactGauge('Retention', 94, '%')}
        ${compactGauge('Outreach', 56, '%')}
        ${compactGauge('Research', 41, '%')}
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Speedometers</h3>
      <div style="display:flex;gap:var(--space-2xl);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-2xl)">
        <div style="text-align:center">
          <mn-speedometer value="12450" max="20000" unit="" label="Therapy Hours" size="md"></mn-speedometer>
        </div>
        <div style="text-align:center">
          <mn-speedometer value="2847" max="5000" unit="K EUR" label="Donations YTD" size="md"></mn-speedometer>
        </div>
        <div style="text-align:center">
          <mn-speedometer value="156" max="200" unit="" label="Active Programs" size="md"></mn-speedometer>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Small Speedometers</h3>
      <div style="display:flex;gap:var(--space-xl);justify-content:center;flex-wrap:wrap">
        <div style="text-align:center">
          <mn-speedometer value="73" max="100" unit="%" label="Milano" size="sm"></mn-speedometer>
        </div>
        <div style="text-align:center">
          <mn-speedometer value="88" max="100" unit="%" label="Roma" size="sm"></mn-speedometer>
        </div>
        <div style="text-align:center">
          <mn-speedometer value="61" max="100" unit="%" label="Torino" size="sm"></mn-speedometer>
        </div>
        <div style="text-align:center">
          <mn-speedometer value="95" max="100" unit="%" label="Firenze" size="sm"></mn-speedometer>
        </div>
      </div>
    </div>
  `;
  return section;
}

function compactGauge(label, value, unit) {
  return `<div class="mn-card-dark" style="padding:var(--space-lg);text-align:center">
    <mn-gauge value="${value}" max="100" unit="${unit}" label="${label}" size="sm"></mn-gauge>
  </div>`;
}
