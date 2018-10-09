import {Item} from './item';
import {BinItemInfo} from './bin-item-info';
import {BinLocation} from './bin-location';

export class ItemBinCombination {

  constructor(public binLocation?: BinLocation,
              public binItemInfo?: BinItemInfo) {
  }

}
