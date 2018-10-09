import { Component, EventEmitter, Inject, Input, Output, HostListener } from '@angular/core';
import {UtilService} from '../services/util.service';
import {UrlService} from '../services/url.service';
import { ShareDataService } from '../services/share-data.service';
import {DOCUMENT} from '@angular/common';

declare var $: any;

@Component({
  selector: 'side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.css'],
  host: {}
})
export class SideNavComponent {

  @Input('environment')
  environment: string;

  @Input('logoutBaseUrl')
  logoutBaseUrl: string;

  private shippingManifestUrl: string;
  private workingQueuesUrl: string;
  private receivingUrl: string;
  private pickingUrl: string;
  private binLocationUrl: string;
  private purchasingUrl: string;
  private sideNavToggle: boolean = false;
  private shipManMenuToggle: boolean = false;
  private binLocationsMenuToggle: boolean = false;
  private pickingMenuToggle: boolean = false;
  private purchsingMenuToggle: boolean = false;
  private hideTooltip;

  @Output()
  private toggleBlockUI = new EventEmitter<any>();

  isActive: string = '1';

  constructor(private urlService: UrlService, private utilService: UtilService, @Inject(DOCUMENT) private document: any, private shareDataService: ShareDataService) {
  }

  highlightSideMenu(application?: number) {
    let url = this.document.location.href;
    let urlPath = url.split('#')[1];
    if (typeof urlPath === 'undefined') {
      switch (application) {
        case 1:
          urlPath = '/manifest-dashboard';
          break;
        case 2:
          urlPath = '/itembin-details';
          break;
        case 3:
          urlPath = '/suggest-order';
          break;
        default:
          urlPath = '/manifest-dashboard';
      }
    }
    urlPath = urlPath.split('?')[0];
    switch (urlPath) {
      case '/manifest-dashboard':
        this.isActive = '1';
        break;
      case '/list':
        this.isActive = '2';
        break;
      case '/not-delivered-order-list':
        this.isActive = '3';
        break;
      case '/delivered-order-list':
        this.isActive = '4';
        break;
      case '/truck-list':
        this.isActive = '5';
        break;
      case '/driver-list':
        this.isActive = '6';
        break;
      case '/itembin-details':
        this.isActive = '7';
        break;
      case '/zone-details':
        this.isActive = '8';
        break;
      case '/receiver-document':
        this.isActive = '9';
        break;
      case '/picking-Settings':
        this.isActive = '10';
        break;
      case '/suggested-order-lander':
        this.isActive = '12';
        break;
      case '/create-worksheet':
        this.isActive = '13';
        break;
      case '/edit-worksheet':
        this.isActive = '14';
        break;
      case '/suggest-order':
        this.isActive = '15';
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    const url = this.document.location.href;
    let application = 3;
    this.shippingManifestUrl = this.urlService.getShippingManifestUrl(this.environment);
    this.workingQueuesUrl = this.urlService.getWorkingQueuesUrl(this.environment);
    this.binLocationUrl = this.urlService.getBinLocationsUrl(this.environment);
    this.pickingUrl = this.urlService.getPickingUrl(this.environment);
    this.purchasingUrl = this.urlService.getPurchasingUrl(this.environment);
    
    if (url === this.shippingManifestUrl) {
      application = 1;
    } else if (url === this.binLocationUrl) {
      application = 2;
    } else if (url === this.pickingUrl) {
      application = 3;
    } else if(url === this.purchasingUrl){
      application = 4;
    }else {
      application = 5;
    }

    this.highlightSideMenu(application);
    this.closeShipManMenu();
    this.closeBinLocationMenu();
    this.closePickigMenu();
    this.closePurchasingMenu();
  }

  toggleSideNav() {

    this.sideNavToggle = !this.sideNavToggle;
    this.toggleBlockUI.emit();
    $('.side-nav-wrapper').toggleClass('open');

    if ($('.side-nav-wrapper').hasClass('open')) {

      $('#win-main-container').addClass('container-push');
      let paddingForMobIcon = parseInt($('#openManifest').css('padding-bottom')) + $('#openManifest').height();

      if (this.shipManMenuToggle) {
          $('#openManifest').show();
          $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() + $('#openManifest').height() + 'px');
          $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
          $(".side-nav-toolbar.picking-manager").addClass('picking-margin-shipping');
          $(".side-nav-toolbar.logout-manager").addClass('logout-margin-shipping');

      } else {

        $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
        $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
      }

      if (this.binLocationsMenuToggle) {

        $('#openBinLocations').show();
        $(".side-nav-toolbar.picking-manager").addClass('picking-margin-binlocation');
        $(".side-nav-toolbar.logout-manager").addClass('logout-margin-binlocation');

      } else {

        $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-binlocation');
      }

      if (this.pickingMenuToggle) {

        $('#openPicking').show();
        $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
      }

      this.hideTooltip = true;
      $('#containerFluid, .navbar').css('padding-left','15px');
      $('.sticky-bottom-navbar').css('cssText', 'padding-left: 15px !important');
      $('.delete-icon').css({'top':'0px','right':'10px'})

    } else {

      $('#win-main-container').removeClass('container-push');
      this.resetOtherMenus("", false);
      this.hideTooltip = false;
      $('#containerFluid, .navbar, .sticky-bottom-navbar').css('padding-left','55px');
      $('.delete-icon').css({'top':'27px','right':'14px'})
    }

    if (this.sideNavToggle) {

      $('#nav-tooltip-manifests').addClass('hidden');

    } else {

      $('#nav-tooltip-manifests').removeClass('hidden');
    }

    this.hideSetting();
  }

