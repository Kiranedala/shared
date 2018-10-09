export declare class DeliverableOrderStatus {
    id: string;
    orderStatusCode: string;
    orderStatusDescription: string;
    static readonly MANIFESTED: string;
    static readonly OFD: string;
    static readonly OND: string;
    static readonly DWC: string;
    static readonly DEL: string;
    static readonly MANIFESTED_DESC: string;
    static readonly OFD_DESC: string;
    static readonly OND_DESC: string;
    static readonly DWC_DESC: string;
    static readonly DEL_DESC: string;
    constructor(id?: string, orderStatusCode?: string, orderStatusDescription?: string);
}
