/**
 * Accessibility section — a11y showcase with skip link, keyboard nav,
 * focus indicators, prefers-reduced-motion, prefers-color-scheme
 */
export function createAccessibilitySection() {
  const section = document.createElement('section');
  section.id = 'accessibility';
  section.className = 'mn-section-light';
  section.setAttribute('aria-label', 'Accessibility Features');
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">15 — Accessibility</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-lg)">Accessibility</h2>
      <p class="mn-body" style="margin-bottom:var(--space-2xl)">
        WCAG 2.1 AA compliance built into every component. Keyboard navigation,
        screen reader support, and user preference respect.
      </p>

      ${skipLinkDemo()}
      ${keyboardNavDemo()}
      ${focusIndicatorDemo()}
      ${motionPreferenceDemo()}
      ${colorSchemeDemo()}
      ${ariaDemo()}
    </div>
  `;
  wireA11yEvents(section);
  return section;
}

function skipLinkDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Skip Links</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
      <p class="mn-body" style="margin-bottom:var(--space-md)">
        Press <kbd style="background:var(--grigio-scuro);padding:2px 8px;border-radius:4px">Tab</kbd>
        to reveal the skip link below. It jumps to main content, bypassing navigation.
      </p>
      <div style="position:relative;overflow:hidden;height:60px;border:1px dashed var(--grigio-scuro);border-radius:8px;display:flex;align-items:center;justify-content:center">
        <a href="#demo-root" class="mn-skip-link"
          style="position:absolute;top:-40px;left:8px;padding:8px 16px;background:var(--mn-accent);color:var(--nero-profondo);border-radius:4px;font-weight:600;transition:top 0.2s;z-index:1"
          onfocus="this.style.top='8px'" onblur="this.style.top='-40px'">
          Skip to main content
        </a>
        <span class="mn-micro">Tab here to see the skip link appear</span>
      </div>
    </div>`;
}

function keyboardNavDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Keyboard Navigation</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
      <p class="mn-body" style="margin-bottom:var(--space-lg)">
        All interactive elements are keyboard-accessible. Try navigating with Tab, Enter, and Arrow keys.
      </p>
      <div style="display:flex;gap:var(--space-md);flex-wrap:wrap" role="toolbar" aria-label="Demo toolbar">
        <button class="mn-btn mn-btn--accent" tabindex="0">First Action</button>
        <button class="mn-btn mn-btn--ghost" tabindex="0">Second Action</button>
        <button class="mn-btn" tabindex="0">Third Action</button>
        <button class="mn-btn mn-btn--sm" tabindex="0">Fourth Action</button>
      </div>
      <div style="margin-top:var(--space-lg)">
        <p class="mn-micro" id="a11y-key-output" aria-live="polite" style="color:var(--mn-accent)">
          Press any key while focused above...
        </p>
      </div>
    </div>`;
}

function focusIndicatorDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Focus Indicators</h3>
    <div class="mn-grid-3" style="margin-bottom:var(--space-2xl)">
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Buttons</h4>
        <p class="mn-micro" style="margin-bottom:var(--space-md)">2px solid outline with 2px offset on focus-visible</p>
        <button class="mn-btn mn-btn--accent">Focus Me</button>
      </div>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Inputs</h4>
        <p class="mn-micro" style="margin-bottom:var(--space-md)">Ring highlight with accent color on focus</p>
        <input class="mn-input" type="text" placeholder="Tab to focus" aria-label="Demo input">
      </div>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Links</h4>
        <p class="mn-micro" style="margin-bottom:var(--space-md)">Underline + outline for maximum visibility</p>
        <a href="#accessibility" style="color:var(--mn-accent)">Focus this link</a>
      </div>
    </div>`;
}

function motionPreferenceDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Motion Preferences</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
      <p class="mn-body" style="margin-bottom:var(--space-md)">
        All animations respect <code style="color:var(--mn-accent)">prefers-reduced-motion</code>.
        When enabled, transitions are instant and gauge needles skip to final position.
      </p>
      <div class="mn-grid-2">
        <div style="text-align:center">
          <div id="a11y-motion-status" class="mn-label" style="padding:var(--space-md);border:1px solid var(--grigio-scuro);border-radius:8px">
            Checking motion preference...
          </div>
        </div>
        <div>
          <p class="mn-micro">Affected components:</p>
          <ul style="list-style:none;padding:0;margin-top:var(--space-sm)">
            <li class="mn-micro" style="padding:var(--space-xs) 0">Gauge needle animation</li>
            <li class="mn-micro" style="padding:var(--space-xs) 0">Flip counter transitions</li>
            <li class="mn-micro" style="padding:var(--space-xs) 0">Chart entrance effects</li>
            <li class="mn-micro" style="padding:var(--space-xs) 0">Modal/toast slide-in</li>
            <li class="mn-micro" style="padding:var(--space-xs) 0">Page scroll behavior</li>
          </ul>
        </div>
      </div>
    </div>`;
}

function colorSchemeDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">Color Scheme</h3>
    <div class="mn-card-dark" style="padding:var(--space-xl);margin-bottom:var(--space-2xl)">
      <p class="mn-body" style="margin-bottom:var(--space-lg)">
        Four themes respond to system preferences and manual selection.
        Colorblind theme uses a WCAG-safe palette with distinct hues.
      </p>
      <div class="mn-grid-4">
        ${themeChip('Nero', '#0a0a0a', '#fafafa')}
        ${themeChip('Avorio', '#FAF3E6', '#2c2c2c')}
        ${themeChip('Editorial', '#f5f5f5', '#1a1a1a')}
        ${themeChip('Colorblind', '#0a0a0a', '#4D9DE0')}
      </div>
    </div>`;
}

function themeChip(name, bg, fg) {
  return `<div style="padding:var(--space-lg);text-align:center;border-radius:8px;background:${bg};color:${fg};border:1px solid var(--grigio-scuro)">
    <span style="font-family:var(--font-display);font-weight:600">${name}</span>
  </div>`;
}

function ariaDemo() {
  return `
    <h3 class="mn-title-sub" style="margin-bottom:var(--space-lg)">ARIA Support</h3>
    <div class="mn-grid-2">
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Built-in ARIA</h4>
        <ul style="list-style:none;padding:0">
          ${ariaItem('role="dialog"', 'Modals and panels')}
          ${ariaItem('aria-live="polite"', 'Toast notifications')}
          ${ariaItem('aria-label', 'Charts and gauges')}
          ${ariaItem('role="toolbar"', 'Button groups')}
          ${ariaItem('aria-expanded', 'Dropdowns and panels')}
        </ul>
      </div>
      <div class="mn-card-dark" style="padding:var(--space-xl)">
        <h4 class="mn-label" style="color:var(--mn-accent);margin-bottom:var(--space-md)">Contrast Ratios</h4>
        <ul style="list-style:none;padding:0">
          ${ariaItem('4.5:1 minimum', 'Normal text')}
          ${ariaItem('3:1 minimum', 'Large text and UI')}
          ${ariaItem('7:1 enhanced', 'Colorblind theme')}
          ${ariaItem('Focus ring', '3px accent outline')}
        </ul>
      </div>
    </div>`;
}

function ariaItem(attr, desc) {
  return `<li style="display:flex;justify-content:space-between;padding:var(--space-xs) 0;border-bottom:1px solid var(--grigio-scuro)">
    <code class="mn-micro" style="color:var(--mn-accent)">${attr}</code>
    <span class="mn-micro">${desc}</span>
  </li>`;
}

function wireA11yEvents(section) {
  requestAnimationFrame(() => {
    const toolbar = section.querySelector('[role="toolbar"]');
    const output = section.querySelector('#a11y-key-output');
    if (toolbar && output) {
      toolbar.addEventListener('keydown', (e) => {
        output.textContent = `Key pressed: ${e.key} (code: ${e.code})`;
      });
    }
    const motionEl = section.querySelector('#a11y-motion-status');
    if (motionEl) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => {
        motionEl.textContent = mq.matches ? 'Reduced motion: ENABLED' : 'Reduced motion: not active';
        motionEl.style.color = mq.matches ? 'var(--rosso-corsa)' : 'var(--verde-racing)';
      };
      update();
      mq.addEventListener('change', update);
    }
  });
}
