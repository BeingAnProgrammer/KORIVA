import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { slugify } from '../../../core/utils/slugify';
import { KnowledgeBaseDataService } from '../../../data/services/knowledge-base-data.service';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { KbCategoryCardComponent } from '../components/kb-category-card/kb-category-card.component';

@Component({
  selector: 'app-knowledge-base-page',
  imports: [RouterLink, IconComponent, KbCategoryCardComponent],
  templateUrl: './knowledge-base-page.component.html',
  styleUrl: './knowledge-base-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeBasePageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(KnowledgeBaseDataService);

  protected readonly categories = toSignal(this.data.getCategories(), { initialValue: [] });
  protected readonly recentlyAdded = toSignal(this.data.getRecentlyAdded(), { initialValue: [] });
  protected readonly slugify = slugify;

  constructor() {
    this.seo.setPage({
      title: 'Knowledge base',
      description: 'Every meeting, decision, and document — organized and searchable.',
      path: '/app/knowledge-base'
    });
  }
}
