export interface ViewEntry {
    viewId: string;
    params?: Record<string, unknown>;
    timestamp: number;
}
export type NavigateAction = 'push' | 'pop' | 'replace';
export type NavigateCallback = (entry: ViewEntry, action: NavigateAction) => void;
export declare class NavigationModel {
    private readonly stack;
    private readonly bus;
    private readonly callbacks;
    push(viewId: string, params?: Record<string, unknown>): ViewEntry;
    pop(): ViewEntry | undefined;
    replace(viewId: string, params?: Record<string, unknown>): ViewEntry;
    current(): ViewEntry | undefined;
    canGoBack(): boolean;
    history(): ReadonlyArray<ViewEntry>;
    remove(viewId: string): void;
    clear(): void;
    onNavigate(cb: NavigateCallback): () => void;
    destroy(): void;
    private notify;
}
