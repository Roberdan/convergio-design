/**
 * Unit tests for EventBus.
 * Uses happy-dom environment for CustomEvent / EventTarget support.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventBus } from '../../src/ts/core/events';

type TestMap = {
  'data-update': { value: number };
  'status-change': string;
  counter: number;
};

describe('EventBus', () => {
  let bus: EventBus<TestMap>;

  beforeEach(() => {
    bus = new EventBus<TestMap>(new EventTarget());
  });

  it('delivers emitted detail to subscriber', () => {
    const handler = vi.fn();
    bus.on('data-update', handler);
    bus.emit('data-update', { value: 42 });
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith({ value: 42 });
  });

  it('delivers string detail to subscriber', () => {
    const handler = vi.fn();
    bus.on('status-change', handler);
    bus.emit('status-change', 'active');
    expect(handler).toHaveBeenCalledWith('active');
  });

  it('multiple subscribers all receive the event', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('counter', h1);
    bus.on('counter', h2);
    bus.emit('counter', 7);
    expect(h1).toHaveBeenCalledWith(7);
    expect(h2).toHaveBeenCalledWith(7);
  });

  it('off removes only the specified handler', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('counter', h1);
    bus.on('counter', h2);
    bus.off('counter', h1);
    bus.emit('counter', 99);
    expect(h1).not.toHaveBeenCalled();
    expect(h2).toHaveBeenCalledWith(99);
  });

  it('off is a no-op when handler was never registered', () => {
    const handler = vi.fn();
    expect(() => bus.off('counter', handler)).not.toThrow();
  });

  it('off is a no-op for unknown event name', () => {
    const handler = vi.fn();
    // TypeScript would normally prevent this, but we cast for resilience testing
    expect(() => (bus as EventBus).off('unknown' as never, handler)).not.toThrow();
  });

  it('events are isolated between different bus instances', () => {
    const bus2 = new EventBus<TestMap>(new EventTarget());
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('counter', h1);
    bus2.on('counter', h2);
    bus.emit('counter', 1);
    expect(h1).toHaveBeenCalledWith(1);
    expect(h2).not.toHaveBeenCalled();
  });

  it('removeAll clears all listeners', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('counter', h1);
    bus.on('data-update', h2);
    bus.removeAll();
    bus.emit('counter', 5);
    bus.emit('data-update', { value: 5 });
    expect(h1).not.toHaveBeenCalled();
    expect(h2).not.toHaveBeenCalled();
  });

  it('handler can be re-registered after removal', () => {
    const handler = vi.fn();
    bus.on('counter', handler);
    bus.off('counter', handler);
    bus.on('counter', handler);
    bus.emit('counter', 3);
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith(3);
  });

  it('emitting without subscribers does not throw', () => {
    expect(() => bus.emit('counter', 0)).not.toThrow();
  });
});

describe('eventBus singleton', () => {
  it('is exported and usable', async () => {
    const { eventBus } = await import('../../src/ts/core/events');
    expect(eventBus).toBeInstanceOf(EventBus);
  });
});
