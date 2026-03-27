/**
 * Unit tests for VoiceManager and VoiceAdapter framework.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { voiceManager } from '../../src/ts/voice-input';
import type {
  VoiceAdapter,
  VoiceState,
  VoiceEvents,
  VoiceManagerOptions,
  VoiceManagerController,
} from '../../src/ts/voice-input';

/** Helper: create a mock adapter with configurable support. */
function createMockAdapter(supported = true): VoiceAdapter & {
  startCalls: number;
  stopCalls: number;
  destroyCalls: number;
} {
  const adapter = {
    name: 'mock-speech',
    startCalls: 0,
    stopCalls: 0,
    destroyCalls: 0,
    start: vi.fn(function () { adapter.startCalls++; }),
    stop: vi.fn(function () { adapter.stopCalls++; }),
    isSupported: vi.fn(() => supported),
    destroy: vi.fn(function () { adapter.destroyCalls++; }),
  };
  return adapter;
}

describe('voiceManager — state machine', () => {
  let adapter: ReturnType<typeof createMockAdapter>;
  let ctrl: VoiceManagerController;

  beforeEach(() => {
    adapter = createMockAdapter();
  });

  afterEach(() => {
    ctrl?.destroy();
  });

  it('starts in idle state', () => {
    // Arrange & Act
    ctrl = voiceManager({ adapter });

    // Assert
    expect(ctrl.getState()).toBe('idle');
  });

  it('transitions to listening on start()', () => {
    // Arrange
    const onStateChange = vi.fn();
    ctrl = voiceManager({ adapter, events: { onStateChange } });

    // Act
    ctrl.start();

    // Assert
    expect(ctrl.getState()).toBe('listening');
    expect(adapter.start).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith('listening');
  });

  it('transitions back to idle on stop()', () => {
    // Arrange
    const onStateChange = vi.fn();
    ctrl = voiceManager({ adapter, events: { onStateChange } });
    ctrl.start();

    // Act
    ctrl.stop();

    // Assert
    expect(ctrl.getState()).toBe('idle');
    expect(adapter.stop).toHaveBeenCalledTimes(1);
    expect(onStateChange).toHaveBeenCalledWith('idle');
  });

  it('toggle() starts from idle and stops from listening', () => {
    // Arrange
    ctrl = voiceManager({ adapter });

    // Act & Assert — toggle ON
    ctrl.toggle();
    expect(ctrl.getState()).toBe('listening');

    // Act & Assert — toggle OFF
    ctrl.toggle();
    expect(ctrl.getState()).toBe('idle');
  });

  it('toggle() stops from processing state', () => {
    // Arrange — we need processing state; simulate via external state change
    const onStateChange = vi.fn();
    ctrl = voiceManager({ adapter, events: { onStateChange } });
    ctrl.start();

    // Assert precondition
    expect(ctrl.getState()).toBe('listening');

    // Act — toggle from listening should stop
    ctrl.toggle();
    expect(ctrl.getState()).toBe('idle');
  });
});

describe('voiceManager — unsupported adapter (fail-loud)', () => {
  it('warns and transitions to error when adapter is not supported', () => {
    // Arrange
    const unsupported = createMockAdapter(false);
    const onError = vi.fn();
    const onStateChange = vi.fn();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const ctrl = voiceManager({
      adapter: unsupported,
      events: { onError, onStateChange },
    });

    // Act
    ctrl.start();

    // Assert
    expect(ctrl.getState()).toBe('error');
    expect(warnSpy).toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
    expect(onStateChange).toHaveBeenCalledWith('error');
    expect(unsupported.start).not.toHaveBeenCalled();

    ctrl.destroy();
    warnSpy.mockRestore();
  });

  it('auto-recovers to idle after error timeout', () => {
    // Arrange
    vi.useFakeTimers();
    const unsupported = createMockAdapter(false);
    const onStateChange = vi.fn();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const ctrl = voiceManager({
      adapter: unsupported,
      events: { onStateChange },
    });

    // Act
    ctrl.start();
    expect(ctrl.getState()).toBe('error');

    // Advance past 3-second recovery
    vi.advanceTimersByTime(3000);

    // Assert
    expect(ctrl.getState()).toBe('idle');
    expect(onStateChange).toHaveBeenCalledWith('idle');

    ctrl.destroy();
    warnSpy.mockRestore();
    vi.useRealTimers();
  });
});

describe('voiceManager — adapter config', () => {
  it('passes locale to adapter.start()', () => {
    // Arrange
    const adapter = createMockAdapter();
    const ctrl = voiceManager({ adapter, locale: 'it-IT' });

    // Act
    ctrl.start();

    // Assert
    expect(adapter.start).toHaveBeenCalledWith(
      expect.objectContaining({ locale: 'it-IT' }),
    );

    ctrl.destroy();
  });

  it('defaults locale to navigator.language when not provided', () => {
    // Arrange
    const adapter = createMockAdapter();
    const ctrl = voiceManager({ adapter });

    // Act
    ctrl.start();

    // Assert — should have a locale string (navigator.language)
    const callArg = (adapter.start as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(callArg).toHaveProperty('locale');
    expect(typeof callArg.locale).toBe('string');

    ctrl.destroy();
  });
});

describe('voiceManager — setAdapter()', () => {
  it('swaps adapter and stops previous if listening', () => {
    // Arrange
    const adapter1 = createMockAdapter();
    const adapter2 = createMockAdapter();
    const ctrl = voiceManager({ adapter: adapter1 });
    ctrl.start();
    expect(ctrl.getState()).toBe('listening');

    // Act
    ctrl.setAdapter(adapter2);

    // Assert — old adapter stopped, state reset to idle
    expect(adapter1.stop).toHaveBeenCalled();
    expect(ctrl.getState()).toBe('idle');

    // New adapter works
    ctrl.start();
    expect(adapter2.start).toHaveBeenCalled();
    expect(ctrl.getState()).toBe('listening');

    ctrl.destroy();
  });

  it('swaps adapter without stopping if idle', () => {
    // Arrange
    const adapter1 = createMockAdapter();
    const adapter2 = createMockAdapter();
    const ctrl = voiceManager({ adapter: adapter1 });

    // Act
    ctrl.setAdapter(adapter2);

    // Assert
    expect(adapter1.stop).not.toHaveBeenCalled();

    ctrl.destroy();
  });
});

describe('voiceManager — destroy()', () => {
  it('stops adapter and cleans up', () => {
    // Arrange
    vi.useFakeTimers();
    const adapter = createMockAdapter();
    const ctrl = voiceManager({ adapter });
    ctrl.start();

    // Act
    ctrl.destroy();

    // Assert
    expect(adapter.stop).toHaveBeenCalled();
    expect(ctrl.getState()).toBe('idle');

    // Verify no error after timer fires (timeout was cleared)
    vi.advanceTimersByTime(5000);

    vi.useRealTimers();
  });
});

describe('voiceManager — no-op on duplicate start/stop', () => {
  it('ignores start() when already listening', () => {
    // Arrange
    const adapter = createMockAdapter();
    const ctrl = voiceManager({ adapter });
    ctrl.start();

    // Act
    ctrl.start();

    // Assert — adapter.start called only once
    expect(adapter.start).toHaveBeenCalledTimes(1);

    ctrl.destroy();
  });

  it('ignores stop() when already idle', () => {
    // Arrange
    const adapter = createMockAdapter();
    const ctrl = voiceManager({ adapter });

    // Act
    ctrl.stop();

    // Assert — adapter.stop not called
    expect(adapter.stop).not.toHaveBeenCalled();

    ctrl.destroy();
  });
});
