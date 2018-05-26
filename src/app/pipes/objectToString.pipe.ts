import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjectToString',
})

export class ObjectToStringPipe implements PipeTransform {
    transform(value:string) {
        let finalVal = "";

        if(value == undefined || value == null) {
            finalVal = "";
        }
        else {

            let valueArry = [];
            let object = value;
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
