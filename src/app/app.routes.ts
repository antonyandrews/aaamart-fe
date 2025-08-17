import { Routes } from '@angular/router';
import { AUTH_GUARD } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: (await import('./features/layout/components/base-layout/base-layout'))
      .BaseLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product',
      },
      {
        path: 'product',
        canActivate: [AUTH_GUARD],
        loadComponent: () =>
          import('./features/products/components/product/product').then((m) => m.Product),
      },
      {
        path: 'cart',
        canActivate: [AUTH_GUARD], // if needed
        loadComponent: () =>
          import('./features/cart/components/cart-component/cart-component').then((m) => m.CartComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login').then((m) => m.Login),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./features/auth/components/sigup-component/sigup-component').then(
        (m) => m.SigupComponent
      ),
  }, 
  {
    path: 'store/new',
    loadComponent: () =>
      import('./features/tenant/components/tenant-login/tenant-login.component').then(
        (m) => m.TenantLoginComponent
      ),
  },
  {
    path: 'oauth/callback',
    loadComponent: () =>
      import('./features/auth/components/google-oauth-callback/google-oauth-callback.component').then(
        (m) => m.GoogleOauthCallbackComponent
      ),
  }
];
