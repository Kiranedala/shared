export declare class BinLocationFieldSync {
    binIds: number[];
    includeQtyInAvail: boolean;
    binConditionId: number;
    binConditionCode: string;
    zoneId: number;
    zoneName: string;
    pickingId: number;
    receivingId: number;
    receiveInto: boolean;
    replenishFrom: boolean;
    replenishInto: boolean;
    pickFrom: boolean;
    stagingArea: boolean;
    sellable: boolean;
    tote: boolean;
    specialHandling: boolean;
    constructor(binIds?: number[], includeQtyInAvail?: boolean, binConditionId?: number, binConditionCode?: string, zoneId?: number, zoneName?: string, pickingId?: number, receivingId?: number, receiveInto?: boolean, replenishFrom?: boolean, replenishInto?: boolean, pickFrom?: boolean, stagingArea?: boolean, sellable?: boolean, tote?: boolean, specialHandling?: boolean);
}
