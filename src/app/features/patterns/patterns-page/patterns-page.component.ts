import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CommandPaletteService } from '../../../core/services/command-palette.service';
import { SeoService } from '../../../core/services/seo.service';
import { PatternsDataService } from '../../../data/services/patterns-data.service';
import { PatternCardComponent } from '../components/pattern-card/pattern-card.component';

@Component({
  selector: 'app-patterns-page',
  imports: [PatternCardComponent],
  templateUrl: './patterns-page.component.html',
  styleUrl: './patterns-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(PatternsDataService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly patterns = toSignal(this.data.getPatterns(), { initialValue: [] });
  protected readonly expandedId = signal<string | null>(null);

  constructor() {
    this.seo.setPage({
      title: 'Patterns',
      description: 'What keeps coming back — topics, questions, and decisions that repeat across meetings.',
      path: '/app/patterns'
    });
  }

  protected toggle(id: string): void {
    this.expandedId.update((current) => (current === id ? null : id));
  }

  protected askAbout(title: string): void {
    this.palette.open(title);
  }
}
