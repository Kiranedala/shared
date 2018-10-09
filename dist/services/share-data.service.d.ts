import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
export declare class ShareDataService {
    private blockUISource;
    showStatusMessage: Subject<any>;
    toggleSettingDiv: Subject<any>;
    blockUIObserver$: Observable<boolean>;
    showStatusMessageObserver$: Observable<any>;
    toggleSettingDivObserver$: Observable<any>;
    constructor();
    blockUI(isBlockUI: boolean): void;
    showStatus(item: any): void;
    hideSetting(): void;
}
