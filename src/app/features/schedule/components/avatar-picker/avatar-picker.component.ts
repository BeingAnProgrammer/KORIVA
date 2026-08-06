import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { ToastService } from '../../../../core/services/toast.service';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { IconButtonComponent } from '../../../../shared/ui/icon-button/icon-button.component';
import { IconComponent } from '../../../../shared/ui/icon/icon.component';
import { LogoMarkComponent } from '../../../../shared/ui/logo-mark/logo-mark.component';

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

/** Upload + preview for how Koriva appears in a meeting. Emits a data URL, or null for the default mark. */
@Component({
  selector: 'app-avatar-picker',
  imports: [ButtonDirective, IconComponent, IconButtonComponent, LogoMarkComponent],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarPickerComponent {
  readonly value = input<string | null>(null);
  readonly valueChange = output<string | null>();

  private readonly toast = inject(ToastService);

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.toast.show('Please choose an image file');
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      this.toast.show('Image is too large — choose one under 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => this.valueChange.emit(reader.result as string);
    reader.readAsDataURL(file);
  }

  protected remove(): void {
    this.valueChange.emit(null);
  }
}
