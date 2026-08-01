import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { HomeDataService } from '../../../../data/services/home-data.service';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/** Home's "Ask anything that was ever said in a meeting" hero — opens the command palette pre-filled with the question. */
@Component({
  selector: 'app-ai-search-hero',
  imports: [IconComponent],
  templateUrl: './ai-search-hero.component.html',
  styleUrl: './ai-search-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiSearchHeroComponent {
  private readonly data = inject(HomeDataService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly eyebrow = this.data.askEyebrow;
  protected readonly suggestions = toSignal(this.data.getAskSuggestions(), { initialValue: [] });
  protected readonly query = signal('');

  protected ask(question?: string): void {
    this.palette.open(question ?? this.query());
  }
}
