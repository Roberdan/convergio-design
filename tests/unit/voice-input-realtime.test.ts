/**
 * Unit tests for GPT Realtime voice adapter.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRealtimeAdapter } from '../../src/ts/voice-input-realtime';
import type { VoiceAdapter, VoiceEvents } from '../../src/ts/voice-input';

/** Mock WebSocket that captures constructor args and allows manual event dispatch. */
class MockWebSocket {
  static instances: MockWebSocket[] = [];
  url: string;
  protocols: string | string[] | undefined;
  readyState = 0; // CONNECTING
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;
  sentMessages: string[] = [];

  constructor(url: string, protocols?: string | string[]) {
    this.url = url;
    this.protocols = protocols;
    MockWebSocket.instances.push(this);
  }

  send(data: string): void {
    this.sentMessages.push(data);
  }

  close(): void {
    this.readyState = 3; // CLOSED
  }

  /** Simulate the server opening the connection. */
  simulateOpen(): void {
    this.readyState = 1; // OPEN
    if (this.onopen) this.onopen(new Event('open'));
  }

  /** Simulate a server message. */
  simulateMessage(data: Record<string, unknown>): void {
    if (this.onmessage) {
      this.onmessage(new MessageEvent('message', { data: JSON.stringify(data) }));
    }
  }

  /** Simulate an error event. */
  simulateError(): void {
    if (this.onerror) this.onerror(new Event('error'));
  }

  /** Simulate close event. */
  simulateClose(): void {
    this.readyState = 3;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
  }
}

describe('createRealtimeAdapter — basic properties', () => {
  it('returns an adapter with name "gpt-realtime"', () => {
    // Arrange & Act
    const adapter = createRealtimeAdapter({});

    // Assert
    expect(adapter.name).toBe('gpt-realtime');
  });

  it('isSupported() returns true when WebSocket exists', () => {
    // Arrange
    const adapter = createRealtimeAdapter({});

    // Assert
    expect(adapter.isSupported()).toBe(true);
  });
});

describe('createRealtimeAdapter — WebSocket lifecycle', () => {
  let originalWS: typeof globalThis.WebSocket;

  beforeEach(() => {
    MockWebSocket.instances = [];
    originalWS = globalThis.WebSocket;
    (globalThis as Record<string, unknown>).WebSocket = MockWebSocket;
  });

  afterEach(() => {
    (globalThis as Record<string, unknown>).WebSocket = originalWS;
  });

  it('opens a WebSocket with correct URL and auth protocol on start()', () => {
    // Arrange
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test-key-realtime',
      model: 'gpt-4o-realtime-preview',
    });

    // Act
    adapter.start({ locale: 'en-US' });

    // Assert
    expect(MockWebSocket.instances).toHaveLength(1);
    const ws = MockWebSocket.instances[0];
    expect(ws.url).toContain('wss://api.openai.com/v1/realtime');
    expect(ws.url).toContain('model=gpt-4o-realtime-preview');
  });

  it('sends session.update on WebSocket open', () => {
    // Arrange
    const adapter = createRealtimeAdapter({ apiKey: 'sk-test' });
    adapter.start({ locale: 'fr-FR' });
    const ws = MockWebSocket.instances[0];

    // Act
    ws.simulateOpen();

    // Assert
    expect(ws.sentMessages).toHaveLength(1);
    const msg = JSON.parse(ws.sentMessages[0]);
    expect(msg.type).toBe('session.update');
  });

  it('calls onTranscript with interim text on delta event', () => {
    // Arrange
    const onTranscript = vi.fn();
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test',
      events: { onTranscript },
    });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];
    ws.simulateOpen();

    // Act
    ws.simulateMessage({
      type: 'response.audio_transcript.delta',
      delta: 'Hello world',
    });

    // Assert
    expect(onTranscript).toHaveBeenCalledWith('Hello world', false);
  });

  it('calls onTranscript with final text on done event', () => {
    // Arrange
    const onTranscript = vi.fn();
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test',
      events: { onTranscript },
    });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];
    ws.simulateOpen();

    // Act
    ws.simulateMessage({
      type: 'response.audio_transcript.done',
      transcript: 'Final transcript',
    });

    // Assert
    expect(onTranscript).toHaveBeenCalledWith('Final transcript', true);
  });

  it('calls onError on server error event', () => {
    // Arrange
    const onError = vi.fn();
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test',
      events: { onError },
    });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];
    ws.simulateOpen();

    // Act
    ws.simulateMessage({
      type: 'error',
      error: { message: 'Rate limited' },
    });

    // Assert
    expect(onError).toHaveBeenCalled();
    const err = onError.mock.calls[0][0];
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toContain('Rate limited');
  });

  it('calls onError and onStateChange on WebSocket error', () => {
    // Arrange
    const onError = vi.fn();
    const onStateChange = vi.fn();
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test',
      events: { onError, onStateChange },
    });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];

    // Act
    ws.simulateError();

    // Assert
    expect(onError).toHaveBeenCalled();
    expect(onStateChange).toHaveBeenCalledWith('error');
  });

  it('stop() closes the WebSocket', () => {
    // Arrange
    const adapter = createRealtimeAdapter({ apiKey: 'sk-test' });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];
    ws.simulateOpen();
    const closeSpy = vi.spyOn(ws, 'close');

    // Act
    adapter.stop();

    // Assert
    expect(closeSpy).toHaveBeenCalled();
  });

  it('destroy() closes the WebSocket and cleans up', () => {
    // Arrange
    const adapter = createRealtimeAdapter({ apiKey: 'sk-test' });
    adapter.start({ locale: 'en-US' });
    const ws = MockWebSocket.instances[0];
    ws.simulateOpen();
    const closeSpy = vi.spyOn(ws, 'close');

    // Act
    adapter.destroy();

    // Assert
    expect(closeSpy).toHaveBeenCalled();
  });

  it('uses custom wsUrl when provided', () => {
    // Arrange
    const adapter = createRealtimeAdapter({
      apiKey: 'sk-test',
      wsUrl: 'wss://custom.example.com/v1/realtime',
    });

    // Act
    adapter.start({ locale: 'en-US' });

    // Assert
    const ws = MockWebSocket.instances[0];
    expect(ws.url).toContain('wss://custom.example.com/v1/realtime');
  });

  it('uses default model when none specified', () => {
    // Arrange
    const adapter = createRealtimeAdapter({ apiKey: 'sk-test' });

    // Act
    adapter.start({ locale: 'en-US' });

    // Assert
    const ws = MockWebSocket.instances[0];
    expect(ws.url).toContain('model=gpt-4o-realtime-preview');
  });
});
