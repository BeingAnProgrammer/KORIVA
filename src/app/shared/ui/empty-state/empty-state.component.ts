import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

/**
 * Generic empty-state placeholder (e.g. "no meetings yet"). Not part of the
 * original prototype — added for production completeness since every mock
 * data set here is always populated.
 */
@Component({
  selector: 'app-empty-state',
  imports: [IconComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  readonly icon = input('compass');
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
