import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'CurrencyPipe',
})

export class CurrencyPipe implements PipeTransform {
    transform(value:string, type:string) {
        if (value !== '' && type == "input") {
            let numberWithoutComma = value.replace(/,/g, "");
            return parseInt(numberWithoutComma).toLocaleString('en-IN');
        }
        if (value !== '' && type == "binding") {
            return parseInt(value).toLocaleString('en-IN');
        }
        return value;
    }
}
