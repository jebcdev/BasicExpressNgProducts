import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    title: 'Categories',
    loadComponent: () =>
      import('@admin/pages/categories/admin-categories-page.component'),
  },
  {
    path: 'create',
    title: 'Create Category',
    loadComponent: () =>
      import(
        '@admin/pages/categories/create/admin-categories-create-page.component'
      ),
  },
  {
    path: 'edit/:categoryId',
    title: 'Edit Category',
    loadComponent: () =>
      import(
        '@admin/pages/categories/edit/admin-categories-edit-page.component'
      ),
  },
];

export default categoriesRoutes;
