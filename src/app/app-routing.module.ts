import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './_helpers/AuthGuard';
import {RegisterComponent} from './register/register.component';



const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'login', component: WelcomePageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
