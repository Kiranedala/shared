import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef,
  HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'win-select',
  templateUrl: './win-select.component.html',
  styleUrls: ['./win-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WinSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WinSelectComponent),
      multi: true,
    }
  ]
})
export class WinSelectComponent implements OnInit, ControlValueAccessor, Validator {

  // array of options
  @Input() options: Array<any>;

  // Name of key to displayed as options
  @Input() labelKey: string;

  // Name of key which holds value against labelKey
  @Input() valueKey: string;

  @Input() disabled: boolean;
  @Input() id: string;
  @Input() contentCenter: boolean;

  // Default option to be selected
  @Input() defaultOption: any | string;

  @ViewChild('searchInput') searchInput: ElementRef;

  @Output() onChange = new EventEmitter();

  selectedItem: any;
  selectedValue: any;
  private defaultValue: any;

  active: boolean = false;

  constructor(private el: ElementRef) {
  }

  private propagateChange = (_: any) => { }

  writeValue(obj: any) {
    this.selectedItem = obj;
    this.setSelectedValue();
  }

  registerOnTouched() { }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  validate(): ValidationErrors {
    return this.selectedItem ? null : { required: true };
  }

  ngOnInit() {
    this.setSelectedValue();
  }
  setSelectedValue() {
    this.selectedValue = {};
    if (this.defaultOption) {
      if (typeof this.defaultOption === 'string') {
        this.selectedValue[this.valueKey] = '';
        this.selectedValue[this.labelKey] = this.defaultOption;
      } else {
        this.selectedValue[this.valueKey] = this.defaultOption[this.valueKey];
        this.selectedValue[this.labelKey] = this.defaultOption[this.labelKey];
      }
      this.defaultValue = this.selectedValue;
    } else {
      if (this.labelKey) {
        this.selectedValue[this.valueKey] = this.options[0][this.valueKey];
        this.selectedValue[this.labelKey] = this.options[0][this.labelKey];
      } else {
        this.selectedValue[this.valueKey] = this.options[0];
        this.selectedValue[this.labelKey] = this.options[0];
      }
    }
  }

  changeValue(option) {
    if (this.valueKey) {
      this.propagateChange(option[this.valueKey]);
      this.onChange.emit(option[this.valueKey]);
    } else {
      this.propagateChange(option);
      this.onChange.emit(option);
    }
    this.selectedItem = option;
    this.selectedValue = option;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }
}
