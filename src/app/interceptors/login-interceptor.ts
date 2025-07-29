import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  console.log("Interceptor token:", token);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,

      },
    });
  }

  return next(req);
};
