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
    selector: 'reminder-form',
    templateUrl: './reminder-form.component.html',
})

export class ReminderFormComponent {

    @Output() onAddData = new EventEmitter();
    @Output() onUpdateData = new EventEmitter();
    @Input('reminderData') reminderData;

    public reminderFormGroup: FormGroup;
    public minDate = new Date();
    public updateMode:boolean = false;
    public maxDay = new Date();
    public showError:boolean = false;
    public matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.buildReminderForm();
        this.maxDay.setHours(23);
        this.maxDay.setMinutes(59);
    }

    ngOnChanges() {
        console.log(this.reminderData);
        this.updateMode = true;
        this.reminderFormGroup.patchValue({
            id: this.reminderData.id,
            eventName: this.reminderData.title,
            eventDescription: this.reminderData.description,
            startDate: this.reminderData.start,
            startTime: this.reminderData.start
        })
    }

    private buildReminderForm() {
        let formData = {
            id: Date.now(),
            dataType: ["Reminder"],
            eventName: ["", Validators.required],
            eventDescription: ["", Validators.required],
            startDate: ["", Validators.required],
            startTime: ["", Validators.required]
        }
        this.reminderFormGroup = this.fb.group(formData);
    }

    public createReminder() {
        if(this.reminderFormGroup.invalid == false) {
            if(this.updateMode == false) {
                this.onAddData.emit({
                    data: this.reminderFormGroup.value
                })
            }
            else {
                this.onUpdateData.emit({
                    data: this.reminderFormGroup.value
                })
            }
        }
        else {
            this.showError = true;
        }
    }

}
