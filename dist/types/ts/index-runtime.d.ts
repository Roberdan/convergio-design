/**
 * Maranello Luce Design — v4.17.0 Presentation Runtime re-exports
 * Kept in a separate barrel so index.ts stays under the 250-line limit.
 */
export { NavigationModel } from './navigation-model';
export type { ViewEntry, NavigateAction, NavigateCallback } from './navigation-model';
export { ViewRegistry } from './view-registry';
export type { ViewConfig, Placement } from './view-registry';
export { AppShellController } from './app-shell';
export type { LayoutMode, AppShellConfig } from './app-shell';
export { PanelOrchestrator } from './panel-orchestrator';
export type { PanelHandle } from './panel-orchestrator';
export { StateScaffold } from './state-scaffold';
export type { StateScaffoldOptions } from './state-scaffold';
export { DashboardRenderer } from './dashboard-renderer';
export type { WidgetType, DashboardWidget, DashboardRow, DashboardSchema } from './dashboard-renderer';
export { FacetWorkbench } from './facet-workbench';
export type { FacetOption, FacetType, FacetConfig, FacetPreset, FacetWorkbenchOptions } from './facet-workbench';
export { EntityWorkbench } from './entity-workbench';
export type { EntityField, EntitySection, EntityTab, EntitySchema, EntityWorkbenchOptions, } from './entity-workbench';
export { AsyncSelect } from './async-select';
export type { AsyncDataProvider, AsyncSelectOptions } from './async-select';
