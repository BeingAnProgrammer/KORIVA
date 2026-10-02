// Template for environment config. Copy this file to both:
//   src/environments/environment.ts             (production: true)
//   src/environments/environment.development.ts  (production: false)
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  // Leave empty until a real backend exists — the auth interceptor stays inert with no apiUrl set.
  apiUrl: ''
};
