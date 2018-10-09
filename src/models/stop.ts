import {DeliverableOrder} from './deliverable-order';
import {Address} from './address';
import {StopStatus} from './stop-status';

export class Stop {

    constructor(public id?: string,
                public manifestId?: string,
                public orders?: DeliverableOrder[],
                public address?: Address,
                public status?: StopStatus,
                public stopNumber?: number,
                public customerName?: string,
                public isCollapsed?: boolean) {
    }

}