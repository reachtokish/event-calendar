import { Component, OnInit } from '@angular/core';
import { USER_LOGIN, SERVER_ERROR } from '../../../../constants/app.constant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../../../../shared/components/snakbar-component/snakBar.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Rx";

interface Obj {
    body: string;
    id: number;
    title: string;
    userId: number;
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginChecking: boolean;
    public loginFormGroup:FormGroup;
    public showError:boolean = false;

    // private data: Observable<Array<any>>;

    constructor(private router: Router, private https:HttpClient, public snackBar: MatSnackBar, private fb: FormBuilder) {
        this.buildLoginForm();
    }

    ngOnInit() {

        // this.data  = this.https.get("http://14.142.204.102:8080/rnhadmin/franchise-config-api/sec/v1/searchFranchise?assignedTo=superadmin@rainehorne.com&leadFranchiseValue=Lead&activeStatus=Online&searchByValue=")
        //     .map(res => res as any[])

        this.loginChecking = false;

    }

    buildLoginForm() {
        let formData = {
            userId: ["", Validators.required],
            password: ["", Validators.required]
        };
        this.loginFormGroup = this.fb.group(formData);
    }

    // check login
    doLogin() {
        if(this.loginFormGroup.invalid == true) {
            this.showError = true;
        }
        else {
            this.loginChecking = true;

            const httpOptions = new HttpHeaders({
                'DEVICE_ID':  '',
                'DEVICE_TYPE': 'WEB'
            })

            this.https.post(USER_LOGIN, this.loginFormGroup.value, {headers: httpOptions, observe: 'response'})
            //     .catch((e) => {
            //         return Observable.throw(e);
            //     })
            //     .subscribe(
            //         result => {
            //             console.log(result);
            //         },
            //         err => {
            //             console.log(err)
            //         }
            //     );
                .subscribe((response) => {
                    console.log(response);
                    this.loginChecking = false;
                    if(response["status"] == 200 && response["body"]["status"] == "Login Verification Success") {
                        localStorage.setItem("storedData", JSON.stringify(response["body"]));
                        this.router.navigate(['/create-franchise']);
                        this.snackBar.openFromComponent(SnakBarComponent, {
                            duration: 2500,
                            data: {
                                status: "success",
                                message: "You have successfully logged in"
                            }
                        });
                    }
                    else {
                        this.snackBar.openFromComponent(SnakBarComponent, {
                            duration: 2500,
                            data: {
                                status: "failure",
                                message: "Authentication failed. Please provide valid userid and password."
                            }
                        });
                    }
                })
        }
    }

}
