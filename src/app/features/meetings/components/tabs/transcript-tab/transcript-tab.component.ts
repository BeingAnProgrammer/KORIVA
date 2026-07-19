import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { MeetingsDataService } from '../../../../../data/services/meetings-data.service';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

/** Meeting detail "Transcript" tab — ported verbatim. */
@Component({
  selector: 'app-transcript-tab',
  imports: [IconComponent],
  templateUrl: './transcript-tab.component.html',
  styleUrl: './transcript-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranscriptTabComponent {
  private readonly data = inject(MeetingsDataService);

  readonly meetingId = input.required<string>();

  protected readonly lines = toSignal(
    toObservable(this.meetingId).pipe(switchMap((id) => this.data.getTranscript(id))),
    { initialValue: [] }
  );
}
