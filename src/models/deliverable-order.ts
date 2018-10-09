import {Address} from './address';
import {DeliverableOrderItem} from './deliverable-order-item';
import {DeliverableOrderStatus} from './deliverable-order-status';
import {DeliverableOrderPhoto} from './deliverable-order-photo';
import {Signature} from './signature';

export class DeliverableOrder {

    constructor(public id: string,
                public stopId: string,
                public companyNumber: string,
                public orderNumber: string,
                public customersPO: string,
                public notes: string,
                public shippingInstructions: string,
                public paymentMethod: string,
                public jobName: string,
                public soldToCustomerNumber: string,
                public shipToCustomerNumber: string,
                public requestedDate: string,
                public orderedDate: string,
                public deliveryAddress: Address,
                public soldToAddress: Address,
                public items: DeliverableOrderItem[],
                public status: DeliverableOrderStatus,
                public shipmentId: string,
                public balanceDue: string,
                public orderedBy: string,
                public countOfSerials: number,
                public lockedIn?: boolean,
                public isCollapsed?: boolean,
                public photos?: DeliverableOrderPhoto[],
                public customerName?: string,
                public signature?: Signature,
                public adjustedBalanceDue?: string) {
    }

}