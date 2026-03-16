/**
 * Maranello Luce Design - Design token name constants
 * Maps to CSS custom properties defined in the theme stylesheets.
 */
export declare const SEMANTIC_COLOR: {
    readonly ACCENT: "--mn-accent";
    readonly ACCENT_HOVER: "--mn-accent-hover";
    readonly ERROR: "--mn-error";
    readonly WARNING: "--mn-warning";
    readonly SUCCESS: "--mn-success";
    readonly INFO: "--mn-info";
    readonly SURFACE: "--mn-surface";
    readonly SURFACE_RAISED: "--mn-surface-raised";
    readonly SURFACE_SUNKEN: "--mn-surface-sunken";
    readonly TEXT: "--mn-text";
    readonly TEXT_MUTED: "--mn-text-muted";
    readonly TEXT_TERTIARY: "--mn-text-tertiary";
    readonly BORDER: "--mn-border";
    readonly BORDER_SUBTLE: "--mn-border-subtle";
    readonly FOCUS_RING: "--mn-focus-ring";
};
/** @deprecated Use `SEMANTIC_COLOR` keys instead. */
export declare const COLOR: {
    /** @deprecated Use `SEMANTIC_COLOR.ERROR`. */
    readonly ROSSO_CORSA: "--mn-error";
    /** @deprecated Use `SEMANTIC_COLOR.ACCENT`. */
    readonly GIALLO_FERRARI: "--mn-accent";
    readonly VERDE_BANDIERA: "--verde-bandiera";
    /** @deprecated Use `SEMANTIC_COLOR.TEXT`. */
    readonly NERO_ASSOLUTO: "--mn-text-inverse";
    /** @deprecated Use `SEMANTIC_COLOR.SURFACE_RAISED`. */
    readonly NERO_SOFT: "--mn-surface-raised";
    /** @deprecated Use `SEMANTIC_COLOR.TEXT`. */
    readonly BIANCO_PURO: "--mn-text";
    /** @deprecated Use `SEMANTIC_COLOR.TEXT`. */
    readonly BIANCO_CALDO: "--mn-text";
    /** @deprecated Use `SEMANTIC_COLOR.TEXT_TERTIARY`. */
    readonly GRIGIO_CHIARO: "--mn-text-tertiary";
    /** @deprecated Use `SEMANTIC_COLOR.TEXT_MUTED`. */
    readonly GRIGIO_MEDIO: "--mn-text-muted";
    /** @deprecated Use `SEMANTIC_COLOR.BORDER`. */
    readonly GRIGIO_SCURO: "--mn-border";
    readonly SIGNAL_DANGER: "--signal-danger";
    readonly SIGNAL_WARNING: "--signal-warning";
    readonly SIGNAL_SUCCESS: "--signal-success";
    readonly SIGNAL_INFO: "--signal-info";
    /** @deprecated Use `SEMANTIC_COLOR.ACCENT`. */
    readonly CHART_DEFAULT: "--mn-accent";
};
export declare const FONT: {
    readonly BODY: "--font-body";
    readonly MONO: "--font-mono";
    readonly DISPLAY: "--font-display";
};
export declare const TEXT_SIZE: {
    readonly NANO: "--text-nano";
    readonly MICRO: "--text-micro";
    readonly SMALL: "--text-small";
    readonly BASE: "--text-base";
    readonly LARGE: "--text-large";
    readonly XL: "--text-xl";
    readonly XXL: "--text-xxl";
};
export declare const SPACE: {
    readonly XXS: "--space-xxs";
    readonly XS: "--space-xs";
    readonly SM: "--space-sm";
    readonly MD: "--space-md";
    readonly LG: "--space-lg";
    readonly XL: "--space-xl";
    readonly XXL: "--space-xxl";
};
export declare const DURATION: {
    readonly FAST: "--duration-fast";
    readonly SM: "--duration-sm";
    readonly MD: "--duration-md";
    readonly LG: "--duration-lg";
};
export declare const EASE: {
    readonly IN: "--ease-in";
    readonly OUT: "--ease-out";
    readonly IN_OUT: "--ease-in-out";
};
export declare const RADIUS: {
    readonly SM: "--radius-sm";
    readonly MD: "--radius-md";
    readonly LG: "--radius-lg";
    readonly FULL: "--radius-full";
};
export declare const SHADOW: {
    readonly SM: "--shadow-sm";
    readonly MD: "--shadow-md";
    readonly LG: "--shadow-lg";
};
export declare const SCOPE_COLOR: {
    readonly LOCAL: "--scope-local";
    readonly TEAM: "--scope-team";
    readonly GLOBAL: "--scope-global";
};
export declare const Z_INDEX: {
    readonly DROPDOWN: "--z-dropdown";
    readonly MODAL: "--z-modal";
    readonly TOAST: "--z-toast";
    readonly TOOLTIP: "--z-tooltip";
};
/** Token value type for all token constants. */
export type TokenName = string & {
    readonly __brand?: 'css-custom-property';
};
