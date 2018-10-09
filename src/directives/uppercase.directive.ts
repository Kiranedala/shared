import { Directive, HostListener, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Directive( { selector: '[uppercase]' } )
export class UpperCaseDirective implements OnInit {

  private el: HTMLInputElement;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor( private elementRef: ElementRef ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.el.value.toUpperCase();
  }

  @HostListener( 'input', [ '$event' ] )
  onInputChange( event ) {
    this.el.value = event.target.value.toUpperCase();
    this.ngModelChange.emit(this.el.value);
  }
}
