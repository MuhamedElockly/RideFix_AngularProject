import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login';
import { RegisterStep1Component } from '../Components/register-step1/register-step1';
import { RegisterStep2Component } from '../Components/register-step2/register-step2';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-step1', component: RegisterStep1Component },
  { path: 'register-step2', component: RegisterStep2Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' },
];
