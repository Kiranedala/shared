import { PurchaseOrderItem } from './purchase-order-item';
export declare class PurchaseOrder {
    poNumber: string;
    vendorNumber: string;
    vendorName: string;
    dateOrdered: string;
    dateRequested: string;
    items: PurchaseOrderItem[];
    constructor(poNumber: string, vendorNumber: string, vendorName: string, dateOrdered: string, dateRequested: string, items: PurchaseOrderItem[]);
}
