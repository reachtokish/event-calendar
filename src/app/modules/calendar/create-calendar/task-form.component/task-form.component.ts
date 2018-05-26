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
    selector: 'task-form',
    templateUrl: './task-form.component.html',
})

export class TaskFormComponent {

    @Output() onAddData = new EventEmitter();
    @Output() onUpdateData = new EventEmitter();
    @Input('taskData') taskData;

    public taskFormGroup: FormGroup;
    public updateMode:boolean = false;
    public showError:boolean = false;
    public matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.buildCreateEventForm();
    }

    ngOnChanges() {
        console.log(this.taskData);
        this.updateMode = true;
        this.taskFormGroup.patchValue({
            id: this.taskData.id,
            eventName: this.taskData.title,
            eventDescription: this.taskData.description,
            startDate: this.taskData.start,
            startTime: this.taskData.start,
            endDate: this.taskData.end,
            endTime: this.taskData.end
        })
    }

    private buildCreateEventForm() {
        let formData = {
            id: Date.now(),
            dataType: ["Task"],
            eventName: ["", Validators.required],
            eventDescription: ["", Validators.required],
            startDate: ["", Validators.required],
            startTime: ["", Validators.required],
            endDate: ["", Validators.required],
            endTime: ["", Validators.required],
        }
        this.taskFormGroup = this.fb.group(formData);
    }

    public createEvent() {
        if(this.taskFormGroup.invalid == false) {
            if(this.updateMode == false) {
                this.onAddData.emit({
                    data: this.taskFormGroup.value
                })
            }
            else {
                this.onUpdateData.emit({
                    data: this.taskFormGroup.value
                })
            }
        }
        else {
            this.showError = true;
        }
    }

}
