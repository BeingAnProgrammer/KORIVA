import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AvatarComponent, AvatarVariant } from '../../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

interface Participant {
  initials: string;
  name: string;
  role: string;
  variant: AvatarVariant;
}

const PARTICIPANTS: readonly Participant[] = [
  { initials: 'MK', name: 'Marcus Kane', role: 'VP Sales · host', variant: 'accent' },
  { initials: 'AR', name: 'Ava Reyes', role: 'Chief of staff', variant: 'neutral' },
  { initials: 'PN', name: 'Priya Nair', role: 'Eng lead', variant: 'neutral' }
];

interface Attachment {
  icon: string;
  color: string;
  name: string;
  size: string;
}

const ATTACHMENTS: readonly Attachment[] = [
  { icon: 'file-text', color: 'var(--rust)', name: 'Q3-pipeline.pdf', size: '2.4 MB' },
  { icon: 'sheet', color: 'var(--accent)', name: 'renewals-q3.xlsx', size: '88 KB' }
];

/** Meeting detail "Overview" tab — ported verbatim (static demo content). */
@Component({
  selector: 'app-overview-tab',
  imports: [AvatarComponent, IconComponent],
  templateUrl: './overview-tab.component.html',
  styleUrl: './overview-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewTabComponent {
  protected readonly participants = PARTICIPANTS;
  protected readonly attachments = ATTACHMENTS;
}
