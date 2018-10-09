import { Component, Directive, ElementRef, EventEmitter, HostListener, Inject, Injectable, Input, NgModule, Output, Renderer2, ViewChild, forwardRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/primeng';
import { DOCUMENT as DOCUMENT$1 } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';
import { Observable } from 'rxjs';
import { DataTable } from 'angular2-datatable';

var ShareDataService = (function () {
    function ShareDataService() {
        this.blockUISource = new Subject$1();
        this.showStatusMessage = new Subject$1();
        this.toggleSettingDiv = new Subject$1();
        // Observable string streams
        this.blockUIObserver$ = this.blockUISource.asObservable();
        this.showStatusMessageObserver$ = this.showStatusMessage.asObservable();
        this.toggleSettingDivObserver$ = this.toggleSettingDiv.asObservable();
        this.showStatusMessage = new EventEmitter();
    }
    /**
     * @param {?} isBlockUI
     * @return {?}
     */
    ShareDataService.prototype.blockUI = function (isBlockUI) {
        this.blockUISource.next(isBlockUI);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ShareDataService.prototype.showStatus = function (item) {
        this.showStatusMessage.next(item);
    };
    /**
     * @return {?}
     */
    ShareDataService.prototype.hideSetting = function () {
        this.toggleSettingDiv.next();
    };
    return ShareDataService;
}());
ShareDataService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ShareDataService.ctorParameters = function () { return []; };

var MessagesService = (function () {
    /**
     * @param {?} http
     */
    function MessagesService(http$$1) {
        var _this = this;
        this.http = http$$1;
        this.http.get('messages.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (msg) {
            _this.messages = msg;
        });
    }
    /**
     * @param {?} key
     * @param {?=} args
     * @return {?}
     */
    MessagesService.prototype.getMessage = function (key, args) {
        if (!this.messages) {
            return '';
        }
        else if (args) {
            return this.formatString(this.messages[key], args);
        }
        else {
            return this.messages[key];
        }
    };
    /**
     * @param {?} str
     * @param {?} args
     * @return {?}
     */
    MessagesService.prototype.formatString = function (str, args) {
        var /** @type {?} */ formatted = str;
        for (var /** @type {?} */ i = 0; i < args.length; i++) {
            formatted = formatted.replace('{' + i + '}', args[i].toString());
        }
        return formatted;
    };
    return MessagesService;
}());
MessagesService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MessagesService.ctorParameters = function () { return [
    { type: Http, },
]; };

var UtilService = (function () {
    /**
     * @param {?} messageService
     * @param {?} shareDataService
     */
    function UtilService(messageService, shareDataService) {
        this.messageService = messageService;
        this.shareDataService = shareDataService;
        this.titleEmitter = new EventEmitter();
        this.helpDocUrlEmitter = new EventEmitter();
        /**
         * Sorting function for two strings.  Sorts alphabetically (ascending order) ignoring case.
         */
        this.sortAscending = function (string1, string2) {
            var lowercase1 = string1.toLowerCase();
            var lowercase2 = string2.toLowerCase();
            return lowercase1 < lowercase2 ? -1 : lowercase1 > lowercase2 ? 1 : 0;
        };
        /**
         * Sorting function for two strings.  Sorts alphabetically (descending order) ignoring case.
         */
        this.sortDescending = function (string1, string2) {
            var lowercase1 = string1.toLowerCase();
            var lowercase2 = string2.toLowerCase();
            return lowercase1 > lowercase2 ? -1 : lowercase1 < lowercase2 ? 1 : 0;
        };
    }
    /**
     * @param {?} title
     * @return {?}
     */
    UtilService.prototype.setCurrentPageTitle = function (title) {
        this.titleEmitter.emit(title);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    UtilService.prototype.setCurrentHelpDocUrl = function (url) {
        this.helpDocUrlEmitter.emit(url);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    UtilService.prototype.trim = function (s) {
        return $.trim(s);
    };
    /**
     * @param {?} value
     * @param {?} pattern
     * @return {?}
     */
    UtilService.prototype.filter = function (value, pattern) {
        var /** @type {?} */ filteredString = '';
        if (value && pattern) {
            if ([typeof value][0] == 'string' && [typeof pattern][0] == 'string') {
                var /** @type {?} */ regularExpression = new RegExp(pattern);
                if ([typeof value][0] == 'string' && !value.match(regularExpression)) {
                    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                        var char = value_1[_i];
                        if (char.match(regularExpression)) {
                            filteredString += char;
                        }
                    }
                }
                else {
                    filteredString = value;
                }
            }
            else {
                filteredString = value;
            }
        }
        return filteredString;
    };
    /**
     * Determine if the original string contains the specified substring.
     * @param {?} original the original string
     * @param {?} substring the substring
     * @return {?}
     */
    UtilService.prototype.contains = function (original, substring) {
        return original.indexOf(substring) < 0 ? false : true;
    };
    /**
     * @param {?} object
     * @return {?}
     */
    UtilService.prototype.copyObject = function (object) {
        var /** @type {?} */ objectCopy = ({});
        for (var /** @type {?} */ key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = ((object))[key];
            }
        }
        return objectCopy;
    };
    /**
     * @param {?} str
     * @param {?} size
     * @param {?} padding
     * @return {?}
     */
    UtilService.prototype.padLeft = function (str, size, padding) {
        if (!str) {
            return null;
        }
        if (str.length >= size) {
            return str;
        }
        var /** @type {?} */ leftPadded = str;
        for (var /** @type {?} */ i = 0; i < size - str.length; i++) {
            leftPadded = padding + leftPadded;
        }
        return leftPadded;
    };
    /**
     * Put in here for now.
     * Not recongnizing equals function on Address object
     * @param {?} address
     * @param {?} other
     * @return {?}
     */
    UtilService.prototype.areAddressesEqual = function (address, other) {
        // if condition for checking if address and other is not null
        if (address && other) {
            return address.id === other.id && address.street1 === other.street1 && address.street2 === other.street2 && address.street3 === other.street3 && address.city === other.city && address.state === other.state && address.zip === other.zip;
        }
        else {
            return false;
        }
    };
    /**
     * Select a radio button on row click
     * @param {?} item
     * @return {?}
     */
    UtilService.prototype.selectRadioButton = function (item) {
        if (!$(item.currentTarget).find('td input:radio').prop('checked')) {
            $(item.currentTarget).find('td input:radio').prop('checked', true);
        }
    };
    /**
     * @param {?} collapseLinkClass
     * @param {?} listId
     * @return {?}
     */
    UtilService.prototype.collapseFiltersOnMobileDevice = function (collapseLinkClass, listId) {
        if (window.innerWidth < 768) {
            $(collapseLinkClass).addClass('collapsed');
            $(listId).removeClass('in');
            $(listId).removeClass('show');
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    UtilService.prototype.deepClone = function (obj) {
        if (typeof (obj) !== 'object' || obj === null) {
            return obj;
        }
        var /** @type {?} */ clone;
        if (Array.isArray(obj)) {
            clone = obj.slice(); // unlink Array reference.
        }
        else {
            clone = Object.assign({}, obj); // Unlink Object reference.
        }
        var /** @type {?} */ keys = Object.keys(clone);
        for (var /** @type {?} */ i = 0; i < keys.length; i++) {
            clone[keys[i]] = this.deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
        }
        return clone; // return unlinked clone.
    };
    /**
     * retun true if device is mobile
     * @return {?}
     */
    UtilService.prototype.isMobileDevice = function () {
        if (window.screen.width < 768) {
            return true;
        }
        return false;
    };
    /**
     * Check if window screen/inner width is less than or equal to 1024.
     * @return {?}
     */
    UtilService.prototype.applyRemoveBlockUI = function () {
        if (window.screen.width <= 1024 || window.innerWidth <= 1024) {
            return true;
        }
        return false;
    };
    /**
     * Check if provided string is an valid email address
     * If string is valid email return true otherwise return false
     * @param {?} email
     * @return {?}
     */
    UtilService.prototype.validateEmail = function (email) {
        var /** @type {?} */ regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExpressionEmail.test(email);
    };
    /**
     * Checks input res for 204 status code and show error message and returns boolean value
     * @param {?} res Response of service passed in function
     * @param {?=} messageErr
     * @return {?}
     */
    UtilService.prototype.checkStatusForNoContent = function (res, messageErr) {
        if (res && res.status && res.status === 204) {
            this.shareDataService.blockUI(false);
            if (messageErr) {
                var /** @type {?} */ message = this.messageService.getMessage(messageErr);
                this.shareDataService.showStatus([{ severity: 'error', summary: message }]);
            }
            return true;
        }
        return false;
    };
    /**
     * Check if device is iPad
     * @return {?}
     */
    UtilService.prototype.isIPad = function () {
        if (/iPad/.test(navigator.userAgent)) {
            return true;
        }
        return false;
    };
    /**
     * Check if device is iPhone
     * @return {?}
     */
    UtilService.prototype.isIPhone = function () {
        if (/iPhone/.test(navigator.userAgent)) {
            return true;
        }
        return false;
    };
    /**
     * Converts a string's case into Title Case
     * @param {?} str string to be converted
     * @return {?}
     */
    UtilService.prototype.toTitleCase = function (str) {
        return str.replace(/\w+/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    /**
     * To set focus on the first input box on the page
     * @return {?}
     */
    UtilService.prototype.setFocus = function () {
        setTimeout(function () {
            $('input.form-control, select.form-control')[0].focus();
        }, 10);
    };
    /**
     *
     * @param {?} checkStr Passed value in which user input is to be checked
     * @param {?} userInput User input value which is to be checked
     * @return {?}
     */
    UtilService.prototype.isInputExist = function (checkStr, userInput) {
        if (checkStr.indexOf(userInput) === 0 ||
            checkStr.replace(new RegExp('[0]*'), '').indexOf(userInput) === 0 ||
            checkStr.replace('-', '').indexOf(userInput) === 0 ||
            checkStr.replace(new RegExp('^[0]*|-', 'g'), '').indexOf(userInput) === 0) {
            return true;
        }
        return false;
    };
    return UtilService;
}());
UtilService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UtilService.ctorParameters = function () { return [
    { type: MessagesService, },
    { type: ShareDataService, },
]; };

var ThemeService = (function () {
    /**
     * @param {?} renderer
     * @param {?} cookieService
     */
    function ThemeService(renderer, cookieService) {
        this.renderer = renderer;
        this.cookieService = cookieService;
        this.currentTheme = 1 /* DEFAULT */;
        this.onThemeChanged = new EventEmitter();
    }
    /**
     * @param {?} themeValue
     * @return {?}
     */
    ThemeService.prototype.getThemeValue = function (themeValue) {
        var /** @type {?} */ themeVal = 1;
        if (themeValue == "0") {
            themeVal = 0 /* DARK */;
        }
        else if (themeValue == "2") {
            themeVal = 2 /* CONTRAST */;
        }
        return themeVal;
    };
    /**
     * @return {?}
     */
    ThemeService.prototype.getCurrentTheme = function () {
        var /** @type {?} */ themeValue = this.cookieService.get('themeValue');
        return this.getThemeValue(themeValue);
    };
    /**
     * @param {?} theme
     * @return {?}
     */
    ThemeService.prototype.setTheme = function (theme) {
        var /** @type {?} */ link = document.getElementById('pagestyle');
        if (link === null) {
            link = this.renderer.createElement('link');
            this.renderer.setAttribute(link, 'id', 'pagestyle');
            this.renderer.setAttribute(link, 'rel', 'stylesheet');
        }
        // Update the page style
        var /** @type {?} */ themeUrl = ThemeService.THEME_URLS[theme];
        link.setAttribute('href', themeUrl);
        document.querySelector('head').appendChild(link);
        // Save selection to cookie
        var /** @type {?} */ cookieVal = this.getThemeValue(theme);
        this.cookieService.set('themeValue', cookieVal.toString(), 0, '/');
        var /** @type {?} */ body = document.getElementsByTagName('body')[0];
        if (theme == 0) {
            body.setAttribute("class", "dark");
        }
        else if (theme == 1) {
            body.setAttribute("class", "light");
        }
        else {
            body.setAttribute("class", "light contrast");
        }
        // Alert others
        this.onThemeChanged.emit(theme);
    };
    return ThemeService;
}());
ThemeService.THEME_URLS = (_a = {}, _a[1 /* DEFAULT */] = './src/scss/styles-light.css', _a[0 /* DARK */] = './src/scss/styles-dark.css', _a[2 /* CONTRAST */] = './src/scss/styles-contrast.css', _a);
ThemeService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ThemeService.ctorParameters = function () { return [
    { type: Renderer2, },
    { type: CookieService, },
]; };
var _a;

var CarouselService = (function () {
    function CarouselService() {
    }
    /**
     * @param {?} modalId
     * @return {?}
     */
    CarouselService.prototype.next = function (modalId) {
        $('#' + modalId).carousel('next');
    };
    /**
     * @param {?} modalId
     * @return {?}
     */
    CarouselService.prototype.prev = function (modalId) {
        $('#' + modalId).carousel('prev');
    };
    /**
     * @param {?} modalId
     * @return {?}
     */
    CarouselService.prototype.first = function (modalId) {
        $('#' + modalId).carousel(0);
    };
    /**
     * @param {?} modalId
     * @param {?} index
     * @return {?}
     */
    CarouselService.prototype.goTo = function (modalId, index) {
        $('#' + modalId).carousel(index);
    };
    return CarouselService;
}());
CarouselService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
CarouselService.ctorParameters = function () { return []; };

var NavbarComponent = (function () {
    /**
     * @param {?} carouselService
     * @param {?} utilService
     * @param {?} themeService
     * @param {?} router
     * @param {?} document
     * @param {?} cookieService
     * @param {?} shareDataService
     */
    function NavbarComponent(carouselService, utilService, themeService, router$$1, document, cookieService, shareDataService) {
        var _this = this;
        this.carouselService = carouselService;
        this.utilService = utilService;
        this.themeService = themeService;
        this.router = router$$1;
        this.document = document;
        this.cookieService = cookieService;
        this.shareDataService = shareDataService;
        this.pageName = '';
        this.selectedtab = 'item';
        this.togglesetting = false;
        this.isSettingOpen = false;
        // Event Emitter for calling closeSideNav function of app component
        this.onClickTopBarCloseSideNavBar = new EventEmitter();
        this.toggleBlockUI = new EventEmitter();
        this.projectName = 'Winsupply';
        this.themeService.onThemeChanged.subscribe(function (theme) { return console.log('Theme changed to ' + theme); });
        // Load saved theme, apply it
        var savedTheme = this.themeService.getCurrentTheme();
        this.selectedTheme = savedTheme;
        this.setupTheme();
        shareDataService.toggleSettingDivObserver$.subscribe(function (hideSetting) {
            _this.isSettingOpen = false;
        });
    }
    /**
     * @return {?}
     */
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilService.titleEmitter.subscribe(function (title) {
            _this.pageName = title;
        });
        this.utilService.helpDocUrlEmitter.subscribe(function (helpDocUrl) {
            _this.helpDocUrl = helpDocUrl;
        });
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.toggleSideNav = function () {
        $('.side-nav-wrapper').toggleClass('open');
        this.toggleBlockUI.emit();
        if ($('.side-nav-wrapper').hasClass('open')) {
            $('#win-main-container').addClass('container-push');
            if ($('#openManifest').css('display') !== 'none') {
                $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
            }
        }
        else {
            $('#win-main-container').removeClass('container-push');
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.setupTheme = function () {
        this.themeService.setTheme(this.selectedTheme);
    };
    /**
     * Function which is called on click of top nav bar
     * which emit onClickTopBarCloseSideNavBar
     * @return {?}
     */
    NavbarComponent.prototype.onClickTopBar = function () {
        console.log('onClickTopBar');
        if (!this.togglesetting) {
            this.onClickTopBarCloseSideNavBar.emit();
        }
        else {
            this.togglesetting = false;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NavbarComponent.prototype.onClickStyleToggle = function (event) {
        var /** @type {?} */ checkval = ((event.target)).checked;
        if (checkval === true) {
            var /** @type {?} */ head = this.document.head, /** @type {?} */ link = this.document.createElement('link'), /** @type {?} */ style = this.document.createElement('style');
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
            var /** @type {?} */ sheet = this.document.getElementById('externalcss');
            // let sheet1 = this.document.getElementById('togglecss');
            // sheet1.parentNode.removeChild(sheet1);
            sheet.parentNode.removeChild(sheet);
            this.cookieService.set('themeValue', 'false', 0, '/');
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NavbarComponent.prototype.onResize = function (event) {
        if (this.utilService.applyRemoveBlockUI()) {
            if ($('#openManifest').css('display') !== 'none') {
                if ($('.side-nav-wrapper').hasClass('open')) {
                    $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
                }
            }
            else {
                $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
            }
        }
    };
    /**
     * @param {?} showDetail
     * @return {?}
     */
    NavbarComponent.prototype.showCompanySelection = function (showDetail) {
        if (showDetail) {
            this.carouselService.next('setting-panel');
        }
        else {
            this.carouselService.prev('setting-panel');
        }
    };
    /**
     * @return {?}
     */
    NavbarComponent.prototype.toggleSetting = function () {
        this.togglesetting = true;
        this.isSettingOpen = !this.isSettingOpen;
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    NavbarComponent.prototype.itemview = function (tab) {
        tab.stopPropagation();
        if (tab.target.value == 'item') {
            this.selectedtab = 'item';
            this.pageName = "Item View";
            $('#itembinchange').find('option').eq($('#itembinchange').find('option').length - 1).remove();
            $('#itembinchange').append(' <option>No Bin</option>');
        }
        else if (tab.target.value == 'bin') {
            this.selectedtab = 'bin';
            this.pageName = "Bin View";
            $('#itembinchange').find('option').eq($('#itembinchange').find('option').length - 1).remove();
            $('#itembinchange').append(' <option>No Item</option>');
        }
    };
    return NavbarComponent;
}());
NavbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'navbar',
                template: "<nav class=\"win-nav navbar navbar-alt navbar-expand-lg mb-4 py-0 pr-0\"> <div class=\"navbar-header\"> <a href=\"javascript:void(0)\" id=\"mobile-open\" class=\"mobile-open parentLinks\" (click)=\"toggleSideNav()\"> <i class=\"fa fa-bars\" aria-hidden=\"true\"></i> </a> </div> <h3 class=\"mobile-page-title\" (click)=\"onClickTopBar()\">{{pageName}} <help-doc [url]=\"helpDocUrl\"></help-doc> </h3> <div id=\"navbar-left\" class=\"collapse navbar-collapse\" style=\"left: 0px; top: 0px;\" (click)=\"onClickTopBar()\"> <div class=\"navbar-nav mr-auto\"> <div class=\"win-logo navbar-brand \"> <span class=\"desktop-logo\" width=\"100px\"></span> </div> </div> <div class=\"navbar-right navbar-alt-right\"> <div class=\"dropdown\"> <div class=\"setting-wrapper\"></div> <button id=\"dLabel\" type=\"button\" (click)=\"toggleSetting()\"> <i class=\"fa fa-ellipsis-v  fa-fw\"></i> </button> </div> </div> </div> <div class=\"dropdown\"> <div id=\"setting\" class=\"collapse dropdown-menu company-section\" [ngClass]=\"isSettingOpen ? 'open' : ''\"> <div id=\"setting-panel\" class=\"carousel slide\" data-ride=\"carousel\" data-keyboard=\"false\" data-interval=\"false\"> <!-- Wrapper for slides --> <div class=\"carousel-inner\"> <div class=\"carousel-item item active\"> <div class=\"company-name win-label text-center\">00054 - Bangor Winsupply</div> <div class=\"win-command-section\"> <div class=\"section-label\">Win Commands</div> <div class=\"win-label win-in-company\" (click)=\"showCompanySelection(true)\">WIN Into Company <i class=\"fa fa-angle-right pull-right\" ></i> </div> </div> <div class=\"display-setting-section\"> <div class=\"section-label\">Display Settings</div> <label class=\"win-label\"> <span class=\"enable-theme col-lg-4\">Select Theme</span> <div class=\"right col-lg-8\"> <select class=\"form-control\" (change)=\"setupTheme()\" [(ngModel)]=\"selectedTheme\"> <option value=\"1\">Modern Light</option> <option value=\"0\">Modern Dark</option> <option value=\"2\">High Contrast</option> </select> </div> </label> </div> </div> <div class=\"carousel-item item\"> <div> <div class=\"company-name win-label text-center\"> <i class=\"fa fa-angle-left\" (click)=\"showCompanySelection(false)\"></i> <span>Companies</span> </div> <div> <div class=\"form-group company-selection\"> <label for=\"CompanySelection\" class=\"company-selection-label\">Company Selection</label> <input type=\"text\" class=\"form-control validate filter-input\" placeholder=\"Enter company number\"> <div class=\"select-btn-div\"> <button class=\"btn btn-md select-btn dark-ui-secondary-btn\" type=\"button\">Select</button> </div> </div> </div> <div class=\"current-selection\"> <label for=\"current-company\" class=\"recent-search\" >Current Selection</label> <div class=\"selected-company\"> <span>00054 - Bangor Winsupply</span> </div> </div> <div class=\"recent-search-div\"> <label for=\"recentsearch\" class=\"recent-search\" >Recent Searches</label> <div class=\"recent-searched-company\"> <span>00054 - Bangor Winsupply</span> </div> <div class=\"recent-searched-company\"> <span> 000040 - Winsupply Of Portland</span> </div> </div> </div> </div> </div> </div> </div> </div> </nav> ",
                providers: [ThemeService, CookieService],
                styles: [".navbar { min-height: 50px; } .navbar-brand { padding: 14px 0px !important; } .navbar .dropdown button { margin-right: 0px !important; margin-top: 6px !important; outline: none; z-index: 120; position: relative } .navbar-alt-right i { font-size: 1.1em !important; } .navbar-header { position: absolute; z-index: 2; } .navbar .dropdown .dropdown-menu { top: -500px; color: #575659; min-width: 300px; padding: 0 !important; margin-right: 5px; border: 1px solid #ccc !important; transition: all .4s linear; z-index: 50; display: block; right: 0; left: auto; } .navbar .dropdown .dropdown-menu.open { top: -10px; } .navbar .dropdown .dropdown-menu label { white-space: nowrap; } .toggle-switch { position: relative; display: inline-block; width: 72px; height: 22px; margin: 0; } .toggle-switch input { display: none; } .toggle-ball { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #fff; border-radius: 4px; -webkit-transition: .3s; transition: .3s; border: 1px solid #0072cf !important; } .toggle-ball:before { position: absolute; content: \"\"; height: 18px; width: 34px; left: 1px; bottom: 1px; background-color: #fff; border-radius: 4px; -webkit-transition: .3s; transition: .3s; border: 1px solid #0072cf !important; box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.25); } .toggle-ball:after { content: \"OFF\"; position: absolute; top: 3px; left: 44px; font-size: 10px; color: #0072cf !important; } input:checked+.toggle-ball { background-color: #31acff !important; border: 1px solid #31acff !important; } input:checked+.toggle-ball:before { background-color: #181818 !important; -webkit-transform: translateX(34px); -ms-transform: translateX(34px); transform: translateX(34px); } input:checked+.toggle-ball:after { content: \"ON\"; color: #181818 !important; position: absolute; top: 3px; left: 4px; font-size: 10px; } @media (max-width: 1024px) { .navbar-right { display: none; } .navbar .dropdown .dropdown-menu { display: none; } } .expand-mobile-icon { margin-top: 188px !important; position: absolute; } .navbar .dropdown .dropdown-menu .section-label { font-weight: bold; font-size: 16px; color: #999999; padding: 10px 0 10px 10px; } /*Win into section Css*/ .navbar .dropdown .setting-wrapper { position: absolute; width: 320px; height: 35px; z-index: 100; right: 0; top: -3px; } .navbar .dropdown .dropdown-menu:after, .navbar .dropdown .dropdown-menu:before { bottom: 100%; right: 5px; border: solid transparent; content: \" \"; height: 0; width: 0; position: absolute; pointer-events: none; } .navbar .dropdown .dropdown-menu:after { border-color: transparent; border-bottom-color: #fff; border-width: 9px; margin-left: -9px; } .navbar .dropdown .dropdown-menu:before { border-color: transparent; border-bottom-color: #ccc; border-width: 10px; margin-left: -10px; right: 4px; } .navbar .dropdown .dropdown-menu .win-label { padding: 14px 10px 15px 20px; width: 100%; font-size: 14px; } .navbar .dropdown .dropdown-menu .company-name { padding: 15px 0 15px 0; width: 100%; font-family: 'OpenSans', 'Open Sans'; font-weight: 400; font-style: normal; font-size: 16px; border-top-left-radius: 4px; border-top-right-radius: 4px; } .navbar .dropdown .dropdown-menu .fa-angle-left,  .navbar .dropdown .dropdown-menu .fa-angle-right { font-size: 28px !important; cursor: pointer; color: #575659; } .navbar .dropdown .dropdown-menu .fa-angle-right { margin-top: -4px; } .navbar .dropdown .dropdown-menu .fa-angle-left { position: absolute; left: 10px; margin-top: -2px; } .navbar .dropdown .dropdown-menu .company-heading { font-size: 16px; padding: 15px 0 15px 0; position: relative; border-top-left-radius: 4px; border-top-right-radius: 4px; } .navbar .dropdown .dropdown-menu label.win-label { margin-bottom: 10px; } .company-selection { padding: 10px 10px 0 10px; } .company-selection-label { padding-bottom: 5px; color: #575659; } .company-selection input { border-radius: 0; box-shadow: none; } .select-btn { font-size: 1em; min-width: 83px; min-height: 34px; border-radius: 4px; background: #fff !important; color: #0072cf; background-color: #fff !important; border: 1px solid #0072cf !important; } .select-btn:hover { color: #004883; border: 1px solid #004883 !important; } .select-btn:active { color: #004883; border: 1px solid #004883 !important; box-shadow: none; } .select-btn:focus { color: #004883; border: 1px solid #004883 !important; } .select-btn.active.focus, .select-btn.active:focus, .select-btn.focus, .select-btn:active.focus,  .select-btn:active:focus, .select-btn:focus {  outline: 5px auto -webkit-focus-ring-color; } .select-btn-div { padding-top: 4px; } .current-selection { padding: 0 0 5px 10px; } .selected-company, .recent-searched-company { padding: 11px 0 11px 0; color: #575659;     } .selected-company { background-color: #cfe9ff; border-color: #cccccc; } .recent-search-div { padding: 10px 0 10px 10px; } .recent-searched-company:hover { background-color: #cfe9ff; cursor: pointer; } .recent-search { color: #999999; font-weight: normal; } .win-in-company { padding: 14px 0 15px 20px; cursor: pointer; } /* Styling for Theme */ :host-context(.light) .navbar .dropdown .dropdown-menu,  .light .navbar .dropdown .dropdown-menu {  background: #f5f5f5; } :host-context(.dark) .navbar .dropdown .dropdown-menu,  .dark .navbar .dropdown .dropdown-menu {  background: #000; } :host-context(.light) .navbar .dropdown .dropdown-menu .win-label,  .light .navbar .dropdown .dropdown-menu .win-label { background: #fff; } :host-context(.dark) .navbar .dropdown .dropdown-menu .win-label,  .dark .navbar .dropdown .dropdown-menu .win-label { background: #666666; color: #cccccc; } :host-context(.dark) .company-selection-label,  .dark .company-selection-label { color: #A8A9A6; } :host-context(.dark) .recent-search,  .dark .recent-search { color: #A8A9A6; } :host-context(.dark) .recent-searched-company,  .dark .recent-searched-company { color: #A8A9A6; } :host-context(.dark) .recent-searched-company:hover,  .dark .recent-searched-company:hover { color: #333333; } :host-context(.dark) .select-btn.active.focus, .select-btn.active:focus, .select-btn.focus, .select-btn:active.focus, .select-btn:active:focus, .select-btn:focus,  .dark .select-btn.active.focus, .select-btn.active:focus, .select-btn.focus, .select-btn:active.focus, .select-btn:active:focus, .select-btn:focus { outline: 5px auto -webkit-focus-ring-color !important; } :host-context(.dark) .dark-ui-secondary-btn,  .dark .dark-ui-secondary-btn { color: #31acff; background-color: #000 !important; border: 1px solid #31acff !important; } :host-context(.dark) .dark-ui-secondary-btn:hover,  .dark .dark-ui-secondary-btn:hover { color: #0088e4; border: 1px solid #0088e4 !important; } :host-context(.dark) .dark-ui-secondary-btn:active, .dark-ui-secondary-btn:focus,  .dark .dark-ui-secondary-btn:active, .dark-ui-secondary-btn:focus { color: #0088e4; border: 1px solid #0088e4 !important; box-shadow: none; } :host-context(.dark) .selected-company,  .dark .selected-company { border-color: #333333; color: #333333; } :host-context(.light) .navbar .dropdown .setting-wrapper,  .light .navbar .dropdown .setting-wrapper { background: #fff; } :host-context(.dark) .navbar .dropdown .setting-wrapper,  .dark .navbar .dropdown .setting-wrapper { background: #181818; } :host-context(.dark) .navbar .dropdown .dropdown-menu:after, .dark .navbar .dropdown .dropdown-menu:after { border-bottom-color: #666666; } :host-context(.dark) .navbar .dropdown .dropdown-menu .company-name,  .dark .navbar .dropdown .dropdown-menu .company-name { color: #cccccc; } :host-context(.dark) .win-in-company,  .dark .win-in-company { color: #cccccc; } :host-context(.dark) .navbar .dropdown .dropdown-menu .fa-angle-left,  :host-context(.dark) .navbar .dropdown .dropdown-menu .fa-angle-right,  .dark .navbar .dropdown .dropdown-menu .fa-angle-left,  .dark .navbar .dropdown .dropdown-menu .fa-angle-right { color: #cccccc; } /*Win into Section Css ends*/ @media only screen and (max-width: 767px), (max-device-width: 1024px) and (min-device-width: 768px) { .win-nav { left: -20px; margin-right: -30px; } .navbar-brand { display: none; } .navbar { padding-left: 30px; } } :host-context(.contrast) * :not(.select-btn):not(.recent-search), .contrast * :not(.select-btn):not(.recent-search), :host-context(.contrast) .navbar .dropdown .dropdown-menu .company-name, .contrast .navbar .dropdown .dropdown-menu .company-name {     color: #000000; } :host-context(.contrast) * :not(.fa):not(.fa-angle-left):not(.fa-angle-right), .contrast * :not(.fa):not(.fa-angle-left):not(.fa-angle-right), :host-context(.contrast) .navbar .dropdown .dropdown-menu .company-name, .contrast .navbar .dropdown .dropdown-menu .company-name { font-weight: bold; } :host-context(.contrast) .fa-angle-left, :host-context(.contrast) .fa-angle-right, .contrast .fa-angle-left, .contrast .fa-angle-right { color : #000000 !important; } "]
            },] },
];
/**
 * @nocollapse
 */
NavbarComponent.ctorParameters = function () { return [
    { type: CarouselService, },
    { type: UtilService, },
    { type: ThemeService, },
    { type: Router, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT$1,] },] },
    { type: CookieService, },
    { type: ShareDataService, },
]; };
NavbarComponent.propDecorators = {
    'onClickTopBarCloseSideNavBar': [{ type: Output },],
    'toggleBlockUI': [{ type: Output },],
    'onResize': [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};

var UrlService = (function () {
    function UrlService() {
    }
    /**
     * @param {?} environment
     * @return {?}
     */
    UrlService.prototype.getShippingManifestUrl = function (environment) {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.SHIPPING_MANIFEST_PROD;
            case UrlService.QA:
                return UrlService.SHIPPING_MANIFEST_QA;
            case UrlService.DEV:
                return UrlService.SHIPPING_MANIFEST_DEV;
            case UrlService.LOCAL:
                return UrlService.SHIPPING_MANIFEST_LOCAL;
        }
    };
    /**
     * @param {?} environment
     * @return {?}
     */
    UrlService.prototype.getWorkingQueuesUrl = function (environment) {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.WORKING_QUEUES_PROD;
            case UrlService.QA:
                return UrlService.WORKING_QUEUES_QA;
            case UrlService.DEV:
                return UrlService.WORKING_QUEUES_DEV;
            case UrlService.LOCAL:
                return UrlService.WORKING_QUEUES_LOCAL;
        }
    };
    /**
     * @param {?} environment
     * @return {?}
     */
    UrlService.prototype.getBinLocationsUrl = function (environment) {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.BIN_LOCATION_PROD;
            case UrlService.QA:
                return UrlService.BIN_LOCATION_QA;
            case UrlService.DEV:
                return UrlService.BIN_LOCATION_DEV;
            case UrlService.LOCAL:
                return UrlService.BIN_LOCATION_LOCAL;
        }
    };
    /**
     * @param {?} environment
     * @return {?}
     */
    UrlService.prototype.getPickingUrl = function (environment) {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.PICKING_PROD;
            case UrlService.QA:
                return UrlService.PICKING_QA;
            case UrlService.DEV:
                return UrlService.PICKING_DEV;
            case UrlService.LOCAL:
                return UrlService.PICKING_LOCAL;
        }
    };
    /**
     * @param {?} environment
     * @return {?}
     */
    UrlService.prototype.getPurchasingUrl = function (environment) {
        switch (environment) {
            case UrlService.DEV:
                return UrlService.PURCHASING_DEV;
            case UrlService.LOCAL:
                return UrlService.PURCHASING_LOCAL;
        }
    };
    return UrlService;
}());
UrlService.PROD = 'prod';
UrlService.QA = 'qa';
UrlService.DEV = 'dev';
UrlService.LOCAL = 'local';
UrlService.SHIPPING_MANIFEST_PROD = 'http://webservice.winwholesale.com/shipping-manifest-manager/';
UrlService.WORKING_QUEUES_PROD = 'http://webservice.winwholesale.com/queues-and-dashboards/';
UrlService.BIN_LOCATION_PROD = 'http://webservice.winwholesale.com/receiving-manager/';
UrlService.PICKING_PROD = 'http://webservice.winwholesale.com/picking-manager/';
UrlService.SHIPPING_MANIFEST_QA = 'http://winproxyqa.winwholesale.com/shipping-manifest-manager/';
UrlService.WORKING_QUEUES_QA = 'http://winproxyqa.winwholesale.com/queues-and-dashboards/';
UrlService.BIN_LOCATION_QA = 'http://winproxyqa.winwholesale.com/receiving-manager/';
UrlService.PICKING_QA = 'http://winproxyqa.winwholesale.com/picking-manager/';
UrlService.SHIPPING_MANIFEST_DEV = 'http://webservicedev.winwholesale.com/shipping-manifest-manager/';
UrlService.WORKING_QUEUES_DEV = 'http://webservicedev.winwholesale.com/queues-and-dashboards/';
UrlService.BIN_LOCATION_DEV = 'http://webservicedev.winwholesale.com/receiving-manager/';
UrlService.PICKING_DEV = 'http://webservicedev.winwholesale.com/picking-manager/';
UrlService.SHIPPING_MANIFEST_LOCAL = 'http://localhost:8080/';
UrlService.WORKING_QUEUES_LOCAL = 'http://localhost:8081/';
UrlService.BIN_LOCATION_LOCAL = 'http://localhost:8082/';
UrlService.PICKING_LOCAL = 'http://localhost:8083/';
UrlService.PURCHASING_LOCAL = 'http://localhost:4200';
UrlService.PURCHASING_DEV = 'http://webservicedev.winwholesale.com/purchasing-manager/';
UrlService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UrlService.ctorParameters = function () { return []; };

var SideNavComponent = (function () {
    /**
     * @param {?} urlService
     * @param {?} utilService
     * @param {?} document
     * @param {?} shareDataService
     */
    function SideNavComponent(urlService, utilService, document, shareDataService) {
        this.urlService = urlService;
        this.utilService = utilService;
        this.document = document;
        this.shareDataService = shareDataService;
        this.sideNavToggle = false;
        this.shipManMenuToggle = false;
        this.binLocationsMenuToggle = false;
        this.pickingMenuToggle = false;
        this.purchsingMenuToggle = false;
        this.toggleBlockUI = new EventEmitter();
        this.isActive = '1';
    }
    /**
     * @param {?=} application
     * @return {?}
     */
    SideNavComponent.prototype.highlightSideMenu = function (application) {
        var /** @type {?} */ url = this.document.location.href;
        var /** @type {?} */ urlPath = url.split('#')[1];
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
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ url = this.document.location.href;
        var /** @type {?} */ application = 3;
        this.shippingManifestUrl = this.urlService.getShippingManifestUrl(this.environment);
        this.workingQueuesUrl = this.urlService.getWorkingQueuesUrl(this.environment);
        this.binLocationUrl = this.urlService.getBinLocationsUrl(this.environment);
        this.pickingUrl = this.urlService.getPickingUrl(this.environment);
        this.purchasingUrl = this.urlService.getPurchasingUrl(this.environment);
        if (url === this.shippingManifestUrl) {
            application = 1;
        }
        else if (url === this.binLocationUrl) {
            application = 2;
        }
        else if (url === this.pickingUrl) {
            application = 3;
        }
        else if (url === this.purchasingUrl) {
            application = 4;
        }
        else {
            application = 5;
        }
        this.highlightSideMenu(application);
        this.closeShipManMenu();
        this.closeBinLocationMenu();
        this.closePickigMenu();
        this.closePurchasingMenu();
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.toggleSideNav = function () {
        this.sideNavToggle = !this.sideNavToggle;
        this.toggleBlockUI.emit();
        $('.side-nav-wrapper').toggleClass('open');
        if ($('.side-nav-wrapper').hasClass('open')) {
            $('#win-main-container').addClass('container-push');
            var /** @type {?} */ paddingForMobIcon = parseInt($('#openManifest').css('padding-bottom')) + $('#openManifest').height();
            if (this.shipManMenuToggle) {
                $('#openManifest').show();
                $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() + $('#openManifest').height() + 'px');
                $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
                $(".side-nav-toolbar.picking-manager").addClass('picking-margin-shipping');
                $(".side-nav-toolbar.logout-manager").addClass('logout-margin-shipping');
            }
            else {
                $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
                $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
            }
            if (this.binLocationsMenuToggle) {
                $('#openBinLocations').show();
                $(".side-nav-toolbar.picking-manager").addClass('picking-margin-binlocation');
                $(".side-nav-toolbar.logout-manager").addClass('logout-margin-binlocation');
            }
            else {
                $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-binlocation');
            }
            if (this.pickingMenuToggle) {
                $('#openPicking').show();
                $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
            }
            this.hideTooltip = true;
            $('#containerFluid, .navbar').css('padding-left', '15px');
            $('.sticky-bottom-navbar').css('cssText', 'padding-left: 15px !important');
            $('.delete-icon').css({ 'top': '0px', 'right': '10px' });
        }
        else {
            $('#win-main-container').removeClass('container-push');
            this.resetOtherMenus("", false);
            this.hideTooltip = false;
            $('#containerFluid, .navbar, .sticky-bottom-navbar').css('padding-left', '55px');
            $('.delete-icon').css({ 'top': '27px', 'right': '14px' });
        }
        if (this.sideNavToggle) {
            $('#nav-tooltip-manifests').addClass('hidden');
        }
        else {
            $('#nav-tooltip-manifests').removeClass('hidden');
        }
        this.hideSetting();
    };
    /**
     * Close side nav if device is mobile or clicked ouside sub nav
     * @param {?} isSideNavLinkClicked
     * @return {?}
     */
    SideNavComponent.prototype.closeSideNav = function (isSideNavLinkClicked) {
        var /** @type {?} */ closeSideNav = true;
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
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.toggleShipManMenu = function () {
        this.shipManMenuToggle = !this.shipManMenuToggle;
        this.resetOtherMenus("SHIPMAN", true);
        if (this.shipManMenuToggle) {
            $('#openManifest').show();
            $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() + $('#openManifest').height() + 'px');
            $(".side-nav-toolbar.bin-locations").addClass('expand-mobile-icon');
            $(".side-nav-toolbar.picking-manager").addClass('picking-margin-shipping');
            $(".side-nav-toolbar.logout-manager").addClass('logout-margin-shipping');
        }
        else {
            $('#openManifest').hide();
            $('.table-row.empty-row.non-expandable-div-empty-row').css('height', $('.table-row.empty-row.non-expandable-div-empty-row').height() - $('#openManifest').height() + 'px');
            $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
            $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-shipping');
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-shipping');
        }
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.togglePickingMenu = function () {
        this.pickingMenuToggle = !this.pickingMenuToggle;
        this.resetOtherMenus("PICKING", true);
        if (this.pickingMenuToggle) {
            $('#openPicking').show();
            $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
        }
        else {
            $('#openPicking').hide();
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
        }
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.toggleBinLocationsMenu = function () {
        this.binLocationsMenuToggle = !this.binLocationsMenuToggle;
        this.resetOtherMenus("BINLOCATIONS", true);
        if (this.binLocationsMenuToggle) {
            $('#openBinLocations').show();
            $(".side-nav-toolbar.picking-manager").addClass('picking-margin-binlocation');
            $(".side-nav-toolbar.logout-manager").addClass('logout-margin-binlocation');
        }
        else {
            $('#openBinLocations').hide();
            $(".side-nav-toolbar.picking-manager").removeClass('picking-margin-binlocation');
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-binlocation');
        }
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.togglePurchasingMenu = function () {
        this.purchsingMenuToggle = !this.purchsingMenuToggle;
        this.resetOtherMenus("PURCHASING", true);
        if (this.purchsingMenuToggle) {
            $('#openPurchasing').show();
            $(".side-nav-toolbar.logout-manager").addClass('logout-margin-picking');
        }
        else {
            $('#openPurchasing').hide();
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
        }
    };
    /**
     * @param {?} menuItem
     * @param {?=} disable
     * @return {?}
     */
    SideNavComponent.prototype.resetOtherMenus = function (menuItem, disable) {
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
        if (this.pickingMenuToggle && menuItem !== "PICKING") {
            if (disable) {
                this.pickingMenuToggle = false;
            }
            $('#openPicking').hide();
            $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
        }
        if (this.purchsingMenuToggle && menuItem != "PURCHASING") {
            if (disable) {
                this.purchsingMenuToggle = false;
            }
            $('#openPurchsing').hide();
            $(".side-nav-toolbar.bin-locations").removeClass('expand-mobile-icon');
            $(".side-nav-toolbar.logout-manager").removeClass('logout-margin-picking');
        }
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.closeShipManMenu = function () {
        this.shipManMenuToggle = false;
        $('#openManifest').hide();
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.closeBinLocationMenu = function () {
        this.binLocationsMenuToggle = false;
        $('#openBinLocations').hide();
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.closePickigMenu = function () {
        this.pickingMenuToggle = false;
        $('#openPicking').hide();
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.closePurchasingMenu = function () {
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.hideToolTip = function () {
        if ($('.side-nav-wrapper').hasClass('open')) {
            return true;
        }
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SideNavComponent.prototype.handleClick = function (event) {
        if (!$('.side-nav-wrapper').hasClass('open')) {
            $('#containerFluid, .navbar, .sticky-bottom-navbar').css('padding-left', '55px');
            this.hideTooltip = false;
        }
        else {
            $('#containerFluid, .navbar').css('padding-left', '15px');
            $('.sticky-bottom-navbar').css('cssText', 'padding-left: 15px !important');
            this.hideTooltip = true;
        }
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.hideSetting = function () {
        this.shareDataService.hideSetting();
    };
    /**
     * @return {?}
     */
    SideNavComponent.prototype.logout = function () {
        if (!this.logoutBaseUrl || this.logoutBaseUrl === '') {
            console.log("You must set the side-nav [logoutBaseUrl] for this functionality to work properly check out W2020-1889 for more information.");
        }
    };
    /**
     *
     * Navigating back to Angular
     * \@memberof SideNavComponent
     * @return {?}
     */
    SideNavComponent.prototype.gotoBack = function () {
        window.history.back();
    };
    return SideNavComponent;
}());
SideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'side-nav',
                template: "<div class=\"side-nav-wrapper\" id=\"side-nav-wrapper\"> <div class=\"icon-panel\"> <div class=\"table-row first-row\"> <div class=\"side-nav-toolbar\"> <a id=\"close\" class=\"close-icon parentLinks\" (click)=\"toggleSideNav()\"> <i class=\"fa fa-times\" aria-hidden=\"true\"></i> </a> <a id=\"open\" class=\"open-icon parentLinks\" (click)=\"toggleSideNav()\"> <i class=\"fa fa-bars\" aria-hidden=\"true\"></i> </a> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-toolbar shipping-manifest\"> <a href=\"{{shippingManifestUrl}}#/manifest-dashboard\" [ngClass]=\"{active: isActive=='1'}\" (click)=\"isActive = '1'\" id=\"toolbar-manifest\" class=\"parentLinks\"> <i class=\"fa fa-truck\" aria-hidden=\"true\"></i> </a> <div id=\"nav-tooltip-manifests\" class=\"nav-tooltip-manifests\" [class.hidden]=\"hideToolTip()\" (click)=\"hideSetting()\"> <div class=\"arrow-right\" [style.display] = \" hideTooltip ? 'none' : 'block'\"></div> <div class=\"nav-tooltip\" [style.display] =  \"hideTooltip ? 'none' : 'block'\"> <div><a class=\"side-nav-top-tooltip tooltip-white\">SHIPPING MANIFESTS</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='1'}\" (click)=\"isActive = '1'\" href=\"{{shippingManifestUrl}}#/manifest-dashboard\">Today's Summary</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='2'}\" (click)=\"isActive = '2'\" href=\"{{shippingManifestUrl}}#/list\">Manifests</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='3'}\" (click)=\"isActive = '3'\" href=\"{{shippingManifestUrl}}#/not-delivered-order-list\">Not Delivered Orders</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='4'}\" (click)=\"isActive = '4'\" href=\"{{shippingManifestUrl}}#/delivered-order-list\">Delivered Orders</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='5'}\" (click)=\"isActive = '5'\" href=\"{{shippingManifestUrl}}#/truck-list\">Trucks</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='6'}\" (click)=\"isActive = '6'\" href=\"{{shippingManifestUrl}}#/driver-list\">Drivers</a></div> </div> </div> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-toolbar bin-locations\"> <a href=\"{{binLocationUrl}}#/zone-details\" id=\"toolbar-mobile-bin-locations\" class=\"parentLinks\"> <i class=\"fa fa-inbox\" aria-hidden=\"true\"></i> </a> <div id=\"nav-tooltip-mobile-bin-location\" class=\"nav-tooltip-mobile-bin-locations\" [class.hidden]=\"hideToolTip()\" (click)=\"hideSetting()\"> <div class=\"arrow-right\" [style.display] = \" hideTooltip ? 'none' : 'block'\"></div> <div class=\"nav-tooltip\" [style.display] = \" hideTooltip ? 'none' : 'block'\"> <div><a class=\"side-nav-top-tooltip tooltip-white\">BIN LOCATIONS</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='7'}\" (click)=\"isActive = '7'\" href=\"{{binLocationUrl}}#/itembin-details\">Items & Bins</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='8'}\" (click)=\"isActive = '8'\" href=\"{{binLocationUrl}}#/zone-details\">Zones</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='9'}\" (click)=\"isActive = '9'\" href=\"{{binLocationUrl}}#/receiver-document\">Receiver Document</a></div> </div> </div> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-toolbar picking-manager\"> <a href=\"{{pickingUrl}}#/\" id=\"toolbar-picking\" class=\"parentLinks\"> <i class=\"fa fa-dropbox\" aria-hidden=\"true\"></i> </a> <div id=\"nav-tooltip-picking\" class=\"nav-tooltip-picking\" [class.hidden]=\"hideToolTip()\" (click)=\"hideSetting()\"> <div class=\"arrow-right\" [style.display] = \" hideTooltip ? 'none' : 'block'\"></div> <div class=\"nav-tooltip\" [style.display] =  \"hideTooltip ? 'none' : 'block'\"> <div><a class=\"side-nav-top-tooltip tooltip-white\">Picking</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='10'}\" (click)=\"isActive = '10'\" href=\"{{pickingUrl}}#/picking-Settings\">Settings</a></div> </div> </div> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-toolbar picking-manager pt-4\"> <a href=\"{{purchasingUrl}}#/suggest-order\" id=\"toolbar-picking\" class=\"parentLinks\"> <i class=\"fa fa-purchasing purchasing-icon\"  style=\"font-family: 'winsupply-icons' !important;\" aria-hidden=\"true\"></i> </a> <div id=\"nav-tooltip-picking\" class=\"nav-tooltip-picking pt-1 purchasing-carrot-icon\" [class.hidden]=\"hideToolTip()\" (click)=\"hideSetting()\"> <div class=\"arrow-right\" [style.display] = \" hideTooltip ? 'none' : 'block'\"></div> <div class=\"nav-tooltip purchasing-tooltip\" [style.display] =  \"hideTooltip ? 'none' : 'block'\"> <div><a class=\"side-nav-top-tooltip tooltip-white\">Purchasing</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='12'}\" (click)=\"isActive = '12'\" href=\"{{purchasingUrl}}#/suggested-order-lander\">Suggested-Order-Lander</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='13'}\" (click)=\"isActive = '13'\" href=\"{{purchasingUrl}}#/create-worksheet\">Create Worksheet</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='14'}\" (click)=\"isActive = '14'\" href=\"{{purchasingUrl}}#/edit-worksheet\">Edit Worksheet</a></div> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='15'}\" (click)=\"isActive = '15'\" href=\"{{purchasingUrl}}#/suggest-order\">Suggest Order</a></div> </div> </div> </div> </div> <div class=\"table-row\" *ngIf=\"logoutBaseUrl\"> <div class=\"side-nav-toolbar logout-manager\"> <a id=\"toolbar-logout\" class=\"parentLinks\" (click)=\"logout()\" href=\"{{logoutBaseUrl ? logoutBaseUrl + 'pkmslogout?filename=login.html' : ''}}\"> <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> </a> <div id=\"nav-tooltip-logout\" class=\"nav-tooltip-logout\" [class.hidden]=\"hideToolTip()\" (click)=\"hideSetting()\"> <div class=\"arrow-right\" [style.display] = \" hideTooltip ? 'none' : 'block'\"></div> <div class=\"nav-tooltip\" [style.display] =  \"hideTooltip ? 'none' : 'block'\"> <div>&nbsp;&nbsp;&nbsp;&nbsp;<a class=\"side-nav-tooltip\" [ngClass]=\"{active: isActive=='11'}\" (click)=\"isActive = '11'; logout()\" href=\"{{logoutBaseUrl ? logoutBaseUrl + 'pkmslogout?filename=login.html' : ''}}\">Logout</a></div> </div> </div> </div> </div> <div class=\"table-row empty-row non-expandable-div-empty-row\"> <div class=\"side-nav-toolbar\"></div> </div> </div> <div class=\"expandable-div\"> <div class=\"table-row first-row\"> <div class=\"side-nav-panel\"> <a class=\"mobile-nav\" [ngClass]=\"{active: isActive=='1'}\" (click)=\"isActive = '1'\" href=\"#\"><img src=\"https://cdn.winwholesale.com/default/img/logo-white.png\" width=\"100px\"></a> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-panel\"> <a id=\"panel-manifest\" (click)=\"toggleShipManMenu()\" class=\"parentLinks\">Shipping Manifests</a> <ul id=\"openManifest\" class=\"childLinks\" (click)=\"closeSideNav(true)\"> <li> <a [ngClass]=\"{active: isActive=='1'}\" (click)=\"isActive = '1'\" href=\"{{shippingManifestUrl}}#/manifest-dashboard\">Today's Summary</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '1'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='2'}\" (click)=\"isActive = '2'\" href=\"{{shippingManifestUrl}}#/list\">Manifests</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '2'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='3'}\" (click)=\"isActive = '3'\" href=\"{{shippingManifestUrl}}#/not-delivered-order-list\">Not Delivered Orders</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '3'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='4'}\" (click)=\"isActive = '4'\" href=\"{{shippingManifestUrl}}#/delivered-order-list\">Delivered Orders</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '4'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='5'}\" (click)=\"isActive = '5'\" href=\"{{shippingManifestUrl}}#/truck-list\">Trucks</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '5'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='6'}\" (click)=\"isActive = '6'\" href=\"{{shippingManifestUrl}}#/driver-list\">Drivers</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '6'\"></i> </li> </ul> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-panel\"> <a id=\"panel-bin-locations\" (click)=\"toggleBinLocationsMenu()\" class=\"parentLinks\">Bin Locations</a> <ul id=\"openBinLocations\" class=\"childLinks\" (click)=\"closeSideNav(true)\"> <li> <a [ngClass]=\"{active: isActive=='7'}\" (click)=\"isActive = '7'\" href=\"{{binLocationUrl}}#/itembin-details\">Items & Bins</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '7'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='8'}\" (click)=\"isActive = '8'\" href=\"{{binLocationUrl}}#/zone-details\">Zones</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '8'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='9'}\" (click)=\"isActive = '9'\" href=\"{{binLocationUrl}}#/receiver-document\">Receiver Document</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '9'\"></i> </li> </ul> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-panel\"> <a id=\"panel-picking\" (click)=\"togglePickingMenu()\" class=\"parentLinks\">Picking</a> <ul id=\"openPicking\" class=\"childLinks\" (click)=\"closeSideNav(true)\"> <li> <a [ngClass]=\"{active: isActive=='10'}\" (click)=\"isActive = '10'\" href=\"{{pickingUrl}}#/picking-Settings\">Settings</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '10'\"></i> </li> </ul> </div> </div> <div class=\"table-row\"> <div class=\"side-nav-panel\"> <a id=\"panel-picking\" (click)=\"togglePurchasingMenu()\" class=\"parentLinks\">Purchasing</a> <ul id=\"openPurchasing\" class=\"childLinks\" (click)=\"closeSideNav(true)\"> <li> <a [ngClass]=\"{active: isActive=='12'}\" (click)=\"isActive = '12'\" href=\"{{purchasingUrl}}#/suggested-order-lander\">Suggested Order Lander</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '12'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='13'}\" (click)=\"isActive = '13'\" href=\"{{purchasingUrl}}#/create-worksheet\">Create Worksheet</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '13'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='14'}\" (click)=\"isActive = '14'\" href=\"{{purchasingUrl}}#/edit-worksheet\">Edit Worksheet</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '14'\"></i> </li> <li> <a [ngClass]=\"{active: isActive=='15'}\" (click)=\"isActive = '15'\" href=\"{{purchasingUrl}}#/suggest-order\">Suggest Order</a> <i class=\"arrow fa fa-caret-left fa-2x\" *ngIf=\"isActive === '15'\"></i> </li> </ul> </div> </div> <div class=\"table-row\" *ngIf=\"logoutBaseUrl\"> <div class=\"side-nav-panel\"> <a id=\"panel-logout\" (click)=\"logout()\" class=\"parentLinks\" href=\"{{logoutBaseUrl ? logoutBaseUrl + 'pkmslogout?filename=login.html' : ''}}\">Logout</a> </div> </div> <div class=\"table-row empty-row\"> <div class=\"side-nav-panel\"></div> </div> </div> </div> ",
                styles: ["#side-nav-wrapper { display: table; position: fixed; top:0; left:0; width:40px; z-index: 999; } .nav-tooltip-manifests { position: absolute; top: 2.7em; left: 2.7em; min-width: 20em; display: none; } .nav-tooltip-mobile-bin-locations { position: absolute; top: 6.1em; left: 2.7em; min-width: 20em; display: none; } .nav-tooltip-picking { position: absolute; top: 9.8em; left: 2.7em; min-width: 20em; display: none; } .nav-tooltip-logout { position: absolute; top: 14em; left: 2.7em; min-width: 20em; display: none; } .nav-tooltip-logout .arrow-right { margin-top: 1.4em; } .nav-tooltip-queues { position: absolute; top: 6.1em; left: 2.7em; min-width: 20em; display: none; } .nav-tooltip { background: rgba(87, 86, 89, 0.9); border-radius: 5px; margin-left: 10px; padding: 1em; color: #ffffff; } .nav-tooltip a { line-height: 1.9em !important; color: #ffffff; font-size: 16px; } .shipping-manifest:hover .nav-tooltip-manifests, .bin-locations:hover .nav-tooltip-mobile-bin-locations, .picking-manager:hover .nav-tooltip-picking, .logout-manager:hover .nav-tooltip-logout { display: block; } .nav-tooltip a:link { color: #ffffff; } .nav-tooltip a:visited { color: #ffffff; } .nav-tooltip a:hover { color: #ffffff; text-decoration: underline; } .nav-tooltip a:active { color: #ffffff; } .side-nav-top-tooltip:hover { text-decoration: none !important; cursor: default; } .tooltip-white{ color: #f5f5f5 !important; } .table-row { display: table-row; } .empty-row { height: 100vh; } .arrow-right { width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-right: 10px solid rgba(87, 86, 89, 0.9); margin-top: 2em; float: left; } .fa-caret-left { color: #f5f5f5; float: right; margin-top: -27px; margin-right:-1px; } .close-icon { font-size: 14px !important; } .expandable-div .first-row .side-nav-panel { padding-top: 15px !important; padding-bottom: 15px !important; } @media only screen and (min-device-width: 1024px) { .side-nav-panel { display: block; } } @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) { .side-nav-panel ul { margin-left: -40px !important; width: 280px !important; } } @media only screen and (max-width: 767px), (min-device-width: 768px) and (max-device-width: 1024px) { .shipping-manifest:hover .nav-tooltip-manifests, .bin-locations:hover .nav-tooltip-mobile-bin-locations, .picking-manager:hover .nav-tooltip-picking, .logout-manager:hover .nav-tooltip-logout  { display: none; } .side-nav-panel { display: table-cell; } .side-nav-panel ul.childLinks li { background-color: #575659 !important; } .side-nav-toolbar { background-color: #575659 !important; } .side-nav-toolbar.shipping-manifest, .side-nav-toolbar.picking-manager, .side-nav-toolbar.logout-manager, .side-nav-toolbar.bin-locations { padding-top: 2px; padding-bottom: 2px; } .side-nav-toolbar a { font-size: 13px; line-height: 3.7em; } .side-nav-panel ul.childLinks a { padding: 6px 8px 6px 48px !important; } .side-nav-toolbar .bin-locations { background: #575659 !important; } .side-nav-toolbar .picking-manager { background: #575659 !important; } .open .shipping-manifest, .open .bin-locations, .open .picking-manager { background: #646366; background: linear-gradient( to top, #646366 0px, #646366 50px, #575659 50px, #575659 150px ); /* Standard syntax */ /*  background: -webkit-linear-gradient(-180deg, #575659, #575659); !* For Safari 5.1 to 6.0 *! background: -o-linear-gradient(-180deg, #575659, #575659); !* For Opera 11.1 to 12.0 *! background: -moz-linear-gradient(-180deg, #575659, #575659); !* For Firefox 3.6 to 15 *!*/ } #side-nav-wrapper.open { margin-left: 0px; transition: all .4s linear; transform: translate3d(0px, 0, 0); } #side-nav-wrapper { padding-top: 0; position: fixed; top: 0px; width: 0; transition: all .4s linear; transform: translate3d(-40px, 0, 0); } .side-nav-panel { background-color: #575659; } #containerFluid { padding-left: 15px; } .open .side-nav-toolbar { display: table-cell; border-bottom: 2px solid #575659; background-color: #646366; } .open .shipping-manifest{ background: #646366; background: linear-gradient( to bottom, #646366 0px, #646366 50px, #575659 50px, #575659 150px ); background: -moz-linear-gradient(-180deg, #575659, #575659); } .side-nav-panel a.parentLinks { background-color: #646366; border-bottom: 2px solid #575659; } .empty-row .side-nav-toolbar { background-color: #575659; } .first-row .side-nav-toolbar { background-color: #575659; } .side-nav-panel ul.childLinks li { background-color: #575658; } .side-nav-panel ul { padding-bottom: 2px; } } @media only screen and (max-width: 767px) { .side-nav-panel ul { margin-left: -40px !important; } .arrow { display: none !important; } .open .side-nav-toolbar.shipping-manifest, .open .side-nav-toolbar.bin-locations, .open .side-nav-toolbar.picking-manager, .open .side-nav-toolbar.logout-manager { background-color: #646366 !important; } .icon-panel { z-index: 1; } .expandable-div { z-index: 2 !important; } .side-nav-panel ul.childLinks li { line-height: 1.5; } .icon-panel .first-row .side-nav-toolbar { border-bottom-width: 0px !important; } } .expandable-div { display: table; position: fixed; top: 0; left: 40px; width: 240px; z-index: -99999; background-color: #646366; transition: all .4s linear; transform: translate3d(-6px, 0, 0); margin-left: -280px; } @media only screen and (max-width: 500px) { .empty-row { height: 118vh !important; } .expandable-div { display: table; position: fixed; top: 0; width: 195px; z-index: -99999; background-color: #646366; transition: all .4s linear; transform: translate3d(-6px, 0, 0); margin-left: -280px; } .open .expandable-div { background-color: #646366; margin-left: 0; } } .open .expandable-div { background-color: #646366; margin-left: 6px; } .expandable-div .first-row .side-nav-panel { padding-top: 14px; padding-bottom: 14px; } @media only screen and (max-width: 1024px) { #side-nav-wrapper.open { z-index: 99999; } } .expand-mobile-icon { margin-top: 188px !important; position: absolute } .picking-margin-shipping { margin-top: 240px !important; position: absolute } .picking-margin-binlocation { margin-top: 95px !important; position: absolute } .logout-margin-shipping { margin-top: 290px !important; position: absolute; } .logout-margin-binlocation { margin-top: 147px !important; position: absolute; } .logout-margin-picking { margin-top: 34px !important; position: absolute; } .side-nav-panel ul.childLinks li { line-height: 19.5px; } .icon-panel .side-nav-toolbar.shipping-manifest { border-bottom: 2px solid #575659; } .expandable-div { z-index: 2; } .icon-panel { z-index: 1; } .container-push{ padding-left: 0px !important; } #panel-logout { background: none; } .purchasing-carrot-icon{ margin-top: 45px; } .purchasing-tooltip{ margin-top: 13px; } .container-push .sticky-bottom-navbar { margin-left: 280px; padding-left: 15px !important; } "],
                host: {}
            },] },
];
/**
 * @nocollapse
 */
SideNavComponent.ctorParameters = function () { return [
    { type: UrlService, },
    { type: UtilService, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: ShareDataService, },
]; };
SideNavComponent.propDecorators = {
    'environment': [{ type: Input, args: ['environment',] },],
    'logoutBaseUrl': [{ type: Input, args: ['logoutBaseUrl',] },],
    'toggleBlockUI': [{ type: Output },],
    'handleClick': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};

var DateService = (function () {
    function DateService() {
    }
    /**
     * Given a date/time string with the specified input format, return a new date/time string with the specified output format.
     * Uses Moment.js
     * @param {?} input the date/time input string
     * @param {?} inputFormat how the input is formatted
     * @param {?} outputFormat how the output should be formatted
     * @return {?}
     */
    DateService.prototype.format = function (input, inputFormat, outputFormat) {
        var /** @type {?} */ formattedDate = moment(input, inputFormat).format(outputFormat);
        if (formattedDate === DateService.INVALID) {
            return null;
        }
        return formattedDate;
    };
    /**
     * @param {?} inputDate
     * @param {?} outputFormat
     * @return {?}
     */
    DateService.prototype.formatDate = function (inputDate, outputFormat) {
        return moment(inputDate).format(outputFormat);
    };
    /**
     * Get the current date time.
     * @param {?} outputFormat
     * @return {?}
     */
    DateService.prototype.currentDate = function (outputFormat) {
        return this.formatDate(new Date(), outputFormat);
    };
    /**
     * Given the specified date time string in local time, get the date time string in UTC.
     * @param {?} localDateTime
     * @param {?} inputFormat
     * @param {?} outputFormat
     * @return {?}
     */
    DateService.prototype.getUniversalTime = function (localDateTime, inputFormat, outputFormat) {
        var /** @type {?} */ minuteOffset = new Date().getTimezoneOffset();
        var /** @type {?} */ date = moment(localDateTime, inputFormat);
        date.add(minuteOffset, 'm');
        return date.format(outputFormat);
    };
    /**
     * Given the specified date time string in UTC, get the date time string in local time.
     * @param {?} universalDateTime
     * @param {?} inputFormat
     * @param {?} outputFormat
     * @return {?}
     */
    DateService.prototype.getLocalTime = function (universalDateTime, inputFormat, outputFormat) {
        var /** @type {?} */ minuteOffset = new Date().getTimezoneOffset();
        var /** @type {?} */ date = moment(universalDateTime, inputFormat);
        date.subtract(minuteOffset, 'm');
        return date.format(outputFormat);
    };
    /**
     * Calculates the time difference in minutes between the start time and end time.
     * @param {?} startTimeString
     * @param {?} endTimeString
     * @param {?} format
     * @return {?}
     */
    DateService.prototype.calculateDifference = function (startTimeString, endTimeString, format) {
        var /** @type {?} */ startTime = moment(startTimeString, format);
        var /** @type {?} */ endTime = moment(endTimeString, format);
        return moment.duration(endTime.diff(startTime)).asMinutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateService.prototype.convertToDate = function (date) {
        if (!date) {
            return null;
        }
        var /** @type {?} */ parts = date.split('/');
        return parts[2] + '-' + parts[0] + '-' + parts[1];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateService.prototype.convertFromDate = function (date) {
        if (!date) {
            return null;
        }
        var /** @type {?} */ parts = date.split('-');
        return parts[1] + '/' + parts[2] + '/' + parts[0];
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DateService.prototype.convertCorrectTime = function (time) {
        if (!time) {
            return null;
        }
        var /** @type {?} */ part = time.split(':');
        if (part[0] !== '12' && part[1].substr(3) === 'PM') {
            part[0] = String(parseInt(part[0]) + 12);
        }
        return part[0] + ':' + part[1].substr(0, 2) + ':00';
    };
    return DateService;
}());
DateService.TIME_HH_MM_SS = 'HH:mm:ss';
DateService.TIME_H_MM_A = 'h:mm A';
DateService.DATE_YYYY_MM_DD = 'YYYY-MM-DD';
DateService.DATE_MM_DD_YYYY = 'MM/DD/YYYY';
DateService.DATE_TIMESTAMP = 'T00:00:00-05:00';
DateService.DATABASE_DATE_FORMAT = 'YYYY-MM-DD';
DateService.DATABASE_TIME_FORMAT = 'HH:mm:ss';
DateService.DATABASE_DATE_TIME_FORMAT = DateService.DATABASE_DATE_FORMAT + ' ' + DateService.DATABASE_TIME_FORMAT;
DateService.APPLICATION_DATE_FORMAT = 'MM/DD/YYYY';
DateService.APPLICATION_TIME_FORMAT = 'h:mm A';
DateService.APPLICATION_DATE_TIME_FORMAT = DateService.APPLICATION_DATE_FORMAT + ' ' + DateService.APPLICATION_TIME_FORMAT;
DateService.INVALID = 'Invalid date';
DateService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
DateService.ctorParameters = function () { return []; };

var RefreshService = (function () {
    function RefreshService() {
        this.callback = null;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    RefreshService.prototype.subscribe = function (callback) {
        this.callback = callback;
    };
    /**
     * @return {?}
     */
    RefreshService.prototype.unsubscribe = function () {
        this.callback = null;
    };
    /**
     * @return {?}
     */
    RefreshService.prototype.start = function () {
        this.initialize();
    };
    /**
     * @return {?}
     */
    RefreshService.prototype.initialize = function () {
        var _this = this;
        Observable.timer(RefreshService.TIMEOUT).subscribe(function () {
            if (_this.callback) {
                _this.callback();
            }
            _this.initialize();
        });
    };
    return RefreshService;
}());
RefreshService.TIMEOUT = 600000;
RefreshService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
RefreshService.ctorParameters = function () { return []; };

var ModalService = (function () {
    function ModalService() {
        this.openModalIdList = [];
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    ModalService.prototype.registerPopState = function (callback) {
        window.addEventListener('popstate', callback);
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    ModalService.prototype.unregisterPopState = function (callback) {
        window.removeEventListener('popstate', callback);
    };
    /**
     * @param {?} modalId
     * @param {?=} hideFocus
     * @return {?}
     */
    ModalService.prototype.openModal = function (modalId, hideFocus) {
        $('#' + modalId).modal('show');
        $('#' + modalId + ' .modal-dialog').animate({ scrollTop: 0 }, 'fast');
        this.openModalIdList.push(modalId);
        $('.modal-second-level').on('shown.bs.modal', function () {
            $('body').addClass('scroll-disable');
        });
        $('.modal').off('shown.bs.modal');
        $('.modal').on('shown.bs.modal', function () {
            if (!hideFocus && $('#' + this.id + ' input.form-control, ' + '#' + this.id + ' select.form-control')[0]) {
                $('#' + this.id + ' input.form-control, ' + '#' + this.id + ' select.form-control')[0].focus();
            }
        });
        $('body').on('touchmove', function (e) {
            if ($('.scroll-disable').has($(e.target)).length)
                e.preventDefault();
        });
    };
    /**
     * @param {?} modalId
     * @return {?}
     */
    ModalService.prototype.closeModal = function (modalId) {
        $('#' + modalId).modal('hide');
        $('#' + modalId).on('hidden.bs.modal', function () {
            $(' input.form-control,  select.form-control')[0].focus();
            $('body').removeClass('scroll-disable');
            if ($('#' + modalId).hasClass('modal-second-level')) {
                $('body').addClass('modal-open');
            }
            $('#' + modalId).off('hidden.bs.modal');
            return false;
        });
        var /** @type {?} */ modalIndex = this.openModalIdList.indexOf(modalId);
        this.openModalIdList.splice(modalIndex);
    };
    /**
     * @param {?} modalId
     * @return {?}
     */
    ModalService.prototype.scrollToTop = function (modalId) {
        $('#' + modalId + '.modal-dialog').scrollTop(0);
    };
    /**
     * @return {?}
     */
    ModalService.prototype.closeAllModals = function () {
        for (var _i = 0, _a = this.openModalIdList; _i < _a.length; _i++) {
            var modalId = _a[_i];
            this.closeModal(modalId);
        }
    };
    return ModalService;
}());
ModalService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ModalService.ctorParameters = function () { return []; };

var WinConfirmationComponent = (function () {
    /**
     * @param {?} modalService
     */
    function WinConfirmationComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.button1 = 'Yes';
        this.button2 = 'No';
        this.confirmed = new EventEmitter();
        this.unconfirmed = new EventEmitter();
        this.backButton = new EventEmitter();
        /**
         * Open the confirmation modal.
         * 1. Add 1 state to the history stack
         * 2. Open the modal
         * 3. Register the event listener
         */
        this.open = function () {
            // stay on the same page after the modal is closed
            history.pushState(null, null, document.URL);
            _this.modalService.openModal(_this.id);
            _this.modalService.registerPopState(_this.confirmationCallback);
        };
        /**
         * Modal is closed through user interaction with the page.
         * 1. Unregister the event listener
         * 2. Close the modal
         * 3. Go back 1 state in the history, because we added 1 state when opening the modal
         */
        this.close = function () {
            _this.modalService.unregisterPopState(_this.confirmationCallback);
            _this.modalService.closeModal(_this.id);
            history.go(-1);
        };
        /**
         * Modal is closed when the user presses the back button in the browser.
         * Callback function.
         * 1. Unregister the event listener
         * 2. Close the modal
         * 3. Inform the parent that the back button was pressed
         */
        this.confirmationCallback = function () {
            _this.modalService.unregisterPopState(_this.confirmationCallback);
            _this.modalService.closeModal(_this.id);
            _this.backButton.emit(true);
        };
        /**
         * Called when the user presses the button to confirm the decision.
         */
        this.confirm = function () {
            _this.close();
            setTimeout(_this.emitConfirmed, 0);
        };
        /**
         * Inform the parent that the confirm button was pressed.
         */
        this.emitConfirmed = function () {
            if (_this.model) {
                _this.confirmed.emit(_this.model);
            }
            else {
                _this.confirmed.emit('Success');
            }
        };
        /**
         * Called when the user presses the button to unconfirm the decision.
         */
        this.unconfirm = function () {
            _this.close();
            setTimeout(_this.emitUnconfirmed, 0);
        };
        /**
         * Inform the parent that the unconfirm button was pressed.
         */
        this.emitUnconfirmed = function () {
            _this.unconfirmed.emit(true);
        };
    }
    return WinConfirmationComponent;
}());
WinConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-confirmation',
                template: "<div class=\"win-confirmation-modal fade modal-second-level\" [id]=\"id\" tabindex=\"-1\" role=\"dialog\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"win-confirmation-modal-dialog-content\"> <div class=\"win-confirmation-modal-content\"> <div class=\"win-confirmation-modal-body container\"> <div class=\"win-blue win-confirmation-title\">{{title}}</div> <div class=\"win-confirmation-wrapper\"> <div class=\"win-confirmation-icon\"> <i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i> </div> </div> <div class=\"win-confirmation-text\">{{message}}</div> <div class=\"win-confirmation-wrapper\"> <button type=\"button\" class=\"btn win-confirmation-btn-white background-blue\" (click)=\"unconfirm()\">{{button2}}</button> <button type=\"button\" class=\"btn win-confirmation-btn-blue background-blue\" (click)=\"confirm()\">{{button1}}</button> </div> </div> </div> </div> </div> </div>",
                styles: [".win-confirmation-modal { background-color: rgba(0, 0, 0, 0.5); position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 1051; display: none; } .win-confirmation-modal-content { width: 100%; height: 100%; } .win-confirmation-modal-dialog-content { width: 70%; } .win-confirmation-modal-body { width: 100%; height: auto; max-width: 560px; background-color: #f5f5f5; border-radius: 5px; } .win-confirmation-title { margin-top: 30px; margin-bottom: 0px; font-size: 24px; text-align: center; } .win-confirmation-text { margin-top: 15px; text-align: center; font-size: 15px; } .win-confirmation-btn-blue, .win-confirmation-btn-white { width: 35%; max-width: 180px; min-height: 50px; margin: 5%; font-size: 18px; line-height: 1.3333333; border-radius: 6px; border: 2px solid #0072cf; text-wrap: normal; } .win-confirmation-btn-blue { background-color: #0072cf; color: #ffffff; float: right; } .win-confirmation-btn-blue:hover { background-color: #0064B6; } .win-confirmation-btn-white { background-color: #ffffff; color: #0072cf; float: left; } .win-confirmation-btn-white:hover { background-color: #ffffff; border-color: #0064b6; color: #0064b6; } .win-confirmation-btn-white:active { background-color: #ffffff; border-color: #0064b6; color: #0064b6; } .win-confirmation-btn-blue:hover { background-color: #00569c; border-color: #00569c; color: #ffffff; } .win-confirmation-btn-blue:active { background-color: #00569c; border-color: #00569c; color: #ffffff; } .win-confirmation-wrapper { text-align: center; } .win-confirmation-icon { height: 100px; display: inline-block; font-size: 100px; } .win-confirmation-modal .modal-dialog { display: flex; align-items: center; justify-content: center; }"]
            },] },
];
/**
 * @nocollapse
 */
WinConfirmationComponent.ctorParameters = function () { return [
    { type: ModalService, },
]; };
WinConfirmationComponent.propDecorators = {
    'id': [{ type: Input, args: ['id',] },],
    'title': [{ type: Input, args: ['title',] },],
    'message': [{ type: Input, args: ['message',] },],
    'button1': [{ type: Input, args: ['button1',] },],
    'button2': [{ type: Input, args: ['button2',] },],
    'model': [{ type: Input, args: ['model',] },],
    'confirmed': [{ type: Output },],
    'unconfirmed': [{ type: Output },],
    'backButton': [{ type: Output },],
};

var BS4WinConfirmationComponent = (function () {
    /**
     * @param {?} modalService
     */
    function BS4WinConfirmationComponent(modalService) {
        var _this = this;
        this.modalService = modalService;
        this.button1 = 'Yes';
        this.button2 = 'No';
        this.confirmed = new EventEmitter();
        this.unconfirmed = new EventEmitter();
        this.backButton = new EventEmitter();
        /**
         * Open the confirmation modal.
         * 1. Add 1 state to the history stack
         * 2. Open the modal
         * 3. Register the event listener
         */
        this.open = function () {
            // stay on the same page after the modal is closed
            history.pushState(null, null, document.URL);
            _this.modalService.openModal(_this.id);
            _this.modalService.registerPopState(_this.confirmationCallback);
        };
        /**
         * Modal is closed through user interaction with the page.
         * 1. Unregister the event listener
         * 2. Close the modal
         * 3. Go back 1 state in the history, because we added 1 state when opening the modal
         */
        this.close = function () {
            _this.modalService.unregisterPopState(_this.confirmationCallback);
            _this.modalService.closeModal(_this.id);
            history.go(-1);
        };
        /**
         * Modal is closed when the user presses the back button in the browser.
         * Callback function.
         * 1. Unregister the event listener
         * 2. Close the modal
         * 3. Inform the parent that the back button was pressed
         */
        this.confirmationCallback = function () {
            _this.modalService.unregisterPopState(_this.confirmationCallback);
            _this.modalService.closeModal(_this.id);
            _this.backButton.emit(true);
        };
        /**
         * Called when the user presses the button to confirm the decision.
         */
        this.confirm = function () {
            _this.close();
            setTimeout(_this.emitConfirmed, 0);
        };
        /**
         * Inform the parent that the confirm button was pressed.
         */
        this.emitConfirmed = function () {
            if (_this.model) {
                _this.confirmed.emit(_this.model);
            }
            else {
                _this.confirmed.emit('Success');
            }
        };
        /**
         * Called when the user presses the button to unconfirm the decision.
         */
        this.unconfirm = function () {
            _this.close();
            setTimeout(_this.emitUnconfirmed, 0);
        };
        /**
         * Inform the parent that the unconfirm button was pressed.
         */
        this.emitUnconfirmed = function () {
            _this.unconfirmed.emit(true);
        };
    }
    return BS4WinConfirmationComponent;
}());
BS4WinConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'bs4-win-confirmation',
                template: "<div class=\"modal win-modal-small fade\" [id]=\"id\" tabindex=\"-1\" role=\"dialog\" data-keyboard=\"false\" data-backdrop=\"static\"> <div class=\"modal-dialog\" role=\"document\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <h2 class=\"win-blue modal-title text-center w-100\">{{title}}</h2> </div> <div class=\"modal-body\"> <div> <i class=\"fa fa-question-circle fa-5x\" aria-hidden=\"true\"></i> </div> <div class=\"modal-message\">{{message}}</div> </div> <div class=\"modal-footer justify-content-between\"> <button type=\"button\" class=\"btn win-button win-button-big win-button-secondary left\" (click)=\"unconfirm()\">{{button2}}</button> <button type=\"button\" class=\"btn win-button win-button-big win-button-primary\" (click)=\"confirm()\">{{button1}}</button> </div> </div> </div> </div>",
            },] },
];
/**
 * @nocollapse
 */
BS4WinConfirmationComponent.ctorParameters = function () { return [
    { type: ModalService, },
]; };
BS4WinConfirmationComponent.propDecorators = {
    'id': [{ type: Input, args: ['id',] },],
    'title': [{ type: Input, args: ['title',] },],
    'message': [{ type: Input, args: ['message',] },],
    'button1': [{ type: Input, args: ['button1',] },],
    'button2': [{ type: Input, args: ['button2',] },],
    'model': [{ type: Input, args: ['model',] },],
    'confirmed': [{ type: Output },],
    'unconfirmed': [{ type: Output },],
    'backButton': [{ type: Output },],
};

var DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return WinDatepickerComponent; }),
    multi: true
};
var DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return WinDatepickerComponent; }),
    multi: true
};
/**
 * Implement the ControlValueAccessor interface to integrate with Angular forms.
 */
