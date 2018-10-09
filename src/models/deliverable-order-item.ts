import {QuantityAdjustNote} from './quantity-adjust-note';
import {QuantityAdjustReason} from './quantity-adjust-reason';

export class DeliverableOrderItem {

    constructor(public id?: string,
                public orderId?: string,
                public shipmentLineId?: string,
                public itemNumber?: string,
                public modelNumber?: string,
                public description1?: string,
                public description2?: string,
                public unitOfMeasure?: string,
                public quantityOrdered?: number,
                public quantityShipped?: number,
                public quantityBackOrdered?: number,
                public unitPrice?: number,
                public extendedPrice?: number,
                public serialized?: boolean,
                public adjustedQuantity?: number,
                public quantityAdjustNote?: QuantityAdjustNote,
                public serialNumbers?: string[],
                public tempAdjustedQuantity?: number,
                public tempAdjustedReason?: QuantityAdjustReason,
                public tempAdjustedNote?: string) {
    }


}