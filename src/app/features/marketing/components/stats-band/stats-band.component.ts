import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';

/** Landing page stats band — ported verbatim. */
@Component({
  selector: 'app-stats-band',
  templateUrl: './stats-band.component.html',
  styleUrl: './stats-band.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsBandComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly stats = toSignal(this.content.getStats(), { initialValue: [] });
}
