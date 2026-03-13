/**
 * Web Components section — custom element showcase
 */
export function createWebComponentsSection() {
  const section = document.createElement('section');
  section.id = 'web-components';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">14 — Web Components</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Web Components</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Framework-agnostic custom elements that work anywhere: vanilla HTML,
        React, Vue, Angular. Shadow DOM encapsulation with theme-aware styling.
      </p>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">mn-gauge</h3>
      <div style="display:flex;gap:var(--space-xl);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-3xl)">
        <div class="mn-card-dark" style="padding:var(--space-lg);text-align:center">
          <mn-gauge value="67" max="100" unit="%" label="Campaign Goal" size="sm"></mn-gauge>
          <code class="mn-micro" style="display:block;margin-top:var(--space-sm);color:var(--grigio-medio)">
            &lt;mn-gauge value="67"&gt;
          </code>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-lg);text-align:center">
          <mn-gauge value="423" max="500" unit="" label="Volunteers" size="sm"></mn-gauge>
          <code class="mn-micro" style="display:block;margin-top:var(--space-sm);color:var(--grigio-medio)">
            &lt;mn-gauge value="423" max="500"&gt;
          </code>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">mn-chart</h3>
      <div class="mn-grid-2" style="margin-bottom:var(--space-3xl)">
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Sparkline</h4>
          <mn-chart type="sparkline" width="280" height="60"
            data='[85,92,78,105,120,98,115,130,125,142]'>
          </mn-chart>
          <code class="mn-micro" style="display:block;margin-top:var(--space-sm);color:var(--grigio-medio)">
            &lt;mn-chart type="sparkline" data="[...]"&gt;
          </code>
        </div>
        <div class="mn-card-dark" style="padding:var(--space-lg)">
          <h4 class="mn-label" style="margin-bottom:var(--space-md)">Donut</h4>
          <mn-chart type="donut" width="140" height="140"
            data='[{"label":"Therapy","value":55,"color":"#FFC72C"},{"label":"Research","value":30,"color":"#4EA8DE"},{"label":"Admin","value":15,"color":"#616161"}]'>
          </mn-chart>
          <code class="mn-micro" style="display:block;margin-top:var(--space-sm);color:var(--grigio-medio)">
            &lt;mn-chart type="donut"&gt;
          </code>
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">mn-toast</h3>
      <div style="display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-3xl)">
        ${wcToastDemo('success', 'Donation received', 'EUR 100 from Milano')}
        ${wcToastDemo('warning', 'Capacity alert', 'Center near limit')}
        ${wcToastDemo('info', 'New registration', 'Volunteer signed up')}
        ${wcToastDemo('danger', 'Service error', 'Database timeout')}
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">mn-theme-toggle</h3>
      <div class="mn-card-dark" style="padding:var(--space-xl);text-align:center;margin-bottom:var(--space-3xl)">
        <p class="mn-body" style="margin-bottom:var(--space-lg)">
          Toggle between Nero, Avorio, Editorial, and Colorblind themes.
        </p>
        <mn-theme-toggle mode="nero"></mn-theme-toggle>
        <code class="mn-micro" style="display:block;margin-top:var(--space-lg);color:var(--grigio-medio)">
          &lt;mn-theme-toggle mode="nero"&gt;&lt;/mn-theme-toggle&gt;
        </code>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Usage</h3>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <pre class="mn-micro" style="color:var(--grigio-chiaro);overflow-x:auto;white-space:pre-wrap"><code>&lt;!-- Load IIFE bundle --&gt;
&lt;script src="maranello.min.js"&gt;&lt;/script&gt;

&lt;!-- Load individual Web Components --&gt;
&lt;script src="wc/mn-gauge.js"&gt;&lt;/script&gt;
&lt;script src="wc/mn-chart.js"&gt;&lt;/script&gt;
&lt;script src="wc/mn-theme-toggle.js"&gt;&lt;/script&gt;

&lt;!-- Use anywhere in HTML --&gt;
&lt;mn-gauge value="75" max="100" label="Score"&gt;&lt;/mn-gauge&gt;
&lt;mn-chart type="sparkline" data="[1,2,3,4,5]"&gt;&lt;/mn-chart&gt;</code></pre>
      </div>
    </div>
  `;
  return section;
}

function wcToastDemo(type, title, message) {
  const colors = { success: '#00A651', warning: '#FFC72C', info: '#4EA8DE', danger: '#DC0000' };
  return `<div class="mn-card-dark" style="padding:var(--space-lg);min-width:200px">
    <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
      <span style="width:8px;height:8px;border-radius:50%;background:${colors[type]}"></span>
      <span class="mn-label">${title}</span>
    </div>
    <p class="mn-micro">${message}</p>
    <code class="mn-micro" style="display:block;margin-top:var(--space-sm);color:var(--grigio-medio)">
      type="${type}"
    </code>
  </div>`;
}
