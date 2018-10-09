export class StopStatus {

    // stop status codes
    static readonly MANIFESTED: string = 'MANIFESTED';
    static readonly PENDING: string = 'PENDING';
    static readonly NEXT: string = 'NEXT';
    static readonly SKIPPED: string = 'SKIPPED';
    static readonly DELIVERED: string = 'DELIVERED';
    static readonly DELIVERED_W_CHANGES: string = 'DELIVERED W CHANGES';
    static readonly NOT_DELIVERED: string = 'NOT DELIVERED';

    // stop status descriptions
    static readonly MANIFESTED_DESC: string = 'Ready for Delivery';
    static readonly PENDING_DESC: string = 'Out for Delivery';
    static readonly NEXT_DESC: string = 'Next';
    static readonly SKIPPED_DESC: string = 'Skipped';
    static readonly DELIVERED_DESC: string = 'Delivered';
    static readonly DELIVERED_W_CHANGES_DESC: string = 'Delivered with Changes';
    static readonly NOT_DELIVERED_DESC: string = 'Not Delivered';

    constructor(public id: string,
                public stopStatusCode: string,
                public stopStatusDescription: string) {
    }
}
