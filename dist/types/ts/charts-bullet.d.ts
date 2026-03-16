/**
 * Maranello Luce Design - Bullet Chart
 * Target-vs-actual comparison chart rendered on canvas.
 */
export interface BulletRange {
    max: number;
    color?: string;
    label?: string;
}
export interface BulletChartOptions {
    value: number;
    target: number;
    max: number;
    label?: string;
    unit?: string;
    ranges?: BulletRange[];
    height?: number;
    animate?: boolean;
}
/**
 * Render a bullet chart (target-vs-actual) on a canvas element.
 * Draws qualitative background bands, a value bar, and a target marker.
 */
export declare function bulletChart(canvas: HTMLCanvasElement, opts: BulletChartOptions): void;
