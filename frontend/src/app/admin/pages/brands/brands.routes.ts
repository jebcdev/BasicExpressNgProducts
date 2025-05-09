import { Routes } from '@angular/router';
export const brandsRoutes: Routes = [
  {
    path: '',
    title: 'Brands',
    loadComponent: () =>
      import('@admin/pages/brands/admin-brands-page.component'),
  },
  {
    path: 'create',
    title: 'Create Brand',
    loadComponent: () =>
      import('@admin/pages/brands/create/admin-brands-create-page.component'),
  },
  {
    path: 'edit/:id',
    title: 'Edit Brand',
    loadComponent: () =>
      import('@admin/pages/brands/edit/admin-brands-edit-page.component'),
  },
];

export default brandsRoutes;
