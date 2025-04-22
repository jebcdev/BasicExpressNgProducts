import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    title: 'Admin',
    loadComponent: () => import('@admin/_layout/admin-layout.component'),
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () =>
          import('@admin/pages/_dashboard/admin-dashboard-page.component'),
      },
      {
        path: 'roles',
        title: 'Roles',
        loadComponent: () =>
          import('@admin/pages/roles/admin-roles-page.component'),
      },
      {
        path: 'roles/create',
        title: 'Create Roles',
        loadComponent: () =>
          import('@admin/pages/roles/create/admin-roles-create-page.component'),
      },
      {
        path: 'roles/edit/:id',
        title: 'Edit Roles',
        loadComponent: () =>
          import('@admin/pages/roles/edit/admin-roles-edit-page.component'),
      },

      {
        path: 'users',
        title: 'Users',
        loadComponent: () =>
          import('@admin/pages/users/admin-users-page.component'),
      },
      {
        path: 'users/create',
        title: 'Create Users',
        loadComponent: () =>
          import('@admin/pages/users/create/admin-users-create-page.component'),
      },
      {
        path: 'users/edit/:id',
        title: 'Edit Users',
        loadComponent: () =>
          import('@admin/pages/users/edit/admin-users-edit-page.component'),
      },

      {
        path: '**',
        title: 'Redirecting ... ',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

export default adminRoutes;
