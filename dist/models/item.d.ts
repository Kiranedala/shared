export declare class Item {
    itemID: number;
    itemNumber: string;
    itemDescription1: string;
    itemDescription2: string;
    iovFlag: boolean;
    manufacturerCode: string;
    manufacturerCodeDescription: string;
    productCode: string;
    productCodeDescription: string;
    vendorCode: string;
    vendorCodeDescription: string;
    numberOfBins: string;
    totalOnHandQty: number;
    totalAvailableQty: number;
    purchasingUnitOfMeasure: string;
    sellingUnitOfMeasure: string;
    constructor(itemID?: number, itemNumber?: string, itemDescription1?: string, itemDescription2?: string, iovFlag?: boolean, manufacturerCode?: string, manufacturerCodeDescription?: string, productCode?: string, productCodeDescription?: string, vendorCode?: string, vendorCodeDescription?: string, numberOfBins?: string, totalOnHandQty?: number, totalAvailableQty?: number, purchasingUnitOfMeasure?: string, sellingUnitOfMeasure?: string);
}
