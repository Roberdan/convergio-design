/**
 * Cards section — card components and tag pills demo
 */
export function createCardsSection() {
  const section = document.createElement('section');
  section.id = 'cards';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">02 — Components</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Cards & Tags</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Card containers for donation campaigns, volunteer programs, and research projects.
      </p>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-lg)">Tag Pills</h3>
      <div class="mn-tag-group" style="justify-content:center;margin-bottom:var(--space-2xl)">
        <span class="mn-tag mn-tag--active">Donations</span>
        <span class="mn-tag">Therapy</span>
        <span class="mn-tag">Research</span>
        <span class="mn-tag">Volunteers</span>
        <span class="mn-tag mn-tag--sm">Pediatric</span>
        <span class="mn-tag mn-tag--xs">Q1 2026</span>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-lg)">Program Cards</h3>
      <div class="mn-grid-3">
        ${programCard(
          'Movement Therapy',
          'Weekly physiotherapy sessions for children recovering from pediatric stroke, guided by certified specialists.',
          'Therapy', '234 children enrolled'
        )}
        ${programCard(
          'Tech4Good Lab',
          'Technology-assisted rehabilitation using gamified exercises and wearable motion sensors.',
          'Research', '12 active projects'
        )}
        ${programCard(
          'Family Support Network',
          'Peer support groups and counseling services connecting families across Italy.',
          'Community', '89 families active'
        )}
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin:var(--space-2xl) 0 var(--space-lg)">Dark Cards</h3>
      <div class="mn-grid-4">
        ${kpiCard('Donation Rate', '+18%', 'vs last quarter')}
        ${kpiCard('Volunteer Hours', '4,280', 'this month')}
        ${kpiCard('Therapy Sessions', '1,156', 'completed')}
        ${kpiCard('Research Papers', '7', 'published')}
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin:var(--space-2xl) 0 var(--space-lg)">Buttons</h3>
      <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;justify-content:center">
        <button class="mn-btn">Default</button>
        <button class="mn-btn mn-btn--ghost">Ghost</button>
        <button class="mn-btn mn-btn--accent">Accent</button>
        <button class="mn-btn mn-btn--sm">Small</button>
        <button class="mn-btn mn-btn--disabled">Disabled</button>
      </div>
    </div>
  `;
  return section;
}

function programCard(title, text, tag, stat) {
  return `<div class="mn-card">
    <div class="mn-card__image">
      <div style="font-size:2rem;color:var(--grigio-scuro)">\u2764</div>
    </div>
    <div class="mn-card__content">
      <div class="mn-tag mn-tag--xs" style="margin-bottom:var(--space-sm)">${tag}</div>
      <h4 class="mn-card__title">${title}</h4>
      <p class="mn-card__text">${text}</p>
      <p class="mn-micro" style="margin-top:var(--space-sm);color:var(--verde-racing)">${stat}</p>
    </div>
  </div>`;
}

function kpiCard(label, value, sub) {
  return `<div class="mn-card-dark" style="padding:var(--space-xl);text-align:center">
    <div class="mn-label" style="color:var(--grigio-chiaro);margin-bottom:var(--space-sm)">${label}</div>
    <div style="font-family:var(--font-display);font-size:var(--text-h1);font-weight:700;color:var(--mn-accent)">${value}</div>
    <div class="mn-micro" style="margin-top:var(--space-xs)">${sub}</div>
  </div>`;
}
