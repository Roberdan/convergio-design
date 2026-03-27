/**
 * Voice Input section — demonstrates the voiceManager state machine
 * and the VoiceAdapter pattern. No real microphone needed for the demo.
 */
export function createVoiceSection() {
  const section = document.createElement('section');
  section.id = 'voice';
  section.className = 'mn-section-light';
  section.innerHTML = `<div class="mn-container">
<p class="mn-section-number">43 — Voice Input</p>
<h2 class="mn-title-section">Voice Input Framework</h2>
<p class="mn-body">Multi-provider voice adapter framework with state machine, i18n locale awareness, and aiChat integration. Consumers provide their own speech recognition adapter.</p>
<details class="mn-code-snippet"><summary>Usage</summary><pre><code>// Standalone voice manager
const ctrl = Maranello.voiceManager({
  adapter: Maranello.createRealtimeAdapter({ apiKey: 'sk-...' }),
  events: {
    onStateChange: (state) => console.log(state), // idle|listening|processing|error
    onTranscript:  (text, isFinal) => console.log(text, isFinal),
    onError:       (err) => console.error(err),
  },
  locale: 'en-US',
});
ctrl.toggle();              // start/stop listening
ctrl.getState();            // 'idle'|'listening'|'processing'|'error'
ctrl.setAdapter(next);      // swap adapter at runtime
ctrl.destroy();

// With aiChat integration
Maranello.aiChat('#chat', {
  voiceAdapter: Maranello.createRealtimeAdapter({ apiKey: 'sk-...' }),
});</code></pre></details>
<h3 class="mn-title-subsection" style="margin-top:var(--space-xl,32px)">Voice State Machine Demo</h3>
<p class="mn-body">Simulate voice state transitions without a real microphone. The manager auto-recovers from error after 3 seconds.</p>
<div id="demo-voice-state" style="margin-top:var(--space-md,16px);display:flex;gap:var(--space-md,16px);align-items:flex-start;flex-wrap:wrap"></div>
<h3 class="mn-title-subsection" style="margin-top:var(--space-xl,32px)">Adapter Swap Demo</h3>
<p class="mn-body">Hot-swap between adapters at runtime via <code>ctrl.setAdapter()</code>. The state machine resets cleanly.</p>
<div id="demo-voice-swap" style="margin-top:var(--space-md,16px);display:flex;gap:var(--space-md,16px);align-items:center;flex-wrap:wrap"></div>
<h3 class="mn-title-subsection" style="margin-top:var(--space-xl,32px)">Custom Adapter Pattern</h3>
<details class="mn-code-snippet"><summary>Implement your own VoiceAdapter</summary><pre><code>const whisperAdapter = {
  name: 'whisper-local',
  start(config) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => { this._stream = stream; /* stream chunks to Whisper */ });
  },
  stop() {
    this._stream?.getTracks().forEach(t => t.stop());
    this._stream = null;
  },
  isSupported() { return !!navigator.mediaDevices; },
  destroy() { this.stop(); },
};
const ctrl = Maranello.voiceManager({
  adapter: whisperAdapter,
  events: {
    onStateChange: (s) => updateUI(s),
    onTranscript:  (text, isFinal) => isFinal && submitToChat(text),
  },
});</code></pre></details>
</div>`;

  requestAnimationFrame(() => initVoice(section));
  return section;
}

// ─── State badge ──────────────────────────────────────────────────────────────
const STATE_COLORS = {
  idle:       'var(--mn-text-muted,#6b7280)',
  listening:  'var(--mn-success,#22c55e)',
  processing: 'var(--mn-accent,#f59e0b)',
  error:      'var(--mn-error,#ef4444)',
};

function stateBadge(state) {
  const bg = STATE_COLORS[state] ?? 'var(--mn-text-muted)';
  return `<span style="display:inline-block;padding:2px 10px;border-radius:12px;background:${bg};color:#fff;font-size:var(--text-micro,11px);font-weight:700;letter-spacing:.04em;text-transform:uppercase">${state}</span>`;
}

// ─── Mock adapter (no real microphone) ───────────────────────────────────────
function makeMockAdapter(name, simulateError) {
  return {
    name,
    _timer: null,
    _events: null,
    start() {
      if (simulateError) {
        // Deliberately fail so we can show the error state + auto-recovery
        this._timer = setTimeout(() => {
          this._events?.onError?.(new Error('Simulated adapter error'));
        }, 800);
        return;
      }
      // Emit interim transcript at 1 s, final at 2 s
      this._timer = setTimeout(() => {
        this._events?.onTranscript?.('Show me pipeline status', false);
        setTimeout(() => {
          this._events?.onTranscript?.('Show me pipeline status for us-east-1', true);
        }, 1000);
      }, 1000);
    },
    stop() { if (this._timer !== null) { clearTimeout(this._timer); this._timer = null; } },
    isSupported() { return true; },
    destroy() { this.stop(); this._events = null; },
  };
}

