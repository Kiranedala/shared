import { DeliverableOrder } from './deliverable-order';
import { Address } from './address';
import { StopStatus } from './stop-status';
export declare class Stop {
    id: string;
    manifestId: string;
    orders: DeliverableOrder[];
    address: Address;
    status: StopStatus;
    stopNumber: number;
    customerName: string;
    isCollapsed: boolean;
    constructor(id?: string, manifestId?: string, orders?: DeliverableOrder[], address?: Address, status?: StopStatus, stopNumber?: number, customerName?: string, isCollapsed?: boolean);
}
