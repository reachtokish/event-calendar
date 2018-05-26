import { Injectable } from '@angular/core';
import { ObjectToString } from "../services/objectToString";
import { Validators } from '@angular/forms';

@Injectable()
export class Joinaddress {

    constructor(private objToString: ObjectToString) { }

    join(event, firstObj, secondObj, thirdObj, keyArr) {


        let addrVal = this.objToString.objectToString(thirdObj.value);
        if(addrVal != "") {
            thirdObj.get(keyArr[0]).setValidators([Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{1,30}$")])]);
            thirdObj.get(keyArr[1]).setValidators([Validators.compose([Validators.required, Validators.pattern("^[0-9a-zA-Z #,.-]{1,40}$")])]);
            thirdObj.get(keyArr[2]).setValidators([Validators.compose([Validators.required])]);
            thirdObj.get(keyArr[3]).setValidators([Validators.compose([Validators.required])]);
            thirdObj.get(keyArr[4]).setValidators([Validators.compose([Validators.required])]);
            thirdObj.get(keyArr[5]).setValidators([Validators.compose([Validators.required])]);
            thirdObj.get(keyArr[6]).setValidators([Validators.compose([Validators.required, Validators.pattern("^[0-9]{6}$")])]);
        }
        else {
            if(thirdObj.controls[keyArr[1]].validator('') != null &&
            thirdObj.controls[keyArr[2]].validator('') != null &&
            thirdObj.controls[keyArr[3]].validator('') != null &&
            thirdObj.controls[keyArr[4]].validator('') != null &&
            thirdObj.controls[keyArr[5]].validator('') != null &&
            thirdObj.controls[keyArr[6]].validator('') != null &&
            thirdObj.controls[keyArr[6]].validator('') != null) {
                if(thirdObj.controls[keyArr[0]].validator('').required != true &&
                thirdObj.controls[keyArr[1]].validator('').required != true &&
                thirdObj.controls[keyArr[2]].validator('').required != true &&
                thirdObj.controls[keyArr[3]].validator('').required != true &&
                thirdObj.controls[keyArr[4]].validator('').required != true &&
                thirdObj.controls[keyArr[5]].validator('').required != true &&
                thirdObj.controls[keyArr[6]].validator('').required != true) {
                    thirdObj.get(keyArr[0]).setValidators([Validators.compose([Validators.pattern("^[a-zA-Z0-9 ]{1,30}$")])]);
                    thirdObj.get(keyArr[1]).setValidators([Validators.compose([Validators.pattern("^[0-9a-zA-Z #,.-]{1,40}$")])]);
                    thirdObj.get(keyArr[2]).setValidators([]);
                    thirdObj.get(keyArr[3]).setValidators([]);
                    thirdObj.get(keyArr[4]).setValidators([]);
                    thirdObj.get(keyArr[5]).setValidators([]);
                    thirdObj.get(keyArr[6]).setValidators([Validators.compose([Validators.pattern("^[0-9]{6}$")])]);
                }
            }
        }

        thirdObj.get(keyArr[0]).updateValueAndValidity();
        thirdObj.get(keyArr[1]).updateValueAndValidity();
        thirdObj.get(keyArr[2]).updateValueAndValidity();
        thirdObj.get(keyArr[3]).updateValueAndValidity();
        thirdObj.get(keyArr[4]).updateValueAndValidity();
        thirdObj.get(keyArr[5]).updateValueAndValidity();
        thirdObj.get(keyArr[6]).updateValueAndValidity();

        setTimeout(() => {
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
        })
    }

}
