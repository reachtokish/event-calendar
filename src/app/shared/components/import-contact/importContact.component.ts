import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { CHECK_DUPLICATE_MOBILE } from "../../../constants/app.constant";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SEARCH_CONTACT, DELETE_CONTACT } from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';

@Component({
    selector: 'import-contact',
    templateUrl: './importContact.component.html',
    styleUrls: ['./importContact.component.scss']
})
export class ImportContact implements OnInit {

    @ViewChild('individualTable') individualTable;
    @ViewChild('organisationTable') organisationTable;
    @Output() onImportContact = new EventEmitter();
    public searchContactForm:FormGroup;
    public contacts:any[] = [];
    public organisation:any[] = [];
    private userData = JSON.parse(localStorage.getItem("storedData"));
    public contactType:string = "Individual";
    public choosedContact;

    public individualContacts:any;
    public organisationContacts:any;
    dtOptionsIndividual: DataTables.Settings = {};
    dtOptionsOrganisation: DataTables.Settings = {};
    @ViewChild(DataTableDirective) dtElement: DataTableDirective;

    constructor(private fb: FormBuilder, private http: HttpService) {
        this.buildSearchContactForm();
    }

    ngOnInit() {
        this.getAllIndividualContacts();
        this.getAllOrganisationContacts();
    }

    buildSearchContactForm() {
        this.searchContactForm = this.fb.group({
            contactType: ["1"],
            searchBy: [""]
        });
    }

    public searchContact() {
        // if(this.searchContactForm.value.contactType == 1) {
        //     setTimeout(() => {
        //         this.individualTable.getAllContacts(this.searchContactForm, true, 'individual');
        //     });
        // }
        // if(this.searchContactForm.value.contactType == 2) {
        //     setTimeout(() => {
        //         this.organisationTable.getAllContacts(this.searchContactForm, true, 'organisation');
        //     });
        // }
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.search(this.searchContactForm.get("searchBy").value);
            setTimeout(() => {
                dtInstance.draw();
            });
        })
    }

    searchTypeChange() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
        });
        this.choosedContact = undefined;
        // if(this.searchContactForm.value.contactType == 1) {
        //     setTimeout(() => {
        //         this.individualTable.getAllContacts(this.searchContactForm, true, 'individual');
        //     })
        // }
        // if(this.searchContactForm.value.contactType == 2) {
        //     setTimeout(() => {
        //         this.organisationTable.getAllContacts(this.searchContactForm, true, 'organisation');
        //     })
        // }
    }

    onOpen() {
        // this.individualTable.getAllContacts(this.searchContactForm, true, 'individual');
        // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     console.log(dtInstance);
        //     dtInstance.draw();
        // })
    }

    getAllIndividualContacts() {
        this.dtOptionsIndividual = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            dom: "lrtip",
            ajax: (dataTablesParameters: any, callback) => {
                let searchParam = dataTablesParameters;
                searchParam.assignedTo = this.userData.userId;
                searchParam.indiOrgValue = 1;
                this.http.postData(SEARCH_CONTACT, dataTablesParameters)
                    .subscribe(resp => {
                        this.individualContacts = resp["body"]["data"];
                        callback({
                            recordsTotal: resp["body"]["recordsTotal"],
                            recordsFiltered: resp["body"]["recordsFiltered"],
                            data: []
                        });
                    });
            }
        };
    }

    getAllOrganisationContacts() {
        this.dtOptionsOrganisation = {
            pagingType: 'full_numbers',
            pageLength: 10,
            serverSide: true,
            processing: true,
            dom: "lrtip",
            ajax: (dataTablesParameters: any, callback) => {
                let searchParam = dataTablesParameters;
                searchParam.assignedTo = this.userData.userId;
                searchParam.indiOrgValue = 2;
                this.http.postData(SEARCH_CONTACT, dataTablesParameters)
                    .subscribe(resp => {
                        this.organisationContacts = resp["body"]["data"];
                        callback({
                            recordsTotal: resp["body"]["recordsTotal"],
                            recordsFiltered: resp["body"]["recordsFiltered"],
                            data: []
                        });
                    });
            }
        };
    }


    chooseContact(singleContact, contactType) {
        this.choosedContact = {
            contact: singleContact,
            type: contactType
        };
    }

    // addContactToFranchise() {
    //     this.onSelectContact.emit({
    //         type: "Individual",
    //         contact: this.choosedContact
    //     })
    // }


    addContactToFranchise() {
        if(this.choosedContact != undefined) {
            if(this.choosedContact.type == "Individual") {
                let data = {
                    contactId: this.choosedContact.contact.contactId,
                    firstName: this.choosedContact.contact.firstName,
                    lastName: this.choosedContact.contact.lastName,
                    mobileNo: this.choosedContact.contact.mobileNo.filter((obj) => {
                        return obj.isPrimary == true || obj.isPrimaryMobile == true
                    }),
                    email: this.choosedContact.contact.email.filter((obj) => {
                        return obj.isPrimary == true || obj.isPrimaryEmail == true
                    }),
                    type: this.choosedContact.type
                }
                this.onImportContact.emit({
                    data: data
                })
            }
            if(this.choosedContact.type == "Organisation") {
                let data = {
                    contactId: this.choosedContact.contact.contactId,
                    companyName: this.choosedContact.contact.companyName,
                    companyType: this.choosedContact.contact.companyType,
                    type: this.choosedContact.type
                }
                this.onImportContact.emit({
                    data: data
                })
            }
        }
    }

    public creationImport(event) {
        console.log(event);
        if(event.type == "Individual") {
            let data = {
                contactId: event.contact.contactId,
                firstName: event.contact.firstName,
                lastName: event.contact.lastName,
                mobileNo: event.contact.mobileNo.filter((obj) => {
                    return obj.isPrimary == true || obj.isPrimaryMobile == true
                }),
                email: event.contact.email.filter((obj) => {
                    return obj.isPrimary == true || obj.isPrimaryEmail == true
                }),
                type: event.type
            }
            this.onImportContact.emit({
                data: data
            })
        }
        if(event.type == "Organisation") {
            let data = {
                contactId: event.contact.contactId,
                companyName: event.contact.companyName,
                companyType: event.contact.companyType,
                type: event.type
            }
            this.onImportContact.emit({
                data: data
            })
        }
    }

}
