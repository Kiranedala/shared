import { OnInit } from '@angular/core';
import { DataTable } from 'angular2-datatable';
export declare class WinSorterComponent implements OnInit {
    private mfTable;
    sortBy: string;
    initial: string;
    isSortedAsc: boolean;
    isSortedDesc: boolean;
    constructor(mfTable: DataTable);
    ngOnInit(): void;
    sort(): void;
}
