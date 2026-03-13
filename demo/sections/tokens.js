/**
 * Tokens section — colors, typography, spacing showcase
 */

function swatch(name, varName) {
  return `<div class="demo-swatch" style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-xs)">
    <div style="width:36px;height:36px;border-radius:var(--radius-sm);background:var(${varName});border:1px solid var(--grigio-scuro)"></div>
    <div>
      <div class="mn-micro" style="font-weight:600">${name}</div>
      <div class="mn-micro" style="color:var(--grigio-medio)">${varName}</div>
    </div>
  </div>`;
}

function typeSample(cls, text) {
  return `<div style="margin-bottom:var(--space-md)">
    <span class="mn-micro" style="color:var(--grigio-medio)">.${cls}</span>
    <div class="${cls}" style="text-align:left;max-width:none;margin:0">${text}</div>
  </div>`;
}

export function createTokensSection() {
  const section = document.createElement('section');
  section.id = 'tokens';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">01 — Design Tokens</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-2xl)">Colors & Typography</h2>

      <div class="mn-grid-3" style="margin-bottom:var(--space-3xl)">
        <div>
          <h3 class="mn-label" style="margin-bottom:var(--space-md);color:var(--mn-accent)">Nero Scale</h3>
          ${swatch('Assoluto', '--nero-assoluto')}
          ${swatch('Profondo', '--nero-profondo')}
          ${swatch('Carbon', '--nero-carbon')}
          ${swatch('Soft', '--nero-soft')}
        </div>
        <div>
          <h3 class="mn-label" style="margin-bottom:var(--space-md);color:var(--mn-accent)">Accent</h3>
          ${swatch('Giallo Ferrari', '--giallo-ferrari')}
          ${swatch('Rosso Corsa', '--rosso-corsa')}
          ${swatch('Verde Racing', '--verde-racing')}
          ${swatch('Arancio Warm', '--arancio-warm')}
        </div>
        <div>
          <h3 class="mn-label" style="margin-bottom:var(--space-md);color:var(--mn-accent)">Semantic</h3>
          ${swatch('Active', '--status-active')}
          ${swatch('Warning', '--status-warning')}
          ${swatch('Danger', '--status-danger')}
          ${swatch('Info', '--status-info')}
        </div>
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin-bottom:var(--space-xl)">Typography</h3>
      <div style="max-width:700px;margin:0 auto">
        ${typeSample('mn-watermark', 'Watermark')}
        ${typeSample('mn-title-hero', 'Hero Title')}
        ${typeSample('mn-title-section', 'Section Title')}
        ${typeSample('mn-title-sub', 'Sub Title')}
        ${typeSample('mn-label', 'Label Text')}
        ${typeSample('mn-caption', 'Caption text for supporting context')}
        ${typeSample('mn-micro', 'Micro — smallest text size')}
      </div>

      <h3 class="mn-title-sub" style="text-align:center;margin:var(--space-2xl) 0 var(--space-xl)">Spacing</h3>
      <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;justify-content:center">
        ${['xs','sm','md','lg','xl','2xl','3xl'].map(s =>
          `<div style="text-align:center">
            <div style="width:var(--space-${s});height:var(--space-${s});background:var(--mn-accent);border-radius:var(--radius-sm);margin:0 auto var(--space-xs)"></div>
            <span class="mn-micro">${s}</span>
          </div>`
        ).join('')}
      </div>
    </div>
  `;
  return section;
}
