import { ChangeDetectionStrategy, Component, HostListener, computed, inject, input, output } from '@angular/core';

import { CommandPaletteService } from '../../../../core/services/command-palette.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Commitment } from '../../../../data/models/commitment.model';
import { Tone } from '../../../../data/models/tone.model';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { AvatarComponent } from '../../../../shared/ui/avatar/avatar.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { StatusPillComponent } from '../../../../shared/ui/status-pill/status-pill.component';

/**
 * Right-side drawer opened from a Commitments row — replaces the old tabbed
 * detail page entirely (no separate route). New pattern.
 */
@Component({
  selector: 'app-commitment-drawer',
  imports: [StatusPillComponent, AvatarComponent, IconComponent, ButtonDirective],
  templateUrl: './commitment-drawer.component.html',
  styleUrl: './commitment-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitmentDrawerComponent {
  readonly commitment = input<Commitment | null>(null);
  readonly closed = output<void>();

  private readonly toast = inject(ToastService);
  private readonly palette = inject(CommandPaletteService);

  protected readonly statusLabel = computed(() => {
    switch (this.commitment()?.status) {
      case 'live':
        return 'LIVE';
      case 'upcoming':
        return 'UPCOMING';
      default:
        return 'MINUTES';
    }
  });

  protected readonly statusTone = computed<Tone>(() => (this.commitment()?.status === 'live' ? 'rose' : 'accent'));

  protected readonly minutesHeading = computed(() => (this.commitment()?.status === 'done' ? 'Minutes' : 'What Koriva has so far'));

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.commitment()) {
      this.closed.emit();
    }
  }

  protected close(): void {
    this.closed.emit();
  }

  protected copyMinutes(): void {
    const commitment = this.commitment();
    if (!commitment) {
      return;
    }
    void navigator.clipboard?.writeText(commitment.minutes.join('\n'));
    this.toast.show('Minutes copied to your clipboard');
  }

  protected askAboutThis(): void {
    const title = this.commitment()?.title;
    if (title) {
      this.palette.open(`What happened in ${title}?`);
    }
  }
}
