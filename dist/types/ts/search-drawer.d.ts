/**
 * Maranello Luce Design - Search drawer
 * Opens a right-side drawer with search input, async results, and sections.
 */
export interface SearchDrawerResult {
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;
}
export interface SearchDrawerOptions {
    title: string;
    placeholder?: string;
    onSearch: (query: string) => Promise<SearchDrawerResult[]>;
    onResultClick: (result: SearchDrawerResult) => void;
    sections?: Array<{
        id: string;
        label: string;
        renderer: (el: HTMLElement) => void;
    }>;
}
export interface SearchDrawerController {
    close: () => void;
    setResults: (results: SearchDrawerResult[]) => void;
    setLoading: (loading: boolean) => void;
}
/** Open a search drawer on the right side. */
export declare function openSearchDrawer(opts: SearchDrawerOptions): SearchDrawerController;
