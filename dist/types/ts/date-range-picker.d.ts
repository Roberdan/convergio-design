export interface DateRange {
    from: string | null;
    to: string | null;
}
export interface DateRangePickerOptions {
    value?: DateRange;
    min?: string;
    max?: string;
    placeholder?: string;
    onChange?: (range: DateRange) => void;
}
export interface DateRangePickerController {
    getValue: () => DateRange;
    setValue: (range: DateRange) => void;
    open: () => void;
    close: () => void;
    destroy: () => void;
}
export declare function dateRangePicker(el: HTMLElement, opts?: DateRangePickerOptions): DateRangePickerController;
