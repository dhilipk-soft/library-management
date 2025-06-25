import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full'
    },
    {
        path: 'books',
        loadComponent: () => import('./pages/books/books').then(m => m.Books)
    },
    {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories').then(m => m.Categories)
    },
    {
        path: 'loans',
        loadComponent: () => import('./pages/loans/loans').then(m => m.Loans)
    },
    {
        path: 'members',
        loadComponent: () => import('./pages/members/members').then(m => m.Members)
    },
    {
        path: 'library',
        loadComponent: () => import('./pages/library/library').then(m => m.Libraries)
    },
    {
        path: 'library-list',
        loadComponent: () => import('./pages/library-list/library-list').then(m => m.LibraryList)
    }
];
