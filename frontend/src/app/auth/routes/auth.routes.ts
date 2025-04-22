import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    title: 'Auth',
    loadComponent: () => import('@auth/_layout/auth-layout.component'),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('@auth/pages/login/auth-login-page.component'),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () =>
          import('@auth/pages/register/auth-register-page.component'),
      },
      {
        path: '',
        title: 'Redirecting',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        title: 'Redirecting',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

export default appRoutes;
