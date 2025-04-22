import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAuthenticatedGuard: CanMatchFn = async () =>
  // route: Route,
  // segments: UrlSegment[],
  {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());

    if (isAuthenticated) return true;
    router.navigateByUrl('/');

    //   console.log({isAuthenticated});
    return true;
  };

export default IsAuthenticatedGuard;