var WinDatepickerComponent = (function () {
    /**
     * @param {?} dateService
     */
    function WinDatepickerComponent(dateService) {
        var _this = this;
        this.dateService = dateService;
        this.dateChange = new EventEmitter();
        this.clicked = false;
        this.onChange = function () { };
        this.onTouched = function () { };
        /**
         * Takes a new value from the form model and writes it into the view.
         * @param value the new value
         */
        this.writeValue = function (value) {
            if (value !== _this.date) {
                _this.date = value;
            }
        };
        this.change = function (value) {
            var /** @type {?} */ regEx1 = /[^0-9\/]/g;
            value = value.replace(regEx1, '');
            _this.date = value;
            var /** @type {?} */ jqueryEl = _this.getJQueryElement();
            jqueryEl.val(value);
            _this.onTouched();
            _this.onChange(_this.date);
            _this.dateChange.emit(_this.date);
        };
        this.initializeDatepicker = function () {
            var /** @type {?} */ that = _this;
            if (!_this.isInitialized) {
                var /** @type {?} */ jqueryEl_1 = _this.getJQueryElement();
                jqueryEl_1.off('changeDate');
                jqueryEl_1.off('hide');
                jqueryEl_1.datepicker({
                    autoclose: true,
                    forceParse: false,
                    format: 'mm/dd/yyyy',
                    orientation: 'auto',
                    startDate: that.startDate,
                    endDate: that.endDate
                });
                jqueryEl_1.on('changeDate', function () {
                    that.date = jqueryEl_1.val();
                    that.onChange(that.date);
                    that.dateChange.emit(that.date);
                    that.hideDatepicker();
                });
                jqueryEl_1.on('hide', function () {
                    that.onTouched();
                    that.blur.emit(that.date);
                });
                jqueryEl_1.blur();
                _this.isInitialized = true;
                $('.datepicker').on('click', function () {
                    that.clicked = true;
                });
                // for firefox to set focus
                // setting the focus will call initializeDatepicker again
                // use isInitialized to avoid an infinite loop
                setTimeout(function () {
                    jqueryEl_1.focus();
                }, 0);
            }
            else {
                _this.isInitialized = false;
            }
        };
        /**
         * To hide the open datepicker widget
         */
        this.hideDatepicker = function () {
            var that = _this;
            setTimeout(function () {
                if (that.clicked) {
                    that.clicked = false;
                }
                $('.datepicker').hide();
            }, 100);
        };
        this.pattern = WinDatepickerComponent.DATE_FORMAT;
        this.blur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    WinDatepickerComponent.prototype.ngOnChanges = function () {
        // Need to update start/end date if changed
        var /** @type {?} */ el = this.getJQueryElement();
        el.datepicker('setEndDate', this.endDate);
        el.datepicker('setStartDate', this.startDate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WinDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WinDatepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Called on keyup event
     * @param {?} event
     * @return {?}
     */
    WinDatepickerComponent.prototype.callvalidate = function (event) {
        if (event && event.target.value && event.code === 'ArrowRight' || event.code === 'ArrowLeft' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            this.change(event.target.value);
        }
    };
    /**
     * Determine whether the win-datepicker custom control is valid.
     * @param {?} c the form control
     * @return {?}
     */
    WinDatepickerComponent.prototype.validate = function (c) {
        if (c.value) {
            var /** @type {?} */ regEx = '^([0-9]{2}/[0-9]{2}/[0-9]{4})$';
            var /** @type {?} */ index = c.value.search(regEx);
            if (index > -1) {
                var /** @type {?} */ date1 = this.dateService.format(c.value, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
                if (!date1) {
                    return { valid: 'required' };
                }
                if (this.startDate && this.endDate) {
                    var /** @type {?} */ startDate = this.dateService.format(this.startDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
                    var /** @type {?} */ endDate = this.dateService.format(this.endDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
                    if (date1 < startDate || date1 > endDate) {
                        return { valid: 'required' };
                    }
                }
                else if (this.startDate) {
                    var /** @type {?} */ startDate = this.dateService.format(this.startDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
                    if (date1 < startDate) {
                        return { valid: 'required' };
                    }
                }
                else if (this.endDate) {
                    var /** @type {?} */ endDate = this.dateService.format(this.endDate, WinDatepickerComponent.DATE_FORMAT, 'YYYY/MM/DD');
                    if (date1 > endDate) {
                        return { valid: 'required' };
                    }
                }
                return null;
            }
            else {
                return { valid: 'required' };
            }
        }
        else {
            return { valid: 'required' };
        }
    };
    /**
     * @return {?}
     */
    WinDatepickerComponent.prototype.getJQueryElement = function () {
        var /** @type {?} */ myId = '#' + this.id;
        return $(myId);
    };
    return WinDatepickerComponent;
}());
WinDatepickerComponent.DATE_FORMAT = 'MM/DD/YYYY';
WinDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-datepicker',
                template: "<div class=\"input-group win-input\"> <input (keyup)=\"callvalidate($event)\" [id]=\"id\" [readonly]=\"readonly\" [disabled]=\"disabled\" [required]=\"required\" type=\"text\" class=\"form-control\" name=\"date\" [ngModel]=\"date\" (ngModelChange)=\"change($event)\" (focus)=\"initializeDatepicker()\" placeholder=\"mm/dd/yyyy\"/> </div> ",
                styles: [".datepicker table tr td.active:active, .datepicker table tr td.active.highlighted:active, .datepicker table tr td.active.active, .datepicker table tr td.active.highlighted.active { background-color: #0072cf; } .datepicker table tr td.disabled, .datepicker table tr td.disabled:hover { cursor: not-allowed; color: #E0E0E0; }"],
                providers: [DATEPICKER_VALUE_ACCESSOR, DATEPICKER_VALIDATORS]
            },] },
];
/**
 * @nocollapse
 */
WinDatepickerComponent.ctorParameters = function () { return [
    { type: DateService, },
]; };
WinDatepickerComponent.propDecorators = {
    'id': [{ type: Input },],
    'startDate': [{ type: Input },],
    'endDate': [{ type: Input },],
    'pattern': [{ type: Input },],
    'disabled': [{ type: Input },],
    'required': [{ type: Input },],
    'readonly': [{ type: Input },],
    'blur': [{ type: Output },],
    'dateChange': [{ type: Output },],
};

var TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return WinTimepickerComponent; }),
    multi: true
};
var TIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return WinTimepickerComponent; }),
    multi: true
};
/**
 * Implement the ControlValueAccessor interface to integrate with Angular forms.
 */
