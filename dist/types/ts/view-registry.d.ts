export type Placement = 'page' | 'side-panel' | 'bottom-dock' | 'modal' | 'overlay' | 'workspace';
export interface ViewConfig {
    id: string;
    tag?: string;
    factory?: (container: HTMLElement, data?: unknown) => unknown;
    title: string;
    icon?: string;
    defaultPlacement: Placement;
    sizeHint?: {
        width?: string;
        height?: string;
    };
}
export declare class ViewRegistry {
    private static instance;
    private readonly configs;
    private constructor();
    static getInstance(): ViewRegistry;
    static reset(): void;
    register(config: ViewConfig): void;
    get(id: string): ViewConfig | undefined;
    list(): ReadonlyArray<ViewConfig>;
    unregister(id: string): boolean;
    has(id: string): boolean;
    clear(): void;
}
