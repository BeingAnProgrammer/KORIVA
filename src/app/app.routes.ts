import { Routes } from '@angular/router';

import { RouteTitleData } from './core/models/route-title-data.model';

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
    path: 'app',
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
        path: 'ai-assistant',
        loadComponent: () =>
          import('./features/ai-assistant/ai-assistant-page/ai-assistant-page.component').then((m) => m.AiAssistantPageComponent),
        ...title('AI Assistant')
      },
      {
        path: 'knowledge-base',
        loadComponent: () =>
          import('./features/knowledge-base/knowledge-base-page/knowledge-base-page.component').then(
            (m) => m.KnowledgeBasePageComponent
          ),
        ...title('Knowledge base')
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics-page/analytics-page.component').then((m) => m.AnalyticsPageComponent),
        ...title('Analytics')
      },
      {
        path: 'recordings',
        loadComponent: () =>
          import('./features/recordings/recordings-page/recordings-page.component').then((m) => m.RecordingsPageComponent),
        ...title('Recordings')
      },
      {
        path: 'templates',
        loadComponent: () =>
          import('./features/templates/templates-page/templates-page.component').then((m) => m.TemplatesPageComponent),
        ...title('Templates')
      },
      {
        path: 'action-items',
        loadComponent: () =>
          import('./features/action-items/action-items-page/action-items-page.component').then((m) => m.ActionItemsPageComponent),
        ...title('Action items')
      },
      {
        path: 'teams',
        loadComponent: () => import('./features/teams/teams-page/teams-page.component').then((m) => m.TeamsPageComponent),
        ...title('Teams')
      },
      {
        path: 'automations',
        loadComponent: () =>
          import('./features/automations/automations-page/automations-page.component').then((m) => m.AutomationsPageComponent),
        ...title('Automations')
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
