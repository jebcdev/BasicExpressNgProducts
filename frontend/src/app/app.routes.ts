import { Routes } from '@angular/router';
import {
  NotAuthenticatedGuard,
  IsAuthenticatedGuard,
  IsAdminGuard,
} from '@shared/guards/';

export const appRoutes: Routes = [
  {
    canMatch: [NotAuthenticatedGuard],
    path: 'auth',
    loadChildren: () => import('@auth/routes/auth.routes'),
  },
  {
    canMatch: [IsAdminGuard],
    path: 'admin',
    loadChildren: () => import('@admin/routes/admin.routes'),
  },
  {
    canMatch: [IsAuthenticatedGuard],
    path: 'private',
    loadChildren: () => import('@private/routes/private.routes'),
  },

  { path: '', loadChildren: () => import('@front/routes/front.routes') },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('@shared/pages/not-found/shared-not-found-page.component'),
  },
];
