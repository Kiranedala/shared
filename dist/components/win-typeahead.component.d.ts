import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const TYPEAHEAD_VALUE_ACCESSOR: any;
export declare class WinTypeaheadComponent implements ControlValueAccessor {
    private searchQuery;
    results: string;
    placeholder: string;
    minLength: number;
    objectField: string;
    id: string;
    disabled: boolean;
    searchEvent: EventEmitter<{}>;
    enter: EventEmitter<{}>;
    secondField: any;
    onChange: any;
    onTouched: any;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: (value: any) => void): void;
    writeValue: (searchQuery: any) => void;
    private searchFn();
    /**
     * Fire event when enter or return key is pressed
     */
    private filterRequest(event);
    private changeModel();
    onChangeEvent(query: any): void;
    suggestionsOnFocus(autocomplete: any): boolean;
}
