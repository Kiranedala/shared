import { UtilService } from '../services/util.service';
import { UrlService } from '../services/url.service';
import { ShareDataService } from '../services/share-data.service';
export declare class SideNavComponent {
    private urlService;
    private utilService;
    private document;
    private shareDataService;
    environment: string;
    logoutBaseUrl: string;
    private shippingManifestUrl;
    private workingQueuesUrl;
    private receivingUrl;
    private pickingUrl;
    private binLocationUrl;
    private purchasingUrl;
    private sideNavToggle;
    private shipManMenuToggle;
    private binLocationsMenuToggle;
    private pickingMenuToggle;
    private purchsingMenuToggle;
    private hideTooltip;
    private toggleBlockUI;
    isActive: string;
    constructor(urlService: UrlService, utilService: UtilService, document: any, shareDataService: ShareDataService);
    highlightSideMenu(application?: number): void;
    ngOnInit(): void;
    toggleSideNav(): void;
    /**
     * Close side nav if device is mobile or clicked ouside sub nav
     * @param isSideNavLinkClicked
     */
    closeSideNav(isSideNavLinkClicked: boolean): void;
    toggleShipManMenu(): void;
    togglePickingMenu(): void;
    toggleBinLocationsMenu(): void;
    togglePurchasingMenu(): void;
    resetOtherMenus(menuItem: string, disable?: boolean): void;
    closeShipManMenu(): void;
    closeBinLocationMenu(): void;
    closePickigMenu(): void;
    closePurchasingMenu(): void;
    hideToolTip(): boolean;
    handleClick(event: Event): void;
    private hideSetting();
    private logout();
    /**
     *
     * Navigating back to Angular
     * @memberof SideNavComponent
     */
    gotoBack(): void;
}
