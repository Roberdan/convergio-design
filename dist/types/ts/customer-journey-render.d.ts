import type { JourneyPhase, CustomerJourneyOptions, EngagementType } from './customer-journey';
/** Render all phase columns into the container. */
export declare function renderJourneyPhases(el: HTMLElement, phases: JourneyPhase[], opts: CustomerJourneyOptions, ac: AbortController, typeIcons: Record<EngagementType, string>): void;
/** Draw SVG connector lines between adjacent phases. */
export declare function drawConnectors(el: HTMLElement, phases: JourneyPhase[]): void;
