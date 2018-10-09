import {ItemCombination} from './item-combination';


export class ItemBinDetails {

  constructor(public itemCount?: number,
              public itemBinCount?: number,
              public itemCombinationList?: ItemCombination[]) {
  }

}
