/** Extended icon map with scrubbed, generic names. */
export declare const azIcons: {
    /** Generic project board icon (was: engagement). */
    readonly project: () => string;
    /** Generic workspace/location icon (was: studio). */
    readonly workspace: () => string;
    /** Now/Next dual-panel icon. */
    readonly nowNext: () => string;
};
/** Type for the azIcons map keys. */
export type AzIconName = keyof typeof azIcons;
