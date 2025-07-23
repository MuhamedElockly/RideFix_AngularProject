import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar-component/nav-bar-component';
import { CarOwnerHomeComponent } from './Components/Car_Owner_Components/car-owner-home-component/car-owner-home-component';
import { FooterComponent } from './Components/footer-component/footer-component';
import { CarOwnerModule } from './Components/Car_Owner_Components/car-owner-module/car-owner-module';
import { Sidebar } from './Components/technical/sidebar/sidebar';
import { Requests } from './Components/technical/requests/requests';
import { TemplateSweet } from './Components/technical/template-sweet/template-sweet';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CarOwnerModule,
    NavBarComponent,
    CarOwnerHomeComponent,
    FooterComponent,
    Sidebar,
    Requests,
    TemplateSweet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'RideFix';
}
