import { Component, OnInit, Input } from '@angular/core';
import { DataTable, SortEvent } from 'angular2-datatable';

@Component({
    selector: 'win-sorter',
    templateUrl: 'win-sorter.component.html',
    styleUrls:  ['win-sorter.component.css']
})
export class WinSorterComponent implements OnInit {
    @Input('by') sortBy: string;
    @Input() initial: string;
    isSortedAsc: boolean = false;
    isSortedDesc: boolean = false;

    public constructor(private mfTable: DataTable) {

    }

    public ngOnInit(): void {

        this.mfTable.onSortChange.subscribe((event: SortEvent) => {
            this.isSortedAsc = (event.sortBy === this.sortBy && event.sortOrder === 'asc');
            this.isSortedDesc = (event.sortBy === this.sortBy && event.sortOrder === 'desc');
        });

        if (this.initial) {
            if (this.initial === 'asc') {
                this.mfTable.setSort(this.sortBy, 'asc');
            } else {
                this.mfTable.setSort(this.sortBy, 'desc');
            }
        }
    }

    sort() {
        if (this.isSortedAsc) {
            this.mfTable.setSort(this.sortBy, 'desc');
        } else {
            this.mfTable.setSort(this.sortBy, 'asc');
        }
    }

}
