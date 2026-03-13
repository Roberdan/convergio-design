/**
 * Detail Panel section — slide-over panel with tabs and fields
 */
export function createDetailPanelSection() {
  const section = document.createElement('section');
  section.id = 'detail-panel';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">10 — Detail Views</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Detail Panel</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Slide-over panel with tabbed sections, field rendering, edit mode,
        and async save. Click the button to open.
      </p>

      <div style="text-align:center;margin-bottom:var(--space-2xl)">
        <button class="mn-btn mn-btn--accent" id="demo-open-detail">
          Open Therapy Program Detail
        </button>
      </div>

      <mn-detail-panel id="demo-detail-panel"
        title="Movement Therapy — Milano"
        sections='${detailSections()}'
      ></mn-detail-panel>

      <h3 class="mn-title-sub" style="text-align:center;margin:var(--space-2xl) 0 var(--space-lg)">
        Panel Features
      </h3>
      <div class="mn-grid-3">
        ${featureCard('Tabbed Sections', 'Organize data across multiple tabs with smooth transitions.')}
        ${featureCard('Edit Mode', 'Toggle between view and edit states with inline validation.')}
        ${featureCard('Async Save', 'Save changes with loading states and success/error feedback.')}
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const btn = section.querySelector('#demo-open-detail');
    const panel = section.querySelector('#demo-detail-panel');
    if (btn && panel) {
      btn.addEventListener('click', () => panel.open());
    }
  });

  return section;
}

function esc(str) { return str.replace(/'/g, '&#39;'); }

function detailSections() {
  const data = {
    tabs: [
      {
        id: 'overview', label: 'Overview',
        fields: [
          { key: 'program', label: 'Program', value: 'Movement Therapy' },
          { key: 'city', label: 'City', value: 'Milano' },
          { key: 'status', label: 'Status', value: 'Active', type: 'tag' },
          { key: 'start', label: 'Start Date', value: '2026-01-15' },
          { key: 'end', label: 'End Date', value: '2026-08-31' },
          { key: 'lead', label: 'Program Lead', value: 'Dr. Maria Rossi' },
          { key: 'enrolled', label: 'Children Enrolled', value: '47' },
          { key: 'completion', label: 'Completion Rate', value: '78%' },
        ],
      },
      {
        id: 'sessions', label: 'Sessions',
        fields: [
          { key: 'weekly', label: 'Weekly Sessions', value: '3' },
          { key: 'duration', label: 'Session Duration', value: '45 min' },
          { key: 'total', label: 'Total Completed', value: '312' },
          { key: 'upcoming', label: 'Next Session', value: '2026-03-15 09:00' },
          { key: 'location', label: 'Location', value: 'Therapy Center A' },
        ],
      },
      {
        id: 'outcomes', label: 'Outcomes',
        fields: [
          { key: 'mobility', label: 'Mobility Improvement', value: '62%' },
          { key: 'strength', label: 'Strength Gain', value: '45%' },
          { key: 'coordination', label: 'Coordination Score', value: '7.8/10' },
          { key: 'satisfaction', label: 'Family Satisfaction', value: '94%' },
        ],
      },
    ],
  };
  return esc(JSON.stringify(data));
}

function featureCard(title, text) {
  return `<div class="mn-card-dark" style="padding:var(--space-xl)">
    <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-sm)">${title}</h4>
    <p class="mn-micro">${text}</p>
  </div>`;
}
