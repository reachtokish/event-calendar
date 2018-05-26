import { Injectable } from '@angular/core';

@Injectable()
export class DateForDatepicker {

    constructor() { }

    returnDate(date) {

        if(date && date != '') {
            let dateSplit = date.split("/");
            let exactDate = dateSplit[0];
            let exactMonth = dateSplit[1]-1;
            let exactYear = dateSplit[2];

            return new Date(exactYear, exactMonth, exactDate);
        }
        else {
            return "";
        }
    }

}
