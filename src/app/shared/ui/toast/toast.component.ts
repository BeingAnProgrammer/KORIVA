import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

/** Renders the current toast at the bottom-center of the viewport. Mount once, app-wide. */
@Component({
  selector: 'app-toast',
  imports: [IconComponent],
  template: `
    <div class="toast" [class.toast--show]="message()">
      @if (message()) {
        <app-icon name="check" size="15" />
        {{ message() }}
      }
    </div>
  `,
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  private readonly toast = inject(ToastService);
  protected readonly message = this.toast.message;
}
