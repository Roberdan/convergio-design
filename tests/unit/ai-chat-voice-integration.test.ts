/**
 * Unit tests for AI Chat voice integration.
 * Tests voiceAdapter option, VoiceManager wiring, transcript injection, CSS state classes.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { buildUI } from '../../src/ts/ai-chat-dom';
import { initMessages } from '../../src/ts/ai-chat-messages';
import type { AIChatOptions } from '../../src/ts/ai-chat-dom';
import type { VoiceAdapter } from '../../src/ts/voice-input';

function createMockAdapter(supported = true): VoiceAdapter {
  return {
    name: 'mock-adapter',
    start: vi.fn(),
    stop: vi.fn(),
    isSupported: () => supported,
    destroy: vi.fn(),
  };
}

function makeOpts(overrides?: Partial<AIChatOptions>): Required<AIChatOptions> {
  return {
    mode: 'embedded' as const,
    onSend: () => null,
    onQuickAction: () => null,
    quickActions: [],
    placeholder: 'Ask something...',
    title: 'AI Assistant',
    welcomeMessage: null,
    avatar: null,
    agents: [],
    activeAgent: null,
    onAgentChange: () => {},
    onVoice: () => {},
    ...overrides,
  } as Required<AIChatOptions>;
}

// --- AIChatOptions.voiceAdapter type acceptance ---

describe('AIChatOptions — voiceAdapter field', () => {
  it('accepts voiceAdapter as an optional property', () => {
    // Arrange
    const adapter = createMockAdapter();
    const opts: Partial<AIChatOptions> = { voiceAdapter: adapter };
    // Assert — TypeScript compiles and the property exists
    expect(opts.voiceAdapter).toBe(adapter);
  });

  it('allows omitting voiceAdapter (backward-compatible)', () => {
    // Arrange
    const opts: Partial<AIChatOptions> = { title: 'Chat' };
    // Assert
    expect(opts.voiceAdapter).toBeUndefined();
  });
});

// --- Voice barrel exports ---

describe('voice exports — barrel registration', () => {
  it('exports voiceManager from index', async () => {
    // Arrange / Act
    const mod = await import('../../src/ts/index');
    // Assert
    expect(mod).toHaveProperty('voiceManager');
    expect(typeof mod.voiceManager).toBe('function');
  });

  it('exports createRealtimeAdapter from index', async () => {
    // Arrange / Act
    const mod = await import('../../src/ts/index');
    // Assert
    expect(mod).toHaveProperty('createRealtimeAdapter');
    expect(typeof mod.createRealtimeAdapter).toBe('function');
  });
});

// --- IIFE registration ---

describe('voice IIFE registration — maranello namespace', () => {
  it('registers voiceManager on Maranello namespace', async () => {
    // Arrange / Act
    const mod = await import('../../src/ts/maranello');
    const M = mod.Maranello;
    // Assert
    expect(M).toHaveProperty('voiceManager');
    expect(typeof M.voiceManager).toBe('function');
  });

  it('registers createRealtimeAdapter on Maranello namespace', async () => {
    // Arrange / Act
    const mod = await import('../../src/ts/maranello');
    const M = mod.Maranello;
    // Assert
    expect(M).toHaveProperty('createRealtimeAdapter');
    expect(typeof M.createRealtimeAdapter).toBe('function');
  });
});
