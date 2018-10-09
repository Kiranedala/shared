import { QuantityAdjustNote } from './quantity-adjust-note';
import { QuantityAdjustReason } from './quantity-adjust-reason';
export declare class DeliverableOrderItem {
    id: string;
    orderId: string;
    shipmentLineId: string;
    itemNumber: string;
    modelNumber: string;
    description1: string;
    description2: string;
    unitOfMeasure: string;
    quantityOrdered: number;
    quantityShipped: number;
    quantityBackOrdered: number;
    unitPrice: number;
    extendedPrice: number;
    serialized: boolean;
    adjustedQuantity: number;
    quantityAdjustNote: QuantityAdjustNote;
    serialNumbers: string[];
    tempAdjustedQuantity: number;
    tempAdjustedReason: QuantityAdjustReason;
    tempAdjustedNote: string;
    constructor(id?: string, orderId?: string, shipmentLineId?: string, itemNumber?: string, modelNumber?: string, description1?: string, description2?: string, unitOfMeasure?: string, quantityOrdered?: number, quantityShipped?: number, quantityBackOrdered?: number, unitPrice?: number, extendedPrice?: number, serialized?: boolean, adjustedQuantity?: number, quantityAdjustNote?: QuantityAdjustNote, serialNumbers?: string[], tempAdjustedQuantity?: number, tempAdjustedReason?: QuantityAdjustReason, tempAdjustedNote?: string);
}
