export type EngagementStatus = 'completed' | 'active' | 'pending' | 'blocked';
export type EngagementType = 'opportunity' | 'contract' | 'ticket' | 'meeting' | 'task';
export interface JourneyEngagement {
    id: string;
    title: string;
    avatar?: string;
    status: EngagementStatus;
    type: EngagementType;
    date?: string;
    assignee?: string;
    onClick?: () => void;
}
export interface JourneyPhase {
    id: string;
    label: string;
    engagements: JourneyEngagement[];
}
export interface CustomerJourneyOptions {
    orientation?: 'horizontal' | 'vertical';
    onSelect?: (engagement: JourneyEngagement) => void;
    showConnectors?: boolean;
    compactMode?: boolean;
}
export interface CustomerJourneyController {
    update: (phases: JourneyPhase[]) => void;
    selectEngagement: (id: string) => void;
    getSelected: () => string | null;
    destroy: () => void;
}
/** Extract initials from a name (max 2 chars). */
export declare function journeyInitials(name: string): string;
/**
 * Create an interactive Customer Journey swimlane visualization.
 * Renders phase columns with engagement cards, SVG connectors, and keyboard nav.
 */
export declare function customerJourney(el: HTMLElement, phases: JourneyPhase[], opts?: CustomerJourneyOptions): CustomerJourneyController;
