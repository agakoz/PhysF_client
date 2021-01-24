import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './_helpers/auth.inspector';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_helpers/AuthGuard';
import {MatStepperModule} from '@angular/material/stepper';
import {
  ErrorStateMatcher,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PatientsComponent} from './patients/patient-list/patients.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {FilterPipe} from './_helpers/filter.pipe';
import {ManagePatientDialogComponent} from './patients/manage-patient-dialog/manage-patient-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {AddPatientComponent} from './patients/add-patient/add-patient.component';
import {VisitsDialogComponent} from './visits/visits-dialog/visits-dialog.component';
import {PatientFileComponent} from './patients/patient-file/patient-file.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { PatientPersonalDataDialogComponent } from './patients/patient-personal-update-dialog/patient-personal-data-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PatientFileMainPanelComponent } from './patients/patient-file-main-panel/patient-file-main-panel.component';
import { PatientFileTreatmentHistoryPanelComponent } from './patients/patient-file-treatment-history-panel/patient-file-treatment-history-panel.component';
import { PlanVisitDialogComponent } from './visits/plan-visit-dialog/plan-visit-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import { ApprovalQuestionDialogComponent } from './approval-question-dialog/approval-question-dialog.component';
import { VisitFormDialogComponent } from './visits/visit-form-dialog/visit-form-dialog.component';
import { TreatmentCycleFormComponent } from './treatmentCycle/treatment-cycle-form/treatment-cycle-form.component';
import {CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    PatientsComponent,
    NavbarComponent,
    FilterPipe,
    ManagePatientDialogComponent,
    AddPatientComponent,
    VisitsDialogComponent,
    PatientFileComponent,
    PatientPersonalDataDialogComponent,
    ErrorDialogComponent,
    PatientFileMainPanelComponent,
    PatientFileTreatmentHistoryPanelComponent,
    PlanVisitDialogComponent,
    ApprovalQuestionDialogComponent,
    VisitFormDialogComponent,
    TreatmentCycleFormComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    MatRadioModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),

  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},

  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
