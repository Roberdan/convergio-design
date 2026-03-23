import { type DashboardWidgetType } from './dashboard-widgets';
export type WidgetType = DashboardWidgetType;
export interface DashboardWidget {
    type: WidgetType;
    dataKey: string;
    span?: number;
    options?: Record<string, unknown>;
}
export interface DashboardRow {
    columns: DashboardWidget[];
}
export interface DashboardSchema {
    rows: DashboardRow[];
}
export declare class DashboardRenderer {
    private container;
    private schema;
    private data;
    private widgets;
    constructor(container: HTMLElement, options: {
        schema: DashboardSchema;
        data?: Record<string, unknown>;
    });
    setData(key: string, value: unknown): void;
    setSchema(newSchema: DashboardSchema): void;
    getWidget(dataKey: string): unknown;
    destroy(): void;
    private renderAll;
    private renderWidget;
    private destroyWidgets;
}
