export declare class BackStack<T> {
    private readonly entries;
    push(entry: T): void;
    pop(): T | undefined;
    canGoBack(): boolean;
    depth(): number;
    path(): readonly T[];
}
