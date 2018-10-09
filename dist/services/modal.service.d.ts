export declare class ModalService {
    openModalIdList: string[];
    constructor();
    registerPopState(callback: any): void;
    unregisterPopState(callback: any): void;
    openModal(modalId: string, hideFocus?: boolean): void;
    closeModal(modalId: string): void;
    scrollToTop(modalId: string): void;
    closeAllModals(): void;
}
