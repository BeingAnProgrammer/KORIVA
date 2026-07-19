import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IconComponent } from '../icon/icon.component';

export type ChatBubbleVariant = 'user' | 'ai';

/**
 * AI chat message bubble — reused across the landing AI showcase, the AI
 * Assistant page, and the meeting-detail AI tab. AI-variant content
 * (answer text, citation pills, mini tables) is projected via ng-content.
 *
 * Note: the template uses exactly one `<ng-content>` outlet (not one per
 * variant branch) — Angular only projects into the first unselected
 * `<ng-content>` it finds, so a second one silently renders empty.
 */
@Component({
  selector: 'app-chat-bubble',
  imports: [IconComponent],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBubbleComponent {
  readonly variant = input<ChatBubbleVariant>('user');
  readonly maxWidth = input<string>();

  protected readonly isAi = computed(() => this.variant() === 'ai');
  protected readonly resolvedMaxWidth = computed(() => this.maxWidth() ?? (this.isAi() ? '88%' : '82%'));
}
