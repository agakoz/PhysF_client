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
import {PatientPersonalDataDialogComponent} from './patients/patient-personal-update-dialog/patient-personal-data-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {PatientFileMainPanelComponent} from './patients/patient-file-main-panel/patient-file-main-panel.component';
import {PatientFileTreatmentHistoryPanelComponent} from './patients/patient-file-treatment-history-panel/patient-file-treatment-history-panel.component';
import {PlanVisitDialogComponent} from './visits/plan-visit-dialog/plan-visit-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule, DatePipe} from '@angular/common';
import {ApprovalQuestionDialogComponent} from './approval-question-dialog/approval-question-dialog.component';
import {VisitFormDialogComponent} from './visits/start-visit-dialog/visit-form-dialog.component';
import {TreatmentCycleFormComponent} from './treatmentCycle/treatment-cycle-form/treatment-cycle-form.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CalendarComponent} from './calendar/calendar/calendar.component';
import {HandleEventQuestionDialogComponent} from './calendar/handle-event-dialog/handle-event-question-dialog.component';
import {EditVisitDialogComponent} from './visits/edit-visit-dialog/edit-visit-dialog.component';
import {FinishedVisitDisplayDialogComponent} from './visits/finished-visit-display-dialog/finished-visit-display-dialog.component';
import {ApproveQuestionPlanVisitDialogComponent} from './models/approve-question-plan-visit-dialog/approve-question-plan-visit-dialog.component';
import {TreatmentCycleHistoryDialogComponent} from './treatmentCycle/treatment-cycle-history-dialog/treatment-cycle-history-dialog.component';
import {FinishedVisitInfoComponent} from './treatmentCycle/finished-visit-info/finished-visit-info.component';
import {MatMenuModule} from '@angular/material/menu';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { UserDataFormDialogComponent } from './user-data-form-dialog/user-data-form-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TreatmentCycleAttachmentFormComponent } from './treatmentCycle/treatment-cycle-attachment-form/treatment-cycle-attachment-form.component';
import { ExternalAttachmentsDisplayComponent } from './external-attachments-display/external-attachments-display.component';
import { TreatmentCycleAttachmentDisplayComponent } from './treatment-cycle-attachment-display/treatment-cycle-attachment-display.component';


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
    EditVisitDialogComponent,
    ApprovalQuestionDialogComponent,
    VisitFormDialogComponent,
    TreatmentCycleFormComponent,
    CalendarComponent,
    HandleEventQuestionDialogComponent,
    FinishedVisitDisplayDialogComponent,
    ApproveQuestionPlanVisitDialogComponent,
    TreatmentCycleHistoryDialogComponent,
    FinishedVisitInfoComponent,
    ChangePasswordDialogComponent,
    UserDataFormDialogComponent,
    TreatmentCycleAttachmentFormComponent,
    ExternalAttachmentsDisplayComponent,
    TreatmentCycleAttachmentDisplayComponent,

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
    CalendarModule,
    CommonModule,
    // DemoUtilsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),
    MatMenuModule,
    MatDialogModule,

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
  exports: [
    CalendarComponent
  ]

})
export class AppModule {
}
