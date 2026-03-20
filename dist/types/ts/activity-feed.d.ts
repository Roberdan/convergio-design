export interface ActivityItem {
    id: string;
    title: string;
    body?: string;
    meta?: string;
    /** Raw SVG string — trusted developer input, rendered via innerHTML */
    icon?: string;
    type?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}
export interface ActivityFeedOptions {
    /** Remove oldest items when exceeded; default: unlimited */
    maxItems?: number;
    /** Slide-in animation for new items; default: true */
    animate?: boolean;
}
export interface ActivityFeedController {
    add: (item: ActivityItem) => void;
    prepend: (item: ActivityItem) => void;
    clear: () => void;
    destroy: () => void;
}
/**
 * Create an activity feed timeline inside the given element.
 * @param el - Container element
 * @param items - Initial items to render
 * @param opts - Feed options
 */
export declare function activityFeed(el: HTMLElement, items?: ActivityItem[], opts?: ActivityFeedOptions): ActivityFeedController;
