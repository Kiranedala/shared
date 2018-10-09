import { Address } from './address';
import { Driver } from './driver';
export declare class NotDeliveredOrder {
    shipmentId: string;
    orderId: string;
    manifestId: string;
    stopId: string;
    orderNumber: string;
    manifestNumber: string;
    notDeliveredDate: string;
    customerPO: string;
    shipToAddress: Address;
    driver: Driver;
    constructor(shipmentId: string, orderId: string, manifestId: string, stopId: string, orderNumber: string, manifestNumber: string, notDeliveredDate: string, customerPO: string, shipToAddress: Address, driver: Driver);
}
