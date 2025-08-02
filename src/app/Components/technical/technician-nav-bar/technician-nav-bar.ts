import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/AuthService/auth.service';
import { TokenService } from '../../../Services/TokenService/tokenservice';

@Component({
  selector: 'app-technician-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './technician-nav-bar.html',
  styleUrls: ['./technician-nav-bar.css']
})
export class TechnicianNavBar {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenservice: TokenService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    return this.authService.getUserName();
  }
} 