export interface MnNotification {
    id: string;
    title: string;
    body?: string;
    type?: 'default' | 'success' | 'warning' | 'danger';
    timestamp?: string;
    read?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}
export interface NotificationCenterOptions {
    maxVisible?: number;
    onAction?: (n: MnNotification) => void;
    position?: 'right' | 'left';
}
export interface NotificationCenterController {
    add: (n: MnNotification) => void;
    markRead: (id: string) => void;
    markAllRead: () => void;
    remove: (id: string) => void;
    clear: () => void;
    getUnreadCount: () => number;
    open: () => void;
    close: () => void;
    toggle: () => void;
    destroy: () => void;
}
/** Create a notification center panel attached to a trigger element. */
export declare function notificationCenter(triggerEl: HTMLElement, opts?: NotificationCenterOptions): NotificationCenterController;