function initVoice(section) {
  const M = window.Maranello;
  if (!M || !M.voiceManager) {
    ['demo-voice-state', 'demo-voice-swap'].forEach(id => {
      const el = section.querySelector('#' + id);
      if (el) el.innerHTML = '<p class="mn-micro" style="color:var(--mn-error)">voiceManager not exported</p>';
    });
    return;
  }
  initStateDemo(M, section);
  initSwapDemo(M, section);
}

// ─── State machine demo ───────────────────────────────────────────────────────
function initStateDemo(M, section) {
  const container = section.querySelector('#demo-voice-state');
  if (!container) return;

  const mock = makeMockAdapter('demo-mock', false);
  const ctrl = M.voiceManager({
    adapter: mock,
    events: {
      onStateChange(state) {
        const el = section.querySelector('#vd-badge');
        if (el) el.innerHTML = stateBadge(state);
      },
      onTranscript(text, isFinal) { updateTranscript(section, text, isFinal); },
      onError(err) { console.warn('[voice-demo]', err.message); },
    },
  });

  // Wire mock so it can emit onTranscript while manager is active
  mock._events = {
    onTranscript: (t, f) => ctrl.getState() !== 'idle' && updateTranscript(section, t, f),
    onError: (e) => { console.warn('[mock]', e.message); ctrl.stop(); },
  };

  const badgeWrap = document.createElement('div');
  badgeWrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-xs,6px);min-width:140px';
  badgeWrap.innerHTML = `<span class="mn-label">Current state</span><span id="vd-badge">${stateBadge('idle')}</span>`;
  container.appendChild(badgeWrap);

  const btnGroup = document.createElement('div');
  btnGroup.style.cssText = 'display:flex;gap:var(--space-sm,8px);flex-wrap:wrap';
  [['Toggle', () => ctrl.toggle()], ['Start', () => ctrl.start()], ['Stop', () => ctrl.stop()]].forEach(([lbl, fn]) => {
    const btn = document.createElement('button');
    btn.className = 'mn-btn mn-btn--sm';
    btn.textContent = lbl;
    btn.addEventListener('click', fn);
    btnGroup.appendChild(btn);
  });
  container.appendChild(btnGroup);

  const transcriptEl = document.createElement('div');
  transcriptEl.id = 'vd-transcript';
  transcriptEl.className = 'mn-micro';
  transcriptEl.style.cssText = 'width:100%;margin-top:var(--space-sm,8px);padding:var(--space-sm,8px);background:var(--mn-surface-raised,rgba(0,0,0,.06));border-radius:var(--radius-sm,4px);color:var(--mn-text-muted);font-style:italic';
  transcriptEl.textContent = 'Transcript appears here after Toggle/Start...';
  container.appendChild(transcriptEl);
}

function updateTranscript(section, text, isFinal) {
  const el = section.querySelector('#vd-transcript');
  if (!el) return;
  el.style.fontStyle = isFinal ? 'normal' : 'italic';
  el.style.color = isFinal ? 'var(--mn-text)' : 'var(--mn-text-muted)';
  el.textContent = (isFinal ? '' : '... ') + text;
}

// ─── Adapter swap demo ────────────────────────────────────────────────────────
function initSwapDemo(M, section) {
  const container = section.querySelector('#demo-voice-swap');
  if (!container) return;

  const adapterA = makeMockAdapter('adapter-alpha', false);
  const adapterB = makeMockAdapter('adapter-beta',  true);  // errors to show recovery

  const ctrl = M.voiceManager({
    adapter: adapterA,
    events: {
      onStateChange(state) {
        const el = section.querySelector('#vd-swap-badge');
        if (el) el.innerHTML = stateBadge(state);
      },
    },
  });

  const label = document.createElement('span');
  label.className = 'mn-label';
  label.style.minWidth = '140px';
  label.textContent = 'Active: adapter-alpha';
  container.appendChild(label);

  const badge = document.createElement('span');
  badge.id = 'vd-swap-badge';
  badge.innerHTML = stateBadge('idle');
  container.appendChild(badge);

  let current = 'alpha';
  const swapBtn = document.createElement('button');
  swapBtn.className = 'mn-btn mn-btn--sm mn-btn--outline';
  swapBtn.textContent = 'Swap to adapter-beta (errors)';
  swapBtn.addEventListener('click', () => {
    if (current === 'alpha') {
      ctrl.setAdapter(adapterB); current = 'beta';
      label.textContent = 'Active: adapter-beta';
      swapBtn.textContent = 'Swap to adapter-alpha';
    } else {
      ctrl.setAdapter(adapterA); current = 'alpha';
      label.textContent = 'Active: adapter-alpha';
      swapBtn.textContent = 'Swap to adapter-beta (errors)';
    }
  });
  container.appendChild(swapBtn);

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'mn-btn mn-btn--sm';
  toggleBtn.textContent = 'Toggle';
  toggleBtn.addEventListener('click', () => ctrl.toggle());
  container.appendChild(toggleBtn);
}
