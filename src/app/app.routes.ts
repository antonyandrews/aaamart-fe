import { Routes } from '@angular/router';
import { Login } from './components/login/login'
import { SigupComponent } from './components/sigup-component/sigup-component';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: SigupComponent
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