var WinTimepickerComponent = (function () {
    function WinTimepickerComponent() {
        var _this = this;
        this.cleared = new EventEmitter();
        this.model = { time: null };
        this.onChange = function () { };
        this.onTouched = function () { };
        this.clicked = false;
        /**
         * To hide the open timepicker widget
         */
        this.hideTimepicker = function () {
            var that = _this;
            var myId = '#' + that.id;
            setTimeout(function () {
                if (!that.clicked) {
                    $(myId).timepicker('hideWidget');
                }
                else {
                    that.clicked = false;
                }
            }, 100);
        };
        this.isRegistered = false;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    WinTimepickerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WinTimepickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * Takes a new value from the form model and writes it into the view.
     * @param {?} value the new value
     * @return {?}
     */
    WinTimepickerComponent.prototype.writeValue = function (value) {
        if (value !== this.model.time) {
            this.model.time = value;
        }
    };
    /**
     * Determine whether the win-timepicker custom control is valid.
     * @param {?} c the form control
     * @return {?}
     */
    WinTimepickerComponent.prototype.validate = function (c) {
        if (c.value) {
            var /** @type {?} */ regEx = '^([0-9]{1,2}:[0-9]{2} [AP][M])$';
            var /** @type {?} */ index = c.value.search(regEx);
            if (index > -1) {
                return null;
            }
        }
        else {
            return { valid: 'required' };
        }
        return { valid: 'pattern' };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WinTimepickerComponent.prototype.change = function (value) {
        this.model.time = value;
        this.onTouched();
        this.onChange(this.model.time);
    };
    /**
     * @param {?} model
     * @param {?} onChange
     * @param {?} onTouched
     * @param {?} initialValue
     * @return {?}
     */
    WinTimepickerComponent.prototype.initializeTimepicker = function (model, onChange, onTouched, initialValue) {
        var /** @type {?} */ that = this;
        that.clicked = false;
        // only register the change time event once (when the textbox initially gains focus)
        if (!this.isRegistered) {
            var /** @type {?} */ myId = '#' + this.id;
            $(myId).timepicker({
                minuteStep: 15,
                snapToStep: true
            });
            // when the timepicker widget is used to change the time, update the model
            $(myId).timepicker().on('changeTime.timepicker', function (e) {
                onTouched();
                //only update the value if the time has actually changed
                if (model.time !== initialValue || model.time !== e.time.value) {
                    model.time = e.time.value;
                    onChange(model.time);
                }
            });
            // when the timeipicker widget goes away, consider the component touched
            $(myId).timepicker().on('hide.timepicker', function (e) {
                onTouched();
            });
            $(myId).timepicker('showWidget');
            $('.bootstrap-timepicker-widget').on('click', function () {
                that.clicked = true;
            });
            // when the textbox initially gains focus, update the model
            model.time = $(myId).val();
            this.isRegistered = true;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    WinTimepickerComponent.prototype.clearTimepicker = function (e) {
        //if tab key pressed
        if (e.keyCode === 9) {
            var /** @type {?} */ myId = '#' + this.id;
            if (this.clearOnTab) {
                $(myId).timepicker('clear');
            }
            $(myId).timepicker('hideWidget');
            this.cleared.emit('success');
        }
    };
    return WinTimepickerComponent;
}());
WinTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-timepicker',
                template: "<div class=\"input-group win-input\"> <div class=\"bootstrap-timepicker timepicker\"> <input id=\"{{id}}\" type=\"text\" class=\"form-control\" [ngModel]=\"model.time\" (ngModelChange)=\"change($event)\" (focus)=\"initializeTimepicker(model, onChange, onTouched, initialValue)\" (keydown)=\"clearTimepicker($event)\"/> </div> </div> ",
                styles: [".bootstrap-timepicker-widget.dropdown-menu.open { display: inline-block; z-index: 99999 !important; } .bootstrap-timepicker-widget table td { border: none; }"],
                providers: [TIMEPICKER_VALUE_ACCESSOR, TIMEPICKER_VALIDATORS]
            },] },
];
/**
 * @nocollapse
 */
