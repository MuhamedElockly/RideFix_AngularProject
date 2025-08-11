import { AuthService } from '../../../Services/AuthService/auth.service';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-component',
  imports: [],
  templateUrl: './unauthorized-component.html',
  styleUrl: './unauthorized-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
  standalone: true,
})
export class UnauthorizedComponent implements OnInit {
  constructor(private router: Router) {}
  authService = inject(AuthService);
  Role: string = '';
  ngOnInit(): void {
    this.Role = this.authService.getRole();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    if (this.Role == 'CarOwner') {
      this.router.navigate(['/CarOwner/Home']);
    } else {
      this.router.navigate(['/technician/requests']);
    }
  }
}
