import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar-component/nav-bar-component';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { FooterComponent } from './Components/footer-component/footer-component';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';

import { LoginComponent } from './Components/login/login';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './Components/technical/sidebar/sidebar';
import { Requests } from './Components/technical/requests/requests';

import { UserStorageService } from './Services/UserStorageService/user-storage-service';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CarOwnerModule,
    NavBarComponent,
    CarOwnerHomeComponent,
    FooterComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    Sidebar,
    Requests,   
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  protected title = 'RideFix';
    userRole: string | null = null;

  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.userRole = this.userStorage.getUserRole();
  }
}
