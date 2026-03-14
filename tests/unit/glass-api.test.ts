/**
 * Unit tests for Glass API functions.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { getGlass, setGlass, toggleGlass, setTheme } from '../../src/ts/core/utils';

describe('Glass API', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  describe('getGlass', () => {
    it('returns false when no mn-glass class', () => {
      expect(getGlass()).toBe(false);
    });

    it('returns true when mn-glass class is present', () => {
      document.body.classList.add('mn-glass');
      expect(getGlass()).toBe(true);
    });
  });

  describe('setGlass', () => {
    it('adds mn-glass class when true', () => {
      setGlass(true);
      expect(document.body.classList.contains('mn-glass')).toBe(true);
    });

    it('removes mn-glass class when false', () => {
      document.body.classList.add('mn-glass');
      setGlass(false);
      expect(document.body.classList.contains('mn-glass')).toBe(false);
    });

    it('is idempotent — multiple true calls do not duplicate', () => {
      setGlass(true);
      setGlass(true);
      const count = [...document.body.classList].filter((c) => c === 'mn-glass').length;
      expect(count).toBe(1);
    });
  });

  describe('toggleGlass', () => {
    it('enables glass when off', () => {
      const result = toggleGlass();
      expect(result).toBe(true);
      expect(document.body.classList.contains('mn-glass')).toBe(true);
    });

    it('disables glass when on', () => {
      document.body.classList.add('mn-glass');
      const result = toggleGlass();
      expect(result).toBe(false);
      expect(document.body.classList.contains('mn-glass')).toBe(false);
    });

    it('round-trips correctly', () => {
      toggleGlass(); // on
      toggleGlass(); // off
      expect(getGlass()).toBe(false);
      toggleGlass(); // on again
      expect(getGlass()).toBe(true);
    });
  });

  describe('glass + theme interaction', () => {
    it('glass class persists across theme changes', () => {
      setGlass(true);
      setTheme('nero');
      expect(getGlass()).toBe(true);
      expect(document.body.classList.contains('mn-nero')).toBe(true);
    });
  });
});
