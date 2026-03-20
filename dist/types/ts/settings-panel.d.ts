import type { SettingsItemType } from './settings-panel-items';
export type { SettingsItemType } from './settings-panel-items';
export interface SettingsPanelSection {
    id?: string;
    title: string;
    description?: string;
    items: SettingsItemType[];
}
export interface SettingsPanelOpts {
    sections: SettingsPanelSection[];
}
export interface SettingsPanelController {
    update: (sectionId: string, itemLabel: string, value: unknown) => void;
    getValues: () => Record<string, unknown>;
    destroy: () => void;
}
/**
 * Create a structured settings panel inside a container element.
 * Renders sections with titled rows and typed controls.
 */
export declare function settingsPanel(el: HTMLElement, opts: SettingsPanelOpts): SettingsPanelController;
