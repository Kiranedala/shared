export declare class Zone {
    zoneId: number;
    zoneName: string;
    zoneAbbreviation: string;
    warehouseId: number;
    warehouseName: string;
    pickMethod: string;
    pickingId: number;
    pickingCode: string;
    pickingDescription: string;
    pickSequence: number;
    retail: boolean;
    receivingId: number;
    receivingCode: string;
    receivingDescription: string;
    binTemplate: string;
    storageLevel1: string;
    storageLevel2: string;
    storageLevel3: string;
    storageLevel4: string;
    storageLevel5: string;
    numberOfBins: number;
    constructor(zoneId?: number, zoneName?: string, zoneAbbreviation?: string, warehouseId?: number, warehouseName?: string, pickMethod?: string, pickingId?: number, pickingCode?: string, pickingDescription?: string, pickSequence?: number, retail?: boolean, receivingId?: number, receivingCode?: string, receivingDescription?: string, binTemplate?: string, storageLevel1?: string, storageLevel2?: string, storageLevel3?: string, storageLevel4?: string, storageLevel5?: string, numberOfBins?: number);
}
