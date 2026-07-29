import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/**
 * Attaches the Supabase access token to requests targeting our own backend
 * (`environment.apiUrl`) only — never to Supabase itself (supabase-js
 * manages its own auth headers) and never to third-party requests. Inert
 * until `apiUrl` is configured, so it's ready for a future backend
 * (e.g. FastAPI) without any further Angular-side changes.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.apiUrl || !req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const token = inject(AuthService).getAccessToken();
  if (!token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
