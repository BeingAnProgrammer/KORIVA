import { ChangeDetectionStrategy, Component, HostListener, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Meeting } from '../../../../data/models/meeting.model';
import { Tone } from '../../../../data/models/tone.model';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/**
 * Right-side drawer opened from a Meetings row — replaces the old tabbed
 * meeting-detail page entirely (no separate route). New pattern.
 */
@Component({
  selector: 'app-meeting-drawer',
  imports: [RouterLink, StatusPillComponent, AvatarComponent, IconComponent, ButtonDirective],
  templateUrl: './meeting-drawer.component.html',
  styleUrl: './meeting-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingDrawerComponent {
  readonly meeting = input<Meeting | null>(null);
  readonly closed = output<void>();

  private readonly toast = inject(ToastService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly statusLabel = computed(() => {
    switch (this.meeting()?.status) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      default:
        return 'MINUTES';
    }
  });

  protected readonly statusTone = computed<Tone>(() => (this.meeting()?.status === 'live' ? 'rose' : 'accent'));

  protected readonly minutesHeading = computed(() => (this.meeting()?.status === 'done' ? 'Minutes' : 'What Koriva has so far'));

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.meeting()) {
      this.closed.emit();
    }
  }

  protected close(): void {
    this.closed.emit();
  }

  protected copyMinutes(): void {
    const meeting = this.meeting();
    if (!meeting) {
      return;
    }
    void navigator.clipboard?.writeText(meeting.minutes.join('\n'));
    this.toast.show('Minutes copied to your clipboard');
  }

  protected askAboutThis(): void {
    const title = this.meeting()?.title;
    if (title) {
      this.palette.open(`What happened in ${title}?`);
    }
  }
}
