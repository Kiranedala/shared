import {Component, EventEmitter, OnInit, Output, Inject, HostListener} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Router,NavigationEnd} from '@angular/router';
import {UtilService} from '../services/util.service';
import {ThemeService, WinTheme} from '../services/theme.service';
import {CookieService} from 'ngx-cookie-service';
import {CarouselService} from '../services/carousel.service';
import { ShareDataService } from '../services/share-data.service';

declare var $: any;

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  providers: [ThemeService, CookieService],
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private pageName: string = '';
  private helpDocUrl: string;
  private projectName: string;
  selectedtab = 'item';
  togglesetting: boolean = false;
  isSettingOpen: boolean = false;
  changeUrl: any;

  private selectedTheme: number;

  // Event Emitter for calling closeSideNav function of app component
  @Output() onClickTopBarCloseSideNavBar = new EventEmitter<any>();

  @Output()
  private toggleBlockUI = new EventEmitter<any>();

  constructor(private carouselService: CarouselService, private utilService: UtilService, private themeService: ThemeService, private router: Router, @Inject(DOCUMENT) private document: any,
  private cookieService: CookieService, private shareDataService: ShareDataService) {
    this.projectName = 'Winsupply';

    this.themeService.onThemeChanged.subscribe(theme => console.log('Theme changed to ' + theme));

    // Load saved theme, apply it
    const savedTheme = this.themeService.getCurrentTheme();
    this.selectedTheme = savedTheme;
    this.setupTheme();
    shareDataService.toggleSettingDivObserver$.subscribe(
      hideSetting => {
          this.isSettingOpen = false;
      }
  );
  }

  ngOnInit() {
    this.utilService.titleEmitter.subscribe(title => {
      this.pageName = title;
    });

    this.utilService.helpDocUrlEmitter.subscribe(helpDocUrl => {
      this.helpDocUrl = helpDocUrl;
    });
  }
  

  toggleSideNav() {
    $('.side-nav-wrapper').toggleClass('open');
    this.toggleBlockUI.emit();

    if ($('.side-nav-wrapper').hasClass('open')) {
      $('#win-main-container').addClass('container-push');
      if ($('#openManifest').css('display') !== 'none') {
            $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
      }
    } else {
      $('#win-main-container').removeClass('container-push');
    }
  }


  setupTheme() {
    this.themeService.setTheme(this.selectedTheme);
  }

  /**
   * Function which is called on click of top nav bar
   * which emit onClickTopBarCloseSideNavBar
   */
  onClickTopBar() {
    console.log('onClickTopBar');
    if (!this.togglesetting) {
      this.onClickTopBarCloseSideNavBar.emit();
    } else {
      this.togglesetting = false;
    }
  }

  onClickStyleToggle(event: Event) {
    let checkval = (<HTMLInputElement>event.target).checked;
    if (checkval === true) {
        let head = this.document.head,
            link = this.document.createElement('link'),
            style = this.document.createElement('style');
        style.type = 'text/css';
        style.id = 'togglecss';
       // head.appendChild(style);
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = 'externalcss';
        link.href = 'toggle.css';
       // document.getElementById('togglecss').innerHTML = toggleStyle;
        head.appendChild(link);
        this.cookieService.set('themeValue', 'true', 0, '/');
    }
    else {
        let sheet = this.document.getElementById('externalcss');
       // let sheet1 = this.document.getElementById('togglecss');
       // sheet1.parentNode.removeChild(sheet1);
        sheet.parentNode.removeChild(sheet);
        this.cookieService.set('themeValue', 'false', 0, '/');
    }
}

@HostListener('window:resize', ['$event'])
onResize(event) {
  if (this.utilService.applyRemoveBlockUI()) {
    if ($('#openManifest').css('display') !== 'none') {
      if($('.side-nav-wrapper').hasClass('open')) {
          $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
      }
    } else {
      $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
    }
  }
}

  private showCompanySelection(showDetail: boolean): void {
    if (showDetail) {
      this.carouselService.next('setting-panel');
    } else {
      this.carouselService.prev('setting-panel');
    }
  }

  private toggleSetting(): void {
    this.togglesetting = true;
    this.isSettingOpen = !this.isSettingOpen;
  }
  
  itemview(tab) {
    tab.stopPropagation();
    if (tab.target.value == 'item') {
      this.selectedtab = 'item';
      this.pageName = "Item View";
      $('#itembinchange').find('option').eq($('#itembinchange').find('option').length - 1).remove();
      $('#itembinchange').append(' <option>No Bin</option>');
    } else if (tab.target.value == 'bin') {
      this.selectedtab = 'bin';
      this.pageName = "Bin View";
      $('#itembinchange').find('option').eq($('#itembinchange').find('option').length - 1).remove();
      $('#itembinchange').append(' <option>No Item</option>');
    }
  }

}
