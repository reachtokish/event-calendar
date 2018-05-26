import { Injectable } from '@angular/core';
import { ObjectToString } from "../services/objectToString";
import { Validators } from '@angular/forms';

@Injectable()
export class FieldJoin {

    constructor(private objToString: ObjectToString) { }

    join(event, firstObj, secondObj, thirdObj) {
        if(thirdObj.invalid == true) {
            firstObj.patchValue({ [secondObj]: "" });
            firstObj.get(secondObj).setValidators([Validators.required]);
            firstObj.get(secondObj).updateValueAndValidity();
        }
        else {
            firstObj.get(secondObj).setValidators([]);
            firstObj.get(secondObj).updateValueAndValidity();
            let valueArry = [];
            let obj = thirdObj.value;
            let joinedVal = "";

            if(event.done == true) {
                let objKeys = Object.keys(obj);
                for(let key of objKeys) {
                    valueArry.push(obj[key]);
                }
            }

            if(event.done == true) {
                for(let i of valueArry) {
                    if(i != "") {
                        joinedVal += i + ", ";
                    }
                }
            }

            let finalVal = joinedVal.slice(0, -2);
            firstObj.patchValue({ [secondObj]: finalVal });
        }
    }

}
