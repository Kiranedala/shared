import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class ModalService {

    openModalIdList: string[] = [];

    constructor() {}

    registerPopState(callback) {
        window.addEventListener('popstate', callback);
    }

    unregisterPopState(callback) {
        window.removeEventListener('popstate', callback);
    }

    openModal(modalId: string, hideFocus?: boolean) {
        $('#' + modalId).modal('show');
        $('#' + modalId + ' .modal-dialog').animate({ scrollTop: 0 }, 'fast');
        this.openModalIdList.push(modalId);

        $('.modal-second-level').on('shown.bs.modal', function() {            
            $('body').addClass('scroll-disable');
        });
        
        $('.modal').off('shown.bs.modal');
        
        $('.modal').on('shown.bs.modal', function () {
            if (!hideFocus && $('#' + this.id + ' input.form-control, ' + '#' + this.id + ' select.form-control')[0]) {
                $('#' + this.id + ' input.form-control, ' + '#' + this.id + ' select.form-control')[0].focus();
            }
        });

        $('body').on('touchmove', function(e){
            if($('.scroll-disable').has($(e.target)).length) e.preventDefault();
        });
    }

    closeModal(modalId: string) {
        $('#' + modalId).modal('hide');
        $('#' + modalId).on('hidden.bs.modal', function () {
            $(' input.form-control,  select.form-control')[0].focus();
            $('body').removeClass('scroll-disable');
            if ($('#' + modalId).hasClass('modal-second-level')) {
                $('body').addClass('modal-open');
            }
            $('#' + modalId).off('hidden.bs.modal');
            return false;
        });

        let modalIndex = this.openModalIdList.indexOf(modalId);
        this.openModalIdList.splice(modalIndex);
    }

    scrollToTop(modalId: string) {
        $('#' + modalId + '.modal-dialog').scrollTop(0);
    }

    closeAllModals() {
        for (let modalId of this.openModalIdList) {

            this.closeModal(modalId);
        }
    }
}
