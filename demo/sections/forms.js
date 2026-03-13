/**
 * Forms section — input components, validation, fieldsets
 */
export function createFormsSection() {
  const section = document.createElement('section');
  section.id = 'forms';
  section.className = 'mn-section-dark';
  section.innerHTML = `
    <div class="mn-container">
      <p class="mn-section-number">05 — Data Entry</p>
      <h2 class="mn-title-section" style="margin-bottom:var(--space-2xl)">Forms & Inputs</h2>

      <div class="mn-grid-2">
        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg);color:var(--mn-accent)">
            New Volunteer Registration
          </h4>
          <form onsubmit="return false" style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Full Name</label>
              <input class="mn-input" type="text" placeholder="Maria Rossi" style="width:100%">
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Email</label>
              <input class="mn-input" type="email" placeholder="maria@example.org" style="width:100%">
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Program</label>
              <select class="mn-select" style="width:100%">
                <option>Select a program...</option>
                <option>Movement Therapy</option>
                <option>Tech4Good Lab</option>
                <option>Family Support Network</option>
                <option>Fundraising Events</option>
              </select>
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Availability</label>
              <div style="display:flex;gap:var(--space-md);flex-wrap:wrap">
                ${checkbox('Weekdays')}
                ${checkbox('Weekends')}
                ${checkbox('Evenings')}
              </div>
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Notes</label>
              <textarea class="mn-textarea" rows="3" placeholder="Any relevant experience or preferences..."
                style="width:100%"></textarea>
            </div>
            <div class="mn-form__actions" style="display:flex;gap:var(--space-md);padding-top:var(--space-md)">
              <button class="mn-btn mn-btn--accent" type="submit">Register</button>
              <button class="mn-btn mn-btn--ghost" type="reset">Clear</button>
            </div>
          </form>
        </div>

        <div class="mn-card-dark" style="padding:var(--space-xl)">
          <h4 class="mn-label" style="margin-bottom:var(--space-lg);color:var(--mn-accent)">
            Donation Record
          </h4>
          <form onsubmit="return false" style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Donor Name</label>
              <input class="mn-input" type="text" placeholder="Giovanni Bianchi" style="width:100%">
            </div>
            <div class="mn-grid-2" style="gap:var(--space-md)">
              <div>
                <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Amount (EUR)</label>
                <input class="mn-input" type="number" placeholder="500" style="width:100%">
              </div>
              <div>
                <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Date</label>
                <input class="mn-input" type="date" style="width:100%">
              </div>
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Allocation</label>
              <div style="display:flex;flex-direction:column;gap:var(--space-sm)">
                ${radio('General Fund', 'alloc', true)}
                ${radio('Therapy Programs', 'alloc')}
                ${radio('Research', 'alloc')}
                ${radio('Technology', 'alloc')}
              </div>
            </div>
            <div>
              <label class="mn-label" style="display:block;margin-bottom:var(--space-xs)">Receipt</label>
              <input class="mn-input" type="file" accept=".pdf,.jpg,.png" style="width:100%">
            </div>
            <div class="mn-form__actions" style="display:flex;gap:var(--space-md);padding-top:var(--space-md)">
              <button class="mn-btn mn-btn--accent" type="submit">Save Donation</button>
              <button class="mn-btn mn-btn--ghost" type="reset">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  return section;
}

function checkbox(label) {
  return `<label class="mn-checkbox" style="display:flex;align-items:center;gap:var(--space-xs);cursor:pointer">
    <span class="mn-checkbox__box" style="width:16px;height:16px;border:1px solid var(--grigio-scuro);border-radius:3px;display:inline-block"></span>
    <span class="mn-micro" style="color:var(--grigio-chiaro)">${label}</span>
  </label>`;
}

function radio(label, name, checked) {
  return `<label style="display:flex;align-items:center;gap:var(--space-sm);cursor:pointer">
    <span class="mn-radio__dot" style="width:16px;height:16px;border:1px solid var(--grigio-scuro);border-radius:50%;display:inline-block;${checked ? 'background:var(--mn-accent)' : ''}"></span>
    <span class="mn-micro" style="color:var(--grigio-chiaro)">${label}</span>
  </label>`;
}
