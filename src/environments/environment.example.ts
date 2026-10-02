// Template for environment config. Copy this file to both:
//   src/environments/environment.ts             (production: true)
//   src/environments/environment.development.ts  (production: false)
// Firebase values come from Firebase Console → Project settings → Your apps → Web app.
// They are public client identifiers — never put Admin SDK / service-account credentials here.
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    appId: 'YOUR_FIREBASE_APP_ID'
  },
  // Leave empty until a real backend exists — the auth interceptor stays inert with no apiUrl set.
  apiUrl: ''
};
