import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { RequestEmergencyComponent } from './Components/Car_Owner_Components/request-emergency-component/request-emergency-component';
import { TechSelect } from './Components/Car_Owner_Components/tech-select/tech-select';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';
import { WaitingComponent } from './Components/Car_Owner_Components/waiting-component/waiting-component';
import { ProfileView } from './Components/Car_Owner_Components/profile-view/profile-view';

export const routes: Routes = [
  {
    path: 'CarOwner',
    component: CarOwnerModule,
    children: [
      { path: 'Home', component: CarOwnerHomeComponent },
      { path: 'RequestEmergency', component: RequestEmergencyComponent },
      { path: 'SelectTech', component: TechSelect },
      { path: 'Waiting', component: WaitingComponent },
      { path: 'TechViewDetails', component: ProfileView },
    ],
  },
  { path: '', redirectTo: 'CarOwner', pathMatch: 'full' },
];
