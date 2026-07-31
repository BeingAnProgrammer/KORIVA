import { Routes } from '@angular/router';

import { RouteTitleData } from './core/models/route-title-data.model';
import { authGuard, guestGuard } from './core/guards/auth.guard';

const title = (title: string): { data: RouteTitleData } => ({ data: { title } });

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
    loadComponent: () => import('./features/auth/login-page/login-page.component').then((m) => m.LoginPageComponent),
    ...title('Log in')
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register-page/register-page.component').then((m) => m.RegisterPageComponent),
    ...title('Sign up')
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-shell-layout/app-shell-layout.component').then((m) => m.AppShellLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-page/dashboard-page.component').then((m) => m.DashboardPageComponent),
        ...title('Dashboard')
      },
      {
        path: 'meetings',
        loadComponent: () =>
          import('./features/meetings/meetings-list-page/meetings-list-page.component').then((m) => m.MeetingsListPageComponent),
        ...title('Meetings')
      },
      {
        path: 'meetings/:id',
        loadComponent: () =>
          import('./features/meetings/meeting-detail-page/meeting-detail-page.component').then((m) => m.MeetingDetailPageComponent),
        data: { title: 'Meetings', backLink: { route: '/app/meetings', label: 'All meetings' } } satisfies RouteTitleData
      },
      {
        path: 'meetings/:id/:tab',
        loadComponent: () =>
          import('./features/meetings/meeting-detail-page/meeting-detail-page.component').then((m) => m.MeetingDetailPageComponent),
        data: { title: 'Meetings', backLink: { route: '/app/meetings', label: 'All meetings' } } satisfies RouteTitleData
      },
      {
        path: 'intelligence',
        loadComponent: () =>
          import('./features/intelligence/intelligence-page/intelligence-page.component').then((m) => m.IntelligencePageComponent),
        ...title('Intelligence')
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics-page/analytics-page.component').then((m) => m.AnalyticsPageComponent),
        ...title('Analytics')
      },
      {
        path: 'action-items',
        loadComponent: () =>
          import('./features/action-items/action-items-page/action-items-page.component').then((m) => m.ActionItemsPageComponent),
        ...title('Action items')
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings-page/settings-page.component').then((m) => m.SettingsPageComponent),
        ...title('Settings')
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
