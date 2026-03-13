/**
 * Hero section — branding showcase for FightTheStroke Foundation demo
 */
export function createHeroSection() {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container" style="text-align:center">
      <p class="mn-section-number">Maranello Luce Design System</p>
      <h1 class="mn-watermark">FightTheStroke</h1>
      <div class="mn-divider-gold--accent mn-divider-gold"></div>
      <h2 class="mn-title-hero" style="margin-bottom:var(--space-lg)">
        Foundation Dashboard
      </h2>
      <p class="mn-body">
        A fictional demonstration of the Maranello Luce Design System
        using data inspired by the FightTheStroke Foundation — an Italian
        non-profit supporting children affected by stroke.
      </p>
      <div class="mn-stat-row" style="margin-top:var(--space-3xl)">
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
        <button class="mn-btn mn-btn--accent">Explore Dashboard</button>
        <button class="mn-btn mn-btn--ghost-light">View Programs</button>
      </div>
    </div>
  `;
  return section;
}
