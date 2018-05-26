import { Injectable } from '@angular/core';

@Injectable()
export class DateFormat {

    constructor() { }

    format(date) {
        if(date && date != "") {
            let getDate = date.getDate();
            let getMonth = date.getMonth()+1;
            let getYear = date.getFullYear();
            return getDate + "/" + getMonth + "/" + getYear;
        }
        else {
            return "";
        }
    }

}
