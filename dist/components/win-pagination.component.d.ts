import { EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';
import { UtilService } from '../services/util.service';
export declare class WinPaginationComponent implements OnChanges {
    private utilService;
    readonly ROTATE: boolean;
    readonly PAGE_SIZE_LIST: number[];
    id: string;
    showPageSize: boolean;
    currentPageSize: number;
    winPageSizeChanged: EventEmitter<{}>;
    currentPage: any;
    winPageChanged: EventEmitter<number>;
    totalItems: any;
    boundaryLinks: boolean;
    directionLinks: boolean;
    rotate: boolean;
    maxSize: number;
    private page;
    private totalPages;
    pages: any[];
    /**
     * Informs parent component about page size change
     * @param {number} count
     */
    changePageSize(count: number, event?: Event): void;
    constructor(utilService: UtilService);
    ngOnChanges(): void;
    noPrevious(): boolean;
    noNext(): boolean;
    getText(key: string): string;
    selectPage(page: number, event?: Event): void;
    writeValue(value: number): void;
    private getPages(currentPage, totalPages);
    private makePage(num, text, active);
    /**
     * Find total number of pages in pagination
     * @returns {number}
     */
    private calculateTotalPages();
    private showOnMobile(page);
    validateValue(event: any): boolean;
    fieldWidth(page?: number): void;
}
