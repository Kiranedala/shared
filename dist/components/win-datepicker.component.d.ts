import { EventEmitter, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { DateService } from '../services/date.service';
export declare const DATEPICKER_VALUE_ACCESSOR: any;
export declare const DATEPICKER_VALIDATORS: any;
export declare class WinDatepickerComponent implements ControlValueAccessor, Validator, OnChanges {
    private dateService;
    static readonly DATE_FORMAT: string;
    id: string;
    startDate: string;
    endDate: string;
    pattern: string;
    disabled: boolean;
    required: boolean;
    readonly: boolean;
    blur: EventEmitter<string>;
    dateChange: EventEmitter<string>;
    private isInitialized;
    private date;
    private clicked;
    onChange: any;
    onTouched: any;
    ngOnChanges(): void;
    constructor(dateService: DateService);
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: (value: any) => void): void;
    /**
     * Takes a new value from the form model and writes it into the view.
     * @param value the new value
     */
    writeValue: (value: any) => void;
    /**
       * Called on keyup event
       * @param event
       */
    callvalidate(event: any): void;
    /**
     * Determine whether the win-datepicker custom control is valid.
     * @param c the form control
     * @returns {any} null if valid; the error object if invalid
     */
    validate(c: FormControl): {
        valid: string;
    };
    change: (value: any) => void;
    private getJQueryElement();
    initializeDatepicker: () => void;
    /**
     * To hide the open datepicker widget
     */
    hideDatepicker: () => void;
}
