import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FourOFourRoutingModule } from './404Routing.module';
import { FourOFourComponent } from './404/404.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		FourOFourComponent
	],
  	imports: [
    	FourOFourRoutingModule,
    	SharedModule
  	],
  	schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class FourOFourModule { }
