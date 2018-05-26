import { Component, ViewChild,OnInit} from '@angular/core';
import { UPLOAD_DOCUMENTS, DELETE_DOCUMENTS, GET_DOCUMENTS} from "../../../constants/app.constant";
import { HttpService } from '../../../services/http.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from "rxjs/Rx";
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
  selector: 'documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})

export class DocumentsComponent implements OnInit {

    public userData = JSON.parse(localStorage.getItem("storedData"));
    public createDocumentForm: FormGroup;
    public matcher = new MyErrorStateMatcher();
    public file;
    public documents:any = [];
    public deleting:boolean = false;
    public uploading:boolean = false;

    @ViewChild('childModal') childModal: ModalDirective;
    public docName="";
    public upload:boolean=false;
    public uploadedfile: string = null;

    constructor(private http: HttpService, private fb: FormBuilder, public snackBar: MatSnackBar) {
        this.buildDocumentForm();
    }

    private buildDocumentForm() {
        let formData = {
            uploadedDoc: [""],
            assignedTo: [this.userData.userId],
            createdBy: [this.userData.id],
            uploadedDocName: [""],
            documentName: ["", [Validators.required]]
        }
        this.createDocumentForm = this.fb.group(formData);
    }

    public browseDocumentFile(event) {
        var input = event.target.files;
        var reader = new FileReader();
        reader.onload = () => {
            var dataURL = reader.result;
            this.createDocumentForm.patchValue({
                uploadedDoc: dataURL,
                uploadedDocName: event.target.files[0].name.substring(0, event.target.files[0].name.lastIndexOf("."))
            })
            setTimeout(() => {
                event.target.value = "";
            });
        };
        reader.readAsDataURL(input[0]);
    }

    public removeFile() {
        this.createDocumentForm.patchValue({
            uploadedDoc: "",
            uploadedDocName: ""
        })
    }

    public createDocument() {
        this.uploading = true;
        // this.http.postData(UPLOAD_DOCUMENTS, this.createDocumentForm.value)
        //     .subscribe((response) => {
        //         // console.log(response);
        //         this.uploading = false;
        //         if(response["status"] == 200 && response["body"] == "success") {
        //             this.snackBar.openFromComponent(SnakBarComponent, {
        //                 duration: 1500,
        //                 data: {
        //                     status: "success",
        //                     message: "Document successfully uploaded"
        //                 }
        //             });
        //             this.getDocument();
        //         }
        //         else {
        //             this.snackBar.openFromComponent(SnakBarComponent, {
        //                 duration: 1500,
        //                 data: {
        //                     status: "failure",
        //                     message: "Document Upload Failed"
        //                 }
        //             });
        //         }
        //     })
    }

    public getDocument() {
        // this.http.getData(GET_DOCUMENTS + this.userData.userId)
        //     .subscribe((response) => {
        //         // console.log(response);
        //         this.documents = response["body"];
        //     })
    }

    public deleteDocument(document) {
        this.deleting = true;
        // this.http.deleteData(DELETE_DOCUMENTS + document.documentsId)
        //     .subscribe((response) => {
        //         // console.log(response);
        //         this.deleting = false;
        //         if(response["status"] == 200 && response["body"] == "success") {
        //             this.snackBar.openFromComponent(SnakBarComponent, {
        //                 duration: 1500,
        //                 data: {
        //                     status: "success",
        //                     message: "Document Deleted Successfully"
        //                 }
        //             });
        //             this.getDocument();
        //         }
        //         else {
        //             this.snackBar.openFromComponent(SnakBarComponent, {
        //                 duration: 1500,
        //                 data: {
        //                     status: "failure",
        //                     message: "Document Deletion Failed"
        //                 }
        //             });
        //         }
        //     })
    }



    ngOnInit(){

        this.getDocument();

        this.uploadedfile;
        let documentArr;
        let getDocuments=GET_DOCUMENTS+"kumar";
        // this.http.getData(getDocuments)
        //     .subscribe((response) => {
        //         // console.log("array ="+response["body"]);
        //         documentArr=response["body"];
        //         for(let i=0;i<documentArr.length;i++){
        //             let newNotes = {
        //                 documentType: documentArr[i].documentName,
        //                 fileName: documentArr[i].uploadedDoc,
        //                 documentId: documentArr[i].documentsId
        //             }
        //             this.documents.push(newNotes);
        //         }
        //     });
    }
    readThis(inputValue: any): void {
        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.uploadedfile = myReader.result;
            // console.log("myreader = "+myReader.result )
        }
        myReader.readAsDataURL(file);
    }
    checkDuplicateFileName(documents, filename):Observable<boolean>{
        let ret:boolean = false;
        for(var i = 0; i < documents.length; i++) {
            if(filename == documents[i].documentType) {
                ret = true;
                break;
            }
            else {
                ret = false;
            }
        }
        return Observable.of(ret);
    }
    path:string="";
    filename:string="";
    event:EventTarget;
    fileVal:HTMLInputElement;
    browseFile(file: HTMLInputElement,$event) {
        this.path = file.value;
        this.filename = this.path.replace(/^.*[\\\/]/, '');
        let documents = this.documents;
        this.fileVal=file;
        event=$event;
        this.upload=true;
    }
    updateFile() {
        let documents = this.documents;
        // this.checkDuplicateFileName(documents, this.docName)
        //     .subscribe((res) => {
        //         if(res == false) {
        //             this.readThis(this.fileVal);
        //             let documentData = {
        //                 documentName:this.docName,
        //                 uploadedDoc: this.uploadedfile,
        //                 createdBy: "Marco John",
        //                 assignedTo: "kumar",
        //                 uploadedDocName:this.filename
        //             }
        //             this.http.postData(UPLOAD_DOCUMENTS, documentData)
        //                 .subscribe((response) => {
        //                     // console.log(response["body"]);
        //                     if (response["body"] != 0) {
        //                         let docProperty={
        //                             documentType: this.docName,
        //                             fileName: documentData.uploadedDocName,
        //                             documentId:response["body"]
        //                         }
        //                         this.documents.push(docProperty);
        //                     }
        //                     else {
        //                         this.childModal.show();
        //                         setTimeout(() => {
        //                             this.childModal.hide();
        //                         }, 3000)
        //                     }
        //                 })
        //             this.upload=false;
        //         }
        //         else {
        //             alert("Sorry a document with the same name already exists");
        //             this.upload=false;
        //         }
        //     })
    }
    deleteDocuments(inds: string,file: HTMLInputElement) {
        let docId=this.documents[inds].documentId;
        // console.log(inds+"file "+this.documents[inds].documentId);
        // this.http.deleteData(DELETE_DOCUMENTS+docId)
        // .subscribe((response) => {
        //     this.documents[inds]="";
        // })
    }
}
