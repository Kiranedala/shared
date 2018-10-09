export declare class RefreshService {
    private static readonly TIMEOUT;
    private callback;
    constructor();
    subscribe(callback: any): void;
    unsubscribe(): void;
    start(): void;
    private initialize();
}
