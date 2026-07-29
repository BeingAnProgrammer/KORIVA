// Template for local Supabase config. Copy this file to both:
//   src/environments/environment.ts             (production: true)
//   src/environments/environment.development.ts  (production: false)
// Both filenames are gitignored — fill in your own project's values, they
// never get committed. Get supabaseUrl/supabaseAnonKey from your Supabase
// project's Settings → API page. supabaseAnonKey is the *publishable*
// (anon) key, safe to expose client-side — never put a service_role or
// secret key here.
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  // Leave empty until a real backend exists — the auth interceptor stays inert with no apiUrl set.
  apiUrl: ''
};
