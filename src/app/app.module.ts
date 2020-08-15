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
import {ErrorStateMatcher,  MatNativeDateModule, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PatientsComponent } from './patients/patients.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { FilterPipe }from './_helpers/filter.pipe';
import { ManagePatientDialogComponent } from './manage-patient-dialog/manage-patient-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { VisitsDialogComponent } from './visits-dialog/visits-dialog.component';
import { PatientFileComponent } from './patient-file/patient-file.component';



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

  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
   ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
