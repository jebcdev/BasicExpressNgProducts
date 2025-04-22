import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async () =>
  // route: Route,
  // segments: UrlSegment[],
  {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());
    const userRole = authService.user()?.role_id;
    if (isAuthenticated && userRole === 1) return true;
    router.navigateByUrl('/');

    //   console.log({isAuthenticated});
    return true;
  };

export default IsAdminGuard;
