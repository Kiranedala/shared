export class QuantityAdjustNote {

  constructor(public id?: string, //noteId
              public shipmentLineId?: string,
              public quantityAdjustReasonId?: string,
              public note?: string) {
  }

}
