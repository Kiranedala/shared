import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class MessagesService {

	private messages: Object;

	constructor(private http: Http) {

        this.http.get('messages.json')
            .map(res => res.json())
            .subscribe(msg => {
                this.messages = msg;
            });
	}

	getMessage(key: string, args?: Object[]) {

		if(!this.messages) {
			return '';
		}
		else if(args) {
			return this.formatString(this.messages[key], args);
		}
		else {
			return this.messages[key];
		}
	}

	private formatString(str: string, args: Object[]) {

		let formatted: string = str;

		for(let i = 0; i < args.length; i++) {
			formatted = formatted.replace('{' + i + '}', args[i].toString());
		}

		return formatted;
	}
}
