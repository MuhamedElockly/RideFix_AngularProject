import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../Services/TokenService/tokenservice';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken(); // ✅ استخدم السيرفس بدل localStorage

  console.log('✅ Interceptor triggered');
  console.log('✅ Token from service:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
