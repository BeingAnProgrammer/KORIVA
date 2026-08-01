import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LiveMeeting } from '../../../../data/models/live-meeting.model';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';

/**
 * The Home page's live-meeting hero card — mirrors the reference's `.livecard`:
 * a running clock, per-speaker activity bars, a fading transcript ticker, and
 * a "Koriva is noticing" insight sidebar. New component — nothing like it
 * existed in the previous dashboard.
 */
@Component({
  selector: 'app-live-meeting-panel',
  imports: [IconComponent, RouterLink, AvatarComponent],
  templateUrl: './live-meeting-panel.component.html',
  styleUrl: './live-meeting-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveMeetingPanelComponent {
  readonly meeting = input.required<LiveMeeting>();

  private readonly toast = inject(ToastService);
  private readonly palette = inject(CommandPaletteService);

  private readonly elapsedSeconds = signal(0);

  protected readonly clock = computed(() => {
    const total = this.meeting().startSeconds + this.elapsedSeconds();
    const minutes = Math.floor(total / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (total % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  constructor() {
    const intervalId = setInterval(() => this.elapsedSeconds.update((value) => value + 1), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }

  protected joinMeeting(): void {
    this.toast.show(`Joining ${this.meeting().title}…`);
  }

  protected askAboutCall(): void {
    this.palette.open(`What has been decided in the ${this.meeting().title} call?`);
  }
}
