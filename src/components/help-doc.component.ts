import { Component, Input } from '@angular/core';

@Component({
    selector: 'help-doc',
    templateUrl: 'help-doc.component.html',
    styleUrls: ['help-doc.component.css']
})

export class HelpDocComponent {

    @Input('url') url: string;

}