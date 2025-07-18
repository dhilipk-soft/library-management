import { Routes } from '@angular/router';
import { authGuard } from '../core/auth/auth-guard';
import { FormCreate } from './pages/form-create/form-create';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-create',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'management',
    loadComponent: () => import('./pages/management/management').then(m => m.Management),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full',
      },
      { path: 'books', loadComponent: () => import('./pages/management/books/books').then(m => m.Books) },
      { path: 'categories', loadComponent: () => import('./pages/management/categories/categories').then(m => m.Categories) },
      { path: 'loans', loadComponent: () => import('./pages/management/loans/loans').then(m => m.Loans) },
      { path: 'members', loadComponent: () => import('./pages/management/members/members').then(m => m.Members) },
      { path: 'library', loadComponent: () => import('./pages/management/library/library').then(m => m.Libraries) },
      { path: 'library-list', loadComponent: () => import('./pages/management/library-list/library-list').then(m => m.LibraryList) }
    ]
  },
  {
    path: 'form-create',
    component: FormCreate
  }
];
