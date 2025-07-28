import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../Services/AuthService/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  loginPage() {
    this.router.navigate(['/login']);
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
