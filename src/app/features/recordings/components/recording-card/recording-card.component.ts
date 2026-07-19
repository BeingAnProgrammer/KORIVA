import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { slugify } from '../../../../core/utils/slugify';
import { Recording } from '../../../../data/models/recording.model';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * Recording thumbnail card — ported verbatim. The source design shows this
 * as a plain `cursor:pointer` div with no actual destination; linked here to
 * the meeting's Recording tab so it's both keyboard-operable and functional.
 */
@Component({
  selector: 'app-recording-card',
  imports: [RouterLink, IconComponent],
  templateUrl: './recording-card.component.html',
  styleUrl: './recording-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordingCardComponent {
  readonly recording = input.required<Recording>();

  protected readonly slugify = slugify;
}
