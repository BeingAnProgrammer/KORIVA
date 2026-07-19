import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

interface Chapter {
  timestamp: string;
  title: string;
}

const CHAPTERS: readonly Chapter[] = [
  { timestamp: '00:00', title: 'Pipeline overview' },
  { timestamp: '11:20', title: 'Mid-market renewals' },
  { timestamp: '28:45', title: 'SSO decision' },
  { timestamp: '41:10', title: 'Q4 targets' }
];

/** Meeting detail "Recording" tab — ported verbatim (static demo player). */
@Component({
  selector: 'app-recording-tab',
  imports: [IconComponent],
  templateUrl: './recording-tab.component.html',
  styleUrl: './recording-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordingTabComponent {
  protected readonly chapters = CHAPTERS;
}
