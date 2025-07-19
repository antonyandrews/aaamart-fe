import { Routes } from '@angular/router';
import { AUTH_GUARD } from './core/guards/auth-guard-guard';
import { CartComponent } from './components/cart-component/cart-component';

export const routes: Routes = [
  {
    path: '',
    component: (await import('./layout/components/base-layout/base-layout'))
      .BaseLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        canActivate: [AUTH_GUARD],
        loadComponent: () =>
          import('./components/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'cart',
        canActivate: [AUTH_GUARD], // if needed
        component: CartComponent,
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/sigup-component/sigup-component').then(
        (m) => m.SigupComponent
      ),
  },
];
