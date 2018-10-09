import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ModalService} from '../services/modal.service';

@Component({
    selector: 'win-confirmation',
    templateUrl: 'win-confirmation.component.html',
    styleUrls: ['win-confirmation.component.css']
})
export class WinConfirmationComponent {

    @Input('id') id: string;
    @Input('title') title: string;
    @Input('message') message: string;
    @Input('button1') button1: string = 'Yes';
    @Input('button2') button2: string = 'No';
    @Input('model') model: any;

    @Output() confirmed: EventEmitter<any> = new EventEmitter<any>();
    @Output() unconfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() backButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private modalService: ModalService) {}

    /**
     * Open the confirmation modal.
     * 1. Add 1 state to the history stack
     * 2. Open the modal
     * 3. Register the event listener
     */
    open = () => {
        // stay on the same page after the modal is closed
        history.pushState(null, null, document.URL);
        this.modalService.openModal(this.id);
        this.modalService.registerPopState(this.confirmationCallback);
    };

    /**
     * Modal is closed through user interaction with the page.
     * 1. Unregister the event listener
     * 2. Close the modal
     * 3. Go back 1 state in the history, because we added 1 state when opening the modal
     */
    close = () => {
        this.modalService.unregisterPopState(this.confirmationCallback);
        this.modalService.closeModal(this.id);
        history.go(-1);
    };

    /**
     * Modal is closed when the user presses the back button in the browser.
     * Callback function.
     * 1. Unregister the event listener
     * 2. Close the modal
     * 3. Inform the parent that the back button was pressed
     */
    confirmationCallback = () => {
        this.modalService.unregisterPopState(this.confirmationCallback);
        this.modalService.closeModal(this.id);
        this.backButton.emit(true);
    };

    /**
     * Called when the user presses the button to confirm the decision.
     */
    private confirm = () => {
        this.close();
        setTimeout(this.emitConfirmed, 0);
    };

    /**
     * Inform the parent that the confirm button was pressed.
     */
    private emitConfirmed = () => {
        if (this.model) {
            this.confirmed.emit(this.model);
        }
        else {
            this.confirmed.emit('Success');
        }
    };

    /**
     * Called when the user presses the button to unconfirm the decision.
     */
    private unconfirm = () => {
        this.close();
        setTimeout(this.emitUnconfirmed, 0);
    };

    /**
     * Inform the parent that the unconfirm button was pressed.
     */
    private emitUnconfirmed = () => {
        this.unconfirmed.emit(true);
    }

}
