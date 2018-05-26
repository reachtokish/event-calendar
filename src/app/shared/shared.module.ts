import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { OrderModule } from 'ngx-order-pipe';
import { ObjectToStringPipe } from '../pipes/objectToString.pipe';
import { AddressPipe } from '../pipes/address.pipe';

import { InlineSVGModule } from 'ng-inline-svg';

import { InputExpandDirective } from '../directives/input-expand.directive';
import { CurrencyInputDirective } from '../directives/currency-input.directive';

import { HttpService } from '../services/http.service';
import { FileUploadClientService } from '../services/file-client.service';
import { UnauthAccessService } from '../services/unauth.service';
import { FieldJoin } from '../services/fieldJoin.service';
import { Joinaddress } from '../services/joinaddress.service';
import { OpenSnackService } from '../services/openSnackbar.service';
import { DateFormat } from '../services/dateAsReq.service';
import { ObjectToStringFilter } from '../pipes/objToString.pipe';
import { CurrencyPipe } from '../pipes/currencyFilter.pipe';
import { FilterPipe } from '../pipes/pipe';
import { AuthGuard } from '../services/authGuard.service';
import { ObjectSearch } from '../services/objectSearch.service';
import { ObjectToString } from "../services/objectToString";
import { LocationView } from "../services/locationView.service";
import { DateForDatepicker } from "../services/dateForDatePicker.service";
import { ArrayToString } from "../services/arrayToString.service";

import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { AppHeaderComponent } from './components/app-header/appHeader.component';
import { NotesComponent } from './components/notes-component/notes.component';
import { DocumentsComponent } from './components/documents-component/documents.component';
import { FinanceComponent } from './components/finance-component/finance.component';
import { InteractionComponent } from './components/interaction-component/interaction.component';
import { HistoryComponent } from './components/history-component/history.component';
import { MultiValue } from './components/multi-value/multiValue.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { fourOFourComponent } from './components/404/404.component';
import { SnakSuccessComponent } from './components/snakbar-success/snakBarSuccess.component';
import { SnakBarComponent } from './components/snakbar-component/snakBar.component';
import { FranchiseSnackSuccessComponent } from './components/franchise-update-success/franchiseUpdateSuccess.component';
import { uiTreeComponent } from './components/ui-tree/ui-tree.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { TooltipModule } from 'ngx-bootstrap';

import { DataTablesModule } from 'angular-datatables';

import { HttpModule } from '@angular/http';

import { HttpInterceptor } from "../services/httpinterceptor";
import { UploadFile } from "../services/uploadFile.service";
import { AuthStatus } from '../services/checkAuthStatus.service';

@NgModule({
	declarations: [
		DashboardLayoutComponent,
		AuthLayoutComponent,
		AppHeaderComponent,
		BreadcrumbComponent,
		NotesComponent,
		DocumentsComponent,
		FinanceComponent,
		InteractionComponent,
		HistoryComponent,
		MultiValue,
		BreadcrumbComponent,
		fourOFourComponent,
		SnakSuccessComponent,
		FranchiseSnackSuccessComponent,
		SnakBarComponent,
		uiTreeComponent,
		ObjectToStringFilter,
		CurrencyPipe,
		FilterPipe,
		ObjectToStringPipe,
		AddressPipe,
		InputExpandDirective,
		CurrencyInputDirective
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,

		HttpModule,

		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatTabsModule,
		MatTabsModule,
		MatRadioModule,
		MatSnackBarModule,

		ModalModule.forRoot(),
		TabsModule.forRoot(),
		OrderModule,

		RouterModule,
		InlineSVGModule,

		NgProgressModule.forRoot(),
		NgProgressHttpModule,
		NgProgressRouterModule,

		DataTablesModule,

		TooltipModule.forRoot()
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		OrderModule,
		HttpClientModule,

		HttpModule,

		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatTabsModule,
		MatTabsModule,
		MatRadioModule,
		MatSnackBarModule,

		ModalModule,
		TabsModule,
		InlineSVGModule,

		AppHeaderComponent,
		DashboardLayoutComponent,
		AuthLayoutComponent,
		BreadcrumbComponent,
		NotesComponent,
		DocumentsComponent,
		FinanceComponent,
		InteractionComponent,
		HistoryComponent,
		MultiValue,
		BreadcrumbComponent,
		fourOFourComponent,
		SnakSuccessComponent,
		FranchiseSnackSuccessComponent,
		SnakBarComponent,
		uiTreeComponent,
		InputExpandDirective,
		CurrencyInputDirective,

		NgProgressModule,
		NgProgressHttpModule,
		NgProgressRouterModule,

		DataTablesModule,

		ObjectToStringPipe,
		AddressPipe,

		TooltipModule,

		CurrencyPipe,

		RouterModule
	],
	entryComponents: [
        SnakBarComponent
    ],
	providers: [
		HttpService,
		FileUploadClientService,
		UnauthAccessService,
		DateFormat,
		AuthGuard,
		ObjectSearch,
		ObjectToString,
		DateForDatepicker,
		ArrayToString,
		CurrencyPipe,
		ObjectToStringPipe,
		AddressPipe,
		OpenSnackService,
		LocationView,
		HttpInterceptor,
		UploadFile,
		FieldJoin,
		Joinaddress,
		AuthStatus
	],
	schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
