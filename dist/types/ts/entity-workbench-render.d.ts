import { AsyncSelect } from './async-select';
import type { EntityField, EntitySchema } from './entity-workbench';
interface RenderContext {
    container: HTMLElement;
    schema: EntitySchema;
    activeTab: string;
    data: Record<string, unknown>;
    editable: boolean;
    actions: Array<{
        id: string;
        label: string;
        variant?: string;
    }>;
    breadcrumb: string;
    isDirty: boolean;
    fieldEls: Map<string, HTMLElement>;
    asyncControls: AsyncSelect[];
    onTab: (tabId: string) => void;
    onField: (field: EntityField, value: unknown) => void;
    onSave: () => void;
    onCancel: () => void;
    onAction: (id: string) => void;
}
export declare function renderWorkbench(ctx: RenderContext): void;
export {};
