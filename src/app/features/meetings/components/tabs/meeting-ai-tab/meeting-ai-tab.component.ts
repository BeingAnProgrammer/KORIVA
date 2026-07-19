import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ChatBubbleComponent } from '../../../../../shared/ui/chat-bubble/chat-bubble.component';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

/** Meeting detail "AI assistant" tab — ported verbatim (static demo exchange). */
@Component({
  selector: 'app-meeting-ai-tab',
  imports: [ChatBubbleComponent, IconComponent],
  templateUrl: './meeting-ai-tab.component.html',
  styleUrl: './meeting-ai-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingAiTabComponent {}
