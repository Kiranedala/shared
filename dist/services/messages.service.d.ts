import { Http } from '@angular/http';
export declare class MessagesService {
    private http;
    private messages;
    constructor(http: Http);
    getMessage(key: string, args?: Object[]): any;
    private formatString(str, args);
}
