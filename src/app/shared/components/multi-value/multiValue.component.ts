import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CHECK_DUPLICATE_MOBILE, CHECK_DUPLICATE_EMAIL_ID, GET_SINGLE_CONTACT } from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'multi-value',
    templateUrl: './multiValue.component.html',
    styleUrls: ['./multi-value.scss']
})
export class MultiValue implements OnInit {

	@ViewChild('inputCtrl') inputCtrl;
    @ViewChild('existModal') existModal;
    @Input() update;
    @Input() firstKey;
    @Input() secondKey;
    @Input() type;
    @Input() max;
    @Input() existRedirect;
    @Input() redirectUrl;
    @Input() contactType;
    @Input() imports;
    @Output() openImportModal = new EventEmitter();
    public alreadyExistInList:boolean = false;
    public maxNumberExceeds:boolean = false;
    public alreadyExistInDb:boolean = false;
    public inputCtrlModel = "";
    public toUpdateObj = {};
    public lists:any = [];
    private toUpdateData;
    public existRedirectUrl:string = "";
    public individualContactsId = "";
    public loading:boolean = false;
    httpOptions;
    // @Output() indFormValid = new EventEmitter();
    // @Output() createResponseStatus = new EventEmitter();

    // private mobileServiceUrl:string = "http://14.142.204.102:8080/rnhadmin/contact-api/checkDuplicateMobile?mobileNo=";
    // private emailServiceUrl:string = "http://14.142.204.102:8080/rnhadmin/contact-api/checkDuplicateEmail?mailId=";

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.httpOptions = new HttpHeaders({
            'Content-Type': 'application/json',
            'AUTH_TOKEN': JSON.parse(localStorage.getItem("storedData")).authToken,
            'DEVICE_ID': '',
            'DEVICE_TYPE': 'WEB'
        });
    }

    addorUpdateEmail(inputVal) {
        this.loading = true;
    	this.hidealerts();
    	if(this.toUpdateObj[this.firstKey] && this.toUpdateObj[this.firstKey] != "") {
	    	let checkDuplicateInList = this.lists.filter((obj) => {
	    		return obj[this.firstKey] == inputVal;
	    	});
	    	if(checkDuplicateInList.length <= 0) {
	    		switch(this.type) {
   					case 'mobile': {
   						this.http.get(CHECK_DUPLICATE_MOBILE + inputVal, {headers: this.httpOptions})
   							.subscribe((response) => {
                                this.loading = false;
   								if(response["status"] == "success" && response["message"] == "Unique") {
   									let getExactObjFromList = this.lists.filter((obj) => {
   										return obj[this.firstKey] == this.toUpdateObj[this.firstKey];
   									});
   									getExactObjFromList[0][this.firstKey] = inputVal;
   									this.inputCtrlModel = "";
   									this.toUpdateObj = {};
   								}
   								else {
                                    if(this.imports != true) {
                                        if(this.existRedirect == true) {
                                            this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                        }
                                        else {
                                            this.alreadyExistInDb = true;
                                        }
                                    }
                                    if(this.imports == true) {
                                        this.openExistModal(true, 'NA', this.contactType, response["contactsId"]);
                                    }
                                }
   							});
      					break;
   					}
   					case 'email': {
      					this.http.get(CHECK_DUPLICATE_EMAIL_ID + inputVal, {headers: this.httpOptions})
   							.subscribe((response) => {
                                this.loading = false;
   								if(response["status"] == "success" && response["message"] == "Unique") {
   									let getExactObjFromList = this.lists.filter((obj) => {
   										return obj[this.firstKey] == this.toUpdateObj[this.firstKey];
   									});
   									getExactObjFromList[0][this.firstKey] = inputVal;
   									this.inputCtrlModel = "";
   									this.toUpdateObj = {};
   								}
   								else {
   									if(this.existRedirect == true) {
                                        this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                    }
                                    else {
                                        this.alreadyExistInDb = true;
                                    }
   								}
   							});
      					break;
   					}
                    case 'landline': {
                        this.loading = false;
                        if(this.secondKey != "NA") {
                            if(this.lists.length <= 0) {
                                this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:true });
                            }
                            else {
                                this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:false });
                            }
                            this.inputCtrlModel = "";
                        }
                        else {
                            if(this.lists.length <= 0) {
                                this.lists.push({ [this.firstKey]:inputVal });
                            }
                            else {
                                this.lists.push({ [this.firstKey]:inputVal });
                            }
                        }
                        break;
                    }
   					default: {
                        this.loading = false;
   						let getExactObjFromList = this.lists.filter((obj) => {
							return obj[this.firstKey] == this.toUpdateObj[this.firstKey];
						});
						getExactObjFromList[0][this.firstKey] = inputVal;
						this.inputCtrlModel = "";
						this.toUpdateObj = {};
      					break;
   					}
				}
		    }
		    else {
                this.alreadyExistInList = true;
                this.loading = false;
		    }
    	}

        //////////////////////////////////////////
    	else {
	    	if(this.lists.length <= this.max-1) {
		    	let checkDuplicateInList = this.lists.filter((obj) => {
		    		return obj[this.firstKey] == inputVal;
		    	});
		    	if(checkDuplicateInList.length <= 0) {
		    		switch(this.type) {
	   					case 'mobile': {
	   						this.http.get(CHECK_DUPLICATE_MOBILE + inputVal, {headers: this.httpOptions})
	   							.subscribe((response) => {
                                    this.loading = false;
	   								if(response["status"] == "success" && response["message"] == "Unique") {
	   									if(this.secondKey != "NA") {
								    		if(this.lists.length <= 0) {
								        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:true });
								        	}
								        	else {
								        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:false });
								        	}
								        	this.inputCtrlModel = "";
								        }
								        else {
								    		if(this.lists.length <= 0) {
								        		this.lists.push({ [this.firstKey]:inputVal });
								        	}
								        	else {
								        		this.lists.push({ [this.firstKey]:inputVal });
								        	}
								        }
	   								}
	   								else {
                                        if(this.imports != true) {
                                            if(this.existRedirect == true) {
                                                this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                            }
                                            else {
                                                this.alreadyExistInDb = true;
                                            }
                                        }
                                        if(this.imports == true) {
                                            this.openExistModal(true, 'NA', this.contactType, response["contactsId"]);
                                        }
	   								}
	   							});
	      					break;
	   					}
	   					case 'email': {
	      					this.http.get(CHECK_DUPLICATE_EMAIL_ID + inputVal, {headers: this.httpOptions})
	   							.subscribe((response) => {
                                    this.loading = false;
                                       if(response["status"] == "success" && response["message"] == "Unique") {
                                           if(this.secondKey != "NA") {
                                            if(this.lists.length <= 0) {
                                                this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:true });
                                            }
                                            else {
                                                this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:false });
                                            }
                                            this.inputCtrlModel = "";
                                        }
                                        else {
                                            if(this.lists.length <= 0) {
                                                this.lists.push({ [this.firstKey]:inputVal });
                                            }
                                            else {
                                                this.lists.push({ [this.firstKey]:inputVal });
                                            }
                                        }
                                       }
                                       else {
                                        if(this.imports != true) {
                                            if(this.existRedirect == true) {
                                                this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                            }
                                            else {
                                                this.alreadyExistInDb = true;
                                            }
                                        }
                                        if(this.imports == true) {
                                            this.openExistModal(true, 'NA', this.contactType, response["contactsId"]);
                                        }
                                    }
	   							});
	      					break;
	   					}
                        case 'landline': {
                            this.loading = false;
							if(this.secondKey != "NA") {
					    		if(this.lists.length <= 0) {
					        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:true });
					        	}
					        	else {
					        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:false });
					        	}
					        	this.inputCtrlModel = "";
					        }
					        else {
					    		if(this.lists.length <= 0) {
					        		this.lists.push({ [this.firstKey]:inputVal });
					        	}
					        	else {
					        		this.lists.push({ [this.firstKey]:inputVal });
					        	}
					        }
	      					break;
	   					}
	   					default: {
                            this.loading = false;
							if(this.secondKey != "NA") {
					    		if(this.lists.length <= 0) {
					        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:true });
					        	}
					        	else {
					        		this.lists.push({ [this.firstKey]:inputVal, [this.secondKey]:false });
					        	}
					        	this.inputCtrlModel = "";
					        }
					        else {
					    		if(this.lists.length <= 0) {
					        		this.lists.push({ [this.firstKey]:inputVal });
					        	}
					        	else {
					        		this.lists.push({ [this.firstKey]:inputVal });
					        	}
					        	this.inputCtrlModel = "";
					        }
	      					break;
	   					}
					}
			    }
			    else {
			    	this.alreadyExistInList = true;
                    this.loading = false;
			    }
			}
			else {
				this.maxNumberExceeds = true;
                this.loading = false;
			}
		}
    }

    deleteEmail(obj, index) {
    	this.lists.splice(index, 1);
    	this.inputCtrlModel = "";
    	this.hidealerts();
        if(obj.isPrimaryMobile != undefined && obj.isPrimaryMobile == true) {
            if(this.lists.length > 0) {
                this.lists[0].isPrimaryMobile = true;
            }
        }
        if(obj.isPrimaryLandLine != undefined && obj.isPrimaryLandLine == true) {
            if(this.lists.length > 0) {
                this.lists[0].isPrimaryLandLine = true;
            }
        }
        if(obj.isPrimaryEmail != undefined && obj.isPrimaryEmail == true) {
            if(this.lists.length > 0) {
                this.lists[0].isPrimaryEmail = true;
            }
        }
    }

    hidealerts() {
    	this.alreadyExistInList = false;
    	this.maxNumberExceeds = false;
    	this.alreadyExistInDb = false;
    }

    updateClick(ctrlValue, obj) {
        if(this.update == true) {
        	this.inputCtrlModel = obj[this.firstKey];
        	this.toUpdateObj = obj;
        	this.hidealerts();
            this.toUpdateData = obj;
        }
    }

    updateEmail(val) {
        this.loading = true;
        if(this.toUpdateData[this.firstKey] == val) {
            this.loading = false;
            let actualObj = this.lists.filter((obj) => {
                return obj[this.firstKey] == this.toUpdateData[this.firstKey];
            })
            actualObj[0][this.firstKey] = val;
            this.inputCtrlModel = "";
            this.toUpdateData = {};
            this.toUpdateObj = {};
        }
        else {
            let existOrNotInList = this.lists.filter((obj) => {
                return obj[this.firstKey] == val;
            })
            if(existOrNotInList <= 0) {
                let actualObj = this.lists.filter((obj) => {
                    return obj[this.firstKey] == this.toUpdateData[this.firstKey];
                })
                switch(this.type) {
                    case 'mobile': {
                        this.http.get(CHECK_DUPLICATE_MOBILE + val, {headers: this.httpOptions})
                            .subscribe((response) => {
                                this.loading = false;
                               if(response["status"] == "success" && response["message"] == "Unique") {
                                    actualObj[0][this.firstKey] = val;
                                    this.inputCtrlModel = "";
                                    this.toUpdateData = {};
                                    this.toUpdateObj = {};
                                }
                                else {
                                    if(this.existRedirect == true) {
                                        this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                    }
                                    else {
                                        this.alreadyExistInDb = true;
                                    }
                                }
                            });
                        break;
                    }
                    case 'email': {
                        this.http.get(CHECK_DUPLICATE_EMAIL_ID + val, {headers: this.httpOptions})
                            .subscribe((response) => {
                                this.loading = false;
                                if(response["status"] == "success" && response["message"] == "Unique") {
                                    actualObj[0][this.firstKey] = val;
                                    this.inputCtrlModel = "";
                                    this.toUpdateData = {};
                                    this.toUpdateObj = {};
                                }
                                else {
                                    if(this.existRedirect == true) {
                                        this.openExistModal(false, this.redirectUrl, this.contactType, response["contactsId"]);
                                    }
                                    else {
                                        this.alreadyExistInDb = true;
                                    }
                                }
                            });
                        break;
                    }
                }
            }
            else {
                this.alreadyExistInList = true;
                this.loading = false;
            }
        }
    }

    openExistModal(imports, url, contactType, contactId) {
        if(imports != true) {
            this.existModal.show();
            this.existRedirectUrl = "/" + url + "/" + contactId + "/" + contactType;
        }
        if(imports == true) {
            this.openImportModal.emit({
                contactType: contactType,
                contactId: contactId
            })
        }
    }

    makePrimary(index) {
        for(let i = 0; i < this.lists.length; i++) {
            this.lists[i][this.secondKey] = false;
        }
        this.lists[index][this.secondKey] = true;
    }

}
