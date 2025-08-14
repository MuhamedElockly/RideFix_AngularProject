import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/AuthService/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    

// return true;

    // Check if user has admin role
    if (userRole && (userRole.toLowerCase().includes('admin') || userRole.toLowerCase().includes('مدير'))) {
      return true;
    } else {
      // Redirect to unauthorized page if user doesn't have admin role
      router.navigate(['/unauthorized']);
      return false;
    }
  } else {
    // Redirect to login if user is not logged in
    router.navigate(['/login']);
    return false;
  }
};
