import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SeoService } from '../../../core/services/seo.service';
import { RecordingsDataService } from '../../../data/services/recordings-data.service';
import { RecordingCardComponent } from '../components/recording-card/recording-card.component';

@Component({
  selector: 'app-recordings-page',
  imports: [RecordingCardComponent],
  templateUrl: './recordings-page.component.html',
  styleUrl: './recordings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordingsPageComponent {
  private readonly seo = inject(SeoService);
  private readonly data = inject(RecordingsDataService);

  protected readonly recordings = toSignal(this.data.getRecordings(), { initialValue: [] });

  constructor() {
    this.seo.setPage({
      title: 'Recordings',
      description: 'Every meeting recording, indexed and searchable.',
      path: '/app/recordings'
    });
  }
}
