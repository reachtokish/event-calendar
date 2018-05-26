import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { SEARCH_CONTACT, DELETE_CONTACT, CREATE_CONTACT, GET_LOCATION_LIST, GET_LOCATION_BY_NAME } from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';
import { DateFormat } from '../../../services/dateAsReq.service';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../snakbar-component/snakBar.component';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'create-individual-short-contact',
    templateUrl: './createIndividualShortContact.component.html'
})
export class CreateIndividualShortContact implements OnInit {

    @ViewChild('mobileIds') mobileIds;
    @ViewChild('landlines') landlines;
    @ViewChild('emailids') emailids;
    @ViewChild('invdForm') invdForm;
    @Output() onSelectContact = new EventEmitter();

    public individualCreateContactForm:FormGroup;
    private userData = JSON.parse(localStorage.getItem("storedData"));
    public today = new Date();
    public maxDay = new Date(this.today.setDate(this.today.getDate() - (18*365)));
    public showError:boolean = false;
    public noContactType:boolean = false;
    public mobileEmpty:boolean = false;
    public emailEmpty:boolean = false;
    public matcher = new MyErrorStateMatcher();
    public loading:boolean = false;

    public communicationCountry = [];
    public communicationState = [];
    public communicationCity = [];
    public communicationLocation = [];
    public communicationLocationMaster:any = 0;

    public residentialCountry = [];
    public residentialState = [];
    public residentialCity = [];
    public residentialLocation = [];
    public residentialLocationMaster:any = 0;

    constructor(private fb: FormBuilder, private http: HttpService, public snackBar: MatSnackBar, private dateFormat: DateFormat) {
        this.buildIndividualCreateContactForm();
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

    private buildIndividualCreateContactForm() {
        let formData = {
            title: [""],
            firstName: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z ]{1,20}$")])],
            lastName: ["", Validators.compose([Validators.pattern("^[a-zA-Z ]{1,20}$")])],
            nationality: ["Indian"],
            panCardNumber: ["", Validators.compose([Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$")])],
            dob: [""],
            contactType: ["", Validators.compose([Validators.required])],
            ownAHouse: [0],
            profession: [""],
            otherProfession: this.fb.group({
                profession: ["", Validators.compose([Validators.maxLength(20)])],
                organization: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 ]{1,30}$")])],
                designation: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 ]{1,20}$")])],
                department: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 ]{1,30}$")])]
            }),
            mobileNumber: ["", Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^[0-9]+$")])],
            landline: ["", Validators.compose([Validators.maxLength(15), Validators.minLength(10), Validators.pattern("^[0-9-]+$")])],
            email: ["", Validators.compose([Validators.maxLength(50), Validators.minLength(6), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])],
            comunicationAddress: [""],
            otherComAddress: this.fb.group({
                building: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,30}$")])],
                streetAddress: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,255}$")])],
                city: [""],
                state: [""],
                country: [""],
                location: [""],
                pincode: ["", Validators.compose([Validators.pattern("^[0-9]{6}$")])]
            }),
            residentialAddress: [""],
            otherResAddress: this.fb.group({
                building: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,30}$")])],
                streetAddress: ["", Validators.compose([Validators.pattern("^[a-zA-Z0-9 -()=+,.;]{1,255}$")])],
                city: [""],
                state: [""],
                country: [""],
                location: [""],
                pincode: ["", Validators.compose([Validators.pattern("^[0-9]{6}$")])]
            }),
            assignedTo: ""
        }
        this.individualCreateContactForm = this.fb.group(formData);
    }

    onSubmit(event, formData) {
        if(this.individualCreateContactForm.invalid == true && formData.contactType == "" && this.mobileIds.lists.length <= 0 && this.emailids.lists.length <= 0) {
            this.showError = true;
            this.noContactType = true;
        }
        else if(this.individualCreateContactForm.invalid == true && formData.contactType == "SMS" && this.mobileIds.lists.length <= 0 || formData.contactType == "SMS" && this.mobileIds.lists.length <= 0) {
            this.mobileEmpty = true;
            this.emailEmpty = false;
        }
        else if(this.individualCreateContactForm.invalid == true && formData.contactType == "Email" && this.emailids.lists.length <= 0 || formData.contactType == "Email" && this.emailids.lists.length <= 0) {
            this.mobileEmpty = false;
            this.emailEmpty = true;
        }
        else {
            this.loading = true;
            this.showError = false;
            this.mobileEmpty = false;
            this.emailEmpty = false;
            this.noContactType = false;
            let individualContactReq = {
                title: formData.title,
                firstName: formData.firstName,
                lastName: formData.lastName,
                nationality: formData.nationality,
                panCard: formData.panCardNumber,
                dateOfBirth: this.dateFormat.format(formData.dob),
                contactType: formData.contactType,
                ownAHouse: formData.ownAHouse,
                customerProfessionalInfo: {
                    profession: formData.otherProfession.profession,
                    organisation: formData.otherProfession.organization,
                    designation: formData.otherProfession.designation,
                    department: formData.otherProfession.department
                },
                customerAddress: {
                    building: formData.otherComAddress.building,
                    streetAddress: formData.otherComAddress.streetAddress,
                    pincode: formData.otherComAddress.pincode,
                    locationMasterBean:{
                        locationMasterId: this.communicationLocationMaster == undefined ? "" : this.communicationLocationMaster
                    }
                },
                customerResidenceAddress: {
                    building: formData.otherResAddress.building,
                    streetAddress: formData.otherResAddress.streetAddress,
                    pincode: formData.otherResAddress.pincode,
                    locationMasterBean:{
                        locationMasterId: this.residentialLocationMaster == undefined ? "" : this.residentialLocationMaster
                    }
                },
                customerFamilyInfo: {
                    monthlyFamilyIncome: "",
                    anniversaryDate: "",
                    spouseName: "",
                    spouseDob: "",
                    spouseProfession: "",
                    spouseOrganization: "",
                    countryOfResidence: "",
                    nativePlace: "",
                    children: []
                },
                customerMobiles: this.mobileIds.lists,
                customerEmails: this.emailids.lists,
                customerLandLines: this.landlines.lists,
                createdBy: this.userData.id,
                activeStatus: "Online",
                assignedTo: this.userData.userId
            }
            console.log(individualContactReq);
            this.http.postData(CREATE_CONTACT, individualContactReq)
                .subscribe((response) => {
                    this.loading = false;
                    console.log(response);
                    if(response["status"] == 200) {
                        if(response["body"]["status"] == "success") {
                            this.snackBar.openFromComponent(SnakBarComponent, {
                                duration: 1500,
                                data: {
                                    status: "success",
                                    message: "Contact created successfully"
                                }
                            });
                            let outputFormData = {
                                contactId: response["body"]["contactId"],
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: this.emailids.lists,
                                mobileNo: this.mobileIds.lists
                            };
                            this.onSelectContact.emit({
                                type: "Individual",
                                contact: outputFormData
                            })
                            this.invdForm.resetForm();
                            this.buildIndividualCreateContactForm();
                            this.mobileIds.lists = [];
                            this.emailids.lists = [];
                            this.landlines.lists = [];
                        }
                    }
                    if(response["status"] == 401 || response["status"] == 500) {

                    }
                    else {

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
