import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { ActionItemsDataService } from '../../../data/services/action-items-data.service';
import { MarketingContentService } from '../../../data/services/marketing-content.service';
import { ActionItemsTableComponent } from '../../../shared/ui/action-items-table/action-items-table.component';
import { ChatBubbleComponent } from '../../../shared/ui/chat-bubble/chat-bubble.component';
import { IconComponent } from '../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-ai-assistant-page',
  imports: [IconComponent, ChatBubbleComponent, ActionItemsTableComponent],
  templateUrl: './ai-assistant-page.component.html',
  styleUrl: './ai-assistant-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiAssistantPageComponent {
  private readonly seo = inject(SeoService);
  private readonly marketingContent = inject(MarketingContentService);
  private readonly actionItemsData = inject(ActionItemsDataService);

  protected readonly suggestedQueries = toSignal(this.marketingContent.getAiQueries(), { initialValue: [] });
  protected readonly actionItems = toSignal(this.actionItemsData.getActionItems(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'AI Assistant',
      description: 'Ask a year of meetings anything, with citations back to the source.',
      path: '/app/ai-assistant'
    });
  }
}
