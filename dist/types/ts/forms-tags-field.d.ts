/**
 * Maranello Luce Design - Tags field widget
 * Standalone tag input with chip display, add/remove, and max limit.
 */
export interface TagsFieldOptions {
    initialTags?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    maxTags?: number;
}
export interface TagsFieldApi {
    addTag: (value: string) => void;
    removeTag: (value: string) => void;
    getTags: () => string[];
    destroy: () => void;
}
/** Initialize a standalone tags field widget inside the given element. */
export declare function initTagsField(el: HTMLElement, opts?: TagsFieldOptions): TagsFieldApi;
