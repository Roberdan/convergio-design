/**
 * Maranello Luce Design - Filter panel DOM builder
 * Creates the dropdown structure: columns, items, footer.
 */
import type { FilterPanelColumn } from './filter-panel';
export interface FilterPanelDom {
    el: HTMLDivElement;
    columnEls: HTMLDivElement[];
    itemEls: HTMLDivElement[][];
}
/** Build the full filter panel dropdown. */
export declare function buildFilterPanel(columns: FilterPanelColumn[], onSave: () => void, onClear: () => void): FilterPanelDom;
