import {PurchaseOrderItem} from './purchase-order-item';

export class PurchaseOrder {

  constructor(public poNumber: string,
              public vendorNumber: string,
              public vendorName: string,
              public dateOrdered: string,
              public dateRequested: string,
              public items: PurchaseOrderItem[]) {
  }

}
