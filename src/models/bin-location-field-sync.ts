export class BinLocationFieldSync {
  constructor(public binIds?: number[],
              public includeQtyInAvail?: boolean,
              public binConditionId?: number,
              public binConditionCode?: string,
              public zoneId?: number,
              public zoneName?: string,
              public pickingId?: number,
              public receivingId?: number,
              public receiveInto?: boolean,
              public replenishFrom?: boolean,
              public replenishInto?: boolean,
              public pickFrom?: boolean,
              public stagingArea?: boolean,
              public sellable?: boolean,
              public tote?: boolean,
              public specialHandling?: boolean) {
  }
}
