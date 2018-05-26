import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateCalendarRoutingModule } from './createCalendarRouting.module';
import { CreateCalendarComponent } from './create-calendar/createCalendar.component';
import { CalendarHeaderComponent } from './create-calendar/calendar-header.component';
import { CalendarModule } from 'angular-calendar';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DatePipe } from '@angular/common';
import { EventFormComponent } from './event-form.component/event-form.component';
import { TaskFormComponent } from './task-form.component/task-form.component';
import { ReminderFormComponent } from './reminder-form.component/reminder-form.component';
import { ViewCalendarComponent } from './view-calendar.component/view-calendar.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		CreateCalendarComponent,
		CalendarHeaderComponent,
		EventFormComponent,
		TaskFormComponent,
		ReminderFormComponent,
		ViewCalendarComponent
	],
  	imports: [
    	CreateCalendarRoutingModule,
    	SharedModule,
		CalendarModule.forRoot(),
		TimepickerModule.forRoot()
  	],
  	schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class CreateCalendarModule { }
