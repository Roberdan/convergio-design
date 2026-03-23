import type { FacetConfig, FacetOption, FacetType } from './facet-workbench-render';
export type { FacetOption, FacetType, FacetConfig };
export interface FacetPreset {
    name: string;
    filters: Map<string, string[]>;
}
export interface FacetWorkbenchOptions {
    facets: FacetConfig[];
    onFilterChange?: (activeFilters: Map<string, string[]>) => void;
    presets?: FacetPreset[];
}
export declare class FacetWorkbench {
    private readonly container;
    private readonly options;
    private readonly facets;
    private readonly loadedOptions;
    private readonly filters;
    private readonly presets;
    private readonly chips;
    private readonly list;
    private readonly keyboard;
    private searchTimers;
    constructor(container: HTMLElement, options: FacetWorkbenchOptions);
    getActiveFilters(): Map<string, string[]>;
    clearAll(): void;
    clearFacet(id: string): void;
    savePreset(name: string): FacetPreset;
    loadPreset(name: string): void;
    listPresets(): ReadonlyArray<FacetPreset>;
    destroy(): void;
    private renderSkeleton;
    private loadFacetData;
    private renderFacetBody;
    private attachOptionChange;
    private removeChipValue;
    private setFacetValues;
    private syncUiFromFilters;
    private applyExclusions;
    private refreshChips;
    private commitFilters;
}
