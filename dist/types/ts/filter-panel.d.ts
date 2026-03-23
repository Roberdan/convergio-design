/**
 * Maranello Luce Design - Filter panel controller
 * Multi-column dropdown for filtering data with single/multi-select columns.
 */
export interface FilterPanelItem {
    label: string;
    value: string;
    selected?: boolean;
    count?: number;
    color?: string;
}
export interface FilterPanelColumn {
    id: string;
    title: string;
    type: 'single-select' | 'multi-select';
    items: FilterPanelItem[];
}
export interface FilterPanelOptions {
    columns: FilterPanelColumn[];
    onFilterChange?: (filters: Record<string, string | string[]>) => void;
    onSaveDefault?: (filters: Record<string, string | string[]>) => void;
    onClear?: () => void;
}
export interface FilterPanelController {
    open: () => void;
    close: () => void;
    isOpen: () => boolean;
    getFilters: () => Record<string, string | string[]>;
    destroy: () => void;
}
export declare function filterPanel(anchor: HTMLElement, options: FilterPanelOptions): FilterPanelController;
