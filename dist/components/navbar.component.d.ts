import { EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { ThemeService } from '../services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { CarouselService } from '../services/carousel.service';
import { ShareDataService } from '../services/share-data.service';
export declare class NavbarComponent implements OnInit {
    private carouselService;
    private utilService;
    private themeService;
    private router;
    private document;
    private cookieService;
    private shareDataService;
    private pageName;
    private helpDocUrl;
    private projectName;
    selectedtab: string;
    togglesetting: boolean;
    isSettingOpen: boolean;
    changeUrl: any;
    private selectedTheme;
    onClickTopBarCloseSideNavBar: EventEmitter<any>;
    private toggleBlockUI;
    constructor(carouselService: CarouselService, utilService: UtilService, themeService: ThemeService, router: Router, document: any, cookieService: CookieService, shareDataService: ShareDataService);
    ngOnInit(): void;
    toggleSideNav(): void;
    setupTheme(): void;
    /**
     * Function which is called on click of top nav bar
     * which emit onClickTopBarCloseSideNavBar
     */
    onClickTopBar(): void;
    onClickStyleToggle(event: Event): void;
    onResize(event: any): void;
    private showCompanySelection(showDetail);
    private toggleSetting();
    itemview(tab: any): void;
}
