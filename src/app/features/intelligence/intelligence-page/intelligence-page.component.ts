import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { slugify } from '../../../core/utils/slugify';
import { ActionItemsDataService } from '../../../data/services/action-items-data.service';
import { KnowledgeBaseDataService } from '../../../data/services/knowledge-base-data.service';
import { MarketingContentService } from '../../../data/services/marketing-content.service';
import { ActionItemsTableComponent } from '../../../shared/ui/action-items-table/action-items-table.component';
import { ChatBubbleComponent } from '../../../shared/ui/chat-bubble/chat-bubble.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';
import { SegmentedControlComponent } from '../../../shared/ui/segmented-control/segmented-control.component';
import { KbCategoryCardComponent } from '../components/kb-category-card/kb-category-card.component';

type IntelligenceView = 'browse' | 'ask';

/**
 * Merges the former standalone Knowledge Base (browse) and AI Assistant
 * (chat) pages into one section — they're genuinely different UIs (a
 * category/document directory vs. a Q&A chat), so this is a real second
 * panel behind a toggle, not a rename of either.
 */
@Component({
  selector: 'app-intelligence-page',
  imports: [RouterLink, IconComponent, KbCategoryCardComponent, SegmentedControlComponent, ChatBubbleComponent, ActionItemsTableComponent],
  templateUrl: './intelligence-page.component.html',
  styleUrl: './intelligence-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntelligencePageComponent {
  private readonly seo = inject(SeoService);
  private readonly kbData = inject(KnowledgeBaseDataService);
  private readonly marketingContent = inject(MarketingContentService);
  private readonly actionItemsData = inject(ActionItemsDataService);

  protected readonly view = signal<IntelligenceView>('browse');
  protected readonly viewOptions = [
    { value: 'browse' as const, label: 'Browse', icon: 'library' },
    { value: 'ask' as const, label: 'Ask Koriva', icon: 'sparkles' }
  ];

  protected readonly categories = toSignal(this.kbData.getCategories(), { initialValue: [] });
  protected readonly recentlyAdded = toSignal(this.kbData.getRecentlyAdded(), { initialValue: [] });
  protected readonly suggestedQueries = toSignal(this.marketingContent.getAiQueries(), { initialValue: [] });
  protected readonly actionItems = toSignal(this.actionItemsData.getActionItems(), { initialValue: [] });
  protected readonly slugify = slugify;

  constructor() {
    this.seo.setPage({
      title: 'Intelligence',
      description: 'Organizational memory — browse every meeting and document, or ask a question and get an answer with citations.',
      path: '/app/intelligence'
    });
  }
}
