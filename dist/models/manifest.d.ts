import { Truck } from './truck';
import { Driver } from './driver';
import { ManifestStatus } from './manifest-status';
import { Stop } from './stop';
export declare class Manifest {
    id: string;
    manifestNumber: string;
    companyNumber: string;
    deliveryDate: string;
    deliveryTime: string;
    manifestCreator: string;
    manifestDate: string;
    driver: Driver;
    truck: Truck;
    manifestStatus: ManifestStatus;
    stops: Stop[];
    numberOfOrders: number;
    stopCount: number;
    showExclamation: boolean;
    deliveryStartTime: string;
    chgTimeStamp: string;
    constructor(id?: string, manifestNumber?: string, companyNumber?: string, deliveryDate?: string, deliveryTime?: string, manifestCreator?: string, manifestDate?: string, driver?: Driver, truck?: Truck, manifestStatus?: ManifestStatus, stops?: Stop[], numberOfOrders?: number, stopCount?: number, showExclamation?: boolean, deliveryStartTime?: string, chgTimeStamp?: string);
}
