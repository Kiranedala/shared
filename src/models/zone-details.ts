export class ZoneDetails {
  constructor(public zoneName?: string,
              public zoneId?: number,
              public locationID?: number,
              public locationDescription?: string,
              public binItemId?: number,
              public itemNumber?: string,
              public binMinQuantity?: number,
              public binMaxQuantity?: number,
              public binQuantityOnHand?: number,
              public binTypeId?: number,
              public binTypeCode?: string,
              public binTypeDescription?: string,
              public itemDescription?: string,
              public itemDescription2?: string,
              public pick?: boolean,
              public receive?: boolean) {
  }
}
