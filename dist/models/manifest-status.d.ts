export declare class ManifestStatus {
    id: string;
    manifestStatusCode: string;
    manifestStatusDescription: string;
    static readonly CREATED: string;
    static readonly GENERATED: string;
    static readonly IN_PROCESS: string;
    static readonly DELIVERED: string;
    static readonly NOT_DELIVERED: string;
    static readonly CLOSED: string;
    static readonly CREATED_DESC: string;
    static readonly GENERATED_DESC: string;
    static readonly IN_PROCESS_DESC: string;
    static readonly DELIVERED_DESC: string;
    static readonly NOT_DELIVERED_DESC: string;
    static readonly CLOSED_DESC: string;
    constructor(id?: string, manifestStatusCode?: string, manifestStatusDescription?: string);
}
