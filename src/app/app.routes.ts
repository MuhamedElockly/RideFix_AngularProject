import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';
import { authRoutes } from './routes/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: 'CarOwner',
    component: CarOwnerModule,
    children: [
      { path: 'Home', component: CarOwnerHomeComponent },
      { path: 'RequestEmergency', component: RequestEmergencyComponent },
      { path: 'SelectTech', component: TechSelect },
    ],
  },

  { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
];
