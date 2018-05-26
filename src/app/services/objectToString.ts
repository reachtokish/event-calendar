import { Injectable } from '@angular/core';

@Injectable()
export class ObjectToString {

    constructor() { }

    objectToString(obj) {

        let finalVal = "";

        if(obj == undefined || obj == null) {
            finalVal = "";
        }
        else {

            let valueArry = [];
            let object = obj;
            let joinedVal = "";

            let objKeys = Object.keys(object);
            for(let key of objKeys) {
                valueArry.push(object[key]);
            }

            for(let i of valueArry) {
                if(i != "") {
                    joinedVal += i + ", ";
                }
            }

            finalVal = joinedVal.slice(0, -2);

        }

        return finalVal;
    }

}
