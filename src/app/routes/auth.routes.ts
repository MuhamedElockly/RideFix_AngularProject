import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login';
// ممكن تضيف Register لاحقًا

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'register-step1', component: RegisterStep1Component }, ← تضيف لاحقًا
  // { path: 'register-step2', component: RegisterStep2Component }, ← تضيف لاحقًا
];
