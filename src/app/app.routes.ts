import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';
import { Requests } from './Components/technical/requests/requests';
import { TechServieces } from './Components/technical/tech-servieces/tech-servieces';
import { WaitingComponent } from './Components/Car_Owner_Components/waiting-component/waiting-component';

export const routes: Routes = [
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
  { path: '', redirectTo: 'CarOwner', pathMatch: 'full' },
{ path: 'requests',component:Requests},
{ path: 'techservieces',component:TechServieces},


];
