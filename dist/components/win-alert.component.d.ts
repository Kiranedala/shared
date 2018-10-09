export declare class WinAlertComponent {
    message: string;
    type: AlertType;
    private isRendered;
    private isVisible;
    constructor();
    private fadeOut();
    fadeIn(): void;
    /**
     * Close alert immediately. No fade out.
     */
    close(): void;
    private getAlertClass();
    private getIconClass();
}
export declare enum AlertType {
    SUCCESS = 0,
    WARNING = 1,
    ERROR = 2,
}
