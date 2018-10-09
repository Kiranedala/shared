import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const TYPEAHEAD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => WinTypeaheadComponent)
}
@Component({
  selector: 'win-typeahead',
  templateUrl: 'win-typeahead.component.html',
  styleUrls: ['win-typeahead.component.css'],
  providers: [TYPEAHEAD_VALUE_ACCESSOR]
})
export class WinTypeaheadComponent implements ControlValueAccessor {

  private searchQuery: string;

  @Input('results') results: string;                  // Suggestions result set
  @Input('placeholder') placeholder: string;          // Placeholder for input field
  @Input('minLength') minLength = 2;                  // Minimum number of character required to activate typeahead
  @Input('field') objectField: string;                // Field to show by default
  @Input('id') id: string;                            // HTML5 input id
  @Input('disabled') disabled: boolean;               // To make typeahead disable/enable
  @Output('search') searchEvent = new EventEmitter(); // Event to be fired when user searches something
  @Output('enter') enter = new EventEmitter();        // Event to be fired when user press enter key
  @Input('secondField') secondField;

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void) {
    this.onTouched = fn;
  }

  writeValue = (searchQuery: any) => {
      this.searchQuery = searchQuery;
  }

  private searchFn() {
    if (typeof this.searchQuery !== 'undefined' && this.searchQuery !== null) {
      if (typeof this.searchQuery === 'object') {
        this.searchEvent.emit(this.searchQuery[this.objectField].toUpperCase());
        this.onChangeEvent(this.searchQuery[this.objectField]);
      } else if (this.searchQuery.length >= this.minLength) {
        this.searchEvent.emit(this.searchQuery.toUpperCase());
        this.onChangeEvent(this.searchQuery);
      }
    }
  }

  /**
   * Fire event when enter or return key is pressed
   */
  private filterRequest(event) {
    let query = '';
    if (typeof this.searchQuery === 'object') {
      query = this.searchQuery[this.objectField];
    } else {
      query = this.searchQuery;
    }
    if (event.key === 'Enter' || event.code === 'Enter') {
      this.enter.emit(query.toUpperCase());
    }
    this.onChangeEvent(query);
  }

  private changeModel() {
    this.onTouched();
    let query = '';
    if (typeof this.searchQuery === 'object') {
      query = this.searchQuery[this.objectField];
    } else {
      query = this.searchQuery;
    }
    this.onChangeEvent(query);
  }

  onChangeEvent(query) {
    if (query === null) {
      this.searchQuery = '';
      let element = document.querySelector('#' + this.id + ' input');
      if (element) {
        (<HTMLInputElement>element).value = '';
      }
      this.onChange(null);
    } else if (typeof query === 'object' ) {
      this.onChange(query.toUpperCase());
    } else {
      this.onChange(query.toUpperCase());
    }
  }

  suggestionsOnFocus(autocomplete) {
    return Boolean(this.searchQuery && autocomplete.suggestions && this.searchQuery.length >= this.minLength);
  }
}
