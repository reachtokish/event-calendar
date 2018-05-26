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
    selector: 'event-form',
    templateUrl: './event-form.component.html',
})

export class EventFormComponent {

    @Output() onAddData = new EventEmitter();
    @Output() onUpdateData = new EventEmitter();
    @Input('eventData') eventData;

    public createEventGroup: FormGroup;
    public updateMode:boolean = false;
    public showError:boolean = false;
    public matcher = new MyErrorStateMatcher();

    constructor(private fb: FormBuilder) {
        this.buildCreateEventForm();
    }

    ngOnChanges() {
        console.log(this.eventData);
        this.updateMode = true;
        this.createEventGroup.patchValue({
            id: this.eventData.id,
            eventName: this.eventData.title,
            eventDescription: this.eventData.description,
            startDate: this.eventData.start,
            startTime: this.eventData.start,
            endDate: this.eventData.end,
            endTime: this.eventData.end
        })
    }

    private buildCreateEventForm() {
        let formData = {
            id: Date.now(),
            dataType: ["Event"],
            eventName: ["", Validators.required],
            eventDescription: ["", Validators.required],
            startDate: ["", Validators.required],
            startTime: ["", Validators.required],
            endDate: ["", Validators.required],
            endTime: ["", Validators.required]
        }
        this.createEventGroup = this.fb.group(formData);
    }

    public createEvent() {
        if(this.createEventGroup.invalid == false) {
            if(this.updateMode == false) {
                this.onAddData.emit({
                    data: this.createEventGroup.value
                })
            }
            else {
                this.onUpdateData.emit({
                    data: this.createEventGroup.value
                })
            }
        }
        else {
            this.showError = true;
        }
    }

}
