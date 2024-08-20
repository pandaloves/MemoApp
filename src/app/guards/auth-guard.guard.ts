import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);

  const publicRoutes: string[] = ['/login', '/signup'];

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    if (!publicRoutes.includes(state.url)) {
      router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
};
