import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/marketing-layout/marketing-layout.component').then((m) => m.MarketingLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/marketing/landing-page/landing-page.component').then((m) => m.LandingPageComponent)
      }
    ]
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login-page/login-page.component').then((m) => m.LoginPageComponent)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-page/register-page.component').then((m) => m.RegisterPageComponent)
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-shell-layout/app-shell-layout.component').then((m) => m.AppShellLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home-page/home-page.component').then((m) => m.HomePageComponent)
      },
      {
        path: 'memory',
        loadComponent: () => import('./features/memory/memory-page/memory-page.component').then((m) => m.MemoryPageComponent)
      },
      {
        path: 'commitments',
        loadComponent: () =>
          import('./features/commitments/commitments-page/commitments-page.component').then((m) => m.CommitmentsPageComponent)
      },
      {
        path: 'patterns',
        loadComponent: () => import('./features/patterns/patterns-page/patterns-page.component').then((m) => m.PatternsPageComponent)
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics-page/analytics-page.component').then((m) => m.AnalyticsPageComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings-page/settings-page.component').then((m) => m.SettingsPageComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
