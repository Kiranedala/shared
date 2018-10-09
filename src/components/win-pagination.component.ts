import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'win-pagination',
  templateUrl: 'win-pagination.component.html',
  styleUrls: ['win-pagination.component.css']
})
export class WinPaginationComponent implements OnChanges {

  readonly ROTATE = true;
  readonly PAGE_SIZE_LIST = [10, 15, 30];

  @Input('id') id = '';
  @Input('showPageSize') showPageSize = false;
  @Input('pageSize') currentPageSize: number; // Items per page
  @Output('winPageSizeChanged') winPageSizeChanged = new EventEmitter();
  @Input('currentPage') currentPage;
  @Output('winPageChanged') winPageChanged = new EventEmitter<number>();

  @Input('totalItems') totalItems;
  @Input() boundaryLinks: boolean;
  @Input() directionLinks: boolean;
  @Input() rotate: boolean;
  @Input() maxSize: number;

  private page = 1;
  private totalPages: number;
  pages: any[];

  /**
   * Informs parent component about page size change
   * @param {number} count
   */
  changePageSize(count: number, event?: Event) {
    if (this.currentPageSize !== count) {
      this.winPageSizeChanged.emit(count);
      this.selectPage(1, event);
    }
  }

  constructor(private utilService: UtilService) {

  }
  ngOnChanges() {
    this.currentPage = this.currentPage || 1;
    this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : true;
    this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : true;
    this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : true;
    this.currentPageSize = typeof this.currentPageSize !== 'undefined' ? this.currentPageSize : 10;
    this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : 3;
    this.totalPages = this.calculateTotalPages();
    this.pages = this.getPages(this.page, this.totalPages);
    this.selectPage(this.currentPage);
  }


  noPrevious(): boolean {
    return this.page === 1;
  }

  noNext(): boolean {
    return this.page === this.totalPages;
  }

  getText(key: string): string {
    let text = '';
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
  }

  selectPage(page: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (event && event.target) {
      const target: any = event.target;
      target.blur();
    }

    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }
    if (page > this.totalPages) {
      page = this.totalPages;
    } if (page < 1) {
      page = 1;
    }
    this.writeValue(page);
    this.winPageChanged.emit(page);
    this.fieldWidth(page);
  }

  writeValue(value: number): void {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  private getPages(currentPage: number, totalPages: number): any[] {
    const pages: any[] = [];

    // Default page limits
    let startPage = 2;
    let endPage = totalPages;
    const isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

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
      } else {
        // Visible pages are paginated with maxSize
        startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages - 1);
      }
    }

    // Add page number links
    for (let num = startPage; num <= endPage - 1; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        const previousPageSet = this.makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }

      if (endPage < totalPages) {
        const nextPageSet = this.makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
    }

    return pages;
  }

  private makePage(num: number,  text: string, active: boolean): { number: number; text: string; active: boolean } {
    return { text, number: num, active };
  }
  /**
   * Find total number of pages in pagination
   * @returns {number}
   */
  private calculateTotalPages(): number {
    const totalPages = this.currentPageSize < 1 ? 1 : Math.ceil(this.totalItems / this.currentPageSize);
    return Math.max(totalPages || 0, 1);
  }

  private showOnMobile(page): boolean {
    if (this.utilService.isMobileDevice() || this.utilService.isIPad() || this.utilService.isIPhone()) {
      return (page.number === this.currentPage) || (this.currentPage === 1 && page.number === 2) || (this.currentPage === this.totalPages && page.number === this.totalPages - 1);
    }
    return true;
  }

  validateValue(event) {
    let value = parseInt(event.target.value + event.key, 10);
    if (value > this.totalPages || value < 1) {
      return false;
    }
    return true;
  }

  fieldWidth(page = 0) {
    let element;
    if (this.id) {
      element = document.querySelector('#' + this.id + ' .current-page') as HTMLInputElement;
    }
    if (typeof element === 'undefined' || element === null) {
      element = document.querySelector('.current-page') as HTMLInputElement;
    }

    let length = element.value.length;
    if (page > 0) {
      length = String(page).length;
    }
    if (length > 1) {
      element.style.width = (9 * length) + 'px';
    } else {
      element.style.width = '10px';
    }
  }
}
