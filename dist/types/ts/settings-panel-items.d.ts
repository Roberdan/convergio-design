export type SettingsItemType = {
    type: 'toggle';
    label: string;
    description?: string;
    value: boolean;
    onChange(v: boolean): void;
    disabled?: boolean;
} | {
    type: 'text';
    label: string;
    description?: string;
    value: string;
    onChange(v: string): void;
    placeholder?: string;
    hint?: string;
    maxLength?: number;
} | {
    type: 'select';
    label: string;
    description?: string;
    value: string;
    onChange(v: string): void;
    options: Array<{
        value: string;
        label: string;
    }>;
} | {
    type: 'range';
    label: string;
    description?: string;
    value: number;
    onChange(v: number): void;
    min: number;
    max: number;
    step?: number;
    format?(v: number): string;
} | {
    type: 'radio';
    label: string;
    description?: string;
    value: string;
    onChange(v: string): void;
    options: Array<{
        value: string;
        label: string;
    }>;
} | {
    type: 'info';
    label: string;
    value: string;
    mono?: boolean;
} | {
    type: 'action';
    label: string;
    description?: string;
    buttonLabel: string;
    variant?: 'default' | 'danger';
    onAction(): void;
} | {
    type: 'custom';
    label: string;
    description?: string;
    render(el: HTMLElement): void;
};
declare function nextId(prefix: string): string;
/** Build the label + description column for a settings row. */
declare function labelGroup(label: string, description?: string, forId?: string): HTMLElement;
/** Render a toggle (checkbox styled as switch). */
declare function renderToggle(item: Extract<SettingsItemType, {
    type: 'toggle';
}>, ac: AbortController, values: Map<string, unknown>): HTMLElement;
/** Render a text input. */
declare function renderText(item: Extract<SettingsItemType, {
    type: 'text';
}>, ac: AbortController, values: Map<string, unknown>): HTMLElement;
/** Render a select dropdown. */
declare function renderSelect(item: Extract<SettingsItemType, {
    type: 'select';
}>, ac: AbortController, values: Map<string, unknown>): HTMLElement;
export { renderToggle, renderText, renderSelect, labelGroup, nextId, };
export type {};
