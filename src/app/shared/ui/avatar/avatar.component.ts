import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type AvatarVariant = 'accent' | 'neutral';

/** Initials avatar chip — ported from the sidebar user chip styling. */
@Component({
  selector: 'app-avatar',
  template: `<span
    class="avatar"
    [class.avatar--neutral]="variant() === 'neutral'"
    [style.width.px]="size()"
    [style.height.px]="size()"
    [style.font-size.px]="fontSize()"
    >{{ initials() }}</span
  >`,
  styles: `
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: var(--radius-pill);
      background: var(--accent-soft);
      color: var(--accent-ink);
      font-weight: 600;
      font-family: var(--font-sans);

      &--neutral {
        background: var(--canvas-sub);
        color: var(--ink-2);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  readonly initials = input.required<string>();
  readonly size = input<number>(32);
  readonly variant = input<AvatarVariant>('accent');

  protected readonly fontSize = computed(() => Math.round(this.size() * 0.4));
}
