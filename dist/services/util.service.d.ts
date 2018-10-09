import { EventEmitter } from '@angular/core';
import { Address } from '../models/address';
import { ShareDataService } from './share-data.service';
import { MessagesService } from './messages.service';
export declare class UtilService {
    private messageService;
    private shareDataService;
    titleEmitter: EventEmitter<any>;
    helpDocUrlEmitter: EventEmitter<any>;
    constructor(messageService: MessagesService, shareDataService: ShareDataService);
    setCurrentPageTitle(title: string): void;
    setCurrentHelpDocUrl(url: string): void;
    trim(s: string): string;
    filter(value: string, pattern: string): string;
    /**
     * Determine if the original string contains the specified substring.
     * @param original the original string
     * @param substring the substring
     * @returns {boolean} true if the original string contains the substring; false otherwise
     */
    contains(original: string, substring: string): boolean;
    copyObject(object: {}): any;
    padLeft(str: string, size: number, padding: string): string;
    /**
     * Sorting function for two strings.  Sorts alphabetically (ascending order) ignoring case.
     */
    sortAscending: (string1: string, string2: string) => number;
    /**
     * Sorting function for two strings.  Sorts alphabetically (descending order) ignoring case.
     */
    sortDescending: (string1: string, string2: string) => number;
    /**
     * Put in here for now.
     * Not recongnizing equals function on Address object
     */
    areAddressesEqual(address: Address, other: Address): boolean;
    /**
     * Select a radio button on row click
     * @param tableId string
     */
    selectRadioButton(item: any): void;
    collapseFiltersOnMobileDevice(collapseLinkClass: string, listId: string): void;
    deepClone(obj: any): any;
    /**
     * retun true if device is mobile
     */
    isMobileDevice(): boolean;
    /**
     * Check if window screen/inner width is less than or equal to 1024.
     */
    applyRemoveBlockUI(): boolean;
    /**
       * Check if provided string is an valid email address
       * If string is valid email return true otherwise return false
       * @param email
       */
    validateEmail(email: string): boolean;
    /**
     * Checks input res for 204 status code and show error message and returns boolean value
     * @param res Response of service passed in function
     */
    checkStatusForNoContent(res: any, messageErr?: string): boolean;
    /**
     * Check if device is iPad
     */
    isIPad(): boolean;
    /**
     * Check if device is iPhone
     */
    isIPhone(): boolean;
    /**
     * Converts a string's case into Title Case
     * @param str string to be converted
     */
    toTitleCase(str: string): string;
    /**
     * To set focus on the first input box on the page
     */
    setFocus(): void;
    /**
     *
     * @param checkStr Passed value in which user input is to be checked
     * @param userInput User input value which is to be checked
     */
    isInputExist(checkStr: any, userInput: any): boolean;
}
