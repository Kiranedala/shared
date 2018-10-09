import {Truck} from './truck';
import {Driver} from './driver';
import {ManifestStatus} from './manifest-status';
import {Stop} from './stop';

export class Manifest {

    constructor(public id?: string,
                public manifestNumber?: string,
                public companyNumber?: string,
                public deliveryDate?: string,
                public deliveryTime?: string,
                public manifestCreator?: string,
                public manifestDate?: string,
                public driver?: Driver,
                public truck?: Truck,
                public manifestStatus?: ManifestStatus,
                public stops?: Stop[],
                public numberOfOrders?: number,
                public stopCount?: number,
                public showExclamation?: boolean,
                public deliveryStartTime?: string,
                public chgTimeStamp?: string) {
    }

}