export interface PersonResult {
    id: string;
    name: string;
    email?: string;
    initials?: string;
}
export interface PersonFieldOptions {
    searchFn: (query: string) => Promise<PersonResult[]>;
    onSelect?: (person: {
        id: string;
        name: string;
    }) => void;
    placeholder?: string;
    value?: string;
}
export interface PersonFieldApi {
    getValue: () => string;
    setValue: (name: string) => void;
    destroy: () => void;
}
/** Initialize a person search field inside the given element. */
export declare function initPersonField(el: HTMLElement, opts: PersonFieldOptions): PersonFieldApi;