WinTimepickerComponent.ctorParameters = function () { return []; };
WinTimepickerComponent.propDecorators = {
    'id': [{ type: Input, args: ['id',] },],
    'clearOnTab': [{ type: Input, args: ['clearOnTab',] },],
    'initialValue': [{ type: Input, args: ['initialValue',] },],
    'cleared': [{ type: Output },],
};

var GridElement = (function () {
    /**
     * @param {?} name
     * @param {?} type
     * @param {?} color
     * @param {?=} ranges
     */
    function GridElement(name, type, color, ranges) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.ranges = ranges;
        if (!this.ranges) {
            this.ranges = [];
        }
    }
    /**
     * @param {?} range
     * @return {?}
     */
    GridElement.prototype.addRange = function (range) {
        this.ranges.push(range);
    };
    return GridElement;
}());

var GridRange = (function () {
    /**
     * @param {?} startColumn
     * @param {?} startRow
     * @param {?} columnsWide
     * @param {?} columnsHigh
     */
    function GridRange(startColumn, startRow, columnsWide, columnsHigh) {
        this.startColumn = startColumn;
        this.startRow = startRow;
        this.columnsWide = columnsWide;
        this.columnsHigh = columnsHigh;
    }
    return GridRange;
}());

var GridSquare = (function () {
    /**
     * @param {?} column
     * @param {?} row
     * @param {?} size
     */
    function GridSquare(column, row, size) {
        this.column = column;
        this.row = row;
        this.size = size;
        this.highlightState = GridSquare.NO_HIGHLIGHT;
        this.x = (column - 1) * this.size;
        this.y = (row - 1) * this.size;
    }
    return GridSquare;
}());
GridSquare.NO_HIGHLIGHT = 0;
GridSquare.HOVER_HIGHLIGHT = 1;
GridSquare.FULL_HIGHLIGHT = 2;

