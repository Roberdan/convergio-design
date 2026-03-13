/**
 * Maranello Luce Design - Design token name constants
 * Maps to CSS custom properties defined in the theme stylesheets.
 */

// --- Color tokens ---

export const COLOR = {
  ROSSO_CORSA: '--rosso-corsa',
  GIALLO_FERRARI: '--giallo-ferrari',
  VERDE_BANDIERA: '--verde-bandiera',
  NERO_ASSOLUTO: '--nero-assoluto',
  NERO_SOFT: '--nero-soft',
  BIANCO_PURO: '--bianco-puro',
  BIANCO_CALDO: '--bianco-caldo',
  GRIGIO_CHIARO: '--grigio-chiaro',
  GRIGIO_MEDIO: '--grigio-medio',
  GRIGIO_SCURO: '--grigio-scuro',
  SIGNAL_DANGER: '--signal-danger',
  SIGNAL_WARNING: '--signal-warning',
  SIGNAL_SUCCESS: '--signal-success',
  SIGNAL_INFO: '--signal-info',
  CHART_DEFAULT: '--chart-default',
} as const;

// --- Typography tokens ---

export const FONT = {
  BODY: '--font-body',
  MONO: '--font-mono',
  DISPLAY: '--font-display',
} as const;

export const TEXT_SIZE = {
  NANO: '--text-nano',
  MICRO: '--text-micro',
  SMALL: '--text-small',
  BASE: '--text-base',
  LARGE: '--text-large',
  XL: '--text-xl',
  XXL: '--text-xxl',
} as const;

// --- Spacing tokens ---

export const SPACE = {
  XXS: '--space-xxs',
  XS: '--space-xs',
  SM: '--space-sm',
  MD: '--space-md',
  LG: '--space-lg',
  XL: '--space-xl',
  XXL: '--space-xxl',
} as const;

// --- Motion tokens ---

export const DURATION = {
  FAST: '--duration-fast',
  SM: '--duration-sm',
  MD: '--duration-md',
  LG: '--duration-lg',
} as const;

export const EASE = {
  IN: '--ease-in',
  OUT: '--ease-out',
  IN_OUT: '--ease-in-out',
} as const;

// --- Border tokens ---

export const RADIUS = {
  SM: '--radius-sm',
  MD: '--radius-md',
  LG: '--radius-lg',
  FULL: '--radius-full',
} as const;

// --- Shadow tokens ---

export const SHADOW = {
  SM: '--shadow-sm',
  MD: '--shadow-md',
  LG: '--shadow-lg',
} as const;

// --- Scope color tokens (OKR / org) ---

export const SCOPE_COLOR = {
  LOCAL: '--scope-local',
  TEAM: '--scope-team',
  GLOBAL: '--scope-global',
} as const;

// --- Z-index tokens ---

export const Z_INDEX = {
  DROPDOWN: '--z-dropdown',
  MODAL: '--z-modal',
  TOAST: '--z-toast',
  TOOLTIP: '--z-tooltip',
} as const;

/** Token value type for all token constants. */
export type TokenName = string & { readonly __brand?: 'css-custom-property' };
