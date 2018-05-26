import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../../../../shared/components/snakbar-component/snakBar.component';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'view-calendar',
    templateUrl: './view-calendar.component.html',
    styleUrls: ['./view-calendar.component.scss']
})

export class ViewCalendarComponent {

    @Output() onAddData = new EventEmitter();
    @Output() onUpdateData = new EventEmitter();
    @Input('calendarData') calendarData;

    public taskFormGroup: FormGroup;
    public updateMode:boolean = false;
    public showError:boolean = false;

    constructor() { }

    ngOnChanges() {
        console.log(this.calendarData);
    }

}
