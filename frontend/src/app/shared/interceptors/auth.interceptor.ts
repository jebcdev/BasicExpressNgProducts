/* import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  //   const token = inject(AuthService).token();
  const token = localStorage.getItem('token');
  if (!token) return next(req);

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  console.log('AuthInterceptor', { token });
  return next(newReq);
}
 */

import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { environment } from '@env/environment';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(AuthService);
  const token = authService.token();

  // Skip token for authentication endpoints
  if (
    req.url.includes(`${environment.apiUrl}/auth/login`) ||
    req.url.includes(`${environment.apiUrl}/auth/check-token`)
  ) {
    return next(req);
  }

  if (!token) {
    // console.log('AuthInterceptor: No token available');
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // console.log('AuthInterceptor: Adding token to request');
  return next(newReq);
}
