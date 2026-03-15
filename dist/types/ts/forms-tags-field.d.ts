/**
 * Maranello Luce Design - Tags field widget
 * Standalone tag input with chip display, add/remove, autocomplete, and max limit.
 */
export interface TagsFieldOptions {
    value?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    maxTags?: number;
    suggestions?: string[];
}
export interface TagsFieldApi {
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    getTags: () => string[];
    setValue: (newTags: string[]) => void;
    destroy: () => void;
}
/** Initialize a standalone tags field widget inside the given element. */
export declare function initTagsField(el: HTMLElement, opts?: TagsFieldOptions): TagsFieldApi;
