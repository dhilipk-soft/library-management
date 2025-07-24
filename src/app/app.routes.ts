import { Routes } from '@angular/router';
import { authGuard } from '../core/auth/auth-guard';
import { RoleGuard } from '../core/guard/role-guard';
import { LoginComponent } from './components/login/login.component';
import { FormCreate } from './pages/form-create/form-create';
import { UnauthorizedComponent } from './components/unauthorized-component/unauthorized-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-create',
    pathMatch: 'full',
  },
  {
    path: 'form-create',
    component: FormCreate,
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'management',
    loadComponent: () =>
      import('./pages/management/management').then((m) => m.Management),
    data: { roles: ['admin', 'librarian', 'user'] },
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full',
      },
      {
        path: 'books',
        loadComponent: () =>
          import('./pages/management/books/books').then((m) => m.Books),
        data: { roles: ['admin', 'librarian', 'user'] },
      },
      {
        path: 'loans',
        loadComponent: () =>
          import('./pages/management/loans/loans').then((m) => m.Loans),
        data: { roles: ['admin', 'librarian','user'] },
        canActivate: [authGuard, RoleGuard]
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./pages/management/members/members').then((m) => m.Members),
        data: { roles: ['admin', 'librarian'] },
        canActivate: [authGuard, RoleGuard]
      },
      {
        path: 'library',
        loadComponent: () =>
          import('./pages/management/library/library').then((m) => m.Libraries),
        data: { roles: ['admin', 'librarian'] },
        canActivate: [authGuard, RoleGuard]
      },
      {
        path: 'library-list',
        loadComponent: () =>
          import('./pages/management/library/library-list/library-list').then(
            (m) => m.LibraryList
          ),
        data: { roles: ['admin', 'librarian'] },
        canActivate: [authGuard, RoleGuard]
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'unauthorized', // fallback for unknown paths
  },
];
