export class BinItemLocation {

  constructor(public zoneId?: number,
              public zoneAbbreviation?: string,
              public zoneName?: string,
              public binId?: number,
              public binLocation?: string,
              public sellable?: boolean,
              public tote?: boolean,
              public productConditionId?: number,
              public productConditionDescription?: string,
              public binItemId?: number,
              public itemNumber?: string,
              public binItemMin?: number,
              public binItemMax?: number,
              public binQtyOnHand?: number,
              public binTypeId?: number,
              public binTypeDescription?: string,
              public itemDescription1?: string,
              public itemDescription2?: string,
              public manufacturerCode?: string,
              public manufacturerDescription?: string,
              public productCode?: string,
              public productDescription?: string,
              public vendorCode?: string,
              public vendorDescription?: string,
              public onHandItemBalance?: number,
              public iov?: boolean,
              public numberOfItems?: number,
              public onHandBinTotal?: number,
              public numberOfBins?: number) {
  }
}



