import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar';
import { FooterComponent } from '../General/footer-component/footer-component';

@Component({
  selector: 'app-admin-module',
  standalone: true,
  imports: [RouterOutlet, AdminNavBarComponent, FooterComponent],
  templateUrl: './admin-module.html',
  styleUrl: './admin-module.css'
})
export class AdminModule {
  constructor() {}
}
