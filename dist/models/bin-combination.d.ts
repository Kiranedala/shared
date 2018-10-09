import { BinLocation } from './bin-location';
import { BinItemCombination } from './bin-item-combination';
export declare class BinCombination {
    binLocation: BinLocation;
    binItemCombinationList: BinItemCombination[];
    constructor(binLocation?: BinLocation, binItemCombinationList?: BinItemCombination[]);
}
