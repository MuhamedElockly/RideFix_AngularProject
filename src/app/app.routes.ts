import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';

import { authRoutes } from './routes/auth.routes';
import { Requests } from './Components/technical/requests/requests';
import { TechServieces } from './Components/technical/tech-servieces/tech-servieces';
import { WaitingComponent } from './Components/Car_Owner_Components/waiting-component/waiting-component';

import { RequestDetails } from './Components/technical/request-details/request-details';
import { RequestDetailsalltech } from './Components/technical/request-detailsalltech/request-detailsalltech';
import { Profiletech } from './Components/technical/profiletech/profiletech';
import { Historytech } from './Components/technical/historytech/historytech';
import { TechnicianModule } from './Components/technical/technician-module/technician-module';
// import { RequestHistoryComponent } from './Components/Car_Owner_Components/request-history/request-history';

import { ProfileView } from './Components/Car_Owner_Components/profile-view/profile-view';
import { Techchat } from './Components/technical/techchat/techchat';
import { RequestHistoryComponent } from './Components/Car_Owner_Components/request-history-component/request-history-component';

import { UnauthorizedComponent } from './Components/unauthorized-component/unauthorized-component';
import { carOwnerGuard } from './Gaurds/car-owner-guard';
import { techGuard } from './Gaurds/tech-guard';
import { CarProfileComponent } from './Components/Car_Owner_Components/car-profile-component/car-profile-component';
import { AddCarComponent } from './Components/Car_Owner_Components/add-car-component/add-car-component';

export const routes: Routes = [
  ...authRoutes,
  { path: 'unauthorized', component: UnauthorizedComponent },
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
      { path: 'MyCar', component: CarProfileComponent },
      { path: 'AddNewCar', component: AddCarComponent },
      // { path: 'RequestsHistory', component: RequestHistoryComponent },
    ],
    canActivate: [carOwnerGuard],
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
    canActivate: [techGuard],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // لو المستخدم مش مسجل
  // { path: '', redirectTo: 'CarOwner', pathMatch: 'full' },

  //   { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  //   { path: 'requests', component: Requests },
  //   { path: 'techservieces', component: TechServieces },

  //   { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  //   { path: 'techchat', component: Techchat },

  //   { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  //   { path: 'techchat', component: Techchat },

  //   { path: '', redirectTo: 'CarOwner/Home', pathMatch: 'full' },
  //   { path: 'techchat', component: Techchat },
];
