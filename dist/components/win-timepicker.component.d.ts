import { EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
export declare const TIMEPICKER_VALUE_ACCESSOR: any;
export declare const TIMEPICKER_VALIDATORS: any;
export declare class WinTimepickerComponent implements ControlValueAccessor, Validator {
    id: string;
    clearOnTab: boolean;
    initialValue: string;
    cleared: EventEmitter<any>;
    model: any;
    onChange: any;
    onTouched: any;
    private isRegistered;
    private clicked;
    constructor();
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: (value: any) => void): void;
    /**
     * Takes a new value from the form model and writes it into the view.
     * @param value the new value
     */
    writeValue(value: any): void;
    /**
     * Determine whether the win-timepicker custom control is valid.
     * @param c the form control
     * @returns {any} null if valid; the error object if invalid
     */
    validate(c: FormControl): {
        valid: string;
    };
    change(value: any): void;
    initializeTimepicker(model: any, onChange: any, onTouched: any, initialValue: any): void;
    clearTimepicker(e: any): void;
    /**
     * To hide the open timepicker widget
     */
    hideTimepicker: () => void;
}
