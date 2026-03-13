/**
 * Hero section — stunning above-the-fold showcase
 * Uses mn-title-hero typography + inline gauges + KPI strip
 */
export function createHeroSection() {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'mn-section-dark';
  section.style.cssText = 'min-height:100vh;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden';
  section.innerHTML = `
    <!-- Ambient glow -->
    <div style="position:absolute;top:-200px;left:50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(ellipse,rgba(255,199,44,0.06) 0%,transparent 70%);pointer-events:none"></div>

    <div class="mn-container" style="text-align:center;position:relative;z-index:1">
      <div style="margin-bottom:var(--space-xl)">
        <span class="mn-micro" style="display:inline-block;padding:4px 16px;border:1px solid var(--mn-accent);border-radius:999px;color:var(--mn-accent);letter-spacing:0.12em;font-weight:600;margin-bottom:var(--space-lg)">INTERACTIVE DEMO</span>
      </div>

      <p class="mn-section-number" style="letter-spacing:0.2em;margin-bottom:var(--space-md)">MARANELLO LUCE DESIGN SYSTEM</p>

      <h1 class="mn-title-hero" style="font-size:clamp(3rem,8vw,6rem);margin-bottom:var(--space-sm);line-height:0.95">
        <span style="color:var(--mn-accent)">Fight</span><span style="color:var(--bianco-caldo,#f5f5f5)">The</span><span style="color:var(--verde-racing)">Stroke</span>
      </h1>

      <div class="mn-divider-gold--accent mn-divider-gold" style="margin:var(--space-lg) auto"></div>

      <h2 class="mn-title-sub" style="color:var(--grigio-alluminio);margin-bottom:var(--space-xl);font-weight:400;letter-spacing:0.1em">
        FOUNDATION DASHBOARD
      </h2>

      <p class="mn-body" style="max-width:640px;margin:0 auto var(--space-2xl);color:var(--grigio-medio);line-height:1.7">
        A fictional demonstration of the Maranello Luce Design System — Ferrari-inspired
        dashboards with 90+ components, 4 themes, and Canvas 2D engines.
        Data inspired by the <strong style="color:var(--grigio-chiaro)">FightTheStroke Foundation</strong>.
      </p>

      <!-- Mini gauges strip -->
      <div style="display:flex;gap:var(--space-xl);justify-content:center;flex-wrap:wrap;margin-bottom:var(--space-2xl)">
        <div class="mn-gauge" style="width:120px">
          <div class="mn-gauge__instrument" style="width:120px;height:120px">
            <div class="mn-gauge__dial">
              <canvas class="mn-gauge__canvas" data-gauge='${miniGauge(92,'#FFC72C','Quality')}'></canvas>
              <div class="mn-gauge__glass"></div>
            </div>
          </div>
          <span class="mn-gauge__label" style="font-size:0.6rem">Quality</span>
        </div>
        <div class="mn-gauge" style="width:120px">
          <div class="mn-gauge__instrument" style="width:120px;height:120px">
            <div class="mn-gauge__dial">
              <canvas class="mn-gauge__canvas" data-gauge='${miniGauge(78,'#00A651','Impact')}'></canvas>
              <div class="mn-gauge__glass"></div>
            </div>
          </div>
          <span class="mn-gauge__label" style="font-size:0.6rem">Impact</span>
        </div>
        <div class="mn-gauge" style="width:120px">
          <div class="mn-gauge__instrument" style="width:120px;height:120px">
            <div class="mn-gauge__dial">
              <canvas class="mn-gauge__canvas" data-gauge='${miniGauge(65,'#4EA8DE','Reach')}'></canvas>
              <div class="mn-gauge__glass"></div>
            </div>
          </div>
          <span class="mn-gauge__label" style="font-size:0.6rem">Reach</span>
        </div>
      </div>

      <!-- KPI stat strip -->
      <div class="mn-stat-row">
        <div class="mn-stat">
          <div class="mn-stat__value" style="color:var(--mn-accent)">2,847</div>
          <div class="mn-stat__unit">EUR thousands</div>
          <div class="mn-stat__label">Total Donations</div>
        </div>
        <div class="mn-stat">
          <div class="mn-stat__value">312</div>
          <div class="mn-stat__unit">people</div>
          <div class="mn-stat__label">Active Volunteers</div>
        </div>
        <div class="mn-stat">
          <div class="mn-stat__value" style="color:var(--verde-racing)">1,456</div>
          <div class="mn-stat__unit">children</div>
          <div class="mn-stat__label">Children Helped</div>
        </div>
        <div class="mn-stat">
          <div class="mn-stat__value">18,340</div>
          <div class="mn-stat__unit">hours</div>
          <div class="mn-stat__label">Therapy Hours</div>
        </div>
      </div>

      <div style="margin-top:var(--space-2xl);display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap">
        <button class="mn-btn mn-btn--accent" onclick="document.getElementById('dashboard').scrollIntoView({behavior:'smooth'})">Explore Dashboard ↓</button>
        <button class="mn-btn mn-btn--ghost-light" onclick="document.getElementById('charts').scrollIntoView({behavior:'smooth'})">View Charts</button>
      </div>

      <p class="mn-micro" style="margin-top:var(--space-3xl);color:var(--grigio-scuro)">
        Scroll to explore 25+ component sections · (c) Roberdan 2026 · MIT License
      </p>
    </div>
  `;

  setTimeout(() => {
    if (window.Maranello?.initGauges) {
      window.Maranello.initGauges({ selector: '#hero .mn-gauge__canvas', threshold: 0 });
    }
  }, 200);

  return section;
}

function miniGauge(value, color, label) {
  return JSON.stringify({
    value, max: 100, color, ticks: 5, subticks: 4,
    startAngle: -225, endAngle: 45, showNeedle: true,
    numbers: [0, 50, 100],
    complications: {
      centerValue: String(value), centerUnit: '%',
    }
  });
}
