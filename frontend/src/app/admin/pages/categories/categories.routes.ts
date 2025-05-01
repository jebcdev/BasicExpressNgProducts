import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [
  {
    path: '',
    title: 'Categories',
    loadComponent: () =>
      import('@admin/pages/categories/admin-categories-page.component'),
  },
];

export default categoriesRoutes;
