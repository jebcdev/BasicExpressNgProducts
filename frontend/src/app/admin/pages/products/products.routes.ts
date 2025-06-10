import { Routes } from '@angular/router';
export const productsRoutes: Routes = [
  {
    title: 'Products',
    path: '',
    loadComponent: () =>
      import('@admin/pages/products/admin-products-page.component'),
  },
  {
    title: 'Create Product',
    path: 'create',
    loadComponent: () =>
      import(
        '@admin/pages/products/create/admin-products-create-page.component'
      ),
  },

  {
    path: 'edit/:productId',
    title: 'Edit Product',
    loadComponent: () =>
      import('@admin/pages/products/edit/admin-products-edit-page.component'),
  },
  {
    path: 'details/:productId',
    title: 'Product Details',
    loadComponent: () =>
      import('@admin/pages/products/details/admin-products-details.component'),
  },
];

export default productsRoutes;
