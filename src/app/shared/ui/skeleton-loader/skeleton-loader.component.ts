import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Shimmering placeholder block for loading states, reusing the design's
 * `shimmer` keyframe (defined but unused in the prototype's own markup).
 */
@Component({
  selector: 'app-skeleton-loader',
  template: `
    <span
      class="skeleton"
      [style.width]="width()"
      [style.height]="height()"
      [style.border-radius]="radius()"
    ></span>
  `,
  styles: `
    .skeleton {
      display: block;
      background: linear-gradient(90deg, var(--hairline) 25%, var(--hairline-2) 37%, var(--hairline) 63%);
      background-size: 400px 100%;
      animation: shimmer 1.4s ease infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonLoaderComponent {
  readonly width = input('100%');
  readonly height = input('16px');
  readonly radius = input('var(--radius-sm)');
}
