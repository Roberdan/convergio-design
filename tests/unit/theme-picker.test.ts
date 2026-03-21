/**
 * Unit tests for themePicker component.
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { themePicker } from '../../src/ts/theme-picker';

describe('themePicker', () => {
  let container: HTMLElement;
  let ctrl: ReturnType<typeof themePicker>;

  beforeEach(() => {
    document.body.className = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ctrl?.destroy();
    container.remove();
  });

  it('renders 5 theme cards', () => {
    ctrl = themePicker(container);
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    expect(cards.length).toBe(5);
  });

  it('has radiogroup role on container', () => {
    ctrl = themePicker(container);
    const group = container.querySelector('[role="radiogroup"]');
    expect(group).toBeTruthy();
  });

  it('each card has role="radio" and aria-checked', () => {
    ctrl = themePicker(container);
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    for (const card of cards) {
      expect(card.getAttribute('role')).toBe('radio');
      expect(card.hasAttribute('aria-checked')).toBe(true);
    }
  });

  it('active theme is highlighted with --active modifier', () => {
    document.body.classList.add('mn-nero');
    ctrl = themePicker(container, { current: 'nero' });
    const active = container.querySelector('.mn-theme-picker__card--active');
    expect(active).toBeTruthy();
    expect(active?.getAttribute('aria-checked')).toBe('true');
  });

  it('clicking a card calls onChange with theme name', () => {
    const onChange = vi.fn();
    ctrl = themePicker(container, { onChange });
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    const avoCard = Array.from(cards).find(
      (c) => c.textContent?.includes('Avorio'),
    );
    expect(avoCard).toBeTruthy();
    (avoCard as HTMLElement).click();
    expect(onChange).toHaveBeenCalledWith('avorio');
  });

  it('clicking a card applies the theme via setTheme', () => {
    ctrl = themePicker(container);
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    const neroCard = Array.from(cards).find(
      (c) => c.textContent?.includes('Nero'),
    );
    (neroCard as HTMLElement).click();
    expect(document.body.classList.contains('mn-nero')).toBe(true);
  });

  it('getTheme returns current selection', () => {
    ctrl = themePicker(container, { current: 'sugar' });
    expect(ctrl.getTheme()).toBe('sugar');
  });

  it('destroy removes DOM from container', () => {
    ctrl = themePicker(container);
    expect(container.querySelector('.mn-theme-picker')).toBeTruthy();
    ctrl.destroy();
    expect(container.querySelector('.mn-theme-picker')).toBeFalsy();
  });

  it('each card contains a mini preview rectangle', () => {
    ctrl = themePicker(container);
    const previews = container.querySelectorAll('.mn-theme-picker__preview');
    expect(previews.length).toBe(5);
  });

  it('each preview has colored dots', () => {
    ctrl = themePicker(container);
    const dotContainers = container.querySelectorAll('.mn-theme-picker__dots');
    expect(dotContainers.length).toBe(5);
  });

  it('compact mode adds compact class', () => {
    ctrl = themePicker(container, { compact: true });
    const grid = container.querySelector('.mn-theme-picker');
    expect(grid?.classList.contains('mn-theme-picker--compact')).toBe(true);
  });

  it('cards are keyboard focusable with tabindex', () => {
    ctrl = themePicker(container);
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    for (const card of cards) {
      expect(card.getAttribute('tabindex')).toBe('0');
    }
  });

  it('Enter key activates a card', () => {
    const onChange = vi.fn();
    ctrl = themePicker(container, { onChange });
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    const card = cards[2] as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('Space key activates a card', () => {
    const onChange = vi.fn();
    ctrl = themePicker(container, { onChange });
    const cards = container.querySelectorAll('.mn-theme-picker__card');
    const card = cards[1] as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(onChange).toHaveBeenCalled();
  });

  it('displays all 5 theme names', () => {
    ctrl = themePicker(container);
    const text = container.textContent ?? '';
    expect(text).toContain('Editorial');
    expect(text).toContain('Nero');
    expect(text).toContain('Avorio');
    expect(text).toContain('Colorblind');
    expect(text).toContain('Sugar');
  });
});
