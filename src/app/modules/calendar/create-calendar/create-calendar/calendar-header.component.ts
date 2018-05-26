import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'mwl-demo-utils-calendar-header',
    template: `
    <div class="row text-center">
      <div class="col-md-4 text-left">
        <div class="btn-group calendar-btn-group">
            <div
                class="btn btn-primary calendar-button-orange"
                mwlCalendarPreviousView
                [view]="view"
                [(viewDate)]="viewDate"
                (viewDateChange)="viewDateChange.next(viewDate)" (click)="previousMonth()">
                &lt;
            </div>
            <div
                class="btn btn-outline-secondary calendar-button-grey"
                mwlCalendarToday
                [(viewDate)]="viewDate"
                (viewDateChange)="viewDateChange.next(viewDate)" (click)="todayMonth()">
                Today
            </div>
            <div
                class="btn btn-primary calendar-button-orange"
                mwlCalendarNextView
                [view]="view"
                [(viewDate)]="viewDate"
                (viewDateChange)="viewDateChange.next(viewDate)" (click)="nextMonth()">
                &gt;
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</h3>
    </div>
    <div class="col-md-4 text-right">
        <div class="btn-group">
            <div
                class="btn btn-primary calendar-button-grey"
                (click)="viewChange.emit('month')"
                [class.active]="view === 'month'">
                Month
            </div>
            <div
                class="btn btn-primary calendar-button-grey"
                (click)="viewChange.emit('week')"
                [class.active]="view === 'week'">
                Week
            </div>
            <div
                class="btn btn-primary calendar-button-grey"
                (click)="viewChange.emit('day')"
                [class.active]="view === 'day'">
                Day
                </div>
            </div>
        </div>
    </div>
    <br>
  `
})
export class CalendarHeaderComponent {
    @Input() view: string;

    @Input() viewDate: Date;

    @Input() locale: string = 'en';

    @Output() viewChange: EventEmitter<string> = new EventEmitter();

    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

    todayMonth() {
    }

    previousMonth(){
    }

    nextMonth(){
    }
}
