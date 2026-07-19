import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { SegmentedOption } from '../../../shared/ui/segmented-control/segmented-option.model';
import { CommandCenterComponent } from '../components/command-center/command-center.component';
import { DailyFocusComponent } from '../components/daily-focus/daily-focus.component';

type DashboardLayout = 'command-center' | 'daily-focus';

const LAYOUT_OPTIONS: readonly SegmentedOption<DashboardLayout>[] = [
  { value: 'command-center', label: 'Command center', icon: 'layout-grid' },
  { value: 'daily-focus', label: 'Daily focus', icon: 'target' }
];

@Component({
  selector: 'app-dashboard-page',
  imports: [SegmentedControlComponent, CommandCenterComponent, DailyFocusComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly seo = inject(SeoService);

  protected readonly layoutOptions = LAYOUT_OPTIONS;
  protected readonly layout = signal<DashboardLayout>('command-center');

  constructor() {
    this.seo.setPage({
      title: 'Dashboard',
      description: 'Your meetings, action items, and AI insights at a glance.',
      path: '/app/dashboard'
    });
  }
}
