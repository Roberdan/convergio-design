export interface MnLocale {
    themes?: {
        editorial?: string;
        nero?: string;
        avorio?: string;
        colorblind?: string;
        sugar?: string;
    };
    filterPanel?: {
        saveDefault?: string;
        clear?: string;
    };
    a11y?: {
        display?: string;
        textSize?: string;
        lineSpacing?: string;
        dyslexiaFont?: string;
        reducedMotion?: string;
        highContrast?: string;
        focusIndicators?: string;
        resetDefaults?: string;
    };
    stateScaffold?: {
        loading?: string;
        noResults?: string;
        retry?: string;
        error?: string;
        empty?: string;
        partial?: string;
    };
}
/** Fully resolved locale — all keys guaranteed present after merge with defaults. */
export interface ResolvedMnLocale {
    themes: Required<NonNullable<MnLocale['themes']>>;
    filterPanel: Required<NonNullable<MnLocale['filterPanel']>>;
    a11y: Required<NonNullable<MnLocale['a11y']>>;
    stateScaffold: Required<NonNullable<MnLocale['stateScaffold']>>;
}
export declare function setLocale(locale: MnLocale): void;
export declare function getLocale(): Readonly<ResolvedMnLocale>;
export declare function resetLocale(): void;
