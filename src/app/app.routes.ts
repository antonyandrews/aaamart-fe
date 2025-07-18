import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: (await import('./layout/components/base-layout/base-layout')).BaseLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard').then(m => m.Dashboard),
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/sigup-component/sigup-component').then(m => m.SigupComponent),
  },
];
