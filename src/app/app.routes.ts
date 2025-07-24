import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';

import { authRoutes } from './routes/auth.routes';
import { Requests } from './Components/technical/requests/requests';
import { TechServieces } from './Components/technical/tech-servieces/tech-servieces';
import { WaitingComponent } from './Components/Car_Owner_Components/waiting-component/waiting-component';
import { Techchat } from './Components/technical/techchat/techchat';


export const routes: Routes = [
  ...authRoutes,
  {
    path: 'CarOwner',
    component: CarOwnerModule,
    children: [
      { path: 'Home', component: CarOwnerHomeComponent },
      { path: 'RequestEmergency', component: RequestEmergencyComponent },
      { path: 'SelectTech', component: TechSelect },
      { path: 'Waiting', component: WaitingComponent },
    ],
  },


  { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' }, // لو المستخدم مش مسجل
  { path: '', redirectTo: 'CarOwner', pathMatch: 'full' },
{ path: 'requests',component:Requests},
{ path: 'techservieces',component:TechServieces},
{ path: 'techchat',component:Techchat},


];
