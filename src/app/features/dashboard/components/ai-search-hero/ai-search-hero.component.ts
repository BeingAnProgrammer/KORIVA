import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { DashboardDataService } from '../../../../data/services/dashboard-data.service';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * Replaces the old greeting-style dashboard header — leads with "ask a
 * question", not a stats grid, so the first thing a user sees is that
 * Koriva answers questions across every meeting. Static/no-backend: the
 * only real action is navigating to the Intelligence page's Ask Koriva
 * view, which already owns the (also static) chat experience.
 */
@Component({
  selector: 'app-ai-search-hero',
  imports: [RouterLink, ButtonDirective, IconComponent],
  templateUrl: './ai-search-hero.component.html',
  styleUrl: './ai-search-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiSearchHeroComponent {
  private readonly router = inject(Router);
  private readonly data = inject(DashboardDataService);

  protected readonly popularQuestions = toSignal(this.data.getPopularQuestions(), { initialValue: [] });
  protected readonly query = signal('');

  protected ask(question?: string): void {
    const text = question ?? this.query();
    if (!text.trim()) {
      return;
    }
    this.router.navigate(['/app/intelligence']);
  }
}
