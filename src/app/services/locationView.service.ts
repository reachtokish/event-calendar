import { Injectable } from '@angular/core';

@Injectable()
export class LocationView {

    constructor() { }

    convertToLocation(obj) {

        let address = "";

        if(obj.building != "") {
            address += obj.building+", "
        }
        if(obj.streetAddress != "") {
            address += obj.streetAddress+", "
        }
        if(obj.locationMasterBean.locationName != "") {
            address += obj.locationMasterBean.locationName+", "
        }
        if(obj.locationMasterBean.city != "") {
            address += obj.locationMasterBean.city+", "
        }
        if(obj.locationMasterBean.stateName != "") {
            address += obj.locationMasterBean.stateName+", "
        }
        if(obj.locationMasterBean.country != "") {
            address += obj.locationMasterBean.country+", "
        }
        if(obj.pincode != "") {
            address += obj.pincode+", "
        }

        address = address.slice(0, -2);

        // console.log(address);

        return address;
    }

}
