import { Routes } from '@angular/router';

export const frontRoutes: Routes = [
  {
    path: '',
    title: 'Front',
    loadComponent: () => import('@front/_layout/front-layout.component'),
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('@front/pages/home/front-home-page.component'),
      },
    ],
  },
];

export default frontRoutes;
