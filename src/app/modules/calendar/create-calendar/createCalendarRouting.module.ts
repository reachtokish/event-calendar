import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCalendarComponent } from './create-calendar/createCalendar.component';

const routes: Routes = [{
    path: '',
    component: CreateCalendarComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCalendarRoutingModule { }
