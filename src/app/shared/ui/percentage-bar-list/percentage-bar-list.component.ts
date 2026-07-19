import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PercentageBarItem } from './percentage-bar-list.model';

/** Horizontal percentage-bar list — Analytics "Meeting categories" + meeting-detail "Talk time". */
@Component({
  selector: 'app-percentage-bar-list',
  templateUrl: './percentage-bar-list.component.html',
  styleUrl: './percentage-bar-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PercentageBarListComponent {
  readonly items = input.required<readonly PercentageBarItem[]>();
}
