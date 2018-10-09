import { EventEmitter } from '@angular/core';
export declare class WinChipsComponent {
    limit: any;
    list: {
        label: string;
        name: string;
    }[];
    removeItem: EventEmitter<{}>;
    constructor();
    /**
     * Fires event to remove a particular chip
     * @param {string} name
     */
    delete(name: string): void;
    /**
     * To show all available chips
     */
    showAllChips(): void;
}
