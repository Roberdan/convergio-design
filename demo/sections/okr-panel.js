/**
 * OKR Panel section — objectives and key results dashboard
 */
export function createOkrSection() {
  const section = document.createElement('section');
  section.id = 'okr';
  section.className = 'mn-section-light';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">11 — Strategy</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">OKR Dashboard</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        Objective and Key Result tracking with progress visualization,
        hero gauge, and scope tokens.
      </p>

      <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
        <mn-okr
          objectives='${okrData()}'
          options='${okrOptions()}'
        ></mn-okr>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">
        Regional Progress
      </h3>
      <div class="mn-grid-2">
        ${regionCard('Northern Italy', [
          { kr: 'Open 3 new therapy centers', pct: 67 },
          { kr: 'Train 50 local therapists', pct: 82 },
          { kr: 'Reach 200 new families', pct: 45 },
        ])}
        ${regionCard('Central Italy', [
          { kr: 'Launch mobile therapy unit', pct: 90 },
          { kr: 'Partner with 5 hospitals', pct: 60 },
          { kr: 'Publish 2 research papers', pct: 50 },
        ])}
      </div>
    </div>
  `;
  return section;
}

function esc(str) { return str.replace(/'/g, '&#39;'); }

function okrData() {
  const objectives = [
    {
      id: 'o1',
      title: 'Expand Therapy Access in Northern Italy',
      progress: 62,
      keyResults: [
        { id: 'kr1', title: 'Open centers in Torino and Bologna', progress: 75, target: 2, current: 1.5 },
        { id: 'kr2', title: 'Enroll 500 children in therapy programs', progress: 68, target: 500, current: 340 },
        { id: 'kr3', title: 'Achieve 90% family satisfaction score', progress: 94, target: 90, current: 85 },
        { id: 'kr4', title: 'Reduce wait time to under 2 weeks', progress: 40, target: 14, current: 22 },
      ],
    },
    {
      id: 'o2',
      title: 'Strengthen Research Partnerships',
      progress: 55,
      keyResults: [
        { id: 'kr5', title: 'Publish 4 peer-reviewed papers', progress: 50, target: 4, current: 2 },
        { id: 'kr6', title: 'Secure 3 university collaborations', progress: 67, target: 3, current: 2 },
        { id: 'kr7', title: 'Launch Brain Research Initiative pilot', progress: 30, target: 1, current: 0.3 },
      ],
    },
    {
      id: 'o3',
      title: 'Grow Volunteer Network',
      progress: 78,
      keyResults: [
        { id: 'kr8', title: 'Recruit 100 new volunteers', progress: 85, target: 100, current: 85 },
        { id: 'kr9', title: 'Achieve 80% volunteer retention rate', progress: 72, target: 80, current: 58 },
      ],
    },
  ];
  return esc(JSON.stringify(objectives));
}

function okrOptions() {
  return esc(JSON.stringify({ title: 'Q1 2026 Objectives', period: 'Jan - Mar 2026' }));
}

function regionCard(region, keyResults) {
  const krs = keyResults.map(kr => `
    <div style="margin-bottom:var(--space-md)">
      <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs)">
        <span class="mn-micro">${kr.kr}</span>
        <span class="mn-micro" style="color:var(--mn-accent)">${kr.pct}%</span>
      </div>
      <div style="height:4px;border-radius:2px;background:var(--grigio-scuro)">
        <div style="height:100%;width:${kr.pct}%;border-radius:2px;background:var(--mn-accent);transition:width 1s ease"></div>
      </div>
    </div>
  `).join('');

  return `<div class="mn-card-dark" style="padding:var(--space-xl)">
    <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-lg)">${region}</h4>
    ${krs}
  </div>`;
}
