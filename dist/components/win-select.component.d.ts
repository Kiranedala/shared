import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';
export declare class WinSelectComponent implements OnInit, ControlValueAccessor, Validator {
    private el;
    options: Array<any>;
    labelKey: string;
    valueKey: string;
    disabled: boolean;
    id: string;
    contentCenter: boolean;
    defaultOption: any | string;
    searchInput: ElementRef;
    onChange: EventEmitter<{}>;
    selectedItem: any;
    selectedValue: any;
    private defaultValue;
    active: boolean;
    constructor(el: ElementRef);
    private propagateChange;
    writeValue(obj: any): void;
    registerOnTouched(): void;
    registerOnChange(fn: any): void;
    validate(): ValidationErrors;
    ngOnInit(): void;
    setSelectedValue(): void;
    changeValue(option: any): void;
    closeDropdown(event: any): void;
}
