import {GridRange} from './grid-range';

export class GridElement {
  constructor(public name: string, public type: string, public color: string, public ranges?: GridRange[]) {
    if(!this.ranges) {
      this.ranges = [];
    }
  }

  addRange(range: GridRange) {
    this.ranges.push(range);
  }
}
