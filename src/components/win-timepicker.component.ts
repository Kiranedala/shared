import {Component, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormControl, Validator} from '@angular/forms';

export const TIMEPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WinTimepickerComponent),
    multi: true
};

export const TIMEPICKER_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => WinTimepickerComponent),
    multi: true
}

declare var $: any;

@Component({
    selector: 'win-timepicker',
    templateUrl: 'win-timepicker.component.html',
    styleUrls: ['win-timepicker.component.css'],
    providers: [TIMEPICKER_VALUE_ACCESSOR, TIMEPICKER_VALIDATORS]
})
/**
 * Implement the ControlValueAccessor interface to integrate with Angular forms.
 */
export class WinTimepickerComponent implements ControlValueAccessor, Validator {

    @Input('id') id: string;
    @Input('clearOnTab') clearOnTab: boolean;
    @Input('initialValue') initialValue: string;

    @Output() cleared: EventEmitter<any> = new EventEmitter();

    model: any = {time: null};
    onChange: any = () => {};
    onTouched: any = () => {};

    private isRegistered: boolean;
    private clicked: boolean = false;

    constructor() {
        this.isRegistered = false;
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
    writeValue(value: any) {
        if (value !== this.model.time) {
            this.model.time = value;
        }
    }

    /**
     * Determine whether the win-timepicker custom control is valid.
     * @param c the form control
     * @returns {any} null if valid; the error object if invalid
     */
    validate(c: FormControl) {
        if (c.value) {
            let regEx: string = '^([0-9]{1,2}:[0-9]{2} [AP][M])$';
            let index: number = c.value.search(regEx);
            if (index > -1) {
                return null;
            }
        } else {
            return {valid: 'required'};
        }
        return {valid: 'pattern'};
    }

    change(value) {
        this.model.time = value;
        this.onTouched();
        this.onChange(this.model.time);
    }

    initializeTimepicker(model: any, onChange: any, onTouched: any, initialValue: any) {
        const that = this;
        that.clicked = false;
        // only register the change time event once (when the textbox initially gains focus)
        if (!this.isRegistered) {

            let myId: string = '#' + this.id;
            $(myId).timepicker({
                minuteStep: 15,
                snapToStep: true
            });

            // when the timepicker widget is used to change the time, update the model
            $(myId).timepicker().on('changeTime.timepicker', function (e) {
                onTouched();
                //only update the value if the time has actually changed
                if(model.time !== initialValue || model.time !== e.time.value) {
                    model.time = e.time.value;
                    onChange(model.time);
                }
            });

            // when the timeipicker widget goes away, consider the component touched
            $(myId).timepicker().on('hide.timepicker', function(e) {
                onTouched();
            });

            $(myId).timepicker('showWidget');
            $('.bootstrap-timepicker-widget').on('click', function() {
                that.clicked = true;
            });

            // when the textbox initially gains focus, update the model
            model.time = $(myId).val();
            this.isRegistered = true;
        }
    }

    clearTimepicker(e) {

        //if tab key pressed
        if(e.keyCode === 9) {
            let myId: string = '#' + this.id;

            if(this.clearOnTab) {
                $(myId).timepicker('clear');
            }

            $(myId).timepicker('hideWidget');

            this.cleared.emit('success');
        }
    }

    /**
     * To hide the open timepicker widget
     */
    hideTimepicker = () => {
        const that = this;
        const myId: string = '#' + that.id;
        setTimeout(function () {
            if (!that.clicked) {
                $(myId).timepicker('hideWidget');
            } else {
                that.clicked = false;
            }
        }, 100);
    }
}
