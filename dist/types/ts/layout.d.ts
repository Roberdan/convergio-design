/**
 * layout.ts — Lightweight 4-slot layout state machine.
 * CSP-safe: zero inline handlers. All listeners via addEventListener.
 *
 * Slots: #mn-slot-strip, #mn-slot-left, #mn-slot-center, #mn-slot-right
 * Grid: #mn-grid (CSS :has()-based column collapse in layouts-mn-layout.css)
 *
 * Slot independence: each toggle affects ONLY its slot.
 * showView() only touches slots declared in the view config.
 * Strip is exclusively controlled by toggleStrip() — showView never touches it.
 */
import type { SlotConfig } from './layout-slot';
export type { SlotConfig } from './layout-slot';
export interface LayoutViewConfig {
    label: string;
    fullpage?: boolean;
    buttonId?: string;
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
export interface LayoutPersistState {
    view: string;
    strip: boolean;
    left: boolean;
    right: boolean;
    leftPanelId?: string;
    rightPanelId?: string;
    stripPanelId?: string;
}
export interface LayoutOptions {
    onStateChange?: (state: LayoutPersistState) => void;
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
export declare function createLayout(gridEl?: HTMLElement, options?: LayoutOptions): LayoutController;
