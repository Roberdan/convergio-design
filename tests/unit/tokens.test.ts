/**
 * Unit tests for design token exports.
 * Verifies correct CSS custom property names exported from core/tokens.ts.
 */
import { describe, it, expect } from 'vitest';
import {
  COLOR,
  SEMANTIC_COLOR,
  FONT,
  TEXT_SIZE,
  SPACE,
  DURATION,
  EASE,
  RADIUS,
  SHADOW,
  SCOPE_COLOR,
  Z_INDEX,
} from '../../src/ts/core/tokens';

describe('COLOR tokens', () => {
  it('all values start with --', () => {
    for (const val of Object.values(COLOR)) {
      expect(val).toMatch(/^--/);
    }
  });

  it('ROSSO_CORSA maps to correct CSS var', () => {
    expect(COLOR.ROSSO_CORSA).toBe('--mn-error');
  });

  it('GIALLO_FERRARI maps to correct CSS var', () => {
    expect(COLOR.GIALLO_FERRARI).toBe('--mn-accent');
  });

  it('VERDE_BANDIERA maps to correct CSS var', () => {
    expect(COLOR.VERDE_BANDIERA).toBe('--verde-bandiera');
  });

  it('signal tokens exist', () => {
    expect(COLOR.SIGNAL_DANGER).toBe('--signal-danger');
    expect(COLOR.SIGNAL_WARNING).toBe('--signal-warning');
    expect(COLOR.SIGNAL_SUCCESS).toBe('--signal-success');
    expect(COLOR.SIGNAL_INFO).toBe('--signal-info');
  });

  it('CHART_DEFAULT token exists', () => {
    expect(COLOR.CHART_DEFAULT).toBe('--mn-accent');
  });

  it('has exactly 15 color tokens', () => {
    expect(Object.keys(COLOR)).toHaveLength(15);
  });

  it('semantic color tokens are exported', () => {
    expect(SEMANTIC_COLOR.ACCENT).toBe('--mn-accent');
    expect(SEMANTIC_COLOR.TEXT).toBe('--mn-text');
    expect(SEMANTIC_COLOR.BORDER).toBe('--mn-border');
    expect(SEMANTIC_COLOR.FOCUS_RING).toBe('--mn-focus-ring');
  });
});

describe('FONT tokens', () => {
  it('all values start with --', () => {
    for (const val of Object.values(FONT)) {
      expect(val).toMatch(/^--/);
    }
  });

  it('BODY, MONO, DISPLAY are correct', () => {
    expect(FONT.BODY).toBe('--font-body');
    expect(FONT.MONO).toBe('--font-mono');
    expect(FONT.DISPLAY).toBe('--font-display');
  });

  it('has exactly 3 font tokens', () => {
    expect(Object.keys(FONT)).toHaveLength(3);
  });
});

describe('TEXT_SIZE tokens', () => {
  it('all values start with --text-', () => {
    for (const val of Object.values(TEXT_SIZE)) {
      expect(val).toMatch(/^--text-/);
    }
  });

  it('includes NANO, MICRO, SMALL, BASE, LARGE, XL, XXL', () => {
    expect(TEXT_SIZE.NANO).toBe('--text-nano');
    expect(TEXT_SIZE.MICRO).toBe('--text-micro');
    expect(TEXT_SIZE.SMALL).toBe('--text-small');
    expect(TEXT_SIZE.BASE).toBe('--text-base');
    expect(TEXT_SIZE.LARGE).toBe('--text-large');
    expect(TEXT_SIZE.XL).toBe('--text-xl');
    expect(TEXT_SIZE.XXL).toBe('--text-xxl');
  });
});

describe('SPACE tokens', () => {
  it('all values start with --space-', () => {
    for (const val of Object.values(SPACE)) {
      expect(val).toMatch(/^--space-/);
    }
  });

  it('XXS through XXL are correct', () => {
    expect(SPACE.XXS).toBe('--space-xxs');
    expect(SPACE.XS).toBe('--space-xs');
    expect(SPACE.SM).toBe('--space-sm');
    expect(SPACE.MD).toBe('--space-md');
    expect(SPACE.LG).toBe('--space-lg');
    expect(SPACE.XL).toBe('--space-xl');
    expect(SPACE.XXL).toBe('--space-xxl');
  });
});

describe('SHADOW tokens', () => {
  it('all values start with --shadow-', () => {
    for (const val of Object.values(SHADOW)) {
      expect(val).toMatch(/^--shadow-/);
    }
  });

  it('SM, MD, LG are correct', () => {
    expect(SHADOW.SM).toBe('--shadow-sm');
    expect(SHADOW.MD).toBe('--shadow-md');
    expect(SHADOW.LG).toBe('--shadow-lg');
  });
});

describe('SCOPE_COLOR tokens', () => {
  it('LOCAL, TEAM, GLOBAL are correct CSS vars', () => {
    expect(SCOPE_COLOR.LOCAL).toBe('--scope-local');
    expect(SCOPE_COLOR.TEAM).toBe('--scope-team');
    expect(SCOPE_COLOR.GLOBAL).toBe('--scope-global');
  });

  it('all values start with --scope-', () => {
    for (const val of Object.values(SCOPE_COLOR)) {
      expect(val).toMatch(/^--scope-/);
    }
  });
});

describe('DURATION tokens', () => {
  it('FAST, SM, MD, LG are correct', () => {
    expect(DURATION.FAST).toBe('--duration-fast');
    expect(DURATION.SM).toBe('--duration-sm');
    expect(DURATION.MD).toBe('--duration-md');
    expect(DURATION.LG).toBe('--duration-lg');
  });
});

describe('EASE tokens', () => {
  it('IN, OUT, IN_OUT are correct', () => {
    expect(EASE.IN).toBe('--ease-in');
    expect(EASE.OUT).toBe('--ease-out');
    expect(EASE.IN_OUT).toBe('--ease-in-out');
  });
});

describe('RADIUS tokens', () => {
  it('SM, MD, LG, FULL are correct', () => {
    expect(RADIUS.SM).toBe('--radius-sm');
    expect(RADIUS.MD).toBe('--radius-md');
    expect(RADIUS.LG).toBe('--radius-lg');
    expect(RADIUS.FULL).toBe('--radius-full');
  });
});

describe('Z_INDEX tokens', () => {
  it('layer tokens exist', () => {
    expect(Z_INDEX.DROPDOWN).toBe('--z-dropdown');
    expect(Z_INDEX.MODAL).toBe('--z-modal');
    expect(Z_INDEX.TOAST).toBe('--z-toast');
    expect(Z_INDEX.TOOLTIP).toBe('--z-tooltip');
  });
});
