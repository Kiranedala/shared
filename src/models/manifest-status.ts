export class ManifestStatus {

    // manifest status codes
    static readonly CREATED: string = 'CREATED';
    static readonly GENERATED: string = 'GENERATED';
    static readonly IN_PROCESS: string = 'IN PROCESS';
    static readonly DELIVERED: string = 'DELIVERED';
    static readonly NOT_DELIVERED: string = 'NOT DELIVERED';
    static readonly CLOSED: string = 'CLOSED';

    // manifest status descriptions
    static readonly CREATED_DESC: string = 'Ready for Delivery';
    static readonly GENERATED_DESC: string = 'Ready for Delivery';
    static readonly IN_PROCESS_DESC: string = 'In Process';
    static readonly DELIVERED_DESC: string = 'Delivered';
    static readonly NOT_DELIVERED_DESC: string = 'Not Delivered';
    static readonly CLOSED_DESC: string = 'Closed';

    constructor(public id?: string,
                public manifestStatusCode?: string,
                public manifestStatusDescription?: string) {
    }

}