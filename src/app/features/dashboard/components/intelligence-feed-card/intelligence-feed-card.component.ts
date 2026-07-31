import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IntelligenceSignal } from '../../../../data/models/intelligence-signal.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * The dashboard's signature section — cross-meeting pattern signals ("Pricing
 * concerns mentioned in 8 meetings"), not a list of meetings. Given its own
 * full-width, wrapping-grid treatment in command-center rather than being
 * boxed into the narrow 2-column layout, per the brief's "signature section"
 * framing.
 */
@Component({
  selector: 'app-intelligence-feed-card',
  imports: [IconComponent],
  templateUrl: './intelligence-feed-card.component.html',
  styleUrl: './intelligence-feed-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntelligenceFeedCardComponent {
  readonly signals = input.required<readonly IntelligenceSignal[]>();

  protected trendColor(trendType: IntelligenceSignal['trendType']): string {
    switch (trendType) {
      case 'up':
        return 'var(--accent)';
      case 'warn':
        return 'var(--rust)';
      default:
        return 'var(--ink-3)';
    }
  }
}