var WinGridComponent = (function () {
    function WinGridComponent() {
        this.TOTAL_COLUMNS = 1;
        this.TOTAL_ROWS = 1;
        this.SQUARE_SIZE = 20;
        this.LINE_SIZE = 1;
        this.LINE_COLOR = '#CCCCCC';
        this.GRID_COLOR = '#FFFFFF';
        this.initialized = new EventEmitter();
        this.elementSelected = new EventEmitter();
        this.layoutUpdated = new EventEmitter();
        this.creating = false;
        this.dragging = false;
        this.squares = [];
    }
    /**
     * @return {?}
     */
    WinGridComponent.prototype.ngOnInit = function () {
        this.canvas = (document.getElementById('grid-canvas'));
        this.ctx = this.canvas.getContext('2d');
        if (document.defaultView && document.defaultView.getComputedStyle) {
            this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
            this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
            this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
            this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
        }
        this.canvas.width = this.TOTAL_COLUMNS * this.SQUARE_SIZE;
        this.canvas.height = this.TOTAL_ROWS * this.SQUARE_SIZE;
        this.initializeSquares();
        this.drawGrid();
        var /** @type {?} */ currentState = this;
        /**
         * When the user clicks, either start dragging to hover highlight squares or fill
         * a range of selected squares.
         */
        this.canvas.addEventListener('mousedown', function (e) {
            if (!currentState.creating) {
                return;
            }
            var /** @type {?} */ square = currentState.calculateSquare(e);
            if (currentState.dragging) {
                var /** @type {?} */ square_1 = currentState.calculateSquare(e);
                if (square_1.highlightState === GridSquare.FULL_HIGHLIGHT) {
                    var /** @type {?} */ pts = currentState.determineEndPoints(square_1, currentState.draggingStartSquare);
                    currentState.clearUnnecessaryHighlights(pts, true);
                }
                else {
                    currentState.addRangeToElementInCreation(currentState.draggingStartSquare, square_1);
                }
                currentState.dragging = false;
                currentState.draggingStartSquare = null;
            }
            else if (square.highlightState !== GridSquare.FULL_HIGHLIGHT) {
                currentState.highlightSquare(square);
                currentState.dragging = true;
                currentState.draggingStartSquare = square;
            }
        }, true);
        /**
         * If dragging, highlight additional squares when the mouse moves.
         */
        this.canvas.addEventListener('mousemove', function (e) {
            if (currentState.dragging) {
                var /** @type {?} */ square = currentState.calculateSquare(e);
                currentState.highlightRange(currentState.draggingStartSquare, square);
            }
        }, true);
        /**
         * If a user double clicks on a range, emit an event so an action can be taken.
         */
        this.canvas.addEventListener('dblclick', function (e) {
            if (!currentState.dragging) {
                var /** @type {?} */ square = currentState.calculateSquare(e);
                if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
                    currentState.selectElement(e);
                }
            }
        }, true);
        /**
         * Clear the selection if the user is dragging but hits the escape key.
         */
        this.canvas.addEventListener('keydown', function (e) {
            if (e.keyCode === 27) {
                currentState.dragging = false;
                currentState.draggingStartSquare = null;
                currentState.clearUnnecessaryHighlights({
                    startColumn: 1,
                    startRow: 1,
                    endColumn: currentState.TOTAL_COLUMNS,
                    endRow: currentState.TOTAL_ROWS
                }, true);
            }
        }, true);
        this.initialized.emit(true);
    };
    /**
     * Initialize the two dimensional array of square objects that represents the grid.
     * @return {?}
     */
    WinGridComponent.prototype.initializeSquares = function () {
        for (var /** @type {?} */ col = 1; col <= this.TOTAL_COLUMNS; col++) {
            this.squares[col - 1] = [];
            for (var /** @type {?} */ row = 1; row <= this.TOTAL_ROWS; row++) {
                var /** @type {?} */ square = new GridSquare(col, row, this.SQUARE_SIZE);
                this.squares[col - 1].push(square);
            }
        }
    };
    /**
     * Calculate which square is being clicked.
     *
     * @param {?} e
     * @return {?}
     */
    WinGridComponent.prototype.calculateSquare = function (e) {
        var /** @type {?} */ mouse = this.getMouse(e);
        var /** @type {?} */ column = Math.ceil(mouse.x / this.SQUARE_SIZE);
        var /** @type {?} */ row = Math.ceil(mouse.y / this.SQUARE_SIZE);
        return this.squares[column - 1][row - 1];
    };
    /**
     * Highlight a single square square.
     *
     * @param {?} square
     * @return {?}
     */
    WinGridComponent.prototype.highlightSquare = function (square) {
        var /** @type {?} */ highlightColor = this.colorScheme.hoverColor;
        if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
            return;
        }
        if (square.highlightState === GridSquare.HOVER_HIGHLIGHT) {
            highlightColor = this.GRID_COLOR;
            square.highlightState = GridSquare.NO_HIGHLIGHT;
        }
        else {
            square.highlightState = GridSquare.HOVER_HIGHLIGHT;
        }
        this.fillSquare(square, highlightColor);
    };
    /**
     * Highlight an entire rectangular range of squares.
     *
     * @param {?} startSquare
     * @param {?} endSquare
     * @return {?}
     */
    WinGridComponent.prototype.highlightRange = function (startSquare, endSquare) {
        var /** @type {?} */ pts = this.determineEndPoints(startSquare, endSquare);
        this.clearUnnecessaryHighlights(pts, false);
        for (var /** @type {?} */ column = pts.startColumn; column <= pts.endColumn; column++) {
            for (var /** @type {?} */ row = pts.startRow; row <= pts.endRow; row++) {
                var /** @type {?} */ square = this.squares[column - 1][row - 1];
                if (square !== this.draggingStartSquare && square.highlightState !== GridSquare.HOVER_HIGHLIGHT) {
                    this.highlightSquare(square);
                }
            }
        }
    };
    /**
     * Create a new range on the grid.
     *
     * @param {?} startSquare
     * @param {?} endSquare
     * @return {?}
     */
    WinGridComponent.prototype.createGridRange = function (startSquare, endSquare) {
        var /** @type {?} */ pts = this.determineEndPoints(startSquare, endSquare);
        for (var /** @type {?} */ column = pts.startColumn; column <= pts.endColumn; column++) {
            for (var /** @type {?} */ row = pts.startRow; row <= pts.endRow; row++) {
                var /** @type {?} */ square_2 = this.squares[column - 1][row - 1];
                if (square_2.highlightState === GridSquare.FULL_HIGHLIGHT) {
                    this.dragging = false;
                    this.draggingStartSquare = null;
                    this.clearUnnecessaryHighlights(pts, true);
                    return;
                }
            }
        }
        var /** @type {?} */ square = this.squares[pts.startColumn - 1][pts.startRow - 1];
        var /** @type {?} */ x = square.x + this.LINE_SIZE;
        var /** @type {?} */ y = square.y + this.LINE_SIZE;
        var /** @type {?} */ w = ((pts.endColumn - pts.startColumn + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
        var /** @type {?} */ h = ((pts.endRow - pts.startRow + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
        this.ctx.fillStyle = this.colorScheme.highlightColor;
        this.ctx.fillRect(x, y, w, h);
        for (var /** @type {?} */ column = pts.startColumn; column <= pts.endColumn; column++) {
            for (var /** @type {?} */ row = pts.startRow; row <= pts.endRow; row++) {
                var /** @type {?} */ square_3 = this.squares[column - 1][row - 1];
                square_3.highlightState = GridSquare.FULL_HIGHLIGHT;
            }
        }
        return new GridRange(pts.startColumn, pts.startRow, pts.endColumn - pts.startColumn + 1, pts.endRow - pts.startRow + 1);
    };
    /**
     * Create a range and add it to the current element in creation.
     *
     * @param {?} startSquare
     * @param {?} endSquare
     * @return {?}
     */
    WinGridComponent.prototype.addRangeToElementInCreation = function (startSquare, endSquare) {
        var /** @type {?} */ range = this.createGridRange(startSquare, endSquare);
        this.elementInCreation.ranges.push(range);
    };
    /**
     * Render the current grid layout.
     * @param {?} layout
     * @return {?}
     */
    WinGridComponent.prototype.renderGridLayout = function (layout) {
        this.clearGrid();
        this.gridLayout = layout;
        for (var _i = 0, _a = this.gridLayout.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            this.insertGridElement(element);
        }
    };
    /**
     * Insert an element on the grid at page load.
     *
     * @param {?} element
     * @return {?}
     */
    WinGridComponent.prototype.insertGridElement = function (element) {
        for (var _i = 0, _a = element.ranges; _i < _a.length; _i++) {
            var range = _a[_i];
            this.insertGridRange(range, element.color, false);
        }
        this.removeBordersWithinElement(element);
    };
    /**
     * Insert a rectangular range on the grid at page load.
     *
     * @param {?} range
     * @param {?} color
     * @param {?} skipStateUpdate
     * @return {?}
     */
    WinGridComponent.prototype.insertGridRange = function (range, color, skipStateUpdate) {
        var /** @type {?} */ endColumn = range.columnsWide + range.startColumn - 1;
        var /** @type {?} */ endRow = range.columnsHigh + range.startRow - 1;
        var /** @type {?} */ square = this.squares[range.startColumn - 1][range.startRow - 1];
        var /** @type {?} */ x = square.x + this.LINE_SIZE;
        var /** @type {?} */ y = square.y + this.LINE_SIZE;
        var /** @type {?} */ w = ((endColumn - range.startColumn + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
        var /** @type {?} */ h = ((endRow - range.startRow + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
        if (skipStateUpdate) {
            return;
        }
        for (var /** @type {?} */ column = range.startColumn; column <= endColumn; column++) {
            for (var /** @type {?} */ row = range.startRow; row <= endRow; row++) {
                var /** @type {?} */ square_4 = this.squares[column - 1][row - 1];
                square_4.highlightState = GridSquare.FULL_HIGHLIGHT;
            }
        }
    };
    /**
     * Select a specific element and emit an event.
     *
     * @param {?} e
     * @return {?}
     */
    WinGridComponent.prototype.selectElement = function (e) {
        var /** @type {?} */ mouse = this.getMouse(e);
        var /** @type {?} */ column = Math.ceil(mouse.x / this.SQUARE_SIZE);
        var /** @type {?} */ row = Math.ceil(mouse.y / this.SQUARE_SIZE);
        for (var _i = 0, _a = this.gridLayout.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            for (var _b = 0, _c = element.ranges; _b < _c.length; _b++) {
                var range = _c[_b];
                var /** @type {?} */ endColumn = range.columnsWide + range.startColumn - 1;
                var /** @type {?} */ endRow = range.columnsHigh + range.startRow - 1;
                if (range.startColumn <= column && column <= endColumn && range.startRow <= row && row <= endRow) {
                    this.elementSelected.emit(element);
                    break;
                }
            }
        }
    };
    /**
     * Determine the end pts of the range.
     *
     * @param {?} startSquare
     * @param {?} endSquare
     * @return {?}
     */
    WinGridComponent.prototype.determineEndPoints = function (startSquare, endSquare) {
        var /** @type {?} */ startColumn = startSquare.column < endSquare.column ? startSquare.column : endSquare.column;
        var /** @type {?} */ startRow = startSquare.row < endSquare.row ? startSquare.row : endSquare.row;
        var /** @type {?} */ endColumn = startSquare.column < endSquare.column ? endSquare.column : startSquare.column;
        var /** @type {?} */ endRow = startSquare.row < endSquare.row ? endSquare.row : startSquare.row;
        return { startColumn: startColumn, startRow: startRow, endColumn: endColumn, endRow: endRow };
    };
    /**
     * Clear all the squares with an unnecessary hover highlight.
     *
     * @param {?} pts
     * @param {?} force
     * @return {?}
     */
    WinGridComponent.prototype.clearUnnecessaryHighlights = function (pts, force) {
        for (var /** @type {?} */ i = 1; i <= this.squares.length; i++) {
            for (var /** @type {?} */ j = 1; j <= this.squares[i - 1].length; j++) {
                if (!force && pts.startColumn <= i && i <= pts.endColumn && pts.startRow <= j && j <= pts.endRow) {
                    continue;
                }
                var /** @type {?} */ square = this.squares[i - 1][j - 1];
                if (square.highlightState === GridSquare.HOVER_HIGHLIGHT) {
                    this.highlightSquare(square);
                }
            }
        }
    };
    /**
     * Remove the border between all ranges in the same element.
     *
     * @param {?} element
     * @return {?}
     */
    WinGridComponent.prototype.removeBordersWithinElement = function (element) {
        if (element.ranges.length <= 1) {
            return;
        }
        for (var _i = 0, _a = element.ranges; _i < _a.length; _i++) {
            var range1 = _a[_i];
            for (var _b = 0, _c = element.ranges; _b < _c.length; _b++) {
                var range2 = _c[_b];
                if (range1 === range2) {
                    continue;
                }
                var /** @type {?} */ borderRange = this.determineBorderBetweenRanges(range1, range2);
                if (borderRange) {
                    this.insertGridRange(borderRange, element.color, false);
                }
            }
        }
    };
    /**
     * Determine the range of squares that border each other between two ranges.
     *
     * @param {?} range1
     * @param {?} range2
     * @return {?}
     */
    WinGridComponent.prototype.determineBorderBetweenRanges = function (range1, range2) {
        var /** @type {?} */ startColumn1 = range1.startColumn;
        var /** @type {?} */ startRow1 = range1.startRow;
        var /** @type {?} */ endColumn1 = range1.columnsWide + range1.startColumn - 1;
        var /** @type {?} */ endRow1 = range1.columnsHigh + range1.startRow - 1;
        var /** @type {?} */ startColumn2 = range2.startColumn;
        var /** @type {?} */ startRow2 = range2.startRow;
        var /** @type {?} */ endColumn2 = range2.columnsWide + range2.startColumn - 1;
        var /** @type {?} */ endRow2 = range2.columnsHigh + range2.startRow - 1;
        var /** @type {?} */ borderRange = new GridRange(-1, -1, -1, -1);
        if (startColumn1 === endColumn2 + 1) {
            borderRange.startColumn = endColumn2;
            borderRange.columnsWide = 2;
        }
        else if (startColumn2 === endColumn1 + 1) {
            borderRange.startColumn = endColumn1;
            borderRange.columnsWide = 2;
        }
        else if (startRow1 === endRow2 + 1) {
            borderRange.startRow = endRow2;
            borderRange.columnsHigh = 2;
        }
        else if (startRow2 === endRow1 + 1) {
            borderRange.startRow = endRow1;
            borderRange.columnsHigh = 2;
        }
        else {
            return null;
        }
        if (borderRange.startColumn === -1) {
            var /** @type {?} */ firstSharedColumn = startColumn1 >= startColumn2 ? startColumn1 : startColumn2;
            var /** @type {?} */ lastSharedColumn = endColumn1 <= endColumn2 ? endColumn1 : endColumn2;
            borderRange.startColumn = firstSharedColumn;
            borderRange.columnsWide = lastSharedColumn - firstSharedColumn + 1;
        }
        else if (borderRange.startRow === -1) {
            var /** @type {?} */ firstSharedRow = startRow1 >= startRow2 ? startRow1 : startRow2;
            var /** @type {?} */ lastSharedRow = endRow1 <= endRow2 ? endRow1 : endRow2;
            borderRange.startRow = firstSharedRow;
            borderRange.columnsHigh = lastSharedRow - firstSharedRow + 1;
        }
        return borderRange;
    };
    /**
     * Fill the square with a color.
     *
     * @param {?} square
     * @param {?} color
     * @return {?}
     */
    WinGridComponent.prototype.fillSquare = function (square, color) {
        var /** @type {?} */ x = square.x + this.LINE_SIZE;
        var /** @type {?} */ y = square.y + this.LINE_SIZE;
        var /** @type {?} */ size = square.size - this.LINE_SIZE * 2;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, size, size);
    };
    /**
     * Get the x, y coordinate location of the mouse.
     *
     * @param {?} e
     * @return {?}
     */
    WinGridComponent.prototype.getMouse = function (e) {
        var /** @type {?} */ element = this.canvas, /** @type {?} */ offsetX = 0, /** @type {?} */ offsetY = 0, /** @type {?} */ mouseX, /** @type {?} */ mouseY;
        if (element.offsetParent) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }
        offsetX += this.stylePaddingLeft + this.styleBorderLeft;
        offsetY += this.stylePaddingTop + this.styleBorderTop;
        mouseX = e.pageX - offsetX;
        mouseY = e.pageY - offsetY;
        return { x: mouseX, y: mouseY };
    };
    /**
     * Draw the grid.
     * @return {?}
     */
    WinGridComponent.prototype.drawGrid = function () {
        var /** @type {?} */ x = 0;
        var /** @type {?} */ y = 0;
        this.ctx.strokeStyle = this.LINE_COLOR;
        this.ctx.lineWidth = this.LINE_SIZE;
        while (y <= this.canvas.height) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
            y += this.SQUARE_SIZE;
        }
        y = 0;
        while (x <= this.canvas.width) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
            x += this.SQUARE_SIZE;
        }
    };
    /**
     * Clear the grid.
     * @return {?}
     */
    WinGridComponent.prototype.clearGrid = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        this.initializeSquares();
        this.dragging = false;
        this.draggingStartSquare = null;
    };
    /**
     * Switch the color on the element in creation.
     *
     * @param {?} color
     * @return {?}
     */
    WinGridComponent.prototype.switchElementColor = function (color) {
        if (this.elementInCreation) {
            this.elementInCreation.color = color;
            for (var _i = 0, _a = this.elementInCreation.ranges; _i < _a.length; _i++) {
                var range = _a[_i];
                this.insertGridRange(range, color, true);
            }
        }
    };
    /**
     * Start the creation of an element.
     *
     * @param {?} name
     * @param {?} type
     * @return {?}
     */
    WinGridComponent.prototype.startElementCreation = function (name, type) {
        this.creating = true;
        this.elementInCreation = new GridElement(name, type, this.colorScheme.highlightColor, []);
    };
    /**
     * Finish the creation of an element.
     * @return {?}
     */
    WinGridComponent.prototype.finishElementCreation = function () {
        this.creating = false;
        this.removeBordersWithinElement(this.elementInCreation);
        this.gridLayout.elements.push(this.elementInCreation);
        this.elementInCreation = null;
        this.layoutUpdated.emit(this.gridLayout);
    };
    return WinGridComponent;
}());
WinGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-grid',
                template: "<canvas tabindex=\"1\" id=\"grid-canvas\"></canvas>",
                styles: ["#grid-canvas { background: #FFFFFF; } #grid-canvas:focus { outline: none; } "]
            },] },
];
/**
 * @nocollapse
 */
WinGridComponent.ctorParameters = function () { return []; };
WinGridComponent.propDecorators = {
    'TOTAL_COLUMNS': [{ type: Input, args: ['columns',] },],
    'TOTAL_ROWS': [{ type: Input, args: ['rows',] },],
    'SQUARE_SIZE': [{ type: Input, args: ['squareSize',] },],
    'LINE_SIZE': [{ type: Input, args: ['lineSize',] },],
    'LINE_COLOR': [{ type: Input, args: ['lineColor',] },],
    'GRID_COLOR': [{ type: Input, args: ['gridColor',] },],
    'colorScheme': [{ type: Input, args: ['colorScheme',] },],
    'initialized': [{ type: Output },],
    'elementSelected': [{ type: Output },],
    'layoutUpdated': [{ type: Output },],
};

