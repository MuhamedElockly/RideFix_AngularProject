import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../nav-bar-component/nav-bar-component';
import { FooterComponent } from '../../footer-component/footer-component';

@Component({
  selector: 'app-car-owner-module',
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './car-owner-module.html',
  styleUrl: './car-owner-module.css',
})
export class CarOwnerModule {}
