import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Output, Input, TemplateRef } from '@angular/core';
import { GET_NAVIGATIONS, DELETE_CALENDAR_EVENT, CREATE_CALENDAR, GET_CALENDAR_EVENT, UPDATE_CALENDAR } from "../../../../constants/app.constant";
import { HttpService } from '../../../../services/http.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { CalendarEvent } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { EventEmitter } from 'events';
import { MatSnackBar } from '@angular/material';
import { SnakBarComponent } from '../../../../shared/components/snakbar-component/snakBar.component';
import { Subject } from 'rxjs/Subject';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

const colors: any = {
    event: {
        primary: '#00b1ff',
        secondary: '#B2E8FF'
    },
    reminder: {
        primary: '#f000e7',
        secondary: '#EFA7EC'
    },
    task: {
        primary: '#fcaf17',
        secondary: '#eed29a'
    }
};

@Component({
    selector: 'create-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './createCalendar.component.html',
    styleUrls: ['./createCalendar.component.scss']
})

export class CreateCalendarComponent implements OnInit {

    @ViewChild('editEventModalTemplate') editEventModalTemplate: TemplateRef<any>;
    @ViewChild('editTaskModalTemplate') editTaskModalTemplate: TemplateRef<any>;
    @ViewChild('editReminderModalTemplate') editReminderModalTemplate: TemplateRef<any>;
    @ViewChild('viewCalendarTemplate') viewCalendarTemplate: TemplateRef<any>;

    public view: string = 'month';
    public viewDate: Date = new Date();
    public refresh: Subject<any> = new Subject();
    public modalRef: BsModalRef;
    public matcher = new MyErrorStateMatcher();
    public events: CalendarEvent[] = [];
    public eventData;
    public taskData;
    public reminderData;
    public calendarData;

    constructor(private fb: FormBuilder, private modalService: BsModalService) { }

    ngOnInit() {
        this.checkForReminder();
    }

