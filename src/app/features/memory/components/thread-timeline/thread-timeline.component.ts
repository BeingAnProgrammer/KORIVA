import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ThreadTimelineItem } from '../../../../data/models/thread.model';

/**
 * "The thread, in order" — a chronological, dot-connected timeline of every
 * meeting an entity was mentioned in. New component; nothing like it existed
 * before (Intelligence had no per-entity view at all).
 */
@Component({
  selector: 'app-thread-timeline',
  imports: [],
  templateUrl: './thread-timeline.component.html',
  styleUrl: './thread-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadTimelineComponent {
  readonly items = input.required<readonly ThreadTimelineItem[]>();
}
