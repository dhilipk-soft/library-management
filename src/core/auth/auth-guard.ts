import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken'); // or from cookies/sessionStorage

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp < Math.floor(Date.now() / 1000);

      if (!isExpired) {
        return true;
      }
    } catch (e) {
      console.error('Invalid token format', e);
    }
  }

  // Redirect to login if no token or expired
  return router.createUrlTree(['/login']);
};
