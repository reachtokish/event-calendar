import { Injectable } from '@angular/core';

@Injectable()
export class ArrayToString {

    constructor() { }

    makeString(arr, keyToBeTaken) {
        let string = "";

        for(let i of arr) {
            string += i[keyToBeTaken]+', ';
        }

        string = string.slice(0, -2);

        return string;
    }

}
