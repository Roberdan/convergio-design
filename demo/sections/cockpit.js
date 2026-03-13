/**
 * Cockpit section — speedometers and system status demo.
 */
export function createCockpitSection() {
  const section = document.createElement('section');
  section.id = 'cockpit';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">09 — Cockpit</p>
      <h2 class="mn-title-section mn-mb-sm">Cockpit Instruments</h2>
      <p class="mn-body mn-mb-2xl">
        Fightthestroke foundation cockpit with live-style telemetry dials and service health visibility.
      </p>

      <div class="mn-divider-gold mn-mb-lg"></div>

      <h3 class="mn-title-sub mn-mb-sm">Performance Dials</h3>
      <div class="mn-flex-wrap mn-gap-xl mn-mb-2xl" style="align-items:flex-end;justify-content:space-between">
        <div class="mn-card-dark" style="padding:var(--space-lg);text-align:center;min-width:220px;flex:1">
          <p class="mn-label mn-mb-sm">Therapy Velocity</p>
          <canvas id="cockpit-speed-therapy" width="220" height="220"></canvas>
        </div>

        <div class="mn-card-dark" style="padding:var(--space-lg);text-align:center;min-width:320px;flex:1">
          <p class="mn-label mn-mb-sm">Impact Score</p>
          <canvas id="cockpit-speed-impact" width="320" height="320"></canvas>
        </div>

        <div class="mn-card-dark" style="padding:var(--space-lg);text-align:center;min-width:140px;flex:1">
          <p class="mn-label mn-mb-sm">Volunteer Load</p>
          <canvas id="cockpit-speed-volunteer" width="120" height="120"></canvas>
        </div>
      </div>

      <h3 class="mn-title-sub mn-mb-sm">System Status</h3>
      <p class="mn-micro mn-mb-lg">Endpoints are fictional and expected to appear degraded/offline in demo mode.</p>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <div id="cockpit-system-status"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => initCockpit(section));
  return section;
}

function initCockpit(section) {
  const M = window.Maranello;
  if (!M) return;

  const therapyCanvas = section.querySelector('#cockpit-speed-therapy');
  const impactCanvas = section.querySelector('#cockpit-speed-impact');
  const volunteerCanvas = section.querySelector('#cockpit-speed-volunteer');
  const statusContainer = section.querySelector('#cockpit-system-status');

  if (M.speedometer) {
    if (therapyCanvas instanceof HTMLCanvasElement) {
      M.speedometer(therapyCanvas, {
        value: 78,
        max: 100,
        unit: '%',
        size: 'md',
        ticks: [0, 25, 50, 75, 100],
        needleColor: '#DC0000',
        arcColor: '#FFC72C',
        bar: { value: 65, max: 100 },
        subLabel: 'Target: 80%',
        animate: true,
      });
    }

    if (impactCanvas instanceof HTMLCanvasElement) {
      M.speedometer(impactCanvas, {
        value: 92,
        max: 100,
        unit: 'pts',
        size: 'lg',
        ticks: [0, 20, 40, 60, 80, 100],
        needleColor: '#DC0000',
        arcColor: '#00A651',
        subLabel: 'Above Target',
        animate: true,
      });
    }

    if (volunteerCanvas instanceof HTMLCanvasElement) {
      M.speedometer(volunteerCanvas, {
        value: 45,
        max: 100,
        unit: '%',
        size: 'sm',
        ticks: [0, 25, 50, 75, 100],
        needleColor: '#DC0000',
        arcColor: '#4EA8DE',
        subLabel: 'Healthy',
        animate: true,
      });
    }
  }

  if (M.systemStatus && statusContainer instanceof HTMLElement) {
    M.systemStatus(statusContainer, {
      version: 'v3.0.0',
      environment: 'Production',
      services: [
        { name: 'Therapy API', url: 'https://api.fightthestroke.org/therapy' },
        { name: 'Donor Portal', url: 'https://portal.fightthestroke.org' },
        { name: 'Analytics Engine', url: 'https://analytics.fightthestroke.org' },
        { name: 'Volunteer Hub', url: 'https://volunteer.fightthestroke.org' },
      ],
      pollInterval: 10000,
      onClick: service => console.log('[cockpit] service clicked:', service?.name || service),
    });
  }
}
