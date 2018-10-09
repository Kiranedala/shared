export declare class StopStatus {
    id: string;
    stopStatusCode: string;
    stopStatusDescription: string;
    static readonly MANIFESTED: string;
    static readonly PENDING: string;
    static readonly NEXT: string;
    static readonly SKIPPED: string;
    static readonly DELIVERED: string;
    static readonly DELIVERED_W_CHANGES: string;
    static readonly NOT_DELIVERED: string;
    static readonly MANIFESTED_DESC: string;
    static readonly PENDING_DESC: string;
    static readonly NEXT_DESC: string;
    static readonly SKIPPED_DESC: string;
    static readonly DELIVERED_DESC: string;
    static readonly DELIVERED_W_CHANGES_DESC: string;
    static readonly NOT_DELIVERED_DESC: string;
    constructor(id: string, stopStatusCode: string, stopStatusDescription: string);
}
