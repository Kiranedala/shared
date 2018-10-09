import {BinLocation} from './bin-location';
import {BinItemCombination} from './bin-item-combination';

export class BinCombination {

  constructor(public binLocation?: BinLocation,
              public binItemCombinationList?: BinItemCombination[]) {
  }

}
