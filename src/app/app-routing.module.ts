import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './_helpers/AuthGuard';
import {RegisterComponent} from './register/register.component';
import {PatientsComponent} from './patients/patient-list/patients.component';
import {AddPatientComponent} from './patients/add-patient/add-patient.component';
import {PatientFileComponent} from './patients/patient-file/patient-file.component';
import {CalendarComponent} from './calendar/calendar/calendar.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  },
  {
    path: 'login',
    component: WelcomePageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patients',
    component: PatientsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'patient/:id',
    component: PatientFileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
    enableTracing: false,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
