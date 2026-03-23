export interface SectionCardOpts {
    title: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
    padding?: boolean;
    variant?: 'default' | 'flat';
    className?: string;
}
export interface SectionCardController {
    bodyEl: HTMLElement;
    setTitle: (t: string) => void;
    setAction: (a: SectionCardOpts['action']) => void;
}
/**
 * Create a section card inside a container element.
 * Renders a titled card with optional action link and a body slot.
 */
export declare function sectionCard(el: HTMLElement, opts: SectionCardOpts): SectionCardController;
