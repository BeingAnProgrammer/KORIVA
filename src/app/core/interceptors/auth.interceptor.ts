import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Attaches the Firebase ID token to requests targeting our own backend
 * (`environment.apiUrl`) only — never to third-party requests. Inert
 * until `apiUrl` is configured; the backend must verify the token with the
 * Firebase Admin SDK.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.apiUrl || !req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  return from(inject(AuthService).getIdToken()).pipe(
    switchMap((token) => next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req))
  );
};
