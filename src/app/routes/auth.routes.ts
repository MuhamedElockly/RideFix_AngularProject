import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/General/login/login';
import { RegisterStep1Component } from '../Components/General/register-step1/register-step1';
import { RegisterStep2Component } from '../Components/General/register-step2/register-step2';

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register-step1', component: RegisterStep1Component },
  { path: 'register-step2', component: RegisterStep2Component },
];
