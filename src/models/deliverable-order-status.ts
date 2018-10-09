export class DeliverableOrderStatus {

    // order status codes
    static readonly MANIFESTED: string = 'Manifested';
    static readonly OFD: string = 'OFD';
    static readonly OND: string = 'OND';
    static readonly DWC: string = 'DWC';
    static readonly DEL: string = 'DEL';

    // order status descriptions
    static readonly MANIFESTED_DESC: string = 'Ready for Delivery';
    static readonly OFD_DESC: string = 'Out for Delivery';
    static readonly OND_DESC: string = 'Not Delivered';
    static readonly DWC_DESC: string = 'QTY Adjusted';
    static readonly DEL_DESC: string = 'Delivered';
    
    constructor(public id?: string,
                public orderStatusCode?: string,
                public orderStatusDescription?: string) {
    }
}