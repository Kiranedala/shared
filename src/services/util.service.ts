import {Injectable, EventEmitter} from '@angular/core';
import {Address} from '../models/address';
import { ShareDataService } from './share-data.service';
import {MessagesService} from './messages.service';

declare var $: any;

@Injectable()
export class UtilService {
    titleEmitter: EventEmitter<any> = new EventEmitter();
    helpDocUrlEmitter: EventEmitter<any> = new EventEmitter();

    constructor(private messageService: MessagesService, private shareDataService: ShareDataService) {
    }

    setCurrentPageTitle(title: string) {
        this.titleEmitter.emit(title);
    }

    setCurrentHelpDocUrl(url: string) {
        this.helpDocUrlEmitter.emit(url);
    }

    trim(s: string): string {
        return $.trim(s);
    }

    /*
     * Description: Filters a given value with a expected regular
     * expression pattern as a string
     *
     * Example:
     * value = 'Test123' pattern = '\d+' output = '123'
     * value = 'Test' pattern = '\d+' output = ''
     * */
    filter(value: string, pattern: string): string {
        
                let filteredString = '';
        
                if (value && pattern) {
        
                    if ([typeof value][0] == 'string' && [typeof pattern][0] == 'string') {
        
                        let regularExpression = new RegExp(pattern);
        
                        if ([typeof value][0] == 'string' && !value.match(regularExpression)) {
        
                            for (let char of value) {
                                if (char.match(regularExpression)) {
                                    filteredString += char;
                                }
                            }
                        } else {
                            filteredString = value;
                        }
                    } else {
                        filteredString = value;
                    }
                }
        
                return filteredString;
            }

    /**
     * Determine if the original string contains the specified substring.
     * @param original the original string
     * @param substring the substring
     * @returns {boolean} true if the original string contains the substring; false otherwise
     */
    contains(original: string, substring: string) {
        return original .indexOf(substring) < 0 ? false : true;
    }

    copyObject(object: {}) {
        let objectCopy = <any>{};
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                objectCopy[key] = (<any>object)[key];
            }
        }
        return objectCopy;
    }

    padLeft(str: string, size: number, padding: string): string {
        if (!str) {
            return null;
        }
        if (str.length >= size) {
            return str;
        }
        let leftPadded: string = str;
        for (let i = 0; i < size - str.length; i++) {
            leftPadded = padding + leftPadded;
        }
        return leftPadded;
    }

    /**
     * Sorting function for two strings.  Sorts alphabetically (ascending order) ignoring case.
     */
    sortAscending = (string1: string, string2: string): number => {
        let lowercase1 = string1.toLowerCase();
        let lowercase2 = string2.toLowerCase();
        return lowercase1 < lowercase2 ? -1 : lowercase1 > lowercase2 ? 1 : 0;
    };

    /**
     * Sorting function for two strings.  Sorts alphabetically (descending order) ignoring case.
     */
    sortDescending = (string1: string, string2: string): number => {
        let lowercase1 = string1.toLowerCase();
        let lowercase2 = string2.toLowerCase();
        return lowercase1 > lowercase2 ? -1 : lowercase1 < lowercase2 ? 1 : 0;
    };

    /**
     * Put in here for now.
     * Not recongnizing equals function on Address object
     */
    areAddressesEqual(address: Address, other: Address): boolean {
        // if condition for checking if address and other is not null
        if (address && other) {
            return address.id === other.id && address.street1 === other.street1 && address.street2 === other.street2 && address.street3 === other.street3 && address.city === other.city && address.state === other.state && address.zip === other.zip;
        } else {
            return false;
        }
    }

    /**
     * Select a radio button on row click
     * @param tableId string
     */
    selectRadioButton(item) {
        if (!$(item.currentTarget).find('td input:radio').prop('checked')) {
            $(item.currentTarget).find('td input:radio').prop('checked', true);
        }
    }

    collapseFiltersOnMobileDevice(collapseLinkClass: string, listId: string) {
        if (window.innerWidth < 768) {
            $(collapseLinkClass).addClass('collapsed');
            $(listId).removeClass('in');
            $(listId).removeClass('show');
        }
    }

    deepClone(obj) {
        if (typeof(obj) !== 'object' || obj === null) {
            return obj;
        }
        let clone;
        if(Array.isArray(obj)) {
            clone = obj.slice();  // unlink Array reference.
        } else {
            clone = Object.assign({}, obj); // Unlink Object reference.
        }
        let keys = Object.keys(clone);
        for (let i=0; i < keys.length; i++) {
            clone[keys[i]] = this.deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
        }
        return clone; // return unlinked clone.
    }

    /**
     * retun true if device is mobile
     */
    isMobileDevice(): boolean {
        if (window.screen.width < 768) {
            return true;
        }
        return false;
    }

    /**
     * Check if window screen/inner width is less than or equal to 1024.
     */
    applyRemoveBlockUI(): boolean {
        if (window.screen.width <= 1024 || window.innerWidth <= 1024) {
            return true;
        }
        return false;
    }

  /**
     * Check if provided string is an valid email address
     * If string is valid email return true otherwise return false
     * @param email
     */
    validateEmail(email: string): boolean {
        const regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExpressionEmail.test(email);
    }

    /**
     * Checks input res for 204 status code and show error message and returns boolean value
     * @param res Response of service passed in function
     */
    checkStatusForNoContent(res: any, messageErr?: string): boolean {
        if (res && res.status && res.status === 204) {
            this.shareDataService.blockUI(false);
            if (messageErr) {
                let message = this.messageService.getMessage(messageErr);
                this.shareDataService.showStatus([{ severity: 'error', summary: message }]);
            }
            return true;
        }
        return false;
    }

    /**
     * Check if device is iPad
     */
    isIPad(): boolean {
        if (/iPad/.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    /**
     * Check if device is iPhone
     */
    isIPhone(): boolean {
        if (/iPhone/.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

  /**
   * Converts a string's case into Title Case
   * @param str string to be converted
   */
  toTitleCase(str: string) {
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  /**
   * To set focus on the first input box on the page
   */
  setFocus() {
    setTimeout(function() {
        $('input.form-control, select.form-control')[0].focus();
      }, 10);
  }

  /**
   * 
   * @param checkStr Passed value in which user input is to be checked
   * @param userInput User input value which is to be checked
   */
    isInputExist(checkStr: any, userInput: any): boolean {
        if (checkStr.indexOf(userInput) === 0 ||
            checkStr.replace(new RegExp('[0]*'), '').indexOf(userInput) === 0 ||
            checkStr.replace('-', '').indexOf(userInput) === 0 ||
            checkStr.replace(new RegExp('^[0]*|-', 'g'), '').indexOf(userInput) === 0) {
            return true;
        }
        return false;
    }
}
