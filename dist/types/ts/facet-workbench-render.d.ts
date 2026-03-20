export interface FacetOption {
    id: string;
    label: string;
    count?: number;
}
export type FacetType = 'select' | 'multi-select' | 'search' | 'date-range' | 'boolean';
export interface FacetConfig {
    id: string;
    label: string;
    type: FacetType;
    dataProvider: () => Promise<FacetOption[]>;
    countProvider?: (selection: Map<string, string[]>) => Promise<number>;
    exclusionRules?: {
        excludes: string[];
    };
}
export interface FacetSectionRefs {
    section: HTMLElement;
    header: HTMLButtonElement;
    body: HTMLElement;
    count: HTMLElement;
}
export declare function buildWorkbenchShell(container: HTMLElement): {
    root: HTMLElement;
    list: HTMLElement;
    chips: HTMLElement;
};
export declare function createFacetSection(facet: FacetConfig): FacetSectionRefs;
export declare function setFacetCollapsed(refs: FacetSectionRefs, collapsed: boolean): void;
export declare function renderLoading(body: HTMLElement): void;
export declare function renderOptionRows(body: HTMLElement, facet: FacetConfig, options: FacetOption[], selected: ReadonlyArray<string>): void;
export declare function renderSearchControls(body: HTMLElement, query?: string): HTMLInputElement;
export declare function renderDateRange(body: HTMLElement, selected: ReadonlyArray<string>): {
    from: HTMLInputElement;
    to: HTMLInputElement;
};
export declare function renderBoolean(body: HTMLElement, active: boolean): HTMLInputElement;
export declare function renderActiveChips(chipsContainer: HTMLElement, facets: ReadonlyArray<FacetConfig>, filters: ReadonlyMap<string, string[]>, onRemove: (facetId: string, value: string) => void): void;
export declare function setFacetDisabled(section: HTMLElement, disabled: boolean): void;