  /**
   * Close side nav if device is mobile or clicked ouside sub nav
   * @param isSideNavLinkClicked
   */
  closeSideNav(isSideNavLinkClicked: boolean): void {
    let closeSideNav = true;
    if (isSideNavLinkClicked && !this.utilService.applyRemoveBlockUI()) {
      closeSideNav = false;
    }
    if (closeSideNav && $('.side-nav-wrapper').hasClass('open')) {
      $('.side-nav-wrapper').toggleClass('open');
      $('#win-main-container').removeClass('container-push');
      this.toggleBlockUI.emit();
      if (this.shipManMenuToggle) {
        $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
        $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
      }
      this.resetOtherMenus("", false);
    }

    this.hideSetting();

  }

  toggleShipManMenu(): void {
    this.shipManMenuToggle = !this.shipManMenuToggle;

    this.resetOtherMenus("SHIPMAN", true);

    if (this.shipManMenuToggle) {

      $('#openManifest').show();
      $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() + $('#openManifest').height() + 'px');
      $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
      $(".side-nav-toolbar.picking-manager").addClass('picking-margin-shipping');
      $(".side-nav-toolbar.logout-manager").addClass('logout-margin-shipping');
    } else {

      $('#openManifest').hide();
      $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() - $('#openManifest').height() + 'px');
      $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
      $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-shipping');
    }
  }

  togglePickingMenu(): void {
    this.pickingMenuToggle = !this.pickingMenuToggle;

    this.resetOtherMenus("PICKING", true);

    if (this.pickingMenuToggle) {
      
      $('#openPicking').show();
      $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
    } else {
      
      $('#openPicking').hide();
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
    }
  }

  toggleBinLocationsMenu(): void {

    this.binLocationsMenuToggle = !this.binLocationsMenuToggle;

    this.resetOtherMenus("BINLOCATIONS", true);

    if (this.binLocationsMenuToggle) {

      $('#openBinLocations').show();
      $(".side-nav-toolbar.picking-manager").addClass('picking-margin-binlocation');
      $(".side-nav-toolbar.logout-manager").addClass('logout-margin-binlocation');
    } else {

      $('#openBinLocations').hide();
      $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-binlocation');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-binlocation');
    }
  }

  togglePurchasingMenu(): void{
    this.purchsingMenuToggle = !this.purchsingMenuToggle
    this.resetOtherMenus("PURCHASING", true);
    if(this.purchsingMenuToggle){
      $('#openPurchasing').show()
      $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
    } else {
      $('#openPurchasing').hide();
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
    }

  }


  resetOtherMenus(menuItem:string, disable?: boolean): void {

    if (this.shipManMenuToggle && menuItem !== "SHIPMAN") {

      if (disable) {
        this.shipManMenuToggle = false;
      }

      $('#openManifest').hide();
      $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
      $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-shipping');
    }

    if (this.binLocationsMenuToggle && menuItem !== "BINLOCATIONS") {
      
      if (disable) {
        this.binLocationsMenuToggle = false;
      }

      $('#openBinLocations').hide();
      $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-binlocation');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-binlocation');
    }

    if (this.pickingMenuToggle  && menuItem !== "PICKING") {
      
      if (disable) {
        this.pickingMenuToggle = false;
      }

      $('#openPicking').hide();
      $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
    }

    if (this.purchsingMenuToggle && menuItem != "PURCHASING"){
      
      if(disable){
        this.purchsingMenuToggle = false;
      }
      $('#openPurchsing').hide();
      $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
      $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');

    }

  }

  closeShipManMenu() {
    this.shipManMenuToggle = false;
    $('#openManifest').hide();
  }

  closeBinLocationMenu() {
    this.binLocationsMenuToggle = false;
    $('#openBinLocations').hide();
  }

  closePickigMenu() {
    this.pickingMenuToggle = false;
    $('#openPicking').hide();
  }
  closePurchasingMenu(){

  }

  hideToolTip() {
    if ($('.side-nav-wrapper').hasClass('open')) {
      return true;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!$('.side-nav-wrapper').hasClass('open')){
    $('#containerFluid, .navbar, .sticky-bottom-navbar').css('padding-left','55px');
    this.hideTooltip = false;
    }
    else{
      $('#containerFluid, .navbar').css('padding-left','15px');
      $('.sticky-bottom-navbar').css('cssText', 'padding-left: 15px !important');
      this.hideTooltip = true;
    }
  }

  private hideSetting(): void {
    this.shareDataService.hideSetting();
  }

  private logout() {
    if (!this.logoutBaseUrl || this.logoutBaseUrl === '') {
      console.log("You must set the side-nav [logoutBaseUrl] for this functionality to work properly check out W2020-1889 for more information.")
    }
  }



  /**
   *
   * Navigating back to Angular
   * @memberof SideNavComponent
   */
  gotoBack(){
    window.history.back();
  }

}