var WinAlertComponent = (function () {
    function WinAlertComponent() {
        this.isRendered = false;
        this.isVisible = false;
    }
    /**
     * @return {?}
     */
    WinAlertComponent.prototype.fadeOut = function () {
        var _this = this;
        this.isVisible = false;
        setTimeout(function () {
            _this.isRendered = false;
        }, 2000);
    };
    /**
     * @return {?}
     */
    WinAlertComponent.prototype.fadeIn = function () {
        var _this = this;
        this.isRendered = true;
        setTimeout(function () {
            _this.isVisible = true;
        }, 0);
        // success message will fade out after 5 seconds
        if (this.type === AlertType.SUCCESS) {
            setTimeout(function () {
                _this.fadeOut();
            }, 5000);
        }
    };
    /**
     * Close alert immediately. No fade out.
     * @return {?}
     */
    WinAlertComponent.prototype.close = function () {
        this.isRendered = false;
        this.isVisible = false;
    };
    /**
     * @return {?}
     */
    WinAlertComponent.prototype.getAlertClass = function () {
        switch (this.type) {
            case AlertType.SUCCESS:
                return 'win-success-alert';
            case AlertType.WARNING:
                return 'win-warning-alert';
            case AlertType.ERROR:
                return 'win-error-alert';
        }
    };
    /**
     * @return {?}
     */
    WinAlertComponent.prototype.getIconClass = function () {
        switch (this.type) {
            case AlertType.SUCCESS:
                return 'fa fa-check';
            case AlertType.WARNING:
                return 'fa fa-exclamation-triangle';
            case AlertType.ERROR:
                return 'fa fa-exclamation-triangle';
        }
    };
    return WinAlertComponent;
}());
WinAlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-alert',
                template: "<div *ngIf=\"isRendered\" [class]=\"getAlertClass()\" [class.fadeIn]=\"isVisible\" [class.fadeOut]=\"!isVisible\"> <span style=\"float: right\"><button class=\"win-close\" (click)=\"close()\">&times;</button></span> <i [class]=\"getIconClass()\" aria-hidden=\"true\"> <span>&nbsp;&nbsp;&nbsp;</span></i> {{message}} </div> ",
                styles: [".win-close { float: right; font-size: 21px; font-weight: bold; line-height: 1; color: inherit; opacity: 1; border: none; background: transparent; } .win-close:hover, .win-close:focus { color: inherit; text-decoration: none; cursor: pointer; opacity: .7; } "]
            },] },
];
/**
 * @nocollapse
 */
WinAlertComponent.ctorParameters = function () { return []; };
WinAlertComponent.propDecorators = {
    'message': [{ type: Input, args: ['message',] },],
    'type': [{ type: Input, args: ['type',] },],
};
var AlertType = {};
AlertType.SUCCESS = 0;
AlertType.WARNING = 1;
AlertType.ERROR = 2;
AlertType[AlertType.SUCCESS] = "SUCCESS";
AlertType[AlertType.WARNING] = "WARNING";
AlertType[AlertType.ERROR] = "ERROR";

var WinPaginationComponent = (function () {
    /**
     * @param {?} utilService
     */
    function WinPaginationComponent(utilService) {
        this.utilService = utilService;
        this.ROTATE = true;
        this.PAGE_SIZE_LIST = [10, 15, 30];
        this.id = '';
        this.showPageSize = false;
        this.winPageSizeChanged = new EventEmitter();
        this.winPageChanged = new EventEmitter();
        this.page = 1;
    }
    /**
     * Informs parent component about page size change
     * @param {?} count
     * @param {?=} event
     * @return {?}
     */
    WinPaginationComponent.prototype.changePageSize = function (count, event) {
        if (this.currentPageSize !== count) {
            this.winPageSizeChanged.emit(count);
            this.selectPage(1, event);
        }
    };
    /**
     * @return {?}
     */
    WinPaginationComponent.prototype.ngOnChanges = function () {
        this.currentPage = this.currentPage || 1;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : true;
        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : true;
        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : true;
        this.currentPageSize = typeof this.currentPageSize !== 'undefined' ? this.currentPageSize : 10;
        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : 3;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.selectPage(this.currentPage);
    };
    /**
     * @return {?}
     */
    WinPaginationComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    /**
     * @return {?}
     */
    WinPaginationComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    WinPaginationComponent.prototype.getText = function (key) {
        var /** @type {?} */ text = '';
        switch (key) {
            case 'first':
                text = '&laquo;';
                break;
            case 'next':
                text = '&rsaquo;';
                break;
            case 'previous':
                text = '&lsaquo;';
                break;
            case 'last':
                text = '&raquo';
                break;
        }
        return text;
    };
    /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    WinPaginationComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (event && event.target) {
            var /** @type {?} */ target = event.target;
            target.blur();
        }
        if (typeof page === 'string') {
            page = parseInt(page, 10);
        }
        if (page > this.totalPages) {
            page = this.totalPages;
        }
        if (page < 1) {
            page = 1;
        }
        this.writeValue(page);
        this.winPageChanged.emit(page);
        this.fieldWidth(page);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    WinPaginationComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    WinPaginationComponent.prototype.getPages = function (currentPage, totalPages) {
        var /** @type {?} */ pages = [];
        // Default page limits
        var /** @type {?} */ startPage = 2;
        var /** @type {?} */ endPage = totalPages;
        var /** @type {?} */ isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 2);
                endPage = startPage + this.maxSize;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages - 1);
            }
        }
        // Add page number links
        for (var /** @type {?} */ num = startPage; num <= endPage - 1; num++) {
            var /** @type {?} */ page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var /** @type {?} */ previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var /** @type {?} */ nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    WinPaginationComponent.prototype.makePage = function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    /**
     * Find total number of pages in pagination
     * @return {?}
     */
    WinPaginationComponent.prototype.calculateTotalPages = function () {
        var /** @type {?} */ totalPages = this.currentPageSize < 1 ? 1 : Math.ceil(this.totalItems / this.currentPageSize);
        return Math.max(totalPages || 0, 1);
    };
    /**
     * @param {?} page
     * @return {?}
     */
    WinPaginationComponent.prototype.showOnMobile = function (page) {
        if (this.utilService.isMobileDevice() || this.utilService.isIPad() || this.utilService.isIPhone()) {
            return (page.number === this.currentPage) || (this.currentPage === 1 && page.number === 2) || (this.currentPage === this.totalPages && page.number === this.totalPages - 1);
        }
        return true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WinPaginationComponent.prototype.validateValue = function (event) {
        var /** @type {?} */ value = parseInt(event.target.value + event.key, 10);
        if (value > this.totalPages || value < 1) {
            return false;
        }
        return true;
    };
    /**
     * @param {?=} page
     * @return {?}
     */
    WinPaginationComponent.prototype.fieldWidth = function (page) {
        if (page === void 0) { page = 0; }
        var /** @type {?} */ element;
        if (this.id) {
            element = (document.querySelector('#' + this.id + ' .current-page'));
        }
        if (typeof element === 'undefined' || element === null) {
            element = (document.querySelector('.current-page'));
        }
        var /** @type {?} */ length = element.value.length;
        if (page > 0) {
            length = String(page).length;
        }
        if (length > 1) {
            element.style.width = (9 * length) + 'px';
        }
        else {
            element.style.width = '10px';
        }
    };
    return WinPaginationComponent;
}());
WinPaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-pagination',
                template: "<nav [id]=\"id\"> <div class=\"count-goto-page\"> <div class=\"pull-left left page-size\" *ngIf=\"showPageSize\"> <span>Show: </span> <a class=\"count win-blue mx-1\" *ngFor=\"let pageSize of PAGE_SIZE_LIST\" (click)=\"changePageSize(pageSize, $event)\" [ngClass]=\"{'selected-count': pageSize === currentPageSize}\"> <label>{{pageSize}}</label> </a> </div> </div> <div class=\"pull-right pagination-links\"> <ul class=\"pagination\" [ngClass]=\"classMap\"> <li class=\"pagination-first page-item\" [class.disabled]=\"currentPage === 1\" *ngIf=\"boundaryLinks\"> <a class=\"page-link\" href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a> </li> <li class=\"pagination-prev page-item\" *ngIf=\"directionLinks\" [class.disabled]=\"noPrevious()\"> <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a> </li> <li class=\"page-details\"> <label for=\"currentPage\" class=\"current-page-label\"> <input type=\"number\" class=\"current-page\" #cp [ngModel]=\"currentPage\" (keydown)=\"validateValue($event)\" (keydown.enter)=\"selectPage(cp.value, $event)\" (focusout)=\"selectPage(cp.value, $event)\"(keyup)=\"fieldWidth()\" [attr.min]=\"1\" [min]=\"1\" [attr.max]=\"totalPages\" [max]=\"totalPages\" id=\"currentPage\"> <span class=\"out-of\">of {{totalPages}}</span> </label> </li> <li class=\"pagination-next page-item\" *ngIf=\"directionLinks\" [class.disabled]=\"noNext()\"> <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li> <li class=\"pagination-last page-item\" *ngIf=\"boundaryLinks\" [class.disabled]=\"currentPage === totalPages\"> <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li> </ul> </div> </nav> ",
                styles: [".pagination > li > a, .pagination > li > span { color: #0072cf; } .selected-count { color: rgba(0, 114, 207, 0.65) !important; } .count:hover { text-decoration: none !important; } .pagination-links { display: inline-block; width: 60%; } .pagination-links .pagination { float: right; } .page-size { width: 50%; display: inline-block; } .page-details { border-bottom: 1px solid #0072cf; height: 31px; margin: 0 5px; background-color: transparent !important; } .page-details:after { content: ''; display: block; height: 2px; width: 0px; background: transparent; transition: width .2s ease, background-color .2s ease; } .page-details:focus-within:after { width: 100%; background: #0072cf; } .page-details span { line-height: 2.3rem; } .current-page { font-weight: bold; text-align: center; width: 10px; border: none; outline: none; background-color: transparent; padding: 0; } .dark .current-page { color: #A8A9A6; } .current-page-label { margin-bottom: 0; } .current-page::-webkit-inner-spin-button, .current-page::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; } .out-of { font-style: italic; color: #999999 !important; } @media only screen and (min-device-width : 768px) and (max-device-width : 1024px), (max-width: 768px) { .page-size { width: 40%; } } .show-page { display: list-item; } "]
            },] },
];
/**
 * @nocollapse
 */
WinPaginationComponent.ctorParameters = function () { return [
    { type: UtilService, },
]; };
WinPaginationComponent.propDecorators = {
    'id': [{ type: Input, args: ['id',] },],
    'showPageSize': [{ type: Input, args: ['showPageSize',] },],
    'currentPageSize': [{ type: Input, args: ['pageSize',] },],
    'winPageSizeChanged': [{ type: Output, args: ['winPageSizeChanged',] },],
    'currentPage': [{ type: Input, args: ['currentPage',] },],
    'winPageChanged': [{ type: Output, args: ['winPageChanged',] },],
    'totalItems': [{ type: Input, args: ['totalItems',] },],
    'boundaryLinks': [{ type: Input },],
    'directionLinks': [{ type: Input },],
    'rotate': [{ type: Input },],
    'maxSize': [{ type: Input },],
};

var WinSorterComponent = (function () {
    /**
     * @param {?} mfTable
     */
    function WinSorterComponent(mfTable) {
        this.mfTable = mfTable;
        this.isSortedAsc = false;
        this.isSortedDesc = false;
    }
    /**
     * @return {?}
     */
    WinSorterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mfTable.onSortChange.subscribe(function (event) {
            _this.isSortedAsc = (event.sortBy === _this.sortBy && event.sortOrder === 'asc');
            _this.isSortedDesc = (event.sortBy === _this.sortBy && event.sortOrder === 'desc');
        });
        if (this.initial) {
            if (this.initial === 'asc') {
                this.mfTable.setSort(this.sortBy, 'asc');
            }
            else {
                this.mfTable.setSort(this.sortBy, 'desc');
            }
        }
    };
    /**
     * @return {?}
     */
    WinSorterComponent.prototype.sort = function () {
        if (this.isSortedAsc) {
            this.mfTable.setSort(this.sortBy, 'desc');
        }
        else {
            this.mfTable.setSort(this.sortBy, 'asc');
        }
    };
    return WinSorterComponent;
}());
WinSorterComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-sorter',
                template: "<div class=\"win-sorter-parent\"> <div class=\"win-sorter-text\"> <a class=\"hover-hand\" (click)=\"sort()\"> <ng-content></ng-content> </a> </div> <div class=\"win-sorter-icon\"> <i *ngIf=\"isSortedAsc\" class=\"fa fa-sort-asc hover-hand\" (click)=\"sort()\" aria-hidden=\"true\"></i> <i *ngIf=\"isSortedDesc\" class=\"fa fa-sort-desc hover-hand\" (click)=\"sort()\" aria-hidden=\"true\"></i> <i *ngIf=\"!isSortedAsc && !isSortedDesc\" class=\"fa fa-sort hover-hand\" (click)=\"sort()\" aria-hidden=\"true\"></i> </div> </div> ",
                styles: [".win-sorter-parent { display: table; width: 95%; } .win-sorter-text { display: table-cell; text-align: center; } .win-sorter-icon { display: table-cell; vertical-align: middle; color: #0072CF; } "]
            },] },
];
/**
 * @nocollapse
 */
WinSorterComponent.ctorParameters = function () { return [
    { type: DataTable, },
]; };
WinSorterComponent.propDecorators = {
    'sortBy': [{ type: Input, args: ['by',] },],
    'initial': [{ type: Input },],
};

var HelpDocComponent = (function () {
    function HelpDocComponent() {
    }
    return HelpDocComponent;
}());
HelpDocComponent.decorators = [
    { type: Component, args: [{
                selector: 'help-doc',
                template: "<a class=\"fa-question-circle fa help-icon\" *ngIf=\"url && url.length > 0\" [attr.href]=\"url\" target=\"_blank\"> </a>",
                styles: [" .help-icon { font-size: 18px; margin-left: 10px; } .help-icon:hover, .help-icon:focus { color: #0072CF; text-decoration: none; outline: none; } @media only screen and (min-width: 768px) { .help-icon { vertical-align: top; margin-top: 2px; } } @media only screen and (max-width: 767px), (max-device-width: 1024px) and (min-device-width: 768px) { .help-icon { vertical-align: unset; margin-top: 0; } }"]
            },] },
];
/**
 * @nocollapse
 */
HelpDocComponent.ctorParameters = function () { return []; };
HelpDocComponent.propDecorators = {
    'url': [{ type: Input, args: ['url',] },],
};

var UpperCaseDirective = (function () {
    /**
     * @param {?} elementRef
     */
    function UpperCaseDirective(elementRef) {
        this.elementRef = elementRef;
        this.ngModelChange = new EventEmitter();
        this.el = this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    UpperCaseDirective.prototype.ngOnInit = function () {
        this.el.value = this.el.value.toUpperCase();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UpperCaseDirective.prototype.onInputChange = function (event) {
        this.el.value = event.target.value.toUpperCase();
        this.ngModelChange.emit(this.el.value);
    };
    return UpperCaseDirective;
}());
UpperCaseDirective.decorators = [
    { type: Directive, args: [{ selector: '[uppercase]' },] },
];
/**
 * @nocollapse
 */
UpperCaseDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
UpperCaseDirective.propDecorators = {
    'ngModelChange': [{ type: Output },],
    'onInputChange': [{ type: HostListener, args: ['input', ['$event'],] },],
};

var TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(function () { return WinTypeaheadComponent; })
};
var WinTypeaheadComponent = (function () {
    function WinTypeaheadComponent() {
        var _this = this;
        this.minLength = 2; // Minimum number of character required to activate typeahead
        this.searchEvent = new EventEmitter(); // Event to be fired when user searches something
        this.enter = new EventEmitter(); // Event to be fired when user press enter key
        this.onChange = function () { };
        this.onTouched = function () { };
        this.writeValue = function (searchQuery) {
            _this.searchQuery = searchQuery;
        };
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    WinTypeaheadComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WinTypeaheadComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @return {?}
     */
    WinTypeaheadComponent.prototype.searchFn = function () {
        if (typeof this.searchQuery !== 'undefined' && this.searchQuery !== null) {
            if (typeof this.searchQuery === 'object') {
                this.searchEvent.emit(this.searchQuery[this.objectField].toUpperCase());
                this.onChangeEvent(this.searchQuery[this.objectField]);
            }
            else if (this.searchQuery.length >= this.minLength) {
                this.searchEvent.emit(this.searchQuery.toUpperCase());
                this.onChangeEvent(this.searchQuery);
            }
        }
    };
    /**
     * Fire event when enter or return key is pressed
     * @param {?} event
     * @return {?}
     */
    WinTypeaheadComponent.prototype.filterRequest = function (event) {
        var /** @type {?} */ query = '';
        if (typeof this.searchQuery === 'object') {
            query = this.searchQuery[this.objectField];
        }
        else {
            query = this.searchQuery;
        }
        if (event.key === 'Enter' || event.code === 'Enter') {
            this.enter.emit(query.toUpperCase());
        }
        this.onChangeEvent(query);
    };
    /**
     * @return {?}
     */
    WinTypeaheadComponent.prototype.changeModel = function () {
        this.onTouched();
        var /** @type {?} */ query = '';
        if (typeof this.searchQuery === 'object') {
            query = this.searchQuery[this.objectField];
        }
        else {
            query = this.searchQuery;
        }
        this.onChangeEvent(query);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    WinTypeaheadComponent.prototype.onChangeEvent = function (query) {
        if (query === null) {
            this.searchQuery = '';
            var /** @type {?} */ element = document.querySelector('#' + this.id + ' input');
            if (element) {
                ((element)).value = '';
            }
            this.onChange(null);
        }
        else if (typeof query === 'object') {
            this.onChange(query.toUpperCase());
        }
        else {
            this.onChange(query.toUpperCase());
        }
    };
    /**
     * @param {?} autocomplete
     * @return {?}
     */
    WinTypeaheadComponent.prototype.suggestionsOnFocus = function (autocomplete) {
        return Boolean(this.searchQuery && autocomplete.suggestions && this.searchQuery.length >= this.minLength);
    };
    return WinTypeaheadComponent;
}());
WinTypeaheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-typeahead',
                template: "<p-autoComplete #autocomplete id=\"id\" [(ngModel)]=\"searchQuery\" [field]=\"objectField\" [suggestions]=\"results\" [placeholder]=\"placeholder\" [minLength]=\"minLength\" (completeMethod)=\"searchFn()\" (onKeyUp)=\"filterRequest($event)\" (onFocus)=\"suggestionsOnFocus(autocomplete) && autocomplete.handleDropdownClick()\" (onSelect)=\"changeModel()\" [disabled]=\"disabled\"> <ng-template let-suggestion pTemplate=\"item\"> {{suggestion[objectField]}} {{secondField ? suggestion[secondField] : ''}} </ng-template> </p-autoComplete> ",
                styles: [".ui-state-highlight { background-color: #0072CF; } .ui-autocomplete-panel { z-index: 99999; } .ui-autocomplete-panel .ui-autocomplete-list-item { padding: 0.4rem; border-radius: 0; } .ui-autocomplete-panel .ui-autocomplete-list { padding: 0; } .ui-autocomplete { width: 100%; } .ui-autocomplete input { width: 100%; padding: 0.375rem 0.75rem; line-height: 1.5; color: #495057; background-clip: padding-box; border: 1px solid #ced4da; border-radius: 0.25rem; font-family: \"Open Sans\",Arial,Helvetica,sans-serif; text-transform: uppercase; } .dark .ui-autocomplete input { color: #A8A9A6; } .ui-autocomplete input::placeholder { text-transform: capitalize; } .ui-inputtext.ui-state-focus, .ui-inputtext:focus { border-color: #80bdff !important; box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); } .ui-autocomplete input[disabled] { background-color: #e9ecef; opacity: 1; cursor: not-allowed; } .dark .ui-autocomplete-items.ui-widget-content { background: #181818; } "],
                providers: [TYPEAHEAD_VALUE_ACCESSOR]
            },] },
];
/**
 * @nocollapse
 */
WinTypeaheadComponent.ctorParameters = function () { return []; };
WinTypeaheadComponent.propDecorators = {
    'results': [{ type: Input, args: ['results',] },],
    'placeholder': [{ type: Input, args: ['placeholder',] },],
    'minLength': [{ type: Input, args: ['minLength',] },],
    'objectField': [{ type: Input, args: ['field',] },],
    'id': [{ type: Input, args: ['id',] },],
    'disabled': [{ type: Input, args: ['disabled',] },],
    'searchEvent': [{ type: Output, args: ['search',] },],
    'enter': [{ type: Output, args: ['enter',] },],
    'secondField': [{ type: Input, args: ['secondField',] },],
};

var WinChipsComponent = (function () {
    function WinChipsComponent() {
        this.removeItem = new EventEmitter();
        this.limit = 3;
    }
    /**
     * Fires event to remove a particular chip
     * @param {?} name
     * @return {?}
     */
    WinChipsComponent.prototype.delete = function (name) {
        this.removeItem.emit(name);
        var /** @type {?} */ index = this.list.map(function (item) { return item.name; }).indexOf(name);
        this.list.splice(index, 1);
    };
    /**
     * To show all available chips
     * @return {?}
     */
    WinChipsComponent.prototype.showAllChips = function () {
        this.limit = this.list.length;
    };
    return WinChipsComponent;
}());
WinChipsComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-chips',
                template: "<div class=\"chips\"> <div class=\"chip\" *ngFor=\"let chip of list | slice: 0: limit; let i=index\"> <span>{{chip.label}}</span> <i class=\"fa fa-times red clickable\" (click)=\"delete(chip.name)\"></i> </div> <div class=\"chip clickable\" *ngIf=\"list.length > limit\" (click)=\"showAllChips()\"> <strong>See <span class=\"red\">{{list.length - 3}}</span> More <i class=\"fa fa-angle-double-right primary-dark-color\"></i></strong> </div> </div> ",
                styles: [".chips { position: absolute; top: 53px; right: 0; } .chips .chip { padding: 2px 5px; background-color: #FFFFFF; box-shadow: 0 0 1px; border-radius: 5px; display: inline; margin-right: 5px; font-size: 10px; } .chips .red { color: #CC0000; } .chips .clickable { cursor: pointer; } .chips .primary-color { color: #0072CF; } "]
            },] },
];
/**
 * @nocollapse
 */
