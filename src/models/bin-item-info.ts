export class BinItemInfo {
  constructor(public binItemId?: number,
              public binId?: number,
              public binLocation?: string,
              public itemId?: number,
              public itemNumber?: string,
              public binItemMin?: number,
              public binItemMax?: number,
              public binQtyOnHand?: number,
              public binQtyAvailable?: number,
              public binTypeId?: number,
              public binTypeCode?: string,
              public binTypeDescription?: string,) {
  }

}
