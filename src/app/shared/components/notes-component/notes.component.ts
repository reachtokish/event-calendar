import { Component, OnInit, ViewChild } from '@angular/core';
import { CREATE_NOTES, GET_NOTES, DELETE_NOTES } from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';
import { UnauthAccessService } from '../../../services/unauth.service';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../../components/snakbar-component/snakBar.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {

    @ViewChild('createNoteForm') createNoteForm;
    public createNotesForm: FormGroup;
    public notes:any;
    public notesInput = "";
    public loading:boolean = false;
    public matcher = new MyErrorStateMatcher();
    public userData = JSON.parse(localStorage.getItem("storedData"));
    public noteLoading:boolean = false;

    ngOnInit() {
        this.buildNoteForm();
    }

    constructor(private http: HttpService, private fb: FormBuilder, public snackBar: MatSnackBar, private unauth: UnauthAccessService) {
        this.getAllNotes();
    }

    private buildNoteForm() {
        let formData = {
            notes: ["", [Validators.required]]
        }
        this.createNotesForm = this.fb.group(formData);
    }

    public createNotes() {
        if(this.createNoteForm.invalid == false) {
            this.loading = true;
            let createNotes = {
                notesValue: this.createNotesForm.value.notes,
                createdBy: this.userData.id,
                assignedTo: this.userData.userId
            }
            // console.log(createNotes);
            // this.http.postData(CREATE_NOTES, createNotes)
            //     .subscribe((response) => {
            //         // console.log(response);
            //         this.loading = false;
            //         this.createNoteForm.resetForm();
            //         if(response["body"] == "success" && response["status"] == 200) {
            //             this.snackBar.openFromComponent(SnakBarComponent, {
            //                 duration: 1500,
            //                 data: {
            //                     status: "success",
            //                     message: "Notes successfully created"
            //                 }
            //             });
            //             this.getAllNotes();
            //         }
            //         else {
            //             this.snackBar.openFromComponent(SnakBarComponent, {
            //                 duration: 1500,
            //                 data: {
            //                     status: "failure",
            //                     message: "Notes creation failed"
            //                 }
            //             });
            //             this.getAllNotes();
            //         }
            //     })
        }
    }

    private getAllNotes() {
        // this.noteLoading = true;
        // this.http.getData("http://14.142.204.102:8080/rnhadmin/module-api/sec/v1/getAllModule")
        //     .subscribe(
        //         // console.log(response);
        //         // this.noteLoading = false;
        //         // this.notes = response["body"];
        //         response => {
        //             console.log(response)
        //         },
        //         err => {
        //             console.log(err.status)
        //             if(err.status == 404 || err.status == 400 || err.status == 500) {
        //                 this.snackBar.openFromComponent(SnakBarComponent, {
        //                     duration: 3000,
        //                     data: {
        //                         status: "failure",
        //                         message: "Unable to fetch notes. Please check your Internet Connection and try again after some time."
        //                     }
        //                 });
        //             }
        //             if(err.status == 401) {
        //                 this.unauth.doLogout();
        //             }
        //         }
        //     )
    }

    public deleteNote(note) {
        alert();
        // this.http.deleteData(DELETE_NOTES + note.notesId)
        //     .subscribe((response) => {
        //         // console.log(response);
        //     })
    }

}
