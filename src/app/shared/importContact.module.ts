import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { CreateIndividualShortContact } from './components/import-contact/createIndividualShortContact.component';
import { CreateOrganisationShortContact } from './components/import-contact/createOrganisationShortContact.component';
import { ImportContact } from './components/import-contact/importContact.component';

import { SharedModule } from './shared.module';

@NgModule({
	declarations: [
		CreateIndividualShortContact,
		CreateOrganisationShortContact,
		ImportContact
	],
  	imports: [
    	SharedModule
  	],
    exports: [
		ImportContact,
		CreateIndividualShortContact,
		CreateOrganisationShortContact
    ]
})
export class ImportContactModule { }
