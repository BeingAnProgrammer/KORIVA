import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Insight } from '../../../../data/models/insight.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** AI insights card, shown on the dashboard's Command Center layout. */
@Component({
  selector: 'app-ai-insights-card',
  imports: [IconComponent],
  templateUrl: './ai-insights-card.component.html',
  styleUrl: './ai-insights-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiInsightsCardComponent {
  readonly insights = input.required<readonly Insight[]>();
  readonly title = input('AI insights');
  readonly itemIconSize = input<string | number>(15);
}
