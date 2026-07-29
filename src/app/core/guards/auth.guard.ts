import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/** Protects `/app/**` — unauthenticated visitors are sent to `/login` with a `returnUrl`. */
export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const authenticated = await auth.whenReady();
  return authenticated ? true : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

/** Guards `/login` and `/register` — an already-authenticated user is sent to the app instead. */
export const guestGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const authenticated = await auth.whenReady();
  return authenticated ? router.createUrlTree(['/app/dashboard']) : true;
};
