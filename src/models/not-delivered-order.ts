import {Address} from './address';
import {Driver} from './driver';

export class NotDeliveredOrder {

    constructor(public shipmentId: string,
                public orderId: string,
                public manifestId: string,
                public stopId: string,
                public orderNumber: string,
                public manifestNumber: string,
                public notDeliveredDate: string,
                public customerPO: string,
                public shipToAddress: Address,
                public driver: Driver) {
    }

}