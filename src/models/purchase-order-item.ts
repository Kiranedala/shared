export class PurchaseOrderItem {

  constructor(public poNumber: string,
              public itemNumber: string,
              public itemDescription1: string,
              public itemDescription2: string,
              public unitOfMeasure: string,
              public freightChargesCode: string,
              public itemWeight: number,
              public openQuantity: number,
              public lineNumber: number,
              public remainingQuantity: number) {
  }

}