    public openCreateEventModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'event_modal' }));
    }

    addDataToCalendar(event) {
        console.log(event);
        let color;
        if(event.data.dataType == "Event") {
            color = colors.event;
        }
        if(event.data.dataType == "Task") {
            color = colors.task;
        }
        if(event.data.dataType == "Reminder") {
            color = colors.reminder;
        }

        if(event.data.dataType != "Reminder") {
            let getStartHour = event.data.startTime;
            let getEndHour = event.data.endTime;

            let startSetHour = new Date(event.data.startDate.setHours(getStartHour.getHours()));
            let endSetHour = new Date(event.data.endDate.setHours(getEndHour.getHours()));

            let startSetMinute = new Date(startSetHour.setMinutes(getStartHour.getMinutes()));
            let endSetMinute = new Date(endSetHour.setMinutes(getEndHour.getMinutes()));

            console.log(color);

            this.events.push({
                id: event.data.id,
                type: event.data.dataType,
                start: startSetMinute,
                end: endSetMinute,
                title: event.data.eventName,
                color: color,
                description: event.data.eventDescription,
                actions: [{
                    label: '<img class="action-icons" src="assets/images/view.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        console.log('Edit event', event);
                        this.calendarData = event;
                        this.modalRef = this.modalService.show(this.viewCalendarTemplate, Object.assign({}, { class: 'event_modal' }));
                    }
                }, {
                    label: '<img class="action-icons" src="assets/images/edit.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        console.log('Edit event', event);
                        if(event.type == "Event") {
                            this.eventData = event;
                            this.modalRef = this.modalService.show(this.editEventModalTemplate, Object.assign({}, { class: 'event_modal' }));
                        }
                        if(event.type == "Task") {
                            this.taskData = event;
                            this.modalRef = this.modalService.show(this.editTaskModalTemplate, Object.assign({}, { class: 'event_modal' }));
                        }
                    }
                }, {
                    label: '<img class="action-icons" src="assets/images/garbage.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        this.events = this.events.filter(iEvent => iEvent !== event);
                        console.log('Event deleted', event);
                    }
                }]
            });
            this.refresh.next();
            this.modalRef.hide();
        }
        if(event.data.dataType == "Reminder") {
            let getStartHour = event.data.startTime;

            let startSetHour = new Date(event.data.startDate.setHours(getStartHour.getHours()));
            let startSetMinute = new Date(startSetHour.setMinutes(getStartHour.getMinutes()));

            console.log(color);

            this.events.push({
                id: event.data.id,
                type: event.data.dataType,
                start: startSetMinute,
                title: event.data.eventName,
                color: color,
                description: event.data.eventDescription,
                actions: [{
                    label: '<img class="action-icons" src="assets/images/view.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        console.log('Edit event', event);
                        this.calendarData = event;
                        this.modalRef = this.modalService.show(this.viewCalendarTemplate, Object.assign({}, { class: 'event_modal' }));
                    }
                }, {
                    label: '<img class="action-icons" src="assets/images/edit.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        console.log('Edit event', event);
                        this.reminderData = event;
                        this.modalRef = this.modalService.show(this.editReminderModalTemplate, Object.assign({}, { class: 'event_modal' }));
                    }
                }, {
                    label: '<img class="action-icons" src="assets/images/garbage.svg" width="15"/>',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                        this.events = this.events.filter(iEvent => iEvent !== event);
                        console.log('Event deleted', event);
                    }
                }]
            });
            this.refresh.next();
            this.modalRef.hide();
        }
        // this.eventData = undefined;
        // this.taskData = undefined;
        // this.reminderData = undefined;
        // this.calendarData = undefined;
    }

    updateCalendarData(event) {
        console.log(event);
        if(event.data.dataType != "Reminder") {
            let getStartHour = event.data.startTime;
            let getEndHour = event.data.endTime;

            let startSetHour = new Date(event.data.startDate.setHours(getStartHour.getHours()));
            let endSetHour = new Date(event.data.endDate.setHours(getEndHour.getHours()));

            let startSetMinute = new Date(startSetHour.setMinutes(getStartHour.getMinutes()));
            let endSetMinute = new Date(endSetHour.setMinutes(getEndHour.getMinutes()));

            let toUpdateEvent = this.events.filter((obj) => {
                return obj.id == event.data.id
            });

            toUpdateEvent[0].start = startSetMinute;
            toUpdateEvent[0].end = endSetMinute;
            toUpdateEvent[0].title = event.data.eventName;
            toUpdateEvent[0].description = event.data.eventDescription,
            this.refresh.next();
            this.modalRef.hide();
        }
        if(event.data.dataType == "Reminder") {
            let getStartHour = event.data.startTime;

            let startSetHour = new Date(event.data.startDate.setHours(getStartHour.getHours()));
            let startSetMinute = new Date(startSetHour.setMinutes(getStartHour.getMinutes()));

            let toUpdateEvent = this.events.filter((obj) => {
                return obj.id == event.data.id
            });

            toUpdateEvent[0].start = startSetMinute;
            toUpdateEvent[0].title = event.data.eventName;
            toUpdateEvent[0].description = event.data.eventDescription,
            this.refresh.next();
            this.modalRef.hide();
        }
        // this.eventData = undefined;
        // this.taskData = undefined;
        // this.reminderData = undefined;
        // this.calendarData = undefined;
    }

    checkForReminder() {
        setInterval(() => {
            let currentDate = new Date();
            // console.log(this.events);
            for(let i of this.events) {
                if(i.type == "Reminder") {
                    // console.log(i.start.getTime());
                    if(currentDate.getTime() >= i.start.getTime()) {
                        alert("Reminder Title: " + i.title + " Description: " + i.description);
                        this.events = this.events.filter((obj) => {
                            return obj.id != i.id
                        })
                        this.refresh.next();
                    }
                }
            }
        }, 2000)
    }

    editCalendarModal() {
        console.log(this.calendarData);
        this.modalRef.hide();
        if(this.calendarData.type == "Event") {
            this.eventData = this.calendarData;
            this.modalRef = this.modalService.show(this.editEventModalTemplate, Object.assign({}, { class: 'event_modal' }));
        }
        if(this.calendarData.type == "Task") {
            this.taskData = this.calendarData;
            this.modalRef = this.modalService.show(this.editTaskModalTemplate, Object.assign({}, { class: 'event_modal' }));
        }
        if(this.calendarData.type == "Reminder") {
            this.reminderData = this.calendarData;
            this.modalRef = this.modalService.show(this.editReminderModalTemplate, Object.assign({}, { class: 'event_modal' }));
        }
    }

}
