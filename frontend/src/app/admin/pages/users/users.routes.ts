import { Routes } from '@angular/router';

export const usersRoutes: Routes = [
  {
    path: '',
    title: 'Users',
    loadComponent: () =>
      import('@admin/pages/users/admin-users-page.component'),
  },
  {
    path: 'create',
    title: 'Create Users',
    loadComponent: () =>
      import('@admin/pages/users/create/admin-users-create-page.component'),
  },
  {
    path: 'edit/:userId',
    title: 'Edit Users',
    loadComponent: () =>
      import('@admin/pages/users/edit/admin-users-edit-page.component'),
  },
];

export default usersRoutes;
