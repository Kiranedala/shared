import { EventEmitter } from '@angular/core';
import { ModalService } from '../services/modal.service';
export declare class WinConfirmationComponent {
    private modalService;
    id: string;
    title: string;
    message: string;
    button1: string;
    button2: string;
    model: any;
    confirmed: EventEmitter<any>;
    unconfirmed: EventEmitter<boolean>;
    backButton: EventEmitter<boolean>;
    constructor(modalService: ModalService);
    /**
     * Open the confirmation modal.
     * 1. Add 1 state to the history stack
     * 2. Open the modal
     * 3. Register the event listener
     */
    open: () => void;
    /**
     * Modal is closed through user interaction with the page.
     * 1. Unregister the event listener
     * 2. Close the modal
     * 3. Go back 1 state in the history, because we added 1 state when opening the modal
     */
    close: () => void;
    /**
     * Modal is closed when the user presses the back button in the browser.
     * Callback function.
     * 1. Unregister the event listener
     * 2. Close the modal
     * 3. Inform the parent that the back button was pressed
     */
    confirmationCallback: () => void;
    /**
     * Called when the user presses the button to confirm the decision.
     */
    private confirm;
    /**
     * Inform the parent that the confirm button was pressed.
     */
    private emitConfirmed;
    /**
     * Called when the user presses the button to unconfirm the decision.
     */
    private unconfirm;
    /**
     * Inform the parent that the unconfirm button was pressed.
     */
    private emitUnconfirmed;
}
