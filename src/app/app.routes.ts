import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';

import { authRoutes } from './routes/auth.routes';
import { Requests } from './Components/technical/requests/requests';
import { TechServieces } from './Components/technical/tech-servieces/tech-servieces';
import { WaitingComponent } from './Components/Car_Owner_Components/waiting-component/waiting-component';

import { ProfileView } from './Components/Car_Owner_Components/profile-view/profile-view';
import { Techchat } from './Components/technical/techchat/techchat';
import { RequestHistoryComponent } from './Components/Car_Owner_Components/request-history-component/request-history-component';

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
      { path: 'TechViewDetails', component: ProfileView },
      { path: 'RequestsHistory', component: RequestHistoryComponent },
    ],
  },

  { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  { path: 'requests', component: Requests },
  { path: 'techservieces', component: TechServieces },

  { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  { path: 'techchat', component: Techchat },
];
