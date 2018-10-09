import {BinLocation} from './bin-location';

export class BinlocationAndItemCreate {
  constructor(public itemNumber?: string,
              public binLocation?: BinLocation) {}
}
