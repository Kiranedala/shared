import { Item } from './item';
import { ItemBinCombination } from './item-bin-combination';
export declare class ItemCombination {
    item: Item;
    itemBinCombinationList: ItemBinCombination[];
    constructor(item?: Item, itemBinCombinationList?: ItemBinCombination[]);
}
