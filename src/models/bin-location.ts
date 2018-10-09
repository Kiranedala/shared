import {BinItemLocation} from './bin-item-location';

export class BinLocation {

  constructor(public binId?: number,
              public binLocation?: string,
              public includeQtyInAvail?: boolean,
              public tote?: boolean,
              public pickFrom?: boolean,
              public stagingArea?: boolean,
              public receiveInto?: boolean,
              public replenishFrom?: boolean,
              public replenishInto?: boolean,
              public specialHandling?: boolean,
              public sellable?: boolean,
              public numberOfItems?: number,
              public totalOnHandQty?: number,
              public totalAvailableQty?: number,
              public zoneId?: number,
              public zoneName?: string,
              public zoneAbbreviation?: string,
              public binConditionId?: number,
              public binConditionCode?: string,
              public binConditionDescription?: string,
              public pickingId?: number,
              public pickingCode?: string,
              public pickingDescription?: string,
              public pickViaSource?: string,
              public receivingId?: number,
              public receivingCode?: string,
              public receivingDescription?: string,
              public receiveViaSource?: string) {
  }

}
