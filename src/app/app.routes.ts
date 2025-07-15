import { Routes } from '@angular/router';
import { FormCreate } from './pages/form-create/form-create';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-create',
    pathMatch: 'full'
  },
  {
    path: 'management',
    loadComponent: () => import('./pages/management/management').then(m => m.Management),
    data: {
      title: 'Management'
    },
    children: [
      {
        path: 'books',
        loadComponent: () => import('./pages/management/books/books').then(m => m.Books)
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/management/categories/categories').then(m => m.Categories)
      },
      {
        path: 'loans',
        loadComponent: () => import('./pages/management/loans/loans').then(m => m.Loans)
      },
      {
        path: 'members',
        loadComponent: () => import('./pages/management/members/members').then(m => m.Members)
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/management/library/library').then(m => m.Libraries)
      },
      {
        path: 'library-list',
        loadComponent: () => import('./pages/management/library-list/library-list').then(m => m.LibraryList)
      }
    ]
  },
  { 
    path: 'form-create',
    component: FormCreate
  }
];
