import {Injectable} from '@angular/core';

@Injectable()
export class UrlService {

    public static readonly PROD: string = 'prod';
    public static readonly QA: string = 'qa';
    public static readonly DEV: string = 'dev';
    public static readonly LOCAL: string = 'local';

    public static readonly SHIPPING_MANIFEST_PROD = window.location.origin + '/shipping-manifest-manager/';//TODO: This should be the new pattern always..'http://webservice.winwholesale.com/shipping-manifest-manager/';
    public static readonly WORKING_QUEUES_PROD = 'http://webservice.winwholesale.com/queues-and-dashboards/';
    public static readonly BIN_LOCATION_PROD = 'http://webservice.winwholesale.com/receiving-manager/';
    public static readonly PICKING_PROD = 'http://webservice.winwholesale.com/picking-manager/';
    public static readonly SHIPPING_MANIFEST_QA = 'http://winproxyqa.winwholesale.com/shipping-manifest-manager/';
    public static readonly WORKING_QUEUES_QA = 'http://winproxyqa.winwholesale.com/queues-and-dashboards/';
    public static readonly BIN_LOCATION_QA = 'http://winproxyqa.winwholesale.com/receiving-manager/';
    public static readonly PICKING_QA = 'http://winproxyqa.winwholesale.com/picking-manager/';
    public static readonly SHIPPING_MANIFEST_DEV = window.location.origin + '/shipping-manifest-manager/';//'http://webservicedev.winwholesale.com/shipping-manifest-manager/';
    public static readonly WORKING_QUEUES_DEV = 'http://webservicedev.winwholesale.com/queues-and-dashboards/';
    public static readonly BIN_LOCATION_DEV = 'http://webservicedev.winwholesale.com/receiving-manager/';
    public static readonly PICKING_DEV = 'http://webservicedev.winwholesale.com/picking-manager/';
    public static readonly SHIPPING_MANIFEST_LOCAL = 'http://localhost:8080/';
    public static readonly WORKING_QUEUES_LOCAL = 'http://localhost:8081/';
    public static readonly BIN_LOCATION_LOCAL = 'http://localhost:8082/';
    public static readonly PICKING_LOCAL = 'http://localhost:8083/';
    public static readonly PURCHASING_LOCAL = 'http://localhost:4200';
    public static readonly PURCHASING_DEV = 'http://webservicedev.winwholesale.com/purchasing-manager/';

    getShippingManifestUrl(environment: string): string {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.SHIPPING_MANIFEST_PROD;
            case UrlService.QA:
                return UrlService.SHIPPING_MANIFEST_QA;
            case UrlService.DEV:
                return UrlService.SHIPPING_MANIFEST_DEV;
            case UrlService.LOCAL:
                return UrlService.SHIPPING_MANIFEST_LOCAL;
        }
    }

    getWorkingQueuesUrl(environment: string): string {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.WORKING_QUEUES_PROD;
            case UrlService.QA:
                return UrlService.WORKING_QUEUES_QA;
            case UrlService.DEV:
                return UrlService.WORKING_QUEUES_DEV;
            case UrlService.LOCAL:
                return UrlService.WORKING_QUEUES_LOCAL;
        }
    }

    getBinLocationsUrl(environment: string): string {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.BIN_LOCATION_PROD;
            case UrlService.QA:
                return UrlService.BIN_LOCATION_QA;
            case UrlService.DEV:
                return UrlService.BIN_LOCATION_DEV;
            case UrlService.LOCAL:
                return UrlService.BIN_LOCATION_LOCAL;
        }
    }
    getPickingUrl(environment: string): string {
        switch (environment) {
            case UrlService.PROD:
                return UrlService.PICKING_PROD;
            case UrlService.QA:
                return UrlService.PICKING_QA;
            case UrlService.DEV:
                return UrlService.PICKING_DEV;
            case UrlService.LOCAL:
                return UrlService.PICKING_LOCAL;
        }
    }

    getPurchasingUrl(environment: string): string {
        switch (environment) {
            case UrlService.DEV:
                return UrlService.PURCHASING_DEV;
            case UrlService.LOCAL:
                return UrlService.PURCHASING_LOCAL;
        }
    }
}
