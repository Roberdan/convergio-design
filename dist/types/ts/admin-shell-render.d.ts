import type { AdminShellNavItem, AdminShellOpts } from './admin-shell';
/** Render an icon SVG string by key, falling back to empty span. */
export declare function iconHtml(key: string, cls: string): string;
/** Group nav items by their section property. Preserves insertion order. */
export declare function groupBySection(items: AdminShellNavItem[]): Map<string, AdminShellNavItem[]>;
/** Build sidebar header element. */
export declare function buildHeader(cfg: NonNullable<AdminShellOpts['sidebar']['header']>): HTMLElement;
/** Build search input element. */
export declare function buildSearch(cfg: NonNullable<AdminShellOpts['sidebar']['search']>, ac: AbortController, onInput: (q: string) => void): HTMLElement;
/** Build a single nav button. */
export declare function buildNavItem(item: AdminShellNavItem, active: boolean, ac: AbortController, onClick: (id: string) => void): HTMLButtonElement;
/** Build the topbar with breadcrumb and title. */
export declare function buildTopbar(pageLabel: string): {
    el: HTMLElement;
    breadcrumbEl: HTMLElement;
    titleEl: HTMLElement;
};
