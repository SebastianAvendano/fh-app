import { Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users/list-users/list-users.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'recover-pass',
    loadComponent: () => import('./pages/recoverPass/recoverPass.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'admins',
    loadComponent: () =>
      import('./pages/users/list-admins/list-admins.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/users/list-users/list-users.component'),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component'),
  },
];
