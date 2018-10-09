export declare class UrlService {
    static readonly PROD: string;
    static readonly QA: string;
    static readonly DEV: string;
    static readonly LOCAL: string;
    static readonly SHIPPING_MANIFEST_PROD: string;
    static readonly WORKING_QUEUES_PROD: string;
    static readonly BIN_LOCATION_PROD: string;
    static readonly PICKING_PROD: string;
    static readonly SHIPPING_MANIFEST_QA: string;
    static readonly WORKING_QUEUES_QA: string;
    static readonly BIN_LOCATION_QA: string;
    static readonly PICKING_QA: string;
    static readonly SHIPPING_MANIFEST_DEV: string;
    static readonly WORKING_QUEUES_DEV: string;
    static readonly BIN_LOCATION_DEV: string;
    static readonly PICKING_DEV: string;
    static readonly SHIPPING_MANIFEST_LOCAL: string;
    static readonly WORKING_QUEUES_LOCAL: string;
    static readonly BIN_LOCATION_LOCAL: string;
    static readonly PICKING_LOCAL: string;
    static readonly PURCHASING_LOCAL: string;
    static readonly PURCHASING_DEV: string;
    getShippingManifestUrl(environment: string): string;
    getWorkingQueuesUrl(environment: string): string;
    getBinLocationsUrl(environment: string): string;
    getPickingUrl(environment: string): string;
    getPurchasingUrl(environment: string): string;
}
