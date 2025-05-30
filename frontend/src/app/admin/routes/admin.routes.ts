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
        loadChildren: () => import('@admin/pages/roles/roles.routes'),
      },
      {
        path: 'users',
        title: 'Users',
        loadChildren: () => import('@admin/pages/users/users.routes'),
      },
      {
        path: 'categories',
        title: 'Categories',
        loadChildren: () => import('@admin/pages/categories/categories.routes'),
      },
      {
        path: 'brands',
        title: 'Brands',
        loadChildren: () => import('@admin/pages/brands/brands.routes'),
      },
      {
        path: 'products',
        title: 'Products',
        loadChildren: () => import('@admin/pages/products/products.routes'),
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
