export class Zone {
  constructor(public zoneId?: number,
              public zoneName?: string,
              public zoneAbbreviation?: string,
              public warehouseId?: number,
              public warehouseName?: string,
              public pickMethod?: string,
              public pickingId?: number,
              public pickingCode?: string,
              public pickingDescription?: string,
              public pickSequence?: number,
              public retail?: boolean,
              public receivingId?: number,
              public receivingCode?: string,
              public receivingDescription?: string,
              public binTemplate?: string,
              public storageLevel1?: string,
              public storageLevel2?: string,
              public storageLevel3?: string,
              public storageLevel4?: string,
              public storageLevel5?: string,
              public numberOfBins?: number) {
  }
}
