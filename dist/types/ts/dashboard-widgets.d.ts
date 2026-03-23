export type DashboardWidgetType = 'kpi-strip' | 'stat-card' | 'chart' | 'gauge' | 'legend' | 'table-summary' | 'custom';
export interface WidgetController {
    render: (container: HTMLElement, data: unknown) => void;
    update: (data: unknown) => void;
    destroy: () => void;
}
export interface WidgetConfig {
    type: DashboardWidgetType;
    options?: Record<string, unknown>;
}
export declare function createDashboardWidget(config: WidgetConfig): WidgetController;
