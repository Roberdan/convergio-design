/**
 * Maranello Luce Design - AI Chat IIFE wrapper
 * Provides the aiChat() factory with default avatar for IIFE consumers.
 */

import { buildUI } from './ai-chat-dom';
import { initMessages } from './ai-chat-messages';
import type { AIChatOptions, AIChatController } from './ai-chat-dom';

export function aiChat(container: HTMLElement, opts?: Partial<AIChatOptions>): AIChatController {
  const full: Required<AIChatOptions> = {
    onSend: opts?.onSend ?? null,
    onQuickAction: opts?.onQuickAction ?? null,
    quickActions: opts?.quickActions ?? [],
    placeholder: opts?.placeholder ?? 'Type a message…',
    title: opts?.title ?? 'AI Assistant',
    welcomeMessage: opts?.welcomeMessage ?? null,
    avatar: opts?.avatar ?? 'https://github.com/Roberdan.png',
    agents: opts?.agents ?? [],
    activeAgent: opts?.activeAgent ?? null,
    onAgentChange: opts?.onAgentChange ?? (() => {}),
    onVoice: opts?.onVoice ?? (() => {}),
  } as Required<AIChatOptions>;
  const els = buildUI(container, full);
  initMessages(els.state, els, full);
  const { state, fab, panel, closeBtn } = els;

  function open() { panel.classList.add('mn-chat-panel--open'); panel.style.display = 'flex'; state.isOpen = true; }
  function close() { panel.classList.remove('mn-chat-panel--open'); panel.style.display = 'none'; state.isOpen = false; }
  function toggle() { state.isOpen ? close() : open(); }

  fab.addEventListener('click', toggle);
  closeBtn.addEventListener('click', close);

  return {
    open, close, toggle,
    isOpen: () => state.isOpen,
    addMessage: (role, content) => state.addMessage!(role, content),
    setTyping: (show) => state.setTyping!(show),
    clear: () => state.clear!(),
    showPulse: () => { els.pulse.classList.add('mn-chat-fab__pulse--active'); },
    destroy: () => { container.innerHTML = ''; },
  };
}
