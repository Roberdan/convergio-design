/**
 * Maranello Luce Design - Grafana-style theme picker
 * Renders preview cards for all 5 themes with radio selection.
 */
export interface ThemePickerOptions {
    current?: string;
    onChange?: (theme: string) => void;
    compact?: boolean;
}
export interface ThemePickerController {
    destroy: () => void;
    getTheme: () => string;
}
export declare function themePicker(container: HTMLElement, options?: ThemePickerOptions): ThemePickerController;
