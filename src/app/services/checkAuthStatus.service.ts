import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../shared/components/snakbar-component/snakBar.component';
import { Router } from '@angular/router';
import { UnauthAccessService } from './unauth.service';

@Injectable()
export class AuthStatus {

    constructor(public snackBar: MatSnackBar,
            private router: Router,
            private doUnAuth: UnauthAccessService) { }

    check(response, failureMessage) {
        console.log(response);
        if(response.error.status == 404 || response.error.status == 400 || response.error.status == 203 || response.error.status == 403) {
            this.snackBar.openFromComponent(SnakBarComponent, {
                duration: 4000,
                data: {
                    status: "failure",
                    message: failureMessage
                }
            });
        }
        if(response.error.status == 401) {
            this.doUnAuth.doLogout();
        }
    }

}
