import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'win-chips',
  templateUrl: './win-chips.component.html',
  styleUrls: ['./win-chips.component.css']
})
export class WinChipsComponent {
  @Input('limit') limit;                                        // Total number of chips to be shown initially
  @Input('list') list: {label: string, name: string}[];         // List of all the chip items
  @Output('removeItem') removeItem = new EventEmitter();        // Event to delete the item filter chip

  constructor() {
    this.limit = 3;
  }

  /**
   * Fires event to remove a particular chip
   * @param {string} name
   */
  delete(name: string): void {
    this.removeItem.emit(name);
    const index = this.list.map(item => item.name).indexOf(name);
    this.list.splice(index, 1);
  }

  /**
   * To show all available chips
   */
  showAllChips() {
    this.limit = this.list.length;
  }
}