WinChipsComponent.ctorParameters = function () { return []; };
WinChipsComponent.propDecorators = {
    'limit': [{ type: Input, args: ['limit',] },],
    'list': [{ type: Input, args: ['list',] },],
    'removeItem': [{ type: Output, args: ['removeItem',] },],
};

var WinSelectComponent = (function () {
    /**
     * @param {?} el
     */
    function WinSelectComponent(el) {
        this.el = el;
        this.onChange = new EventEmitter();
        this.active = false;
        this.propagateChange = function (_) { };
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    WinSelectComponent.prototype.writeValue = function (obj) {
        this.selectedItem = obj;
        this.setSelectedValue();
    };
    /**
     * @return {?}
     */
    WinSelectComponent.prototype.registerOnTouched = function () { };
    /**
     * @param {?} fn
     * @return {?}
     */
    WinSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @return {?}
     */
    WinSelectComponent.prototype.validate = function () {
        return this.selectedItem ? null : { required: true };
    };
    /**
     * @return {?}
     */
    WinSelectComponent.prototype.ngOnInit = function () {
        this.setSelectedValue();
    };
    /**
     * @return {?}
     */
    WinSelectComponent.prototype.setSelectedValue = function () {
        this.selectedValue = {};
        if (this.defaultOption) {
            if (typeof this.defaultOption === 'string') {
                this.selectedValue[this.valueKey] = '';
                this.selectedValue[this.labelKey] = this.defaultOption;
            }
            else {
                this.selectedValue[this.valueKey] = this.defaultOption[this.valueKey];
                this.selectedValue[this.labelKey] = this.defaultOption[this.labelKey];
            }
            this.defaultValue = this.selectedValue;
        }
        else {
            if (this.labelKey) {
                this.selectedValue[this.valueKey] = this.options[0][this.valueKey];
                this.selectedValue[this.labelKey] = this.options[0][this.labelKey];
            }
            else {
                this.selectedValue[this.valueKey] = this.options[0];
                this.selectedValue[this.labelKey] = this.options[0];
            }
        }
    };
    /**
     * @param {?} option
     * @return {?}
     */
    WinSelectComponent.prototype.changeValue = function (option) {
        if (this.valueKey) {
            this.propagateChange(option[this.valueKey]);
            this.onChange.emit(option[this.valueKey]);
        }
        else {
            this.propagateChange(option);
            this.onChange.emit(option);
        }
        this.selectedItem = option;
        this.selectedValue = option;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WinSelectComponent.prototype.closeDropdown = function (event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.active = false;
        }
    };
    return WinSelectComponent;
}());
WinSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'win-select',
                template: "<div class=\"win-dropdown\" tabindex=\"0\" (click)=\"!disabled && (active = !active)\" [ngClass]=\"{'active': active}\"> <div class=\"select\"> <span class=\"fa fa-caret-down\"></span> <input type=\"text\" name=\"searchTerm\" tabindex=\"-1\" class=\"form-control\" [ngClass]=\"{'disabled': disabled}\" readonly [disabled]=\"disabled\" [id]=\"id\" [value]=\"selectedValue[labelKey] || selectedValue\"> </div> <ul class=\"win-dropdown-menu\" [ngClass]=\"{'text-center': contentCenter}\"> <li (click)=\"changeValue(defaultValue)\" *ngIf=\"defaultValue && defaultValue[labelKey].length > 0\">{{defaultValue[labelKey]}}</li> <li *ngFor=\"let option of options\" (click)=\"changeValue(option)\"> <span>{{option[labelKey] || option}}</span> </li> </ul> </div> ",
                styles: [".win-dropdown { display: inline-block; position: relative; width: 100%; background-color: #FFFFFF; } .dark .win-dropdown { background-color: #181818; } .win-dropdown .win-dropdown-menu { display: none; position: absolute; top: 99%; left: 0; right: 0; list-style: none; overflow: auto; z-index: 9999; max-height: 150px; } .win-dropdown .win-dropdown-menu li { padding: 0.4rem; cursor: pointer; } .win-dropdown .win-dropdown-menu li:hover { background-color: #0072CF; } .light .win-dropdown .win-dropdown-menu li:hover { color: #FFFFFF; } .win-dropdown.active .win-dropdown-menu { display: block; border: 1px solid #cccccc; background-color: #FFFFFF; } .dark .win-dropdown.active .win-dropdown-menu { background-color: #181818; } .win-dropdown input[readonly]:not(:disabled) { background-color: inherit; } /* Caret sign */ .win-dropdown .select span { position: absolute; right: 5px; top: 50%; transform: translateY(-50%); color: #A8A9A6; } .win-dropdown.active .select span { transform: translateY(-50%) rotate(180deg); } "],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return WinSelectComponent; }),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(function () { return WinSelectComponent; }),
                        multi: true,
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
WinSelectComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
WinSelectComponent.propDecorators = {
    'options': [{ type: Input },],
    'labelKey': [{ type: Input },],
    'valueKey': [{ type: Input },],
    'disabled': [{ type: Input },],
    'id': [{ type: Input },],
    'contentCenter': [{ type: Input },],
    'defaultOption': [{ type: Input },],
    'searchInput': [{ type: ViewChild, args: ['searchInput',] },],
    'onChange': [{ type: Output },],
    'closeDropdown': [{ type: HostListener, args: ['document:click', ['$event'],] },],
};

var Address = (function () {
    /**
     * @param {?=} id
     * @param {?=} street1
     * @param {?=} street2
     * @param {?=} street3
     * @param {?=} city
     * @param {?=} state
     * @param {?=} zip
     */
    function Address(id, street1, street2, street3, city, state, zip) {
        this.id = id;
        this.street1 = street1;
        this.street2 = street2;
        this.street3 = street3;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
    return Address;
}());

var AltPartNumber = (function () {
    /**
     * @param {?} itemNumber
     * @param {?} altPartNumbers
     */
    function AltPartNumber(itemNumber, altPartNumbers) {
        this.itemNumber = itemNumber;
        this.altPartNumbers = altPartNumbers;
    }
    return AltPartNumber;
}());

var Bin = (function () {
    /**
     * @param {?=} binLabel
     * @param {?=} binCondition
     * @param {?=} isAvailable
     */
    function Bin(binLabel, binCondition, isAvailable) {
        this.binLabel = binLabel;
        this.binCondition = binCondition;
        this.isAvailable = isAvailable;
    }
    return Bin;
}());

var BinCombination = (function () {
    /**
     * @param {?=} binLocation
     * @param {?=} binItemCombinationList
     */
    function BinCombination(binLocation, binItemCombinationList) {
        this.binLocation = binLocation;
        this.binItemCombinationList = binItemCombinationList;
    }
    return BinCombination;
}());

var BinCondition = (function () {
    /**
     * @param {?=} binConditionId
     * @param {?=} binConditionCode
     * @param {?=} binConditionDescription
     */
    function BinCondition(binConditionId, binConditionCode, binConditionDescription) {
        this.binConditionId = binConditionId;
        this.binConditionCode = binConditionCode;
        this.binConditionDescription = binConditionDescription;
    }
    return BinCondition;
}());

var BinItemCombination = (function () {
    /**
     * @param {?=} item
     * @param {?=} binItemInfo
     */
    function BinItemCombination(item, binItemInfo) {
        this.item = item;
        this.binItemInfo = binItemInfo;
    }
    return BinItemCombination;
}());

var BinItemInfo = (function () {
    /**
     * @param {?=} binItemId
     * @param {?=} binId
     * @param {?=} binLocation
     * @param {?=} itemId
     * @param {?=} itemNumber
     * @param {?=} binItemMin
     * @param {?=} binItemMax
     * @param {?=} binQtyOnHand
     * @param {?=} binQtyAvailable
     * @param {?=} binTypeId
     * @param {?=} binTypeCode
     * @param {?=} binTypeDescription
     */
    function BinItemInfo(binItemId, binId, binLocation, itemId, itemNumber, binItemMin, binItemMax, binQtyOnHand, binQtyAvailable, binTypeId, binTypeCode, binTypeDescription) {
        this.binItemId = binItemId;
        this.binId = binId;
        this.binLocation = binLocation;
        this.itemId = itemId;
        this.itemNumber = itemNumber;
        this.binItemMin = binItemMin;
        this.binItemMax = binItemMax;
        this.binQtyOnHand = binQtyOnHand;
        this.binQtyAvailable = binQtyAvailable;
        this.binTypeId = binTypeId;
        this.binTypeCode = binTypeCode;
        this.binTypeDescription = binTypeDescription;
    }
    return BinItemInfo;
}());

var BinItemLocation = (function () {
    /**
     * @param {?=} zoneId
     * @param {?=} zoneAbbreviation
     * @param {?=} zoneName
     * @param {?=} binId
     * @param {?=} binLocation
     * @param {?=} sellable
     * @param {?=} tote
     * @param {?=} productConditionId
     * @param {?=} productConditionDescription
     * @param {?=} binItemId
     * @param {?=} itemNumber
     * @param {?=} binItemMin
     * @param {?=} binItemMax
     * @param {?=} binQtyOnHand
     * @param {?=} binTypeId
     * @param {?=} binTypeDescription
     * @param {?=} itemDescription1
     * @param {?=} itemDescription2
     * @param {?=} manufacturerCode
     * @param {?=} manufacturerDescription
     * @param {?=} productCode
     * @param {?=} productDescription
     * @param {?=} vendorCode
     * @param {?=} vendorDescription
     * @param {?=} onHandItemBalance
     * @param {?=} iov
     * @param {?=} numberOfItems
     * @param {?=} onHandBinTotal
     * @param {?=} numberOfBins
     */
    function BinItemLocation(zoneId, zoneAbbreviation, zoneName, binId, binLocation, sellable, tote, productConditionId, productConditionDescription, binItemId, itemNumber, binItemMin, binItemMax, binQtyOnHand, binTypeId, binTypeDescription, itemDescription1, itemDescription2, manufacturerCode, manufacturerDescription, productCode, productDescription, vendorCode, vendorDescription, onHandItemBalance, iov, numberOfItems, onHandBinTotal, numberOfBins) {
        this.zoneId = zoneId;
        this.zoneAbbreviation = zoneAbbreviation;
        this.zoneName = zoneName;
        this.binId = binId;
        this.binLocation = binLocation;
        this.sellable = sellable;
        this.tote = tote;
        this.productConditionId = productConditionId;
        this.productConditionDescription = productConditionDescription;
        this.binItemId = binItemId;
        this.itemNumber = itemNumber;
        this.binItemMin = binItemMin;
        this.binItemMax = binItemMax;
        this.binQtyOnHand = binQtyOnHand;
        this.binTypeId = binTypeId;
        this.binTypeDescription = binTypeDescription;
        this.itemDescription1 = itemDescription1;
        this.itemDescription2 = itemDescription2;
        this.manufacturerCode = manufacturerCode;
        this.manufacturerDescription = manufacturerDescription;
        this.productCode = productCode;
        this.productDescription = productDescription;
        this.vendorCode = vendorCode;
        this.vendorDescription = vendorDescription;
        this.onHandItemBalance = onHandItemBalance;
        this.iov = iov;
        this.numberOfItems = numberOfItems;
        this.onHandBinTotal = onHandBinTotal;
        this.numberOfBins = numberOfBins;
    }
    return BinItemLocation;
}());

var BinLocation = (function () {
    /**
     * @param {?=} binId
     * @param {?=} binLocation
     * @param {?=} includeQtyInAvail
     * @param {?=} tote
     * @param {?=} pickFrom
     * @param {?=} stagingArea
     * @param {?=} receiveInto
     * @param {?=} replenishFrom
     * @param {?=} replenishInto
     * @param {?=} specialHandling
     * @param {?=} sellable
     * @param {?=} numberOfItems
     * @param {?=} totalOnHandQty
     * @param {?=} totalAvailableQty
     * @param {?=} zoneId
     * @param {?=} zoneName
     * @param {?=} zoneAbbreviation
     * @param {?=} binConditionId
     * @param {?=} binConditionCode
     * @param {?=} binConditionDescription
     * @param {?=} pickingId
     * @param {?=} pickingCode
     * @param {?=} pickingDescription
     * @param {?=} pickViaSource
     * @param {?=} receivingId
     * @param {?=} receivingCode
     * @param {?=} receivingDescription
     * @param {?=} receiveViaSource
     */
    function BinLocation(binId, binLocation, includeQtyInAvail, tote, pickFrom, stagingArea, receiveInto, replenishFrom, replenishInto, specialHandling, sellable, numberOfItems, totalOnHandQty, totalAvailableQty, zoneId, zoneName, zoneAbbreviation, binConditionId, binConditionCode, binConditionDescription, pickingId, pickingCode, pickingDescription, pickViaSource, receivingId, receivingCode, receivingDescription, receiveViaSource) {
        this.binId = binId;
        this.binLocation = binLocation;
        this.includeQtyInAvail = includeQtyInAvail;
        this.tote = tote;
        this.pickFrom = pickFrom;
        this.stagingArea = stagingArea;
        this.receiveInto = receiveInto;
        this.replenishFrom = replenishFrom;
        this.replenishInto = replenishInto;
        this.specialHandling = specialHandling;
        this.sellable = sellable;
        this.numberOfItems = numberOfItems;
        this.totalOnHandQty = totalOnHandQty;
        this.totalAvailableQty = totalAvailableQty;
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.zoneAbbreviation = zoneAbbreviation;
        this.binConditionId = binConditionId;
        this.binConditionCode = binConditionCode;
        this.binConditionDescription = binConditionDescription;
        this.pickingId = pickingId;
        this.pickingCode = pickingCode;
        this.pickingDescription = pickingDescription;
        this.pickViaSource = pickViaSource;
        this.receivingId = receivingId;
        this.receivingCode = receivingCode;
        this.receivingDescription = receivingDescription;
        this.receiveViaSource = receiveViaSource;
    }
    return BinLocation;
}());

var BinItemDetails = (function () {
    /**
     * @param {?=} binCount
     * @param {?=} binItemCount
     * @param {?=} binCombinationList
     */
    function BinItemDetails(binCount, binItemCount, binCombinationList) {
        this.binCount = binCount;
        this.binItemCount = binItemCount;
        this.binCombinationList = binCombinationList;
    }
    return BinItemDetails;
}());

var BinType = (function () {
    /**
     * @param {?=} binTypeId
     * @param {?=} binTypeCode
     * @param {?=} binTypeDescription
     */
    function BinType(binTypeId, binTypeCode, binTypeDescription) {
        this.binTypeId = binTypeId;
        this.binTypeCode = binTypeCode;
        this.binTypeDescription = binTypeDescription;
    }
    return BinType;
}());

var BinlocationAndItemCreate = (function () {
    /**
     * @param {?=} itemNumber
     * @param {?=} binLocation
     */
    function BinlocationAndItemCreate(itemNumber, binLocation) {
        this.itemNumber = itemNumber;
        this.binLocation = binLocation;
    }
    return BinlocationAndItemCreate;
}());

var BinLocationFieldSync = (function () {
    /**
     * @param {?=} binIds
     * @param {?=} includeQtyInAvail
     * @param {?=} binConditionId
     * @param {?=} binConditionCode
     * @param {?=} zoneId
     * @param {?=} zoneName
     * @param {?=} pickingId
     * @param {?=} receivingId
     * @param {?=} receiveInto
     * @param {?=} replenishFrom
     * @param {?=} replenishInto
     * @param {?=} pickFrom
     * @param {?=} stagingArea
     * @param {?=} sellable
     * @param {?=} tote
     * @param {?=} specialHandling
     */
    function BinLocationFieldSync(binIds, includeQtyInAvail, binConditionId, binConditionCode, zoneId, zoneName, pickingId, receivingId, receiveInto, replenishFrom, replenishInto, pickFrom, stagingArea, sellable, tote, specialHandling) {
        this.binIds = binIds;
        this.includeQtyInAvail = includeQtyInAvail;
        this.binConditionId = binConditionId;
        this.binConditionCode = binConditionCode;
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.pickingId = pickingId;
        this.receivingId = receivingId;
        this.receiveInto = receiveInto;
        this.replenishFrom = replenishFrom;
        this.replenishInto = replenishInto;
        this.pickFrom = pickFrom;
        this.stagingArea = stagingArea;
        this.sellable = sellable;
        this.tote = tote;
        this.specialHandling = specialHandling;
    }
    return BinLocationFieldSync;
}());

var DeliverableOrder = (function () {
    /**
     * @param {?} id
     * @param {?} stopId
     * @param {?} companyNumber
     * @param {?} orderNumber
     * @param {?} customersPO
     * @param {?} notes
     * @param {?} shippingInstructions
     * @param {?} paymentMethod
     * @param {?} jobName
     * @param {?} soldToCustomerNumber
     * @param {?} shipToCustomerNumber
     * @param {?} requestedDate
     * @param {?} orderedDate
     * @param {?} deliveryAddress
     * @param {?} soldToAddress
     * @param {?} items
     * @param {?} status
     * @param {?} shipmentId
     * @param {?} balanceDue
     * @param {?} orderedBy
     * @param {?} countOfSerials
     * @param {?=} lockedIn
     * @param {?=} isCollapsed
     * @param {?=} photos
     * @param {?=} customerName
     * @param {?=} signature
     * @param {?=} adjustedBalanceDue
     */
    function DeliverableOrder(id, stopId, companyNumber, orderNumber, customersPO, notes, shippingInstructions, paymentMethod, jobName, soldToCustomerNumber, shipToCustomerNumber, requestedDate, orderedDate, deliveryAddress, soldToAddress, items, status, shipmentId, balanceDue, orderedBy, countOfSerials, lockedIn, isCollapsed, photos, customerName, signature, adjustedBalanceDue) {
        this.id = id;
        this.stopId = stopId;
        this.companyNumber = companyNumber;
        this.orderNumber = orderNumber;
        this.customersPO = customersPO;
        this.notes = notes;
        this.shippingInstructions = shippingInstructions;
        this.paymentMethod = paymentMethod;
        this.jobName = jobName;
        this.soldToCustomerNumber = soldToCustomerNumber;
        this.shipToCustomerNumber = shipToCustomerNumber;
        this.requestedDate = requestedDate;
        this.orderedDate = orderedDate;
        this.deliveryAddress = deliveryAddress;
        this.soldToAddress = soldToAddress;
        this.items = items;
        this.status = status;
        this.shipmentId = shipmentId;
        this.balanceDue = balanceDue;
        this.orderedBy = orderedBy;
        this.countOfSerials = countOfSerials;
        this.lockedIn = lockedIn;
        this.isCollapsed = isCollapsed;
        this.photos = photos;
        this.customerName = customerName;
        this.signature = signature;
        this.adjustedBalanceDue = adjustedBalanceDue;
    }
    return DeliverableOrder;
}());

var DeliverableOrderItem = (function () {
    /**
     * @param {?=} id
     * @param {?=} orderId
     * @param {?=} shipmentLineId
     * @param {?=} itemNumber
     * @param {?=} modelNumber
     * @param {?=} description1
     * @param {?=} description2
     * @param {?=} unitOfMeasure
     * @param {?=} quantityOrdered
     * @param {?=} quantityShipped
     * @param {?=} quantityBackOrdered
     * @param {?=} unitPrice
     * @param {?=} extendedPrice
     * @param {?=} serialized
     * @param {?=} adjustedQuantity
     * @param {?=} quantityAdjustNote
     * @param {?=} serialNumbers
     * @param {?=} tempAdjustedQuantity
     * @param {?=} tempAdjustedReason
     * @param {?=} tempAdjustedNote
     */
    function DeliverableOrderItem(id, orderId, shipmentLineId, itemNumber, modelNumber, description1, description2, unitOfMeasure, quantityOrdered, quantityShipped, quantityBackOrdered, unitPrice, extendedPrice, serialized, adjustedQuantity, quantityAdjustNote, serialNumbers, tempAdjustedQuantity, tempAdjustedReason, tempAdjustedNote) {
        this.id = id;
        this.orderId = orderId;
        this.shipmentLineId = shipmentLineId;
        this.itemNumber = itemNumber;
        this.modelNumber = modelNumber;
        this.description1 = description1;
        this.description2 = description2;
        this.unitOfMeasure = unitOfMeasure;
        this.quantityOrdered = quantityOrdered;
        this.quantityShipped = quantityShipped;
        this.quantityBackOrdered = quantityBackOrdered;
        this.unitPrice = unitPrice;
        this.extendedPrice = extendedPrice;
        this.serialized = serialized;
        this.adjustedQuantity = adjustedQuantity;
        this.quantityAdjustNote = quantityAdjustNote;
        this.serialNumbers = serialNumbers;
        this.tempAdjustedQuantity = tempAdjustedQuantity;
        this.tempAdjustedReason = tempAdjustedReason;
        this.tempAdjustedNote = tempAdjustedNote;
    }
    return DeliverableOrderItem;
}());

var DeliverableOrderPhoto = (function () {
    /**
     * @param {?=} id
     * @param {?=} stopRelId
     * @param {?=} orderNumber
     * @param {?=} photoRefString
     * @param {?=} base64Image
     */
    function DeliverableOrderPhoto(id, stopRelId, orderNumber, photoRefString, base64Image) {
        this.id = id;
        this.stopRelId = stopRelId;
        this.orderNumber = orderNumber;
        this.photoRefString = photoRefString;
        this.base64Image = base64Image;
    }
    return DeliverableOrderPhoto;
}());

var DeliverableOrderStatus = (function () {
    /**
     * @param {?=} id
     * @param {?=} orderStatusCode
     * @param {?=} orderStatusDescription
     */
    function DeliverableOrderStatus(id, orderStatusCode, orderStatusDescription) {
        this.id = id;
        this.orderStatusCode = orderStatusCode;
        this.orderStatusDescription = orderStatusDescription;
    }
    return DeliverableOrderStatus;
}());
// order status codes
DeliverableOrderStatus.MANIFESTED = 'Manifested';
DeliverableOrderStatus.OFD = 'OFD';
DeliverableOrderStatus.OND = 'OND';
DeliverableOrderStatus.DWC = 'DWC';
DeliverableOrderStatus.DEL = 'DEL';
// order status descriptions
DeliverableOrderStatus.MANIFESTED_DESC = 'Ready for Delivery';
DeliverableOrderStatus.OFD_DESC = 'Out for Delivery';
DeliverableOrderStatus.OND_DESC = 'Not Delivered';
DeliverableOrderStatus.DWC_DESC = 'QTY Adjusted';
DeliverableOrderStatus.DEL_DESC = 'Delivered';

var Driver = (function () {
    /**
     * @param {?=} id
     * @param {?=} firstname
     * @param {?=} lastname
     * @param {?=} alias
     * @param {?=} driversLicenseNumber
     * @param {?=} primarySecYesNo
     * @param {?=} activeYesNo
     * @param {?=} driverAdjustYesNo
     * @param {?=} cdlYesNo
     * @param {?=} cdlExpiration
     * @param {?=} employeeYesNo
     * @param {?=} chgTimeStamp
     * @param {?=} username
     */
    function Driver(id, firstname, lastname, alias, driversLicenseNumber, primarySecYesNo, activeYesNo, driverAdjustYesNo, cdlYesNo, cdlExpiration, employeeYesNo, chgTimeStamp, username) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.alias = alias;
        this.driversLicenseNumber = driversLicenseNumber;
        this.primarySecYesNo = primarySecYesNo;
        this.activeYesNo = activeYesNo;
        this.driverAdjustYesNo = driverAdjustYesNo;
        this.cdlYesNo = cdlYesNo;
        this.cdlExpiration = cdlExpiration;
        this.employeeYesNo = employeeYesNo;
        this.chgTimeStamp = chgTimeStamp;
        this.username = username;
    }
    /**
     * @return {?}
     */
    Driver.prototype.clone = function () {
        return new Driver(this.id, this.firstname, this.lastname, this.alias, this.driversLicenseNumber, this.primarySecYesNo, this.activeYesNo, this.driverAdjustYesNo, this.cdlYesNo, this.cdlExpiration, this.employeeYesNo, this.chgTimeStamp);
    };
    return Driver;
}());

