import {Component, Input} from '@angular/core';

@Component({
    selector: 'win-alert',
    templateUrl: 'win-alert.component.html',
    styleUrls: ['win-alert.component.css']
})

export class WinAlertComponent {


    @Input('message') message: string;
    @Input('type') type: AlertType;

    private isRendered: boolean;
    private isVisible: boolean;


    constructor() {
        this.isRendered = false;
        this.isVisible = false;
    }

    private fadeOut() {
        this.isVisible = false;
        setTimeout(() => {
            this.isRendered = false;
        }, 2000);
    }

    fadeIn() {
        this.isRendered = true;
        setTimeout(() => {
            this.isVisible = true;
        }, 0);
        // success message will fade out after 5 seconds
        if (this.type === AlertType.SUCCESS) {
            setTimeout(() => {
                this.fadeOut();
            }, 5000);
        }
    }

    /**
     * Close alert immediately. No fade out.
     */
    close() {
        this.isRendered = false;
        this.isVisible = false;
    }

    private getAlertClass() {
        switch (this.type) {
            case AlertType.SUCCESS:
                return 'win-success-alert';
            case AlertType.WARNING:
                return 'win-warning-alert';
            case AlertType.ERROR:
                return 'win-error-alert';
        }
    }

   private getIconClass() {
       switch (this.type) {
           case AlertType.SUCCESS:
               return 'fa fa-check';
           case AlertType.WARNING:
               return 'fa fa-exclamation-triangle';
           case AlertType.ERROR:
               return 'fa fa-exclamation-triangle';
       }
   }

}

export enum AlertType {
    SUCCESS, WARNING, ERROR
}
