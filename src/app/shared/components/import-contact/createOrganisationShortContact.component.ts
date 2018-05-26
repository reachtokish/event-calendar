import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { SEARCH_CONTACT, DELETE_CONTACT, CHECK_DUPLICATE_ORG, CREATE_ORGANISATION, GET_LOCATION_BY_NAME, GET_LOCATION_LIST } from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';
import { DateFormat } from '../../../services/dateAsReq.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'create-organisation-short-contact',
    templateUrl: './createOrganisationShortContact.component.html'
})
export class CreateOrganisationShortContact implements OnInit {

    @ViewChild('organisationForm') organisationForm;
    @ViewChild('landlines') landlines;
    @ViewChild('organisationExistModal') organisationExistModal;
    @Output() onSelectContact = new EventEmitter();

    public organisationCreateContactForm:FormGroup;
    private userData = JSON.parse(localStorage.getItem("storedData"));
    public showError:boolean = false;
    public organisationExist:boolean = false;
    public matcher = new MyErrorStateMatcher();
    public loading:boolean = false;

    public organisationCountry = [];
    public organisationState = [];
    public organisationCity = [];
    public organisationLocation = [];
    public organisationLocationId:any = 0;

    constructor(private fb: FormBuilder, private http: HttpService, private dateFormat: DateFormat) {
        this.buildOrganisationCreateContactForm();
    }

    ngOnInit() { }

    public joinUpdateVal(event, firstObj, secondObj, thirdObj) {
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

    private buildOrganisationCreateContactForm() {
        this.organisationCreateContactForm = this.fb.group({
            companyName: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z ]{1,50}$")])],
            companyType: ["", Validators.required],
            fax: ["", Validators.compose([Validators.pattern("^[0-9+-]{1,15}$")])],
            gst: [""],
            website: ["", Validators.compose([Validators.pattern("^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$")])],
            address: [""],
            otherAddress: this.fb.group({
                building: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,25}$")])],
                streetAddress: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,40}$")])],
                city: ["", Validators.required],
                state: ["", Validators.required],
                country: ["", Validators.required],
                location: ["", Validators.required],
                pincode: ["", Validators.compose([Validators.required, Validators.pattern("^[0-9]{6}$")])]
            })
        });
    }

    public createOrganisation(formData) {
        if(this.organisationCreateContactForm.invalid == true) {
            this.showError = true;
        }
        else {
            this.loading = true;
            this.http.getData(CHECK_DUPLICATE_ORG + formData.value.companyName)
                .subscribe((response) => {
                    if(response["status"] == 200 && response["body"]["status"] == "success" && response["body"]["message"] == "Duplicate") {
                        // this.organisationExist = true;
                        // setTimeout(() => {
                        //     this.organisationExist = false;
                        // }, 3000)
                        this.organisationExistModal.show();
                        setTimeout(() => {
                            this.organisationExistModal.hide();
                        }, 3000)
                        this.loading = false;
                    }
                    else {
                        let createOrgReq = {
                            companyName: formData.value.companyName,
                            companyType: formData.value.companyType,
                            companyFax: formData.value.fax,
                            gstNo: formData.value.gst,
                            webSite: formData.value.website,
                            organisationAddress: {
                                building: formData.value.otherAddress.building,
                                streetAddress: formData.value.otherAddress.streetAddress,
                                pincode: formData.value.otherAddress.pincode,
                                locationMasterBean: {
                                    locationMasterId: this.organisationLocationId == undefined ? "" : this.organisationLocationId
                                }
                            },
                            assignedTo: this.userData.userId,
                            createdBy: this.userData.id,
                            activeStatus: "Online",
                            orgLandLines: this.landlines.lists,
                            contactList: []
                        }
                        console.log(createOrgReq);
                        this.http.postData(CREATE_ORGANISATION, createOrgReq)
                            .subscribe((response) => {
                                this.loading = false;
                                if(response["status"] == 200 && response["body"]["status"] == 'success') {
                                    let outputFormData = {
                                        contactId: response["body"]["contactId"],
                                        companyName: formData.value.companyName,
                                        companyType: formData.value.companyType
                                    }
                                    this.onSelectContact.emit({
                                        type: "Organisation",
                                        contact: outputFormData
                                    })
                                    this.organisationForm.resetForm();
                                    this.buildOrganisationCreateContactForm();
                                    this.landlines.lists = [];
                                }
                                else {

                                }
                            })
                    }
                })
        }
    }


    // populate data for location master

    // populateState(
        // communicationCountry, (select reference)
        // 'communicationState', (state array)
        // 'communicationCity', (city array)
        // 'communicationLocation', (location array)
        // 'communicationLocationMaster', (location master id)
        // 'individualCreateContactForm', (parent form group)
        // 'otherComAddress', (address object)
        // 'state', (state under address object)
        // 'city', (state under address object)
        // 'location' (location under address object)
        // )

    public populateState(countryVal, stateArray, cityArray, locationArray, locationMasterId, form, formSpecificObj, stateControl, cityControl, locationControl) {
        if(countryVal.value != "") {
            this.http.getData(GET_LOCATION_LIST + "?searchFor=stateName&searchBy=country&value=" + countryVal.value)
                .subscribe((response) => {
                    // console.log(response);
                    this[stateArray] = response.body;
                    this[cityArray] = [];
                    this[locationArray] = [];
                    this[locationMasterId] = undefined;
                })
        }
        else {
            this[stateArray] = [];
            this[cityArray] = [];
            this[locationArray] = [];
            this[locationMasterId] = undefined;
            this[form].patchValue({
                [formSpecificObj]: {
                    [stateControl]: "",
                    [cityControl]: "",
                    [locationControl]: ""
                }
            })
        }
    }
    public populateCity(stateVal, cityArray, locationArray, locationMasterId, form, formSpecificObj, cityControl, locationControl) {
        if(stateVal.value != "") {
            this.http.getData(GET_LOCATION_LIST + "?searchFor=city&searchBy=stateName&value=" + stateVal.value)
                .subscribe((response) => {
                    this[cityArray] = response.body;
                    this[locationArray] = [];
                    this[locationMasterId] = undefined;
                })
        }
        else {
            this[cityArray] = [];
            this[locationArray] = [];
            this[locationMasterId] = undefined;
            this[form].patchValue({
                [formSpecificObj]: {
                    [cityControl]: "",
                    [locationControl]: ""
                }
            })
        }
    }
    public populateLocation(cityVal, locationArray, locationMasterId, form, formSpecificObj, locationControl) {
        if(cityVal.value != "") {
            this.http.getData(GET_LOCATION_LIST + "?searchFor=locationName&searchBy=city&value=" + cityVal.value)
                .subscribe((response) => {
                    this[locationArray] = response.body;
                    this[locationMasterId] = undefined;
                })
        }
        else {
            this[locationArray] = [];
            this[locationMasterId] = undefined;
            this[form].patchValue({
                [formSpecificObj]: {
                    [locationControl]: ""
                }
            })
        }
    }
    public getLocationByName(locationVal, cityVal, communicationMasterId) {
        if(locationVal.value != "") {
            this.http.getData(GET_LOCATION_BY_NAME + "?cityName=" + cityVal.value + "&locationName=" + locationVal.value)
                .subscribe((response) => {
                    // console.log(response);
                    this[communicationMasterId] = response.body["locationMasterId"];
                })
        }
        else {
            this[communicationMasterId] = undefined;
        }
    }
    // populate data for location master

}
