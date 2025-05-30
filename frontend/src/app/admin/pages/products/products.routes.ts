import { Routes } from '@angular/router';
export const productsRoutes: Routes = [
  {
    path: '',
    title: 'Products',
    loadComponent: () =>
      import('@admin/pages/products/admin-products-page.component'),
  },
  /*   {
    path: 'create',
    title: 'Create Brand',
    loadComponent: () =>
      import('@admin/pages/brands/create/admin-brands-create-page.component'),
  },
  {
    path: 'edit/:brandId',
    title: 'Edit Brand',
    loadComponent: () =>
      import('@admin/pages/brands/edit/admin-brands-edit-page.component'),
  }, */
];

export default productsRoutes;
