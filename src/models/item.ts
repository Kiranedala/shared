export class Item {

  constructor(public itemID?: number,
              public itemNumber?: string,
              public itemDescription1?: string,
              public itemDescription2?: string,
              public iovFlag?: boolean,
              public manufacturerCode?: string,
              public manufacturerCodeDescription?: string,
              public productCode?: string,
              public productCodeDescription?: string,
              public vendorCode?: string,
              public vendorCodeDescription?: string,
              public numberOfBins?: string,
              public totalOnHandQty?: number,
              public totalAvailableQty?: number,
              public purchasingUnitOfMeasure?: string,
              public sellingUnitOfMeasure?: string) {
  }

}
