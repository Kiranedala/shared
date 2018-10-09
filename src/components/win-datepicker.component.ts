import {Component, Input, forwardRef, Output, EventEmitter, OnChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl, Validator} from '@angular/forms';
import {DateService} from '../services/date.service';

export const DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WinDatepickerComponent),
  multi: true
};

export const DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => WinDatepickerComponent),
  multi: true
};

declare var $: any;

@Component({
  selector: 'win-datepicker',
  templateUrl: 'win-datepicker.component.html',
  styleUrls: ['win-datepicker.component.css'],
  providers: [DATEPICKER_VALUE_ACCESSOR, DATEPICKER_VALIDATORS]
})
/**
 * Implement the ControlValueAccessor interface to integrate with Angular forms.
 */
export class WinDatepickerComponent implements ControlValueAccessor, Validator, OnChanges {

  static readonly DATE_FORMAT: string = 'MM/DD/YYYY';

  // required
  @Input() id: string;

  // every date before startDate is disabled
  @Input() startDate: string;

  // every date after endDate is disabled
  @Input() endDate: string;

  @Input() pattern: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() readonly: boolean;

  // emit the current date string
  @Output() blur: EventEmitter<string>;

  @Output() dateChange: EventEmitter<string> = new EventEmitter<string>();

  private isInitialized: boolean;
  private date: string;
  private clicked: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnChanges() {
    // Need to update start/end date if changed
    const el = this.getJQueryElement();
    el.datepicker('setEndDate', this.endDate);
    el.datepicker('setStartDate', this.startDate);
  }

  constructor(private dateService: DateService) {
    this.pattern = WinDatepickerComponent.DATE_FORMAT;
    this.blur = new EventEmitter<string>();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: any) => void) {
    this.onTouched = fn;
  }

  /**
   * Takes a new value from the form model and writes it into the view.
   * @param value the new value
   */
  writeValue = (value: any) => {
    if (value !== this.date) {
      this.date = value;
    }
  };

  /**
     * Called on keyup event
     * @param event 
     */
    callvalidate(event) {
      if(event && event.target.value && event.code === 'ArrowRight' || event.code === 'ArrowLeft' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
          this.change(event.target.value);
      }
  }

  /**
   * Determine whether the win-datepicker custom control is valid.
   * @param c the form control
   * @returns {any} null if valid; the error object if invalid
   */
  validate(c: FormControl) {
    if (c.value) {
      let regEx = '^([0-9]{2}/[0-9]{2}/[0-9]{4})$';
      let index: number = c.value.search(regEx);
      if (index > -1) {
        let date1: string = this.dateService.format(c.value, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
        if (!date1) {
          return { valid: 'required' };
        }

        if (this.startDate && this.endDate) {
          let startDate: string = this.dateService.format(this.startDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
          let endDate: string = this.dateService.format(this.endDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
          if (date1 < startDate || date1 > endDate) {
            return { valid: 'required' };
          }
        } else if (this.startDate) {
          let startDate: string = this.dateService.format(this.startDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
          if (date1 < startDate) {
            return { valid: 'required' };
          }
        } else if (this.endDate) {
          let endDate: string = this.dateService.format(this.endDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
          if (date1 > endDate) {
            return { valid: 'required' };
          }
        }
        return null;
      } else {
        return { valid: 'required' };
      }
    } else {
      return { valid: 'required' };
    }
  }

  change = (value) => {
    let regEx1 = /[^0-9\/]/g;
    value = value.replace(regEx1, '');
    this.date = value;
    let jqueryEl = this.getJQueryElement();
    jqueryEl.val(value);
    this.onTouched();
    this.onChange(this.date);
    this.dateChange.emit(this.date);
  };

  private getJQueryElement() {
    let myId: string = '#' + this.id;
    return $(myId);
  }

  initializeDatepicker = () => {
    let that: any = this;
    if (!this.isInitialized) {
      let jqueryEl = this.getJQueryElement();
      jqueryEl.off('changeDate');
      jqueryEl.off('hide');
      jqueryEl.datepicker({
        autoclose: true,
        forceParse: false,
        format: 'mm/dd/yyyy',
        orientation: 'auto',
        startDate: that.startDate,
        endDate: that.endDate
      });
      jqueryEl.on('changeDate', function () {
        that.date = jqueryEl.val();
        that.onChange(that.date);
        that.dateChange.emit(that.date);
        that.hideDatepicker();
      });
      jqueryEl.on('hide', function () {
        that.onTouched();
        that.blur.emit(that.date);
      });
      jqueryEl.blur();
      this.isInitialized = true;
      $('.datepicker').on('click', function() {
        that.clicked = true;
      });
      // for firefox to set focus
      // setting the focus will call initializeDatepicker again
      // use isInitialized to avoid an infinite loop
      setTimeout(function () {
        jqueryEl.focus();
      }, 0);
    } else {
      this.isInitialized = false;
    }
  }

  /**
   * To hide the open datepicker widget
   */
  hideDatepicker = () => {
    const that = this;
    setTimeout(function () {
      if (that.clicked) {
        that.clicked = false;
      }
      $('.datepicker').hide();
    }, 100);
  }

}
