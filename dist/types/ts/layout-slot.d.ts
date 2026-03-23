/** Per-slot state object — encapsulates all slot-specific closure variables. */
export interface SlotConfig {
    id?: string;
    render?: (slot: HTMLElement) => void;
}
export declare class SlotState {
    private readonly domId;
    visible: boolean;
    viewDriven: boolean;
    manualRender: ((el: HTMLElement) => void) | null;
    panelId: string | undefined;
    locked: boolean;
    private saved;
    constructor(domId: string, initial: boolean, panelId?: string);
    /** Write hidden to DOM. */
    sync(): void;
    /** Save state before fullpage. */
    save(): void;
    /** Restore state after fullpage. */
    restore(): void;
    /** Apply view config: undefined = don't touch (close if view-driven), false = close, object = open + render. */
    applyConfig(cfg: false | SlotConfig | undefined): void;
    /** Toggle visibility (manual). Returns false if blocked. */
    toggle(config?: SlotConfig): boolean;
    /** Open slot (manual). Returns false if blocked. */
    open(config?: SlotConfig): boolean;
    /** Close slot. */
    close(): void;
    /** Call render on DOM element. */
    private render;
}
