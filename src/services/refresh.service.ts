import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

declare var $: any;

@Injectable()
export class RefreshService {

    private static readonly TIMEOUT = 600000;

    private callback: any;

    constructor() {
        this.callback = null;
    }

    subscribe(callback: any) {
        this.callback = callback;
    }

    unsubscribe() {
        this.callback = null;
    }

    start() {
        this.initialize();
    }

    private initialize() {
        Observable.timer(RefreshService.TIMEOUT).subscribe(() => {
            if (this.callback) {
                this.callback();
            }
            this.initialize();
        });
    }

}
