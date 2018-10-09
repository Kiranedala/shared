import {Item} from './item';
import {ItemBinCombination} from './item-bin-combination';

export class ItemCombination {

  constructor(public item?: Item,
              public itemBinCombinationList?: ItemBinCombination[]) {
  }

}
