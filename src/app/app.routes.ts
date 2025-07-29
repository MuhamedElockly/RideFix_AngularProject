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
import { TechnicianLayoutComponent } from './Components/technical/technician-layout-component/technician-layout-component';
import { RequestDetails } from './Components/technical/request-details/request-details';
import { RequestDetailsalltech } from './Components/technical/request-detailsalltech/request-detailsalltech';
import { Profiletech } from './Components/technical/profiletech/profiletech';
import { Historytech } from './Components/technical/historytech/historytech';
import { TechnicianModule } from './Components/technical/technician-module/technician-module';


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

  {
  path: 'technician',
  component: TechnicianModule,
  children: [
    { path: 'requests', component: Requests },
    { path: 'requestdetails', component: RequestDetails },
    { path: 'requestdetailsalltech', component: RequestDetailsalltech },
    { path: 'profiletech', component: Profiletech },
    { path: 'historytech', component: Historytech },
    { path: 'techservieces', component: TechServieces },
    { path: 'techchat', component: Techchat },
  ],
},



  { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' }, // لو المستخدم مش مسجل
  { path: '', redirectTo: 'CarOwner', pathMatch: 'full' },

  




];
