import { Routes } from '@angular/router';

export const rolesRoutes: Routes = [
  {
    path: '',
    title: 'Roles',
    loadComponent: () =>
      import('@admin/pages/roles/admin-roles-page.component'),
  },
  {
    path: 'create',
    title: 'Create Roles',
    loadComponent: () =>
      import('@admin/pages/roles/create/admin-roles-create-page.component'),
  },
  {
    path: 'edit/:id',
    title: 'Edit Roles',
    loadComponent: () =>
      import('@admin/pages/roles/edit/admin-roles-edit-page.component'),
  },
];

export default rolesRoutes;
