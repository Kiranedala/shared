import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/primeng';
import {NavbarComponent} from './components/navbar.component';
import {SideNavComponent} from './components/side-nav.component';
import {DateService} from './services/date.service';
import {RefreshService} from './services/refresh.service';
import {UrlService} from './services/url.service';
import {UtilService} from './services/util.service';
import {ThemeService} from './services/theme.service';
import {CarouselService} from './services/carousel.service';
import {MessagesService} from './services/messages.service';
import {ModalService} from './services/modal.service';
import {WinConfirmationComponent} from './components/win-confirmation.component';
import {BS4WinConfirmationComponent} from './components/bs4-win-confirmation.component';
import {WinDatepickerComponent} from './components/win-datepicker.component';
import {WinTimepickerComponent} from './components/win-timepicker.component';
import {WinGridComponent} from './components/win-grid.component';
import {WinAlertComponent} from './components/win-alert.component';
import {WinPaginationComponent} from './components/win-pagination.component';
import {WinSorterComponent} from './components/win-sorter.component';
import {HelpDocComponent} from './components/help-doc.component';
import {ShareDataService} from './services/share-data.service';
import {UpperCaseDirective} from './directives/uppercase.directive';
import {WinTypeaheadComponent} from './components/win-typeahead.component';
import { WinChipsComponent } from './components/win-chips.component';
import { WinSelectComponent } from './components/win-select.component';

export * from './components/navbar.component';
export * from './components/side-nav.component';
export * from './components/win-confirmation.component';
export * from './components/bs4-win-confirmation.component';
export * from './components/win-datepicker.component';
export * from './components/win-timepicker.component';
export * from './components/win-grid.component';
export * from './components/win-alert.component';
export * from './components/win-sorter.component';
export * from './components/win-typeahead.component';
export * from './components/win-pagination.component';
export * from './components/help-doc.component';
export * from './components/win-chips.component';
export * from './components/win-select.component';

export * from './models/address';
export * from './models/alt-part-number';
export * from './models/bin';
export * from './models/bin-combination';
export * from './models/bin-condition';
export * from './models/bin-item-combination';
export * from './models/bin-item-info';
export * from './models/bin-item-location';
export * from './models/bin-location';
export * from './models/bin-item-details';
export * from './models/bin-type';
export * from './models/binlocation-and-item-create';
export * from './models/bin-location-field-sync';
export * from './models/deliverable-order';
export * from './models/deliverable-order-item';
export * from './models/deliverable-order-photo';
export * from './models/deliverable-order-status';
export * from './models/driver';
export * from './models/item';
export * from './models/item-bin-combination';
export * from './models/item-combination';
export * from './models/item-bin-details';
export * from './models/grid/grid-color-scheme';
export * from './models/grid/grid-element';
export * from './models/grid/grid-layout';
export * from './models/grid/grid-range';
export * from './models/grid/grid-square';
export * from './models/manifest';
export * from './models/manifest-status';
export * from './models/not-delivered-order';
export * from './models/pick-via';
export * from './models/purchase-order';
export * from './models/purchase-order-item';
export * from './models/quantity-adjust-note';
export * from './models/quantity-adjust-reason';
export * from './models/receive-via';
export * from './models/signature';
export * from './models/stop';
export * from './models/stop-status';
export * from './models/truck';
export * from './models/zone';
export * from './models/zone-details';
export * from './models/bin-item-transfer';
export * from './models/win-response';

export * from './services/carousel.service';
export * from './services/date.service';
export * from './services/messages.service';
export * from './services/modal.service';
export * from './services/refresh.service';
export * from './services/share-data.service'
export * from './services/theme.service';
export * from './services/url.service';
export * from './services/util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule
  ],
  declarations: [
    NavbarComponent,
    SideNavComponent,
    WinConfirmationComponent,
    BS4WinConfirmationComponent,
    WinDatepickerComponent,
    WinTimepickerComponent,
    WinGridComponent,
    WinAlertComponent,
    WinSorterComponent,
    WinTypeaheadComponent,
    WinPaginationComponent,
    HelpDocComponent,
    UpperCaseDirective,
    WinChipsComponent,
    WinSelectComponent
  ],
  exports: [
    NavbarComponent,
    SideNavComponent,
    FormsModule,
    WinConfirmationComponent,
    BS4WinConfirmationComponent,
    WinDatepickerComponent,
    WinTimepickerComponent,
    WinGridComponent,
    WinAlertComponent,
    WinSorterComponent,
    WinTypeaheadComponent,
    WinPaginationComponent,
    WinChipsComponent,
    HelpDocComponent,
    UpperCaseDirective,
    WinSelectComponent
  ]
})
export class SharedLibraryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedLibraryModule,
      providers: [
        CarouselService, DateService, MessagesService, ModalService, RefreshService, ShareDataService, ThemeService, UrlService, UtilService
      ]
    };
  }
}
