import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/AuthService/auth.service';

@Component({
  selector: 'app-admin-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-nav-bar.html',
  styleUrls: ['./admin-nav-bar.css']
})
export class AdminNavBarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    // Navigation is now handled by the AuthService
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    return this.authService.getUserName();
  }
}