var Item = (function () {
    /**
     * @param {?=} itemID
     * @param {?=} itemNumber
     * @param {?=} itemDescription1
     * @param {?=} itemDescription2
     * @param {?=} iovFlag
     * @param {?=} manufacturerCode
     * @param {?=} manufacturerCodeDescription
     * @param {?=} productCode
     * @param {?=} productCodeDescription
     * @param {?=} vendorCode
     * @param {?=} vendorCodeDescription
     * @param {?=} numberOfBins
     * @param {?=} totalOnHandQty
     * @param {?=} totalAvailableQty
     * @param {?=} purchasingUnitOfMeasure
     * @param {?=} sellingUnitOfMeasure
     */
    function Item(itemID, itemNumber, itemDescription1, itemDescription2, iovFlag, manufacturerCode, manufacturerCodeDescription, productCode, productCodeDescription, vendorCode, vendorCodeDescription, numberOfBins, totalOnHandQty, totalAvailableQty, purchasingUnitOfMeasure, sellingUnitOfMeasure) {
        this.itemID = itemID;
        this.itemNumber = itemNumber;
        this.itemDescription1 = itemDescription1;
        this.itemDescription2 = itemDescription2;
        this.iovFlag = iovFlag;
        this.manufacturerCode = manufacturerCode;
        this.manufacturerCodeDescription = manufacturerCodeDescription;
        this.productCode = productCode;
        this.productCodeDescription = productCodeDescription;
        this.vendorCode = vendorCode;
        this.vendorCodeDescription = vendorCodeDescription;
        this.numberOfBins = numberOfBins;
        this.totalOnHandQty = totalOnHandQty;
        this.totalAvailableQty = totalAvailableQty;
        this.purchasingUnitOfMeasure = purchasingUnitOfMeasure;
        this.sellingUnitOfMeasure = sellingUnitOfMeasure;
    }
    return Item;
}());

var ItemBinCombination = (function () {
    /**
     * @param {?=} binLocation
     * @param {?=} binItemInfo
     */
    function ItemBinCombination(binLocation, binItemInfo) {
        this.binLocation = binLocation;
        this.binItemInfo = binItemInfo;
    }
    return ItemBinCombination;
}());

var ItemCombination = (function () {
    /**
     * @param {?=} item
     * @param {?=} itemBinCombinationList
     */
    function ItemCombination(item, itemBinCombinationList) {
        this.item = item;
        this.itemBinCombinationList = itemBinCombinationList;
    }
    return ItemCombination;
}());

var ItemBinDetails = (function () {
    /**
     * @param {?=} itemCount
     * @param {?=} itemBinCount
     * @param {?=} itemCombinationList
     */
    function ItemBinDetails(itemCount, itemBinCount, itemCombinationList) {
        this.itemCount = itemCount;
        this.itemBinCount = itemBinCount;
        this.itemCombinationList = itemCombinationList;
    }
    return ItemBinDetails;
}());

var GridColorScheme = (function () {
    /**
     * @param {?} highlightColor
     * @param {?} hoverColor
     */
    function GridColorScheme(highlightColor, hoverColor) {
        this.highlightColor = highlightColor;
        this.hoverColor = hoverColor;
    }
    return GridColorScheme;
}());

var GridLayout = (function () {
    /**
     * @param {?} name
     * @param {?=} elements
     */
    function GridLayout(name, elements) {
        this.name = name;
        this.elements = elements;
        if (!this.elements) {
            this.elements = [];
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    GridLayout.prototype.addElement = function (element) {
        this.elements.push(element);
    };
    return GridLayout;
}());

var Manifest = (function () {
    /**
     * @param {?=} id
     * @param {?=} manifestNumber
     * @param {?=} companyNumber
     * @param {?=} deliveryDate
     * @param {?=} deliveryTime
     * @param {?=} manifestCreator
     * @param {?=} manifestDate
     * @param {?=} driver
     * @param {?=} truck
     * @param {?=} manifestStatus
     * @param {?=} stops
     * @param {?=} numberOfOrders
     * @param {?=} stopCount
     * @param {?=} showExclamation
     * @param {?=} deliveryStartTime
     * @param {?=} chgTimeStamp
     */
    function Manifest(id, manifestNumber, companyNumber, deliveryDate, deliveryTime, manifestCreator, manifestDate, driver, truck, manifestStatus, stops, numberOfOrders, stopCount, showExclamation, deliveryStartTime, chgTimeStamp) {
        this.id = id;
        this.manifestNumber = manifestNumber;
        this.companyNumber = companyNumber;
        this.deliveryDate = deliveryDate;
        this.deliveryTime = deliveryTime;
        this.manifestCreator = manifestCreator;
        this.manifestDate = manifestDate;
        this.driver = driver;
        this.truck = truck;
        this.manifestStatus = manifestStatus;
        this.stops = stops;
        this.numberOfOrders = numberOfOrders;
        this.stopCount = stopCount;
        this.showExclamation = showExclamation;
        this.deliveryStartTime = deliveryStartTime;
        this.chgTimeStamp = chgTimeStamp;
    }
    return Manifest;
}());

var ManifestStatus = (function () {
    /**
     * @param {?=} id
     * @param {?=} manifestStatusCode
     * @param {?=} manifestStatusDescription
     */
    function ManifestStatus(id, manifestStatusCode, manifestStatusDescription) {
        this.id = id;
        this.manifestStatusCode = manifestStatusCode;
        this.manifestStatusDescription = manifestStatusDescription;
    }
    return ManifestStatus;
}());
// manifest status codes
ManifestStatus.CREATED = 'CREATED';
ManifestStatus.GENERATED = 'GENERATED';
ManifestStatus.IN_PROCESS = 'IN PROCESS';
ManifestStatus.DELIVERED = 'DELIVERED';
ManifestStatus.NOT_DELIVERED = 'NOT DELIVERED';
ManifestStatus.CLOSED = 'CLOSED';
// manifest status descriptions
ManifestStatus.CREATED_DESC = 'Ready for Delivery';
ManifestStatus.GENERATED_DESC = 'Ready for Delivery';
ManifestStatus.IN_PROCESS_DESC = 'In Process';
ManifestStatus.DELIVERED_DESC = 'Delivered';
ManifestStatus.NOT_DELIVERED_DESC = 'Not Delivered';
ManifestStatus.CLOSED_DESC = 'Closed';

var NotDeliveredOrder = (function () {
    /**
     * @param {?} shipmentId
     * @param {?} orderId
     * @param {?} manifestId
     * @param {?} stopId
     * @param {?} orderNumber
     * @param {?} manifestNumber
     * @param {?} notDeliveredDate
     * @param {?} customerPO
     * @param {?} shipToAddress
     * @param {?} driver
     */
    function NotDeliveredOrder(shipmentId, orderId, manifestId, stopId, orderNumber, manifestNumber, notDeliveredDate, customerPO, shipToAddress, driver) {
        this.shipmentId = shipmentId;
        this.orderId = orderId;
        this.manifestId = manifestId;
        this.stopId = stopId;
        this.orderNumber = orderNumber;
        this.manifestNumber = manifestNumber;
        this.notDeliveredDate = notDeliveredDate;
        this.customerPO = customerPO;
        this.shipToAddress = shipToAddress;
        this.driver = driver;
    }
    return NotDeliveredOrder;
}());

var PickVia = (function () {
    /**
     * @param {?=} pickingId
     * @param {?=} pickingCode
     * @param {?=} pickingDescription
     */
    function PickVia(pickingId, pickingCode, pickingDescription) {
        this.pickingId = pickingId;
        this.pickingCode = pickingCode;
        this.pickingDescription = pickingDescription;
    }
    return PickVia;
}());

var PurchaseOrder = (function () {
    /**
     * @param {?} poNumber
     * @param {?} vendorNumber
     * @param {?} vendorName
     * @param {?} dateOrdered
     * @param {?} dateRequested
     * @param {?} items
     */
    function PurchaseOrder(poNumber, vendorNumber, vendorName, dateOrdered, dateRequested, items) {
        this.poNumber = poNumber;
        this.vendorNumber = vendorNumber;
        this.vendorName = vendorName;
        this.dateOrdered = dateOrdered;
        this.dateRequested = dateRequested;
        this.items = items;
    }
    return PurchaseOrder;
}());

var PurchaseOrderItem = (function () {
    /**
     * @param {?} poNumber
     * @param {?} itemNumber
     * @param {?} itemDescription1
     * @param {?} itemDescription2
     * @param {?} unitOfMeasure
     * @param {?} freightChargesCode
     * @param {?} itemWeight
     * @param {?} openQuantity
     * @param {?} lineNumber
     * @param {?} remainingQuantity
     */
    function PurchaseOrderItem(poNumber, itemNumber, itemDescription1, itemDescription2, unitOfMeasure, freightChargesCode, itemWeight, openQuantity, lineNumber, remainingQuantity) {
        this.poNumber = poNumber;
        this.itemNumber = itemNumber;
        this.itemDescription1 = itemDescription1;
        this.itemDescription2 = itemDescription2;
        this.unitOfMeasure = unitOfMeasure;
        this.freightChargesCode = freightChargesCode;
        this.itemWeight = itemWeight;
        this.openQuantity = openQuantity;
        this.lineNumber = lineNumber;
        this.remainingQuantity = remainingQuantity;
    }
    return PurchaseOrderItem;
}());

var QuantityAdjustNote = (function () {
    /**
     * @param {?=} id
     * @param {?=} shipmentLineId
     * @param {?=} quantityAdjustReasonId
     * @param {?=} note
     */
    function QuantityAdjustNote(id, shipmentLineId, quantityAdjustReasonId, note) {
        this.id = id;
        this.shipmentLineId = shipmentLineId;
        this.quantityAdjustReasonId = quantityAdjustReasonId;
        this.note = note;
    }
    return QuantityAdjustNote;
}());

var QuantityAdjustReason = (function () {
    /**
     * @param {?=} id
     * @param {?=} reasonCode
     * @param {?=} reasonDescription
     */
    function QuantityAdjustReason(id, reasonCode, reasonDescription) {
        this.id = id;
        this.reasonCode = reasonCode;
        this.reasonDescription = reasonDescription;
    }
    return QuantityAdjustReason;
}());

var ReceiveVia = (function () {
    /**
     * @param {?=} receivingId
     * @param {?=} receivingCode
     * @param {?=} receivingDescription
     */
    function ReceiveVia(receivingId, receivingCode, receivingDescription) {
        this.receivingId = receivingId;
        this.receivingCode = receivingCode;
        this.receivingDescription = receivingDescription;
    }
    return ReceiveVia;
}());

var Signature = (function () {
    /**
     * @param {?=} imageBase64
     * @param {?=} mode
     * @param {?=} signeeName
     * @param {?=} dateSigned
     * @param {?=} stopId
     * @param {?=} shipmentId
     * @param {?=} fileName
     * @param {?=} path
     * @param {?=} id
     */
    function Signature(imageBase64, mode, signeeName, dateSigned, stopId, shipmentId, fileName, path, id) {
        this.imageBase64 = imageBase64;
        this.mode = mode;
        this.signeeName = signeeName;
        this.dateSigned = dateSigned;
        this.stopId = stopId;
        this.shipmentId = shipmentId;
        this.fileName = fileName;
        this.path = path;
        this.id = id;
    }
    return Signature;
}());
Signature.LANDSCAPE = 'LANDSCAPE';
Signature.PORTRAIT = 'PORTRAIT';

var Stop = (function () {
    /**
     * @param {?=} id
     * @param {?=} manifestId
     * @param {?=} orders
     * @param {?=} address
     * @param {?=} status
     * @param {?=} stopNumber
     * @param {?=} customerName
     * @param {?=} isCollapsed
     */
    function Stop(id, manifestId, orders, address, status, stopNumber, customerName, isCollapsed) {
        this.id = id;
        this.manifestId = manifestId;
        this.orders = orders;
        this.address = address;
        this.status = status;
        this.stopNumber = stopNumber;
        this.customerName = customerName;
        this.isCollapsed = isCollapsed;
    }
    return Stop;
}());

var StopStatus = (function () {
    /**
     * @param {?} id
     * @param {?} stopStatusCode
     * @param {?} stopStatusDescription
     */
    function StopStatus(id, stopStatusCode, stopStatusDescription) {
        this.id = id;
        this.stopStatusCode = stopStatusCode;
        this.stopStatusDescription = stopStatusDescription;
    }
    return StopStatus;
}());
// stop status codes
StopStatus.MANIFESTED = 'MANIFESTED';
StopStatus.PENDING = 'PENDING';
StopStatus.NEXT = 'NEXT';
StopStatus.SKIPPED = 'SKIPPED';
StopStatus.DELIVERED = 'DELIVERED';
StopStatus.DELIVERED_W_CHANGES = 'DELIVERED W CHANGES';
StopStatus.NOT_DELIVERED = 'NOT DELIVERED';
// stop status descriptions
StopStatus.MANIFESTED_DESC = 'Ready for Delivery';
StopStatus.PENDING_DESC = 'Out for Delivery';
StopStatus.NEXT_DESC = 'Next';
StopStatus.SKIPPED_DESC = 'Skipped';
StopStatus.DELIVERED_DESC = 'Delivered';
StopStatus.DELIVERED_W_CHANGES_DESC = 'Delivered with Changes';
StopStatus.NOT_DELIVERED_DESC = 'Not Delivered';

var Truck = (function () {
    /**
     * @param {?=} id
     * @param {?=} name
     * @param {?=} licensePlate
     * @param {?=} plateExpiration
     * @param {?=} requiresCdlYesNo
     * @param {?=} truckStatus
     * @param {?=} truckYear
     * @param {?=} vehicleVin
     * @param {?=} make
     * @param {?=} model
     * @param {?=} chgTimeStamp
     */
    function Truck(id, name, licensePlate, plateExpiration, requiresCdlYesNo, truckStatus, truckYear, vehicleVin, make, model, chgTimeStamp) {
        this.id = id;
        this.name = name;
        this.licensePlate = licensePlate;
        this.plateExpiration = plateExpiration;
        this.requiresCdlYesNo = requiresCdlYesNo;
        this.truckStatus = truckStatus;
        this.truckYear = truckYear;
        this.vehicleVin = vehicleVin;
        this.make = make;
        this.model = model;
        this.chgTimeStamp = chgTimeStamp;
    }
    /**
     * @return {?}
     */
    Truck.prototype.clone = function () {
        return new Truck(this.id, this.name, this.licensePlate, this.plateExpiration, this.requiresCdlYesNo, this.truckStatus, this.truckYear, this.vehicleVin, this.make, this.model, this.chgTimeStamp);
    };
    return Truck;
}());

var Zone = (function () {
    /**
     * @param {?=} zoneId
     * @param {?=} zoneName
     * @param {?=} zoneAbbreviation
     * @param {?=} warehouseId
     * @param {?=} warehouseName
     * @param {?=} pickMethod
     * @param {?=} pickingId
     * @param {?=} pickingCode
     * @param {?=} pickingDescription
     * @param {?=} pickSequence
     * @param {?=} retail
     * @param {?=} receivingId
     * @param {?=} receivingCode
     * @param {?=} receivingDescription
     * @param {?=} binTemplate
     * @param {?=} storageLevel1
     * @param {?=} storageLevel2
     * @param {?=} storageLevel3
     * @param {?=} storageLevel4
     * @param {?=} storageLevel5
     * @param {?=} numberOfBins
     */
    function Zone(zoneId, zoneName, zoneAbbreviation, warehouseId, warehouseName, pickMethod, pickingId, pickingCode, pickingDescription, pickSequence, retail, receivingId, receivingCode, receivingDescription, binTemplate, storageLevel1, storageLevel2, storageLevel3, storageLevel4, storageLevel5, numberOfBins) {
        this.zoneId = zoneId;
        this.zoneName = zoneName;
        this.zoneAbbreviation = zoneAbbreviation;
        this.warehouseId = warehouseId;
        this.warehouseName = warehouseName;
        this.pickMethod = pickMethod;
        this.pickingId = pickingId;
        this.pickingCode = pickingCode;
        this.pickingDescription = pickingDescription;
        this.pickSequence = pickSequence;
        this.retail = retail;
        this.receivingId = receivingId;
        this.receivingCode = receivingCode;
        this.receivingDescription = receivingDescription;
        this.binTemplate = binTemplate;
        this.storageLevel1 = storageLevel1;
        this.storageLevel2 = storageLevel2;
        this.storageLevel3 = storageLevel3;
        this.storageLevel4 = storageLevel4;
        this.storageLevel5 = storageLevel5;
        this.numberOfBins = numberOfBins;
    }
    return Zone;
}());

var ZoneDetails = (function () {
    /**
     * @param {?=} zoneName
     * @param {?=} zoneId
     * @param {?=} locationID
     * @param {?=} locationDescription
     * @param {?=} binItemId
     * @param {?=} itemNumber
     * @param {?=} binMinQuantity
     * @param {?=} binMaxQuantity
     * @param {?=} binQuantityOnHand
     * @param {?=} binTypeId
     * @param {?=} binTypeCode
     * @param {?=} binTypeDescription
     * @param {?=} itemDescription
     * @param {?=} itemDescription2
     * @param {?=} pick
     * @param {?=} receive
     */
    function ZoneDetails(zoneName, zoneId, locationID, locationDescription, binItemId, itemNumber, binMinQuantity, binMaxQuantity, binQuantityOnHand, binTypeId, binTypeCode, binTypeDescription, itemDescription, itemDescription2, pick, receive) {
        this.zoneName = zoneName;
        this.zoneId = zoneId;
        this.locationID = locationID;
        this.locationDescription = locationDescription;
        this.binItemId = binItemId;
        this.itemNumber = itemNumber;
        this.binMinQuantity = binMinQuantity;
        this.binMaxQuantity = binMaxQuantity;
        this.binQuantityOnHand = binQuantityOnHand;
        this.binTypeId = binTypeId;
        this.binTypeCode = binTypeCode;
        this.binTypeDescription = binTypeDescription;
        this.itemDescription = itemDescription;
        this.itemDescription2 = itemDescription2;
        this.pick = pick;
        this.receive = receive;
    }
    return ZoneDetails;
}());

var BinItemTransfer = (function () {
    /**
     * @param {?=} fromBinId
     * @param {?=} toBinId
     * @param {?=} itemNumber
     * @param {?=} transferQty
     */
    function BinItemTransfer(fromBinId, toBinId, itemNumber, transferQty) {
        this.fromBinId = fromBinId;
        this.toBinId = toBinId;
        this.itemNumber = itemNumber;
        this.transferQty = transferQty;
    }
    return BinItemTransfer;
}());

var WinResponse = (function () {
    /**
     * @param {?=} meta
     * @param {?=} data
     */
    function WinResponse(meta, data) {
        this.meta = meta;
        this.data = data;
    }
    return WinResponse;
}());

var SharedLibraryModule = (function () {
    function SharedLibraryModule() {
    }
    /**
     * @return {?}
     */
    SharedLibraryModule.forRoot = function () {
        return {
            ngModule: SharedLibraryModule,
            providers: [
                CarouselService, DateService, MessagesService, ModalService, RefreshService, ShareDataService, ThemeService, UrlService, UtilService
            ]
        };
    };
    return SharedLibraryModule;
}());
SharedLibraryModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
SharedLibraryModule.ctorParameters = function () { return []; };

export { SharedLibraryModule, NavbarComponent, SideNavComponent, WinConfirmationComponent, BS4WinConfirmationComponent, DATEPICKER_VALUE_ACCESSOR, DATEPICKER_VALIDATORS, WinDatepickerComponent, TIMEPICKER_VALUE_ACCESSOR, TIMEPICKER_VALIDATORS, WinTimepickerComponent, WinGridComponent, WinAlertComponent, AlertType, WinSorterComponent, TYPEAHEAD_VALUE_ACCESSOR, WinTypeaheadComponent, WinPaginationComponent, HelpDocComponent, WinChipsComponent, WinSelectComponent, Address, AltPartNumber, Bin, BinCombination, BinCondition, BinItemCombination, BinItemInfo, BinItemLocation, BinLocation, BinItemDetails, BinType, BinlocationAndItemCreate, BinLocationFieldSync, DeliverableOrder, DeliverableOrderItem, DeliverableOrderPhoto, DeliverableOrderStatus, Driver, Item, ItemBinCombination, ItemCombination, ItemBinDetails, GridColorScheme, GridElement, GridLayout, GridRange, GridSquare, Manifest, ManifestStatus, NotDeliveredOrder, PickVia, PurchaseOrder, PurchaseOrderItem, QuantityAdjustNote, QuantityAdjustReason, ReceiveVia, Signature, Stop, StopStatus, Truck, Zone, ZoneDetails, BinItemTransfer, WinResponse, CarouselService, DateService, MessagesService, ModalService, RefreshService, ShareDataService, ThemeService, UrlService, UtilService };
