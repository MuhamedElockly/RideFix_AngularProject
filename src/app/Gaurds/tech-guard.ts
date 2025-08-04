import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/AuthService/auth.service';
import { Router } from '@angular/router';

export const techGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.getRole() === 'Technician') {
    return true;
  } else {
    return router.createUrlTree(['/unauthorized']);
  }
};
