/**
 * layout.ts — Lightweight 4-slot layout state machine.
 * CSP-safe: zero inline handlers. All listeners via addEventListener.
 *
 * Slots: #mn-slot-strip, #mn-slot-left, #mn-slot-center, #mn-slot-right
 * Grid: #mn-grid (CSS :has()-based column collapse in layouts-mn-layout.css)
 *
 * Slot independence: each toggle affects ONLY its slot.
 * showView() only touches slots declared in the view config.
 * Manual toggles persist across view switches unless overridden by config.
 */
/** Slot routing config: object with optional render callback. */
export interface SlotConfig {
    id?: string;
    render?: (slot: HTMLElement) => void;
}
export interface LayoutViewConfig {
    label: string;
    fullpage?: boolean;
    buttonId?: string;
    /** Slot routing — undefined: don't touch, false: force closed, object: open + render */
    left?: false | SlotConfig;
    right?: false | SlotConfig;
    strip?: false | SlotConfig;
    center?: (slot: HTMLElement) => void;
}
export interface LayoutState {
    view: string;
    fullpage: boolean;
    strip: boolean;
    left: boolean;
    right: boolean;
}
/** Serializable state snapshot for persistence. */
export interface LayoutPersistState {
    view: string;
    strip: boolean;
    left: boolean;
    right: boolean;
    leftPanelId?: string;
}
export interface LayoutOptions {
    /** Called on every state change — consumer decides where to persist. */
    onStateChange?: (state: LayoutPersistState) => void;
    /** Initial state from persistence layer — overrides DOM hidden attrs. */
    initialState?: Partial<LayoutPersistState>;
}
export interface LayoutController {
    register(viewId: string, config: LayoutViewConfig): void;
    showView(viewId: string): void;
    toggleStrip(config?: SlotConfig): void;
    toggleLeft(config?: SlotConfig): void;
    toggleRight(config?: SlotConfig): void;
    openRight(config?: SlotConfig): void;
    closeRight(): void;
    wireButtons(): void;
    readonly state: Readonly<LayoutState>;
    destroy(): void;
}
/** Create a layout controller bound to a grid element. */
export declare function createLayout(gridEl?: HTMLElement, options?: LayoutOptions): LayoutController;
