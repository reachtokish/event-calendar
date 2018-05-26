import { Pipe, PipeTransform } from '@angular/core';
import { ObjectToString } from "../services/objectToString"

@Pipe({
    name: 'objToString',
})

export class ObjectToStringFilter implements PipeTransform {
    constructor(private abc:ObjectToString) { }
    transform(value) {
        // let objString = this.abc.objectToString(value);
        return "abc";
    }
}
