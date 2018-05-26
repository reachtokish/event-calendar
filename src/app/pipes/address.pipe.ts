import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addressTransform',
})

export class AddressPipe implements PipeTransform {

    transform(value:string) {
        console.log(value['building']);

        let address = "";

        if(value['building'] != "") {
            address += value['building']+", "
        }
        if(value['streetAddress'] != "") {
            address += value['streetAddress']+", "
        }
        if(value['locationMasterBean'].locationName != "") {
            address += value['locationMasterBean'].locationName+", "
        }
        if(value['locationMasterBean'].city != "") {
            address += value['locationMasterBean'].city+", "
        }
        if(value['locationMasterBean'].stateName != "") {
            address += value['locationMasterBean'].stateName+", "
        }
        if(value['locationMasterBean'].country != "") {
            address += value['locationMasterBean'].country+", "
        }
        if(value['pincode'] != "") {
            address += value['pincode']+", "
        }

        address = address.slice(0, -2);

        if(address == '') {
            address = '-';
        }

        return address;
    }

}
