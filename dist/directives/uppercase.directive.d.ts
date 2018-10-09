import { ElementRef, OnInit, EventEmitter } from '@angular/core';
export declare class UpperCaseDirective implements OnInit {
    private elementRef;
    private el;
    ngModelChange: EventEmitter<any>;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    onInputChange(event: any): void;
}
