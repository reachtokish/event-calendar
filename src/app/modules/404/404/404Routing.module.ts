import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourOFourComponent } from './404/404.component';

const routes: Routes = [{
    path: '',
    component: FourOFourComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FourOFourRoutingModule { }
