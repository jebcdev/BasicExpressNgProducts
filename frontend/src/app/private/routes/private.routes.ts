import { Routes } from '@angular/router';
import { environment } from '@env/environment';

export const privateRoutes: Routes = [
  {
    path: '',
    title: environment.appName,
    loadComponent: () => import('@private/_layout/private-layout.component'),
    children: [
      {
        path: 'profile',
        title: environment.appName,
        loadComponent: () =>
          import('@private/pages/profile/private-profile-page.component'),
        children: [],
      },
    ],
  },

  {
    path: '**',
    title: 'Redirecting...',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default privateRoutes;
