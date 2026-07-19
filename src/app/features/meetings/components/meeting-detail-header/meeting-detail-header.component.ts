import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ChipComponent } from '../../../../shared/ui/chip/chip.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * Meeting detail header — ported verbatim. The design shows the same demo
 * meeting ("Q3 sales review") regardless of which row was clicked; a real
 * backend would key this off the route's `id` param instead.
 */
@Component({
  selector: 'app-meeting-detail-header',
  imports: [ChipComponent, IconComponent],
  templateUrl: './meeting-detail-header.component.html',
  styleUrl: './meeting-detail-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingDetailHeaderComponent {}
