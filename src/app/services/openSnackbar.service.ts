import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../shared/components/snakbar-component/snakBar.component';

@Injectable()
export class OpenSnackService {

    constructor(public snackBar: MatSnackBar) { }

    doOpen(component, duration, status, message) {
        this.snackBar.openFromComponent(component, {
            duration: duration,
            data: {
                status: status,
                message: message
            }
        });
    }

}
