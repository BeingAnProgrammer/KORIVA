import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarketingContentService } from '../../../../data/services/marketing-content.service';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { SectionEyebrowComponent } from '../../../../shared/ui/section-eyebrow/section-eyebrow.component';

interface CapabilityRow {
  icon: string;
  text: string;
  color: string;
}

const CAPABILITY_ROWS: readonly CapabilityRow[] = [
  { icon: 'search', text: 'Search organizational knowledge instantly', color: 'var(--accent)' },
  { icon: 'git-compare', text: 'Compare meetings and track decisions over time', color: '#8B5CF6' },
  { icon: 'quote', text: 'Every answer cites its source meeting', color: 'var(--ochre)' }
];

/** Landing page AI-assistant showcase — ported verbatim. */
@Component({
  selector: 'app-ai-showcase',
  imports: [IconComponent, SectionEyebrowComponent],
  templateUrl: './ai-showcase.component.html',
  styleUrl: './ai-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiShowcaseComponent {
  private readonly content = inject(MarketingContentService);

  protected readonly aiQueries = toSignal(this.content.getAiQueries(), { initialValue: [] });
  protected readonly capabilityRows = CAPABILITY_ROWS;
}
