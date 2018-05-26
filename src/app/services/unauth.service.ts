import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../shared/components/snakbar-component/snakBar.component';

@Injectable()
export class UnauthAccessService {

    constructor(private router: Router, public snackBar: MatSnackBar) { }

    doLogout() {
        localStorage.removeItem("storedData");
        this.router.navigate(['/login']);
        this.snackBar.openFromComponent(SnakBarComponent, {
            duration: 4000,
            data: {
                status: "failure",
                message: "Unauthorized access is denied due to invalid credentials"
            }
        });
    }

}
