import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class CarouselService {

    constructor() {}

    next(modalId: string) {
        $('#' + modalId).carousel('next');
    }

    prev(modalId: string) {
        $('#' + modalId).carousel('prev');
    }

    first(modalId: string) {
        $('#' + modalId).carousel(0);
    }

    goTo(modalId: string, index: number) {
        $('#' + modalId).carousel(index);
    }
}
