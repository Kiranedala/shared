import {Injectable, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShareDataService {
  // Observable string sources
  private blockUISource = new Subject<boolean>();
  public showStatusMessage = new Subject<any>();
  public toggleSettingDiv = new Subject<any>();

  // Observable string streams
  blockUIObserver$ = this.blockUISource.asObservable();
  showStatusMessageObserver$ = this.showStatusMessage.asObservable();
  toggleSettingDivObserver$ = this.toggleSettingDiv.asObservable();

  constructor() {
    this.showStatusMessage = new EventEmitter();
  }

  blockUI(isBlockUI: boolean) {
    this.blockUISource.next(isBlockUI);
  }

  showStatus(item: any) {
    this.showStatusMessage.next(item);
  }

  hideSetting() {
    this.toggleSettingDiv.next();
  }
}
